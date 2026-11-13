(function () {
  "use strict";

  // ==========================================================================
  // NARTES — ÇİZGİ KARAKTER MASKOTU & %100 YEREL SOKRATİK YAPAY ZEKA REHBERİ
  // - Harici API anahtarı KULLANMAZ; doğrudan bu sunucudaki yerel AI motoruyla
  //   (/api/nartes/chat -> Ollama nartes-sokratik) gerçek zamanlı akışlı çalışır.
  // - Ders bağlamı dışına çıkmaz, cevabı doğrudan söylemez, öğrencinin her sorusuna
  //   ve yaptığı hatalara göre özgün Sokratik yanıtlar üretir.
  // - 1. yanlışta: Seçilen yanlış değere özel Sokratik ipucu verir.
  // - 2. yanlışta (ve katlarında): Seçenekleri kilitler ve "Konu Bilgi & İpucu Kapısı"nı açar.
  // ==========================================================================

  const VOICE_PREF_KEY = "nartes_mentor_voice_enabled_v1";
  const SOCIAL_SESSION_KEY = "nartes_student_social_v1";

  function loadSocialState() {
    try {
      const raw = window.sessionStorage && window.sessionStorage.getItem(SOCIAL_SESSION_KEY);
      const parsed = raw ? JSON.parse(raw) : null;
      if (parsed && typeof parsed === "object") {
        return {
          studentName: typeof parsed.studentName === "string" ? parsed.studentName : "",
          lastSocialStage: typeof parsed.lastSocialStage === "string" ? parsed.lastSocialStage : "",
          cursors: parsed.cursors && typeof parsed.cursors === "object" ? parsed.cursors : {}
        };
      }
    } catch (_) {}
    return { studentName: "", lastSocialStage: "", cursors: {} };
  }

  let socialState = loadSocialState();

  function saveSocialState() {
    try {
      if (window.sessionStorage) {
        window.sessionStorage.setItem(SOCIAL_SESSION_KEY, JSON.stringify(socialState));
      }
    } catch (_) {}
  }

  function pickSocialVariant(key, list) {
    if (!Array.isArray(list) || !list.length) return "";
    const cur = Number(socialState.cursors[key] || 0);
    socialState.cursors[key] = cur + 1;
    saveSocialState();
    return list[cur % list.length];
  }

  // ==========================================================================
  // 1. ÖZGÜN ÇİZGİ KARAKTER MASKOTU (SVG): "BİLGE NARTES"
  //    4 farklı duygu durumu: guide (varsayılan), praise, thinking, encourage
  // ==========================================================================
  function getCartoonMascotSvg(mood) {
    const m = mood || "guide";

    let eyesMarkup = "";
    if (m === "praise") {
      // Mutlu ^ ^ gülümseyen çizgi gözler
      eyesMarkup = `
        <path d="M25 40 Q30 34 35 40" stroke="#0F172A" stroke-width="3.2" stroke-linecap="round" fill="none"/>
        <path d="M45 40 Q50 34 55 40" stroke="#0F172A" stroke-width="3.2" stroke-linecap="round" fill="none"/>
      `;
    } else if (m === "thinking") {
      // Meraklı yukarı bakan gözler + kalkık kaş
      eyesMarkup = `
        <circle cx="30" cy="39" r="5.3" fill="#0F172A"/>
        <circle cx="31.8" cy="36.8" r="2.1" fill="#FFFFFF"/>
        <circle cx="50" cy="39" r="5.3" fill="#0F172A"/>
        <circle cx="51.8" cy="36.8" r="2.1" fill="#FFFFFF"/>
        <path d="M23 30 Q30 26 36 29" stroke="#1E293B" stroke-width="2.4" stroke-linecap="round" fill="none"/>
        <path d="M44 28 Q50 24 57 28" stroke="#1E293B" stroke-width="2.4" stroke-linecap="round" fill="none"/>
      `;
    } else {
      // Sempatik iri parlak çizgi gözler + göz kırpma animasyonu
      eyesMarkup = `
        <g class="nartes-cartoon-eyes">
          <circle cx="30" cy="39.5" r="5.6" fill="#0F172A"/>
          <circle cx="28.2" cy="37.4" r="2.2" fill="#FFFFFF"/>
          <circle cx="32.2" cy="41.4" r="1.0" fill="#FFFFFF"/>
          <circle cx="50" cy="39.5" r="5.6" fill="#0F172A"/>
          <circle cx="48.2" cy="37.4" r="2.2" fill="#FFFFFF"/>
          <circle cx="52.2" cy="41.4" r="1.0" fill="#FFFFFF"/>
        </g>
      `;
    }

    // Duyguya özel sevimli aksesuar / efekt parıltısı
    let accentMarkup = "";
    if (m === "praise") {
      accentMarkup = `
        <path d="M11 20 L13 15 L15 20 L20 22 L15 24 L13 29 L11 24 L6 22 Z" fill="#FACC15" stroke="#CA8A04" stroke-width="1"/>
        <path d="M67 16 L68.5 12 L70 16 L74 17.5 L70 19 L68.5 23 L67 19 L63 17.5 Z" fill="#4ADE80" stroke="#16A34A" stroke-width="1"/>
      `;
    } else if (m === "thinking") {
      accentMarkup = `
        <circle cx="66" cy="22" r="2.4" fill="#60A5FA" stroke="#1E3A8A" stroke-width="1.2"/>
        <circle cx="71" cy="15" r="3.6" fill="#93C5FD" stroke="#1E3A8A" stroke-width="1.2"/>
      `;
    } else if (m === "encourage") {
      accentMarkup = `
        <circle cx="68" cy="19" r="5.5" fill="#FEF08A" stroke="#CA8A04" stroke-width="1.6"/>
        <path d="M68 15.5 V20.5 M65.5 18 H70.5" stroke="#EA580C" stroke-width="1.8" stroke-linecap="round"/>
      `;
    }

    // Sağ kanat: selamlama / düşünme hareketi
    const rightWing = m === "thinking"
      ? `<path d="M62 49 C70 46, 71 57, 61 59" fill="#F97316" stroke="#1E293B" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`
      : `<path class="nartes-wing-wave" d="M63 45 C73 37, 76 49, 64 55" fill="#F97316" stroke="#1E293B" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`;

    return `
      <svg class="nartes-mascot-svg mood-${m}" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <!-- Yumuşak Arka Plan Halesi -->
        <circle cx="40" cy="43" r="33" fill="#FFF7ED" stroke="#FDBA74" stroke-width="2"/>

        <!-- Sol Kanat & Sağ Kanat -->
        <path d="M17 46 C9 42, 9 55, 18 57" fill="#F97316" stroke="#1E293B" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        ${rightWing}

        <!-- Sevimli Kulak Püskülleri & Ana Gövde (Çizgi Baykuş-Bilgin) -->
        <path d="M21 25 L16 16 L28 21 C32 19.5, 48 19.5, 52 21 L64 16 L59 25 C65 32, 66 49, 60 60 C55 68, 25 68, 20 60 C14 49, 15 32, 21 25 Z"
              fill="#FB923C" stroke="#1E293B" stroke-width="2.6" stroke-linejoin="round"/>

        <!-- Göbek Kısmı (Krem Tüyler) -->
        <ellipse cx="40" cy="56" rx="15.5" ry="10.5" fill="#FFEDD5"/>
        <path d="M33 55 Q35 58 37 55 M43 55 Q45 58 47 55" stroke="#F97316" stroke-width="1.8" stroke-linecap="round" opacity="0.7"/>

        <!-- Yüz Maskesi (Kalp/Gözlük Çevresi Açık Krem) -->
        <path d="M20 39 C20 29, 34 28, 40 34 C46 28, 60 29, 60 39 C60 49, 49 52, 40 49 C31 52, 20 49, 20 39 Z"
              fill="#FFFFFF" stroke="#FED7AA" stroke-width="1.5"/>

        <!-- Pembe Sempatik Yanaklar -->
        <ellipse cx="22.5" cy="46.5" rx="4.2" ry="2.5" fill="#FDA4AF" opacity="0.85"/>
        <ellipse cx="57.5" cy="46.5" rx="4.2" ry="2.5" fill="#FDA4AF" opacity="0.85"/>

        <!-- Gözler -->
        ${eyesMarkup}

        <!-- Bilge Yuvarlak Gözlük Çerçevesi -->
        <circle cx="30" cy="39.5" r="9.2" stroke="#1E293B" stroke-width="2.3" fill="none"/>
        <circle cx="50" cy="39.5" r="9.2" stroke="#1E293B" stroke-width="2.3" fill="none"/>
        <path d="M39.2 39.5 H40.8" stroke="#1E293B" stroke-width="2.4" stroke-linecap="round"/>

        <!-- Sevimli Turuncu-Sarı Gaga & Tebessüm -->
        <path d="M36.2 44.5 Q40 42.5 43.8 44.5 L40 50.5 Z" fill="#FACC15" stroke="#1E293B" stroke-width="2.1" stroke-linejoin="round"/>
        <path d="M35.5 52.2 Q40 55.6 44.5 52.2" stroke="#1E293B" stroke-width="2.1" stroke-linecap="round" fill="none"/>

        <!-- Nartes+ Kepi (Akademik Bilgin Şapkası + Yeşil '+' Küp Rozeti) -->
        <g transform="translate(0, -1)">
          <path d="M22 20 L40 12 L58 20 L40 26 Z" fill="#1E293B" stroke="#0F172A" stroke-width="2.2" stroke-linejoin="round"/>
          <path d="M28 22.5 V27.5 Q40 31 52 27.5 V22.5" fill="#334155" stroke="#0F172A" stroke-width="2" stroke-linejoin="round"/>
          <!-- Püskül -->
          <path d="M56 20 Q61 24 60 30" stroke="#FACC15" stroke-width="2.2" stroke-linecap="round" fill="none"/>
          <circle cx="60" cy="31" r="2.3" fill="#FACC15" stroke="#CA8A04" stroke-width="1"/>
          <!-- Nartes '+' Rozeti -->
          <rect x="35.5" y="15.5" width="9" height="9" rx="2.6" fill="#22C55E" stroke="#FFFFFF" stroke-width="1.2"/>
          <path d="M40 17.8 V22.2 M37.8 20 H42.2" stroke="#FFFFFF" stroke-width="1.9" stroke-linecap="round"/>
        </g>

        ${accentMarkup}
      </svg>
    `;
  }

  function getAvatarHtml(extraClass, mood) {
    return `
      <span class="nartes-avatar-frame ${extraClass || ""}">
        ${getCartoonMascotSvg(mood || "guide")}
      </span>
    `;
  }

  // Zengin ve tekrarsız tebrik havuzu
  const PRAISE_POOL = [
    "Aferin, tebrik ederim! Tam bir genç matematikçi gibi düşündün ve doğru ilişkiyi kurdun.",
    "Harika bir çıkarım! Adımları dikkatle takip ettiğin çok belli oluyor, seni kutlarım.",
    "Mükemmel! Sayılar arasındaki bağlantıyı tam isabetle yakaladın.",
    "Çok güzel çözdün! Sabırla düşündüğünde hiçbir soru senin için zor değil.",
    "Bravo! Mantık zincirini hiç koparmadan doğru sonuca ulaştın.",
    "Süpersin! Bu kazanımın mantığını çok iyi kavradın, sıradaki adıma hazırsın.",
    "Tebrikler! Dikkatli okumanın ve kuralı doğru uygulamanın karşılığını aldın.",
    "İşte bu! Matematiksel ilişkiyi zihninde çok net canlandırdın."
  ];

  // Çevrimdışı yedek güvenlik filtreleri (asıl filtre sunucuda da çalışır)
  const PROFANITY_LIST = [
    "aptal", "salak", "gerizekalı", "mal", "öküz", "ahmak", "dangalak",
    "sik", "amk", "aq", "oç", "piç", "yavşak", "göt", "bok", "lan", "ulan",
    "fuck", "shit", "bitch", "idiot", "stupid"
  ];

  const OFF_TOPIC_LIST = [
    "futbol", "galatasaray", "fenerbahçe", "beşiktaş", "trabzonspor",
    "oyun öner", "pubg", "valorant", "minecraft", "roblox", "fortnite",
    "sevgili", "aşk", "şarkı", "film", "dizi", "tiktok", "instagram", "youtube",
    "hava durumu", "siyaset", "parti", "yemek tarifi", "burç", "espri yap", "fıkra"
  ];

  const GIVE_ANSWER_PATTERNS = [
    /cevab[ıi]\s*(ne|nedir|söyle|ver|yaz)/i,
    /doğru\s*(şık|cevap|seçenek)\s*(hangisi|ne)/i,
    /hangi\s*şık/i,
    /direkt\s*(söyle|çöz|ver)/i,
    /sen\s*çöz/i,
    /şıkkı\s*söyle/i
  ];

  let lastPraiseIdx = -1;
  let mentorVoiceEnabled = false;
  let localAiServerOnline = false;
  let localAiModelLabel = "Sokratik Rehber";
  let activeApiBase = "";
  let activeStreamAbort = null;
  let gateCountdownTimer = null;

  // Öğrencinin aktif duraktaki kişisel öğrenme durumu ve çok turlu sohbet geçmişi
  let currentContext = { unit: null, kaz: null, stop: null };
  let studentTrace = {
    wrongCount: 0,
    attemptCountsByTarget: {},
    wrongChoices: [],
    lastWrongValue: null,
    lastTargetLabel: null,
    filledBlanks: {},
    activeBlankId: null,
    liveScreen: null,
    chatTurnCount: 0,
    chatHistory: [],
    usedMotivationIndices: [],
    shownHintBodies: [],
    remediationLocked: false
  };

  try {
    const savedVoice = localStorage.getItem(VOICE_PREF_KEY);
    if (savedVoice !== null) {
      mentorVoiceEnabled = savedVoice === "1";
    }
  } catch (e) {}

  // Web Audio API ile NarTES'e özel ses efektleri
  let mentorAudioCtx = null;
  function playMentorSound(kind) {
    try {
      if (window.MATFLOW_SOUND_MUTED) return;
      if (!mentorAudioCtx) {
        mentorAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      const now = mentorAudioCtx.currentTime;
      if (kind === "hint") {
        [440, 554.37].forEach((freq, i) => {
          const osc = mentorAudioCtx.createOscillator();
          const gain = mentorAudioCtx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, now + i * 0.08);
          gain.gain.setValueAtTime(0.08, now + i * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.16);
          osc.connect(gain);
          gain.connect(mentorAudioCtx.destination);
          osc.start(now + i * 0.08);
          osc.stop(now + i * 0.08 + 0.16);
        });
      } else if (kind === "study_gate") {
        [330, 293.66, 392].forEach((freq, i) => {
          const osc = mentorAudioCtx.createOscillator();
          const gain = mentorAudioCtx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, now + i * 0.09);
          gain.gain.setValueAtTime(0.1, now + i * 0.09);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.09 + 0.22);
          osc.connect(gain);
          gain.connect(mentorAudioCtx.destination);
          osc.start(now + i * 0.09);
          osc.stop(now + i * 0.09 + 0.22);
        });
      } else if (kind === "understood") {
        [523.25, 659.25, 880].forEach((freq, i) => {
          const osc = mentorAudioCtx.createOscillator();
          const gain = mentorAudioCtx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, now + i * 0.065);
          gain.gain.setValueAtTime(0.11, now + i * 0.065);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.065 + 0.2);
          osc.connect(gain);
          gain.connect(mentorAudioCtx.destination);
          osc.start(now + i * 0.065);
          osc.stop(now + i * 0.065 + 0.2);
        });
      }
    } catch (e) {}
  }

  function pickNonRepeating(pool, lastIdxRef) {
    if (pool.length <= 1) return { text: pool[0], idx: 0 };
    let idx = Math.floor(Math.random() * pool.length);
    if (idx === lastIdxRef) {
      idx = (idx + 1 + Math.floor(Math.random() * (pool.length - 1))) % pool.length;
    }
    return { text: pool[idx], idx };
  }

  function stripHtml(html) {
    const safe = String(html || "").replace(/<(?![\/a-zA-Z])/g, "&lt;");
    const tmp = document.createElement("div");
    tmp.innerHTML = safe;
    return (tmp.textContent || tmp.innerText || "").replace(/\s+/g, " ").trim();
  }

  function speakMentorMessage(rawText) {
    if (!mentorVoiceEnabled) return;
    if (!("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.cancel();
      const clean = String(rawText || "")
        .replace(/<[^>]+>/g, " ")
        .replace(/\*\*(.+?)\*\*/g, "$1")
        .replace(/\*(.+?)\*/g, "$1")
        .replace(/\\times/g, " çarpı ")
        .replace(/\\div/g, " bölü ")
        .replace(/\\cdot/g, " çarpı ")
        .replace(/\\text\{([^}]+)\}/g, "$1")
        .replace(/\$/g, "")
        .replace(/[🦉✨🎉💡🧭📘🎯👉💪🔒✓🔎📐]/g, "")
        .replace(/\s+/g, " ")
        .trim();
      if (!clean) return;
      const utter = new SpeechSynthesisUtterance(clean);
      utter.lang = "tr-TR";
      utter.rate = 1.02;
      utter.pitch = 1.0;
      window.speechSynthesis.speak(utter);
    } catch (e) {}
  }

  function stopSpeaking() {
    try {
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    } catch (e) {}
  }

  function sanitizeHintWithoutAnswer(hintText, stop, extraAnswerToMask) {
    if (!hintText) return "";
    let clean = stripHtml(hintText);
    if (stop && stop.options && stop.correctLetter) {
      const correctOpt = stop.options.find(o => o.letter === stop.correctLetter);
      if (correctOpt) {
        const rawAns = stripHtml(correctOpt.text).trim();
        if (rawAns && clean.includes(rawAns)) {
          clean = clean.split(rawAns).join("aradığımız değer");
        }
      }
    }
    if (stop && stop.quickCorrect) {
      const rawQuick = stripHtml(stop.quickCorrect).trim();
      if (rawQuick && clean.includes(rawQuick)) {
        clean = clean.split(rawQuick).join("doğru seçenek");
      }
    }
    if (extraAnswerToMask !== undefined && extraAnswerToMask !== null) {
      const rawExtra = stripHtml(String(extraAnswerToMask)).trim();
      if (rawExtra && rawExtra.length >= 2 && clean.includes(rawExtra)) {
        clean = clean.split(rawExtra).join("doğru kavram");
      }
    }
    return clean;
  }

  // ==========================================================================
  // 2. ADIM ADIM İLERLEYEN SOKRATİK İPUCU MOTORU + 3 SANİYELİK BİLGİ KUTUSU
  //    - 1. denemede: Daha genel kavramsal hatırlatma
  //    - 2. denemede: Seçilen yanlış cevaba göre özel yönlendirme
  //    - 3.+ denemede: Adım adım işlem / ilişki ipucu (cevabı doğrudan vermeden)
  //    - Her yanlışta küçük bilgi kutusu açılır; 3 sn dolmadan "Okudum, anladım"
  //      tiklenemez, tiklenince tekrar cevap verme hakkı açılır (sınırsız hak).
  // ==========================================================================
  const MAX_MENTOR_WORDS = 25;

  function countWordsClient(str) {
    const clean = String(str || "").trim();
    if (!clean) return 0;
    return clean.split(/\s+/).filter(Boolean).length;
  }

  function enforceMax25WordsClient(rawText, maxWords) {
    const cap = maxWords || MAX_MENTOR_WORDS;
    const text = String(rawText || "").replace(/\s+/g, " ").trim();
    if (!text || countWordsClient(text) <= cap) return text;

    const slots = [];
    const masked = text.replace(/\$[^$]+\$/g, m => {
      slots.push(m);
      return `__M${slots.length - 1}__`;
    });
    const sentences = masked
      .split(/(?<=[.!?])\s+/)
      .map(p => p.replace(/__M(\d+)__/g, (_, i) => slots[Number(i)] || "").trim())
      .filter(Boolean);

    if (sentences.length >= 2) {
      const last = sentences[sentences.length - 1];
      const lastTwo = `${sentences[sentences.length - 2]} ${last}`.trim();
      if (countWordsClient(lastTwo) <= cap) return lastTwo;
      const firstLast = `${sentences[0]} ${last}`.trim();
      if (countWordsClient(firstLast) <= cap) return firstLast;
      if (countWordsClient(sentences[0]) <= cap && countWordsClient(sentences[0]) >= 5) return sentences[0];
    }

    const tokens = text.match(/\$[^$]+\$|\S+/g) || [];
    const kept = [];
    let total = 0;
    for (const tok of tokens) {
      const w = countWordsClient(tok);
      if (total + w > cap) break;
      kept.push(tok);
      total += w;
    }
    let clipped = kept.join(" ").replace(/[,;:\-–—]+$/, "").trim();
    if ((clipped.match(/\*\*/g) || []).length % 2 === 1) {
      clipped = clipped.replace(/\*\*(?!.*\*\*)/, "");
    }
    if (clipped && !/[.!?]$/.test(clipped)) {
      clipped += text.includes("?") ? "?" : ".";
    }
    return clipped;
  }

  function diagnoseSpecificWrongAttempt(detail, ctx) {
    const stop = (ctx && ctx.stop) || {};
    const wrongVal = detail && detail.wrongValue !== undefined ? String(detail.wrongValue).trim() : "";
    const targetInfo = detail && detail.targetLabel ? String(detail.targetLabel).trim() : "";
    const customHint = detail && detail.customHint
      ? sanitizeHintWithoutAnswer(detail.customHint, stop, detail.correctAnswerToMask)
      : "";

    const activeNums = extractStopKeyNumbers(stop, detail);
    const activeTarget = activeNums.mainNum;

    if (stop.type === "concept") {
      if (wrongVal === "katıdır") {
        return `**"katıdır"** büyük sonuç içindir; kalansız bölen küçük sayıya **çarpan (bölen)** denir. Hangisi uyar?`;
      }
      if (wrongVal === "çarpanıdır" || wrongVal === "bölenidir") {
        return activeTarget
          ? `Burada $${activeTarget}$ için büyük sayının durumu soruluyor: böleni mi, **katı** mı?`
          : `Burada büyük sayının küçük sayıya göre durumu soruluyor: böleni mi, **katı** mı?`;
      }
      if (wrongVal === "kalanıdır" || wrongVal === "farkıdır") {
        return `Burada kalan $0$; tam çarpma-bölme ilişkisi var. Bölen ve kat kavramlarından hangisi uygun?`;
      }
      if (wrongVal === "kalanlı" || wrongVal === "ondalıklı") {
        return `Bölme işleminde kalan $0$ olduğunda bu bölünmeye ne ad veririz?`;
      }
      if (wrongVal === "1") {
        return `Asal sayılar $1$'den büyük olmalıdır. En küçük çift asal sayımız kaçtır?`;
      }
    }

    if (stop.type === "video") {
      if (wrongVal.includes("farklı") && activeTarget) {
        return `$${activeTarget}$ sayısının baştan ve sondan eşleşen çarpan çiftlerini tek tek sayar mısın?`;
      }
    }

    if (stop.type === "activity") {
      if (stop.activityMode === "rainbow_pairs" && stop.targetNumber) {
        const num = parseInt(wrongVal, 10);
        if (!isNaN(num)) {
          const rem = stop.targetNumber % num;
          if (rem !== 0) {
            return `$${num}$ sayısı $${stop.targetNumber}$'ü tam bölmez (kalan $${rem}$). Çarpımı $${stop.targetNumber}$ veren çarpan hangisi?`;
          }
          return `$${num}$ bir çarpandır ama seçili kutunun küçükten büyüğe sırasına uymuyor!`;
        }
      }
      if (stop.activityMode === "factor_tree") {
        return `**${targetInfo || "Bu dal"}** için üstteki sayıyı yanındaki çarpana bölüp sonucu kontrol eder misin?`;
      }
      if (stop.activityMode === "ebob_ekok_sort" || stop.activityMode === "coprime_check" || stop.activityMode === "custom_sort") {
        return `Bütünü eş parçalara mı bölüyoruz (EBOB), yoksa adımları ortak katta mı buluşturuyoruz (EKOK)?`;
      }
    }

    if (stop.type === "game") {
      if (stop.gameType === "factor_hunter" && detail && detail.targetNumber) {
        const t = detail.targetNumber;
        const n = parseInt(wrongVal, 10);
        const rem = !isNaN(n) ? (t % n) : null;
        return `$${wrongVal}$ sayısı $${t}$'yi tam bölmez (kalan $${rem !== null ? rem : "\\neq 0"}$). Kalanı $0$ yapan böleni seç!`;
      }
      return enforceMax25WordsClient(`**${wrongVal}** kuralı sağlamadı. ${customHint || "Sayılar arasındaki işlem ilişkisini tekrar hesaplayalım!"}`, 19);
    }

    if (stop.type === "question") {
      const cleanH = sanitizeHintWithoutAnswer(stop.hint, stop);
      return enforceMax25WordsClient(
        `Seçtiğin şık sorudaki koşulu sağlamadı. ${cleanH || "Verilen değerleri kurala yerleştirip ilk işlemi kontrol et!"}`,
        19
      );
    }

    return enforceMax25WordsClient(
      customHint || "Seçimin koşulu sağlamadı; ekrandaki sayılar arasındaki ilişkiyi tekrar kontrol edelim!",
      19
    );
  }

  // ==========================================================================
  // 2.B SINIRSIZ, TEKRARSIZ, %100 EKRAN KONUSUNA BAĞLI & <=25 KELİME SOKRATİK MOTOR
  //     - Asla 25 kelimeyi geçmez; alakasız nesne/hikaye uydurmaz.
  //     - Doğrudan o an ekrandaki matematik konusunu ve sayılarını kullanarak
  //       kısa motivasyon + en temel toplama/çarpma/bölme adımlarına iner.
  // ==========================================================================
  const SHORT_MOTIVATIONS = [
    "Hiç sorun değil! 😊",
    "Güzel deneme! ✨",
    "Pes etme, yaklaştın! 💪",
    "Adım adım çözelim! 🌱",
    "Cesaretin harika! 🌟",
    "Birlikte başaracağız! 🤝",
    "Çok iyi gidiyorsun! 🎯",
    "Hiç acelemiz yok! 💡",
    "Gayretin çok değerli! 🧭",
    "Sakince tekrar bakalım! 🔍",
    "Deneyerek öğreniyoruz! 🧩",
    "Az kaldı, başaracaksın! 🚀"
  ];

  function pickFreshMotivation(attemptNo) {
    const used = Array.isArray(studentTrace.usedMotivationIndices) ? studentTrace.usedMotivationIndices : [];
    const available = [];
    for (let i = 0; i < SHORT_MOTIVATIONS.length; i++) {
      if (!used.includes(i)) available.push(i);
    }
    let chosenIdx;
    if (available.length > 0) {
      chosenIdx = available[attemptNo % available.length];
    } else {
      studentTrace.usedMotivationIndices = [];
      chosenIdx = attemptNo % SHORT_MOTIVATIONS.length;
    }
    studentTrace.usedMotivationIndices.push(chosenIdx);
    return SHORT_MOTIVATIONS[chosenIdx];
  }

  function extractStopKeyNumbers(stop, detail) {
    const liveTask = studentTrace && studentTrace.liveTask ? studentTrace.liveTask : null;
    if (liveTask && Array.isArray(liveTask.numbers) && liveTask.numbers.length > 0) {
      const liveUnique = [...new Set(liveTask.numbers.map(Number).filter(n => Number.isFinite(n) && n >= 2 && n <= 2000))];
      const wrongStr = detail && detail.wrongValue !== undefined ? String(detail.wrongValue) : "";
      const wrongNumMatch = wrongStr.match(/\b\d{1,4}\b/);
      const wrongNum = wrongNumMatch ? parseInt(wrongNumMatch[0], 10) : null;
      return {
        mainNum: (liveTask.targetNumber ? Number(liveTask.targetNumber) : null) || liveUnique[0] || null,
        secondNum: liveUnique[1] || null,
        allNums: liveUnique,
        wrongNum: wrongNum && wrongNum >= 1 ? wrongNum : null
      };
    }

    const rawSources = [
      detail && detail.targetLabel ? stripHtml(detail.targetLabel) : "",
      stop && stop.targetNumber ? String(stop.targetNumber) : "",
      stop && stop.rootNumber ? String(stop.rootNumber) : "",
      stop && stop.stem ? stripHtml(stop.stem) : "",
      stop && stop.subtitle ? stripHtml(stop.subtitle) : "",
      stop && stop.sentenceHtml ? stripHtml(stop.sentenceHtml) : "",
      stop && stop.quickQuestion ? stripHtml(stop.quickQuestion) : ""
    ].join(" ");
    const nums = (rawSources.match(/\b\d{1,4}\b/g) || [])
      .map(n => parseInt(n, 10))
      .filter(n => n >= 2 && n <= 2000);
    const uniqueNums = [...new Set(nums)];
    const wrongStr = detail && detail.wrongValue !== undefined ? String(detail.wrongValue) : "";
    const wrongNumMatch = wrongStr.match(/\b\d{1,4}\b/);
    const wrongNum = wrongNumMatch ? parseInt(wrongNumMatch[0], 10) : null;
    return {
      mainNum: uniqueNums[0] || null,
      secondNum: uniqueNums[1] || null,
      allNums: uniqueNums,
      wrongNum: wrongNum && wrongNum >= 1 ? wrongNum : null
    };
  }

  function buildRepeatedAdditionDemo(n) {
    const num = Number(n);
    if (!Number.isFinite(num) || num < 4 || num > 144) {
      return null;
    }
    const target = num;
    let d = 2;
    for (let k = 2; k <= 12; k++) {
      if (target % k === 0 && target / k >= 2 && target / k <= 15) {
        d = k;
        break;
      }
    }
    const groupVal = target % d === 0 ? target / d : Math.max(2, Math.floor(target / 2));
    const groupCount = target % d === 0 ? d : 2;
    const cleanTarget = groupVal * groupCount;
    const sumChain = Array.from({ length: Math.min(groupCount, 4) }, () => String(groupVal)).join("+")
      + (groupCount > 4 ? "+\\dots" : "");
    return { cleanTarget, groupCount, groupVal, sumChain };
  }

  // 4. Deneme: Ekrandaki ünite konusunun en sade matematiksel özü (Alakasız benzetme YOK, <=18 kelime)
  function buildUnitScreenConceptCore(unitNo, keyNums) {
    const uNo = Number(unitNo || 1);
    const n = keyNums && keyNums.mainNum ? keyNums.mainNum : null;
    switch (uNo) {
      case 1:
        return n
          ? `$${n}$ sayısını kalan $0$ olacak şekilde tam bölen sayıları küçükten büyüğe düşünelim: ilk çift hangisi?`
          : `Ekrandaki sayıyı kalan $0$ olacak şekilde tam bölen pozitif sayıları küçükten büyüğe eşleştirir misin?`;
      case 2:
        return `Üslü ifadede üstteki sayı tabanı toplamaz; tabanı yan yana yazıp çarpar. İlk çarpımı hesaplar mısın?`;
      case 3:
        return `Karekök, "Hangi sayıyı kendisiyle çarparsam içerdeki sayıyı verir?" sorusudur. En yakın tam kare sayı kaçtır?`;
      case 4:
        return `Veri analizinde önce tüm değerleri toplayıp bütünü bul, sonra $360^\\circ$ veya istenen oranla eşleştir!`;
      case 5:
        return `Olasılık = İstenen durum sayısı $\\div$ Tüm olası durumların toplamı. Önce paydadaki toplam durumu sayalım mı?`;
      case 6:
        return `Cebirsel ifadelerde sadece benzer terimler ($x$'liler kendi arasında, sayılar kendi arasında) toplanıp çıkarılır. Hangileri benzer?`;
      case 7:
        return `Denklemde eşitliğin iki tarafına aynı ters işlemi uygulayarak bilinmeyeni yalnız bırak. İlk hangi sayıyı karşıya atalım?`;
      case 8:
        return `"En az" $\\ge$, "en fazla" $\\le$ demektir; negatif sayıyla çarpıp bölersek yön değişir. Sınır değerimiz kaç?`;
      case 9:
        return `Üçgende iki kenarın toplamı üçüncü kenardan büyük, farkı küçük olmalıdır; dik üçgende $a^2+b^2=c^2$ kurulur!`;
      case 10:
        return `Benzer şekillerde eş açılar aynıdır; karşılıklı kenarları aynı sırayla bölerek benzerlik oranını bulabilir misin?`;
      case 11:
        return `Ötelemede koordinatlara ekleme-çıkarma yapılır, yön değişmez; yansımada eksene eşit uzaklıkta işaret değişir!`;
      default:
        return `Geometrik cisimlerde hacim = Taban Alanı $\\times$ Yükseklik; yüzey alanı ise açınımdaki tüm yüzlerin toplamıdır!`;
    }
  }

  // 5. Deneme: Ekrandaki sayılarla en temel toplama / çarpma / bölme kökü (<=19 kelime)
  function buildBasicMathRootStep(unitNo, keyNums) {
    const uNo = Number(unitNo || 1);
    const demo = buildRepeatedAdditionDemo(keyNums.mainNum);
    const wNum = keyNums.wrongNum;

    if (wNum && wNum >= 2 && wNum <= 50 && keyNums.mainNum && keyNums.mainNum > wNum && keyNums.mainNum % wNum !== 0 && uNo === 1) {
      const rem = keyNums.mainNum % wNum;
      return `$${keyNums.mainNum}$ sayısını $${wNum}$ sayısına böldüğümüzde $${rem}$ kalanı çıkıyor. Kalanı $0$ yapan hangi sayıyı seçebiliriz?`;
    }
    if (uNo === 1 && demo) {
      return `Çarpma eşit grupları toplamaktır ($${demo.sumChain}=${demo.cleanTarget} \\Rightarrow ${demo.groupCount}\\times${demo.groupVal}$). Ekrandaki sayıyı hangi iki çarpan verir?`;
    }
    if (uNo === 1) {
      return `Ekrandaki sayıyı kalansız (kalan $0$) bölen en küçük doğal sayı çiftini adım adım dener misin?`;
    }
    if (uNo === 2) {
      return `Toplama ile çarpmayı ayır: $2+2+2=6$ iken $2\\times2\\times2=8$'dir. Tabanı kendisiyle adım adım çarpar mısın?`;
    }
    if (uNo === 3) {
      return `Tam kareleri sırayla hatırla: $2\\times2=4,\\; 3\\times3=9,\\; 4\\times4=16,\\; 5\\times5=25$. Sorudaki sayı hangisine uyuyor?`;
    }
    if (uNo === 6 || uNo === 7 || uNo === 8) {
      return `$x+x+x=3x$ toplamanın kısa yazılışıdır; çarpmanın tersi ise bölmedir. Bilinmeyeni bulmak için kaça bölmeliyiz?`;
    }
    return `Temel işleme inelim: Ekrandaki sayıları küçük adımlarla toplayıp veya eşit böldüğümüzde ilk hangi sonuç çıkıyor?`;
  }

  function buildUnlimitedDeepScaffolding(detail, ctx, attemptNo) {
    const stop = (ctx && ctx.stop) || {};
    const kaz = (ctx && ctx.kaz) || {};
    const unit = (ctx && ctx.unit) || {};
    const unitNo = Number(unit.unitNo || 1);
    const cleanStopHint = sanitizeHintWithoutAnswer((detail && detail.customHint) || stop.hint, stop, detail && detail.correctAnswerToMask);
    const keyNums = extractStopKeyNumbers(stop, detail);
    const pep = pickFreshMotivation(attemptNo);

    const rawSol = stop.solution ? stripHtml(stop.solution) : "";
    const solParts = rawSol.split(/[.!?]+/).map(s => s.trim()).filter(Boolean);
    const safeSolStep1 = solParts.length > 0
      ? sanitizeHintWithoutAnswer(solParts[0], stop, detail && detail.correctAnswerToMask)
      : "";

    const lensIdx = (attemptNo - 6) % 6;
    let core = "";
    let badgeTitle = "Temel Adım";

    if (lensIdx === 0) {
      badgeTitle = "Küçük Sayı Modeli";
      core = `Küçük örnekle düşün: $12 = 3 \\times 4$ kalansız bölünür. Aynı bölme kontrolünü **$${keyNums.mainNum}$** için yapar mısın?`;
    } else if (lensIdx === 1) {
      badgeTitle = "İlk İşlem Basamağı";
      core = safeSolStep1
        ? `İlk işlemimiz: **${safeSolStep1}.** Buradan devam edince ne buluyorsun?`
        : `Önce ekrandaki **$${keyNums.mainNum}$** sayısını $1, 2, 3\\dots$ sırasıyla deneyip kalansız bölen ilk çifti yazar mısın?`;
    } else if (lensIdx === 2) {
      badgeTitle = "Ters İşlem Sağlaması";
      core = `Seçenekleri ters işlemle (çarpma veya toplama sağlamasıyla) yerine koyup dene; hangisi sorudaki eşitliği tam sağlıyor?`;
    } else if (lensIdx === 3) {
      badgeTitle = "Temel İşlem Kökü";
      core = buildBasicMathRootStep(unitNo, keyNums);
    } else if (lensIdx === 4) {
      badgeTitle = "Kazanım Özeti";
      core = cleanStopHint || buildUnitScreenConceptCore(unitNo, keyNums);
    } else {
      badgeTitle = "Seçenek Eleme";
      const tried = studentTrace.wrongChoices.slice(-2).join(", ");
      core = `${tried ? `Denediğin (${tried}) elendi. ` : ""}Kalan seçeneklerden hangisi **${kaz.title || "sorudaki"}** şartını tam sağlıyor?`;
    }

    const combined = enforceMax25WordsClient(`${pep} ${core}`, MAX_MENTOR_WORDS);
    return {
      badge: `💡 ${attemptNo}. İpucu • ${badgeTitle}`,
      mood: attemptNo % 2 === 0 ? "thinking" : "encourage",
      body: combined
    };
  }

  function recordUniqueHint(hintObj, attemptNo) {
    hintObj.body = enforceMax25WordsClient(hintObj.body, MAX_MENTOR_WORDS);
    if (!Array.isArray(studentTrace.shownHintBodies)) {
      studentTrace.shownHintBodies = [];
    }
    if (studentTrace.shownHintBodies.includes(hintObj.body)) {
      const altPep = pickFreshMotivation(attemptNo + 3);
      const stripped = hintObj.body.replace(/^[^.!?]+[.!?]\s*/, "");
      hintObj.body = enforceMax25WordsClient(`${altPep} ${stripped || hintObj.body}`, MAX_MENTOR_WORDS);
    }
    studentTrace.shownHintBodies.push(hintObj.body);
    if (studentTrace.shownHintBodies.length > 40) {
      studentTrace.shownHintBodies = studentTrace.shownHintBodies.slice(-40);
    }
    return hintObj;
  }

  function buildProgressiveSocraticHint(detail, ctx, attemptNo) {
    const stop = (ctx && ctx.stop) || {};
    const kaz = (ctx && ctx.kaz) || {};
    const unit = (ctx && ctx.unit) || {};
    const unitNo = Number(unit.unitNo || 1);
    const cleanStopHint = sanitizeHintWithoutAnswer(
      (detail && detail.customHint) || (studentTrace.liveTask && studentTrace.liveTask.hint) || stop.hint,
      stop,
      detail && detail.correctAnswerToMask
    );
    const keyNums = extractStopKeyNumbers(stop, detail);
    const pep = pickFreshMotivation(attemptNo);

    let generalRule = "";
    if (studentTrace.liveTask && studentTrace.liveTask.promptText) {
      generalRule = sanitizeHintWithoutAnswer(studentTrace.liveTask.promptText, stop, detail && detail.correctAnswerToMask);
    } else if (Array.isArray(stop.explanation) && stop.explanation.length > 0) {
      generalRule = sanitizeHintWithoutAnswer(stop.explanation[0], stop, detail && detail.correctAnswerToMask);
    } else if (!studentTrace.liveTask && unit && Array.isArray(unit.stops) && stop.type === "concept") {
      const conceptStop = unit.stops.find(s => s.kazanimId === stop.kazanimId && s.type === "concept");
      if (conceptStop && Array.isArray(conceptStop.explanation) && conceptStop.explanation[0]) {
        generalRule = sanitizeHintWithoutAnswer(conceptStop.explanation[0], stop, detail && detail.correctAnswerToMask);
      }
    }

    if (attemptNo <= 1) {
      let shortRule = "";
      if (stop.type === "question" && cleanStopHint) {
        shortRule = cleanStopHint;
      } else if (generalRule) {
        shortRule = generalRule.split(/[.!?]+/).map(s => s.trim()).filter(Boolean)[0] || "";
      }
      const intro = shortRule || cleanStopHint || `**${kaz.title || stop.title || "Bu konu"}** kuralına göre sayıları tekrar kontrol edelim!`;
      return recordUniqueHint({
        badge: "🧭 1. İpucu • Kısa Hatırlatma",
        mood: "encourage",
        body: `${pep} ${intro}`
      }, attemptNo);
    }

    if (attemptNo === 2) {
      return recordUniqueHint({
        badge: "🔎 2. İpucu • Seçimini İnceleyelim",
        mood: "thinking",
        body: `${pep} ${diagnoseSpecificWrongAttempt(detail, ctx)}`
      }, attemptNo);
    }

    if (attemptNo === 3) {
      let closerGuide = "";
      if (stop.type === "question" && stop.solution) {
        const solSentences = stripHtml(stop.solution).split(/[.!?]+/).map(s => s.trim()).filter(Boolean);
        const safeSetup = sanitizeHintWithoutAnswer(solSentences[0] || "", stop, detail && detail.correctAnswerToMask);
        closerGuide = safeSetup
          ? `İlk adım: **${safeSetup}.** Devamında hangi seçeneğe ulaşırsın?`
          : (cleanStopHint || buildUnitScreenConceptCore(unitNo, keyNums));
      } else {
        closerGuide = cleanStopHint || buildUnitScreenConceptCore(unitNo, keyNums);
      }
      return recordUniqueHint({
        badge: "🎯 3. İpucu • İlk İşlem Adımı",
        mood: "encourage",
        body: `${pep} ${closerGuide}`
      }, attemptNo);
    }

    if (attemptNo === 4) {
      return recordUniqueHint({
        badge: "📐 4. İpucu • Konunun Özü",
        mood: "encourage",
        body: `${pep} ${buildUnitScreenConceptCore(unitNo, keyNums)}`
      }, attemptNo);
    }

    if (attemptNo === 5) {
      return recordUniqueHint({
        badge: "🌱 5. İpucu • Temel Toplama & Çarpma",
        mood: "encourage",
        body: `${pep} ${buildBasicMathRootStep(unitNo, keyNums)}`
      }, attemptNo);
    }

    return recordUniqueHint(buildUnlimitedDeepScaffolding(detail, ctx, attemptNo), attemptNo);
  }

  function showSocraticHintBox(ctx, detail, attemptNo, onUnderstoodCallback) {
    initNartesMentorDOM();
    studentTrace.remediationLocked = true;
    playMentorSound("study_gate");

    if (gateCountdownTimer) {
      clearInterval(gateCountdownTimer);
      gateCountdownTimer = null;
    }

    let gateEl = document.getElementById("nartesStudyGateOverlay");
    if (!gateEl) {
      gateEl = document.createElement("div");
      gateEl.id = "nartesStudyGateOverlay";
      gateEl.className = "nartes-study-gate-overlay";
      document.body.appendChild(gateEl);
    }

    const hintData = buildProgressiveSocraticHint(detail, ctx, attemptNo);
    const WAIT_SECONDS = 3;
    let remainingMs = WAIT_SECONDS * 1000;
    const showInteractiveHelpBtn = attemptNo >= 2;

    gateEl.innerHTML = `
      <div class="nartes-socratic-box" role="dialog" aria-modal="true" aria-labelledby="nartesHintBadge">
        <div class="nsb-top">
          <div class="nsb-avatar">${getAvatarHtml("nartes-avatar-md", hintData.mood)}</div>
          <div class="nsb-meta">
            <span class="nsb-badge" id="nartesHintBadge">${hintData.badge}</span>
            <div class="nsb-sub">${attemptNo >= 4 ? "Bilge NarTES en temel işlem mantığıyla yanında 🌱" : "Bilge NarTES seni doğruya adım adım yönlendiriyor"}</div>
          </div>
        </div>

        <div class="nsb-body">${formatMarkdownAndMath(hintData.body)}</div>

        ${showInteractiveHelpBtn ? `
          <button type="button" class="nsb-chat-link-btn" id="nsbOpenDeepChatBtn">
            💬 Hâlâ karışık mı? Bilge NarTES ile en temelden karşılıklı çözelim →
          </button>
        ` : ""}

        <div class="nsb-timer-track" aria-hidden="true">
          <div class="nsb-timer-fill" id="nsbTimerFill"></div>
        </div>

        <label class="nsb-tick-row is-locked" id="nsbTickLabel" for="nsgUnderstoodChk">
          <input type="checkbox" id="nsgUnderstoodChk" class="nsb-checkbox" disabled />
          <span class="nsb-tick-visual" id="nsbTickVisual">⏳</span>
          <span class="nsb-tick-text" id="nsbTickText">İpucunu dikkatle oku... (${WAIT_SECONDS} sn)</span>
        </label>
      </div>
    `;

    gateEl.hidden = false;
    renderMathInside(gateEl);
    speakMentorMessage(hintData.body);

    const chk = document.getElementById("nsgUnderstoodChk");
    const tickLabel = document.getElementById("nsbTickLabel");
    const tickVisual = document.getElementById("nsbTickVisual");
    const tickText = document.getElementById("nsbTickText");
    const timerFill = document.getElementById("nsbTimerFill");
    const openDeepChatBtn = document.getElementById("nsbOpenDeepChatBtn");

    if (openDeepChatBtn) {
      openDeepChatBtn.addEventListener("click", () => {
        if (gateCountdownTimer) {
          clearInterval(gateCountdownTimer);
          gateCountdownTimer = null;
        }
        studentTrace.remediationLocked = false;
        gateEl.hidden = true;
        if (typeof onUnderstoodCallback === "function") {
          onUnderstoodCallback();
        }
        applyPanelVisuals(true);
        const deepPrompt = attemptNo >= 4
          ? "Bu soruda zorlandım; ekrandaki sayılarla en temel toplama ve çarpma adımından kısaca anlatır mısın?"
          : "Bu soruda takıldım, ilk işlemi kısaca gösterir misin?";
        handleStudentQuestion(deepPrompt);
      });
    }

    // 3 saniyelik akıcı bar animasyonunu başlat
    requestAnimationFrame(() => {
      if (timerFill) {
        timerFill.style.transition = `width ${WAIT_SECONDS}s linear`;
        timerFill.style.width = "100%";
      }
    });

    gateCountdownTimer = setInterval(() => {
      remainingMs -= 250;
      if (remainingMs > 0) {
        const secLeft = Math.ceil(remainingMs / 1000);
        if (tickText) {
          tickText.textContent = `İpucunu dikkatle oku... (${secLeft} sn)`;
        }
      } else {
        clearInterval(gateCountdownTimer);
        gateCountdownTimer = null;
        if (chk) chk.disabled = false;
        if (tickLabel) tickLabel.classList.remove("is-locked");
        if (tickVisual) tickVisual.textContent = "";
        if (tickText) {
          tickText.innerHTML = `İpucunu okudum, <strong>anladım</strong> — Tekrar cevap ver`;
        }
      }
    }, 250);

    chk.addEventListener("change", () => {
      if (chk.disabled || !chk.checked) return;
      chk.disabled = true;
      if (tickLabel) tickLabel.classList.add("is-confirmed");
      if (tickVisual) tickVisual.textContent = "✓";
      if (tickText) tickText.innerHTML = `<strong>Okudum, anladım!</strong> Soruya dönülüyor...`;
      playMentorSound("understood");

      setTimeout(() => {
        studentTrace.remediationLocked = false;
        gateEl.hidden = true;
        if (typeof onUnderstoodCallback === "function") {
          onUnderstoodCallback();
        }
      }, 260);
    });
  }

  // ==========================================================================
  // 3. YEREL SUNUCU AI AKIŞ İSTEMCİSİ (Hem localhost hem canlı web sitesi uyumlu)
  // ==========================================================================
  function getCandidateApiBases() {
    const list = [];
    if (window.NARTES_AI_SERVER_URL) {
      list.push(String(window.NARTES_AI_SERVER_URL).replace(/\/+$/, ""));
    }
    const host = (window.location && window.location.hostname) || "";
    const isGitHubOrRemoteStatic = /github\.io$|problemcoz\.com$/i.test(host);
    if (!isGitHubOrRemoteStatic) {
      list.push("");
    }
    list.push("http://127.0.0.1:8080");
    list.push("http://localhost:8080");
    return [...new Set(list)];
  }

  async function checkLocalAiHealth() {
    const bases = getCandidateApiBases();
    for (const base of bases) {
      try {
        const ctrl = new AbortController();
        const tid = setTimeout(() => ctrl.abort(), 1800);
        const resp = await fetch(`${base}/api/nartes/health`, {
          cache: "no-store",
          signal: ctrl.signal
        });
        clearTimeout(tid);
        if (!resp.ok) continue;
        const data = await resp.json();
        if (data && data.ok) {
          activeApiBase = base;
          localAiServerOnline = true;
          const mName = String(data.model || "");
          localAiModelLabel = /gemma4|nartes-sokratik/i.test(mName) ? "Gemma 4 AI" : "Yerel AI";
          updateStatusTagUI();
          return;
        }
      } catch (_) {}
    }
    localAiServerOnline = false;
    localAiModelLabel = "Sokratik Rehber";
    updateStatusTagUI();
  }

  function updateStatusTagUI() {
    const tagEl = document.getElementById("nartesHeadTag");
    const fabSub = document.querySelector("#nartesFabBtn .nartes-fab-text small");
    if (tagEl) {
      tagEl.textContent = localAiServerOnline ? `🟢 ${localAiModelLabel}` : "⚡ Sokratik Mod";
      tagEl.classList.toggle("is-online", localAiServerOnline);
    }
    if (fabSub && !isPanelOpen) {
      fabSub.textContent = localAiServerOnline ? `${localAiModelLabel} Aktif` : "Sokratik Rehber";
    }
  }

  function buildClientContextPayload(ctx) {
    const unit = (ctx && ctx.unit) || {};
    const kaz = (ctx && ctx.kaz) || {};
    const stop = (ctx && ctx.stop) || {};
    const payload = {
      unitNo: unit.unitNo || 1,
      unitTitle: unit.title || "Çarpanlar ve Katlar",
      kazTitle: kaz.title || "",
      stopId: stop.id || 1,
      stopTitle: stop.title || "",
      stopType: stop.type || "concept"
    };
    const qIdx = typeof (ctx && ctx.activeQuestionIndex) === "number"
      ? ctx.activeQuestionIndex
      : (typeof stop.activeQuestionIndex === "number" ? stop.activeQuestionIndex : undefined);
    if (typeof qIdx === "number") {
      payload.activeQuestionIndex = qIdx;
    }
    if (stop.stem || stop.sentenceHtml || stop.quickQuestion || stop.activityMode) {
      payload.stop = {
        title: stop.title,
        subtitle: stop.subtitle || "",
        type: stop.type || "question",
        activityMode: stop.activityMode || "",
        activeQuestionIndex: typeof qIdx === "number" ? qIdx : 0,
        subQuestionBadge: stop.subQuestionBadge || "",
        stem: stop.stem || "",
        options: stop.options || [],
        correctLetter: stop.correctLetter || "",
        hint: stop.hint || "",
        solution: stop.solution || "",
        sentenceHtml: stop.sentenceHtml || "",
        blanks: stop.blanks || [],
        quickQuestion: stop.quickQuestion || "",
        quickChoices: stop.quickChoices || [],
        quickCorrect: stop.quickCorrect || ""
      };
    }
    return payload;
  }

  async function streamFromLocalServerAI(questionText, ctx, onChunk) {
    const host = (window.location && window.location.hostname) || "";
    if (/github\.io$|problemcoz\.com$/i.test(host) && !localAiServerOnline) {
      checkLocalAiHealth();
      return null;
    }
    if (activeStreamAbort) {
      try { activeStreamAbort.abort(); } catch (_) {}
    }
    const ctrl = new AbortController();
    activeStreamAbort = ctrl;

    const orderedBases = localAiServerOnline
      ? [activeApiBase, ...getCandidateApiBases().filter(b => b !== activeApiBase)]
      : getCandidateApiBases();

    try {
      let resp = null;
      for (const base of orderedBases) {
        try {
          const r = await fetch(`${base}/api/nartes/chat`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            signal: ctrl.signal,
            body: JSON.stringify({
              question: questionText,
              stream: true,
              context: buildClientContextPayload(ctx),
              wrongCount: studentTrace.wrongCount,
              attemptNo: Math.max(studentTrace.wrongCount, Math.floor(studentTrace.chatHistory.length / 2) + 1),
              wrongChoices: studentTrace.wrongChoices.slice(-5),
              filledBlanks: studentTrace.filledBlanks || {},
              activeBlankId: studentTrace.activeBlankId,
              liveScreen: studentTrace.liveScreen || null,
              liveTask: studentTrace.liveTask || null,
              studentName: socialState.studentName || "",
              history: studentTrace.chatHistory.slice(-6)
            })
          });
          if (r.ok && r.body) {
            activeApiBase = base;
            resp = r;
            break;
          }
        } catch (innerErr) {
          if (innerErr && innerErr.name === "AbortError") throw innerErr;
        }
      }

      if (!resp || !resp.body) {
        return null;
      }

      localAiServerOnline = true;
      updateStatusTagUI();

      const reader = resp.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let buffer = "";
      let accumulated = "";
      let finalOverride = null;

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const evt = JSON.parse(line);
            if (evt.type === "meta" && evt.model && /gemma4|nartes-sokratik/i.test(evt.model)) {
              localAiModelLabel = "Gemma 4 AI";
              updateStatusTagUI();
            } else if (evt.type === "delta" && evt.text) {
              accumulated += evt.text;
              if (typeof onChunk === "function") onChunk(accumulated);
            } else if (evt.type === "done" && typeof evt.fullText === "string") {
              finalOverride = evt.fullText;
            }
          } catch (_) {}
        }
      }

      const result = (finalOverride !== null ? finalOverride : accumulated).trim();
      return result || null;
    } catch (err) {
      if (err && err.name === "AbortError") return null;
      return null;
    } finally {
      if (activeStreamAbort === ctrl) {
        activeStreamAbort = null;
      }
    }
  }

  // Sunucu kapalıyken (ör. uzak tablet/statik kullanım) devreye giren çok adımlı sembolik Sokratik yedek motor
  function gcdLocal(a, b) {
    let x = Math.abs(a), y = Math.abs(b);
    while (y !== 0) { const t = y; y = x % y; x = t; }
    return x;
  }

  function matchFriendlySocialTurn(rawText, ctx) {
    const clean = String(rawText || "").trim();
    if (!clean) return null;
    const lower = clean.toLocaleLowerCase("tr-TR");

    // Mesajda gerçek matematik içeriği (sayı, şık veya konu terimi) varsa doğrudan Sokratik matematik motoruna geç
    if (
      /\d/.test(lower) ||
      /(?:^|\s)[abcd]\s*(?:şıkkı|seçeneği|olur\s*mu|m[ıiuü]|doğru)/i.test(lower) ||
      /\b(çarpan|bölen|katı|katlar|asal|ebob|ekok|üslü|karekök|denklem|olasılık|üçgen|tablo|ağaç|gökkuşağı|boşluk|şık|seçenek|ipucu|çözüm|işlem|bölme|çarpma|toplama|çıkarma|formül|kural|nasıl\s*çöz|neden\s*yanlış|niye\s*yanlış)\b/i.test(lower)
    ) {
      return null;
    }

    const kaz = (ctx && ctx.kaz) || {};
    const unit = (ctx && ctx.unit) || {};
    const stop = (ctx && ctx.stop) || {};
    const liveTask = studentTrace && studentTrace.liveTask ? studentTrace.liveTask : null;
    const rawTopic = kaz.title || unit.title || "matematik";
    const shortTopic = String(rawTopic).replace(/^\d+\.\s*/, "").trim() || "matematik";
    const activeHint = (liveTask && liveTask.hint) || stop.hint;

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

    function formatPersonName(rawWord) {
      const w = String(rawWord || "").trim();
      if (!w) return "";
      const lw = w.toLocaleLowerCase("tr-TR");
      if (NON_NAME_WORDS.has(lw)) return "";
      return w.charAt(0).toLocaleUpperCase("tr-TR") + lw.slice(1);
    }

    function extractStudentName() {
      let m = clean.match(/(?:benim\s+ad[ıi]m|ad[ıi]m|ismim)\s+([a-zçğıöşü]{2,16})\b/i);
      if (m && m[1]) {
        const cand = formatPersonName(m[1]);
        if (cand) return cand;
      }
      m = clean.match(/^ben\s+([a-zçğıöşü]{2,16})[!.,?\s]*$/i);
      if (m && m[1]) {
        const cand = formatPersonName(m[1]);
        if (cand) return cand;
      }
      if (socialState.lastSocialStage === "greeted_ask_name") {
        const single = clean.match(/^([a-zçğıöşü]{2,15})[!.?]*$/i);
        if (single && single[1]) {
          const cand = formatPersonName(single[1]);
          if (cand) return cand;
        }
      }
      return "";
    }

    const curName = socialState.studentName ? ` **${socialState.studentName}**` : "";
    const hasMoodWord = /\b(iyiyim|harikayım|süperim|çok iyiyim|bomba gibiyim|fena değil(?:im)?)\b/i.test(lower);
    const hasAskBack = /\b(sen\s*nasılsın|ya\s*sen|peki\s*sen|sen\s*iyi\s*misin|sen\s*naber)\b/i.test(lower);

    // 1. Birleşik Hal + Karşı Soru ("İyiyim, sen nasılsın?")
    if (hasMoodWord && hasAskBack) {
      socialState.lastSocialStage = "ready_bridge";
      saveSocialState();
      return {
        intent: "both_mood_and_ask",
        mood: "praise",
        reply: pickSocialVariant("both_mood_and_ask", [
          `Ben de çok iyiyim, teşekkür ederim${curName}! 😄 Enerjin harika; hazırsan **${shortTopic}** çalışmamıza keyifle başlayalım mı?`,
          `İyi olmana çok sevindim${curName}, ben de harikayım! 🌟 Bu güzel enerjiyle bugünkü matematik keşfimize geçelim mi?`,
          `Ben de süperim, çok sağ ol${curName}! 😊 İkimizin de keyfi yerindeyken ekrandaki adıma birlikte bakalım mı?`,
          `Harika, ben de çok iyiyim${curName}! ✨ Seninle matematik çalışmak çok keyifli olacak, başlayalım mı?`
        ])
      };
    }

    // 2. Hal Hatır Sorma ("Nasılsın?", "İyi misin?", "Naber?")
    if (/\b(nasılsın|nasılsınız|iyi\s*misin|naber|ne\s*haber|nasıl\s*gidiyor|keyifler\s*nasıl|halin\s*nasıl)\b/i.test(lower)) {
      socialState.lastSocialStage = "asked_how_are_you";
      saveSocialState();
      return {
        intent: "how_are_you",
        mood: "praise",
        reply: pickSocialVariant("how_are_you", [
          `İyiyim, teşekkür ederim; sen nasılsın? 😊 Seninle bugün keyifle matematik keşifleri yapacağımız için çok heyecanlıyım!`,
          `Çok iyiyim, sen nasılsın? 🌟 Birlikte adım adım ilerleyince **${shortTopic}** çalışmak gerçekten çok eğlenceli oluyor!`,
          `Harikayım, sorduğun için teşekkürler; peki sen nasılsın? 😊 Bugün matematiği hiç acele etmeden, severek öğreneceğiz!`,
          `İyiyim, sen nasılsın bakalım? 😄 Birlikte düşündüğümüzde her matematik adımının ne kadar kolaylaştığını göreceksin!`,
          `Enerjim süper, iyiyim; sen nasılsın? ✨ Bugün **${shortTopic}** konusunda sana yol arkadaşı olmak çok güzel!`,
          `Çok iyiyim, iyi ki geldin! Sen nasılsın? 😊 Bugün güzel bir enerjiyle harika matematik çalışmaları yapacağız.`
        ])
      };
    }

    // 3. İsimle Tanışma ("Ben Zeynep", "Adım Ali")
    const extractedName = extractStudentName();
    if (extractedName) {
      socialState.studentName = extractedName;
      socialState.lastSocialStage = "ready_bridge";
      saveSocialState();
      return {
        intent: "intro_name",
        mood: "praise",
        reply: pickSocialVariant("intro_name", [
          `Tanıştığımıza çok sevindim **${extractedName}**! 😊 Seninle harika bir matematik ekibi olacağız; **${shortTopic}** keşfimize başlayalım mı?`,
          `Memnun oldum **${extractedName}**! 👋 Çok güzel bir enerjin var. Bugün matematiği birlikte severek öğrenmeye hazır mısın?`,
          `Hoş geldin **${extractedName}**! 🌟 Takıldığın her anda yanındayım; ekrandaki **${shortTopic}** adımına birlikte bakalım mı?`,
          `Ne güzel tanışmak **${extractedName}**! 😊 Birlikte adım adım ilerleyerek bugünkü matematik çalışmamızı keyifle tamamlayacağız!`
        ])
      };
    }

    // 4. Saf Selamlaşma ("Merhaba", "Selam", "Günaydın")
    if (/^(merhaba|merhabalar|selam|selamlar|slm|mrb|hey|günaydın|iyi\s*günler|iyi\s*akşamlar|iyi\s*dersler|hoş\s*bulduk)[!.,?\s]*$/i.test(lower)) {
      if (!socialState.studentName) {
        socialState.lastSocialStage = "greeted_ask_name";
        saveSocialState();
        return {
          intent: "greeting",
          mood: "praise",
          reply: pickSocialVariant("greeting_new", [
            `Merhaba, nasılsın? 😊 Ben Bilge NarTES! Seninle tanışmayı çok isterim, ismin ne?`,
            `Merhaba, hoş geldin! 👋 Ben Bilge NarTES. Bugün nasılsın, tanışalım mı?`,
            `Selam, nasılsın bakalım? 😊 Ben senin matematik dostun Bilge NarTES. Adın ne?`,
            `Merhaba! 🌟 Seni gördüğüme çok sevindim, nasılsın? İstersen önce tanışalım!`,
            `Hoş geldin, merhaba! 😊 Nasılsın bugün? Ben yol arkadaşın Bilge NarTES!`
          ])
        };
      }
      socialState.lastSocialStage = "asked_how_are_you";
      saveSocialState();
      return {
        intent: "greeting_known",
        mood: "praise",
        reply: pickSocialVariant("greeting_known", [
          `Merhaba **${socialState.studentName}**, nasılsın? 😊 Seni yeniden görmek çok güzel!`,
          `Selam **${socialState.studentName}**! 👋 Tekrar hoş geldin, bugün nasılsın bakalım?`,
          `Merhaba **${socialState.studentName}**! 🌟 Bugün keyifler nasıl, nasılsın?`
        ])
      };
    }

    // 5. Kimsin / Kendini Tanıt
    if (/\b(sen\s*kimsin|kimsin\s*sen|adın\s*ne|ismin\s*ne|nesin\s*sen|robot\s*musun|yapay\s*zeka\s*mısın)\b/i.test(lower)) {
      return {
        intent: "who_are_you",
        mood: "guide",
        reply: pickSocialVariant("who_are_you", [
          `Ben Bilge NarTES! 🦉 Senin samimi matematik dostunum; cevabı direkt söylemem ama doğruyu bulman için hep yanındayım!`,
          `Adım Bilge NarTES 😊 Matematik çalışırken seninle sohbet eden ve takıldığın adımlarda ipucu veren yol arkadaşınım!`,
          `Ben dijital matematik rehberin Bilge NarTES'im! ✨ Birlikte keşfetmeyi çok severim. Peki sen nasılsın?`
        ])
      };
    }

    // 6. Olumsuz / Yorgun / Sıkılmış Ruh Hali
    if (/\b(kötüyüm|pek\s*iyi\s*değilim|iyi\s*değilim|yorgunum|çok\s*yoruldum|uykum\s*var|sıkıldım|canım\s*sıkkın|moralim\s*bozuk|matematik\s*çok\s*zor|matematik\s*zor|matematiği\s*sevmiyorum|korkuyorum|yapamıyorum\s*hiç)\b/i.test(lower)) {
      socialState.lastSocialStage = "ready_bridge";
      saveSocialState();
      return {
        intent: "mood_tired",
        mood: "encourage",
        reply: pickSocialVariant("mood_tired", [
          `Seni çok iyi anlıyorum${curName}, bazen yorulmak çok normal 😊 Acele etmeden, küçük ve kolay adımlarla ilerleyelim mi?`,
          `Hiç canını sıkma${curName}, yalnız değilsin 🤗 Birlikte ipuçlarıyla gidince matematiğin ne kadar keyifli olduğunu göreceksin!`,
          `Moralini bozma${curName}, ben tam bunun için yanındayım 😊 İstersen ekrandaki adımı en basit yerinden birlikte başlatalım?`,
          `Derin bir nefes alalım${curName}, hiç acelemiz yok 😊 Hazır olduğunda ekrandaki görevi beraberce kolayca çözeceğiz!`
        ])
      };
    }

    // 7. Olumlu Ruh Hali Yanıtı ("İyiyim", "Harikayım")
    if (/^(ben\s*de\s*)?(çok\s*)?(iyiyim|harikayım|süperim|bomba\s*gibiyim|gayet\s*iyiyim|fena\s*değil|fena\s*değilim|idare\s*eder|güzel|çok\s*şükür|şükür|iyidir)[!.,?\s]*(teşekkürler|teşekkür\s*ederim|sağ\s*ol|sağol)?[!.,?\s]*$/i.test(lower)) {
      socialState.lastSocialStage = "ready_bridge";
      saveSocialState();
      return {
        intent: "mood_positive",
        mood: "praise",
        reply: pickSocialVariant("mood_positive", [
          `İyi olmana çok sevindim${curName}! 😄 Enerjin yerindeyken ekrandaki **${shortTopic}** adımına birlikte göz atalım mı?`,
          `Harika, bu güzel enerjin bana da geçti${curName}! 🌟 Hazırsan ekrandaki adımı keyifle incelemeye başlayalım mı?`,
          `Hep böyle iyi ol${curName}! 😊 Hadi bu güzel motivasyonla bugünkü matematik keşfimize birlikte başlayalım!`,
          `Bunu duyduğuma çok mutlu oldum${curName}! ✨ Hazır hissettiğinde ekrandaki görevde birlikte adım adım ilerleyebiliriz.`
        ])
      };
    }

    // 8. Teşekkür
    if (/^(çok\s*)?(teşekkürler|teşekkür\s*ederim|sağ\s*ol|sağol|eyvallah|harikasın|süpersin|çok\s*iyi\s*anlattın)[!.,?\s]*$/i.test(lower)) {
      return {
        intent: "thanks",
        mood: "praise",
        reply: pickSocialVariant("thanks", [
          `Rica ederim${curName}, ne demek! 😊 Senin gayretin çok güzel; ekrandaki adımda devam etmeye hazır mısın?`,
          `Ben teşekkür ederim${curName}! 🌟 Merak edip sorman harika; hadi bu güzel tempoyla sıradaki adıma bakalım!`,
          `Ne mutlu bana${curName}! 😄 Birlikte çalışmak çok keyifli, ekrandaki görevde devam edelim mi?`
        ])
      };
    }

    // 9. Derse Başlama Onayı ("Hazırım", "Başlayalım", "Evet")
    if (/^(hazırım|evet\s*hazırım|başlayalım|hadi\s*başlayalım|hadi|olur|olur\s*başlayalım|tamam|tamam\s*başlayalım|evet|bakalım|geçelim)[!.,?\s]*$/i.test(lower)) {
      socialState.lastSocialStage = "in_lesson";
      saveSocialState();
      const firstHint = buildProgressiveSocraticHint({ customHint: activeHint }, ctx, 1);
      const hintBody = firstHint && firstHint.body ? firstHint.body : `**${shortTopic}** adımında ilk hangi sayıları inceleyelim?`;
      return {
        intent: "ready_start",
        mood: "guide",
        reply: enforceMax25WordsClient(`Harika${curName}! 🚀 ${hintBody}`, MAX_MENTOR_WORDS)
      };
    }

    return null;
  }

  function generateOfflineFallbackReply(rawText, ctx) {
    const text = String(rawText || "").trim();
    const lower = text.toLocaleLowerCase("tr-TR");
    const stop = (ctx && ctx.stop) || {};
    const kaz = (ctx && ctx.kaz) || {};
    const unit = (ctx && ctx.unit) || {};

    studentTrace.chatTurnCount++;
    const turn = studentTrace.chatTurnCount;

    const liveTask = studentTrace && studentTrace.liveTask ? studentTrace.liveTask : null;
    const activeHint = (liveTask && liveTask.hint) || stop.hint;
    const activeOptions = (liveTask && Array.isArray(liveTask.options) && liveTask.options.length > 0) ? liveTask.options : stop.options;
    const activeCorrectLetter = (liveTask && liveTask.correctLetter) || stop.correctLetter;
    const topicName = (liveTask && liveTask.taskTitle) || kaz.title || unit.title || stop.title || "bu matematik konusu";

    if (PROFANITY_LIST.some(w => lower.includes(w))) {
      return enforceMax25WordsClient(`Nazik bir dil kullanalım 😊 Şimdi ekrandaki **${topicName}** sorusunda ilk hangi işlemi yapalım?`);
    }
    if (OFF_TOPIC_LIST.some(w => lower.includes(w))) {
      return enforceMax25WordsClient(`Şimdi konumuz **${topicName}** 😊 Ekrandaki soruda verilen sayılarla ilk hangi işlemi kurmalıyız?`);
    }
    const socialHit = matchFriendlySocialTurn(text, ctx);
    if (socialHit) {
      return enforceMax25WordsClient(socialHit.reply, MAX_MENTOR_WORDS);
    }
    if (GIVE_ANSWER_PATTERNS.some(re => re.test(lower))) {
      const cleanH = sanitizeHintWithoutAnswer(activeHint, stop);
      return enforceMax25WordsClient(`Cevabı doğrudan söylersem keyfi kaçar 😊 ${cleanH || `**${topicName}** kuralına göre ilk işlemi sen kurar mısın?`}`);
    }

    // 1) Öğrenci belirli bir şıkkı (A, B, C, D) sorduysa o şıkkı analiz et
    if (Array.isArray(activeOptions) && activeOptions.length > 0) {
      const optMatch = text.match(/(?:^|\s)([ABCDabcd])\s*(?:şıkkı|seçeneği|olur\s*mu|m[ıiuü]|neden|niye|\?|$)/);
      if (optMatch) {
        const askedLetter = optMatch[1].toUpperCase();
        const askedOpt = activeOptions.find(o => o.letter === askedLetter);
        if (askedOpt) {
          const optValClean = stripHtml(askedOpt.text);
          if (askedLetter === activeCorrectLetter) {
            return enforceMax25WordsClient(`**${askedLetter}) ${optValClean}** çok güzel bir yaklaşım! 🎯 Sorudaki tüm şartları sağladığından eminsen işaretleyip dene!`);
          }
          const cleanH = sanitizeHintWithoutAnswer(activeHint, stop);
          return enforceMax25WordsClient(`**${askedLetter}) ${optValClean}** sorudaki koşulu tam sağlamıyor. ${cleanH || "Şarta uyan diğer çarpan veya işlemi dener misin?"}`);
        }
      }
    }

    // 2) Öğrenci metinde sayı sorduysa sembolik matematik kontrolü yap
    const userNumbers = (text.match(/\b\d{1,4}\b/g) || []).map(n => parseInt(n, 10)).filter(n => n > 0);
    const stemNumbers = (stripHtml((liveTask && liveTask.promptText) || stop.stem || stop.subtitle || "").match(/\b\d{1,4}\b/g) || []).map(n => parseInt(n, 10)).filter(n => n > 1);
    const liveTargetNum = (liveTask && Number(liveTask.targetNumber))
      || (liveTask && Array.isArray(liveTask.numbers) && Number(liveTask.numbers[0]))
      || null;
    const targetNum = liveTargetNum || stop.targetNumber || stop.rootNumber || (stop.gridModel && stop.gridModel.total) || stemNumbers[0] || null;

    if (userNumbers.length === 2 && (lower.includes("ebob") || lower.includes("ekok") || lower.includes("ortak") || lower.includes("asal"))) {
      const a = userNumbers[0], b = userNumbers[1];
      const eb = gcdLocal(a, b);
      const ek = (a * b) / eb;
      return enforceMax25WordsClient(`$\\text{EBOB}(${a},${b})=${eb}$, $\\text{EKOK}(${a},${b})=${ek}$. Soruda eş parçalara mı bölüyoruz, ortak katta mı buluşuyoruz?`);
    }

    if (userNumbers.length > 0 && targetNum && userNumbers[0] !== targetNum) {
      const askedNum = userNumbers[0];
      const big = Math.max(targetNum, askedNum);
      const small = Math.min(targetNum, askedNum);
      if (small > 1) {
        const rem = big % small;
        if (rem === 0) {
          const pair = big / small;
          return enforceMax25WordsClient(`$${big} \\div ${small} = ${pair}$ (kalan $0$, tam bölünür!). Peki sorudaki ek koşulu sağlıyor mu?`);
        }
        return enforceMax25WordsClient(`$${big} \\div ${small}$ işleminde kalan $${rem}$ oluyor, tam bölünmüyor. $${targetNum}$'ü tam bölen başka sayı dener misin?`);
      }
    }

    // 3) Öğrenci ilk kez son yanlışını sorduysa spesifik hata teşhisi ver
    if (studentTrace.wrongCount > 0 && turn <= 1 && (lower.includes("neden") || lower.includes("niye") || lower.includes("yanlış") || lower.includes("hata"))) {
      const pep = pickFreshMotivation(studentTrace.wrongCount + 1);
      return enforceMax25WordsClient(`${pep} ${diagnoseSpecificWrongAttempt({
        wrongValue: studentTrace.lastWrongValue,
        targetLabel: studentTrace.lastTargetLabel,
        customHint: stop.hint
      }, ctx)}`);
    }

    if (studentTrace.liveScreen && studentTrace.liveScreen.mode === "factor_methods_lab") {
      const ls = studentTrace.liveScreen;
      return enforceMax25WordsClient(
        `Harika gidiyorsun! 😊 **${ls.methodTitle || "Bu yöntem"}** adımında **${ls.targetNumber || ""}** sayısı için seçili kutuda çarpım veya bölüm ilişkisini dener misin?`
      );
    }

    // 4) Sınırsız, tekrarsız ve <=25 kelime Sokratik ilerleme
    const effectiveDepth = turn + Math.max(0, studentTrace.wrongCount - 1);
    const progressive = buildProgressiveSocraticHint({
      wrongValue: studentTrace.lastWrongValue,
      targetLabel: studentTrace.lastTargetLabel,
      customHint: stop.hint
    }, ctx, effectiveDepth);
    return enforceMax25WordsClient(progressive.body);
  }

  // ==========================================================================
  // 4. ÇİZGİ KARAKTER ARAYÜZÜ (DOM) VE CANLI SOHBET AKIŞI
  // ==========================================================================
  let isPanelOpen = false;
  let bubbleTimer = null;

  function setHeaderMascotMood(mood) {
    const headAvatar = document.getElementById("nartesHeadAvatar");
    const fabAvatar = document.getElementById("nartesFabAvatar");
    if (headAvatar) headAvatar.innerHTML = getAvatarHtml("nartes-avatar-md", mood);
    if (fabAvatar) fabAvatar.innerHTML = getAvatarHtml("nartes-avatar-lg", mood);
  }

  function applyPanelVisuals(open) {
    isPanelOpen = open;
    const chatPanel = document.getElementById("nartesChatPanel");
    const bubble = document.getElementById("nartesSpeechBubble");
    const fabBtn = document.getElementById("nartesFabBtn");
    const mentorRoot = document.getElementById("nartesMentorRoot");
    if (chatPanel) chatPanel.hidden = !open;
    if (bubble && open) bubble.hidden = true;
    if (mentorRoot) mentorRoot.classList.toggle("nartes-mentor-open", open);
    if (fabBtn) {
      fabBtn.setAttribute("aria-expanded", open ? "true" : "false");
      fabBtn.title = open ? "NarTES'i küçült" : "NarTES Sokratik Rehber'e Sor";
      const label = fabBtn.querySelector(".nartes-fab-text strong");
      const sub = fabBtn.querySelector(".nartes-fab-text small");
      if (label) label.textContent = open ? "NarTES'i Küçült" : "NarTES'e Sor";
      if (sub) {
        sub.textContent = open
          ? "Sohbeti kapat, derse dön"
          : (localAiServerOnline ? "Yerel Sokratik AI" : "Sokratik Rehber");
      }
    }
  }

  function updateVoiceToggleButtons() {
    const label = mentorVoiceEnabled ? "🔊 Sesli" : "🔇 Sessiz";
    const btnHead = document.getElementById("nartesVoiceToggleBtn");
    const btnBubble = document.getElementById("nartesBubbleVoiceBtn");
    if (btnHead) {
      btnHead.textContent = label;
      btnHead.classList.toggle("voice-on", mentorVoiceEnabled);
      btnHead.title = mentorVoiceEnabled ? "NarTES Sesli Yanıt Açık (Kapatmak için tıkla)" : "NarTES Sessiz Modda (Sesli yanıt için tıkla)";
    }
    if (btnBubble) {
      btnBubble.textContent = label;
      btnBubble.classList.toggle("voice-on", mentorVoiceEnabled);
    }
  }

  function toggleMentorVoice() {
    mentorVoiceEnabled = !mentorVoiceEnabled;
    try {
      localStorage.setItem(VOICE_PREF_KEY, mentorVoiceEnabled ? "1" : "0");
    } catch (e) {}
    updateVoiceToggleButtons();
    if (!mentorVoiceEnabled) {
      stopSpeaking();
    } else {
      speakMentorMessage("Sesli rehber modu açıldı.");
    }
  }

  function refreshQuickPromptChips() {
    const promptsWrap = document.getElementById("nartesQuickPrompts");
    if (!promptsWrap) return;
    const stop = (currentContext && currentContext.stop) || {};
    const ls = studentTrace.liveScreen;

    let chips = [];
    if (stop.activityMode === "factor_methods_lab" || (ls && ls.mode === "factor_methods_lab")) {
      const mName = (ls && ls.methodTitle) || "bu yöntem";
      chips = [
        { label: "🌸 Bu yöntem nasıl çalışır?", prompt: `Ekrandaki ${mName} yöntemini kısaca nasıl uygulayacağımı söyler misin?` },
        { label: "🎯 Seçili kutuyu nasıl bulurum?", prompt: `Ekranda seçili olan eksik kutuyu bulmak için hangi işlemi yapmalıyım?` },
        { label: "🔎 Neden yanlış oldu?", prompt: "Az önceki denemem neden olmadı?" }
      ];
    } else if (stop.type === "concept") {
      chips = [
        { label: "🧩 Boşluğu nasıl bulurum?", prompt: "Seçili mavi boşluğa hangi kavramın geleceğini nasıl anlayabilirim?" },
        { label: "📘 Kuralı kısaca anlat", prompt: "Bu duraktaki kuralı çok kısa ve basitçe anlatır mısın?" },
        { label: "🔎 Neden yanlış oldu?", prompt: "Az önceki seçimim neden olmadı?" }
      ];
    } else if (stop.type === "question") {
      chips = [
        { label: "🧭 İlk adım ne?", prompt: "Ekrandaki bu soruyu çözmeye ilk hangi işlemden başlamalıyım?" },
        { label: "📐 İpucu verir misin?", prompt: "Bu sorudaki sayılar arasındaki ilişkiyi kurmam için motive edici bir ipucu verir misin?" },
        { label: "🔎 Neden yanlış oldu?", prompt: "Son denediğim şık neden doğru değil?" }
      ];
    } else {
      chips = [
        { label: "🧭 Nasıl çözmeliyim?", prompt: "Bu etkinliği çözmek için ilk neye bakmalıyım?" },
        { label: "🔎 Neden olmadı?", prompt: "Son denemem neden yanlış oldu?" },
        { label: "📘 Kısa ipucu ver", prompt: "Bana kısa bir ipucu verir misin?" }
      ];
    }

    promptsWrap.innerHTML = chips
      .map(c => `<button type="button" class="nartes-prompt-chip" data-prompt="${c.prompt.replace(/"/g, "&quot;")}">${c.label}</button>`)
      .join("");

    promptsWrap.querySelectorAll(".nartes-prompt-chip").forEach(btn => {
      btn.addEventListener("click", () => {
        const q = btn.getAttribute("data-prompt");
        handleStudentQuestion(q);
      });
    });
  }

  function initNartesMentorDOM() {
    if (document.getElementById("nartesMentorRoot")) return;

    const root = document.createElement("div");
    root.id = "nartesMentorRoot";
    root.className = "nartes-mentor-root";
    root.innerHTML = `
      <!-- Karikatür Konuşma Balonu -->
      <div class="nartes-speech-bubble" id="nartesSpeechBubble" hidden>
        <button class="nartes-bubble-close" id="nartesBubbleClose" title="Kapat" aria-label="Kapat">✕</button>
        <div class="nartes-bubble-header">
          <div class="nartes-bubble-head-left">
            <span id="nartesBubbleAvatar">${getAvatarHtml("nartes-avatar-xs", "guide")}</span>
            <span class="nartes-bubble-badge">NarTES • Sokratik Rehber</span>
          </div>
          <button type="button" class="nartes-voice-pill" id="nartesBubbleVoiceBtn" title="Sesli / Sessiz Modu Değiştir"></button>
        </div>
        <div class="nartes-bubble-text" id="nartesBubbleText"></div>
        <div class="nartes-bubble-foot">
          <button class="nartes-bubble-action" id="nartesBubbleOpenChat">💬 NarTES'e Soru Sor →</button>
        </div>
      </div>

      <!-- Açılır Yerel Yapay Zeka Sohbet Penceresi (API Anahtarsız) -->
      <section class="nartes-chat-panel" id="nartesChatPanel" hidden aria-label="NarTES Sokratik Yapay Zeka Rehberi">
        <header class="nartes-chat-head">
          <div class="nartes-chat-head-left">
            <div class="nartes-head-avatar" id="nartesHeadAvatar">${getAvatarHtml("nartes-avatar-md", "guide")}</div>
            <div class="nartes-head-meta">
              <div class="nartes-head-title">
                <span>Bilge NarTES</span>
                <span class="nartes-head-tag is-online" id="nartesHeadTag">🟢 Yerel AI</span>
              </div>
              <div class="nartes-head-sub" id="nartesContextSub">Sadece bu ders için Sokratik rehberlik</div>
            </div>
          </div>
          <div class="nartes-head-actions">
            <button type="button" class="nartes-voice-pill" id="nartesVoiceToggleBtn" title="Sesli / Sessiz Modu Değiştir"></button>
            <button type="button" class="nartes-chat-close" id="nartesChatCloseBtn" title="Sohbeti Küçült">✕</button>
          </div>
        </header>

        <div class="nartes-chat-messages" id="nartesChatMessages"></div>

        <div class="nartes-quick-prompts" id="nartesQuickPrompts"></div>

        <form class="nartes-chat-form" id="nartesChatForm" autocomplete="off">
          <input
            type="text"
            id="nartesChatInput"
            class="nartes-chat-input"
            placeholder="Merhaba yaz, tanışalım ya da takıldığın adımı sor..."
            maxlength="280"
          />
          <button type="submit" class="nartes-chat-send" id="nartesChatSendBtn" title="Gönder">Sor ✨</button>
        </form>
      </section>

      <!-- Sağ Alt Sempatik Çizgi Karakter Düğmesi -->
      <button type="button" class="nartes-fab-btn" id="nartesFabBtn" title="NarTES Sokratik Rehber'e Sor">
        <span class="nartes-fab-avatar" id="nartesFabAvatar">${getAvatarHtml("nartes-avatar-lg", "guide")}</span>
        <span class="nartes-fab-text">
          <strong>NarTES'e Sor</strong>
          <small>Yerel Sokratik AI</small>
        </span>
      </button>
    `;

    document.body.appendChild(root);
    updateVoiceToggleButtons();
    refreshQuickPromptChips();
    checkLocalAiHealth();

    const fabBtn = document.getElementById("nartesFabBtn");
    const closeBtn = document.getElementById("nartesChatCloseBtn");
    const voiceBtnHead = document.getElementById("nartesVoiceToggleBtn");
    const voiceBtnBubble = document.getElementById("nartesBubbleVoiceBtn");
    const bubble = document.getElementById("nartesSpeechBubble");
    const bubbleClose = document.getElementById("nartesBubbleClose");
    const bubbleOpenChat = document.getElementById("nartesBubbleOpenChat");
    const form = document.getElementById("nartesChatForm");
    const input = document.getElementById("nartesChatInput");

    function toggleChatPanel(forceState) {
      const next = typeof forceState === "boolean" ? forceState : !isPanelOpen;
      applyPanelVisuals(next);
      if (next) {
        if (!localAiServerOnline) {
          checkLocalAiHealth();
        }
        const msgBox = document.getElementById("nartesChatMessages");
        if (msgBox && msgBox.children.length === 0) {
          const stopTitle = (currentContext.stop && currentContext.stop.title) || "Çarpanlar ve Katlar";
          let welcome;
          if (socialState.studentName) {
            welcome = `Tekrar merhaba **${socialState.studentName}**! 😊 Bugün nasılsın? Ekrandaki **${stopTitle}** adımına birlikte bakalım mı?`;
            socialState.lastSocialStage = "asked_how_are_you";
          } else {
            welcome = `Merhaba, hoş geldin! 👋 Ben Bilge NarTES. Bugün nasılsın? İstersen önce tanışabilir ya da ekrandaki adıma başlayabiliriz!`;
            socialState.lastSocialStage = "greeted_ask_name";
          }
          saveSocialState();
          appendMessage("bot", enforceMax25WordsClient(welcome, MAX_MENTOR_WORDS), true, "praise");
        }
        setTimeout(() => input && input.focus(), 60);
      }
    }

    fabBtn.addEventListener("click", () => toggleChatPanel());
    closeBtn.addEventListener("click", () => toggleChatPanel(false));
    voiceBtnHead.addEventListener("click", toggleMentorVoice);
    voiceBtnBubble.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleMentorVoice();
    });

    bubbleClose.addEventListener("click", (e) => {
      e.stopPropagation();
      bubble.hidden = true;
      stopSpeaking();
    });
    bubbleOpenChat.addEventListener("click", () => {
      toggleChatPanel(true);
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const val = input.value.trim();
      if (!val) return;
      input.value = "";
      handleStudentQuestion(val);
    });
  }

  function escapeHtmlBasic(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function formatMarkdownPreservingClosedMath(text, allowOpenBold) {
    const mathTokens = [];
    const stash = (match) => {
      const idx = mathTokens.length;
      mathTokens.push(escapeHtmlBasic(match));
      return `\u0000NMATH${idx}\u0000`;
    };

    let work = String(text || "")
      .replace(/\$\$[\s\S]+?\$\$/g, stash)
      .replace(/\\\[[\s\S]+?\\\]/g, stash)
      .replace(/\\\([\s\S]+?\\\)/g, stash)
      .replace(/(^|[^\\])\$(?!\$)(?:\\.|[^$\\\n])+\$/g, (full, pre) => {
        const expr = full.slice(pre.length);
        return pre + stash(expr);
      });

    work = escapeHtmlBasic(work)
      .replace(/\\times\b/g, "×")
      .replace(/\\div\b/g, "÷")
      .replace(/\\cdot\b/g, "·")
      .replace(/\\pm\b/g, "±")
      .replace(/\\le(?:q)?\b/g, "≤")
      .replace(/\\ge(?:q)?\b/g, "≥")
      .replace(/\\ne(?:q)?\b/g, "≠")
      .replace(/\\Rightarrow\b/g, "⇒")
      .replace(/\\rightarrow\b|\\to\b/g, "→")
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/(^|[^*])\*(?!\*)(.+?)\*(?!\*)/g, "$1<em>$2</em>");

    if (allowOpenBold) {
      work = work.replace(/\*\*([^*]+)$/, "<strong>$1</strong>");
      // Sonda yarıda kalmış tek ters eğik çizgi varsa yazım bitene kadar gizle
      work = work.replace(/\\[a-zA-Z]*$/, "");
    }

    work = work.replace(/\n/g, "<br>");
    return work.replace(/\u0000NMATH(\d+)\u0000/g, (_, i) => mathTokens[Number(i)] || "");
  }

  function formatMarkdownAndMath(text) {
    return formatMarkdownPreservingClosedMath(text, false);
  }

  const COMPLETE_LATEX_SYMBOLS = new Set([
    "times", "div", "cdot", "pm", "mp", "le", "leq", "ge", "geq", "neq", "ne",
    "approx", "Rightarrow", "rightarrow", "to", "infty", "pi", "in", "notin",
    "subset", "cup", "cap", "dots", "cdots", "ldots"
  ]);

  function fallbackReadableMathPreview(rawLatex) {
    return escapeHtmlBasic(
      String(rawLatex || "")
        .replace(/\\text\{([^}]*)\}?/g, "$1")
        .replace(/\\times\b/g, " × ")
        .replace(/\\div\b/g, " ÷ ")
        .replace(/\\cdot\b/g, " · ")
        .replace(/\\Rightarrow\b/g, " ⇒ ")
        .replace(/\\rightarrow\b|\\to\b/g, " → ")
        .replace(/\\le(?:q)?\b/g, " ≤ ")
        .replace(/\\ge(?:q)?\b/g, " ≥ ")
        .replace(/\\ne(?:q)?\b/g, " ≠ ")
        .replace(/\\[a-zA-Z]*$/g, "")
        .replace(/[{}]/g, "")
        .replace(/\s+/g, " ")
        .trim()
    );
  }

  function renderOpenLatexPreviewHtml(rawOpenLatex, isDisplay) {
    const trimmed = String(rawOpenLatex || "").trim();
    if (!trimmed) return "";

    let prep = trimmed;
    // Yarıda kalmış ters eğik çizgi veya henüz tamamlanmamış LaTeX komutunu geçici temizle
    prep = prep.replace(/\\([a-zA-Z]*)$/, (full, cmd) => {
      if (!cmd) return "";
      if (COMPLETE_LATEX_SYMBOLS.has(cmd)) return full;
      return "";
    });

    prep = prep.trim();
    if (!prep) return "";

    // Yarıda kalmış kök, üs, indis veya kesir yapılarını KaTeX için dengeli hâle getir
    prep = prep
      .replace(/\\frac\s*$/, "")
      .replace(/\\sqrt\s*$/, "\\sqrt{\\,}")
      .replace(/(\^|_)\s*$/, "$1{\\,}")
      .replace(/(\\times|\\div|\\cdot|\\pm|\+|-|=)\s*$/, "$1 {}");

    // Açık kalan { süslü parantezleri kapat
    let openBraces = 0;
    for (let i = 0; i < prep.length; i++) {
      if (prep[i] === "\\" && i + 1 < prep.length) {
        i++;
        continue;
      }
      if (prep[i] === "{") openBraces++;
      else if (prep[i] === "}" && openBraces > 0) openBraces--;
    }
    if (prep.endsWith("{")) {
      prep += "\\,";
    }
    if (openBraces > 0) {
      prep += "}".repeat(openBraces);
    }
    // \frac{a} gibi ikinci paydası henüz yazılmamış kesri tamamla
    if (/\\frac\{[^{}]*\}$/.test(prep)) {
      prep += "{\\,}";
    }

    if (window.katex && typeof window.katex.renderToString === "function") {
      try {
        return window.katex.renderToString(prep, {
          displayMode: Boolean(isDisplay),
          throwOnError: true
        });
      } catch (_) {}
    }

    const cleanPreview = fallbackReadableMathPreview(trimmed);
    return cleanPreview ? `<span class="nartes-live-math">${cleanPreview}</span>` : "";
  }

  function renderStreamingBubbleMath(bubbleEl, partialText) {
    if (!bubbleEl) return;
    const src = String(partialText || "");

    // Tamamlanmış tüm matematik bloklarını maskeleyip sonda açık kalan matematik başlangıcı var mı kontrol et
    let scan = src
      .replace(/\$\$[\s\S]+?\$\$/g, m => "X".repeat(m.length))
      .replace(/\\\[[\s\S]+?\\\]/g, m => "X".repeat(m.length))
      .replace(/\\\([\s\S]+?\\\)/g, m => "X".repeat(m.length))
      .replace(/(^|[^\\])\$(?!\$)(?:\\.|[^$\\\n])+\$/g, (m, pre) => pre + "X".repeat(m.length - pre.length));

    let openPos = -1;
    let openLen = 0;
    let isDisplay = false;

    const candidates = [
      { idx: scan.indexOf("$$"), len: 2, disp: true },
      { idx: scan.indexOf("\\["), len: 2, disp: true },
      { idx: scan.indexOf("\\("), len: 2, disp: false }
    ];
    const singleDollarMatch = /(^|[^\\])\$(?!\$)/.exec(scan);
    if (singleDollarMatch) {
      const dPos = singleDollarMatch.index + singleDollarMatch[1].length;
      candidates.push({ idx: dPos, len: 1, disp: false });
    }

    for (const c of candidates) {
      if (c.idx !== -1 && (openPos === -1 || c.idx < openPos)) {
        openPos = c.idx;
        openLen = c.len;
        isDisplay = c.disp;
      }
    }

    if (openPos === -1) {
      bubbleEl.innerHTML = formatMarkdownPreservingClosedMath(src, true);
      renderMathInside(bubbleEl);
      return;
    }

    const closedPrefix = src.slice(0, openPos);
    const rawOpenLatex = src.slice(openPos + openLen);
    const tempPrefix = document.createElement("span");
    tempPrefix.innerHTML = formatMarkdownPreservingClosedMath(closedPrefix, true);
    renderMathInside(tempPrefix);
    const liveMathHtml = renderOpenLatexPreviewHtml(rawOpenLatex, isDisplay);

    bubbleEl.innerHTML = tempPrefix.innerHTML + liveMathHtml;
  }

  function renderMathInside(el) {
    if (!el || !window.renderMathInElement) return;
    try {
      window.renderMathInElement(el, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "\\[", right: "\\]", display: true },
          { left: "$", right: "$", display: false },
          { left: "\\(", right: "\\)", display: false }
        ],
        throwOnError: false
      });
    } catch (e) {}
  }

  function appendMessage(sender, text, shouldSpeak, mood) {
    initNartesMentorDOM();
    const msgBox = document.getElementById("nartesChatMessages");
    if (!msgBox) return null;

    const item = document.createElement("div");
    item.className = `nartes-msg nartes-msg-${sender}`;
    item.innerHTML = `
      ${sender === "bot" ? `<div class="nartes-msg-avatar">${getAvatarHtml("nartes-avatar-sm", mood || "guide")}</div>` : ""}
      <div class="nartes-msg-bubble">${formatMarkdownAndMath(text)}</div>
    `;
    msgBox.appendChild(item);
    renderMathInside(item);
    msgBox.scrollTop = msgBox.scrollHeight;

    if (sender === "bot" && shouldSpeak !== false) {
      speakMentorMessage(text);
    }
    return item;
  }

  async function handleStudentQuestion(questionText) {
    const cleanQ = String(questionText || "").trim();
    if (!cleanQ) return;

    initNartesMentorDOM();
    if (!isPanelOpen) {
      applyPanelVisuals(true);
    }

    appendMessage("user", cleanQ, false);
    playMentorSound("hint");
    setHeaderMascotMood("thinking");

    const msgBox = document.getElementById("nartesChatMessages");
    const streamItem = document.createElement("div");
    streamItem.className = "nartes-msg nartes-msg-bot is-streaming";
    streamItem.innerHTML = `
      <div class="nartes-msg-avatar">${getAvatarHtml("nartes-avatar-sm", "thinking")}</div>
      <div class="nartes-msg-bubble">
        <span class="nartes-typing-dots" aria-label="NarTES düşünüyor">
          <span></span><span></span><span></span>
        </span>
      </div>
    `;
    if (msgBox) {
      msgBox.appendChild(streamItem);
      msgBox.scrollTop = msgBox.scrollHeight;
    }

    const bubbleEl = streamItem.querySelector(".nartes-msg-bubble");
    const avatarEl = streamItem.querySelector(".nartes-msg-avatar");

    const socialHit = matchFriendlySocialTurn(cleanQ, currentContext);
    let finalReply = null;
    let replyMood = "guide";

    if (socialHit) {
      await new Promise(resolve => setTimeout(resolve, 180));
      finalReply = socialHit.reply;
      replyMood = socialHit.mood || "praise";
    } else {
      finalReply = await streamFromLocalServerAI(cleanQ, currentContext, (partialText) => {
        if (!bubbleEl) return;
        renderStreamingBubbleMath(bubbleEl, partialText);
        if (msgBox) msgBox.scrollTop = msgBox.scrollHeight;
      });

      if (!finalReply) {
        finalReply = generateOfflineFallbackReply(cleanQ, currentContext);
      }
    }
    finalReply = enforceMax25WordsClient(finalReply, MAX_MENTOR_WORDS);

    streamItem.classList.remove("is-streaming");
    if (avatarEl) avatarEl.innerHTML = getAvatarHtml("nartes-avatar-sm", replyMood);
    if (bubbleEl) {
      bubbleEl.innerHTML = formatMarkdownAndMath(finalReply);
      renderMathInside(bubbleEl);
    }
    if (msgBox) msgBox.scrollTop = msgBox.scrollHeight;

    // Çok turlu hafızaya kaydet (aynı soruda takip sorularını anlaması ve tekrar etmemesi için)
    studentTrace.chatHistory.push({ role: "user", content: cleanQ });
    studentTrace.chatHistory.push({ role: "assistant", content: finalReply });
    if (studentTrace.chatHistory.length > 12) {
      studentTrace.chatHistory = studentTrace.chatHistory.slice(-12);
    }

    setHeaderMascotMood(replyMood);
    speakMentorMessage(finalReply);
  }

  function showSpeechBubble(text, mood, durationMs) {
    initNartesMentorDOM();
    const m = mood || "guide";
    setHeaderMascotMood(m);

    if (isPanelOpen) {
      appendMessage("bot", text, true, m);
      return;
    }
    const bubble = document.getElementById("nartesSpeechBubble");
    const bubbleText = document.getElementById("nartesBubbleText");
    const bubbleAvatar = document.getElementById("nartesBubbleAvatar");
    if (!bubble || !bubbleText) return;

    bubble.className = `nartes-speech-bubble mood-${m}`;
    if (bubbleAvatar) bubbleAvatar.innerHTML = getAvatarHtml("nartes-avatar-xs", m);
    bubbleText.innerHTML = formatMarkdownAndMath(text);
    renderMathInside(bubbleText);
    bubble.hidden = false;
    speakMentorMessage(text);

    clearTimeout(bubbleTimer);
    bubbleTimer = setTimeout(() => {
      bubble.hidden = true;
      setHeaderMascotMood("guide");
    }, durationMs || 7000);
  }

  // ==========================================================================
  // 5. DIŞARIYA AÇILAN API (app.js entegrasyonu)
  // ==========================================================================
  window.NartesMentor = {
    isRemediationLocked() {
      return Boolean(studentTrace.remediationLocked);
    },

    setContext(ctx) {
      initNartesMentorDOM();
      const prevStopId = currentContext && currentContext.stop ? currentContext.stop.id : null;
      const prevUnitNo = currentContext && currentContext.unit ? currentContext.unit.unitNo : null;
      const prevSubIdx = currentContext && currentContext.stop && typeof currentContext.stop.activeQuestionIndex === "number"
        ? currentContext.stop.activeQuestionIndex
        : null;
      const nextStopId = ctx && ctx.stop ? ctx.stop.id : null;
      const nextUnitNo = ctx && ctx.unit ? ctx.unit.unitNo : null;
      const nextSubIdx = ctx && ctx.stop && typeof ctx.stop.activeQuestionIndex === "number"
        ? ctx.stop.activeQuestionIndex
        : null;
      const stopChanged = prevStopId !== nextStopId || prevUnitNo !== nextUnitNo || prevSubIdx !== nextSubIdx;

      if (gateCountdownTimer && stopChanged) {
        clearInterval(gateCountdownTimer);
        gateCountdownTimer = null;
      }

      currentContext = ctx || { unit: null, kaz: null, stop: null };
      if (stopChanged) {
        if (activeStreamAbort) {
          try { activeStreamAbort.abort(); } catch (_) {}
          activeStreamAbort = null;
        }
        studentTrace = {
          wrongCount: 0,
          attemptCountsByTarget: {},
          wrongChoices: [],
          lastWrongValue: null,
          lastTargetLabel: null,
          filledBlanks: {},
          activeBlankId: null,
          liveScreen: null,
          liveTask: null,
          liveTaskSignature: "",
          chatTurnCount: 0,
          chatHistory: [],
          usedMotivationIndices: [],
          shownHintBodies: [],
          remediationLocked: false
        };
        const gateEl = document.getElementById("nartesStudyGateOverlay");
        if (gateEl) gateEl.hidden = true;
      }

      const subEl = document.getElementById("nartesContextSub");
      if (subEl && currentContext.stop) {
        const badgePart = currentContext.stop.subQuestionBadge ? ` • ${currentContext.stop.subQuestionBadge}` : "";
        subEl.textContent = `Adım ${currentContext.stop.id}: ${currentContext.stop.title}${badgePart}`;
      }

      if (stopChanged) {
        const msgBox = document.getElementById("nartesChatMessages");
        if (msgBox && isPanelOpen && currentContext.stop) {
          msgBox.innerHTML = "";
          appendMessage(
            "bot",
            `Şimdi **Durak ${currentContext.stop.id}: ${currentContext.stop.title}** adımındayız! ✨ Takıldığın herhangi bir noktayı bana sorabilirsin.`,
            false,
            "guide"
          );
        } else if (msgBox && !isPanelOpen) {
          msgBox.innerHTML = "";
        }
      }

      refreshQuickPromptChips();
      setHeaderMascotMood("guide");

      if (stopChanged) {
        const bubble = document.getElementById("nartesSpeechBubble");
        if (bubble) bubble.hidden = true;
      }
    },

    notifyScreenTask(liveTask) {
      initNartesMentorDOM();
      if (!liveTask || typeof liveTask !== "object") return;
      const sig = String(liveTask.signature || `${liveTask.taskTitle || ""}:${liveTask.targetNumber || ""}:${(liveTask.numbers || []).join(",")}`);
      const changed = studentTrace.liveTaskSignature !== sig;
      studentTrace.liveTask = liveTask;
      studentTrace.liveTaskSignature = sig;

      if (changed) {
        if (activeStreamAbort) {
          try { activeStreamAbort.abort(); } catch (_) {}
          activeStreamAbort = null;
        }
        studentTrace.wrongCount = 0;
        studentTrace.attemptCountsByTarget = {};
        studentTrace.wrongChoices = [];
        studentTrace.lastWrongValue = null;
        studentTrace.lastTargetLabel = null;
        studentTrace.chatHistory = [];
        studentTrace.shownHintBodies = [];
        studentTrace.usedMotivationIndices = [];
        studentTrace.remediationLocked = false;
        if (gateCountdownTimer) {
          clearInterval(gateCountdownTimer);
          gateCountdownTimer = null;
        }
        const gateEl = document.getElementById("nartesStudyGateOverlay");
        if (gateEl) gateEl.hidden = true;
        const bubble = document.getElementById("nartesSpeechBubble");
        if (bubble) bubble.hidden = true;
        const msgBox = document.getElementById("nartesChatMessages");
        if (msgBox) {
          msgBox.innerHTML = "";
          if (isPanelOpen) {
            const label = liveTask.taskTitle || (liveTask.targetNumber ? `Hedef ${liveTask.targetNumber}` : "Yeni Görev");
            appendMessage("bot", `Aktif ekran güncellendi: **${label}**. Takıldığın adımı sorabilirsin! ✨`, false, "guide");
          }
        }
      }

      const subEl = document.getElementById("nartesContextSub");
      if (subEl) {
        const title = liveTask.taskTitle || (currentContext.stop && currentContext.stop.title) || "Etkinlik";
        const tPart = liveTask.targetNumber ? ` • Sayı: ${liveTask.targetNumber}` : "";
        subEl.textContent = `${title}${tPart}`;
      }
      refreshQuickPromptChips();
    },

    updateProgress(info) {
      if (!info || typeof info !== "object") return;
      if (info.filledBlanks) studentTrace.filledBlanks = info.filledBlanks;
      if (info.activeBlankId !== undefined) studentTrace.activeBlankId = info.activeBlankId;
      if (info.liveTask) {
        this.notifyScreenTask(info.liveTask);
      }
      if (info.liveScreen) {
        studentTrace.liveScreen = info.liveScreen;
        const subEl = document.getElementById("nartesContextSub");
        if (subEl && info.liveScreen.methodTitle) {
          subEl.textContent = `${info.liveScreen.methodTitle} • Hedef: ${info.liveScreen.targetNumber || ""}`;
        }
        refreshQuickPromptChips();
      }
    },

    onCorrect() {
      initNartesMentorDOM();
      if (gateCountdownTimer) {
        clearInterval(gateCountdownTimer);
        gateCountdownTimer = null;
      }
      studentTrace.wrongCount = 0;
      studentTrace.remediationLocked = false;
      const gateEl = document.getElementById("nartesStudyGateOverlay");
      if (gateEl) gateEl.hidden = true;
      const picked = pickNonRepeating(PRAISE_POOL, lastPraiseIdx);
      lastPraiseIdx = picked.idx;
      showSpeechBubble(`🎉 ${picked.text}`, "praise", 5200);
    },

    onWrong(detailOrHint, onUnlockAfterReview) {
      initNartesMentorDOM();
      const detail = typeof detailOrHint === "string"
        ? { customHint: detailOrHint }
        : (detailOrHint || {});

      studentTrace.wrongCount++;
      const tKey = String(detail.targetKey || detail.targetLabel || "default");
      studentTrace.attemptCountsByTarget[tKey] = (studentTrace.attemptCountsByTarget[tKey] || 0) + 1;
      const attemptForTarget = studentTrace.attemptCountsByTarget[tKey];

      if (detail.wrongValue !== undefined && detail.wrongValue !== null) {
        const wStr = String(detail.wrongValue).trim();
        studentTrace.lastWrongValue = wStr;
        if (wStr && !studentTrace.wrongChoices.includes(wStr)) {
          studentTrace.wrongChoices.push(wStr);
        }
      }
      if (detail.targetLabel) {
        studentTrace.lastTargetLabel = detail.targetLabel;
      }

      const bubble = document.getElementById("nartesSpeechBubble");
      if (bubble) bubble.hidden = true;

      showSocraticHintBox(currentContext, detail, attemptForTarget, onUnlockAfterReview);
      return { lockedForReview: true, wrongCount: studentTrace.wrongCount, attemptNo: attemptForTarget };
    },

    nudgeQuestionPanel(questionText) {
      initNartesMentorDOM();
      playMentorSound("hint");
      showSpeechBubble(
        enforceMax25WordsClient(`Harika! Soldaki adımları tamamladın; şimdi sağdaki doğrulama sorusunu yanıtlayıp sıradaki durağı açabilirsin! 👉`),
        "guide",
        6500
      );
    },

    openWithHint() {
      initNartesMentorDOM();
      applyPanelVisuals(true);
      handleStudentQuestion("Bu adımı çözmek için bana yol gösterici bir Sokratik ipucu verir misin?");
    }
  };
})();
