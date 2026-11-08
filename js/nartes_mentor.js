(function () {
  "use strict";

  // ==========================================================================
  // NARTES (SOKRATES TARZI SOKRATİK YAPAY ZEKA REHBERİ)
  // - Mathigon'un tilkisi (Archie) gibi Nartes+ platformunun bilge karakteri.
  // - Asla sorunun doğrudan cevabını söylemez; Sokratik sorularla yönlendirir.
  // - Ders dışı, argo, küfürlü veya uygunsuz ifadeleri nazikçe reddeder.
  // - Doğru ve yanlış denemelerde kendini tekrar etmeyen zengin geri bildirim verir.
  // ==========================================================================

  const NARTES_AVATAR_SVG = `
    <svg class="nartes-bot-svg" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="nbBg" x1="6" y1="6" x2="58" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#1E293B"/>
          <stop offset="100%" stop-color="#0F172A"/>
        </linearGradient>
        <linearGradient id="nbCrown" x1="18" y1="4" x2="46" y2="18" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#FB923C"/>
          <stop offset="100%" stop-color="#EA580C"/>
        </linearGradient>
        <linearGradient id="nbLaurel" x1="8" y1="18" x2="56" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#4ADE80"/>
          <stop offset="100%" stop-color="#16A34A"/>
        </linearGradient>
      </defs>
      <!-- Dış Madalyon -->
      <circle cx="32" cy="34" r="26" fill="url(#nbBg)" stroke="#F97316" stroke-width="2.4"/>
      <!-- Sokrates Defne Çelengi (Bilgelik Yaprakları) -->
      <path d="M11 40C9 33 11 25 16 20" stroke="url(#nbLaurel)" stroke-width="2.6" stroke-linecap="round"/>
      <path d="M53 40C55 33 53 25 48 20" stroke="url(#nbLaurel)" stroke-width="2.6" stroke-linecap="round"/>
      <circle cx="13" cy="25" r="2.2" fill="#4ADE80"/>
      <circle cx="10.5" cy="32" r="2.2" fill="#22C55E"/>
      <circle cx="51" cy="25" r="2.2" fill="#4ADE80"/>
      <circle cx="53.5" cy="32" r="2.2" fill="#22C55E"/>
      <!-- Nartest Nar Tacı -->
      <path d="M21 13L25 5L32 10L39 5L43 13H21Z" fill="url(#nbCrown)" stroke="#FDE68A" stroke-width="1.2" stroke-linejoin="round"/>
      <!-- Bilge Yüz & Gözlükler -->
      <circle cx="24.5" cy="30" r="5.2" fill="#0F172A" stroke="#FDE047" stroke-width="2"/>
      <circle cx="39.5" cy="30" r="5.2" fill="#0F172A" stroke="#FDE047" stroke-width="2"/>
      <line x1="29.7" y1="30" x2="34.3" y2="30" stroke="#FDE047" stroke-width="2"/>
      <circle cx="24.5" cy="30" r="2.1" fill="#38BDF8"/>
      <circle cx="39.5" cy="30" r="2.1" fill="#38BDF8"/>
      <circle cx="25.3" cy="29.2" r="0.8" fill="#FFFFFF"/>
      <circle cx="40.3" cy="29.2" r="0.8" fill="#FFFFFF"/>
      <!-- Bilge Sokrates Sakalı / Tebessümü -->
      <path d="M20 38C22 45 27 49 32 49C37 49 42 45 44 38" fill="#F8FAFC" opacity="0.92"/>
      <path d="M26 39.5Q32 43.5 38 39.5" stroke="#0F172A" stroke-width="2.2" stroke-linecap="round" fill="none"/>
      <!-- Sağ Alt Nartes '+' Küp Rozeti -->
      <rect x="44" y="44" width="15" height="15" rx="4.5" fill="#16A34A" stroke="#FFFFFF" stroke-width="1.5"/>
      <path d="M51.5 47.8V55.2M47.8 51.5H55.2" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/>
    </svg>
  `;

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
    "شرموط", "fuck", "shit", "bitch", "idiot", "stupid"
  ];

  // Ders dışı / sohbet / alakasız konular
  const OFF_TOPIC_LIST = [
    "futbol", "maç", "galatasaray", "fenerbahçe", "beşiktaş", "trabzonspor",
    "oyun öner", "pubg", "valorant", "minecraft", "roblox", "fortnite",
    "sevgili", "aşk", "şarkı", "film", "dizi", "tiktok", "instagram", "youtube",
    "hava durumu", "siyaset", "parti", "yemek tarifi", "burç", "espri yap", "fıkra"
  ];

  // Öğrencinin doğrudan cevabı istediği kalıplar ("cevabı söyle", "hangisi doğru", "şıkkı ver")
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

  // Cevabı asla ağzından kaçırmamak için metindeki doğrudan cevabı maskele
  function sanitizeHintWithoutAnswer(hintText, stop) {
    if (!hintText) return "";
    let clean = stripHtml(hintText);
    // Eğer soru durağıysa ve doğru şık metni ipucunda açıkça yazıyorsa Sokratik hale getir
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

    // Özel Durak 1 & 2 (24'ün çarpanları ve dikdörtgen alanı)
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

    // Genel Durak Türlerine Göre Sokratik Sorular
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

  // Öğrencinin serbest yazdığı mesajı analiz edip uygun Sokratik yanıt üretir
  function generateReplyForUserMessage(rawText, ctx) {
    const text = String(rawText || "").trim();
    const lower = text.toLowerCase();

    if (!text) {
      return "Seni dinliyorum! Takıldığın yeri yazabilir veya üstteki hızlı soru butonlarından birine tıklayabilirsin.";
    }

    // 1. Küfür / Kaba / Argo Kontrolü
    const hasProfanity = PROFANITY_LIST.some(w => {
      const regex = new RegExp(`(^|\\s|[^a-zA-Z0-9ğüşıöçĞÜŞİÖÇ])${w}($|\\s|[^a-zA-Z0-9ğüşıöçĞÜŞİÖÇ])`, "i");
      return regex.test(lower) || lower === w;
    });
    if (hasProfanity) {
      return "Ben **NarTES**, bilge bir matematik rehberiyim. Aramızdaki konuşmada her zaman nazik, saygılı ve temiz bir dil kullanmalıyız. Gel şimdi enerjimizi şu güzel matematik sorusunu çözmeye odaklayalım! 💡";
    }

    // 2. Ders Dışı / Alakasız Konu Kontrolü
    const isOffTopic = OFF_TOPIC_LIST.some(w => lower.includes(w));
    if (isOffTopic) {
      const ctxTitle = (ctx && ctx.stop && ctx.stop.title) || "LGS Matematik";
      return `Bu konu kulağa ilginç geliyor ama benim uzmanlık alanım yalnızca **LGS Matematik** ve şu an çalıştığımız **"${ctxTitle}"** durağı! 😊 Ders dışındaki konulara yanıt veremiyorum. Gel sorumuzdaki sayılar arasındaki ilişkiyi birlikte keşfedelim!`;
    }

    // 3. Doğrudan Cevabı İsteme Kontrolü ("Cevabı söyle", "Hangi şık" vb.)
    const wantsDirectAnswer = GIVE_ANSWER_PATTERNS.some(re => re.test(lower));
    if (wantsDirectAnswer) {
      return `Sokrates'in ünlü ilkesini hatırla: *"Ben kimseye bir şey öğretemem, sadece onların kendi kendilerine düşünmelerini sağlarım."* Doğrudan cevabı veya şıkkı söylersem öğrenme fırsatını kaçırırız! 💪\n\nBunun yerine gel şöyle düşünelim:\n${buildSocraticGuidance(ctx, "hint")}`;
    }

    // 4. Selamlaşma / Tanışma
    if (/^(merhaba|selam|hey|günaydın|iyi akşamlar|nasılsın|kimsin|sen kimsin)/i.test(lower)) {
      const stopTitle = (ctx && ctx.stop && ctx.stop.title) || "Çarpanlar ve Katlar";
      return `Merhaba genç matematikçi! Ben **NarTES** 🦉✨ Nartest'in Sokratik yapay zeka rehberiyim. Sana hazır cevaplar vermem ama doğru soruları sorarak **"${stopTitle}"** durağındaki tüm engelleri kendi zekanla aşmanı sağlarım. Takıldığın bir yer mi var?`;
    }

    // 5. Kavram Soruları (Çarpan, Kat, Asal, EBOB, EKOK, Aralarında Asal, Üs, Karekök)
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

    // 6. "Anlamadım", "Zor", "Nasıl yapacağım", "İpucu"
    if (lower.includes("anlamadım") || lower.includes("zor") || lower.includes("nasıl") || lower.includes("ipucu") || lower.includes("yardım") || lower.includes("takıldım")) {
      return buildSocraticGuidance(ctx, "method");
    }

    // 7. Varsayılan: Aktif durağa özel Sokratik rehberlik
    return buildSocraticGuidance(ctx, "hint");
  }

  // ==========================================================================
  // ARAYÜZ (DOM) OLUŞTURMA VE GÜNCELLEME
  // ==========================================================================
  let currentContext = { unit: null, kaz: null, stop: null };
  let isPanelOpen = false;
  let bubbleTimer = null;

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
          <span class="nartes-bubble-badge">🦉 NarTES • Sokratik Rehber</span>
        </div>
        <div class="nartes-bubble-text" id="nartesBubbleText"></div>
        <button class="nartes-bubble-action" id="nartesBubbleOpenChat">NarTES'e Sor →</button>
      </div>

      <!-- Açılır Sokratik Sohbet Penceresi -->
      <section class="nartes-chat-panel" id="nartesChatPanel" hidden aria-label="NarTES Sokratik Yapay Zeka Rehberi">
        <header class="nartes-chat-head">
          <div class="nartes-chat-head-left">
            <div class="nartes-head-avatar">${NARTES_AVATAR_SVG}</div>
            <div>
              <div class="nartes-head-title">NarTES <span class="nartes-head-tag">Sokratik AI</span></div>
              <div class="nartes-head-sub" id="nartesContextSub">Cevabı vermez, düşündürerek buldurur</div>
            </div>
          </div>
          <button class="nartes-chat-close" id="nartesChatCloseBtn" title="Pencereyi Kapat">✕</button>
        </header>

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

      <!-- Sağ Alt Yüzen Karakter Düğmesi -->
      <button type="button" class="nartes-fab-btn" id="nartesFabBtn" title="NarTES Sokratik Rehber'e Sor">
        <span class="nartes-fab-avatar">${NARTES_AVATAR_SVG}</span>
        <span class="nartes-fab-text">
          <strong>NarTES'e Sor</strong>
          <small>Sokratik Rehber</small>
        </span>
      </button>
    `;

    document.body.appendChild(root);

    const fabBtn = document.getElementById("nartesFabBtn");
    const chatPanel = document.getElementById("nartesChatPanel");
    const closeBtn = document.getElementById("nartesChatCloseBtn");
    const bubble = document.getElementById("nartesSpeechBubble");
    const bubbleClose = document.getElementById("nartesBubbleClose");
    const bubbleOpenChat = document.getElementById("nartesBubbleOpenChat");
    const form = document.getElementById("nartesChatForm");
    const input = document.getElementById("nartesChatInput");
    const promptsWrap = document.getElementById("nartesQuickPrompts");

    function toggleChatPanel(forceState) {
      isPanelOpen = typeof forceState === "boolean" ? forceState : !isPanelOpen;
      chatPanel.hidden = !isPanelOpen;
      if (isPanelOpen) {
        bubble.hidden = true;
        const msgBox = document.getElementById("nartesChatMessages");
        if (msgBox && msgBox.children.length === 0) {
          const stopTitle = (currentContext.stop && currentContext.stop.title) || "Çarpanlar ve Katlar";
          appendMessage(
            "bot",
            `Merhaba! Ben **NarTES** 🦉 Şu an **"${stopTitle}"** durağındayız. Unutma, ben soruları senin yerine çözmem; ama doğru soruları sorarak cevabı kendi zekanla bulmanı sağlarım. Sana nasıl yardımcı olabilirim?`
          );
        }
        setTimeout(() => input && input.focus(), 60);
      }
    }

    fabBtn.addEventListener("click", () => toggleChatPanel());
    closeBtn.addEventListener("click", () => toggleChatPanel(false));
    bubbleClose.addEventListener("click", (e) => {
      e.stopPropagation();
      bubble.hidden = true;
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
    let html = String(text || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/\n/g, "<br>");
    return html;
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

  function appendMessage(sender, text) {
    initNartesMentorDOM();
    const msgBox = document.getElementById("nartesChatMessages");
    if (!msgBox) return;

    const item = document.createElement("div");
    item.className = `nartes-msg nartes-msg-${sender}`;
    item.innerHTML = `
      ${sender === "bot" ? `<div class="nartes-msg-avatar">${NARTES_AVATAR_SVG}</div>` : ""}
      <div class="nartes-msg-bubble">${formatMarkdownAndMath(text)}</div>
    `;
    msgBox.appendChild(item);
    renderMathInside(item);
    msgBox.scrollTop = msgBox.scrollHeight;
  }

  function handleStudentQuestion(questionText) {
    initNartesMentorDOM();
    if (!isPanelOpen) {
      const chatPanel = document.getElementById("nartesChatPanel");
      const bubble = document.getElementById("nartesSpeechBubble");
      isPanelOpen = true;
      if (chatPanel) chatPanel.hidden = false;
      if (bubble) bubble.hidden = true;
    }
    appendMessage("user", questionText);
    const reply = generateReplyForUserMessage(questionText, currentContext);
    setTimeout(() => {
      appendMessage("bot", reply);
    }, 180);
  }

  function showSpeechBubble(text, mood, durationMs) {
    initNartesMentorDOM();
    if (isPanelOpen) {
      appendMessage("bot", text);
      return;
    }
    const bubble = document.getElementById("nartesSpeechBubble");
    const bubbleText = document.getElementById("nartesBubbleText");
    if (!bubble || !bubbleText) return;

    bubble.className = `nartes-speech-bubble mood-${mood || "guide"}`;
    bubbleText.innerHTML = formatMarkdownAndMath(text);
    renderMathInside(bubbleText);
    bubble.hidden = false;

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
      appendMessage("bot", buildSocraticGuidance(currentContext, "hint"));
    }
  };
})();
