/**
 * Nartes+ Yerel Web ve Sokratik Yapay Zeka Sunucusu (Gemma 4 E4B Hızlı Sokratik Motor • API Anahtarsız • %100 Lokal)
 * - Port 8080 üzerinden NartestPlus arayüzünü ve /api/nartes/* Sokratik AI uç noktalarını sunar.
 * - Yerel Ollama (nartes-sokratik / gemma4:e4b) motoruna bağlanarak API anahtarı olmadan
 *   8. Sınıf LGS Matematik müfredatına, aktif durağa, şıklara ve gizli öğretmen çözümüne hakim,
 *   çok turlu hafızaya ve temel işlem hikayesine inen sınırsız Sokratik rehberlik üretir.
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
const FALLBACK_MODELS = ["gemma4:e4b", "gemma4:e2b", "gemma4:26b", "gemma3:4b", "qwen2.5:7b", "qwen2.5:3b"];

const SYSTEM_SOCRATIC_PROMPT = [
  "Sen Nartes+ 8. Sınıf LGS Matematik Sokratik öğretmeni Bilge NarTES'sin.",
  "KESİN KURALLAR:",
  "1. EN FAZLA 25 KELİME YAZ (1 veya 2 çok kısa cümle). Samimi, sıcak, içten konuş; her seferinde farklı cümleler kur.",
  "2. TANIŞMA VE HAL HATIR: Öğrenci sadece 'Merhaba/Selam' derse matematik sorusu sorma; 'Merhaba, nasılsın?' diyerek tanış. 'Nasılsın? / İyi misin?' sorusuna 'İyiyim, sen nasılsın?' de ve matematik çalışmasıyla ilgili olumlu bir cümle kur.",
  "3. Doğru şıkkı (A/B/C/D) veya nihai cevabı ASLA söyleme; [ÖĞRETMEN ÇÖZÜM NOTU] bilgisini sadece kendi zihninde kullan.",
  "4. Her yanıtta öğrenciyi içten ve sıcak biçimde motive et; elma, pasta, lunapark gibi alakasız hikayeler KURMA.",
  "5. AKTİF EKRAN BAĞLILIĞI: Sana verilen [AKTİF EKRAN GÖREVİ] bloğundaki sayılar ve soru KESİN GERÇEKTİR. Önceki sayfalardaki başka sayıları (örneğin 36 açıkken 24'ü) ASLA kullanma.",
  "6. Öğrenci konu dışına çıkarsa kısaca ekrandaki aktif soruya bağla; üst üste hata yaptıkça cümle tekrarlamadan en temel çarpma/bölme/toplama adımını sor."
].join("\n");

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
// 1. TÜRKÇE METİN YARDIMCILARI VE MÜFREDAT BİLGİ TABANI (RAG + SMARTBOARD EŞLEŞME)
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
    .replace(/&quot;/gi, '"')
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

// app.js ile birebir aynı Uygulama Zamanı (Akıllı Tahta) durak enjeksiyonu (Durak numaralarının %100 eşleşmesi için kritik!)
function injectSmartboardStopsIntoUnits(units, bank) {
  const sbBank = bank || {};
  units.forEach(unit => {
    if (!unit || unit._smartboardInjected) return;
    const unitBank = sbBank[unit.id];
    if (!unitBank) return;

    const rebuiltStops = [];
    (unit.kazanimlar || []).forEach(kaz => {
      const currentKazStops = (unit.stops || []).filter(s => s.kazanimId === kaz.id);
      const rawEntry = unitBank[kaz.id];
      const sbEntries = Array.isArray(rawEntry) ? rawEntry : (rawEntry ? [rawEntry] : []);

      const buildSbStop = (sbEntry, idx) => ({
        id: 0,
        kazanimId: kaz.id,
        boardId: sbEntry.boardId || `${kaz.id}_sb_${idx + 1}`,
        type: "smartboard",
        icon: sbEntry.icon || "✏️",
        roadLabel: sbEntry.roadLabel || "Uygula",
        typeLabel: sbEntry.typeLabel || "Uygulama Zamanı",
        title: sbEntry.title || `Uygulama Zamanı: ${kaz.title}`,
        subtitle: sbEntry.subtitle || "Öğrendiklerini akıllı tahtada kaleminle uygulayarak pekiştir!",
        variantPacks: sbEntry.variantPacks || null,
        questions: sbEntry.questions
      });

      const beforeFinalEntries = sbEntries.filter(e => e && e.insertBeforeFinalGame && Array.isArray(e.questions) && e.questions.length > 0);
      const endEntries = sbEntries.filter(e => e && !e.insertBeforeFinalGame && Array.isArray(e.questions) && e.questions.length > 0);

      currentKazStops.forEach((s, sIdx) => {
        const isLastGame = sIdx === currentKazStops.length - 1 && s.type === "game" && beforeFinalEntries.length > 0;
        if (isLastGame) {
          beforeFinalEntries.forEach((sbEntry, bIdx) => rebuiltStops.push(buildSbStop(sbEntry, bIdx)));
        }
        rebuiltStops.push(s);
      });

      if (beforeFinalEntries.length > 0 && !(currentKazStops.length > 0 && currentKazStops[currentKazStops.length - 1].type === "game")) {
        beforeFinalEntries.forEach((sbEntry, bIdx) => rebuiltStops.push(buildSbStop(sbEntry, bIdx)));
      }

      endEntries.forEach((sbEntry, eIdx) => {
        rebuiltStops.push(buildSbStop(sbEntry, beforeFinalEntries.length + eIdx));
      });
    });

    rebuiltStops.forEach((s, idx) => {
      s.id = idx + 1;
    });
    unit.stops = rebuiltStops;
    (unit.kazanimlar || []).forEach(kaz => {
      kaz.stops = rebuiltStops.filter(s => s.kazanimId === kaz.id).map(s => s.id);
    });
    unit._smartboardInjected = true;
  });
}

function loadPlatformUnitsAndDocs() {
  try {
    const sandbox = { window: {} };
    vm.createContext(sandbox);

    const u1Path = path.join(ROOT_DIR, "data", "carpanlar_katlar_data.js");
    const u2Path = path.join(ROOT_DIR, "data", "lgs_uniteler_2_12.js");
    const sbPath = path.join(ROOT_DIR, "data", "akilli_tahta_sorular.js");

    if (fs.existsSync(u1Path)) {
      vm.runInContext(fs.readFileSync(u1Path, "utf8"), sandbox);
    }
    if (fs.existsSync(u2Path)) {
      vm.runInContext(fs.readFileSync(u2Path, "utf8"), sandbox);
    }
    if (fs.existsSync(sbPath)) {
      vm.runInContext(fs.readFileSync(sbPath, "utf8"), sandbox);
    }

    const allUnits = [];
    if (sandbox.window.MATFLOW_UNIT) allUnits.push(sandbox.window.MATFLOW_UNIT);
    if (Array.isArray(sandbox.window.MATFLOW_UNITS_2_12)) {
      allUnits.push(...sandbox.window.MATFLOW_UNITS_2_12);
    }

    injectSmartboardStopsIntoUnits(allUnits, sandbox.window.NARTES_SMARTBOARD_BANK);

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
            text: bodyParts.slice(0, 700),
            tokens: new Set(tokenizeTr(bodyParts))
          });
        }
      }
    }

    // 8. Sınıf Maarif / MEB Markdown kaynaklarını da indeksle
    const mdDirs = [
      path.join(ROOT_DIR, "kaynakPDF_MD", "03_Maarif_Modeli", "8-sinif")
    ];

    for (const dir of mdDirs) {
      if (!fs.existsSync(dir)) continue;
      const files = fs.readdirSync(dir).filter(f => f.endsWith(".md"));
      for (const file of files) {
        const fullPath = path.join(dir, file);
        const content = fs.readFileSync(fullPath, "utf8");
        const paragraphs = content
          .split(/\n{2,}/)
          .map(p => p.replace(/[#>*_`|-]/g, " ").replace(/\s+/g, " ").trim())
          .filter(p => p.length >= 80 && p.length <= 900);

        for (let i = 0; i < Math.min(paragraphs.length, 50); i++) {
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

function retrieveRelevantCurriculumNotes(queryText, unitNo, stopTitle, limit = 1) {
  const qTokens = tokenizeTr(`${queryText} ${stopTitle || ""}`);
  if (qTokens.length === 0 || curriculumState.chunks.length === 0) return [];

  const scored = [];
  for (const chunk of curriculumState.chunks) {
    let score = 0;
    if (unitNo && chunk.unitNo === Number(unitNo)) score += 2.2;
    for (const qt of qTokens) {
      if (chunk.tokens.has(qt)) score += qt.length >= 5 ? 2.0 : 1.0;
    }
    if (score >= 4.0) {
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
  /hangi\s*(şık|seçenek)\s*doğru/i,
  /direkt\s*(söyle|çöz|ver|cevap|yaz)/i,
  /boşlu(ğa|klara).*?(ne\s*(gelecek|gelir|yaz)|söyle|yaz)/i,
  /ne\s*yazacağımı.*?(söyle|ver)/i,
  /şıkkı\s*söyle/i,
  /sadece\s*cevab/i,
  /uğraştırma.*?(söyle|çöz|ver)/i
];

function hasProfanity(text) {
  const lower = trLower(text);
  return PROFANITY_WORDS.some(w => {
    const re = new RegExp(`(^|[^a-z0-9ğüşıöç])${w}([^a-z0-9ğüşıöç]|$)`, "i");
    return re.test(lower);
  });
}

function detectScopeAndIntent(questionText) {
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
  return { status: "in_scope", wantsDirectAnswer };
}

// ============================================================================
// 3. AKTİF DURAK ÇÖZÜMLEYİCİ, ÖĞRETMEN ÇÖZÜM REFERANSI VE CEVAP KORUMASI
// ============================================================================
function buildAuthoritativeStopContext(clientCtx = {}, payload = {}) {
  const unitNo = Number(clientCtx.unitNo || 1);
  const stopId = Number(clientCtx.stopId || 1);

  const serverUnit = curriculumState.unitsByNo.get(unitNo) || null;
  const serverStop = serverUnit && Array.isArray(serverUnit.stops)
    ? serverUnit.stops.find(s => Number(s.id) === stopId)
    : null;
  const serverKaz = serverUnit && serverStop && Array.isArray(serverUnit.kazanimlar)
    ? serverUnit.kazanimlar.find(k => k.id === serverStop.kazanimId)
    : null;

  // Canlı Ekrandan Gelen Dinamik Görev (Varyant / Alt Aşama / Aktif Soru) — HER ZAMAN ÖNCELİKLİDİR
  const liveTask = payload && payload.liveTask && typeof payload.liveTask === "object" ? payload.liveTask : null;
  if (liveTask && (liveTask.promptText || liveTask.taskTitle || (Array.isArray(liveTask.numbers) && liveTask.numbers.length > 0))) {
    const unitTitle = (serverUnit && serverUnit.title) || clientCtx.unitTitle || "Çarpanlar ve Katlar";
    const kazTitle = clientCtx.kazTitle || (serverKaz && serverKaz.title) || "";
    const stopTitle = liveTask.taskTitle || clientCtx.stopTitle || "Etkinlik";
    const pLines = [];
    const tNotes = [];
    const forbidden = [];
    const nums = Array.isArray(liveTask.numbers)
      ? liveTask.numbers.map(Number).filter(n => Number.isFinite(n) && n >= 2 && n <= 5000)
      : [];
    if (liveTask.targetNumber) {
      pLines.push(`Aktif Hedef Sayı: ${liveTask.targetNumber}`);
    }
    if (nums.length > 0) {
      pLines.push(`Ekrandaki Aktif Sayılar: ${nums.join(", ")}`);
    }
    if (liveTask.promptText) {
      pLines.push(`Aktif Soru / Görev: ${stripHtmlServer(liveTask.promptText)}`);
    }
    if (Array.isArray(liveTask.options) && liveTask.options.length > 0) {
      pLines.push(`Seçenekler: ${liveTask.options.map(stripHtmlServer).join(" | ")}`);
    }
    if (payload.liveScreen && payload.liveScreen.methodTitle) {
      pLines.push(`Açık Yöntem: ${payload.liveScreen.methodTitle}${payload.liveScreen.activeSlotLabel ? " — Seçili Kutu: " + payload.liveScreen.activeSlotLabel : ""}`);
    }
    if (liveTask.hint) {
      tNotes.push(`Pedagojik İpucu: ${stripHtmlServer(liveTask.hint)}`);
    }
    if (liveTask.solution) {
      tNotes.push(`Öğretmen Çözüm Notu (CEVABI SÖYLEME): ${stripHtmlServer(liveTask.solution)}`);
    }
    if (liveTask.correctAnswer !== undefined && liveTask.correctAnswer !== null && String(liveTask.correctAnswer).trim()) {
      const ca = stripHtmlServer(String(liveTask.correctAnswer));
      tNotes.push(`Doğru Yanıt (SÖYLEME): ${ca}`);
      forbidden.push(ca);
    }
    if (Array.isArray(liveTask.missingTargets)) {
      const mList = liveTask.missingTargets.map(m => m.answer).filter(Boolean);
      if (mList.length) {
        tNotes.push(`Eksik Boşlukların Doğrusu (SÖYLEME): ${mList.join(", ")}`);
        mList.forEach(a => forbidden.push(String(a)));
      }
    }
    return {
      unitNo,
      stopId,
      unitTitle,
      kazTitle,
      stopTitle,
      stopType: clientCtx.stopType || "activity",
      problemText: pLines.join("\n"),
      teacherReference: tNotes.join("\n"),
      forbiddenRevealTokens: forbidden,
      liveNumbers: nums.length > 0 ? nums : (liveTask.targetNumber ? [Number(liveTask.targetNumber)] : []),
      liveSignature: liveTask.signature || ""
    };
  }

  // Aktif alt soru numarasını hem üst düzeyden hem stop içinden güvenli oku
  const qIdx = typeof clientCtx.activeQuestionIndex === "number"
    ? clientCtx.activeQuestionIndex
    : (clientCtx.stop && typeof clientCtx.stop.activeQuestionIndex === "number" ? clientCtx.stop.activeQuestionIndex : 0);

  // Smartboard, Çoklu Destek Sorusu (questionPack) veya istemciden gelen aktif alt soru varsa birleştir
  let stop = Object.assign({}, serverStop || {}, clientCtx.stop || {});
  if (serverStop && serverStop.type === "smartboard" && Array.isArray(serverStop.questions)) {
    const sbQ = serverStop.questions[qIdx] || serverStop.questions[0];
    if (sbQ) {
      stop = Object.assign({}, serverStop, {
        type: "question",
        isSmartboard: true,
        activeQuestionIndex: qIdx,
        title: `${serverStop.title} (${qIdx + 1}. Soru${sbQ.categoryTag ? " • " + sbQ.categoryTag : ""})`,
        stem: [sbQ.stem || "", sbQ.questionPrompt || ""].filter(Boolean).join(" "),
        options: sbQ.options || [],
        correctLetter: sbQ.correctLetter,
        hint: sbQ.hint || "",
        solution: sbQ.solution || ""
      });
    }
  } else if (serverStop && serverStop.type === "question" && Array.isArray(serverStop.questionPack) && serverStop.questionPack.length > 0) {
    const packQ = serverStop.questionPack[qIdx] || serverStop.questionPack[0];
    if (packQ) {
      stop = Object.assign({}, serverStop, packQ, clientCtx.stop || {}, {
        type: "question",
        activeQuestionIndex: qIdx,
        title: `${serverStop.title} (${packQ.badge || `${qIdx + 1}. Destek Sorusu`})`
      });
    }
  }

  const unitTitle = (serverUnit && serverUnit.title) || clientCtx.unitTitle || "Çarpanlar ve Katlar";
  const kazTitle = (serverKaz && serverKaz.title) || clientCtx.kazTitle || stop.title || "";
  const stopTitle = stop.title || clientCtx.stopTitle || "Etkinlik";
  const stopType = stop.type || clientCtx.stopType || "concept";

  const problemLines = [];
  const teacherNotes = [];
  const forbiddenRevealTokens = [];

  if (stop.subtitle) {
    problemLines.push(`Alt Başlık / Yönerge: ${stripHtmlServer(stop.subtitle)}`);
  }
  if (Array.isArray(stop.explanation) && stop.explanation.length > 0) {
    problemLines.push(`Konu Özeti: ${stop.explanation.map(stripHtmlServer).join(" ")}`);
  }

  // 1) Concept (Boşluk Doldurma) Durakları
  if (stop.sentenceHtml) {
    let readableSentence = stripHtmlServer(stop.sentenceHtml);
    const filled = payload.filledBlanks || {};
    if (Array.isArray(stop.blanks)) {
      stop.blanks.forEach((b, idx) => {
        const solvedVal = filled[b.id];
        const slotDesc = solvedVal
          ? `[${idx + 1}. Boşluk ÇÖZÜLDÜ: "${solvedVal}"]`
          : `[${idx + 1}. Boşluk — Seçenekler: ${(b.choices || []).join(", ")}]`;
        readableSentence = readableSentence.replace(`{${b.id}}`, slotDesc);
        if (b.correct !== undefined) {
          forbiddenRevealTokens.push(String(b.correct).trim());
        }
      });
      const blankKey = stop.blanks.map((b, i) => `${i + 1}. Boşluk = "${b.correct}"`).join(", ");
      teacherNotes.push(`Doğru Boşluk Değerleri: ${blankKey}`);
    }
    if (payload.activeBlankId !== undefined && payload.activeBlankId !== null) {
      problemLines.push(`Öğrencinin Şu An Seçtiği Boşluk: ${Number(payload.activeBlankId) + 1}. Boşluk`);
    }
    problemLines.push(`Etkinlik Cümlesi: ${readableSentence}`);
  }

  // 2) Çoktan Seçmeli LGS & Akıllı Tahta Soruları
  if (stop.stem) {
    problemLines.push(`Soru Metni: ${stripHtmlServer(stop.stem)}`);
  }
  if (Array.isArray(stop.options) && stop.options.length > 0) {
    const optsStr = stop.options.map(o => `${o.letter}) ${stripHtmlServer(o.text)}`).join(" | ");
    problemLines.push(`Şıklar: ${optsStr}`);
    if (stop.correctLetter) {
      const cOpt = stop.options.find(o => o.letter === stop.correctLetter);
      const cText = cOpt ? stripHtmlServer(cOpt.text) : "";
      teacherNotes.push(`Doğru Şık (Öğrenciye Söyleme): ${stop.correctLetter}) ${cText}`);
      forbiddenRevealTokens.push(`${stop.correctLetter} şıkkı`);
      forbiddenRevealTokens.push(`Cevap ${stop.correctLetter}`);
      if (cText) forbiddenRevealTokens.push(cText);
    }
  }
  if (stop.solution) {
    teacherNotes.push(`Tam Matematiksel Çözüm Adımları: ${stripHtmlServer(stop.solution)}`);
  }

  // 3) Video / Animasyonlu Anlatım Durakları
  if (Array.isArray(stop.steps) && stop.steps.length > 0) {
    problemLines.push(`Anlatım Adımları: ${stop.steps.map(s => stripHtmlServer(s.text || s)).join(" | ")}`);
  }
  if (stop.quickQuestion) {
    problemLines.push(`Doğrulama Sorusu: ${stripHtmlServer(stop.quickQuestion)}`);
    const qChoices = stop.quickChoices || stop.quickOptions;
    if (Array.isArray(qChoices)) {
      problemLines.push(`Seçenekler: ${qChoices.map(stripHtmlServer).join(" | ")}`);
    }
    if (stop.quickCorrect) {
      const qc = stripHtmlServer(stop.quickCorrect);
      teacherNotes.push(`Doğru Seçenek (Öğrenciye Söyleme): ${qc}`);
      forbiddenRevealTokens.push(qc);
    }
  }

  // 4) Etkileşimli Etkinlik (Gökkuşağı, Çok Aşamalı Gökkuşağı, 4/5 Yöntem Atölyesi, Çarpan Ağacı, Kart Sınıflandırma)
  const liveScreen = payload.liveScreen && typeof payload.liveScreen === "object" ? payload.liveScreen : null;
  if (stop.activityMode === "factor_methods_lab") {
    if (liveScreen && liveScreen.methodTitle) {
      problemLines.push(`Öğrencinin Şu An Ekranda Açtığı Yöntem: ${liveScreen.methodTitle} (Hedef Sayı: ${liveScreen.targetNumber || ""}) — Seçili Kutu: ${liveScreen.activeSlotLabel || ""}`);
      if (liveScreen.activeSlotHint) {
        teacherNotes.push(`Aktif Kutu Çözüm İpucu (Sadece Yönlendir, Sayıyı Söyleme): ${stripHtmlServer(liveScreen.activeSlotHint)}`);
      }
    } else {
      problemLines.push("Çarpan Bulma ve Asal Çarpanlara Ayırma Atölyesi (Ekrandaki aktif yöntem adımları).");
    }
  } else if (stop.activityMode === "multi_stage_rainbow" && Array.isArray(stop.stages)) {
    const stIdx = liveScreen && liveScreen.stageIndex ? Math.max(0, liveScreen.stageIndex - 1) : 0;
    const stObj = stop.stages[stIdx] || stop.stages[0];
    if (stObj) {
      problemLines.push(`Aktif Etkinlik Aşaması (${stObj.badge || ""}): ${stripHtmlServer(stObj.prompt || "")} | Dizi: ${(stObj.sequence || []).join(", ")}`);
      if (Array.isArray(stObj.missingTargets)) {
        teacherNotes.push(`Eksik Değerler (Söyleme): ${stObj.missingTargets.map(m => `${m.answer} (${m.hint || ""})`).join(" | ")}`);
        stObj.missingTargets.forEach(m => forbiddenRevealTokens.push(String(m.answer)));
      }
    }
  } else if (stop.activityMode === "rainbow_pairs") {
    problemLines.push(`Gökkuşağı Çarpan Dizisi (Hedef Sayı ${stop.targetNumber}): ${(stop.sequence || []).join(", ")}`);
    if (Array.isArray(stop.pool)) problemLines.push(`Seçenek Havuzu: ${stop.pool.join(", ")}`);
    if (Array.isArray(stop.missingTargets)) {
      teacherNotes.push(`Eksik Çarpanlar: ${stop.missingTargets.map(m => `${m.answer} (${m.hint || ""})`).join(" | ")}`);
      stop.missingTargets.forEach(m => forbiddenRevealTokens.push(String(m.answer)));
    }
  } else if (stop.activityMode === "factor_tree") {
    problemLines.push(`Çarpan Ağacı (${stop.rootNumber}): ${stripHtmlServer(stop.treeDescription || "")}`);
    if (Array.isArray(stop.missingNodes)) {
      problemLines.push(`Dallar: ${stop.missingNodes.map(n => n.label).join(" | ")}`);
      teacherNotes.push(`Doğru Dal Değerleri: ${stop.missingNodes.map(n => `${n.label} => ${n.answer}`).join(" | ")}`);
    }
  } else if (Array.isArray(stop.items) && stop.items.length > 0) {
    if (liveScreen && liveScreen.questionText) {
      problemLines.push(`Öğrencinin Şu An Ekrandaki Kartı (${liveScreen.cardIndex}/${liveScreen.cardTotal}): "${liveScreen.questionText}"`);
    }
    problemLines.push(`Sınıflandırma Kartları: ${stop.items.slice(0, 4).map(it => `"${stripHtmlServer(it.text)}"`).join(" | ")}`);
    teacherNotes.push(`Kart Yanıtları: ${stop.items.slice(0, 4).map(it => `"${stripHtmlServer(it.text)}" => ${it.answer}`).join(" | ")}`);
  }

  // 5) Mini Oyun Durakları
  if (stop.type === "game") {
    if (Array.isArray(stop.levels) && stop.levels.length > 0) {
      const lv = stop.levels[0];
      problemLines.push(`Oyun Görevi: ${lv.target} sayısının tüm pozitif tam bölenlerini seçme. Seçenekler: ${(lv.options || []).join(", ")}`);
      teacherNotes.push(`${lv.target} bölenleri: ${(lv.divisors || []).join(", ")}`);
    } else if (Array.isArray(stop.targets)) {
      problemLines.push(`Oyun Görevi: Asal çarpanları (2, 3, 5, 7) çarparak hedef sayıları (${stop.targets.join(", ")}) elde etme.`);
    } else if (Array.isArray(stop.rounds) || Array.isArray(stop.locks)) {
      const list = stop.rounds || stop.locks;
      problemLines.push(`Oyun Etabı Örnekleri: ${JSON.stringify(list.slice(0, 2))}`);
    } else if (Array.isArray(stop.challenges)) {
      problemLines.push(`Maraton Soruları: ${stop.challenges.slice(0, 3).map(c => `${stripHtmlServer(c.q)} (Seçenekler: ${(c.choices || []).join(", ")})`).join(" | ")}`);
      teacherNotes.push(`Maraton Yanıtları: ${stop.challenges.slice(0, 3).map(c => `${stripHtmlServer(c.q)} => ${c.ans}`).join(" | ")}`);
    }
  }

  if (stop.targetNumber && !problemLines.some(l => l.includes("Hedef Sayı"))) {
    problemLines.push(`Hedef Sayı: ${stop.targetNumber}`);
  }
  if (stop.hint) {
    teacherNotes.push(`Pedagojik İpucu: ${stripHtmlServer(stop.hint)}`);
  }

  // Yalnızca kavram (concept) veya keşif adımlarında ve dinamik canlı görev yoksa kazanım özetini ekle
  if (serverUnit && serverStop && (stopType === "concept") && (!stop.explanation || stop.explanation.length === 0)) {
    const conceptPeer = (serverUnit.stops || []).find(
      s => s.kazanimId === serverStop.kazanimId && s.type === "concept" && Array.isArray(s.explanation)
    );
    if (conceptPeer) {
      problemLines.push(`Kazanım Temel Kuralı: ${conceptPeer.explanation.map(stripHtmlServer).join(" ")}`);
    }
  }

  return {
    unitNo,
    stopId,
    unitTitle,
    kazTitle,
    stopTitle,
    stopType,
    problemText: problemLines.join("\n"),
    teacherReference: teacherNotes.join("\n"),
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

function getFactorPairsText(n) {
  if (n < 2 || n > 2000) return "";
  const pairs = [];
  for (let d = 1; d * d <= n; d++) {
    if (n % d === 0) {
      pairs.push(`${d}×${n / d}`);
    }
  }
  return pairs.join(", ");
}

function computeSymbolicMathFacts(questionText, stopInfo) {
  const qNums = (String(questionText || "").match(/\b\d{1,4}\b/g) || [])
    .map(n => parseInt(n, 10))
    .filter(n => n > 0 && n <= 5000);
  const liveNums = Array.isArray(stopInfo && stopInfo.liveNumbers) && stopInfo.liveNumbers.length > 0
    ? stopInfo.liveNumbers.map(Number).filter(n => n > 1 && n <= 5000)
    : (String(stopInfo.problemText || "").match(/\b\d{1,4}\b/g) || [])
        .map(n => parseInt(n, 10))
        .filter(n => n > 1 && n <= 5000);

  const uniqueQ = [...new Set(qNums)].slice(0, 3);
  const uniqueAll = [...new Set([...uniqueQ, ...liveNums.slice(0, 4)])].slice(0, 6);
  const facts = [];

  for (let i = 0; i < uniqueAll.length; i++) {
    for (let j = i + 1; j < uniqueAll.length; j++) {
      const small = Math.min(uniqueAll[i], uniqueAll[j]);
      const big = Math.max(uniqueAll[i], uniqueAll[j]);
      if (small <= 1 || big === small) continue;
      if (uniqueQ.length > 0 && !uniqueQ.includes(small) && !uniqueQ.includes(big)) continue;

      const rem = big % small;
      if (rem === 0) {
        const q = big / small;
        facts.push(`${big} ÷ ${small} = ${q} (kalan 0, kalansız bölünür: ${small} çarpan, ${big} ise ${q} katıdır).`);
      } else {
        facts.push(`${big} ÷ ${small} işleminde bölüm ${Math.floor(big / small)}, kalan ${rem} olur (kalansız bölünmez).`);
      }
      if (facts.length >= 2) break;
    }
    if (facts.length >= 2) break;
  }

  if (liveNums.length > 0 && liveNums[0] >= 6 && liveNums[0] <= 400) {
    const fp = getFactorPairsText(liveNums[0]);
    if (fp) facts.push(`${liveNums[0]} sayısının tam sayı çarpan çiftleri: ${fp}.`);
  }

  if (uniqueQ.length === 2 && uniqueQ[0] > 1 && uniqueQ[1] > 1) {
    const eb = gcd(uniqueQ[0], uniqueQ[1]);
    const ek = (uniqueQ[0] * uniqueQ[1]) / eb;
    if (ek <= 100000) {
      facts.push(`EBOB(${uniqueQ[0]}, ${uniqueQ[1]}) = ${eb}${eb === 1 ? " (aralarında asal)" : ""}, EKOK(${uniqueQ[0]}, ${uniqueQ[1]}) = ${ek}.`);
    }
  }

  return facts.join(" ");
}

const MAX_REPLY_WORDS = 25;

function countWordsSimple(str) {
  const clean = String(str || "").trim();
  if (!clean) return 0;
  return clean.split(/\s+/).filter(Boolean).length;
}

function splitSentencesPreservingMath(text) {
  const slots = [];
  const masked = String(text || "").replace(/\$[^$]+\$/g, m => {
    slots.push(m);
    return `__MATH_${slots.length - 1}__`;
  });
  const parts = masked
    .replace(/\n+/g, " ")
    .split(/(?<=[.!?])\s+/)
    .map(p => p.replace(/__MATH_(\d+)__/g, (_, i) => slots[Number(i)] || "").trim())
    .filter(Boolean);
  return parts.length > 0 ? parts : [String(text || "").trim()];
}

function enforceMaxWordsServer(rawText, maxWords = MAX_REPLY_WORDS) {
  let text = String(rawText || "").replace(/\s+/g, " ").trim();
  if (!text) return text;
  if (countWordsSimple(text) <= maxWords) return text;

  const sentences = splitSentencesPreservingMath(text);
  if (sentences.length >= 2) {
    const lastQ = sentences[sentences.length - 1];
    // Önce son iki cümleyi (matematiksel ipucu + soru) dene
    const lastTwo = `${sentences[sentences.length - 2]} ${lastQ}`.trim();
    if (countWordsSimple(lastTwo) <= maxWords) return lastTwo;

    // İlk cümle + son soru cümlesini dene
    const firstAndLast = `${sentences[0]} ${lastQ}`.trim();
    if (countWordsSimple(firstAndLast) <= maxWords) return firstAndLast;

    // Sadece ilk cümle sığıyorsa onu al
    if (countWordsSimple(sentences[0]) <= maxWords && countWordsSimple(sentences[0]) >= 6) {
      return sentences[0];
    }
    if (countWordsSimple(lastQ) <= maxWords && countWordsSimple(lastQ) >= 6) {
      return lastQ;
    }
  }

  // Tek uzun cümle ise $...$ matematik bloklarını bölmeden kelime sınırında kes
  const tokens = text.match(/\$[^$]+\$|\S+/g) || [];
  const kept = [];
  let wTotal = 0;
  for (const tok of tokens) {
    const w = countWordsSimple(tok);
    if (wTotal + w > maxWords) break;
    kept.push(tok);
    wTotal += w;
  }
  let clipped = kept.join(" ").replace(/[,;:\-–—]+$/, "").trim();
  // Eşleşmemiş ** varsa temizle
  if ((clipped.match(/\*\*/g) || []).length % 2 === 1) {
    clipped = clipped.replace(/\*\*(?!.*\*\*)/, "");
  }
  if (clipped && !/[.!?]$/.test(clipped)) {
    clipped += text.includes("?") ? "?" : ".";
  }
  return clipped;
}

