/**
 * Nartes+ Yerel Web ve Sokratik Yapay Zeka Sunucusu (API Anahtarsız • %100 Lokal)
 * - Port 8080 üzerinden NartestPlus arayüzünü sunar.
 * - Yerel Ollama (nartes-sokratik / qwen2.5) motoruna bağlanarak API anahtarı olmadan
 *   8. Sınıf LGS Matematik müfredatına ve aktif durağa kilitli, özgün Sokratik yanıtlar üretir.
 */

"use strict";

const http = require("http");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { spawn } = require("child_process");

const PORT = Number(process.env.PORT || 8080);
const HOST = process.env.HOST || "127.0.0.1";
const ROOT_DIR = __dirname;
const OLLAMA_BASE = process.env.OLLAMA_HOST_URL || "http://127.0.0.1:11434";
const PRIMARY_MODEL = process.env.NARTES_MODEL || "nartes-sokratik";
const FALLBACK_MODELS = ["gemma3:4b", "qwen2.5:3b", "qwen2.5:7b"];

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".mp3": "audio/mpeg",
  ".wav": "audio/wav",
  ".mp4": "video/mp4",
  ".webm": "video/webm"
};

// ============================================================================
// 1. TÜRKÇE METİN YARDIMCILARI VE MÜFREDAT BİLGİ TABANI (RAG İNDEKSİ)
// ============================================================================
function trLower(str) {
  return String(str || "").toLocaleLowerCase("tr-TR");
}

