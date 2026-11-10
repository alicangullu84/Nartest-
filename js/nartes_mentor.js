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
    chatTurnCount: 0,
    chatHistory: [],
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
  function diagnoseSpecificWrongAttempt(detail, ctx) {
    const stop = (ctx && ctx.stop) || {};
    const wrongVal = detail && detail.wrongValue !== undefined ? String(detail.wrongValue).trim() : "";
    const targetInfo = detail && detail.targetLabel ? String(detail.targetLabel).trim() : "";
    const customHint = detail && detail.customHint
      ? sanitizeHintWithoutAnswer(detail.customHint, stop, detail.correctAnswerToMask)
      : "";

    if (stop.type === "concept") {
      if (wrongVal === "katıdır") {
        return `Az önce **"katıdır"** seçeneğini denedin; ancak küçük sayı ($4$ veya $6$) büyük sayıyı ($24$'ü) kalansız böldüğünde ona **kat** değil, **bölen (çarpan)** diyoruz. Kat, çarpım sonucunda oluşan büyük sayıdır.`;
      }
      if (wrongVal === "çarpanıdır" || wrongVal === "bölenidir") {
        return `Az önce **"${wrongVal}"** seçtin fakat bu mavi boşlukta büyük sayının küçük sayıya göre durumu soruluyor ($24 = 4 \\times 6$). Büyük sayı küçük sayının böleni mi yoksa **katı** mı olur?`;
      }
      if (wrongVal === "kalanıdır" || wrongVal === "farkıdır") {
        return `**"${wrongVal}"** kavramı çıkarma veya kalanlı bölme ile ilgilidir. Oysa burada kalan $0$ olan tam bir çarpma-bölme ilişkisi var. Bölen ve kat kavramlarını tekrar düşünür müsün?`;
      }
      if (wrongVal === "kalanlı" || wrongVal === "ondalıklı") {
        return `**"${wrongVal}"** seçtin ama bölme işleminde hiç artan sayı yok! Bir bölme işleminde kalan $0$ ise o bölünmeye ne ad veririz?`;
      }
      if (wrongVal === "1") {
        return `**$1$** sayısını seçtin ama unutma: Asal sayılar $1$'den büyük olmak zorundadır. En küçük ve tek çift asal sayımız hangisiydi?`;
      }
    }

    if (stop.type === "video") {
      if (wrongVal.includes("8 farklı") || wrongVal.includes("6 farklı")) {
        return `**"${wrongVal}"** işaretledin. Toplam çarpan sayısı ile **dikdörtgen (çarpan çifti) sayısını** karıştırmış olabilirsin! Her dikdörtgen $2$ çarpanın eşleşmesiyle kurulur: $(1\\times 24), (2\\times 12), (3\\times 8), (4\\times 6)$. Kaç çift oluştu?`;
      }
      if (wrongVal.includes("3 farklı") || wrongVal.includes("2 farklı")) {
        return `**"${wrongVal}"** seçtin ama soldaki animasyonda kurduğumuz $(1\\times 24)$, $(2\\times 12)$, $(3\\times 8)$ ve $(4\\times 6)$ dikdörtgenlerini tekrar sayalım; birini atlamış olabilir misin?`;
      }
    }

    if (stop.type === "activity") {
      if (stop.activityMode === "rainbow_pairs" && stop.targetNumber) {
        const num = parseInt(wrongVal, 10);
        if (!isNaN(num)) {
          const rem = stop.targetNumber % num;
          if (rem !== 0) {
            return `Seçtiğin **$${num}$** sayısı **$${stop.targetNumber}$** sayısını kalansız bölemez ($${stop.targetNumber} \\div ${num}$ işleminde kalan $${rem}$ olur). Çarpımı $${stop.targetNumber}$ veren çarpan çiftini düşün!`;
          }
          return `Seçtiğin **$${num}$** sayısı $${stop.targetNumber}$'ün bir çarpanı, ancak şu an seçili olan kutunun küçükten büyüğe sırasına uymuyor!`;
        }
      }
      if (stop.activityMode === "factor_tree") {
        return `Çarpan ağacında **${targetInfo || "bu dal"}** için **${wrongVal}** seçtin. Dalın üstündeki sayıyı yanındaki çarpana böldüğünde kaç çıktığını kontrol eder misin?`;
      }
      if (stop.activityMode === "ebob_ekok_sort" || stop.activityMode === "coprime_check" || stop.activityMode === "custom_sort") {
        return `Bu kart için **"${wrongVal}"** seçtin. Büyük bir bütünü eş parçalara mı ayırıyoruz (EBOB), yoksa küçük adımları katlayıp ortak bir noktada mı buluşturuyoruz (EKOK)?`;
      }
    }

    if (stop.type === "game") {
      if (stop.gameType === "factor_hunter" && detail && detail.targetNumber) {
        const t = detail.targetNumber;
        const n = parseInt(wrongVal, 10);
        const rem = !isNaN(n) ? (t % n) : null;
        return `Seçtiğin **$${wrongVal}$** sayısı **$${t}$** sayısını tam bölemez (kalan: **$${rem !== null ? rem : "sıfırdan farklı"}$**). Kalanı $0$ yapan bölenleri arıyoruz!`;
      }
      return `Az önce **${wrongVal}** değerini denedin ama kuralı sağlamadı. ${customHint || "Sayıların arasındaki matematiksel ilişkiyi tekrar hesaplayalım!"}`;
    }

    if (stop.type === "question") {
      const cleanH = sanitizeHintWithoutAnswer(stop.hint, stop);
      return `Seçtiğin **${wrongVal}** şıkkı sorudaki koşulu sağlamadı. Şu noktaya dikkat et: *${cleanH || "Soruda verilen değerleri kurala yerleştirerek adım adım kontrol edelim."}*`;
    }

    return customHint
      ? `Az önce **${wrongVal || "bu seçeneği"}** denedin. Şu ipucuna odaklanalım: *${customHint}*`
      : `Az önce **${wrongVal || "bu seçeneği"}** denedin ama tam uymadı. Verilen sayılar arasındaki ilişkiyi tekrar kontrol edelim!`;
  }

  function buildProgressiveSocraticHint(detail, ctx, attemptNo) {
    const stop = (ctx && ctx.stop) || {};
    const kaz = (ctx && ctx.kaz) || {};
    const unit = (ctx && ctx.unit) || {};
    const wrongVal = detail && detail.wrongValue !== undefined ? String(detail.wrongValue).trim() : "";
    const cleanStopHint = sanitizeHintWithoutAnswer((detail && detail.customHint) || stop.hint, stop, detail && detail.correctAnswerToMask);

    // Genel kural cümlesi (1. deneme için)
    let generalRule = "";
    if (Array.isArray(stop.explanation) && stop.explanation.length > 0) {
      generalRule = sanitizeHintWithoutAnswer(stop.explanation[0], stop, detail && detail.correctAnswerToMask);
    } else if (unit && Array.isArray(unit.stops)) {
      const conceptStop = unit.stops.find(s => s.kazanimId === stop.kazanimId && s.type === "concept");
      if (conceptStop && Array.isArray(conceptStop.explanation) && conceptStop.explanation[0]) {
        generalRule = sanitizeHintWithoutAnswer(conceptStop.explanation[0], stop, detail && detail.correctAnswerToMask);
      }
    }

    // 1. DENEME: DAHA GENEL KAVRAMSAL İPUCU (10-11 yaşa uygun, kısa ve tek bakışta okunur)
    if (attemptNo <= 1) {
      let shortRule = "";
      if (stop.type === "question" && cleanStopHint) {
        shortRule = cleanStopHint;
      } else if (generalRule) {
        const sentences = generalRule.split(/[.!?]+/).map(s => s.trim()).filter(Boolean);
        shortRule = (sentences.find(s => s.length >= 35) || sentences[0] || "").trim();
      }
      if (shortRule && !/[.!?]$/.test(shortRule)) shortRule += ".";
      const intro = shortRule
        || cleanStopHint
        || `**${kaz.title || stop.title || "Bu konu"}** kuralını hatırlayalım: Verilen sayıların birbirini tam bölüp bölmediğine dikkat edelim.`;
      return {
        badge: "🧭 1. İpucu • Genel Hatırlatma",
        mood: "encourage",
        body: `${intro} Buna göre soruya bir kez daha bakar mısın?`
      };
    }

    // 2. DENEME: SEÇİME ÖZEL YÖNLENDİRME
    if (attemptNo === 2) {
      const specificText = diagnoseSpecificWrongAttempt(detail, ctx);
      return {
        badge: "🔎 2. İpucu • Özel Yönlendirme",
        mood: "thinking",
        body: specificText
      };
    }

    // 3. VE SONRAKİ DENEMELER: ADIM ADIM DAHA YAKIN REHBERLİK (CEVABI SÖYLEMEDEN, KISA VE NET)
    let closerGuide = "";
    if (stop.type === "question" && stop.solution) {
      const solSentences = stripHtml(stop.solution).split(/[.!?]+/).map(s => s.trim()).filter(Boolean);
      const firstSetup = solSentences.length > 1 ? solSentences[0] : "";
      const safeSetup = sanitizeHintWithoutAnswer(firstSetup, stop, detail && detail.correctAnswerToMask);
      closerGuide = safeSetup
        ? `Gel ilk adımı birlikte kuralım: **${safeSetup}.** Bu adımı devam ettirince hangi şıkka ulaşıyorsun?`
        : `${cleanStopHint || "Verilen sayıları küçükten büyüğe yazıp kuralı dene."} Şimdi hangi seçenek doğru görünüyor?`;
    } else {
      closerGuide = cleanStopHint
        ? `🎯 **Yakın İpucu:** *${cleanStopHint}* Buna göre doğru seçeneği bulabilir misin?`
        : diagnoseSpecificWrongAttempt(detail, ctx);
    }

    return {
      badge: `🎯 ${attemptNo}. İpucu • Adım Adım Rehber`,
      mood: "encourage",
      body: closerGuide
    };
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

    gateEl.innerHTML = `
      <div class="nartes-socratic-box" role="dialog" aria-modal="true" aria-labelledby="nartesHintBadge">
        <div class="nsb-top">
          <div class="nsb-avatar">${getAvatarHtml("nartes-avatar-md", hintData.mood)}</div>
          <div class="nsb-meta">
            <span class="nsb-badge" id="nartesHintBadge">${hintData.badge}</span>
            <div class="nsb-sub">Bilge NarTES seni doğruya adım adım yönlendiriyor</div>
          </div>
        </div>

        <div class="nsb-body">${formatMarkdownAndMath(hintData.body)}</div>

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
    if (isGitHubOrRemoteStatic) {
      list.push("");
    }
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
          localAiModelLabel = "Yerel AI Aktif";
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
      tagEl.textContent = localAiServerOnline ? "🟢 Yerel AI" : "⚡ Sokratik Mod";
      tagEl.classList.toggle("is-online", localAiServerOnline);
    }
    if (fabSub && !isPanelOpen) {
      fabSub.textContent = localAiServerOnline ? "Yerel Sokratik AI" : "Sokratik Rehber";
    }
  }

  function buildClientContextPayload(ctx) {
    const unit = (ctx && ctx.unit) || {};
    const kaz = (ctx && ctx.kaz) || {};
    const stop = (ctx && ctx.stop) || {};
    return {
      unitNo: unit.unitNo || 1,
      unitTitle: unit.title || "Çarpanlar ve Katlar",
      kazTitle: kaz.title || "",
      stopId: stop.id || 1,
      stopTitle: stop.title || "",
      stopType: stop.type || "concept"
    };
  }

  async function streamFromLocalServerAI(questionText, ctx, onChunk) {
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
              wrongChoices: studentTrace.wrongChoices.slice(-5),
              filledBlanks: studentTrace.filledBlanks || {},
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
            if (evt.type === "delta" && evt.text) {
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

  // Yalnızca sunucu kapalıysa (ör. statik dosya olarak açıldığında) devreye giren çevrimdışı yedek
  function generateOfflineFallbackReply(rawText, ctx) {
    const text = String(rawText || "").trim();
    const lower = text.toLocaleLowerCase("tr-TR");
    const stop = (ctx && ctx.stop) || {};
    const kaz = (ctx && ctx.kaz) || {};
    const unit = (ctx && ctx.unit) || {};

    studentTrace.chatTurnCount++;

    if (PROFANITY_LIST.some(w => lower.includes(w))) {
      return "Ben **NarTES**, senin matematik arkadaşınım. Aramızda her zaman nazik ve temiz bir dil kullanalım 😊 Gel şimdi sorumuzdaki sayılara odaklanalım!";
    }
    if (OFF_TOPIC_LIST.some(w => lower.includes(w))) {
      return `Ben yalnızca **8. Sınıf LGS Matematik** ve şu anki **"${stop.title || "etkinlik"}"** durağımız için rehberlik yapabiliyorum 😊 Sorudaki hangi adımı birlikte inceleyelim?`;
    }
    if (GIVE_ANSWER_PATTERNS.some(re => re.test(lower))) {
      const cleanH = sanitizeHintWithoutAnswer(stop.hint, stop);
      return `Doğrudan cevabı söylersem keşfetme heyecanını kaçırırız! ✨ Ama sana en kritik ipucunu vereyim: *${cleanH || "Sayıların arasındaki çarpma ve kalansız bölünme ilişkisini kontrol et."}* Sence ilk adımda hangi seçenek elenir?`;
    }

    const userNumbers = (text.match(/\d+/g) || []).map(n => parseInt(n, 10));
    if (userNumbers.length > 0) {
      const askedNum = userNumbers[0];
      const targetNum = stop.targetNumber || (stop.gridModel && stop.gridModel.total) || null;
      if (targetNum) {
        if (targetNum % askedNum === 0) {
          const pair = targetNum / askedNum;
          return `Sorduğun **$${askedNum}$** sayısını deneyelim: **$${targetNum} \\div ${askedNum} = ${pair}$** ve kalan $0$! Yani **$${askedNum}$**, $${targetNum}$'ün tam bir çarpanıdır. Peki ekrandaki soruda bizden hangi durumu istiyor?`;
        }
        const rem = targetNum % askedNum;
        return `Sorduğun **$${askedNum}$** sayısını test ettiğimizde **$${targetNum} \\div ${askedNum}$** işleminden **$${rem}$ kalanı** çıkıyor. Kalansız bölen başka bir sayı düşünelim mi?`;
      }
    }

    if (studentTrace.wrongCount > 0 && (lower.includes("neden") || lower.includes("yanlış") || lower.includes("anlamadım") || lower.includes("ipucu"))) {
      return diagnoseSpecificWrongAttempt({
        wrongValue: studentTrace.lastWrongValue,
        targetLabel: studentTrace.lastTargetLabel,
        customHint: stop.hint
      }, ctx);
    }

    const cleanHint = sanitizeHintWithoutAnswer(stop.hint, stop);
    if (cleanHint) {
      return `💡 *${cleanHint}* Buna göre ilk adımda hangi sayıyı denemeliyiz?`;
    }
    const progressive = buildProgressiveSocraticHint({}, ctx, Math.min(3, Math.max(1, studentTrace.chatTurnCount)));
    return progressive.body;
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

    let chips = [];
    if (stop.type === "concept") {
      chips = [
        { label: "🧩 Boşluğu nasıl bulurum?", prompt: "Seçili mavi boşluğa hangi kavramın geleceğini nasıl anlayabilirim?" },
        { label: "📘 Kuralı kısaca anlat", prompt: "Bu duraktaki kuralı çok kısa ve basitçe anlatır mısın?" },
        { label: "🔎 Neden yanlış oldu?", prompt: "Az önceki seçimim neden olmadı?" }
      ];
    } else if (stop.type === "question") {
      chips = [
        { label: "🧭 İlk adım ne?", prompt: "Bu soruyu çözmeye ilk hangi adımdan başlamalıyım?" },
        { label: "📐 Görseli nasıl kullanayım?", prompt: "Sorudaki şekil ve sayılar arasındaki ilişkiyi nasıl kurmalıyım?" },
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
            placeholder="Takıldığın yeri kendi cümlelerinle sor..."
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
        const msgBox = document.getElementById("nartesChatMessages");
        if (msgBox && msgBox.children.length === 0) {
          const stopTitle = (currentContext.stop && currentContext.stop.title) || "Çarpanlar ve Katlar";
          const welcome = `Selam! Ben **Bilge NarTES** 👋 **${stopTitle}** adımında takıldığın yeri bana kısaca sor, ipucuyla hemen çözelim!`;
          appendMessage("bot", welcome, true, "guide");
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

  function formatMarkdownAndMath(text) {
    return String(text || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/\n/g, "<br>");
  }

  function renderMathInside(el) {
    if (!el || !window.renderMathInElement) return;
    try {
      window.renderMathInElement(el, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
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

    let finalReply = await streamFromLocalServerAI(cleanQ, currentContext, (partialText) => {
      if (!bubbleEl) return;
      bubbleEl.innerHTML = formatMarkdownAndMath(partialText);
      if (msgBox) msgBox.scrollTop = msgBox.scrollHeight;
    });

    if (!finalReply) {
      finalReply = generateOfflineFallbackReply(cleanQ, currentContext);
    }

    streamItem.classList.remove("is-streaming");
    if (avatarEl) avatarEl.innerHTML = getAvatarHtml("nartes-avatar-sm", "guide");
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

    setHeaderMascotMood("guide");
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
      const nextStopId = ctx && ctx.stop ? ctx.stop.id : null;
      const nextUnitNo = ctx && ctx.unit ? ctx.unit.unitNo : null;
      const stopChanged = prevStopId !== nextStopId || prevUnitNo !== nextUnitNo;

      if (gateCountdownTimer) {
        clearInterval(gateCountdownTimer);
        gateCountdownTimer = null;
      }

      currentContext = ctx || { unit: null, kaz: null, stop: null };
      studentTrace = {
        wrongCount: 0,
        attemptCountsByTarget: {},
        wrongChoices: [],
        lastWrongValue: null,
        lastTargetLabel: null,
        filledBlanks: {},
        activeBlankId: null,
        chatTurnCount: 0,
        chatHistory: stopChanged ? [] : studentTrace.chatHistory,
        remediationLocked: false
      };

      const gateEl = document.getElementById("nartesStudyGateOverlay");
      if (gateEl) gateEl.hidden = true;

      const subEl = document.getElementById("nartesContextSub");
      if (subEl && currentContext.stop) {
        subEl.textContent = `Durak ${currentContext.stop.id}: ${currentContext.stop.title}`;
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

      const bubble = document.getElementById("nartesSpeechBubble");
      if (bubble) bubble.hidden = true;
    },

    updateProgress(info) {
      if (!info || typeof info !== "object") return;
      if (info.filledBlanks) studentTrace.filledBlanks = info.filledBlanks;
      if (info.activeBlankId !== undefined) studentTrace.activeBlankId = info.activeBlankId;
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
        `Harika! Soldaki tüm adımları inceledin. Şimdi sağ taraftaki **"${stripHtml(questionText || "Doğrulama Sorusu")}"** kartını yanıtlayarak sıradaki durağın kilidini açabilirsin! 👉`,
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