function buildSocraticDirectRefusal(stopInfo) {
  const topic = stopInfo.kazTitle || stopInfo.unitTitle || "bu konu";
  return enforceMaxWordsServer(
    `Cevabı doğrudan söylersem öğrenme keyfi kaçar 😊 **${topic}** kuralına göre sorudaki ilk işlemi sen kurar mısın?`,
    MAX_REPLY_WORDS
  );
}

function maskAccidentalAnswerLeak(replyText, stopInfo, scopeCheck) {
  let out = String(replyText || "")
    .replace(/<thought>[\s\S]*?<\/thought>/gi, "")
    .trim();
  if (!out) return out;

  // Numaralı boşluk listesi ("1. Boşluk: çarpanıdır, 2. Boşluk: ...") sızıntısını engelle
  if (
    /\b1\.\s*boşlu(ğa|k)\s*[:=-]/i.test(out) &&
    /\b2\.\s*boşlu(ğa|k)\s*[:=-]/i.test(out)
  ) {
    return buildSocraticDirectRefusal(stopInfo);
  }

  // "Doğru cevap C şıkkıdır" gibi doğrudan şık ifşalarını maskele
  out = out.replace(
    /\b(doğru\s*(cevap|şık|seçenek)|cevabımız|cevap)\s*[:=-]?\s*\*\*?([ABCD])\*\*?\s*(şıkkı(dır)?|seçeneği(dir)?)?/gi,
    "aradığımız doğru seçenek"
  );

  if (scopeCheck && scopeCheck.wantsDirectAnswer && Array.isArray(stopInfo.forbiddenRevealTokens)) {
    const lowerOut = trLower(out);
    const leakedCount = stopInfo.forbiddenRevealTokens
      .filter(t => t && t.length >= 3 && lowerOut.includes(trLower(t)))
      .length;
    if (leakedCount >= 2) {
      return buildSocraticDirectRefusal(stopInfo);
    }
  }

  if (stopInfo.stopType === "concept" && Array.isArray(stopInfo.forbiddenRevealTokens)) {
    for (const token of stopInfo.forbiddenRevealTokens) {
      if (!token || token.length < 3) continue;
      const escaped = token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const leakRe = new RegExp(
        `(boşluğa|boşluk\\s*için|cevap\\s*olarak)\\s*["'*]*${escaped}["'*]*\\s*(gelir|gelecek|yazmalısın|seçmelisin|olmalıdır|yaz)`,
        "gi"
      );
      out = out.replace(leakRe, "$1 bu kurala uyan kavram $2");
    }
  }

  return enforceMaxWordsServer(out.replace(/\n{2,}/g, " ").trim(), MAX_REPLY_WORDS);
}

