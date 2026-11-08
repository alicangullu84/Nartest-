// Otomatik Doğrulanmış 8. Sınıf LGS Ünite 2 - 12 Veri Tabanı (330 Durak)
window.MATFLOW_UNITS_2_12 = [
  {
    "id": "m8-u2-uslu-ifadeler",
    "grade": 8,
    "unitNo": 2,
    "title": "Üslü İfadeler",
    "subtitle": "Negatif Üs, Üssün Üssü, Çarpma-Bölme, Çözümleme ve Bilimsel Gösterim",
    "coverImage": "assets/flow/u02_uslu_ifadeler.jpg",
    "badgeCells": [
      "2¹",
      "2²",
      "2³",
      "2⁴",
      "3¹",
      "3²",
      "3³",
      "3⁴",
      "10¹",
      "10²",
      "10³",
      "aⁿ"
    ],
    "kazanimlar": [
      {
        "id": "k1",
        "no": 1,
        "title": "Tam Sayı Kuvvetleri ve Negatif Üs",
        "code": "M.8.1.2.1",
        "visual": "assets/flow/u02_uslu_ifadeler.jpg",
        "stops": [
          1,
          2,
          3,
          4,
          5
        ]
      },
      {
        "id": "k2",
        "no": 2,
        "title": "Üssün Üssü ve Sıralama",
        "code": "M.8.1.2.2",
        "visual": "assets/flow/u02_uslu_ifadeler.jpg",
        "stops": [
          6,
          7,
          8,
          9,
          10
        ]
      },
      {
        "id": "k3",
        "no": 3,
        "title": "Üslü İfadelerle Çarpma İşlemi",
        "code": "M.8.1.2.2",
        "visual": "assets/flow/u02_uslu_ifadeler.jpg",
        "stops": [
          11,
          12,
          13,
          14,
          15,
          16
        ]
      },
      {
        "id": "k4",
        "no": 4,
        "title": "Üslü İfadelerle Bölme İşlemi",
        "code": "M.8.1.2.3",
        "visual": "assets/flow/u02_uslu_ifadeler.jpg",
        "stops": [
          17,
          18,
          19,
          20,
          21,
          22
        ]
      },
      {
        "id": "k5",
        "no": 5,
        "title": "Ondalık Gösterimlerin Çözümlenmesi",
        "code": "M.8.1.2.4",
        "visual": "assets/flow/u02_uslu_ifadeler.jpg",
        "stops": [
          23,
          24,
          25,
          26
        ]
      },
      {
        "id": "k6",
        "no": 6,
        "title": "Bilimsel Gösterim ve LGS Görevleri",
        "code": "M.8.1.2.5",
        "visual": "assets/flow/u02_uslu_ifadeler.jpg",
        "stops": [
          27,
          28,
          29,
          30
        ]
      }
    ],
    "stops": [
      {
        "type": "concept",
        "icon": "💡",
        "typeLabel": "Örnek & Keşif",
        "title": "Negatif Üs ve İşaret Kuralları",
        "subtitle": "Negatif üs sayının işaretini değiştirmez; yalnızca tabanı ters çevirir (çarpmaya göre tersini alır).",
        "explanation": [
          "Sıfırdan farklı bir <strong>a</strong> tam sayısı için <strong>a⁻ⁿ = 1 / aⁿ</strong> eşitliği geçerlidir. Örneğin <strong>2⁻³ = 1 / 2³ = 1/8</strong> olur.",
          "Parantez içindeki negatif bir tam sayının <strong>çift kuvveti pozitif</strong>, <strong>tek kuvveti negatif</strong> olur: <strong>(−2)⁴ = +16</strong> iken parantezsiz <strong>−2⁴ = −16</strong>'dır!"
        ],
        "sentenceHtml": "2⁻³ üslü ifadesinin değeri {0} kesrine eşittir. (−3)² ifadesinin sonucu {1} iken, parantezsiz −3² ifadesinin sonucu {2} olur.",
        "blanks": [
          {
            "id": 0,
            "correct": "1/8",
            "choices": [
              "−8",
              "1/8",
              "−1/8"
            ]
          },
          {
            "id": 1,
            "correct": "+9",
            "choices": [
              "+9",
              "−9",
              "+6"
            ]
          },
          {
            "id": 2,
            "correct": "−9",
            "choices": [
              "+9",
              "−9",
              "1/9"
            ]
          }
        ],
        "primeStripDemo": [
          "2⁻¹ = 1/2",
          "2⁻² = 1/4",
          "2⁻³ = 1/8",
          "(−2)⁴ = +16",
          "(−2)³ = −8"
        ],
        "id": 1,
        "kazanimId": "k1"
      },
      {
        "type": "video",
        "icon": "🎬",
        "typeLabel": "Animasyonlu Anlatım",
        "title": "Parantezli ve Parantezsiz Kuvvet Farkı",
        "subtitle": "LGS'de en çok dikkat edilen işaret ve negatif üs adımlarını izleyelim.",
        "videoScene": "custom_steps",
        "steps": [
          {
            "text": "1. Adım: (−5)² ifadesinde çift üs parantezin dışındadır; (−5) × (−5) = +25 olur.",
            "draw": "s1"
          },
          {
            "text": "2. Adım: −5² ifadesinde ise 2 üssü sadece 5'in üzerindedir; sonuç −(5 × 5) = −25 olur.",
            "draw": "s2"
          },
          {
            "text": "3. Adım: (−2)⁻³ ifadesinde önce işaret belirlenir (tek üs ⇒ eksi), sonra ters çevrilir: −1/8.",
            "draw": "s3"
          },
          {
            "text": "4. Adım: Sıfırdan farklı her sayının 0. kuvveti 1'dir: (−19)⁰ = +1.",
            "draw": "s4"
          }
        ],
        "quickQuestion": "(−2)⁴ + (−2)³ işleminin sonucu kaçtır?",
        "quickChoices": [
          "16 + (−8) = 8",
          "−16 + (−8) = −24",
          "8 + (−6) = 2"
        ],
        "quickCorrect": "16 + (−8) = 8",
        "id": 2,
        "kazanimId": "k1"
      },
      {
        "type": "activity",
        "icon": "🧩",
        "typeLabel": "Etkileşimli Etkinlik",
        "title": "Üslü İfadelerin Değerlerini Eşleştir",
        "subtitle": "Turuncu kutulardaki üslü ifadelerin eşit olduğu değerleri alttan seç!",
        "activityMode": "rainbow_pairs",
        "targetNumber": 0,
        "sequence": [
          "3⁻² = ?",
          "(−4)² = ?",
          "5⁰ + 2⁻¹ = ?"
        ],
        "missingTargets": [
          {
            "index": 0,
            "answer": "1/9",
            "hint": "3⁻² = 1 / 3² = 1/9"
          },
          {
            "index": 1,
            "answer": "16",
            "hint": "(−4)×(−4) = +16"
          },
          {
            "index": 2,
            "answer": "3/2",
            "hint": "1 + 1/2 = 3/2"
          }
        ],
        "pool": [
          "−9",
          "1/9",
          "−16",
          "16",
          "3/2",
          "2"
        ],
        "id": 3,
        "kazanimId": "k1"
      },
      {
        "type": "game",
        "icon": "🎮",
        "typeLabel": "HTML5 Mini Oyun",
        "title": "Oyun: Kuvvet Laboratuvarı",
        "subtitle": "Negatif üs ve işaret tuzaklarına düşmeden 3 görevi tamamla!",
        "gameType": "final_marathon",
        "challenges": [
          {
            "q": "4⁻² üslü ifadesinin değeri hangisidir?",
            "choices": [
              "−8",
              "−1/16",
              "1/16"
            ],
            "ans": "1/16"
          },
          {
            "q": "(−1)¹⁰⁰ + (−1)⁹⁹ işleminin sonucu kaçtır?",
            "choices": [
              "−2",
              "0",
              "2"
            ],
            "ans": "0"
          },
          {
            "q": "1 / 27 kesri 3 tabanında nasıl yazılır?",
            "choices": [
              "3⁻³",
              "3³",
              "−3³"
            ],
            "ans": "3⁻³"
          }
        ],
        "id": 4,
        "kazanimId": "k1"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Kazanım Kontrol: Üslü Değer Hesabı",
        "subtitle": "Kazanım 1'i tamamlayıp yeşile döndürmek için bu LGS sorusunu çöz!",
        "stem": "<strong>a = −2</strong> ve <strong>b = 3</strong> olduğuna göre, <strong>aᵇ + bᵃ</strong> işleminin sonucu kaçtır?",
        "options": [
          {
            "letter": "A",
            "text": "−71 / 9"
          },
          {
            "letter": "B",
            "text": "−65 / 9"
          },
          {
            "letter": "C",
            "text": "65 / 9"
          },
          {
            "letter": "D",
            "text": "73 / 9"
          }
        ],
        "correctLetter": "A",
        "hint": "Harfli ifadelerde yerine koyarken mutlaka parantez kullan: aᵇ = (−2)³ = −8 ve bᵃ = 3⁻² = 1/9.",
        "solution": "aᵇ = (−2)³ = <strong>−8</strong> ve bᵃ = 3⁻² = <strong>1/9</strong> olur. Toplamları: −8 + 1/9 = (−72 + 1) / 9 = <strong>−71 / 9</strong> bulunur.",
        "id": 5,
        "kazanimId": "k1"
      },
      {
        "type": "concept",
        "icon": "💡",
        "typeLabel": "Örnek & Keşif",
        "title": "Üssün Üssü Kuralı: (aⁿ)ᵐ = aⁿ·ᵐ",
        "subtitle": "Bir üslü ifadenin tekrar kuvveti alınırken üsler birbiriyle çarpılır!",
        "explanation": [
          "Örneğin <strong>8⁴</strong> sayısını 2 tabanında yazmak için 8 yerine 2³ yazarız: <strong>8⁴ = (2³)⁴ = 2³ˣ⁴ = 2¹²</strong>.",
          "Sıralama yaparken ya <strong>tabanlar</strong> (2, 3, 5 gibi asal tabanlara dönüştürülerek) ya da <strong>üsler</strong> eşitlenir."
        ],
        "sentenceHtml": "16³ sayısı 2 tabanında (2⁴)³ = {0} olarak yazılır. 27⁻² sayısı ise 3 tabanında {1} ifadesine eşittir.",
        "blanks": [
          {
            "id": 0,
            "correct": "2¹²",
            "choices": [
              "2⁷",
              "2¹²",
              "2⁶⁴"
            ]
          },
          {
            "id": 1,
            "correct": "3⁻⁶",
            "choices": [
              "3⁻⁵",
              "3⁻⁶",
              "3⁶"
            ]
          }
        ],
        "primeStripDemo": [
          "4 = 2²",
          "8 = 2³",
          "16 = 2⁴",
          "32 = 2⁵",
          "27 = 3³",
          "81 = 3⁴"
        ],
        "id": 6,
        "kazanimId": "k2"
      },
      {
        "type": "activity",
        "icon": "🧩",
        "typeLabel": "Etkileşimli Etkinlik",
        "title": "Taban Dönüştürme Atölyesi",
        "subtitle": "Verilen sayıları en küçük asal tabanda üssün üssü kuralıyla tamamla!",
        "activityMode": "rainbow_pairs",
        "targetNumber": 0,
        "sequence": [
          "9⁵ = 3^?",
          "25⁴ = 5^?",
          "32³ = 2^?"
        ],
        "missingTargets": [
          {
            "index": 0,
            "answer": 10,
            "hint": "9⁵ = (3²)⁵ = 3¹⁰"
          },
          {
            "index": 1,
            "answer": 8,
            "hint": "25⁴ = (5²)⁴ = 5⁸"
          },
          {
            "index": 2,
            "answer": 15,
            "hint": "32³ = (2⁵)³ = 2¹⁵"
          }
        ],
        "pool": [
          6,
          7,
          8,
          10,
          12,
          15
        ],
        "id": 7,
        "kazanimId": "k2"
      },
      {
        "type": "video",
        "icon": "🎬",
        "typeLabel": "Animasyonlu Anlatım",
        "title": "Büyük Üslü Sayıları Sıralama Tekniği",
        "subtitle": "Tabanları ve üsleri farklı olan sayıları nasıl karşılaştırırız?",
        "videoScene": "custom_steps",
        "steps": [
          {
            "text": "1. Yöntem (Taban Eşitleme): 4⁶, 8⁵ ve 16³ sayılarını 2 tabanında yazarız: 2¹², 2¹⁵ ve 2¹².",
            "draw": "s1"
          },
          {
            "text": "2. Yöntem (Üs Eşitleme): 2⁶⁰, 3⁴⁰ ve 5²⁰ sayılarında üslerin EBOB'u 20'dir.",
            "draw": "s2"
          },
          {
            "text": "3. Adım: (2³)²⁰ = 8²⁰, (3²)²⁰ = 9²⁰ ve 5²⁰ şeklinde yazılır.",
            "draw": "s3"
          },
          {
            "text": "4. Sonuç: Üsler 20'de eşitlendiği için tabanı büyük olan büyüktür: 5²⁰ < 8²⁰ < 9²⁰!",
            "draw": "s4"
          }
        ],
        "quickQuestion": "2³⁰, 3²⁰ ve 5¹⁰ sayılarının doğru sıralanışı hangisidir?",
        "quickChoices": [
          "5¹⁰ < 2³⁰ < 3²⁰",
          "2³⁰ < 3²⁰ < 5¹⁰",
          "3²⁰ < 2³⁰ < 5¹⁰"
        ],
        "quickCorrect": "5¹⁰ < 2³⁰ < 3²⁰",
        "id": 8,
        "kazanimId": "k2"
      },
      {
        "type": "game",
        "icon": "🎮",
        "typeLabel": "HTML5 Mini Oyun",
        "title": "Oyun: Üs Dönüştürücü",
        "subtitle": "Üssün üssü kuralını kullanarak eşdeğer ifadeleri yakala!",
        "gameType": "final_marathon",
        "challenges": [
          {
            "q": "125⁻² ifadesinin 5 tabanındaki eşiti nedir?",
            "choices": [
              "5⁻⁵",
              "5⁻⁶",
              "5⁶"
            ],
            "ans": "5⁻⁶"
          },
          {
            "q": "Hangisi 64² sayısına eşittir?",
            "choices": [
              "2⁸",
              "2¹²",
              "4⁸"
            ],
            "ans": "2¹²"
          },
          {
            "q": "(−3²)³ işleminin sonucu hangisidir?",
            "choices": [
              "3⁶",
              "−3⁵",
              "−3⁶"
            ],
            "ans": "−3⁶"
          }
        ],
        "id": 9,
        "kazanimId": "k2"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Kazanım Kontrol: Üslü Denklem",
        "subtitle": "Kazanım 2'yi yeşile döndürmek için taban eşitleme sorusunu çöz!",
        "stem": "<strong>8ˣ⁺¹ = 4ˣ⁺⁴</strong> eşitliğini sağlayan <strong>x</strong> tam sayısı kaçtır?",
        "options": [
          {
            "letter": "A",
            "text": "3"
          },
          {
            "letter": "B",
            "text": "4"
          },
          {
            "letter": "C",
            "text": "5"
          },
          {
            "letter": "D",
            "text": "6"
          }
        ],
        "correctLetter": "C",
        "hint": "8 = 2³ ve 4 = 2² yazarak iki tarafı da 2 tabanında eşitle: 2^(3x+3) = 2^(2x+8).",
        "solution": "8ˣ⁺¹ = (2³)ˣ⁺¹ = <strong>2³ˣ⁺³</strong> ve 4ˣ⁺⁴ = (2²)ˣ⁺⁴ = <strong>2²ˣ⁺⁸</strong> olur. Tabanlar eşit olduğundan 3x + 3 = 2x + 8 ⇒ <strong>x = 5</strong> bulunur.",
        "id": 10,
        "kazanimId": "k2"
      },
      {
        "type": "concept",
        "icon": "💡",
        "typeLabel": "Örnek & Keşif",
        "title": "Çarpma Kuralı: Tabanlar Aynıysa Üsler Toplanır",
        "subtitle": "Üsler aynıysa tabanlar çarpılır: aˣ · bˣ = (a · b)ˣ",
        "explanation": [
          "Tabanları aynı olan üslü ifadeler çarpılırken üsler toplanır: <strong>2⁵ · 2³ = 2⁵⁺³ = 2⁸</strong>.",
          "Üsleri aynı olan ifadeler çarpılırken ise tabanlar çarpılıp ortak üs yazılır: <strong>2⁷ · 5⁷ = (2 · 5)⁷ = 10⁷</strong> (Sondan 7 basamağı sıfırdır!)."
        ],
        "sentenceHtml": "3⁴ · 3⁻⁶ işleminin sonucu {0} olurken, 2⁶ · 5⁶ çarpımının sonucu {1} sayısına eşittir.",
        "blanks": [
          {
            "id": 0,
            "correct": "3⁻²",
            "choices": [
              "3¹⁰",
              "3⁻²",
              "9⁻²"
            ]
          },
          {
            "id": 1,
            "correct": "10⁶",
            "choices": [
              "7⁶",
              "10⁶",
              "10¹²"
            ]
          }
        ],
        "id": 11,
        "kazanimId": "k3"
      },
      {
        "type": "video",
        "icon": "🎬",
        "typeLabel": "Animasyonlu Anlatım",
        "title": "Kaç Basamaklıdır? (2 ve 5 Kuvvetlerini Eşleştirme)",
        "subtitle": "Bir çarpımın sonunda kaç sıfır olduğunu 10ⁿ elde ederek bulalım.",
        "videoScene": "custom_steps",
        "steps": [
          {
            "text": "1. Adım: 10ⁿ sayısı 1'in yanına n tane sıfır demektir ve (n + 1) basamaklıdır.",
            "draw": "s1"
          },
          {
            "text": "2. Adım: Örneğin 8⁴ · 25⁵ çarpımında önce asal tabanlara geçeriz: (2³)⁴ · (5²)⁵ = 2¹² · 5¹⁰.",
            "draw": "s2"
          },
          {
            "text": "3. Adım: Büyük üssü parçalarız: 2² · 2¹⁰ · 5¹⁰ = 4 · (2 · 5)¹⁰ = 4 · 10¹⁰.",
            "draw": "s3"
          },
          {
            "text": "4. Sonuç: 4'ün yanına 10 tane sıfır gelir; sayı toplam 1 + 10 = 11 basamaklıdır!",
            "draw": "s4"
          }
        ],
        "quickQuestion": "7 · 10⁸ sayısı kaç basamaklı bir doğal sayıdır?",
        "quickChoices": [
          "8 basamaklı",
          "9 basamaklı",
          "15 basamaklı"
        ],
        "quickCorrect": "9 basamaklı",
        "id": 12,
        "kazanimId": "k3"
      },
      {
        "type": "activity",
        "icon": "🧩",
        "typeLabel": "Etkileşimli Etkinlik",
        "title": "Çarpım Tablosunu Tamamla",
        "subtitle": "Verilen üslü çarpımların üslerini doğru hesapla!",
        "activityMode": "rainbow_pairs",
        "targetNumber": 0,
        "sequence": [
          "5⁷ · 5⁻³ = 5^?",
          "4³ · 2⁵ = 2^?",
          "3⁴ · 2⁴ = 6^?"
        ],
        "missingTargets": [
          {
            "index": 0,
            "answer": 4,
            "hint": "7 + (−3) = 4"
          },
          {
            "index": 1,
            "answer": 11,
            "hint": "4³ = 2⁶ ve 2⁶ · 2⁵ = 2¹¹"
          },
          {
            "index": 2,
            "answer": 4,
            "hint": "Üsler aynıysa ortak üs 4 kalır"
          }
        ],
        "pool": [
          2,
          4,
          8,
          10,
          11,
          16
        ],
        "id": 13,
        "kazanimId": "k3"
      },
      {
        "type": "game",
        "icon": "🎮",
        "typeLabel": "HTML5 Mini Oyun",
        "title": "Oyun: Çarpım Sentezleyici",
        "subtitle": "Üslü çarpma kurallarını kullanarak doğru sonucu bul!",
        "gameType": "final_marathon",
        "challenges": [
          {
            "q": "2⁵ sayısının 4 katı aşağıdakilerden hangisidir?",
            "choices": [
              "2⁶",
              "2⁷",
              "8⁵"
            ],
            "ans": "2⁷"
          },
          {
            "q": "3⁴ + 3⁴ + 3⁴ toplamının sonucu nedir?",
            "choices": [
              "3⁵",
              "3¹²",
              "9⁴"
            ],
            "ans": "3⁵"
          },
          {
            "q": "2⁸ · 5⁸ çarpımı kaç basamaklıdır?",
            "choices": [
              "8",
              "9",
              "16"
            ],
            "ans": "9"
          }
        ],
        "id": 14,
        "kazanimId": "k3"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Dikdörtgen Alanı ve Üslü Çarpma",
        "subtitle": "Kenar uzunlukları üslü ifade olan şeklin alanını hesapla!",
        "stem": "Kısa kenarı <strong>4⁴ cm</strong>, uzun kenarı <strong>8³ cm</strong> olan dikdörtgen şeklindeki bir kartonun alanı kaç cm²'dir?",
        "options": [
          {
            "letter": "A",
            "text": "2¹⁴"
          },
          {
            "letter": "B",
            "text": "2¹⁷"
          },
          {
            "letter": "C",
            "text": "2²⁰"
          },
          {
            "letter": "D",
            "text": "32⁷"
          }
        ],
        "correctLetter": "B",
        "hint": "4⁴ = (2²)⁴ = 2⁸ ve 8³ = (2³)³ = 2⁹ yazıp çarp!",
        "solution": "Alan = Kısa Kenar × Uzun Kenar = 4⁴ · 8³ = (2²)⁴ · (2³)³ = 2⁸ · 2⁹ = <strong>2¹⁷ cm²</strong> bulunur.",
        "id": 15,
        "kazanimId": "k3"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Kazanım Kontrol: Üslü Toplama ve Çarpma",
        "subtitle": "Kazanım 3'ü tamamlayıp yeşile çevirmek için bu soruyu çöz!",
        "stem": "Her birinde <strong>8³ adet</strong> buğday tanesi bulunan <strong>4 tane</strong> çuvaldaki toplam buğday sayısı kaçtır?",
        "options": [
          {
            "letter": "A",
            "text": "2¹⁰"
          },
          {
            "letter": "B",
            "text": "2¹¹"
          },
          {
            "letter": "C",
            "text": "2¹²"
          },
          {
            "letter": "D",
            "text": "32³"
          }
        ],
        "correctLetter": "B",
        "hint": "4 çuval × 8³ tane = 2² · (2³)³ işlemini yap.",
        "solution": "Toplam buğday = 4 × 8³ = 2² × (2³)³ = 2² × 2⁹ = <strong>2¹¹ adet</strong> bulunur.",
        "id": 16,
        "kazanimId": "k3"
      },
      {
        "type": "concept",
        "icon": "💡",
        "typeLabel": "Örnek & Keşif",
        "title": "Bölme Kuralı: Payın Üssünden Paydanın Üssü Çıkarılır",
        "subtitle": "Negatif üslü bir ifadeyi bölerken eksi ile eksinin yan yana gelip artı olduğuna dikkat et!",
        "explanation": [
          "Tabanları aynı olan üslü ifadelerde bölme yapılırken payın üssünden paydanın üssü çıkarılır: <strong>aˣ / aʸ = aˣ⁻ʸ</strong>.",
          "Çok önemli tuzak: <strong>2⁷ / 2⁻³ = 2⁷⁻⁽⁻³⁾ = 2⁷⁺³ = 2¹⁰</strong> olur! Paydadaki negatif üs yukarıya pozitif olarak çıkar."
        ],
        "sentenceHtml": "5⁸ / 5² işleminin sonucu {0} iken, 3⁴ / 3⁻² işleminin sonucu {1} olur.",
        "blanks": [
          {
            "id": 0,
            "correct": "5⁶",
            "choices": [
              "5⁴",
              "5⁶",
              "5¹⁰"
            ]
          },
          {
            "id": 1,
            "correct": "3⁶",
            "choices": [
              "3²",
              "3⁶",
              "3⁻⁸"
            ]
          }
        ],
        "id": 17,
        "kazanimId": "k4"
      },
      {
        "type": "video",
        "icon": "🎬",
        "typeLabel": "Animasyonlu Anlatım",
        "title": "Yarısı ve Çeyreği Sorularında Pratik Yol",
        "subtitle": "Bir üslü sayının yarısı 2'ye, çeyreği 4'e (2²'ye) bölünmesi demektir!",
        "videoScene": "custom_steps",
        "steps": [
          {
            "text": "1. Adım: 2¹⁰ sayısının yarısını bulurken üssü ikiye bölmeyiz! 2¹⁰ ÷ 2¹ = 2⁹ yaparız.",
            "draw": "s1"
          },
          {
            "text": "2. Adım: 4⁸ sayısının çeyreği: 4⁸ ÷ 4¹ = 4⁷ (veya 2¹⁶ ÷ 2² = 2¹⁴) olur.",
            "draw": "s2"
          },
          {
            "text": "3. Adım: 27⁴ sayısının üçte biri: (3³)⁴ ÷ 3¹ = 3¹² ÷ 3¹ = 3¹¹ olur.",
            "draw": "s3"
          }
        ],
        "quickQuestion": "2¹⁶ sayısının yarısı aşağıdakilerden hangisidir?",
        "quickChoices": [
          "2⁸",
          "2¹⁵",
          "1¹⁶"
        ],
        "quickCorrect": "2¹⁵",
        "id": 18,
        "kazanimId": "k4"
      },
      {
        "type": "activity",
        "icon": "🧩",
        "typeLabel": "Etkileşimli Sınıflama",
        "title": "Sonuç 2⁸ mi, Yoksa 2¹² mi?",
        "subtitle": "Verilen bölme ve çarpma işlemlerinin sonucunu doğru grupla!",
        "activityMode": "custom_sort",
        "sortChoices": [
          "Sonuç: 2⁸",
          "Sonuç: 2¹²"
        ],
        "items": [
          {
            "text": "2¹⁰ ÷ 2²",
            "answer": "Sonuç: 2⁸"
          },
          {
            "text": "2⁹ ÷ 2⁻³",
            "answer": "Sonuç: 2¹²"
          },
          {
            "text": "4⁶",
            "answer": "Sonuç: 2¹²"
          },
          {
            "text": "16³ ÷ 2⁴",
            "answer": "Sonuç: 2⁸"
          }
        ],
        "id": 19,
        "kazanimId": "k4"
      },
      {
        "type": "game",
        "icon": "🎮",
        "typeLabel": "HTML5 Mini Oyun",
        "title": "Oyun: Bölme Ustası",
        "subtitle": "Pay ve paydadaki üsleri hatasız sadeleştir!",
        "gameType": "final_marathon",
        "challenges": [
          {
            "q": "10⁶ ÷ 10⁻⁴ işleminin sonucu kaçtır?",
            "choices": [
              "10²",
              "10¹⁰",
              "10⁻²"
            ],
            "ans": "10¹⁰"
          },
          {
            "q": "12⁵ ÷ 6⁵ işleminin sonucu hangisidir?",
            "choices": [
              "2⁰",
              "2⁵",
              "6⁵"
            ],
            "ans": "2⁵"
          },
          {
            "q": "8⁴ sayısının çeyreği kaçtır?",
            "choices": [
              "2¹⁰",
              "2¹¹",
              "2¹²"
            ],
            "ans": "2¹⁰"
          }
        ],
        "id": 20,
        "kazanimId": "k4"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Paylaştırma Problemi",
        "subtitle": "Toplam miktarı kişi veya paket sayısına bölerek sonucu bul.",
        "stem": "Toplam <strong>9⁶ kg</strong> fındık, her biri <strong>27² kg</strong> fındık alan çuvallara hiç artmayacak şekilde doldurulacaktır. Bu iş için kaç çuval gerekir?",
        "options": [
          {
            "letter": "A",
            "text": "3⁴"
          },
          {
            "letter": "B",
            "text": "3⁶"
          },
          {
            "letter": "C",
            "text": "3⁸"
          },
          {
            "letter": "D",
            "text": "3¹²"
          }
        ],
        "correctLetter": "B",
        "hint": "9⁶ = (3²)⁶ = 3¹² ve 27² = (3³)² = 3⁶ yazıp 3¹² ÷ 3⁶ işlemini yap.",
        "solution": "Çuval sayısı = Toplam Fındık ÷ 1 Çuval = 9⁶ ÷ 27² = (3²)⁶ ÷ (3³)² = 3¹² ÷ 3⁶ = <strong>3⁶ çuval</strong> bulunur.",
        "id": 21,
        "kazanimId": "k4"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Kazanım Kontrol: Karma Üslü İşlem",
        "subtitle": "Kazanım 4'ü tamamlayıp yeşile çevirmek için bu soruyu çöz!",
        "stem": "<strong>(25⁴ · 5⁻²) / 5⁻³</strong> işleminin sonucu aşağıdakilerden hangisidir?",
        "options": [
          {
            "letter": "A",
            "text": "5³"
          },
          {
            "letter": "B",
            "text": "5⁶"
          },
          {
            "letter": "C",
            "text": "5⁹"
          },
          {
            "letter": "D",
            "text": "5¹¹"
          }
        ],
        "correctLetter": "C",
        "hint": "Pay: (5²)⁴ · 5⁻² = 5⁸ · 5⁻² = 5⁶. Sonra 5⁶ ÷ 5⁻³ = 5^(6 − (−3)) yap!",
        "solution": "25⁴ = (5²)⁴ = 5⁸ olduğundan pay = 5⁸ · 5⁻² = <strong>5⁶</strong> olur. 5⁶ ÷ 5⁻³ = 5⁶⁻⁽⁻³⁾ = <strong>5⁹</strong> bulunur.",
        "id": 22,
        "kazanimId": "k4"
      },
      {
        "type": "concept",
        "icon": "💡",
        "typeLabel": "Örnek & Keşif",
        "title": "10'un Tam Sayı Kuvvetleriyle Çözümleme",
        "subtitle": "Virgülün solunda 10⁰, 10¹, 10²... sağında ise 10⁻¹, 10⁻², 10⁻³... basamakları yer alır.",
        "explanation": [
          "Bir ondalık sayıda tam kısmın birler basamağı <strong>10⁰</strong>, onlar basamağı <strong>10¹</strong>, yüzler basamağı <strong>10²</strong> ile çarpılır.",
          "Ondalık kısımda ise onda birler basamağı <strong>10⁻¹</strong>, yüzde birler <strong>10⁻²</strong>, binde birler <strong>10⁻³</strong> ile çarpılır. Eksik olan kuvvetlerin basamağına <strong>0 (sıfır)</strong> yazılır!"
        ],
        "sentenceHtml": "40,07 sayısının çözümlenmiş biçimi 4·10¹ + 7·{0} şeklindedir. 3·10² + 5·10⁰ + 2·10⁻³ sayısı ise {1} olarak yazılır.",
        "blanks": [
          {
            "id": 0,
            "correct": "10⁻²",
            "choices": [
              "10⁻¹",
              "10⁻²",
              "10⁻³"
            ]
          },
          {
            "id": 1,
            "correct": "305,002",
            "choices": [
              "35,02",
              "305,02",
              "305,002"
            ]
          }
        ],
        "id": 23,
        "kazanimId": "k5"
      },
      {
        "type": "activity",
        "icon": "🧩",
        "typeLabel": "Etkileşimli Etkinlik",
        "title": "Basamak Kuvvetlerini Tamamla",
        "subtitle": "708,405 sayısının çözümlenmesindeki eksik 10 kuvvetlerini seç!",
        "activityMode": "rainbow_pairs",
        "targetNumber": 0,
        "sequence": [
          "7·10^?",
          "8·10^?",
          "4·10⁻¹ + 5·10^?"
        ],
        "missingTargets": [
          {
            "index": 0,
            "answer": 2,
            "hint": "Yüzler basamağı 10²'dir."
          },
          {
            "index": 1,
            "answer": 0,
            "hint": "Birler basamağı 10⁰'dır."
          },
          {
            "index": 2,
            "answer": -3,
            "hint": "Binde birler basamağı 10⁻³'tür."
          }
        ],
        "pool": [
          2,
          1,
          0,
          -1,
          -2,
          -3
        ],
        "id": 24,
        "kazanimId": "k5"
      },
      {
        "type": "game",
        "icon": "🎮",
        "typeLabel": "HTML5 Mini Oyun",
        "title": "Oyun: Çözümleme Dedektifi",
        "subtitle": "Eksik basamaklardaki sıfırları kaçırmadan ondalık sayıyı bul!",
        "gameType": "final_marathon",
        "challenges": [
          {
            "q": "6·10² + 4·10⁻¹ + 9·10⁻³ sayısı hangisidir?",
            "choices": [
              "60,409",
              "600,409",
              "600,49"
            ],
            "ans": "600,409"
          },
          {
            "q": "204,08 sayısında 8 rakamının basamak değeri nedir?",
            "choices": [
              "8·10⁻¹",
              "8·10⁻²",
              "8·10⁻³"
            ],
            "ans": "8·10⁻²"
          },
          {
            "q": "5·10¹ + 3·10⁰ + 2·10⁻² ile 4·10⁰ + 8·10⁻² toplamı kaçtır?",
            "choices": [
              "57,1",
              "57,01",
              "54,1"
            ],
            "ans": "57,1"
          }
        ],
        "id": 25,
        "kazanimId": "k5"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Kazanım Kontrol: Tartı ve Çözümleme",
        "subtitle": "Kazanım 5'i yeşile çevirmek için bu LGS klasiğini çöz!",
        "stem": "Bir markette alınan elmanın kütlesi <strong>2·10⁰ + 4·10⁻¹ + 5·10⁻² kg</strong>, portakalın kütlesi ise <strong>1·10⁰ + 5·10⁻¹ + 5·10⁻² kg</strong>'dır. İkisinin toplam kütlesi kaç kg'dır?",
        "options": [
          {
            "letter": "A",
            "text": "3,9 kg"
          },
          {
            "letter": "B",
            "text": "4 kg"
          },
          {
            "letter": "C",
            "text": "4,05 kg"
          },
          {
            "letter": "D",
            "text": "4,1 kg"
          }
        ],
        "correctLetter": "B",
        "hint": "Elma = 2,45 kg ve Portakal = 1,55 kg. İkisini topla!",
        "solution": "Elma = <strong>2,45 kg</strong>, Portakal = <strong>1,55 kg</strong>'dır. Toplam kütle = 2,45 + 1,55 = <strong>4,00 = 4 kg</strong> bulunur.",
        "id": 26,
        "kazanimId": "k5"
      },
      {
        "type": "activity",
        "icon": "🧩",
        "typeLabel": "Etkileşimli Sınıflama",
        "title": "Bilimsel Gösterim mi, Değil mi?",
        "subtitle": "Kural: a × 10ⁿ ifadesinde 1 ≤ |a| < 10 olmalıdır (a sayısı 1 olabilir ama 10 olamaz!).",
        "activityMode": "custom_sort",
        "sortChoices": [
          "Bilimsel Gösterim",
          "Değil"
        ],
        "items": [
          {
            "text": "3,45 × 10⁸ (1 ≤ 3,45 < 10)",
            "answer": "Bilimsel Gösterim"
          },
          {
            "text": "0,72 × 10⁻⁵ (0,72 sayısı 1'den küçüktür)",
            "answer": "Değil"
          },
          {
            "text": "1 × 10⁻¹² (1 sayısı kurala dahildir)",
            "answer": "Bilimsel Gösterim"
          },
          {
            "text": "12,4 × 10⁶ (12,4 sayısı 10'dan büyüktür)",
            "answer": "Değil"
          }
        ],
        "id": 27,
        "kazanimId": "k6"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "LGS Yeni Nesil 1: Virgül Kaydırma",
        "subtitle": "Katsayı küçülürse 10'un üssü büyür; katsayı büyürse 10'un üssü küçülür!",
        "stem": "<strong>0,00045 × 10¹¹</strong> sayısının <strong>bilimsel gösterimi</strong> aşağıdakilerden hangisidir?",
        "options": [
          {
            "letter": "A",
            "text": "4,5 × 10⁶"
          },
          {
            "letter": "B",
            "text": "4,5 × 10⁷"
          },
          {
            "letter": "C",
            "text": "45 × 10⁶"
          },
          {
            "letter": "D",
            "text": "4,5 × 10¹⁵"
          }
        ],
        "correctLetter": "B",
        "hint": "0,00045 sayısını 4,5 yapmak için virgül 4 basamak sağa kayar (sayı 4 basamak büyür), üs 4 azalır: 11 − 4 = 7.",
        "solution": "Katsayıyı 1 ile 10 arasına getirmek için virgülü 4 basamak sağa kaydırırız (4,5 olur). Katsayı 4 basamak büyüdüğü için üs 4 azalır: 11 − 4 = 7 ⇒ <strong>4,5 × 10⁷</strong>.",
        "id": 28,
        "kazanimId": "k6"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "LGS Yeni Nesil 2: Geri Dönüşüm ve Bilimsel Gösterim",
        "subtitle": "Birim dönüşümüne (ton → kg → gram) dikkat ederek bilimsel gösterimi bul.",
        "stem": "1 ton kullanılmış kâğıdın geri dönüşümüyle <strong>17 ağaç</strong> kurtarılmaktadır. <strong>2000 ton</strong> kâğıt geri dönüştürüldüğünde kurtarılan ağaç sayısının bilimsel gösterimi nedir?",
        "options": [
          {
            "letter": "A",
            "text": "3,4 × 10³"
          },
          {
            "letter": "B",
            "text": "3,4 × 10⁴"
          },
          {
            "letter": "C",
            "text": "34 × 10³"
          },
          {
            "letter": "D",
            "text": "1,7 × 10⁴"
          }
        ],
        "correctLetter": "B",
        "hint": "2000 × 17 = 34.000 ağaçtır. 34.000 sayısını 3,4 × 10⁴ olarak yaz!",
        "solution": "Toplam ağaç sayısı = 2000 × 17 = <strong>34.000</strong> = 34 × 10³ = <strong>3,4 × 10⁴</strong> olarak bilimsel gösterilir.",
        "id": 29,
        "kazanimId": "k6"
      },
      {
        "type": "game",
        "icon": "🏆",
        "typeLabel": "Final Maratonu",
        "title": "Final: Üslü İfadeler Şampiyonluk Etabı",
        "subtitle": "Son 3 hızlı görevi tamamla ve 2. Üniteyi tamamen YEŞİLE döndür!",
        "gameType": "final_marathon",
        "challenges": [
          {
            "q": "8⁴ ÷ 2⁵ işleminin sonucu kaçtır?",
            "choices": [
              "2⁷",
              "2⁸",
              "2⁹"
            ],
            "ans": "2⁷"
          },
          {
            "q": "75.000.000 sayısının bilimsel gösterimi nedir?",
            "choices": [
              "7,5 × 10⁶",
              "7,5 × 10⁷",
              "75 × 10⁶"
            ],
            "ans": "7,5 × 10⁷"
          },
          {
            "q": "(−3)⁻² ifadesinin değeri kaçtır?",
            "choices": [
              "−1/9",
              "1/9",
              "−6"
            ],
            "ans": "1/9"
          }
        ],
        "id": 30,
        "kazanimId": "k6"
      }
    ]
  },
  {
    "id": "m8-u3-karekoklu-ifadeler",
    "grade": 8,
    "unitNo": 3,
    "title": "Kareköklü İfadeler",
    "subtitle": "Tam Kare Sayılar, Yaklaşık Değer, a√b, Dört İşlem ve Gerçek Sayılar",
    "coverImage": "assets/flow/u03_karekoklu_ifadeler.jpg",
    "badgeCells": [
      "√1",
      "√4",
      "√9",
      "√16",
      "√25",
      "√36",
      "√49",
      "√64",
      "√81",
      "√100",
      "√121",
      "a√b"
    ],
    "kazanimlar": [
      {
        "id": "k1",
        "no": 1,
        "title": "Tam Kare Sayılar ve Karekök Alma",
        "code": "M.8.1.3.1",
        "visual": "assets/flow/u03_karekoklu_ifadeler.jpg",
        "stops": [
          1,
          2,
          3,
          4,
          5
        ]
      },
      {
        "id": "k2",
        "no": 2,
        "title": "Tam Kare Olmayan Sayıların Tahmini",
        "code": "M.8.1.3.2",
        "visual": "assets/flow/u03_karekoklu_ifadeler.jpg",
        "stops": [
          6,
          7,
          8,
          9,
          10
        ]
      },
      {
        "id": "k3",
        "no": 3,
        "title": "a√b Biçiminde Yazma ve Sıralama",
        "code": "M.8.1.3.3",
        "visual": "assets/flow/u03_karekoklu_ifadeler.jpg",
        "stops": [
          11,
          12,
          13,
          14,
          15,
          16
        ]
      },
      {
        "id": "k4",
        "no": 4,
        "title": "Kareköklü Çarpma, Bölme ve Doğal Sayı Yapan Çarpan",
        "code": "M.8.1.3.4",
        "visual": "assets/flow/u03_karekoklu_ifadeler.jpg",
        "stops": [
          17,
          18,
          19,
          20,
          21,
          22
        ]
      },
      {
        "id": "k5",
        "no": 5,
        "title": "Toplama-Çıkarma ve Ondalık Karekök",
        "code": "M.8.1.3.5",
        "visual": "assets/flow/u03_karekoklu_ifadeler.jpg",
        "stops": [
          23,
          24,
          25,
          26
        ]
      },
      {
        "id": "k6",
        "no": 6,
        "title": "Gerçek Sayılar ve LGS Bağlam Görevleri",
        "code": "M.8.1.3.7",
        "visual": "assets/flow/u03_karekoklu_ifadeler.jpg",
        "stops": [
          27,
          28,
          29,
          30
        ]
      }
    ],
    "stops": [
      {
        "type": "concept",
        "icon": "💡",
        "typeLabel": "Örnek & Keşif",
        "title": "Alanı Verilen Karenin Bir Kenarını Bulma",
        "subtitle": "Bir tam sayının karesi olan pozitif sayılara tam kare sayılar denir (1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225...).",
        "explanation": [
          "Alanı <strong>25 cm²</strong> olan bir karenin bir kenar uzunluğu <strong>√25 = 5 cm</strong>'dir. Karekök alma işlemi, karesini alma işleminin tersidir.",
          "Karekök dışına hiçbir zaman negatif sayı çıkmaz: <strong>√(−4)² = √16 = 4</strong> olur."
        ],
        "sentenceHtml": "Alanı 144 br² olan bir karenin bir kenar uzunluğu √144 = {0} birimdir. √81 + √64 işleminin sonucu ise {1} sayısına eşittir.",
        "blanks": [
          {
            "id": 0,
            "correct": "12",
            "choices": [
              "11",
              "12",
              "14"
            ]
          },
          {
            "id": 1,
            "correct": "17",
            "choices": [
              "15",
              "17",
              "145"
            ]
          }
        ],
        "primeStripDemo": [
          "√1=1",
          "√4=2",
          "√9=3",
          "√16=4",
          "√25=5",
          "√36=6",
          "√49=7",
          "√64=8",
          "√81=9",
          "√100=10"
        ],
        "id": 1,
        "kazanimId": "k1"
      },
      {
        "type": "video",
        "icon": "🎬",
        "typeLabel": "Animasyonlu Anlatım",
        "title": "İç İçe Kökler ve Tam Kare Kuleleri",
        "subtitle": "İç içe kareköklerde işlem en içteki kökten dışarıya doğru yapılır!",
        "videoScene": "custom_steps",
        "steps": [
          {
            "text": "1. Adım: √(13 + √9) ifadesinde önce en içteki √9 = 3 olarak dışarı çıkar.",
            "draw": "s1"
          },
          {
            "text": "2. Adım: İçeride 13 + 3 = 16 kalır ve √16 = 4 olarak sonuç bulunur.",
            "draw": "s2"
          },
          {
            "text": "3. Adım: 1'den 400'e kadar olan tam kare sayıları (1²=1 ... 20²=400) tanımak LGS'de büyük hız kazandırır!",
            "draw": "s3"
          }
        ],
        "quickQuestion": "√(21 + √16) işleminin sonucu kaçtır?",
        "quickChoices": [
          "4",
          "5",
          "6"
        ],
        "quickCorrect": "5",
        "id": 2,
        "kazanimId": "k1"
      },
      {
        "type": "activity",
        "icon": "🧩",
        "typeLabel": "Etkileşimli Etkinlik",
        "title": "Tam Kare Köprülerini Tamamla",
        "subtitle": "Kareköklerin dışarıya çıkan tam sayı değerlerini seç!",
        "activityMode": "rainbow_pairs",
        "targetNumber": 0,
        "sequence": [
          "√169 = ?",
          "√225 = ?",
          "√289 = ?"
        ],
        "missingTargets": [
          {
            "index": 0,
            "answer": 13,
            "hint": "13 × 13 = 169"
          },
          {
            "index": 1,
            "answer": 15,
            "hint": "15 × 15 = 225"
          },
          {
            "index": 2,
            "answer": 17,
            "hint": "17 × 17 = 289"
          }
        ],
        "pool": [
          12,
          13,
          14,
          15,
          16,
          17
        ],
        "id": 3,
        "kazanimId": "k1"
      },
      {
        "type": "game",
        "icon": "🎮",
        "typeLabel": "HTML5 Mini Oyun",
        "title": "Oyun: Tam Kare Avcısı",
        "subtitle": "Verilen kareköklü işlemleri hızlıca hesapla!",
        "gameType": "final_marathon",
        "challenges": [
          {
            "q": "√196 − √121 işleminin sonucu kaçtır?",
            "choices": [
              "2",
              "3",
              "4"
            ],
            "ans": "3"
          },
          {
            "q": "Alanı 324 cm² olan karenin bir kenarı kaç cm'dir?",
            "choices": [
              "16",
              "18",
              "22"
            ],
            "ans": "18"
          },
          {
            "q": "100 ile 200 arasında kaç tane tam kare doğal sayı vardır?",
            "choices": [
              "3",
              "4",
              "5"
            ],
            "ans": "3"
          }
        ],
        "id": 4,
        "kazanimId": "k1"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Kazanım Kontrol: Bitişik İki Kare",
        "subtitle": "Kazanım 1'i yeşile çevirmek için şekil çevresi sorusunu çöz!",
        "stem": "Alanları <strong>64 cm²</strong> ve <strong>25 cm²</strong> olan iki kare birer kenarları çakışacak biçimde yan yana konuluyor. Oluşan şeklin taban uzunluğu toplam kaç cm olur?",
        "options": [
          {
            "letter": "A",
            "text": "11 cm"
          },
          {
            "letter": "B",
            "text": "13 cm"
          },
          {
            "letter": "C",
            "text": "15 cm"
          },
          {
            "letter": "D",
            "text": "89 cm"
          }
        ],
        "correctLetter": "B",
        "hint": "Birinci karenin kenarı √64 = 8 cm, ikinci karenin kenarı √25 = 5 cm'dir.",
        "solution": "Büyük karenin bir kenarı √64 = <strong>8 cm</strong>, küçük karenin bir kenarı √25 = <strong>5 cm</strong>'dir. Yan yana geldiklerinde taban uzunluğu = 8 + 5 = <strong>13 cm</strong> olur.",
        "id": 5,
        "kazanimId": "k1"
      },
      {
        "type": "concept",
        "icon": "💡",
        "typeLabel": "Örnek & Keşif",
        "title": "Sayı Doğrusunda Hangi İki Tam Sayı Arasında?",
        "subtitle": "Tam kare olmayan bir kareköklü sayının değerini bulmak için altındaki ve üstündeki en yakın tam kare sayılara bakarız.",
        "explanation": [
          "Örneğin <strong>√40</strong> sayısını inceleyelim: 40'tan küçük en büyük tam kare <strong>36 (√36 = 6)</strong>, 40'tan büyük en küçük tam kare <strong>49 (√49 = 7)</strong>'dir.",
          "40 sayısı 36'ya (4 birim fark) 49'dan (9 birim fark) daha yakın olduğu için <strong>√40 sayısı 6 ile 7 arasındadır ve 6'ya daha yakındır</strong> (yaklaşık 6,3)."
        ],
        "sentenceHtml": "√75 sayısı {0} tam sayıları arasındadır ve 81'e daha yakın olduğu için {1} tam sayısına daha yakındır.",
        "blanks": [
          {
            "id": 0,
            "correct": "8 ile 9",
            "choices": [
              "7 ile 8",
              "8 ile 9",
              "9 ile 10"
            ]
          },
          {
            "id": 1,
            "correct": "9",
            "choices": [
              "8",
              "9",
              "10"
            ]
          }
        ],
        "id": 6,
        "kazanimId": "k2"
      },
      {
        "type": "activity",
        "icon": "🧩",
        "typeLabel": "Etkileşimli Etkinlik",
        "title": "Yaklaşık Değer Tahmin İstasyonu",
        "subtitle": "Verilen kareköklü sayıların en yakın olduğu tam sayıyı seç!",
        "activityMode": "rainbow_pairs",
        "targetNumber": 0,
        "sequence": [
          "√23 en yakın=?",
          "√52 en yakın=?",
          "√98 en yakın=?"
        ],
        "missingTargets": [
          {
            "index": 0,
            "answer": 5,
            "hint": "23 sayısı 25'e (√25=5) çok yakındır."
          },
          {
            "index": 1,
            "answer": 7,
            "hint": "52 sayısı 49'a (√49=7) çok yakındır."
          },
          {
            "index": 2,
            "answer": 10,
            "hint": "98 sayısı 100'e (√100=10) çok yakındır."
          }
        ],
        "pool": [
          4,
          5,
          6,
          7,
          9,
          10
        ],
        "id": 7,
        "kazanimId": "k2"
      },
      {
        "type": "video",
        "icon": "🎬",
        "typeLabel": "Animasyonlu Anlatım",
        "title": "Cetvel ve Kalem Boyu LGS Soruları",
        "subtitle": "LGS'de cetvel üzerinde ölçülen kalem veya zıplayan çekirge sorularının çözüm tekniği!",
        "videoScene": "custom_steps",
        "steps": [
          {
            "text": "1. Adım: Kalemin bir ucu 2'de, diğer ucu 7 ile 8 arasındaysa kalemin boyu 5 ile 6 birim arasındadır.",
            "draw": "s1"
          },
          {
            "text": "2. Adım: 5 = √25 ve 6 = √36 olduğu için şıklarda √25 ile √36 arasındaki sayıyı ararız.",
            "draw": "s2"
          },
          {
            "text": "3. Adım: Eğer uç nokta 7'ye daha yakınsa kalem boyu 5'e (√25'e) daha yakın olmalıdır (ör. √28)!",
            "draw": "s3"
          }
        ],
        "quickQuestion": "Boyu 6 cm ile 7 cm arasında ve 6 cm'ye daha yakın olan bir kalemin boyu hangisi olabilir?",
        "quickChoices": [
          "√34 cm",
          "√39 cm",
          "√46 cm"
        ],
        "quickCorrect": "√39 cm",
        "id": 8,
        "kazanimId": "k2"
      },
      {
        "type": "game",
        "icon": "🎮",
        "typeLabel": "HTML5 Mini Oyun",
        "title": "Oyun: Sayı Doğrusu Nişancısı",
        "subtitle": "Kareköklü sayıların sayı doğrusundaki yerini hatasız tahmin et!",
        "gameType": "final_marathon",
        "challenges": [
          {
            "q": "√110 sayısı hangi iki ardışık tam sayı arasındadır?",
            "choices": [
              "9 ile 10",
              "10 ile 11",
              "11 ile 12"
            ],
            "ans": "10 ile 11"
          },
          {
            "q": "5 + √18 toplamı hangi iki tam sayı arasındadır?",
            "choices": [
              "8 ile 9",
              "9 ile 10",
              "10 ile 11"
            ],
            "ans": "9 ile 10"
          },
          {
            "q": "Hangisi 8 tam sayısına diğerlerinden daha yakındır?",
            "choices": [
              "√55",
              "√62",
              "√70"
            ],
            "ans": "√62"
          }
        ],
        "id": 9,
        "kazanimId": "k2"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Kazanım Kontrol: Cetvel Üzerindeki Kalem",
        "subtitle": "Kazanım 2'yi yeşile döndürmek için bu LGS sorusunu çöz!",
        "stem": "Bir cetvelin <strong>0 noktasına</strong> konulan bir kalemin diğer ucu <strong>8 ile 9</strong> arasında ve <strong>9'a daha yakın</strong> bir noktayı göstermektedir. Buna göre kalemin boyu kaç cm olabilir?",
        "options": [
          {
            "letter": "A",
            "text": "√63 cm"
          },
          {
            "letter": "B",
            "text": "√68 cm"
          },
          {
            "letter": "C",
            "text": "√72 cm"
          },
          {
            "letter": "D",
            "text": "√77 cm"
          }
        ],
        "correctLetter": "D",
        "hint": "8 = √64 ve 9 = √81'dir. 81'e 64'ten daha yakın olan şıkkı seç!",
        "solution": "8 = √64 ve 9 = √81'dir. Kalemin boyu √64 ile √81 arasında ve √81'e daha yakın olmalıdır. 77 sayısı 81'e sadece 4 birim uzaklıkta olduğundan cevap <strong>√77 cm</strong>'dir.",
        "id": 10,
        "kazanimId": "k2"
      },
      {
        "type": "concept",
        "icon": "💡",
        "typeLabel": "Örnek & Keşif",
        "title": "Tam Kare Çarpanı Kök Dışına Çıkarma: √(a²·b) = a√b",
        "subtitle": "Katsayıyı kök içine alırken karesini alarak kök içindeki sayıyla çarparız!",
        "explanation": [
          "Örneğin <strong>√75 = √(25 · 3) = 5√3</strong> şeklinde yazılır. Tersine, <strong>4√2</strong> sayısında katsayı 4 kök içine 4² = 16 olarak girer: <strong>√(16 · 2) = √32</strong>.",
          "Kareköklü sayıları sıralarken katsayıları kök içine almak en güvenli yöntemdir!"
        ],
        "sentenceHtml": "√48 sayısı a√b biçiminde {0} olarak yazılır. 3√5 sayısında katsayı kök içine alındığında {1} elde edilir.",
        "blanks": [
          {
            "id": 0,
            "correct": "4√3",
            "choices": [
              "2√12",
              "4√3",
              "16√3"
            ]
          },
          {
            "id": 1,
            "correct": "√45",
            "choices": [
              "√15",
              "√30",
              "√45"
            ]
          }
        ],
        "id": 11,
        "kazanimId": "k3"
      },
      {
        "type": "video",
        "icon": "🎬",
        "typeLabel": "Animasyonlu Anlatım",
        "title": "Kök Dışına Çıkarma ve Sıralama Stratejisi",
        "subtitle": "Asal çarpan algoritmasıyla veya tam kare çarpanla a√b dönüşümü.",
        "videoScene": "custom_steps",
        "steps": [
          {
            "text": "1. Adım: √72 sayısında 72 = 36 × 2 olduğu için 36 dışarıya 6 olarak çıkar: 6√2.",
            "draw": "s1"
          },
          {
            "text": "2. Adım: 3√6, 4√3 ve 2√11 sayılarını sıralarken katsayıları kök içine alırız.",
            "draw": "s2"
          },
          {
            "text": "3. Adım: 3√6 = √54, 4√3 = √48 ve 2√11 = √44 olur. Buradan √44 < √48 < √54 bulunur!",
            "draw": "s3"
          }
        ],
        "quickQuestion": "√108 sayısının a√b biçiminde yazılışı aşağıdakilerden hangisidir?",
        "quickChoices": [
          "6√2",
          "6√3",
          "9√3"
        ],
        "quickCorrect": "6√3",
        "id": 12,
        "kazanimId": "k3"
      },
      {
        "type": "activity",
        "icon": "🧩",
        "typeLabel": "Etkileşimli Etkinlik",
        "title": "Kök İçine Alma Eşleştirmesi",
        "subtitle": "Verilen a√b ifadelerinin kök içine alınmış değerlerini seç!",
        "activityMode": "rainbow_pairs",
        "targetNumber": 0,
        "sequence": [
          "2√7 = √?",
          "5√2 = √?",
          "3√6 = √?"
        ],
        "missingTargets": [
          {
            "index": 0,
            "answer": 28,
            "hint": "2² × 7 = 4 × 7 = 28"
          },
          {
            "index": 1,
            "answer": 50,
            "hint": "5² × 2 = 25 × 2 = 50"
          },
          {
            "index": 2,
            "answer": 54,
            "hint": "3² × 6 = 9 × 6 = 54"
          }
        ],
        "pool": [
          14,
          28,
          36,
          50,
          54,
          60
        ],
        "id": 13,
        "kazanimId": "k3"
      },
      {
        "type": "game",
        "icon": "🎮",
        "typeLabel": "HTML5 Mini Oyun",
        "title": "Oyun: a√b Dönüştürücü",
        "subtitle": "Katsayıları kök içine al ve dışarı çıkar!",
        "gameType": "final_marathon",
        "challenges": [
          {
            "q": "√80 sayısının en sade a√b biçimi hangisidir?",
            "choices": [
              "2√20",
              "4√5",
              "8√5"
            ],
            "ans": "4√5"
          },
          {
            "q": "Hangisi diğerlerinden daha büyüktür?",
            "choices": [
              "3√5",
              "2√10",
              "4√3"
            ],
            "ans": "4√3"
          },
          {
            "q": "√72 = a√2 eşitliğinde a kaçtır?",
            "choices": [
              "6",
              "8",
              "36"
            ],
            "ans": "6"
          }
        ],
        "id": 14,
        "kazanimId": "k3"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Kaç Farklı a√b Yazılabilir?",
        "subtitle": "Bir kareköklü sayıyı farklı a√b biçimlerinde yazma sorusu.",
        "stem": "<strong>a</strong> ve <strong>b</strong> birden büyük birer doğal sayı olmak üzere <strong>√72 = a√b</strong> eşitliğini sağlayan kaç farklı <strong>(a, b)</strong> ikilisi vardır?",
        "options": [
          {
            "letter": "A",
            "text": "2"
          },
          {
            "letter": "B",
            "text": "3"
          },
          {
            "letter": "C",
            "text": "4"
          },
          {
            "letter": "D",
            "text": "5"
          }
        ],
        "correctLetter": "B",
        "hint": "72'nin içindeki 1'den büyük tam kare çarpanları (4, 9, 36) dışarı çıkar: 2√18, 3√8 ve 6√2!",
        "solution": "72 = 4×18 = 9×8 = 36×2 olduğundan a > 1 için <strong>2√18, 3√8 ve 6√2</strong> olmak üzere toplam <strong>3 farklı</strong> (a, b) ikilisi vardır.",
        "id": 15,
        "kazanimId": "k3"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Kazanım Kontrol: Kareköklü Sıralama",
        "subtitle": "Kazanım 3'ü yeşile döndürmek için bu sıralama sorusunu çöz!",
        "stem": "<strong>x = 3√7</strong>, <strong>y = 4√5</strong> ve <strong>z = 5√3</strong> sayılarının doğru sıralanışı aşağıdakilerden hangisidir?",
        "options": [
          {
            "letter": "A",
            "text": "x < z < y"
          },
          {
            "letter": "B",
            "text": "z < x < y"
          },
          {
            "letter": "C",
            "text": "x < y < z"
          },
          {
            "letter": "D",
            "text": "y < z < x"
          }
        ],
        "correctLetter": "A",
        "hint": "Hepsini kök içine al: x = √(9·7) = √63, y = √(16·5) = √80, z = √(25·3) = √75.",
        "solution": "Katsayıları kök içine alırsak: <strong>x = √63</strong>, <strong>z = √75</strong> ve <strong>y = √80</strong> olur. Küçükten büyüğe: <strong>x < z < y</strong>.",
        "id": 16,
        "kazanimId": "k3"
      },
      {
        "type": "concept",
        "icon": "💡",
        "typeLabel": "Örnek & Keşif",
        "title": "Çarpma-Bölme ve Kökten Kurtaran Çarpan!",
        "subtitle": "a√x · b√y = (a·b)√(x·y) — Aynı iki kökün çarpımı kökten kurtulur: √a · √a = a!",
        "explanation": [
          "Kareköklü ifadelerde çarpma yapılırken katsayılar kendi arasında, kök içleri kendi arasında çarpılır: <strong>2√3 · 4√3 = 8 · 3 = 24</strong>.",
          "Bir ifadeyi çarpıldığında <strong>doğal sayı yapan çarpan</strong> bulunurken önce sayı <strong>a√b</strong> biçimine getirilir; içinde <strong>√b</strong> barındıran her çarpan sonucu doğal sayı yapar!"
        ],
        "sentenceHtml": "3√2 · 5√2 işleminin sonucu {0} doğal sayısına eşittir. √24 = 2√6 sayısını doğal sayı yapan en küçük pozitif çarpan {1} olur.",
        "blanks": [
          {
            "id": 0,
            "correct": "30",
            "choices": [
              "15",
              "30",
              "60"
            ]
          },
          {
            "id": 1,
            "correct": "√6",
            "choices": [
              "√2",
              "√3",
              "√6"
            ]
          }
        ],
        "id": 17,
        "kazanimId": "k4"
      },
      {
        "type": "video",
        "icon": "🎬",
        "typeLabel": "Animasyonlu Anlatım",
        "title": "Doğal Sayı Yapan Çarpanları Bulma",
        "subtitle": "LGS'de her yıl sorulan 'Hangi iki hücre çarpılırsa sonuç doğal sayı olur?' kalıbı.",
        "videoScene": "custom_steps",
        "steps": [
          {
            "text": "1. Adım: Verilen tüm sayıları en sade a√b biçiminde yazarız.",
            "draw": "s1"
          },
          {
            "text": "2. Adım: Örneğin √12 = 2√3, √27 = 3√3 ve √75 = 5√3'tür.",
            "draw": "s2"
          },
          {
            "text": "3. Adım: Kök içleri aynı (√3) olan herhangi iki ifade çarpıldığında √3 · √3 = 3 olacağı için sonuç daima doğal sayı olur!",
            "draw": "s3"
          }
        ],
        "quickQuestion": "√18 sayısı aşağıdakilerden hangisiyle çarpılırsa sonuç bir doğal sayı olur?",
        "quickChoices": [
          "√2",
          "√3",
          "√6"
        ],
        "quickCorrect": "√2",
        "id": 18,
        "kazanimId": "k4"
      },
      {
        "type": "activity",
        "icon": "🧩",
        "typeLabel": "Etkileşimli Sınıflama",
        "title": " √3 Ailesi mi, √2 Ailesi mi?",
        "subtitle": "Sayıları en sade a√b biçimine dönüştürüp kök içindeki kalan sayıya göre sınıflandır!",
        "activityMode": "custom_sort",
        "sortChoices": [
          "Kök İçi: √2",
          "Kök İçi: √3"
        ],
        "items": [
          {
            "text": "√50 = 5√2",
            "answer": "Kök İçi: √2"
          },
          {
            "text": "√48 = 4√3",
            "answer": "Kök İçi: √3"
          },
          {
            "text": "√72 = 6√2",
            "answer": "Kök İçi: √2"
          },
          {
            "text": "√27 = 3√3",
            "answer": "Kök İçi: √3"
          }
        ],
        "id": 19,
        "kazanimId": "k4"
      },
      {
        "type": "game",
        "icon": "🎮",
        "typeLabel": "HTML5 Mini Oyun",
        "title": "Oyun: Çarpım ve Bölüm Ustası",
        "subtitle": "Kareköklü çarpma ve bölme işlemlerini tamamla!",
        "gameType": "final_marathon",
        "challenges": [
          {
            "q": "√75 ÷ √3 işleminin sonucu kaçtır?",
            "choices": [
              "5",
              "√5",
              "25"
            ],
            "ans": "5"
          },
          {
            "q": "4√6 · 2√3 çarpımının sonucu nedir?",
            "choices": [
              "24√2",
              "8√2",
              "16√3"
            ],
            "ans": "24√2"
          },
          {
            "q": "Kenarları 3√5 cm ve 2√5 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "choices": [
              "6√5",
              "15",
              "30"
            ],
            "ans": "30"
          }
        ],
        "id": 20,
        "kazanimId": "k4"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Bölme ve Parçalama",
        "subtitle": "Uzun bir teli eş kareköklü parçalara ayırma problemi.",
        "stem": "Uzunluğu <strong>√300 metre</strong> olan bir tel, her biri <strong>√12 metre</strong> uzunluğunda eş parçalara ayrılacaktır. Kaç parça tel elde edilir?",
        "options": [
          {
            "letter": "A",
            "text": "4"
          },
          {
            "letter": "B",
            "text": "5"
          },
          {
            "letter": "C",
            "text": "6"
          },
          {
            "letter": "D",
            "text": "25"
          }
        ],
        "correctLetter": "B",
        "hint": "√300 ÷ √12 = √(300 ÷ 12) = √25 işlemini yap!",
        "solution": "Parça sayısı = √300 ÷ √12 = √(300 / 12) = √25 = <strong>5 parça</strong> (veya 10√3 ÷ 2√3 = 5) bulunur.",
        "id": 21,
        "kazanimId": "k4"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Kazanım Kontrol: Doğal Sayı Çarpanı",
        "subtitle": "Kazanım 4'ü yeşile çevirmek için bu soruyu çöz!",
        "stem": "<strong>√96</strong> sayısı aşağıdakilerden hangisi ile çarpılırsa sonuç bir <strong>doğal sayı</strong> olmaz?",
        "options": [
          {
            "letter": "A",
            "text": "√6"
          },
          {
            "letter": "B",
            "text": "√24"
          },
          {
            "letter": "C",
            "text": "3√6"
          },
          {
            "letter": "D",
            "text": "2√3"
          }
        ],
        "correctLetter": "D",
        "hint": "√96 = √(16·6) = 4√6'dır. Doğal sayı olması için çarpanın kök içinde √6 kalması gerekir!",
        "solution": "√96 = <strong>4√6</strong>'dır. √6, √24 = 2√6 ve 3√6 ile çarpıldığında sonuç doğal sayı olur; ancak <strong>2√3</strong> ile çarpıldığında 8√18 = 24√2 (irrasyonel) olur.",
        "id": 22,
        "kazanimId": "k4"
      },
      {
        "type": "concept",
        "icon": "💡",
        "typeLabel": "Örnek & Keşif",
        "title": "Kök İçleri Aynı Olan İfadelerde Toplama-Çıkarma",
        "subtitle": "Dikkat: √9 + √16 ≠ √25! Kök içleri doğrudan toplanmaz; önce a√b yapılır, sonra katsayılar toplanır!",
        "explanation": [
          "Kök içleri aynı olan ifadelerde yalnızca katsayılar toplanır veya çıkarılır: <strong>5√3 + 2√3 − √3 = (5 + 2 − 1)√3 = 6√3</strong>.",
          "Ondalık ifadelerin karekökü alınırken önce rasyonel kesre çevrilir: <strong>√1,44 = √(144/100) = 12/10 = 1,2</strong>."
        ],
        "sentenceHtml": "√12 + √27 = 2√3 + 3√3 işleminin sonucu {0} olur. √0,49 ondalık karekökünün değeri ise {1} sayısına eşittir.",
        "blanks": [
          {
            "id": 0,
            "correct": "5√3",
            "choices": [
              "5√6",
              "5√3",
              "√39"
            ]
          },
          {
            "id": 1,
            "correct": "0,7",
            "choices": [
              "0,07",
              "0,7",
              "7"
            ]
          }
        ],
        "id": 23,
        "kazanimId": "k5"
      },
      {
        "type": "activity",
        "icon": "🧩",
        "typeLabel": "Etkileşimli Etkinlik",
        "title": "Toplama ve Ondalık Kök İstasyonu",
        "subtitle": "İşlemlerin doğru sonuçlarını alttaki seçeneklerden yerleştir!",
        "activityMode": "rainbow_pairs",
        "targetNumber": 0,
        "sequence": [
          "√8 + √18 = ?",
          "√0,64 + √0,36 = ?",
          "√75 − √12 = ?"
        ],
        "missingTargets": [
          {
            "index": 0,
            "answer": "5√2",
            "hint": "2√2 + 3√2 = 5√2"
          },
          {
            "index": 1,
            "answer": "1,4",
            "hint": "0,8 + 0,6 = 1,4"
          },
          {
            "index": 2,
            "answer": "3√3",
            "hint": "5√3 − 2√3 = 3√3"
          }
        ],
        "pool": [
          "4√2",
          "5√2",
          "1",
          "1,4",
          "2√3",
          "3√3"
        ],
        "id": 24,
        "kazanimId": "k5"
      },
      {
        "type": "game",
        "icon": "🎮",
        "typeLabel": "HTML5 Mini Oyun",
        "title": "Oyun: Kök Toplama Ustası",
        "subtitle": "Önce a√b biçimine çevir, sonra katsayıları topla!",
        "gameType": "final_marathon",
        "challenges": [
          {
            "q": "√50 − √8 işleminin sonucu nedir?",
            "choices": [
              "3√2",
              "4√2",
              "√42"
            ],
            "ans": "3√2"
          },
          {
            "q": "√1,21 − √0,09 işleminin sonucu kaçtır?",
            "choices": [
              "0,8",
              "1,08",
              "0,2"
            ],
            "ans": "0,8"
          },
          {
            "q": "Çevresi √192 cm olan eşkenar üçgenin bir kenarı kaç cm'dir?",
            "choices": [
              "2√3",
              "8√3",
              "8"
            ],
            "ans": "8√3"
          }
        ],
        "id": 25,
        "kazanimId": "k5"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Kazanım Kontrol: Dikdörtgen Çevresi",
        "subtitle": "Kazanım 5'i yeşile çevirmek için bu çevre sorusunu çöz!",
        "stem": "Kısa kenarı <strong>√20 cm</strong>, uzun kenarı <strong>√45 cm</strong> olan bir dikdörtgenin <strong>çevre uzunluğu</strong> kaç cm'dir?",
        "options": [
          {
            "letter": "A",
            "text": "5√5"
          },
          {
            "letter": "B",
            "text": "10√5"
          },
          {
            "letter": "C",
            "text": "20√5"
          },
          {
            "letter": "D",
            "text": "√130"
          }
        ],
        "correctLetter": "B",
        "hint": "√20 = 2√5 ve √45 = 3√5'tir. Çevre = 2 × (2√5 + 3√5)!",
        "solution": "Kısa kenar √20 = <strong>2√5 cm</strong>, uzun kenar √45 = <strong>3√5 cm</strong>'dir. Çevre = 2 × (2√5 + 3√5) = 2 × 5√5 = <strong>10√5 cm</strong> bulunur.",
        "id": 26,
        "kazanimId": "k5"
      },
      {
        "type": "activity",
        "icon": "🧩",
        "typeLabel": "Etkileşimli Sınıflama",
        "title": "Rasyonel Sayı mı, İrrasyonel Sayı mı?",
        "subtitle": "Kök dışına tam çıkabilen ve devirli ondalık sayılar Rasyoneldir; kök dışına çıkamayanlar ve π İrrasyoneldir!",
        "activityMode": "custom_sort",
        "sortChoices": [
          "Rasyonel Sayı (ℚ)",
          "İrrasyonel Sayı (𝕀)"
        ],
        "items": [
          {
            "text": "√36 = 6 (Tam kare)",
            "answer": "Rasyonel Sayı (ℚ)"
          },
          {
            "text": "√15 (Kök dışına tam çıkamaz)",
            "answer": "İrrasyonel Sayı (𝕀)"
          },
          {
            "text": "2,777... (Devirli ondalık sayı = 25/9)",
            "answer": "Rasyonel Sayı (ℚ)"
          },
          {
            "text": "π (Pi sayısı = 3,141592...)",
            "answer": "İrrasyonel Sayı (𝕀)"
          }
        ],
        "id": 27,
        "kazanimId": "k6"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "LGS Yeni Nesil 1: Katlanan Şerit",
        "subtitle": "Kareköklü uzunluk çıkarma ve kalan parça hesabı.",
        "stem": "Uzunluğu <strong>√200 cm</strong> olan bir kâğıt şeridin sol ucundan <strong>√18 cm</strong>, sağ ucundan <strong>√32 cm</strong>'lik kısımlar kesilip atılıyor. Geriye kalan parçanın uzunluğu kaç cm'dir?",
        "options": [
          {
            "letter": "A",
            "text": "2√2"
          },
          {
            "letter": "B",
            "text": "3√2"
          },
          {
            "letter": "C",
            "text": "5√2"
          },
          {
            "letter": "D",
            "text": "7√2"
          }
        ],
        "correctLetter": "B",
        "hint": "√200 = 10√2, √18 = 3√2 ve √32 = 4√2 yazıp çıkar!",
        "solution": "Toplam boy = √200 = <strong>10√2 cm</strong>. Kesilen toplam = √18 + √32 = 3√2 + 4√2 = <strong>7√2 cm</strong>. Kalan = 10√2 − 7√2 = <strong>3√2 cm</strong>.",
        "id": 28,
        "kazanimId": "k6"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "LGS Yeni Nesil 2: Karelerden Oluşan Şekil",
        "subtitle": "Alanlardan kenar uzunluklarına geçiş.",
        "stem": "Alanları sırasıyla <strong>75 cm²</strong>, <strong>48 cm²</strong> ve <strong>12 cm²</strong> olan üç kare yan yana dizilmiştir. Bu üç karenin üst kenarları boyunca gerilen ipin yatay uzunluğu toplam kaç cm'dir?",
        "options": [
          {
            "letter": "A",
            "text": "9√3"
          },
          {
            "letter": "B",
            "text": "11√3"
          },
          {
            "letter": "C",
            "text": "12√3"
          },
          {
            "letter": "D",
            "text": "15√3"
          }
        ],
        "correctLetter": "B",
        "hint": "Kenarlar: √75 = 5√3, √48 = 4√3 ve √12 = 2√3. Üçünü topla!",
        "solution": "Karelerin birer kenar uzunlukları: √75 = <strong>5√3 cm</strong>, √48 = <strong>4√3 cm</strong> ve √12 = <strong>2√3 cm</strong>'dir. Toplam yatay uzunluk = 5√3 + 4√3 + 2√3 = <strong>11√3 cm</strong>.",
        "id": 29,
        "kazanimId": "k6"
      },
      {
        "type": "game",
        "icon": "🏆",
        "typeLabel": "Final Maratonu",
        "title": "Final: Kareköklü İfadeler Şampiyonluk Etabı",
        "subtitle": "Son 3 görevi tamamla ve 3. Üniteyi tamamen YEŞİLE döndür!",
        "gameType": "final_marathon",
        "challenges": [
          {
            "q": "√128 sayısının a√b biçimi nedir?",
            "choices": [
              "6√2",
              "8√2",
              "16√2"
            ],
            "ans": "8√2"
          },
          {
            "q": "√27 + √12 − √3 işleminin sonucu kaçtır?",
            "choices": [
              "4√3",
              "5√3",
              "6√3"
            ],
            "ans": "4√3"
          },
          {
            "q": "Aşağıdakilerden hangisi irrasyonel bir sayıdır?",
            "choices": [
              "√64",
              "0,444...",
              "√20"
            ],
            "ans": "√20"
          }
        ],
        "id": 30,
        "kazanimId": "k6"
      }
    ]
  },
  {
    "id": "m8-u4-veri-analizi",
    "grade": 8,
    "unitNo": 4,
    "title": "Veri Analizi",
    "subtitle": "Çizgi Grafiği, Sütun Grafiği, Daire Grafiği (360°) ve Grafik Dönüşümleri",
    "coverImage": "assets/flow/u04_veri_analizi.jpg",
    "badgeCells": [
      "360°",
      "180°",
      "120°",
      "90°",
      "60°",
      "45°",
      "%50",
      "%25",
      "📊",
      "📈",
      "🥧",
      "LGS"
    ],
    "kazanimlar": [
      {
        "id": "k1",
        "no": 1,
        "title": "Çizgi Grafiği: Zaman ve Değişim",
        "code": "M.8.2.1.1",
        "visual": "assets/flow/u04_veri_analizi.jpg",
        "stops": [
          1,
          2,
          3,
          4,
          5
        ]
      },
      {
        "id": "k2",
        "no": 2,
        "title": "Sütun Grafiği ve Karşılaştırma",
        "code": "M.8.2.1.1",
        "visual": "assets/flow/u04_veri_analizi.jpg",
        "stops": [
          6,
          7,
          8,
          9,
          10
        ]
      },
      {
        "id": "k3",
        "no": 3,
        "title": "Daire Grafiği ve 360° Merkez Açı",
        "code": "M.8.2.1.2",
        "visual": "assets/flow/u04_veri_analizi.jpg",
        "stops": [
          11,
          12,
          13,
          14,
          15,
          16
        ]
      },
      {
        "id": "k4",
        "no": 4,
        "title": "Sütun Grafiğini Daire Grafiğine Dönüştürme",
        "code": "M.8.2.1.2",
        "visual": "assets/flow/u04_veri_analizi.jpg",
        "stops": [
          17,
          18,
          19,
          20,
          21,
          22
        ]
      },
      {
        "id": "k5",
        "no": 5,
        "title": "Daire Grafiğinde EBOB ile En Az Değer Bulma",
        "code": "M.8.2.1.2",
        "visual": "assets/flow/u04_veri_analizi.jpg",
        "stops": [
          23,
          24,
          25,
          26
        ]
      },
      {
        "id": "k6",
        "no": 6,
        "title": "LGS Çoklu Grafik Görevleri",
        "code": "M.8.2.1.2",
        "visual": "assets/flow/u04_veri_analizi.jpg",
        "stops": [
          27,
          28,
          29,
          30
        ]
      }
    ],
    "stops": [
      {
        "type": "concept",
        "icon": "💡",
        "typeLabel": "Örnek & Keşif",
        "title": "Çizgi Grafiği Ne Zaman Kullanılır?",
        "subtitle": "Bir verinin zamana bağlı değişimini (sıcaklık, boy uzaması, döviz, hız) göstermek için en uygun grafik çizgi grafiğidir.",
        "explanation": [
          "Çizgi grafiğinde yatay eksen genellikle <strong>zamanı (gün, ay, saat)</strong>, dikey eksen ise <strong>ölçülen değeri</strong> gösterir.",
          "Çizginin yukarı yönlü olması <strong>artışı</strong>, aşağı yönlü olması <strong>azalışı</strong>, yatay kalması ise değerin <strong>sabit kaldığını</strong> ifade eder."
        ],
        "sentenceHtml": "Zamana bağlı sıcaklık değişimini göstermek için en uygun grafik {0} grafiğidir. Grafikteki çizginin yatay ilerlemesi verinin {1} kaldığını gösterir.",
        "blanks": [
          {
            "id": 0,
            "correct": "çizgi",
            "choices": [
              "daire",
              "çizgi",
              "çetele"
            ]
          },
          {
            "id": 1,
            "correct": "sabit",
            "choices": [
              "arttığını",
              "azaldığını",
              "sabit"
            ]
          }
        ],
        "id": 1,
        "kazanimId": "k1"
      },
      {
        "type": "video",
        "icon": "🎬",
        "typeLabel": "Animasyonlu Anlatım",
        "title": "İki Verili Çizgi Grafiklerini Okuma",
        "subtitle": "İki farklı şehrin veya iki aracın zamana bağlı değişimini aynı grafikte karşılaştıralım.",
        "videoScene": "custom_steps",
        "steps": [
          {
            "text": "1. Adım: İki çizginin kesiştiği noktada her iki grubun değeri birbirine eşittir!",
            "draw": "s1"
          },
          {
            "text": "2. Adım: İki çizgi arasındaki dikey mesafenin en fazla olduğu anda fark en büyüktür.",
            "draw": "s2"
          },
          {
            "text": "3. Adım: Ortalamayı bulmak için tüm günlerin değerleri toplanıp gün sayısına bölünür.",
            "draw": "s3"
          }
        ],
        "quickQuestion": "Bir çizgi grafiğinde A ve B bitkilerinin boy çizgilerinin kesiştiği hafta ne anlama gelir?",
        "quickChoices": [
          "Boylarının eşit olduğu hafta",
          "Farkın en çok olduğu hafta",
          "Büyümenin durduğu hafta"
        ],
        "quickCorrect": "Boylarının eşit olduğu hafta",
        "id": 2,
        "kazanimId": "k1"
      },
      {
        "type": "activity",
        "icon": "🧩",
        "typeLabel": "Etkileşimli Etkinlik",
        "title": "Haftalık Sıcaklık Analizi",
        "subtitle": "Pazartesi 12°C, Salı 15°C, Çarşamba 15°C, Perşembe 20°C, Cuma 18°C olan verilere göre eksikleri bul!",
        "activityMode": "rainbow_pairs",
        "targetNumber": 0,
        "sequence": [
          "En yüksek fark=? °C",
          "Sabit kalan=? °C",
          "5 gün ortalaması=? °C"
        ],
        "missingTargets": [
          {
            "index": 0,
            "answer": 8,
            "hint": "En yüksek 20°C − En düşük 12°C = 8°C"
          },
          {
            "index": 1,
            "answer": 15,
            "hint": "Salı ve Çarşamba 15°C'de sabit kalmıştır."
          },
          {
            "index": 2,
            "answer": 16,
            "hint": "(12+15+15+20+18) ÷ 5 = 80 ÷ 5 = 16°C"
          }
        ],
        "pool": [
          5,
          8,
          12,
          15,
          16,
          20
        ],
        "id": 3,
        "kazanimId": "k1"
      },
      {
        "type": "game",
        "icon": "🎮",
        "typeLabel": "HTML5 Mini Oyun",
        "title": "Oyun: Trend Dedektifi",
        "subtitle": "Çizgi grafiği yorumlama sorularını tamamla!",
        "gameType": "final_marathon",
        "challenges": [
          {
            "q": "Hangi veri için çizgi grafiği en uygundur?",
            "choices": [
              "Sınıf başkanı seçimi",
              "5 günlük hava sıcaklığı",
              "Bahçedeki ağaç türleri"
            ],
            "ans": "5 günlük hava sıcaklığı"
          },
          {
            "q": "Boyu 20 cm'den 35 cm'ye 5 haftada doğrusal uzayan bitki haftada kaç cm uzar?",
            "choices": [
              "3 cm",
              "5 cm",
              "7 cm"
            ],
            "ans": "3 cm"
          },
          {
            "q": "Sabit hızla giden aracın deposundaki yakıt miktarı grafiği nasıl görünür?",
            "choices": [
              "Yukarı artan",
              "Aşağı azalan",
              "Dikey"
            ],
            "ans": "Aşağı azalan"
          }
        ],
        "id": 4,
        "kazanimId": "k1"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Kazanım Kontrol: Yakıt Tüketim Grafiği",
        "subtitle": "Kazanım 1'i yeşile çevirmek için bu soruyu çöz!",
        "stem": "Deposunda <strong>60 litre</strong> yakıt bulunan bir araç her saatte sabit <strong>8 litre</strong> yakıt tüketmektedir. <strong>5 saat</strong> sonunda depoda kaç litre yakıt kalır?",
        "options": [
          {
            "letter": "A",
            "text": "16 litre"
          },
          {
            "letter": "B",
            "text": "20 litre"
          },
          {
            "letter": "C",
            "text": "24 litre"
          },
          {
            "letter": "D",
            "text": "40 litre"
          }
        ],
        "correctLetter": "B",
        "hint": "5 saatte 5 × 8 = 40 litre yakıt harcanır. 60'tan çıkar!",
        "solution": "Harcanan yakıt = 5 × 8 = 40 litredir. Kalan yakıt = 60 − 40 = <strong>20 litre</strong> bulunur.",
        "id": 5,
        "kazanimId": "k1"
      },
      {
        "type": "concept",
        "icon": "💡",
        "typeLabel": "Örnek & Keşif",
        "title": "Sütun Grafiği: Farklı Grupları Karşılaştırma",
        "subtitle": "Kategorik verileri veya farklı grupların miktarlarını kıyaslamak için sütun grafiği kullanılır.",
        "explanation": [
          "Örneğin bir okulun 5, 6, 7 ve 8. sınıflarındaki kız-erkek öğrenci sayılarını karşılaştırırken <strong>ikili sütun grafiği</strong> en net görünümü sağlar.",
          "Sütunların boyları doğrudan veri miktarını temsil eder; sütun boyları toplamı ise veri grubunun toplamını verir."
        ],
        "sentenceHtml": "Farklı kitap türlerinin satış adetlerini karşılaştırmak için {0} grafiği uygundur. Sütunların yükseklikleri verilerin {1} gösterir.",
        "blanks": [
          {
            "id": 0,
            "correct": "sütun",
            "choices": [
              "çizgi",
              "sütun",
              "nokta"
            ]
          },
          {
            "id": 1,
            "correct": "miktarını",
            "choices": [
              "açısını",
              "miktarını",
              "zamanını"
            ]
          }
        ],
        "id": 6,
        "kazanimId": "k2"
      },
      {
        "type": "activity",
        "icon": "🧩",
        "typeLabel": "Etkileşimli Etkinlik",
        "title": "Sütunlardan Toplam ve Ortalamaya",
        "subtitle": "A şubesinde 20, B'de 25, C'de 30 ve D'de 25 öğrenci varsa eksikleri tamamla!",
        "activityMode": "rainbow_pairs",
        "targetNumber": 0,
        "sequence": [
          "Toplam öğrenci=?",
          "Şube ortalaması=?",
          "C ile A farkı=?"
        ],
        "missingTargets": [
          {
            "index": 0,
            "answer": 100,
            "hint": "20 + 25 + 30 + 25 = 100 öğrenci"
          },
          {
            "index": 1,
            "answer": 25,
            "hint": "100 ÷ 4 = 25 öğrenci"
          },
          {
            "index": 2,
            "answer": 10,
            "hint": "30 − 20 = 10 öğrenci"
          }
        ],
        "pool": [
          10,
          15,
          25,
          30,
          80,
          100
        ],
        "id": 7,
        "kazanimId": "k2"
      },
      {
        "type": "video",
        "icon": "🎬",
        "typeLabel": "Animasyonlu Anlatım",
        "title": "Sütun Grafiğinde Yüzde ve Değişim Hesabı",
        "subtitle": "Üretim-satış sütun grafiklerinde satılma yüzdesini nasıl hesaplarız?",
        "videoScene": "custom_steps",
        "steps": [
          {
            "text": "1. Adım: Üretilen miktar paydaya, satılan miktar paya yazılır.",
            "draw": "s1"
          },
          {
            "text": "2. Adım: Örneğin 50 adet üretilip 35 adet satıldıysa satış oranı 35/50 = 70/100 = %70'tir.",
            "draw": "s2"
          },
          {
            "text": "3. Adım: Kalan ürün sayısı ise iki sütunun boyları arasındaki farktır (50 − 35 = 15 adet).",
            "draw": "s3"
          }
        ],
        "quickQuestion": "80 adet üretilen bir üründen 60 adet satıldıysa bu ürünün yüzde kaçı satılmıştır?",
        "quickChoices": [
          "%60",
          "%75",
          "%80"
        ],
        "quickCorrect": "%75",
        "id": 8,
        "kazanimId": "k2"
      },
      {
        "type": "game",
        "icon": "🎮",
        "typeLabel": "HTML5 Mini Oyun",
        "title": "Oyun: Sütun Analisti",
        "subtitle": "Sütun verilerini karşılaştırarak doğru sonuçları seç!",
        "gameType": "final_marathon",
        "challenges": [
          {
            "q": "Sütun boyları 12, 18 ve 30 olan üç verinin ortalaması kaçtır?",
            "choices": [
              "18",
              "20",
              "24"
            ],
            "ans": "20"
          },
          {
            "q": "40 soruluk denemede 32 doğru yapan öğrencinin başarı yüzdesi kaçtır?",
            "choices": [
              "%75",
              "%80",
              "%85"
            ],
            "ans": "%80"
          },
          {
            "q": "Üretimi 120, satışı 90 olan fabrikada kaç ürün kalmıştır?",
            "choices": [
              "20",
              "30",
              "40"
            ],
            "ans": "30"
          }
        ],
        "id": 9,
        "kazanimId": "k2"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Kazanım Kontrol: Kitap Okuma Sütunları",
        "subtitle": "Kazanım 2'yi yeşile çevirmek için bu soruyu çöz!",
        "stem": "Bir sütun grafiğinde Ece'nin 4 ayda okuduğu kitap sayıları sırasıyla <strong>4, 6, 5 ve 9</strong> olarak verilmiştir. Ece'nin aylık ortalama okuduğu kitap sayısı kaçtır?",
        "options": [
          {
            "letter": "A",
            "text": "5"
          },
          {
            "letter": "B",
            "text": "6"
          },
          {
            "letter": "C",
            "text": "7"
          },
          {
            "letter": "D",
            "text": "8"
          }
        ],
        "correctLetter": "B",
        "hint": "Toplam kitap sayısını (4 + 6 + 5 + 9 = 24) ay sayısına (4) böl!",
        "solution": "Toplam kitap = 4 + 6 + 5 + 9 = 24 adettir. Aylık ortalama = 24 ÷ 4 = <strong>6 kitap</strong> bulunur.",
        "id": 10,
        "kazanimId": "k2"
      },
      {
        "type": "concept",
        "icon": "💡",
        "typeLabel": "Örnek & Keşif",
        "title": "Daire Grafiği: Parçanın Bütüne Oranı (360°)",
        "subtitle": "Bir bütünün parçalarını karşılaştırırken tüm verilerin toplamı 360°'lik daireye karşılık gelir!",
        "explanation": [
          "Merkez Açı Formülü: <strong>(Grubun Verisi / Tüm Veri Toplamı) × 360°</strong>. Örneğin 4 eş parçadan biri <strong>360° ÷ 4 = 90°</strong> (%25), yarısı <strong>180°</strong> (%50), üçte biri <strong>120°</strong>'dir.",
          "Bir daire grafiğinde verisi verilip açısı sorulduğunda doğru orantı kurarız!"
        ],
        "sentenceHtml": "Daire grafiğinde tüm verilerin merkez açıları toplamı {0} derecedir. Bütünün çeyreğini (%25) gösteren dilimin merkez açısı {1} derecedir.",
        "blanks": [
          {
            "id": 0,
            "correct": "360",
            "choices": [
              "100",
              "180",
              "360"
            ]
          },
          {
            "id": 1,
            "correct": "90",
            "choices": [
              "45",
              "60",
              "90"
            ]
          }
        ],
        "primeStripDemo": [
          "%50 = 180°",
          "%25 = 90°",
          "1/3 = 120°",
          "1/6 = 60°",
          "%10 = 36°",
          "%20 = 72°"
        ],
        "id": 11,
        "kazanimId": "k3"
      },
      {
        "type": "video",
        "icon": "🎬",
        "typeLabel": "Animasyonlu Anlatım",
        "title": "Daire Grafiğinde Merkez Açı Hesaplama Adımları",
        "subtitle": "LGS'nin en önemli konusu olan daire grafiğinde pratik kat yöntemini öğrenelim.",
        "videoScene": "custom_steps",
        "steps": [
          {
            "text": "1. Adım: Tüm kategorilerdeki veri sayılarını toplarız (örneğin toplam 72 ağaç olsun).",
            "draw": "s1"
          },
          {
            "text": "2. Adım: 360°'yi toplam veriye böleriz: 360° ÷ 72 = 5° (Demek ki 1 ağaç = 5°!).",
            "draw": "s2"
          },
          {
            "text": "3. Adım: 20 elma ağacı varsa merkez açısı 20 × 5° = 100° olur!",
            "draw": "s3"
          }
        ],
        "quickQuestion": "Toplam 90 öğrencinin bulunduğu bir okul daire grafiğiyle gösterilirse 1 öğrenciye kaç derecelik açı düşer?",
        "quickChoices": [
          "2°",
          "4°",
          "6°"
        ],
        "quickCorrect": "4°",
        "id": 12,
        "kazanimId": "k3"
      },
      {
        "type": "activity",
        "icon": "🧩",
        "typeLabel": "Etkileşimli Etkinlik",
        "title": "Merkez Açı Dönüştürücü",
        "subtitle": "Toplam 120 hayvanın olduğu çiftlikte (1 hayvan = 3°) türlerin merkez açılarını bul!",
        "activityMode": "rainbow_pairs",
        "targetNumber": 0,
        "sequence": [
          "40 Koyun = ?°",
          "30 İnek = ?°",
          "50 Tavuk = ?°"
        ],
        "missingTargets": [
          {
            "index": 0,
            "answer": 120,
            "hint": "40 × 3° = 120°"
          },
          {
            "index": 1,
            "answer": 90,
            "hint": "30 × 3° = 90°"
          },
          {
            "index": 2,
            "answer": 150,
            "hint": "50 × 3° = 150°"
          }
        ],
        "pool": [
          60,
          90,
          100,
          120,
          150,
          180
        ],
        "id": 13,
        "kazanimId": "k3"
      },
      {
        "type": "game",
        "icon": "🎮",
        "typeLabel": "HTML5 Mini Oyun",
        "title": "Oyun: 360 Derece Ustası",
        "subtitle": "Eksik merkez açıları ve dilim oranlarını yakala!",
        "gameType": "final_marathon",
        "challenges": [
          {
            "q": "Üç dilimden ikisi 110° ve 130° ise üçüncü dilimin merkez açısı kaç derecedir?",
            "choices": [
              "100°",
              "120°",
              "140°"
            ],
            "ans": "120°"
          },
          {
            "q": "Bir daire grafiğinde %20'lik paya düşen merkez açı kaç derecedir?",
            "choices": [
              "36°",
              "60°",
              "72°"
            ],
            "ans": "72°"
          },
          {
            "q": "Merkez açısı 60° olan dilim bütünün kaçta kaçıdır?",
            "choices": [
              "1/4",
              "1/6",
              "1/8"
            ],
            "ans": "1/6"
          }
        ],
        "id": 14,
        "kazanimId": "k3"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Veriden Merkez Açıya",
        "subtitle": "Verilen miktarları toplayıp 360° ile orantı kur.",
        "stem": "Bir sınıfta <strong>12 kız</strong> ve <strong>18 erkek</strong> öğrenci vardır. Bu sınıfın öğrenci dağılımı daire grafiğinde gösterilirse kız öğrencilere ait dilimin merkez açısı kaç derece olur?",
        "options": [
          {
            "letter": "A",
            "text": "120°"
          },
          {
            "letter": "B",
            "text": "144°"
          },
          {
            "letter": "C",
            "text": "160°"
          },
          {
            "letter": "D",
            "text": "216°"
          }
        ],
        "correctLetter": "B",
        "hint": "Toplam öğrenci = 12 + 18 = 30. 360° ÷ 30 = 12° (1 öğrenci). Kızlar = 12 × 12°!",
        "solution": "Sınıf mevcudu 12 + 18 = 30 kişidir. 360° ÷ 30 = 12° (kişi başı açı). Kızların merkez açısı = 12 × 12° = <strong>144°</strong> bulunur.",
        "id": 15,
        "kazanimId": "k3"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Kazanım Kontrol: Merkez Açıdan Veriye",
        "subtitle": "Kazanım 3'ü yeşile çevirmek için bu soruyu çöz!",
        "stem": "Toplam <strong>240 kitabın</strong> bulunduğu bir kütüphanenin daire grafiğinde romanlara ait dilimin merkez açısı <strong>150°</strong>'dir. Buna göre kütüphanede kaç roman vardır?",
        "options": [
          {
            "letter": "A",
            "text": "80"
          },
          {
            "letter": "B",
            "text": "90"
          },
          {
            "letter": "C",
            "text": "100"
          },
          {
            "letter": "D",
            "text": "120"
          }
        ],
        "correctLetter": "C",
        "hint": "360° de 240 kitap varsa, 150° de (150 × 240) ÷ 360 kitap vardır!",
        "solution": "Orantı: (150° / 360°) × 240 = (5 / 12) × 240 = 5 × 20 = <strong>100 roman</strong> bulunur.",
        "id": 16,
        "kazanimId": "k3"
      },
      {
        "type": "concept",
        "icon": "💡",
        "typeLabel": "Örnek & Keşif",
        "title": "Sütundan Daireye Geçiş Adımları",
        "subtitle": "Önce sütunlardaki tüm verileri topla, sonra her sütunun 360° içindeki payını bul!",
        "explanation": [
          "Sütun grafiğinde A=10, B=20, C=30 verilmişse toplam veri <strong>10 + 20 + 30 = 60</strong>'tır.",
          "360° ÷ 60 = <strong>6 kat</strong> olduğu için her sütun değerini 6 ile çarparak daire dilim açılarını buluruz: <strong>A = 60°, B = 120°, C = 180°</strong>."
        ],
        "sentenceHtml": "Toplamı 40 olan bir sütun grafiği 360°'lik daireye çevrilirken her veri {0} ile çarpılır. Değeri 10 olan sütunun merkez açısı {1} derece olur.",
        "blanks": [
          {
            "id": 0,
            "correct": "9",
            "choices": [
              "4",
              "6",
              "9"
            ]
          },
          {
            "id": 1,
            "correct": "90",
            "choices": [
              "40",
              "90",
              "100"
            ]
          }
        ],
        "id": 17,
        "kazanimId": "k4"
      },
      {
        "type": "video",
        "icon": "🎬",
        "typeLabel": "Animasyonlu Anlatım",
        "title": "İki Grafik Arası Geçiş (LGS Klasik Kalıbı)",
        "subtitle": "Birinci grafikte tür dağılımı, ikinci grafikte alt detay verildiğinde nasıl çözeriz?",
        "videoScene": "custom_steps",
        "steps": [
          {
            "text": "1. Adım: Sütun grafiğindeki verileri toplayıp 360°'ye eşitleyerek birim oranı buluruz.",
            "draw": "s1"
          },
          {
            "text": "2. Adım: Daire grafiğindeki verilmeyen son dilimin açısını 360°'den çıkararak yazarız.",
            "draw": "s2"
          },
          {
            "text": "3. Adım: Bilinen tek bir ortak veriden yola çıkarak tüm bilinmeyen sayıları katlarıyla hesaplarız!",
            "draw": "s3"
          }
        ],
        "quickQuestion": "Sütun grafiğinde toplamları 180 olan veriler daire grafiğine aktarılırsa, değeri 45 olan sütunun merkez açısı kaç derece olur?",
        "quickChoices": [
          "45°",
          "90°",
          "135°"
        ],
        "quickCorrect": "90°",
        "id": 18,
        "kazanimId": "k4"
      },
      {
        "type": "activity",
        "icon": "🧩",
        "typeLabel": "Etkileşimli Sınıflama",
        "title": "Hangi Grafik Türü Daha Uygun?",
        "subtitle": "Verilen araştırma durumlarını en uygun grafik türüyle eşleştir!",
        "activityMode": "custom_sort",
        "sortChoices": [
          "Daire Grafiği",
          "Çizgi Grafiği"
        ],
        "items": [
          {
            "text": "Bir ailenin aylık gelirinin harcama kalemlerine göre dağılım oranı",
            "answer": "Daire Grafiği"
          },
          {
            "text": "Bir hastanın 24 saat boyunca saatlik ateş değişimi",
            "answer": "Çizgi Grafiği"
          },
          {
            "text": "Seçimde adayların aldığı oyların bütün içindeki payı",
            "answer": "Daire Grafiği"
          },
          {
            "text": "Bir fidanın 6 ay boyunca haftalık boy uzama takibi",
            "answer": "Çizgi Grafiği"
          }
        ],
        "id": 19,
        "kazanimId": "k4"
      },
      {
        "type": "game",
        "icon": "🎮",
        "typeLabel": "HTML5 Mini Oyun",
        "title": "Oyun: Grafik Dönüştürücü",
        "subtitle": "Sütun ve daire grafikleri arasındaki dönüşümleri tamamla!",
        "gameType": "final_marathon",
        "challenges": [
          {
            "q": "A=15, B=15, C=30 olan sütun verisinde C'nin merkez açısı kaçtır?",
            "choices": [
              "120°",
              "180°",
              "240°"
            ],
            "ans": "180°"
          },
          {
            "q": "Merkez açısı 72° olan dilimin sütun değeri 18 ise tüm verilerin toplamı kaçtır?",
            "choices": [
              "72",
              "90",
              "108"
            ],
            "ans": "90"
          },
          {
            "q": "Dairede 90° ve 120° dışındaki üçüncü dilim kaç derecedir?",
            "choices": [
              "130°",
              "150°",
              "160°"
            ],
            "ans": "150°"
          }
        ],
        "id": 20,
        "kazanimId": "k4"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Turist Dağılımı Dönüşümü",
        "subtitle": "Sütun verilerini toplayıp istenen grubun merkez açısını hesapla.",
        "stem": "Bir otele gelen turistlerin <strong>15'i Alman, 25'i Rus ve 20'si İngiliz</strong>'dir. Bu veriler daire grafiğinde gösterildiğinde <strong>Rus turistlere</strong> ait merkez açı kaç derece olur?",
        "options": [
          {
            "letter": "A",
            "text": "120°"
          },
          {
            "letter": "B",
            "text": "135°"
          },
          {
            "letter": "C",
            "text": "150°"
          },
          {
            "letter": "D",
            "text": "160°"
          }
        ],
        "correctLetter": "C",
        "hint": "Toplam turist = 15 + 25 + 20 = 60 kişi. 360° ÷ 60 = 6° (1 kişi). 25 × 6° işlemini yap!",
        "solution": "Toplam turist sayısı 15 + 25 + 20 = 60'tır. 1 kişiye 360° ÷ 60 = 6° düşer. Rus turistlerin merkez açısı = 25 × 6° = <strong>150°</strong> olur.",
        "id": 21,
        "kazanimId": "k4"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Kazanım Kontrol: Çift Grafik Sorusu",
        "subtitle": "Kazanım 4'ü yeşile çevirmek için bu soruyu çöz!",
        "stem": "Bir galerideki araçların daire grafiğinde <strong>beyaz araçlar 120°</strong>, <strong>siyah araçlar 90°</strong> ve geri kalanlar gri araçtır. Galeride <strong>18 adet siyah araç</strong> olduğuna göre kaç adet <strong>gri araç</strong> vardır?",
        "options": [
          {
            "letter": "A",
            "text": "24"
          },
          {
            "letter": "B",
            "text": "27"
          },
          {
            "letter": "C",
            "text": "30"
          },
          {
            "letter": "D",
            "text": "36"
          }
        ],
        "correctLetter": "C",
        "hint": "Gri açı = 360° − (120° + 90°) = 150°. 90° = 18 araç ise (5'te biri), 150° kaç araçtır?",
        "solution": "Gri araçların merkez açısı = 360° − 210° = <strong>150°</strong>'dir. 90°'ye 18 araç düşüyorsa (her 5° = 1 araç), 150°'ye 150 ÷ 5 = <strong>30 gri araç</strong> düşer.",
        "id": 22,
        "kazanimId": "k4"
      },
      {
        "type": "concept",
        "icon": "💡",
        "typeLabel": "Örnek & Keşif",
        "title": "Sadece Açılar Verildiğinde 'En Az Kaçtır?' Soruları",
        "subtitle": "Daire grafiğinde hiçbir sayı verilmeden sadece açılar verilmişse, açıların EBOB'u alınarak en sade katlar (k) bulunur!",
        "explanation": [
          "Örneğin dilim açıları <strong>80°, 120° ve 160°</strong> olsun. EBOB(80, 120, 160) = <strong>40°</strong>'dir.",
          "Her açıyı 40°'ye bölersek gruplar en sade haliyle <strong>2k, 3k ve 4k</strong> olur; toplam veri sayısı en az 2 + 3 + 4 = <strong>9'un katı</strong> olmalıdır!"
        ],
        "sentenceHtml": "Açıları 60°, 120° ve 180° olan üç grubun EBOB'u {0} derecedir. Bu gruptaki toplam nesne sayısı en az 1 + 2 + 3 = {1} olur.",
        "blanks": [
          {
            "id": 0,
            "correct": "60",
            "choices": [
              "30",
              "60",
              "90"
            ]
          },
          {
            "id": 1,
            "correct": "6",
            "choices": [
              "3",
              "6",
              "12"
            ]
          }
        ],
        "id": 23,
        "kazanimId": "k5"
      },
      {
        "type": "activity",
        "icon": "🧩",
        "typeLabel": "Etkileşimli Etkinlik",
        "title": "Açıları En Sade Katlara (k) İndir",
        "subtitle": "Açıları 90°, 120° ve 150° olan üç dilimi EBOB(90,120,150)=30° ile sadeleştir!",
        "activityMode": "rainbow_pairs",
        "targetNumber": 0,
        "sequence": [
          "90° dilim = ?k",
          "120° dilim = ?k",
          "150° dilim = ?k"
        ],
        "missingTargets": [
          {
            "index": 0,
            "answer": 3,
            "hint": "90 ÷ 30 = 3k"
          },
          {
            "index": 1,
            "answer": 4,
            "hint": "120 ÷ 30 = 4k"
          },
          {
            "index": 2,
            "answer": 5,
            "hint": "150 ÷ 30 = 5k"
          }
        ],
        "pool": [
          2,
          3,
          4,
          5,
          6,
          12
        ],
        "id": 24,
        "kazanimId": "k5"
      },
      {
        "type": "game",
        "icon": "🎮",
        "typeLabel": "HTML5 Mini Oyun",
        "title": "Oyun: Oran ve Kat Avcısı",
        "subtitle": "Açıların en sade oranlarını kullanarak soruları çöz!",
        "gameType": "final_marathon",
        "challenges": [
          {
            "q": "Açıları 100°, 120° ve 140° olan üç grupta toplam en az kaç kişi vardır?",
            "choices": [
              "12",
              "18",
              "36"
            ],
            "ans": "18"
          },
          {
            "q": "Açıları 90° ve 270° olan iki gruptan büyük olan küçük olanın kaç katıdır?",
            "choices": [
              "2 katı",
              "3 katı",
              "4 katı"
            ],
            "ans": "3 katı"
          },
          {
            "q": "Merkez açısı 108° olan bir dilim bütünün yüzde kaçıdır?",
            "choices": [
              "%25",
              "%30",
              "%36"
            ],
            "ans": "%30"
          }
        ],
        "id": 25,
        "kazanimId": "k5"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Kazanım Kontrol: En Az Meyve Sayısı",
        "subtitle": "Kazanım 5'i yeşile çevirmek için bu LGS kalıbını çöz!",
        "stem": "Bir kasadaki elma, armut ve muzların sayıca dağılımı daire grafiğinde sırasıyla <strong>72°, 108° ve 180°</strong> merkez açılarla gösterilmiştir. Kasada toplam <strong>en az</strong> kaç meyve vardır?",
        "options": [
          {
            "letter": "A",
            "text": "5"
          },
          {
            "letter": "B",
            "text": "10"
          },
          {
            "letter": "C",
            "text": "12"
          },
          {
            "letter": "D",
            "text": "20"
          }
        ],
        "correctLetter": "B",
        "hint": "EBOB(72, 108, 180) = 36°'dir. Açıları 36'ya bölüp topla!",
        "solution": "EBOB(72, 108, 180) = 36° olduğundan meyve sayıları en az: Elma = 72÷36 = <strong>2</strong>, Armut = 108÷36 = <strong>3</strong>, Muz = 180÷36 = <strong>5</strong> olur. Toplam en az 2 + 3 + 5 = <strong>10 meyve</strong> vardır.",
        "id": 26,
        "kazanimId": "k5"
      },
      {
        "type": "activity",
        "icon": "🧩",
        "typeLabel": "Etkileşimli Etkinlik",
        "title": "Adım Adım LGS Kurgusu: Fabrika Üretimi",
        "subtitle": "360° dairede A ürünü 120°, B ürünü 90°, C ürünü 150°'dir. Toplam üretim 720 adet ise eksikleri bul!",
        "activityMode": "rainbow_pairs",
        "targetNumber": 0,
        "sequence": [
          "A ürünü = ? adet",
          "B ürünü = ? adet",
          "C ürünü = ? adet"
        ],
        "missingTargets": [
          {
            "index": 0,
            "answer": 240,
            "hint": "720 ÷ 360 = 2 kat ⇒ 120 × 2 = 240"
          },
          {
            "index": 1,
            "answer": 180,
            "hint": "90 × 2 = 180 adet"
          },
          {
            "index": 2,
            "answer": 300,
            "hint": "150 × 2 = 300 adet"
          }
        ],
        "pool": [
          120,
          150,
          180,
          240,
          300,
          360
        ],
        "id": 27,
        "kazanimId": "k6"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "LGS Yeni Nesil 1: Eklenen-Çıkarılan Veri",
        "subtitle": "Veri değiştikten sonra yeni merkez açıyı hesaplama.",
        "stem": "Bir torbada <strong>10 kırmızı</strong> ve <strong>14 mavi</strong> top vardır. Torbaya <strong>2 kırmızı</strong> ve <strong>4 mavi</strong> top daha eklendiğinde oluşan yeni durumun daire grafiğinde <strong>kırmızı topların</strong> merkez açısı kaç derece olur?",
        "options": [
          {
            "letter": "A",
            "text": "120°"
          },
          {
            "letter": "B",
            "text": "135°"
          },
          {
            "letter": "C",
            "text": "144°"
          },
          {
            "letter": "D",
            "text": "150°"
          }
        ],
        "correctLetter": "C",
        "hint": "Yeni durumda 12 kırmızı ve 18 mavi (toplam 30 top) olur. (12 / 30) × 360° hesapla!",
        "solution": "Son durumda kırmızı = 10 + 2 = <strong>12</strong>, mavi = 14 + 4 = <strong>18</strong>, toplam = <strong>30 top</strong> olur. Kırmızıların merkez açısı = (12 / 30) × 360° = 12 × 12° = <strong>144°</strong>.",
        "id": 28,
        "kazanimId": "k6"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "LGS Yeni Nesil 2: İki Daire Grafiği Karşılaştırması",
        "subtitle": "Birinci grafikten miktarı bulup ikinci grafiğe geçiş yap.",
        "stem": "180 dönümlük bir arazinin daire grafiğinde <strong>buğday ekili alan 120°</strong>'dir. Buğday ekili alanın her dönümünden <strong>3 ton</strong> ürün alındığına göre toplam kaç ton buğday elde edilir?",
        "options": [
          {
            "letter": "A",
            "text": "120 ton"
          },
          {
            "letter": "B",
            "text": "150 ton"
          },
          {
            "letter": "C",
            "text": "180 ton"
          },
          {
            "letter": "D",
            "text": "240 ton"
          }
        ],
        "correctLetter": "C",
        "hint": "120° tüm arazinin 1/3'üdür (180 ÷ 3 = 60 dönüm). Her dönümden 3 ton alınıyor!",
        "solution": "120° / 360° = 1/3 olduğundan buğday ekili alan = 180 ÷ 3 = <strong>60 dönüm</strong>dür. Toplam ürün = 60 × 3 = <strong>180 ton</strong> bulunur.",
        "id": 29,
        "kazanimId": "k6"
      },
      {
        "type": "game",
        "icon": "🏆",
        "typeLabel": "Final Maratonu",
        "title": "Final: Veri Analizi Şampiyonluk Etabı",
        "subtitle": "Son 3 görevi tamamla ve 4. Üniteyi tamamen YEŞİLE döndür!",
        "gameType": "final_marathon",
        "challenges": [
          {
            "q": "Daire grafiğinde %40'lık dilimin merkez açısı kaç derecedir?",
            "choices": [
              "120°",
              "144°",
              "160°"
            ],
            "ans": "144°"
          },
          {
            "q": "Açıları 80°, 120° ve 160° olan üç gruptan en büyüğü bütünün kaçta kaçıdır?",
            "choices": [
              "4/9",
              "1/3",
              "2/5"
            ],
            "ans": "4/9"
          },
          {
            "q": "Verilerin zamana göre değişimini en iyi hangi grafik gösterir?",
            "choices": [
              "Daire grafiği",
              "Çizgi grafiği",
              "Sütun grafiği"
            ],
            "ans": "Çizgi grafiği"
          }
        ],
        "id": 30,
        "kazanimId": "k6"
      }
    ]
  },
  {
    "id": "m8-u5-olasilik",
    "grade": 8,
    "unitNo": 5,
    "title": "Basit Olayların Olma Olasılığı",
    "subtitle": "Olası Durumlar, Eş Olasılık, Kesin/İmkânsız Olay ve Olasılık Hesabı",
    "coverImage": "assets/flow/u05_olasilik.jpg",
    "badgeCells": [
      "0",
      "1/6",
      "1/4",
      "1/3",
      "1/2",
      "2/3",
      "3/4",
      "1",
      "🎲",
      "🎯",
      "🟢",
      "%50"
    ],
    "kazanimlar": [
      {
        "id": "k1",
        "no": 1,
        "title": "Deney, Çıktı ve Olası Durumlar",
        "code": "M.8.5.1.1",
        "visual": "assets/flow/u05_olasilik.jpg",
        "stops": [
          1,
          2,
          3,
          4,
          5
        ]
      },
      {
        "id": "k2",
        "no": 2,
        "title": "Daha Fazla, Eşit ve Daha Az Olasılıklı Olaylar",
        "code": "M.8.5.1.2",
        "visual": "assets/flow/u05_olasilik.jpg",
        "stops": [
          6,
          7,
          8,
          9,
          10
        ]
      },
      {
        "id": "k3",
        "no": 3,
        "title": "Kesin Olay (1), İmkânsız Olay (0) ve 1/n",
        "code": "M.8.5.1.3",
        "visual": "assets/flow/u05_olasilik.jpg",
        "stops": [
          11,
          12,
          13,
          14,
          15,
          16
        ]
      },
      {
        "id": "k4",
        "no": 4,
        "title": "Basit Olayların Olma Olasılığı Hesabı",
        "code": "M.8.5.1.5",
        "visual": "assets/flow/u05_olasilik.jpg",
        "stops": [
          17,
          18,
          19,
          20,
          21,
          22
        ]
      },
      {
        "id": "k5",
        "no": 5,
        "title": "Geometrik Olasılık ve Tablo Olasılıkları",
        "code": "M.8.5.1.5",
        "visual": "assets/flow/u05_olasilik.jpg",
        "stops": [
          23,
          24,
          25,
          26
        ]
      },
      {
        "id": "k6",
        "no": 6,
        "title": "LGS Bağlam Temelli Olasılık Görevleri",
        "code": "M.8.5.1.5",
        "visual": "assets/flow/u05_olasilik.jpg",
        "stops": [
          27,
          28,
          29,
          30
        ]
      }
    ],
    "stops": [
      {
        "type": "concept",
        "icon": "💡",
        "typeLabel": "Örnek & Keşif",
        "title": "Deney, Çıktı ve Tüm Olası Durumlar",
        "subtitle": "Bir zar atıldığında üst yüze gelebilecek 1, 2, 3, 4, 5, 6 sayılarının her birine çıktı (olası durum) denir.",
        "explanation": [
          "Yeni bir sonuç elde etmek için yapılan işleme <strong>deney</strong>, deneyde elde edilebilecek her bir sonuca <strong>çıktı (olası durum)</strong>, istenen koşulu sağlayan çıktılara ise <strong>olayın çıktıları</strong> denir.",
          "Örneğin 'ANKARA' kelimesinin harflerinden birini seçme deneyinde <strong>olası durum sayısı 6</strong>'dır (harf sayısı kadar!)."
        ],
        "sentenceHtml": "Hilesiz bir zar atılması deneyinde olası durum sayısı {0} iken, 'MATEMATİK' kelimesinin harflerinin yazılı olduğu kartlardan birini çekme deneyinde olası durum sayısı {1} olur.",
        "blanks": [
          {
            "id": 0,
            "correct": "6",
            "choices": [
              "2",
              "6",
              "12"
            ]
          },
          {
            "id": 1,
            "correct": "9",
            "choices": [
              "6",
              "8",
              "9"
            ]
          }
        ],
        "id": 1,
        "kazanimId": "k1"
      },
      {
        "type": "video",
        "icon": "🎬",
        "typeLabel": "Animasyonlu Anlatım",
        "title": "Olası Durum Sayısı ile Farklı Çıktı Sayısı",
        "subtitle": "Kart çekme sorularında özdeş harfler olsa bile her kart ayrı bir olası durumdur!",
        "videoScene": "custom_steps",
        "steps": [
          {
            "text": "1. Adım: 'KELEBEK' kelimesinin 7 harfi eş kartlara yazılıp torbaya atılırsa torbada 7 kart olduğu için 7 olası durum vardır.",
            "draw": "s1"
          },
          {
            "text": "2. Adım: Ancak 'Kaç farklı harf gelebilir?' diye sorulursa K, E, L, B olmak üzere 4 farklı harf vardır.",
            "draw": "s2"
          },
          {
            "text": "3. Adım: İki madeni para birlikte atıldığında olası durumlar (YY, YT, TY, TT) toplam 4 tanedir.",
            "draw": "s3"
          }
        ],
        "quickQuestion": "10 kız ve 14 erkek öğrencinin bulunduğu sınıftan rastgele 1 başkan seçme deneyinde olası durum sayısı kaçtır?",
        "quickChoices": [
          "2",
          "14",
          "24"
        ],
        "quickCorrect": "24",
        "id": 2,
        "kazanimId": "k1"
      },
      {
        "type": "activity",
        "icon": "🧩",
        "typeLabel": "Etkileşimli Etkinlik",
        "title": "Olası Durum Sayılarını Eşleştir",
        "subtitle": "Verilen deneylerin olası durum sayılarını alttaki seçeneklerden bul!",
        "activityMode": "rainbow_pairs",
        "targetNumber": 0,
        "sequence": [
          "Rakamlar arasından seçim=?",
          "İki basamaklı en küçük 5 sayı=?",
          "1'den 20'ye çift sayılar=?"
        ],
        "missingTargets": [
          {
            "index": 0,
            "answer": 10,
            "hint": "0'dan 9'a kadar 10 rakam vardır."
          },
          {
            "index": 1,
            "answer": 5,
            "hint": "5 sayı arasından seçimde 5 olası durum vardır."
          },
          {
            "index": 2,
            "answer": 10,
            "hint": "2, 4, 6 ... 20 olmak üzere 10 çift sayı vardır."
          }
        ],
        "pool": [
          5,
          8,
          9,
          10,
          15,
          20
        ],
        "id": 3,
        "kazanimId": "k1"
      },
      {
        "type": "game",
        "icon": "🎮",
        "typeLabel": "HTML5 Mini Oyun",
        "title": "Oyun: Çıktı Sayacı",
        "subtitle": "Deneylerdeki olası durum sayılarını doğru belirle!",
        "gameType": "final_marathon",
        "challenges": [
          {
            "q": "24 sayısının pozitif tam sayı çarpanları arasından bir sayı seçildiğinde kaç olası durum vardır?",
            "choices": [
              "6",
              "8",
              "12"
            ],
            "ans": "8"
          },
          {
            "q": "Bir zarın üst yüzüne asal sayı gelmesi olayının çıktı sayısı kaçtır?",
            "choices": [
              "2",
              "3",
              "4"
            ],
            "ans": "3"
          },
          {
            "q": "Bir madeni para atıldığında olası durum sayısı kaçtır?",
            "choices": [
              "1",
              "2",
              "4"
            ],
            "ans": "2"
          }
        ],
        "id": 4,
        "kazanimId": "k1"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Kazanım Kontrol: Olası Durum Sayısı",
        "subtitle": "Kazanım 1'i yeşile çevirmek için bu soruyu çöz!",
        "stem": "<strong>1'den 30'a kadar</strong> (1 ve 30 dahil) numaralandırılmış eş toplar arasından rastgele çekilen bir topun numarasının <strong>tam kare sayı</strong> olması olayının çıktı sayısı kaçtır?",
        "options": [
          {
            "letter": "A",
            "text": "4"
          },
          {
            "letter": "B",
            "text": "5"
          },
          {
            "letter": "C",
            "text": "6"
          },
          {
            "letter": "D",
            "text": "7"
          }
        ],
        "correctLetter": "B",
        "hint": "1 ile 30 arasındaki tam kare sayıları say: 1, 4, 9, 16, 25.",
        "solution": "1 ile 30 arasındaki tam kare sayılar: <strong>1, 4, 9, 16 ve 25</strong> olmak üzere toplam <strong>5 tanedir</strong>.",
        "id": 5,
        "kazanimId": "k1"
      },
      {
        "type": "concept",
        "icon": "💡",
        "typeLabel": "Örnek & Keşif",
        "title": "Olasılıkları Hesaplamadan Karşılaştırma",
        "subtitle": "Bir olayın çıktı sayısı (miktarı) ne kadar çoksa, gerçekleşme olasılığı da o kadar fazladır!",
        "explanation": [
          "Bir torbada <strong>5 mavi, 5 sarı ve 2 kırmızı</strong> bilye olsun.<br>• Mavi gelme olasılığı ile sarı gelme olasılığı <strong>EŞİT OLASILIKLIDIR</strong> (5 = 5).",
          "• Mavi gelme olasılığı, kırmızı gelme olasılığından <strong>DAHA FAZLADIR</strong> (5 > 2).<br>• Kırmızı gelme olasılığı ise <strong>DAHA AZDIR</strong>."
        ],
        "sentenceHtml": "Bir zar atıldığında tek sayı gelmesi (1,3,5) ile çift sayı gelmesi (2,4,6) {0} olasılıklıdır. Asal olmayan rakam gelmesi ise asal gelmesinden (2,3,5) {1} olasılıklıdır.",
        "blanks": [
          {
            "id": 0,
            "correct": "eşit",
            "choices": [
              "daha az",
              "eşit",
              "daha fazla"
            ]
          },
          {
            "id": 1,
            "correct": "eşit",
            "choices": [
              "daha az",
              "eşit",
              "imkânsız"
            ]
          }
        ],
        "id": 6,
        "kazanimId": "k2"
      },
      {
        "type": "activity",
        "icon": "🧩",
        "typeLabel": "Etkileşimli Sınıflama",
        "title": "Mavi Gelme Olasılığı Nasıl Değişir?",
        "subtitle": "8 Mavi ve 8 Kırmızı top bulunan torbada yapılan işlemlere göre mavi gelme olasılığını sınıflandır!",
        "activityMode": "custom_sort",
        "sortChoices": [
          "Kırmızıdan Daha Fazla",
          "Kırmızı ile Eşit"
        ],
        "items": [
          {
            "text": "Torbadan 2 kırmızı top çıkarılırsa (8 Mavi, 6 Kırmızı kalır)",
            "answer": "Kırmızıdan Daha Fazla"
          },
          {
            "text": "Torbaya 3 mavi ve 3 kırmızı top eklenirse (11 Mavi, 11 Kırmızı olur)",
            "answer": "Kırmızı ile Eşit"
          },
          {
            "text": "Torbaya sadece 4 mavi top eklenirse",
            "answer": "Kırmızıdan Daha Fazla"
          },
          {
            "text": "Torbadan 1 mavi ve 1 kırmızı top çıkarılırsa",
            "answer": "Kırmızı ile Eşit"
          }
        ],
        "id": 7,
        "kazanimId": "k2"
      },
      {
        "type": "video",
        "icon": "🎬",
        "typeLabel": "Animasyonlu Anlatım",
        "title": "Torbadaki Olasılıkları Eşitleme Soruları",
        "subtitle": "LGS'de 'En az kaç top eklenmeli veya çıkarılmalı?' soruları nasıl çözülür?",
        "videoScene": "custom_steps",
        "steps": [
          {
            "text": "1. Adım: Eşit olasılıklı olması için istenen renklerin top sayıları birbirine eşitlenmelidir.",
            "draw": "s1"
          },
          {
            "text": "2. Adım: Örneğin 4 sarı, 7 mavi ve 9 yeşil top varsa; hepsini eşitlemek için en büyük sayıda (9'da) buluştururuz.",
            "draw": "s2"
          },
          {
            "text": "3. Adım: 5 sarı ve 2 mavi (toplam 7 top) eklenirse hepsi 9'ar tane ve eşit olasılıklı olur!",
            "draw": "s3"
          }
        ],
        "quickQuestion": "6 kırmızı ve 10 beyaz bilye bulunan torbadan rastgele çekilen bilyenin kırmızı veya beyaz olma olasılığını eşitlemek için en az kaç kırmızı bilye eklenmelidir?",
        "quickChoices": [
          "2",
          "4",
          "6"
        ],
        "quickCorrect": "4",
        "id": 8,
        "kazanimId": "k2"
      },
      {
        "type": "game",
        "icon": "🎮",
        "typeLabel": "HTML5 Mini Oyun",
        "title": "Oyun: Olasılık Terazisi",
        "subtitle": "Hangi olayın daha fazla veya eşit olasılıklı olduğunu seç!",
        "gameType": "final_marathon",
        "challenges": [
          {
            "q": "'KAZANIM' kelimesinin harflerinden rastgele seçilen harfin hangisi olma olasılığı daha fazladır?",
            "choices": [
              "K",
              "A",
              "Z"
            ],
            "ans": "A"
          },
          {
            "q": "Bir sınıftan seçilen öğrencinin kız olma olasılığı erkekten fazlaysa hangisi doğrudur?",
            "choices": [
              "Kız > Erkek",
              "Kız = Erkek",
              "Kız < Erkek"
            ],
            "ans": "Kız > Erkek"
          },
          {
            "q": "36 sayısının çarpanlarından seçilen bir sayının tek mi çift mi olma olasılığı daha fazladır?",
            "choices": [
              "Tek",
              "Çift",
              "Eşit"
            ],
            "ans": "Çift"
          }
        ],
        "id": 9,
        "kazanimId": "k2"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Kazanım Kontrol: Harf Kartları",
        "subtitle": "Kazanım 2'yi yeşile çevirmek için bu soruyu çöz!",
        "stem": "<strong>'KARAKARTAL'</strong> kelimesinin harfleri özdeş kartlara tek tek yazılıp bir torbaya atılıyor. Rastgele çekilen bir kartın üzerinde hangi harfin yazma olasılığı <strong>en fazladır</strong>?",
        "options": [
          {
            "letter": "A",
            "text": "K"
          },
          {
            "letter": "B",
            "text": "A"
          },
          {
            "letter": "C",
            "text": "R"
          },
          {
            "letter": "D",
            "text": "L"
          }
        ],
        "correctLetter": "B",
        "hint": "Kelimedeki harfleri say: A harfi 4 kez, K ve R 2'şer kez geçiyor!",
        "solution": "KARAKARTAL kelimesinde <strong>4 tane A</strong>, 2 tane K, 2 tane R, 1 tane T ve 1 tane L harfi vardır. En çok tekrar eden <strong>A</strong> harfinin çekilme olasılığı en fazladır.",
        "id": 10,
        "kazanimId": "k2"
      },
      {
        "type": "concept",
        "icon": "💡",
        "typeLabel": "Örnek & Keşif",
        "title": "Olasılık Spektrumu: 0 ≤ Olasılık ≤ 1",
        "subtitle": "Hiçbir olayın olasılığı negatif olamaz ve 1'den (%100'den) büyük olamaz!",
        "explanation": [
          "• Gerçekleşmesi mümkün olmayan olaylara <strong>imkânsız olay</strong> denir ve olasılığı <strong>0</strong>'dır.<br>• Her durumda gerçekleşecek olaylara <strong>kesin olay</strong> denir ve olasılığı <strong>1</strong>'dir (%100).",
          "• <strong>n</strong> tane eş olasılıklı çıktı varsa her bir çıktının olma olasılığı <strong>1/n</strong>'dir."
        ],
        "sentenceHtml": "İmkânsız bir olayın olma olasılığı {0}, kesin bir olayın olma olasılığı ise {1} sayısına eşittir. Bir olasılık değeri asla 1'den {2} olamaz.",
        "blanks": [
          {
            "id": 0,
            "correct": "0",
            "choices": [
              "−1",
              "0",
              "1/2"
            ]
          },
          {
            "id": 1,
            "correct": "1",
            "choices": [
              "0",
              "1",
              "10"
            ]
          },
          {
            "id": 2,
            "correct": "büyük",
            "choices": [
              "küçük",
              "büyük",
              "eşit"
            ]
          }
        ],
        "id": 11,
        "kazanimId": "k3"
      },
      {
        "type": "activity",
        "icon": "🧩",
        "typeLabel": "Etkileşimli Sınıflama",
        "title": "Olasılık Değeri Olabilir mi, Olamaz mı?",
        "subtitle": "Olasılık değeri daima 0 ile 1 arasında (0 ve 1 dahil) olmalıdır!",
        "activityMode": "custom_sort",
        "sortChoices": [
          "Olasılık Olabilir",
          "Olasılık Olamaz!"
        ],
        "items": [
          {
            "text": "3 / 5 = 0,6 (%60)",
            "answer": "Olasılık Olabilir"
          },
          {
            "text": "7 / 4 = 1,75 (Bileşik kesir > 1)",
            "answer": "Olasılık Olamaz!"
          },
          {
            "text": "0 (İmkânsız olay)",
            "answer": "Olasılık Olabilir"
          },
          {
            "text": "%125 = 1,25 (1'den büyük)",
            "answer": "Olasılık Olamaz!"
          }
        ],
        "id": 12,
        "kazanimId": "k3"
      },
      {
        "type": "game",
        "icon": "🎮",
        "typeLabel": "HTML5 Mini Oyun",
        "title": "Oyun: Kesin mi, İmkânsız mı?",
        "subtitle": "Olayların olasılık değerlerini doğru belirle!",
        "gameType": "final_marathon",
        "challenges": [
          {
            "q": "Standart bir zar atıldığında üst yüze 7 gelmesi olasılığı kaçtır?",
            "choices": [
              "0",
              "1/7",
              "1"
            ],
            "ans": "0"
          },
          {
            "q": "Sadece kırmızı elmaların olduğu sepetten seçilen elmanın kırmızı olma olasılığı kaçtır?",
            "choices": [
              "0",
              "1/2",
              "1"
            ],
            "ans": "1"
          },
          {
            "q": "10 eş dilimli çarkta her bir dilimin gelme olasılığı kaçtır?",
            "choices": [
              "1/5",
              "1/10",
              "10"
            ],
            "ans": "1/10"
          }
        ],
        "id": 13,
        "kazanimId": "k3"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Bir Olayın Olmama Olasılığı: 1 − P(A)",
        "subtitle": "Bir olayın olma olasılığı ile olmama olasılığının toplamı daima 1'dir!",
        "stem": "Bir okçunun hedefi vurma olasılığı <strong>3 / 8</strong> olduğuna göre, hedefi <strong>vuramama olasılığı</strong> kaçtır?",
        "options": [
          {
            "letter": "A",
            "text": "3 / 8"
          },
          {
            "letter": "B",
            "text": "1 / 2"
          },
          {
            "letter": "C",
            "text": "5 / 8"
          },
          {
            "letter": "D",
            "text": "8 / 3"
          }
        ],
        "correctLetter": "C",
        "hint": "1 tamdan (8/8'den) 3/8'i çıkar!",
        "solution": "Olma olasılığı + Olmama olasılığı = 1 olduğundan; vuramama olasılığı = 1 − 3/8 = <strong>5 / 8</strong> bulunur.",
        "id": 14,
        "kazanimId": "k3"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Kazanım Kontrol: Olasılık Değeri Sınırı",
        "subtitle": "Kazanım 3'ü yeşile çevirmek için bu soruyu çöz!",
        "stem": "Aşağıdaki sayılardan hangisi bir olayın olma olasılığı <strong>olamaz</strong>?",
        "options": [
          {
            "letter": "A",
            "text": "0"
          },
          {
            "letter": "B",
            "text": "4 / 9"
          },
          {
            "letter": "C",
            "text": "%100"
          },
          {
            "letter": "D",
            "text": "9 / 8"
          }
        ],
        "correctLetter": "D",
        "hint": "Payı paydasından büyük olan 9/8 kesri 1'den büyüktür!",
        "solution": "0 (imkânsız), 4/9 ve %100 = 1 (kesin) olasılık değeri olabilir; ancak <strong>9 / 8 = 1,125 > 1</strong> olduğu için olasılık değeri olamaz.",
        "id": 15,
        "kazanimId": "k3"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Eş Olasılıklı Kartlar",
        "subtitle": "Her bir çıktının olasılığı 1/n ise toplam kart sayısını bul.",
        "stem": "Bir kutudaki özdeş topların her birinin çekilme olasılığı eşittir ve <strong>1 / 15</strong>'tir. Kutuda <strong>6 mavi top</strong> varsa, mavi olmayan kaç top vardır?",
        "options": [
          {
            "letter": "A",
            "text": "6"
          },
          {
            "letter": "B",
            "text": "8"
          },
          {
            "letter": "C",
            "text": "9"
          },
          {
            "letter": "D",
            "text": "15"
          }
        ],
        "correctLetter": "C",
        "hint": "1/n = 1/15 ise kutuda toplam 15 top vardır. 15 − 6 işlemini yap!",
        "solution": "Her bir çıktının olasılığı 1/15 olduğundan kutuda toplam <strong>15 top</strong> vardır. Mavi olmayan top sayısı = 15 − 6 = <strong>9</strong>'dur.",
        "id": 16,
        "kazanimId": "k3"
      },
      {
        "type": "concept",
        "icon": "💡",
        "typeLabel": "Örnek & Keşif",
        "title": "Temel Formül: İstenen Durum Sayısı / Tüm Durumların Sayısı",
        "subtitle": "Bulunan kesir şıklarda en sade haliyle veya yüzde/ondalık olarak verilir!",
        "explanation": [
          "Bir olayın olma olasılığı = <strong>İstenen Olası Durum Sayısı / Tüm Olası Durumların Sayısı</strong>.",
          "Örneğin 1'den 10'a kadar kartlardan çekilen bir kartın <strong>asal sayı</strong> (2, 3, 5, 7 ⇒ 4 tane) olma olasılığı <strong>4 / 10 = 2 / 5 (%40)</strong> olur."
        ],
        "sentenceHtml": "Bir zar atıldığında üst yüze 4'ten büyük sayı (5 veya 6) gelme olasılığı 2/6 = {0} kesrine eşittir.",
        "blanks": [
          {
            "id": 0,
            "correct": "1/3",
            "choices": [
              "1/6",
              "1/3",
              "1/2"
            ]
          }
        ],
        "id": 17,
        "kazanimId": "k4"
      },
      {
        "type": "video",
        "icon": "🎬",
        "typeLabel": "Animasyonlu Anlatım",
        "title": "Torbaya Top Ekleme / Çıkarma Olasılık Denklemleri",
        "subtitle": "Olasılık oranı verilip bilinmeyen top sayısı sorulduğunda içler-dışlar çarpımı yaparız!",
        "videoScene": "custom_steps",
        "steps": [
          {
            "text": "1. Adım: Torbada 4 kırmızı ve x mavi top olsun. Toplam top sayısı (4 + x) olur.",
            "draw": "s1"
          },
          {
            "text": "2. Adım: Kırmızı çekilme olasılığı 1/3 ise: 4 / (4 + x) = 1 / 3 denklemini kurarız.",
            "draw": "s2"
          },
          {
            "text": "3. Adım: 4 + x = 12 ⇒ x = 8 mavi top olduğunu kolayca buluruz!",
            "draw": "s3"
          }
        ],
        "quickQuestion": "5 sarı ve 15 lacivert top bulunan torbadan rastgele çekilen bir topun sarı olma olasılığı kaçtır?",
        "quickChoices": [
          "1/3",
          "1/4",
          "1/5"
        ],
        "quickCorrect": "1/4",
        "id": 18,
        "kazanimId": "k4"
      },
      {
        "type": "activity",
        "icon": "🧩",
        "typeLabel": "Etkileşimli Etkinlik",
        "title": "Olasılık Kesirlerini Hesapla",
        "subtitle": "Hilesiz bir zar atılması deneyinde istenen olasılıkların en sade halini seç!",
        "activityMode": "rainbow_pairs",
        "targetNumber": 0,
        "sequence": [
          "Asal sayı gelme=?",
          "3'ün katı gelme=?",
          "Tek sayı gelme=?"
        ],
        "missingTargets": [
          {
            "index": 0,
            "answer": "1/2",
            "hint": "Asallar: 2, 3, 5 ⇒ 3/6 = 1/2"
          },
          {
            "index": 1,
            "answer": "1/3",
            "hint": "3 ve 6 ⇒ 2/6 = 1/3"
          },
          {
            "index": 2,
            "answer": "1/2",
            "hint": "1, 3, 5 ⇒ 3/6 = 1/2"
          }
        ],
        "pool": [
          "1/6",
          "1/3",
          "1/2",
          "2/3",
          "5/6"
        ],
        "id": 19,
        "kazanimId": "k4"
      },
      {
        "type": "game",
        "icon": "🎮",
        "typeLabel": "HTML5 Mini Oyun",
        "title": "Oyun: Olasılık Hesaplayıcı",
        "subtitle": "İstenen durum / tüm durum oranını en sade haliyle bul!",
        "gameType": "final_marathon",
        "challenges": [
          {
            "q": "12 kız ve 18 erkek arasından seçilen birinin kız olma olasılığı kaçtır?",
            "choices": [
              "2/5",
              "3/5",
              "2/3"
            ],
            "ans": "2/5"
          },
          {
            "q": "Rakamlar arasından seçilen bir sayının çift olma olasılığı kaçtır?",
            "choices": [
              "4/9",
              "1/2",
              "5/9"
            ],
            "ans": "1/2"
          },
          {
            "q": "20 kişilik sınıftan seçilen birinin gözlük kullanma olasılığı %25 ise sınıfta kaç gözlüklü vardır?",
            "choices": [
              "4",
              "5",
              "8"
            ],
            "ans": "5"
          }
        ],
        "id": 20,
        "kazanimId": "k4"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Çarpanlardan Seçim Olasılığı",
        "subtitle": "1. Ünite ile Olasılık konusunu birleştiren LGS sorusu!",
        "stem": "<strong>30 sayısının</strong> pozitif tam sayı çarpanlarının tamamı eş kartlara yazılıp bir torbaya atılıyor. Çekilen kartın <strong>asal sayı</strong> olma olasılığı kaçtır?",
        "options": [
          {
            "letter": "A",
            "text": "1 / 4"
          },
          {
            "letter": "B",
            "text": "3 / 8"
          },
          {
            "letter": "C",
            "text": "1 / 2"
          },
          {
            "letter": "D",
            "text": "5 / 8"
          }
        ],
        "correctLetter": "B",
        "hint": "30'un 8 çarpanı vardır (1, 2, 3, 5, 6, 10, 15, 30). Bunlardan asal olanlar 2, 3 ve 5'tir!",
        "solution": "30'un pozitif çarpanları: 1, <strong>2, 3, 5</strong>, 6, 10, 15, 30 (Toplam <strong>8</strong> durum). Asal olanlar 2, 3 ve 5 (<strong>3</strong> durum). Olasılık = <strong>3 / 8</strong>.",
        "id": 21,
        "kazanimId": "k4"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Kazanım Kontrol: Bilinmeyen Top Sayısı",
        "subtitle": "Kazanım 4'ü yeşile çevirmek için bu soruyu çöz!",
        "stem": "Bir kutuda <strong>8 beyaz</strong> ve bir miktar <strong>siyah</strong> bilye vardır. Kutudan rastgele çekilen bir bilyenin <strong>siyah olma olasılığı 3 / 5</strong> olduğuna göre kutuda kaç siyah bilye vardır?",
        "options": [
          {
            "letter": "A",
            "text": "10"
          },
          {
            "letter": "B",
            "text": "12"
          },
          {
            "letter": "C",
            "text": "15"
          },
          {
            "letter": "D",
            "text": "20"
          }
        ],
        "correctLetter": "B",
        "hint": "Siyah olma olasılığı 3/5 ise beyaz olma olasılığı 2/5'tir. 2 kat = 8 beyaz ise 3 kat = 12 siyah!",
        "solution": "Siyah olasılığı 3/5 ise beyaz olasılığı 1 − 3/5 = <strong>2/5</strong>'tir. 2k = 8 beyaz ⇒ k = 4 olur. Siyah bilye sayısı = 3k = 3 × 4 = <strong>12</strong> bulunur.",
        "id": 22,
        "kazanimId": "k4"
      },
      {
        "type": "concept",
        "icon": "💡",
        "typeLabel": "Örnek & Keşif",
        "title": "Hedef Tahtasında Alan Olasılığı ve İki Boyutlu Tablolar",
        "subtitle": "Geometrik şekillerde olasılık = İstenen Bölgenin Alanı / Tüm Hedef Tahtasının Alanı!",
        "explanation": [
          "Örneğin kenarı 10 cm olan kare bir hedef tahtasının (alan = 100 cm²) içindeki 25 cm²'lik boyalı bölgeyi vurma olasılığı <strong>25 / 100 = 1 / 4</strong>'tür.",
          "Kız/Erkek ve Gözlüklü/Gözlüksüz gibi 2×2 tablolarda ise tüm sınıftan seçim yapılıyorsa paydaya <strong>sınıfın tamamı</strong> yazılır!"
        ],
        "sentenceHtml": "Alanı 60 br² olan bir dikdörtgenin içindeki 15 br²'lik boyalı üçgeni vurma olasılığı 15/60 = {0} olur.",
        "blanks": [
          {
            "id": 0,
            "correct": "1/4",
            "choices": [
              "1/3",
              "1/4",
              "1/5"
            ]
          }
        ],
        "id": 23,
        "kazanimId": "k5"
      },
      {
        "type": "activity",
        "icon": "🧩",
        "typeLabel": "Etkileşimli Etkinlik",
        "title": "Tablodan Olasılık Okuma",
        "subtitle": "Bir sınıfta 6 Gözlüklü Kız, 4 Gözlüksüz Kız, 5 Gözlüklü Erkek ve 5 Gözlüksüz Erkek (Toplam 20 kişi) vardır. Olasılıkları bul!",
        "activityMode": "rainbow_pairs",
        "targetNumber": 0,
        "sequence": [
          "Kız olma=?",
          "Gözlüklü olma=?",
          "Gözlüklü Erkek=?"
        ],
        "missingTargets": [
          {
            "index": 0,
            "answer": "1/2",
            "hint": "10 Kız / 20 = 1/2"
          },
          {
            "index": 1,
            "answer": "11/20",
            "hint": "(6+5) / 20 = 11/20"
          },
          {
            "index": 2,
            "answer": "1/4",
            "hint": "5 / 20 = 1/4"
          }
        ],
        "pool": [
          "1/4",
          "1/2",
          "11/20",
          "3/5",
          "3/4"
        ],
        "id": 24,
        "kazanimId": "k5"
      },
      {
        "type": "game",
        "icon": "🎮",
        "typeLabel": "HTML5 Mini Oyun",
        "title": "Oyun: Hedef Tahtası Olasılığı",
        "subtitle": "Alan oranlarını kullanarak vurma olasılığını hesapla!",
        "gameType": "final_marathon",
        "challenges": [
          {
            "q": "8 eş dilime ayrılmış çarkta 2 dilim sarıysa sarı gelme olasılığı kaçtır?",
            "choices": [
              "1/8",
              "1/4",
              "1/2"
            ],
            "ans": "1/4"
          },
          {
            "q": "Kenarı 6 cm olan kare hedefte kenarı 2 cm olan iç kareyi vurma olasılığı kaçtır?",
            "choices": [
              "1/3",
              "1/6",
              "1/9"
            ],
            "ans": "1/9"
          },
          {
            "q": "Daire grafiğinde merkez açısı 90° olan bölgeden seçilme olasılığı kaçtır?",
            "choices": [
              "1/4",
              "1/3",
              "1/2"
            ],
            "ans": "1/4"
          }
        ],
        "id": 25,
        "kazanimId": "k5"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Kazanım Kontrol: Daire Grafiği ve Olasılık",
        "subtitle": "Kazanım 5'i yeşile çevirmek için bu soruyu çöz!",
        "stem": "Bir okulun öğrencilerinin sınıf dağılımı daire grafiğinde gösterildiğinde <strong>8. sınıflara ait merkez açı 108°</strong> olmaktadır. Okuldan rastgele seçilen bir öğrencinin <strong>8. sınıf olma olasılığı</strong> kaçtır?",
        "options": [
          {
            "letter": "A",
            "text": "1 / 5"
          },
          {
            "letter": "B",
            "text": "3 / 10"
          },
          {
            "letter": "C",
            "text": "2 / 5"
          },
          {
            "letter": "D",
            "text": "3 / 8"
          }
        ],
        "correctLetter": "B",
        "hint": "Daire grafiğinde olasılık = Merkez Açı / 360° = 108 / 360. 36 ile sadeleştir!",
        "solution": "Olasılık = Merkez Açı / 360° = 108° / 360°. Pay ve paydayı 36 ile sadeleştirirsek <strong>3 / 10</strong> bulunur.",
        "id": 26,
        "kazanimId": "k5"
      },
      {
        "type": "activity",
        "icon": "🧩",
        "typeLabel": "Etkileşimli Etkinlik",
        "title": "Adım Adım LGS Kurgusu: Koltuk Seçimi",
        "subtitle": "1'den 20'ye numaralı 20 koltuktan 4 tanesi (2, 5, 10, 15) doludur. Boş koltuklardan rastgele seçim yapılıyor!",
        "activityMode": "rainbow_pairs",
        "targetNumber": 0,
        "sequence": [
          "Boş koltuk (Tüm durum)=?",
          "Boş asal koltuk sayısı=?",
          "Asal boş koltuk olasılığı=?"
        ],
        "missingTargets": [
          {
            "index": 0,
            "answer": 16,
            "hint": "20 − 4 = 16 boş koltuk vardır."
          },
          {
            "index": 1,
            "answer": 6,
            "hint": "Asallar (2,3,5,7,11,13,17,19) içinde 2 ve 5 dolu ⇒ 6 boş asal kaldı."
          },
          {
            "index": 2,
            "answer": "3/8",
            "hint": "6 / 16 = 3 / 8"
          }
        ],
        "pool": [
          6,
          8,
          16,
          20,
          "3/8",
          "2/5"
        ],
        "id": 27,
        "kazanimId": "k6"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "LGS Yeni Nesil 1: Şifre Oluşturma Olasılığı",
        "subtitle": "Koşulu sağlayan iki basamaklı sayıları listeleyerek olasılığı bul.",
        "stem": "İki basamaklı <strong>tam kare doğal sayıların</strong> tamamı eş kartlara yazılıp bir kutuya atılıyor. Rastgele çekilen bir karttaki sayının <strong>birler basamağının 6</strong> olma olasılığı kaçtır?",
        "options": [
          {
            "letter": "A",
            "text": "1 / 6"
          },
          {
            "letter": "B",
            "text": "1 / 3"
          },
          {
            "letter": "C",
            "text": "1 / 2"
          },
          {
            "letter": "D",
            "text": "2 / 3"
          }
        ],
        "correctLetter": "B",
        "hint": "İki basamaklı tam kareler: 16, 25, 36, 49, 64, 81 (6 tane). Birler basamağı 6 olanlar: 16 ve 36!",
        "solution": "İki basamaklı tam kareler: <strong>16, 25, 36, 49, 64, 81</strong> (Toplam 6 durum). Birler basamağı 6 olanlar <strong>16 ve 36</strong> (2 durum). Olasılık = 2 / 6 = <strong>1 / 3</strong>.",
        "id": 28,
        "kazanimId": "k6"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "LGS Yeni Nesil 2: Kesilen Karton Parçaları",
        "subtitle": "Çarpan çiftleri ve olasılık bir arada.",
        "stem": "Kenar uzunlukları santimetre cinsinden birer tam sayı ve alanı <strong>24 cm²</strong> olan dikdörtgenlerden biri rastgele seçiliyor. Seçilen dikdörtgenin <strong>çevresinin 24 cm'den fazla</strong> olma olasılığı kaçtır?",
        "options": [
          {
            "letter": "A",
            "text": "1 / 4"
          },
          {
            "letter": "B",
            "text": "1 / 2"
          },
          {
            "letter": "C",
            "text": "3 / 4"
          },
          {
            "letter": "D",
            "text": "1"
          }
        ],
        "correctLetter": "B",
        "hint": "24'ün dikdörtgen kenar çiftleri: (1,24)⇒Ç=50, (2,12)⇒Ç=28, (3,8)⇒Ç=22, (4,6)⇒Ç=20.",
        "solution": "4 olası dikdörtgen vardır: (1×24 ⇒ Ç=50 cm), (2×12 ⇒ Ç=28 cm), (3×8 ⇒ Ç=22 cm) ve (4×6 ⇒ Ç=20 cm). Çevresi 24 cm'den fazla olanlar 50 cm ve 28 cm (2 durum) olduğundan olasılık = 2 / 4 = <strong>1 / 2</strong> bulunur.",
        "id": 29,
        "kazanimId": "k6"
      },
      {
        "type": "game",
        "icon": "🏆",
        "typeLabel": "Final Maratonu",
        "title": "Final: Olasılık Şampiyonluk Etabı",
        "subtitle": "Son 3 görevi tamamla ve 5. Üniteyi tamamen YEŞİLE döndür!",
        "gameType": "final_marathon",
        "challenges": [
          {
            "q": "1'den 12'ye kadar sayılardan seçilen bir sayının 12'nin çarpanı olma olasılığı kaçtır?",
            "choices": [
              "1/3",
              "1/2",
              "2/3"
            ],
            "ans": "1/2"
          },
          {
            "q": "Bir olayın olma olasılığı 2/7 ise olmama olasılığı kaçtır?",
            "choices": [
              "3/7",
              "5/7",
              "7/2"
            ],
            "ans": "5/7"
          },
          {
            "q": "Eş olasılıklı 8 çıktıdan her birinin olasılığı kaçtır?",
            "choices": [
              "0,125",
              "0,25",
              "0,8"
            ],
            "ans": "0,125"
          }
        ],
        "id": 30,
        "kazanimId": "k6"
      }
    ]
  },
  {
    "id": "m8-u6-cebirsel-ozdeslik",
    "grade": 8,
    "unitNo": 6,
    "title": "Cebirsel İfadeler ve Özdeşlikler",
    "subtitle": "Terim/Katsayı, Cebirsel Çarpma, Tam Kare, İki Kare Farkı ve Çarpanlara Ayırma",
    "coverImage": "assets/flow/u06_cebirsel_ozdeslik.jpg",
    "badgeCells": [
      "x²",
      "+2xy",
      "+y²",
      "a²−b²",
      "(x+y)²",
      "(x−y)²",
      "3x",
      "−5",
      "🧩",
      "📐",
      "≡",
      "LGS"
    ],
    "kazanimlar": [
      {
        "id": "k1",
        "no": 1,
        "title": "Değişken, Terim, Katsayı ve Sabit Terim",
        "code": "M.8.2.1.1",
        "visual": "assets/flow/u06_cebirsel_ozdeslik.jpg",
        "stops": [
          1,
          2,
          3,
          4,
          5
        ]
      },
      {
        "id": "k2",
        "no": 2,
        "title": "Cebirsel İfadelerin Çarpımı ve Alan Modelleri",
        "code": "M.8.2.1.2",
        "visual": "assets/flow/u06_cebirsel_ozdeslik.jpg",
        "stops": [
          6,
          7,
          8,
          9,
          10
        ]
      },
      {
        "id": "k3",
        "no": 3,
        "title": "Tam Kare Özdeşlikleri: (a+b)² ve (a−b)²",
        "code": "M.8.2.1.3",
        "visual": "assets/flow/u06_cebirsel_ozdeslik.jpg",
        "stops": [
          11,
          12,
          13,
          14,
          15,
          16
        ]
      },
      {
        "id": "k4",
        "no": 4,
        "title": "İki Kare Farkı Özdeşliği: a² − b²",
        "code": "M.8.2.1.3",
        "visual": "assets/flow/u06_cebirsel_ozdeslik.jpg",
        "stops": [
          17,
          18,
          19,
          20,
          21,
          22
        ]
      },
      {
        "id": "k5",
        "no": 5,
        "title": "Ortak Çarpan Parantezine Alma ve Çarpanlara Ayırma",
        "code": "M.8.2.1.4",
        "visual": "assets/flow/u06_cebirsel_ozdeslik.jpg",
        "stops": [
          23,
          24,
          25,
          26
        ]
      },
      {
        "id": "k6",
        "no": 6,
        "title": "LGS Katlama, Kesme ve Alan Görevleri",
        "code": "M.8.2.1.4",
        "visual": "assets/flow/u06_cebirsel_ozdeslik.jpg",
        "stops": [
          27,
          28,
          29,
          30
        ]
      }
    ],
    "stops": [
      {
        "type": "concept",
        "icon": "💡",
        "typeLabel": "Örnek & Keşif",
        "title": "Cebirsel İfadenin Yapı Taşları",
        "subtitle": "Artı (+) veya eksi (−) işaretleriyle ayrılan her parçaya TERİM, yanında harf bulunmayan terime SABİT TERİM denir.",
        "explanation": [
          "Örneğin <strong>4x² − 7xy + 5x − 9</strong> ifadesinde:<br>• <strong>4 terim</strong> vardır.<br>• Katsayılar işaretleriyle birlikte alınır: <strong>4, −7, +5 ve −9</strong> (Katsayılar toplamı = −7).",
          "• Değişken içermeyen <strong>−9</strong> sayısına <strong>sabit terim</strong> denir (Sabit terim aynı zamanda bir katsayıdır!)."
        ],
        "sentenceHtml": "6x² − 5x + 11 cebirsel ifadesinin terim sayısı {0}, sabit terimi {1} ve katsayılar toplamı (6 − 5 + 11) = {2} olur.",
        "blanks": [
          {
            "id": 0,
            "correct": "3",
            "choices": [
              "2",
              "3",
              "4"
            ]
          },
          {
            "id": 1,
            "correct": "+11",
            "choices": [
              "−5",
              "+6",
              "+11"
            ]
          },
          {
            "id": 2,
            "correct": "12",
            "choices": [
              "12",
              "16",
              "22"
            ]
          }
        ],
        "id": 1,
        "kazanimId": "k1"
      },
      {
        "type": "video",
        "icon": "🎬",
        "typeLabel": "Animasyonlu Anlatım",
        "title": "Benzer Terimleri Düzenledikten Sonra Terim Sayısı Bulma",
        "subtitle": "Dikkat: Benzer terimler toplanıp en sade hale getirilmeden terim sayısı söylenmez!",
        "videoScene": "custom_steps",
        "steps": [
          {
            "text": "1. Adım: 3x + 5y + 4x − 2 ifadesinde 3x ile 4x benzer terimdir ve toplanarak 7x + 5y − 2 yazılır.",
            "draw": "s1"
          },
          {
            "text": "2. Adım: En sade halinde 3 terim vardır; katsayılar toplamı ise değişmez (7 + 5 − 2 = 10).",
            "draw": "s2"
          },
          {
            "text": "3. Adım: Bir cebirsel ifadede katsayılar toplamını hızlıca bulmak için değişkenler yerine 1 yazabiliriz!",
            "draw": "s3"
          }
        ],
        "quickQuestion": "5a − 8b + 3 cebirsel ifadesinin katsayıları toplamı kaçtır?",
        "quickChoices": [
          "0",
          "10",
          "16"
        ],
        "quickCorrect": "0",
        "id": 2,
        "kazanimId": "k1"
      },
      {
        "type": "activity",
        "icon": "🧩",
        "typeLabel": "Etkileşimli Etkinlik",
        "title": "Cebirsel Analiz Tablosu",
        "subtitle": "8x² − 3x − 4 cebirsel ifadesine göre turuncu kutuları tamamla!",
        "activityMode": "rainbow_pairs",
        "targetNumber": 0,
        "sequence": [
          "Terim sayısı=?",
          "Sabit terim=?",
          "Katsayılar toplamı=?"
        ],
        "missingTargets": [
          {
            "index": 0,
            "answer": 3,
            "hint": "8x², −3x ve −4 olmak üzere 3 terim vardır."
          },
          {
            "index": 1,
            "answer": -4,
            "hint": "İşaretiyle birlikte sabit terim −4'tür."
          },
          {
            "index": 2,
            "answer": 1,
            "hint": "8 + (−3) + (−4) = 1"
          }
        ],
        "pool": [
          1,
          3,
          4,
          -3,
          -4,
          15
        ],
        "id": 3,
        "kazanimId": "k1"
      },
      {
        "type": "game",
        "icon": "🎮",
        "typeLabel": "HTML5 Mini Oyun",
        "title": "Oyun: Cebir Dedektifi",
        "subtitle": "Terim ve katsayı sorularını işaret tuzaklarına düşmeden çöz!",
        "gameType": "final_marathon",
        "challenges": [
          {
            "q": "4a² − 9b ifadesinin sabit terimi kaçtır?",
            "choices": [
              "0",
              "−9",
              "4"
            ],
            "ans": "0"
          },
          {
            "q": "x² − x − 6 ifadesinin katsayıları toplamı kaçtır?",
            "choices": [
              "−5",
              "−6",
              "−7"
            ],
            "ans": "−6"
          },
          {
            "q": "Hangisi 12x²y ifadesine özdeş değildir?",
            "choices": [
              "3x · 4xy",
              "6x² · 2y",
              "6x · 2xy²"
            ],
            "ans": "6x · 2xy²"
          }
        ],
        "id": 4,
        "kazanimId": "k1"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Kazanım Kontrol: Katsayı ve Sabit Terim",
        "subtitle": "Kazanım 1'i yeşile çevirmek için bu soruyu çöz!",
        "stem": "<strong>3x² − kx + 7</strong> cebirsel ifadesinin <strong>katsayılar toplamı 4</strong> olduğuna göre, <strong>k</strong> sayısı kaçtır?",
        "options": [
          {
            "letter": "A",
            "text": "4"
          },
          {
            "letter": "B",
            "text": "6"
          },
          {
            "letter": "C",
            "text": "−6"
          },
          {
            "letter": "D",
            "text": "8"
          }
        ],
        "correctLetter": "B",
        "hint": "Katsayılar: 3 − k + 7 = 4 denklemini çöz!",
        "solution": "Katsayılar toplamı = 3 + (−k) + 7 = 10 − k = 4 olduğundan <strong>k = 6</strong> bulunur.",
        "id": 5,
        "kazanimId": "k1"
      },
      {
        "type": "concept",
        "icon": "💡",
        "typeLabel": "Örnek & Keşif",
        "title": "Dağılma Özelliği ve Cebir Karoları",
        "subtitle": "İki parantez çarpılırken birinci parantezdeki her terim ikinci parantezdeki her terimle tek tek çarpılır!",
        "explanation": [
          "Örneğin kenarları <strong>(x + 3)</strong> ve <strong>(x + 2)</strong> olan bir dikdörtgenin alanı:<br><strong>(x + 3)(x + 2) = x² + 2x + 3x + 6 = x² + 5x + 6</strong> olur.",
          "Cebir karolarında bu alan; <strong>1 tane x² karesi</strong>, <strong>5 tane x dikdörtgeni</strong> ve <strong>6 tane 1 birimlik küçük kareden</strong> oluşur!"
        ],
        "sentenceHtml": "3x · (2x − 4) çarpımının sonucu {0} olur. (x + 4) · (x + 1) çarpımının en sade hali ise {1} ifadesidir.",
        "blanks": [
          {
            "id": 0,
            "correct": "6x² − 12x",
            "choices": [
              "5x² − 12x",
              "6x² − 4",
              "6x² − 12x"
            ]
          },
          {
            "id": 1,
            "correct": "x² + 5x + 4",
            "choices": [
              "x² + 4",
              "x² + 5x + 4",
              "x² + 4x + 5"
            ]
          }
        ],
        "id": 6,
        "kazanimId": "k2"
      },
      {
        "type": "activity",
        "icon": "🧩",
        "typeLabel": "Etkileşimli Etkinlik",
        "title": "Parantez Çarpımlarını Tamamla",
        "subtitle": "Dağılma özelliğini kullanarak x'li terimin veya sabit terimin katsayısını bul!",
        "activityMode": "rainbow_pairs",
        "targetNumber": 0,
        "sequence": [
          "(x+5)(x+2) = x²+?x+10",
          "(x−4)(x+3) = x²−x+?",
          "(2x+1)(x+3) = ?x²+7x+3"
        ],
        "missingTargets": [
          {
            "index": 0,
            "answer": 7,
            "hint": "2x + 5x = 7x"
          },
          {
            "index": 1,
            "answer": -12,
            "hint": "(−4) × (+3) = −12"
          },
          {
            "index": 2,
            "answer": 2,
            "hint": "2x · x = 2x²"
          }
        ],
        "pool": [
          2,
          3,
          7,
          -1,
          -7,
          -12
        ],
        "id": 7,
        "kazanimId": "k2"
      },
      {
        "type": "video",
        "icon": "🎬",
        "typeLabel": "Animasyonlu Anlatım",
        "title": "Çerçeve ve Havuz Etrafındaki Yürüyüş Yolu Alanı",
        "subtitle": "LGS'de kenarlardan boşluk bırakılan resim veya bahçe sorularında kenar uzunluğu nasıl değişir?",
        "videoScene": "custom_steps",
        "steps": [
          {
            "text": "1. Adım: Kenarı 2x olan bir bahçenin içinden her yandan 3 metre çekilirse, hem sağdan hem soldan 3'er metre azaldığı için yeni kenar (2x − 6) olur!",
            "draw": "s1"
          },
          {
            "text": "2. Adım: Dıştan her yandan y birim çerçeve eklenirse yeni kenar uzunluğuna +2y eklenir.",
            "draw": "s2"
          },
          {
            "text": "3. Adım: Boyalı çerçevenin alanı = Dış Dikdörtgen Alanı − İç Dikdörtgen Alanı!",
            "draw": "s3"
          }
        ],
        "quickQuestion": "Kenar uzunluğu 3x cm olan kare bir kartonun dört kenarından da 2'şer cm'lik şeritler kesilip atılırsa kalan karenin bir kenarı ne olur?",
        "quickChoices": [
          "3x − 2",
          "3x − 4",
          "3x − 8"
        ],
        "quickCorrect": "3x − 4",
        "id": 8,
        "kazanimId": "k2"
      },
      {
        "type": "game",
        "icon": "🎮",
        "typeLabel": "HTML5 Mini Oyun",
        "title": "Oyun: Alan Modeli Mimarı",
        "subtitle": "Cebirsel çarpımları doğru sonuçlarla eşleştir!",
        "gameType": "final_marathon",
        "challenges": [
          {
            "q": "Kısa kenarı 2x, uzun kenarı (3x + 5) olan dikdörtgenin alanı nedir?",
            "choices": [
              "6x² + 5",
              "6x² + 10x",
              "5x + 5"
            ],
            "ans": "6x² + 10x"
          },
          {
            "q": "(x − 5) · (x − 2) çarpımının sabit terimi kaçtır?",
            "choices": [
              "−7",
              "+10",
              "−10"
            ],
            "ans": "+10"
          },
          {
            "q": "Bir kenarı (2x + 3) olan karenin çevresi nedir?",
            "choices": [
              "4x + 6",
              "8x + 12",
              "4x² + 9"
            ],
            "ans": "8x + 12"
          }
        ],
        "id": 9,
        "kazanimId": "k2"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Kazanım Kontrol: Dikdörtgen Bahçe Alanı",
        "subtitle": "Kazanım 2'yi yeşile çevirmek için bu soruyu çöz!",
        "stem": "Kenar uzunlukları <strong>(2x + 3) metre</strong> ve <strong>(x − 1) metre</strong> olan dikdörtgen biçimindeki bir halının santimetrekare/metrekare cinsinden alanını veren cebirsel ifade hangisidir?",
        "options": [
          {
            "letter": "A",
            "text": "2x² + x − 3"
          },
          {
            "letter": "B",
            "text": "2x² − x − 3"
          },
          {
            "letter": "C",
            "text": "2x² + 5x − 3"
          },
          {
            "letter": "D",
            "text": "2x² − 3"
          }
        ],
        "correctLetter": "A",
        "hint": "2x·x + 2x·(−1) + 3·x + 3·(−1) = 2x² − 2x + 3x − 3 işlemini düzenle!",
        "solution": "(2x + 3)(x − 1) = 2x² − 2x + 3x − 3 = <strong>2x² + x − 3</strong> bulunur.",
        "id": 10,
        "kazanimId": "k2"
      },
      {
        "type": "concept",
        "icon": "💡",
        "typeLabel": "Örnek & Keşif",
        "title": "Birincinin Karesi ± Çarpımlarının 2 Katı + İkincinin Karesi!",
        "subtitle": "En sık yapılan hata ortadaki 2ab terimini unutmaktır: (x + 3)² ≠ x² + 9, doğrusu x² + 6x + 9'dur!",
        "explanation": [
          "• <strong>İki Terim Toplamının Karesi:</strong> <strong>(a + b)² = a² + 2ab + b²</strong><br>• <strong>İki Terim Farkının Karesi:</strong> <strong>(a − b)² = a² − 2ab + b²</strong>",
          "• <strong>Denklem ile Özdeşlik Farkı:</strong> Değişkenin her değeri için doğru olan eşitliklere <strong>özdeşlik</strong>, sadece bazı değerler için doğru olanlara <strong>denklem</strong> denir."
        ],
        "sentenceHtml": "(x + 5)² özdeşliğinin açılımı x² + {0} + 25 şeklindedir. (2x − 3)² özdeşliğinin açılımı ise 4x² − {1} + 9 olur.",
        "blanks": [
          {
            "id": 0,
            "correct": "10x",
            "choices": [
              "5x",
              "10x",
              "25x"
            ]
          },
          {
            "id": 1,
            "correct": "12x",
            "choices": [
              "6x",
              "12x",
              "18x"
            ]
          }
        ],
        "id": 11,
        "kazanimId": "k3"
      },
      {
        "type": "video",
        "icon": "🎬",
        "typeLabel": "Animasyonlu Anlatım",
        "title": "Tam Kare İfadeyi Tanıma Testi",
        "subtitle": "Üç terimli bir ifadenin tam kare olup olmadığını 3 saniyede nasıl anlarız?",
        "videoScene": "custom_steps",
        "steps": [
          {
            "text": "1. Adım: Baştaki ve sondaki terimlerin kareköklerini alırız (örneğin 9x² + 24x + 16'da √9x² = 3x ve √16 = 4).",
            "draw": "s1"
          },
          {
            "text": "2. Adım: Bu iki kökün çarpımının 2 katı ortadaki terimi veriyor mu? 2 · (3x) · 4 = 24x (Veriyor!).",
            "draw": "s2"
          },
          {
            "text": "3. Sonuç: O halde 9x² + 24x + 16 = (3x + 4)² tam kare özdeşliğidir!",
            "draw": "s3"
          }
        ],
        "quickQuestion": "x² − 14x + K ifadesinin bir tam kare özdeşlik olması için K kaç olmalıdır?",
        "quickChoices": [
          "7",
          "14",
          "49"
        ],
        "quickCorrect": "49",
        "id": 12,
        "kazanimId": "k3"
      },
      {
        "type": "activity",
        "icon": "🧩",
        "typeLabel": "Etkileşimli Etkinlik",
        "title": "Tam Karede Eksik Katsayıyı Bul",
        "subtitle": "Tam kare açılımlarındaki eksik sayıları alttaki seçeneklerden tamamla!",
        "activityMode": "rainbow_pairs",
        "targetNumber": 0,
        "sequence": [
          "(x + 6)² = x² + ?x + 36",
          "(x − ?)² = x² − 16x + 64",
          "4x² + 20x + ? = (2x+5)²"
        ],
        "missingTargets": [
          {
            "index": 0,
            "answer": 12,
            "hint": "2 · x · 6 = 12x"
          },
          {
            "index": 1,
            "answer": 8,
            "hint": "√64 = 8"
          },
          {
            "index": 2,
            "answer": 25,
            "hint": "5² = 25"
          }
        ],
        "pool": [
          6,
          8,
          12,
          16,
          20,
          25
        ],
        "id": 13,
        "kazanimId": "k3"
      },
      {
        "type": "game",
        "icon": "🎮",
        "typeLabel": "HTML5 Mini Oyun",
        "title": "Oyun: Tam Kare Ustası",
        "subtitle": "Tam kare özdeşlik sorularını hızlıca tamamla!",
        "gameType": "final_marathon",
        "challenges": [
          {
            "q": "a + b = 9 ve a·b = 14 ise a² + b² kaçtır?",
            "choices": [
              "53",
              "67",
              "81"
            ],
            "ans": "53"
          },
          {
            "q": "Alanı (x² − 10x + 25) br² olan karenin bir kenarı nedir?",
            "choices": [
              "x − 5",
              "x + 5",
              "x − 10"
            ],
            "ans": "x − 5"
          },
          {
            "q": "(102)² işleminin özdeşlikle açılımı hangisidir?",
            "choices": [
              "(100+2)² = 10404",
              "100² + 2² = 10004",
              "10204"
            ],
            "ans": "(100+2)² = 10404"
          }
        ],
        "id": 14,
        "kazanimId": "k3"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Karenin Alanından Çevresine",
        "subtitle": "Tam kare ifadeyi çarpanlarına ayırarak karenin bir kenarını bul.",
        "stem": "Alanı <strong>(9x² + 30x + 25) cm²</strong> olan karesel bir bölgenin <strong>çevre uzunluğunu</strong> veren cebirsel ifade aşağıdakilerden hangisidir?",
        "options": [
          {
            "letter": "A",
            "text": "3x + 5"
          },
          {
            "letter": "B",
            "text": "6x + 10"
          },
          {
            "letter": "C",
            "text": "12x + 20"
          },
          {
            "letter": "D",
            "text": "36x + 25"
          }
        ],
        "correctLetter": "C",
        "hint": "9x² + 30x + 25 = (3x + 5)² olduğundan bir kenar (3x + 5) cm'dir. Çevre için 4 ile çarp!",
        "solution": "Alan = (3x + 5)² olduğundan karenin bir kenarı <strong>3x + 5 cm</strong>'dir. Çevre = 4 × (3x + 5) = <strong>12x + 20 cm</strong> bulunur.",
        "id": 15,
        "kazanimId": "k3"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Kazanım Kontrol: Değer Hesaplama",
        "subtitle": "Kazanım 3'ü yeşile çevirmek için bu soruyu çöz!",
        "stem": "<strong>x − y = 6</strong> ve <strong>x · y = 7</strong> olduğuna göre, <strong>x² + y²</strong> ifadesinin değeri kaçtır?",
        "options": [
          {
            "letter": "A",
            "text": "22"
          },
          {
            "letter": "B",
            "text": "36"
          },
          {
            "letter": "C",
            "text": "43"
          },
          {
            "letter": "D",
            "text": "50"
          }
        ],
        "correctLetter": "D",
        "hint": "(x − y)² = x² − 2xy + y² eşitliğinde 6² = x² − 2(7) + y² yaz!",
        "solution": "(x − y)² = x² − 2xy + y² özdeşliğinde değerleri yerine yazarsak: 6² = x² − 2·7 + y² ⇒ 36 = x² − 14 + y² ⇒ <strong>x² + y² = 50</strong> bulunur.",
        "id": 16,
        "kazanimId": "k3"
      },
      {
        "type": "concept",
        "icon": "💡",
        "typeLabel": "Örnek & Keşif",
        "title": "İki Kare Farkı: a² − b² = (a − b) · (a + b)",
        "subtitle": "Büyük bir karenin köşesinden küçük bir kare kesilip çıkarıldığında kalan alan daima a² − b² olur!",
        "explanation": [
          "İki terimin kareleri farkı, bu terimlerin <strong>farkı ile toplamının çarpımına</strong> eşittir: <strong>x² − 16 = x² − 4² = (x − 4)(x + 4)</strong>.",
          "Büyük sayılarla işlem yaparken çok pratiktir: <strong>52² − 48² = (52 − 48) · (52 + 48) = 4 · 100 = 400</strong>!"
        ],
        "sentenceHtml": "x² − 49 ifadesi çarpanlarına {0} olarak ayrılır. 25² − 15² işleminin sonucu (25−15)·(25+15) = {1} sayısına eşittir.",
        "blanks": [
          {
            "id": 0,
            "correct": "(x − 7)(x + 7)",
            "choices": [
              "(x − 7)²",
              "(x − 7)(x + 7)",
              "(x + 7)²"
            ]
          },
          {
            "id": 1,
            "correct": "400",
            "choices": [
              "100",
              "200",
              "400"
            ]
          }
        ],
        "id": 17,
        "kazanimId": "k4"
      },
      {
        "type": "video",
        "icon": "🎬",
        "typeLabel": "Animasyonlu Anlatım",
        "title": "Kareden Kare Kesme (LGS'nin En Sevdiği Geometri Modeli)",
        "subtitle": "Bir kenarı a olan kareden bir kenarı b olan kare çıkarıldığında kalan parça nasıl dikdörtgene dönüşür?",
        "videoScene": "custom_steps",
        "steps": [
          {
            "text": "1. Adım: Başlangıçtaki büyük karenin alanı a², kesilip çıkarılan küçük karenin alanı b²'dir.",
            "draw": "s1"
          },
          {
            "text": "2. Adım: Kalan bölgenin alanı a² − b² olur.",
            "draw": "s2"
          },
          {
            "text": "3. Adım: Kalan şekil kesilip uç uca eklendiğinde kısa kenarı (a − b), uzun kenarı (a + b) olan bir dikdörtgen oluşturur!",
            "draw": "s3"
          }
        ],
        "quickQuestion": "9x² − 25y² cebirsel ifadesinin çarpanlarına ayrılmış biçimi hangisidir?",
        "quickChoices": [
          "(3x − 5y)²",
          "(3x − 5y)(3x + 5y)",
          "(9x − 25y)(9x + 25y)"
        ],
        "quickCorrect": "(3x − 5y)(3x + 5y)",
        "id": 18,
        "kazanimId": "k4"
      },
      {
        "type": "activity",
        "icon": "🧩",
        "typeLabel": "Etkileşimli Sınıflama",
        "title": "Tam Kare mi, İki Kare Farkı mı?",
        "subtitle": "Verilen cebirsel ifadeleri hangi özdeşliğe ait olduğuna göre sınıflandır!",
        "activityMode": "custom_sort",
        "sortChoices": [
          "İki Kare Farkı",
          "Tam Kare Özdeşliği"
        ],
        "items": [
          {
            "text": "x² − 36 = (x − 6)(x + 6)",
            "answer": "İki Kare Farkı"
          },
          {
            "text": "x² − 12x + 36 = (x − 6)²",
            "answer": "Tam Kare Özdeşliği"
          },
          {
            "text": "16a² − 9b² = (4a − 3b)(4a + 3b)",
            "answer": "İki Kare Farkı"
          },
          {
            "text": "4a² + 12ab + 9b² = (2a + 3b)²",
            "answer": "Tam Kare Özdeşliği"
          }
        ],
        "id": 19,
        "kazanimId": "k4"
      },
      {
        "type": "game",
        "icon": "🎮",
        "typeLabel": "HTML5 Mini Oyun",
        "title": "Oyun: İki Kare Farkı Hız Testi",
        "subtitle": "İki kare farkı özdeşliğini kullanarak işlemleri saniyeler içinde çöz!",
        "gameType": "final_marathon",
        "challenges": [
          {
            "q": "75² − 25² işleminin sonucu kaçtır?",
            "choices": [
              "2500",
              "5000",
              "7500"
            ],
            "ans": "5000"
          },
          {
            "q": "√(13² − 12²) işleminin sonucu kaçtır?",
            "choices": [
              "1",
              "5",
              "25"
            ],
            "ans": "5"
          },
          {
            "q": "(2x − 7)(2x + 7) çarpımının sonucu nedir?",
            "choices": [
              "4x² − 49",
              "4x² − 14x + 49",
              "2x² − 49"
            ],
            "ans": "4x² − 49"
          }
        ],
        "id": 20,
        "kazanimId": "k4"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Kesilen Karelerden Kalan Alan",
        "subtitle": "Büyük alandan 4 köşedeki küçük karelerin alanını çıkar.",
        "stem": "Bir kenarı <strong>3a cm</strong> olan kare biçimindeki bir kartonun dört köşesinden birer kenarı <strong>b cm</strong> olan <strong>4 eş kare</strong> kesilip atılıyor. Kalan yüzün alanını veren özdeşlik hangisidir?",
        "options": [
          {
            "letter": "A",
            "text": "(3a − b)(3a + b)"
          },
          {
            "letter": "B",
            "text": "(3a − 2b)(3a + 2b)"
          },
          {
            "letter": "C",
            "text": "(3a − 2b)²"
          },
          {
            "letter": "D",
            "text": "(3a − 4b)(3a + 4b)"
          }
        ],
        "correctLetter": "B",
        "hint": "Büyük alan = (3a)² = 9a². Atılan 4 küçük kare = 4b² = (2b)². İki kare farkı uygula!",
        "solution": "Kalan alan = 9a² − 4b² = (3a)² − (2b)² = <strong>(3a − 2b)(3a + 2b)</strong> bulunur.",
        "id": 21,
        "kazanimId": "k4"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Kazanım Kontrol: İki Kare Farkı Denklemi",
        "subtitle": "Kazanım 4'ü yeşile çevirmek için bu soruyu çöz!",
        "stem": "<strong>a² − b² = 48</strong> ve <strong>a − b = 4</strong> olduğuna göre, <strong>a + b</strong> toplamı kaçtır?",
        "options": [
          {
            "letter": "A",
            "text": "8"
          },
          {
            "letter": "B",
            "text": "12"
          },
          {
            "letter": "C",
            "text": "16"
          },
          {
            "letter": "D",
            "text": "44"
          }
        ],
        "correctLetter": "B",
        "hint": "(a − b) · (a + b) = 48 eşitliğinde 4 · (a + b) = 48 yaz!",
        "solution": "a² − b² = (a − b)(a + b) = 48 olduğundan 4 · (a + b) = 48 ⇒ <strong>a + b = 12</strong> bulunur.",
        "id": 22,
        "kazanimId": "k4"
      },
      {
        "type": "concept",
        "icon": "💡",
        "typeLabel": "Örnek & Keşif",
        "title": "Çarpanlara Ayırmada İlk Adım: Ortak Çarpan Parantezi!",
        "subtitle": "Tüm terimlerde ortak olan sayı (EBOB) ve harf parantez dışına alınır; sonra içeride kalan ifadeye özdeşlik uygulanır!",
        "explanation": [
          "Örneğin <strong>12x² − 18x</strong> ifadesinde 12 ve 18'in EBOB'u <strong>6</strong>, ortak harf <strong>x</strong>'tir: <strong>6x · (2x − 3)</strong>.",
          "Birlikte kullanım: <strong>3x² − 12 = 3 · (x² − 4) = 3 · (x − 2) · (x + 2)</strong> (Üç çarpanı vardır: 3, x−2 ve x+2)."
        ],
        "sentenceHtml": "15a² + 10a ifadesi ortak çarpan parantezine {0} olarak alınır. 2x² − 18 ifadesinin tam çarpanlarına ayrılmış hali ise {1} olur.",
        "blanks": [
          {
            "id": 0,
            "correct": "5a(3a + 2)",
            "choices": [
              "5(3a² + 2)",
              "5a(3a + 2)",
              "15a(a + 1)"
            ]
          },
          {
            "id": 1,
            "correct": "2(x − 3)(x + 3)",
            "choices": [
              "2(x − 9)(x + 9)",
              "2(x − 3)²",
              "2(x − 3)(x + 3)"
            ]
          }
        ],
        "id": 23,
        "kazanimId": "k5"
      },
      {
        "type": "activity",
        "icon": "🧩",
        "typeLabel": "Etkileşimli Etkinlik",
        "title": "Ortak Çarpanları Tamamla",
        "subtitle": "İfadelerin parantez dışındaki ortak çarpanlarını bul!",
        "activityMode": "rainbow_pairs",
        "targetNumber": 0,
        "sequence": [
          "8x² + 12x = ?x(2x + 3)",
          "5a² − 5 = ?(a − 1)(a + 1)",
          "3x² + 6x + 3 = ?(x + 1)²"
        ],
        "missingTargets": [
          {
            "index": 0,
            "answer": 4,
            "hint": "8 ve 12'nin EBOB'u 4'tür."
          },
          {
            "index": 1,
            "answer": 5,
            "hint": "5 parantezinde a² − 1 = (a−1)(a+1) kalır."
          },
          {
            "index": 2,
            "answer": 3,
            "hint": "3 parantezinde x² + 2x + 1 = (x+1)² kalır."
          }
        ],
        "pool": [
          2,
          3,
          4,
          5,
          6,
          8
        ],
        "id": 24,
        "kazanimId": "k5"
      },
      {
        "type": "game",
        "icon": "🎮",
        "typeLabel": "HTML5 Mini Oyun",
        "title": "Oyun: Çarpan Avcısı (Cebir)",
        "subtitle": "Verilen cebirsel ifadelerin çarpanlarını doğru tespit et!",
        "gameType": "final_marathon",
        "challenges": [
          {
            "q": "Aşağıdakilerden hangisi 4x² − 36 ifadesinin bir çarpanıdır?",
            "choices": [
              "x − 3",
              "x − 6",
              "2x − 9"
            ],
            "ans": "x − 3"
          },
          {
            "q": "x³ − 6x² + 9x ifadesinin çarpanlarına ayrılmış biçimi nedir?",
            "choices": [
              "x(x − 3)²",
              "x(x − 3)(x + 3)",
              "x(x + 3)²"
            ],
            "ans": "x(x − 3)²"
          },
          {
            "q": "Alanı (6x² + 15x) olan dikdörtgenin bir kenarı 3x ise diğer kenarı nedir?",
            "choices": [
              "2x + 3",
              "2x + 5",
              "3x + 5"
            ],
            "ans": "2x + 5"
          }
        ],
        "id": 25,
        "kazanimId": "k5"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Kazanım Kontrol: Çarpan Bulma",
        "subtitle": "Kazanım 5'i yeşile çevirmek için bu soruyu çöz!",
        "stem": "Aşağıdakilerden hangisi <strong>5x² − 20y²</strong> cebirsel ifadesinin çarpanlarından biri <strong>değildir</strong>?",
        "options": [
          {
            "letter": "A",
            "text": "5"
          },
          {
            "letter": "B",
            "text": "x − 2y"
          },
          {
            "letter": "C",
            "text": "x + 2y"
          },
          {
            "letter": "D",
            "text": "x − 4y"
          }
        ],
        "correctLetter": "D",
        "hint": "Önce 5 parantezine al: 5(x² − 4y²) = 5(x − 2y)(x + 2y).",
        "solution": "5x² − 20y² = 5(x² − 4y²) = <strong>5 · (x − 2y) · (x + 2y)</strong> olarak çarpanlarına ayrılır. <strong>x − 4y</strong> bu ifadenin çarpanı değildir.",
        "id": 26,
        "kazanimId": "k5"
      },
      {
        "type": "activity",
        "icon": "🧩",
        "typeLabel": "Etkileşimli Etkinlik",
        "title": "Adım Adım LGS Kurgusu: Kâğıt Katlama",
        "subtitle": "Uzunluğu (4x + 8) cm olan şerit tam ortadan ikiye katlanıyor, sonra uçtan (x − 1) cm kesiliyor!",
        "activityMode": "rainbow_pairs",
        "targetNumber": 0,
        "sequence": [
          "Katlanınca yeni boy=2x+?",
          "2 kat kesilince eksilen=2x−?",
          "Açılınca kalan boy=2x+?"
        ],
        "missingTargets": [
          {
            "index": 0,
            "answer": 4,
            "hint": "(4x + 8) ÷ 2 = 2x + 4"
          },
          {
            "index": 1,
            "answer": 2,
            "hint": "2 × (x − 1) = 2x − 2"
          },
          {
            "index": 2,
            "answer": 10,
            "hint": "(4x + 8) − (2x − 2) = 2x + 10"
          }
        ],
        "pool": [
          2,
          4,
          6,
          8,
          10,
          12
        ],
        "id": 27,
        "kazanimId": "k6"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "LGS Yeni Nesil 1: Afiş ve Çerçeve Boşluğu",
        "subtitle": "Kenarlardan bırakılan boşluklarla iç bölgenin alanını bulma.",
        "stem": "Kenar uzunlukları <strong>(3x + 4) cm</strong> olan kare bir panonun her kenarından <strong>2 cm</strong> boşluk bırakılarak iç kısmına kare bir afiş yapıştırılıyor. Afişin alanını veren cebirsel ifade hangisidir?",
        "options": [
          {
            "letter": "A",
            "text": "9x² + 12x + 4"
          },
          {
            "letter": "B",
            "text": "9x²"
          },
          {
            "letter": "C",
            "text": "9x² − 12x + 4"
          },
          {
            "letter": "D",
            "text": "9x² + 24x + 16"
          }
        ],
        "correctLetter": "B",
        "hint": "Her iki uçtan 2'şer cm (toplam 4 cm) azalacağı için afişin bir kenarı (3x + 4) − 4 = 3x cm olur!",
        "solution": "Sağdan ve soldan 2'şer cm (toplam 4 cm) boşluk bırakıldığında afişin bir kenar uzunluğu (3x + 4) − 4 = <strong>3x cm</strong> olur. Afişin alanı = (3x)² = <strong>9x² cm²</strong>.",
        "id": 28,
        "kazanimId": "k6"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "LGS Yeni Nesil 2: Karelerin Çevrelerinden Alan Farkına",
        "subtitle": "Çevrelerden kenar uzunluklarını bulup iki kare farkı uygula.",
        "stem": "Çevre uzunlukları <strong>(8x + 12) cm</strong> ve <strong>(8x − 12) cm</strong> olan iki karenin <strong>alanları farkı</strong> kaç cm²'dir?",
        "options": [
          {
            "letter": "A",
            "text": "12x"
          },
          {
            "letter": "B",
            "text": "24x"
          },
          {
            "letter": "C",
            "text": "48x"
          },
          {
            "letter": "D",
            "text": "96x"
          }
        ],
        "correctLetter": "B",
        "hint": "1. karenin kenarı (2x + 3), 2. karenin kenarı (2x − 3). (2x+3)² − (2x−3)² işlemini yap!",
        "solution": "Karelerin birer kenarları 4'e bölünerek <strong>(2x + 3)</strong> ve <strong>(2x − 3)</strong> bulunur. İki kare farkından: [(2x+3) − (2x−3)] · [(2x+3) + (2x−3)] = 6 · 4x = <strong>24x cm²</strong> bulunur.",
        "id": 29,
        "kazanimId": "k6"
      },
      {
        "type": "game",
        "icon": "🏆",
        "typeLabel": "Final Maratonu",
        "title": "Final: Cebirsel İfadeler Şampiyonluk Etabı",
        "subtitle": "Son 3 görevi tamamla ve 6. Üniteyi tamamen YEŞİLE döndür!",
        "gameType": "final_marathon",
        "challenges": [
          {
            "q": "(3x − 4)² açılımında ortadaki terim nedir?",
            "choices": [
              "−12x",
              "−24x",
              "+24x"
            ],
            "ans": "−24x"
          },
          {
            "q": "x² − 64 ifadesinin çarpanlarından biri hangisidir?",
            "choices": [
              "x − 8",
              "x − 16",
              "x − 32"
            ],
            "ans": "x − 8"
          },
          {
            "q": "7x² − 4x + 5 ifadesinin katsayıları toplamı kaçtır?",
            "choices": [
              "8",
              "12",
              "16"
            ],
            "ans": "8"
          }
        ],
        "id": 30,
        "kazanimId": "k6"
      }
    ]
  },
  {
    "id": "m8-u7-dogrusal-denklemler",
    "grade": 8,
    "unitNo": 7,
    "title": "Doğrusal Denklemler",
    "subtitle": "Rasyonel Denklemler, Koordinat Sistemi, Doğrusal İlişkiler, Grafikler ve Eğim",
    "coverImage": "assets/flow/u07_dogrusal_denklemler.jpg",
    "badgeCells": [
      "y=mx",
      "m=d/y",
      "(x,y)",
      "I.Böl",
      "II.Böl",
      "eğim",
      "x/2",
      "=5",
      "📈",
      "📐",
      "⚖️",
      "LGS"
    ],
    "kazanimlar": [
      {
        "id": "k1",
        "no": 1,
        "title": "Birinci Dereceden Bir Bilinmeyenli Denklemler",
        "code": "M.8.2.2.1",
        "visual": "assets/flow/u07_dogrusal_denklemler.jpg",
        "stops": [
          1,
          2,
          3,
          4,
          5
        ]
      },
      {
        "id": "k2",
        "no": 2,
        "title": "Koordinat Sistemi, Bölgeler ve Uzaklık",
        "code": "M.8.2.2.2",
        "visual": "assets/flow/u07_dogrusal_denklemler.jpg",
        "stops": [
          6,
          7,
          8,
          9,
          10
        ]
      },
      {
        "id": "k3",
        "no": 3,
        "title": "Doğrusal İlişkiler ve y = ax + b Denklemi",
        "code": "M.8.2.2.3",
        "visual": "assets/flow/u07_dogrusal_denklemler.jpg",
        "stops": [
          11,
          12,
          13,
          14,
          15,
          16
        ]
      },
      {
        "id": "k4",
        "no": 4,
        "title": "Doğrusal Denklemlerin Grafikleri",
        "code": "M.8.2.2.4",
        "visual": "assets/flow/u07_dogrusal_denklemler.jpg",
        "stops": [
          17,
          18,
          19,
          20,
          21,
          22
        ]
      },
      {
        "id": "k5",
        "no": 5,
        "title": "Eğim: Dikey Uzunluk / Yatay Uzunluk",
        "code": "M.8.2.2.5",
        "visual": "assets/flow/u07_dogrusal_denklemler.jpg",
        "stops": [
          23,
          24,
          25,
          26
        ]
      },
      {
        "id": "k6",
        "no": 6,
        "title": "LGS Rampa ve Doğrusal Grafik Görevleri",
        "code": "M.8.2.2.6",
        "visual": "assets/flow/u07_dogrusal_denklemler.jpg",
        "stops": [
          27,
          28,
          29,
          30
        ]
      }
    ],
    "stops": [
      {
        "type": "concept",
        "icon": "💡",
        "typeLabel": "Örnek & Keşif",
        "title": "Payda Eşitleme ve İçler-Dışlar Çarpımı",
        "subtitle": "Rasyonel katsayılı denklemlerde tüm paydalar EKOK'ta eşitlendikten sonra paydalar silinip paylar üzerinden denklem çözülür!",
        "explanation": [
          "Örneğin <strong>x/2 + x/3 = 10</strong> denkleminde paydaları 6'da eşitleriz: <strong>3x/6 + 2x/6 = 60/6 ⇒ 5x = 60 ⇒ x = 12</strong>.",
          "Önünde eksi (−) işareti olan kesir çizgisi parantez gibidir; eksi işareti paydaki <strong>tüm terimlere</strong> dağılır!"
        ],
        "sentenceHtml": "x/3 + x/4 = 7 denkleminde paydalar {0} sayısında eşitlenir ve 7x = 84 eşitliğinden x = {1} bulunur.",
        "blanks": [
          {
            "id": 0,
            "correct": "12",
            "choices": [
              "6",
              "7",
              "12"
            ]
          },
          {
            "id": 1,
            "correct": "12",
            "choices": [
              "7",
              "12",
              "14"
            ]
          }
        ],
        "id": 1,
        "kazanimId": "k1"
      },
      {
        "type": "video",
        "icon": "🎬",
        "typeLabel": "Animasyonlu Anlatım",
        "title": "Kesir Önündeki Eksi İşareti Tuzağı",
        "subtitle": "x − (x − 2)/3 = 4 denkleminde eksi işaretinin dağılımına dikkat edelim!",
        "videoScene": "custom_steps",
        "steps": [
          {
            "text": "1. Adım: Paydaları 3'te eşitlerken (x − 2) ifadesini parantez içine alırız: 3x/3 − (x − 2)/3 = 12/3.",
            "draw": "s1"
          },
          {
            "text": "2. Adım: Paydaları sildiğimizde eksi içeri dağılır: 3x − x + 2 = 12 (Dikkat: −2 değil, +2 olur!).",
            "draw": "s2"
          },
          {
            "text": "3. Adım: 2x + 2 = 12 ⇒ 2x = 10 ⇒ x = 5 olarak hatasız bulunur.",
            "draw": "s3"
          }
        ],
        "quickQuestion": "(2x − 1) / 3 = (x + 2) / 2 denkleminde içler-dışlar çarpımı yapıldığında x kaç bulunur?",
        "quickChoices": [
          "x = 4",
          "x = 7",
          "x = 8"
        ],
        "quickCorrect": "x = 8",
        "id": 2,
        "kazanimId": "k1"
      },
      {
        "type": "activity",
        "icon": "🧩",
        "typeLabel": "Etkileşimli Etkinlik",
        "title": "Denklem Çözüm İstasyonu",
        "subtitle": "Verilen rasyonel denklemleri sağlayan x değerlerini bul!",
        "activityMode": "rainbow_pairs",
        "targetNumber": 0,
        "sequence": [
          "x/2 + x/5 = 7 ⇒ x=?",
          "(x+3)/4 = 5 ⇒ x=?",
          "3x/4 − x/2 = 3 ⇒ x=?"
        ],
        "missingTargets": [
          {
            "index": 0,
            "answer": 10,
            "hint": "7x/10 = 7 ⇒ x = 10"
          },
          {
            "index": 1,
            "answer": 17,
            "hint": "x + 3 = 20 ⇒ x = 17"
          },
          {
            "index": 2,
            "answer": 12,
            "hint": "x/4 = 3 ⇒ x = 12"
          }
        ],
        "pool": [
          6,
          10,
          12,
          15,
          17,
          20
        ],
        "id": 3,
        "kazanimId": "k1"
      },
      {
        "type": "game",
        "icon": "🎮",
        "typeLabel": "HTML5 Mini Oyun",
        "title": "Oyun: Denklem Terazisi",
        "subtitle": "Bilinmeyen x değerlerini doğru hesapla!",
        "gameType": "final_marathon",
        "challenges": [
          {
            "q": "x/3 − 2 = 4 denkleminde x kaçtır?",
            "choices": [
              "6",
              "12",
              "18"
            ],
            "ans": "18"
          },
          {
            "q": "Bir sayının yarısı ile üçte birinin toplamı 25 ise bu sayı kaçtır?",
            "choices": [
              "30",
              "36",
              "45"
            ],
            "ans": "30"
          },
          {
            "q": "2(x − 3) / 5 = 4 denkleminde x kaçtır?",
            "choices": [
              "10",
              "13",
              "15"
            ],
            "ans": "13"
          }
        ],
        "id": 4,
        "kazanimId": "k1"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Kazanım Kontrol: Denklem Problemi",
        "subtitle": "Kazanım 1'i yeşile çevirmek için bu problemi çöz!",
        "stem": "Bir telin önce <strong>1/3'ü</strong>, sonra kalan telin değil tüm telin <strong>1/4'ü</strong> kesildiğinde geriye <strong>15 metre</strong> tel kalıyor. Telin başlangıçtaki boyu kaç metredir?",
        "options": [
          {
            "letter": "A",
            "text": "24 m"
          },
          {
            "letter": "B",
            "text": "30 m"
          },
          {
            "letter": "C",
            "text": "36 m"
          },
          {
            "letter": "D",
            "text": "48 m"
          }
        ],
        "correctLetter": "C",
        "hint": "1/3 + 1/4 = 7/12'si kesilmiştir; geriye 5/12'si (15 metre) kalmıştır!",
        "solution": "Kesilen kısım: x/3 + x/4 = 7x/12'dir. Kalan kısım: x − 7x/12 = <strong>5x/12 = 15</strong> ⇒ 5x = 180 ⇒ <strong>x = 36 metre</strong> bulunur.",
        "id": 5,
        "kazanimId": "k1"
      },
      {
        "type": "concept",
        "icon": "💡",
        "typeLabel": "Örnek & Keşif",
        "title": "Sıralı İkililer (x, y) ve 4 Bölge",
        "subtitle": "Bir A(x, y) noktasının x eksenine uzaklığı |y| birim, y eksenine uzaklığı ise |x| birimdir (Tam tersi!).",
        "explanation": [
          "Koordinat düzleminde yatay eksene <strong>x (apsis)</strong>, dikey eksene <strong>y (ordinat)</strong>, kesişim noktaları (0,0)'a ise <strong>orijin</strong> denir.",
          "Bölgelerin işaretleri saat yönünün tersine: <strong>I. Bölge (+, +)</strong>, <strong>II. Bölge (−, +)</strong>, <strong>III. Bölge (−, −)</strong>, <strong>IV. Bölge (+, −)</strong>."
        ],
        "sentenceHtml": "A(−4, 7) noktası koordinat sisteminde {0} bölgededir. Bu noktanın x eksenine olan dik uzaklığı |7| = {1} birimdir.",
        "blanks": [
          {
            "id": 0,
            "correct": "II.",
            "choices": [
              "I.",
              "II.",
              "IV."
            ]
          },
          {
            "id": 1,
            "correct": "7",
            "choices": [
              "−4",
              "4",
              "7"
            ]
          }
        ],
        "id": 6,
        "kazanimId": "k2"
      },
      {
        "type": "activity",
        "icon": "🧩",
        "typeLabel": "Etkileşimli Sınıflama",
        "title": "Hangi Bölgede veya Hangi Eksende?",
        "subtitle": "Verilen noktaları koordinat düzlemindeki yerlerine göre sınıflandır!",
        "activityMode": "custom_sort",
        "sortChoices": [
          "II. Bölge (−, +)",
          "IV. Bölge (+, −)"
        ],
        "items": [
          {
            "text": "K(−5, 3)",
            "answer": "II. Bölge (−, +)"
          },
          {
            "text": "L(4, −6)",
            "answer": "IV. Bölge (+, −)"
          },
          {
            "text": "M(−2, 8)",
            "answer": "II. Bölge (−, +)"
          },
          {
            "text": "N(7, −1)",
            "answer": "IV. Bölge (+, −)"
          }
        ],
        "id": 7,
        "kazanimId": "k2"
      },
      {
        "type": "video",
        "icon": "🎬",
        "typeLabel": "Animasyonlu Anlatım",
        "title": "Eksen Üzerindeki Noktalar ve Uzaklık Kuralı",
        "subtitle": "x ekseni üzerindeki noktaların y'si 0, y ekseni üzerindeki noktaların x'i 0'dır!",
        "videoScene": "custom_steps",
        "steps": [
          {
            "text": "1. Kural: Nokta x ekseni üzerindeyse ordinatı (y) sıfırdır: A(a, 0).",
            "draw": "s1"
          },
          {
            "text": "2. Kural: Nokta y ekseni üzerindeyse apsisi (x) sıfırdır: B(0, b).",
            "draw": "s2"
          },
          {
            "text": "3. Kural: K(−3, 5) noktasının x eksenine uzaklığı |5| = 5 birim, y eksenine uzaklığı |−3| = 3 birimdir!",
            "draw": "s3"
          }
        ],
        "quickQuestion": "P(m − 4, 6) noktası y ekseni üzerinde olduğuna göre m kaçtır?",
        "quickChoices": [
          "0",
          "4",
          "−4"
        ],
        "quickCorrect": "4",
        "id": 8,
        "kazanimId": "k2"
      },
      {
        "type": "game",
        "icon": "🎮",
        "typeLabel": "HTML5 Mini Oyun",
        "title": "Oyun: Koordinat Avcısı",
        "subtitle": "Noktaların bölgelerini ve eksenlere uzaklıklarını bul!",
        "gameType": "final_marathon",
        "challenges": [
          {
            "q": "A(−6, −8) noktası kaçıncı bölgededir?",
            "choices": [
              "II. Bölge",
              "III. Bölge",
              "IV. Bölge"
            ],
            "ans": "III. Bölge"
          },
          {
            "q": "B(5, −9) noktasının x eksenine uzaklığı kaç birimdir?",
            "choices": [
              "5",
              "9",
              "14"
            ],
            "ans": "9"
          },
          {
            "q": "Köşeleri A(−2, 3) ve B(6, 3) olan doğru parçasının uzunluğu kaç birimdir?",
            "choices": [
              "4",
              "6",
              "8"
            ],
            "ans": "8"
          }
        ],
        "id": 9,
        "kazanimId": "k2"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Kazanım Kontrol: Orijin Kaydırma (LGS Klasik)",
        "subtitle": "Kazanım 2'yi yeşile çevirmek için bu soruyu çöz!",
        "stem": "Koordinat düzleminde <strong>A(−3, 4)</strong> noktasının <strong>5 birim sağında</strong> ve <strong>6 birim aşağısında</strong> bulunan B noktasının koordinatları nedir?",
        "options": [
          {
            "letter": "A",
            "text": "(2, −2)"
          },
          {
            "letter": "B",
            "text": "(−8, −2)"
          },
          {
            "letter": "C",
            "text": "(2, 10)"
          },
          {
            "letter": "D",
            "text": "(−2, 2)"
          }
        ],
        "correctLetter": "A",
        "hint": "5 birim sağa gidince x'e 5 eklenir (−3 + 5 = 2); 6 birim aşağı inince y'den 6 çıkarılır (4 − 6 = −2)!",
        "solution": "Apsis: −3 + 5 = <strong>2</strong>, ordinat: 4 − 6 = <strong>−2</strong> olur. B noktasının koordinatları <strong>(2, −2)</strong> (IV. bölge) bulunur.",
        "id": 10,
        "kazanimId": "k2"
      },
      {
        "type": "concept",
        "icon": "💡",
        "typeLabel": "Örnek & Keşif",
        "title": "Başlangıç Miktarı + (Birim Değişim × Zaman)",
        "subtitle": "y = ax + b doğrusal denkleminde b başlangıç değerini (x=0 iken), a ise her adımdaki sabit artış/azalış miktarını gösterir!",
        "explanation": [
          "Örneğin kumbarasında <strong>50 TL</strong> bulunan Ali her hafta <strong>20 TL</strong> ekliyorsa: <strong>y = 50 + 20x</strong>.",
          "Boyu <strong>40 cm</strong> olan bir mum her saat <strong>4 cm</strong> eriyorsa: <strong>y = 40 − 4x</strong>. Burada <strong>x bağımsız değişken</strong> (zaman), <strong>y ise bağımlı değişkendir</strong>!"
        ],
        "sentenceHtml": "Başlangıçta 30 cm olan ve her ay 5 cm uzayan fidanın boy denklemi y = {0} olur. Bu denklemde bağımsız değişken {1} değişkenidir.",
        "blanks": [
          {
            "id": 0,
            "correct": "30 + 5x",
            "choices": [
              "5 + 30x",
              "30 + 5x",
              "30 − 5x"
            ]
          },
          {
            "id": 1,
            "correct": "x (ay)",
            "choices": [
              "x (ay)",
              "y (boy)",
              "30"
            ]
          }
        ],
        "id": 11,
        "kazanimId": "k3"
      },
      {
        "type": "activity",
        "icon": "🧩",
        "typeLabel": "Etkileşimli Etkinlik",
        "title": "Tablodan Doğrusal Denklem Kur",
        "subtitle": "x = 0 iken y = 12, x = 1 iken y = 19, x = 2 iken y = 26 olan doğrusal ilişkide eksikleri bul!",
        "activityMode": "rainbow_pairs",
        "targetNumber": 0,
        "sequence": [
          "Başlangıç (b)=?",
          "Artış miktarı (a)=?",
          "x=5 iken y=?"
        ],
        "missingTargets": [
          {
            "index": 0,
            "answer": 12,
            "hint": "x=0 iken y=12'dir."
          },
          {
            "index": 1,
            "answer": 7,
            "hint": "19 − 12 = 7'şer artmaktadır (y = 7x + 12)."
          },
          {
            "index": 2,
            "answer": 47,
            "hint": "7 × 5 + 12 = 47"
          }
        ],
        "pool": [
          7,
          12,
          19,
          35,
          42,
          47
        ],
        "id": 12,
        "kazanimId": "k3"
      },
      {
        "type": "game",
        "icon": "🎮",
        "typeLabel": "HTML5 Mini Oyun",
        "title": "Oyun: İlişki Kurucu",
        "subtitle": "Günlük hayat durumlarının doğrusal denklemlerini bul!",
        "gameType": "final_marathon",
        "challenges": [
          {
            "q": "Açılış ücreti 25 TL ve her km için 15 TL yazan taksimetre denklemi nedir?",
            "choices": [
              "y = 25 + 15x",
              "y = 15 + 25x",
              "y = 40x"
            ],
            "ans": "y = 25 + 15x"
          },
          {
            "q": "y = 120 − 8x denklemine göre y kaçıncı saatte sıfırlanır?",
            "choices": [
              "12",
              "15",
              "20"
            ],
            "ans": "15"
          },
          {
            "q": "Hangisi doğrusal bir ilişki belirtmez?",
            "choices": [
              "y = 3x − 4",
              "y = x² + 1",
              "2x + y = 10"
            ],
            "ans": "y = x² + 1"
          }
        ],
        "id": 13,
        "kazanimId": "k3"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "İki Bitkinin Boylarının Eşitlenmesi",
        "subtitle": "İki farklı doğrusal denklemi birbirine eşitleyerek kesişim zamanını bul.",
        "stem": "Dikildiğinde A fidanının boyu <strong>24 cm</strong> olup ayda <strong>4 cm</strong> uzamakta; B fidanının boyu <strong>36 cm</strong> olup ayda <strong>2 cm</strong> uzamaktadır. Kaçıcı ayın sonunda boyları eşit olur?",
        "options": [
          {
            "letter": "A",
            "text": "4. ay"
          },
          {
            "letter": "B",
            "text": "6. ay"
          },
          {
            "letter": "C",
            "text": "8. ay"
          },
          {
            "letter": "D",
            "text": "12. ay"
          }
        ],
        "correctLetter": "B",
        "hint": "24 + 4x = 36 + 2x denklemini kur ve çöz!",
        "solution": "24 + 4x = 36 + 2x ⇒ 2x = 12 ⇒ <strong>x = 6. ayın sonunda</strong> her ikisinin de boyu 48 cm olarak eşitlenir.",
        "id": 14,
        "kazanimId": "k3"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Kazanım Kontrol: Su Deposu Problemi",
        "subtitle": "Kazanım 3'ü yeşile çevirmek için bu soruyu çöz!",
        "stem": "İçinde <strong>300 litre</strong> su bulunan bir depodan her dakikada <strong>12 litre</strong> su boşalmaktadır. Geçen süre (x dakika) ile kalan su miktarı (y litre) arasındaki doğrusal denklem hangisidir?",
        "options": [
          {
            "letter": "A",
            "text": "y = 300 + 12x"
          },
          {
            "letter": "B",
            "text": "y = 300 − 12x"
          },
          {
            "letter": "C",
            "text": "y = 12x − 300"
          },
          {
            "letter": "D",
            "text": "x = 300 − 12y"
          }
        ],
        "correctLetter": "B",
        "hint": "Başlangıç 300 L ve dakikada 12 L azaldığı için 300 − 12x olur!",
        "solution": "Başlangıçta 300 L su vardır ve her dakika 12x azaldığından kalan su denklemi <strong>y = 300 − 12x</strong> olur.",
        "id": 15,
        "kazanimId": "k3"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Doğrusal Tablodan Değer Bulma",
        "subtitle": "Değişim oranını bularak 10. adımı hesapla.",
        "stem": "Bir örüntüde 1. adımda <strong>7</strong>, 2. adımda <strong>11</strong>, 3. adımda <strong>15</strong> kare kullanılmıştır. Buna göre <strong>10. adımda</strong> kaç kare kullanılır?",
        "options": [
          {
            "letter": "A",
            "text": "39"
          },
          {
            "letter": "B",
            "text": "40"
          },
          {
            "letter": "C",
            "text": "43"
          },
          {
            "letter": "D",
            "text": "47"
          }
        ],
        "correctLetter": "C",
        "hint": "Artış miktarı 4'tür ⇒ Kural: 4x + 3. x yerine 10 yaz!",
        "solution": "Her adımda 4'er arttığı için genel kural <strong>y = 4x + 3</strong>'tür. x = 10 için y = 4(10) + 3 = <strong>43 kare</strong> bulunur.",
        "id": 16,
        "kazanimId": "k3"
      },
      {
        "type": "concept",
        "icon": "💡",
        "typeLabel": "Örnek & Keşif",
        "title": "Üç Doğru Tipi: Eksene Paralel, Orijinden Geçen, Eksenleri Kesen",
        "subtitle": "Sabit terimi (c) olmayan y = mx biçimindeki doğrular daima ORİJİNDEN (0,0) geçer!",
        "explanation": [
          "• <strong>x = a</strong> doğruları y eksenine paralel (dikey), <strong>y = b</strong> doğruları x eksenine paralel (yatay) doğrulardır.<br>• <strong>y = mx</strong> doğruları <strong>orijinden (0,0)</strong> geçer.",
          "• <strong>ax + by + c = 0</strong> doğrularının eksenleri kestiği noktaları bulmak için <strong>x = 0 verip y'yi</strong>, <strong>y = 0 verip x'i</strong> buluruz!"
        ],
        "sentenceHtml": "y = 4x doğrusu sabit terimi olmadığı için {0} noktasından geçer. 2x + 3y = 12 doğrusunun x eksenini kestiği noktayı bulmak için y = 0 yazılırsa x = {1} bulunur.",
        "blanks": [
          {
            "id": 0,
            "correct": "orijinden (0,0)",
            "choices": [
              "(0,4)",
              "orijinden (0,0)",
              "(4,0)"
            ]
          },
          {
            "id": 1,
            "correct": "6",
            "choices": [
              "4",
              "6",
              "12"
            ]
          }
        ],
        "id": 17,
        "kazanimId": "k4"
      },
      {
        "type": "video",
        "icon": "🎬",
        "typeLabel": "Animasyonlu Anlatım",
        "title": "Doğru Grafiği ve Eksenlerle Oluşan Üçgenin Alanı",
        "subtitle": "Eksenleri kesen bir doğrunun orijinle oluşturduğu dik üçgenin alanını nasıl buluruz?",
        "videoScene": "custom_steps",
        "steps": [
          {
            "text": "1. Adım: Örneğin 3x + 4y = 24 doğrusunda x = 0 için 4y = 24 ⇒ y = 6 bulunur.",
            "draw": "s1"
          },
          {
            "text": "2. Adım: y = 0 için 3x = 24 ⇒ x = 8 bulunur.",
            "draw": "s2"
          },
          {
            "text": "3. Adım: Doğru eksenleri 6 ve 8'de kestiği için oluşan dik üçgenin alanı = (6 × 8) ÷ 2 = 24 br² olur!",
            "draw": "s3"
          }
        ],
        "quickQuestion": "x = 0 için y = 4 ve y = 0 için x = 5 noktalarından geçen doğrunun eksenlerle oluşturduğu dik üçgenin alanı kaç br²'dir?",
        "quickChoices": [
          "9 br²",
          "10 br²",
          "20 br²"
        ],
        "quickCorrect": "10 br²",
        "id": 18,
        "kazanimId": "k4"
      },
      {
        "type": "activity",
        "icon": "🧩",
        "typeLabel": "Etkileşimli Sınıflama",
        "title": "Orijinden Geçer mi, Eksenleri Keser mi?",
        "subtitle": "Verilen doğru denklemlerini grafik özelliklerine göre sınıflandır!",
        "activityMode": "custom_sort",
        "sortChoices": [
          "Orijinden Geçer",
          "Orijinden Geçmez"
        ],
        "items": [
          {
            "text": "y = −3x (Sabit terim yok)",
            "answer": "Orijinden Geçer"
          },
          {
            "text": "2x + y = 8 (Sabit terim 8)",
            "answer": "Orijinden Geçmez"
          },
          {
            "text": "3x − 5y = 0 (0,0 sağlar)",
            "answer": "Orijinden Geçer"
          },
          {
            "text": "y = 2x − 6 (Sabit terim −6)",
            "answer": "Orijinden Geçmez"
          }
        ],
        "id": 19,
        "kazanimId": "k4"
      },
      {
        "type": "game",
        "icon": "🎮",
        "typeLabel": "HTML5 Mini Oyun",
        "title": "Oyun: Grafik Dedektifi",
        "subtitle": "Doğru üzerindeki noktaları ve kesişimleri bul!",
        "gameType": "final_marathon",
        "challenges": [
          {
            "q": "Hangi doğru x eksenine paraleldir?",
            "choices": [
              "x = 4",
              "y = −3",
              "y = x"
            ],
            "ans": "y = −3"
          },
          {
            "q": "A(2, k) noktası 3x + y = 11 doğrusu üzerindeyse k kaçtır?",
            "choices": [
              "3",
              "5",
              "6"
            ],
            "ans": "5"
          },
          {
            "q": "x = 5 doğrusu ile y = −2 doğrusunun kesişim noktası nedir?",
            "choices": [
              "(5, −2)",
              "(−2, 5)",
              "(0, 3)"
            ],
            "ans": "(5, −2)"
          }
        ],
        "id": 20,
        "kazanimId": "k4"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Nokta Doğru Üzerindeyse Denklemi Sağlar!",
        "subtitle": "Verilen noktanın koordinatlarını denklemde x ve y yerine yaz.",
        "stem": "<strong>2x − 3y + m = 0</strong> doğrusunun grafiği <strong>A(4, 2)</strong> noktasından geçtiğine göre <strong>m</strong> kaçtır?",
        "options": [
          {
            "letter": "A",
            "text": "−2"
          },
          {
            "letter": "B",
            "text": "2"
          },
          {
            "letter": "C",
            "text": "−14"
          },
          {
            "letter": "D",
            "text": "14"
          }
        ],
        "correctLetter": "A",
        "hint": "x = 4 ve y = 2 değerlerini denklemde yerine koy: 2(4) − 3(2) + m = 0!",
        "solution": "Nokta doğru üzerinde olduğundan denklemi sağlar: 2(4) − 3(2) + m = 0 ⇒ 8 − 6 + m = 0 ⇒ <strong>m = −2</strong> bulunur.",
        "id": 21,
        "kazanimId": "k4"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Kazanım Kontrol: Üçgen Alanı",
        "subtitle": "Kazanım 4'ü yeşile çevirmek için bu soruyu çöz!",
        "stem": "<strong>2x + 5y = 20</strong> doğrusunun grafiği ile koordinat eksenleri arasında kalan kapalı bölgenin (dik üçgenin) alanı kaç birimkaredir?",
        "options": [
          {
            "letter": "A",
            "text": "10"
          },
          {
            "letter": "B",
            "text": "20"
          },
          {
            "letter": "C",
            "text": "40"
          },
          {
            "letter": "D",
            "text": "100"
          }
        ],
        "correctLetter": "B",
        "hint": "x = 0 için y = 4; y = 0 için x = 10. Dik üçgenin alanı = (4 × 10) ÷ 2!",
        "solution": "x = 0 için 5y = 20 ⇒ <strong>y = 4</strong>; y = 0 için 2x = 20 ⇒ <strong>x = 10</strong>. Alan = (4 × 10) ÷ 2 = <strong>20 birimkare</strong> bulunur.",
        "id": 22,
        "kazanimId": "k4"
      },
      {
        "type": "concept",
        "icon": "💡",
        "typeLabel": "Örnek & Keşif",
        "title": "Eğim (m) = Dikey Uzunluk / Yatay Uzunluk",
        "subtitle": "y = mx + n biçiminde y yalnız bırakıldığında x'in katsayısı (m) doğrudan eğimi verir!",
        "explanation": [
          "Bir rampanın eğimi <strong>m = Dikey Uzunluk / Yatay Uzunluk</strong> formülüyle bulunur. Koordinat düzleminde <strong>sağa yatık doğruların eğimi pozitif (+)</strong>, <strong>sola yatık doğruların eğimi negatif (−)</strong> olur.",
          "Denklemden eğim bulurken <strong>y tek başına bırakılır</strong>: Örneğin <strong>y = 3x − 7</strong> doğrusunun eğimi <strong>m = 3</strong>'tür."
        ],
        "sentenceHtml": "Dikey yüksekliği 6 m, yatay uzunluğu 15 m olan bir rampanın eğimi 6/15 = {0} olur. y = −4x + 9 doğrusunun eğimi ise {1} sayısına eşittir.",
        "blanks": [
          {
            "id": 0,
            "correct": "2/5",
            "choices": [
              "2/5",
              "5/2",
              "1/3"
            ]
          },
          {
            "id": 1,
            "correct": "−4",
            "choices": [
              "−4",
              "4",
              "9"
            ]
          }
        ],
        "id": 23,
        "kazanimId": "k5"
      },
      {
        "type": "activity",
        "icon": "🧩",
        "typeLabel": "Etkileşimli Etkinlik",
        "title": "Denklemlerin Eğimlerini Bul",
        "subtitle": "y'yi yalnız bırakarak veya −a/b kuralıyla doğruların eğimlerini seç!",
        "activityMode": "rainbow_pairs",
        "targetNumber": 0,
        "sequence": [
          "y = 5x − 2 eğim=?",
          "2y = 6x + 8 eğim=?",
          "3x + y = 10 eğim=?"
        ],
        "missingTargets": [
          {
            "index": 0,
            "answer": 5,
            "hint": "x'in katsayısı 5'tir."
          },
          {
            "index": 1,
            "answer": 3,
            "hint": "İki tarafı 2'ye bölersek y = 3x + 4 ⇒ eğim 3."
          },
          {
            "index": 2,
            "answer": -3,
            "hint": "y = −3x + 10 ⇒ eğim −3."
          }
        ],
        "pool": [
          2,
          3,
          5,
          -2,
          -3,
          6
        ],
        "id": 24,
        "kazanimId": "k5"
      },
      {
        "type": "game",
        "icon": "🎮",
        "typeLabel": "HTML5 Mini Oyun",
        "title": "Oyun: Eğim Ölçer",
        "subtitle": "Rampa ve doğru eğimlerini hatasız hesapla!",
        "gameType": "final_marathon",
        "challenges": [
          {
            "q": "Eğimi %25 olan bir rampanın dikey yüksekliği 3 m ise yatay uzunluğu kaç m'dir?",
            "choices": [
              "9 m",
              "12 m",
              "15 m"
            ],
            "ans": "12 m"
          },
          {
            "q": "4x − 2y + 7 = 0 doğrusunun eğimi kaçtır?",
            "choices": [
              "−2",
              "2",
              "4"
            ],
            "ans": "2"
          },
          {
            "q": "x eksenine paralel (yatay) bir yolun eğimi kaçtır?",
            "choices": [
              "0",
              "1",
              "Tanımsız"
            ],
            "ans": "0"
          }
        ],
        "id": 25,
        "kazanimId": "k5"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Kazanım Kontrol: Bilinmeyen Eğim Katsayısı",
        "subtitle": "Kazanım 5'i yeşile çevirmek için bu soruyu çöz!",
        "stem": "<strong>kx − 3y + 12 = 0</strong> doğrusunun <strong>eğimi 2</strong> olduğuna göre, <strong>k</strong> kaçtır?",
        "options": [
          {
            "letter": "A",
            "text": "−6"
          },
          {
            "letter": "B",
            "text": "2"
          },
          {
            "letter": "C",
            "text": "3"
          },
          {
            "letter": "D",
            "text": "6"
          }
        ],
        "correctLetter": "D",
        "hint": "3y = kx + 12 ⇒ y = (k/3)x + 4. Eğim k/3 = 2!",
        "solution": "y'yi yalnız bırakırsak: 3y = kx + 12 ⇒ y = <strong>(k/3)</strong>x + 4 olur. Eğim = k/3 = 2 ⇒ <strong>k = 6</strong> bulunur.",
        "id": 26,
        "kazanimId": "k5"
      },
      {
        "type": "activity",
        "icon": "🧩",
        "typeLabel": "Etkileşimli Etkinlik",
        "title": "Adım Adım LGS Kurgusu: Basamaklı Rampa",
        "subtitle": "Her birinin yüksekliği 15 cm ve genişliği 25 cm olan 4 eş basamağın yanına kurulan rampayı analiz et!",
        "activityMode": "rainbow_pairs",
        "targetNumber": 0,
        "sequence": [
          "Toplam dikey boy=? cm",
          "Toplam yatay boy=? cm",
          "Rampanın yüzde eğimi=%?"
        ],
        "missingTargets": [
          {
            "index": 0,
            "answer": 60,
            "hint": "4 × 15 = 60 cm"
          },
          {
            "index": 1,
            "answer": 100,
            "hint": "4 × 25 = 100 cm"
          },
          {
            "index": 2,
            "answer": 60,
            "hint": "60 / 100 = %60"
          }
        ],
        "pool": [
          40,
          60,
          75,
          80,
          100,
          120
        ],
        "id": 27,
        "kazanimId": "k6"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "LGS Yeni Nesil 1: Engelli Rampası Standartları",
        "subtitle": "Eğim oranını kullanarak yatay mesafeyi hesaplama.",
        "stem": "Bir okul girişine eğimi <strong>%8</strong> olan bir engelli rampası yapılacaktır. Rampanın çıkacağı dikey yükseklik <strong>40 cm</strong> olduğuna göre yatay uzunluğu kaç metre olmalıdır?",
        "options": [
          {
            "letter": "A",
            "text": "3,2 metre"
          },
          {
            "letter": "B",
            "text": "4 metre"
          },
          {
            "letter": "C",
            "text": "5 metre"
          },
          {
            "letter": "D",
            "text": "8 metre"
          }
        ],
        "correctLetter": "C",
        "hint": "40 cm / Yatay = 8 / 100 ⇒ Yatay = 500 cm = 5 metre!",
        "solution": "Eğim = 40 / Yatay = 8 / 100 ⇒ 8 · Yatay = 4000 ⇒ Yatay = 500 cm = <strong>5 metre</strong> olmalıdır.",
        "id": 28,
        "kazanimId": "k6"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "LGS Yeni Nesil 2: İki Mumun Erime Grafiği",
        "subtitle": "Doğrusal azalma hızlarını karşılaştırma.",
        "stem": "Boyları <strong>30 cm</strong> olan iki mumdan birincisi <strong>5 saatte</strong>, ikincisi <strong>6 saatte</strong> tamamen erimektedir. Aynı anda yakıldıktan <strong>3 saat sonra</strong> boyları arasındaki fark kaç cm olur?",
        "options": [
          {
            "letter": "A",
            "text": "2 cm"
          },
          {
            "letter": "B",
            "text": "3 cm"
          },
          {
            "letter": "C",
            "text": "5 cm"
          },
          {
            "letter": "D",
            "text": "6 cm"
          }
        ],
        "correctLetter": "B",
        "hint": "1. mum saatte 30÷5 = 6 cm erir (3 saatte 12 cm kalır); 2. mum saatte 30÷6 = 5 cm erir (3 saatte 15 cm kalır)!",
        "solution": "1. mum saatte 6 cm erir ⇒ 3 saat sonra 30 − 18 = <strong>12 cm</strong> kalır. 2. mum saatte 5 cm erir ⇒ 3 saat sonra 30 − 15 = <strong>15 cm</strong> kalır. Fark = 15 − 12 = <strong>3 cm</strong>.",
        "id": 29,
        "kazanimId": "k6"
      },
      {
        "type": "game",
        "icon": "🏆",
        "typeLabel": "Final Maratonu",
        "title": "Final: Doğrusal Denklemler Şampiyonluk Etabı",
        "subtitle": "Son 3 görevi tamamla ve 7. Üniteyi tamamen YEŞİLE döndür!",
        "gameType": "final_marathon",
        "challenges": [
          {
            "q": "A(−4, 5) noktasının y eksenine uzaklığı kaç birimdir?",
            "choices": [
              "4",
              "5",
              "9"
            ],
            "ans": "4"
          },
          {
            "q": "3x + 4y = 24 doğrusunun eğimi kaçtır?",
            "choices": [
              "3/4",
              "−3/4",
              "4/3"
            ],
            "ans": "−3/4"
          },
          {
            "q": "y = 2x − 8 doğrusu x eksenini hangi noktada keser?",
            "choices": [
              "(4, 0)",
              "(0, −8)",
              "(−4, 0)"
            ],
            "ans": "(4, 0)"
          }
        ],
        "id": 30,
        "kazanimId": "k6"
      }
    ]
  },
  {
    "id": "m8-u8-esitsizlikler",
    "grade": 8,
    "unitNo": 8,
    "title": "Eşitsizlikler",
    "subtitle": "Eşitsizlik Yazma (<, >, ≤, ≥), Sayı Doğrusu, Negatifle Çarpma/Bölme ve LGS",
    "coverImage": "assets/flow/u08_esitsizlikler.jpg",
    "badgeCells": [
      "<",
      ">",
      "≤",
      "≥",
      "○",
      "●",
      "2x>6",
      "−x<4",
      "⚖️",
      "📏",
      "🎯",
      "LGS"
    ],
    "kazanimlar": [
      {
        "id": "k1",
        "no": 1,
        "title": "Günlük Hayat Durumlarını Eşitsizlik Olarak Yazma",
        "code": "M.8.2.3.1",
        "visual": "assets/flow/u08_esitsizlikler.jpg",
        "stops": [
          1,
          2,
          3,
          4,
          5
        ]
      },
      {
        "id": "k2",
        "no": 2,
        "title": "Sayı Doğrusunda Gösterim (Açık ve Kapalı Daire)",
        "code": "M.8.2.3.2",
        "visual": "assets/flow/u08_esitsizlikler.jpg",
        "stops": [
          6,
          7,
          8,
          9,
          10
        ]
      },
      {
        "id": "k3",
        "no": 3,
        "title": "Eşitsizliklerde Toplama, Çıkarma ve Çözüm",
        "code": "M.8.2.3.3",
        "visual": "assets/flow/u08_esitsizlikler.jpg",
        "stops": [
          11,
          12,
          13,
          14,
          15,
          16
        ]
      },
      {
        "id": "k4",
        "no": 4,
        "title": "Negatif Sayıyla Çarpma/Bölmede Yön Değiştirme!",
        "code": "M.8.2.3.3",
        "visual": "assets/flow/u08_esitsizlikler.jpg",
        "stops": [
          17,
          18,
          19,
          20,
          21,
          22
        ]
      },
      {
        "id": "k5",
        "no": 5,
        "title": "Çift Taraflı Eşitsizlikler ve Değer Aralıkları",
        "code": "M.8.2.3.3",
        "visual": "assets/flow/u08_esitsizlikler.jpg",
        "stops": [
          23,
          24,
          25,
          26
        ]
      },
      {
        "id": "k6",
        "no": 6,
        "title": "LGS Kar-Zarar ve Kapasite Eşitsizlik Görevleri",
        "code": "M.8.2.3.3",
        "visual": "assets/flow/u08_esitsizlikler.jpg",
        "stops": [
          27,
          28,
          29,
          30
        ]
      }
    ],
    "stops": [
      {
        "type": "concept",
        "icon": "💡",
        "typeLabel": "Örnek & Keşif",
        "title": "En Az (≥), En Çok (≤), Fazla (>) ve Az (<)",
        "subtitle": "Sınır değerin dahil olup olmadığına çok dikkat et: 'En az 18 yaş' demek x ≥ 18 demektir!",
        "explanation": [
          "• <strong>'En az 50 puan'</strong> veya <strong>'50 ve üzeri'</strong> ⇒ <strong>x ≥ 50</strong><br>• <strong>'En çok 120 kg'</strong> veya <strong>'120'yi geçmeyen'</strong> ⇒ <strong>x ≤ 120</strong>",
          "• <strong>'50'den fazla'</strong> ⇒ <strong>x > 50</strong> (50 dahil değil!)<br>• <strong>'120'den az'</strong> ⇒ <strong>x < 120</strong> (120 dahil değil!)"
        ],
        "sentenceHtml": "'Asansör en çok 400 kg taşır' ifadesi {0} eşitsizliği ile, 'Sınavdan geçmek için en az 70 alınmalıdır' ifadesi ise {1} eşitsizliği ile gösterilir.",
        "blanks": [
          {
            "id": 0,
            "correct": "x ≤ 400",
            "choices": [
              "x < 400",
              "x ≤ 400",
              "x ≥ 400"
            ]
          },
          {
            "id": 1,
            "correct": "x ≥ 70",
            "choices": [
              "x > 70",
              "x ≤ 70",
              "x ≥ 70"
            ]
          }
        ],
        "id": 1,
        "kazanimId": "k1"
      },
      {
        "type": "activity",
        "icon": "🧩",
        "typeLabel": "Etkileşimli Sınıflama",
        "title": "Sınır Değer Dahil mi (≤, ≥), Hariç mi (<, >)?",
        "subtitle": "Cümlelerdeki anahtar kelimelere göre eşitsizlik sembolünü sınıflandır!",
        "activityMode": "custom_sort",
        "sortChoices": [
          "Sınır Dahil (≤ veya ≥)",
          "Sınır Hariç (< veya >)"
        ],
        "items": [
          {
            "text": "Günde en az 2 litre su içmelisin (x ≥ 2)",
            "answer": "Sınır Dahil (≤ veya ≥)"
          },
          {
            "text": "Yaşı 15'ten küçük olanlar giremez (x < 15)",
            "answer": "Sınır Hariç (< veya >)"
          },
          {
            "text": "Bagaj ağırlığı en fazla 20 kg olabilir (x ≤ 20)",
            "answer": "Sınır Dahil (≤ veya ≥)"
          },
          {
            "text": "Boyu 140 cm'den uzun olanlar binebilir (x > 140)",
            "answer": "Sınır Hariç (< veya >)"
          }
        ],
        "id": 2,
        "kazanimId": "k1"
      },
      {
        "type": "video",
        "icon": "🎬",
        "typeLabel": "Animasyonlu Anlatım",
        "title": "Cebirsel Cümleleri Eşitsizliğe Çevirme",
        "subtitle": "Önce sözel ifadeyi adım adım cebirsel ifadeye, sonra eşitsizliğe dönüştürelim.",
        "videoScene": "custom_steps",
        "steps": [
          {
            "text": "1. Adım: 'Bir sayının 3 katının 5 eksiği' ifadesi 3x − 5 olarak yazılır.",
            "draw": "s1"
          },
          {
            "text": "2. Adım: '...22'den büyük değildir' demek '22'ye eşit veya 22'den küçüktür (≤ 22)' demektir!",
            "draw": "s2"
          },
          {
            "text": "3. Adım: Böylece eşitsizlik 3x − 5 ≤ 22 olarak kurulur!",
            "draw": "s3"
          }
        ],
        "quickQuestion": "'Bir sayının 2 katının 4 fazlası en az 18'dir' cümlesinin matematiksel karşılığı hangisidir?",
        "quickChoices": [
          "2x + 4 > 18",
          "2x + 4 ≥ 18",
          "2x + 4 ≤ 18"
        ],
        "quickCorrect": "2x + 4 ≥ 18",
        "id": 3,
        "kazanimId": "k1"
      },
      {
        "type": "game",
        "icon": "🎮",
        "typeLabel": "HTML5 Mini Oyun",
        "title": "Oyun: Sembol Avcısı",
        "subtitle": "Sözel ifadeleri doğru eşitsizliklerle eşleştir!",
        "gameType": "final_marathon",
        "challenges": [
          {
            "q": "'x sayısı −3'ten büyük, 5'e eşit veya küçüktür' ifadesi hangisidir?",
            "choices": [
              "−3 < x ≤ 5",
              "−3 ≤ x < 5",
              "−3 < x < 5"
            ],
            "ans": "−3 < x ≤ 5"
          },
          {
            "q": "x ≥ 12 eşitsizliğini sağlayan en küçük tam sayı kaçtır?",
            "choices": [
              "11",
              "12",
              "13"
            ],
            "ans": "12"
          },
          {
            "q": "x < −4 eşitsizliğini sağlayan en büyük tam sayı kaçtır?",
            "choices": [
              "−3",
              "−4",
              "−5"
            ],
            "ans": "−5"
          }
        ],
        "id": 4,
        "kazanimId": "k1"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Kazanım Kontrol: Üçgen Çevresi Eşitsizliği",
        "subtitle": "Kazanım 1'i yeşile çevirmek için bu soruyu çöz!",
        "stem": "Bir kenar uzunluğu <strong>(x + 2) cm</strong> olan eşkenar üçgenin çevresi <strong>30 cm'den fazla değildir</strong>. Buna göre bu durumu gösteren eşitsizlik hangisidir?",
        "options": [
          {
            "letter": "A",
            "text": "3x + 6 < 30"
          },
          {
            "letter": "B",
            "text": "3x + 6 ≤ 30"
          },
          {
            "letter": "C",
            "text": "3x + 2 ≤ 30"
          },
          {
            "letter": "D",
            "text": "3x + 6 ≥ 30"
          }
        ],
        "correctLetter": "B",
        "hint": "Eşkenar üçgenin çevresi = 3(x + 2) = 3x + 6. '30'dan fazla değildir' demek ≤ 30 demektir!",
        "solution": "Çevre = 3 · (x + 2) = <strong>3x + 6</strong>'dır. '30 cm'den fazla değildir' ifadesi 30 olabilir veya daha küçük olabilir anlamına geldiğinden <strong>3x + 6 ≤ 30</strong> yazılır.",
        "id": 5,
        "kazanimId": "k1"
      },
      {
        "type": "video",
        "icon": "🎬",
        "typeLabel": "Animasyonlu Anlatım",
        "title": "Sayı Doğrusunda Açık ve Kapalı Aralık Okuma",
        "subtitle": "Sınır noktasındaki dairenin içinin dolu veya boş olması çözüm kümesini nasıl değiştirir?",
        "videoScene": "custom_steps",
        "steps": [
          {
            "text": "1. Adım: Eşitsizlikte ≤ veya ≥ varsa sınır noktası çözüme dahildir ve içi dolu daire (●) çizilir.",
            "draw": "s1"
          },
          {
            "text": "2. Adım: Eşitsizlikte < veya > varsa sınır noktası dahil değildir ve içi boş daire (○) çizilir.",
            "draw": "s2"
          },
          {
            "text": "3. Adım: İki sınır arasındaki bölge boyanmışsa çift taraflı eşitsizlik (a < x ≤ b) yazılır!",
            "draw": "s3"
          }
        ],
        "quickQuestion": "−3 noktasında içi boş daire (○) ve 4 noktasında içi dolu daire (●) olup arası boyanmışsa eşitsizlik nedir?",
        "quickChoices": [
          "−3 < x ≤ 4",
          "−3 ≤ x < 4",
          "−3 ≤ x ≤ 4"
        ],
        "quickCorrect": "−3 < x ≤ 4",
        "id": 6,
        "kazanimId": "k2"
      },
      {
        "type": "concept",
        "icon": "💡",
        "typeLabel": "Örnek & Keşif",
        "title": "Açık Daire (○) vs Kapalı Daire (●)",
        "subtitle": "Eşitlik çizgisi varsa (≤, ≥) dairenin içi DOLU (●), eşitlik yoksa (<, >) dairenin içi BOŞ (○) çizilir!",
        "explanation": [
          "• <strong>x > 3</strong> eşitsizliğinde 3 noktasında <strong>içi boş daire (○)</strong> konulur ve sayı doğrusunun <strong>sağ tarafı</strong> boyanır.",
          "• <strong>x ≤ −2</strong> eşitsizliğinde −2 noktasında <strong>içi dolu daire (●)</strong> konulur ve sayı doğrusunun <strong>sol tarafı</strong> boyanır."
        ],
        "sentenceHtml": "x ≥ 4 eşitsizliğinde 4 noktasındaki dairenin içi {0} olur ve sayı doğrusunun {1} tarafı taranır.",
        "blanks": [
          {
            "id": 0,
            "correct": "dolu (●)",
            "choices": [
              "boş (○)",
              "dolu (●)",
              "kesikli"
            ]
          },
          {
            "id": 1,
            "correct": "sağ",
            "choices": [
              "sol",
              "sağ",
              "orta"
            ]
          }
        ],
        "id": 7,
        "kazanimId": "k2"
      },
      {
        "type": "activity",
        "icon": "🧩",
        "typeLabel": "Etkileşimli Etkinlik",
        "title": "Sayı Doğrusu Analizi",
        "subtitle": "−2 (içi boş ○) ile 5 (içi dolu ●) arasındaki tam sayıları incele!",
        "activityMode": "rainbow_pairs",
        "targetNumber": 0,
        "sequence": [
          "En küçük tam sayı=?",
          "En büyük tam sayı=?",
          "Toplam kaç tam sayı var=?"
        ],
        "missingTargets": [
          {
            "index": 0,
            "answer": -1,
            "hint": "−2 dahil olmadığı için en küçük tam sayı −1'dir."
          },
          {
            "index": 1,
            "answer": 5,
            "hint": "5'in içi dolu (dahil) olduğu için en büyük 5'tir."
          },
          {
            "index": 2,
            "answer": 7,
            "hint": "−1, 0, 1, 2, 3, 4, 5 ⇒ 7 tane."
          }
        ],
        "pool": [
          -2,
          -1,
          4,
          5,
          6,
          7
        ],
        "id": 8,
        "kazanimId": "k2"
      },
      {
        "type": "game",
        "icon": "🎮",
        "typeLabel": "HTML5 Mini Oyun",
        "title": "Oyun: Sayı Doğrusu Okuyucu",
        "subtitle": "Sayı doğrusu ifadelerini doğru eşitsizlikle eşleştir!",
        "gameType": "final_marathon",
        "challenges": [
          {
            "q": "−4'te içi dolu daire (●) ve sağ taraf taranmışsa eşitsizlik nedir?",
            "choices": [
              "x > −4",
              "x ≥ −4",
              "x ≤ −4"
            ],
            "ans": "x ≥ −4"
          },
          {
            "q": "2 < x ≤ 6 aralığında kaç tane tam sayı vardır?",
            "choices": [
              "3",
              "4",
              "5"
            ],
            "ans": "4"
          },
          {
            "q": "−3 ≤ x ≤ 3 aralığındaki tam sayıların toplamı kaçtır?",
            "choices": [
              "0",
              "3",
              "6"
            ],
            "ans": "0"
          }
        ],
        "id": 9,
        "kazanimId": "k2"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Kazanım Kontrol: Sayı Doğrusu Tam Sayıları",
        "subtitle": "Kazanım 2'yi yeşile çevirmek için bu soruyu çöz!",
        "stem": "<strong>−5 < x ≤ 2</strong> eşitsizliğini sağlayan <strong>x tam sayılarının toplamı</strong> kaçtır?",
        "options": [
          {
            "letter": "A",
            "text": "−9"
          },
          {
            "letter": "B",
            "text": "−7"
          },
          {
            "letter": "C",
            "text": "−5"
          },
          {
            "letter": "D",
            "text": "−3"
          }
        ],
        "correctLetter": "B",
        "hint": "Tam sayılar: −4, −3, −2, −1, 0, 1, 2. Simetrik olanlar (−2..+2) birbirini sıfırlar, geriye −4 ve −3 kalır!",
        "solution": "Aralıktaki tam sayılar: <strong>−4, −3, −2, −1, 0, 1, 2</strong>'dir. (−2 + −1 + 0 + 1 + 2 = 0) olduğundan toplam = −4 + (−3) = <strong>−7</strong> bulunur.",
        "id": 10,
        "kazanimId": "k2"
      },
      {
        "type": "concept",
        "icon": "💡",
        "typeLabel": "Örnek & Keşif",
        "title": "Denklem Çözer Gibi Bilinmeyeni Yalnız Bırakma",
        "subtitle": "Eşitsizliğin her iki tarafına aynı sayıyı eklemek veya çıkarmak eşitsizliğin yönünü DEĞİŞTİRMEZ!",
        "explanation": [
          "Örneğin <strong>3x − 7 < 14</strong> eşitsizliğinde −7 karşıya +7 olarak geçer: <strong>3x < 21</strong>.",
          "Her iki taraf pozitif 3'e bölündüğünde: <strong>x < 7</strong> bulunur (Bu eşitsizliği sağlayan en büyük tam sayı 6'dır)."
        ],
        "sentenceHtml": "2x + 5 ≤ 19 eşitsizliğinde +5 karşıya −5 olarak geçtiğinde 2x ≤ {0} ve her iki taraf 2'ye bölündüğünde x ≤ {1} bulunur.",
        "blanks": [
          {
            "id": 0,
            "correct": "14",
            "choices": [
              "14",
              "24",
              "7"
            ]
          },
          {
            "id": 1,
            "correct": "7",
            "choices": [
              "6",
              "7",
              "12"
            ]
          }
        ],
        "id": 11,
        "kazanimId": "k3"
      },
      {
        "type": "video",
        "icon": "🎬",
        "typeLabel": "Animasyonlu Anlatım",
        "title": "Her İki Tarafta x Bulunan Eşitsizlikler",
        "subtitle": "Küçük olan x'i büyük olan x'in yanına gönderirsek negatif katsayıyla uğraşmayız!",
        "videoScene": "custom_steps",
        "steps": [
          {
            "text": "1. Adım: 5x − 4 ≥ 2x + 11 eşitsizliğinde 2x'i sola (−2x), −4'ü sağa (+4) göndeririz.",
            "draw": "s1"
          },
          {
            "text": "2. Adım: 5x − 2x ≥ 11 + 4 ⇒ 3x ≥ 15 elde edilir.",
            "draw": "s2"
          },
          {
            "text": "3. Adım: Her iki tarafı 3'e bölersek x ≥ 5 bulunur (En küçük tam sayı değeri 5'tir)!",
            "draw": "s3"
          }
        ],
        "quickQuestion": "4x − 3 > x + 12 eşitsizliğinin çözüm kümesi hangisidir?",
        "quickChoices": [
          "x > 3",
          "x > 5",
          "x < 5"
        ],
        "quickCorrect": "x > 5",
        "id": 12,
        "kazanimId": "k3"
      },
      {
        "type": "activity",
        "icon": "🧩",
        "typeLabel": "Etkileşimli Etkinlik",
        "title": "Eşitsizlik Çözüm İstasyonu",
        "subtitle": "Verilen eşitsizlikleri sağlayan en büyük veya en küçük tam sayıyı bul!",
        "activityMode": "rainbow_pairs",
        "targetNumber": 0,
        "sequence": [
          "2x − 1 < 11 en büyük=?",
          "3x + 4 ≥ 19 en küçük=?",
          "5x − 8 ≤ 2x + 7 en büyük=?"
        ],
        "missingTargets": [
          {
            "index": 0,
            "answer": 5,
            "hint": "2x < 12 ⇒ x < 6 ⇒ En büyük tam sayı 5."
          },
          {
            "index": 1,
            "answer": 5,
            "hint": "3x ≥ 15 ⇒ x ≥ 5 ⇒ En küçük tam sayı 5."
          },
          {
            "index": 2,
            "answer": 5,
            "hint": "3x ≤ 15 ⇒ x ≤ 5 ⇒ En büyük tam sayı 5."
          }
        ],
        "pool": [
          4,
          5,
          6,
          7,
          8
        ],
        "id": 13,
        "kazanimId": "k3"
      },
      {
        "type": "game",
        "icon": "🎮",
        "typeLabel": "HTML5 Mini Oyun",
        "title": "Oyun: Eşitsizlik Çözücü",
        "subtitle": "Adım adım eşitsizlikleri çöz!",
        "gameType": "final_marathon",
        "challenges": [
          {
            "q": "x/3 + 2 < 6 eşitsizliğinde x'in alabileceği en büyük tam sayı kaçtır?",
            "choices": [
              "11",
              "12",
              "13"
            ],
            "ans": "11"
          },
          {
            "q": "4(x − 1) ≥ 20 eşitsizliğini sağlayan en küçük tam sayı kaçtır?",
            "choices": [
              "5",
              "6",
              "7"
            ],
            "ans": "6"
          },
          {
            "q": "2x + 9 > 25 ise x aşağıdakilerden hangisi olamaz?",
            "choices": [
              "8",
              "9",
              "10"
            ],
            "ans": "8"
          }
        ],
        "id": 14,
        "kazanimId": "k3"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Terazi Kefeleri ve Eşitsizlik",
        "subtitle": "Ağır basan (aşağıda duran) kefe daha büyüktür!",
        "stem": "Sol kefesinde <strong>(3x + 2) kg</strong>, sağ kefesinde <strong>(x + 18) kg</strong> kütle bulunan bir eşit kollu terazinin <strong>sol kefesi daha aşağıda</strong> durmaktadır. Buna göre x'in alabileceği en küçük tam sayı kaçtır?",
        "options": [
          {
            "letter": "A",
            "text": "7"
          },
          {
            "letter": "B",
            "text": "8"
          },
          {
            "letter": "C",
            "text": "9"
          },
          {
            "letter": "D",
            "text": "10"
          }
        ],
        "correctLetter": "C",
        "hint": "Sol kefe aşağıdaysa daha ağırdır: 3x + 2 > x + 18 ⇒ 2x > 16 ⇒ x > 8!",
        "solution": "Sol kefe daha ağır olduğundan: 3x + 2 > x + 18 ⇒ 2x > 16 ⇒ <strong>x > 8</strong> olur. 8'den büyük en küçük tam sayı <strong>9</strong>'dur.",
        "id": 15,
        "kazanimId": "k3"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Kazanım Kontrol: Rasyonel Eşitsizlik",
        "subtitle": "Kazanım 3'ü yeşile çevirmek için bu soruyu çöz!",
        "stem": "<strong>(2x − 3) / 4 ≤ 5</strong> eşitsizliğini sağlayan <strong>en büyük x tam sayısı</strong> kaçtır?",
        "options": [
          {
            "letter": "A",
            "text": "10"
          },
          {
            "letter": "B",
            "text": "11"
          },
          {
            "letter": "C",
            "text": "12"
          },
          {
            "letter": "D",
            "text": "13"
          }
        ],
        "correctLetter": "B",
        "hint": "Her iki tarafı 4 ile çarp: 2x − 3 ≤ 20 ⇒ 2x ≤ 23 ⇒ x ≤ 11,5!",
        "solution": "2x − 3 ≤ 20 ⇒ 2x ≤ 23 ⇒ <strong>x ≤ 11,5</strong> olur. 11,5'ten küçük veya eşit en büyük tam sayı <strong>11</strong>'dir.",
        "id": 16,
        "kazanimId": "k3"
      },
      {
        "type": "concept",
        "icon": "💡",
        "typeLabel": "Örnek & Keşif",
        "title": "ALTIN KURAL: Negatif Sayıyla Çarpılır veya Bölünürse YÖN DEĞİŞİR!",
        "subtitle": "Eşitsizliğin her iki tarafı negatif bir sayıyla çarpıldığında veya bölündüğünde < işareti >, ≤ işareti ≥ olur!",
        "explanation": [
          "Neden? Çünkü <strong>−2 < 6</strong> doğrudur; ancak iki tarafı <strong>−2'ye bölersek</strong> sol taraf <strong>+1</strong>, sağ taraf <strong>−3</strong> olur ve <strong>+1 > −3</strong> olduğu için yön değişmek zorundadır!",
          "Örnek: <strong>−3x ≤ 12</strong> eşitsizliğinde iki tarafı <strong>−3'e bölersek</strong> yön döner: <strong>x ≥ −4</strong>!"
        ],
        "sentenceHtml": "−4x < 20 eşitsizliğinde her iki taraf −4'e bölündüğünde eşitsizlik yön değiştirir ve {0} olur. −2x + 6 ≥ 14 eşitsizliğinin çözümü ise {1} şeklindedir.",
        "blanks": [
          {
            "id": 0,
            "correct": "x > −5",
            "choices": [
              "x < −5",
              "x > −5",
              "x > 5"
            ]
          },
          {
            "id": 1,
            "correct": "x ≤ −4",
            "choices": [
              "x ≥ −4",
              "x ≤ −4",
              "x ≤ 4"
            ]
          }
        ],
        "id": 17,
        "kazanimId": "k4"
      },
      {
        "type": "video",
        "icon": "🎬",
        "typeLabel": "Animasyonlu Anlatım",
        "title": "Yön Değiştirme Tuzaklarından Kaçınma",
        "subtitle": "LGS'de öğrencilerin en çok dikkat etmesi gereken negatif katsayı adımı.",
        "videoScene": "custom_steps",
        "steps": [
          {
            "text": "1. Adım: 10 − 2x > 16 eşitsizliğinde önce +10'u karşıya −10 olarak atarız: −2x > 6 (Henüz yön değişmez!).",
            "draw": "s1"
          },
          {
            "text": "2. Adım: Şimdi x'in katsayısı olan −2'ye her iki tarafı böleriz.",
            "draw": "s2"
          },
          {
            "text": "3. Adım: Negatif sayıya böldüğümüz anda > işareti < olur: x < −3!",
            "draw": "s3"
          }
        ],
        "quickQuestion": "−5x ≥ 30 eşitsizliğinin çözüm kümesi aşağıdakilerden hangisidir?",
        "quickChoices": [
          "x ≥ −6",
          "x ≤ −6",
          "x ≤ 6"
        ],
        "quickCorrect": "x ≤ −6",
        "id": 18,
        "kazanimId": "k4"
      },
      {
        "type": "activity",
        "icon": "🧩",
        "typeLabel": "Etkileşimli Sınıflama",
        "title": "Yön Değişir mi, Değişmez mi?",
        "subtitle": "Verilen işlemlerde eşitsizlik sembolünün yön değiştirip değiştirmeyeceğine karar ver!",
        "activityMode": "custom_sort",
        "sortChoices": [
          "Yön Değişir!",
          "Yön Değişmez"
        ],
        "items": [
          {
            "text": "−3x < 15 eşitsizliğinde iki tarafı −3'e bölmek",
            "answer": "Yön Değişir!"
          },
          {
            "text": "2x > −10 eşitsizliğinde iki tarafı +2'ye bölmek (Bölen pozitif!)",
            "answer": "Yön Değişmez"
          },
          {
            "text": "−x / 4 ≤ 3 eşitsizliğinde iki tarafı −4 ile çarpmak",
            "answer": "Yön Değişir!"
          },
          {
            "text": "x − 8 ≥ −2 eşitsizliğinde iki tarafa +8 eklemek",
            "answer": "Yön Değişmez"
          }
        ],
        "id": 19,
        "kazanimId": "k4"
      },
      {
        "type": "game",
        "icon": "🎮",
        "typeLabel": "HTML5 Mini Oyun",
        "title": "Oyun: Negatif Tuzak Avcısı",
        "subtitle": "Yön değiştirme kuralını uygulayarak doğru çözümü seç!",
        "gameType": "final_marathon",
        "challenges": [
          {
            "q": "12 − 3x ≤ 0 eşitsizliğinin çözümü nedir?",
            "choices": [
              "x ≤ 4",
              "x ≥ 4",
              "x ≥ −4"
            ],
            "ans": "x ≥ 4"
          },
          {
            "q": "−2x + 5 > 13 eşitsizliğini sağlayan en büyük tam sayı kaçtır?",
            "choices": [
              "−3",
              "−4",
              "−5"
            ],
            "ans": "−5"
          },
          {
            "q": "a < 0 olmak üzere a·x > 3a ise x için ne söylenebilir?",
            "choices": [
              "x > 3",
              "x < 3",
              "x < −3"
            ],
            "ans": "x < 3"
          }
        ],
        "id": 20,
        "kazanimId": "k4"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Negatif Katsayılı Eşitsizlik",
        "subtitle": "Bölen negatif olduğunda işareti ters çevirmeyi unutma.",
        "stem": "<strong>15 − 4x > −5</strong> eşitsizliğini sağlayan <strong>doğal sayıların</strong> toplamı kaçtır?",
        "options": [
          {
            "letter": "A",
            "text": "6"
          },
          {
            "letter": "B",
            "text": "10"
          },
          {
            "letter": "C",
            "text": "15"
          },
          {
            "letter": "D",
            "text": "21"
          }
        ],
        "correctLetter": "B",
        "hint": "−4x > −20 ⇒ İki tarafı −4'e bölünce yön değişir: x < 5! Doğal sayılar: 0, 1, 2, 3, 4.",
        "solution": "−4x > −20 ⇒ Her iki taraf −4'e bölünürse yön değişir: <strong>x < 5</strong>. 5'ten küçük doğal sayılar 0, 1, 2, 3 ve 4'tür. Toplamları = 1 + 2 + 3 + 4 = <strong>10</strong>.",
        "id": 21,
        "kazanimId": "k4"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Kazanım Kontrol: Parantezli Eşitsizlik",
        "subtitle": "Kazanım 4'ü yeşile çevirmek için bu soruyu çöz!",
        "stem": "<strong>3 − 2(x − 1) ≥ 11</strong> eşitsizliğinin çözüm kümesi aşağıdakilerden hangisidir?",
        "options": [
          {
            "letter": "A",
            "text": "x ≥ −3"
          },
          {
            "letter": "B",
            "text": "x ≤ −3"
          },
          {
            "letter": "C",
            "text": "x ≤ 3"
          },
          {
            "letter": "D",
            "text": "x ≥ 3"
          }
        ],
        "correctLetter": "B",
        "hint": "3 − 2x + 2 ≥ 11 ⇒ 5 − 2x ≥ 11 ⇒ −2x ≥ 6 ⇒ x ≤ −3!",
        "solution": "Parantezi açarsak: 3 − 2x + 2 ≥ 11 ⇒ 5 − 2x ≥ 11 ⇒ −2x ≥ 6. İki tarafı −2'ye böldüğümüzde yön değişir: <strong>x ≤ −3</strong> bulunur.",
        "id": 22,
        "kazanimId": "k4"
      },
      {
        "type": "concept",
        "icon": "💡",
        "typeLabel": "Örnek & Keşif",
        "title": "Ortadaki x'i Yalnız Bırakırken Her Üç Tarafa Aynı İşlemi Yap!",
        "subtitle": "a < 2x + b ≤ c biçimindeki çift taraflı eşitsizliklerde işlem hem sola hem sağa aynı anda uygulanır.",
        "explanation": [
          "Örneğin <strong>−3 < 2x + 1 ≤ 9</strong> eşitsizliğinde her üç taraftan <strong>1 çıkarırız</strong>: <strong>−4 < 2x ≤ 8</strong>.",
          "Sonra her üç tarafı <strong>2'ye böleriz</strong>: <strong>−2 < x ≤ 4</strong> (Tam sayılar: −1, 0, 1, 2, 3, 4)."
        ],
        "sentenceHtml": "1 ≤ 3x − 2 < 13 eşitsizliğinde her tarafa +2 eklendiğinde 3 ≤ 3x < {0} ve 3'e bölündüğünde {1} aralığı elde edilir.",
        "blanks": [
          {
            "id": 0,
            "correct": "15",
            "choices": [
              "11",
              "13",
              "15"
            ]
          },
          {
            "id": 1,
            "correct": "1 ≤ x < 5",
            "choices": [
              "1 ≤ x < 5",
              "1 < x ≤ 5",
              "3 ≤ x < 15"
            ]
          }
        ],
        "id": 23,
        "kazanimId": "k5"
      },
      {
        "type": "activity",
        "icon": "🧩",
        "typeLabel": "Etkileşimli Etkinlik",
        "title": "Çift Taraflı Aralık Çözümü",
        "subtitle": "−5 ≤ 2x − 1 < 7 eşitsizliğini adım adım çöz!",
        "activityMode": "rainbow_pairs",
        "targetNumber": 0,
        "sequence": [
          "Her tarafa +1 ekle: ? ≤ 2x < 8",
          "2'ye böl: −2 ≤ x < ?",
          "Kaç tam sayı sağlar=?"
        ],
        "missingTargets": [
          {
            "index": 0,
            "answer": -4,
            "hint": "−5 + 1 = −4"
          },
          {
            "index": 1,
            "answer": 4,
            "hint": "8 ÷ 2 = 4"
          },
          {
            "index": 2,
            "answer": 6,
            "hint": "−2, −1, 0, 1, 2, 3 olmak üzere 6 tam sayı."
          }
        ],
        "pool": [
          -4,
          -2,
          3,
          4,
          6,
          8
        ],
        "id": 24,
        "kazanimId": "k5"
      },
      {
        "type": "game",
        "icon": "🎮",
        "typeLabel": "HTML5 Mini Oyun",
        "title": "Oyun: Aralık Ustası",
        "subtitle": "Çift taraflı eşitsizliklerin sınırlarını bul!",
        "gameType": "final_marathon",
        "challenges": [
          {
            "q": "2 < (x + 1) / 3 ≤ 4 eşitsizliğinde x'in en büyük tam sayı değeri kaçtır?",
            "choices": [
              "10",
              "11",
              "12"
            ],
            "ans": "11"
          },
          {
            "q": "x bir gerçek sayı ve −3 < x < 5 ise 2x + 1 ifadesinin en büyük tam sayı değeri kaçtır?",
            "choices": [
              "9",
              "10",
              "11"
            ],
            "ans": "10"
          },
          {
            "q": "−4 ≤ x ≤ 2 aralığında kaç tam sayı vardır?",
            "choices": [
              "5",
              "6",
              "7"
            ],
            "ans": "7"
          }
        ],
        "id": 25,
        "kazanimId": "k5"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Kazanım Kontrol: Çift Taraflı Kesirli Eşitsizlik",
        "subtitle": "Kazanım 5'i yeşile çevirmek için bu soruyu çöz!",
        "stem": "<strong>−1 ≤ (2x + 4) / 3 ≤ 4</strong> eşitsizliğini sağlayan <strong>kaç farklı x tam sayısı</strong> vardır?",
        "options": [
          {
            "letter": "A",
            "text": "6"
          },
          {
            "letter": "B",
            "text": "7"
          },
          {
            "letter": "C",
            "text": "8"
          },
          {
            "letter": "D",
            "text": "9"
          }
        ],
        "correctLetter": "C",
        "hint": "3 ile çarp: −3 ≤ 2x + 4 < 12 ⇒ 4 çıkar: −7 ≤ 2x < 8 ⇒ 2'ye böl: −3,5 ≤ x < 4!",
        "solution": "Her tarafı 3 ile çarparsak: −3 ≤ 2x + 4 ≤ 12 ⇒ −7 ≤ 2x ≤ 8 ⇒ <strong>−3,5 ≤ x ≤ 4</strong>. Tam sayılar: −3, −2, −1, 0, 1, 2, 3, 4 olmak üzere toplam <strong>8 farklı</strong> tam sayı vardır.",
        "id": 26,
        "kazanimId": "k5"
      },
      {
        "type": "activity",
        "icon": "🧩",
        "typeLabel": "Etkileşimli Etkinlik",
        "title": "Adım Adım LGS Kurgusu: Asansör Kapasitesi",
        "subtitle": "En çok 450 kg taşıyan asansöre kütleleri toplamı 270 kg olan 4 kişi binmiştir. Her biri 25 kg olan kolilerden kaç tane yüklenebilir?",
        "activityMode": "rainbow_pairs",
        "targetNumber": 0,
        "sequence": [
          "Kalan kapasite ≤ ? kg",
          "25x ≤ 180 ⇒ x ≤ ?,2",
          "En çok kaç koli=?"
        ],
        "missingTargets": [
          {
            "index": 0,
            "answer": 180,
            "hint": "450 − 270 = 180 kg"
          },
          {
            "index": 1,
            "answer": 7,
            "hint": "180 ÷ 25 = 7,2"
          },
          {
            "index": 2,
            "answer": 7,
            "hint": "En çok 7 tam koli yüklenebilir."
          }
        ],
        "pool": [
          6,
          7,
          8,
          150,
          180,
          200
        ],
        "id": 27,
        "kazanimId": "k6"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "LGS Yeni Nesil 1: İki Tarifeden Avantajlı Olanı Seçme",
        "subtitle": "Aylık sabit ücret + dakika ücreti karşılaştırması.",
        "stem": "A operatörü aylık <strong>60 TL sabit ücret</strong> ve her dakika için <strong>2 TL</strong>; B operatörü ise <strong>sabit ücretsiz</strong> her dakika için <strong>5 TL</strong> almaktadır. Aylık konuşma süresi (x dk) en az kaç tam dakika olursa <strong>A operatörü daha ekonomik</strong> (ucuz) olur?",
        "options": [
          {
            "letter": "A",
            "text": "19"
          },
          {
            "letter": "B",
            "text": "20"
          },
          {
            "letter": "C",
            "text": "21"
          },
          {
            "letter": "D",
            "text": "22"
          }
        ],
        "correctLetter": "C",
        "hint": "60 + 2x < 5x ⇒ 3x > 60 ⇒ x > 20! 20'den büyük en küçük tam sayı 21.",
        "solution": "A'nın B'den ucuz olması için: 60 + 2x < 5x ⇒ 60 < 3x ⇒ <strong>x > 20</strong> olmalıdır. En az <strong>21 dakika</strong> konuşulduğunda A operatörü daha ekonomik olur.",
        "id": 28,
        "kazanimId": "k6"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "LGS Yeni Nesil 2: Kar Elde Etme Koşulu",
        "subtitle": "Satış fiyatının maliyetten büyük olması (Satış > Maliyet).",
        "stem": "Maliyeti <strong>(3x + 40) TL</strong> olan bir ürün <strong>(5x − 10) TL</strong>'ye satıldığında <strong>kâr elde edildiği</strong> biliniyor. Buna göre x'in alabileceği en küçük tam sayı değeri kaçtır?",
        "options": [
          {
            "letter": "A",
            "text": "24"
          },
          {
            "letter": "B",
            "text": "25"
          },
          {
            "letter": "C",
            "text": "26"
          },
          {
            "letter": "D",
            "text": "27"
          }
        ],
        "correctLetter": "C",
        "hint": "Kâr edilmesi için Satış > Maliyet olmalıdır: 5x − 10 > 3x + 40 ⇒ 2x > 50 ⇒ x > 25!",
        "solution": "Kâr koşulu: Satış > Maliyet ⇒ 5x − 10 > 3x + 40 ⇒ 2x > 50 ⇒ <strong>x > 25</strong>. 25'ten büyük en küçük tam sayı <strong>26</strong>'dır.",
        "id": 29,
        "kazanimId": "k6"
      },
      {
        "type": "game",
        "icon": "🏆",
        "typeLabel": "Final Maratonu",
        "title": "Final: Eşitsizlikler Şampiyonluk Etabı",
        "subtitle": "Son 3 görevi tamamla ve 8. Üniteyi tamamen YEŞİLE döndür!",
        "gameType": "final_marathon",
        "challenges": [
          {
            "q": "−3x > 18 eşitsizliğinin çözümü nedir?",
            "choices": [
              "x > −6",
              "x < −6",
              "x < 6"
            ],
            "ans": "x < −6"
          },
          {
            "q": "'En fazla 80 km/sa hız' ifadesi hangisidir?",
            "choices": [
              "v < 80",
              "v ≤ 80",
              "v ≥ 80"
            ],
            "ans": "v ≤ 80"
          },
          {
            "q": "2x − 5 ≤ 9 eşitsizliğini sağlayan en büyük tam sayı kaçtır?",
            "choices": [
              "6",
              "7",
              "8"
            ],
            "ans": "7"
          }
        ],
        "id": 30,
        "kazanimId": "k6"
      }
    ]
  },
  {
    "id": "m8-u9-ucgenler",
    "grade": 8,
    "unitNo": 9,
    "title": "Üçgenler",
    "subtitle": "Yardımcı Elemanlar, Üçgen Eşitsizliği, Açı-Kenar, Çizim ve Pisagor Bağıntısı",
    "coverImage": "assets/flow/u09_ucgenler.jpg",
    "badgeCells": [
      "3-4-5",
      "5-12-13",
      "8-15-17",
      "a²+b²",
      "=c²",
      "h_a",
      "n_A",
      "V_a",
      "📐",
      "🔺",
      "📏",
      "LGS"
    ],
    "kazanimlar": [
      {
        "id": "k1",
        "no": 1,
        "title": "Kenarortay, Açıortay ve Yükseklik",
        "code": "M.8.3.1.1",
        "visual": "assets/flow/u09_ucgenler.jpg",
        "stops": [
          1,
          2,
          3,
          4,
          5
        ]
      },
      {
        "id": "k2",
        "no": 2,
        "title": "Üçgen Eşitsizliği: |b − c| < a < b + c",
        "code": "M.8.3.1.2",
        "visual": "assets/flow/u09_ucgenler.jpg",
        "stops": [
          6,
          7,
          8,
          9,
          10
        ]
      },
      {
        "id": "k3",
        "no": 3,
        "title": "Üçgende Açı-Kenar Bağıntıları",
        "code": "M.8.3.1.3",
        "visual": "assets/flow/u09_ucgenler.jpg",
        "stops": [
          11,
          12,
          13,
          14,
          15,
          16
        ]
      },
      {
        "id": "k4",
        "no": 4,
        "title": "Üçgen Çizimi: KKK, KAK ve AKA Koşulları",
        "code": "M.8.3.1.4",
        "visual": "assets/flow/u09_ucgenler.jpg",
        "stops": [
          17,
          18,
          19,
          20,
          21
        ]
      },
      {
        "id": "k5",
        "no": 5,
        "title": "Pisagor Bağıntısı (a² + b² = c²) ve Özel Dik Üçgenler",
        "code": "M.8.3.1.5",
        "visual": "assets/flow/u09_ucgenler.jpg",
        "stops": [
          22,
          23,
          24,
          25,
          26
        ]
      },
      {
        "id": "k6",
        "no": 6,
        "title": "LGS Merdiven Kayması ve En Kısa Yol Görevleri",
        "code": "M.8.3.1.5",
        "visual": "assets/flow/u09_ucgenler.jpg",
        "stops": [
          27,
          28,
          29,
          30
        ]
      }
    ],
    "stops": [
      {
        "type": "concept",
        "icon": "💡",
        "typeLabel": "Örnek & Keşif",
        "title": "Üçgenin Yardımcı Elemanları: V_a, n_A ve h_a",
        "subtitle": "İkizkenar üçgende tepe açısından indirilen yükseklik aynı zamanda açıortay ve kenarortaydır (YAK Kuralı)!",
        "explanation": [
          "• <strong>Kenarortay (V):</strong> Kenarın tam orta noktasını karşı köşeye birleştirir.<br>• <strong>Açıortay (n):</strong> Köşe açısını iki eş parçaya böler.<br>• <strong>Yükseklik (h):</strong> Köşeden karşı kenara (veya uzantısına) indirilen dikmedir.",
          "• <strong>Dik üçgende</strong> dik kenarlar birbirinin yüksekliğidir ve yükseklikler <strong>dik köşede</strong> kesişir.<br>• <strong>Geniş açılı üçgende</strong> iki yükseklik üçgenin <strong>dış bölgesinde</strong> kesişir!"
        ],
        "sentenceHtml": "Bir üçgende karşı kenarı iki eş parçaya bölen doğru parçasına {0} denir. Geniş açılı bir üçgende yüksekliklerin kesişim noktası üçgenin {1} bölgesindedir.",
        "blanks": [
          {
            "id": 0,
            "correct": "kenarortay",
            "choices": [
              "açıortay",
              "kenarortay",
              "yükseklik"
            ]
          },
          {
            "id": 1,
            "correct": "dış",
            "choices": [
              "iç",
              "dış",
              "köşe"
            ]
          }
        ],
        "id": 1,
        "kazanimId": "k1"
      },
      {
        "type": "activity",
        "icon": "🧩",
        "typeLabel": "Etkileşimli Sınıflama",
        "title": "Normal Üçgen mi, İkizkenar/Eşkenar mı?",
        "subtitle": "Normal çeşitkenar bir üçgende her köşe için daima h_a ≤ n_A ≤ V_a sıralaması geçerlidir!",
        "activityMode": "custom_sort",
        "sortChoices": [
          "Her Zaman Doğru",
          "Sadece Özel Üçgende"
        ],
        "items": [
          {
            "text": "Çeşitkenar üçgende en kısa yardımcı eleman yüksekliktir (h < n < V)",
            "answer": "Her Zaman Doğru"
          },
          {
            "text": "Yükseklik, açıortay ve kenarortay aynı doğru parçasıdır (h = n = V)",
            "answer": "Sadece Özel Üçgende"
          },
          {
            "text": "Kenarortayların kesişim noktası (ağırlık merkezi) daima üçgenin içindedir",
            "answer": "Her Zaman Doğru"
          },
          {
            "text": "Yükseklikler üçgenin dik köşesinde kesişir",
            "answer": "Sadece Özel Üçgende"
          }
        ],
        "id": 2,
        "kazanimId": "k1"
      },
      {
        "type": "video",
        "icon": "🎬",
        "typeLabel": "Animasyonlu Anlatım",
        "title": "Katlama Sorularında Kenarortay, Açıortay ve Yükseklik!",
        "subtitle": "LGS katlama sorularında hangi katlama hangi yardımcı elemanı verir?",
        "videoScene": "custom_steps",
        "steps": [
          {
            "text": "1. Kural (Kenarortay): B köşesi C köşesinin tam üzerine katlanıp orta nokta işaretlenirse ve A ile birleştirilirse KENARORTAY oluşur!",
            "draw": "s1"
          },
          {
            "text": "2. Kural (Açıortay): [AB] kenarı [AC] kenarının üzerine gelecek şekilde katlanırsa kat izi AÇIORTAY olur!",
            "draw": "s2"
          },
          {
            "text": "3. Kural (Yükseklik): [BC] kenarı yine [BC] kenarının kendi üzerine katlanıp A köşesinden geçiyorsa kat izi diktir ve YÜKSEKLİK olur!",
            "draw": "s3"
          }
        ],
        "quickQuestion": "Bir ABC üçgeninde [AB] kenarı [AC] kenarı ile çakışacak biçimde katlanıp açıldığında oluşan kat izi hangi yardımcı elemandır?",
        "quickChoices": [
          "A açısının açıortayı",
          "BC kenarının kenarortayı",
          "BC kenarına ait yükseklik"
        ],
        "quickCorrect": "A açısının açıortayı",
        "id": 3,
        "kazanimId": "k1"
      },
      {
        "type": "game",
        "icon": "🎮",
        "typeLabel": "HTML5 Mini Oyun",
        "title": "Oyun: Yardımcı Eleman Uzmanı",
        "subtitle": "Üçgenin yardımcı elemanlarının özelliklerini seç!",
        "gameType": "final_marathon",
        "challenges": [
          {
            "q": "Hangi üçgende yüksekliklerin kesişim noktası üçgenin dışındadır?",
            "choices": [
              "Dar açılı",
              "Dik açılı",
              "Geniş açılı"
            ],
            "ans": "Geniş açılı"
          },
          {
            "q": "|AB| = |AC| olan ikizkenar üçgende A'dan BC'ye indirilen dikme BC=16 cm kenarını nasıl böler?",
            "choices": [
              "6 ve 10",
              "8 ve 8",
              "4 ve 12"
            ],
            "ans": "8 ve 8"
          },
          {
            "q": "Bir köşeden çizilen yardımcı elemanlardan hangisi en kısadır?",
            "choices": [
              "Yükseklik (h)",
              "Açıortay (n)",
              "Kenarortay (V)"
            ],
            "ans": "Yükseklik (h)"
          }
        ],
        "id": 4,
        "kazanimId": "k1"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Kazanım Kontrol: Katlama ve Kenarortay",
        "subtitle": "Kazanım 1'i yeşile çevirmek için bu soruyu çöz!",
        "stem": "Bir ABC üçgeninde [AD] doğru parçası [BC] kenarına ait <strong>kenarortaydır</strong>. <strong>|BD| = (2x + 1) cm</strong> ve <strong>|DC| = (x + 6) cm</strong> olduğuna göre <strong>|BC|</strong> kenarının tamamı kaç cm'dir?",
        "options": [
          {
            "letter": "A",
            "text": "5 cm"
          },
          {
            "letter": "B",
            "text": "11 cm"
          },
          {
            "letter": "C",
            "text": "22 cm"
          },
          {
            "letter": "D",
            "text": "24 cm"
          }
        ],
        "correctLetter": "C",
        "hint": "Kenarortay kenarı iki eş parçaya böler: 2x + 1 = x + 6 ⇒ x = 5. Sonra |BC| = 2 × |BD| hesapla!",
        "solution": "Kenarortay olduğundan |BD| = |DC| ⇒ 2x + 1 = x + 6 ⇒ <strong>x = 5</strong> bulunur. |BD| = 2(5) + 1 = 11 cm olduğundan |BC| = 11 + 11 = <strong>22 cm</strong>'dir.",
        "id": 5,
        "kazanimId": "k1"
      },
      {
        "type": "concept",
        "icon": "💡",
        "typeLabel": "Örnek & Keşif",
        "title": "Bir Kenar; Diğer İki Kenarın Farkından Büyük, Toplamından Küçüktür!",
        "subtitle": "Herhangi üç çubuğun uç uca eklenerek üçgen oluşturabilmesi için |b − c| < a < b + c eşitsizliği sağlanmalıdır!",
        "explanation": [
          "Örneğin iki kenarı <strong>5 cm ve 9 cm</strong> olan bir üçgenin üçüncü kenarı (x):<br><strong>9 − 5 < x < 9 + 5 ⇒ 4 < x < 14</strong> aralığındadır (x tam sayı olarak 5, 6, ..., 13 değerlerini alabilir).",
          "Ortak tabanlı iki üçgende ise her iki üçgenin eşitsizliği ayrı ayrı yazılıp <strong>kesişim aralığı</strong> (küçüklerin büyüğü, büyüklerin küçüğü) alınır!"
        ],
        "sentenceHtml": "Kenarlarından ikisi 6 cm ve 10 cm olan bir üçgenin üçüncü kenarı x için {0} < x < {1} eşitsizliği geçerlidir.",
        "blanks": [
          {
            "id": 0,
            "correct": "4",
            "choices": [
              "2",
              "4",
              "6"
            ]
          },
          {
            "id": 1,
            "correct": "16",
            "choices": [
              "14",
              "16",
              "60"
            ]
          }
        ],
        "id": 6,
        "kazanimId": "k2"
      },
      {
        "type": "activity",
        "icon": "🧩",
        "typeLabel": "Etkileşimli Etkinlik",
        "title": "Üçgen Eşitsizliği Sınırları",
        "subtitle": "İki kenarı 7 cm ve 12 cm olan üçgenin üçüncü kenarı x için eksikleri bul!",
        "activityMode": "rainbow_pairs",
        "targetNumber": 0,
        "sequence": [
          "Alt sınır (12−7) < x ⇒ ?",
          "Üst sınır x < (12+7) ⇒ ?",
          "x'in en büyük tam sayı değeri=?"
        ],
        "missingTargets": [
          {
            "index": 0,
            "answer": 5,
            "hint": "12 − 7 = 5"
          },
          {
            "index": 1,
            "answer": 19,
            "hint": "12 + 7 = 19"
          },
          {
            "index": 2,
            "answer": 18,
            "hint": "19'dan küçük en büyük tam sayı 18'dir."
          }
        ],
        "pool": [
          5,
          6,
          17,
          18,
          19,
          20
        ],
        "id": 7,
        "kazanimId": "k2"
      },
      {
        "type": "game",
        "icon": "🎮",
        "typeLabel": "HTML5 Mini Oyun",
        "title": "Oyun: Üçgen Oluşur mu?",
        "subtitle": "Verilen kenar uzunluklarıyla üçgen çizilip çizilemeyeceğini belirle!",
        "gameType": "final_marathon",
        "challenges": [
          {
            "q": "Hangi kenar uzunluklarıyla bir üçgen çizilemez?",
            "choices": [
              "4, 5, 8",
              "3, 6, 9",
              "7, 8, 10"
            ],
            "ans": "3, 6, 9"
          },
          {
            "q": "İki kenarı 8 cm ve 8 cm olan ikizkenar üçgenin üçüncü kenarı en çok kaç tam sayı cm olabilir?",
            "choices": [
              "15",
              "16",
              "17"
            ],
            "ans": "15"
          },
          {
            "q": "3 < x < 11 aralığında x kaç farklı tam sayı değeri alır?",
            "choices": [
              "6",
              "7",
              "8"
            ],
            "ans": "7"
          }
        ],
        "id": 8,
        "kazanimId": "k2"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Ortak Kenarlı İki Üçgen",
        "subtitle": "İki üçgen için de eşitsizlik yazıp ortak aralığı (kesişimi) al!",
        "stem": "Ortak [BD] kenarına sahip ABD ve BCD üçgenlerinde <strong>|AB|=4 cm, |AD|=9 cm</strong> ve <strong>|BC|=6 cm, |CD|=8 cm</strong>'dir. Buna göre ortak <strong>|BD| = x</strong> kenarı kaç farklı tam sayı değeri alabilir?",
        "options": [
          {
            "letter": "A",
            "text": "6"
          },
          {
            "letter": "B",
            "text": "7"
          },
          {
            "letter": "C",
            "text": "8"
          },
          {
            "letter": "D",
            "text": "9"
          }
        ],
        "correctLetter": "B",
        "hint": "Üst üçgen: 5 < x < 13. Alt üçgen: 2 < x < 14. Kesişim: 5 < x < 13!",
        "solution": "ABD üçgeninde: 9−4 < x < 9+4 ⇒ <strong>5 < x < 13</strong>. BCD üçgeninde: 8−6 < x < 8+6 ⇒ <strong>2 < x < 14</strong>. Ortak aralık <strong>5 < x < 13</strong> olduğundan x = 6, 7, 8, 9, 10, 11, 12 olmak üzere <strong>7 farklı</strong> tam sayı değeri alır.",
        "id": 9,
        "kazanimId": "k2"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Kazanım Kontrol: Çevre Tam Sayı Değeri",
        "subtitle": "Kazanım 2'yi yeşile çevirmek için bu soruyu çöz!",
        "stem": "İki kenar uzunluğu <strong>5 cm</strong> ve <strong>11 cm</strong> olan bir üçgenin üçüncü kenar uzunluğu da santimetre cinsinden tam sayıdır. Bu üçgenin <strong>çevresi en az</strong> kaç cm'dir?",
        "options": [
          {
            "letter": "A",
            "text": "22 cm"
          },
          {
            "letter": "B",
            "text": "23 cm"
          },
          {
            "letter": "C",
            "text": "24 cm"
          },
          {
            "letter": "D",
            "text": "31 cm"
          }
        ],
        "correctLetter": "B",
        "hint": "11 − 5 < x < 11 + 5 ⇒ 6 < x < 16 ⇒ x en az 7 cm olur. Çevre = 5 + 11 + 7!",
        "solution": "Üçüncü kenar x için 6 < x < 16 olduğundan x en az <strong>7 cm</strong> seçilir. Çevre = 5 + 11 + 7 = <strong>23 cm</strong> bulunur.",
        "id": 10,
        "kazanimId": "k2"
      },
      {
        "type": "concept",
        "icon": "💡",
        "typeLabel": "Örnek & Keşif",
        "title": "Büyük Açı Karşısında Büyük Kenar Bulunur!",
        "subtitle": "Bir üçgende iç açıların büyüklük sıralaması ile karşılarındaki kenarların uzunluk sıralaması BİREBİR AYNIDIR!",
        "explanation": [
          "ABC üçgeninde <strong>m(A) > m(B) > m(C)</strong> ise kenarlar da <strong>a > b > c</strong> şeklinde sıralanır.",
          "• <strong>Dik üçgende</strong> en büyük açı 90° olduğu için en uzun kenar daima <strong>hipotenüstür</strong>.<br>• <strong>Geniş açılı üçgende</strong> (açı > 90°) en uzun kenar daima <strong>geniş açının karşısındaki kenardır</strong>!"
        ],
        "sentenceHtml": "Bir ABC üçgeninde m(A) = 70°, m(B) = 60° ve m(C) = 50° ise en uzun kenar {0} açısının karşısındaki a kenarıdır. Dik üçgende en uzun kenara {1} denir.",
        "blanks": [
          {
            "id": 0,
            "correct": "A (70°)",
            "choices": [
              "A (70°)",
              "B (60°)",
              "C (50°)"
            ]
          },
          {
            "id": 1,
            "correct": "hipotenüs",
            "choices": [
              "dik kenar",
              "hipotenüs",
              "kenarortay"
            ]
          }
        ],
        "id": 11,
        "kazanimId": "k3"
      },
      {
        "type": "video",
        "icon": "🎬",
        "typeLabel": "Animasyonlu Anlatım",
        "title": "Bitişik Üçgenlerde En Uzun Kenarı Bulma (Ok Yöntemi)",
        "subtitle": "İki bitişik üçgende her üçgenin en uzun kenarına ok çizilir; okların gittiği son kenar en uzundur!",
        "videoScene": "custom_steps",
        "steps": [
          {
            "text": "1. Adım: Önce her iki üçgende de verilmeyen üçüncü iç açıyı 180°'den çıkararak buluruz!",
            "draw": "s1"
          },
          {
            "text": "2. Adım: Her üçgenin kendi içindeki en büyük açısının karşısındaki kenara bir ok çizeriz.",
            "draw": "s2"
          },
          {
            "text": "3. Adım: Birinci üçgenin en uzun kenarı ortak kenar çıkarsa, ikinci üçgenin oku bizi tüm şeklin en uzun kenarına götürür!",
            "draw": "s3"
          }
        ],
        "quickQuestion": "İç açıları m(A)=45° ve m(B)=80° olan bir ABC üçgeninde en kısa kenar hangisidir?",
        "quickChoices": [
          "|BC| (a kenarı)",
          "|AC| (b kenarı)",
          "|AB| (c kenarı)"
        ],
        "quickCorrect": "|BC| (a kenarı)",
        "id": 12,
        "kazanimId": "k3"
      },
      {
        "type": "activity",
        "icon": "🧩",
        "typeLabel": "Etkileşimli Etkinlik",
        "title": "Açılardan Kenar Sıralamasına",
        "subtitle": "Bir üçgende m(A)=50°, m(B)=65° ise üçüncü açıyı ve sıralamayı bul!",
        "activityMode": "rainbow_pairs",
        "targetNumber": 0,
        "sequence": [
          "m(C) açısı = ?°",
          "En büyük açı = ?°",
          "En kısa kenar hangi açının karşısı=?°"
        ],
        "missingTargets": [
          {
            "index": 0,
            "answer": 65,
            "hint": "180° − (50° + 65°) = 65°"
          },
          {
            "index": 1,
            "answer": 65,
            "hint": "B ve C açıları 65° ile eşittir (İkizkenar!)."
          },
          {
            "index": 2,
            "answer": 50,
            "hint": "En küçük açı 50° (A açısı) olduğu için karşısı en kısadır."
          }
        ],
        "pool": [
          45,
          50,
          55,
          65,
          70,
          80
        ],
        "id": 13,
        "kazanimId": "k3"
      },
      {
        "type": "game",
        "icon": "🎮",
        "typeLabel": "HTML5 Mini Oyun",
        "title": "Oyun: Açı-Kenar Dedektifi",
        "subtitle": "Açı ve kenar büyüklüklerini doğru eşleştir!",
        "gameType": "final_marathon",
        "challenges": [
          {
            "q": "Geniş açılı bir üçgende geniş açının karşısındaki kenar 12 cm ise diğer kenar hangisi olamaz?",
            "choices": [
              "8 cm",
              "10 cm",
              "13 cm"
            ],
            "ans": "13 cm"
          },
          {
            "q": "|AB| > |BC| > |AC| olan ABC üçgeninde en büyük iç açı hangisidir?",
            "choices": [
              "A açısı",
              "B açısı",
              "C açısı"
            ],
            "ans": "C açısı"
          },
          {
            "q": "Bir dik üçgende dik kenarlardan biri 9 cm ise hipotenüs en az kaç tam sayı cm olur?",
            "choices": [
              "9",
              "10",
              "11"
            ],
            "ans": "10"
          }
        ],
        "id": 14,
        "kazanimId": "k3"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Geniş Açı Koşulu + Üçgen Eşitsizliği",
        "subtitle": "Açı 90°'den büyükse karşısındaki kenar diğer iki kenarın her birinden büyük olmalıdır!",
        "stem": "Bir ABC üçgeninde <strong>m(A) > 90° (geniş açı)</strong>, <strong>|AB| = 6 cm</strong> ve <strong>|AC| = 8 cm</strong>'dir. |BC| = x kenarı sadece geniş açı ve üçgen eşitsizliği kuralına göre (Pisagor öncesi tam sayı sınırında) 8'den büyük ve kaçtan küçüktür?",
        "options": [
          {
            "letter": "A",
            "text": "12"
          },
          {
            "letter": "B",
            "text": "13"
          },
          {
            "letter": "C",
            "text": "14"
          },
          {
            "letter": "D",
            "text": "15"
          }
        ],
        "correctLetter": "C",
        "hint": "Üçgen eşitsizliğinden x < 6 + 8 = 14 (ve Pisagor ile m(A)>90° ise x > √(6²+8²) = 10)!",
        "solution": "Üçgen eşitsizliğine göre üst sınır x < 6 + 8 = <strong>14 cm</strong>'dir (Ayrıca geniş açı kuralından x > 10 cm olup 10 < x < 14 aralığındadır).",
        "id": 15,
        "kazanimId": "k3"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Kazanım Kontrol: Kenarlardan Açıları Sıralama",
        "subtitle": "Kazanım 3'ü yeşile çevirmek için bu soruyu çöz!",
        "stem": "Bir ABC üçgeninde <strong>|BC| = 7 cm</strong>, <strong>|AC| = 10 cm</strong> ve <strong>|AB| = 12 cm</strong> olduğuna göre iç açıların doğru sıralanışı hangisidir?",
        "options": [
          {
            "letter": "A",
            "text": "m(A) < m(B) < m(C)"
          },
          {
            "letter": "B",
            "text": "m(C) < m(B) < m(A)"
          },
          {
            "letter": "C",
            "text": "m(B) < m(A) < m(C)"
          },
          {
            "letter": "D",
            "text": "m(A) < m(C) < m(B)"
          }
        ],
        "correctLetter": "A",
        "hint": "|BC| (A'nın karşısı) = 7 < |AC| (B'nin karşısı) = 10 < |AB| (C'nin karşısı) = 12!",
        "solution": "Kenarlar |BC| < |AC| < |AB| şeklinde sıralandığından karşılarındaki açılar da <strong>m(A) < m(B) < m(C)</strong> olarak sıralanır.",
        "id": 16,
        "kazanimId": "k3"
      },
      {
        "type": "video",
        "icon": "🎬",
        "typeLabel": "Animasyonlu Anlatım",
        "title": "Pergel, Cetvel ve İletki (Açıölçer) ile Üçgen Çizimi",
        "subtitle": "Hangi elemanlar verildiğinde hangi çizim aracını kullanırız?",
        "videoScene": "custom_steps",
        "steps": [
          {
            "text": "1. Durum (KKK): Üç kenar uzunluğu biliniyorsa cetvel ve PERGEL kullanılır (yayların kesişimi tepe köşeyi verir).",
            "draw": "s1"
          },
          {
            "text": "2. Durum (KAK): İki kenar ve arasındaki açı biliniyorsa önce açı İLETKİ ile çizilir, sonra kenarlar cetvelle ölçülür.",
            "draw": "s2"
          },
          {
            "text": "3. Durum (AKA): Bir kenar ve uçlarındaki iki açı biliniyorsa cetvel ve İLETKİ ile tek bir üçgen çizilir!",
            "draw": "s3"
          }
        ],
        "quickQuestion": "Kenar uzunlukları 5 cm, 6 cm ve 8 cm olan üçgeni çizmek için cetvelle birlikte hangi araç kullanılır?",
        "quickChoices": [
          "Pergel",
          "İletki",
          "Tebeşir"
        ],
        "quickCorrect": "Pergel",
        "id": 17,
        "kazanimId": "k4"
      },
      {
        "type": "concept",
        "icon": "💡",
        "typeLabel": "Örnek & Keşif",
        "title": "Tek Bir Üçgen Çizebilmek İçin En Az 1 Kenar Bilinmelidir!",
        "subtitle": "Sadece 3 açısı (AAA) verilen üçgenin büyüklüğü bilinemeyeceği için sonsuz tane benzer üçgen çizilir, TEK bir üçgen çizilemez!",
        "explanation": [
          "<strong>Belirli (Tek) Bir Üçgen Çizilebilmesi İçin 3 Durum:</strong><br>1. <strong>KKK (Kenar-Kenar-Kenar):</strong> Üçgen eşitsizliğini sağlayan 3 kenar uzunluğu (Pergel + Cetvel).<br>2. <strong>KAK (Kenar-Açı-Kenar):</strong> İki kenar ve <strong>aralarındaki</strong> açı.",
          "3. <strong>AKA / AAK (Açı-Kenar-Açı):</strong> İki açı ve bir kenar uzunluğu (İletki + Cetvel)."
        ],
        "sentenceHtml": "Üç kenar uzunluğu bilinen bir üçgen cetvel ve {0} yardımıyla çizilir. Sadece üç iç açısı bilinen bir üçgenden ise {1} tane üçgen çizilebilir.",
        "blanks": [
          {
            "id": 0,
            "correct": "pergel",
            "choices": [
              "pergel",
              "iletki",
              "gönye"
            ]
          },
          {
            "id": 1,
            "correct": "sonsuz",
            "choices": [
              "tek bir",
              "iki",
              "sonsuz"
            ]
          }
        ],
        "id": 18,
        "kazanimId": "k4"
      },
      {
        "type": "activity",
        "icon": "🧩",
        "typeLabel": "Etkileşimli Sınıflama",
        "title": "Tek Bir Üçgen Çizilebilir mi, Çizilemez mi?",
        "subtitle": "Verilen elemanlarla belirli tek bir üçgen çizilip çizilemeyeceğine karar ver!",
        "activityMode": "custom_sort",
        "sortChoices": [
          "Tek Üçgen Çizilir",
          "Çizilemez!"
        ],
        "items": [
          {
            "text": "|AB|=5 cm, |BC|=7 cm ve m(B)=60° (İki kenar ve arasındaki açı - KAK)",
            "answer": "Tek Üçgen Çizilir"
          },
          {
            "text": "m(A)=50°, m(B)=60°, m(C)=70° (Hiç kenar uzunluğu yok - AAA)",
            "answer": "Çizilemez!"
          },
          {
            "text": "m(A)=40°, m(B)=80° ve |AB|=9 cm (İki açı ve bir kenar - AKA)",
            "answer": "Tek Üçgen Çizilir"
          },
          {
            "text": "|AB|=3 cm, |BC|=4 cm, |AC|=9 cm (3 + 4 < 9 üçgen eşitsizliğine uymaz!)",
            "answer": "Çizilemez!"
          }
        ],
        "id": 19,
        "kazanimId": "k4"
      },
      {
        "type": "game",
        "icon": "🎮",
        "typeLabel": "HTML5 Mini Oyun",
        "title": "Oyun: Çizim Kontrol Masası",
        "subtitle": "Üçgen çizim kurallarını test et!",
        "gameType": "final_marathon",
        "challenges": [
          {
            "q": "Üç kenarı bilinen üçgeni çizmek için cetvelin yanında hangi araç gerekir?",
            "choices": [
              "Pergel",
              "İletki (Açıölçer)",
              "Sadece cetvel"
            ],
            "ans": "Pergel"
          },
          {
            "q": "Bir kenar uzunluğu bilinen eşkenar üçgen tek olarak çizilebilir mi?",
            "choices": [
              "Evet (Tüm kenarlar eşit ve açılar 60°)",
              "Hayır",
              "Bilinmez"
            ],
            "ans": "Evet (Tüm kenarlar eşit ve açılar 60°)"
          },
          {
            "q": "İki kenarı ve bu kenarların arasında OLMAYAN bir açısı verilen üçgen kesin olarak tek çizilir mi?",
            "choices": [
              "Evet",
              "Hayır (KKA belirsizdir)",
              "Her zaman"
            ],
            "ans": "Hayır (KKA belirsizdir)"
          }
        ],
        "id": 20,
        "kazanimId": "k4"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Kazanım Kontrol: Üçgen Çizim Koşulu",
        "subtitle": "Kazanım 4'ü yeşile çevirmek için bu soruyu çöz!",
        "stem": "Aşağıda elemanları verilen ABC üçgenlerinden hangisi <strong>tek (belirli) bir üçgen olarak çizilemez</strong>?",
        "options": [
          {
            "letter": "A",
            "text": "|AB|=6 cm, |BC|=8 cm, |AC|=10 cm"
          },
          {
            "letter": "B",
            "text": "|AB|=5 cm, |AC|=7 cm, m(A)=50°"
          },
          {
            "letter": "C",
            "text": "m(A)=60°, m(B)=60°, m(C)=60°"
          },
          {
            "letter": "D",
            "text": "m(A)=45°, m(C)=75°, |AC|=8 cm"
          }
        ],
        "correctLetter": "C",
        "hint": "Sadece üç açısı (60°, 60°, 60°) verilen üçgende kenar uzunluğu belli olmadığı için sonsuz büyüklükte eşkenar üçgen çizilebilir!",
        "solution": "C şıkkında yalnızca <strong>üç iç açı</strong> verilmiş, hiçbir kenar uzunluğu verilmemiştir; bu nedenle tek bir üçgen çizilemez (sonsuz sayıda benzer üçgen çizilir).",
        "id": 21,
        "kazanimId": "k4"
      },
      {
        "type": "concept",
        "icon": "💡",
        "typeLabel": "Örnek & Keşif",
        "title": "Dik Kenarların Kareleri Toplamı = Hipotenüsün Karesi!",
        "subtitle": "LGS'nin altın dik üçgenleri: (3-4-5) ve katları (6-8-10, 9-12-15, 12-16-20), (5-12-13), (8-15-17) ve (7-24-25)!",
        "explanation": [
          "Bir dik üçgende dik kenarlar <strong>a</strong> ve <strong>b</strong>, 90°'nin karşısındaki hipotenüs <strong>c</strong> ise: <strong>a² + b² = c²</strong>.",
          "Örneğin dik kenarları <strong>6 cm ve 8 cm</strong> olan dik üçgende 6² + 8² = 36 + 64 = 100 = 10² olduğundan hipotenüs <strong>10 cm</strong>'dir!"
        ],
        "sentenceHtml": "Dik kenarları 5 cm ve 12 cm olan bir dik üçgenin hipotenüsü {0} cm'dir. Dik kenarları 8 cm ve 15 cm olan dik üçgenin hipotenüsü ise {1} cm olur.",
        "blanks": [
          {
            "id": 0,
            "correct": "13",
            "choices": [
              "13",
              "15",
              "17"
            ]
          },
          {
            "id": 1,
            "correct": "17",
            "choices": [
              "16",
              "17",
              "19"
            ]
          }
        ],
        "primeStripDemo": [
          "3 - 4 - 5",
          "6 - 8 - 10",
          "9 - 12 - 15",
          "5 - 12 - 13",
          "8 - 15 - 17",
          "7 - 24 - 25"
        ],
        "id": 22,
        "kazanimId": "k5"
      },
      {
        "type": "video",
        "icon": "🎬",
        "typeLabel": "Animasyonlu Anlatım",
        "title": "Koordinat Düzleminde İki Nokta Arası En Kısa Uzaklık",
        "subtitle": "Eğik duran bir doğru parçasının uzunluğunu hemen bir dik üçgenin hipotenüsü yaparak buluruz!",
        "videoScene": "custom_steps",
        "steps": [
          {
            "text": "1. Adım: İki nokta arasındaki yatay farkı (a) ve dikey farkı (b) sayarak dik üçgeni tamamlarız.",
            "draw": "s1"
          },
          {
            "text": "2. Adım: Örneğin yatayda 9 birim, dikeyde 12 birim fark varsa 9-12-15 özel üçgeninden en kısa mesafe 15 birim olur!",
            "draw": "s2"
          },
          {
            "text": "3. Adım: Dik kenarları a ve a olan ikizkenar dik üçgenin hipotenüsü ise daima a√2'dir!",
            "draw": "s3"
          }
        ],
        "quickQuestion": "Dik kenarları 4 cm ve 8 cm olan bir dik üçgenin hipotenüs uzunluğu kaç cm'dir?",
        "quickChoices": [
          "4√3 cm",
          "4√5 cm",
          "12 cm"
        ],
        "quickCorrect": "4√5 cm",
        "id": 23,
        "kazanimId": "k5"
      },
      {
        "type": "activity",
        "icon": "🧩",
        "typeLabel": "Etkileşimli Etkinlik",
        "title": "Özel Dik Üçgenleri Tamamla",
        "subtitle": "Verilen dik üçgenlerdeki eksik kenar uzunluğunu özel üçgen kurallarıyla bul!",
        "activityMode": "rainbow_pairs",
        "targetNumber": 0,
        "sequence": [
          "Dik kenarlar 9 ve 12 ⇒ Hipotenüs=?",
          "Hipotenüs 26, dik kenar 10 ⇒ Diğeri=?",
          "Hipotenüs 25, dik kenar 7 ⇒ Diğeri=?"
        ],
        "missingTargets": [
          {
            "index": 0,
            "answer": 15,
            "hint": "3-4-5 üçgeninin 3 katı: 9-12-15."
          },
          {
            "index": 1,
            "answer": 24,
            "hint": "5-12-13 üçgeninin 2 katı: 10-24-26."
          },
          {
            "index": 2,
            "answer": 24,
            "hint": "7-24-25 özel dik üçgeni."
          }
        ],
        "pool": [
          13,
          15,
          17,
          20,
          24,
          25
        ],
        "id": 24,
        "kazanimId": "k5"
      },
      {
        "type": "game",
        "icon": "🎮",
        "typeLabel": "HTML5 Mini Oyun",
        "title": "Oyun: Pisagor Ustası",
        "subtitle": "Dik üçgenlerdeki bilinmeyen kenarları hızlıca hesapla!",
        "gameType": "final_marathon",
        "challenges": [
          {
            "q": "Bir kenarı 6 cm olan karenin köşegen uzunluğu kaç cm'dir?",
            "choices": [
              "6√2",
              "6√3",
              "12"
            ],
            "ans": "6√2"
          },
          {
            "q": "Kısa kenarı 8 cm, uzun kenarı 15 cm olan dikdörtgenin köşegeni kaç cm'dir?",
            "choices": [
              "17 cm",
              "19 cm",
              "23 cm"
            ],
            "ans": "17 cm"
          },
          {
            "q": "İkizkenar üçgende yan kenarlar 10 cm, taban 12 cm ise yükseklik kaç cm'dir?",
            "choices": [
              "6 cm",
              "8 cm",
              "9 cm"
            ],
            "ans": "8 cm"
          }
        ],
        "id": 25,
        "kazanimId": "k5"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Kazanım Kontrol: Merdiven ve Duvar",
        "subtitle": "Kazanım 5'i yeşile çevirmek için bu soruyu çöz!",
        "stem": "Uzunluğu <strong>13 metre</strong> olan bir merdivenin alt ucu duvardan <strong>5 metre</strong> uzağa konulduğunda üst ucu duvarın tam tepesine değmektedir. Buna göre duvarın yüksekliği kaç metredir?",
        "options": [
          {
            "letter": "A",
            "text": "8 m"
          },
          {
            "letter": "B",
            "text": "10 m"
          },
          {
            "letter": "C",
            "text": "12 m"
          },
          {
            "letter": "D",
            "text": "14 m"
          }
        ],
        "correctLetter": "C",
        "hint": "5 - ? - 13 özel dik üçgenini hatırla (5² + h² = 13²)!",
        "solution": "Duvar ile zemin dik kesiştiğinden 5 - 12 - 13 özel dik üçgeni oluşur: h² + 5² = 13² ⇒ h² = 169 − 25 = 144 ⇒ <strong>h = 12 metre</strong>.",
        "id": 26,
        "kazanimId": "k5"
      },
      {
        "type": "activity",
        "icon": "🧩",
        "typeLabel": "Etkileşimli Etkinlik",
        "title": "Adım Adım LGS Kurgusu: Kırılan Ağaç",
        "subtitle": "Boyu 18 metre olan bir ağaç yerden 5 metre yükseklikten kırılıp tepe ucu yere değiyor!",
        "activityMode": "rainbow_pairs",
        "targetNumber": 0,
        "sequence": [
          "Dik kalan kısım=? m",
          "Eğik kırılan kısım (18−5)=? m",
          "Uç noktanın gövdeye uzaklığı=? m"
        ],
        "missingTargets": [
          {
            "index": 0,
            "answer": 5,
            "hint": "Yerden 5 m yüksekten kırıldı."
          },
          {
            "index": 1,
            "answer": 13,
            "hint": "18 − 5 = 13 metre hipotenüs olur."
          },
          {
            "index": 2,
            "answer": 12,
            "hint": "5-12-13 üçgeninden yatay uzaklık 12 metredir."
          }
        ],
        "pool": [
          5,
          8,
          10,
          12,
          13,
          15
        ],
        "id": 27,
        "kazanimId": "k6"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "LGS Yeni Nesil 1: Kaydırılan Merdiven",
        "subtitle": "Merdivenin kendi boyu (hipotenüs) kaydırılsa da değişmez!",
        "stem": "Boyu <strong>25 dm</strong> olan bir merdiven yerden <strong>24 dm</strong> yüksekliğe dayalı iken, merdivenin üst ucu duvar boyunca <strong>4 dm aşağı</strong> kaydırılıyor. Merdivenin alt ucu duvardan kaç dm daha uzaklaşır?",
        "options": [
          {
            "letter": "A",
            "text": "4 dm"
          },
          {
            "letter": "B",
            "text": "7 dm"
          },
          {
            "letter": "C",
            "text": "8 dm"
          },
          {
            "letter": "D",
            "text": "15 dm"
          }
        ],
        "correctLetter": "C",
        "hint": "İlk durum: 7-24-25 (alt uç 7 dm uzakta). İkinci durum: yükseklik 24−4=20 dm olur ⇒ 15-20-25 (alt uç 15 dm uzakta)!",
        "solution": "İlk durumda 7-24-25 üçgeninden alt uç duvardan <strong>7 dm</strong> uzaktadır. Üst uç 4 dm inince yükseklik 20 dm olur; 15-20-25 (3-4-5'in 5 katı) üçgeninden alt uç <strong>15 dm</strong> uzağa gelir. Kayma miktarı = 15 − 7 = <strong>8 dm</strong>.",
        "id": 28,
        "kazanimId": "k6"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "LGS Yeni Nesil 2: Merdiven Basamaklarında En Kısa Kırmızı Halı/Kablo",
        "subtitle": "Basamaklı şekillerde A ile B arasındaki en kısa doğrusal uzaklık için toplam yatay ve toplam dikey alınır!",
        "stem": "Her birinin yüksekliği <strong>30 cm</strong> ve genişliği <strong>40 cm</strong> olan <strong>3 eş basamaklı</strong> bir merdivenin en alt köşesi A ile en üst köşesi B arasına gergin bir ip çekiliyor. İpin uzunluğu kaç cm'dir?",
        "options": [
          {
            "letter": "A",
            "text": "120 cm"
          },
          {
            "letter": "B",
            "text": "150 cm"
          },
          {
            "letter": "C",
            "text": "180 cm"
          },
          {
            "letter": "D",
            "text": "210 cm"
          }
        ],
        "correctLetter": "B",
        "hint": "Toplam dikey = 3 × 30 = 90 cm. Toplam yatay = 3 × 40 = 120 cm. 90-120-150 üçgeni!",
        "solution": "Toplam dikey yükseklik = 3 × 30 = <strong>90 cm</strong>, toplam yatay uzunluk = 3 × 40 = <strong>120 cm</strong>'dir. 9-12-15 üçgeninin 10 katından |AB| = <strong>150 cm</strong> bulunur.",
        "id": 29,
        "kazanimId": "k6"
      },
      {
        "type": "game",
        "icon": "🏆",
        "typeLabel": "Final Maratonu",
        "title": "Final: Üçgenler Şampiyonluk Etabı",
        "subtitle": "Son 3 görevi tamamla ve 9. Üniteyi tamamen YEŞİLE döndür!",
        "gameType": "final_marathon",
        "challenges": [
          {
            "q": "Dik kenarları 9 cm ve 12 cm olan dik üçgenin hipotenüsü kaç cm'dir?",
            "choices": [
              "15 cm",
              "17 cm",
              "21 cm"
            ],
            "ans": "15 cm"
          },
          {
            "q": "İki kenarı 4 cm ve 9 cm olan üçgenin üçüncü kenarı hangisi olamaz?",
            "choices": [
              "5 cm",
              "6 cm",
              "12 cm"
            ],
            "ans": "5 cm"
          },
          {
            "q": "Dik üçgende en uzun kenar her zaman hangisidir?",
            "choices": [
              "Hipotenüs",
              "Kenarortay",
              "Yükseklik"
            ],
            "ans": "Hipotenüs"
          }
        ],
        "id": 30,
        "kazanimId": "k6"
      }
    ]
  },
  {
    "id": "m8-u10-eslik-benzerlik",
    "grade": 8,
    "unitNo": 10,
    "title": "Eşlik ve Benzerlik",
    "subtitle": "Eş Çokgenler (≅), Benzer Çokgenler (~), Benzerlik Oranı (k), Çevre (k) ve Alan (k²)",
    "coverImage": "assets/flow/u10_eslik_benzerlik.jpg",
    "badgeCells": [
      "≅",
      "~",
      "k=1",
      "k",
      "k²",
      "AA",
      "KKK",
      "KAK",
      "📐",
      "🔍",
      "🔺",
      "LGS"
    ],
    "kazanimlar": [
      {
        "id": "k1",
        "no": 1,
        "title": "Eş Çokgenler ve Eşlik Kuralları (≅)",
        "code": "M.8.3.3.1",
        "visual": "assets/flow/u10_eslik_benzerlik.jpg",
        "stops": [
          1,
          2,
          3,
          4,
          5
        ]
      },
      {
        "id": "k2",
        "no": 2,
        "title": "Benzer Çokgenler (~) ve Benzerlik Oranı (k)",
        "code": "M.8.3.3.1",
        "visual": "assets/flow/u10_eslik_benzerlik.jpg",
        "stops": [
          6,
          7,
          8,
          9,
          10
        ]
      },
      {
        "id": "k3",
        "no": 3,
        "title": "Paralel Doğrularla Oluşan Benzer Üçgenler (Temel Orantı & Kelebek)",
        "code": "M.8.3.3.1",
        "visual": "assets/flow/u10_eslik_benzerlik.jpg",
        "stops": [
          11,
          12,
          13,
          14,
          15,
          16
        ]
      },
      {
        "id": "k4",
        "no": 4,
        "title": "Açı-Açı (AA) Benzerliği ve Dik Üçgenler",
        "code": "M.8.3.3.1",
        "visual": "assets/flow/u10_eslik_benzerlik.jpg",
        "stops": [
          17,
          18,
          19,
          20,
          21
        ]
      },
      {
        "id": "k5",
        "no": 5,
        "title": "Çevrelerin Oranı (k) ve Alanların Oranı (k²)",
        "code": "M.8.3.3.2",
        "visual": "assets/flow/u10_eslik_benzerlik.jpg",
        "stops": [
          22,
          23,
          24,
          25,
          26
        ]
      },
      {
        "id": "k6",
        "no": 6,
        "title": "LGS Ölçek, Ayna ve Gölge Görevleri",
        "code": "M.8.3.3.2",
        "visual": "assets/flow/u10_eslik_benzerlik.jpg",
        "stops": [
          27,
          28,
          29,
          30
        ]
      }
    ],
    "stops": [
      {
        "type": "concept",
        "icon": "💡",
        "typeLabel": "Örnek & Keşif",
        "title": "Karşılıklı Açıları ve Karşılıklı Kenarları Birebir Eşit Şekiller!",
        "subtitle": "İki şekil hem biçim hem büyüklük olarak tıpatıp aynıysa EŞTİR (≅) ve benzerlik oranları k = 1'dir!",
        "explanation": [
          "<strong>ABC ≅ DEF</strong> yazımında <strong>harf sırası hayati önem taşır!</strong><br>• m(A) = m(D), m(B) = m(E), m(C) = m(F)<br>• |AB| = |DE|, |BC| = |EF| ve |AC| = |DF| olur.",
          "Eş iki çokgenin çevreleri, alanları ve karşılıklı yardımcı elemanları birbirine eşittir."
        ],
        "sentenceHtml": "ABC ≅ KLM eşliğinde |AB| kenarı {0} kenarına, C açısının ölçüsü ise {1} açısının ölçüsüne eşittir.",
        "blanks": [
          {
            "id": 0,
            "correct": "|KL|",
            "choices": [
              "|KL|",
              "|LM|",
              "|KM|"
            ]
          },
          {
            "id": 1,
            "correct": "M",
            "choices": [
              "K",
              "L",
              "M"
            ]
          }
        ],
        "id": 1,
        "kazanimId": "k1"
      },
      {
        "type": "activity",
        "icon": "🧩",
        "typeLabel": "Etkileşimli Etkinlik",
        "title": "Harf Sırasından Eş Kenarları Bul",
        "subtitle": "ABC ≅ PRS olan iki eş üçgende |AB|=7 cm, |BC|=9 cm, |AC|=12 cm ise PRS üçgeninin kenarlarını bul!",
        "activityMode": "rainbow_pairs",
        "targetNumber": 0,
        "sequence": [
          "|PR| = ? cm",
          "|RS| = ? cm",
          "|PS| = ? cm"
        ],
        "missingTargets": [
          {
            "index": 0,
            "answer": 7,
            "hint": "İlk iki harf: |PR| = |AB| = 7 cm"
          },
          {
            "index": 1,
            "answer": 9,
            "hint": "Son iki harf: |RS| = |BC| = 9 cm"
          },
          {
            "index": 2,
            "answer": 12,
            "hint": "Birinci ve üçüncü harf: |PS| = |AC| = 12 cm"
          }
        ],
        "pool": [
          5,
          7,
          8,
          9,
          12,
          16
        ],
        "id": 2,
        "kazanimId": "k1"
      },
      {
        "type": "video",
        "icon": "🎬",
        "typeLabel": "Animasyonlu Anlatım",
        "title": "Eş Üçgenlerde Eş Açının Karşısında Eş Kenar Bulunur!",
        "subtitle": "Döndürülmüş veya ters çevrilmiş eş üçgenlerde hangi kenarın hangisine eşit olduğunu nasıl anlarız?",
        "videoScene": "custom_steps",
        "steps": [
          {
            "text": "1. Adım: Eşlik sembolündeki harf sırasına bakarız (ABC ≅ DEF).",
            "draw": "s1"
          },
          {
            "text": "2. Adım: Şekil üzerinde eşit açılar nokta veya çizgi ile işaretlenmişse, eşit açıların gördüğü kenarları birbirine eşitleriz!",
            "draw": "s2"
          },
          {
            "text": "3. Adım: Eş şekillerin benzerlik oranı her zaman k = 1'dir.",
            "draw": "s3"
          }
        ],
        "quickQuestion": "ABC ≅ DEF ve m(A)=50°, m(E)=70° olduğuna göre m(C) kaç derecedir?",
        "quickChoices": [
          "50°",
          "60°",
          "70°"
        ],
        "quickCorrect": "60°",
        "id": 3,
        "kazanimId": "k1"
      },
      {
        "type": "game",
        "icon": "🎮",
        "typeLabel": "HTML5 Mini Oyun",
        "title": "Oyun: Eşlik Dedektifi",
        "subtitle": "Eş çokgenlerin kenar ve açılarını eşleştir!",
        "gameType": "final_marathon",
        "challenges": [
          {
            "q": "Eş iki çokgenin benzerlik oranı kaçtır?",
            "choices": [
              "0",
              "1",
              "2"
            ],
            "ans": "1"
          },
          {
            "q": "KLM ≅ TYZ ve |LM| = 11 cm ise hangi kenar kesinlikle 11 cm'dir?",
            "choices": [
              "|TY|",
              "|YZ|",
              "|TZ|"
            ],
            "ans": "|YZ|"
          },
          {
            "q": "Hangileri her zaman birbirine eştir?",
            "choices": [
              "Yarıçapları eşit iki çember",
              "Tüm kareler",
              "Tüm eşkenar üçgenler"
            ],
            "ans": "Yarıçapları eşit iki çember"
          }
        ],
        "id": 4,
        "kazanimId": "k1"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Kazanım Kontrol: Eş Üçgenlerde Denklem",
        "subtitle": "Kazanım 1'i yeşile çevirmek için bu soruyu çöz!",
        "stem": "<strong>ABC ≅ DEF</strong> olmak üzere <strong>|BC| = (3x − 4) cm</strong> ve <strong>|EF| = (x + 8) cm</strong>'dir. Buna göre <strong>|BC|</strong> uzunluğu kaç cm'dir?",
        "options": [
          {
            "letter": "A",
            "text": "6 cm"
          },
          {
            "letter": "B",
            "text": "12 cm"
          },
          {
            "letter": "C",
            "text": "14 cm"
          },
          {
            "letter": "D",
            "text": "16 cm"
          }
        ],
        "correctLetter": "C",
        "hint": "Son iki harfler eşit olduğundan |BC| = |EF| ⇒ 3x − 4 = x + 8 ⇒ x = 6. Sonra |BC| değerini hesapla!",
        "solution": "|BC| = |EF| ⇒ 3x − 4 = x + 8 ⇒ 2x = 12 ⇒ <strong>x = 6</strong> bulunur. Buradan |BC| = 3(6) − 4 = <strong>14 cm</strong>'dir.",
        "id": 5,
        "kazanimId": "k1"
      },
      {
        "type": "concept",
        "icon": "💡",
        "typeLabel": "Örnek & Keşif",
        "title": "Açılar DEĞİŞMEZ, Kenarlar Aynı Oranda (k) Büyür veya Küçülür!",
        "subtitle": "Bir fotoğrafı yakınlaştırdığımızda (zoom) açılar aynı kalır, kenarlar k katına çıkar!",
        "explanation": [
          "İki çokgenin <strong>benzer (~)</strong> olması için karşılıklı açıları <strong>birebir eşit</strong>, karşılıklı kenarlarının uzunlukları ise <strong>orantılı (k)</strong> olmalıdır!",
          "<strong>Tüm kareler</strong> birbirine benzerdir; <strong>tüm eşkenar üçgenler</strong> birbirine benzerdir; <strong>tüm daireler</strong> birbirine benzerdir (Ancak tüm dikdörtgenler benzer değildir!)."
        ],
        "sentenceHtml": "Benzer iki üçgende karşılıklı açılar birbirine {0}, karşılıklı kenar uzunlukları ise {1} olur.",
        "blanks": [
          {
            "id": 0,
            "correct": "eşittir",
            "choices": [
              "orantılıdır",
              "eşittir",
              "farklıdır"
            ]
          },
          {
            "id": 1,
            "correct": "orantılı",
            "choices": [
              "eşit",
              "orantılı",
              "dik"
            ]
          }
        ],
        "id": 6,
        "kazanimId": "k2"
      },
      {
        "type": "activity",
        "icon": "🧩",
        "typeLabel": "Etkileşimli Sınıflama",
        "title": "Daima Benzer mi, Her Zaman Benzer Değil mi?",
        "subtitle": "Hangi geometrik şekil çiftlerinin her zaman benzer olduğuna karar ver!",
        "activityMode": "custom_sort",
        "sortChoices": [
          "Daima Benzerdir",
          "Her Zaman Benzer Değildir"
        ],
        "items": [
          {
            "text": "Herhangi iki kare (Açılar 90° ve kenarlar orantılı)",
            "answer": "Daima Benzerdir"
          },
          {
            "text": "Herhangi iki dikdörtgen (Biri ince uzun, biri kareye yakın olabilir)",
            "answer": "Her Zaman Benzer Değildir"
          },
          {
            "text": "Herhangi iki eşkenar üçgen (Açılar 60° ve kenarlar orantılı)",
            "answer": "Daima Benzerdir"
          },
          {
            "text": "Herhangi iki ikizkenar üçgen (Tepe açıları farklı olabilir)",
            "answer": "Her Zaman Benzer Değildir"
          }
        ],
        "id": 7,
        "kazanimId": "k2"
      },
      {
        "type": "game",
        "icon": "🎮",
        "typeLabel": "HTML5 Mini Oyun",
        "title": "Oyun: Benzerlik Oranı (k) Bulucu",
        "subtitle": "Benzer şekillerde oran kurarak bilinmeyen kenarı bul!",
        "gameType": "final_marathon",
        "challenges": [
          {
            "q": "Kısa kenarları 4 cm ve 12 cm olan benzer iki dikdörtgenin benzerlik oranı kaçtır?",
            "choices": [
              "1/2",
              "1/3",
              "1/4"
            ],
            "ans": "1/3"
          },
          {
            "q": "ABC ~ DEF ve benzerlik oranı 2/5'tir. |AB|=6 cm ise |DE| kaç cm'dir?",
            "choices": [
              "10 cm",
              "12 cm",
              "15 cm"
            ],
            "ans": "15 cm"
          },
          {
            "q": "Benzer iki üçgende büyük üçgenin kenarları 3 katına çıkarsa iç açıları kaç katına çıkar?",
            "choices": [
              "Değişmez (1 kat)",
              "3 kat",
              "9 kat"
            ],
            "ans": "Değişmez (1 kat)"
          }
        ],
        "id": 8,
        "kazanimId": "k2"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Benzer Dikdörtgenler",
        "subtitle": "Kısa kenarın kısa kenara oranı = Uzun kenarın uzun kenara oranı!",
        "stem": "Birbirine benzer olan iki dikdörtgenden küçüğünün kenarları <strong>6 cm ve 9 cm</strong>'dir. Büyük dikdörtgenin kısa kenarı <strong>10 cm</strong> olduğuna göre uzun kenarı kaç cm'dir?",
        "options": [
          {
            "letter": "A",
            "text": "12 cm"
          },
          {
            "letter": "B",
            "text": "15 cm"
          },
          {
            "letter": "C",
            "text": "16 cm"
          },
          {
            "letter": "D",
            "text": "18 cm"
          }
        ],
        "correctLetter": "B",
        "hint": "Kısa / Kısa = Uzun / Uzun ⇒ 6 / 10 = 9 / x denklemini çöz!",
        "solution": "Orantı: 6 / 10 = 9 / x ⇒ 6x = 90 ⇒ <strong>x = 15 cm</strong> bulunur.",
        "id": 9,
        "kazanimId": "k2"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Kazanım Kontrol: Harf Sırasıyla Orantı",
        "subtitle": "Kazanım 2'yi yeşile çevirmek için bu soruyu çöz!",
        "stem": "<strong>ABC ~ KLM</strong> olmak üzere <strong>|AB|=8 cm, |BC|=12 cm</strong> ve <strong>|KL|=6 cm</strong>'dir. Buna göre <strong>|LM|</strong> kaç cm'dir?",
        "options": [
          {
            "letter": "A",
            "text": "8 cm"
          },
          {
            "letter": "B",
            "text": "9 cm"
          },
          {
            "letter": "C",
            "text": "10 cm"
          },
          {
            "letter": "D",
            "text": "16 cm"
          }
        ],
        "correctLetter": "B",
        "hint": "|AB| / |KL| = |BC| / |LM| ⇒ 8 / 6 = 12 / |LM|!",
        "solution": "Harf sırasına göre: |AB| / |KL| = |BC| / |LM| ⇒ 8 / 6 = 12 / x ⇒ 8x = 72 ⇒ <strong>|LM| = 9 cm</strong> bulunur.",
        "id": 10,
        "kazanimId": "k2"
      },
      {
        "type": "concept",
        "icon": "💡",
        "typeLabel": "Örnek & Keşif",
        "title": "Temel Benzerlik: Küçük Kenar / Tüm Kenar = Küçük Taban / Büyük Taban!",
        "subtitle": "[DE] // [BC] olduğunda üstteki küçük ADE üçgeni ile büyük ABC üçgeni benzerdir (ADE ~ ABC)!",
        "explanation": [
          "<strong>Çok Önemli Uyarı:</strong> Tabanların oranını yazarken yan kenarların <strong>parça/parça oranını DEĞİL</strong>, <strong>Üst Kenar / TÜM Kenar</strong> oranını alırız: <strong>|AD| / |AB| = |DE| / |BC|</strong>!",
          "<strong>Kelebek (Kum Saati) Modelinde</strong> ise paralel tabanların oranı, çapraz kanatların oranına doğrudan eşittir."
        ],
        "sentenceHtml": "ABC üçgeninde [DE] // [BC] ve |AD|=3 cm, |DB|=6 cm ise tüm sol kenar |AB| = {0} cm olur ve tabanlar oranı |DE| / |BC| = 3/9 = {1} bulunur.",
        "blanks": [
          {
            "id": 0,
            "correct": "9",
            "choices": [
              "3",
              "6",
              "9"
            ]
          },
          {
            "id": 1,
            "correct": "1/3",
            "choices": [
              "1/2",
              "1/3",
              "2/3"
            ]
          }
        ],
        "id": 11,
        "kazanimId": "k3"
      },
      {
        "type": "video",
        "icon": "🎬",
        "typeLabel": "Animasyonlu Anlatım",
        "title": "Temel Benzerlik ve Kelebek Modeli Uygulaması",
        "subtitle": "LGS'de gölge boyu ve ayna sorularının temelini oluşturan iki modeli karşılaştıralım.",
        "videoScene": "custom_steps",
        "steps": [
          {
            "text": "1. Model (Üçgen İçi Paralel): Üst parça 4, alt parça 8 ise tüm kenar 4 + 8 = 12'dir. Oran 4/8 değil, 4/12 = 1/3'tür!",
            "draw": "s1"
          },
          {
            "text": "2. Model (Kelebek/Kum Saati): Üst taban 5, alt taban 10 ise benzerlik oranı 5/10 = 1/2'dir.",
            "draw": "s2"
          },
          {
            "text": "3. İpucu: Paralel iki doğru arasında Z kuralından iç ters açılar eşittir!",
            "draw": "s3"
          }
        ],
        "quickQuestion": "ABC üçgeninde [DE]//[BC], D noktası [AB]'nin tam orta noktası (|AD|=|DB|) ve |DE|=7 cm ise |BC| tabanı kaç cm'dir?",
        "quickChoices": [
          "7 cm",
          "14 cm",
          "21 cm"
        ],
        "quickCorrect": "14 cm",
        "id": 12,
        "kazanimId": "k3"
      },
      {
        "type": "activity",
        "icon": "🧩",
        "typeLabel": "Etkileşimli Etkinlik",
        "title": "Paralel Tabanları Hesapla",
        "subtitle": "[DE] // [BC] olan üçgende |AD|=4 cm, |DB|=8 cm ve |DE|=5 cm ise eksikleri bul!",
        "activityMode": "rainbow_pairs",
        "targetNumber": 0,
        "sequence": [
          "Tüm kenar |AB| = ? cm",
          "Benzerlik oranı = 1/?",
          "Alt taban |BC| = ? cm"
        ],
        "missingTargets": [
          {
            "index": 0,
            "answer": 12,
            "hint": "|AB| = 4 + 8 = 12 cm"
          },
          {
            "index": 1,
            "answer": 3,
            "hint": "4 / 12 = 1 / 3"
          },
          {
            "index": 2,
            "answer": 15,
            "hint": "5 × 3 = 15 cm"
          }
        ],
        "pool": [
          2,
          3,
          10,
          12,
          15,
          20
        ],
        "id": 13,
        "kazanimId": "k3"
      },
      {
        "type": "game",
        "icon": "🎮",
        "typeLabel": "HTML5 Mini Oyun",
        "title": "Oyun: Paralel Orantı Ustası",
        "subtitle": "Temel benzerlik ve kelebek sorularını çöz!",
        "gameType": "final_marathon",
        "challenges": [
          {
            "q": "[DE]//[BC], |AD|=2, |DB|=3 ve |DE|=6 cm ise |BC| kaç cm'dir?",
            "choices": [
              "9 cm",
              "12 cm",
              "15 cm"
            ],
            "ans": "15 cm"
          },
          {
            "q": "Kelebek modelinde paralel üst taban 6 cm, alt taban 9 cm ve üst kanat 4 cm ise alt kanat kaç cm'dir?",
            "choices": [
              "6 cm",
              "8 cm",
              "9 cm"
            ],
            "ans": "6 cm"
          },
          {
            "q": "Bir üçgenin kenarlarının orta noktalarını birleştiren orta taban, alt tabanın kaçta kaçıdır?",
            "choices": [
              "1/2",
              "1/3",
              "1/4"
            ],
            "ans": "1/2"
          }
        ],
        "id": 14,
        "kazanimId": "k3"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Kelebek Modeli Sorusu",
        "subtitle": "[AB] // [CD] kelebek modelinde paralel kenarların oranını yan kanatlara eşitle.",
        "stem": "[AB] // [CD] olan bir kelebek (kum saati) şeklinde <strong>|AB| = 8 cm, |CD| = 12 cm</strong> ve kesişim noktası E için <strong>|AE| = 6 cm</strong>'dir. Buna göre devamındaki <strong>|ED|</strong> uzunluğu kaç cm'dir?",
        "options": [
          {
            "letter": "A",
            "text": "8 cm"
          },
          {
            "letter": "B",
            "text": "9 cm"
          },
          {
            "letter": "C",
            "text": "10 cm"
          },
          {
            "letter": "D",
            "text": "12 cm"
          }
        ],
        "correctLetter": "B",
        "hint": "|AB| / |CD| = |AE| / |ED| ⇒ 8 / 12 = 6 / |ED|!",
        "solution": "Kelebek benzerliğinden: 8 / 12 = 6 / |ED| ⇒ 8 · |ED| = 72 ⇒ <strong>|ED| = 9 cm</strong> bulunur.",
        "id": 15,
        "kazanimId": "k3"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Kazanım Kontrol: Temel Benzerlik",
        "subtitle": "Kazanım 3'ü yeşile çevirmek için bu soruyu çöz!",
        "stem": "ABC üçgeninde [DE] // [BC], <strong>|AD| = 6 cm, |DB| = 4 cm</strong> ve <strong>|BC| = 20 cm</strong> olduğuna göre <strong>|DE|</strong> uzunluğu kaç cm'dir?",
        "options": [
          {
            "letter": "A",
            "text": "8 cm"
          },
          {
            "letter": "B",
            "text": "10 cm"
          },
          {
            "letter": "C",
            "text": "12 cm"
          },
          {
            "letter": "D",
            "text": "15 cm"
          }
        ],
        "correctLetter": "C",
        "hint": "Dikkat: Tüm kenar |AB| = 6 + 4 = 10 cm! |AD| / |AB| = |DE| / |BC| ⇒ 6 / 10 = |DE| / 20.",
        "solution": "|AB| = 6 + 4 = 10 cm'dir. Temel benzerlikten: 6 / 10 = |DE| / 20 ⇒ <strong>|DE| = 12 cm</strong> bulunur.",
        "id": 16,
        "kazanimId": "k3"
      },
      {
        "type": "video",
        "icon": "🎬",
        "typeLabel": "Animasyonlu Anlatım",
        "title": "İç İçe Dik Üçgenlerde α - β - 90° Kodlaması",
        "subtitle": "Ortak köşeli dik üçgenlerde eşit açıları harflendirerek benzerliği kurma.",
        "videoScene": "custom_steps",
        "steps": [
          {
            "text": "1. Adım: Ortak dar açıya α (alfa), 90°'ye tamamlayan diğer dar açıya β (beta) yazılır (α + β = 90°).",
            "draw": "s1"
          },
          {
            "text": "2. Adım: Büyük dik üçgende de 90° ve α bulunduğu için üçüncü köşe otomatik olarak β olur!",
            "draw": "s2"
          },
          {
            "text": "3. Adım: Küçük üçgende α'nın karşısı / Büyük üçgende α'nın karşısı oranı kurularak bilinmeyen kenar bulunur!",
            "draw": "s3"
          }
        ],
        "quickQuestion": "Benzer iki dik üçgende küçüğün dik kenarları 6 cm ve 8 cm, büyüğün hipotenüsü 20 cm ise benzerlik oranı kaçtır?",
        "quickChoices": [
          "1 / 2",
          "1 / 3",
          "2 / 3"
        ],
        "quickCorrect": "1 / 2",
        "id": 17,
        "kazanimId": "k4"
      },
      {
        "type": "concept",
        "icon": "💡",
        "typeLabel": "Örnek & Keşif",
        "title": "İç Açılarından İkisi Eşit Olan Üçgenler Kesinlikle Benzerdir (AA)!",
        "subtitle": "İki üçgenin ikişer açısı eşitse üçüncü açıları da (180° tamamlayanı) otomatik olarak eşittir!",
        "explanation": [
          "İç içe geçmiş dik üçgenlerde <strong>90°'lik açı</strong> ve bir <strong>ortak dar açı (α)</strong> varsa üçüncü açılar (β) da eşittir (<strong>α + β = 90°</strong>).",
          "Orantı kurulurken: <strong>1. üçgende α'nın karşısı / 2. üçgende α'nın karşısı = 1. üçgende 90°'nin karşısı / 2. üçgende 90°'nin karşısı</strong> yazılır!"
        ],
        "sentenceHtml": "İki üçgenin ikişer iç açısı birbirine eşitse bu üçgenler {0} benzerlik kuralına göre benzerdir. Dik üçgende dar açıların toplamı {1} derecedir.",
        "blanks": [
          {
            "id": 0,
            "correct": "Açı-Açı (AA)",
            "choices": [
              "Kenar-Kenar",
              "Açı-Açı (AA)",
              "Yükseklik"
            ]
          },
          {
            "id": 1,
            "correct": "90",
            "choices": [
              "60",
              "90",
              "180"
            ]
          }
        ],
        "id": 18,
        "kazanimId": "k4"
      },
      {
        "type": "activity",
        "icon": "🧩",
        "typeLabel": "Etkileşimli Etkinlik",
        "title": "Açıların Karşısındaki Kenarları Oranla",
        "subtitle": "Benzer iki dik üçgende küçüğün kenarları 3-4-5, büyüğün en kısa dik kenarı 9 cm ise eksikleri bul!",
        "activityMode": "rainbow_pairs",
        "targetNumber": 0,
        "sequence": [
          "Benzerlik oranı (9/3)=?",
          "Büyüğün diğer dik kenarı=?",
          "Büyüğün hipotenüsü=?"
        ],
        "missingTargets": [
          {
            "index": 0,
            "answer": 3,
            "hint": "9 ÷ 3 = 3 kat"
          },
          {
            "index": 1,
            "answer": 12,
            "hint": "4 × 3 = 12 cm"
          },
          {
            "index": 2,
            "answer": 15,
            "hint": "5 × 3 = 15 cm"
          }
        ],
        "pool": [
          3,
          4,
          9,
          12,
          15,
          20
        ],
        "id": 19,
        "kazanimId": "k4"
      },
      {
        "type": "game",
        "icon": "🎮",
        "typeLabel": "HTML5 Mini Oyun",
        "title": "Oyun: Açı-Açı Eşleştirici",
        "subtitle": "Dik üçgenlerdeki benzerlik oranlarını bul!",
        "gameType": "final_marathon",
        "challenges": [
          {
            "q": "Bir dik üçgende dar açılardan biri 35° ise diğeri kaç derecedir?",
            "choices": [
              "45°",
              "55°",
              "65°"
            ],
            "ans": "55°"
          },
          {
            "q": "Benzerlik oranı 3/4 olan iki dik üçgenden küçüğün hipotenüsü 15 cm ise büyüğün hipotenüsü kaç cm'dir?",
            "choices": [
              "18 cm",
              "20 cm",
              "24 cm"
            ],
            "ans": "20 cm"
          },
          {
            "q": "Zemine dik duran 1,5 m boyundaki çocuğun gölgesi 2 m iken, aynı anda gölgesi 8 m olan ağacın boyu kaç m'dir?",
            "choices": [
              "5 m",
              "6 m",
              "10 m"
            ],
            "ans": "6 m"
          }
        ],
        "id": 20,
        "kazanimId": "k4"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Kazanım Kontrol: Gölge Boyu ve Benzerlik",
        "subtitle": "Kazanım 4'ü yeşile çevirmek için bu soruyu çöz!",
        "stem": "Güneşli bir günde <strong>180 cm</strong> boyundaki bir kişinin gölge uzunluğu <strong>120 cm</strong> olarak ölçülüyor. Aynı anda yanındaki bir bayrak direğinin gölge uzunluğu <strong>6 metre</strong> olduğuna göre bayrak direğinin boyu kaç metredir?",
        "options": [
          {
            "letter": "A",
            "text": "4 m"
          },
          {
            "letter": "B",
            "text": "8 m"
          },
          {
            "letter": "C",
            "text": "9 m"
          },
          {
            "letter": "D",
            "text": "12 m"
          }
        ],
        "correctLetter": "C",
        "hint": "Boy / Gölge = 180 / 120 = 3 / 2 oranını bayrak direğine uygula: Boy / 6 = 3 / 2!",
        "solution": "Boy / Gölge oranı = 180 / 120 = <strong>3 / 2</strong>'dir. Direğin boyu / 6 = 3 / 2 ⇒ Direğin boyu = <strong>9 metre</strong> bulunur.",
        "id": 21,
        "kazanimId": "k4"
      },
      {
        "type": "concept",
        "icon": "💡",
        "typeLabel": "Örnek & Keşif",
        "title": "Çevrelerin Oranı = k | Alanların Oranı = k²!",
        "subtitle": "LGS'de en çok sorulan kural: Benzer iki çokgenin çevrelerinin oranı benzerlik oranına (k), ALANLARININ oranı ise benzerlik oranının KARESİNE (k²) eşittir!",
        "explanation": [
          "Örneğin benzerlik oranı <strong>k = 2 / 3</strong> olan iki üçgenin:<br>• Karşılıklı kenarları, yükseklikleri ve <strong>çevrelerinin oranı = 2 / 3</strong>'tür.",
          "• <strong>Alanlarının oranı ise k² = (2 / 3)² = 4 / 9</strong> olur!"
        ],
        "sentenceHtml": "Benzerlik oranı 1/4 olan iki karenin çevrelerinin oranı {0}, alanlarının oranı ise (1/4)² = {1} olur.",
        "blanks": [
          {
            "id": 0,
            "correct": "1/4",
            "choices": [
              "1/2",
              "1/4",
              "1/16"
            ]
          },
          {
            "id": 1,
            "correct": "1/16",
            "choices": [
              "1/4",
              "1/8",
              "1/16"
            ]
          }
        ],
        "id": 22,
        "kazanimId": "k5"
      },
      {
        "type": "video",
        "icon": "🎬",
        "typeLabel": "Animasyonlu Anlatım",
        "title": "Alan Oranından Çevre Oranına Geçiş (Karekök Alma)",
        "subtitle": "Alanları oranı verildiğinde benzerlik oranını (k) bulmak için karekök alırız!",
        "videoScene": "custom_steps",
        "steps": [
          {
            "text": "1. Adım: Benzer iki şeklin alanları oranı 9 / 25 olarak verilmiş olsun.",
            "draw": "s1"
          },
          {
            "text": "2. Adım: k² = 9 / 25 olduğundan her iki tarafın karekökünü alırız: k = √(9/25) = 3 / 5!",
            "draw": "s2"
          },
          {
            "text": "3. Adım: Böylece çevrelerinin oranı ve karşılıklı kenarlarının oranı 3 / 5 olarak bulunur!",
            "draw": "s3"
          }
        ],
        "quickQuestion": "Alanları oranı 16 / 49 olan benzer iki çokgenin çevreleri oranı kaçtır?",
        "quickChoices": [
          "4 / 7",
          "8 / 24",
          "16 / 49"
        ],
        "quickCorrect": "4 / 7",
        "id": 23,
        "kazanimId": "k5"
      },
      {
        "type": "activity",
        "icon": "🧩",
        "typeLabel": "Etkileşimli Etkinlik",
        "title": "k, Çevre Oranı ve Alan Oranı (k²) Tablosu",
        "subtitle": "Benzerlik oranı k = 3 / 5 olan iki çokgen için eksikleri tamamla!",
        "activityMode": "rainbow_pairs",
        "targetNumber": 0,
        "sequence": [
          "Yükseklikler oranı=3/?",
          "Çevreler oranı=3/?",
          "Alanlar oranı (k²)=9/?"
        ],
        "missingTargets": [
          {
            "index": 0,
            "answer": 5,
            "hint": "Yükseklikler oranı k = 3/5'tir."
          },
          {
            "index": 1,
            "answer": 5,
            "hint": "Çevreler oranı k = 3/5'tir."
          },
          {
            "index": 2,
            "answer": 25,
            "hint": "Alanlar oranı (3/5)² = 9/25'tir."
          }
        ],
        "pool": [
          5,
          9,
          10,
          15,
          25,
          30
        ],
        "id": 24,
        "kazanimId": "k5"
      },
      {
        "type": "game",
        "icon": "🎮",
        "typeLabel": "HTML5 Mini Oyun",
        "title": "Oyun: Çevre (k) ve Alan (k²) Ustası",
        "subtitle": "Benzerlik oranı ile çevre ve alan arasındaki geçişleri yap!",
        "gameType": "final_marathon",
        "challenges": [
          {
            "q": "Benzerlik oranı 2 olan iki üçgenden küçüğün alanı 10 cm² ise büyüğün alanı kaç cm²'dir?",
            "choices": [
              "20 cm²",
              "40 cm²",
              "80 cm²"
            ],
            "ans": "40 cm²"
          },
          {
            "q": "Benzer iki çokgenin çevreleri oranı 1/3 ise alanları oranı kaçtır?",
            "choices": [
              "1/3",
              "1/6",
              "1/9"
            ],
            "ans": "1/9"
          },
          {
            "q": "Kenarları 2 katına çıkarılan bir karenin alanı kaç katına çıkar?",
            "choices": [
              "2 katına",
              "4 katına",
              "8 katına"
            ],
            "ans": "4 katına"
          }
        ],
        "id": 25,
        "kazanimId": "k5"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Kazanım Kontrol: Benzer Üçgenlerde Alan",
        "subtitle": "Kazanım 5'i yeşile çevirmek için bu soruyu çöz!",
        "stem": "Benzer iki üçgenin benzerlik oranı <strong>2 / 5</strong>'tir. Küçük üçgenin alanı <strong>12 cm²</strong> olduğuna göre büyük üçgenin alanı kaç cm²'dir?",
        "options": [
          {
            "letter": "A",
            "text": "30 cm²"
          },
          {
            "letter": "B",
            "text": "60 cm²"
          },
          {
            "letter": "C",
            "text": "75 cm²"
          },
          {
            "letter": "D",
            "text": "100 cm²"
          }
        ],
        "correctLetter": "C",
        "hint": "Alanlar oranı k² = (2/5)² = 4 / 25. 4 kat = 12 cm² (3 katı) ise 25 × 3 hesapla!",
        "solution": "Alanlar oranı = (2 / 5)² = <strong>4 / 25</strong>'tir. 12 / Alan(Büyük) = 4 / 25 ⇒ Alan(Büyük) = 25 × 3 = <strong>75 cm²</strong> bulunur.",
        "id": 26,
        "kazanimId": "k5"
      },
      {
        "type": "activity",
        "icon": "🧩",
        "typeLabel": "Etkileşimli Etkinlik",
        "title": "Adım Adım LGS Kurgusu: Kroki ve Gerçek Alan",
        "subtitle": "Benzerlik oranı (ölçeği) 1 / 100 olan bir ev krokisinde salonun kısa kenarı 4 cm, uzun kenarı 5 cm'dir!",
        "activityMode": "rainbow_pairs",
        "targetNumber": 0,
        "sequence": [
          "Gerçek kısa kenar=? m",
          "Gerçek uzun kenar=? m",
          "Gerçek salon alanı=? m²"
        ],
        "missingTargets": [
          {
            "index": 0,
            "answer": 4,
            "hint": "4 × 100 = 400 cm = 4 metre"
          },
          {
            "index": 1,
            "answer": 5,
            "hint": "5 × 100 = 500 cm = 5 metre"
          },
          {
            "index": 2,
            "answer": 20,
            "hint": "4 m × 5 m = 20 m²"
          }
        ],
        "pool": [
          4,
          5,
          9,
          20,
          40,
          200
        ],
        "id": 27,
        "kazanimId": "k6"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "LGS Yeni Nesil 1: Yerdeki Ayna ile Ağaç Boyu Ölçme",
        "subtitle": "Aynaya geliş ve yansıma açıları eşit olduğu için iki dik üçgen AA benzeridir!",
        "stem": "Boyu <strong>1,6 m</strong> olan Elif, yerdeki düz aynaya <strong>2 m</strong> uzaklıktan baktığında aynaya <strong>10 m</strong> uzaklıktaki çam ağacının en üst noktasını görüyor. Buna göre çam ağacının boyu kaç metredir?",
        "options": [
          {
            "letter": "A",
            "text": "6 m"
          },
          {
            "letter": "B",
            "text": "8 m"
          },
          {
            "letter": "C",
            "text": "10 m"
          },
          {
            "letter": "D",
            "text": "12 m"
          }
        ],
        "correctLetter": "B",
        "hint": "Elif'in aynaya uzaklığı (2 m) / Ağacın aynaya uzaklığı (10 m) = 1 / 5. Elif'in boyunu 5 ile çarp!",
        "solution": "Benzerlik oranı 2 / 10 = <strong>1 / 5</strong>'tir. Ağacın boyu = 1,6 × 5 = <strong>8 metre</strong> bulunur.",
        "id": 28,
        "kazanimId": "k6"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "LGS Yeni Nesil 2: Sokak Lambası ve Gölge Boyu",
        "subtitle": "Temel benzerlik modelinde (Çocuk / Lamba = Gölge / Tüm Taban).",
        "stem": "Yüksekliği <strong>4,5 metre</strong> olan bir sokak lambasının direğinden <strong>4 metre</strong> uzakta duran <strong>1,5 metre</strong> boyundaki bir çocuğun gölgesinin uzunluğu kaç metredir?",
        "options": [
          {
            "letter": "A",
            "text": "1,5 m"
          },
          {
            "letter": "B",
            "text": "2 m"
          },
          {
            "letter": "C",
            "text": "2,5 m"
          },
          {
            "letter": "D",
            "text": "3 m"
          }
        ],
        "correctLetter": "B",
        "hint": "Gölgeye x dersek: x / (x + 4) = 1,5 / 4,5 = 1 / 3 ⇒ 3x = x + 4!",
        "solution": "Gölge uzunluğu x olsun. Temel benzerlikten: x / (x + 4) = 1,5 / 4,5 = 1 / 3 ⇒ 3x = x + 4 ⇒ 2x = 4 ⇒ <strong>x = 2 metre</strong> bulunur.",
        "id": 29,
        "kazanimId": "k6"
      },
      {
        "type": "game",
        "icon": "🏆",
        "typeLabel": "Final Maratonu",
        "title": "Final: Eşlik ve Benzerlik Şampiyonluk Etabı",
        "subtitle": "Son 3 görevi tamamla ve 10. Üniteyi tamamen YEŞİLE döndür!",
        "gameType": "final_marathon",
        "challenges": [
          {
            "q": "Benzerlik oranı 3/4 olan iki çokgenin alanları oranı kaçtır?",
            "choices": [
              "3/4",
              "6/8",
              "9/16"
            ],
            "ans": "9/16"
          },
          {
            "q": "Alanları oranı 1/25 olan benzer iki üçgenin çevreleri oranı kaçtır?",
            "choices": [
              "1/5",
              "1/10",
              "1/25"
            ],
            "ans": "1/5"
          },
          {
            "q": "Eş iki çokgen için hangisi yanlıştır?",
            "choices": [
              "Alanları eşittir",
              "Çevreleri eşittir",
              "Benzerlik oranı 2'dir"
            ],
            "ans": "Benzerlik oranı 2'dir"
          }
        ],
        "id": 30,
        "kazanimId": "k6"
      }
    ]
  },
  {
    "id": "m8-u11-donusum-geometrisi",
    "grade": 8,
    "unitNo": 11,
    "title": "Dönüşüm Geometrisi",
    "subtitle": "Öteleme, Koordinat Değişimi, Eksenlere Göre Yansıma (Simetri) ve Ardışık Dönüşümler",
    "coverImage": "assets/flow/u11_donusum_geometrisi.jpg",
    "badgeCells": [
      "x+a",
      "y+b",
      "(x,−y)",
      "(−x,y)",
      "🪞",
      "➡️",
      "⬆️",
      "🔄",
      "A'",
      "B'",
      "📐",
      "LGS"
    ],
    "kazanimlar": [
      {
        "id": "k1",
        "no": 1,
        "title": "Noktanın ve Çokgenin Ötelenmesi",
        "code": "M.8.3.2.1",
        "visual": "assets/flow/u11_donusum_geometrisi.jpg",
        "stops": [
          1,
          2,
          3,
          4,
          5
        ]
      },
      {
        "id": "k2",
        "no": 2,
        "title": "Koordinat Düzleminde Öteleme: (x ± a, y ± b)",
        "code": "M.8.3.2.1",
        "visual": "assets/flow/u11_donusum_geometrisi.jpg",
        "stops": [
          6,
          7,
          8,
          9,
          10
        ]
      },
      {
        "id": "k3",
        "no": 3,
        "title": "Doğruya Göre Yansıma (Simetri) ve Ayna Görüntüsü",
        "code": "M.8.3.2.2",
        "visual": "assets/flow/u11_donusum_geometrisi.jpg",
        "stops": [
          11,
          12,
          13,
          14,
          15,
          16
        ]
      },
      {
        "id": "k4",
        "no": 4,
        "title": "Eksenlere Göre Yansıma: X Ekseninde (x, −y), Y Ekseninde (−x, y)",
        "code": "M.8.3.2.2",
        "visual": "assets/flow/u11_donusum_geometrisi.jpg",
        "stops": [
          17,
          18,
          19,
          20,
          21,
          22
        ]
      },
      {
        "id": "k5",
        "no": 5,
        "title": "Ardışık Öteleme ve Yansıma Hareketleri",
        "code": "M.8.3.2.3",
        "visual": "assets/flow/u11_donusum_geometrisi.jpg",
        "stops": [
          23,
          24,
          25,
          26
        ]
      },
      {
        "id": "k6",
        "no": 6,
        "title": "LGS Dönüşüm ve Koordinat Hedef Görevleri",
        "code": "M.8.3.2.3",
        "visual": "assets/flow/u11_donusum_geometrisi.jpg",
        "stops": [
          27,
          28,
          29,
          30
        ]
      }
    ],
    "stops": [
      {
        "type": "video",
        "icon": "🎬",
        "typeLabel": "Animasyonlu Anlatım",
        "title": "Çokgenin Köşe Noktalarını Öteleyerek Görüntü Çizme",
        "subtitle": "Bir çokgeni ötelemek için tüm kenarları değil, köşe noktalarını taşımak yeterlidir!",
        "videoScene": "custom_steps",
        "steps": [
          {
            "text": "1. Adım: Çokgenin A, B, C köşelerinin her biri verilen yönde (örneğin 5 sağa, 3 aşağı) tek tek taşınır.",
            "draw": "s1"
          },
          {
            "text": "2. Adım: Elde edilen A', B', C' noktaları birleştirildiğinde ötelenmiş eş üçgen ortaya çıkar.",
            "draw": "s2"
          },
          {
            "text": "3. Adım: A ile B arasındaki mesafe ne ise A' ile B' arasındaki mesafe de birebir aynıdır!",
            "draw": "s3"
          }
        ],
        "quickQuestion": "Öteleme hareketinde şeklin aşağıdaki özelliklerinden hangisi değişir?",
        "quickChoices": [
          "Büyüklüğü (Alanı)",
          "Duruş yönü",
          "Düzlemdeki yeri (Konumu)"
        ],
        "quickCorrect": "Düzlemdeki yeri (Konumu)",
        "id": 1,
        "kazanimId": "k1"
      },
      {
        "type": "concept",
        "icon": "💡",
        "typeLabel": "Örnek & Keşif",
        "title": "Ötelemede Şeklin Boyutu, Biçimi ve Duruş Yönü DEĞİŞMEZ!",
        "subtitle": "Bir şekli kaydırarak (sağa, sola, yukarı, aşağı) başka bir konuma taşımaya ÖTELEME denir.",
        "explanation": [
          "Öteleme sonucunda oluşan görüntü başlangıçtaki şekille <strong>birebir eştir (≅)</strong>; şeklin duruş yönü bile değişmez, sadece konumu değişir!",
          "Bir çokgeni ötelemek için <strong>köşe noktalarından birini</strong> öteleyip şekli yeniden çizmek yeterlidir."
        ],
        "sentenceHtml": "Bir şeklin sağa, sola, yukarı veya aşağı kaydırılmasına {0} denir. Öteleme sonucunda şeklin boyutu ve duruşu {1}.",
        "blanks": [
          {
            "id": 0,
            "correct": "öteleme",
            "choices": [
              "yansıma",
              "öteleme",
              "benzerlik"
            ]
          },
          {
            "id": 1,
            "correct": "değişmez",
            "choices": [
              "büyür",
              "ters döner",
              "değişmez"
            ]
          }
        ],
        "id": 2,
        "kazanimId": "k1"
      },
      {
        "type": "activity",
        "icon": "🧩",
        "typeLabel": "Etkileşimli Etkinlik",
        "title": "Birim Kareli Zeminde Öteleme",
        "subtitle": "Köşesi kareli zeminde bulunan şekil önce 4 birim sağa, sonra 3 birim sağa daha ötelenirse eksikleri bul!",
        "activityMode": "rainbow_pairs",
        "targetNumber": 0,
        "sequence": [
          "Toplam sağa öteleme=? br",
          "En kısa mesafe (3 sağ, 4 yukarı)=? br",
          "Şeklin alanı değişir mi (0=Hayır)=?"
        ],
        "missingTargets": [
          {
            "index": 0,
            "answer": 7,
            "hint": "4 + 3 = 7 birim sağa ötelenmiş olur."
          },
          {
            "index": 1,
            "answer": 5,
            "hint": "3-4-5 dik üçgeninden A ile A' arası 5 birimdir."
          },
          {
            "index": 2,
            "answer": 0,
            "hint": "Ötelemede alan asla değişmez (0)."
          }
        ],
        "pool": [
          0,
          1,
          5,
          7,
          9,
          12
        ],
        "id": 3,
        "kazanimId": "k1"
      },
      {
        "type": "game",
        "icon": "🎮",
        "typeLabel": "HTML5 Mini Oyun",
        "title": "Oyun: Öteleme Pusulası",
        "subtitle": "Öteleme hareketlerinin özelliklerini doğru seç!",
        "gameType": "final_marathon",
        "challenges": [
          {
            "q": "Öteleme hareketinde aşağıdakilerden hangisi değişir?",
            "choices": [
              "Kenar uzunlukları",
              "İç açılar",
              "Köşe koordinatları"
            ],
            "ans": "Köşe koordinatları"
          },
          {
            "q": "Bir nokta 6 birim sağa, sonra 2 birim sola ötelenirse net hareket nedir?",
            "choices": [
              "4 birim sağa",
              "8 birim sağa",
              "4 birim sola"
            ],
            "ans": "4 birim sağa"
          },
          {
            "q": "Ötelenen bir üçgen ile görüntüsü arasındaki benzerlik oranı kaçtır?",
            "choices": [
              "1/2",
              "1",
              "2"
            ],
            "ans": "1"
          }
        ],
        "id": 4,
        "kazanimId": "k1"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Kazanım Kontrol: Öteleme ve Pisagor",
        "subtitle": "Kazanım 1'i yeşile çevirmek için bu soruyu çöz!",
        "stem": "Birim kareli zeminde bir <strong>A</strong> noktası <strong>6 birim sağa</strong> ve <strong>8 birim yukarı</strong> ötelenerek <strong>A'</strong> noktası elde ediliyor. Buna göre A ile A' noktaları arasındaki en kısa uzaklık kaç birimdir?",
        "options": [
          {
            "letter": "A",
            "text": "10 birim"
          },
          {
            "letter": "B",
            "text": "12 birim"
          },
          {
            "letter": "C",
            "text": "14 birim"
          },
          {
            "letter": "D",
            "text": "48 birim"
          }
        ],
        "correctLetter": "A",
        "hint": "Yatayda 6 birim, dikeyde 8 birim ⇒ 6-8-10 özel dik üçgeni!",
        "solution": "Yatay hareket 6 birim, dikey hareket 8 birim olduğundan Pisagor bağıntısından (6-8-10 üçgeni) |AA'| = <strong>10 birim</strong> bulunur.",
        "id": 5,
        "kazanimId": "k1"
      },
      {
        "type": "concept",
        "icon": "💡",
        "typeLabel": "Örnek & Keşif",
        "title": "Sağa/Sola Hareket x'i (Apsisi), Yukarı/Aşağı Hareket y'yi (Ordinatı) Değiştirir!",
        "subtitle": "• a birim SAĞA ⇒ x + a | a birim SOLA ⇒ x − a\n• b birim YUKARI ⇒ y + b | b birim AŞAĞI ⇒ y − b",
        "explanation": [
          "Örneğin <strong>A(−2, 5)</strong> noktası <strong>6 birim sağa</strong> ve <strong>3 birim aşağı</strong> ötelenirse:<br>Yeni koordinat: <strong>A'(−2 + 6, 5 − 3) = A'(4, 2)</strong> olur.",
          "x ekseni boyunca ötelemede sadece x değişir; y ekseni boyunca ötelemede sadece y değişir!"
        ],
        "sentenceHtml": "K(3, −4) noktası 5 birim sola (3−5) ve 6 birim yukarı (−4+6) ötelendiğinde yeni koordinatı {0} olur. x ekseni boyunca sağa ötelemede {1} koordinatı artar.",
        "blanks": [
          {
            "id": 0,
            "correct": "(−2, 2)",
            "choices": [
              "(8, 2)",
              "(−2, 2)",
              "(−2, −10)"
            ]
          },
          {
            "id": 1,
            "correct": "apsis (x)",
            "choices": [
              "apsis (x)",
              "ordinat (y)",
              "her ikisi"
            ]
          }
        ],
        "id": 6,
        "kazanimId": "k2"
      },
      {
        "type": "video",
        "icon": "🎬",
        "typeLabel": "Animasyonlu Anlatım",
        "title": "İlk Noktadan Görüntüye, Görüntüden İlk Noktaya Geçiş",
        "subtitle": "Bazen öteleme sonrasındaki görüntü (A') verilip başlangıçtaki A noktası sorulur (Ters işlem yapılır!).",
        "videoScene": "custom_steps",
        "steps": [
          {
            "text": "1. Durum: A(1, −3) noktası 4 birim sağa, 5 birim yukarı ötelenirse A'(1+4, −3+5) = A'(5, 2) olur.",
            "draw": "s1"
          },
          {
            "text": "2. Durum (Tersten): Ötelenmiş hali A'(5, 2) ise başlangıçtaki A'yı bulmak için ters işlem (4 sola, 5 aşağı) yaparız!",
            "draw": "s2"
          },
          {
            "text": "3. Kural: A' − A farkı bize doğrudan öteleme vektörünü verir!",
            "draw": "s3"
          }
        ],
        "quickQuestion": "M(−5, 2) noktası x ekseni boyunca 7 birim sağa ötelenirse yeni koordinatı ne olur?",
        "quickChoices": [
          "(2, 2)",
          "(−5, 9)",
          "(−12, 2)"
        ],
        "quickCorrect": "(2, 2)",
        "id": 7,
        "kazanimId": "k2"
      },
      {
        "type": "activity",
        "icon": "🧩",
        "typeLabel": "Etkileşimli Etkinlik",
        "title": "Koordinat Öteleme Hesaplayıcı",
        "subtitle": "P(−4, 6) noktası 9 birim sağa ve 8 birim aşağı ötelenerek P'(x, y) elde ediliyor!",
        "activityMode": "rainbow_pairs",
        "targetNumber": 0,
        "sequence": [
          "Yeni apsis x = ?",
          "Yeni ordinat y = ?",
          "x + y toplamı = ?"
        ],
        "missingTargets": [
          {
            "index": 0,
            "answer": 5,
            "hint": "−4 + 9 = 5"
          },
          {
            "index": 1,
            "answer": -2,
            "hint": "6 − 8 = −2"
          },
          {
            "index": 2,
            "answer": 3,
            "hint": "5 + (−2) = 3"
          }
        ],
        "pool": [
          -2,
          2,
          3,
          5,
          7,
          13
        ],
        "id": 8,
        "kazanimId": "k2"
      },
      {
        "type": "game",
        "icon": "🎮",
        "typeLabel": "HTML5 Mini Oyun",
        "title": "Oyun: Koordinat Taşıyıcı",
        "subtitle": "Ötelenen noktaların yeni koordinatlarını bul!",
        "gameType": "final_marathon",
        "challenges": [
          {
            "q": "A(4, −1) noktası hangi ötelemeyle orijine (0,0) gelir?",
            "choices": [
              "4 sola, 1 yukarı",
              "4 sağa, 1 aşağı",
              "1 sola, 4 yukarı"
            ],
            "ans": "4 sola, 1 yukarı"
          },
          {
            "q": "B(−3, −2) noktası 5 birim yukarı ötelenirse hangi bölgeye geçer?",
            "choices": [
              "I. Bölge",
              "II. Bölge",
              "IV. Bölge"
            ],
            "ans": "II. Bölge"
          },
          {
            "q": "3 birim sola, 4 birim aşağı ötelenmiş hali (2, −5) olan noktanın ilk hali nedir?",
            "choices": [
              "(5, −1)",
              "(−1, −9)",
              "(5, −9)"
            ],
            "ans": "(5, −1)"
          }
        ],
        "id": 9,
        "kazanimId": "k2"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Kazanım Kontrol: Üçgen Köşesinin Ötelenmesi",
        "subtitle": "Kazanım 2'yi yeşile çevirmek için bu soruyu çöz!",
        "stem": "Köşelerinden biri <strong>A(−6, 3)</strong> olan ABC üçgeni, <strong>4 birim sağa</strong> ve <strong>5 birim aşağı</strong> ötelendiğinde A' köşesinin koordinatları aşağıdakilerden hangisi olur?",
        "options": [
          {
            "letter": "A",
            "text": "(−2, −2)"
          },
          {
            "letter": "B",
            "text": "(−10, −2)"
          },
          {
            "letter": "C",
            "text": "(−2, 8)"
          },
          {
            "letter": "D",
            "text": "(2, −2)"
          }
        ],
        "correctLetter": "A",
        "hint": "x' = −6 + 4 = −2 ve y' = 3 − 5 = −2!",
        "solution": "4 birim sağa ⇒ x' = −6 + 4 = <strong>−2</strong>; 5 birim aşağı ⇒ y' = 3 − 5 = <strong>−2</strong>. A'(−2, −2) bulunur.",
        "id": 10,
        "kazanimId": "k2"
      },
      {
        "type": "video",
        "icon": "🎬",
        "typeLabel": "Animasyonlu Anlatım",
        "title": "Doğruya Göre Simetride Diklik ve Eşit Uzaklık",
        "subtitle": "Ayna doğrusuna yakın olan nokta görüntüde de aynaya yakın, uzak olan nokta uzak olur!",
        "videoScene": "custom_steps",
        "steps": [
          {
            "text": "1. Kural: Bir A noktasından simetri doğrusuna dik (90°) inilir; bu mesafe kadar karşı tarafa gidilerek A' bulunur.",
            "draw": "s1"
          },
          {
            "text": "2. Kural: Şeklin aynaya bakan ucu görüntüde de aynaya bakar (Sağ-sol veya üst-alt yönü ters döner!).",
            "draw": "s2"
          },
          {
            "text": "3. Kural: Simetri doğrusu üzerinde bulunan noktaların görüntüsü yine kendi üzerindedir!",
            "draw": "s3"
          }
        ],
        "quickQuestion": "Simetri doğrusuna 9 cm uzaklıktaki bir K noktasının görüntüsü K' ile arasındaki uzaklık kaç cm'dir?",
        "quickChoices": [
          "9 cm",
          "18 cm",
          "27 cm"
        ],
        "quickCorrect": "18 cm",
        "id": 11,
        "kazanimId": "k3"
      },
      {
        "type": "activity",
        "icon": "🧩",
        "typeLabel": "Etkileşimli Etkinlik",
        "title": "Ayna Mesafesi Hesaplayıcı",
        "subtitle": "Aynaya 15 cm uzaklıktaki cisim ve görüntüsü için eksikleri bul!",
        "activityMode": "rainbow_pairs",
        "targetNumber": 0,
        "sequence": [
          "Görüntünün aynaya uzaklığı=? cm",
          "Cisim ile görüntü arası=? cm",
          "Cisim 5 cm yaklaşırsa yeni ara=? cm"
        ],
        "missingTargets": [
          {
            "index": 0,
            "answer": 15,
            "hint": "Görüntü de aynadan 15 cm uzaktadır."
          },
          {
            "index": 1,
            "answer": 30,
            "hint": "15 + 15 = 30 cm"
          },
          {
            "index": 2,
            "answer": 20,
            "hint": "10 + 10 = 20 cm"
          }
        ],
        "pool": [
          10,
          15,
          20,
          25,
          30,
          40
        ],
        "id": 12,
        "kazanimId": "k3"
      },
      {
        "type": "concept",
        "icon": "💡",
        "typeLabel": "Örnek & Keşif",
        "title": "Noktanın Aynaya Uzaklığı = Görüntünün Aynaya Uzaklığı!",
        "subtitle": "Yansımada (simetride) şeklin boyutu değişmez ama DURUŞ YÖNÜ TERS DÖNER (Sağ el sol el gibi görünür)!",
        "explanation": [
          "Bir şeklin bir <strong>d (simetri) doğrusuna</strong> göre yansımasında her nokta ayna doğrusuna <strong>dik olarak eşit uzaklıktaki</strong> karşı noktaya eşlenir.",
          "Dijital rakamlarda (2 ↔ 5) ve harflerde (b ↔ d veya p ↔ q) aynaya yakın olan uç görüntüde de aynaya yakın olur!"
        ],
        "sentenceHtml": "Yansıma hareketinde noktaların simetri doğrusuna olan dik uzaklıkları {0} kalır; ancak şeklin yönü {1} döner.",
        "blanks": [
          {
            "id": 0,
            "correct": "eşit",
            "choices": [
              "farklı",
              "eşit",
              "yarıya"
            ]
          },
          {
            "id": 1,
            "correct": "ters",
            "choices": [
              "aynı",
              "ters",
              "dik"
            ]
          }
        ],
        "id": 13,
        "kazanimId": "k3"
      },
      {
        "type": "activity",
        "icon": "🧩",
        "typeLabel": "Etkileşimli Sınıflama",
        "title": "Öteleme mi, Yansıma (Simetri) mı?",
        "subtitle": "Verilen günlük hayat ve geometri durumlarını dönüşüm türüne göre ayır!",
        "activityMode": "custom_sort",
        "sortChoices": [
          "Yansıma (Simetri)",
          "Öteleme"
        ],
        "items": [
          {
            "text": "Göl kıyısındaki dağların durgun sudaki görüntüsü",
            "answer": "Yansıma (Simetri)"
          },
          {
            "text": "Ray üzerinde düz ilerleyen tren vagonunun hareketi",
            "answer": "Öteleme"
          },
          {
            "text": "Kelebeğin sağ ve sol kanatlarının gövdeye göre duruşu",
            "answer": "Yansıma (Simetri)"
          },
          {
            "text": "Asansör kabininin 1. kattan 5. kata çıkması",
            "answer": "Öteleme"
          }
        ],
        "id": 14,
        "kazanimId": "k3"
      },
      {
        "type": "game",
        "icon": "🎮",
        "typeLabel": "HTML5 Mini Oyun",
        "title": "Oyun: Ayna Ustası",
        "subtitle": "Yansıma uzaklıklarını ve görüntü özelliklerini bul!",
        "gameType": "final_marathon",
        "challenges": [
          {
            "q": "A noktasının simetri doğrusuna uzaklığı 7 birim ise A ile görüntüsü A' arasındaki uzaklık kaç birimdir?",
            "choices": [
              "7 birim",
              "14 birim",
              "21 birim"
            ],
            "ans": "14 birim"
          },
          {
            "q": "Simetri doğrusunun tam üzerinde bulunan bir noktanın yansıması nerededir?",
            "choices": [
              "Aynı noktada (Kendi üzerinde)",
              "Orijinde",
              "Sonsuzda"
            ],
            "ans": "Aynı noktada (Kendi üzerinde)"
          },
          {
            "q": "Dikey aynada [ 2 ] dijital rakamının yansıması hangi rakam gibi görünür?",
            "choices": [
              "2",
              "5",
              "8"
            ],
            "ans": "5"
          }
        ],
        "id": 15,
        "kazanimId": "k3"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Kazanım Kontrol: Aynadaki Uzaklık",
        "subtitle": "Kazanım 3'ü yeşile çevirmek için bu soruyu çöz!",
        "stem": "Bir düzlem aynaya <strong>120 cm</strong> uzaklıkta duran Mert, aynaya doğru <strong>30 cm yaklaşıyor</strong>. Son durumda Mert ile aynadaki görüntüsü arasındaki mesafe kaç cm olur?",
        "options": [
          {
            "letter": "A",
            "text": "90 cm"
          },
          {
            "letter": "B",
            "text": "150 cm"
          },
          {
            "letter": "C",
            "text": "180 cm"
          },
          {
            "letter": "D",
            "text": "240 cm"
          }
        ],
        "correctLetter": "C",
        "hint": "Mert 30 cm yaklaşınca aynaya uzaklığı 120 − 30 = 90 cm olur. Görüntüsü de aynanın 90 cm arkasındadır!",
        "solution": "Mert'in aynaya yeni uzaklığı 120 − 30 = <strong>90 cm</strong>'dir. Görüntünün aynaya uzaklığı da 90 cm olduğundan aralarındaki toplam mesafe = 90 + 90 = <strong>180 cm</strong> olur.",
        "id": 16,
        "kazanimId": "k3"
      },
      {
        "type": "concept",
        "icon": "💡",
        "typeLabel": "Örnek & Keşif",
        "title": "ALTIN KURAL: Hangi Eksene Göre Yansırsa O Eksendeki Koordinat AYNI KALIR, Diğeri İşaret Değiştirir!",
        "subtitle": "• X eksenine göre yansıma: (x, y) → (x, −y) [x sabit, y işaret değiştirir!]\n• Y eksenine göre yansıma: (x, y) → (−x, y) [y sabit, x işaret değiştirir!]\n• Orijine göre yansıma: (x, y) → (−x, −y) [İkisi de işaret değiştirir!]",
        "explanation": [
          "Örneğin <strong>A(3, −5)</strong> noktasının:<br>• <strong>x eksenine</strong> göre yansıması: <strong>(3, +5)</strong><br>• <strong>y eksenine</strong> göre yansıması: <strong>(−3, −5)</strong><br>• <strong>Orijine</strong> göre yansıması: <strong>(−3, +5)</strong>.",
          "Bu kuralı 'Hangi eksense o harf korunur!' şeklinde kodlarsan asla karıştırmazsın."
        ],
        "sentenceHtml": "A(4, 7) noktasının x eksenine göre yansıması {0}, y eksenine göre yansıması ise {1} noktasıdır.",
        "blanks": [
          {
            "id": 0,
            "correct": "(4, −7)",
            "choices": [
              "(−4, 7)",
              "(4, −7)",
              "(−4, −7)"
            ]
          },
          {
            "id": 1,
            "correct": "(−4, 7)",
            "choices": [
              "(−4, 7)",
              "(4, −7)",
              "(7, 4)"
            ]
          }
        ],
        "id": 17,
        "kazanimId": "k4"
      },
      {
        "type": "video",
        "icon": "🎬",
        "typeLabel": "Animasyonlu Anlatım",
        "title": "X ve Y Ekseni Yansımalarında Bölge Değişimi",
        "subtitle": "Koordinat düzleminde yansıma yapıldığında nokta hangi bölgeye geçer?",
        "videoScene": "custom_steps",
        "steps": [
          {
            "text": "1. Adım: I. bölgedeki (+, +) bir nokta x eksenine göre yansırsa aşağıya IV. bölgeye (+, −) geçer.",
            "draw": "s1"
          },
          {
            "text": "2. Adım: Aynı nokta y eksenine göre yansırsa sola II. bölgeye (−, +) geçer.",
            "draw": "s2"
          },
          {
            "text": "3. Adım: Bir nokta hem x hem y eksenine göre ardışık yansıtılırsa orijine göre yansımış olur ve (−, −) III. bölgeye geçer!",
            "draw": "s3"
          }
        ],
        "quickQuestion": "K(−6, 4) noktasının y eksenine göre yansıması olan nokta hangisidir?",
        "quickChoices": [
          "(6, 4)",
          "(−6, −4)",
          "(6, −4)"
        ],
        "quickCorrect": "(6, 4)",
        "id": 18,
        "kazanimId": "k4"
      },
      {
        "type": "activity",
        "icon": "🧩",
        "typeLabel": "Etkileşimli Etkinlik",
        "title": "Yansıma Koordinat Tablosu",
        "subtitle": "B(−5, −8) noktasının yansımalarındaki eksik koordinatları bul!",
        "activityMode": "rainbow_pairs",
        "targetNumber": 0,
        "sequence": [
          "x eksenine göre=(−5, ?)",
          "y eksenine göre=(?, −8)",
          "Orijine göre=(5, ?)"
        ],
        "missingTargets": [
          {
            "index": 0,
            "answer": 8,
            "hint": "x eksenine göre y işaret değiştirir: +8."
          },
          {
            "index": 1,
            "answer": 5,
            "hint": "y eksenine göre x işaret değiştirir: +5."
          },
          {
            "index": 2,
            "answer": 8,
            "hint": "Orijine göre ikisi de işaret değiştirir: (5, 8)."
          }
        ],
        "pool": [
          -8,
          -5,
          5,
          8,
          0,
          13
        ],
        "id": 19,
        "kazanimId": "k4"
      },
      {
        "type": "game",
        "icon": "🎮",
        "typeLabel": "HTML5 Mini Oyun",
        "title": "Oyun: Eksen Yansıtıcı",
        "subtitle": "Eksenlere göre yansıma koordinatlarını hızlıca seç!",
        "gameType": "final_marathon",
        "challenges": [
          {
            "q": "M(7, −3) noktasının x eksenine göre yansıması nedir?",
            "choices": [
              "(7, 3)",
              "(−7, −3)",
              "(−7, 3)"
            ],
            "ans": "(7, 3)"
          },
          {
            "q": "Hangi noktanın x eksenine göre yansıması kendisidir?",
            "choices": [
              "(0, 5)",
              "(4, 0)",
              "(3, 3)"
            ],
            "ans": "(4, 0)"
          },
          {
            "q": "A(a, −4) noktasının y eksenine göre yansıması (−2, b) ise a + b kaçtır?",
            "choices": [
              "−2",
              "2",
              "6"
            ],
            "ans": "−2"
          }
        ],
        "id": 20,
        "kazanimId": "k4"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Harfli Yansıma Eşitliği",
        "subtitle": "y eksenine göre yansımada x işaret değiştirir, y aynı kalır.",
        "stem": "<strong>K(m + 1, −5)</strong> noktasının <strong>y eksenine göre yansıması K'(4, n − 2)</strong> olduğuna göre <strong>m + n</strong> kaçtır?",
        "options": [
          {
            "letter": "A",
            "text": "−8"
          },
          {
            "letter": "B",
            "text": "−6"
          },
          {
            "letter": "C",
            "text": "−2"
          },
          {
            "letter": "D",
            "text": "2"
          }
        ],
        "correctLetter": "A",
        "hint": "m + 1 = −4 ⇒ m = −5; ve n − 2 = −5 ⇒ n = −3!",
        "solution": "y eksenine göre yansımada apsis işaret değiştirir: m + 1 = −4 ⇒ <strong>m = −5</strong>. Ordinat aynı kalır: n − 2 = −5 ⇒ <strong>n = −3</strong>. Toplamları m + n = −5 + (−3) = <strong>−8</strong>.",
        "id": 21,
        "kazanimId": "k4"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Kazanım Kontrol: Eksen Yansıması",
        "subtitle": "Kazanım 4'ü yeşile çevirmek için bu soruyu çöz!",
        "stem": "Koordinat sisteminde <strong>A(−3, 6)</strong> noktasının <strong>x eksenine göre yansıması B</strong> noktasıdır. Buna göre |AB| doğru parçasının uzunluğu kaç birimdir?",
        "options": [
          {
            "letter": "A",
            "text": "3 birim"
          },
          {
            "letter": "B",
            "text": "6 birim"
          },
          {
            "letter": "C",
            "text": "9 birim"
          },
          {
            "letter": "D",
            "text": "12 birim"
          }
        ],
        "correctLetter": "D",
        "hint": "B noktası (−3, −6) olur. 6 birim yukarıda ve 6 birim aşağıda olduğu için uzaklık 6 + 6 = 12 birimdir!",
        "solution": "A(−3, 6) noktasının x eksenine göre yansıması <strong>B(−3, −6)</strong>'dır. İki nokta arasındaki dikey uzaklık = 6 − (−6) = <strong>12 birim</strong>dir.",
        "id": 22,
        "kazanimId": "k4"
      },
      {
        "type": "concept",
        "icon": "💡",
        "typeLabel": "Örnek & Keşif",
        "title": "Adım Adım Sırayla İşlem: Önce 1. Dönüşüm, Sonra 2. Dönüşüm!",
        "subtitle": "Ötelemeli yansımada (örneğin kumsaldaki sağ-sol ayak izleri) şekil hem ötelenir hem simetri doğrusuna göre yansıtılır!",
        "explanation": [
          "Örneğin <strong>A(2, −4)</strong> noktası önce <strong>3 birim sola ötelenip</strong> sonra <strong>x eksenine göre yansıtılırsa</strong>:<br>1. Adım (3 sola): <strong>(2 − 3, −4) = (−1, −4)</strong><br>2. Adım (x'e göre yansıma): <strong>(−1, +4)</strong>!",
          "Önce x eksenine, hemen ardından y eksenine göre yansıma yapmak <strong>orijine göre yansıma (−x, −y)</strong> ile aynı sonucu verir."
        ],
        "sentenceHtml": "P(1, 5) noktası önce y eksenine göre yansıtılırsa {0} olur; ardından 2 birim aşağı ötelenirse son konumu {1} olur.",
        "blanks": [
          {
            "id": 0,
            "correct": "(−1, 5)",
            "choices": [
              "(1, −5)",
              "(−1, 5)",
              "(−1, −5)"
            ]
          },
          {
            "id": 1,
            "correct": "(−1, 3)",
            "choices": [
              "(−1, 3)",
              "(−1, 7)",
              "(1, 3)"
            ]
          }
        ],
        "id": 23,
        "kazanimId": "k5"
      },
      {
        "type": "activity",
        "icon": "🧩",
        "typeLabel": "Etkileşimli Etkinlik",
        "title": "Ardışık Dönüşüm Zinciri",
        "subtitle": "A(−4, 3) noktası önce x eksenine göre yansıtılıyor (A'), sonra 6 birim sağa öteleniyor (A'')!",
        "activityMode": "rainbow_pairs",
        "targetNumber": 0,
        "sequence": [
          "A' ordinatı = ?",
          "A'' apsisi (−4+6) = ?",
          "A'' koordinatları toplamı = ?"
        ],
        "missingTargets": [
          {
            "index": 0,
            "answer": -3,
            "hint": "x eksenine göre yansıyınca A'(−4, −3) olur."
          },
          {
            "index": 1,
            "answer": 2,
            "hint": "6 birim sağa gidince x = −4 + 6 = 2 olur."
          },
          {
            "index": 2,
            "answer": -1,
            "hint": "A''(2, −3) ⇒ 2 + (−3) = −1."
          }
        ],
        "pool": [
          -4,
          -3,
          -1,
          2,
          3,
          5
        ],
        "id": 24,
        "kazanimId": "k5"
      },
      {
        "type": "game",
        "icon": "🎮",
        "typeLabel": "HTML5 Mini Oyun",
        "title": "Oyun: Dönüşüm Zinciri",
        "subtitle": "İki adımlı dönüşüm görevlerini tamamla!",
        "gameType": "final_marathon",
        "challenges": [
          {
            "q": "K(3, 4) önce x eksenine, sonra y eksenine göre yansıtılırsa hangi noktaya gelir?",
            "choices": [
              "(−3, −4)",
              "(−3, 4)",
              "(3, −4)"
            ],
            "ans": "(−3, −4)"
          },
          {
            "q": "L(−2, 1) noktası 4 birim sağa ötelenip y eksenine göre yansıtılırsa ne olur?",
            "choices": [
              "(−2, 1)",
              "(2, −1)",
              "(−2, −1)"
            ],
            "ans": "(−2, 1)"
          },
          {
            "q": "Kumsalda yürüyen bir kişinin sağ ve sol ayak izleri hangi dönüşüm örneğidir?",
            "choices": [
              "Sadece öteleme",
              "Ötelemeli yansıma",
              "Sadece yansıma"
            ],
            "ans": "Ötelemeli yansıma"
          }
        ],
        "id": 25,
        "kazanimId": "k5"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Kazanım Kontrol: İki Adımlı Dönüşüm",
        "subtitle": "Kazanım 5'i yeşile çevirmek için bu soruyu çöz!",
        "stem": "Koordinat düzleminde <strong>A(−5, −2)</strong> noktası önce <strong>y eksenine göre yansıtılıyor</strong>, ardından elde edilen nokta <strong>4 birim yukarı öteleniyor</strong>. Son durumda elde edilen noktanın koordinatları nedir?",
        "options": [
          {
            "letter": "A",
            "text": "(5, 2)"
          },
          {
            "letter": "B",
            "text": "(−5, 2)"
          },
          {
            "letter": "C",
            "text": "(5, −6)"
          },
          {
            "letter": "D",
            "text": "(−1, −2)"
          }
        ],
        "correctLetter": "A",
        "hint": "1. Adım (y'ye göre yansıma): (5, −2). 2. Adım (4 yukarı): (5, −2 + 4) = (5, 2)!",
        "solution": "A(−5, −2) noktasının y eksenine göre yansıması <strong>(5, −2)</strong>'dir. 4 birim yukarı ötelendiğinde ordinata 4 eklenir: <strong>(5, 2)</strong> bulunur.",
        "id": 26,
        "kazanimId": "k5"
      },
      {
        "type": "activity",
        "icon": "🧩",
        "typeLabel": "Etkileşimli Etkinlik",
        "title": "Adım Adım LGS Kurgusu: Üçgenin Yansıması ve Alanı",
        "subtitle": "Köşeleri A(2, 1), B(6, 1) ve C(2, 4) olan dik üçgen x eksenine göre yansıtılıyor!",
        "activityMode": "rainbow_pairs",
        "targetNumber": 0,
        "sequence": [
          "Taban |AB| = ? br",
          "Yükseklik |AC| = ? br",
          "Yansıyan üçgenin alanı = ? br²"
        ],
        "missingTargets": [
          {
            "index": 0,
            "answer": 4,
            "hint": "6 − 2 = 4 birim"
          },
          {
            "index": 1,
            "answer": 3,
            "hint": "4 − 1 = 3 birim"
          },
          {
            "index": 2,
            "answer": 6,
            "hint": "Yansımada alan değişmez: (4 × 3) ÷ 2 = 6 br²"
          }
        ],
        "pool": [
          3,
          4,
          5,
          6,
          8,
          12
        ],
        "id": 27,
        "kazanimId": "k6"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "LGS Yeni Nesil 1: Dijital Saatin Aynadaki Görüntüsü",
        "subtitle": "Dikey aynada sağ-sol yer değiştirir ve 2 ↔ 5 birbirine dönüşür!",
        "stem": "Dijital bir masa saati <strong>12 : 50</strong>'yi gösterirken yanındaki dikey düz aynadaki görüntüsüne bakılıyor. (1, 0 ve : aynı kalmakta, 2 ile 5 birbirine dönüşmektedir). Görüntüde okunan saat hangisidir?",
        "options": [
          {
            "letter": "A",
            "text": "02 : 51"
          },
          {
            "letter": "B",
            "text": "05 : 21"
          },
          {
            "letter": "C",
            "text": "15 : 20"
          },
          {
            "letter": "D",
            "text": "12 : 05"
          }
        ],
        "correctLetter": "A",
        "hint": "12:50 sağdan sola ters dizilir: 0 → 0, 5 → 2, : → :, 2 → 5, 1 → 1 ⇒ 02:51!",
        "solution": "Dikey aynada sıralama sağdan sola döner ve 2 ile 5 yer değiştirir: En sağdaki 0 başa gelir (0), 5 sayısı 2 olur (02), iki nokta (:), 2 sayısı 5 olur ve 1 sona gelir ⇒ <strong>02 : 51</strong>.",
        "id": 28,
        "kazanimId": "k6"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "LGS Yeni Nesil 2: Noktaları Üst Üste Getirme",
        "subtitle": "Hangi dönüşüm iki noktayı çakıştırır?",
        "stem": "Koordinat düzleminde <strong>K(−3, 4)</strong> noktasını <strong>L(3, −2)</strong> noktası ile çakıştırmak için aşağıdaki ardışık dönüşümlerden hangisi uygulanmalıdır?",
        "options": [
          {
            "letter": "A",
            "text": "y eksenine göre yansıtıp 2 birim aşağı ötelemek"
          },
          {
            "letter": "B",
            "text": "x eksenine göre yansıtıp 6 birim sağa ötelemek"
          },
          {
            "letter": "C",
            "text": "y eksenine göre yansıtıp 6 birim aşağı ötelemek"
          },
          {
            "letter": "D",
            "text": "6 birim sağa, 2 birim aşağı ötelemek"
          }
        ],
        "correctLetter": "C",
        "hint": "K(−3, 4) noktasını y eksenine göre yansıtırsak (3, 4) olur. (3, −2) olması için 4 − 6 = −2 (6 birim aşağı) gerekir!",
        "solution": "K(−3, 4) noktasının y eksenine göre yansıması <strong>(3, 4)</strong>'tür. Bu noktayı <strong>6 birim aşağı</strong> ötelersek (3, 4 − 6) = <strong>L(3, −2)</strong> noktası elde edilir.",
        "id": 29,
        "kazanimId": "k6"
      },
      {
        "type": "game",
        "icon": "🏆",
        "typeLabel": "Final Maratonu",
        "title": "Final: Dönüşüm Geometrisi Şampiyonluk Etabı",
        "subtitle": "Son 3 görevi tamamla ve 11. Üniteyi tamamen YEŞİLE döndür!",
        "gameType": "final_marathon",
        "challenges": [
          {
            "q": "A(−4, 7) noktasının x eksenine göre yansıması nedir?",
            "choices": [
              "(−4, −7)",
              "(4, 7)",
              "(4, −7)"
            ],
            "ans": "(−4, −7)"
          },
          {
            "q": "B(2, −5) noktası 3 birim sola, 5 birim yukarı ötelenirse ne olur?",
            "choices": [
              "(−1, 0)",
              "(5, 0)",
              "(−1, −10)"
            ],
            "ans": "(−1, 0)"
          },
          {
            "q": "Hangi dönüşümde şeklin duruş yönü değişmez?",
            "choices": [
              "X eksenine göre yansıma",
              "Öteleme",
              "Y eksenine göre yansıma"
            ],
            "ans": "Öteleme"
          }
        ],
        "id": 30,
        "kazanimId": "k6"
      }
    ]
  },
  {
    "id": "m8-u12-geometrik-cisimler",
    "grade": 8,
    "unitNo": 12,
    "title": "Geometrik Cisimler",
    "subtitle": "Dik Prizmalar, Dik Dairesel Silindir (Açınım, Alan, Hacim), Dik Piramit ve Koni",
    "coverImage": "assets/flow/u12_geometrik_cisimler.jpg",
    "badgeCells": [
      "2πr",
      "πr²h",
      "2πrh",
      "r/a",
      "θ/360",
      "n+2",
      "2n",
      "3n",
      "🧊",
      "🥫",
      "⛺",
      "LGS"
    ],
    "kazanimlar": [
      {
        "id": "k1",
        "no": 1,
        "title": "Dik Prizmalar: Yüz, Köşe, Ayrıt ve Açınım",
        "code": "M.8.3.4.1",
        "visual": "assets/flow/u12_geometrik_cisimler.jpg",
        "stops": [
          1,
          2,
          3,
          4,
          5
        ]
      },
      {
        "id": "k2",
        "no": 2,
        "title": "Dik Dairesel Silindirin Elemanları ve Açınımı",
        "code": "M.8.3.4.2",
        "visual": "assets/flow/u12_geometrik_cisimler.jpg",
        "stops": [
          6,
          7,
          8,
          9,
          10
        ]
      },
      {
        "id": "k3",
        "no": 3,
        "title": "Dik Dairesel Silindirin Yüzey Alanı: 2πr² + 2πrh",
        "code": "M.8.3.4.3",
        "visual": "assets/flow/u12_geometrik_cisimler.jpg",
        "stops": [
          11,
          12,
          13,
          14,
          15,
          16
        ]
      },
      {
        "id": "k4",
        "no": 4,
        "title": "Dik Dairesel Silindirin Hacmi: V = πr²h",
        "code": "M.8.3.4.4",
        "visual": "assets/flow/u12_geometrik_cisimler.jpg",
        "stops": [
          17,
          18,
          19,
          20,
          21,
          22
        ]
      },
      {
        "id": "k5",
        "no": 5,
        "title": "Dik Piramit ve Dik Koni (r / a = θ / 360°)",
        "code": "M.8.3.4.5",
        "visual": "assets/flow/u12_geometrik_cisimler.jpg",
        "stops": [
          23,
          24,
          25,
          26
        ]
      },
      {
        "id": "k6",
        "no": 6,
        "title": "LGS Silindir, Koni ve Cisim Görevleri",
        "code": "M.8.3.4.5",
        "visual": "assets/flow/u12_geometrik_cisimler.jpg",
        "stops": [
          27,
          28,
          29,
          30
        ]
      }
    ],
    "stops": [
      {
        "type": "video",
        "icon": "🎬",
        "typeLabel": "Animasyonlu Anlatım",
        "title": "Dik Prizmaların Açınımı ve Karşılıklı Yüzler",
        "subtitle": "Bir prizmanın açınımı katlandığında hangi yüzler paralel ve eş olur?",
        "videoScene": "custom_steps",
        "steps": [
          {
            "text": "1. Adım: Dik prizmalarda alt taban ile üst taban birbirine paralel ve eş çokgenlerdir.",
            "draw": "s1"
          },
          {
            "text": "2. Adım: Yan yüzlerin tamamı dikdörtgendir ve yan yüz sayısı tabanın kenar sayısına (n) eşittir.",
            "draw": "s2"
          },
          {
            "text": "3. Adım: Küp ve kare prizma açınımlarında birer kare atlayarak gelen yüzler kapatıldığında karşılıklı (paralel) gelir!",
            "draw": "s3"
          }
        ],
        "quickQuestion": "Yüz sayısı 9 olan bir dik prizmanın tabanı kaç kenarlı bir çokgendir?",
        "quickChoices": [
          "6 (Altıgen)",
          "7 (Yedigen)",
          "9 (Dokuzgen)"
        ],
        "quickCorrect": "7 (Yedigen)",
        "id": 1,
        "kazanimId": "k1"
      },
      {
        "type": "concept",
        "icon": "💡",
        "typeLabel": "Örnek & Keşif",
        "title": "Tabanı n Kenarlı Olan Dik Prizmada: Yüz = n + 2, Köşe = 2n, Ayrıt = 3n!",
        "subtitle": "Dik prizmalar tabanlarındaki çokgenin adına göre isimlendirilir (Üçgen dik prizma, Kare dik prizma, Altıgen dik prizma...).",
        "explanation": [
          "Tabanı <strong>n kenarlı</strong> bir dik prizmada:<br>• <strong>Yüz sayısı = n + 2</strong> (n yan yüz + 2 taban)<br>• <strong>Köşe sayısı = 2n</strong> (n altta + n üstte)<br>• <strong>Ayrıt sayısı = 3n</strong> (n altta + n üstte + n yanda).",
          "Dik prizmaların yan yüzleri daima <strong>dikdörtgensel bölgedir</strong>!"
        ],
        "sentenceHtml": "Altıgen dik prizmanın (n=6) yüz sayısı 6+2 = {0}, köşe sayısı 2×6 = {1} ve ayrıt sayısı 3×6 = {2} tanedir.",
        "blanks": [
          {
            "id": 0,
            "correct": "8",
            "choices": [
              "6",
              "8",
              "12"
            ]
          },
          {
            "id": 1,
            "correct": "12",
            "choices": [
              "8",
              "12",
              "18"
            ]
          },
          {
            "id": 2,
            "correct": "18",
            "choices": [
              "12",
              "18",
              "24"
            ]
          }
        ],
        "id": 2,
        "kazanimId": "k1"
      },
      {
        "type": "activity",
        "icon": "🧩",
        "typeLabel": "Etkileşimli Etkinlik",
        "title": "Prizma Eleman Sayıları",
        "subtitle": "Beşgen dik prizmanın (n = 5) temel eleman sayılarını bul!",
        "activityMode": "rainbow_pairs",
        "targetNumber": 0,
        "sequence": [
          "Yüz sayısı (n+2)=?",
          "Köşe sayısı (2n)=?",
          "Ayrıt sayısı (3n)=?"
        ],
        "missingTargets": [
          {
            "index": 0,
            "answer": 7,
            "hint": "5 + 2 = 7 yüz"
          },
          {
            "index": 1,
            "answer": 10,
            "hint": "2 × 5 = 10 köşe"
          },
          {
            "index": 2,
            "answer": 15,
            "hint": "3 × 5 = 15 ayrıt"
          }
        ],
        "pool": [
          5,
          7,
          10,
          12,
          15,
          20
        ],
        "id": 3,
        "kazanimId": "k1"
      },
      {
        "type": "game",
        "icon": "🎮",
        "typeLabel": "HTML5 Mini Oyun",
        "title": "Oyun: Prizma Mimarı",
        "subtitle": "Prizmaların özelliklerini ve ayrıt toplamlarını hesapla!",
        "gameType": "final_marathon",
        "challenges": [
          {
            "q": "12 köşesi olan dik prizma hangisidir?",
            "choices": [
              "Dörtgen prizma",
              "Beşgen prizma",
              "Altıgen prizma"
            ],
            "ans": "Altıgen prizma"
          },
          {
            "q": "Taban ayrıtı 4 cm, yüksekliği 10 cm olan kare dik prizmanın tüm ayrıtlarının toplamı kaç cm'dir?",
            "choices": [
              "56 cm",
              "72 cm",
              "80 cm"
            ],
            "ans": "72 cm"
          },
          {
            "q": "Üçgen dik prizmanın kaç tane yan yüzü vardır?",
            "choices": [
              "3",
              "4",
              "5"
            ],
            "ans": "3"
          }
        ],
        "id": 4,
        "kazanimId": "k1"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Kazanım Kontrol: Prizma Ayrıt Toplamı",
        "subtitle": "Kazanım 1'i yeşile çevirmek için bu soruyu çöz!",
        "stem": "Taban ayrıtlarından biri <strong>6 cm</strong> ve yüksekliği <strong>9 cm</strong> olan bir <strong>eşkenar üçgen dik prizmanın</strong> tüm ayrıt uzunlukları toplamı kaç cm'dir?",
        "options": [
          {
            "letter": "A",
            "text": "45 cm"
          },
          {
            "letter": "B",
            "text": "54 cm"
          },
          {
            "letter": "C",
            "text": "63 cm"
          },
          {
            "letter": "D",
            "text": "72 cm"
          }
        ],
        "correctLetter": "C",
        "hint": "Altta 3 taban ayrıtı (3×6=18), üstte 3 taban ayrıtı (3×6=18) ve yanda 3 dikey ayrıt (3×9=27) vardır!",
        "solution": "Alt ve üst tabanda toplam 6 taban ayrıtı (6 × 6 = 36 cm) ve yanda 3 yükseklik ayrıtı (3 × 9 = 27 cm) vardır. Toplam = 36 + 27 = <strong>63 cm</strong>.",
        "id": 5,
        "kazanimId": "k1"
      },
      {
        "type": "concept",
        "icon": "💡",
        "typeLabel": "Örnek & Keşif",
        "title": "Yan Yüzün Yatay Uzunluğu = Taban Çemberinin Çevresi (2πr)!",
        "subtitle": "Dik dairesel silindirin açınımı; 2 eş daire (alt ve üst taban) ile 1 dikdörtgenden (yan yüz) oluşur.",
        "explanation": [
          "Yan yüzü oluşturan dikdörtgenin bir kenarı silindirin <strong>yüksekliği (h)</strong>, daireyi saran diğer kenarı ise dairenin çevresi olan <strong>2 · π · r</strong> uzunluğundadır!",
          "Bir dikdörtgeni bir kenarı etrafında <strong>360° döndürdüğümüzde</strong> dik dairesel silindir oluşur."
        ],
        "sentenceHtml": "Yarıçapı r = 5 cm olan bir silindirin (π = 3) açınımındaki yan yüz dikdörtgeninin tabanı saran kenar uzunluğu 2·π·r = {0} cm olur.",
        "blanks": [
          {
            "id": 0,
            "correct": "30",
            "choices": [
              "15",
              "25",
              "30"
            ]
          }
        ],
        "id": 6,
        "kazanimId": "k2"
      },
      {
        "type": "video",
        "icon": "🎬",
        "typeLabel": "Animasyonlu Anlatım",
        "title": "Dikdörtgen Kartonu Kıvırarak Silindir Yapma",
        "subtitle": "Kenarları verilen bir dikdörtgen hangi kenarı üzerine kıvrılırsa yarıçap ne olur?",
        "videoScene": "custom_steps",
        "steps": [
          {
            "text": "1. Adım: Kısa kenarı 12 cm, uzun kenarı 30 cm olan karton uzun kenarı taban olacak şekilde kıvrılırsa:",
            "draw": "s1"
          },
          {
            "text": "2. Adım: Taban çevresi 2πr = 30 cm olur. π = 3 alırsak 2 · 3 · r = 30 ⇒ r = 5 cm ve yükseklik h = 12 cm bulunur!",
            "draw": "s2"
          },
          {
            "text": "3. Adım: Tam tersi kısa kenar taban yapılırsa 2πr = 12 ⇒ r = 2 cm ve h = 30 cm olur!",
            "draw": "s3"
          }
        ],
        "quickQuestion": "Taban yarıçapı 4 cm ve yüksekliği 10 cm olan silindirin (π=3) yan yüz açınımındaki dikdörtgenin çevre uzunluğu kaç cm'dir?",
        "quickChoices": [
          "34 cm",
          "48 cm",
          "68 cm"
        ],
        "quickCorrect": "68 cm",
        "id": 7,
        "kazanimId": "k2"
      },
      {
        "type": "activity",
        "icon": "🧩",
        "typeLabel": "Etkileşimli Etkinlik",
        "title": "Silindir Açınım Ölçüleri (π = 3)",
        "subtitle": "Taban yarıçapı r = 7 cm ve yüksekliği h = 10 cm olan silindirin açınım değerlerini bul!",
        "activityMode": "rainbow_pairs",
        "targetNumber": 0,
        "sequence": [
          "Taban çapı (2r)=? cm",
          "Yan yüz yatay kenarı (2πr)=? cm",
          "1 taban dairesinin alanı (πr²)=? cm²"
        ],
        "missingTargets": [
          {
            "index": 0,
            "answer": 14,
            "hint": "2 × 7 = 14 cm"
          },
          {
            "index": 1,
            "answer": 42,
            "hint": "2 × 3 × 7 = 42 cm"
          },
          {
            "index": 2,
            "answer": 147,
            "hint": "3 × 7² = 3 × 49 = 147 cm²"
          }
        ],
        "pool": [
          14,
          21,
          42,
          70,
          147,
          210
        ],
        "id": 8,
        "kazanimId": "k2"
      },
      {
        "type": "game",
        "icon": "🎮",
        "typeLabel": "HTML5 Mini Oyun",
        "title": "Oyun: Silindir Açınım Ustası",
        "subtitle": "Silindirin açınım kenarlarını (π = 3 alarak) hesapla!",
        "gameType": "final_marathon",
        "challenges": [
          {
            "q": "Yan yüzünün yatay kenarı 36 cm olan silindirin (π=3) taban yarıçapı kaç cm'dir?",
            "choices": [
              "4 cm",
              "6 cm",
              "12 cm"
            ],
            "ans": "6 cm"
          },
          {
            "q": "Silindirin bir tam tur döndüğünde aldığı yol neye eşittir?",
            "choices": [
              "Taban çevresine (2πr)",
              "Taban alanına (πr²)",
              "Hacmine"
            ],
            "ans": "Taban çevresine (2πr)"
          },
          {
            "q": "Silindirin köşesi ve ayrıtı var mıdır?",
            "choices": [
              "Yoktur",
              "2 köşesi vardır",
              "3 ayrıtı vardır"
            ],
            "ans": "Yoktur"
          }
        ],
        "id": 9,
        "kazanimId": "k2"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Kazanım Kontrol: Kıvrılan Dikdörtgen",
        "subtitle": "Kazanım 2'yi yeşile çevirmek için bu soruyu çöz!",
        "stem": "Uzun kenarı <strong>48 cm</strong>, kısa kenarı <strong>20 cm</strong> olan dikdörtgen biçimindeki bir karton, uzun kenarları çakışacak (taban çevresi 48 cm olacak) biçimde kıvrılarak dik silindir yapılıyor. Taban yarıçapı kaç cm olur? (π = 3)",
        "options": [
          {
            "letter": "A",
            "text": "6 cm"
          },
          {
            "letter": "B",
            "text": "8 cm"
          },
          {
            "letter": "C",
            "text": "12 cm"
          },
          {
            "letter": "D",
            "text": "16 cm"
          }
        ],
        "correctLetter": "B",
        "hint": "Taban çevresi 2 · π · r = 48 ⇒ 2 · 3 · r = 48!",
        "solution": "2 · π · r = 48 ⇒ 6r = 48 ⇒ <strong>r = 8 cm</strong> bulunur.",
        "id": 10,
        "kazanimId": "k2"
      },
      {
        "type": "concept",
        "icon": "💡",
        "typeLabel": "Örnek & Keşif",
        "title": "Yanal Alan = 2πrh | Tüm Yüzey Alanı = 2 Taban Alanı (2πr²) + Yanal Alan (2πrh)",
        "subtitle": "Boya rulosu soruları SADECE YANAL ALANI (2πrh) kullanır; üstü açık kap soruları ise 1 Taban + Yanal Alan kullanır!",
        "explanation": [
          "• <strong>1 Taban Alanı:</strong> <strong>π · r²</strong> (Alt ve üst 2 taban = <strong>2 · π · r²</strong>)<br>• <strong>Yanal Alan (Yan dikdörtgenin alanı):</strong> <strong>2 · π · r · h</strong>",
          "• <strong>Toplam Yüzey Alanı = 2πr² + 2πrh</strong>."
        ],
        "sentenceHtml": "Yarıçapı r = 3 cm ve yüksekliği h = 10 cm olan bir silindirin (π = 3) yanal alanı 2·3·3·10 = {0} cm², iki taban alanı toplamı 2·3·3² = {1} cm² olur.",
        "blanks": [
          {
            "id": 0,
            "correct": "180",
            "choices": [
              "90",
              "180",
              "234"
            ]
          },
          {
            "id": 1,
            "correct": "54",
            "choices": [
              "27",
              "54",
              "108"
            ]
          }
        ],
        "id": 11,
        "kazanimId": "k3"
      },
      {
        "type": "video",
        "icon": "🎬",
        "typeLabel": "Animasyonlu Anlatım",
        "title": "Boya Rulosu ve Silindir Yüzey Alanı Uygulaması",
        "subtitle": "Bir boya rulosu 1 tam tur döndüğünde yanal alanı (2πrh) kadar duvar boyar!",
        "videoScene": "custom_steps",
        "steps": [
          {
            "text": "1. Adım: Yarıçapı 5 cm, genişliği (h) 20 cm olan boya rulosunun yanal alanı = 2 · 3 · 5 · 20 = 600 cm²'dir.",
            "draw": "s1"
          },
          {
            "text": "2. Adım: Rulo 10 tam tur atarsa 10 × 600 = 6000 cm² alanı boyar!",
            "draw": "s2"
          },
          {
            "text": "3. Adım: Konserve kutusunun sadece yan yüzüne etiket yapıştırılıyorsa yine yalnız Yanal Alan (2πrh) hesaplanır!",
            "draw": "s3"
          }
        ],
        "quickQuestion": "Yarıçapı 4 cm, yüksekliği 5 cm olan kapalı bir silindirin (π=3) toplam yüzey alanı kaç cm²'dir?",
        "quickChoices": [
          "120 cm²",
          "168 cm²",
          "216 cm²"
        ],
        "quickCorrect": "216 cm²",
        "id": 12,
        "kazanimId": "k3"
      },
      {
        "type": "activity",
        "icon": "🧩",
        "typeLabel": "Etkileşimli Etkinlik",
        "title": "Silindir Alan Hesaplayıcı (π = 3)",
        "subtitle": "r = 2 cm ve h = 8 cm olan silindir için alanları sırasıyla hesapla!",
        "activityMode": "rainbow_pairs",
        "targetNumber": 0,
        "sequence": [
          "2 Taban alanı (2πr²)=? cm²",
          "Yanal alan (2πrh)=? cm²",
          "Toplam yüzey alanı=? cm²"
        ],
        "missingTargets": [
          {
            "index": 0,
            "answer": 24,
            "hint": "2 × 3 × 2² = 24 cm²"
          },
          {
            "index": 1,
            "answer": 96,
            "hint": "2 × 3 × 2 × 8 = 96 cm²"
          },
          {
            "index": 2,
            "answer": 120,
            "hint": "24 + 96 = 120 cm²"
          }
        ],
        "pool": [
          12,
          24,
          48,
          96,
          120,
          144
        ],
        "id": 13,
        "kazanimId": "k3"
      },
      {
        "type": "game",
        "icon": "🎮",
        "typeLabel": "HTML5 Mini Oyun",
        "title": "Oyun: Yüzey Alanı Uzmanı",
        "subtitle": "Yanal alan ve yüzey alanı sorularını (π = 3) çöz!",
        "gameType": "final_marathon",
        "challenges": [
          {
            "q": "r = 5 cm, h = 6 cm olan silindirin yanal alanı kaç cm²'dir? (π=3)",
            "choices": [
              "90 cm²",
              "150 cm²",
              "180 cm²"
            ],
            "ans": "180 cm²"
          },
          {
            "q": "Yanal alanı 144 cm² ve yüksekliği 8 cm olan silindirin yarıçapı kaç cm'dir? (π=3)",
            "choices": [
              "2 cm",
              "3 cm",
              "4 cm"
            ],
            "ans": "3 cm"
          },
          {
            "q": "Üstü açık silindirik bir bardağın yüzey alanı hangi formülle bulunur?",
            "choices": [
              "πr² + 2πrh",
              "2πr² + 2πrh",
              "2πrh"
            ],
            "ans": "πr² + 2πrh"
          }
        ],
        "id": 14,
        "kazanimId": "k3"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Boya Rulosu Sorusu",
        "subtitle": "1 turda boyanan alan = Yanal Alan (2πrh)!",
        "stem": "Taban yarıçapı <strong>4 cm</strong> ve uzunluğu (yüksekliği) <strong>25 cm</strong> olan dik dairesel silindir biçimindeki bir boya rulosu, düz bir duvarda <strong>5 tam tur</strong> döndürüldüğünde kaç cm² alanı boyar? (π = 3)",
        "options": [
          {
            "letter": "A",
            "text": "600 cm²"
          },
          {
            "letter": "B",
            "text": "1500 cm²"
          },
          {
            "letter": "C",
            "text": "3000 cm²"
          },
          {
            "letter": "D",
            "text": "6000 cm²"
          }
        ],
        "correctLetter": "C",
        "hint": "1 tur = 2 · π · r · h = 2 · 3 · 4 · 25 = 600 cm². 5 tur için 5 ile çarp!",
        "solution": "1 tam turda yanal alanı kadar yer boyar: 2 · 3 · 4 · 25 = <strong>600 cm²</strong>. 5 turda = 5 × 600 = <strong>3000 cm²</strong> alanı boyar.",
        "id": 15,
        "kazanimId": "k3"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Kazanım Kontrol: Toplam Yüzey Alanı",
        "subtitle": "Kazanım 3'ü yeşile çevirmek için bu soruyu çöz!",
        "stem": "Taban çapı <strong>10 cm</strong> (yarıçapı 5 cm) ve yüksekliği <strong>8 cm</strong> olan kapalı bir dik dairesel silindirin <strong>toplam yüzey alanı</strong> kaç cm²'dir? (π = 3)",
        "options": [
          {
            "letter": "A",
            "text": "240 cm²"
          },
          {
            "letter": "B",
            "text": "315 cm²"
          },
          {
            "letter": "C",
            "text": "390 cm²"
          },
          {
            "letter": "D",
            "text": "420 cm²"
          }
        ],
        "correctLetter": "C",
        "hint": "2 Taban = 2 · 3 · 5² = 150 cm². Yanal Alan = 2 · 3 · 5 · 8 = 240 cm². İkisini topla!",
        "solution": "2 Taban alanı = 2 · 3 · 25 = <strong>150 cm²</strong>. Yanal alan = 2 · 3 · 5 · 8 = <strong>240 cm²</strong>. Toplam yüzey alanı = 150 + 240 = <strong>390 cm²</strong> bulunur.",
        "id": 16,
        "kazanimId": "k3"
      },
      {
        "type": "concept",
        "icon": "💡",
        "typeLabel": "Örnek & Keşif",
        "title": "Hacim = Taban Alanı (πr²) × Yükseklik (h)",
        "subtitle": "Yarıçap (r) karesi alındığı için yarıçap 2 katına çıkarsa hacim 4 katına çıkar!",
        "explanation": [
          "Bir silindirin içine alabileceği sıvı miktarı (kapasitesi) <strong>Hacim = π · r² · h</strong> formülüyle hesaplanır.",
          "Birim dönüşümü hatırlatması: <strong>1 dm³ = 1 Litre = 1000 cm³ = 1000 mL</strong>!"
        ],
        "sentenceHtml": "Yarıçapı r = 4 cm ve yüksekliği h = 10 cm olan bir silindirin (π = 3) hacmi 3 · 4² · 10 = {0} cm³ olur. Yarıçap 2 katına çıkarılırsa hacim {1} katına çıkar.",
        "blanks": [
          {
            "id": 0,
            "correct": "480",
            "choices": [
              "120",
              "240",
              "480"
            ]
          },
          {
            "id": 1,
            "correct": "4",
            "choices": [
              "2",
              "4",
              "8"
            ]
          }
        ],
        "id": 17,
        "kazanimId": "k4"
      },
      {
        "type": "video",
        "icon": "🎬",
        "typeLabel": "Animasyonlu Anlatım",
        "title": "Dikdörtgeni Kenarı Etrafında 360° Döndürerek Hacim Bulma",
        "subtitle": "Hangi kenar etrafında döndürülürse O KENAR YÜKSEKLİK (h), diğer kenar YARIÇAP (r) olur!",
        "videoScene": "custom_steps",
        "steps": [
          {
            "text": "1. Kural: Kısa kenarı 3 cm, uzun kenarı 5 cm olan dikdörtgen uzun kenarı (5 cm) etrafında 360° döndürülürse:",
            "draw": "s1"
          },
          {
            "text": "2. Adım: Dönme ekseni olan 5 cm YÜKSEKLİK (h = 5), daire çizen 3 cm ise YARIÇAP (r = 3) olur!",
            "draw": "s2"
          },
          {
            "text": "3. Adım: Oluşan silindirin hacmi = π · r² · h = 3 · 3² · 5 = 135 cm³ bulunur!",
            "draw": "s3"
          }
        ],
        "quickQuestion": "Kenarları 4 cm ve 6 cm olan dikdörtgen, 6 cm'lik kenarı etrafında 360° döndürülürse oluşan silindirin yarıçapı (r) kaç cm olur?",
        "quickChoices": [
          "4 cm",
          "6 cm",
          "8 cm"
        ],
        "quickCorrect": "4 cm",
        "id": 18,
        "kazanimId": "k4"
      },
      {
        "type": "activity",
        "icon": "🧩",
        "typeLabel": "Etkileşimli Etkinlik",
        "title": "Silindirden Silindire Su Aktarma (π = 3)",
        "subtitle": "r = 6 cm, h = 10 cm olan tam dolu silindirdeki su, taban yarıçapı r = 3 cm olan boş silindire dökülüyor!",
        "activityMode": "rainbow_pairs",
        "targetNumber": 0,
        "sequence": [
          "1. silindirin hacmi=? cm³",
          "2. silindirin taban alanı (πr²)=? cm²",
          "2. silindirde su yüksekliği=? cm"
        ],
        "missingTargets": [
          {
            "index": 0,
            "answer": 1080,
            "hint": "3 × 6² × 10 = 1080 cm³"
          },
          {
            "index": 1,
            "answer": 27,
            "hint": "3 × 3² = 27 cm²"
          },
          {
            "index": 2,
            "answer": 40,
            "hint": "1080 ÷ 27 = 40 cm"
          }
        ],
        "pool": [
          20,
          27,
          40,
          54,
          540,
          1080
        ],
        "id": 19,
        "kazanimId": "k4"
      },
      {
        "type": "game",
        "icon": "🎮",
        "typeLabel": "HTML5 Mini Oyun",
        "title": "Oyun: Hacim Hesaplayıcı",
        "subtitle": "Silindir hacmi ve sıvı yüksekliği sorularını çöz!",
        "gameType": "final_marathon",
        "challenges": [
          {
            "q": "r = 5 cm, h = 8 cm olan silindirin hacmi kaç cm³'tür? (π=3)",
            "choices": [
              "300 cm³",
              "600 cm³",
              "750 cm³"
            ],
            "ans": "600 cm³"
          },
          {
            "q": "Hacmi 324 cm³ ve yüksekliği 12 cm olan silindirin yarıçapı kaç cm'dir? (π=3)",
            "choices": [
              "3 cm",
              "4 cm",
              "6 cm"
            ],
            "ans": "3 cm"
          },
          {
            "q": "Yarısına kadar su dolu olan r=2 dm, h=10 dm silindirde kaç litre (dm³) su vardır? (π=3)",
            "choices": [
              "60 L",
              "120 L",
              "240 L"
            ],
            "ans": "60 L"
          }
        ],
        "id": 20,
        "kazanimId": "k4"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Döndürme ile Oluşan Silindir",
        "subtitle": "Etrafında döndürülen kenar h, diğer kenar r olur!",
        "stem": "Kısa kenarı <strong>4 cm</strong>, uzun kenarı <strong>7 cm</strong> olan bir dikdörtgen, <strong>uzun kenarı etrafında 360°</strong> döndürülüyor. Oluşan silindirin hacmi kaç cm³ olur? (π = 3)",
        "options": [
          {
            "letter": "A",
            "text": "252 cm³"
          },
          {
            "letter": "B",
            "text": "336 cm³"
          },
          {
            "letter": "C",
            "text": "588 cm³"
          },
          {
            "letter": "D",
            "text": "672 cm³"
          }
        ],
        "correctLetter": "B",
        "hint": "Uzun kenar etrafında döndüğü için h = 7 cm ve r = 4 cm olur. V = 3 · 4² · 7!",
        "solution": "Uzun kenar dönme ekseni olduğundan <strong>h = 7 cm</strong> ve <strong>r = 4 cm</strong>'dir. Hacim = π · r² · h = 3 × 16 × 7 = <strong>336 cm³</strong> bulunur.",
        "id": 21,
        "kazanimId": "k4"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Kazanım Kontrol: Silindirde Meyve Suyu",
        "subtitle": "Kazanım 4'ü yeşile çevirmek için bu soruyu çöz!",
        "stem": "Taban yarıçapı <strong>6 cm</strong> ve yüksekliği <strong>20 cm</strong> olan silindir biçimindeki sürahi tamamen meyve suyu ile doludur. Bu meyve suyu taban yarıçapı <strong>3 cm</strong> ve yüksekliği <strong>10 cm</strong> olan bardaklara doldurulursa kaç bardak tam dolar? (π = 3)",
        "options": [
          {
            "letter": "A",
            "text": "4 bardak"
          },
          {
            "letter": "B",
            "text": "6 bardak"
          },
          {
            "letter": "C",
            "text": "8 bardak"
          },
          {
            "letter": "D",
            "text": "12 bardak"
          }
        ],
        "correctLetter": "C",
        "hint": "Sürahi Hacmi / Bardak Hacmi = (π · 6² · 20) / (π · 3² · 10) = (36 · 20) / (9 · 10)!",
        "solution": "Bardak sayısı = V(Sürahi) / V(Bardak) = (3 · 36 · 20) / (3 · 9 · 10) = 4 × 2 = <strong>8 bardak</strong> bulunur.",
        "id": 22,
        "kazanimId": "k4"
      },
      {
        "type": "concept",
        "icon": "💡",
        "typeLabel": "Örnek & Keşif",
        "title": "Konide Pisagor (r² + h² = a²) ve Açınım Formülü (r / a = θ / 360°)",
        "subtitle": "Dik piramidin yan yüzleri ikizkenar üçgendir; dik koninin yan yüz açınımı ise bir daire dilimidir!",
        "explanation": [
          "<strong>Dik Koninin 2 Altın Bağıntısı:</strong><br>1. Taban yarıçapı (r), cisim yüksekliği (h) ve <strong>ana doğru (a)</strong> dik üçgen oluşturur: <strong>r² + h² = a²</strong>!",
          "2. Açınımda taban yarıçapının ana doğruya oranı: <strong>r / a = θ / 360°</strong> (θ: Yanal daire diliminin merkez açısı)."
        ],
        "sentenceHtml": "Taban yarıçapı r = 6 cm ve yüksekliği h = 8 cm olan dik koninin ana doğrusu a = {0} cm olur. r = 3 cm ve a = 9 cm olan koninin açınımındaki merkez açı θ = {1} derecedir.",
        "blanks": [
          {
            "id": 0,
            "correct": "10",
            "choices": [
              "10",
              "12",
              "14"
            ]
          },
          {
            "id": 1,
            "correct": "120",
            "choices": [
              "90",
              "120",
              "180"
            ]
          }
        ],
        "id": 23,
        "kazanimId": "k5"
      },
      {
        "type": "activity",
        "icon": "🧩",
        "typeLabel": "Etkileşimli Etkinlik",
        "title": "Koni ve Piramit Analizi",
        "subtitle": "Taban yarıçapı r = 5 cm, yüksekliği h = 12 cm olan dik koninin elemanlarını bul!",
        "activityMode": "rainbow_pairs",
        "targetNumber": 0,
        "sequence": [
          "Ana doğru (a)=? cm",
          "Kare piramidin yüz sayısı=?",
          "r=4, a=12 ise açınım açısı θ=?°"
        ],
        "missingTargets": [
          {
            "index": 0,
            "answer": 13,
            "hint": "5-12-13 dik üçgeninden a = 13 cm."
          },
          {
            "index": 1,
            "answer": 5,
            "hint": "1 kare taban + 4 üçgen yan yüz = 5 yüz."
          },
          {
            "index": 2,
            "answer": 120,
            "hint": "4 / 12 = θ / 360° ⇒ θ = 120°."
          }
        ],
        "pool": [
          5,
          8,
          12,
          13,
          90,
          120
        ],
        "id": 24,
        "kazanimId": "k5"
      },
      {
        "type": "game",
        "icon": "🎮",
        "typeLabel": "HTML5 Mini Oyun",
        "title": "Oyun: Piramit ve Koni Ustası",
        "subtitle": "Piramit ve koni bağıntılarını kullanarak doğru cevabı seç!",
        "gameType": "final_marathon",
        "challenges": [
          {
            "q": "Kare dik piramidin kaç tane ayrıtı vardır?",
            "choices": [
              "4",
              "8",
              "12"
            ],
            "ans": "8"
          },
          {
            "q": "Yanal daire diliminin merkez açısı 90° ve ana doğrusu 12 cm olan koninin taban yarıçapı kaç cm'dir?",
            "choices": [
              "3 cm",
              "4 cm",
              "6 cm"
            ],
            "ans": "3 cm"
          },
          {
            "q": "Bir dik üçgeni dik kenarlarından biri etrafında 360° döndürürsek hangi cisim oluşur?",
            "choices": [
              "Dik silindir",
              "Dik koni",
              "Küre"
            ],
            "ans": "Dik koni"
          }
        ],
        "id": 25,
        "kazanimId": "k5"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "Kazanım Kontrol: Koni Açınımı",
        "subtitle": "Kazanım 5'i yeşile çevirmek için bu soruyu çöz!",
        "stem": "Ana doğrusu <strong>15 cm</strong> ve yanal yüzünü oluşturan daire diliminin merkez açısı <strong>120°</strong> olan bir dik koninin <strong>taban yarıçapı (r)</strong> kaç cm'dir?",
        "options": [
          {
            "letter": "A",
            "text": "3 cm"
          },
          {
            "letter": "B",
            "text": "4 cm"
          },
          {
            "letter": "C",
            "text": "5 cm"
          },
          {
            "letter": "D",
            "text": "6 cm"
          }
        ],
        "correctLetter": "C",
        "hint": "r / a = θ / 360° ⇒ r / 15 = 120° / 360° = 1 / 3!",
        "solution": "Formül: r / a = θ / 360° ⇒ r / 15 = 120 / 360 = 1 / 3 ⇒ <strong>r = 5 cm</strong> bulunur.",
        "id": 26,
        "kazanimId": "k5"
      },
      {
        "type": "activity",
        "icon": "🧩",
        "typeLabel": "Etkileşimli Etkinlik",
        "title": "Adım Adım LGS Kurgusu: Kare Piramit Yan Yüz Yüksekliği",
        "subtitle": "Taban ayrıtı 12 cm (yarısı 6 cm) ve cisim yüksekliği 8 cm olan kare dik piramidi incele!",
        "activityMode": "rainbow_pairs",
        "targetNumber": 0,
        "sequence": [
          "Taban merkezinin kenara uzaklığı=? cm",
          "Yan yüz yüksekliği (6-8-?)=? cm",
          "1 yan yüz üçgenin alanı=? cm²"
        ],
        "missingTargets": [
          {
            "index": 0,
            "answer": 6,
            "hint": "12 ÷ 2 = 6 cm"
          },
          {
            "index": 1,
            "answer": 10,
            "hint": "6-8-10 dik üçgeninden yan yüz yüksekliği 10 cm'dir."
          },
          {
            "index": 2,
            "answer": 60,
            "hint": "(12 × 10) ÷ 2 = 60 cm²"
          }
        ],
        "pool": [
          6,
          8,
          10,
          30,
          60,
          120
        ],
        "id": 27,
        "kazanimId": "k6"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "LGS Yeni Nesil 1: Silindirik Yol Silindiri",
        "subtitle": "Tur sayısı × Yanal Alan = Düzleştirilen Toplam Yol Alanı!",
        "stem": "Taban yarıçapı <strong>50 cm (0,5 m)</strong> ve genişliği <strong>2 metre</strong> olan bir yol silindiri, düz bir yolu asfaltlarken <strong>20 tam tur</strong> dönüyor. Silindirin üzerinden geçtiği alan kaç m²'dir? (π = 3)",
        "options": [
          {
            "letter": "A",
            "text": "60 m²"
          },
          {
            "letter": "B",
            "text": "90 m²"
          },
          {
            "letter": "C",
            "text": "120 m²"
          },
          {
            "letter": "D",
            "text": "150 m²"
          }
        ],
        "correctLetter": "C",
        "hint": "1 turda yanal alan = 2 · π · r · h = 2 · 3 · 0,5 · 2 = 6 m². 20 tur için 20 × 6!",
        "solution": "1 tam turdaki yanal alan = 2 · 3 · 0,5 · 2 = <strong>6 m²</strong>'dir. 20 tam turda = 20 × 6 = <strong>120 m²</strong> alanı düzleştirir.",
        "id": 28,
        "kazanimId": "k6"
      },
      {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": "LGS Yeni Nesil 2: Koninin Yüksekliğini Bulma",
        "subtitle": "Önce r/a = θ/360° ile r'yi, sonra Pisagor (r² + h² = a²) ile h'yi bul!",
        "stem": "Açınımındaki yanal daire diliminin merkez açısı <strong>216°</strong> ve yarıçapı (ana doğrusu) <strong>10 cm</strong> olan bir dik koninin kapatıldığında <strong>cisim yüksekliği (h)</strong> kaç cm olur?",
        "options": [
          {
            "letter": "A",
            "text": "6 cm"
          },
          {
            "letter": "B",
            "text": "8 cm"
          },
          {
            "letter": "C",
            "text": "9 cm"
          },
          {
            "letter": "D",
            "text": "12 cm"
          }
        ],
        "correctLetter": "B",
        "hint": "r / 10 = 216 / 360 = 3 / 5 ⇒ r = 6 cm. Sonra 6 - h - 10 dik üçgeninden h = 8 cm!",
        "solution": "Önce taban yarıçapını bulalım: r / 10 = 216° / 360° = 3 / 5 ⇒ <strong>r = 6 cm</strong>. Dik konide r² + h² = a² ⇒ 6² + h² = 10² ⇒ <strong>h = 8 cm</strong> bulunur.",
        "id": 29,
        "kazanimId": "k6"
      },
      {
        "type": "game",
        "icon": "🏆",
        "typeLabel": "Final Maratonu",
        "title": "Final: Geometrik Cisimler Şampiyonluk Etabı",
        "subtitle": "Son 3 görevi tamamla ve 12. Üniteyle birlikte TÜM 8. SINIF LGS MÜFREDATINI YEŞİLE DÖNDÜR!",
        "gameType": "final_marathon",
        "challenges": [
          {
            "q": "r = 3 cm, h = 5 cm olan silindirin hacmi kaç cm³'tür? (π=3)",
            "choices": [
              "90 cm³",
              "135 cm³",
              "150 cm³"
            ],
            "ans": "135 cm³"
          },
          {
            "q": "Taban yarıçapı 8 cm, yüksekliği 15 cm olan dik koninin ana doğrusu kaç cm'dir?",
            "choices": [
              "17 cm",
              "19 cm",
              "23 cm"
            ],
            "ans": "17 cm"
          },
          {
            "q": "Sekizgen dik prizmanın kaç tane yüzü vardır?",
            "choices": [
              "8",
              "10",
              "16"
            ],
            "ans": "10"
          }
        ],
        "id": 30,
        "kazanimId": "k6"
      }
    ]
  }
];
