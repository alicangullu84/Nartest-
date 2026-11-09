(function () {
  "use strict";

  // ==========================================================================
  // NARTES — KİŞİYE ÖZEL SOKRATİK YAPAY ZEKA REHBERİ & 2. YANLIŞTA BİLGİ KİLİDİ
  // - Öğrencinin yaptığı her doğru/yanlış seçimi, seçtiği hatalı şıkkı ve soruyu takip eder.
  // - Standart kalıp yanıtlar yerine öğrencinin o anki sorusuna, seçtiği yanlış cevaba
  //   ve durağın sayılarına göre kişiye özel (dinamik) Sokratik yanıtlar üretir.
  // - 1. yanlışta: Seçilen yanlış değere özel ipucu verir ve o yanlış şıkkı kilitler.
  // - 2. yanlışta (ve sonrasında): Ekrandaki seçenekleri geçici olarak kilitler,
  //   o konuyla ilgili "Konu Bilgi & İpucu Kartı"nı açar; öğrenci "✓ Anladım, Tekrar Deneyeyim"
  //   kutusunu tikleyip onaylayana kadar rastgele şık işaretlemesine izin vermez.
  // - Ses efektleri (hata, ipucu, bilgi kartı açılışı ve "Anladım" onay sesi) içerir.
  // ==========================================================================

  const NARTES_AVATAR_IMG_PATH = "assets/flow/nartes_sokrates_avatar.jpg";
  const VOICE_PREF_KEY = "nartes_mentor_voice_enabled_v1";
  const AI_CONFIG_KEY = "nartes_mentor_ai_config_v1";

  const NARTES_FALLBACK_SVG = `<svg class="nartes-bot-svg" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="32" cy="32" r="28" fill="#0F172A" stroke="#F97316" stroke-width="3"/><circle cx="24" cy="28" r="5" stroke="#FDE047" stroke-width="2"/><circle cx="40" cy="28" r="5" stroke="#FDE047" stroke-width="2"/><path d="M22 40Q32 48 42 40" stroke="#4ADE80" stroke-width="3" stroke-linecap="round"/></svg>`;

  function getAvatarHtml(extraClass) {
    return `
      <span class="nartes-avatar-frame ${extraClass || ""}">
        <img src="${NARTES_AVATAR_IMG_PATH}" alt="NarTES Bilge Rehber" class="nartes-avatar-img" onerror="this.style.display='none';this.nextElementSibling.style.display='block';" />
        <span class="nartes-avatar-fallback" style="display:none;">${NARTES_FALLBACK_SVG}</span>
      </span>
    `;
  }

  // Zengin ve tekrarsız tebrik havuzu
  const PRAISE_POOL = [
    "Aferin, tebrik ederim! Tam bir matematikçi gibi düşündün ve ilişkiyi doğru kurdun.",
    "Harika bir çıkarım! Adımları dikkatle takip ettiğin çok belli oluyor, seni kutlarım.",
    "Mükemmel! Sayılar arasındaki bağlantıyı tam isabetle yakaladın.",
    "Çok güzel çözdün! Sabırla düşündüğünde hiçbir soru senin için zor değil.",
    "Bravo! Mantık zincirini hiç koparmadan doğru sonuca ulaştın.",
    "Süpersin! Bu kazanımın mantığını çok iyi kavradın, sıradaki adıma hazırsın.",
    "Tebrikler! Dikkatli okumanın ve kuralı doğru uygulamanın karşılığını aldın.",
    "İşte bu! Çarpan ve kat ilişkisini zihninde çok net canlandırdın."
  ];

  // Uygunsuz / Küfür / Argo filtre kelimeleri
  const PROFANITY_LIST = [
    "aptal", "salak", "gerizekalı", "mal", "öküz", "ahmak", "dangalak",
    "sik", "amk", "aq", "oç", "piç", "yavşak", "göt", "bok", "lan", "ulan",
    "fuck", "shit", "bitch", "idiot", "stupid"
  ];

  // Ders dışı / sohbet / alakasız konular
  const OFF_TOPIC_LIST = [
    "futbol", "maç", "galatasaray", "fenerbahçe", "beşiktaş", "trabzonspor",
    "oyun öner", "pubg", "valorant", "minecraft", "roblox", "fortnite",
    "sevgili", "aşk", "şarkı", "film", "dizi", "tiktok", "instagram", "youtube",
    "hava durumu", "siyaset", "parti", "yemek tarifi", "burç", "espri yap", "fıkra"
  ];

  // Öğrencinin doğrudan cevabı istediği kalıplar
  const GIVE_ANSWER_PATTERNS = [
    /cevab[ıi]\s*(ne|nedir|söyle|ver|yaz)/i,
    /doğru\s*(şık|cevap|seçenek)\s*(hangisi|ne)/i,
    /hangi\s*şık/i,
    /direkt\s*(söyle|çöz|ver)/i,
    /sen\s*çöz/i,
    /a\s*mı\s*b\s*mi/i,
    /şıkkı\s*söyle/i
  ];

  let lastPraiseIdx = -1;
  let mentorVoiceEnabled = false;

  // Öğrencinin aktif duraktaki kişisel öğrenme durumu
  let currentContext = { unit: null, kaz: null, stop: null };
  let studentTrace = {
    wrongCount: 0,
    wrongChoices: [],
    lastWrongValue: null,
    lastTargetLabel: null,
    chatTurnCount: 0,
    lastBotAngles: [],
    remediationLocked: false
  };

  try {
    const savedVoice = localStorage.getItem(VOICE_PREF_KEY);
    if (savedVoice !== null) {
      mentorVoiceEnabled = savedVoice === "1";
    }
  } catch (e) {}

  // Web Audio API ile NarTES'e özel ses efektleri (Bilgi kartı açılışı, Anladım onayı, İpucu sesi)
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

  function getAiConfig() {
    try {
      const raw = localStorage.getItem(AI_CONFIG_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return {
      provider: "auto",
      apiKey: "",
      model: "gemini-2.5-flash"
    };
  }

  function saveAiConfig(cfg) {
    try {
      localStorage.setItem(AI_CONFIG_KEY, JSON.stringify(cfg));
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
    const tmp = document.createElement("div");
    tmp.innerHTML = html || "";
    return (tmp.textContent || tmp.innerText || "").replace(/\s+/g, " ").trim();
  }

  // Sesli Okuma (TTS)
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
        .replace(/[🦉✨🎉💡🧭📘🎯👉💪🔒✓]/g, "")
        .replace(/\s+/g, " ")
        .trim();
      if (!clean) return;
      const utter = new SpeechSynthesisUtterance(clean);
      utter.lang = "tr-TR";
      utter.rate = 1.02;
      utter.pitch = 0.98;
      window.speechSynthesis.speak(utter);
    } catch (e) {}
  }

  function stopSpeaking() {
    try {
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    } catch (e) {}
  }

  // Cevabı asla ağzından kaçırmamak için metindeki doğrudan cevabı maskele
  function sanitizeHintWithoutAnswer(hintText, stop) {
    if (!hintText) return "";
    let clean = stripHtml(hintText);
    if (stop && stop.options && stop.correctLetter) {
      const correctOpt = stop.options.find(o => o.letter === stop.correctLetter);
      if (correctOpt) {
        const rawAns = stripHtml(correctOpt.text).trim();
        if (rawAns && clean.includes(rawAns)) {
          clean = clean.replace(rawAns, "aradığımız değer");
        }
      }
    }
    if (stop && stop.quickCorrect) {
      const rawQuick = stripHtml(stop.quickCorrect).trim();
      if (rawQuick && clean.includes(rawQuick)) {
        clean = clean.replace(rawQuick, "doğru seçenek");
      }
    }
    return clean;
  }

  // ==========================================================================
  // SEÇİLEN YANLIŞ CEVABA ÖZEL (KİŞİSELLEŞTİRİLMİŞ) TANI VE İPUCU ÜRETİCİ
  // ==========================================================================
  function diagnoseSpecificWrongAttempt(detail, ctx) {
    const stop = (ctx && ctx.stop) || {};
    const kaz = (ctx && ctx.kaz) || {};
    const wrongVal = detail && detail.wrongValue !== undefined ? String(detail.wrongValue).trim() : "";
    const targetInfo = detail && detail.targetLabel ? String(detail.targetLabel).trim() : "";
    const customHint = detail && detail.customHint ? sanitizeHintWithoutAnswer(detail.customHint, stop) : "";

    // 1. Durak Türü: Concept (Boşluk Doldurma)
    if (stop.type === "concept") {
      if (wrongVal === "katıdır") {
        return `Az önce **"katıdır"** seçeneğini denedin. Ancak dikkat et: Küçük sayı ($4$ veya $6$) büyük sayıyı ($24$'ü) kalansız böldüğünde ona **kat** değil, **bölen (çarpan)** diyoruz. Kat, çarpım sonucunda oluşan büyük sayıdır ($24$ gibi). Şimdi tekrar düşünür müsün?`;
      }
      if (wrongVal === "çarpanıdır" || wrongVal === "bölenidir") {
        return `Az önce **"${wrongVal}"** seçtin fakat cümlede **$24$ sayısının $6$'ya göre durumu** soruluyor. $24 = 4 \\times 6$ olduğuna göre $24$, $6$'nın böleni mi yoksa $4$ **katı** mıdır?`;
      }
      if (wrongVal === "kalanıdır" || wrongVal === "farkıdır") {
        return `**"${wrongVal}"** kavramı çıkarma veya kalanlı bölme ile ilgilidir. Oysa $4 \\times 6 = 24$ tam bir çarpma-bölme ilişkisidir ($24 \\div 6 = 4$, kalan $0$). Bölen ve kat kavramlarından hangisi buraya uyar?`;
      }
      if (wrongVal === "kalanlı" || wrongVal === "ondalıklı") {
        return `**"${wrongVal}"** seçtin ama $24 \\div 6 = 4$ işleminde hiç artan (kalan) yok! Bir bölme işleminde kalan $0$ ise o bölünmeye ne ad veririz?`;
      }
      if (wrongVal === "1") {
        return `**$1$** sayısını seçtin ama unutma: Asal sayılar $1$'den büyük olmak zorundadır ($1$'in kendisinden başka böleni yoktur). En küçük asal sayımız çift olan hangi sayıydı?`;
      }
    }

    // 2. Durak Türü: Video Doğrulama Sorusu
    if (stop.type === "video") {
      if (wrongVal.includes("8 farklı") || wrongVal.includes("6 farklı")) {
        return `**"${wrongVal}"** seçeneğini işaretledin. Sanırım toplam çarpan sayısı ile **dikdörtgen (çarpan çifti) sayısını** karıştırdın! Her dikdörtgen $2$ çarpanın eşleşmesiyle oluşur: $(1\\times 24), (2\\times 12), (3\\times 8), (4\\times 6)$. Bu durumda kaç farklı dikdörtgen kurmuş olduk?`;
      }
      if (wrongVal.includes("3 farklı") || wrongVal.includes("2 farklı")) {
        return `**"${wrongVal}"** seçtin ama soldaki animasyonda $1.\\text{ Adım}$'dan son adıma kadar çizdiğimiz dikdörtgenleri tek tek sayalım: $(1\\times 24)$, $(2\\times 12)$, $(3\\times 8)$ ve $(4\\times 6)$. Bir tanesini atlamış olabilir misin?`;
      }
    }

    // 3. Durak Türü: Etkinlik (Gökkuşağı Çarpan Kuşağı, Çarpan Ağacı, EBOB-EKOK Ayrımı)
    if (stop.type === "activity") {
      if (stop.activityMode === "rainbow_pairs" && stop.targetNumber) {
        const num = parseInt(wrongVal, 10);
        if (!isNaN(num)) {
          const rem = stop.targetNumber % num;
          if (rem !== 0) {
            return `Seçtiğin **$${num}$** sayısı **$${stop.targetNumber}$** sayısını kalansız bölemez ($${stop.targetNumber} \\div ${num}$ işleminde kalan $${rem}$ olur). ${customHint ? `İpucu: *${customHint}*` : `Çarpımı $${stop.targetNumber}$ veren çarpan çiftini düşün!`}`;
          }
          return `Seçtiğin **$${num}$** sayısı $${stop.targetNumber}$'ün bir çarpanı, ancak şu an seçili olan kutunun sırasına uymuyor! ${customHint ? `*${customHint}*` : "Küçükten büyüğe sıralamaya ve baştan-sondan eşleşmeye dikkat et."}`;
        }
      }
      if (stop.activityMode === "factor_tree") {
        return `Çarpan ağacında **${targetInfo || "bu dal"}** için **${wrongVal}** seçtin. Dalın üstündeki sayıyı yanındaki asal çarpana böldüğünde kaç çıktığını kontrol eder misin?`;
      }
      if (stop.activityMode === "ebob_ekok_sort" || stop.activityMode === "coprime_check") {
        return `**"${targetInfo}"** durumu için **"${wrongVal}"** seçtin. Kendimize şu soruyu soralım: Büyük bir bütünü eş parçalara mı bölüyoruz (EBOB), yoksa küçük parçaları katlayarak ortak bir noktada mı buluşturuyoruz (EKOK)?`;
      }
    }

    // 4. Durak Türü: Oyun (Çarpan Avcısı vb.)
    if (stop.type === "game") {
      if (stop.gameType === "factor_hunter" && detail && detail.targetNumber) {
        const t = detail.targetNumber;
        const n = parseInt(wrongVal, 10);
        const rem = !isNaN(n) ? (t % n) : null;
        return `Seçtiğin **$${wrongVal}$** sayısı tuzak bir sayıydı! Çünkü **$${t} \\div ${wrongVal}$** işleminde kalan **$${rem !== null ? rem : "sıfırdan farklı"}$** olur, yani tam bölünmez. $${t}$ sayısını kalansız bölen başka bir sayı dener misin?`;
      }
      return `Az önce **${wrongVal}** değerini denedin ama bu adımın kuralını tam sağlamadı. ${customHint || "Sayıların ortak bölen veya ortak kat ilişkisini bir kez daha hesaplayalım!"}`;
    }

    // 5. Durak Türü: Çoktan Seçmeli Soru
    if (stop.type === "question") {
      const cleanH = sanitizeHintWithoutAnswer(stop.hint, stop);
      return `Seçtiğin **${wrongVal}** şıkkı doğru sonuç değil. Gel nerede takılmış olabileceğimize bakalım:\n💡 *${cleanH || "Soruda verilen sayıların çarpanlarını veya ortak bölen/katlarını adım adım yazarak tekrar kontrol edelim."}*`;
    }

    return customHint
      ? `Az önce **${wrongVal || "bu seçeneği"}** denedin. Şu ipucuna dikkat ederek tekrar düşünelim: *${customHint}*`
      : `Az önce **${wrongVal || "bu seçeneği"}** denedin ama tam uymadı. Verilen sayılar arasındaki çarpma-bölme ilişkisini bir kez daha kontrol edelim!`;
  }

  // ==========================================================================
  // 2. YANLIŞTA AÇILAN "KONU BİLGİ & KURAL KARTI" İÇERİĞİ ÜRETİCİ
  // ==========================================================================
  function buildConceptReviewCardData(ctx, detail) {
    const stop = (ctx && ctx.stop) || {};
    const kaz = (ctx && ctx.kaz) || {};
    const unit = (ctx && ctx.unit) || {};
    const cleanHint = sanitizeHintWithoutAnswer((detail && detail.customHint) || stop.hint, stop);

    let title = `${kaz.title || stop.title || "Konu"} — Hatırlatma Bilgisi`;
    let bullets = [];

    // Durağın kendi konu açıklaması varsa al
    if (stop.explanation && Array.isArray(stop.explanation) && stop.explanation.length > 0) {
      bullets = stop.explanation.map(p => stripHtml(p));
    } else if (unit && Array.isArray(unit.stops)) {
      // Aynı kazanımdaki "concept" (Örnek & Keşif) durağının bilgisini bul
      const conceptStop = unit.stops.find(s => s.kazanimId === stop.kazanimId && s.type === "concept");
      if (conceptStop && Array.isArray(conceptStop.explanation)) {
        title = `📘 ${conceptStop.title} — Temel Bilgi`;
        bullets = conceptStop.explanation.map(p => stripHtml(p));
      }
    }

    // Video durağıysa adımları özetle
    if (stop.type === "video" && Array.isArray(stop.steps)) {
      bullets = stop.steps.map(st => stripHtml(st.text));
    }

    if (bullets.length === 0) {
      bullets = [
        "Bir doğal sayıyı kalansız bölen sayılara o sayının çarpanı (böleni), çarpım sonucuna ise katı denir.",
        "Soru kökünde bütünden küçük eş parçalara gidiliyorsa EBOB, küçük parçalardan bütüne veya ortak buluşmaya gidiliyorsa EKOK kullanılır."
      ];
    }

    const specificDiag = diagnoseSpecificWrongAttempt(detail, ctx);

    return {
      title,
      bullets,
      specificDiag,
      hint: cleanHint || "Yukarıdaki temel bilgiyi okuduktan sonra kalan seçenekler arasından kurala uyanı seç."
    };
  }

  // ==========================================================================
  // 2. YANLIŞTA EKRANI KİLİTLEYEN VE "ANLADIM" TİKİ İSTEYEN MODAL / KART
  // ==========================================================================
  function showStudyGateModal(ctx, detail, onUnderstoodCallback) {
    initNartesMentorDOM();
    studentTrace.remediationLocked = true;
    playMentorSound("study_gate");

    let gateEl = document.getElementById("nartesStudyGateOverlay");
    if (!gateEl) {
      gateEl = document.createElement("div");
      gateEl.id = "nartesStudyGateOverlay";
      gateEl.className = "nartes-study-gate-overlay";
      document.body.appendChild(gateEl);
    }

    const info = buildConceptReviewCardData(ctx, detail);
    const wrongHistoryText = studentTrace.wrongChoices.length > 0
      ? `Denediğin hatalı seçimler: <strong>${studentTrace.wrongChoices.slice(-3).join(", ")}</strong>`
      : "Üst üste 2 kez hatalı deneme yaptın.";

    gateEl.innerHTML = `
      <div class="nartes-study-gate-card" role="dialog" aria-modal="true" aria-labelledby="nartesGateTitle">
        <div class="nsg-header">
          <div class="nsg-avatar-wrap">${getAvatarHtml("nartes-avatar-md")}</div>
          <div class="nsg-head-meta">
            <span class="nsg-badge">🦉 NarTES • Önce Bilgiyi Hatırlayalım</span>
            <h3 id="nartesGateTitle">${info.title}</h3>
          </div>
        </div>

        <div class="nsg-wrong-summary">
          <span>⏸️ Rastgele işaretleme yapmamak için kısa bir mola! ${wrongHistoryText}</span>
        </div>

        <div class="nsg-diag-box">
          <strong>🔎 Senin Seçimin Neden Olmadı?</strong>
          <p>${formatMarkdownAndMath(info.specificDiag)}</p>
        </div>

        <div class="nsg-knowledge-box">
          <div class="nsg-knowledge-title">📚 Konu Özeti ve Kural Bilgisi</div>
          <ul class="nsg-knowledge-list">
            ${info.bullets.map(b => `<li>${formatMarkdownAndMath(b)}</li>`).join("")}
          </ul>
          <div class="nsg-hint-strip">
            <strong>💡 Çözüm İpucu:</strong> ${formatMarkdownAndMath(info.hint)}
          </div>
        </div>

        <label class="nsg-confirm-row" for="nsgUnderstoodChk">
          <input type="checkbox" id="nsgUnderstoodChk" class="nsg-checkbox" />
          <span>Yukarıdaki konu bilgisini ve ipucunu dikkatle okudum, <strong>anladım</strong>.</span>
        </label>

        <div class="nsg-actions">
          <button type="button" id="nsgContinueBtn" class="nsg-continue-btn" disabled>
            ✓ Anladım, Tekrar Cevap Hakkı Ver →
          </button>
        </div>
      </div>
    `;

    gateEl.hidden = false;
    renderMathInside(gateEl);
    speakMentorMessage(`Dur bakalım genç matematikçi! Üst üste iki yanlış yaptık. Rastgele tıklamak yerine gel önce bu konunun kuralını hatırlayalım. Bilgiyi okuyup Anladım kutusunu işaretlediğinde sana yeni cevap hakkı vereceğim.`);

    const chk = document.getElementById("nsgUnderstoodChk");
    const btn = document.getElementById("nsgContinueBtn");

    chk.addEventListener("change", () => {
      playMentorSound("hint");
      btn.disabled = !chk.checked;
      btn.classList.toggle("ready", chk.checked);
    });

    btn.addEventListener("click", () => {
      if (!chk.checked) return;
      playMentorSound("understood");
      studentTrace.remediationLocked = false;
      gateEl.hidden = true;
      if (typeof onUnderstoodCallback === "function") {
        onUnderstoodCallback();
      }
      showSpeechBubble(
        "Harika! Bilgiyi gözden geçirdiğine göre şimdi kalan seçenekler arasından doğru olanı dikkatle seçebilirsin. Sana güveniyorum! 💪",
        "guide",
        5000
      );
    });
  }

  // ==========================================================================
  // ÖĞRENCİYE ÖZEL (DİNAMİK & KİŞİSELLEŞTİRİLMİŞ) SOHBET YANITI ÜRETİCİ
  // ==========================================================================
  function generatePersonalizedSocraticReply(rawText, ctx) {
    const text = String(rawText || "").trim();
    const lower = text.toLowerCase();
    const stop = (ctx && ctx.stop) || {};
    const kaz = (ctx && ctx.kaz) || {};
    const unit = (ctx && ctx.unit) || {};

    studentTrace.chatTurnCount++;

    // Öğrencinin kendi mesajında yazdığı sayıları yakala (ör. "8 olur mu?", "neden 18 değil?")
    const userNumbers = (text.match(/\d+/g) || []).map(n => parseInt(n, 10));

    // A) Öğrenci mesajında belirli bir sayı sorduysa ("6 olur mu", "neden 5 bölmez", "3 ve 8" vb.)
    if (userNumbers.length > 0) {
      const askedNum = userNumbers[0];
      const targetNum = stop.targetNumber || (stop.gridModel && stop.gridModel.total) || (stop.unitNo === 1 ? 24 : null);

      if (targetNum && (lower.includes("olur mu") || lower.includes("böl") || lower.includes("çarpan") || lower.includes("neden") || lower.includes("mi"))) {
        if (targetNum % askedNum === 0) {
          const pair = targetNum / askedNum;
          return `Sorduğun **$${askedNum}$** sayısını birlikte test edelim! **$${targetNum} \\div ${askedNum} = ${pair}$** işleminde kalan $0$'dır. Yani evet, **$${askedNum}$** sayısı $${targetNum}$'ün tam bir çarpanıdır ve eşleştiği çarpan **$${pair}$**'dir ($${askedNum} \\times ${pair} = ${targetNum}$). Peki soruda bizden tam olarak hangi kutuyu veya durumu istiyor?`;
        } else {
          const rem = targetNum % askedNum;
          return `Sorduğun **$${askedNum}$** sayısını hemen deneyelim: **$${targetNum} \\div ${askedNum}$** işlemini yaptığımızda **$${rem}$ kalanı** çıkıyor! Kalansız bölünmediği için **$${askedNum}$**, $${targetNum}$ sayısının bir çarpanı olamaz. Kalansız bölen başka bir sayı düşünelim mi?`;
        }
      }
    }

    // B) Öğrenci az önce bir hata yaptıysa ve "neden yanlış", "anlamadım", "ipucu", "nasıl" diye soruyorsa -> KİŞİSEL HATA GEÇMİŞİNİ KULLAN
    if (studentTrace.wrongCount > 0 && (lower.includes("neden") || lower.includes("yanlış") || lower.includes("anlamadım") || lower.includes("ipucu") || lower.includes("nasıl") || lower.includes("takıldım") || lower.includes("yardım"))) {
      const lastWrong = studentTrace.lastWrongValue;
      const diag = diagnoseSpecificWrongAttempt({
        wrongValue: lastWrong,
        targetLabel: studentTrace.lastTargetLabel,
        customHint: stop.hint
      }, ctx);
      return `Senin bu duraktaki adımlarını takip ediyorum 👀 Az önce **${lastWrong || "bir seçenek"}** denemiştin (${studentTrace.wrongCount}. denemen).\n\n${diag}`;
    }

    // C) Selamlaşma / Kimsin (Kişisel ilerleme bilgisiyle yanıt verir)
    if (/^(merhaba|selam|hey|günaydın|iyi akşamlar|nasılsın|kimsin|sen kimsin)/i.test(lower)) {
      const statusNote = studentTrace.wrongCount > 0
        ? `Bu durakta şu ana kadar ${studentTrace.wrongCount} deneme yaptığını gördüm (${studentTrace.wrongChoices.join(", ")}). Birlikte adım adım doğru sonuca ulaşacağız!`
        : `Şu an **${unit.unitNo || 1}. Ünite • Durak ${stop.id || 1} (${stop.title || kaz.title})** üzerindeyiz ve gayet iyi gidiyorsun!`;
      return `Merhaba! Ben **NarTES** ✨ Senin kişisel Sokratik matematik rehberinim. ${statusNote} Bana sorudaki bir sayıyı, neden yanlış olduğunu veya hangi adımı merak ettiğini kendi cümlelerinle sorabilirsin.`;
    }

    // D) Farklı açılardan (Açıklama / Adım Adım / Sokratik Soru) kişiselleştirilmiş rehberlik — her soruşta farklı bir pedagojik açı sunar!
    const cleanHint = sanitizeHintWithoutAnswer(stop.hint, stop);
    const stemText = stripHtml(stop.stem || stop.quickQuestion || stop.sentenceHtml || stop.subtitle || "");
    const angle = studentTrace.chatTurnCount % 3;

    if (lower.includes("kavram") || lower.includes("nedir") || lower.includes("kural")) {
      const review = buildConceptReviewCardData(ctx, {});
      return `**${review.title}** için en önemli kuralımız şu:\n• ${review.bullets.join("\n• ")}\n\nŞimdi bu kuralı elimizdeki *"${stemText.slice(0, 95)}..."* sorusuna uygularsak ilk adımda ne yapmalıyız?`;
    }

    if (angle === 1) {
      // 1. Açı: Sorunun içindeki somut verileri ayrıştırma
      if (stop.type === "question") {
        return `Gel bu soruyu seninle parçalara ayıralım:\n📌 **Soruda ne verilmiş?** *${stemText.slice(0, 120)}...*\n🧭 **İlk adımımız:** ${cleanHint || "Verilen sayıların ortak bölenini mi yoksa ortak katını mı aradığımızı belirleyelim."}\nSence burada bütünü eş parçalara mı ayırıyoruz, yoksa parçaları mı birleştiriyoruz?`;
      }
      if (stop.type === "video") {
        const lastStep = stop.steps && stop.steps[stop.steps.length - 1] ? stripHtml(stop.steps[stop.steps.length - 1].text) : "";
        return `Soldaki animasyonun son adımına birlikte bakalım: *"${lastStep}"*\nŞimdi sağdaki **"${stripHtml(stop.quickQuestion)}"** sorusunu bu son adımdaki bilgiyle eşleştirdiğinde hangi seçenek öne çıkıyor?`;
      }
      if (stop.type === "activity" && stop.missingTargets && stop.missingTargets.length > 0) {
        const hints = stop.missingTargets.map(m => sanitizeHintWithoutAnswer(m.hint, stop)).filter(Boolean);
        return `Bu etkinlikte eksik kutuları bulmak için şu ipucunu kullanabilirsin:\n💡 *${hints[0] || "Baştan ve sondan eşleşen sayıların çarpımını kontrol et."}*\nAlttaki sayı havuzundan hangisi bu eşitliği doğru tamamlar?`;
      }
    } else if (angle === 2) {
      // 2. Açı: Öğrencinin durumuna göre stratejik yöntem sorusu
      const wrongNote = studentTrace.wrongChoices.length > 0
        ? `Az önce elediğimiz **${studentTrace.wrongChoices.join(", ")}** dışında kalan seçeneklere odaklanalım. `
        : "";
      return `${wrongNote}**"${stop.title}"** durağında doğru cevaba ulaşmak için kendine şu kontrol sorusunu sor:\n👉 *${cleanHint || "Seçeceğim sayı işlemde kalansız bölünme şartını sağlıyor mu?"}*\nAklından geçen sayıyı buraya yazarsan birlikte sağlamasını yapabiliriz!`;
    }

    // 3. Açı: Somut örnek üzerinden benzetme (Analoji)
    const review = buildConceptReviewCardData(ctx, {});
    return `Sana özel küçük bir yöntem: ${review.bullets[0]}\n${cleanHint ? `💡 **Soru İpucu:** *${cleanHint}*` : ""}\nHangi şık veya sayı arasında kararsız kaldığını bana yaz, ikisini karşılaştıralım!`;
  }

  // Ön Güvenlik Katmanı
  function checkGuardrails(rawText, ctx) {
    const text = String(rawText || "").trim();
    const lower = text.toLowerCase();

    if (!text) {
      return "Seni dinliyorum! Takıldığın sayıyı veya şıkkı yazabilirsin.";
    }

    const hasProfanity = PROFANITY_LIST.some(w => {
      const regex = new RegExp(`(^|\\s|[^a-zA-Z0-9ğüşıöçĞÜŞİÖÇ])${w}($|\\s|[^a-zA-Z0-9ğüşıöçĞÜŞİÖÇ])`, "i");
      return regex.test(lower) || lower === w;
    });
    if (hasProfanity) {
      return "Ben **NarTES**, bilge bir matematik rehberiyim. Aramızdaki konuşmada her zaman nazik, saygılı ve temiz bir dil kullanmalıyız. Gel şimdi enerjimizi şu güzel matematik sorusunu çözmeye odaklayalım! 💡";
    }

    const isOffTopic = OFF_TOPIC_LIST.some(w => lower.includes(w));
    if (isOffTopic) {
      const ctxTitle = (ctx && ctx.stop && ctx.stop.title) || "LGS Matematik";
      return `Bu konu kulağa ilginç geliyor ama benim uzmanlık alanım yalnızca **LGS Matematik** ve şu an çalıştığımız **"${ctxTitle}"** durağı! 😊 Ders dışındaki konulara yanıt veremiyorum. Gel sorumuzdaki sayılar arasındaki ilişkiyi birlikte keşfedelim!`;
    }

    const wantsDirectAnswer = GIVE_ANSWER_PATTERNS.some(re => re.test(lower));
    if (wantsDirectAnswer) {
      return `Sokrates'in ünlü ilkesini hatırla: *"Ben kimseye bir şey öğretemem, sadece onların kendi kendilerine düşünmelerini sağlarım."* Doğrudan cevabı veya şıkkı söylersem öğrenme fırsatını kaçırırız! 💪\n\nAma senin için sorunun en kritik ipucunu açıyorum:\n${generatePersonalizedSocraticReply("ipucu", ctx)}`;
    }

    return null;
  }

  // Canlı LLM Çağrısı (Öğrencinin kişisel hata geçmişini de modele gönderir)
  async function queryLiveSocraticLLM(questionText, ctx) {
    const stop = (ctx && ctx.stop) || {};
    const unit = (ctx && ctx.unit) || {};
    const stopSummary = [
      `Ünite: ${unit.unitNo || 1}. ${unit.title || "Çarpanlar ve Katlar"}`,
      `Durak ${stop.id || 1}: ${stop.title || ""} (${stop.subtitle || ""})`,
      stop.stem ? `Soru Kökü: ${stripHtml(stop.stem)}` : "",
      stop.quickQuestion ? `Doğrulama Sorusu: ${stripHtml(stop.quickQuestion)}` : "",
      stop.sentenceHtml ? `Etkinlik Cümlesi: ${stripHtml(stop.sentenceHtml)}` : "",
      stop.hint ? `Öğretmen İpucu (Cevabı söylemeden kullan): ${sanitizeHintWithoutAnswer(stop.hint, stop)}` : "",
      studentTrace.wrongChoices.length > 0 ? `Öğrencinin bu soruda yaptığı yanlış seçimler: ${studentTrace.wrongChoices.join(", ")}` : "Öğrenci henüz yanlış seçim yapmadı."
    ].filter(Boolean).join("\n");

    const systemPrompt = [
      "Sen 'NarTES' adında, 8. sınıf LGS Matematik öğrencilerine rehberlik eden bilge, sevecen ve Sokrates tarzında bir yapay zeka öğretmensin.",
      "KESİN KURALLAR:",
      "1. Öğrenciye ASLA sorunun nihai cevabını, doğru şıkkını veya doğrudan işlem sonucunu söyleme!",
      "2. Standart kalıp cümleler kurma! Öğrencinin sorduğu ifadeye ve varsa yaptığı yanlış seçimlere (hatalı şıklara) özel, kişiselleştirilmiş Sokratik bir açıklama ve yönlendirici soru sor.",
      "3. Ders dışı, oyun, futbol, sohbet veya uygunsuz konulara kesinlikle girme.",
      "4. Yanıtın Türkçe, samimi ve en fazla 3-4 cümle olsun.",
      "--- AKTİF DURAK VE ÖĞRENCİ DURUMU ---",
      stopSummary
    ].join("\n");

    const cfg = getAiConfig();

    if (cfg.apiKey && (cfg.provider === "gemini" || cfg.provider === "auto")) {
      try {
        const modelName = cfg.model || "gemini-2.5-flash";
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(modelName)}:generateContent?key=${encodeURIComponent(cfg.apiKey)}`;
        const resp = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: systemPrompt }] },
            contents: [{ role: "user", parts: [{ text: questionText }] }],
            generationConfig: { temperature: 0.55, maxOutputTokens: 250 }
          })
        });
        if (resp.ok) {
          const data = await resp.json();
          const txt = data && data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0] && data.candidates[0].content.parts[0].text;
          if (txt && txt.trim()) return txt.trim();
        }
      } catch (e) {}
    }

    if (cfg.provider === "ollama" || cfg.provider === "auto") {
      try {
        const ctrl = new AbortController();
        const timer = setTimeout(() => ctrl.abort(), 3200);
        const resp = await fetch("http://127.0.0.1:11434/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: ctrl.signal,
          body: JSON.stringify({
            model: "qwen2.5:7b",
            stream: false,
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: questionText }
            ],
            options: { temperature: 0.5, num_predict: 190 }
          })
        });
        clearTimeout(timer);
        if (resp.ok) {
          const data = await resp.json();
          if (data && data.message && data.message.content) {
            return data.message.content.trim();
          }
        }
      } catch (e) {}
    }

    return null;
  }

  // ==========================================================================
  // ARAYÜZ (DOM) OLUŞTURMA VE GÜNCELLEME
  // ==========================================================================
  let isPanelOpen = false;
  let bubbleTimer = null;

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
      if (sub) sub.textContent = open ? "Alta küçült, derse dön" : "Sokratik AI Rehber";
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

  function initNartesMentorDOM() {
    if (document.getElementById("nartesMentorRoot")) return;

    const root = document.createElement("div");
    root.id = "nartesMentorRoot";
    root.className = "nartes-mentor-root";
    root.innerHTML = `
      <!-- Konuşma Balonu (Kişiselleştirilmiş İpucu / Sokratik Dürtme) -->
      <div class="nartes-speech-bubble" id="nartesSpeechBubble" hidden>
        <button class="nartes-bubble-close" id="nartesBubbleClose" title="Kapat" aria-label="Kapat">✕</button>
        <div class="nartes-bubble-header">
          <div class="nartes-bubble-head-left">
            ${getAvatarHtml("nartes-avatar-xs")}
            <span class="nartes-bubble-badge">NarTES • Kişisel Sokratik Rehber</span>
          </div>
          <button type="button" class="nartes-voice-pill" id="nartesBubbleVoiceBtn" title="Sesli / Sessiz Modu Değiştir"></button>
        </div>
        <div class="nartes-bubble-text" id="nartesBubbleText"></div>
        <div class="nartes-bubble-foot">
          <button class="nartes-bubble-action" id="nartesBubbleOpenChat">NarTES ile Konuş →</button>
        </div>
      </div>

      <!-- Açılır Sokratik Sohbet Penceresi -->
      <section class="nartes-chat-panel" id="nartesChatPanel" hidden aria-label="NarTES Sokratik Yapay Zeka Rehberi">
        <header class="nartes-chat-head">
          <div class="nartes-chat-head-left">
            <div class="nartes-head-avatar">${getAvatarHtml("nartes-avatar-md")}</div>
            <div>
              <div class="nartes-head-title">NarTES <span class="nartes-head-tag">Kişisel AI</span></div>
              <div class="nartes-head-sub" id="nartesContextSub">Adımlarını takip eder, Sokratik yönlendirir</div>
            </div>
          </div>
          <div class="nartes-head-actions">
            <button type="button" class="nartes-voice-pill" id="nartesVoiceToggleBtn" title="Sesli / Sessiz Modu Değiştir"></button>
            <button type="button" class="nartes-ai-cfg-btn" id="nartesAiConfigBtn" title="Canlı Yapay Zeka (API / Model) Ayarları">⚙️</button>
            <button type="button" class="nartes-chat-close" id="nartesChatCloseBtn" title="Pencereyi Kapat">✕</button>
          </div>
        </header>

        <div class="nartes-ai-settings-drawer" id="nartesAiSettingsDrawer" hidden>
          <div class="nartes-ai-settings-title">🤖 Canlı Yapay Zeka (Gemini API / Yerel Ollama) Bağlantısı</div>
          <p class="nartes-ai-settings-desc">NarTES yerleşik kişisel Sokratik motoruyla anında çalışır. İsterseniz canlı Gemini API anahtarı girebilir veya yerel Ollama modelini kullanabilirsiniz:</p>
          <div class="nartes-ai-settings-row">
            <input type="password" id="nartesApiKeyInput" class="nartes-ai-key-input" placeholder="Gemini API Anahtarı (İsteğe bağlı: AIza...)" />
            <button type="button" id="nartesSaveAiKeyBtn" class="nartes-ai-save-btn">Kaydet</button>
          </div>
        </div>

        <div class="nartes-chat-messages" id="nartesChatMessages"></div>

        <div class="nartes-quick-prompts" id="nartesQuickPrompts">
          <button type="button" class="nartes-prompt-chip" data-prompt="Son denemem neden yanlış oldu, ipucu verir misin?">🔎 Neden yanlış oldu?</button>
          <button type="button" class="nartes-prompt-chip" data-prompt="Bu soruyu çözmek için nasıl düşünmeliyim?">🧭 Nasıl düşünmeliyim?</button>
          <button type="button" class="nartes-prompt-chip" data-prompt="Bu durağın temel kuralını ve kavramını hatırlatır mısın?">📘 Kuralı hatırlat</button>
        </div>

        <form class="nartes-chat-form" id="nartesChatForm" autocomplete="off">
          <input
            type="text"
            id="nartesChatInput"
            class="nartes-chat-input"
            placeholder="Örn: '8 olur mu?', 'Neden yanlış oldu?' yaz..."
            maxlength="240"
          />
          <button type="submit" class="nartes-chat-send" title="Gönder">Gönder</button>
        </form>
      </section>

      <!-- Sağ Alt Yüzen Karakter Düğmesi -->
      <button type="button" class="nartes-fab-btn" id="nartesFabBtn" title="NarTES Sokratik Rehber'e Sor">
        <span class="nartes-fab-avatar">${getAvatarHtml("nartes-avatar-lg")}</span>
        <span class="nartes-fab-text">
          <strong>NarTES'e Sor</strong>
          <small>Sokratik AI Rehber</small>
        </span>
      </button>
    `;

    document.body.appendChild(root);
    updateVoiceToggleButtons();

    const fabBtn = document.getElementById("nartesFabBtn");
    const closeBtn = document.getElementById("nartesChatCloseBtn");
    const voiceBtnHead = document.getElementById("nartesVoiceToggleBtn");
    const voiceBtnBubble = document.getElementById("nartesBubbleVoiceBtn");
    const aiCfgBtn = document.getElementById("nartesAiConfigBtn");
    const aiDrawer = document.getElementById("nartesAiSettingsDrawer");
    const apiKeyInput = document.getElementById("nartesApiKeyInput");
    const saveAiKeyBtn = document.getElementById("nartesSaveAiKeyBtn");
    const bubble = document.getElementById("nartesSpeechBubble");
    const bubbleClose = document.getElementById("nartesBubbleClose");
    const bubbleOpenChat = document.getElementById("nartesBubbleOpenChat");
    const form = document.getElementById("nartesChatForm");
    const input = document.getElementById("nartesChatInput");
    const promptsWrap = document.getElementById("nartesQuickPrompts");

    const currentCfg = getAiConfig();
    if (apiKeyInput && currentCfg.apiKey) {
      apiKeyInput.value = currentCfg.apiKey;
    }

    function toggleChatPanel(forceState) {
      const next = typeof forceState === "boolean" ? forceState : !isPanelOpen;
      applyPanelVisuals(next);
      if (next) {
        const msgBox = document.getElementById("nartesChatMessages");
        if (msgBox && msgBox.children.length === 0) {
          const stopTitle = (currentContext.stop && currentContext.stop.title) || "Çarpanlar ve Katlar";
          const welcome = `Merhaba! Ben **NarTES** ✨ Şu an **"${stopTitle}"** durağındaki adımlarını takip ediyorum. Takıldığın bir sayıyı (örneğin *"8 olur mu?"*) veya *"Son denemem neden yanlış oldu?"* diye bana sorabilirsin!`;
          appendMessage("bot", welcome, true);
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

    aiCfgBtn.addEventListener("click", () => {
      aiDrawer.hidden = !aiDrawer.hidden;
    });

    saveAiKeyBtn.addEventListener("click", () => {
      const keyVal = apiKeyInput.value.trim();
      saveAiConfig({
        provider: keyVal ? "gemini" : "auto",
        apiKey: keyVal,
        model: "gemini-2.5-flash"
      });
      aiDrawer.hidden = true;
      appendMessage("bot", keyVal
        ? "✅ Canlı Gemini AI bağlantısı kaydedildi! Artık sorularına hem senin kişisel hata geçmişine göre hem de canlı yapay zeka modeliyle yanıt vereceğim."
        : "ℹ️ Kişiselleştirilmiş Sokratik AI + Yerel Ollama otomatik moduna geçildi.", false);
    });

    bubbleClose.addEventListener("click", (e) => {
      e.stopPropagation();
      bubble.hidden = true;
      stopSpeaking();
    });
    bubbleOpenChat.addEventListener("click", () => {
      toggleChatPanel(true);
    });

    promptsWrap.querySelectorAll(".nartes-prompt-chip").forEach(btn => {
      btn.addEventListener("click", () => {
        const q = btn.getAttribute("data-prompt");
        handleStudentQuestion(q);
      });
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

  function appendMessage(sender, text, shouldSpeak) {
    initNartesMentorDOM();
    const msgBox = document.getElementById("nartesChatMessages");
    if (!msgBox) return null;

    const item = document.createElement("div");
    item.className = `nartes-msg nartes-msg-${sender}`;
    item.innerHTML = `
      ${sender === "bot" ? `<div class="nartes-msg-avatar">${getAvatarHtml("nartes-avatar-sm")}</div>` : ""}
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
    initNartesMentorDOM();
    if (!isPanelOpen) {
      applyPanelVisuals(true);
    }
    appendMessage("user", questionText, false);
    playMentorSound("hint");

    const guardrailReply = checkGuardrails(questionText, currentContext);
    if (guardrailReply) {
      setTimeout(() => appendMessage("bot", guardrailReply, true), 150);
      return;
    }

    const thinkingEl = appendMessage("bot", "*NarTES senin adımlarına göre Sokratik yanıt hazırlıyor...*", false);

    let finalReply = await queryLiveSocraticLLM(questionText, currentContext);
    if (!finalReply) {
      finalReply = generatePersonalizedSocraticReply(questionText, currentContext);
    }

    if (thinkingEl && thinkingEl.parentNode) {
      thinkingEl.parentNode.removeChild(thinkingEl);
    }
    appendMessage("bot", finalReply, true);
  }

  function showSpeechBubble(text, mood, durationMs) {
    initNartesMentorDOM();
    if (isPanelOpen) {
      appendMessage("bot", text, true);
      return;
    }
    const bubble = document.getElementById("nartesSpeechBubble");
    const bubbleText = document.getElementById("nartesBubbleText");
    if (!bubble || !bubbleText) return;

    bubble.className = `nartes-speech-bubble mood-${mood || "guide"}`;
    bubbleText.innerHTML = formatMarkdownAndMath(text);
    renderMathInside(bubbleText);
    bubble.hidden = false;
    speakMentorMessage(text);

    clearTimeout(bubbleTimer);
    bubbleTimer = setTimeout(() => {
      bubble.hidden = true;
    }, durationMs || 7000);
  }

  // Dışarıya açılan API (app.js içinden çağrılır)
  window.NartesMentor = {
    isRemediationLocked() {
      return Boolean(studentTrace.remediationLocked);
    },

    setContext(ctx) {
      initNartesMentorDOM();
      currentContext = ctx || { unit: null, kaz: null, stop: null };
      studentTrace = {
        wrongCount: 0,
        wrongChoices: [],
        lastWrongValue: null,
        lastTargetLabel: null,
        chatTurnCount: 0,
        lastBotAngles: [],
        remediationLocked: false
      };
      const gateEl = document.getElementById("nartesStudyGateOverlay");
      if (gateEl) gateEl.hidden = true;

      const subEl = document.getElementById("nartesContextSub");
      if (subEl && currentContext.stop) {
        subEl.textContent = `Durak ${currentContext.stop.id}: ${currentContext.stop.title}`;
      }
      const bubble = document.getElementById("nartesSpeechBubble");
      if (bubble) bubble.hidden = true;
    },

    onCorrect() {
      initNartesMentorDOM();
      studentTrace.wrongCount = 0;
      studentTrace.remediationLocked = false;
      const picked = pickNonRepeating(PRAISE_POOL, lastPraiseIdx);
      lastPraiseIdx = picked.idx;
      showSpeechBubble(`🎉 ${picked.text}`, "praise", 5200);
    },

    /**
     * Öğrenci yanlış yaptığında çağrılır:
     * - Her yanlışta seçilen hatalı değere özel ipucu verir.
     * - 1. yanlışta: Kısa Sokratik ipucu balonu gösterir + ses efekti çalar.
     * - 2. yanlışta (ve sonraki her 2 yanlışta): Konu Bilgi Kartını (Study Gate) açar,
     *   seçenekleri kilitler, öğrenci "Anladım" diye tikleyip onaylayana kadar yeni cevap hakkı vermez!
     */
    onWrong(detailOrHint, onUnlockAfterReview) {
      initNartesMentorDOM();
      const detail = typeof detailOrHint === "string"
        ? { customHint: detailOrHint }
        : (detailOrHint || {});

      studentTrace.wrongCount++;
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

      const specificHint = diagnoseSpecificWrongAttempt(detail, currentContext);

      // 2. yanlışta (veya 4., 6. yanlışta) Konu Bilgi Kartını göster ve "Anladım" tiki iste
      if (studentTrace.wrongCount >= 2 && studentTrace.wrongCount % 2 === 0) {
        showStudyGateModal(currentContext, detail, onUnlockAfterReview);
        return { lockedForReview: true, wrongCount: studentTrace.wrongCount };
      }

      // 1. yanlışta: Seçilen yanlış cevaba özel ipucu + ses efekti
      playMentorSound("hint");
      showSpeechBubble(
        `💡 **1. İpucu:** ${specificHint}`,
        "encourage",
        8000
      );
      return { lockedForReview: false, wrongCount: studentTrace.wrongCount };
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
      playMentorSound("hint");
      appendMessage("bot", generatePersonalizedSocraticReply("ipucu", currentContext), true);
    }
  };
})();