// ============================================================================
// 4. OLLAMA (GEMMA 4 26B MoE) YÖNETİMİ VE CANLI MODEL ÇAĞRISI
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
    const resp = await fetch(`${OLLAMA_BASE}/api/tags`, { signal: AbortSignal.timeout(3000) });
    if (resp.ok) {
      const data = await resp.json();
      const names = (data.models || []).map(m => m.name);
      if (names.some(n => n === PRIMARY_MODEL || n.startsWith(`${PRIMARY_MODEL}:`))) {
        activeModelName = PRIMARY_MODEL;
      } else {
        const foundFallback = FALLBACK_MODELS.find(fm => names.some(n => n === fm || n.startsWith(fm)));
        if (foundFallback) activeModelName = foundFallback;
      }
      ollamaReady = true;
      return true;
    }
  } catch (_) {
    try {
      const exe = getOllamaExePath();
      const child = spawn(exe, ["serve"], { detached: true, stdio: "ignore", windowsHide: true });
      child.unref();
      await new Promise(r => setTimeout(r, 2000));
      const retry = await fetch(`${OLLAMA_BASE}/api/tags`, { signal: AbortSignal.timeout(3000) });
      if (retry.ok) {
        ollamaReady = true;
        return true;
      }
    } catch (_) {
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
        think: false,
        keep_alive: "24h",
        messages: [{ role: "user", content: "Selam" }]
      }),
      signal: AbortSignal.timeout(60000)
    });
    console.log(`[NarTES AI] Yerel Sokratik model '${activeModelName}' belleğe ve KV-önbelleğe ısındırıldı (keep_alive: 24h).`);
  } catch (err) {
    console.warn("[NarTES AI] Model ısındırma uyarısı:", err.message);
  }
}

