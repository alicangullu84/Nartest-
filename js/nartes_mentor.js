(function () {
  "use strict";

  // ==========================================================================
  // NARTES — SOKRATES TARZI SOKRATİK YAPAY ZEKA REHBERİ (Canlı AI + Sesli/Sessiz + 3B Karakter)
  // - Mathigon'un tilkisi (Archie) gibi Nartes+ platformunun bilge karakteri.
  // - Google Flow (Imagen) ile üretilmiş 3B NarTES Sokrates karakter görseli.
  // - Sesli (🔊) ve Sessiz (🔇) konuşma seçeneği.
  // - Canlı LLM (Yapay Zeka API: Gemini / OpenAI / Yerel Ollama qwen2.5) + Anlık Sokratik Motor hibriti.
  // - Asla sorunun doğrudan cevabını söylemez; Sokratik sorularla yönlendirir.
  // - Ders dışı, argo, küfürlü veya uygunsuz ifadeleri nazikçe reddeder.
  // - Doğru ve yanlış denemelerde kendini tekrar etmeyen zengin geri bildirim verir.
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

  // Zengin ve tekrarsız Sokratik hata geri bildirim havuzu (asla aynı cümleyi üst üste kurmaz)
  const ENCOURAGE_POOL = [
    "Çok yaklaştın ama küçük bir detayı gözden kaçırmış olabiliriz. Sayılar arasındaki çarpma-bölme ilişkisine bir kez daha bakalım mı?",
    "Acele etmeyelim; Sokrates'in dediği gibi 'Sorgulanmamış adım eksik kalır.' Verilen sayıları tam bölüp bölmediğini tekrar kontrol eder misin?",
    "Bu seçim tam uymadı. Kendimize şu soruyu soralım: Aradığımız sayı bütünü bölen bir çarpan mı, yoksa bütünün katı mı?",
    "Güzel bir denemeydi! Ancak işlemde kalan olup olmadığına dikkat etmeliyiz. Bir adım geri çekilip ipucunu birlikte düşünelim.",
    "Henüz doğru seçenek bu değil. Sayıları küçükten büyüğe eşleştirirken baştan ve sondan çarpımların eşit olduğunu hatırlıyor musun?",
    "Takılman çok doğal, öğrenme tam da burada başlıyor! Sorunun kökündeki anahtar kelimeye ('en az', 'en fazla', 'kalansız') tekrar odaklanalım mı?",
    "Biraz daha dikkatli incelersek doğru yolu bulacağız. Verilen örnekle kendi seçtiğin sayıyı sağlamasını yaparak karşılaştırır mısın?"
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
  let lastEncourageIdx = -1;
  let wrongStreak = 0;
  let mentorVoiceEnabled = false;

  try {
    const savedVoice = localStorage.getItem(VOICE_PREF_KEY);
    if (savedVoice !== null) {
      mentorVoiceEnabled = savedVoice === "1";
    }
  } catch (e) {}

  function getAiConfig() {
    try {
      const raw = localStorage.getItem(AI_CONFIG_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return {
      provider: "auto", // auto: yerel Ollama (127.0.0.1:11434) veya varsa Gemini/OpenAI API, yoksa yerleşik Sokratik AI
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

  // Sesli Okuma (TTS): Sesli mod açıksa NarTES mesajını Türkçe seslendirir
  function speakMentorMessage(rawText) {
    if (!mentorVoiceEnabled) return;
    if (!("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.cancel();
      const clean = String(rawText || "")
        .replace(/\*\*(.+?)\*\*/g, "$1")
        .replace(/\*(.+?)\*/g, "$1")
        .replace(/\\times/g, " çarpı ")
        .replace(/\\div/g, " bölü ")
        .replace(/\\text\{([^}]+)\}/g, "$1")
        .replace(/\$/g, "")
        .replace(/[🦉✨🎉💡🧭📘🎯👉💪]/g, "")
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
    return clean;
  }

  // Aktif durağa göre Sokratik yönlendirme soruları üretir (asla cevabı vermez!)
  function buildSocraticGuidance(ctx, mode) {
    const stop = (ctx && ctx.stop) || {};
    const kaz = (ctx && ctx.kaz) || {};
    const unit = (ctx && ctx.unit) || {};
    const title = stop.title || kaz.title || unit.title || "bu konu";

    if (unit.unitNo === 1 && stop.id === 1) {
      if (mode === "method") {
        return `Şu an **24** sayısının çarpanlarını ve katlarını inceliyoruz. Kendine şu soruyu sor: **$4 \\times 6 = 24$** işleminde $24$'ü kalansız bölen $4$ ve $6$'ya ne ad veriyoruz? Peki $24$ sayısı $6$'nın kaç katıdır? Yandaki $4 \\times 6$ birimkare modelini sayarak kontrol edebilirsin!`;
      }
      return `İpucu ister misin? Bir $A$ sayısını kalansız bölen sayıya **çarpan (bölen)**, $A$ sayısına ise o bölenin **katı** diyoruz. Örneğin $24 \\div 6 = 4$ işleminde kalan $0$ olduğu için $24$ sayısı $6$'ya nasıl bölünür?`;
    }

    if (unit.unitNo === 1 && stop.id === 2) {
      return `Sol taraftaki animasyonda alanı **$24\\text{ br}^2$** olan dikdörtgenleri adım adım oluşturduk: $(1 \\times 24)$, $(2 \\times 12)$, $(3 \\times 8)$ ve $(4 \\times 6)$. Şimdi düşün bakalım: Kenarları tam sayı olan kaç farklı dikdörtgen çizmiş olduk?`;
    }

    if (unit.unitNo === 1 && stop.id === 3) {
      return `**Gökkuşağı Çarpan Kuşağı**'nda kuralımız şu: Küçükten büyüğe dizilen çarpanlarda baştan ve sondan eşit uzaklıktaki sayıların çarpımı daima hedef sayıyı ($24$'ü) verir! $1 \\times 24 = 24$ ve $2 \\times 12 = 24$ olduğuna göre, $2$ ile $4$ arasındaki sayı kaç olmalı ki eşiyle çarpımı $24$ etsin?`;
    }

    if (stop.type === "concept") {
      return `**${title}** durağında kavramı keşfediyoruz. Üstteki örnek açıklamayı dikkatle oku: Hangi sayı bölen (çarpan), hangi sayı kat veya sonuç? Cümledeki boşluğun solundaki ve sağındaki kelimeler sana hangi matematiksel kavramı işaret ediyor?`;
    }

    if (stop.type === "video") {
      const stepCount = (stop.steps && stop.steps.length) || 3;
      return `Animasyondaki **${stepCount} adımı** sırayla inceledin mi? Son adımda ortaya çıkan kurala dikkat et ve sağdaki doğrulama sorusunu o kurala göre kendi cümlelerinle yanıtlamaya çalış. Sence adımlarda kaç farklı durum oluştu?`;
    }

    if (stop.type === "activity") {
      if (stop.missingTargets && stop.missingTargets.length) {
        const firstHint = sanitizeHintWithoutAnswer(stop.missingTargets[0].hint, stop);
        return `Bu etkinlikte eksik kutuyu bulmak için sayılar arasındaki örüntüye bakalım. Küçük bir Sokratik ipucu: *${firstHint || "Eşleşen iki sayının çarpımının veya ortak böleninin hedef sayıya eşit olması gerektiğini düşün."}* Sence havuzdaki hangi sayı bu kuralı sağlar?`;
      }
      return `Etkinlikteki her bir ifadeyi tek tek ele alalım: Bütünü küçük eş parçalara mı ayırıyoruz (EBOB), yoksa küçük parçaları birleştirip ortak bir katta mı buluşuyoruz (EKOK)?`;
    }

    if (stop.type === "game") {
      return `Oyun etabındayız! Hedef sayıyı kalansız bölen (veya kuralı sağlayan) sayıları seçerken şunu test et: Seçeceğin sayı ile başka bir tam sayıyı çarptığında tam olarak hedef sayıya ulaşıyor musun? Tuzak sayılara dikkat!`;
    }

    if (stop.type === "question") {
      const cleanHint = sanitizeHintWithoutAnswer(stop.hint, stop);
      if (mode === "method") {
        return `Bu soruyu çözmek için birlikte 3 adımlı Sokratik plan yapalım:\n1. Soruda bize verilen sayılar bir **bütün** mü yoksa **küçük parçalar** mı?\n2. Aradığımız değer "en az / en büyük" dediğine göre hangi ortak işlemi kullanmalıyız?\n3. ${cleanHint ? `İpucu yönlendirmesi: *${cleanHint}*` : "Bulduğun ilk sayı cevabın kendisi mi, yoksa parça/şişe/kesim sayısına mı geçmelisin?"}`;
      }
      if (cleanHint) {
        return `Cevabı doğrudan söylemem senin keşfetme heyecanını alır 😊 Ama sana yol gösterecek şu soruyu bırakıyorum:\n💡 *${cleanHint}*\nBu işlemi yaptığında hangi sonuca yaklaşıyorsun?`;
      }
    }

    return `**${title}** konusunda ilerlerken önce verilen sayıları ve bizden tam olarak ne istendiğini belirleyelim. Hangi adımda takıldığını yazarsan sana o adımla ilgili yol gösterici bir soru sorabilirim!`;
  }

  // Ön Güvenlik Katmanı (Küfür, Ders Dışı ve Doğrudan Cevap İsteme Kontrolleri)
  function checkGuardrails(rawText, ctx) {
    const text = String(rawText || "").trim();
    const lower = text.toLowerCase();

    if (!text) {
      return "Seni dinliyorum! Takıldığın yeri yazabilir veya üstteki hızlı soru butonlarından birine tıklayabilirsin.";
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
      return `Sokrates'in ünlü ilkesini hatırla: *"Ben kimseye bir şey öğretemem, sadece onların kendi kendilerine düşünmelerini sağlarım."* Doğrudan cevabı veya şıkkı söylersem öğrenme fırsatını kaçırırız! 💪\n\nBunun yerine gel şöyle düşünelim:\n${buildSocraticGuidance(ctx, "hint")}`;
    }

    return null; // Güvenlikten geçti
  }

  // Canlı LLM Çağrısı (Gemini API / OpenAI API / Yerel Ollama 127.0.0.1:11434)
  async function queryLiveSocraticLLM(questionText, ctx) {
    const stop = (ctx && ctx.stop) || {};
    const unit = (ctx && ctx.unit) || {};
    const stopSummary = [
      `Ünite: ${unit.unitNo || 1}. ${unit.title || "Çarpanlar ve Katlar"}`,
      `Durak ${stop.id || 1}: ${stop.title || ""} (${stop.subtitle || ""})`,
      stop.stem ? `Soru Kökü: ${stripHtml(stop.stem)}` : "",
      stop.quickQuestion ? `Doğrulama Sorusu: ${stripHtml(stop.quickQuestion)}` : "",
      stop.sentenceHtml ? `Etkinlik Cümlesi: ${stripHtml(stop.sentenceHtml)}` : "",
      stop.hint ? `Öğretmen İpucu (Cevabı söylemeden kullan): ${ sanitizeHintWithoutAnswer(stop.hint, stop) }` : ""
    ].filter(Boolean).join("\n");

    const systemPrompt = [
      "Sen 'NarTES' adında, 8. sınıf LGS Matematik öğrencilerine rehberlik eden bilge, sevecen ve Sokrates tarzında bir yapay zeka öğretmensin.",
      "KESİN KURALLAR:",
      "1. Öğrenciye ASLA sorunun nihai cevabını, doğru şıkkını veya doğrudan işlem sonucunu söyleme!",
      "2. Sokratik yöntem kullan: Öğrencinin kendi başına doğru cevabı bulmasını sağlayacak kısa, net, yol gösterici 1-2 soru veya küçük bir ipucu ver.",
      "3. Ders dışı, oyun, futbol, sohbet veya uygunsuz konulara kesinlikle girme; nazikçe eldeki matematik sorusuna yönlendir.",
      "4. Yanıtın Türkçe, sıcak, motive edici ve en fazla 3-4 cümle olsun.",
      "--- AKTİF DURAK BİLGİSİ ---",
      stopSummary
    ].join("\n");

    const cfg = getAiConfig();

    // A) Gemini API (Anahtar girilmişse)
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
            generationConfig: { temperature: 0.45, maxOutputTokens: 240 }
          })
        });
        if (resp.ok) {
          const data = await resp.json();
          const txt = data && data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0] && data.candidates[0].content.parts[0].text;
          if (txt && txt.trim()) return txt.trim();
        }
      } catch (e) {}
    }

    // B) Yerel Ollama (128 Sunucusu / Localhost üzerinde açıksa otomatik bağlanır)
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
            options: { temperature: 0.4, num_predict: 180 }
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

  // Yerleşik Sokratik Motor (Anlık geri dönüş)
  function generateLocalSocraticReply(rawText, ctx) {
    const text = String(rawText || "").trim();
    const lower = text.toLowerCase();

    if (/^(merhaba|selam|hey|günaydın|iyi akşamlar|nasılsın|kimsin|sen kimsin)/i.test(lower)) {
      const stopTitle = (ctx && ctx.stop && ctx.stop.title) || "Çarpanlar ve Katlar";
      return `Merhaba genç matematikçi! Ben **NarTES** ✨ Nartest'in Sokrates tarzı bilge yapay zeka rehberiyim. Sana hazır cevaplar vermem ama doğru soruları sorarak **"${stopTitle}"** durağındaki tüm engelleri kendi zekanla aşmanı sağlarım. Takıldığın bir yer mi var?`;
    }

    if (lower.includes("çarpan") || lower.includes("bölen")) {
      return `Harika bir kavram sorusu! Bir doğal sayıyı **kalansız** bölebilen pozitif tam sayılara o sayının **çarpanı (böleni)** denir. Örneğin $4 \\times 6 = 24$ işleminde hem $4$ hem de $6$, $24$'ü kalansız böldüğü için $24$'ün birer çarpanıdır. Peki sence $24$ sayısının en küçük ve en büyük çarpanı kaçtır?`;
    }
    if (lower.includes("kat") && !lower.includes("ekok")) {
      return `Bir sayıyı $1, 2, 3, 4...$ gibi pozitif tam sayılarla çarptığımızda elde ettiğimiz sonuçlara o sayının **katları** deriz. Örneğin $6$'nın katları $6, 12, 18, 24...$ diye gider. Dikkat ettin mi, $24$ sayısı hem $4$'ün hem de $6$'nın bir katıdır!`;
    }
    if (lower.includes("asal") && !lower.includes("aralarında")) {
      return `**Asal sayılar**, yalnızca $1$'e ve kendisine kalansız bölünebilen $1$'den büyük doğal sayılardır ($2, 3, 5, 7, 11...$). Sence çift sayılar içinde asal olan tek sayı hangisidir ve neden başka çift asal sayı yoktur?`;
    }
    if (lower.includes("aralarında asal")) {
      return `İki doğal sayının **aralarında asal** olması için $1$'den başka ortak bölenlerinin olmaması gerekir. Sayıların kendilerinin asal olması şart değildir! Örneğin $8$ ve $15$ asal değildir ama ortak bölenleri yalnız $1$ olduğu için aralarında asaldır.`;
    }
    if (lower.includes("ebob")) {
      return `**EBOB (En Büyük Ortak Bölen)**, iki veya daha fazla sayıyı aynı anda kalansız bölebilen en büyük sayıdır. Bütünden küçük eş parçalara giderken (çuvalları poşetlere bölerken, çubukları keserken) EBOB kullanırız. Elindeki soruda bütünü parçalara mı ayırıyoruz?`;
    }
    if (lower.includes("ekok")) {
      return `**EKOK (En Küçük Ortak Kat)**, iki veya daha fazla sayının ortak katlarından en küçüğüdür. Küçük parçalardan büyük bir bütün oluştururken veya nöbet/zil/sefer buluşmalarında EKOK kullanırız.`;
    }

    if (lower.includes("anlamadım") || lower.includes("zor") || lower.includes("nasıl") || lower.includes("ipucu") || lower.includes("yardım") || lower.includes("takıldım")) {
      return buildSocraticGuidance(ctx, "method");
    }

    return buildSocraticGuidance(ctx, "hint");
  }

  // ==========================================================================
  // ARAYÜZ (DOM) OLUŞTURMA VE GÜNCELLEME
  // ==========================================================================
  let currentContext = { unit: null, kaz: null, stop: null };
  let isPanelOpen = false;
  let bubbleTimer = null;

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
      <!-- Konuşma Balonu (Kısa Bildirim / Sokratik Dürtme) -->
      <div class="nartes-speech-bubble" id="nartesSpeechBubble" hidden>
        <button class="nartes-bubble-close" id="nartesBubbleClose" title="Kapat" aria-label="Kapat">✕</button>
        <div class="nartes-bubble-header">
          <div class="nartes-bubble-head-left">
            ${getAvatarHtml("nartes-avatar-xs")}
            <span class="nartes-bubble-badge">NarTES • Sokratik Rehber</span>
          </div>
          <button type="button" class="nartes-voice-pill" id="nartesBubbleVoiceBtn" title="Sesli / Sessiz Modu Değiştir"></button>
        </div>
        <div class="nartes-bubble-text" id="nartesBubbleText"></div>
        <div class="nartes-bubble-foot">
          <button class="nartes-bubble-action" id="nartesBubbleOpenChat">NarTES'e Sor →</button>
        </div>
      </div>

      <!-- Açılır Sokratik Sohbet Penceresi -->
      <section class="nartes-chat-panel" id="nartesChatPanel" hidden aria-label="NarTES Sokratik Yapay Zeka Rehberi">
        <header class="nartes-chat-head">
          <div class="nartes-chat-head-left">
            <div class="nartes-head-avatar">${getAvatarHtml("nartes-avatar-md")}</div>
            <div>
              <div class="nartes-head-title">NarTES <span class="nartes-head-tag">Sokratik AI</span></div>
              <div class="nartes-head-sub" id="nartesContextSub">Cevabı vermez, düşündürerek buldurur</div>
            </div>
          </div>
          <div class="nartes-head-actions">
            <button type="button" class="nartes-voice-pill" id="nartesVoiceToggleBtn" title="Sesli / Sessiz Modu Değiştir"></button>
            <button type="button" class="nartes-ai-cfg-btn" id="nartesAiConfigBtn" title="Canlı Yapay Zeka (API / Model) Ayarları">⚙️</button>
            <button type="button" class="nartes-chat-close" id="nartesChatCloseBtn" title="Pencereyi Kapat">✕</button>
          </div>
        </header>

        <!-- İsteğe Bağlı Canlı AI API Ayar Çekmecesi (Öğretmen / Yönetici İçin) -->
        <div class="nartes-ai-settings-drawer" id="nartesAiSettingsDrawer" hidden>
          <div class="nartes-ai-settings-title">🤖 Canlı Yapay Zeka (Gemini API / Yerel Ollama) Bağlantısı</div>
          <p class="nartes-ai-settings-desc">NarTES yerleşik Sokratik motoruyla anında çalışır. İsterseniz canlı Gemini API anahtarı girebilir veya yerel Ollama modelini kullanabilirsiniz:</p>
          <div class="nartes-ai-settings-row">
            <input type="password" id="nartesApiKeyInput" class="nartes-ai-key-input" placeholder="Gemini API Anahtarı (İsteğe bağlı: AIza...)" />
            <button type="button" id="nartesSaveAiKeyBtn" class="nartes-ai-save-btn">Kaydet</button>
          </div>
        </div>

        <div class="nartes-chat-messages" id="nartesChatMessages"></div>

        <div class="nartes-quick-prompts" id="nartesQuickPrompts">
          <button type="button" class="nartes-prompt-chip" data-prompt="Bu soruda bana Sokratik bir ipucu verir misin?">💡 İpucu ver</button>
          <button type="button" class="nartes-prompt-chip" data-prompt="Bu durağı çözmek için nasıl düşünmeliyim?">🧭 Nasıl düşünmeliyim?</button>
          <button type="button" class="nartes-prompt-chip" data-prompt="Buradaki temel matematiksel kavram nedir?">📘 Kavramı hatırlat</button>
        </div>

        <form class="nartes-chat-form" id="nartesChatForm" autocomplete="off">
          <input
            type="text"
            id="nartesChatInput"
            class="nartes-chat-input"
            placeholder="Takıldığın yeri NarTES'e sor..."
            maxlength="240"
          />
          <button type="submit" class="nartes-chat-send" title="Gönder">Gönder</button>
        </form>
      </section>

      <!-- Sağ Alt Yüzen Karakter Düğmesi (Google Flow 3B Sokrates Karakteri) -->
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
    const chatPanel = document.getElementById("nartesChatPanel");
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
      isPanelOpen = typeof forceState === "boolean" ? forceState : !isPanelOpen;
      chatPanel.hidden = !isPanelOpen;
      if (isPanelOpen) {
        bubble.hidden = true;
        const msgBox = document.getElementById("nartesChatMessages");
        if (msgBox && msgBox.children.length === 0) {
          const stopTitle = (currentContext.stop && currentContext.stop.title) || "Çarpanlar ve Katlar";
          const welcome = `Merhaba! Ben **NarTES** ✨ Şu an **"${stopTitle}"** durağındayız. Unutma, ben soruları senin yerine çözmem; ama Sokrates gibi doğru soruları sorarak cevabı kendi zekanla bulmanı sağlarım. İstersen üstten **🔊 Sesli / 🔇 Sessiz** seçeneğini de değiştirebilirsin!`;
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
        ? "✅ Canlı Gemini AI bağlantısı kaydedildi! Artık sorularına hem Sokratik kurallarımla hem de canlı yapay zeka modeliyle yanıt vereceğim."
        : "ℹ️ Yerleşik Sokratik AI + Yerel Ollama otomatik moduna geçildi.", false);
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
      const chatPanel = document.getElementById("nartesChatPanel");
      const bubble = document.getElementById("nartesSpeechBubble");
      isPanelOpen = true;
      if (chatPanel) chatPanel.hidden = false;
      if (bubble) bubble.hidden = true;
    }
    appendMessage("user", questionText, false);

    // 1. Önce güvenlik / küfür / ders dışı / doğrudan cevap isteme filtresini çalıştır
    const guardrailReply = checkGuardrails(questionText, currentContext);
    if (guardrailReply) {
      setTimeout(() => appendMessage("bot", guardrailReply, true), 150);
      return;
    }

    // 2. Düşünüyor göstergesi
    const thinkingEl = appendMessage("bot", "*NarTES Sokratik ipucunu hazırlıyor...*", false);

    // 3. Varsa canlı LLM'i dene, yoksa veya gecikirse anında yerleşik Sokratik motoru kullan
    let finalReply = await queryLiveSocraticLLM(questionText, currentContext);
    if (!finalReply) {
      finalReply = generateLocalSocraticReply(questionText, currentContext);
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
    }, durationMs || 6500);
  }

  // Dışarıya açılan API (app.js içinden çağrılır)
  window.NartesMentor = {
    setContext(ctx) {
      initNartesMentorDOM();
      currentContext = ctx || { unit: null, kaz: null, stop: null };
      wrongStreak = 0;
      const subEl = document.getElementById("nartesContextSub");
      if (subEl && currentContext.stop) {
        subEl.textContent = `Durak ${currentContext.stop.id}: ${currentContext.stop.title}`;
      }
      const bubble = document.getElementById("nartesSpeechBubble");
      if (bubble) bubble.hidden = true;
    },

    onCorrect() {
      initNartesMentorDOM();
      wrongStreak = 0;
      const picked = pickNonRepeating(PRAISE_POOL, lastPraiseIdx);
      lastPraiseIdx = picked.idx;
      showSpeechBubble(`🎉 ${picked.text}`, "praise", 5200);
    },

    onWrong(customHint) {
      initNartesMentorDOM();
      wrongStreak++;
      const picked = pickNonRepeating(ENCOURAGE_POOL, lastEncourageIdx);
      lastEncourageIdx = picked.idx;

      let msg = picked.text;
      if (wrongStreak >= 2) {
        const cleanHint = sanitizeHintWithoutAnswer(customHint || (currentContext.stop && currentContext.stop.hint), currentContext.stop);
        if (cleanHint) {
          msg += `\n\n💡 **Sokratik İpucu:** *${cleanHint}*`;
        }
      }
      showSpeechBubble(msg, "encourage", 7500);
    },

    nudgeQuestionPanel(questionText) {
      initNartesMentorDOM();
      showSpeechBubble(
        `Harika! Soldaki tüm adımları inceledin. Şimdi sağ taraftaki **"${stripHtml(questionText || "Doğrulama Sorusu")}"** kartını yanıtlayarak sıradaki durağın kilidini açabilirsin! 👉`,
        "guide",
        6500
      );
    },

    openWithHint() {
      initNartesMentorDOM();
      const chatPanel = document.getElementById("nartesChatPanel");
      const bubble = document.getElementById("nartesSpeechBubble");
      isPanelOpen = true;
      if (chatPanel) chatPanel.hidden = false;
      if (bubble) bubble.hidden = true;
      appendMessage("bot", buildSocraticGuidance(currentContext, "hint"), true);
    }
  };
})();
