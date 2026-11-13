// ============================================================================
// Nartes+ — 8. Sınıf 1. Ünite: Çarpanlar ve Katlar (Modüler 10 Adımlı Döngü)
// Her alt başlık (k1..k5): 7 etkileşimli durak + 3 Akıllı Tahta durağı = 10 Adım
//   1. Keşif (concept) -> 2. Anlatım (video) -> 3. Etkinlik 1 (activity)
//   4. Etkinlik 2 (activity) -> 5. Oyun (game) -> 6. Pekiştir (question)
//   7. Kavrama (question) -> 8. Alıştırma (Kolay) -> 9. TEOG & İOKBS -> 10. Zorlayıcı
// + Ünite Sonu: k6 (Alıştırma & TEOG), k7 (Örnek Sorular), k8 (LGS Çıkmış)
// ============================================================================

window.MATFLOW_UNIT = {
  id: "m8-u1-carpanlar-katlar",
  grade: 8,
  unitNo: 1,
  title: "Çarpanlar ve Katlar",
  subtitle: "Çarpan-Kat, Asal Çarpan Yöntemleri, EBOB, EKOK, Aralarında Asal Sayılar ve Sınav Uygulamaları",
  coverImage: "assets/flow/kapak_carpanlar_katlar.jpg",

  kazanimlar: [
    {
      id: "k1",
      no: 1,
      title: "Çarpanlar ve Katlar",
      code: "M.8.1.1.1",
      visual: "assets/flow/k1_carpan_bloklari.jpg",
      stops: []
    },
    {
      id: "k2",
      no: 2,
      title: "Asal Sayılar ve Asal Çarpanlar",
      code: "M.8.1.1.1",
      visual: "assets/flow/k2_carpan_yontemleri.jpg",
      stops: []
    },
    {
      id: "k3",
      no: 3,
      title: "En Büyük Ortak Bölen (EBOB)",
      code: "M.8.1.1.2",
      visual: "assets/flow/k3_ebob_atolye.jpg",
      stops: []
    },
    {
      id: "k4",
      no: 4,
      title: "En Küçük Ortak Kat (EKOK)",
      code: "M.8.1.1.2",
      visual: "assets/flow/k4_ekok_disliler.jpg",
      stops: []
    },
    {
      id: "k5",
      no: 5,
      title: "Aralarında Asal Sayılar",
      code: "M.8.1.1.3",
      visual: "assets/flow/k5_aralarinda_asal_kasa.jpg",
      stops: []
    },
    {
      id: "k6",
      no: 6,
      title: "Alıştırma & TEOG / Bursluluk",
      code: "M.8.1.1 • Pekiştirme",
      visual: "assets/flow/k6_teog_alistirma.jpg",
      isMasterySection: true,
      stops: []
    },
    {
      id: "k7",
      no: 7,
      title: "Örnek Sorular",
      code: "MEB Örnek Sorular",
      visual: "assets/flow/k7_ornek_sorular.jpg",
      isMasterySection: true,
      stops: []
    },
    {
      id: "k8",
      no: 8,
      title: "LGS Çıkmış Sorular",
      code: "LGS Sınav Provasi",
      visual: "assets/flow/k6_lgs_final_rozet.jpg",
      isMasterySection: true,
      stops: []
    }
  ],

  stops: [
    // =========================================================================
    // ALT BAŞLIK 1: ÇARPANLAR VE KATLAR (1..7 + 3 Akıllı Tahta = 10 Adım)
    // =========================================================================
    {
      id: 1,
      kazanimId: "k1",
      type: "concept",
      icon: "💡",
      roadLabel: "Keşif",
      typeLabel: "Örnek & Keşif",
      title: "Keşif: Çarpan (Bölen) ile Kat İlişkisi",
      subtitle: "Sayının kalansız bölenlerini ve eşit dikdörtgen modellerini keşfet!",
      targetNumber: 24,
      barsDemo: { total: 24, goodDiv: 6, badDiv: 5 },
      gridModel: {
        total: 24,
        defaultPairIdx: 3,
        pairs: [
          { rows: 1, cols: 24 },
          { rows: 2, cols: 12 },
          { rows: 3, cols: 8 },
          { rows: 4, cols: 6 }
        ]
      },
      explanation: [
        "Bir pozitif tam sayıyı kalansız (kalan 0 olacak şekilde) bölen her doğal sayıya o sayının <strong>çarpanı (böleni)</strong> denir.",
        "Örneğin 24 = 4 × 6 eşitliğinde <strong>4</strong> ve <strong>6</strong>, 24'ün birer çarpanıdır; <strong>24</strong> sayısı ise 4 ve 6'nın bir <strong>katıdır</strong>."
      ],
      sentenceHtml: "Matematikte 24 ÷ 6 = 4 işleminde kalan 0 olduğu için 6 sayısı 24'ün bir {0}; 24 sayısı ise 6'nın bir {1}.",
      blanks: [
        { id: 0, correct: "çarpanıdır", choices: ["çarpanıdır", "katıdır", "farkıdır"] },
        { id: 1, correct: "katıdır", choices: ["bölenidir", "katıdır", "kalanıdır"] }
      ],
      variants: [
        {
          targetNumber: 24,
          barsDemo: { total: 24, goodDiv: 6, badDiv: 5 },
          gridModel: { total: 24, defaultPairIdx: 3, pairs: [{ rows: 1, cols: 24 }, { rows: 2, cols: 12 }, { rows: 3, cols: 8 }, { rows: 4, cols: 6 }] },
          explanation: [
            "Bir pozitif tam sayıyı kalansız (kalan 0 olacak şekilde) bölen her doğal sayıya o sayının <strong>çarpanı (böleni)</strong> denir.",
            "Örneğin 24 = 4 × 6 eşitliğinde <strong>4</strong> ve <strong>6</strong>, 24'ün birer çarpanıdır; <strong>24</strong> sayısı ise 4 ve 6'nın bir <strong>katıdır</strong>."
          ],
          sentenceHtml: "Matematikte 24 ÷ 6 = 4 işleminde kalan 0 olduğu için 6 sayısı 24'ün bir {0}; 24 sayısı ise 6'nın bir {1}.",
          blanks: [
            { id: 0, correct: "çarpanıdır", choices: ["çarpanıdır", "katıdır", "farkıdır"] },
            { id: 1, correct: "katıdır", choices: ["bölenidir", "katıdır", "kalanıdır"] }
          ]
        },
        {
          targetNumber: 18,
          barsDemo: { total: 18, goodDiv: 6, badDiv: 5 },
          gridModel: { total: 18, defaultPairIdx: 2, pairs: [{ rows: 1, cols: 18 }, { rows: 2, cols: 9 }, { rows: 3, cols: 6 }] },
          explanation: [
            "Bir pozitif tam sayıyı kalansız bölen her sayıya <strong>çarpan (bölen)</strong> denir.",
            "Örneğin 18 = 3 × 6 eşitliğinde <strong>3</strong> ve <strong>6</strong>, 18'in birer çarpanıdır; <strong>18</strong> ise 3 ve 6'nın bir <strong>katıdır</strong>."
          ],
          sentenceHtml: "18 ÷ 6 = 3 işleminde kalan 0 olduğu için 6 sayısı 18'in bir {0}; 18 sayısı ise 6'nın bir {1}.",
          blanks: [
            { id: 0, correct: "çarpanıdır", choices: ["çarpanıdır", "katıdır", "farkıdır"] },
            { id: 1, correct: "katıdır", choices: ["bölenidir", "katıdır", "kalanıdır"] }
          ]
        },
        {
          targetNumber: 30,
          barsDemo: { total: 30, goodDiv: 6, badDiv: 4 },
          gridModel: { total: 30, defaultPairIdx: 3, pairs: [{ rows: 1, cols: 30 }, { rows: 2, cols: 15 }, { rows: 3, cols: 10 }, { rows: 5, cols: 6 }] },
          explanation: [
            "Her doğal sayının en küçük pozitif çarpanı <strong>1</strong>, en büyük pozitif çarpanı ise <strong>kendisidir</strong>.",
            "Örneğin 30 = 5 × 6 eşitliğinde <strong>5</strong> ve <strong>6</strong>, 30'un çarpanları; <strong>30</strong> ise 5 ve 6'nın <strong>katıdır</strong>."
          ],
          sentenceHtml: "30 ÷ 5 = 6 işleminde kalan 0 olduğu için 5 sayısı 30'un bir {0}; 30 sayısı ise 5'in bir {1}.",
          blanks: [
            { id: 0, correct: "çarpanıdır", choices: ["çarpanıdır", "katıdır", "farkıdır"] },
            { id: 1, correct: "katıdır", choices: ["bölenidir", "katıdır", "kalanıdır"] }
          ]
        }
      ]
    },
    {
      id: 2,
      kazanimId: "k1",
      type: "video",
      icon: "🎬",
      roadLabel: "Anlatım",
      typeLabel: "Görsel Anlatım",
      title: "Anlatım: Dikdörtgen Modelleriyle Çarpan Bulma",
      subtitle: "Adımları sırayla izle ve sağdaki doğrulama sorularını yanıtla!",
      videoScene: "rectangles_dynamic",
      targetNumber: 24,
      steps: [
        { text: "1. Adım: 24 birim kareyi tek sıra dizerek 1 × 24 dikdörtgenini oluştururuz." },
        { text: "2. Adım: 2 satıra bölersek 2 × 12 = 24 elde ederiz." },
        { text: "3. Adım: 3 satıra dizdiğimizde 3 × 8 = 24 dikdörtgeni oluşur." },
        { text: "4. Adım: 4 × 6 = 24 sonrası tekrar başladığı için tüm çarpanlar {1,2,3,4,6,8,12,24} olur." }
      ],
      quickQuestion: "24 birim kareden kaç farklı dikdörtgen oluşturabiliriz?",
      quickChoices: ["2 farklı dikdörtgen", "4 farklı dikdörtgen", "6 farklı dikdörtgen", "8 farklı dikdörtgen"],
      quickCorrect: "4 farklı dikdörtgen",
      quickQuestions: [
        {
          prompt: "24 birim kareden alanları 24 br² olan kaç farklı dikdörtgen oluşturabiliriz?",
          choices: ["2 farklı dikdörtgen", "4 farklı dikdörtgen", "6 farklı dikdörtgen", "8 farklı dikdörtgen"],
          correctIndex: 1,
          feedback: "Doğru! (1×24), (2×12), (3×8) ve (4×6) olmak üzere 4 farklı dikdörtgen oluşur.",
          hint: "Soldaki adımlarda 4 farklı satır-sütun ikilisi oluşturuldu."
        },
        {
          prompt: "24 sayısının kendisi dışındaki en büyük pozitif çarpanı kaçtır?",
          choices: ["6", "8", "12", "24"],
          correctIndex: 2,
          feedback: "Harika! 24 ÷ 2 = 12 olduğu için kendisi hariç en büyük çarpanı 12'dir.",
          hint: "24'ü en küçük asal olan 2'ye böldüğünde çıkan sonucu düşün."
        }
      ],
      variants: [
        {
          targetNumber: 24,
          steps: [
            { text: "1. Adım: 24 birim kareyi tek sıra dizerek 1 × 24 dikdörtgenini oluştururuz." },
            { text: "2. Adım: 2 satıra bölersek 2 × 12 = 24 elde ederiz." },
            { text: "3. Adım: 3 satıra dizdiğimizde 3 × 8 = 24 dikdörtgeni oluşur." },
            { text: "4. Adım: 4 × 6 = 24 sonrası tekrar başladığı için tüm çarpanlar {1,2,3,4,6,8,12,24} olur." }
          ],
          quickQuestion: "24 birim kareden kaç farklı dikdörtgen oluşturabiliriz?",
          quickChoices: ["2 farklı dikdörtgen", "4 farklı dikdörtgen", "6 farklı dikdörtgen", "8 farklı dikdörtgen"],
          quickCorrect: "4 farklı dikdörtgen",
          quickQuestions: [
            {
              prompt: "24 birim kareden alanları 24 br² olan kaç farklı dikdörtgen oluşturabiliriz?",
              choices: ["2 farklı dikdörtgen", "4 farklı dikdörtgen", "6 farklı dikdörtgen", "8 farklı dikdörtgen"],
              correctIndex: 1,
              feedback: "Doğru! (1×24), (2×12), (3×8) ve (4×6) olmak üzere 4 farklı dikdörtgen oluşur.",
              hint: "Soldaki adımlarda 4 farklı dikdörtgen çizildi."
            },
            {
              prompt: "24 sayısının kendisi dışındaki en büyük pozitif çarpanı kaçtır?",
              choices: ["6", "8", "12", "24"],
              correctIndex: 2,
              feedback: "Harika! 24'ün kendisi dışındaki en büyük çarpanı 12'dir.",
              hint: "24'ü 2'ye bölerek en büyük eşini bul."
            }
          ]
        },
        {
          targetNumber: 18,
          steps: [
            { text: "1. Adım: 18 birim kareyi tek sıra dizerek 1 × 18 dikdörtgenini oluştururuz." },
            { text: "2. Adım: 2 satıra bölersek 2 × 9 = 18 elde ederiz." },
            { text: "3. Adım: 3 satıra dizdiğimizde 3 × 6 = 18 dikdörtgeni oluşur." },
            { text: "4. Adım: Çarpanlar {1, 2, 3, 6, 9, 18} olup toplam 6 tanedir." }
          ],
          quickQuestion: "18 birim kareden kaç farklı dikdörtgen oluşturabiliriz?",
          quickChoices: ["2 farklı dikdörtgen", "3 farklı dikdörtgen", "6 farklı dikdörtgen", "9 farklı dikdörtgen"],
          quickCorrect: "3 farklı dikdörtgen",
          quickQuestions: [
            {
              prompt: "18 birim kareden alanları 18 br² olan kaç farklı dikdörtgen oluşturabiliriz?",
              choices: ["2 farklı dikdörtgen", "3 farklı dikdörtgen", "6 farklı dikdörtgen", "9 farklı dikdörtgen"],
              correctIndex: 1,
              feedback: "Harika! (1×18), (2×9) ve (3×6) olmak üzere 3 farklı dikdörtgen oluşur.",
              hint: "18 sayısının 3 çarpan çifti vardır."
            },
            {
              prompt: "18 sayısının kendisi dışındaki en büyük pozitif çarpanı kaçtır?",
              choices: ["3", "6", "9", "18"],
              correctIndex: 2,
              feedback: "Süper! 18 ÷ 2 = 9 olduğu için aranan çarpan 9'dur.",
              hint: "2 × ? = 18 eşitliğini düşün."
            }
          ]
        },
        {
          targetNumber: 12,
          steps: [
            { text: "1. Adım: 12 birim kareyi 1 × 12 dikdörtgeni olarak dizeriz." },
            { text: "2. Adım: 2 satıra bölersek 2 × 6 = 12 dikdörtgeni oluşur." },
            { text: "3. Adım: 3 satıra dizdiğimizde 3 × 4 = 12 elde ederiz." },
            { text: "4. Adım: 12'nin çarpanları {1, 2, 3, 4, 6, 12} olarak tamamlanır." }
          ],
          quickQuestion: "12 birim kareden kaç farklı dikdörtgen oluşturabiliriz?",
          quickChoices: ["2 farklı dikdörtgen", "3 farklı dikdörtgen", "4 farklı dikdörtgen", "6 farklı dikdörtgen"],
          quickCorrect: "3 farklı dikdörtgen",
          quickQuestions: [
            {
              prompt: "12 birim kareden alanları 12 br² olan kaç farklı dikdörtgen oluşturabiliriz?",
              choices: ["2 farklı dikdörtgen", "3 farklı dikdörtgen", "4 farklı dikdörtgen", "6 farklı dikdörtgen"],
              correctIndex: 1,
              feedback: "Doğru! (1×12), (2×6) ve (3×4) olmak üzere 3 farklı dikdörtgen oluşur.",
              hint: "Soldaki 3 farklı satır-sütun modelini say."
            },
            {
              prompt: "12 sayısının toplam kaç tane pozitif tam sayı çarpanı vardır?",
              choices: ["3", "4", "6", "12"],
              correctIndex: 2,
              feedback: "Harika! {1, 2, 3, 4, 6, 12} toplam 6 çarpan vardır.",
              hint: "Her dikdörtgenin iki farklı kenarını birlikte say!"
            }
          ]
        }
      ]
    },
    {
      id: 3,
      kazanimId: "k1",
      type: "activity",
      icon: "🌈",
      roadLabel: "Etkinlik 1",
      typeLabel: "Etkileşimli Atölye",
      title: "Etkinlik 1: Çarpan Gökkuşağı ve Tam Kare Kuşakları",
      subtitle: "Simetrik gökkuşağı yaylarını ve tam kare ortanca çarpanı tamamla!",
      activityMode: "multi_stage_rainbow",
      variantSpec: { kind: "rainbow_multi", pool: [[24, 36], [18, 25], [20, 16], [12, 49]] },
      stages: []
    },
    {
      id: 4,
      kazanimId: "k1",
      type: "activity",
      icon: "🪜",
      roadLabel: "Etkinlik 2",
      typeLabel: "Kat Merdiveni Atölyesi",
      title: "Etkinlik 2: Ritmik Kat Merdiveni",
      subtitle: "Verilen sayıların ilk doğal sayı katlarını adım adım sırayla oluştur!",
      activityMode: "multi_stage_rainbow",
      variantSpec: { kind: "kat_ladder_multi", pool: [[6, 8], [7, 9], [4, 11], [5, 12]] },
      stages: []
    },
    {
      id: 5,
      kazanimId: "k1",
      type: "game",
      icon: "🎮",
      roadLabel: "Oyun",
      typeLabel: "HTML5 Mini Oyun",
      title: "Oyun: Çarpan Avcısı",
      subtitle: "Verilen hedef sayıyı kalansız bölen TÜM çarpan bloklarını yakala! Tuzak sayılara dikkat et.",
      gameType: "factor_hunter",
      levels: [
        { target: 18, options: [1, 2, 3, 4, 6, 8, 9, 12, 18], divisors: [1, 2, 3, 6, 9, 18] },
        { target: 24, options: [1, 2, 3, 4, 5, 6, 8, 9, 12, 16, 24], divisors: [1, 2, 3, 4, 6, 8, 12, 24] },
        { target: 30, options: [1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30], divisors: [1, 2, 3, 5, 6, 10, 15, 30] }
      ],
      variants: [
        {
          levels: [
            { target: 18, options: [1, 2, 3, 4, 6, 8, 9, 12, 18], divisors: [1, 2, 3, 6, 9, 18] },
            { target: 24, options: [1, 2, 3, 4, 5, 6, 8, 9, 12, 16, 24], divisors: [1, 2, 3, 4, 6, 8, 12, 24] },
            { target: 30, options: [1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30], divisors: [1, 2, 3, 5, 6, 10, 15, 30] }
          ]
        },
        {
          levels: [
            { target: 12, options: [1, 2, 3, 4, 5, 6, 8, 12], divisors: [1, 2, 3, 4, 6, 12] },
            { target: 28, options: [1, 2, 3, 4, 6, 7, 12, 14, 28], divisors: [1, 2, 4, 7, 14, 28] },
            { target: 36, options: [1, 2, 3, 4, 5, 6, 8, 9, 12, 18, 24, 36], divisors: [1, 2, 3, 4, 6, 9, 12, 18, 36] }
          ]
        },
        {
          levels: [
            { target: 20, options: [1, 2, 3, 4, 5, 6, 10, 15, 20], divisors: [1, 2, 4, 5, 10, 20] },
            { target: 40, options: [1, 2, 4, 5, 6, 8, 10, 12, 20, 40], divisors: [1, 2, 4, 5, 8, 10, 20, 40] },
            { target: 45, options: [1, 2, 3, 5, 6, 9, 12, 15, 30, 45], divisors: [1, 3, 5, 9, 15, 45] }
          ]
        }
      ]
    },
    {
      id: 6,
      kazanimId: "k1",
      type: "question",
      icon: "🎯",
      roadLabel: "Pekiştir",
      typeLabel: "Pekiştirme Soruları",
      title: "Pekiştir: Çarpanlar ve Dikdörtgen Alanı (3 Soru)",
      subtitle: "Temel çarpan ve kat kazanımlarını pekiştiren 3 soruyu sırayla çöz!",
      stem: "Alanı <strong>48 cm²</strong> olan ve kenar uzunlukları santimetre cinsinden birer tam sayı olan kaç farklı dikdörtgen çizilebilir?",
      options: [
        { letter: "A", text: "4" },
        { letter: "B", text: "5" },
        { letter: "C", text: "8" },
        { letter: "D", text: "10" }
      ],
      correctLetter: "B",
      hint: "48 sayısının 1×48 ile başlayıp kenarları tekrar etmeye başladığı yere kadar olan çarpan çiftlerini yaz!",
      solution: "48 = 1×48, 2×24, 3×16, 4×12 ve 6×8 olmak üzere <strong>5</strong> farklı dikdörtgen çizilir.",
      questionPack: [
        {
          badge: "1. Soru • Dikdörtgen Kenarları",
          stem: "Alanı <strong>48 cm²</strong> olan ve kenar uzunlukları tam sayı olan kaç farklı dikdörtgen çizilebilir?",
          options: [
            { letter: "A", text: "4" },
            { letter: "B", text: "5" },
            { letter: "C", text: "8" },
            { letter: "D", text: "10" }
          ],
          correctLetter: "B",
          hint: "Çarpımı 48 olan tüm pozitif tam sayı ikililerini küçükten büyüğe eşleştir.",
          solution: "1×48, 2×24, 3×16, 4×12, 6×8 ⇒ <strong>5 farklı dikdörtgen</strong>."
        },
        {
          badge: "2. Soru • Eksik Çarpan",
          stem: "Küçükten büyüğe dizilmiş pozitif çarpanları <strong>1, 2, A, 6, 9, 18</strong> olan sayıda <strong>A</strong> yerine hangi sayı gelmelidir?",
          options: [
            { letter: "A", text: "3" },
            { letter: "B", text: "4" },
            { letter: "C", text: "5" },
            { letter: "D", text: "8" }
          ],
          correctLetter: "A",
          hint: "Gökkuşağı kuralına göre 2 × 9 = 18 ve A × 6 = 18 olmalıdır!",
          solution: "A ile ortadaki 6 eşleştiğinden A × 6 = 18 ⇒ <strong>A = 3</strong> olur."
        },
        {
          badge: "3. Soru • Kat Aralığı",
          stem: "<strong>12</strong> sayısının <strong>50 ile 100</strong> arasındaki en büyük doğal sayı katı kaçtır?",
          options: [
            { letter: "A", text: "84" },
            { letter: "B", text: "90" },
            { letter: "C", text: "96" },
            { letter: "D", text: "108" }
          ],
          correctLetter: "C",
          hint: "12'nin katlarını 12×7, 12×8, 12×9 şeklinde deneyerek 100'den küçük en büyüğünü bul.",
          solution: "12 × 8 = <strong>96</strong> sayısı 100'den küçük en büyük 12 katıdır."
        }
      ],
      variants: [
        {
          questionPack: [
            {
              badge: "1. Soru • Dikdörtgen Kenarları",
              stem: "Alanı <strong>48 cm²</strong> olan ve kenar uzunlukları tam sayı olan kaç farklı dikdörtgen çizilebilir?",
              options: [{ letter: "A", text: "4" }, { letter: "B", text: "5" }, { letter: "C", text: "8" }, { letter: "D", text: "10" }],
              correctLetter: "B",
              hint: "Çarpımı 48 olan tüm pozitif tam sayı ikililerini say.",
              solution: "1×48, 2×24, 3×16, 4×12, 6×8 ⇒ <strong>5</strong> farklı dikdörtgen."
            },
            {
              badge: "2. Soru • Eksik Çarpan",
              stem: "Küçükten büyüğe dizilmiş pozitif çarpanları <strong>1, 2, A, 6, 9, 18</strong> olan sayıda <strong>A</strong> kaçtır?",
              options: [{ letter: "A", text: "3" }, { letter: "B", text: "4" }, { letter: "C", text: "5" }, { letter: "D", text: "8" }],
              correctLetter: "A",
              hint: "A × 6 = 18 olmalıdır!",
              solution: "18 ÷ 6 = <strong>3</strong>."
            },
            {
              badge: "3. Soru • Kat Aralığı",
              stem: "<strong>12</strong> sayısının <strong>50 ile 100</strong> arasındaki en büyük doğal sayı katı kaçtır?",
              options: [{ letter: "A", text: "84" }, { letter: "B", text: "90" }, { letter: "C", text: "96" }, { letter: "D", text: "108" }],
              correctLetter: "C",
              hint: "12 × 8 değerini hesapla.",
              solution: "12 × 8 = <strong>96</strong>."
            }
          ]
        },
        {
          questionPack: [
            {
              badge: "1. Soru • Dikdörtgen Kenarları",
              stem: "Alanı <strong>40 cm²</strong> olan ve kenar uzunlukları tam sayı olan kaç farklı dikdörtgen çizilebilir?",
              options: [{ letter: "A", text: "3" }, { letter: "B", text: "4" }, { letter: "C", text: "6" }, { letter: "D", text: "8" }],
              correctLetter: "B",
              hint: "Çarpımı 40 olan ikilileri 1×40'tan başlayarak yaz.",
              solution: "1×40, 2×20, 4×10, 5×8 ⇒ <strong>4</strong> farklı dikdörtgen."
            },
            {
              badge: "2. Soru • Eksik Çarpan",
              stem: "Küçükten büyüğe dizilmiş pozitif çarpanları <strong>1, 2, 4, B, 14, 28</strong> olan sayıda <strong>B</strong> kaçtır?",
              options: [{ letter: "A", text: "6" }, { letter: "B", text: "7" }, { letter: "C", text: "8" }, { letter: "D", text: "12" }],
              correctLetter: "B",
              hint: "Gökkuşağı yayında 4 ile B'nin çarpımı 28 olmalıdır!",
              solution: "4 × B = 28 ⇒ B = <strong>7</strong>."
            },
            {
              badge: "3. Soru • Kat Aralığı",
              stem: "<strong>15</strong> sayısının <strong>50 ile 100</strong> arasındaki en büyük doğal sayı katı kaçtır?",
              options: [{ letter: "A", text: "75" }, { letter: "B", text: "85" }, { letter: "C", text: "90" }, { letter: "D", text: "105" }],
              correctLetter: "C",
              hint: "15'in katlarını say: 60, 75, 90, 105...",
              solution: "15 × 6 = <strong>90</strong> sayısı 100'den küçük en büyük kattır."
            }
          ]
        }
      ]
    },
    {
      id: 7,
      kazanimId: "k1",
      type: "question",
      icon: "🧠",
      roadLabel: "Kavrama",
      typeLabel: "Kavrama Testi",
      title: "Kavrama: Çarpan Çiftleri ve Tam Kare Sayılar (3 Soru)",
      subtitle: "Akıllı tahta aşamasına geçmeden önce kavrama düzeyindeki 3 soruyu tamamla!",
      stem: "Pozitif çarpan sayısı <strong>tek sayı</strong> olan sayı aşağıdakilerden hangisidir?",
      options: [
        { letter: "A", text: "18" },
        { letter: "B", text: "24" },
        { letter: "C", text: "36" },
        { letter: "D", text: "48" }
      ],
      correctLetter: "C",
      hint: "Çarpan gökkuşağında ortada tek başına kalan sayı ancak bir tam kare sayıda bulunur!",
      solution: "Tam kare sayı olan <strong>36 = 6 × 6</strong> olduğu için ortadaki 6 yalnız kalır ve pozitif çarpan sayısı 9 (tek) tanedir.",
      questionPack: [
        {
          badge: "1. Kavrama • Tam Kare Özelliği",
          stem: "Aşağıdaki sayılardan hangisinin pozitif tam sayı çarpanlarının sayısı <strong>tek sayıdır</strong>?",
          options: [{ letter: "A", text: "18" }, { letter: "B", text: "24" }, { letter: "C", text: "36" }, { letter: "D", text: "48" }],
          correctLetter: "C",
          hint: "Tam kare sayıların (k × k) çarpan sayısı daima tek olur.",
          solution: "36 = 6² tam karedir; çarpanları {1,2,3,4,6,9,12,18,36} toplam <strong>9 (tek)</strong> adettir."
        },
        {
          badge: "2. Kavrama • En Büyük İki Çarpan",
          stem: "Bir A doğal sayısının en büyük iki pozitif çarpanının toplamı <strong>75</strong> olduğuna göre <strong>A</strong> kaçtır?",
          options: [{ letter: "A", text: "40" }, { letter: "B", text: "45" }, { letter: "C", text: "50" }, { letter: "D", text: "60" }],
          correctLetter: "C",
          hint: "Bir çift sayının en büyük çarpanı A, bir sonraki en büyük çarpanı ise A/2 olur.",
          solution: "A + A/2 = 75 ⇒ 3A/2 = 75 ⇒ A = <strong>50</strong> (50 + 25 = 75)."
        },
        {
          badge: "3. Kavrama • Ortak Kenarlı Dikdörtgen",
          stem: "Alanları <strong>24 cm²</strong> ve <strong>30 cm²</strong> olan, kenarları tam sayı iki dikdörtgenin birer kenarı eşit ve en büyüktür. İki dikdörtgenin diğer kenarlarının toplamı kaç cm'dir?",
          options: [{ letter: "A", text: "6" }, { letter: "B", text: "9" }, { letter: "C", text: "11" }, { letter: "D", text: "18" }],
          correctLetter: "B",
          hint: "24 ve 30'un en büyük ortak çarpanı 6 cm'dir.",
          solution: "Ortak kenar = 6 cm olursa diğer kenarlar 24 ÷ 6 = 4 cm ve 30 ÷ 6 = 5 cm olur. Toplam = 4 + 5 = <strong>9 cm</strong>."
        }
      ],
      variants: [
        {
          questionPack: [
            {
              badge: "1. Kavrama • Tam Kare Özelliği",
              stem: "Aşağıdaki sayılardan hangisinin pozitif tam sayı çarpanlarının sayısı <strong>tek sayıdır</strong>?",
              options: [{ letter: "A", text: "18" }, { letter: "B", text: "24" }, { letter: "C", text: "36" }, { letter: "D", text: "48" }],
              correctLetter: "C",
              hint: "Hangi sayı bir tam sayının karesidir?",
              solution: "36 = 6² tam kare olduğu için çarpan sayısı tekdir (9 adet)."
            },
            {
              badge: "2. Kavrama • En Büyük İki Çarpan",
              stem: "Bir A doğal sayısının en büyük iki pozitif çarpanının toplamı <strong>75</strong> olduğuna göre <strong>A</strong> kaçtır?",
              options: [{ letter: "A", text: "40" }, { letter: "B", text: "45" }, { letter: "C", text: "50" }, { letter: "D", text: "60" }],
              correctLetter: "C",
              hint: "A + A/2 = 75 denklemini düşün.",
              solution: "50 + 25 = 75 olduğundan A = <strong>50</strong>."
            },
            {
              badge: "3. Kavrama • Ortak Kenarlı Dikdörtgen",
              stem: "Alanları <strong>24 cm²</strong> ve <strong>30 cm²</strong> olan iki dikdörtgenin ortak kenarı en büyük seçildiğinde diğer kenarların toplamı kaç olur?",
              options: [{ letter: "A", text: "6" }, { letter: "B", text: "9" }, { letter: "C", text: "11" }, { letter: "D", text: "18" }],
              correctLetter: "B",
              hint: "24 = 6×4 ve 30 = 6×5.",
              solution: "4 + 5 = <strong>9</strong>."
            }
          ]
        },
        {
          questionPack: [
            {
              badge: "1. Kavrama • Tam Kare Özelliği",
              stem: "Aşağıdaki sayılardan hangisinin pozitif tam sayı çarpanlarının sayısı <strong>tek sayıdır</strong>?",
              options: [{ letter: "A", text: "20" }, { letter: "B", text: "28" }, { letter: "C", text: "49" }, { letter: "D", text: "50" }],
              correctLetter: "C",
              hint: "Tam kare sayıların çarpan sayısı daima tektir.",
              solution: "49 = 7² tam karedir; çarpanları {1, 7, 49} toplam <strong>3 (tek)</strong> adettir."
            },
            {
              badge: "2. Kavrama • En Büyük İki Çarpan",
              stem: "Bir B doğal sayısının en büyük iki pozitif çarpanının toplamı <strong>60</strong> olduğuna göre <strong>B</strong> kaçtır?",
              options: [{ letter: "A", text: "30" }, { letter: "B", text: "36" }, { letter: "C", text: "40" }, { letter: "D", text: "48" }],
              correctLetter: "C",
              hint: "B + B/2 = 60 değerini sağlayan çift sayıyı bul.",
              solution: "40 + 20 = 60 olduğu için B = <strong>40</strong>."
            },
            {
              badge: "3. Kavrama • Ortak Kenarlı Dikdörtgen",
              stem: "Alanları <strong>18 cm²</strong> ve <strong>24 cm²</strong> olan iki dikdörtgenin ortak kenarı en büyük seçildiğinde diğer kenarların toplamı kaç olur?",
              options: [{ letter: "A", text: "5" }, { letter: "B", text: "7" }, { letter: "C", text: "8" }, { letter: "D", text: "10" }],
              correctLetter: "B",
              hint: "18 ve 24'ün ortak böleni 6 cm'dir.",
              solution: "18 ÷ 6 = 3 ve 24 ÷ 6 = 4 olduğundan toplam = 3 + 4 = <strong>7</strong>."
            }
          ]
        }
      ]
    },

    // =========================================================================
    // ALT BAŞLIK 2: ASAL SAYILAR VE ASAL ÇARPANLAR (8..14 + 3 Tahta = 10 Adım)
    // =========================================================================
    {
      id: 8,
      kazanimId: "k2",
      type: "concept",
      icon: "💡",
      roadLabel: "Keşif",
      typeLabel: "Örnek & Keşif",
      title: "Keşif: Asal Sayılar ve Asal Çarpanlar",
      subtitle: "Sadece 1'e ve kendisine bölünebilen sayıları ve 2'nin özel yerini keşfet!",
      primeStripDemo: true,
      explanation: [
        "1'den büyük ve sadece 1'e ve kendisine kalansız bölünebilen doğal sayılara <strong>asal sayı</strong> denir: 2, 3, 5, 7, 11, 13, 17, 19...",
        "En küçük asal sayı ve <strong>tek çift asal sayı 2'dir</strong>. <strong>1 sayısı asal değildir!</strong>"
      ],
      sentenceHtml: "1'den büyük tam sayılardan yalnız 1 ve kendisine bölünenlere asal sayı denir; en küçük çift asal sayı {0} olup her bileşik sayının pozitif {1} çarpanı vardır.",
      blanks: [
        { id: 0, correct: "2", choices: ["1", "2", "3"] },
        { id: 1, correct: "asal", choices: ["asal", "negatif", "ondalık"] }
      ],
      variants: [
        {
          sentenceHtml: "En küçük ve tek çift asal sayı {0} sayısının kendisidir; 1 sayısı ise asal {1}.",
          blanks: [
            { id: 0, correct: "2", choices: ["1", "2", "4"] },
            { id: 1, correct: "değildir", choices: ["değildir", "sayılır", "çiftidir"] }
          ]
        },
        {
          sentenceHtml: "İki basamaklı en küçük asal sayı {0} olup birler basamağı çift olan 2 dışındaki sayılar asal {1}.",
          blanks: [
            { id: 0, correct: "11", choices: ["10", "11", "13"] },
            { id: 1, correct: "olamaz", choices: ["olamaz", "sayılır", "katıdır"] }
          ]
        }
      ]
    },
    {
      id: 9,
      kazanimId: "k2",
      type: "video",
      icon: "🎬",
      roadLabel: "Anlatım",
      typeLabel: "Algoritma Anlatımı",
      title: "Anlatım: Asal Çarpanlar Algoritması",
      subtitle: "Bölme çizgisiyle bir sayıyı asal çarpanlarının üslü çarpımı biçiminde yazmayı izle!",
      videoScene: "prime_algo_72",
      steps: [
        { text: "1. Adım: 72 sayısını dikey çizginin sağına en küçük asal 2'yi yazarak bölmeye başlarız: 72÷2=36, 36÷2=18, 18÷2=9." },
        { text: "2. Adım: 9 artık 2'ye bölünmez; sıradaki asal 3 ile devam ederiz: 9÷3=3 ve 3÷3=1." },
        { text: "3. Adım: Sol sütun 1 olunca dururuz! 72 = 2 × 2 × 2 × 3 × 3 = 2³ · 3² olur." }
      ],
      quickQuestion: "72 = 2³ · 3² eşitliğine göre 72 sayısının kaç tane FARKLI asal çarpanı vardır?",
      quickChoices: ["2 farklı asal çarpan (2 ve 3)", "5 farklı asal çarpan", "6 farklı asal çarpan", "12 farklı asal çarpan"],
      quickCorrect: "2 farklı asal çarpan (2 ve 3)",
      quickQuestions: [
        {
          prompt: "72 = 2³ · 3² olduğuna göre 72'nin kaç tane FARKLI asal çarpanı vardır?",
          choices: ["2 farklı asal çarpan (2 ve 3)", "3 farklı asal çarpan", "5 farklı asal çarpan", "12 farklı asal çarpan"],
          correctIndex: 0,
          feedback: "Doğru! Tabandaki farklı asallar yalnızca 2 ve 3 olmak üzere 2 tanedir.",
          hint: "Üslü ifadelerin tabanındaki farklı asal sayıları say!"
        },
        {
          prompt: "54 = 2¹ · 3ˣ eşitliğinde x değeri kaçtır?",
          choices: ["1", "2", "3", "4"],
          correctIndex: 2,
          feedback: "Harika! 54 = 2 × 27 = 2 × 3³ olduğundan x = 3 bulunur.",
          hint: "54'ü 2'ye böldüğünde çıkan 27 sayısı 3'ün kaçıncı kuvvetidir?"
        }
      ],
      variants: [
        {
          videoScene: "prime_algo_72",
          quickQuestions: [
            {
              prompt: "72 = 2³ · 3² olduğuna göre 72 sayısının farklı asal çarpanlarının toplamı kaçtır?",
              choices: ["5", "6", "11", "12"],
              correctIndex: 0,
              feedback: "Süper! Farklı asal çarpanlar 2 ve 3 olup toplamları 2 + 3 = 5'tir.",
              hint: "Tabandaki 2 ve 3 sayılarını topla!"
            },
            {
              prompt: "72 = 2ᵃ · 3ᵇ gösteriminde a + b kaçtır?",
              choices: ["3", "4", "5", "6"],
              correctIndex: 2,
              feedback: "Doğru! a = 3 ve b = 2 olduğu için a + b = 5 olur.",
              hint: "Üslerin toplamı: 3 + 2!"
            }
          ]
        }
      ]
    },
    {
      id: 10,
      kazanimId: "k2",
      type: "activity",
      icon: "🌳",
      roadLabel: "Etkinlik 1",
      typeLabel: "5 Yöntem Atölyesi",
      title: "Etkinlik 1: Gökkuşağı, Çiçek, Ağaç, Algoritma ve Üslü Sentez",
      subtitle: "Aynı sayı üzerinde tüm yöntemleri adım adım uygulayıp üslü senteze ulaş!",
      activityMode: "factor_methods_lab",
      variantSpec: { kind: "factor_methods_5", pool: [24, 36, 40, 54, 18, 28, 45] }
    },
    {
      id: 11,
      kazanimId: "k2",
      type: "activity",
      icon: "🧪",
      roadLabel: "Etkinlik 2",
      typeLabel: "Asal Ayrıştırma Kartları",
      title: "Etkinlik 2: Asal Çarpanlara Ayırma & Üs Hesabı",
      subtitle: "Asal çarpanların çarpımı biçiminde verilen sayılardaki bilinmeyenleri tamamla!",
      activityMode: "multi_stage_rainbow",
      stages: [
        {
          badge: "1. Aşama • Küçükten Büyüğe Asal Çarpım",
          variety: "equation_cards",
          prompt: "Her sayıyı asal çarpanlarının kuvvetiyle tamamlamak için eksik değeri seç:",
          targetNumber: 45,
          sequence: ["45 = 3^? × 5", "50 = 2 × 5^?", "60 = 2^2 × 3 × ?"],
          missingTargets: [
            { index: 0, answer: 2, hint: "45 = 9 × 5 = 3² × 5 olduğundan 3'ün üssü 2 olur." },
            { index: 1, answer: 2, hint: "50 = 2 × 25 = 2 × 5² olduğundan 5'in üssü 2 olur." },
            { index: 2, answer: 5, hint: "60 ÷ (4 × 3) = 60 ÷ 12 = 5 bulunur." }
          ],
          pool: [2, 3, 4, 5, 7]
        },
        {
          badge: "2. Aşama • Üsten Sayıya Dönüş",
          variety: "equation_cards",
          prompt: "Verilen üslü çarpımların hangi doğal sayıya eşit olduğunu bul:",
          targetNumber: 72,
          sequence: ["2^3 × 3 = ?", "2^2 × 3 × 5 = ?", "2^3 × 3^2 = ?"],
          missingTargets: [
            { index: 0, answer: 24, hint: "2³ = 8 olduğundan 8 × 3 = 24 olur." },
            { index: 1, answer: 60, hint: "4 × 3 × 5 = 12 × 5 = 60 olur." },
            { index: 2, answer: 72, hint: "8 × 9 = 72 olur." }
          ],
          pool: [18, 24, 36, 54, 60, 72]
        }
      ],
      variants: [
        {
          stages: [
            {
              badge: "1. Aşama • Asal Üs Bulma",
              variety: "equation_cards",
              prompt: "Eksik üs veya asal çarpanı seç:",
              targetNumber: 75,
              sequence: ["75 = 3 × 5^?", "40 = 2^? × 5", "84 = 2^2 × 3 × ?"],
              missingTargets: [
                { index: 0, answer: 2, hint: "75 = 3 × 25 = 3 × 5² olur." },
                { index: 1, answer: 3, hint: "40 = 8 × 5 = 2³ × 5 olur." },
                { index: 2, answer: 7, hint: "84 ÷ 12 = 7 olur." }
              ],
              pool: [2, 3, 4, 5, 7]
            },
            {
              badge: "2. Aşama • Üsten Sayıya Dönüş",
              variety: "equation_cards",
              prompt: "Üslü çarpımların değerini hesapla:",
              targetNumber: 90,
              sequence: ["2^2 × 3^2 = ?", "2 × 3^2 × 5 = ?", "2 × 5 × 7 = ?"],
              missingTargets: [
                { index: 0, answer: 36, hint: "4 × 9 = 36 olur." },
                { index: 1, answer: 90, hint: "2 × 9 × 5 = 90 olur." },
                { index: 2, answer: 70, hint: "10 × 7 = 70 olur." }
              ],
              pool: [24, 36, 54, 70, 90]
            }
          ]
        }
      ]
    },
    {
      id: 12,
      kazanimId: "k2",
      type: "game",
      icon: "🎮",
      roadLabel: "Oyun",
      typeLabel: "HTML5 Mini Oyun",
      title: "Oyun: Asal Küre Sentezi",
      subtitle: "2, 3, 5 ve 7 asal kürelerine tıklayıp çarparak hedef sayıları tam olarak üret!",
      gameType: "prime_synth",
      targets: [36, 90, 140],
      variants: [
        { targets: [36, 90, 140] },
        { targets: [24, 60, 105] },
        { targets: [42, 72, 150] }
      ]
    },
    {
      id: 13,
      kazanimId: "k2",
      type: "question",
      icon: "🎯",
      roadLabel: "Pekiştir",
      typeLabel: "Pekiştirme Soruları",
      title: "Pekiştir: Asal Çarpanlar ve Farklı Asallar (3 Soru)",
      subtitle: "Asal sayı ve asal çarpan sorularını adım adım çöz!",
      stem: "<strong>120</strong> sayısının asal çarpanlarının toplamı kaçtır?",
      options: [
        { letter: "A", text: "7" },
        { letter: "B", text: "8" },
        { letter: "C", text: "10" },
        { letter: "D", text: "12" }
      ],
      correctLetter: "C",
      hint: "120 = 2³ · 3 · 5 olduğuna göre farklı asal çarpanları 2, 3 ve 5'tir!",
      solution: "120 = 2³ × 3 × 5 ⇒ Asal çarpanları 2, 3 ve 5'tir. Toplam = 2 + 3 + 5 = <strong>10</strong>.",
      questionPack: [
        {
          badge: "1. Soru • Asal Çarpan Toplamı",
          stem: "<strong>120</strong> sayısının farklı asal çarpanlarının toplamı kaçtır?",
          options: [{ letter: "A", text: "7" }, { letter: "B", text: "8" }, { letter: "C", text: "10" }, { letter: "D", text: "12" }],
          correctLetter: "C",
          hint: "120'yi bölen farklı asal sayıları bulup topla.",
          solution: "120 = 2³ · 3 · 5 ⇒ 2 + 3 + 5 = <strong>10</strong>."
        },
        {
          badge: "2. Soru • Üslü Gösterim",
          stem: "<strong>180</strong> sayısının asal çarpanlarının çarpımı biçimindeki yazılışı aşağıdakilerden hangisidir?",
          options: [{ letter: "A", text: "2·3²·5" }, { letter: "B", text: "2²·3²·5" }, { letter: "C", text: "2²·3·5²" }, { letter: "D", text: "2³·3·5" }],
          correctLetter: "B",
          hint: "180 = 18 × 10 = (2 × 3²) × (2 × 5) şeklinde parçala!",
          solution: "180 = 2² × 3² × 5 ⇒ Doğru cevap <strong>B</strong>."
        },
        {
          badge: "3. Soru • İki Asal Çarpanlı En Büyük İki Basamaklı",
          stem: "Asal çarpanları yalnızca <strong>2 ve 3</strong> olan iki basamaklı en büyük doğal sayı kaçtır?",
          options: [{ letter: "A", text: "72" }, { letter: "B", text: "84" }, { letter: "C", text: "96" }, { letter: "D", text: "98" }],
          correctLetter: "C",
          hint: "96 = 32 × 3 = 2⁵ × 3 şeklinde ayrılır!",
          solution: "96 = 2⁵ × 3 yalnızca 2 ve 3 asallarına sahiptir (84'te 7 vardır). Cevap: <strong>96</strong>."
        }
      ],
      variants: [
        {
          questionPack: [
            {
              badge: "1. Soru • Asal Çarpan Toplamı",
              stem: "<strong>120</strong> sayısının farklı asal çarpanlarının toplamı kaçtır?",
              options: [{ letter: "A", text: "7" }, { letter: "B", text: "8" }, { letter: "C", text: "10" }, { letter: "D", text: "12" }],
              correctLetter: "C",
              hint: "120 = 2³ × 3 × 5 olduğundan farklı asallar 2, 3, 5'tir.",
              solution: "2 + 3 + 5 = <strong>10</strong>."
            },
            {
              badge: "2. Soru • Üslü Gösterim",
              stem: "<strong>180</strong> sayısının asal çarpanlarına ayrılmış biçimi hangisidir?",
              options: [{ letter: "A", text: "2·3²·5" }, { letter: "B", text: "2²·3²·5" }, { letter: "C", text: "2²·3·5²" }, { letter: "D", text: "2³·3·5" }],
              correctLetter: "B",
              hint: "180 = 4 × 9 × 5!",
              solution: "4 × 9 × 5 = <strong>2²·3²·5</strong>."
            },
            {
              badge: "3. Soru • İki Asal Çarpanlı Sayı",
              stem: "Asal çarpanları yalnızca <strong>2 ve 3</strong> olan iki basamaklı en büyük doğal sayı kaçtır?",
              options: [{ letter: "A", text: "72" }, { letter: "B", text: "84" }, { letter: "C", text: "96" }, { letter: "D", text: "98" }],
              correctLetter: "C",
              hint: "96'yı 2'ye böle böle dene!",
              solution: "96 = 2⁵ × 3 olduğundan cevap <strong>96</strong>."
            }
          ]
        },
        {
          questionPack: [
            {
              badge: "1. Soru • Asal Çarpan Toplamı",
              stem: "<strong>210</strong> sayısının farklı asal çarpanlarının toplamı kaçtır?",
              options: [{ letter: "A", text: "12" }, { letter: "B", text: "15" }, { letter: "C", text: "17" }, { letter: "D", text: "19" }],
              correctLetter: "C",
              hint: "210 = 2 × 3 × 5 × 7 şeklinde 4 asala ayrılır.",
              solution: "2 + 3 + 5 + 7 = <strong>17</strong>."
            },
            {
              badge: "2. Soru • Üslü Gösterim",
              stem: "<strong>150</strong> sayısının asal çarpanlarına ayrılmış biçimi hangisidir?",
              options: [{ letter: "A", text: "2·3·5²" }, { letter: "B", text: "2²·3·5" }, { letter: "C", text: "2·3²·5" }, { letter: "D", text: "2·3·5" }],
              correctLetter: "A",
              hint: "150 = 6 × 25 = (2×3) × 5²!",
              solution: "150 = <strong>2·3·5²</strong>."
            },
            {
              badge: "3. Soru • İki Asal Çarpanlı Sayı",
              stem: "Asal çarpanları yalnızca <strong>2 ve 5</strong> olan iki basamaklı en büyük doğal sayı kaçtır?",
              options: [{ letter: "A", text: "50" }, { letter: "B", text: "60" }, { letter: "C", text: "80" }, { letter: "D", text: "90" }],
              correctLetter: "C",
              hint: "60 ve 90 sayılarında 3 asalı da vardır; 80 = 16 × 5'tir.",
              solution: "80 = 2⁴ × 5 yalnız 2 ve 5 asallarından oluşur: <strong>80</strong>."
            }
          ]
        }
      ]
    },
    {
      id: 14,
      kazanimId: "k2",
      type: "question",
      icon: "🧠",
      roadLabel: "Kavrama",
      typeLabel: "Kavrama Testi",
      title: "Kavrama: Algoritma Tersten Okuma & Asallık (3 Soru)",
      subtitle: "Algoritmada bilinmeyen harfleri bulma ve asal çarpan sayısı sorularını çöz!",
      stem: "Aşağıdaki sayılardan hangisinin <strong>3 tane farklı</strong> asal çarpanı vardır?",
      options: [
        { letter: "A", text: "36" },
        { letter: "B", text: "45" },
        { letter: "C", text: "60" },
        { letter: "D", text: "72" }
      ],
      correctLetter: "C",
      hint: "Her seçeneği asal çarpanlarının çarpımı olarak yazıp tabandaki farklı asalları say!",
      solution: "60 = 2² × 3 × 5 olduğundan 2, 3 ve 5 olmak üzere <strong>3 farklı asal çarpanı</strong> vardır.",
      questionPack: [
        {
          badge: "1. Kavrama • Farklı Asal Sayısı",
          stem: "Aşağıdaki sayılardan hangisinin <strong>3 tane farklı</strong> asal çarpanı vardır?",
          options: [{ letter: "A", text: "36" }, { letter: "B", text: "45" }, { letter: "C", text: "60" }, { letter: "D", text: "72" }],
          correctLetter: "C",
          hint: "36={2,3}, 45={3,5}, 72={2,3}. Peki ya 60?",
          solution: "60 = 2²·3·5 ⇒ <strong>{2, 3, 5}</strong> toplam 3 farklı asal çarpan."
        },
        {
          badge: "2. Kavrama • Üslerden Çarpan Sayısı",
          stem: "A = 2ᵃ · 3ᵇ sayısında a = 2 ve b = 1 ise <strong>A</strong> kaçtır?",
          options: [{ letter: "A", text: "6" }, { letter: "B", text: "12" }, { letter: "C", text: "18" }, { letter: "D", text: "24" }],
          correctLetter: "B",
          hint: "2² = 4 değerini 3¹ ile çarp!",
          solution: "2² × 3¹ = 4 × 3 = <strong>12</strong>."
        },
        {
          badge: "3. Kavrama • İki Asalın Toplamı",
          stem: "İki asal sayının toplamı <strong>25</strong> olduğuna göre bu iki sayının çarpımı kaçtır?",
          options: [{ letter: "A", text: "24" }, { letter: "B", text: "46" }, { letter: "C", text: "50" }, { letter: "D", text: "69" }],
          correctLetter: "B",
          hint: "Toplam tek (25) çıktığına göre asal sayılardan biri mutlaka çift asal olan 2'dir!",
          solution: "2 + 23 = 25 ⇒ Çarpım = 2 × 23 = <strong>46</strong>."
        }
      ],
      variants: [
        {
          questionPack: [
            {
              badge: "1. Kavrama • Farklı Asal Sayısı",
              stem: "Aşağıdaki sayılardan hangisinin <strong>3 tane farklı</strong> asal çarpanı vardır?",
              options: [{ letter: "A", text: "36" }, { letter: "B", text: "45" }, { letter: "C", text: "60" }, { letter: "D", text: "72" }],
              correctLetter: "C",
              hint: "2, 3 ve 5 çarpanlarının üçünü de içeren sayıyı bul.",
              solution: "60 = 2²·3·5 ⇒ <strong>60</strong>."
            },
            {
              badge: "2. Kavrama • Üslerden Sayı",
              stem: "A = 2ᵃ · 3ᵇ sayısında a = 1 ve b = 3 ise <strong>A</strong> kaçtır?",
              options: [{ letter: "A", text: "18" }, { letter: "B", text: "27" }, { letter: "C", text: "54" }, { letter: "D", text: "72" }],
              correctLetter: "C",
              hint: "2 × 3³ = 2 × 27!",
              solution: "2 × 27 = <strong>54</strong>."
            },
            {
              badge: "3. Kavrama • İki Asalın Toplamı",
              stem: "İki asal sayının toplamı <strong>21</strong> olduğuna göre bu iki sayının çarpımı kaçtır?",
              options: [{ letter: "A", text: "19" }, { letter: "B", text: "38" }, { letter: "C", text: "54" }, { letter: "D", text: "62" }],
              correctLetter: "B",
              hint: "Toplam tek (21) olduğu için biri kesinlikle 2'dir!",
              solution: "2 + 19 = 21 ⇒ 2 × 19 = <strong>38</strong>."
            }
          ]
        }
      ]
    },

    // =========================================================================
    // ALT BAŞLIK 3: EN BÜYÜK ORTAK BÖLEN (EBOB) (15..21 + 3 Tahta = 10 Adım)
    // =========================================================================
    {
      id: 15,
      kazanimId: "k3",
      type: "concept",
      icon: "💡",
      roadLabel: "Keşif",
      typeLabel: "Örnek & Keşif",
      title: "Keşif: En Büyük Ortak Bölen (EBOB)",
      subtitle: "Büyük parçaları hiç artmayacak şekilde eşit küçük parçalara ayırma mantığını keşfet!",
      explanation: [
        "İki veya daha fazla doğal sayıyı aynı anda kalansız bölen sayıların en büyüğüne <strong>En Büyük Ortak Bölen (EBOB)</strong> denir.",
        "<strong>İpucu:</strong> Bidonları küçük şişelere boşaltma, çubuk kesme, tarla çevresine eşit aralıkla ağaç dikme problemlerinde <strong>EBOB</strong> kullanılır!"
      ],
      sentenceHtml: "12 ve 18 sayılarının ortak bölenleri 1, 2, 3 ve 6 olup en büyüğü {0}; EBOB problemlerinde büyükten {1} parçalara inilir.",
      blanks: [
        { id: 0, correct: "6", choices: ["3", "6", "36"] },
        { id: 1, correct: "küçük", choices: ["büyük", "küçük", "farklı"] }
      ],
      variants: [
        {
          sentenceHtml: "24 ve 36 sayılarının ortak bölenleri 1, 2, 3, 4, 6 ve 12 olup EBOB değeri {0}; eş parçalama sorularında büyük bütünden {1} parçalara ayrılır.",
          blanks: [
            { id: 0, correct: "12", choices: ["6", "12", "72"] },
            { id: 1, correct: "küçük", choices: ["büyük", "küçük", "rastgele"] }
          ]
        },
        {
          sentenceHtml: "20 ve 30 sayılarının ortak bölenleri 1, 2, 5 ve 10 olduğundan EBOB değeri {0}; en az parça/ağaç için aralık {1} seçilir.",
          blanks: [
            { id: 0, correct: "10", choices: ["5", "10", "60"] },
            { id: 1, correct: "en büyük", choices: ["en büyük", "en küçük", "tek"] }
          ]
        }
      ]
    },
    {
      id: 16,
      kazanimId: "k3",
      type: "video",
      icon: "🎬",
      roadLabel: "Anlatım",
      typeLabel: "EBOB Algoritması",
      title: "Anlatım: Algoritmada Ortak Bölenleri İşaretleme",
      subtitle: "İki sayıyı aynı anda bölen asalların nasıl seçildiğini adım adım izle!",
      videoScene: "generic",
      steps: [
        { text: "1. Adım: 24 ve 36'yı yan yana yazıp bölen listesine başlarız. İlk olarak ikisi de 2'ye bölünür (12 ve 18) ⇒ 2★ işaretlenir." },
        { text: "2. Adım: 12 ve 18 tekrar 2'ye bölünür (6 ve 9) ⇒ İkinci 2★ de işaretlenir." },
        { text: "3. Adım: 6 ikiye bölünür ama 9 bölünmez (3 ve 9); ortak olmadığı için 2 işaretlenmez." },
        { text: "4. Adım: 3 ve 9 ikisi de 3'e bölünür (1 ve 3) ⇒ 3★ işaretlenir. Sonuç: EBOB = 2 × 2 × 3 = 12!" }
      ],
      quickQuestion: "Algoritma ile EBOB bulunurken sağ sütundaki sayılardan hangileri çarpılır?",
      quickChoices: [
        "Yalnız her iki sayıyı aynı anda bölen ortak asal bölenler",
        "Sağ sütundaki en büyük sayı",
        "Sağ sütundaki tüm sayıların tamamı",
        "Sol sütundaki en küçük sayı"
      ],
      quickCorrect: "Yalnız her iki sayıyı aynı anda bölen ortak asal bölenler",
      quickQuestions: [
        {
          prompt: "Algoritma ile EBOB bulunurken sağ sütundaki sayılardan hangileri çarpılır?",
          choices: [
            "Yalnız her iki sayıyı aynı anda bölen ortak asallar",
            "Sağ sütundaki tüm sayıların tamamı",
            "Yalnız en büyük asal bölen",
            "Sol sütundaki sayıların toplamı"
          ],
          correctIndex: 0,
          feedback: "Doğru! EBOB için yalnızca her iki sayıyı birden bölen ortak asallar çarpılır.",
          hint: "İşaretlenen ★ bölenlerin hangi özelliğe sahip olduğunu hatırla!"
        },
        {
          prompt: "Biri diğerinin tam katı olan iki sayının (örneğin 18 ve 54) EBOB'u hangisidir?",
          choices: ["Küçük olan sayı (18)", "Büyük olan sayı (54)", "1", "İkisinin toplamı"],
          correctIndex: 0,
          feedback: "Mükemmel! Birbirinin katı olan iki sayıdan küçük olanı daima EBOB'dur.",
          hint: "18 sayısı 54'ü kalansız böldüğüne göre ikisini birden bölen en büyük sayı kaç olur?"
        }
      ]
    },
    {
      id: 17,
      kazanimId: "k3",
      type: "activity",
      icon: "⭕",
      roadLabel: "Etkinlik 1",
      typeLabel: "Venn & Denklem Atölyesi",
      title: "Etkinlik 1: Ortak Bölen Kesişimi ve EBOB Kartları",
      subtitle: "Venn şemasının kesişim bölgesini ve pratik EBOB kurallarını tamamla!",
      activityMode: "multi_stage_rainbow",
      stages: [
        {
          badge: "1. Aşama • 18 ve 24 Venn Kesişimi",
          variety: "venn_ebob",
          prompt: "18 ve 24'ün ortak bölenlerini kesişime yerleştir ve EBOB değerini bul:",
          targetNumber: 6,
          numA: 18,
          numB: 24,
          onlyA: [9, 18],
          onlyB: [4, 8, 12, 24],
          commonFixed: [1, 2],
          missingTargets: [
            { index: 0, answer: 3, hint: "Hem 18'i hem 24'ü bölen 2'den büyük tek asal 3'tür." },
            { index: 1, answer: 6, hint: "18 ve 24'ü bölen en büyük ortak sayı 6'dır." }
          ],
          pool: [3, 4, 6, 8, 9, 12]
        },
        {
          badge: "2. Aşama • Hızlı EBOB Eşitlikleri",
          variety: "equation_cards",
          prompt: "Pratik kurallara göre her karttaki EBOB değerini seç:",
          targetNumber: 15,
          sequence: ["EBOB(20, 30) = ?", "EBOB(15, 45) = ?", "EBOB(14, 21) = ?"],
          missingTargets: [
            { index: 0, answer: 10, hint: "20 ve 30'u bölen en büyük sayı 10'dur." },
            { index: 1, answer: 15, hint: "45 sayısı 15'in katıdır; birbirinin katı sayılarda EBOB küçük sayıdır." },
            { index: 2, answer: 7, hint: "14 = 7×2 ve 21 = 7×3 olduğundan ortak bölen 7'dir." }
          ],
          pool: [5, 7, 10, 14, 15, 30]
        }
      ],
      variants: [
        {
          stages: [
            {
              badge: "1. Aşama • 20 ve 30 Venn Kesişimi",
              variety: "venn_ebob",
              prompt: "20 ve 30'un ortak bölenlerini kesişime yerleştir ve EBOB(20, 30) değerini bul:",
              targetNumber: 10,
              numA: 20,
              numB: 30,
              onlyA: [4, 20],
              onlyB: [3, 6, 15, 30],
              commonFixed: [1, 2],
              missingTargets: [
                { index: 0, answer: 5, hint: "Hem 20'yi hem 30'u bölen tek asal sayı 5'tir." },
                { index: 1, answer: 10, hint: "20 ve 30'u bölen en büyük ortak sayı 10'dur." }
              ],
              pool: [4, 5, 6, 10, 15, 20]
            },
            {
              badge: "2. Aşama • Hızlı EBOB Eşitlikleri",
              variety: "equation_cards",
              prompt: "Pratik kurallara göre her karttaki EBOB değerini seç:",
              targetNumber: 16,
              sequence: ["EBOB(16, 48) = ?", "EBOB(24, 36) = ?", "EBOB(18, 27) = ?"],
              missingTargets: [
                { index: 0, answer: 16, hint: "48 = 16 × 3 olduğu için EBOB küçük sayıdır." },
                { index: 1, answer: 12, hint: "24 = 12×2 ve 36 = 12×3." },
                { index: 2, answer: 9, hint: "18 = 9×2 ve 27 = 9×3." }
              ],
              pool: [6, 8, 9, 12, 16, 24]
            }
          ]
        }
      ]
    },
    {
      id: 18,
      kazanimId: "k3",
      type: "activity",
      icon: "🔬",
      roadLabel: "Etkinlik 2",
      typeLabel: "EBOB Uygulama Labı",
      title: "Etkinlik 2: Üslü İfadelerden EBOB ve Poşet Sayısı",
      subtitle: "Üslü biçimde verilen sayıların EBOB'unu ve parça sayısını hesapla!",
      activityMode: "multi_stage_rainbow",
      stages: [
        {
          badge: "1. Aşama • Üslü İfadelerde EBOB Kuralı",
          variety: "equation_cards",
          prompt: "Ortak asal tabanların KÜÇÜK üslülerini çarparak değerleri bul (A = 2³·3², B = 2²·3⁴):",
          targetNumber: 36,
          sequence: ["2'nin küçük üssü = ?", "3'ün küçük üssü = ?", "EBOB(A, B) = 2^2·3^2 = ?"],
          missingTargets: [
            { index: 0, answer: 2, hint: "2³ ve 2² içinde küçük üs 2'dir (2²)." },
            { index: 1, answer: 2, hint: "3² ve 3⁴ içinde küçük üs 2'dir (3²)." },
            { index: 2, answer: 36, hint: "4 × 9 = 36 bulunur." }
          ],
          pool: [2, 3, 4, 12, 18, 36]
        },
        {
          badge: "2. Aşama • Çuvaldan Poşet Çıkarma",
          variety: "equation_cards",
          prompt: "36 kg pirinç ve 48 kg bulgur hiç artmadan en büyük eş poşetlere konacaktır:",
          targetNumber: 12,
          sequence: ["EBOB(36, 48) = ? kg", "Pirinç poşeti = ?", "Toplam poşet = ?"],
          missingTargets: [
            { index: 0, answer: 12, hint: "36 ve 48'i bölen en büyük sayı 12 kg'dır." },
            { index: 1, answer: 3, hint: "36 ÷ 12 = 3 poşet pirinç çıkar." },
            { index: 2, answer: 7, hint: "3 + (48 ÷ 12) = 3 + 4 = 7 poşet olur." }
          ],
          pool: [3, 4, 6, 7, 12, 24]
        }
      ],
      variants: [
        {
          stages: [
            {
              badge: "1. Aşama • Üslü İfadelerde EBOB",
              variety: "equation_cards",
              prompt: "Ortak tabanların KÜÇÜK üssünü seç (K = 2²·5³, L = 2³·5²·7):",
              targetNumber: 100,
              sequence: ["2'nin küçük üssü = ?", "5'in küçük üssü = ?", "EBOB(K, L) = 2^2·5^2 = ?"],
              missingTargets: [
                { index: 0, answer: 2, hint: "2² ve 2³ içinde küçük üs 2'dir." },
                { index: 1, answer: 2, hint: "5³ ve 5² içinde küçük üs 2'dir." },
                { index: 2, answer: 100, hint: "4 × 25 = 100 bulunur (7 ortak olmadığı için alınmaz!)." }
              ],
              pool: [2, 3, 25, 50, 100]
            },
            {
              badge: "2. Aşama • Çuvaldan Poşet Çıkarma",
              variety: "equation_cards",
              prompt: "30 kg mercimek ve 45 kg nohut hiç artmadan en büyük eş poşetlere konacaktır:",
              targetNumber: 15,
              sequence: ["EBOB(30, 45) = ? kg", "Mercimek poşeti = ?", "Toplam poşet = ?"],
              missingTargets: [
                { index: 0, answer: 15, hint: "30 ve 45'i bölen en büyük sayı 15 kg'dır." },
                { index: 1, answer: 2, hint: "30 ÷ 15 = 2 poşet mercimek çıkar." },
                { index: 2, answer: 5, hint: "2 + (45 ÷ 15) = 2 + 3 = 5 poşet olur." }
              ],
              pool: [2, 3, 5, 10, 15]
            }
          ]
        }
      ]
    },
    {
      id: 19,
      kazanimId: "k3",
      type: "game",
      icon: "🎮",
      roadLabel: "Oyun",
      typeLabel: "HTML5 Mini Oyun",
      title: "Oyun: Marangozun EBOB Kesim Atölyesi",
      subtitle: "İki farklı boydaki kütüğü hiç parça artmayacak şekilde EN BÜYÜK eş uzunlukta kes!",
      gameType: "ebob_carpenter",
      rounds: [
        { lenA: 42, lenB: 56, ebob: 14, options: [7, 14, 21, 28] },
        { lenA: 45, lenB: 75, ebob: 15, options: [5, 9, 15, 25] },
        { lenA: 36, lenB: 60, ebob: 12, options: [6, 12, 18, 24] }
      ],
      variants: [
        {
          rounds: [
            { lenA: 42, lenB: 56, ebob: 14, options: [7, 14, 21, 28] },
            { lenA: 45, lenB: 75, ebob: 15, options: [5, 9, 15, 25] },
            { lenA: 36, lenB: 60, ebob: 12, options: [6, 12, 18, 24] }
          ]
        },
        {
          rounds: [
            { lenA: 48, lenB: 72, ebob: 24, options: [12, 16, 24, 36] },
            { lenA: 40, lenB: 60, ebob: 20, options: [10, 15, 20, 40] },
            { lenA: 54, lenB: 90, ebob: 18, options: [9, 18, 27, 30] }
          ]
        }
      ]
    },
    {
      id: 20,
      kazanimId: "k3",
      type: "question",
      icon: "🎯",
      roadLabel: "Pekiştir",
      typeLabel: "Pekiştirme Soruları",
      title: "Pekiştir: EBOB Problemleri (3 Soru)",
      subtitle: "Eşit paylaşım, şişeleme ve kenar bölme sorularını çöz!",
      questionVisual: "assets/flow/q_yag_siseleri.jpg",
      stem: "<strong>48 L</strong> ve <strong>64 L</strong> iki zeytinyağı birbirine karıştırılmadan hiç artmayacak şekilde eşit hacimli en büyük şişelere doldurulacaktır. En az kaç şişe gerekir?",
      options: [
        { letter: "A", text: "5" },
        { letter: "B", text: "7" },
        { letter: "C", text: "14" },
        { letter: "D", text: "16" }
      ],
      correctLetter: "B",
      hint: "EBOB(48, 64) = 16 L şişe boyunu bul ve toplam litreyi 16'ya böl!",
      solution: "EBOB(48, 64) = 16 L ⇒ 48÷16 = 3 ve 64÷16 = 4 şişe ⇒ Toplam = 3 + 4 = <strong>7</strong> şişe.",
      questionPack: [
        {
          badge: "1. Soru • Eşit Şişeleme",
          questionVisual: "assets/flow/q_yag_siseleri.jpg",
          stem: "<strong>48 L</strong> ve <strong>64 L</strong> zeytinyağı eşit hacimli en büyük şişelere doldurulacaktır. En az kaç şişe gerekir?",
          options: [{ letter: "A", text: "5" }, { letter: "B", text: "7" }, { letter: "C", text: "14" }, { letter: "D", text: "16" }],
          correctLetter: "B",
          hint: "Şişe hacmi EBOB(48, 64) = 16 L olur.",
          solution: "(48 ÷ 16) + (64 ÷ 16) = 3 + 4 = <strong>7</strong>."
        },
        {
          badge: "2. Soru • Tarla Çevresi Ağaç",
          stem: "Kenarları <strong>40 m</strong> ve <strong>56 m</strong> olan dikdörtgen bahçenin köşelerine de gelmek şartıyla etrafına eşit ve en büyük aralıklarla en az kaç ağaç dikilir?",
          options: [{ letter: "A", text: "18" }, { letter: "B", text: "22" }, { letter: "C", text: "24" }, { letter: "D", text: "36" }],
          correctLetter: "C",
          hint: "Aralık = EBOB(40, 56) = 8 m. Çevreyi aralığa böl!",
          solution: "Çevre = 2 × (40 + 56) = 192 m. Ağaç sayısı = 192 ÷ 8 = <strong>24</strong>."
        },
        {
          badge: "3. Soru • Üslü Sayılarda EBOB",
          stem: "A = 2⁴ · 3² · 5 ve B = 2² · 3³ · 7 olduğuna göre <strong>EBOB(A, B)</strong> kaçtır?",
          options: [{ letter: "A", text: "18" }, { letter: "B", text: "36" }, { letter: "C", text: "54" }, { letter: "D", text: "108" }],
          correctLetter: "B",
          hint: "Sadece ortak asal tabanların küçük üslerini çarp (5 ve 7 ortak değil!).",
          solution: "EBOB(A, B) = 2² × 3² = 4 × 9 = <strong>36</strong>."
        }
      ],
      variants: [
        {
          questionPack: [
            {
              badge: "1. Soru • Eşit Şişeleme",
              questionVisual: "assets/flow/q_yag_siseleri.jpg",
              stem: "<strong>48 L</strong> ve <strong>64 L</strong> zeytinyağı eşit hacimli en büyük şişelere doldurulacaktır. En az kaç şişe gerekir?",
              options: [{ letter: "A", text: "5" }, { letter: "B", text: "7" }, { letter: "C", text: "14" }, { letter: "D", text: "16" }],
              correctLetter: "B",
              hint: "EBOB(48, 64) = 16 L şişe boyunu kullan.",
              solution: "3 + 4 = <strong>7</strong> şişe."
            },
            {
              badge: "2. Soru • Tarla Çevresi Ağaç",
              stem: "Kenarları <strong>40 m</strong> ve <strong>56 m</strong> olan dikdörtgen bahçenin çevresine köşeler dahil en az kaç ağaç dikilir?",
              options: [{ letter: "A", text: "18" }, { letter: "B", text: "22" }, { letter: "C", text: "24" }, { letter: "D", text: "36" }],
              correctLetter: "C",
              hint: "Aralık 8 m, çevre 192 m!",
              solution: "192 ÷ 8 = <strong>24</strong>."
            },
            {
              badge: "3. Soru • Üslü Sayılarda EBOB",
              stem: "A = 2⁴ · 3² · 5 ve B = 2² · 3³ · 7 için EBOB(A, B) kaçtır?",
              options: [{ letter: "A", text: "18" }, { letter: "B", text: "36" }, { letter: "C", text: "54" }, { letter: "D", text: "108" }],
              correctLetter: "B",
              hint: "2² × 3² değerini hesapla.",
              solution: "4 × 9 = <strong>36</strong>."
            }
          ]
        },
        {
          questionPack: [
            {
              badge: "1. Soru • Eşit Şişeleme",
              questionVisual: "assets/flow/q_yag_siseleri.jpg",
              stem: "<strong>45 L</strong> ve <strong>75 L</strong> meyve suyu hiç artmayacak şekilde eşit hacimli en büyük şişelere konursa en az kaç şişe gerekir?",
              options: [{ letter: "A", text: "6" }, { letter: "B", text: "8" }, { letter: "C", text: "10" }, { letter: "D", text: "15" }],
              correctLetter: "B",
              hint: "EBOB(45, 75) = 15 L şişeler kullanılır!",
              solution: "(45 ÷ 15) + (75 ÷ 15) = 3 + 5 = <strong>8</strong> şişe."
            },
            {
              badge: "2. Soru • Tarla Çevresi Ağaç",
              stem: "Kenarları <strong>36 m</strong> ve <strong>60 m</strong> olan dikdörtgen bahçenin köşeleri dahil çevresine eşit aralıkla en az kaç ağaç dikilir?",
              options: [{ letter: "A", text: "12" }, { letter: "B", text: "16" }, { letter: "C", text: "18" }, { letter: "D", text: "24" }],
              correctLetter: "B",
              hint: "EBOB(36, 60) = 12 m aralık. Çevreyi 12'ye böl!",
              solution: "Çevre = 2 × (36 + 60) = 192 m. 192 ÷ 12 = <strong>16</strong> ağaç."
            },
            {
              badge: "3. Soru • Üslü Sayılarda EBOB",
              stem: "X = 2³ · 3² · 5 ve Y = 2² · 3 · 5² için EBOB(X, Y) kaçtır?",
              options: [{ letter: "A", text: "30" }, { letter: "B", text: "60" }, { letter: "C", text: "90" }, { letter: "D", text: "120" }],
              correctLetter: "B",
              hint: "Ortak asalların en küçük kuvvetlerini al: 2² · 3¹ · 5¹.",
              solution: "4 × 3 × 5 = <strong>60</strong>."
            }
          ]
        }
      ]
    },
    {
      id: 21,
      kazanimId: "k3",
      type: "question",
      icon: "🧠",
      roadLabel: "Kavrama",
      typeLabel: "Kavrama Testi",
      title: "Kavrama: Kare Parselleme ve Kalanlı Bölen (3 Soru)",
      subtitle: "EBOB'un kesim sayısı, kare parselleme ve kalanlı bölme uygulamalarını çöz!",
      stem: "Boyutları <strong>36 cm × 48 cm</strong> olan dikdörtgen kartondan hiç artmadan elde edilebilecek <strong>en büyük alanlı eş kareler</strong> kaç tanedir?",
      options: [
        { letter: "A", text: "8" },
        { letter: "B", text: "10" },
        { letter: "C", text: "12" },
        { letter: "D", text: "16" }
      ],
      correctLetter: "C",
      hint: "Kare kenarı = EBOB(36, 48) = 12 cm. Dikdörtgen alanını bir karenin alanına böl!",
      solution: "Kenar = 12 cm ⇒ (36÷12) × (48÷12) = 3 × 4 = <strong>12 kare</strong>.",
      questionPack: [
        {
          badge: "1. Kavrama • Kare Parselleme",
          stem: "Boyutları <strong>36 cm × 48 cm</strong> olan dikdörtgenden hiç artmadan elde edilecek <strong>en büyük alanlı eş kare</strong>lerden kaç adet çıkar?",
          options: [{ letter: "A", text: "8" }, { letter: "B", text: "10" }, { letter: "C", text: "12" }, { letter: "D", text: "16" }],
          correctLetter: "C",
          hint: "Karenin bir kenarı EBOB(36, 48) = 12 cm olur.",
          solution: "(36 ÷ 12) × (48 ÷ 12) = 3 × 4 = <strong>12</strong>."
        },
        {
          badge: "2. Kavrama • Kalanlı Bölen & EBOB",
          stem: "<strong>39</strong> ve <strong>63</strong> sayılarını böldüğünde her seferinde <strong>3 kalanını</strong> veren en büyük doğal sayı kaçtır?",
          options: [{ letter: "A", text: "6" }, { letter: "B", text: "10" }, { letter: "C", text: "12" }, { letter: "D", text: "18" }],
          correctLetter: "C",
          hint: "Önce her iki sayıdan kalan 3'ü çıkar: 39 − 3 = 36 ve 63 − 3 = 60. Şimdi bu iki sayının EBOB'unu bul!",
          solution: "39 − 3 = 36 ve 63 − 3 = 60 ⇒ EBOB(36, 60) = <strong>12</strong>."
        },
        {
          badge: "3. Kavrama • Kesim Sayısı İnceliği",
          stem: "<strong>30 m</strong> ve <strong>45 m</strong> uzunluğundaki iki demir çubuk hiç artmayacak şekilde eşit ve en büyük uzunlukta parçalara kesilecektir. Toplam kaç kesim yapılır?",
          options: [{ letter: "A", text: "3" }, { letter: "B", text: "4" }, { letter: "C", text: "5" }, { letter: "D", text: "6" }],
          correctLetter: "A",
          hint: "Parça boyu EBOB(30, 45) = 15 m olur. Her çubuk için (Parça Sayısı − 1) kesim yap!",
          solution: "30 ÷ 15 = 2 parça (1 kesim) ve 45 ÷ 15 = 3 parça (2 kesim) ⇒ Toplam = 1 + 2 = <strong>3 kesim</strong>."
        }
      ],
      variants: [
        {
          questionPack: [
            {
              badge: "1. Kavrama • Kare Parselleme",
              stem: "Boyutları <strong>36 cm × 48 cm</strong> olan dikdörtgenden hiç artmadan çıkarılacak en büyük eş karelerden kaç adet oluşur?",
              options: [{ letter: "A", text: "8" }, { letter: "B", text: "10" }, { letter: "C", text: "12" }, { letter: "D", text: "16" }],
              correctLetter: "C",
              hint: "Kare kenarı = EBOB(36, 48) = 12 cm.",
              solution: "3 × 4 = <strong>12 kare</strong>."
            },
            {
              badge: "2. Kavrama • Kalanlı Bölen & EBOB",
              stem: "<strong>39</strong> ve <strong>63</strong> sayılarını böldüğünde her seferinde <strong>3 kalanını</strong> veren en büyük doğal sayı kaçtır?",
              options: [{ letter: "A", text: "6" }, { letter: "B", text: "10" }, { letter: "C", text: "12" }, { letter: "D", text: "18" }],
              correctLetter: "C",
              hint: "39 − 3 = 36 ve 63 − 3 = 60 sayılarının EBOB'u!",
              solution: "EBOB(36, 60) = <strong>12</strong>."
            },
            {
              badge: "3. Kavrama • Kesim Sayısı",
              stem: "<strong>30 m</strong> ve <strong>45 m</strong>'lik iki çubuk eşit en büyük parçalara bölünürse toplam kaç kesim yapılır?",
              options: [{ letter: "A", text: "3" }, { letter: "B", text: "4" }, { letter: "C", text: "5" }, { letter: "D", text: "6" }],
              correctLetter: "A",
              hint: "EBOB(30, 45) = 15 m; 2 parça için 1, 3 parça için 2 kesim!",
              solution: "1 + 2 = <strong>3 kesim</strong>."
            }
          ]
        },
        {
          questionPack: [
            {
              badge: "1. Kavrama • Kare Parselleme",
              stem: "Boyutları <strong>24 cm × 40 cm</strong> olan dikdörtgenden hiç artmadan çıkarılacak en büyük eş karelerden kaç adet oluşur?",
              options: [{ letter: "A", text: "10" }, { letter: "B", text: "12" }, { letter: "C", text: "15" }, { letter: "D", text: "18" }],
              correctLetter: "C",
              hint: "Kare kenarı = EBOB(24, 40) = 8 cm.",
              solution: "(24 ÷ 8) × (40 ÷ 8) = 3 × 5 = <strong>15 kare</strong>."
            },
            {
              badge: "2. Kavrama • Kalanlı Bölen & EBOB",
              stem: "<strong>44</strong> ve <strong>62</strong> sayılarını böldüğünde her seferinde <strong>2 kalanını</strong> veren en büyük doğal sayı kaçtır?",
              options: [{ letter: "A", text: "6" }, { letter: "B", text: "9" }, { letter: "C", text: "12" }, { letter: "D", text: "14" }],
              correctLetter: "A",
              hint: "44 − 2 = 42 ve 62 − 2 = 60 sayılarının EBOB'unu bul!",
              solution: "EBOB(42, 60) = <strong>6</strong>."
            },
            {
              badge: "3. Kavrama • Kesim Sayısı",
              stem: "<strong>24 m</strong> ve <strong>36 m</strong>'lik iki çubuk eşit en büyük parçalara bölünürse toplam kaç kesim yapılır?",
              options: [{ letter: "A", text: "3" }, { letter: "B", text: "4" }, { letter: "C", text: "5" }, { letter: "D", text: "6" }],
              correctLetter: "A",
              hint: "Parça boyu EBOB(24, 36) = 12 m!",
              solution: "24÷12=2 parça (1 kesim), 36÷12=3 parça (2 kesim) ⇒ 1 + 2 = <strong>3 kesim</strong>."
            }
          ]
        }
      ]
    },

    // =========================================================================
    // ALT BAŞLIK 4: EN KÜÇÜK ORTAK KAT (EKOK) (22..28 + 3 Tahta = 10 Adım)
    // =========================================================================
    {
      id: 22,
      kazanimId: "k4",
      type: "concept",
      icon: "💡",
      roadLabel: "Keşif",
      typeLabel: "Örnek & Keşif",
      title: "Keşif: En Küçük Ortak Kat (EKOK)",
      subtitle: "Farklı adımların ilk kez hangi büyük bütünde eşitlendiğini keşfet!",
      explanation: [
        "İki sayının pozitif ortak katlarının en küçüğüne <strong>En Küçük Ortak Kat (EKOK)</strong> denir.",
        "<strong>İpucu:</strong> Küçük dikdörtgenlerden kare yapma, farklı sürelerde çalan ziller veya seferlerin buluşması <strong>EKOK</strong> problemidir!"
      ],
      sentenceHtml: "6 ve 8'in ilk ortak katı {0} olduğundan bir sonraki buluşmaları daima bu değerin {1} gerçekleşir.",
      blanks: [
        { id: 0, correct: "24", choices: ["2", "24", "48"] },
        { id: 1, correct: "katlarında", choices: ["bölenlerinde", "katlarında", "yarısında"] }
      ],
      variants: [
        {
          sentenceHtml: "8 ve 12'nin en küçük ortak katı {0} olup zillerin bir sonraki birlikte çalışı {1} olur.",
          blanks: [
            { id: 0, correct: "24", choices: ["4", "24", "96"] },
            { id: 1, correct: "24'ün katlarında", choices: ["4'ün katlarında", "24'ün katlarında", "farkında"] }
          ]
        },
        {
          sentenceHtml: "9 ve 12'nin en küçük ortak katı {0} olup küçük parçalardan {1} bütüne giderken EKOK kullanılır.",
          blanks: [
            { id: 0, correct: "36", choices: ["3", "36", "108"] },
            { id: 1, correct: "büyük", choices: ["büyük", "küçük", "eksik"] }
          ]
        }
      ]
    },
    {
      id: 23,
      kazanimId: "k4",
      type: "video",
      icon: "🎬",
      roadLabel: "Anlatım",
      typeLabel: "EKOK & Kenar Kurulumu",
      title: "Anlatım: EKOK Hesabı ve Küçük Parçadan Büyük Kare",
      subtitle: "Algoritmadaki tüm asalların çarpımını ve kare kurulumunu adım adım izle!",
      videoScene: "generic",
      steps: [
        { text: "1. Adım: Algoritmada her iki sayı da 1 olana kadar sağ sütuna asal bölenler yazılır; sağdaki TÜM asalların çarpımı EKOK'u verir." },
        { text: "2. Adım: Örneğin 6 ve 10 için sağ sütun 2, 3, 5 çıkar ⇒ EKOK(6, 10) = 2 × 3 × 5 = 30 olur." },
        { text: "3. Adım: Biri diğerinin tam katı olan iki sayının EKOK'u daima BÜYÜK olan sayıya eşittir (Örn: EKOK(12, 36) = 36)." }
      ],
      quickQuestion: "Kenarları 6 cm ve 10 cm olan dikdörtgen kartlardan en küçük alanlı bir kare oluşturmak için karenin kenarı kaç cm olur?",
      quickChoices: ["2 cm", "16 cm", "30 cm", "60 cm"],
      quickCorrect: "30 cm",
      quickQuestions: [
        {
          prompt: "Kenarları 6 cm ve 10 cm olan dikdörtgenlerden en küçük kare yapılırsa karenin bir kenarı kaç cm olur?",
          choices: ["2 cm", "16 cm", "30 cm", "60 cm"],
          correctIndex: 2,
          feedback: "Harika! EKOK(6, 10) = 30 cm olduğu için en küçük karenin bir kenarı 30 cm'dir.",
          hint: "6 ve 10 cm'nin ikisinin de katı olan en küçük sayıyı bul!"
        },
        {
          prompt: "Bir kenarı 30 cm olan bu kareyi oluşturmak için 6 cm × 10 cm'lik dikdörtgenlerden kaç adet gerekir?",
          choices: ["8 adet", "12 adet", "15 adet", "30 adet"],
          correctIndex: 2,
          feedback: "Doğru! (30 ÷ 6) × (30 ÷ 10) = 5 × 3 = 15 adet dikdörtgen gerekir.",
          hint: "Karenin alanını (30×30) bir dikdörtgenin alanına (6×10) böl!"
        }
      ]
    },
    {
      id: 24,
      kazanimId: "k4",
      type: "activity",
      icon: "🔀",
      roadLabel: "Etkinlik 1",
      typeLabel: "EBOB mu EKOK mu?",
      title: "Etkinlik 1: Problem Cümlelerinden Yöntem Seçimi",
      subtitle: "Her günlük hayat senaryosunun EBOB mu yoksa EKOK mu gerektirdiğini ayır!",
      activityMode: "ebob_ekok_sort",
      items: [
        { text: "40 cm ve 50 cm'lik çubukları hiç artmadan eşit en uzun parçalara bölmek", answer: "EBOB" },
        { text: "15 dk ve 20 dk'da bir çalan iki zilin tekrar birlikte çalacağı zamanı bulmak", answer: "EKOK" },
        { text: "6 cm × 8 cm fayanslarla kare biçiminde en küçük zemini kaplamak", answer: "EKOK" },
        { text: "48 L süt ve 60 L meyve suyunu aynı boyuttaki en büyük kaplara paylaştırmak", answer: "EBOB" },
        { text: "Cevizleri 5'erli ve 7'şerli sayınca hiç artmayan en az ceviz sayısını bulmak", answer: "EKOK" },
        { text: "72 m × 96 m dikdörtgen tarlanın etrafına eşit aralıkla en az sayıda ağaç dikmek", answer: "EBOB" }
      ],
      variants: [
        {
          items: [
            { text: "36 m ve 54 m'lik iki ipi hiç artmadan eşit en büyük parçalara kesmek", answer: "EBOB" },
            { text: "8 dk ve 14 dk'da bir kalkan iki vapurun aynı anda kalkacağı ilk saati bulmak", answer: "EKOK" },
            { text: "4 cm × 9 cm kartonları yan yana dizerek en küçük kare afişi oluşturmak", answer: "EKOK" },
            { text: "18 kg ve 30 kg bakliyatı birbirine karıştırmadan en büyük poşetlere koymak", answer: "EBOB" },
            { text: "Kitapları 6'şar ve 8'er paketleyince her seferinde 2 kitabın artması", answer: "EKOK" },
            { text: "24 × 40 cm banyo duvarını artmadan kare fayansla en az sayıda kaplamak", answer: "EBOB" }
          ]
        }
      ]
    },
    {
      id: 25,
      kazanimId: "k4",
      type: "activity",
      icon: "🪜",
      roadLabel: "Etkinlik 2",
      typeLabel: "EKOK & Aralık Atölyesi",
      title: "Etkinlik 2: Ortak Katlar, Üslü EKOK ve Aralık Şartı",
      subtitle: "EKOK eşitliklerini, üslü EKOK kuralını ve aralık şartını adım adım tamamla!",
      activityMode: "multi_stage_rainbow",
      stages: [
        {
          badge: "1. Aşama • Üslü İfadelerde EKOK Kuralı",
          variety: "equation_cards",
          prompt: "Ortak tabanların BÜYÜK üssünü ve ortak olmayanları al (A = 2²·3, B = 2³·5):",
          targetNumber: 120,
          sequence: ["2'nin büyük üssü = ?", "Ortak olmayan asallar = 3×?", "EKOK(A, B) = 2^3·3·5 = ?"],
          missingTargets: [
            { index: 0, answer: 3, hint: "2² ve 2³ içinde büyük kuvvet 3'tür." },
            { index: 1, answer: 5, hint: "Ortak olmayan asallar 3 ve 5'tir." },
            { index: 2, answer: 120, hint: "8 × 3 × 5 = 120 olur." }
          ],
          pool: [2, 3, 5, 60, 120]
        },
        {
          badge: "2. Aşama • Aralık Şartlı EKOK",
          variety: "equation_cards",
          prompt: "12 ve 18 dakikada çalan iki zil birlikte 09:00'da çaldıktan sonra ilk kez:",
          targetNumber: 108,
          sequence: ["EKOK(12, 18) = ? dk", "3. birlikte buluşma = ? dk", "100 dk'dan büyük ilk kat = ?"],
          missingTargets: [
            { index: 0, answer: 36, hint: "12 ve 18'in en küçük ortak katı 36 dakikadır." },
            { index: 1, answer: 72, hint: "09:00 (1.), +36 (2.), +36 = 72 dk (3. buluşma) veya ilk tekrar +36! Burada 2 kat = 72." },
            { index: 2, answer: 108, hint: "36 × 3 = 108 sayısı 100'den büyük ilk kattır." }
          ],
          pool: [36, 54, 72, 90, 108]
        }
      ],
      variants: [
        {
          stages: [
            {
              badge: "1. Aşama • Üslü İfadelerde EKOK",
              variety: "equation_cards",
              prompt: "Büyük üslü asalları çarp (P = 2·3², Q = 2²·3·5):",
              targetNumber: 180,
              sequence: ["2'nin büyük üssü = ?", "3'ün büyük üssü = ?", "EKOK(P, Q) = 2^2·3^2·5 = ?"],
              missingTargets: [
                { index: 0, answer: 2, hint: "2¹ ve 2² içinde büyük üs 2'dir." },
                { index: 1, answer: 2, hint: "3² ve 3¹ içinde büyük üs 2'dir." },
                { index: 2, answer: 180, hint: "4 × 9 × 5 = 180 olur." }
              ],
              pool: [1, 2, 90, 180, 360]
            },
            {
              badge: "2. Aşama • Aralık Şartlı EKOK",
              variety: "equation_cards",
              prompt: "8 ve 12'nin ortak katlarından aralık şartını sağlayan değerleri bul:",
              targetNumber: 96,
              sequence: ["EKOK(8, 12) = ?", "50-80 arası kat = ?", "80-100 arası kat = ?"],
              missingTargets: [
                { index: 0, answer: 24, hint: "8 ve 12'nin en küçük ortak katı 24'tür." },
                { index: 1, answer: 72, hint: "24 × 3 = 72 sayısı 50 ile 80 arasındadır." },
                { index: 2, answer: 96, hint: "24 × 4 = 96 sayısı 80 ile 100 arasındadır." }
              ],
              pool: [24, 48, 72, 84, 96]
            }
          ]
        }
      ]
    },
    {
      id: 26,
      kazanimId: "k4",
      type: "game",
      icon: "🎮",
      roadLabel: "Oyun",
      typeLabel: "HTML5 Mini Oyun",
      title: "Oyun: Ortak Ritim ve Sefer Senkronizasyonu",
      subtitle: "Farklı periyotlarla dönen iki dişli çarkın aynı anda başa geldiği ilk dakikayı (EKOK) yakala!",
      gameType: "ekok_gears",
      rounds: [
        { p1: 6, p2: 8, ekok: 24, options: [12, 16, 24, 48] },
        { p1: 9, p2: 12, ekok: 36, options: [18, 24, 36, 72] },
        { p1: 10, p2: 15, ekok: 30, options: [15, 30, 45, 60] }
      ],
      variants: [
        {
          rounds: [
            { p1: 6, p2: 8, ekok: 24, options: [12, 16, 24, 48] },
            { p1: 9, p2: 12, ekok: 36, options: [18, 24, 36, 72] },
            { p1: 10, p2: 15, ekok: 30, options: [15, 30, 45, 60] }
          ]
        },
        {
          rounds: [
            { p1: 4, p2: 14, ekok: 28, options: [14, 28, 42, 56] },
            { p1: 12, p2: 18, ekok: 36, options: [18, 36, 54, 72] },
            { p1: 8, p2: 20, ekok: 40, options: [20, 40, 60, 80] }
          ]
        }
      ]
    },
    {
      id: 27,
      kazanimId: "k4",
      type: "question",
      icon: "🎯",
      roadLabel: "Pekiştir",
      typeLabel: "Pekiştirme Soruları",
      title: "Pekiştir: EKOK Saat & Kare Kurulumu (3 Soru)",
      subtitle: "Zil buluşması, kalanlı EKOK ve dikdörtgenden kare oluşturma sorularını çöz!",
      questionVisual: "assets/flow/k4_ekok_disliler.jpg",
      stem: "Aynı duraktan biri <strong>15 dakikada</strong>, diğeri <strong>20 dakikada</strong> bir kalkan iki tren birlikte <strong>08:30</strong>'da hareket etmiştir. İlk kez tekrar birlikte saat kaçta kalkarlar?",
      options: [
        { letter: "A", text: "09:00" },
        { letter: "B", text: "09:15" },
        { letter: "C", text: "09:30" },
        { letter: "D", text: "10:00" }
      ],
      correctLetter: "C",
      hint: "EKOK(15, 20) kaç dakikadır? Çıkan dakikayı 08:30'a ekle!",
      solution: "EKOK(15, 20) = 60 dk = 1 saat ⇒ 08:30 + 1 saat = <strong>09:30</strong>.",
      questionPack: [
        {
          badge: "1. Soru • Sefer Buluşması",
          questionVisual: "assets/flow/k4_ekok_disliler.jpg",
          stem: "Aynı duraktan <strong>15 dk</strong> ve <strong>20 dk</strong> arayla kalkan iki tren <strong>08:30</strong>'da birlikte kalktıktan sonra tekrar birlikte saat kaçta kalkar?",
          options: [{ letter: "A", text: "09:00" }, { letter: "B", text: "09:15" }, { letter: "C", text: "09:30" }, { letter: "D", text: "10:00" }],
          correctLetter: "C",
          hint: "EKOK(15, 20) = 60 dakika (1 saat).",
          solution: "08:30 + 60 dk = <strong>09:30</strong>."
        },
        {
          badge: "2. Soru • Üç Basamaklı Ortak Kat",
          stem: "Hem <strong>12</strong>'ye hem <strong>15</strong>'e kalansız bölünebilen <strong>en küçük üç basamaklı</strong> doğal sayı kaçtır?",
          options: [{ letter: "A", text: "100" }, { letter: "B", text: "120" }, { letter: "C", text: "150" }, { letter: "D", text: "180" }],
          correctLetter: "B",
          hint: "EKOK(12, 15) = 60 sayısının 100'den büyük ilk katını bul!",
          solution: "60 × 2 = <strong>120</strong> sayısı en küçük 3 basamaklı ortak kattır."
        },
        {
          badge: "3. Soru • Dikdörtgenden En Küçük Kare",
          stem: "Boyutları <strong>8 cm</strong> ve <strong>12 cm</strong> olan dikdörtgen fayanslar yan yana dizilerek oluşturulabilecek en küçük karenin alanı kaç cm² olur?",
          options: [{ letter: "A", text: "96" }, { letter: "B", text: "144" }, { letter: "C", text: "576" }, { letter: "D", text: "2304" }],
          correctLetter: "C",
          hint: "Karenin kenarı EKOK(8, 12) = 24 cm; alan = kenar × kenar!",
          solution: "Kenar = 24 cm ⇒ Alan = 24 × 24 = <strong>576 cm²</strong>."
        }
      ],
      variants: [
        {
          questionPack: [
            {
              badge: "1. Soru • Sefer Buluşması",
              questionVisual: "assets/flow/k4_ekok_disliler.jpg",
              stem: "<strong>15 dk</strong> ve <strong>20 dk</strong> arayla kalkan iki tren <strong>08:30</strong>'da birlikte kalktıktan sonra tekrar kaçta birlikte kalkar?",
              options: [{ letter: "A", text: "09:00" }, { letter: "B", text: "09:15" }, { letter: "C", text: "09:30" }, { letter: "D", text: "10:00" }],
              correctLetter: "C",
              hint: "EKOK(15, 20) = 60 dk.",
              solution: "08:30 + 1 saat = <strong>09:30</strong>."
            },
            {
              badge: "2. Soru • Üç Basamaklı Ortak Kat",
              stem: "Hem <strong>12</strong>'ye hem <strong>15</strong>'e kalansız bölünen en küçük 3 basamaklı sayı kaçtır?",
              options: [{ letter: "A", text: "100" }, { letter: "B", text: "120" }, { letter: "C", text: "150" }, { letter: "D", text: "180" }],
              correctLetter: "B",
              hint: "60'ın 100'den büyük ilk katı!",
              solution: "60 × 2 = <strong>120</strong>."
            },
            {
              badge: "3. Soru • Kare Alanı",
              stem: "<strong>8 cm × 12 cm</strong> dikdörtgenlerden yapılan en küçük karenin alanı kaç cm²'dir?",
              options: [{ letter: "A", text: "96" }, { letter: "B", text: "144" }, { letter: "C", text: "576" }, { letter: "D", text: "2304" }],
              correctLetter: "C",
              hint: "Kenar = 24 cm.",
              solution: "24 × 24 = <strong>576</strong>."
            }
          ]
        },
        {
          questionPack: [
            {
              badge: "1. Soru • Sefer Buluşması",
              questionVisual: "assets/flow/k4_ekok_disliler.jpg",
              stem: "<strong>12 dk</strong> ve <strong>15 dk</strong> arayla çalan iki zil <strong>10:15</strong>'te birlikte çaldıktan sonra ilk kez tekrar saat kaçta birlikte çalar?",
              options: [{ letter: "A", text: "10:45" }, { letter: "B", text: "11:00" }, { letter: "C", text: "11:15" }, { letter: "D", text: "11:30" }],
              correctLetter: "C",
              hint: "EKOK(12, 15) = 60 dakikadır.",
              solution: "10:15 + 60 dk = <strong>11:15</strong>."
            },
            {
              badge: "2. Soru • Üç Basamaklı Ortak Kat",
              stem: "Hem <strong>9</strong>'a hem <strong>12</strong>'ye kalansız bölünen <strong>100'den büyük en küçük</strong> sayı kaçtır?",
              options: [{ letter: "A", text: "108" }, { letter: "B", text: "120" }, { letter: "C", text: "144" }, { letter: "D", text: "180" }],
              correctLetter: "A",
              hint: "EKOK(9, 12) = 36'nın 100'ü geçen ilk katını al!",
              solution: "36 × 3 = <strong>108</strong>."
            },
            {
              badge: "3. Soru • Kare Alanı",
              stem: "<strong>6 cm × 9 cm</strong> dikdörtgenlerden oluşturulan en küçük karenin alanı kaç cm²'dir?",
              options: [{ letter: "A", text: "54" }, { letter: "B", text: "144" }, { letter: "C", text: "324" }, { letter: "D", text: "486" }],
              correctLetter: "C",
              hint: "Karenin kenarı EKOK(6, 9) = 18 cm!",
              solution: "18 × 18 = <strong>324 cm²</strong>."
            }
          ]
        }
      ]
    },
    {
      id: 28,
      kazanimId: "k4",
      type: "question",
      icon: "🧠",
      roadLabel: "Kavrama",
      typeLabel: "Kavrama Testi",
      title: "Kavrama: Kalanlı EKOK ve Dikdörtgen Dizilimi (3 Soru)",
      subtitle: "Kalanlı sayma problemlerinde önce EKOK alıp ardından kalanı eklemeyi pekiştir!",
      stem: "Bir sepetteki cevizler <strong>6'şar</strong> veya <strong>8'er</strong> sayıldığında her seferinde <strong>3 ceviz</strong> artıyor. Sepette en az kaç ceviz vardır?",
      options: [
        { letter: "A", text: "21" },
        { letter: "B", text: "24" },
        { letter: "C", text: "27" },
        { letter: "D", text: "51" }
      ],
      correctLetter: "C",
      hint: "Hem 6'nın hem 8'in katı olan en küçük sayı 24'tür; 3 arttığına göre 24 + 3 kaç olur?",
      solution: "EKOK(6, 8) = 24 ⇒ 3 ceviz arttığı için 24 + 3 = <strong>27</strong>.",
      questionPack: [
        {
          badge: "1. Kavrama • Kalanlı EKOK",
          stem: "Bir sepetteki cevizler <strong>6'şar</strong> veya <strong>8'er</strong> sayıldığında her seferinde <strong>3 ceviz</strong> artıyor. Sepette en az kaç ceviz vardır?",
          options: [{ letter: "A", text: "21" }, { letter: "B", text: "24" }, { letter: "C", text: "27" }, { letter: "D", text: "51" }],
          correctLetter: "C",
          hint: "EKOK(6, 8) + 3 işlemini yap!",
          solution: "24 + 3 = <strong>27</strong>."
        },
        {
          badge: "2. Kavrama • EBOB × EKOK Özelliği",
          stem: "İki sayının <strong>EBOB'u 4</strong> ve <strong>EKOK'u 48</strong>'dir. Sayılardan biri <strong>12</strong> ise diğeri kaçtır?",
          options: [{ letter: "A", text: "12" }, { letter: "B", text: "16" }, { letter: "C", text: "24" }, { letter: "D", text: "32" }],
          correctLetter: "B",
          hint: "İki sayının çarpımı = EBOB × EKOK eşitliğini kullan!",
          solution: "12 × x = 4 × 48 = 192 ⇒ x = 192 ÷ 12 = <strong>16</strong>."
        },
        {
          badge: "3. Kavrama • Çevre & EKOK",
          stem: "Yarıçap farkından dolayı bir pistte A koşucusu turu <strong>12 dk</strong>, B koşucusu <strong>18 dk</strong>'da tamamlıyor. Aynı yöne koşarlarsa kaç dakika sonra <strong>2. kez</strong> yan yana gelirler?",
          options: [{ letter: "A", text: "36" }, { letter: "B", text: "54" }, { letter: "C", text: "72" }, { letter: "D", text: "108" }],
          correctLetter: "C",
          hint: "İlk karşılaşma EKOK(12, 18) = 36 dk sonradır; 2. karşılaşma 2 × 36 olur!",
          solution: "EKOK(12, 18) = 36 dk ⇒ 2. karşılaşma = 36 × 2 = <strong>72 dk</strong>."
        }
      ],
      variants: [
        {
          questionPack: [
            {
              badge: "1. Kavrama • Kalanlı EKOK",
              stem: "Bir sepetteki kalemler <strong>6'şar</strong> veya <strong>8'er</strong> sayıldığında her seferinde <strong>3 kalem</strong> artıyor. En az kaç kalem vardır?",
              options: [{ letter: "A", text: "21" }, { letter: "B", text: "24" }, { letter: "C", text: "27" }, { letter: "D", text: "51" }],
              correctLetter: "C",
              hint: "EKOK(6, 8) + 3!",
              solution: "24 + 3 = <strong>27</strong>."
            },
            {
              badge: "2. Kavrama • EBOB × EKOK Özelliği",
              stem: "<strong>EBOB(12, x) = 4</strong> ve <strong>EKOK(12, x) = 48</strong> ise x kaçtır?",
              options: [{ letter: "A", text: "12" }, { letter: "B", text: "16" }, { letter: "C", text: "24" }, { letter: "D", text: "32" }],
              correctLetter: "B",
              hint: "12 × x = 4 × 48.",
              solution: "x = 192 ÷ 12 = <strong>16</strong>."
            },
            {
              badge: "3. Kavrama • Pist Karşılaşması",
              stem: "Turu <strong>12 dk</strong> ve <strong>18 dk</strong>'da koşan iki atlet kaç dakika sonra <strong>2. kez</strong> başlangıçta buluşur?",
              options: [{ letter: "A", text: "36" }, { letter: "B", text: "54" }, { letter: "C", text: "72" }, { letter: "D", text: "108" }],
              correctLetter: "C",
              hint: "2 × EKOK(12, 18)!",
              solution: "2 × 36 = <strong>72</strong>."
            }
          ]
        },
        {
          questionPack: [
            {
              badge: "1. Kavrama • Kalanlı EKOK",
              stem: "Bilyeler <strong>9'ar</strong> veya <strong>12'şer</strong> sayıldığında her seferinde <strong>4 bilye</strong> artıyor. En az kaç bilye vardır?",
              options: [{ letter: "A", text: "32" }, { letter: "B", text: "36" }, { letter: "C", text: "40" }, { letter: "D", text: "76" }],
              correctLetter: "C",
              hint: "EKOK(9, 12) = 36 değerine kalan 4'ü ekle!",
              solution: "36 + 4 = <strong>40</strong>."
            },
            {
              badge: "2. Kavrama • EBOB × EKOK Özelliği",
              stem: "<strong>EBOB(15, x) = 5</strong> ve <strong>EKOK(15, x) = 60</strong> ise x kaçtır?",
              options: [{ letter: "A", text: "12" }, { letter: "B", text: "20" }, { letter: "C", text: "25" }, { letter: "D", text: "30" }],
              correctLetter: "B",
              hint: "15 × x = 5 × 60 = 300 denklemini çöz!",
              solution: "x = 300 ÷ 15 = <strong>20</strong>."
            },
            {
              badge: "3. Kavrama • Pist Karşılaşması",
              stem: "Turu <strong>10 dk</strong> ve <strong>15 dk</strong>'da koşan iki atlet kaç dakika sonra <strong>3. kez</strong> başlangıçta yan yana gelir?",
              options: [{ letter: "A", text: "30" }, { letter: "B", text: "60" }, { letter: "C", text: "90" }, { letter: "D", text: "120" }],
              correctLetter: "C",
              hint: "EKOK(10, 15) = 30 dk ⇒ 3 × 30!",
              solution: "3 × 30 = <strong>90 dk</strong>."
            }
          ]
        }
      ]
    },

    // =========================================================================
    // ALT BAŞLIK 5: ARALARINDA ASAL SAYILAR (29..35 + 3 Tahta = 10 Adım)
    // =========================================================================
    {
      id: 29,
      kazanimId: "k5",
      type: "concept",
      icon: "💡",
      roadLabel: "Keşif",
      typeLabel: "Örnek & Keşif",
      title: "Keşif: Aralarında Asal Sayılar",
      subtitle: "Sayıların kendisi asal olmasa bile ortak bölenleri yoksa aralarında asal olduklarını keşfet!",
      explanation: [
        "1'den başka ortak pozitif böleni olmayan (yani <strong>EBOB = 1</strong> olan) iki pozitif tam sayıya <strong>aralarında asal sayılar</strong> denir.",
        "<strong>Altın Kural:</strong> 1 ile her pozitif tam sayı aralarında asaldır. Ayrıca <strong>ardışık iki doğal sayı</strong> (ör. 8 ve 9) daima aralarında asaldır!"
      ],
      sentenceHtml: "9 ve 16 sayıları kendileri asal olmasa bile EBOB değerleri {0} olduğu için aralarında asaldır; aralarında asal iki sayının EKOK'u ise daima {1} eşittir.",
      blanks: [
        { id: 0, correct: "1", choices: ["1", "3", "9"] },
        { id: 1, correct: "çarpımlarına", choices: ["toplamlarına", "çarpımlarına", "farklarına"] }
      ],
      variants: [
        {
          sentenceHtml: "14 ve 15 sayıları {0} sayılar olduğu için her zaman aralarında asaldır; bu iki sayının EKOK(14, 15) değeri ise {1} eşittir.",
          blanks: [
            { id: 0, correct: "ardışık", choices: ["çift", "ardışık", "asal"] },
            { id: 1, correct: "14 × 15", choices: ["1", "14 + 15", "14 × 15"] }
          ]
        }
      ]
    },
    {
      id: 30,
      kazanimId: "k5",
      type: "video",
      icon: "🎬",
      roadLabel: "Anlatım",
      typeLabel: "Sadeleştirme Tekniği",
      title: "Anlatım: Aralarında Asal Sayılarda Kesir Sadeleştirme",
      subtitle: "(x + a) ile (y − b) aralarında asal olduğunda denklem kurmanın en hızlı yolunu öğren!",
      videoScene: "coprime_concept",
      steps: [
        { text: "1. Adım: 9 = 3² ve 16 = 2⁴ hiç ortak asal çarpan içermediğinden aralarında asaldır!" },
        { text: "2. Adım: İki çift sayı (ör. 14 ve 22) daima 2'ye bölündüğü için ASLA aralarında asal olamaz; ardışık sayılar ise DAİMA aralarında asaldır." },
        { text: "3. Adım: (x+1)/(y−2) = 15/25 ise önce sağdaki kesri en sade hale getir: 15/25 = 3/5 ⇒ x+1=3 (x=2), y−2=5 (y=7)!" }
      ],
      quickQuestion: "x+2 ile y−1 aralarında asal ve (x+2)/(y−1) = 21/28 ise x + y kaçtır?",
      quickChoices: ["5", "6", "7", "10"],
      quickCorrect: "6",
      quickQuestions: [
        {
          prompt: "x+2 ve y−1 aralarında asal, (x+2)/(y−1) = 21/28 olduğuna göre x + y kaçtır?",
          choices: ["5", "6", "7", "10"],
          correctIndex: 1,
          feedback: "Doğru! 21/28 = 3/4 ⇒ x+2=3 (x=1) ve y−1=4 (y=5) ⇒ x + y = 6!",
          hint: "Önce 21/28 kesrini ortak böleni 7 ile sadeleştir: 3/4!"
        },
        {
          prompt: "Aralarında asal iki sayının EBOB'u ile EKOK'unun toplamı 49 ise bu iki sayının çarpımı kaçtır?",
          choices: ["47", "48", "49", "50"],
          correctIndex: 1,
          feedback: "Süper! Aralarında asal sayılarda EBOB = 1 ve EKOK = çarpımdır ⇒ 49 − 1 = 48!",
          hint: "EBOB = 1 olduğuna göre EKOK = 49 − 1 kaç eder?"
        }
      ]
    },
    {
      id: 31,
      kazanimId: "k5",
      type: "activity",
      icon: "🔍",
      roadLabel: "Etkinlik 1",
      typeLabel: "Aralarında Asal mı?",
      title: "Etkinlik 1: İkili Çiftleri Test Et",
      subtitle: "Verilen sayı çiftlerinin aralarında asal olup olmadığını ortak bölen kontrolüyle ayır!",
      activityMode: "coprime_check",
      items: [
        { text: "15 ve 28 (15 = 3·5 , 28 = 2²·7)", answer: "Aralarında Asal" },
        { text: "21 ve 35 (İkisi de 7'ye bölünür)", answer: "Değil" },
        { text: "1 ve 36 (1 ile tüm sayılar)", answer: "Aralarında Asal" },
        { text: "14 ve 15 (Ardışık iki doğal sayı)", answer: "Aralarında Asal" },
        { text: "24 ve 33 (İkisi de 3'e bölünür)", answer: "Değil" },
        { text: "8 ve 25 (8 = 2³ , 25 = 5²)", answer: "Aralarında Asal" }
      ],
      variants: [
        {
          items: [
            { text: "12 ve 35 (12 = 2²·3 , 35 = 5·7)", answer: "Aralarında Asal" },
            { text: "18 ve 27 (İkisi de 9'a bölünür)", answer: "Değil" },
            { text: "1 ve 99 (1 sayısı ile her sayı)", answer: "Aralarında Asal" },
            { text: "29 ve 30 (Ardışık doğal sayılar)", answer: "Aralarında Asal" },
            { text: "22 ve 34 (İkisi de çift → 2 böler)", answer: "Değil" },
            { text: "16 ve 27 (16 = 2⁴ , 27 = 3³)", answer: "Aralarında Asal" }
          ]
        }
      ]
    },
    {
      id: 32,
      kazanimId: "k5",
      type: "activity",
      icon: "⚖️",
      roadLabel: "Etkinlik 2",
      typeLabel: "Sadeleştirme & Özellikler",
      title: "Etkinlik 2: Aralarında Asal Denklemleri Çözme",
      subtitle: "Kesir sadeleştirme ve EBOB–EKOK çarpım eşitliğini adım adım tamamla!",
      activityMode: "multi_stage_rainbow",
      stages: [
        {
          badge: "1. Aşama • EBOB + EKOK ve Ardışık Çift",
          variety: "equation_cards",
          prompt: "Aralarında asal sayı kurallarına göre boşlukları seç:",
          targetNumber: 45,
          sequence: ["EBOB(9, 16) = ?", "EKOK(5, 9) = ?", "Ardışık (14,15) EBOB = ?"],
          missingTargets: [
            { index: 0, answer: 1, hint: "9 ve 16 aralarında asaldır ⇒ EBOB = 1." },
            { index: 1, answer: 45, hint: "Aralarında asal sayıların EKOK'u çarpımlarına eşittir: 5 × 9 = 45." },
            { index: 2, answer: 1, hint: "Ardışık sayıların EBOB'u daima 1'dir." }
          ],
          pool: [1, 3, 14, 30, 45]
        },
        {
          badge: "2. Aşama • Oran Sadeleştirme",
          variety: "equation_cards",
          prompt: "a ile b aralarında asal sayılar olmak üzere a/b kesrinin sadeleşmiş payını bul:",
          targetNumber: 12,
          sequence: ["a/b = 18/24 ⇒ a = ?", "a/b = 20/35 ⇒ a = ?", "a/b = 24/42 ⇒ b = ?"],
          missingTargets: [
            { index: 0, answer: 3, hint: "18/24 kesrini 6 ile sadeleştir: 3/4 ⇒ a = 3." },
            { index: 1, answer: 4, hint: "20/35 kesrini 5 ile sadeleştir: 4/7 ⇒ a = 4." },
            { index: 2, answer: 7, hint: "24/42 kesrini 6 ile sadeleştir: 4/7 ⇒ payda b = 7." }
          ],
          pool: [3, 4, 5, 6, 7]
        }
      ],
      variants: [
        {
          stages: [
            {
              badge: "1. Aşama • EBOB ve EKOK Özellikleri",
              variety: "equation_cards",
              prompt: "Aralarında asal sayı kurallarına göre değerleri bul:",
              targetNumber: 56,
              sequence: ["EBOB(15, 22) = ?", "EKOK(7, 8) = ?", "1 ve 45 EBOB = ?"],
              missingTargets: [
                { index: 0, answer: 1, hint: "15 ve 22'nin ortak böleni yalnız 1'dir." },
                { index: 1, answer: 56, hint: "7 × 8 = 56 olur." },
                { index: 2, answer: 1, hint: "1 ile her sayı aralarında asaldır ⇒ EBOB = 1." }
              ],
              pool: [1, 7, 15, 45, 56]
            },
            {
              badge: "2. Aşama • Oran Sadeleştirme",
              variety: "equation_cards",
              prompt: "a ve b aralarında asal iken sadeleştirme yaparak değeri seç:",
              targetNumber: 18,
              sequence: ["a/b = 12/20 ⇒ a = ?", "a/b = 27/36 ⇒ b = ?", "a/b = 14/21 ⇒ a = ?"],
              missingTargets: [
                { index: 0, answer: 3, hint: "12/20 kesrini 4 ile sadeleştir: 3/5 ⇒ a = 3." },
                { index: 1, answer: 4, hint: "27/36 kesrini 9 ile sadeleştir: 3/4 ⇒ payda b = 4." },
                { index: 2, answer: 2, hint: "14/21 kesrini 7 ile sadeleştir: 2/3 ⇒ a = 2." }
              ],
              pool: [2, 3, 4, 5, 7]
            }
          ]
        }
      ]
    },
    {
      id: 33,
      kazanimId: "k5",
      type: "game",
      icon: "🎮",
      roadLabel: "Oyun",
      typeLabel: "HTML5 Mini Oyun",
      title: "Oyun: Şifreli Kasa — Aralarında Asal Çarklar",
      subtitle: "Kasa kilidini açmak için verilen anahtar sayıyla ARALARINDA ASAL olan çark numarasını seç!",
      gameType: "coprime_vault",
      locks: [
        { keyNum: 12, options: [9, 15, 25, 30], correct: 25, reason: "12 (2 ve 3'e bölünür) ile 25 (yalnız 5'e bölünür) aralarında asaldır!" },
        { keyNum: 18, options: [14, 21, 35, 42], correct: 35, reason: "18 (2 ve 3'e bölünür) ile 35 (5 ve 7'ye bölünür) aralarında asaldır!" },
        { keyNum: 20, options: [15, 27, 32, 35], correct: 27, reason: "20 (2 ve 5'e bölünür) ile 27 (yalnız 3'e bölünür) aralarında asaldır!" }
      ],
      variants: [
        {
          locks: [
            { keyNum: 12, options: [9, 15, 25, 30], correct: 25, reason: "12 ve 25'in 1'den başka ortak böleni yoktur!" },
            { keyNum: 18, options: [14, 21, 35, 42], correct: 35, reason: "18 ve 35 ortak asal çarpan taşımaz!" },
            { keyNum: 20, options: [15, 27, 32, 35], correct: 27, reason: "20 (2,5) ile 27 (3) aralarında asaldır!" }
          ]
        },
        {
          locks: [
            { keyNum: 14, options: [6, 15, 21, 28], correct: 15, reason: "14 (2,7) ile 15 (3,5) ardışıktır ve aralarında asaldır!" },
            { keyNum: 24, options: [9, 16, 35, 40], correct: 35, reason: "24 (2,3) ile 35 (5,7) aralarında asaldır!" },
            { keyNum: 30, options: [12, 25, 49, 55], correct: 49, reason: "30 (2,3,5) ile 49 (yalnız 7) aralarında asaldır!" }
          ]
        }
      ]
    },
    {
      id: 34,
      kazanimId: "k5",
      type: "question",
      icon: "🎯",
      roadLabel: "Pekiştir",
      typeLabel: "Pekiştirme Soruları",
      title: "Pekiştir: Aralarında Asal Şartları (3 Soru)",
      subtitle: "Aralarında asal sayı çiftlerini ve sadeleştirme tekniğini pekiştir!",
      stem: "Aşağıdaki sayı çiftlerinden hangisi <strong>aralarında asaldır</strong>?",
      options: [
        { letter: "A", text: "14 ile 21" },
        { letter: "B", text: "15 ile 22" },
        { letter: "C", text: "18 ile 27" },
        { letter: "D", text: "20 ile 35" }
      ],
      correctLetter: "B",
      hint: "Her çiftin ortak bir böleni (2, 3, 5 veya 7) olup olmadığını kontrol et!",
      solution: "14 ve 21 → 7 böler; 18 ve 27 → 9 böler; 20 ve 35 → 5 böler. <strong>15 (3·5)</strong> ile <strong>22 (2·11)</strong> ortak asal içermez!",
      questionPack: [
        {
          badge: "1. Soru • Ortak Bölen Kontrolü",
          stem: "Aşağıdaki sayı çiftlerinden hangisi <strong>aralarında asaldır</strong>?",
          options: [{ letter: "A", text: "14 ile 21" }, { letter: "B", text: "15 ile 22" }, { letter: "C", text: "18 ile 27" }, { letter: "D", text: "20 ile 35" }],
          correctLetter: "B",
          hint: "İki sayının da aynı asala bölünüp bölünmediğine bak.",
          solution: "15 = 3×5 ve 22 = 2×11 ⇒ Ortak bölen yalnız 1: <strong>15 ile 22</strong>."
        },
        {
          badge: "2. Soru • Basamak Rakamları",
          stem: "<strong>2A</strong> iki basamaklı sayısı ile <strong>15</strong> sayısı aralarında asal olduğuna göre <strong>A</strong> rakamının alabileceği kaç farklı değer vardır?",
          options: [{ letter: "A", text: "4" }, { letter: "B", text: "5" }, { letter: "C", text: "6" }, { letter: "D", text: "7" }],
          correctLetter: "B",
          hint: "15 = 3 × 5 olduğundan 2A sayısı 3'e ve 5'e bölünmemelidir!",
          solution: "20..29 arasında 3 veya 5'e bölünenler: 20(5), 21(3), 24(3), 25(5), 27(3). Kalanlar: 22, 23, 26, 28, 29 ⇒ <strong>5 değer</strong>."
        },
        {
          badge: "3. Soru • Çarpım ve EKOK",
          stem: "Aralarında asal iki sayının EKOK'u <strong>72</strong>'dir. Bu sayılardan biri <strong>9</strong> ise diğeri kaçtır?",
          options: [{ letter: "A", text: "6" }, { letter: "B", text: "8" }, { letter: "C", text: "12" }, { letter: "D", text: "16" }],
          correctLetter: "B",
          hint: "Aralarında asal sayıların EKOK'u çarpımlarına eşittir: 9 × x = 72!",
          solution: "72 ÷ 9 = <strong>8</strong> (8 ve 9 aralarında asaldır)."
        }
      ],
      variants: [
        {
          questionPack: [
            {
              badge: "1. Soru • Ortak Bölen Kontrolü",
              stem: "Aşağıdaki sayı çiftlerinden hangisi <strong>aralarında asaldır</strong>?",
              options: [{ letter: "A", text: "12 ile 21" }, { letter: "B", text: "16 ile 25" }, { letter: "C", text: "18 ile 24" }, { letter: "D", text: "25 ile 35" }],
              correctLetter: "B",
              hint: "16 = 2⁴ ve 25 = 5² ortak asal içermez!",
              solution: "EBOB(16, 25) = 1 olduğundan <strong>16 ile 25</strong> aralarında asaldır."
            },
            {
              badge: "2. Soru • Basamak Rakamları",
              stem: "<strong>3A</strong> iki basamaklı sayısı ile <strong>10</strong> sayısı aralarında asal ise A yerine kaç farklı rakam yazılabilir?",
              options: [{ letter: "A", text: "3" }, { letter: "B", text: "4" }, { letter: "C", text: "5" }, { letter: "D", text: "6" }],
              correctLetter: "B",
              hint: "10 = 2 × 5 olduğundan 3A tek olmalı ve 5 ile bitmemelidir!",
              solution: "A ∈ {1, 3, 7, 9} olmak üzere <strong>4 farklı değer</strong> alır."
            },
            {
              badge: "3. Soru • Çarpım ve EKOK",
              stem: "Aralarında asal iki sayının EKOK'u <strong>56</strong>, sayılardan biri <strong>7</strong> ise diğeri kaçtır?",
              options: [{ letter: "A", text: "6" }, { letter: "B", text: "8" }, { letter: "C", text: "12" }, { letter: "D", text: "14" }],
              correctLetter: "B",
              hint: "7 × x = 56!",
              solution: "56 ÷ 7 = <strong>8</strong>."
            }
          ]
        }
      ]
    },
    {
      id: 35,
      kazanimId: "k5",
      type: "question",
      icon: "🧠",
      roadLabel: "Kavrama",
      typeLabel: "Kavrama Testi",
      title: "Kavrama: Harfli İfadeler & Toplamın En Az Değeri (3 Soru)",
      subtitle: "Akıllı tahta aşamasına geçmeden önce aralarında asallığın kavrama sorularını çöz!",
      stem: "(a − 2) ile (b + 3) aralarında asal iki doğal sayıdır. (a − 2)/(b + 3) = <strong>18/27</strong> olduğuna göre <strong>a + b</strong> kaçtır?",
      options: [
        { letter: "A", text: "3" },
        { letter: "B", text: "4" },
        { letter: "C", text: "5" },
        { letter: "D", text: "6" }
      ],
      correctLetter: "B",
      hint: "Önce 18/27 kesrini en sade (aralarında asal) hale getir: 18/27 = 2/3!",
      solution: "18/27 = 2/3 ⇒ a − 2 = 2 (a = 4) ve b + 3 = 3 (b = 0) ⇒ a + b = 4 + 0 = <strong>4</strong>.",
      questionPack: [
        {
          badge: "1. Kavrama • Harfli Kesir",
          stem: "(a − 2) ile (b + 3) aralarında asaldır. (a − 2)/(b + 3) = <strong>18/27</strong> ise <strong>a + b</strong> kaçtır?",
          options: [{ letter: "A", text: "3" }, { letter: "B", text: "4" }, { letter: "C", text: "5" }, { letter: "D", text: "6" }],
          correctLetter: "B",
          hint: "18/27 = 2/3 şeklinde sadeleştirip payı paya, paydayı paydaya eşitle!",
          solution: "a − 2 = 2 ⇒ a = 4; b + 3 = 3 ⇒ b = 0. Toplam = <strong>4</strong>."
        },
        {
          badge: "2. Kavrama • Toplamı Verilen Çift",
          stem: "Aralarında asal iki doğal sayının çarpımı <strong>36</strong> olduğuna göre toplamları <strong>en az</strong> kaç olabilir?",
          options: [{ letter: "A", text: "12" }, { letter: "B", text: "13" }, { letter: "C", text: "15" }, { letter: "D", text: "37" }],
          correctLetter: "B",
          hint: "Çarpımı 36 olan çiftler: (1,36), (2,18), (3,12), (4,9), (6,6). Hangileri aralarında asaldır?",
          solution: "(4, 9) aralarında asaldır (2,18; 3,12 ve 6,6 değil!). En küçük toplam = 4 + 9 = <strong>13</strong>."
        },
        {
          badge: "3. Kavrama • Ortak Çarpım Çıkartma",
          stem: "EBOB(x, y) + EKOK(x, y) = <strong>31</strong> olan aralarında asal x ve y doğal sayıları için <strong>x · y</strong> kaçtır?",
          options: [{ letter: "A", text: "29" }, { letter: "B", text: "30" }, { letter: "C", text: "31" }, { letter: "D", text: "32" }],
          correctLetter: "B",
          hint: "Aralarında asal sayılarda EBOB = 1 ve EKOK = x · y olur!",
          solution: "1 + (x · y) = 31 ⇒ x · y = <strong>30</strong>."
        }
      ]
    },

    // =========================================================================
    // ÜNİTE SONU BÖLÜMLER (k6, k7, k8)
    // =========================================================================
    {
      id: 36,
      kazanimId: "k6",
      type: "activity",
      icon: "📗",
      roadLabel: "Hızlı Tekrar",
      typeLabel: "Konu Sonu Hızlı Tekrar",
      title: "Ünite Özeti: Temel Kurallar Eşleştirmesi",
      subtitle: "Kolay alıştırmalara ve TEOG / Bursluluk sorularına geçmeden önce 3 temel değeri doğrula!",
      activityMode: "rainbow_pairs",
      targetNumber: 72,
      sequence: ["36'nın çarpan sayısı=?", "EBOB(24,36)=?", "EKOK(8,12)=?"],
      missingTargets: [
        { index: 0, answer: 9, hint: "36 = 2² · 3² olduğundan pozitif çarpan sayısı (2+1)·(2+1) = 9 tanedir." },
        { index: 1, answer: 12, hint: "24 ve 36'yı aynı anda bölen en büyük sayı 12'dir." },
        { index: 2, answer: 24, hint: "8 ve 12'nin en küçük ortak katı 24'tür." }
      ],
      pool: [6, 8, 9, 12, 18, 24],
      variants: [
        {
          sequence: ["36'nın çarpan sayısı=?", "EBOB(24,36)=?", "EKOK(8,12)=?"],
          missingTargets: [
            { index: 0, answer: 9, hint: "36 = 2² · 3² ⇒ 9 pozitif çarpan." },
            { index: 1, answer: 12, hint: "24 ve 36'nın en büyük ortak böleni 12'dir." },
            { index: 2, answer: 24, hint: "8 ve 12'nin ilk ortak katı 24'tür." }
          ],
          pool: [6, 8, 9, 12, 18, 24]
        },
        {
          sequence: ["18'in çarpan sayısı=?", "EBOB(30,45)=?", "EKOK(6,10)=?"],
          missingTargets: [
            { index: 0, answer: 6, hint: "18 = {1,2,3,6,9,18} ⇒ 6 pozitif çarpan." },
            { index: 1, answer: 15, hint: "30 ve 45'i bölen en büyük sayı 15'tir." },
            { index: 2, answer: 30, hint: "6 ve 10'un en küçük ortak katı 30'dur." }
          ],
          pool: [6, 9, 10, 15, 30, 45]
        }
      ]
    },
    {
      id: 37,
      kazanimId: "k7",
      type: "activity",
      icon: "📘",
      roadLabel: "Örnek Kurgu",
      typeLabel: "MEB Örnek Soru Atölyesi",
      title: "Adım Adım Örnek Soru Kurgusu: Raf ve Kutu Dizilimi",
      subtitle: "MEB Örnek Sorularında sıkça çıkan 'aralık şartlı EKOK' kurgusunu 3 adımda tamamla!",
      activityMode: "rainbow_pairs",
      targetNumber: 180,
      sequence: ["EKOK(12,18)=?", "150-200 cm arası raf=?", "12 cm'lik kutu sayısı=?"],
      missingTargets: [
        { index: 0, answer: 36, hint: "12 ve 18'in en küçük ortak katı 36 cm'dir." },
        { index: 1, answer: 180, hint: "36'nın 150 ile 200 arasındaki katı 36 × 5 = 180 cm'dir." },
        { index: 2, answer: 15, hint: "180 cm'lik rafa 180 ÷ 12 = 15 adet kutu sığar." }
      ],
      pool: [12, 15, 18, 36, 144, 180],
      variants: [
        {
          sequence: ["EKOK(12,18)=?", "150-200 cm arası raf=?", "12 cm'lik kutu sayısı=?"],
          missingTargets: [
            { index: 0, answer: 36, hint: "EKOK(12, 18) = 36." },
            { index: 1, answer: 180, hint: "36 × 5 = 180 cm." },
            { index: 2, answer: 15, hint: "180 ÷ 12 = 15." }
          ],
          pool: [12, 15, 18, 36, 144, 180]
        },
        {
          sequence: ["EKOK(15,20)=?", "150-200 cm arası raf=?", "15 cm'lik kutu sayısı=?"],
          missingTargets: [
            { index: 0, answer: 60, hint: "15 ve 20'nin en küçük ortak katı 60 cm'dir." },
            { index: 1, answer: 180, hint: "60'ın 150-200 arasındaki katı 60 × 3 = 180 cm'dir." },
            { index: 2, answer: 12, hint: "180 ÷ 15 = 12 adet kutu sığar." }
          ],
          pool: [9, 12, 20, 60, 120, 180]
        }
      ]
    },
    {
      id: 38,
      kazanimId: "k8",
      type: "question",
      icon: "❓",
      roadLabel: "LGS Prova",
      typeLabel: "LGS Yeni Nesil Prova (2 Soru)",
      title: "LGS Çıkmış Soru Kalıpları Isınma Turu",
      subtitle: "Akıllı tahtadaki LGS Çıkmış Sorular testine geçmeden önce bu 2 klasik sınav kalıbını çöz!",
      questionVisual: "assets/flow/q_tomruk_kesim.jpg",
      stem: "<strong>48 dm</strong> ve <strong>72 dm</strong> uzunluğundaki iki tomruk eşit ve en büyük uzunlukta parçalara kesilecektir. Her kesim <strong>10 sn</strong> sürdüğüne göre tüm kesimler en az kaç saniye sürer?",
      options: [
        { letter: "A", text: "30 saniye" },
        { letter: "B", text: "40 saniye" },
        { letter: "C", text: "50 saniye" },
        { letter: "D", text: "60 saniye" }
      ],
      correctLetter: "A",
      hint: "Parça boyu EBOB(48, 72) = 24 dm'dir; N parça için (N−1) kesim yapıldığını unutma!",
      solution: "EBOB(48, 72) = 24 dm ⇒ 2 parça (1 kesim) ve 3 parça (2 kesim) ⇒ Toplam 3 kesim × 10 = <strong>30 saniye</strong>.",
      questionPack: [
        {
          badge: "1. LGS Kalıbı • Kesim Sayısı İnceliği",
          questionVisual: "assets/flow/q_tomruk_kesim.jpg",
          stem: "Yandaki tezgâhta verilen <strong>48 dm</strong> ve <strong>72 dm</strong> uzunluğundaki <strong>I.</strong> ve <strong>II.</strong> tomruklar, hiç artmayacak şekilde eşit ve en büyük uzunlukta parçalara kesilecektir. Her bir kesim işlemi <strong>10 sn</strong> sürdüğüne göre tüm kesim işlemi en az kaç saniye sürer?",
          options: [{ letter: "A", text: "30 saniye" }, { letter: "B", text: "40 saniye" }, { letter: "C", text: "50 saniye" }, { letter: "D", text: "60 saniye" }],
          correctLetter: "A",
          hint: "Önce EBOB ile 1 parçanın boyunu bul; ardından her tomrukta (Parça Sayısı − 1) kadar kesim yapıldığını hatırla!",
          solution: "Parça boyu EBOB(48, 72) = <strong>24 dm</strong>'dir. I. tomruk: 48 ÷ 24 = 2 parça ⇒ <strong>1 kesim</strong>. II. tomruk: 72 ÷ 24 = 3 parça ⇒ <strong>2 kesim</strong>. Toplam 1 + 2 = 3 kesim × 10 sn = <strong>30 saniye</strong>."
        },
        {
          badge: "2. LGS Kalıbı • Ortak Hat Uzunluğu",
          questionVisual: "assets/flow/q_gunes_panelleri.jpg",
          stem: "Yandaki çatının üst sırasına genişliği <strong>60 cm</strong> olan <strong>A tipi</strong> paneller, alt sırasına ise genişliği <strong>80 cm</strong> olan <strong>B tipi</strong> paneller boşluk kalmadan diziliyor. İki sıra aynı hizada başlayıp aynı hizada bittiğine göre toplamda <strong>en az kaç panel</strong> kullanılmıştır?",
          options: [{ letter: "A", text: "5 panel" }, { letter: "B", text: "7 panel" }, { letter: "C", text: "10 panel" }, { letter: "D", text: "14 panel" }],
          correctLetter: "B",
          hint: "Çatının ortak hat uzunluğu 60 cm ve 80 cm'nin en küçük ortak katıdır; bu uzunluğu her panelin genişliğine böl!",
          solution: "Ortak hat uzunluğu en az EKOK(60, 80) = <strong>240 cm</strong> olur. Üst sırada 240 ÷ 60 = 4 adet A paneli, alt sırada 240 ÷ 80 = 3 adet B paneli kullanılır. Toplam = 4 + 3 = <strong>7 panel</strong>."
        }
      ]
    },
    {
      id: 39,
      kazanimId: "k8",
      type: "game",
      icon: "🏆",
      roadLabel: "Final Kupası",
      typeLabel: "Final Maratonu",
      title: "Final: Çarpanlar ve Katlar Şampiyonluk Kupası",
      subtitle: "Son 3 hızlı görevi tamamla ve 1. Ünite Şampiyonluk Kupasını kaldır!",
      gameType: "final_marathon",
      challenges: [
        { q: "36 sayısının kaç tane pozitif tam sayı çarpanı vardır?", choices: ["6", "8", "9"], ans: "9" },
        { q: "Aralarında asal iki sayının EKOK'u 45 ise bu iki sayının çarpımı kaçtır?", choices: ["1", "45", "90"], ans: "45" },
        { q: "EBOB(15, 25) + EKOK(15, 25) işleminin sonucu kaçtır?", choices: ["75", "80", "85"], ans: "80" }
      ],
      variants: [
        {
          challenges: [
            { q: "36 sayısının kaç tane pozitif tam sayı çarpanı vardır?", choices: ["6", "8", "9"], ans: "9" },
            { q: "Aralarında asal iki sayının EKOK'u 45 ise bu iki sayının çarpımı kaçtır?", choices: ["1", "45", "90"], ans: "45" },
            { q: "EBOB(15, 25) + EKOK(15, 25) işleminin sonucu kaçtır?", choices: ["75", "80", "85"], ans: "80" }
          ]
        },
        {
          challenges: [
            { q: "25 sayısının kaç tane pozitif tam sayı çarpanı vardır?", choices: ["2", "3", "5"], ans: "3" },
            { q: "Aralarında asal iki sayının EBOB'u kaçtır?", choices: ["0", "1", "2"], ans: "1" },
            { q: "EBOB(12, 18) + EKOK(12, 18) işleminin sonucu kaçtır?", choices: ["36", "42", "48"], ans: "42" }
          ]
        }
      ]
    }
  ]
};