function buildCompactStaticStopHeader(stopInfo) {
  // Canlı ekran görevi varsa KV-cache imzasını o görevle eşle; eski durak verisini asla karıştırma
  const pLines = String(stopInfo.problemText || "")
    .split("\n")
    .filter(l => !l.startsWith("Öğrencinin Şu An Seçtiği Boşluk") && !l.startsWith("Kazanım Temel Kuralı:"));

  const hasStem = pLines.some(l => l.startsWith("Soru Metni:") || l.startsWith("Doğrulama Sorusu:") || l.startsWith("Aktif Soru / Görev:"));
  const filteredProblem = hasStem
    ? pLines.filter(l => !l.startsWith("Alt Başlık") && !l.startsWith("Konu Özeti:"))
    : pLines;

  const problemCompact = filteredProblem.join("\n").slice(0, 720);
  const teacherCompact = String(stopInfo.teacherReference || "").slice(0, 760);
  const headerTag = stopInfo.liveSignature
    ? `[AKTİF EKRAN GÖREVİ (${stopInfo.liveSignature}) • ${stopInfo.stopTitle}]`
    : `[DURAK ${stopInfo.unitNo}.${stopInfo.stopId} - ${stopInfo.stopTitle}]`;

  return [
    headerTag,
    problemCompact,
    teacherCompact ? `[ÖĞRETMEN ÇÖZÜM NOTU — CEVABI/ŞIKKI SÖYLEME] ${teacherCompact}` : ""
  ].filter(Boolean).join("\n");
}