function stripHtmlServer(raw) {
  return String(raw || "")
    .replace(/<\/?[a-zA-Z][^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenizeTr(text) {
  return trLower(stripHtmlServer(text))
    .replace(/[^a-z0-9ğüşıöç\s]/gi, " ")
    .split(/\s+/)
    .filter(w => w.length >= 2);
}

const curriculumState = {
  unitsByNo: new Map(),
  chunks: []
};

function loadPlatformUnitsAndDocs() {
  try {
    const sandbox = { window: {} };
    vm.createContext(sandbox);

    const u1Path = path.join(ROOT_DIR, "data", "carpanlar_katlar_data.js");
    const u2Path = path.join(ROOT_DIR, "data", "lgs_uniteler_2_12.js");

    if (fs.existsSync(u1Path)) {
      vm.runInContext(fs.readFileSync(u1Path, "utf8"), sandbox);
    }
    if (fs.existsSync(u2Path)) {
      vm.runInContext(fs.readFileSync(u2Path, "utf8"), sandbox);
    }

    const allUnits = [];
    if (sandbox.window.MATFLOW_UNIT) allUnits.push(sandbox.window.MATFLOW_UNIT);
    if (Array.isArray(sandbox.window.MATFLOW_UNITS_2_12)) {
      allUnits.push(...sandbox.window.MATFLOW_UNITS_2_12);
    }

    for (const u of allUnits) {
      curriculumState.unitsByNo.set(Number(u.unitNo), u);
      for (const st of u.stops || []) {
        const kaz = (u.kazanimlar || []).find(k => k.id === st.kazanimId) || {};
        const bodyParts = [
          `${u.unitNo}. Ünite ${u.title} - ${kaz.title || ""} - ${st.title || ""}`,
          Array.isArray(st.explanation) ? st.explanation.map(stripHtmlServer).join(" ") : "",
          st.hint ? stripHtmlServer(st.hint) : ""
        ].filter(Boolean).join(" | ");

        if (bodyParts.length > 30) {
          curriculumState.chunks.push({
            source: `Ünite ${u.unitNo} Durak ${st.id}`,
            unitNo: Number(u.unitNo),
            text: bodyParts.slice(0, 650),
            tokens: new Set(tokenizeTr(bodyParts))
          });
        }
      }
    }

    // 8. Sınıf Maarif / MEB Markdown kaynaklarını da indeksle
    const mdDirs = [
      path.join(ROOT_DIR, "kaynakPDF_MD", "03_Maarif_Modeli", "8-sinif"),
      path.join(ROOT_DIR, "kaynakPDF_MD", "03_Maarif_Modeli", "9-sinif")
    ];

    for (const dir of mdDirs) {
      if (!fs.existsSync(dir)) continue;
      const files = fs.readdirSync(dir).filter(f => f.endsWith(".md") && trLower(f).includes("8") || f.startsWith("Tema-"));
      for (const file of files) {
        const fullPath = path.join(dir, file);
        const content = fs.readFileSync(fullPath, "utf8");
        const paragraphs = content
          .split(/\n{2,}/)
          .map(p => p.replace(/[#>*_`|-]/g, " ").replace(/\s+/g, " ").trim())
          .filter(p => p.length >= 80 && p.length <= 900);

        for (let i = 0; i < Math.min(paragraphs.length, 60); i++) {
          const p = paragraphs[i];
          curriculumState.chunks.push({
            source: file.replace(/\.md$/i, ""),
            unitNo: null,
            text: p.slice(0, 520),
            tokens: new Set(tokenizeTr(p))
          });
        }
      }
    }

    console.log(`[NarTES AI] ${curriculumState.unitsByNo.size} ünite ve ${curriculumState.chunks.length} müfredat bilgi parçası indekslendi.`);
  } catch (err) {
    console.warn("[NarTES AI] Müfredat indeksleme uyarısı:", err.message);
  }
}

function retrieveRelevantCurriculumNotes(queryText, unitNo, stopTitle, limit = 2) {
  const qTokens = tokenizeTr(`${queryText} ${stopTitle || ""}`);
  if (qTokens.length === 0 || curriculumState.chunks.length === 0) return [];

  const scored = [];
  for (const chunk of curriculumState.chunks) {
    let score = 0;
    if (unitNo && chunk.unitNo === Number(unitNo)) score += 2.2;
    for (const qt of qTokens) {
      if (chunk.tokens.has(qt)) score += qt.length >= 5 ? 2.0 : 1.0;
    }
    if (score >= 3.0) {
      scored.push({ score, chunk });
    }
  }

  scored.sort((a, b) => b.score - a.score);
  const picked = [];
  const seen = new Set();
  for (const item of scored) {
    const key = item.chunk.text.slice(0, 80);
    if (seen.has(key)) continue;
    seen.add(key);
    picked.push(item.chunk.text);
    if (picked.length >= limit) break;
  }
  return picked;
}

// ============================================================================
// 2. DERS BAĞLAMI VE PEDAGOJİK GÜVENLİK KALKANI (GUARDRAILS)
// ============================================================================
const PROFANITY_WORDS = [
  "aptal", "salak", "gerizekalı", "mal", "öküz", "ahmak", "dangalak",
  "sik", "siktir", "amk", "aq", "oç", "piç", "yavşak", "göt", "bok", "lan", "ulan",
  "fuck", "shit", "bitch", "idiot", "stupid"
];

const EXPLICIT_OFF_TOPIC_PATTERNS = [
  /\b(futbol|galatasaray|fenerbahçe|beşiktaş|trabzonspor|şampiyonlar ligi|ofsayt|penaltı|maç kaç kaç)\b/i,
  /\b(valorant|pubg|minecraft|roblox|fortnite|gta|brawl stars|lol|counter strike|oyun öner)\b/i,
  /\b(tiktok|instagram|youtuber|influencer|netflix|dizi öner|film öner|şarkı öner|rapçi)\b/i,
  /\b(siyaset|cumhurbaşkan|belediye seçim|oy ver|parti|meclis|ekonomi haber)\b/i,
  /\b(yemek tarifi|kek tarifi|pilav nasıl|hava durumu|yağmur yağacak mı|burç yorumu|fal bak)\b/i,
  /\b(sevgilim|aşık oldum|flört|dedikodu|fıkra anlat|masal anlat|şiir yaz|şarkı sözü yaz)\b/i,
  /\b(python kodu|javascript yaz|html yaz|ingilizce çevir|tarih ödevi|coğrafya sorusu)\b/i
];

const DIRECT_ANSWER_PATTERNS = [
  /cevab[ıi]\s*(ne|nedir|kaç|söyle|ver|yaz)/i,
  /doğru\s*(şık|cevap|seçenek)\s*(hangisi|ne|nedir)/i,
  /hangi\s*(şık|seçenek)/i,
  /direkt\s*(söyle|çöz|ver|cevap|yaz)/i,
  /boşlu(ğa|klara).*?(ne\s*(gelecek|gelir|yaz)|söyle|yaz)/i,
  /ne\s*yazacağımı.*?(söyle|ver)/i,
  /şıkkı\s*söyle/i,
  /sadece\s*cevab/i,
  /uğraştırma.*?(söyle|çöz|ver)/i
];

const MATH_AND_LESSON_KEYWORDS = [
  "sayı", "rakam", "çarpan", "bölen", "bölün", "bölme", "çarpma", "çarpım", "kat", "katı",
  "asal", "ebob", "ekok", "ortak", "aralarında", "kalan", "kalansız", "tam",
  "üs", "üslü", "kuvvet", "taban", "bilimsel", "çözümleme", "negatif", "pozitif",
  "kök", "karekök", "köklü", "tamkare", "yaklaşık", "irrasyonel", "rasyonel", "gerçek",
  "veri", "grafik", "daire", "sütun", "çizgi", "merkez açı", "olasılık", "olay", "çıktı", "eş olasılık",
  "cebir", "cebirsel", "terim", "katsayı", "değişken", "özdeşlik", "çarpanlara",
  "denklem", "bilinmeyen", "koordinat", "eksen", "doğrusal", "eğim", "eşitsizlik",
  "üçgen", "kenar", "açı", "açıortay", "kenarortay", "yükseklik", "pisagor", "hipotenüs", "eşlik", "benzerlik",
  "dönüşüm", "öteleme", "yansıma", "simetri", "prizma", "silindir", "piramit", "koni", "hacim", "alan", "çevre", "yüzey",
  "oran", "orantı", "yüzde", "toplam", "fark", "işlem", "sonuç", "değer", "formül", "kural", "tanım", "kavram",
  "soru", "şık", "seçenek", "boşluk", "kutu", "adım", "durak", "ünite", "kazanım", "etkinlik", "örnek",
  "neden", "niye", "niçin", "nasıl", "anlamadım", "anlat", "açıkla", "ipucu", "yardım", "takıldım",
  "yanlış", "doğru", "hata", "denedim", "seçtim", "olur mu", "olmaz mı", "hangisi", "kaç", "kaçtır",
  "dikdörtgen", "birimkare", "ağaç", "algoritma", "gökkuşağı", "çift", "tek"
];

const BRIEF_SOCIAL_PATTERNS = /^(merhaba|selam|selamlar|hey|günaydın|iyi dersler|iyi akşamlar|nasılsın|kimsin|sen kimsin|teşekkürler|teşekkür ederim|sağ ol|anladım|tamam|peki|süper|harika|evet|hayır)[!.,?\s]*$/i;

function hasProfanity(text) {
  const lower = trLower(text);
  return PROFANITY_WORDS.some(w => {
    const re = new RegExp(`(^|[^a-z0-9ğüşıöç])${w}([^a-z0-9ğüşıöç]|$)`, "i");
    return re.test(lower);
  });
}

function detectScopeAndIntent(questionText, stopInfo) {
  const clean = String(questionText || "").trim();
  const lower = trLower(clean);

  if (!clean) {
    return { status: "empty" };
  }
  if (hasProfanity(clean)) {
    return { status: "profanity" };
  }
  for (const pat of EXPLICIT_OFF_TOPIC_PATTERNS) {
    if (pat.test(lower)) {
      return { status: "off_topic", reason: "explicit_non_math" };
    }
  }

  const wantsDirectAnswer = DIRECT_ANSWER_PATTERNS.some(re => re.test(lower));
  if (wantsDirectAnswer) {
    return { status: "in_scope", wantsDirectAnswer: true };
  }

  if (BRIEF_SOCIAL_PATTERNS.test(lower)) {
    return { status: "in_scope", isSocial: true };
  }

  // Sayı veya matematiksel sembol içeriyorsa ders bağlamındadır
  if (/\d|[+\-×÷*/=^%<>]/.test(clean)) {
    return { status: "in_scope" };
  }

  // Matematik / soru / öğrenme anahtar kelimesi içeriyorsa ders bağlamındadır
  if (MATH_AND_LESSON_KEYWORDS.some(kw => lower.includes(kw))) {
    return { status: "in_scope" };
  }

  // Aktif durağın başlığındaki veya soru kökündeki kelimelerden biri geçiyorsa ders bağlamındadır
  const stopContextWords = tokenizeTr(
    `${stopInfo.unitTitle || ""} ${stopInfo.kazTitle || ""} ${stopInfo.stopTitle || ""} ${stopInfo.problemText || ""}`
  ).filter(w => w.length >= 4);
  if (stopContextWords.some(w => lower.includes(w))) {
    return { status: "in_scope" };
  }

  // Uzun ama hiçbir matematik/soru bağlamı taşımayan genel sohbet cümlelerini ders dışı say
  const words = tokenizeTr(clean);
  if (words.length >= 2) {
    return { status: "off_topic", reason: "unrelated_general_chat" };
  }

  return { status: "in_scope" };
}

// ============================================================================
// 3. AKTİF DURAK ÇÖZÜMLEYİCİ VE GİZLİ CEVAP KORUMASI
// ============================================================================
function buildAuthoritativeStopContext(clientCtx = {}) {
  const unitNo = Number(clientCtx.unitNo || 1);
  const stopId = Number(clientCtx.stopId || 1);

  const serverUnit = curriculumState.unitsByNo.get(unitNo) || null;
  const serverStop = serverUnit && Array.isArray(serverUnit.stops)
    ? serverUnit.stops.find(s => Number(s.id) === stopId)
    : null;
  const serverKaz = serverUnit && serverStop && Array.isArray(serverUnit.kazanimlar)
    ? serverUnit.kazanimlar.find(k => k.id === serverStop.kazanimId)
    : null;

  const stop = serverStop || clientCtx.stop || {};
  const unitTitle = (serverUnit && serverUnit.title) || clientCtx.unitTitle || "Çarpanlar ve Katlar";
  const kazTitle = (serverKaz && serverKaz.title) || clientCtx.kazTitle || stop.title || "";
  const stopTitle = stop.title || clientCtx.stopTitle || "Etkinlik";
  const stopType = stop.type || clientCtx.stopType || "concept";

  // Durağın öğrenciye görünen metnini ve gizli doğru cevaplarını çıkar
  const problemLines = [];
  const forbiddenRevealTokens = [];

  if (stop.subtitle) {
    problemLines.push(`Alt Başlık: ${stripHtmlServer(stop.subtitle)}`);
  }
  if (Array.isArray(stop.explanation) && stop.explanation.length > 0) {
    problemLines.push(`Konu Açıklaması: ${stop.explanation.map(stripHtmlServer).join(" ")}`);
  }
  if (stop.sentenceHtml) {
    let readableSentence = stripHtmlServer(stop.sentenceHtml);
    if (Array.isArray(stop.blanks)) {
      stop.blanks.forEach((b, idx) => {
        readableSentence = readableSentence.replace(`{${b.id}}`, `[${idx + 1}. Boşluk — Seçenekler: ${(b.choices || []).join(", ")}]`);
        if (b.correct !== undefined) {
          forbiddenRevealTokens.push(String(b.correct).trim());
        }
      });
    }
    problemLines.push(`Boşluk Doldurma Cümlesi: ${readableSentence}`);
  }
  if (stop.stem) {
    problemLines.push(`Soru Kökü: ${stripHtmlServer(stop.stem)}`);
  }
  if (Array.isArray(stop.options) && stop.options.length > 0) {
    const optsStr = stop.options.map(o => `${o.letter}) ${stripHtmlServer(o.text)}`).join(" | ");
    problemLines.push(`Şıklar: ${optsStr}`);
    if (stop.correctLetter) {
      const cOpt = stop.options.find(o => o.letter === stop.correctLetter);
      if (cOpt) {
        forbiddenRevealTokens.push(`${stop.correctLetter} şıkkı`);
        forbiddenRevealTokens.push(`Cevap ${stop.correctLetter}`);
      }
    }
  }
  if (stop.quickQuestion) {
    problemLines.push(`Video Doğrulama Sorusu: ${stripHtmlServer(stop.quickQuestion)}`);
    if (Array.isArray(stop.quickOptions)) {
      problemLines.push(`Seçenekler: ${stop.quickOptions.map(stripHtmlServer).join(" | ")}`);
    }
    if (stop.quickCorrect) {
      forbiddenRevealTokens.push(stripHtmlServer(stop.quickCorrect));
    }
  }
  if (stop.targetNumber) {
    problemLines.push(`Hedef Sayı: ${stop.targetNumber}`);
  }
  if (stop.hint) {
    problemLines.push(`Pedagojik İpucu: ${stripHtmlServer(stop.hint)}`);
  }

  // Aynı kazanımın temel kavram özeti varsa ekle
  if (serverUnit && serverStop && (!stop.explanation || stop.explanation.length === 0)) {
    const conceptPeer = (serverUnit.stops || []).find(
      s => s.kazanimId === serverStop.kazanimId && s.type === "concept" && Array.isArray(s.explanation)
    );
    if (conceptPeer) {
      problemLines.push(`Kazanım Temel Bilgisi: ${conceptPeer.explanation.map(stripHtmlServer).join(" ")}`);
    }
  }

  let secretAnswerSummary = "";
  if (Array.isArray(stop.blanks) && stop.blanks.length > 0) {
    secretAnswerSummary = stop.blanks.map((b, i) => `${i + 1}. Boşluk=${b.correct}`).join(", ");
  } else if (stop.correctLetter && Array.isArray(stop.options)) {
    const cOpt = stop.options.find(o => o.letter === stop.correctLetter);
    secretAnswerSummary = `${stop.correctLetter}) ${cOpt ? stripHtmlServer(cOpt.text) : ""}`;
  } else if (stop.quickCorrect) {
    secretAnswerSummary = stripHtmlServer(stop.quickCorrect);
  }

  return {
    unitNo,
    stopId,
    unitTitle,
    kazTitle,
    stopTitle,
    stopType,
    problemText: problemLines.join("\n"),
    secretAnswerSummary,
    forbiddenRevealTokens
  };
}

function gcd(a, b) {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x;
}

function computeSymbolicMathFacts(questionText, stopInfo) {
  const qNums = (String(questionText || "").match(/\b\d{1,4}\b/g) || [])
    .map(n => parseInt(n, 10))
    .filter(n => n > 0 && n <= 5000);
  const ctxNums = (String(stopInfo.problemText || "").match(/\b\d{1,4}\b/g) || [])
    .map(n => parseInt(n, 10))
    .filter(n => n > 1 && n <= 5000);

  const uniqueQ = [...new Set(qNums)].slice(0, 3);
  const uniqueAll = [...new Set([...uniqueQ, ...ctxNums.slice(0, 3)])].slice(0, 4);
  if (uniqueQ.length === 0 || uniqueAll.length < 2) return "";

  const facts = [];
  for (let i = 0; i < uniqueAll.length; i++) {
    for (let j = i + 1; j < uniqueAll.length; j++) {
      const small = Math.min(uniqueAll[i], uniqueAll[j]);
      const big = Math.max(uniqueAll[i], uniqueAll[j]);
      if (small <= 1 || big === small) continue;
      if (!uniqueQ.includes(small) && !uniqueQ.includes(big)) continue;

      const rem = big % small;
      if (rem === 0) {
        const q = big / small;
        facts.push(
          `${big} ÷ ${small} = ${q} (kalan 0, tam bölünür). Yani küçük sayı olan ${small}, ${big} sayısının bir ÇARPANIDIR (bölenidir); büyük sayı olan ${big} ise ${small} sayısının ${q} KATIDIR.`
        );
      } else {
        facts.push(
          `${big} ÷ ${small} işleminde bölüm ${Math.floor(big / small)}, kalan ${rem} olur (kalan 0 değildir, kalansız bölünmez; yani ${small}, ${big}'nin çarpanı değildir).`
        );
      }
      if (facts.length >= 2) break;
    }
    if (facts.length >= 2) break;
  }

  if (uniqueQ.length === 2 && uniqueQ[0] > 1 && uniqueQ[1] > 1) {
    const eb = gcd(uniqueQ[0], uniqueQ[1]);
    const ek = (uniqueQ[0] * uniqueQ[1]) / eb;
    if (ek <= 100000) {
      facts.push(`EBOB(${uniqueQ[0]}, ${uniqueQ[1]}) = ${eb}, EKOK(${uniqueQ[0]}, ${uniqueQ[1]}) = ${ek}.`);
    }
  }

  return facts.join(" ");
}

function buildSocraticDirectRefusal(stopInfo) {
  const hintClean = (stopInfo.problemText.match(/Pedagojik İpucu:\s*(.+)/) || [])[1]
    || "Sayıların birbirini tam bölüp bölmediğine birlikte bakalım.";
  return `Cevabı hemen söylersem kendi bulma keyfini kaçırırız 😊 İpucu: *${hintClean.slice(0, 125)}* Sence ilk adımda hangi sayıyı denemeliyiz?`;
}

function enforceConciseKidReply(text) {
  let clean = String(text || "").replace(/\s+/g, " ").trim();
  if (!clean) return clean;
  // Madde işaretlerini düz cümleye çevir
  clean = clean.replace(/(?:^|\s)[•\-*]\s+/g, " ").replace(/\s+/g, " ").trim();
  // En fazla 2 anlamlı cümle tut (10-11 yaş için tek bakışta okunur boyut: ~20-40 kelime)
  const sentences = clean.match(/[^.!?]+[.!?]+|[^.!?]+$/g);
  if (sentences && sentences.length > 2) {
    const qSent = sentences.find(s => s.includes("?"));
    if (qSent && sentences.indexOf(qSent) >= 2) {
      clean = `${sentences[0].trim()} ${qSent.trim()}`;
    } else {
      clean = sentences.slice(0, 2).map(s => s.trim()).join(" ");
    }
  }
  return clean.trim();
}

function maskAccidentalAnswerLeak(replyText, stopInfo, scopeCheck) {
  let out = String(replyText || "").trim();
  if (!out) return out;

  // Eğer numaralı boşluk listesi ("1. Boşluğa...", "1. boşluk: ...") veya doğrudan şık ifşası üretildiyse engelle
  if (
    /\b\d+\.\s*boşlu(ğa|k)\s*[:=-]?/i.test(out) ||
    /\bboşluğa\s+\*\*?[a-zğüşıöç0-9]+\*\*?\s+(yaz|gelir|gelecek|koy)/i.test(out)
  ) {
    return buildSocraticDirectRefusal(stopInfo);
  }

  if (scopeCheck && scopeCheck.wantsDirectAnswer && Array.isArray(stopInfo.forbiddenRevealTokens)) {
    const lowerOut = trLower(out);
    const leakedCount = stopInfo.forbiddenRevealTokens.filter(t => t && t.length >= 3 && lowerOut.includes(trLower(t))).length;
    if (leakedCount >= 2) {
      return buildSocraticDirectRefusal(stopInfo);
    }
  }

  out = out.replace(/\b(doğru\s*(cevap|şık|seçenek)|cevabımız)\s*[:=-]?\s*([ABCD])\s*(şıkkı|seçeneği)?\b/gi, "aradığımız doğru seçenek");

  if (stopInfo.stopType === "concept" && Array.isArray(stopInfo.forbiddenRevealTokens)) {
    for (const token of stopInfo.forbiddenRevealTokens) {
      if (!token || token.length < 3) continue;
      const leakRe = new RegExp(`(boşluğa|boşluk\\s*için|cevap\\s*olarak)\\s*["'*]*${token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["'*]*\\s*(gelir|gelecek|yazmalısın|seçmelisin|olmalıdır|yaz)`, "gi");
      out = out.replace(leakRe, "$1 bu kurala uyan kavram $2");
    }
  }
  return enforceConciseKidReply(out);
}

// ============================================================================
// 4. OLLAMA YÖNETİMİ VE CANLI MODEL ÇAĞRISI
// ============================================================================
let activeModelName = PRIMARY_MODEL;
let ollamaReady = false;

function getOllamaExePath() {
  const localAppData = process.env.LOCALAPPDATA || "";
  const candidate = path.join(localAppData, "Programs", "Ollama", "ollama.exe");
  if (candidate && fs.existsSync(candidate)) return candidate;
  return "ollama";
}

async function ensureOllamaReady() {
  try {
    const resp = await fetch(`${OLLAMA_BASE}/api/tags`, { signal: AbortSignal.timeout(2500) });
    if (resp.ok) {
      const data = await resp.json();
      const names = (data.models || []).map(m => m.name);
      if (names.some(n => n.startsWith(PRIMARY_MODEL))) {
        activeModelName = PRIMARY_MODEL;
      } else {
        const foundFallback = FALLBACK_MODELS.find(fm => names.some(n => n.startsWith(fm)));
        if (foundFallback) activeModelName = foundFallback;
      }
      ollamaReady = true;
      return true;
    }
  } catch (_) {
    // Ollama çalışmıyorsa arka planda başlatmayı dene
    try {
      const exe = getOllamaExePath();
      const child = spawn(exe, ["serve"], { detached: true, stdio: "ignore", windowsHide: true });
      child.unref();
      await new Promise(r => setTimeout(r, 2000));
      const retry = await fetch(`${OLLAMA_BASE}/api/tags`, { signal: AbortSignal.timeout(2500) });
      if (retry.ok) {
        ollamaReady = true;
        return true;
      }
    } catch (e2) {
      ollamaReady = false;
    }
  }
  return false;
}

async function warmUpModel() {
  const ok = await ensureOllamaReady();
  if (!ok) return;
  try {
    await fetch(`${OLLAMA_BASE}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: activeModelName,
        stream: false,
        keep_alive: "24h",
        messages: [{ role: "user", content: "Selam" }],
        options: { num_ctx: 768, num_thread: 14, num_predict: 4 }
      }),
      signal: AbortSignal.timeout(25000)
    });
    console.log(`[NarTES AI] Yerel model '${activeModelName}' belleğe ısındırıldı (keep_alive: 24h).`);
  } catch (err) {
    console.warn("[NarTES AI] Model ısındırma uyarısı:", err.message);
  }
}

function buildMessagesForOllama(payload, stopInfo, scopeCheck) {
  const wrongChoices = Array.isArray(payload.wrongChoices) ? payload.wrongChoices : [];
  const messages = [];

  // Maksimum hız (~0.6 sn ilk kelime) için özlü ~65 tokenlık durak özeti
  const verifiedMathFacts = computeSymbolicMathFacts(payload.question, stopInfo);
  const coreLine = stopInfo.problemText
    .split("\n")
    .find(l => l.startsWith("Soru Kökü:") || l.startsWith("Boşluk Doldurma") || l.startsWith("Video Doğrulama") || l.startsWith("Pedagojik İpucu:"))
    || stopInfo.problemText.split("\n")[0]
    || stopInfo.stopTitle;
  const hintLine = stopInfo.problemText
    .split("\n")
    .find(l => l.startsWith("Pedagojik İpucu:")) || "";

  const safeCore = scopeCheck.wantsDirectAnswer
    ? coreLine.replace(/—\s*Seçenekler:[^\]]+/g, "")
    : coreLine;

  const userTurnLines = [
    `[DURAK] ${stopInfo.stopTitle}: ${safeCore.slice(0, 165)}`,
    hintLine && hintLine !== coreLine ? hintLine.slice(0, 110) : "",
    verifiedMathFacts ? `Bilgi: ${verifiedMathFacts.slice(0, 100)}` : "",
    wrongChoices.length > 0 ? `Yanlış deneme: ${wrongChoices.slice(-2).join(", ")}` : "",
    `Öğrenci (10-11 yaş): ${String(payload.question || "").trim().slice(0, 140)}`
  ].filter(Boolean);

  messages.push({
    role: "user",
    content: userTurnLines.join("\n")
  });

  return messages;
}

let guardrailRotateIdx = 0;
function buildImmediateGuardrailReply(status, stopInfo) {
  guardrailRotateIdx = (guardrailRotateIdx + 1) % 4;
  if (status === "empty") {
    return `Seni dinliyorum! 😊 **${stopInfo.stopTitle}** adımında takıldığın sayıyı kısaca sorabilirsin.`;
  }
  if (status === "profanity") {
    return `Ben **Bilge NarTES**, senin matematik arkadaşınım; hep güzel ve nazik konuşalım 😊 Şimdi **${stopInfo.stopTitle}** sorusundaki hangi sayıya birlikte bakalım?`;
  }

  const offTopicPool = [
    `Bu konu eğlenceli ama ben sadece **Matematik** rehberinim! 😊 Şu anki **"${stopInfo.stopTitle}"** sorusunda hangi adım kafanı karıştırdı?`,
    `Ben yalnızca matematik yolculuğunda sana yardım edebiliyorum 🧭 Gel ekrandaki **"${stopInfo.stopTitle}"** sorusunda ilk hangi sayıyı kullanacağımızı bulalım mı?`,
    `Sohbet güzel ama şimdi hedefimiz bu durağı çözmek! ✨ **"${stopInfo.stopTitle}"** sorusunda sence ilk ipucu hangi sayıda gizli?`,
    `Benim uzmanlığım sadece matematik soruları 📐 **"${stopInfo.stopTitle}"** etkinliğinde hangi seçeneği birlikte inceleyelim?`
  ];
  return offTopicPool[guardrailRotateIdx % offTopicPool.length];
}

// ============================================================================
// 5. HTTP API VE STATİK DOSYA SUNUCUSU
// ============================================================================
function readJsonBody(req, maxBytes = 64 * 1024) {
  return new Promise((resolve, reject) => {
    let total = 0;
    const chunks = [];
    req.on("data", chunk => {
      total += chunk.length;
      if (total > maxBytes) {
        reject(new Error("İstek gövdesi çok büyük"));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => {
      try {
        const raw = Buffer.concat(chunks).toString("utf8");
        resolve(raw ? JSON.parse(raw) : {});
      } catch (e) {
        reject(new Error("Geçersiz JSON"));
      }
    });
    req.on("error", reject);
  });
}

async function handleNartesChat(req, res) {
  let payload;
  try {
    payload = await readJsonBody(req);
  } catch (err) {
    res.writeHead(400, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({ ok: false, error: err.message }));
    return;
  }

  const question = String(payload.question || "").trim();
  const stopInfo = buildAuthoritativeStopContext(payload.context || {});
  const scopeCheck = detectScopeAndIntent(question, stopInfo);
  const wantStream = payload.stream !== false;

  // 1) Küfür veya Ders Dışı (Off-Topic) ise modele gitmeden anında ders bağlamına kilitle
  if (scopeCheck.status === "empty" || scopeCheck.status === "profanity" || scopeCheck.status === "off_topic") {
    const blockedReply = buildImmediateGuardrailReply(scopeCheck.status, stopInfo);
    if (wantStream) {
      res.writeHead(200, {
        "Content-Type": "application/x-ndjson; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "Connection": "keep-alive"
      });
      res.write(JSON.stringify({ type: "meta", guardrail: scopeCheck.status, model: "nartes-guardrail" }) + "\n");
      res.write(JSON.stringify({ type: "delta", text: blockedReply }) + "\n");
      res.end(JSON.stringify({ type: "done", fullText: blockedReply, model: "nartes-guardrail" }) + "\n");
    } else {
      res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({ ok: true, reply: blockedReply, guardrail: scopeCheck.status, model: "nartes-guardrail" }));
    }
    return;
  }

  // 2) Yerel Ollama modelini kontrol et ve Sokratik yanıt üret
  const isUp = ollamaReady || (await ensureOllamaReady());
  if (!isUp) {
    res.writeHead(503, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({ ok: false, error: "Yerel yapay zeka motoru (Ollama) şu an yanıt vermiyor." }));
    return;
  }

  const messages = buildMessagesForOllama(payload, stopInfo, scopeCheck);

  try {
    const ollamaResp = await fetch(`${OLLAMA_BASE}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: activeModelName,
        stream: wantStream,
        keep_alive: "24h",
        messages,
        options: {
          num_ctx: 768,
          temperature: 0.32,
          top_p: 0.85,
          repeat_penalty: 1.15,
          num_predict: 62,
          num_thread: 14,
          stop: ["\n\n", "1. Boşluk", "1. boşluk"]
        }
      }),
      signal: AbortSignal.timeout(35000)
    });

    if (!ollamaResp.ok || !ollamaResp.body) {
      throw new Error(`Ollama HTTP ${ollamaResp.status}`);
    }

    if (!wantStream) {
      const data = await ollamaResp.json();
      const rawReply = (data && data.message && data.message.content) || "";
      const safeReply = maskAccidentalAnswerLeak(rawReply, stopInfo, scopeCheck);
      res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({ ok: true, reply: safeReply, model: activeModelName }));
      return;
    }

    // NDJSON Canlı Akış (Streaming — Anında ilk kelime iletimi)
    if (res.socket && typeof res.socket.setNoDelay === "function") {
      res.socket.setNoDelay(true);
    }
    res.writeHead(200, {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "Connection": "keep-alive",
      "X-Accel-Buffering": "no"
    });
    if (typeof res.flushHeaders === "function") res.flushHeaders();
    res.write(JSON.stringify({ type: "meta", model: activeModelName, unitNo: stopInfo.unitNo, stopId: stopInfo.stopId }) + "\n");

    const decoder = new TextDecoder("utf-8");
    let buffer = "";
    let fullText = "";

    for await (const chunk of ollamaResp.body) {
      buffer += decoder.decode(chunk, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (!line.trim()) continue;
        try {
          const parsed = JSON.parse(line);
          const piece = parsed && parsed.message && parsed.message.content ? parsed.message.content : "";
          if (piece) {
            fullText += piece;
            // Öğrenci doğrudan cevap istediyse olası sızıntıyı önlemek için done aşamasında temizlenmiş metni gönder
            if (!scopeCheck.wantsDirectAnswer) {
              res.write(JSON.stringify({ type: "delta", text: piece }) + "\n");
            }
          }
        } catch (_) {}
      }
    }

    const sanitizedFull = maskAccidentalAnswerLeak(fullText, stopInfo, scopeCheck);
    if (scopeCheck.wantsDirectAnswer) {
      res.write(JSON.stringify({ type: "delta", text: sanitizedFull }) + "\n");
    }
    res.end(JSON.stringify({ type: "done", fullText: sanitizedFull, model: activeModelName }) + "\n");
  } catch (err) {
    console.error("[NarTES AI] Yanıt hatası:", err.message);
    if (!res.headersSent) {
      res.writeHead(502, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({ ok: false, error: err.message }));
    } else {
      res.end(JSON.stringify({ type: "error", error: err.message }) + "\n");
    }
  }
}

function serveStaticFile(req, res, pathname) {
  const relPath = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
  const safePath = path.normalize(path.join(ROOT_DIR, relPath));

  if (!safePath.startsWith(ROOT_DIR)) {
    res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Erişim reddedildi");
    return;
  }

  fs.stat(safePath, (err, stat) => {
    if (err || !stat.isFile()) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Dosya bulunamadı");
      return;
    }

    const ext = path.extname(safePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";

    res.writeHead(200, {
      "Content-Type": contentType,
      "Cache-Control": "no-cache"
    });

    if (req.method === "HEAD") {
      res.end();
      return;
    }

    const stream = fs.createReadStream(safePath);
    stream.on("error", () => {
      if (!res.headersSent) res.writeHead(500);
      res.end();
    });
    stream.pipe(res);
  });
}

// Başlangıç hazırlıkları
loadPlatformUnitsAndDocs();

function applyCorsHeaders(req, res) {
  const origin = req.headers.origin || "*";
  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Private-Network", "true");
}

const server = http.createServer(async (req, res) => {
  try {
    applyCorsHeaders(req, res);

    if (req.method === "OPTIONS") {
      res.writeHead(204);
      res.end();
      return;
    }

    const urlObj = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
    const pathname = decodeURIComponent(urlObj.pathname);

    if (pathname === "/api/nartes/health" && req.method === "GET") {
      const ok = ollamaReady || (await ensureOllamaReady());
      res.writeHead(200, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-cache" });
      res.end(JSON.stringify({
        ok,
        mode: "local-server-ai",
        apiKeyRequired: false,
        model: activeModelName,
        indexedUnits: curriculumState.unitsByNo.size,
        indexedChunks: curriculumState.chunks.length
      }));
      return;
    }

    if (pathname === "/api/nartes/chat" && req.method === "POST") {
      await handleNartesChat(req, res);
      return;
    }

    if (req.method !== "GET" && req.method !== "HEAD") {
      res.writeHead(405, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("İzin verilmeyen metot");
      return;
    }

    serveStaticFile(req, res, pathname);
  } catch (err) {
    if (!res.headersSent) {
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    }
    res.end("Sunucu hatası");
  }
});

server.listen(PORT, HOST, () => {
  console.log(`=============================================================`);
  console.log(`🚀 Nartes+ Web & Yerel Yapay Zeka Sunucusu Çalışıyor!`);
  console.log(`🌐 Adres: http://localhost:${PORT}`);
  console.log(`🧠 Yerel AI: ${PRIMARY_MODEL} (API Anahtarsız • %100 Lokal)`);
  console.log(`=============================================================`);
  warmUpModel();
});
