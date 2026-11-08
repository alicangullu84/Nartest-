// ============================================================================
// MatFlow — 8. Sınıf 1. Ünite: Çarpanlar ve Katlar (6 Kazanım, 30 Durak)
// ============================================================================

window.MATFLOW_UNIT = {
  id: "m8-u1-carpanlar-katlar",
  grade: 8,
  unitNo: 1,
  title: "Çarpanlar ve Katlar",
  subtitle: "Bölünebilme, Asal Çarpanlar, EBOB, EKOK ve Aralarında Asal Sayılar",
  coverImage: "assets/flow/kapak_carpanlar_katlar.jpg",

  kazanimlar: [
    {
      id: "k1",
      no: 1,
      title: "Çarpanlar ve Katlar",
      code: "M.8.1.1.1",
      visual: "assets/flow/k1_carpan_bloklari.jpg",
      stops: [1, 2, 3, 4, 5]
    },
    {
      id: "k2",
      no: 2,
      title: "Asal Sayılar ve Algoritma",
      code: "M.8.1.1.1",
      visual: "assets/flow/k2_asal_agac.jpg",
      stops: [6, 7, 8, 9, 10]
    },
    {
      id: "k3",
      no: 3,
      title: "En Büyük Ortak Bölen (EBOB)",
      code: "M.8.1.1.2",
      visual: "assets/flow/k3_ebob_atolye.jpg",
      stops: [11, 12, 13, 14, 15, 16]
    },
    {
      id: "k4",
      no: 4,
      title: "En Küçük Ortak Kat (EKOK)",
      code: "M.8.1.1.2",
      visual: "assets/flow/k4_ekok_disliler.jpg",
      stops: [17, 18, 19, 20, 21, 22]
    },
    {
      id: "k5",
      no: 5,
      title: "Aralarında Asal Sayılar",
      code: "M.8.1.1.3",
      visual: "assets/flow/k5_aralarinda_asal_kasa.jpg",
      stops: [23, 24, 25, 26]
    },
    {
      id: "k6",
      no: 6,
      title: "LGS Bağlam Temelli Görevler",
      code: "M.8.1.1.2-3",
      visual: "assets/flow/k6_lgs_final_rozet.jpg",
      stops: [27, 28, 29, 30]
    }
  ],

  stops: [
    // ========================================================================
    // KAZANIM 1: ÇARPANLAR VE KATLAR (DURAK 1 - 5)
    // ========================================================================
    {
      id: 1,
      kazanimId: "k1",
      type: "concept",
      icon: "💡",
      typeLabel: "Örnek & Keşif",
      title: "Çarpanlar ve Katlar",
      subtitle: "Bir tam sayıyı kalansız bölen sayıları bloklarla keşfedelim.",
      barsDemo: true,
      explanation: [
        "Şu ana kadar tam sayılarda toplama, çıkarma ve çarpma işlemlerini öğrendik. Bölme işlemi çarpmaya göre biraz daha dikkat gerektirir; ancak bölmeyi <strong>çarpma işleminin tersi</strong> olarak düşünebiliriz. Her tam sayıyı başka bir tam sayıya kalansız bölemeyiz.",
        "Bir <strong>A</strong> doğal sayısını bir <strong>B</strong> doğal sayısına kalansız bölebiliyorsak, <strong>B</strong> sayısına <strong>A</strong>'nın <strong>çarpanı (böleni)</strong>, <strong>A</strong> sayısına ise <strong>B</strong>'nin <strong>katı</strong> denir."
      ],
      sentenceHtml: "Örneğin <strong>7 × 3 = 21</strong> işleminde; <strong>7</strong> sayısı 21'in bir {0}, <strong>21</strong> sayısı 7'nin bir {1} olur. Ayrıca 12 sayısı 3'e {2} bölünür.",
      blanks: [
        { id: 0, correct: "çarpanıdır", choices: ["çarpanıdır", "katıdır", "kalanıdır"] },
        { id: 1, correct: "katıdır", choices: ["bölenidir", "katıdır", "farkıdır"] },
        { id: 2, correct: "kalansız", choices: ["kalanlı", "kalansız", "ondalıklı"] }
      ]
    },
    {
      id: 2,
      kazanimId: "k1",
      type: "video",
      icon: "🎬",
      typeLabel: "Animasyonlu Anlatım",
      title: "Dikdörtgen Alanı ve Çarpan Çiftleri",
      subtitle: "Alanı 18 birimkare olan dikdörtgenlerin kenar uzunlukları bize ne anlatır?",
      videoScene: "rectangles_18",
      steps: [
        { text: "1. Adım: Alanı 18 br² olan bir dikdörtgenin kenarları 1 br ve 18 br olabilir (1 × 18 = 18).", draw: "rect_1_18" },
        { text: "2. Adım: Aynı alanı 2 satır ve 9 sütunluk bloklarla da kurabiliriz (2 × 9 = 18).", draw: "rect_2_9" },
        { text: "3. Adım: Veya 3 satır ve 6 sütun halinde dizebiliriz (3 × 6 = 18).", draw: "rect_3_6" },
        { text: "Sonuç: 18'in tüm pozitif çarpanları küçükten büyüğe: 1, 2, 3, 6, 9 ve 18'dir!" , draw: "rainbow_18" }
      ],
      quickQuestion: "Alanı 18 br² ve kenarları tam sayı olan kaç farklı dikdörtgen oluşturabildik?",
      quickChoices: ["2 farklı dikdörtgen", "3 farklı dikdörtgen", "6 farklı dikdörtgen"],
      quickCorrect: "3 farklı dikdörtgen"
    },
    {
      id: 3,
      kazanimId: "k1",
      type: "activity",
      icon: "🧩",
      typeLabel: "Etkileşimli Etkinlik",
      title: "Gökkuşağı Çarpan Kuşağı",
      subtitle: "24 sayısının küçükten büyüğe dizilmiş çarpanlarında baştan ve sondan çarpımları 24 olan eksikleri tamamla!",
      activityMode: "rainbow_pairs",
      targetNumber: 24,
      sequence: [1, 2, "?", 4, 6, "?", 12, 24],
      missingTargets: [
        { index: 2, answer: 3, hint: "3 × 8 = 24 olduğu için 2 ile 4 arasına 3 gelir." },
        { index: 5, answer: 8, hint: "3 ile eşleşen çarpan 8'dir (3 × 8 = 24)." }
      ],
      pool: [3, 5, 8, 9, 10]
    },
    {
      id: 4,
      kazanimId: "k1",
      type: "game",
      icon: "🎮",
      typeLabel: "HTML5 Mini Oyun",
      title: "Oyun: Çarpan Avcısı",
      subtitle: "Verilen hedef sayıyı kalansız bölen TÜM çarpan bloklarını seç! Tuzak sayılara dikkat et.",
      gameType: "factor_hunter",
      levels: [
        { target: 18, options: [1, 2, 3, 4, 6, 8, 9, 12, 18], divisors: [1, 2, 3, 6, 9, 18] },
        { target: 28, options: [1, 2, 3, 4, 6, 7, 14, 21, 28], divisors: [1, 2, 4, 7, 14, 28] }
      ]
    },
    {
      id: 5,
      kazanimId: "k1",
      type: "question",
      icon: "❓",
      typeLabel: "Soru & Çözüm",
      title: "Kazanım Kontrol: Dikdörtgen Bahçe",
      subtitle: "Kazanım 1'i tamamlamak ve yeşile döndürmek için bu soruyu çöz!",
      stem: "Alanı <strong>36 m²</strong> olan dikdörtgen şeklindeki bir hobi bahçesinin kenar uzunlukları metre cinsinden birer tam sayıdır. Buna göre bu bahçenin <strong>çevre uzunluğu en az</strong> kaç metredir?",
      options: [
        { letter: "A", text: "24 metre" },
        { letter: "B", text: "26 metre" },
        { letter: "C", text: "30 metre" },
        { letter: "D", text: "40 metre" }
      ],
      correctLetter: "A",
      hint: "Çevrenin en küçük olması için çarpan çiftlerinin birbirine en yakın (6 m × 6 m) seçilmesi gerekir.",
      solution: "36'nın çarpan çiftleri: (1×36), (2×18), (3×12), (4×9) ve (6×6)'dır. Kenarlar birbirine en yakın seçildiğinde (6 m ve 6 m, kare de özel bir dikdörtgendir) çevre = 2 × (6 + 6) = <strong>24 metre</strong> ile en küçük değerini alır."
    },

    // ========================================================================
    // KAZANIM 2: ASAL SAYILAR VE ALGORİTMA (DURAK 6 - 10)
    // ========================================================================
    {
      id: 6,
      kazanimId: "k2",
      type: "concept",
      icon: "💡",
      typeLabel: "Örnek & Keşif",
      title: "Asal Sayıları Tanıyalım",
      subtitle: "Sadece 1'e ve kendisine kalansız bölünebilen 1'den büyük doğal sayılara asal sayı denir.",
      primeStripDemo: [2, 3, 5, 7, 11, 13, 17, 19],
      explanation: [
        "1'den büyük her doğal sayının en az iki çarpanı vardır: <strong>1 ve kendisi</strong>. Başka hiçbir böleni olmayan sayılar matematik dünyasının yapı taşları olan <strong>asal sayılardır</strong>.",
        "Dikkat: <strong>1 asal sayı değildir!</strong> En küçük asal sayı <strong>2</strong>'dir ve 2'den başka çift asal sayı yoktur."
      ],
      sentenceHtml: "En küçük asal sayı {0} sayısıdır. Çift sayılar içinde asal olan tek sayı {1} iken, iki basamaklı en küçük asal sayı {2} olur.",
      blanks: [
        { id: 0, correct: "2", choices: ["1", "2", "3"] },
        { id: 1, correct: "2'dir", choices: ["yoktur", "2'dir", "4'tür"] },
        { id: 2, correct: "11", choices: ["10", "11", "13"] }
      ]
    },
    {
      id: 7,
      kazanimId: "k2",
      type: "activity",
      icon: "🧩",
      typeLabel: "Etkileşimli Etkinlik",
      title: "Canlı Çarpan Ağacı (60 Sayısı)",
      subtitle: "60 sayısını dallara ayırarak en alt basamaktaki asal çarpanlarına ulaştır!",
      activityMode: "factor_tree",
      rootNumber: 60,
      treeDescription: "60 = 2 × 30, ardından 30 = 2 × 15 ve 15 = 3 × 5 dallarındaki eksik sayıları seç:",
      missingNodes: [
        { id: "n1", label: "60 = 2 × [ ? ]", answer: 30 },
        { id: "n2", label: "30 = 2 × [ ? ]", answer: 15 },
        { id: "n3", label: "15 = 3 × [ ? ]", answer: 5 }
      ],
      pool: [5, 10, 12, 15, 20, 30]
    },
    {
      id: 8,
      kazanimId: "k2",
      type: "video",
      icon: "🎬",
      typeLabel: "Animasyonlu Anlatım",
      title: "Asal Çarpanlar Algoritması ve Üslü Gösterim",
      subtitle: "72 sayısını bölen listesi (algoritma) ile asal çarpanlarının çarpımı şeklinde yazalım.",
      videoScene: "prime_algo_72",
      steps: [
        { text: "1. Adım: 72 çift olduğu için en küçük asal sayı olan 2'ye bölelim: 72 ÷ 2 = 36, 36 ÷ 2 = 18, 18 ÷ 2 = 9.", draw: "algo_step1" },
        { text: "2. Adım: 9 sayısı 2'ye bölünmez; sıradaki asal sayı 3'e geçelim: 9 ÷ 3 = 3 ve 3 ÷ 3 = 1.", draw: "algo_step2" },
        { text: "3. Adım: Sağ sütunda üç tane 2 ve iki tane 3 elde ettik: 72 = 2³ · 3².", draw: "algo_step3" },
        { text: "Sonuç: 72 sayısının asal çarpanları sadece 2 ve 3'tür!", draw: "algo_step4" }
      ],
      quickQuestion: "72 = 2³ · 3² ifadesine göre 72'nin asal çarpanlarının toplamı kaçtır?",
      quickChoices: ["2 + 3 = 5", "3 + 2 = 5 (Üsler)", "72"],
      quickCorrect: "2 + 3 = 5"
    },
    {
      id: 9,
      kazanimId: "k2",
      type: "game",
      icon: "🎮",
      typeLabel: "HTML5 Mini Oyun",
      title: "Oyun: Asal Küre Sentezi",
      subtitle: "2, 3, 5 ve 7 asal kürelerine tıklayıp çarparak hedef sayıyı tam olarak üret!",
      gameType: "prime_synth",
      targets: [36, 90, 140]
    },
    {
      id: 10,
      kazanimId: "k2",
      type: "question",
      icon: "❓",
      typeLabel: "Soru & Çözüm",
      title: "Kazanım Kontrol: Bölen Listesi (Algoritma)",
      subtitle: "Kazanım 2'yi tamamlayıp yeşile çevirmek için algoritma sorusunu çöz!",
      stem: "Bir <strong>A</strong> doğal sayısı asal çarpanlar algoritmasıyla sırasıyla <strong>2, 2, 3 ve 5</strong> asal sayılarına bölündüğünde bölüm 1 oluyor (A = 2² · 3¹ · 5¹). Buna göre <strong>A sayısı</strong> kaçtır?",
      options: [
        { letter: "A", text: "30" },
        { letter: "B", text: "45" },
        { letter: "C", text: "60" },
        { letter: "D", text: "90" }
      ],
      correctLetter: "C",
      hint: "Sağdaki tüm asal bölenleri birbiriyle çarp: 2 × 2 × 3 × 5.",
      solution: "Bölme algoritmasında en üstteki A sayısı, sağdaki tüm asal bölenlerin çarpımına eşittir: A = 2 × 2 × 3 × 5 = 4 × 15 = <strong>60</strong> bulunur."
    },

    // ========================================================================
    // KAZANIM 3: EN BÜYÜK ORTAK BÖLEN - EBOB (DURAK 11 - 16)
    // ========================================================================
    {
      id: 11,
      kazanimId: "k3",
      type: "concept",
      icon: "💡",
      typeLabel: "Örnek & Keşif",
      title: "En Büyük Ortak Bölen (EBOB)",
      subtitle: "İki veya daha fazla sayıyı aynı anda kalansız bölebilen en büyük sayıyı bulalım.",
      explanation: [
        "<strong>18</strong>'in bölenleri: <strong>1, 2, 3, 6</strong>, 9, 18.<br><strong>24</strong>'ün bölenleri: <strong>1, 2, 3</strong>, 4, <strong>6</strong>, 8, 12, 24.",
        "Her iki sayıyı da aynı anda bölen ortak sayılar <strong>1, 2, 3 ve 6</strong>'dır. Bunların içindeki en büyük sayı olan <strong>6</strong>'ya 18 ve 24'ün <strong>EBOB</strong>'u denir."
      ],
      sentenceHtml: "18 ve 24 sayılarının en büyük ortak böleni EBOB(18, 24) = {0} olur. Büyük çuvalları veya uzun çubukları eş parçalara ayırırken {1} kullanılır.",
      blanks: [
        { id: 0, correct: "6", choices: ["3", "6", "12"] },
        { id: 1, correct: "EBOB", choices: ["EBOB", "EKOK", "Asal Ağaç"] }
      ]
    },
    {
      id: 12,
      kazanimId: "k3",
      type: "video",
      icon: "🎬",
      typeLabel: "Animasyonlu Anlatım",
      title: "Bütünden Parçaya: EBOB Problemlerinin Sırrı",
      subtitle: "Ne zaman EBOB kullanacağımızı 3 altın ipucuyla öğrenelim.",
      videoScene: "ebob_concept",
      steps: [
        { text: "1. İpucu: Elimizde büyük bütünü olan nesneler (uzun borular, çuvallar, bidonlar) varsa ve küçük eş parçalara ayırıyorsak EBOB kullanılır.", draw: "ebob_s1" },
        { text: "2. İpucu: Ortak algoritmada her iki sayıyı aynı anda bölen asal sayıların yanına yıldız (★) koyarız.", draw: "ebob_s2" },
        { text: "3. İpucu: Yıldızlı asal sayıların çarpımı bize bir parçanın en büyük boyutunu (EBOB) verir!", draw: "ebob_s3" }
      ],
      quickQuestion: "40 kg ve 60 kg'lık iki çuval pirinci birbirine karıştırmadan en büyük eşit poşetlere paylaştırırken bir poşet kaç kg olur?",
      quickChoices: ["10 kg", "20 kg", "30 kg"],
      quickCorrect: "20 kg"
    },
    {
      id: 13,
      kazanimId: "k3",
      type: "activity",
      icon: "🧩",
      typeLabel: "Etkileşimli Etkinlik",
      title: "Ortak Bölenlere Yıldız (★) Koy",
      subtitle: "36 ve 48 sayılarının ortak algoritmasında her iki sayıyı aynı anda bölen değerleri tamamla!",
      activityMode: "rainbow_pairs",
      targetNumber: 12,
      sequence: ["EBOB(20,30)=?", "EBOB(16,24)=?", "EBOB(36,48)=?"],
      missingTargets: [
        { index: 0, answer: 10, hint: "20 ve 30'u bölen en büyük sayı 10'dur." },
        { index: 1, answer: 8, hint: "16 ve 24'ü bölen en büyük sayı 8'dir." },
        { index: 2, answer: 12, hint: "36 ve 48'i bölen en büyük sayı 12'dir." }
      ],
      pool: [4, 6, 8, 10, 12, 16]
    },
    {
      id: 14,
      kazanimId: "k3",
      type: "game",
      icon: "🎮",
      typeLabel: "HTML5 Mini Oyun",
      title: "Oyun: Marangozun EBOB Kesim Atölyesi",
      subtitle: "İki farklı boydaki kütüğü hiç parça artmayacak şekilde EN BÜYÜK eş uzunlukta kesmek için testere boyunu ayarla!",
      gameType: "ebob_carpenter",
      rounds: [
        { lenA: 42, lenB: 56, ebob: 14, options: [7, 14, 21, 28] },
        { lenA: 45, lenB: 75, ebob: 15, options: [5, 9, 15, 25] }
      ]
    },
    {
      id: 15,
      kazanimId: "k3",
      type: "question",
      icon: "❓",
      typeLabel: "Soru & Çözüm",
      title: "Zeytinyağı Şişeleme Problemi",
      subtitle: "Önce 1 şişenin hacmini (EBOB), sonra toplam şişe sayısını bulalım.",
      stem: "Bir üretici <strong>48 litre</strong> zeytinyağı ile <strong>60 litre</strong> ayçiçek yağını birbirine karıştırmadan ve hiç artmayacak biçimde eşit hacimli şişelere dolduracaktır. Bu iş için <strong>en az kaç şişe</strong> gerekir?",
      options: [
        { letter: "A", text: "9 şişe" },
        { letter: "B", text: "12 şişe" },
        { letter: "C", text: "15 şişe" },
        { letter: "D", text: "18 şişe" }
      ],
      correctLetter: "A",
      hint: "EBOB(48, 60) = 12 litredir (1 şişenin hacmi). Şişe sayısı için 48÷12 ve 60÷12 sonuçlarını topla!",
      solution: "Şişe sayısının en az olması için şişe hacmi en büyük olmalıdır: EBOB(48, 60) = <strong>12 litre</strong>. Zeytinyağı için 48 ÷ 12 = 4 şişe, ayçiçek yağı için 60 ÷ 12 = 5 şişe gerekir. Toplam = 4 + 5 = <strong>9 şişe</strong>."
    },
    {
      id: 16,
      kazanimId: "k3",
      type: "question",
      icon: "❓",
      typeLabel: "Soru & Çözüm",
      title: "Kazanım Kontrol: Tarla Etrafına Fidan Dikimi",
      subtitle: "Kazanım 3'ü tamamlayıp yeşile çevirmek için çevre-aralık sorusunu çöz!",
      stem: "Kenar uzunlukları <strong>40 m</strong> ve <strong>64 m</strong> olan dikdörtgen şeklindeki bir parkın etrafına, köşelerine de dikilmek şartıyla eşit aralıklarla en az sayıda aydınlatma direği dikilecektir. Kaç direk gerekir?",
      options: [
        { letter: "A", text: "13 direk" },
        { letter: "B", text: "24 direk" },
        { letter: "C", text: "26 direk" },
        { letter: "D", text: "32 direk" }
      ],
      correctLetter: "C",
      hint: "İki direk arası mesafe EBOB(40, 64) = 8 metredir. Kapalı şekillerde Direk Sayısı = Çevre ÷ EBOB!",
      solution: "İki direk arası en büyük mesafe EBOB(40, 64) = <strong>8 metre</strong>dir. Parkın çevresi = 2 × (40 + 64) = 208 metredir. Toplam direk sayısı = 208 ÷ 8 = <strong>26 direk</strong> bulunur."
    },

    // ========================================================================
    // KAZANIM 4: EN KÜÇÜK ORTAK KAT - EKOK (DURAK 17 - 22)
    // ========================================================================
    {
      id: 17,
      kazanimId: "k4",
      type: "concept",
      icon: "💡",
      typeLabel: "Örnek & Keşif",
      title: "En Küçük Ortak Kat (EKOK)",
      subtitle: "İki veya daha fazla sayının ortak katlarından en küçüğünü keşfedelim.",
      explanation: [
        "<strong>4</strong>'ün katları: 4, 8, <strong>12</strong>, 16, 20, <strong>24</strong>, 28, 32, <strong>36</strong>...<br><strong>6</strong>'nın katları: 6, <strong>12</strong>, 18, <strong>24</strong>, 30, <strong>36</strong>...",
        "4 ve 6'nın ortak katları 12, 24, 36... şeklinde 12'şer artarak gider. Bu ortak katların en küçüğü olan <strong>12</strong> sayısına 4 ve 6'nın <strong>EKOK</strong>'u denir."
      ],
      sentenceHtml: "4 ve 6 sayılarının en küçük ortak katı EKOK(4, 6) = {0} olur. Küçük parçalardan büyük bir bütün oluştururken veya nöbet/sefer buluşmalarında {1} kullanılır.",
      blanks: [
        { id: 0, correct: "12", choices: ["6", "12", "24"] },
        { id: 1, correct: "EKOK", choices: ["EBOB", "EKOK", "Bölme"] }
      ]
    },
    {
      id: 18,
      kazanimId: "k4",
      type: "video",
      icon: "🎬",
      typeLabel: "Animasyonlu Anlatım",
      title: "Parçadan Bütüne ve Periyotlar: EKOK",
      subtitle: "Zil çalma, nöbet tutma ve küçük dikdörtgenlerden kare yapma mantığı.",
      videoScene: "ekok_concept",
      steps: [
        { text: "1. Durum: Biri 6 dakikada bir, diğeri 8 dakikada bir kalkan iki otobüs ilk kez EKOK(6, 8) = 24. dakikada birlikte kalkar.", draw: "ekok_s1" },
        { text: "2. Durum: Küçük dikdörtgen fayansları yan yana ve alt alta dizerek büyük bir kare oluştururken karenin kenarı EKOK olur.", draw: "ekok_s2" },
        { text: "3. Kural: İlk ortak katı (EKOK) bulduktan sonra sonraki tüm buluşmalar EKOK'un katlarında (24, 48, 72...) gerçekleşir!", draw: "ekok_s3" }
      ],
      quickQuestion: "6 ve 8 dakikada bir çalan iki zil saat 09.00'da birlikte çaldıktan sonra ilk kez saat kaçta tekrar birlikte çalar?",
      quickChoices: ["09.14", "09.24", "09.48"],
      quickCorrect: "09.24"
    },
    {
      id: 19,
      kazanimId: "k4",
      type: "activity",
      icon: "🧩",
      typeLabel: "Etkileşimli Etkinlik",
      title: "Strateji Seçimi: EBOB mu, EKOK mu?",
      subtitle: "Verilen günlük hayat problemlerinde hangi yöntemin kullanılacağını doğru seç!",
      activityMode: "ebob_ekok_sort",
      items: [
        { text: "Çuvallardaki bakliyatları eşit poşetlere paylaştırma", answer: "EBOB" },
        { text: "Farklı saatlerde çalan iki çalar saatin birlikte çalması", answer: "EKOK" },
        { text: "Küçük dikdörtgen tuğlalarla en küçük kare duvar örme", answer: "EKOK" },
        { text: "İki uzun demir çubuğu eşit ve en büyük parçalara kesme", answer: "EBOB" }
      ]
    },
    {
      id: 20,
      kazanimId: "k4",
      type: "game",
      icon: "🎮",
      typeLabel: "HTML5 Mini Oyun",
      title: "Oyun: Ortak Ritim ve Sefer Senkronizasyonu",
      subtitle: "Farklı periyotlarla dönen iki dişli çarkın aynı anda başlangıç noktasına geldiği ilk dakikayı (EKOK) yakala!",
      gameType: "ekok_gears",
      rounds: [
        { p1: 6, p2: 8, ekok: 24, options: [12, 16, 24, 48] },
        { p1: 9, p2: 12, ekok: 36, options: [18, 24, 36, 72] }
      ]
    },
    {
      id: 21,
      kazanimId: "k4",
      type: "question",
      icon: "❓",
      typeLabel: "Soru & Çözüm",
      title: "Dikdörtgen Kartlarla Kare Oluşturma",
      subtitle: "Önce karenin bir kenarını (EKOK), sonra içine sığacak kart sayısını bulalım.",
      stem: "Kenar uzunlukları <strong>8 cm</strong> ve <strong>12 cm</strong> olan dikdörtgen biçimindeki eş kartlar, kenarları çakışacak şekilde yan yana ve alt alta dizilerek <strong>en küçük alanlı bir kare</strong> oluşturulacaktır. Bu iş için kaç kart gerekir?",
      options: [
        { letter: "A", text: "5 kart" },
        { letter: "B", text: "6 kart" },
        { letter: "C", text: "8 kart" },
        { letter: "D", text: "12 kart" }
      ],
      correctLetter: "B",
      hint: "Karenin bir kenarı EKOK(8, 12) = 24 cm olur. Bir sıraya 24÷8=3, dikeyde 24÷12=2 kart sığar!",
      solution: "Oluşacak en küçük karenin bir kenar uzunluğu EKOK(8, 12) = <strong>24 cm</strong>'dir. Yatayda 24 ÷ 8 = 3 sıra, dikeyde 24 ÷ 12 = 2 sıra kart dizilir. Toplam kart sayısı = 3 × 2 = <strong>6 kart</strong>."
    },
    {
      id: 22,
      kazanimId: "k4",
      type: "question",
      icon: "❓",
      typeLabel: "Soru & Çözüm",
      title: "Kazanım Kontrol: Artan Cevizler Problemi",
      subtitle: "Kazanım 4'ü tamamlayıp yeşile çevirmek için bu soruyu çöz!",
      stem: "Bir sepetteki cevizler <strong>6'şar ve 8'er</strong> gruplandırıldığında her seferinde <strong>3 ceviz artmaktadır</strong>. Sepetteki ceviz sayısının 100'den fazla olduğu bilindiğine göre, sepette <strong>en az</strong> kaç ceviz vardır?",
      options: [
        { letter: "A", text: "99" },
        { letter: "B", text: "117" },
        { letter: "C", text: "120" },
        { letter: "D", text: "123" }
      ],
      correctLetter: "D",
      hint: "EKOK(6, 8) = 24'tür. 24'ün 100'den büyük en küçük katını bulup artan 3 cevizi ekle!",
      solution: "EKOK(6, 8) = 24'tür. Ceviz sayısı 24'ün bir katından 3 fazladır. 24'ün katları: 24, 48, 72, 96, <strong>120</strong>. 100'den fazla dediği için 120 + 3 = <strong>123 ceviz</strong> bulunur."
    },

    // ========================================================================
    // KAZANIM 5: ARALARINDA ASAL SAYILAR (DURAK 23 - 26)
    // ========================================================================
    {
      id: 23,
      kazanimId: "k5",
      type: "concept",
      icon: "💡",
      typeLabel: "Örnek & Keşif",
      title: "Aralarında Asal Sayılar",
      subtitle: "1'den başka ortak pozitif böleni olmayan sayıları tanıyalım.",
      explanation: [
        "İki doğal sayının <strong>aralarında asal</strong> olması için sayıların kendilerinin asal olması <strong>gerekmez!</strong> Örneğin <strong>8 ve 15</strong> sayılarının ikisi de asal değildir; ancak 1'den başka ortak bölenleri olmadığı için <strong>aralarında asaldır</strong>.",
        "<strong>Altın Kurallar:</strong><br>• 1 ile tüm pozitif tam sayılar aralarında asaldır.<br>• Ardışık iki doğal sayı (ör. 14 ile 15) daima aralarında asaldır.<br>• Aralarında asal iki sayının <strong>EBOB'u 1</strong>, <strong>EKOK'u ise bu iki sayının çarpımıdır</strong>."
      ],
      sentenceHtml: "Aralarında asal iki sayının EBOB'u daima {0} sayısına eşittir; EKOK'u ise bu iki sayının {1} eşittir.",
      blanks: [
        { id: 0, correct: "1", choices: ["0", "1", "2"] },
        { id: 1, correct: "çarpımına", choices: ["toplamına", "farkına", "çarpımına"] }
      ]
    },
    {
      id: 24,
      kazanimId: "k5",
      type: "activity",
      icon: "🧩",
      typeLabel: "Etkileşimli Etkinlik",
      title: "Aralarında Asal Olan Çiftleri Ayıkla",
      subtitle: "Verilen sayı çiftlerinin aralarında asal olup olmadığına karar ver!",
      activityMode: "coprime_check",
      items: [
        { text: "9 ile 16 (Ortak bölen yalnız 1)", answer: "Aralarında Asal" },
        { text: "12 ile 18 (İkisi de 2 ve 3'e bölünür)", answer: "Değil" },
        { text: "1 ile 45 (1 her sayıyla aralarında asaldır)", answer: "Aralarında Asal" },
        { text: "21 ile 22 (Ardışık doğal sayılar)", answer: "Aralarında Asal" }
      ]
    },
    {
      id: 25,
      kazanimId: "k5",
      type: "game",
      icon: "🎮",
      typeLabel: "HTML5 Mini Oyun",
      title: "Oyun: Şifreli Kasa — Aralarında Asal Çarklar",
      subtitle: "Kasa kilidini açmak için verilen anahtar sayıyla ARALARINDA ASAL olan çark numarasını seç!",
      gameType: "coprime_vault",
      locks: [
        { keyNum: 12, options: [9, 15, 25, 30], correct: 25, reason: "12 (2 ve 3'e bölünür) ile 25 (yalnız 5'e bölünür) aralarında asaldır!" },
        { keyNum: 18, options: [14, 21, 35, 42], correct: 35, reason: "18 (2 ve 3'e bölünür) ile 35 (5 ve 7'ye bölünür) aralarında asaldır!" }
      ]
    },
    {
      id: 26,
      kazanimId: "k5",
      type: "question",
      icon: "❓",
      typeLabel: "Soru & Çözüm",
      title: "Kazanım Kontrol: Sadeleşen Kesir Kalıbı",
      subtitle: "Kazanım 5'i tamamlayıp yeşile çevirmek için bu klasik LGS kalıbını çöz!",
      stem: "<strong>(x + 2)</strong> ile <strong>(y − 1)</strong> aralarında asal iki doğal sayıdır. <strong>(x + 2) / (y − 1) = 20 / 35</strong> olduğuna göre <strong>x + y</strong> toplamı kaçtır?",
      options: [
        { letter: "A", text: "10" },
        { letter: "B", text: "11" },
        { letter: "C", text: "13" },
        { letter: "D", text: "54" }
      ],
      correctLetter: "A",
      hint: "Önce 20/35 kesrini 5 ile sadeleştirip aralarında asal (4/7) hâline getir!",
      solution: "20 ve 35 aralarında asal değildir; 5 ile sadeleştirirsek 20/35 = <strong>4/7</strong> olur. 4 ile 7 aralarında asal olduğundan x + 2 = 4 ⇒ <strong>x = 2</strong> ve y − 1 = 7 ⇒ <strong>y = 8</strong> bulunur. Buradan x + y = 2 + 8 = <strong>10</strong>'dur."
    },

    // ========================================================================
    // KAZANIM 6: LGS BAĞLAM TEMELLİ GÖREVLER (DURAK 27 - 30)
    // ========================================================================
    {
      id: 27,
      kazanimId: "k6",
      type: "activity",
      icon: "🧩",
      typeLabel: "LGS Bağlam Atölyesi",
      title: "Adım Adım LGS Kurgusu: Raf ve Kutu Dizilimi",
      subtitle: "Bir rafa hem 12 cm'lik hem 18 cm'lik kutular hiç boşluk kalmadan dizilebiliyor. 3 adımı tamamla!",
      activityMode: "rainbow_pairs",
      targetNumber: 180,
      sequence: ["EKOK(12,18)=?", "150-200 cm arası raf=?", "12 cm'lik kutu sayısı=?"],
      missingTargets: [
        { index: 0, answer: 36, hint: "12 ve 18'in en küçük ortak katı 36 cm'dir." },
        { index: 1, answer: 180, hint: "36'nın 150 ile 200 arasındaki katı 36 × 5 = 180 cm'dir." },
        { index: 2, answer: 15, hint: "180 cm'lik rafa 180 ÷ 12 = 15 adet kutu sığar." }
      ],
      pool: [12, 15, 18, 36, 144, 180]
    },
    {
      id: 28,
      kazanimId: "k6",
      type: "question",
      icon: "❓",
      typeLabel: "LGS Yeni Nesil Soru 1",
      title: "Kereste Kesim Süresi ve Kesim Sayısı İnceliği",
      subtitle: "Unutma: Bir çubuğu 2 parçaya ayırmak için 1 kesim, N parçaya ayırmak için (N − 1) kesim yapılır!",
      stem: "Uzunlukları <strong>48 dm</strong> ve <strong>72 dm</strong> olan iki tomruk, hiç artmayacak şekilde eşit ve en büyük uzunlukta parçalara ayrılacaktır. Her bir kesim işlemi <strong>10 saniye</strong> sürdüğüne göre tüm kesim işlemi en az kaç saniye sürer?",
      options: [
        { letter: "A", text: "30 saniye" },
        { letter: "B", text: "40 saniye" },
        { letter: "C", text: "50 saniye" },
        { letter: "D", text: "60 saniye" }
      ],
      correctLetter: "A",
      hint: "EBOB(48, 72) = 24 dm. 48 dm'lik tomruk 2 parçaya (1 kesim), 72 dm'lik tomruk 3 parçaya (2 kesim) ayrılır!",
      solution: "Parça boyu EBOB(48, 72) = <strong>24 dm</strong>'dir. 1. tomruk: 48 ÷ 24 = 2 parça ⇒ <strong>1 kesim</strong>. 2. tomruk: 72 ÷ 24 = 3 parça ⇒ <strong>2 kesim</strong>. Toplam 1 + 2 = 3 kesim yapılır. 3 × 10 = <strong>30 saniye</strong> sürer."
    },
    {
      id: 29,
      kazanimId: "k6",
      type: "question",
      icon: "❓",
      typeLabel: "LGS Yeni Nesil Soru 2",
      title: "Güneş Panelleri Ortak Hat Uzunluğu",
      subtitle: "Üst ve alt sıradaki panellerin aynı hizada bitmesi için EKOK kullanalım.",
      stem: "Bir çatıdaki üst sıraya genişliği <strong>60 cm</strong> olan A tipi paneller, alt sıraya ise genişliği <strong>80 cm</strong> olan B tipi paneller aralarında boşluk kalmadan diziliyor. İki sıra aynı hizada başlayıp aynı hizada bittiğine göre, toplamda <strong>en az kaç panel</strong> kullanılmıştır?",
      options: [
        { letter: "A", text: "5 panel" },
        { letter: "B", text: "7 panel" },
        { letter: "C", text: "10 panel" },
        { letter: "D", text: "14 panel" }
      ],
      correctLetter: "B",
      hint: "EKOK(60, 80) = 240 cm'dir. Üst sıraya 240÷60, alt sıraya 240÷80 panel yerleşir.",
      solution: "Ortak hat uzunluğu en az EKOK(60, 80) = <strong>240 cm</strong> olur. Üst sırada 240 ÷ 60 = 4 adet A paneli, alt sırada 240 ÷ 80 = 3 adet B paneli kullanılır. Toplam = 4 + 3 = <strong>7 panel</strong>."
    },
    {
      id: 30,
      kazanimId: "k6",
      type: "game",
      icon: "🏆",
      typeLabel: "Final Maratonu",
      title: "Final: Çarpanlar ve Katlar Şampiyonluk Etabı",
      subtitle: "Son 3 hızlı görevi tamamla, tüm kazanımları YEŞİLE döndür ve ünite kupasını kazan!",
      gameType: "final_marathon",
      challenges: [
        { q: "36 sayısının kaç tane pozitif tam sayı çarpanı vardır?", choices: ["6", "8", "9"], ans: "9" },
        { q: "Aralarında asal iki sayının EKOK'u 45 ise bu iki sayının çarpımı kaçtır?", choices: ["1", "45", "90"], ans: "45" },
        { q: "EBOB(15, 25) + EKOK(15, 25) işleminin sonucu kaçtır?", choices: ["75", "80", "85"], ans: "80" }
      ]
    }
  ]
};