function buildMessagesForOllama(payload, stopInfo, scopeCheck) {
  const wrongChoices = Array.isArray(payload.wrongChoices) ? payload.wrongChoices : [];
  const rawHistory = Array.isArray(payload.history) ? payload.history : [];
  const verifiedMathFacts = computeSymbolicMathFacts(payload.question, stopInfo);
  const staticHeader = buildCompactStaticStopHeader(stopInfo);

  const messages = [];
  if (!String(activeModelName).startsWith("nartes-sokratik")) {
    messages.push({ role: "system", content: SYSTEM_SOCRATIC_PROMPT });
  }

  // Sabit durak başlığı: Aynı duraktaki tüm takip mesajlarında %100 KV-cache eşleşmesi sağlar
  messages.push({ role: "user", content: staticHeader });
  messages.push({ role: "assistant", content: "Hazırım." });

  const validHistory = rawHistory
    .filter(m => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content.trim())
    .slice(-6);

  for (const turn of validHistory) {
    messages.push({
      role: turn.role,
      content: turn.content.trim().slice(0, 420)
    });
  }

  const wrongCount = Math.max(0, Number(payload.wrongCount || wrongChoices.length || 0));
  const attemptNo = Math.max(0, Number(payload.attemptNo || wrongCount || 0));
  const turnDepth = Math.max(attemptNo, wrongCount) + Math.floor(validHistory.length / 2);

  let depthGuidance = "";
  if (turnDepth <= 1) {
    depthGuidance = "[Kural: EN FAZLA 22 KELİME. Sıcak bir motivasyonla doğrudan bu sayfadaki sorunun/yöntemin verilerini kullanıp TEK yol gösterici soru sor; cevabı söyleme.]";
  } else if (turnDepth === 2) {
    depthGuidance = "[Kural: EN FAZLA 22 KELİME. Önceki cümleni tekrarlamadan yüreklendir; yanlışın sayfadaki hangi şarta uymadığını gösterip tek soru sor.]";
  } else if (turnDepth === 3) {
    depthGuidance = "[Kural: EN FAZLA 22 KELİME. Önceki cümleni tekrarlama, alakasız hikaye uydurma; cesaret verip ekrandaki sayılarla ilk küçük işlemi kurdur.]";
  } else {
    depthGuidance = `[Kural (${turnDepth}. adım): EN FAZLA 24 KELİME. Cümle tekrarlama! İçtenlikle motive et ve ekrandaki sayılarla en temel çarpma/bölme/toplama adımını sor.]`;
  }

  const ltNums = payload.liveTask && Array.isArray(payload.liveTask.numbers) && payload.liveTask.numbers.length > 0
    ? payload.liveTask.numbers.join(", ")
    : "";
  const liveNote = payload.liveScreen && payload.liveScreen.methodTitle
    ? `[Ekranda açık yöntem: ${payload.liveScreen.methodTitle} (Hedef: ${payload.liveScreen.targetNumber || ltNums}) - ${payload.liveScreen.activeSlotLabel || ""}]`
    : (payload.liveScreen && payload.liveScreen.stageBadge
      ? `[Ekranda açık aşama: ${payload.liveScreen.stageBadge}${ltNums ? " | Aktif Sayılar: " + ltNums : ""} - ${payload.liveScreen.activeSlotLabel || ""}]`
      : (ltNums ? `[Ekrandaki aktif sayılar: ${ltNums}]` : ""));

  const currentQ = String(payload.question || "").trim().slice(0, 300);
  const hasWarmMix = /\b(merhaba|selam|heyecanlıyım|korkuyorum|zorlanıyorum)\b/i.test(currentQ);
  const turnNotes = [
    liveNote,
    wrongChoices.length > 0 ? `[Yanlış denemeler (${wrongCount} kez): ${wrongChoices.slice(-3).join(", ")}]` : "",
    verifiedMathFacts ? `[Matematik: ${verifiedMathFacts.slice(0, 140)}]` : "",
    depthGuidance,
    hasWarmMix ? `[Not: Önce 3-4 kelimeyle çok samimi karşılık ver, sonra ekrandaki soruya yönlendir.]` : "",
    scopeCheck.wantsDirectAnswer ? `[Not: Cevabı/şıkkı söyleme, motive edip ilk adımı sor.]` : ""
  ].filter(Boolean).join(" ");

  messages.push({
    role: "user",
    content: turnNotes ? `${currentQ}\n${turnNotes}` : currentQ
  });

  return messages;
}

