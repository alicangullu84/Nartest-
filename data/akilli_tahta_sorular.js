// ============================================================================
// NarTES+ — 8. Sınıf 1. Ünite: Akıllı Tahta Test Bankaları (3 Kademeli)
// Her Alt Başlık (k1..k5): [1. Kolay Alıştırma, 2. TEOG & İOKBS, 3. Zorlayıcı]
//   + Dinamik Sayı Varyantları (variantPacks)
//   + PDF Kesit Hazırlık Yolları (pdfTargetPath)
// Ünite Sonu: k6 (Genel Alıştırma & TEOG), k7 (Örnek Sorular), k8 (LGS Çıkmış)
// ============================================================================
(function () {
  function svgBox(badge, line1, line2, accent) {
    const col = accent || "#1d4ed8";
    return `<svg viewBox="0 0 360 155" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${badge}">
      <rect x="8" y="8" width="344" height="139" rx="14" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
      <rect x="22" y="20" width="316" height="32" rx="8" fill="${col}" opacity="0.12"/>
      <text x="180" y="41" text-anchor="middle" font-size="13" font-weight="900" fill="${col}">${badge}</text>
      <text x="180" y="84" text-anchor="middle" font-size="15.5" font-weight="800" fill="#0f172a">${line1}</text>
      <text x="180" y="116" text-anchor="middle" font-size="13" font-weight="700" fill="#475569">${line2}</text>
    </svg>`;
  }

  function opts(a, b, c, d) {
    return [
      { letter: "A", text: String(a) },
      { letter: "B", text: String(b) },
      { letter: "C", text: String(c) },
      { letter: "D", text: String(d) }
    ];
  }

  function makeTierPacks(tiers) {
    return tiers;
  }

  const K1_KOLAY_Q1 = [
    {
      badge: "1. Soru • Kolay Alıştırma",
      categoryTag: "Kolay Alıştırma • Çarpanlar",
      diagramSvg: svgBox("POZİTİF ÇARPANLAR", "1 × 36 = 2 × 18 = 3 × 12", "4 × 9 = 6 × 6 = 36", "#ea580c"),
      stem: "Aşağıdaki sayılardan hangisi <strong>36</strong> sayısının bir pozitif çarpanı <u>değildir</u>?",
      options: opts(4, 6, 8, 9),
      correctLetter: "C",
      hint: "36 sayısını seçeneklerdeki sayılara böl; hangisinde kalan 0 olmuyor?",
      solution: "36 ÷ 4 = 9, 36 ÷ 6 = 6, 36 ÷ 9 = 4 tam bölünür; ancak 36 ÷ 8 kalanlıdır (kalan 4). Cevap: <strong>8</strong>."
    },
    {
      badge: "2. Soru • Kolay Alıştırma",
      categoryTag: "Kolay Alıştırma • Çarpan Çiftleri",
      diagramSvg: svgBox("DİKDÖRTGEN ALANI", "Alan = 28 cm²", "Kenarlar Tam Sayı", "#2563eb"),
      stem: "Alanı <strong>28 cm²</strong> olan bir dikdörtgenin santimetre cinsinden kenar uzunlukları tam sayıdır. Çevresi <strong>en az</strong> kaç cm olur?",
      options: opts(22, 26, 32, 58),
      correctLetter: "A",
      hint: "Çevrenin en küçük olması için 28 = a × b ikilisini birbirine en yakın seç!",
      solution: "28 = 4 × 7 (en yakın kenarlar) ⇒ Çevre = 2 × (4 + 7) = <strong>22 cm</strong>."
    },
    {
      badge: "3. Soru • Kolay Alıştırma",
      categoryTag: "Kolay Alıştırma • Katlar",
      diagramSvg: svgBox("KAT ARALIĞI", "14'ün Katları", "40 ile 80 Arasında", "#16a34a"),
      stem: "<strong>14</strong> sayısının <strong>40 ile 80</strong> arasında kaç tane doğal sayı katı vardır?",
      options: opts(2, 3, 4, 5),
      correctLetter: "B",
      hint: "14 × 3, 14 × 4, 14 × 5, 14 × 6 değerlerini hesaplayıp 40–80 aralığına girenleri say.",
      solution: "14×3 = 42, 14×4 = 56, 14×5 = 70 (14×6 = 84 aşar) ⇒ Toplam <strong>3</strong> adet vardır."
    },
    {
      badge: "4. Soru • Kolay Alıştırma",
      categoryTag: "Kolay Alıştırma • En Büyük İki Bölen",
      diagramSvg: svgBox("EN BÜYÜK BÖLENLER", "Bir N Sayısının", "En Büyük İki Çarpanı", "#7c3aed"),
      stem: "<strong>42</strong> sayısının kendisinden sonraki en büyük pozitif çarpanı kaçtır?",
      options: opts(14, 21, 24, 42),
      correctLetter: "B",
      hint: "Çift sayının kendisi hariç en büyük çarpanı sayının yarısıdır.",
      solution: "42 ÷ 2 = <strong>21</strong> olur."
    }
  ];

  const K1_KOLAY_Q2 = [
    {
      badge: "1. Soru • Kolay Alıştırma",
      categoryTag: "Kolay Alıştırma • Çarpanlar",
      diagramSvg: svgBox("POZİTİF ÇARPANLAR", "1 × 42 = 2 × 21 = 3 × 14", "6 × 7 = 42", "#ea580c"),
      stem: "Aşağıdaki sayılardan hangisi <strong>42</strong> sayısının bir pozitif çarpanı <u>değildir</u>?",
      options: opts(3, 6, 8, 14),
      correctLetter: "C",
      hint: "42 ÷ 8 işleminin kalanı 0 olur mu?",
      solution: "42 = 2×21 = 3×14 = 6×7; 42 ÷ 8 kalanlı olduğu için <strong>8</strong> çarpanı değildir."
    },
    {
      badge: "2. Soru • Kolay Alıştırma",
      categoryTag: "Kolay Alıştırma • Çarpan Çiftleri",
      diagramSvg: svgBox("DİKDÖRTGEN ALANI", "Alan = 36 cm²", "Kenarlar Tam Sayı", "#2563eb"),
      stem: "Alanı <strong>36 cm²</strong> olan ve kenar uzunlukları tam sayı olan bir dikdörtgenin çevresi <strong>en az</strong> kaç cm olur?",
      options: opts(24, 26, 30, 40),
      correctLetter: "A",
      hint: "En küçük çevre için kenarları birbirine en yakın (kare!) seç: 6 × 6 = 36.",
      solution: "Kenarlar 6 cm ve 6 cm ⇒ Çevre = 4 × 6 = <strong>24 cm</strong>."
    },
    {
      badge: "3. Soru • Kolay Alıştırma",
      categoryTag: "Kolay Alıştırma • Katlar",
      diagramSvg: svgBox("KAT ARALIĞI", "16'nın Katları", "30 ile 90 Arasında", "#16a34a"),
      stem: "<strong>16</strong> sayısının <strong>30 ile 90</strong> arasında kaç tane doğal sayı katı vardır?",
      options: opts(3, 4, 5, 6),
      correctLetter: "B",
      hint: "16×2 = 32, 16×3 = 48, 16×4 = 64, 16×5 = 80, 16×6 = 96.",
      solution: "32, 48, 64, 80 olmak üzere toplam <strong>4</strong> katı vardır."
    },
    {
      badge: "4. Soru • Kolay Alıştırma",
      categoryTag: "Kolay Alıştırma • En Büyük Bölen",
      diagramSvg: svgBox("EN BÜYÜK BÖLENLER", "N = 54 Sayısı", "Kendisinden Sonraki Bölen", "#7c3aed"),
      stem: "<strong>54</strong> sayısının kendisi dışındaki en büyük pozitif çarpanı kaçtır?",
      options: opts(18, 27, 36, 54),
      correctLetter: "B",
      hint: "54'ü 2'ye bölerek en büyük eş çarpanını bul.",
      solution: "54 ÷ 2 = <strong>27</strong> olur."
    }
  ];

  const K1_TEOG_Q1 = [
    {
      badge: "1. Soru • TEOG & İOKBS",
      categoryTag: "TEOG / Bursluluk Kalıbı",
      diagramSvg: svgBox("TEOG & BURSLULUK", "1, 2, A, 5, 10, B", "Pozitif Çarpan Dizisi", "#0369a1"),
      stem: "Küçükten büyüğe doğru sıralanmış pozitif çarpanları <strong>1, 2, A, 5, 10, B</strong> olan bir doğal sayı için <strong>A + B</strong> kaçtır?",
      options: opts(20, 24, 28, 30),
      correctLetter: "B",
      hint: "Gökkuşağı kuralıyla 1 × B = 2 × 10 = A × 5 olmalıdır!",
      solution: "Sayı = 2 × 10 = 20 olur. O halde B = 20 ve A = 20 ÷ 5 = 4 ⇒ A + B = 4 + 20 = <strong>24</strong>."
    },
    {
      badge: "2. Soru • TEOG & İOKBS",
      categoryTag: "TEOG / Bursluluk Kalıbı",
      diagramSvg: svgBox("BURSLULUK SORUSU", "Alanı 45 br² Karton", "En Az Çevre Uzunluğu", "#0f766e"),
      stem: "Alanı <strong>45 br²</strong> olan dikdörtgen şeklindeki bir bahçenin kenar uzunlukları 1 br'den büyüktür. Çevresi kaç farklı değer alabilir?",
      options: opts(1, 2, 3, 6),
      correctLetter: "B",
      hint: "45'in çarpan çiftleri (1×45), (3×15), (5×9). 1 br'den büyük şartına dikkat!",
      solution: "1×45 elenir; (3×15) ve (5×9) olmak üzere <strong>2</strong> farklı çevre değeri vardır."
    },
    {
      badge: "3. Soru • TEOG & İOKBS",
      categoryTag: "TEOG / Bursluluk Kalıbı",
      diagramSvg: svgBox("ORTAK ÇARPAN", "24 ve 40 Sayıları", "Ortak Çarpan Sayısı", "#9333ea"),
      stem: "<strong>24</strong> ve <strong>40</strong> sayılarının kaç tane ortak pozitif tam sayı böleni vardır?",
      options: opts(2, 3, 4, 8),
      correctLetter: "C",
      hint: "EBOB(24, 40) = 8'in pozitif bölenlerini say!",
      solution: "Ortak bölenler: 1, 2, 4, 8 olmak üzere <strong>4</strong> tanedir."
    },
    {
      badge: "4. Soru • TEOG & İOKBS",
      categoryTag: "TEOG / Bursluluk Kalıbı",
      diagramSvg: svgBox("TEOG KLASİĞİ", "9'un Katı Olan", "En Küçük 3 Basamaklı Çift", "#b45309"),
      stem: "Hem <strong>6</strong>'nın hem <strong>9</strong>'un katı olan <strong>iki basamaklı en büyük</strong> sayı kaçtır?",
      options: opts(72, 84, 90, 96),
      correctLetter: "C",
      hint: "6 ve 9'un en küçük ortak katı 18'dir. 18'in 100'den küçük en büyük katını al!",
      solution: "18 × 5 = <strong>90</strong> sayısı iki basamaklı en büyük ortak kattır."
    }
  ];

  const K1_ZOR_Q1 = [
    {
      badge: "1. Soru • Zorlayıcı",
      categoryTag: "Geliştirici Soru • Kısıtlı Dikdörtgen",
      diagramSvg: svgBox("GELİŞTİRİCİ SORU", "Alan = 72 cm² • Çevre > 36", "Kenarlar Arası Koşul", "#be123c"),
      stem: "Alanı <strong>72 cm²</strong> olan ve kenar uzunlukları tam sayı olan dikdörtgenlerden kısa kenarı <strong>3 cm'den büyük</strong> olanların sayısı kaçtır?",
      options: opts(2, 3, 4, 6),
      correctLetter: "B",
      hint: "72'nin tüm çarpan ikililerini yaz ve kısa kenarı 3'ten büyük (>3) olanları seç!",
      solution: "72 = (1×72), (2×36), (3×24) şartı sağlamaz; (4×18), (6×12), (8×9) olmak üzere <strong>3</strong> tanedir."
    },
    {
      badge: "2. Soru • Zorlayıcı",
      categoryTag: "Geliştirici Soru • Çarpan Toplamı",
      diagramSvg: svgBox("TEK ÇARPAN SAYISI", "Tam Kare Sayı", "Pozitif Bölen Adedi", "#be123c"),
      stem: "<strong>10 ile 100</strong> arasında tam olarak <strong>3 tane pozitif çarpanı</strong> olan kaç tane doğal sayı vardır?",
      options: opts(1, 2, 3, 4),
      correctLetter: "B",
      hint: "Tam olarak 3 çarpanı olan sayılar yalnız bir asal sayının karesi (p²) olan sayılardır!",
      solution: "Asalların kareleri: 2²=4 (aralık dışı), 3²=9 (aralık dışı), <strong>5²=25</strong>, <strong>7²=49</strong>, 11²=121 (aşar). Toplam <strong>2</strong> tanedir."
    },
    {
      badge: "3. Soru • Zorlayıcı",
      categoryTag: "Geliştirici Soru • Alan Değişimi",
      diagramSvg: svgBox("İKİLİ DİKDÖRTGEN", "Ortak Kenarlı İki Parça", "36 cm² ve 60 cm²", "#be123c"),
      stem: "Alanları <strong>36 cm²</strong> ve <strong>60 cm²</strong> olan iki dikdörtgen uzun kenarları boyunca çakıştırılıyor. Elde edilen büyük dikdörtgenin çevresi <strong>en az</strong> kaç cm'dir?",
      options: opts(40, 44, 48, 52),
      correctLetter: "B",
      hint: "Ortak kenar 12 cm seçilirse toplam alan = 96 cm² ⇒ kenarlar 12 cm ve (3+5)=8 cm olur? Kontrol edelim!",
      solution: "Ortak kenar EBOB(36,60)=12 cm ⇒ diğer kenarlar 3 cm ve 5 cm; büyük kenarlar 12 ve 8 ⇒ Çevre = 2×(12+8) = 40 mı, 44 mü? Hemen düzeltelim: 2×(12+8)=<strong>40 cm</strong>!"
    }
  ];
  // Üçüncü soruyu kesin 40 yapalım ve 4. zor soruyu ekleyelim:
  K1_ZOR_Q1[2].options = opts(40, 44, 48, 56);
  K1_ZOR_Q1[2].correctLetter = "A";
  K1_ZOR_Q1[2].solution = "Ortak kenar EBOB(36, 60) = 12 cm alınırsa yeni kenarlar 12 cm ve (3 + 5) = 8 cm olur. Çevre = 2 × (12 + 8) = <strong>40 cm</strong>.";
  K1_ZOR_Q1.push({
    badge: "4. Soru • Zorlayıcı",
    categoryTag: "Geliştirici Soru • Şartlı Çarpan",
    diagramSvg: svgBox("ŞARTLI ÇARPAN", "A = 200'den Küçük", "Tam 9 Pozitif Çarpanlı En Büyük", "#be123c"),
    stem: "Pozitif çarpan sayısı <strong>3'ten fazla</strong> ve tüm çarpanlarının toplamı kendisine dahil <strong>57</strong> olan sayının birler basamağı kaçtır?",
    options: opts(2, 4, 6, 8),
    correctLetter: "C",
    hint: "36 sayısının tüm çarpanlarını topla: 1 + 2 + 3 + 4 + 6 + 9 + 12 + 18 + 36 = 91; peki 32'nin: 1+2+4+8+16+32=63; 28'in: 1+2+4+7+14+28=56; 36 değil 28+1=29; ya 36 dışı 24?",
    solution: "24'ün çarpanları: 1+2+3+4+6+8+12+24 = 60. Peki 36+21=57: 36'nın asal çarpan toplamı değil; soru netleşsin: Birler basamağı 6 olan 36 = 6² sayısı!"
  });
  // 4. soruyu matematiksel olarak yüzde yüz kusursuz hale getirelim:
  K1_ZOR_Q1[3] = {
    badge: "4. Soru • Zorlayıcı",
    categoryTag: "Geliştirici Soru • Mükemmel Sayı Mantığı",
    diagramSvg: svgBox("KENDİSİ HARİÇ TOPLAM", "28 Sayısının Çarpanları", "1 + 2 + 4 + 7 + 14 + 28", "#be123c"),
    stem: "<strong>28</strong> sayısının kendisi dışındaki tüm pozitif çarpanlarının toplamı ile <strong>18</strong> sayısının kendisi dışındaki tüm pozitif çarpanlarının toplamı arasındaki fark kaçtır?",
    options: opts(7, 9, 11, 13),
    correctLetter: "A",
    hint: "28'in kendisi hariç çarpanları: 1, 2, 4, 7, 14. 18'inkiler: 1, 2, 3, 6, 9.",
    solution: "28 için: 1+2+4+7+14 = 28. 18 için: 1+2+3+6+9 = 21. Fark = 28 − 21 = <strong>7</strong>."
  };

  window.NARTES_SMARTBOARD_BANK = {
    "m8-u1-carpanlar-katlar": {
      // =====================================================================
      // k1: ÇARPANLAR VE KATLAR (Adım 8 Kolay, Adım 9 TEOG/İOKBS, Adım 10 Zor)
      // =====================================================================
      k1: [
        {
          boardId: "k1_kolay",
          icon: "✏️",
          roadLabel: "Alıştırma",
          typeLabel: "Kolay Alıştırma",
          title: "Adım 8 • Alıştırma Zamanı: Çarpanlar ve Katlar (Kolay Düzey)",
          subtitle: "Kaleminle tahtada kolay alıştırma sorularını çöz! Üstten sayı varyantını yenileyebilirsin.",
          pdfTargetPath: "assets/sorular/pdf_kesitler/k1_kolay",
          questions: K1_KOLAY_Q1,
          variantPacks: makeTierPacks([
            { title: "Adım 8 • Kolay Alıştırma (Set 1)", questions: K1_KOLAY_Q1 },
            { title: "Adım 8 • Kolay Alıştırma (Set 2)", questions: K1_KOLAY_Q2 }
          ])
        },
        {
          boardId: "k1_teog",
          icon: "🏛️",
          roadLabel: "TEOG & İOKBS",
          typeLabel: "TEOG & Bursluluk",
          title: "Adım 9 • TEOG & Bursluluk Sınavı Soruları (Çarpan-Kat)",
          subtitle: "MEB'in TEOG ve Bursluluk sınavlarında çıkan kazanım pekiştirme sorularını tahtada çöz!",
          pdfTargetPath: "assets/sorular/pdf_kesitler/k1_teog",
          questions: K1_TEOG_Q1
        },
        {
          boardId: "k1_zorlayici",
          icon: "🚀",
          roadLabel: "Zorlayıcı",
          typeLabel: "Geliştirici Test",
          title: "Adım 10 • Zorlayıcı & Geliştirici Sorular (Çarpan-Kat)",
          subtitle: "Çarpan-kat konusunu ustalıkla kapatmak için yorum gerektiren bu 4 soruyu çöz!",
          pdfTargetPath: "assets/sorular/pdf_kesitler/k1_zorlayici",
          questions: K1_ZOR_Q1
        }
      ],

      // =====================================================================
      // k2: ASAL SAYILAR VE ASAL ÇARPANLAR (Adım 8, 9, 10)
      // =====================================================================
      k2: [
        {
          boardId: "k2_kolay",
          icon: "✏️",
          roadLabel: "Alıştırma",
          typeLabel: "Kolay Alıştırma",
          title: "Adım 8 • Alıştırma Zamanı: Asal Sayılar & Algoritma (Kolay)",
          subtitle: "Asal çarpan ağacı ve algoritma basamaklarını tahtada çöz!",
          pdfTargetPath: "assets/sorular/pdf_kesitler/k2_kolay",
          questions: [
            {
              badge: "1. Soru • Kolay Alıştırma",
              categoryTag: "Kolay Alıştırma • Asal Sayı",
              diagramSvg: svgBox("ASAL SAYI TESTİ", "2, 3, 5, 7, 11, 13, 17, 19", "1'den Büyük & Tek Bölenli", "#16a34a"),
              stem: "Aşağıdaki sayılardan hangisi <strong>asal sayı değildir</strong>?",
              options: opts(29, 41, 51, 67),
              correctLetter: "C",
              hint: "Rakamları toplamı 3'ün katı olan bir sayı varsa 3'e bölünür!",
              solution: "5 + 1 = 6 olduğu için 51 = 3 × 17 şeklinde bölünür; asal değildir. Cevap: <strong>51</strong>."
            },
            {
              badge: "2. Soru • Kolay Alıştırma",
              categoryTag: "Kolay Alıştırma • Asal Çarpan",
              diagramSvg: svgBox("BÖLEN LİSTESİ", "90 = 2 × 3 × 3 × 5", "Üslü Gösterim", "#2563eb"),
              stem: "<strong>90</strong> sayısının asal çarpanlarının çarpımı biçiminde yazılışı hangisidir?",
              options: opts("2·3·5", "2·3²·5", "2²·3·5", "2²·3²·5"),
              correctLetter: "B",
              hint: "90 = 9 × 10 = 3² × (2 × 5) şeklinde düzenle!",
              solution: "90 = <strong>2 · 3² · 5</strong>."
            },
            {
              badge: "3. Soru • Kolay Alıştırma",
              categoryTag: "Kolay Alıştırma • Farklı Asal",
              diagramSvg: svgBox("FARKLI ASALLAR", "84 Sayısının", "Asal Çarpanları", "#ea580c"),
              stem: "<strong>84</strong> sayısının farklı asal çarpanlarının toplamı kaçtır?",
              options: opts(10, 12, 14, 15),
              correctLetter: "B",
              hint: "84 = 4 × 21 = 2² × 3 × 7.",
              solution: "Farklı asal çarpanlar 2, 3 ve 7 ⇒ Toplam = 2 + 3 + 7 = <strong>12</strong>."
            },
            {
              badge: "4. Soru • Kolay Alıştırma",
              categoryTag: "Kolay Alıştırma • Çarpan Ağacı",
              diagramSvg: svgBox("AĞAÇ DALI", "A = 2 × B | B = 3 × 7", "Yukarı Çık!", "#7c3aed"),
              stem: "Asal çarpan ağacının en alt yaprakları <strong>2, 3 ve 7</strong> olduğuna göre en tepedeki sayı kaçtır?",
              options: opts(21, 36, 42, 63),
              correctLetter: "C",
              hint: "Aşağıdaki tüm asal yaprakları birbiriyle çarp!",
              solution: "2 × 3 × 7 = <strong>42</strong>."
            }
          ],
          variantPacks: [
            {
              title: "Adım 8 • Kolay Alıştırma (Set 1)",
              questions: [
                {
                  badge: "1. Soru • Kolay Alıştırma",
                  categoryTag: "Kolay Alıştırma • Asal Sayı",
                  diagramSvg: svgBox("ASAL SAYI TESTİ", "2, 3, 5, 7, 11, 13, 17, 19", "Bölünebilme Kontrolü", "#16a34a"),
                  stem: "Aşağıdaki sayılardan hangisi <strong>asal sayı değildir</strong>?",
                  options: opts(29, 41, 51, 67),
                  correctLetter: "C",
                  hint: "51'in rakamları toplamına bak (3 ile bölünebilme).",
                  solution: "51 = 3 × 17 ⇒ <strong>51</strong> asal değildir."
                },
                {
                  badge: "2. Soru • Kolay Alıştırma",
                  categoryTag: "Kolay Alıştırma • Asal Çarpan",
                  diagramSvg: svgBox("BÖLEN LİSTESİ", "90 Sayısı", "Üslü Çarpım", "#2563eb"),
                  stem: "<strong>90</strong> sayısının asal çarpanlarının üslü gösterimi hangisidir?",
                  options: opts("2·3·5", "2·3²·5", "2²·3·5", "2²·3²·5"),
                  correctLetter: "B",
                  hint: "90 = 2 × 9 × 5.",
                  solution: "90 = <strong>2 · 3² · 5</strong>."
                },
                {
                  badge: "3. Soru • Kolay Alıştırma",
                  categoryTag: "Kolay Alıştırma • Farklı Asal",
                  diagramSvg: svgBox("FARKLI ASALLAR", "84 Sayısının", "Asal Çarpan Toplamı", "#ea580c"),
                  stem: "<strong>84</strong> sayısının farklı asal çarpanlarının toplamı kaçtır?",
                  options: opts(10, 12, 14, 15),
                  correctLetter: "B",
                  hint: "84 = 2² × 3 × 7.",
                  solution: "2 + 3 + 7 = <strong>12</strong>."
                },
                {
                  badge: "4. Soru • Kolay Alıştırma",
                  categoryTag: "Kolay Alıştırma • Yaprak Çarpımı",
                  diagramSvg: svgBox("AĞAÇ DALI", "Yapraklar: 2, 3, 7", "Kök Sayı = ?", "#7c3aed"),
                  stem: "Asal yaprakları <strong>2, 3 ve 7</strong> olan çarpan ağacının kök sayısı kaçtır?",
                  options: opts(21, 36, 42, 63),
                  correctLetter: "C",
                  hint: "2 × 3 × 7 değerini hesapla.",
                  solution: "2 × 3 × 7 = <strong>42</strong>."
                }
              ]
            },
            {
              title: "Adım 8 • Kolay Alıştırma (Set 2)",
              questions: [
                {
                  badge: "1. Soru • Kolay Alıştırma",
                  categoryTag: "Kolay Alıştırma • Asal Sayı",
                  diagramSvg: svgBox("ASAL SAYI TESTİ", "70 - 95 Aralığı", "Bölüneni Bul", "#16a34a"),
                  stem: "Aşağıdaki sayılardan hangisi <strong>asal sayı değildir</strong>?",
                  options: opts(71, 79, 87, 89),
                  correctLetter: "C",
                  hint: "8 + 7 = 15 sayısı 3'ün katıdır!",
                  solution: "87 = 3 × 29 olduğu için asal değildir. Cevap: <strong>87</strong>."
                },
                {
                  badge: "2. Soru • Kolay Alıştırma",
                  categoryTag: "Kolay Alıştırma • Asal Çarpan",
                  diagramSvg: svgBox("BÖLEN LİSTESİ", "108 Sayısı", "Üslü Çarpım", "#2563eb"),
                  stem: "<strong>108</strong> sayısının asal çarpanlarının üslü biçimi hangisidir?",
                  options: opts("2²·3²", "2²·3³", "2³·3²", "2·3⁴"),
                  correctLetter: "B",
                  hint: "108 = 4 × 27 = 2² × 3³.",
                  solution: "108 = <strong>2² · 3³</strong>."
                },
                {
                  badge: "3. Soru • Kolay Alıştırma",
                  categoryTag: "Kolay Alıştırma • Farklı Asal",
                  diagramSvg: svgBox("FARKLI ASALLAR", "70 Sayısı", "Asal Çarpan Toplamı", "#ea580c"),
                  stem: "<strong>70</strong> sayısının farklı asal çarpanlarının toplamı kaçtır?",
                  options: opts(12, 14, 15, 17),
                  correctLetter: "B",
                  hint: "70 = 2 × 5 × 7!",
                  solution: "2 + 5 + 7 = <strong>14</strong>."
                },
                {
                  badge: "4. Soru • Kolay Alıştırma",
                  categoryTag: "Kolay Alıştırma • Yaprak Çarpımı",
                  diagramSvg: svgBox("AĞAÇ DALI", "Yapraklar: 2, 2, 3, 5", "Kök Sayı = ?", "#7c3aed"),
                  stem: "Asal yaprakları <strong>2, 2, 3, 5</strong> olan çarpan ağacının kök sayısı kaçtır?",
                  options: opts(30, 45, 60, 75),
                  correctLetter: "C",
                  hint: "4 × 3 × 5 işlemini yap.",
                  solution: "2 × 2 × 3 × 5 = <strong>60</strong>."
                }
              ]
            }
          ]
        },
        {
          boardId: "k2_teog",
          icon: "🏛️",
          roadLabel: "TEOG & İOKBS",
          typeLabel: "TEOG & Bursluluk",
          title: "Adım 9 • TEOG & Bursluluk: Asal Çarpanlar Algoritması",
          subtitle: "Harfli bölen listesi (A, B, C, D) ve üslü çözümleme TEOG sorularını çöz!",
          pdfTargetPath: "assets/sorular/pdf_kesitler/k2_teog",
          questions: [
            {
              badge: "1. Soru • TEOG & İOKBS",
              categoryTag: "TEOG Harfli Algoritma",
              diagramSvg: svgBox("ALGORİTMA DİKİ", "A|2 → B|3 → C|5 → 1", "Alttan Yukarı Çarp!", "#0369a1"),
              stem: "Asal çarpan algoritmasında en alttan yukarıya bölenler sırasıyla <strong>5, 3, 3, 2</strong> olarak uygulandıysa en baştaki A sayısı kaçtır?",
              options: opts(60, 75, 90, 120),
              correctLetter: "C",
              hint: "1'den başlayıp sağdaki bölenlerle sırayla çarp: 1×5=5, 5×3=15, 15×3=45, 45×2=?",
              solution: "2 × 3 × 3 × 5 = <strong>90</strong>."
            },
            {
              badge: "2. Soru • TEOG & İOKBS",
              categoryTag: "İOKBS • Ortak Bölenli Asal",
              diagramSvg: svgBox("ASAL ÇARPAN SAYISI", "En Az 2 Basamaklı", "Tek Asal Çarpanlı Sayılar", "#0f766e"),
              stem: "İki basamaklı sayılardan kaç tanesinin yalnızca <strong>1 tane</strong> asal çarpanı vardır (30'dan küçük olanlar)?",
              options: opts(7, 8, 9, 10),
              correctLetter: "C",
              hint: "10–29 arasında asal sayılar (11,13,17,19,23,29) VE bir asalın kuvvetleri (16=2⁴, 25=5², 27=3³) vardır!",
              solution: "Asallar: 11,13,17,19,23,29 (6 adet) + Kuvvetler: 16, 25, 27 (3 adet) ⇒ Toplam <strong>9</strong> sayı."
            },
            {
              badge: "3. Soru • TEOG & İOKBS",
              categoryTag: "TEOG • Bilinmeyen Üs",
              diagramSvg: svgBox("ÜSLÜ EŞİTLİK", "2ᵃ · 3ᵇ · 5ᶜ = 360", "a + b + c = ?", "#9333ea"),
              stem: "<strong>360 = 2ᵃ · 3ᵇ · 5ᶜ</strong> olduğuna göre <strong>a + b + c</strong> toplamı kaçtır?",
              options: opts(5, 6, 7, 8),
              correctLetter: "B",
              hint: "360 = 36 × 10 = (2²·3²) × (2·5) = 2³ · 3² · 5¹.",
              solution: "a = 3, b = 2, c = 1 ⇒ 3 + 2 + 1 = <strong>6</strong>."
            },
            {
              badge: "4. Soru • TEOG & İOKBS",
              categoryTag: "Bursluluk • Asal Çarpan Seçimi",
              diagramSvg: svgBox("İKİ ASALLI KUTU", "Sadece 2 ve 5", "Çarpanları İçeren", "#b45309"),
              stem: "Aşağıdaki sayılardan hangisinin asal çarpanları <strong>2, 3 ve 5</strong>'tir?",
              options: opts(140, 150, 175, 210),
              correctLetter: "B",
              hint: "140 ve 210 sayılarını 7 böler; 175 çift değildir.",
              solution: "150 = 2 × 3 × 5² olduğundan asal çarpanları <strong>2, 3 ve 5</strong>'tir."
            }
          ]
        },
        {
          boardId: "k2_zorlayici",
          icon: "🚀",
          roadLabel: "Zorlayıcı",
          typeLabel: "Geliştirici Test",
          title: "Adım 10 • Zorlayıcı: Asal Çarpan Stratejileri",
          subtitle: "Asal sayıların paritesi ve algoritma harf değişimlerini tahtada çöz!",
          pdfTargetPath: "assets/sorular/pdf_kesitler/k2_zorlayici",
          questions: [
            {
              badge: "1. Soru • Zorlayıcı",
              categoryTag: "Geliştirici • Çarpan Çoğaltma",
              diagramSvg: svgBox("EN KÜÇÜK ÇARPAN", "A = 24 × k", "Tam Kare Yapma", "#be123c"),
              stem: "<strong>24</strong> sayısını en küçük hangi pozitif tam sayı ile çarparsak sonuç bir <strong>tam kare</strong> sayı olur?",
              options: opts(2, 3, 4, 6),
              correctLetter: "D",
              hint: "24 = 2³ · 3¹. Tam kare olması için bütün üslerin çift sayı olması gerekir!",
              solution: "2³ · 3¹ × (2¹ · 3¹) = 2⁴ · 3² = 144 (12²) ⇒ k = 2 × 3 = <strong>6</strong>."
            },
            {
              badge: "2. Soru • Zorlayıcı",
              categoryTag: "Geliştirici • Asal Fark",
              diagramSvg: svgBox("İKİ ASALIN FARKI", "p − q = 17", "Asal Paritesi", "#be123c"),
              stem: "p ve q asal sayılar olmak üzere <strong>p − q = 17</strong> ise <strong>p + q</strong> kaçtır?",
              options: opts(19, 21, 23, 25),
              correctLetter: "B",
              hint: "İki sayının farkı tek (17) ise biri mutlaka çift asal olan 2 olmalıdır!",
              solution: "q = 2 ⇒ p = 19 (asal!). Toplam = 19 + 2 = <strong>21</strong>."
            },
            {
              badge: "3. Soru • Zorlayıcı",
              categoryTag: "Geliştirici • 12'nin Kuvveti",
              diagramSvg: svgBox("EN AZ ASAL ÇARPAN", "Üç Basamaklı En Küçük", "3 Farklı Asal Çarpanlı", "#be123c"),
              stem: "<strong>3 farklı asal çarpanı</strong> olan üç basamaklı en küçük sayı kaçtır?",
              options: opts(102, 105, 110, 120),
              correctLetter: "A",
              hint: "100, 101, 102 sayılarını sırayla kontrol et! 102 = 2 × 3 × 17!",
              solution: "100 = 2²·5² (2 asal), 101 asal (1 asal), <strong>102 = 2 × 3 × 17</strong> (3 farklı asal)."
            },
            {
              badge: "4. Soru • Zorlayıcı",
              categoryTag: "Geliştirici • Pozitif Çarpan Sayısı",
              diagramSvg: svgBox("ÜSLERİ 1 ARTIR ÇARP", "N = 2² · 3³", "Çarpan Adedi = ?", "#be123c"),
              stem: "<strong>72</strong> sayısının asal çarpanı olmayan kaç tane pozitif tam sayı çarpanı vardır?",
              options: opts(8, 10, 12, 14),
              correctLetter: "B",
              hint: "72 = 2³·3² olduğu için toplam (3+1)(2+1) = 12 çarpanı vardır; bunlardan kaçı asaldır?",
              solution: "Toplam 12 pozitif çarpandan 2 tanesi (2 ve 3) asaldır ⇒ 12 − 2 = <strong>10</strong>."
            }
          ]
        }
      ],

      // =====================================================================
      // k3: EBOB (Adım 8 Kolay, Adım 9 TEOG/İOKBS, Adım 10 Zorlayıcı)
      // =====================================================================
      k3: [
        {
          boardId: "k3_kolay",
          icon: "✏️",
          roadLabel: "Alıştırma",
          typeLabel: "Kolay Alıştırma",
          title: "Adım 8 • Alıştırma Zamanı: EBOB (Kolay Düzey)",
          subtitle: "Doğrudan EBOB hesaplama ve temel paylaştırma sorularını tahtada çöz!",
          pdfTargetPath: "assets/sorular/pdf_kesitler/k3_kolay",
          questions: [
            {
              badge: "1. Soru • Kolay Alıştırma",
              categoryTag: "Kolay Alıştırma • Temel EBOB",
              diagramSvg: svgBox("TEMEL EBOB", "EBOB(24, 36)", "En Büyük Ortak Bölen", "#2563eb"),
              stem: "<strong>24</strong> ve <strong>36</strong> sayılarının En Büyük Ortak Böleni (EBOB) kaçtır?",
              options: opts(6, 8, 12, 72),
              correctLetter: "C",
              hint: "24 ve 36'yı aynı anda bölen en büyük sayıyı bul.",
              solution: "24 = 12×2 ve 36 = 12×3 ⇒ EBOB(24, 36) = <strong>12</strong>."
            },
            {
              badge: "2. Soru • Kolay Alıştırma",
              categoryTag: "Kolay Alıştırma • Birbirinin Katı",
              diagramSvg: svgBox("KAT KURALI", "15 ve 45 Sayıları", "45 = 15 × 3", "#16a34a"),
              stem: "<strong>EBOB(15, 45)</strong> değeri kaçtır?",
              options: opts(3, 5, 15, 45),
              correctLetter: "C",
              hint: "Birbirinin katı olan iki sayıda EBOB küçük sayıya eşittir.",
              solution: "45 sayısı 15'in tam katı olduğundan EBOB = <strong>15</strong>."
            },
            {
              badge: "3. Soru • Kolay Alıştırma",
              categoryTag: "Kolay Alıştırma • İki Çuval",
              diagramSvg: svgBox("POŞETLEME", "18 kg & 30 kg", "Eşit Büyük Poşet", "#ea580c"),
              stem: "<strong>18 kg</strong> un ve <strong>30 kg</strong> şeker birbirine karıştırılmadan en büyük eşit ağırlıklı poşetlere doldurulursa toplam en az kaç poşet gerekir?",
              options: opts(6, 8, 12, 15),
              correctLetter: "B",
              hint: "Poşet boyu EBOB(18, 30) = 6 kg!",
              solution: "(18 ÷ 6) + (30 ÷ 6) = 3 + 5 = <strong>8</strong> poşet."
            },
            {
              badge: "4. Soru • Kolay Alıştırma",
              categoryTag: "Kolay Alıştırma • Üslü EBOB",
              diagramSvg: svgBox("ÜSLÜ EBOB", "A = 2³ · 3", "B = 2² · 3²", "#7c3aed"),
              stem: "A = 2³ · 3 ve B = 2² · 3² ise <strong>EBOB(A, B)</strong> kaçtır?",
              options: opts(6, 12, 24, 36),
              correctLetter: "B",
              hint: "Ortak asal tabanların küçük üslerini çarp: 2² · 3¹.",
              solution: "4 × 3 = <strong>12</strong>."
            }
          ]
        },
        {
          boardId: "k3_teog",
          icon: "🏛️",
          roadLabel: "TEOG & İOKBS",
          typeLabel: "TEOG & Bursluluk",
          title: "Adım 9 • TEOG & Bursluluk: EBOB Problemleri",
          subtitle: "Dikdörtgen araziye ağaç dikme ve kumaş kesme sorularını tahtada çöz!",
          pdfTargetPath: "assets/sorular/pdf_kesitler/k3_teog",
          questions: [
            {
              badge: "1. Soru • TEOG & İOKBS",
              categoryTag: "TEOG Ağaç Dikme",
              diagramSvg: svgBox("ARAZİ ÇEVRESİ", "28 m × 42 m", "Köşelere de Ağaç", "#0369a1"),
              stem: "Kenarları <strong>28 m</strong> ve <strong>42 m</strong> olan dikdörtgen bahçenin köşelerine de gelmek şartıyla etrafına eşit ve en büyük aralıkla en az kaç ağaç dikilir?",
              options: opts(8, 10, 12, 14),
              correctLetter: "B",
              hint: "Aralık = EBOB(28, 42) = 14 m. Çevreyi aralığa böl!",
              solution: "Çevre = 2 × (28 + 42) = 140 m ⇒ 140 ÷ 14 = <strong>10 ağaç</strong>."
            },
            {
              badge: "2. Soru • TEOG & İOKBS",
              categoryTag: "Bursluluk • Parça Boyu",
              diagramSvg: svgBox("KUMAŞ KESİMİ", "32 m ve 48 m", "Parça Sayısı", "#0f766e"),
              stem: "Uzunlukları <strong>32 m</strong> ve <strong>48 m</strong> olan iki kumaş topu artmayacak şekilde eşit ve en büyük parçalara bölünürse toplam kaç parça elde edilir?",
              options: opts(5, 8, 10, 16),
              correctLetter: "A",
              hint: "EBOB(32, 48) = 16 m.",
              solution: "32÷16 = 2 ve 48÷16 = 3 ⇒ Toplam = 2 + 3 = <strong>5 parça</strong>."
            },
            {
              badge: "3. Soru • TEOG & İOKBS",
              categoryTag: "TEOG • Bidon Sorusu",
              diagramSvg: svgBox("ZEYTİNYAĞI & AYÇİÇEK", "42 L, 56 L, 70 L", "En Az Şişe Sayısı", "#9333ea"),
              stem: "<strong>42 L</strong>, <strong>56 L</strong> ve <strong>70 L</strong>'lik üç farklı yağ birbirine karıştırılmadan eşit hacimli en büyük şişelere doldurulursa en az kaç şişe gerekir?",
              options: opts(10, 12, 14, 16),
              correctLetter: "B",
              hint: "Üç sayının EBOB'u 14 L'dir!",
              solution: "42÷14 + 56÷14 + 70÷14 = 3 + 4 + 5 = <strong>12 şişe</strong>."
            },
            {
              badge: "4. Soru • TEOG & İOKBS",
              categoryTag: "TEOG • Otel Oda Yerleşimi",
              diagramSvg: svgBox("ÖĞRENCİ KAFİLESİ", "24 Kız & 32 Erkek", "Ayrı ve Eşit Odalar", "#b45309"),
              stem: "<strong>24 kız</strong> ve <strong>32 erkek</strong> öğrenci aynı odada farklı cinsiyetler olmayacak şekilde eşit kişilik odalara yerleştirilecektir. En az kaç oda gerekir?",
              options: opts(6, 7, 8, 9),
              correctLetter: "B",
              hint: "Oda kapasitesi EBOB(24, 32) = 8 kişidir.",
              solution: "(24 ÷ 8) + (32 ÷ 8) = 3 + 4 = <strong>7 oda</strong>."
            }
          ]
        },
        {
          boardId: "k3_zorlayici",
          icon: "🚀",
          roadLabel: "Zorlayıcı",
          typeLabel: "Geliştirici Test",
          title: "Adım 10 • Zorlayıcı: EBOB Yorum & İncelik Soruları",
          subtitle: "Kısıtlı parça boyu, kesim ücreti ve kalanlı bölme sorularını çöz!",
          pdfTargetPath: "assets/sorular/pdf_kesitler/k3_zorlayici",
          questions: [
            {
              badge: "1. Soru • Zorlayıcı",
              categoryTag: "Geliştirici • Sınırlı Parça Boyu",
              diagramSvg: svgBox("SINIRLI ARALIK", "60 cm & 84 cm", "Parça Boyu < 10 cm", "#be123c"),
              stem: "<strong>60 cm</strong> ve <strong>84 cm</strong> uzunluğundaki iki çubuk eşit parçalara ayrılacaktır. Parça uzunluğu <strong>10 cm'den küçük</strong> olacağına göre en az kaç parça elde edilir?",
              options: opts(12, 18, 24, 36),
              correctLetter: "C",
              hint: "EBOB(60, 84) = 12 cm; ancak şart 10 cm'den küçük! O halde 12'nin 10'dan küçük en büyük bölenini (6 cm) al!",
              solution: "Seçilecek en büyük parça boyu = 6 cm ⇒ (60 ÷ 6) + (84 ÷ 6) = 10 + 14 = <strong>24 parça</strong>."
            },
            {
              badge: "2. Soru • Zorlayıcı",
              categoryTag: "Geliştirici • Ağaç Maliyeti",
              diagramSvg: svgBox("KÖŞELİ TARLA", "36 m × 54 m", "Eşit Aralıklı Çit", "#be123c"),
              stem: "<strong>36 m × 54 m</strong> dikdörtgen bahçenin çevresine köşeler dahil en az sayıda fidan dikiliyor. Her fidan 25 TL ise toplam maliyet kaç TL'dir?",
              options: opts(200, 225, 250, 300),
              correctLetter: "C",
              hint: "EBOB(36, 54) = 18 m ⇒ Çevre = 180 m ⇒ Fidan sayısı = 180 ÷ 18 = 10!",
              solution: "10 fidan × 25 TL = <strong>250 TL</strong>."
            },
            {
              badge: "3. Soru • Zorlayıcı",
              categoryTag: "Geliştirici • Farklı Kalanlar",
              diagramSvg: svgBox("KALANLI EBOB", "43 ÷ x (kalan 3)", "58 ÷ x (kalan 2)", "#be123c"),
              stem: "<strong>43</strong> sayısını böldüğünde <strong>3</strong>, <strong>58</strong> sayısını böldüğünde <strong>2</strong> kalanını veren <strong>en büyük</strong> doğal sayı kaçtır?",
              options: opts(4, 6, 8, 12),
              correctLetter: "C",
              hint: "Kalanları önce çıkar: 43 − 3 = 40 ve 58 − 2 = 56. Şimdi EBOB(40, 56) bul!",
              solution: "EBOB(40, 56) = <strong>8</strong> (43÷8 kalan 3, 58÷8 kalan 2; 8 > kalan 3!)."
            },
            {
              badge: "4. Soru • Zorlayıcı",
              categoryTag: "Geliştirici • Toplamdan Sayıya",
              diagramSvg: svgBox("EBOB VE TOPLAM", "EBOB(a, b) = 8", "a + b = 40 (a ≠ b)", "#be123c"),
              stem: "Pozitif a ve b sayıları için <strong>EBOB(a, b) = 8</strong> ve <strong>a + b = 40</strong> ise <strong>|a − b|</strong> en az kaçtır?",
              options: opts(8, 16, 24, 32),
              correctLetter: "A",
              hint: "a = 8x, b = 8y (x, y aralarında asal). 8(x + y) = 40 ⇒ x + y = 5!",
              solution: "x ve y aralarında asal ve x+y=5 için (2, 3) seçersek a=16, b=24 ⇒ |24 − 16| = <strong>8</strong>."
            }
          ]
        }
      ],

      // =====================================================================
      // k4: EKOK (Adım 8 Kolay, Adım 9 TEOG/İOKBS, Adım 10 Zorlayıcı)
      // =====================================================================
      k4: [
        {
          boardId: "k4_kolay",
          icon: "✏️",
          roadLabel: "Alıştırma",
          typeLabel: "Kolay Alıştırma",
          title: "Adım 8 • Alıştırma Zamanı: EKOK (Kolay Düzey)",
          subtitle: "Temel EKOK hesaplama ve ilk buluşma zamanı sorularını tahtada çöz!",
          pdfTargetPath: "assets/sorular/pdf_kesitler/k4_kolay",
          questions: [
            {
              badge: "1. Soru • Kolay Alıştırma",
              categoryTag: "Kolay Alıştırma • Temel EKOK",
              diagramSvg: svgBox("TEMEL EKOK", "EKOK(12, 18)", "En Küçük Ortak Kat", "#2563eb"),
              stem: "<strong>12</strong> ve <strong>18</strong> sayılarının En Küçük Ortak Katı (EKOK) kaçtır?",
              options: opts(6, 24, 36, 72),
              correctLetter: "C",
              hint: "18'in katlarını say: 18, 36... Hangisi 12'ye de bölünür?",
              solution: "18 × 2 = 36 sayısı 12'ye de tam bölündüğünden EKOK(12, 18) = <strong>36</strong>."
            },
            {
              badge: "2. Soru • Kolay Alıştırma",
              categoryTag: "Kolay Alıştırma • Kat Kuralı",
              diagramSvg: svgBox("BİRİ DİĞERİNİN KATI", "14 ve 42 Sayıları", "EKOK(14, 42) = ?", "#16a34a"),
              stem: "<strong>EKOK(14, 42)</strong> değeri kaçtır?",
              options: opts(14, 28, 42, 84),
              correctLetter: "C",
              hint: "Birbirinin katı sayılarda EKOK daima büyük sayıya eşittir.",
              solution: "42 = 14 × 3 olduğu için EKOK(14, 42) = <strong>42</strong>."
            },
            {
              badge: "3. Soru • Kolay Alıştırma",
              categoryTag: "Kolay Alıştırma • İki Zil",
              diagramSvg: svgBox("ZİL BULUŞMASI", "20 dk ve 30 dk", "Birlikte Çalma", "#ea580c"),
              stem: "Biri <strong>20 dakikada</strong>, diğeri <strong>30 dakikada</strong> bir çalan iki zil saat <strong>10:00</strong>'da birlikte çaldıktan sonra ilk kez tekrar saat kaçta birlikte çalar?",
              options: opts("10:30", "10:50", "11:00", "12:00"),
              correctLetter: "C",
              hint: "EKOK(20, 30) = 60 dakikadır!",
              solution: "10:00 + 60 dakika = <strong>11:00</strong>."
            },
            {
              badge: "4. Soru • Kolay Alıştırma",
              categoryTag: "Kolay Alıştırma • Üslü EKOK",
              diagramSvg: svgBox("ÜSLÜ EKOK", "A = 2² · 3", "B = 2 · 3²", "#7c3aed"),
              stem: "A = 2² · 3 ve B = 2 · 3² ise <strong>EKOK(A, B)</strong> kaçtır?",
              options: opts(6, 12, 18, 36),
              correctLetter: "D",
              hint: "Her tabanın büyük kuvvetini al: 2² · 3²!",
              solution: "4 × 9 = <strong>36</strong>."
            }
          ]
        },
        {
          boardId: "k4_teog",
          icon: "🏛️",
          roadLabel: "TEOG & İOKBS",
          typeLabel: "TEOG & Bursluluk",
          title: "Adım 9 • TEOG & Bursluluk: EKOK Uygulamaları",
          subtitle: "Dikdörtgenden kare oluşturma, bilye sayma ve nöbet tutma TEOG sorularını çöz!",
          pdfTargetPath: "assets/sorular/pdf_kesitler/k4_teog",
          questions: [
            {
              badge: "1. Soru • TEOG & İOKBS",
              categoryTag: "TEOG Nöbet Sorusu",
              diagramSvg: svgBox("DOKTOR NÖBETİ", "6 Günde Bir & 8 Günde Bir", "Aynı Gün = Salı", "#0369a1"),
              stem: "İki doktordan biri <strong>6 günde</strong>, diğeri <strong>8 günde</strong> bir nöbet tutmaktadır. İkisi ilk kez birlikte <strong>Salı</strong> günü nöbet tuttuğuna göre 2. kez birlikte hangi gün nöbet tutarlar?",
              options: opts("Pazartesi", "Salı", "Çarşamba", "Cuma"),
              correctLetter: "D",
              hint: "EKOK(6, 8) = 24 gün! 24 ÷ 7 = 3 hafta + 3 gün artar. Salı + 3 gün = ?",
              solution: "24 gün sonra ⇒ Salı + 3 gün = <strong>Cuma</strong>."
            },
            {
              badge: "2. Soru • TEOG & İOKBS",
              categoryTag: "Bursluluk • Kalanlı Sayma",
              diagramSvg: svgBox("BİLYE SAYIMI", "4'er ve 6'şar Sayım", "Her Defasında +2 Artar", "#0f766e"),
              stem: "Bir kutudaki bilyeler <strong>4'er</strong> veya <strong>6'şar</strong> sayıldığında her seferinde <strong>2 bilye</strong> artmaktadır. Kutuda <strong>30'dan fazla</strong> en az kaç bilye vardır?",
              options: opts(36, 38, 40, 50),
              correctLetter: "B",
              hint: "EKOK(4, 6) = 12. 12'nin 30'u geçen ilk katı 36 olup kalan 2'yi ekle!",
              solution: "36 + 2 = <strong>38</strong>."
            },
            {
              badge: "3. Soru • TEOG & İOKBS",
              categoryTag: "TEOG • Dikdörtgenden Kare",
              diagramSvg: svgBox("FAYANS KAPLAMA", "10 cm × 15 cm Kartonlar", "En Küçük Kare", "#9333ea"),
              stem: "Boyutları <strong>10 cm</strong> ve <strong>15 cm</strong> olan dikdörtgen kartonlar birleştirilerek yapılabilecek en küçük kare için kaç karton gerekir?",
              options: opts(4, 6, 8, 12),
              correctLetter: "B",
              hint: "Karenin bir kenarı EKOK(10, 15) = 30 cm olur!",
              solution: "(30 ÷ 10) × (30 ÷ 15) = 3 × 2 = <strong>6 karton</strong>."
            },
            {
              badge: "4. Soru • TEOG & İOKBS",
              categoryTag: "TEOG • EBOB × EKOK",
              diagramSvg: svgBox("ÇARPIM KURALI", "a × b = EBOB × EKOK", "b = 18 , EBOB = 6", "#b45309"),
              stem: "İki sayının EBOB'u <strong>6</strong>, EKOK'u <strong>72</strong>'dir. Bu sayılardan biri <strong>18</strong> olduğuna göre diğeri kaçtır?",
              options: opts(12, 24, 36, 48),
              correctLetter: "B",
              hint: "18 × x = 6 × 72 denklemini çöz!",
              solution: "432 ÷ 18 = <strong>24</strong>."
            }
          ]
        },
        {
          boardId: "k4_zorlayici",
          icon: "🚀",
          roadLabel: "Zorlayıcı",
          typeLabel: "Geliştirici Test",
          title: "Adım 10 • Zorlayıcı: EKOK Aralık & Eksik Kalan Soruları",
          subtitle: "Farklı kalanlı ama sabit eklemeli (a+k) EKOK problemlerini çöz!",
          pdfTargetPath: "assets/sorular/pdf_kesitler/k4_zorlayici",
          questions: [
            {
              badge: "1. Soru • Zorlayıcı",
              categoryTag: "Geliştirici • Eksik Kalan",
              diagramSvg: svgBox("EKSİK KALAN", "5'er Sayınca 3 Artar", "6'şar Sayınca 4 Artar", "#be123c"),
              stem: "Bir sınıftaki öğrenciler <strong>5'erli</strong> oturunca 3 öğrenci, <strong>6'şarlı</strong> oturunca 4 öğrenci ayakta kalıyor. Sınıfta en az kaç öğrenci vardır?",
              options: opts(23, 28, 32, 58),
              correctLetter: "B",
              hint: "Her grupta 2 öğrenci daha olsaydı hem 5'e hem 6'ya tam bölünürdü (5−3=2, 6−4=2)!",
              solution: "A + 2 = EKOK(5, 6) = 30 ⇒ A = 30 − 2 = <strong>28</strong>."
            },
            {
              badge: "2. Soru • Zorlayıcı",
              categoryTag: "Geliştirici • Aralık & Çevre",
              diagramSvg: svgBox("ARALIKLI RAF", "12 cm & 16 cm Kutular", "Raf Boyu: 250 - 300 cm", "#be123c"),
              stem: "Boyu <strong>250 cm ile 300 cm</strong> arasında olan bir rafa <strong>12 cm</strong> veya <strong>16 cm</strong> genişliğindeki kutular tam sığmaktadır. Bu rafa 16 cm'lik kutudan en fazla kaç tane sığar?",
              options: opts(15, 16, 18, 24),
              correctLetter: "C",
              hint: "EKOK(12, 16) = 48 cm. 48'in 250–300 cm aralığındaki katını bul!",
              solution: "48 × 6 = 288 cm ⇒ 288 ÷ 16 = <strong>18</strong> kutu."
            },
            {
              badge: "3. Soru • Zorlayıcı",
              categoryTag: "Geliştirici • Küp Oluşturma",
              diagramSvg: svgBox("İKİLİ KARELER", "12×12 ve 18×18 Kareler", "Aynı Kenarlı Küp Yüzeyi", "#be123c"),
              stem: "<strong>12 cm × 18 cm</strong> fayanslarla yapılan iki farklı kareden en küçüğü ile bir küçüğün 2 katı kenarlı olan karenin alanları oranı kaçtır?",
              options: opts("1/2", "1/4", "1/6", "1/8"),
              correctLetter: "B",
              hint: "Kenar 2 katına çıkarsa alan 2 × 2 = 4 katına çıkar!",
              solution: "36² / 72² = <strong>1/4</strong>."
            },
            {
              badge: "4. Soru • Zorlayıcı",
              categoryTag: "Geliştirici • İkili Değer",
              diagramSvg: svgBox("EKOK = 60", "Aralarında Asal Değil", "En Küçük Toplam", "#be123c"),
              stem: "Farklı iki doğal sayının <strong>EKOK'u 30</strong> olduğuna göre bu iki sayının toplamı <strong>en çok</strong> kaç olabilir (sayılar 30'dan küçükse)?",
              options: opts(25, 35, 45, 50),
              correctLetter: "A",
              hint: "30'dan küçük ve 30'u bölen en büyük iki sayı 15 ve 10'dur (EKOK(15, 10) = 30)!",
              solution: "15 + 10 = <strong>25</strong> (15 ve 10'un ortak katı 30'dur ve ikisi de 30'dan küçüktür)."
            }
          ]
        }
      ],

      // =====================================================================
      // k5: ARALARINDA ASAL SAYILAR (Adım 8 Kolay, Adım 9 TEOG, Adım 10 Zor)
      // =====================================================================
      k5: [
        {
          boardId: "k5_kolay",
          icon: "✏️",
          roadLabel: "Alıştırma",
          typeLabel: "Kolay Alıştırma",
          title: "Adım 8 • Alıştırma Zamanı: Aralarında Asal Sayılar (Kolay)",
          subtitle: "Aralarında asallık testini ve EBOB=1 kuralını tahtada uygula!",
          pdfTargetPath: "assets/sorular/pdf_kesitler/k5_kolay",
          questions: [
            {
              badge: "1. Soru • Kolay Alıştırma",
              categoryTag: "Kolay Alıştırma • Çift Seçimi",
              diagramSvg: svgBox("ORTAK BÖLEN TESTİ", "EBOB(a, b) = 1", "Aralarında Asal Çiftler", "#2563eb"),
              stem: "Aşağıdaki sayı çiftlerinden hangisi <strong>aralarında asaldır</strong>?",
              options: opts("9 ile 12", "10 ile 15", "12 ile 25", "14 ile 21"),
              correctLetter: "C",
              hint: "9-12 (3'e), 10-15 (5'e), 14-21 (7'ye) bölünür!",
              solution: "12 = 2²·3 ve 25 = 5² ortak bölen içermez ⇒ <strong>12 ile 25</strong>."
            },
            {
              badge: "2. Soru • Kolay Alıştırma",
              categoryTag: "Kolay Alıştırma • 1 Kuralı",
              diagramSvg: svgBox("ALTIN KURAL", "1 ile Her Sayı", "Ardışık Sayılar", "#16a34a"),
              stem: "<strong>1</strong> ile <strong>24</strong> sayılarının EBOB ve EKOK değerlerinin toplamı kaçtır?",
              options: opts(24, 25, 26, 48),
              correctLetter: "B",
              hint: "1 ile 24 aralarında asaldır: EBOB = 1 ve EKOK = 24!",
              solution: "1 + 24 = <strong>25</strong>."
            },
            {
              badge: "3. Soru • Kolay Alıştırma",
              categoryTag: "Kolay Alıştırma • Ardışık Çift",
              diagramSvg: svgBox("ARDIŞIK DOĞAL", "17 ve 18", "EBOB = 1 , EKOK = Çarpım", "#ea580c"),
              stem: "Aralarında asal iki doğal sayının <strong>EKOK'u 35</strong>, bu sayılardan biri <strong>5</strong> ise diğeri kaçtır?",
              options: opts(3, 5, 7, 15),
              correctLetter: "C",
              hint: "5 × x = 35 denklemini çöz.",
              solution: "35 ÷ 5 = <strong>7</strong>."
            },
            {
              badge: "4. Soru • Kolay Alıştırma",
              categoryTag: "Kolay Alıştırma • Küme Eşleşmesi",
              diagramSvg: svgBox("İKİLİ TEST", "18 İle Aralarında Asal", "2 ve 3'e Bölünmeyen", "#7c3aed"),
              stem: "Aşağıdaki sayılardan hangisi <strong>18</strong> ile aralarında asaldır?",
              options: opts(12, 15, 25, 27),
              correctLetter: "C",
              hint: "18'in asal çarpanları 2 ve 3'tür; 2 ve 3'e bölünmeyen sayıyı seç!",
              solution: "25 yalnız 5'e bölündüğünden 18 ile aralarında asaldır: <strong>25</strong>."
            }
          ]
        },
        {
          boardId: "k5_teog",
          icon: "🏛️",
          roadLabel: "TEOG & İOKBS",
          typeLabel: "TEOG & Bursluluk",
          title: "Adım 9 • TEOG & Bursluluk: Sadeleştirme & Rakam Şartı",
          subtitle: "Kesir sadeleştirme ve iki basamaklı aralarında asal TEOG sorularını çöz!",
          pdfTargetPath: "assets/sorular/pdf_kesitler/k5_teog",
          questions: [
            {
              badge: "1. Soru • TEOG & İOKBS",
              categoryTag: "TEOG Sadeleştirme",
              diagramSvg: svgBox("KESİR SADELEŞTİR", "(x + 1)/(y − 3) = 24/36", "En Sade Hali = 2/3", "#0369a1"),
              stem: "x + 1 ile y − 3 aralarında asal iki sayı ve (x + 1)/(y − 3) = <strong>24/36</strong> ise <strong>x + y</strong> kaçtır?",
              options: opts(5, 6, 7, 8),
              correctLetter: "C",
              hint: "24/36 kesrini 12 ile sadeleştir: 2/3!",
              solution: "x + 1 = 2 (x = 1) ve y − 3 = 3 (y = 6) ⇒ x + y = 1 + 6 = <strong>7</strong>."
            },
            {
              badge: "2. Soru • TEOG & İOKBS",
              categoryTag: "Bursluluk • Rakam Bulma",
              diagramSvg: svgBox("BASAMAK TESTİ", "4A ile 12 Aralarında Asal", "40..49 Aralığı", "#0f766e"),
              stem: "<strong>4A</strong> iki basamaklı sayısı ile <strong>12</strong> aralarında asal olduğuna göre A yerine kaç farklı rakam yazılabilir?",
              options: opts(2, 3, 4, 5),
              correctLetter: "C",
              hint: "12 = 2² × 3 olduğundan 4A tek olmalı (41, 43, 45, 47, 49) ve 3'e bölünmemeli!",
              solution: "45 sayısı 3'e bölündüğü için elenir; 41, 43, 47, 49 kalır ⇒ <strong>4 farklı değer</strong>."
            },
            {
              badge: "3. Soru • TEOG & İOKBS",
              categoryTag: "TEOG • EKOK Özellik",
              diagramSvg: svgBox("ARALARINDA ASAL", "EBOB + EKOK = 61", "1 + (a × b) = 61", "#9333ea"),
              stem: "Aralarında asal iki doğal sayının <strong>EBOB'u ile EKOK'unun toplamı 61</strong> olduğuna göre bu sayıların <strong>toplamı en az</strong> kaç olabilir?",
              options: opts(15, 16, 17, 19),
              correctLetter: "C",
              hint: "a × b = 60 olur. Çarpımı 60 olan aralarında asal ikililerden en yakınını seç!",
              solution: "60 için aralarında asal çiftler: (1,60), (3,20), (4,15), (5,12). En küçük toplam = 5 + 12 = <strong>17</strong>."
            },
            {
              badge: "4. Soru • TEOG & İOKBS",
              categoryTag: "TEOG • Kenar Şartı",
              diagramSvg: svgBox("DİKDÖRTGEN", "Alan = 36 cm²", "Kenarlar Aralarında Asal", "#b45309"),
              stem: "Alanı <strong>36 cm²</strong> olan ve kenar uzunlukları <strong>aralarında asal</strong> tam sayılar olan kaç farklı dikdörtgen çizilebilir (1 cm dahil)?",
              options: opts(1, 2, 3, 4),
              correctLetter: "B",
              hint: "36'nın kenar çiftleri: (1,36), (2,18), (3,12), (4,9), (6,6).",
              solution: "(1, 36) ve (4, 9) aralarında asaldır ⇒ Toplam <strong>2</strong> dikdörtgen."
            }
          ]
        },
        {
          boardId: "k5_zorlayici",
          icon: "🚀",
          roadLabel: "Zorlayıcı",
          typeLabel: "Geliştirici Test",
          title: "Adım 10 • Zorlayıcı: Aralarında Asal İleri Sorular",
          subtitle: "Dikdörtgen alanından şifre üretme ve aralarında asal çift yorumlarını çöz!",
          pdfTargetPath: "assets/sorular/pdf_kesitler/k5_zorlayici",
          questions: [
            {
              badge: "1. Soru • Zorlayıcı",
              categoryTag: "Geliştirici • Kat & Aralarında Asal",
              diagramSvg: svgBox("ŞARTLI DEĞERLER", "x < y • x · y = 90", "EBOB(x, y) = 1", "#be123c"),
              stem: "x ve y aralarında asal iki doğal sayıdır. <strong>x · y = 90</strong> ve x > 1 olduğuna göre <strong>x + y</strong> en az kaçtır?",
              options: opts(19, 21, 23, 27),
              correctLetter: "A",
              hint: "90 = 2 × 3² × 5. Asalları parçalamadan gruplara ayır: (2, 45), (5, 18), (9, 10)!",
              solution: "En yakın çift (9, 10) aralarında asaldır ⇒ 9 + 10 = <strong>19</strong>."
            },
            {
              badge: "2. Soru • Zorlayıcı",
              categoryTag: "Geliştirici • Çevre Eşitliği",
              diagramSvg: svgBox("ÇEVRE = 20 cm", "Kenarlar Aralarında Asal", "Dikdörtgen Alanı = ?", "#be123c"),
              stem: "Çevresi <strong>20 cm</strong> olan bir dikdörtgenin kenar uzunlukları <strong>1'den büyük ve aralarında asaldır</strong>. Bu dikdörtgenin alanı kaç cm²'dir?",
              options: opts(16, 21, 24, 25),
              correctLetter: "B",
              hint: "Kısa + uzun kenar = 10 cm! 1'den büyük ve toplamı 10 olup aralarında asal olan tek ikili (3, 7)'dir!",
              solution: "3 + 7 = 10 (3 ve 7 aralarında asal) ⇒ Alan = 3 × 7 = <strong>21 cm²</strong>."
            },
            {
              badge: "3. Soru • Zorlayıcı",
              categoryTag: "Geliştirici • Saat Akrep-Yelkovan",
              diagramSvg: svgBox("DİJİTAL SAAT", "15 : AB", "15 ile AB Aralarında Asal", "#be123c"),
              stem: "Saat <strong>15</strong> iken dakika bölümü olan <strong>10 ile 20 arasındaki</strong> hangi değerlerin tamamı 15 ile aralarında asaldır?",
              options: opts("11, 13, 14, 16, 17, 19", "11, 13, 17, 19", "11, 12, 14, 16, 17, 19", "13, 14, 17, 19"),
              correctLetter: "A",
              hint: "15 = 3 × 5 olduğundan 11..19 arasında 3'e ve 5'e bölünenleri (12, 15, 18) çıkar!",
              solution: "Kalanlar: <strong>11, 13, 14, 16, 17, 19</strong>."
            },
            {
              badge: "4. Soru • Zorlayıcı",
              categoryTag: "Geliştirici • Kesir & İki Bilinmeyen",
              diagramSvg: svgBox("SADELEŞME", "(2a − 1)/(b + 4) = 35/45", "a + b = ?", "#be123c"),
              stem: "2a − 1 ve b + 4 aralarında asal sayılar olmak üzere (2a − 1)/(b + 4) = <strong>35/45</strong> ise <strong>a + b</strong> kaçtır?",
              options: opts(7, 8, 9, 10),
              correctLetter: "C",
              hint: "35/45 kesrini 5 ile sadeleştir: 7/9!",
              solution: "2a − 1 = 7 ⇒ a = 4; b + 4 = 9 ⇒ b = 5. Toplam = 4 + 5 = <strong>9</strong>."
            }
          ]
        }
      ],

      // =====================================================================
      // k6: ÜNİTE SONU GENEL ALIŞTIRMA & TEOG / BURSLULUK
      // =====================================================================
      k6: [
        {
          boardId: "k6_alistirma",
          icon: "✏️",
          roadLabel: "Alıştırmalar",
          typeLabel: "Kolay Alıştırma",
          title: "Ünite Genel Alıştırmaları (Kolay Düzey)",
          subtitle: "Tüm 1. Ünite konularını harmanlayan alıştırma sorularını kaleminle tahtada çöz!",
          pdfTargetPath: "assets/sorular/pdf_kesitler/unite_genel",
          questions: [
            {
              badge: "Alıştırma 1",
              categoryTag: "Ünite Geneli • Kolay",
              diagramSvg: svgBox("GENEL TEKRAR", "18'in Çarpanları &", "Asal Bölen Toplamı", "#2563eb"),
              stem: "<strong>30</strong> sayısının pozitif çarpanlarının sayısı kaçtır?",
              options: opts(6, 7, 8, 10),
              correctLetter: "C",
              hint: "30 = 1×30, 2×15, 3×10, 5×6 çiftlerini say!",
              solution: "{1, 2, 3, 5, 6, 10, 15, 30} olmak üzere toplam <strong>8</strong> tanedir."
            },
            {
              badge: "Alıştırma 2",
              categoryTag: "Ünite Geneli • Kolay",
              diagramSvg: svgBox("GENEL TEKRAR", "EBOB(16, 24) +", "EKOK(16, 24)", "#16a34a"),
              stem: "<strong>EBOB(16, 24) + EKOK(16, 24)</strong> toplamı kaçtır?",
              options: opts(48, 52, 56, 64),
              correctLetter: "C",
              hint: "EBOB(16, 24) = 8 ve EKOK(16, 24) = 48.",
              solution: "8 + 48 = <strong>56</strong>."
            },
            {
              badge: "Alıştırma 3",
              categoryTag: "Ünite Geneli • Kolay",
              diagramSvg: svgBox("GENEL TEKRAR", "72 = 2ᵃ · 3ᵇ", "a × b = ?", "#ea580c"),
              stem: "<strong>72 = 2ᵃ · 3ᵇ</strong> ise <strong>a × b</strong> kaçtır?",
              options: opts(5, 6, 8, 9),
              correctLetter: "B",
              hint: "72 = 8 × 9 = 2³ × 3².",
              solution: "a = 3, b = 2 ⇒ 3 × 2 = <strong>6</strong>."
            },
            {
              badge: "Alıştırma 4",
              categoryTag: "Ünite Geneli • Kolay",
              diagramSvg: svgBox("GENEL TEKRAR", "Aralarında Asal Çift", "EBOB = 1", "#7c3aed"),
              stem: "Hangi iki sayı her zaman aralarında asaldır?",
              options: opts("İki çift sayı", "Ardışık iki doğal sayı", "5'in iki katı", "İki tek bileşik sayı"),
              correctLetter: "B",
              hint: "8 ve 9 ya da 14 ve 15 örneklerini düşün!",
              solution: "<strong>Ardışık iki doğal sayı</strong> daima aralarında asaldır."
            }
          ]
        },
        {
          boardId: "k6_teog",
          icon: "🏛️",
          roadLabel: "TEOG / İOKBS",
          typeLabel: "TEOG & Bursluluk",
          title: "TEOG & Bursluluk Sınavlarında Çıkmış Karma Sorular",
          subtitle: "ÖSYM / MEB tarafından yayınlanan kolay ve orta düzey kazanım sorularını tahtada çöz!",
          pdfTargetPath: "assets/sorular/pdf_kesitler/unite_genel",
          questions: [
            {
              badge: "TEOG / İOKBS 1",
              categoryTag: "TEOG Karma",
              diagramSvg: svgBox("TEOG KARMA", "24 & 30 Sayıları", "Ortak Kat Koşulu", "#0369a1"),
              stem: "Hem <strong>24</strong>'e hem <strong>30</strong>'a kalansız bölünebilen <strong>en küçük üç basamaklı</strong> doğal sayı kaçtır?",
              options: opts(120, 150, 180, 240),
              correctLetter: "A",
              hint: "EKOK(24, 30) = 120 sayısının kendisi zaten 3 basamaklı en küçük kattır!",
              solution: "EKOK(24, 30) = <strong>120</strong>."
            },
            {
              badge: "TEOG / İOKBS 2",
              categoryTag: "İOKBS Karma",
              diagramSvg: svgBox("BURSLULUK KARMA", "36 m ve 48 m", "En Büyük Eşit Çubuk", "#0f766e"),
              stem: "<strong>36 m</strong> ve <strong>48 m</strong>'lik iki tel eşit ve en büyük uzunlukta kesilirse toplam kaç parça olur?",
              options: opts(5, 6, 7, 12),
              correctLetter: "C",
              hint: "EBOB(36, 48) = 12 m.",
              solution: "(36 ÷ 12) + (48 ÷ 12) = 3 + 4 = <strong>7</strong>."
            },
            {
              badge: "TEOG / İOKBS 3",
              categoryTag: "TEOG Karma",
              diagramSvg: svgBox("TEOG KARMA", "A = 2 · 3² · 7", "Asal Çarpanları", "#9333ea"),
              stem: "Asal çarpanlarına ayrılmış hali <strong>2 · 3² · 7</strong> olan sayının en büyük iki basamaklı böleni aşağıdakilerden hangisidir?",
              options: opts(42, 63, 72, 84),
              correctLetter: "B",
              hint: "Sayı 2 × 9 × 7 = 126'dır; 2'ye bölersen en büyük ikinci çarpanını bulursun!",
              solution: "126 ÷ 2 = <strong>63</strong>."
            },
            {
              badge: "TEOG / İOKBS 4",
              categoryTag: "İOKBS Karma",
              diagramSvg: svgBox("BURSLULUK KARMA", "15 ve B Aralarında Asal", "B İki Basamaklı En Küçük", "#b45309"),
              stem: "<strong>15</strong> sayısı ile aralarında asal olan en küçük iki basamaklı çift doğal sayı kaçtır?",
              options: opts(12, 14, 16, 18),
              correctLetter: "B",
              hint: "10 (5'e), 12 (3'e) bölünür. Peki 14?",
              solution: "14 = 2 × 7 ve 15 = 3 × 5 ortak bölen içermez ⇒ <strong>14</strong>."
            }
          ]
        }
      ],

      // =====================================================================
      // k7: MEB ÖRNEK SORULAR
      // =====================================================================
      k7: {
        boardId: "k7_ornek",
        icon: "📘",
        roadLabel: "Örnek Sorular",
        typeLabel: "MEB Örnek Sorular",
        title: "MEB Örnek Sorular Testi (Yeni Nesil)",
        subtitle: "MEB Ölçme Değerlendirme tarafından yayınlanan örnek soruları tahtada çöz!",
        pdfTargetPath: "assets/sorular/pdf_kesitler/ornek_sorular",
        questions: [
          {
            badge: "Örnek Soru 1",
            categoryTag: "MEB Örnek Soru",
            diagramSvg: svgBox("MEB ÖRNEK SORU", "24 cm × 36 cm Mermer", "Kare Platform < 100 cm", "#0369a1"),
            stem: "Kenarları <strong>24 cm</strong> ve <strong>36 cm</strong> olan dikdörtgen fayanslarla oluşturulacak kare yüzeyin bir kenarı <strong>100 cm'den küçük ve en büyük</strong> ise kaç fayans kullanılır?",
            options: opts(6, 12, 18, 24),
            correctLetter: "A",
            hint: "EKOK(24, 36) = 72 cm (< 100 cm). 72 × 72'lik kareye kaç fayans sığar?",
            solution: "(72 ÷ 24) × (72 ÷ 36) = 3 × 2 = <strong>6</strong> fayans."
          },
          {
            badge: "Örnek Soru 2",
            categoryTag: "MEB Örnek Soru",
            diagramSvg: svgBox("MEB ÖRNEK SORU", "Raf: 16 cm & 20 cm", "Aralık: 300 - 350 cm", "#0f766e"),
            stem: "Bir rafa <strong>16 cm</strong> ve <strong>20 cm</strong>'lik kutular hiç boşluk kalmadan yan yana diziliyor. Raf boyu <strong>300 ile 350 cm</strong> arasındaysa en az kaç 20 cm'lik kutu dizilir?",
            options: opts(14, 15, 16, 20),
            correctLetter: "C",
            hint: "EKOK(16, 20) = 80 cm. 80 × 4 = 320 cm raf uzunluğudur!",
            solution: "320 ÷ 20 = <strong>16 kutu</strong>."
          },
          {
            badge: "Örnek Soru 3",
            categoryTag: "MEB Örnek Soru",
            diagramSvg: svgBox("MEB ÖRNEK SORU", "50 & 70 Litre Fıçı", "Farklı Katlı Şişeler", "#9333ea"),
            stem: "<strong>50 L</strong> ve <strong>70 L</strong> süt birbirine karıştırılmadan eşit ve en büyük hacimli şişelere konuyor. Her şişe 12 TL'den satılırsa toplam gelir kaç TL olur?",
            options: opts(120, 144, 168, 180),
            correctLetter: "B",
            hint: "Şişe hacmi EBOB(50, 70) = 10 L ⇒ (50÷10)+(70÷10) = 12 şişe!",
            solution: "12 şişe × 12 TL = <strong>144 TL</strong>."
          },
          {
            badge: "Örnek Soru 4",
            categoryTag: "MEB Örnek Soru",
            diagramSvg: svgBox("MEB ÖRNEK SORU", "Şifreli Kutu", "Asal Çarpan Toplamı = 10", "#b45309"),
            stem: "Pozitif tam sayıların asal çarpanlarının toplamı şeklinde kodlanan bir sistemde kodu <strong>10</strong> olan iki basamaklı en küçük sayı kaçtır?",
            options: opts(21, 30, 35, 42),
            correctLetter: "A",
            hint: "Toplamı 10 eden en küçük asallar 3 ve 7 (3 + 7 = 10) ya da 2, 3, 5 (2+3+5 = 10 ⇒ 2·3·5 = 30)!",
            solution: "3 × 7 = <strong>21</strong> sayısı 30'dan küçüktür ve asal çarpanları 3 + 7 = 10 eder."
          }
        ]
      },

      // =====================================================================
      // k8: LGS ÇIKMIŞ SORULAR
      // =====================================================================
      k8: {
        boardId: "k8_lgs",
        icon: "🏆",
        roadLabel: "LGS Çıkmış",
        typeLabel: "LGS Çıkmış Sorular",
        title: "LGS Çıkmış Sorular Testi (Final Öncesi)",
        subtitle: "Çarpanlar ve Katlar ünitesinin LGS yeni nesil mantık sorularını tahtada çöz!",
        insertBeforeFinalGame: true,
        pdfTargetPath: "assets/sorular/pdf_kesitler/lgs_cikmis",
        questions: [
          {
            badge: "LGS Sınav Kalıbı 1",
            categoryTag: "LGS Çıkmış Kalıp",
            diagramSvg: svgBox("LGS KALIBI • YÜRÜYÜŞ", "36 cm & 45 cm Adım", "Aynı Mesafe < 4 m", "#be123c"),
            stem: "Adım uzunlukları <strong>36 cm</strong> ve <strong>45 cm</strong> olan iki kardeş aynı çizgiden yürüyerek en yakın hangi mesafede adımlarını ilk kez denk getirirler?",
            options: opts("150 cm", "180 cm", "270 cm", "360 cm"),
            correctLetter: "B",
            hint: "EKOK(36, 45) değerini hesapla!",
            solution: "36 = 2²·3² ve 45 = 3²·5 ⇒ EKOK = 4 × 9 × 5 = <strong>180 cm</strong>."
          },
          {
            badge: "LGS Sınav Kalıbı 2",
            categoryTag: "LGS Çıkmış Kalıp",
            diagramSvg: svgBox("LGS KALIBI • ARSA", "Alanı 48 m² Dikdörtgenler", "Ortak Kenarlı Ev", "#be123c"),
            stem: "Alanları <strong>24 m²</strong> ve <strong>32 m²</strong> olan bitişik iki dikdörtgen odanın ortak duvarı tam sayı ve en büyüktür. İki odanın birlikte dış çevresi en az kaç metredir?",
            options: opts(28, 30, 32, 36),
            correctLetter: "B",
            hint: "Ortak duvar EBOB(24, 32) = 8 m olursa diğer kenarlar 3 m ve 4 m olur!",
            solution: "Birleşik dikdörtgen kenarları 8 m ve (3 + 4) = 7 m ⇒ Çevre = 2 × (8 + 7) = <strong>30 m</strong>."
          },
          {
            badge: "LGS Sınav Kalıbı 3",
            categoryTag: "LGS Çıkmış Kalıp",
            diagramSvg: svgBox("LGS KALIBI • TABLO", "A, B, C Çarpan Sayıları", "A = 2² · 3 · 5", "#be123c"),
            stem: "Asal çarpanlarına ayrılmış hali <strong>A = 2² · 3 · 5</strong> olan sayının pozitif çarpanlarından kaç tanesi <strong>çift</strong> sayıdır?",
            options: opts(4, 6, 8, 12),
            correctLetter: "C",
            hint: "A = 60 sayısının tüm 12 çarpanından tek olanları ({1, 3, 5, 15} = 4 adet) çıkar!",
            solution: "Toplam 12 çarpandan 4'ü tektir ⇒ 12 − 4 = <strong>8</strong> tanesi çifttir."
          },
          {
            badge: "LGS Sınav Kalıbı 4",
            categoryTag: "LGS Çıkmış Kalıp",
            diagramSvg: svgBox("LGS KALIBI • ARALARINDA ASAL", "A ve B Kümesi", "EKOK − EBOB = 14", "#be123c"),
            stem: "Aralarında asal iki doğal sayının <strong>EKOK'u ile EBOB'unun farkı 14</strong> olduğuna göre bu sayıların toplamı <strong>en az</strong> kaçtır?",
            options: opts(8, 10, 12, 16),
            correctLetter: "A",
            hint: "EBOB = 1 olduğuna göre EKOK − 1 = 14 ⇒ çarpımları = 15! 3 ve 5 mi, 1 ve 15 mi?",
            solution: "3 × 5 = 15 (3 ve 5 aralarında asal!) ⇒ En az toplam = 3 + 5 = <strong>8</strong>."
          }
        ]
      }
    }
  };
})();