let guardrailRotateIdx = 0;
function buildImmediateGuardrailReply(status, stopInfo) {
  guardrailRotateIdx = (guardrailRotateIdx + 1) % 4;
  const activeTopic = stopInfo.kazTitle || stopInfo.unitTitle || "bu matematik konusu";
  const numMatch = String(stopInfo.problemText || "").match(/\b\d{1,4}\b/);
  const keyNum = numMatch ? numMatch[0] : null;

  if (status === "empty") {
    return enforceMaxWordsServer(`Seni dinliyorum 😊 Ekrandaki **${activeTopic}** sorusunda hangi adımda takıldın?`, MAX_REPLY_WORDS);
  }
  if (status === "profanity") {
    return enforceMaxWordsServer(`Nazik bir dil kullanalım 😊 Şimdi ekrandaki **${activeTopic}** sorusunda ilk hangi işlemi yapalım?`, MAX_REPLY_WORDS);
  }

  const offTopicPool = [
    `Şimdi konumuz **${activeTopic}** 😊 Ekrandaki soruda${keyNum ? ` **${keyNum}** sayısıyla` : ""} ilk hangi işlemi kurmalıyız?`,
    `O konuyu teneffüse bırakıp ekrandaki **${activeTopic}** sorumuza dönelim 🧭 İlk adımda neye dikkat etmeliyiz?`,
    `Burada odağımız **${activeTopic}** ✨ Ekrandaki sayılar arasında hangi matematiksel ilişkiyi görüyorsun?`,
    `Gel dikkatimizi ekrandaki **${activeTopic}** adımına verelim 📐 Sence çözümü başlatacak ilk işlem hangisi?`
  ];
  return enforceMaxWordsServer(offTopicPool[guardrailRotateIdx % offTopicPool.length], MAX_REPLY_WORDS);
}

// ============================================================================
// 5. HTTP API VE STATİK DOSYA SUNUCUSU
// ============================================================================
function readJsonBody(req, maxBytes = 96 * 1024) {
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
      } catch (_) {
        reject(new Error("Geçersiz JSON"));
      }
    });
    req.on("error", reject);
  });
}

let socialCursorsServer = {};
function pickSocialServerVariant(key, list) {
  if (!Array.isArray(list) || !list.length) return "";
  const idx = Number(socialCursorsServer[key] || 0);
  socialCursorsServer[key] = idx + 1;
  return list[idx % list.length];
}

function detectSocialIntentServer(questionText, payload, stopInfo) {
  const clean = String(questionText || "").trim();
  if (!clean) return null;
  const lower = trLower(clean);

  // Mesajda sayı, şık sorusu veya matematik terimi varsa doğrudan Sokratik AI motoruna geçir
  if (
    /\d/.test(lower) ||
    /(?:^|\s)[abcd]\s*(?:şıkkı|seçeneği|olur\s*mu|m[ıiuü]|doğru)/i.test(lower) ||
    /\b(çarpan|bölen|katı|katlar|asal|ebob|ekok|üslü|karekök|denklem|olasılık|üçgen|tablo|ağaç|gökkuşağı|boşluk|şık|seçenek|ipucu|çözüm|işlem|bölme|çarpma|toplama|çıkarma|formül|kural|nasıl\s*çöz|neden\s*yanlış|niye\s*yanlış)\b/i.test(lower)
  ) {
    return null;
  }

  const rawTopic = (stopInfo && (stopInfo.kazTitle || stopInfo.unitTitle)) || "matematik";
  const shortTopic = String(rawTopic).replace(/^\d+\.\s*/, "").trim() || "matematik";
  const studentNameRaw = payload && typeof payload.studentName === "string" ? payload.studentName.trim() : "";
  const curName = studentNameRaw ? ` **${studentNameRaw}**` : "";

  const NON_NAME_WORDS = new Set([
    "de", "da", "iyiyim", "iyi", "kötüyüm", "kötü", "harikayım", "harika",
    "süperim", "süper", "bomba", "fena", "idare", "yorgunum", "yorgun",
    "sıkıldım", "hazırım", "hazır", "başlayalım", "tamam", "olur", "evet",
    "hayır", "yok", "var", "anlamadım", "anladım", "bilmiyorum", "biliyorum",
    "yapamadım", "yapamıyorum", "çözemedim", "geldim", "buradayım",
    "öğrenciyim", "öğrenci", "merhaba", "merhabalar", "selam", "selamlar",
    "slm", "mrb", "hey", "günaydın", "naber", "nasılsın", "nasılsınız",
    "teşekkürler", "teşekkür", "sağol", "eyvallah", "matematik", "soru",
    "ipucu", "yardım", "biraz", "çok", "hiç", "pek", "gayet", "bugün",
    "şimdi", "sen", "peki", "kimsin", "lütfen"
  ]);

  const hasMoodWord = /\b(iyiyim|harikayım|süperim|çok iyiyim|bomba gibiyim|fena değil(?:im)?)\b/i.test(lower);
  const hasAskBack = /\b(sen\s*nasılsın|ya\s*sen|peki\s*sen|sen\s*iyi\s*misin|sen\s*naber)\b/i.test(lower);

  if (hasMoodWord && hasAskBack) {
    return {
      intent: "both_mood_and_ask",
      reply: enforceMaxWordsServer(pickSocialServerVariant("both_mood_and_ask", [
        `Ben de çok iyiyim, teşekkür ederim${curName}! 😄 Enerjin harika; hazırsan **${shortTopic}** çalışmamıza keyifle başlayalım mı?`,
        `İyi olmana çok sevindim${curName}, ben de harikayım! 🌟 Bu güzel enerjiyle bugünkü matematik keşfimize geçelim mi?`,
        `Ben de süperim, çok sağ ol${curName}! 😊 İkimizin de keyfi yerindeyken ekrandaki adıma birlikte bakalım mı?`,
        `Harika, ben de çok iyiyim${curName}! ✨ Seninle matematik çalışmak çok keyifli olacak, başlayalım mı?`
      ]), MAX_REPLY_WORDS)
    };
  }

  if (/\b(nasılsın|nasılsınız|iyi\s*misin|naber|ne\s*haber|nasıl\s*gidiyor|keyifler\s*nasıl|halin\s*nasıl)\b/i.test(lower)) {
    return {
      intent: "how_are_you",
      reply: enforceMaxWordsServer(pickSocialServerVariant("how_are_you", [
        `İyiyim, teşekkür ederim; sen nasılsın? 😊 Seninle bugün keyifle matematik keşifleri yapacağımız için çok heyecanlıyım!`,
        `Çok iyiyim, sen nasılsın? 🌟 Birlikte adım adım ilerleyince **${shortTopic}** çalışmak gerçekten çok eğlenceli oluyor!`,
        `Harikayım, sorduğun için teşekkürler; peki sen nasılsın? 😊 Bugün matematiği hiç acele etmeden, severek öğreneceğiz!`,
        `İyiyim, sen nasılsın bakalım? 😄 Birlikte düşündüğümüzde her matematik adımının ne kadar kolaylaştığını göreceksin!`,
        `Enerjim süper, iyiyim; sen nasılsın? ✨ Bugün **${shortTopic}** konusunda sana yol arkadaşı olmak çok güzel!`,
        `Çok iyiyim, iyi ki geldin! Sen nasılsın? 😊 Bugün güzel bir enerjiyle harika matematik çalışmaları yapacağız.`
      ]), MAX_REPLY_WORDS)
    };
  }

  let nameMatch = clean.match(/(?:benim\s+ad[ıi]m|ad[ıi]m|ismim)\s+([a-zçğıöşü]{2,16})\b/i);
  if (!nameMatch) nameMatch = clean.match(/^ben\s+([a-zçğıöşü]{2,16})[!.,?\s]*$/i);
  if (nameMatch && nameMatch[1]) {
    const rawW = nameMatch[1].trim();
    const lw = trLower(rawW);
    if (!NON_NAME_WORDS.has(lw)) {
      const formattedName = rawW.charAt(0).toLocaleUpperCase("tr-TR") + lw.slice(1);
      return {
        intent: "intro_name",
        reply: enforceMaxWordsServer(pickSocialServerVariant("intro_name", [
          `Tanıştığımıza çok sevindim **${formattedName}**! 😊 Seninle harika bir matematik ekibi olacağız; **${shortTopic}** keşfimize başlayalım mı?`,
          `Memnun oldum **${formattedName}**! 👋 Çok güzel bir enerjin var. Bugün matematiği birlikte severek öğrenmeye hazır mısın?`,
          `Hoş geldin **${formattedName}**! 🌟 Takıldığın her anda yanındayım; ekrandaki **${shortTopic}** adımına birlikte bakalım mı?`,
          `Ne güzel tanışmak **${formattedName}**! 😊 Birlikte adım adım ilerleyerek bugünkü matematik çalışmamızı keyifle tamamlayacağız!`
        ]), MAX_REPLY_WORDS)
      };
    }
  }

  if (/^(merhaba|merhabalar|selam|selamlar|slm|mrb|hey|günaydın|iyi\s*günler|iyi\s*akşamlar|iyi\s*dersler|hoş\s*bulduk)[!.,?\s]*$/i.test(lower)) {
    if (!studentNameRaw) {
      return {
        intent: "greeting",
        reply: enforceMaxWordsServer(pickSocialServerVariant("greeting_new", [
          `Merhaba, nasılsın? 😊 Ben Bilge NarTES! Seninle tanışmayı çok isterim, ismin ne?`,
          `Merhaba, hoş geldin! 👋 Ben Bilge NarTES. Bugün nasılsın, tanışalım mı?`,
          `Selam, nasılsın bakalım? 😊 Ben senin matematik dostun Bilge NarTES. Adın ne?`,
          `Merhaba! 🌟 Seni gördüğüme çok sevindim, nasılsın? İstersen önce tanışalım!`,
          `Hoş geldin, merhaba! 😊 Nasılsın bugün? Ben yol arkadaşın Bilge NarTES!`
        ]), MAX_REPLY_WORDS)
      };
    }
    return {
      intent: "greeting_known",
      reply: enforceMaxWordsServer(pickSocialServerVariant("greeting_known", [
        `Merhaba **${studentNameRaw}**, nasılsın? 😊 Seni yeniden görmek çok güzel!`,
        `Selam **${studentNameRaw}**! 👋 Tekrar hoş geldin, bugün nasılsın bakalım?`,
        `Merhaba **${studentNameRaw}**! 🌟 Bugün keyifler nasıl, nasılsın?`
      ]), MAX_REPLY_WORDS)
    };
  }

  if (/\b(sen\s*kimsin|kimsin\s*sen|adın\s*ne|ismin\s*ne|nesin\s*sen|robot\s*musun|yapay\s*zeka\s*mısın)\b/i.test(lower)) {
    return {
      intent: "who_are_you",
      reply: enforceMaxWordsServer(pickSocialServerVariant("who_are_you", [
        `Ben Bilge NarTES! 🦉 Senin samimi matematik dostunum; cevabı direkt söylemem ama doğruyu bulman için hep yanındayım!`,
        `Adım Bilge NarTES 😊 Matematik çalışırken seninle sohbet eden ve takıldığın adımlarda ipucu veren yol arkadaşınım!`,
        `Ben dijital matematik rehberin Bilge NarTES'im! ✨ Birlikte keşfetmeyi çok severim. Peki sen nasılsın?`
      ]), MAX_REPLY_WORDS)
    };
  }

  if (/\b(kötüyüm|pek\s*iyi\s*değilim|iyi\s*değilim|yorgunum|çok\s*yoruldum|uykum\s*var|sıkıldım|canım\s*sıkkın|moralim\s*bozuk|matematik\s*çok\s*zor|matematik\s*zor|matematiği\s*sevmiyorum|korkuyorum|yapamıyorum\s*hiç)\b/i.test(lower)) {
    return {
      intent: "mood_tired",
      reply: enforceMaxWordsServer(pickSocialServerVariant("mood_tired", [
        `Seni çok iyi anlıyorum${curName}, bazen yorulmak çok normal 😊 Acele etmeden, küçük ve kolay adımlarla ilerleyelim mi?`,
        `Hiç canını sıkma${curName}, yalnız değilsin 🤗 Birlikte ipuçlarıyla gidince matematiğin ne kadar keyifli olduğunu göreceksin!`,
        `Moralini bozma${curName}, ben tam bunun için yanındayım 😊 İstersen ekrandaki adımı en basit yerinden birlikte başlatalım?`,
        `Derin bir nefes alalım${curName}, hiç acelemiz yok 😊 Hazır olduğunda ekrandaki görevi beraberce kolayca çözeceğiz!`
      ]), MAX_REPLY_WORDS)
    };
  }

  if (/^(ben\s*de\s*)?(çok\s*)?(iyiyim|harikayım|süperim|bomba\s*gibiyim|gayet\s*iyiyim|fena\s*değil|fena\s*değilim|idare\s*eder|güzel|çok\s*şükür|şükür|iyidir)[!.,?\s]*(teşekkürler|teşekkür\s*ederim|sağ\s*ol|sağol)?[!.,?\s]*$/i.test(lower)) {
    return {
      intent: "mood_positive",
      reply: enforceMaxWordsServer(pickSocialServerVariant("mood_positive", [
        `İyi olmana çok sevindim${curName}! 😄 Enerjin yerindeyken ekrandaki **${shortTopic}** adımına birlikte göz atalım mı?`,
        `Harika, bu güzel enerjin bana da geçti${curName}! 🌟 Hazırsan ekrandaki adımı keyifle incelemeye başlayalım mı?`,
        `Hep böyle iyi ol${curName}! 😊 Hadi bu güzel motivasyonla bugünkü matematik keşfimize birlikte başlayalım!`,
        `Bunu duyduğuma çok mutlu oldum${curName}! ✨ Hazır hissettiğinde ekrandaki görevde birlikte adım adım ilerleyebiliriz.`
      ]), MAX_REPLY_WORDS)
    };
  }

  if (/^(çok\s*)?(teşekkürler|teşekkür\s*ederim|sağ\s*ol|sağol|eyvallah|harikasın|süpersin|çok\s*iyi\s*anlattın)[!.,?\s]*$/i.test(lower)) {
    return {
      intent: "thanks",
      reply: enforceMaxWordsServer(pickSocialServerVariant("thanks", [
        `Rica ederim${curName}, ne demek! 😊 Senin gayretin çok güzel; ekrandaki adımda devam etmeye hazır mısın?`,
        `Ben teşekkür ederim${curName}! 🌟 Merak edip sorman harika; hadi bu güzel tempoyla sıradaki adıma bakalım!`,
        `Ne mutlu bana${curName}! 😄 Birlikte çalışmak çok keyifli, ekrandaki görevde devam edelim mi?`
      ]), MAX_REPLY_WORDS)
    };
  }

  return null;
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
  const stopInfo = buildAuthoritativeStopContext(payload.context || {}, payload);
  const scopeCheck = detectScopeAndIntent(question);
  const wantStream = payload.stream !== false;

  // 1) Küfür veya Açık Ders Dışı (Off-Topic) ise modele gitmeden anında ders bağlamına kilitle
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

  // 1.5) Samimi tanışma, hal-hatır ve olumlu matematik geçişi (çocukla tanışmadan direkt soru sormaz)
  const socialTurn = detectSocialIntentServer(question, payload, stopInfo);
  if (socialTurn && socialTurn.reply) {
    if (wantStream) {
      res.writeHead(200, {
        "Content-Type": "application/x-ndjson; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "Connection": "keep-alive"
      });
      res.write(JSON.stringify({ type: "meta", social: socialTurn.intent, model: activeModelName }) + "\n");
      res.write(JSON.stringify({ type: "delta", text: socialTurn.reply }) + "\n");
      res.end(JSON.stringify({ type: "done", fullText: socialTurn.reply, model: activeModelName }) + "\n");
    } else {
      res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({ ok: true, reply: socialTurn.reply, social: socialTurn.intent, model: activeModelName }));
    }
    return;
  }

  // 2) Yerel Ollama (Gemma 4 26B MoE) modelini kontrol et ve Sokratik yanıt üret
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
        think: false,
        keep_alive: "24h",
        messages
      }),
      signal: AbortSignal.timeout(55000)
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
            if (!scopeCheck.wantsDirectAnswer && countWordsSimple(fullText) <= MAX_REPLY_WORDS) {
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
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Private-Network", "true");
  res.setHeader("Access-Control-Max-Age", "86400");
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
  } catch (_) {
    if (!res.headersSent) {
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    }
    res.end("Sunucu hatası");
  }
});

server.listen(PORT, HOST, () => {
  console.log(`=============================================================`);
  console.log(`🚀 Nartes+ Web & Gemma 4 Sokratik Yapay Zeka Sunucusu Açık!`);
  console.log(`🌐 Adres: http://localhost:${PORT}`);
  console.log(`🧠 Aktif AI: ${PRIMARY_MODEL} (API Anahtarsız • %100 Lokal)`);
  console.log(`=============================================================`);
  warmUpModel();
});
