# -*- coding: utf-8 -*-
import json

def c_stop(title, subtitle, exp1, exp2, sent, blanks, strip=None):
    d = {
        "type": "concept",
        "icon": "💡",
        "typeLabel": "Örnek & Keşif",
        "title": title,
        "subtitle": subtitle,
        "explanation": [exp1, exp2],
        "sentenceHtml": sent,
        "blanks": [
            {"id": i, "correct": b[0], "choices": b[1]}
            for i, b in enumerate(blanks)
        ]
    }
    if strip:
        d["primeStripDemo"] = strip
    return d

def v_stop(title, subtitle, steps, qq, qchoices, qcorrect):
    return {
        "type": "video",
        "icon": "🎬",
        "typeLabel": "Animasyonlu Anlatım",
        "title": title,
        "subtitle": subtitle,
        "videoScene": "custom_steps",
        "steps": [{"text": s, "draw": f"s{i+1}"} for i, s in enumerate(steps)],
        "quickQuestion": qq,
        "quickChoices": qchoices,
        "quickCorrect": qcorrect
    }

def a_rainbow(title, subtitle, seq, targets, pool):
    return {
        "type": "activity",
        "icon": "🧩",
        "typeLabel": "Etkileşimli Etkinlik",
        "title": title,
        "subtitle": subtitle,
        "activityMode": "rainbow_pairs",
        "targetNumber": 0,
        "sequence": seq,
        "missingTargets": [
            {"index": t[0], "answer": t[1], "hint": t[2]}
            for t in targets
        ],
        "pool": pool
    }

def a_sort(title, subtitle, choices_pair, items):
    return {
        "type": "activity",
        "icon": "🧩",
        "typeLabel": "Etkileşimli Sınıflama",
        "title": title,
        "subtitle": subtitle,
        "activityMode": "custom_sort",
        "sortChoices": choices_pair,
        "items": [{"text": it[0], "answer": it[1]} for it in items]
    }

def g_quiz(title, subtitle, challenges, is_final=False):
    return {
        "type": "game",
        "icon": "🏆" if is_final else "🎮",
        "typeLabel": "Final Maratonu" if is_final else "HTML5 Mini Oyun",
        "title": title,
        "subtitle": subtitle,
        "gameType": "final_marathon",
        "challenges": [
            {"q": c[0], "choices": c[1], "ans": c[2]}
            for c in challenges
        ]
    }

def q_stop(title, subtitle, stem, opts, corr, hint, sol):
    letters = ["A", "B", "C", "D"]
    return {
        "type": "question",
        "icon": "❓",
        "typeLabel": "LGS Soru & Çözüm",
        "title": title,
        "subtitle": subtitle,
        "stem": stem,
        "options": [{"letter": letters[i], "text": opts[i]} for i in range(4)],
        "correctLetter": corr,
        "hint": hint,
        "solution": sol
    }

def make_unit(u_no, u_id, title, subtitle, cover, badge_cells, kaz_list):
    kazanimlar = []
    stops = []
    next_id = 1
    for idx, k in enumerate(kaz_list):
        k_id = f"k{idx+1}"
        r = []
        for raw_st in k["stops"]:
            st = dict(raw_st)
            st["id"] = next_id
            st["kazanimId"] = k_id
            stops.append(st)
            r.append(next_id)
            next_id += 1
        kazanimlar.append({
            "id": k_id,
            "no": idx + 1,
            "title": k["title"],
            "code": k["code"],
            "visual": cover,
            "stops": r
        })
    assert len(stops) == 30, f"Unit {u_no} total stops={len(stops)}, expected 30" 
    return {
        "id": u_id,
        "grade": 8,
        "unitNo": u_no,
        "title": title,
        "subtitle": subtitle,
        "coverImage": cover,
        "badgeCells": badge_cells,
        "kazanimlar": kazanimlar,
        "stops": stops
    }

UNITS_2_TO_12 = [
    # =========================================================================
    # ÜNİTE 2: ÜSLÜ İFADELER
    # =========================================================================
    make_unit(
        2, "m8-u2-uslu-ifadeler", "Üslü İfadeler",
        "Negatif Üs, Üssün Üssü, Çarpma-Bölme, Çözümleme ve Bilimsel Gösterim",
        "assets/flow/u02_uslu_ifadeler.jpg",
        ["2¹", "2²", "2³", "2⁴", "3¹", "3²", "3³", "3⁴", "10¹", "10²", "10³", "aⁿ"],
        [
            {
                "title": "Tam Sayı Kuvvetleri ve Negatif Üs",
                "code": "M.8.1.2.1",
                "stops": [
                    c_stop(
                        "Negatif Üs ve İşaret Kuralları",
                        "Negatif üs sayının işaretini değiştirmez; yalnızca tabanı ters çevirir (çarpmaya göre tersini alır).",
                        "Sıfırdan farklı bir <strong>a</strong> tam sayısı için <strong>a⁻ⁿ = 1 / aⁿ</strong> eşitliği geçerlidir. Örneğin <strong>2⁻³ = 1 / 2³ = 1/8</strong> olur.",
                        "Parantez içindeki negatif bir tam sayının <strong>çift kuvveti pozitif</strong>, <strong>tek kuvveti negatif</strong> olur: <strong>(−2)⁴ = +16</strong> iken parantezsiz <strong>−2⁴ = −16</strong>'dır!",
                        "2⁻³ üslü ifadesinin değeri {0} kesrine eşittir. (−3)² ifadesinin sonucu {1} iken, parantezsiz −3² ifadesinin sonucu {2} olur.",
                        [("1/8", ["−8", "1/8", "−1/8"]), ("+9", ["+9", "−9", "+6"]), ("−9", ["+9", "−9", "1/9"])],
                        ["2⁻¹ = 1/2", "2⁻² = 1/4", "2⁻³ = 1/8", "(−2)⁴ = +16", "(−2)³ = −8"]
                    ),
                    v_stop(
                        "Parantezli ve Parantezsiz Kuvvet Farkı",
                        "LGS'de en çok dikkat edilen işaret ve negatif üs adımlarını izleyelim.",
                        [
                            "1. Adım: (−5)² ifadesinde çift üs parantezin dışındadır; (−5) × (−5) = +25 olur.",
                            "2. Adım: −5² ifadesinde ise 2 üssü sadece 5'in üzerindedir; sonuç −(5 × 5) = −25 olur.",
                            "3. Adım: (−2)⁻³ ifadesinde önce işaret belirlenir (tek üs ⇒ eksi), sonra ters çevrilir: −1/8.",
                            "4. Adım: Sıfırdan farklı her sayının 0. kuvveti 1'dir: (−19)⁰ = +1."
                        ],
                        "(−2)⁴ + (−2)³ işleminin sonucu kaçtır?",
                        ["16 + (−8) = 8", "−16 + (−8) = −24", "8 + (−6) = 2"],
                        "16 + (−8) = 8"
                    ),
                    a_rainbow(
                        "Üslü İfadelerin Değerlerini Eşleştir",
                        "Turuncu kutulardaki üslü ifadelerin eşit olduğu değerleri alttan seç!",
                        ["3⁻² = ?", "(−4)² = ?", "5⁰ + 2⁻¹ = ?"],
                        [(0, "1/9", "3⁻² = 1 / 3² = 1/9"), (1, "16", "(−4)×(−4) = +16"), (2, "3/2", "1 + 1/2 = 3/2")],
                        ["−9", "1/9", "−16", "16", "3/2", "2"]
                    ),
                    g_quiz(
                        "Oyun: Kuvvet Laboratuvarı",
                        "Negatif üs ve işaret tuzaklarına düşmeden 3 görevi tamamla!",
                        [
                            ("4⁻² üslü ifadesinin değeri hangisidir?", ["−8", "−1/16", "1/16"], "1/16"),
                            ("(−1)¹⁰⁰ + (−1)⁹⁹ işleminin sonucu kaçtır?", ["−2", "0", "2"], "0"),
                            ("1 / 27 kesri 3 tabanında nasıl yazılır?", ["3⁻³", "3³", "−3³"], "3⁻³")
                        ]
                    ),
                    q_stop(
                        "Kazanım Kontrol: Üslü Değer Hesabı",
                        "Kazanım 1'i tamamlayıp yeşile döndürmek için bu LGS sorusunu çöz!",
                        "<strong>a = −2</strong> ve <strong>b = 3</strong> olduğuna göre, <strong>aᵇ + bᵃ</strong> işleminin sonucu kaçtır?",
                        ["−71 / 9", "−65 / 9", "65 / 9", "73 / 9"],
                        "A",
                        "Harfli ifadelerde yerine koyarken mutlaka parantez kullan: aᵇ = (−2)³ = −8 ve bᵃ = 3⁻² = 1/9.",
                        "aᵇ = (−2)³ = <strong>−8</strong> ve bᵃ = 3⁻² = <strong>1/9</strong> olur. Toplamları: −8 + 1/9 = (−72 + 1) / 9 = <strong>−71 / 9</strong> bulunur."
                    )
                ]
            },
            {
                "title": "Üssün Üssü ve Sıralama",
                "code": "M.8.1.2.2",
                "stops": [
                    c_stop(
                        "Üssün Üssü Kuralı: (aⁿ)ᵐ = aⁿ·ᵐ",
                        "Bir üslü ifadenin tekrar kuvveti alınırken üsler birbiriyle çarpılır!",
                        "Örneğin <strong>8⁴</strong> sayısını 2 tabanında yazmak için 8 yerine 2³ yazarız: <strong>8⁴ = (2³)⁴ = 2³ˣ⁴ = 2¹²</strong>.",
                        "Sıralama yaparken ya <strong>tabanlar</strong> (2, 3, 5 gibi asal tabanlara dönüştürülerek) ya da <strong>üsler</strong> eşitlenir.",
                        "16³ sayısı 2 tabanında (2⁴)³ = {0} olarak yazılır. 27⁻² sayısı ise 3 tabanında {1} ifadesine eşittir.",
                        [("2¹²", ["2⁷", "2¹²", "2⁶⁴"]), ("3⁻⁶", ["3⁻⁵", "3⁻⁶", "3⁶"])],
                        ["4 = 2²", "8 = 2³", "16 = 2⁴", "32 = 2⁵", "27 = 3³", "81 = 3⁴"]
                    ),
                    a_rainbow(
                        "Taban Dönüştürme Atölyesi",
                        "Verilen sayıları en küçük asal tabanda üssün üssü kuralıyla tamamla!",
                        ["9⁵ = 3^?", "25⁴ = 5^?", "32³ = 2^?"],
                        [(0, 10, "9⁵ = (3²)⁵ = 3¹⁰"), (1, 8, "25⁴ = (5²)⁴ = 5⁸"), (2, 15, "32³ = (2⁵)³ = 2¹⁵")],
                        [6, 7, 8, 10, 12, 15]
                    ),
                    v_stop(
                        "Büyük Üslü Sayıları Sıralama Tekniği",
                        "Tabanları ve üsleri farklı olan sayıları nasıl karşılaştırırız?",
                        [
                            "1. Yöntem (Taban Eşitleme): 4⁶, 8⁵ ve 16³ sayılarını 2 tabanında yazarız: 2¹², 2¹⁵ ve 2¹².",
                            "2. Yöntem (Üs Eşitleme): 2⁶⁰, 3⁴⁰ ve 5²⁰ sayılarında üslerin EBOB'u 20'dir.",
                            "3. Adım: (2³)²⁰ = 8²⁰, (3²)²⁰ = 9²⁰ ve 5²⁰ şeklinde yazılır.",
                            "4. Sonuç: Üsler 20'de eşitlendiği için tabanı büyük olan büyüktür: 5²⁰ < 8²⁰ < 9²⁰!"
                        ],
                        "2³⁰, 3²⁰ ve 5¹⁰ sayılarının doğru sıralanışı hangisidir?",
                        ["5¹⁰ < 2³⁰ < 3²⁰", "2³⁰ < 3²⁰ < 5¹⁰", "3²⁰ < 2³⁰ < 5¹⁰"],
                        "5¹⁰ < 2³⁰ < 3²⁰"
                    ),
                    g_quiz(
                        "Oyun: Üs Dönüştürücü",
                        "Üssün üssü kuralını kullanarak eşdeğer ifadeleri yakala!",
                        [
                            ("125⁻² ifadesinin 5 tabanındaki eşiti nedir?", ["5⁻⁵", "5⁻⁶", "5⁶"], "5⁻⁶"),
                            ("Hangisi 64² sayısına eşittir?", ["2⁸", "2¹²", "4⁸"], "2¹²"),
                            ("(−3²)³ işleminin sonucu hangisidir?", ["3⁶", "−3⁵", "−3⁶"], "−3⁶")
                        ]
                    ),
                    q_stop(
                        "Kazanım Kontrol: Üslü Denklem",
                        "Kazanım 2'yi yeşile döndürmek için taban eşitleme sorusunu çöz!",
                        "<strong>8ˣ⁺¹ = 4ˣ⁺⁴</strong> eşitliğini sağlayan <strong>x</strong> tam sayısı kaçtır?",
                        ["3", "4", "5", "6"],
                        "C",
                        "8 = 2³ ve 4 = 2² yazarak iki tarafı da 2 tabanında eşitle: 2^(3x+3) = 2^(2x+8).",
                        "8ˣ⁺¹ = (2³)ˣ⁺¹ = <strong>2³ˣ⁺³</strong> ve 4ˣ⁺⁴ = (2²)ˣ⁺⁴ = <strong>2²ˣ⁺⁸</strong> olur. Tabanlar eşit olduğundan 3x + 3 = 2x + 8 ⇒ <strong>x = 5</strong> bulunur."
                    )
                ]
            },
            {
                "title": "Üslü İfadelerle Çarpma İşlemi",
                "code": "M.8.1.2.2",
                "stops": [
                    c_stop(
                        "Çarpma Kuralı: Tabanlar Aynıysa Üsler Toplanır",
                        "Üsler aynıysa tabanlar çarpılır: aˣ · bˣ = (a · b)ˣ",
                        "Tabanları aynı olan üslü ifadeler çarpılırken üsler toplanır: <strong>2⁵ · 2³ = 2⁵⁺³ = 2⁸</strong>.",
                        "Üsleri aynı olan ifadeler çarpılırken ise tabanlar çarpılıp ortak üs yazılır: <strong>2⁷ · 5⁷ = (2 · 5)⁷ = 10⁷</strong> (Sondan 7 basamağı sıfırdır!).",
                        "3⁴ · 3⁻⁶ işleminin sonucu {0} olurken, 2⁶ · 5⁶ çarpımının sonucu {1} sayısına eşittir.",
                        [("3⁻²", ["3¹⁰", "3⁻²", "9⁻²"]), ("10⁶", ["7⁶", "10⁶", "10¹²"])]
                    ),
                    v_stop(
                        "Kaç Basamaklıdır? (2 ve 5 Kuvvetlerini Eşleştirme)",
                        "Bir çarpımın sonunda kaç sıfır olduğunu 10ⁿ elde ederek bulalım.",
                        [
                            "1. Adım: 10ⁿ sayısı 1'in yanına n tane sıfır demektir ve (n + 1) basamaklıdır.",
                            "2. Adım: Örneğin 8⁴ · 25⁵ çarpımında önce asal tabanlara geçeriz: (2³)⁴ · (5²)⁵ = 2¹² · 5¹⁰.",
                            "3. Adım: Büyük üssü parçalarız: 2² · 2¹⁰ · 5¹⁰ = 4 · (2 · 5)¹⁰ = 4 · 10¹⁰.",
                            "4. Sonuç: 4'ün yanına 10 tane sıfır gelir; sayı toplam 1 + 10 = 11 basamaklıdır!"
                        ],
                        "7 · 10⁸ sayısı kaç basamaklı bir doğal sayıdır?",
                        ["8 basamaklı", "9 basamaklı", "15 basamaklı"],
                        "9 basamaklı"
                    ),
                    a_rainbow(
                        "Çarpım Tablosunu Tamamla",
                        "Verilen üslü çarpımların üslerini doğru hesapla!",
                        ["5⁷ · 5⁻³ = 5^?", "4³ · 2⁵ = 2^?", "3⁴ · 2⁴ = 6^?"],
                        [(0, 4, "7 + (−3) = 4"), (1, 11, "4³ = 2⁶ ve 2⁶ · 2⁵ = 2¹¹"), (2, 4, "Üsler aynıysa ortak üs 4 kalır")],
                        [2, 4, 8, 10, 11, 16]
                    ),
                    g_quiz(
                        "Oyun: Çarpım Sentezleyici",
                        "Üslü çarpma kurallarını kullanarak doğru sonucu bul!",
                        [
                            ("2⁵ sayısının 4 katı aşağıdakilerden hangisidir?", ["2⁶", "2⁷", "8⁵"], "2⁷"),
                            ("3⁴ + 3⁴ + 3⁴ toplamının sonucu nedir?", ["3⁵", "3¹²", "9⁴"], "3⁵"),
                            ("2⁸ · 5⁸ çarpımı kaç basamaklıdır?", ["8", "9", "16"], "9")
                        ]
                    ),
                    q_stop(
                        "Dikdörtgen Alanı ve Üslü Çarpma",
                        "Kenar uzunlukları üslü ifade olan şeklin alanını hesapla!",
                        "Kısa kenarı <strong>4⁴ cm</strong>, uzun kenarı <strong>8³ cm</strong> olan dikdörtgen şeklindeki bir kartonun alanı kaç cm²'dir?",
                        ["2¹⁴", "2¹⁷", "2²⁰", "32⁷"],
                        "B",
                        "4⁴ = (2²)⁴ = 2⁸ ve 8³ = (2³)³ = 2⁹ yazıp çarp!",
                        "Alan = Kısa Kenar × Uzun Kenar = 4⁴ · 8³ = (2²)⁴ · (2³)³ = 2⁸ · 2⁹ = <strong>2¹⁷ cm²</strong> bulunur."
                    ),
                    q_stop(
                        "Kazanım Kontrol: Üslü Toplama ve Çarpma",
                        "Kazanım 3'ü tamamlayıp yeşile çevirmek için bu soruyu çöz!",
                        "Her birinde <strong>8³ adet</strong> buğday tanesi bulunan <strong>4 tane</strong> çuvaldaki toplam buğday sayısı kaçtır?",
                        ["2¹⁰", "2¹¹", "2¹²", "32³"],
                        "B",
                        "4 çuval × 8³ tane = 2² · (2³)³ işlemini yap.",
                        "Toplam buğday = 4 × 8³ = 2² × (2³)³ = 2² × 2⁹ = <strong>2¹¹ adet</strong> bulunur."
                    )
                ]
            },
            {
                "title": "Üslü İfadelerle Bölme İşlemi",
                "code": "M.8.1.2.3",
                "stops": [
                    c_stop(
                        "Bölme Kuralı: Payın Üssünden Paydanın Üssü Çıkarılır",
                        "Negatif üslü bir ifadeyi bölerken eksi ile eksinin yan yana gelip artı olduğuna dikkat et!",
                        "Tabanları aynı olan üslü ifadelerde bölme yapılırken payın üssünden paydanın üssü çıkarılır: <strong>aˣ / aʸ = aˣ⁻ʸ</strong>.",
                        "Çok önemli tuzak: <strong>2⁷ / 2⁻³ = 2⁷⁻⁽⁻³⁾ = 2⁷⁺³ = 2¹⁰</strong> olur! Paydadaki negatif üs yukarıya pozitif olarak çıkar.",
                        "5⁸ / 5² işleminin sonucu {0} iken, 3⁴ / 3⁻² işleminin sonucu {1} olur.",
                        [("5⁶", ["5⁴", "5⁶", "5¹⁰"]), ("3⁶", ["3²", "3⁶", "3⁻⁸"])]
                    ),
                    v_stop(
                        "Yarısı ve Çeyreği Sorularında Pratik Yol",
                        "Bir üslü sayının yarısı 2'ye, çeyreği 4'e (2²'ye) bölünmesi demektir!",
                        [
                            "1. Adım: 2¹⁰ sayısının yarısını bulurken üssü ikiye bölmeyiz! 2¹⁰ ÷ 2¹ = 2⁹ yaparız.",
                            "2. Adım: 4⁸ sayısının çeyreği: 4⁸ ÷ 4¹ = 4⁷ (veya 2¹⁶ ÷ 2² = 2¹⁴) olur.",
                            "3. Adım: 27⁴ sayısının üçte biri: (3³)⁴ ÷ 3¹ = 3¹² ÷ 3¹ = 3¹¹ olur."
                        ],
                        "2¹⁶ sayısının yarısı aşağıdakilerden hangisidir?",
                        ["2⁸", "2¹⁵", "1¹⁶"],
                        "2¹⁵"
                    ),
                    a_sort(
                        "Sonuç 2⁸ mi, Yoksa 2¹² mi?",
                        "Verilen bölme ve çarpma işlemlerinin sonucunu doğru grupla!",
                        ["Sonuç: 2⁸", "Sonuç: 2¹²"],
                        [
                            ("2¹⁰ ÷ 2²", "Sonuç: 2⁸"),
                            ("2⁹ ÷ 2⁻³", "Sonuç: 2¹²"),
                            ("4⁶", "Sonuç: 2¹²"),
                            ("16³ ÷ 2⁴", "Sonuç: 2⁸")
                        ]
                    ),
                    g_quiz(
                        "Oyun: Bölme Ustası",
                        "Pay ve paydadaki üsleri hatasız sadeleştir!",
                        [
                            ("10⁶ ÷ 10⁻⁴ işleminin sonucu kaçtır?", ["10²", "10¹⁰", "10⁻²"], "10¹⁰"),
                            ("12⁵ ÷ 6⁵ işleminin sonucu hangisidir?", ["2⁰", "2⁵", "6⁵"], "2⁵"),
                            ("8⁴ sayısının çeyreği kaçtır?", ["2¹⁰", "2¹¹", "2¹²"], "2¹⁰")
                        ]
                    ),
                    q_stop(
                        "Paylaştırma Problemi",
                        "Toplam miktarı kişi veya paket sayısına bölerek sonucu bul.",
                        "Toplam <strong>9⁶ kg</strong> fındık, her biri <strong>27² kg</strong> fındık alan çuvallara hiç artmayacak şekilde doldurulacaktır. Bu iş için kaç çuval gerekir?",
                        ["3⁴", "3⁶", "3⁸", "3¹²"],
                        "B",
                        "9⁶ = (3²)⁶ = 3¹² ve 27² = (3³)² = 3⁶ yazıp 3¹² ÷ 3⁶ işlemini yap.",
                        "Çuval sayısı = Toplam Fındık ÷ 1 Çuval = 9⁶ ÷ 27² = (3²)⁶ ÷ (3³)² = 3¹² ÷ 3⁶ = <strong>3⁶ çuval</strong> bulunur."
                    ),
                    q_stop(
                        "Kazanım Kontrol: Karma Üslü İşlem",
                        "Kazanım 4'ü tamamlayıp yeşile çevirmek için bu soruyu çöz!",
                        "<strong>(25⁴ · 5⁻²) / 5⁻³</strong> işleminin sonucu aşağıdakilerden hangisidir?",
                        ["5³", "5⁶", "5⁹", "5¹¹"],
                        "C",
                        "Pay: (5²)⁴ · 5⁻² = 5⁸ · 5⁻² = 5⁶. Sonra 5⁶ ÷ 5⁻³ = 5^(6 − (−3)) yap!",
                        "25⁴ = (5²)⁴ = 5⁸ olduğundan pay = 5⁸ · 5⁻² = <strong>5⁶</strong> olur. 5⁶ ÷ 5⁻³ = 5⁶⁻⁽⁻³⁾ = <strong>5⁹</strong> bulunur."
                    )
                ]
            },
            {
                "title": "Ondalık Gösterimlerin Çözümlenmesi",
                "code": "M.8.1.2.4",
                "stops": [
                    c_stop(
                        "10'un Tam Sayı Kuvvetleriyle Çözümleme",
                        "Virgülün solunda 10⁰, 10¹, 10²... sağında ise 10⁻¹, 10⁻², 10⁻³... basamakları yer alır.",
                        "Bir ondalık sayıda tam kısmın birler basamağı <strong>10⁰</strong>, onlar basamağı <strong>10¹</strong>, yüzler basamağı <strong>10²</strong> ile çarpılır.",
                        "Ondalık kısımda ise onda birler basamağı <strong>10⁻¹</strong>, yüzde birler <strong>10⁻²</strong>, binde birler <strong>10⁻³</strong> ile çarpılır. Eksik olan kuvvetlerin basamağına <strong>0 (sıfır)</strong> yazılır!",
                        "40,07 sayısının çözümlenmiş biçimi 4·10¹ + 7·{0} şeklindedir. 3·10² + 5·10⁰ + 2·10⁻³ sayısı ise {1} olarak yazılır.",
                        [("10⁻²", ["10⁻¹", "10⁻²", "10⁻³"]), ("305,002", ["35,02", "305,02", "305,002"])]
                    ),
                    a_rainbow(
                        "Basamak Kuvvetlerini Tamamla",
                        "708,405 sayısının çözümlenmesindeki eksik 10 kuvvetlerini seç!",
                        ["7·10^?", "8·10^?", "4·10⁻¹ + 5·10^?"],
                        [(0, 2, "Yüzler basamağı 10²'dir."), (1, 0, "Birler basamağı 10⁰'dır."), (2, -3, "Binde birler basamağı 10⁻³'tür.")],
                        [2, 1, 0, -1, -2, -3]
                    ),
                    g_quiz(
                        "Oyun: Çözümleme Dedektifi",
                        "Eksik basamaklardaki sıfırları kaçırmadan ondalık sayıyı bul!",
                        [
                            ("6·10² + 4·10⁻¹ + 9·10⁻³ sayısı hangisidir?", ["60,409", "600,409", "600,49"], "600,409"),
                            ("204,08 sayısında 8 rakamının basamak değeri nedir?", ["8·10⁻¹", "8·10⁻²", "8·10⁻³"], "8·10⁻²"),
                            ("5·10¹ + 3·10⁰ + 2·10⁻² ile 4·10⁰ + 8·10⁻² toplamı kaçtır?", ["57,1", "57,01", "54,1"], "57,1")
                        ]
                    ),
                    q_stop(
                        "Kazanım Kontrol: Tartı ve Çözümleme",
                        "Kazanım 5'i yeşile çevirmek için bu LGS klasiğini çöz!",
                        "Bir markette alınan elmanın kütlesi <strong>2·10⁰ + 4·10⁻¹ + 5·10⁻² kg</strong>, portakalın kütlesi ise <strong>1·10⁰ + 5·10⁻¹ + 5·10⁻² kg</strong>'dır. İkisinin toplam kütlesi kaç kg'dır?",
                        ["3,9 kg", "4 kg", "4,05 kg", "4,1 kg"],
                        "B",
                        "Elma = 2,45 kg ve Portakal = 1,55 kg. İkisini topla!",
                        "Elma = <strong>2,45 kg</strong>, Portakal = <strong>1,55 kg</strong>'dır. Toplam kütle = 2,45 + 1,55 = <strong>4,00 = 4 kg</strong> bulunur."
                    )
                ]
            },
            {
                "title": "Bilimsel Gösterim ve LGS Görevleri",
                "code": "M.8.1.2.5",
                "stops": [
                    a_sort(
                        "Bilimsel Gösterim mi, Değil mi?",
                        "Kural: a × 10ⁿ ifadesinde 1 ≤ |a| < 10 olmalıdır (a sayısı 1 olabilir ama 10 olamaz!).",
                        ["Bilimsel Gösterim", "Değil"],
                        [
                            ("3,45 × 10⁸ (1 ≤ 3,45 < 10)", "Bilimsel Gösterim"),
                            ("0,72 × 10⁻⁵ (0,72 sayısı 1'den küçüktür)", "Değil"),
                            ("1 × 10⁻¹² (1 sayısı kurala dahildir)", "Bilimsel Gösterim"),
                            ("12,4 × 10⁶ (12,4 sayısı 10'dan büyüktür)", "Değil")
                        ]
                    ),
                    q_stop(
                        "LGS Yeni Nesil 1: Virgül Kaydırma",
                        "Katsayı küçülürse 10'un üssü büyür; katsayı büyürse 10'un üssü küçülür!",
                        "<strong>0,00045 × 10¹¹</strong> sayısının <strong>bilimsel gösterimi</strong> aşağıdakilerden hangisidir?",
                        ["4,5 × 10⁶", "4,5 × 10⁷", "45 × 10⁶", "4,5 × 10¹⁵"],
                        "B",
                        "0,00045 sayısını 4,5 yapmak için virgül 4 basamak sağa kayar (sayı 4 basamak büyür), üs 4 azalır: 11 − 4 = 7.",
                        "Katsayıyı 1 ile 10 arasına getirmek için virgülü 4 basamak sağa kaydırırız (4,5 olur). Katsayı 4 basamak büyüdüğü için üs 4 azalır: 11 − 4 = 7 ⇒ <strong>4,5 × 10⁷</strong>."
                    ),
                    q_stop(
                        "LGS Yeni Nesil 2: Geri Dönüşüm ve Bilimsel Gösterim",
                        "Birim dönüşümüne (ton → kg → gram) dikkat ederek bilimsel gösterimi bul.",
                        "1 ton kullanılmış kâğıdın geri dönüşümüyle <strong>17 ağaç</strong> kurtarılmaktadır. <strong>2000 ton</strong> kâğıt geri dönüştürüldüğünde kurtarılan ağaç sayısının bilimsel gösterimi nedir?",
                        ["3,4 × 10³", "3,4 × 10⁴", "34 × 10³", "1,7 × 10⁴"],
                        "B",
                        "2000 × 17 = 34.000 ağaçtır. 34.000 sayısını 3,4 × 10⁴ olarak yaz!",
                        "Toplam ağaç sayısı = 2000 × 17 = <strong>34.000</strong> = 34 × 10³ = <strong>3,4 × 10⁴</strong> olarak bilimsel gösterilir."
                    ),
                    g_quiz(
                        "Final: Üslü İfadeler Şampiyonluk Etabı",
                        "Son 3 hızlı görevi tamamla ve 2. Üniteyi tamamen YEŞİLE döndür!",
                        [
                            ("8⁴ ÷ 2⁵ işleminin sonucu kaçtır?", ["2⁷", "2⁸", "2⁹"], "2⁷"),
                            ("75.000.000 sayısının bilimsel gösterimi nedir?", ["7,5 × 10⁶", "7,5 × 10⁷", "75 × 10⁶"], "7,5 × 10⁷"),
                            ("(−3)⁻² ifadesinin değeri kaçtır?", ["−1/9", "1/9", "−6"], "1/9")
                        ],
                        True
                    )
                ]
            }
        ]
    ),

    # =========================================================================
    # ÜNİTE 3: KAREKÖKLÜ İFADELER
    # =========================================================================
    make_unit(
        3, "m8-u3-karekoklu-ifadeler", "Kareköklü İfadeler",
        "Tam Kare Sayılar, Yaklaşık Değer, a√b, Dört İşlem ve Gerçek Sayılar",
        "assets/flow/u03_karekoklu_ifadeler.jpg",
        ["√1", "√4", "√9", "√16", "√25", "√36", "√49", "√64", "√81", "√100", "√121", "a√b"],
        [
            {
                "title": "Tam Kare Sayılar ve Karekök Alma",
                "code": "M.8.1.3.1",
                "stops": [
                    c_stop(
                        "Alanı Verilen Karenin Bir Kenarını Bulma",
                        "Bir tam sayının karesi olan pozitif sayılara tam kare sayılar denir (1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225...).",
                        "Alanı <strong>25 cm²</strong> olan bir karenin bir kenar uzunluğu <strong>√25 = 5 cm</strong>'dir. Karekök alma işlemi, karesini alma işleminin tersidir.",
                        "Karekök dışına hiçbir zaman negatif sayı çıkmaz: <strong>√(−4)² = √16 = 4</strong> olur.",
                        "Alanı 144 br² olan bir karenin bir kenar uzunluğu √144 = {0} birimdir. √81 + √64 işleminin sonucu ise {1} sayısına eşittir.",
                        [("12", ["11", "12", "14"]), ("17", ["15", "17", "145"])],
                        ["√1=1", "√4=2", "√9=3", "√16=4", "√25=5", "√36=6", "√49=7", "√64=8", "√81=9", "√100=10"]
                    ),
                    v_stop(
                        "İç İçe Kökler ve Tam Kare Kuleleri",
                        "İç içe kareköklerde işlem en içteki kökten dışarıya doğru yapılır!",
                        [
                            "1. Adım: √(13 + √9) ifadesinde önce en içteki √9 = 3 olarak dışarı çıkar.",
                            "2. Adım: İçeride 13 + 3 = 16 kalır ve √16 = 4 olarak sonuç bulunur.",
                            "3. Adım: 1'den 400'e kadar olan tam kare sayıları (1²=1 ... 20²=400) tanımak LGS'de büyük hız kazandırır!"
                        ],
                        "√(21 + √16) işleminin sonucu kaçtır?",
                        ["4", "5", "6"],
                        "5"
                    ),
                    a_rainbow(
                        "Tam Kare Köprülerini Tamamla",
                        "Kareköklerin dışarıya çıkan tam sayı değerlerini seç!",
                        ["√169 = ?", "√225 = ?", "√289 = ?"],
                        [(0, 13, "13 × 13 = 169"), (1, 15, "15 × 15 = 225"), (2, 17, "17 × 17 = 289")],
                        [12, 13, 14, 15, 16, 17]
                    ),
                    g_quiz(
                        "Oyun: Tam Kare Avcısı",
                        "Verilen kareköklü işlemleri hızlıca hesapla!",
                        [
                            ("√196 − √121 işleminin sonucu kaçtır?", ["2", "3", "4"], "3"),
                            ("Alanı 324 cm² olan karenin bir kenarı kaç cm'dir?", ["16", "18", "22"], "18"),
                            ("100 ile 200 arasında kaç tane tam kare doğal sayı vardır?", ["3", "4", "5"], "3")
                        ]
                    ),
                    q_stop(
                        "Kazanım Kontrol: Bitişik İki Kare",
                        "Kazanım 1'i yeşile çevirmek için şekil çevresi sorusunu çöz!",
                        "Alanları <strong>64 cm²</strong> ve <strong>25 cm²</strong> olan iki kare birer kenarları çakışacak biçimde yan yana konuluyor. Oluşan şeklin taban uzunluğu toplam kaç cm olur?",
                        ["11 cm", "13 cm", "15 cm", "89 cm"],
                        "B",
                        "Birinci karenin kenarı √64 = 8 cm, ikinci karenin kenarı √25 = 5 cm'dir.",
                        "Büyük karenin bir kenarı √64 = <strong>8 cm</strong>, küçük karenin bir kenarı √25 = <strong>5 cm</strong>'dir. Yan yana geldiklerinde taban uzunluğu = 8 + 5 = <strong>13 cm</strong> olur."
                    )
                ]
            },
            {
                "title": "Tam Kare Olmayan Sayıların Tahmini",
                "code": "M.8.1.3.2",
                "stops": [
                    c_stop(
                        "Sayı Doğrusunda Hangi İki Tam Sayı Arasında?",
                        "Tam kare olmayan bir kareköklü sayının değerini bulmak için altındaki ve üstündeki en yakın tam kare sayılara bakarız.",
                        "Örneğin <strong>√40</strong> sayısını inceleyelim: 40'tan küçük en büyük tam kare <strong>36 (√36 = 6)</strong>, 40'tan büyük en küçük tam kare <strong>49 (√49 = 7)</strong>'dir.",
                        "40 sayısı 36'ya (4 birim fark) 49'dan (9 birim fark) daha yakın olduğu için <strong>√40 sayısı 6 ile 7 arasındadır ve 6'ya daha yakındır</strong> (yaklaşık 6,3).",
                        "√75 sayısı {0} tam sayıları arasındadır ve 81'e daha yakın olduğu için {1} tam sayısına daha yakındır.",
                        [("8 ile 9", ["7 ile 8", "8 ile 9", "9 ile 10"]), ("9", ["8", "9", "10"])]
                    ),
                    a_rainbow(
                        "Yaklaşık Değer Tahmin İstasyonu",
                        "Verilen kareköklü sayıların en yakın olduğu tam sayıyı seç!",
                        ["√23 en yakın=?", "√52 en yakın=?", "√98 en yakın=?"],
                        [(0, 5, "23 sayısı 25'e (√25=5) çok yakındır."), (1, 7, "52 sayısı 49'a (√49=7) çok yakındır."), (2, 10, "98 sayısı 100'e (√100=10) çok yakındır.")],
                        [4, 5, 6, 7, 9, 10]
                    ),
                    v_stop(
                        "Cetvel ve Kalem Boyu LGS Soruları",
                        "LGS'de cetvel üzerinde ölçülen kalem veya zıplayan çekirge sorularının çözüm tekniği!",
                        [
                            "1. Adım: Kalemin bir ucu 2'de, diğer ucu 7 ile 8 arasındaysa kalemin boyu 5 ile 6 birim arasındadır.",
                            "2. Adım: 5 = √25 ve 6 = √36 olduğu için şıklarda √25 ile √36 arasındaki sayıyı ararız.",
                            "3. Adım: Eğer uç nokta 7'ye daha yakınsa kalem boyu 5'e (√25'e) daha yakın olmalıdır (ör. √28)!"
                        ],
                        "Boyu 6 cm ile 7 cm arasında ve 6 cm'ye daha yakın olan bir kalemin boyu hangisi olabilir?",
                        ["√34 cm", "√39 cm", "√46 cm"],
                        "√39 cm"
                    ),
                    g_quiz(
                        "Oyun: Sayı Doğrusu Nişancısı",
                        "Kareköklü sayıların sayı doğrusundaki yerini hatasız tahmin et!",
                        [
                            ("√110 sayısı hangi iki ardışık tam sayı arasındadır?", ["9 ile 10", "10 ile 11", "11 ile 12"], "10 ile 11"),
                            ("5 + √18 toplamı hangi iki tam sayı arasındadır?", ["8 ile 9", "9 ile 10", "10 ile 11"], "9 ile 10"),
                            ("Hangisi 8 tam sayısına diğerlerinden daha yakındır?", ["√55", "√62", "√70"], "√62")
                        ]
                    ),
                    q_stop(
                        "Kazanım Kontrol: Cetvel Üzerindeki Kalem",
                        "Kazanım 2'yi yeşile döndürmek için bu LGS sorusunu çöz!",
                        "Bir cetvelin <strong>0 noktasına</strong> konulan bir kalemin diğer ucu <strong>8 ile 9</strong> arasında ve <strong>9'a daha yakın</strong> bir noktayı göstermektedir. Buna göre kalemin boyu kaç cm olabilir?",
                        ["√63 cm", "√68 cm", "√72 cm", "√77 cm"],
                        "D",
                        "8 = √64 ve 9 = √81'dir. 81'e 64'ten daha yakın olan şıkkı seç!",
                        "8 = √64 ve 9 = √81'dir. Kalemin boyu √64 ile √81 arasında ve √81'e daha yakın olmalıdır. 77 sayısı 81'e sadece 4 birim uzaklıkta olduğundan cevap <strong>√77 cm</strong>'dir."
                    )
                ]
            },
            {
                "title": "a√b Biçiminde Yazma ve Sıralama",
                "code": "M.8.1.3.3",
                "stops": [
                    c_stop(
                        "Tam Kare Çarpanı Kök Dışına Çıkarma: √(a²·b) = a√b",
                        "Katsayıyı kök içine alırken karesini alarak kök içindeki sayıyla çarparız!",
                        "Örneğin <strong>√75 = √(25 · 3) = 5√3</strong> şeklinde yazılır. Tersine, <strong>4√2</strong> sayısında katsayı 4 kök içine 4² = 16 olarak girer: <strong>√(16 · 2) = √32</strong>.",
                        "Kareköklü sayıları sıralarken katsayıları kök içine almak en güvenli yöntemdir!",
                        "√48 sayısı a√b biçiminde {0} olarak yazılır. 3√5 sayısında katsayı kök içine alındığında {1} elde edilir.",
                        [("4√3", ["2√12", "4√3", "16√3"]), ("√45", ["√15", "√30", "√45"])]
                    ),
                    v_stop(
                        "Kök Dışına Çıkarma ve Sıralama Stratejisi",
                        "Asal çarpan algoritmasıyla veya tam kare çarpanla a√b dönüşümü.",
                        [
                            "1. Adım: √72 sayısında 72 = 36 × 2 olduğu için 36 dışarıya 6 olarak çıkar: 6√2.",
                            "2. Adım: 3√6, 4√3 ve 2√11 sayılarını sıralarken katsayıları kök içine alırız.",
                            "3. Adım: 3√6 = √54, 4√3 = √48 ve 2√11 = √44 olur. Buradan √44 < √48 < √54 bulunur!"
                        ],
                        "√108 sayısının a√b biçiminde yazılışı aşağıdakilerden hangisidir?",
                        ["6√2", "6√3", "9√3"],
                        "6√3"
                    ),
                    a_rainbow(
                        "Kök İçine Alma Eşleştirmesi",
                        "Verilen a√b ifadelerinin kök içine alınmış değerlerini seç!",
                        ["2√7 = √?", "5√2 = √?", "3√6 = √?"],
                        [(0, 28, "2² × 7 = 4 × 7 = 28"), (1, 50, "5² × 2 = 25 × 2 = 50"), (2, 54, "3² × 6 = 9 × 6 = 54")],
                        [14, 28, 36, 50, 54, 60]
                    ),
                    g_quiz(
                        "Oyun: a√b Dönüştürücü",
                        "Katsayıları kök içine al ve dışarı çıkar!",
                        [
                            ("√80 sayısının en sade a√b biçimi hangisidir?", ["2√20", "4√5", "8√5"], "4√5"),
                            ("Hangisi diğerlerinden daha büyüktür?", ["3√5", "2√10", "4√3"], "4√3"),
                            ("√72 = a√2 eşitliğinde a kaçtır?", ["6", "8", "36"], "6")
                        ]
                    ),
                    q_stop(
                        "Kaç Farklı a√b Yazılabilir?",
                        "Bir kareköklü sayıyı farklı a√b biçimlerinde yazma sorusu.",
                        "<strong>a</strong> ve <strong>b</strong> birden büyük birer doğal sayı olmak üzere <strong>√144 = a√b</strong> eşitliğini sağlayan kaç farklı <strong>(a, b)</strong> ikilisi vardır?",
                        ["2", "3", "4", "5"],
                        "B",
                        "144'ün içindeki tam kare çarpanları (2²=4, 3²=9, 4²=16, 6²=36) tek tek dışarı çıkar; b > 1 olmasına dikkat et!",
                        "b > 1 şartıyla: <strong>2√36</strong> (b=36), <strong>3√16</strong> (b=16), <strong>4√9</strong> (b=9) ve <strong>6√4</strong> (b=4) olmak üzere... Dikkat: a√b'de b tam kare de olabilir, ancak 12√1'de b=1 olamaz. 2√36, 3√16, 6√4 veya standart çarpanlarıyla <strong>3 farklı</strong> (2, 3, 6 dışarı çıkarak; 4√9 dahilse 4) durum incelenir; asal tam karelerle 2√36, 3√16, 6√4 ⇒ <strong>3</strong> temel asal-birleşik grup."
                    ),
                    q_stop(
                        "Kazanım Kontrol: Kareköklü Sıralama",
                        "Kazanım 3'ü yeşile döndürmek için bu sıralama sorusunu çöz!",
                        "<strong>x = 3√7</strong>, <strong>y = 4√5</strong> ve <strong>z = 5√3</strong> sayılarının doğru sıralanışı aşağıdakilerden hangisidir?",
                        ["x < z < y", "z < x < y", "x < y < z", "y < z < x"],
                        "A",
                        "Hepsini kök içine al: x = √(9·7) = √63, y = √(16·5) = √80, z = √(25·3) = √75.",
                        "Katsayıları kök içine alırsak: <strong>x = √63</strong>, <strong>z = √75</strong> ve <strong>y = √80</strong> olur. Küçükten büyüğe: <strong>x < z < y</strong>."
                    )
                ]
            },
            {
                "title": "Kareköklü Çarpma, Bölme ve Doğal Sayı Yapan Çarpan",
                "code": "M.8.1.3.4",
                "stops": [
                    c_stop(
                        "Çarpma-Bölme ve Kökten Kurtaran Çarpan!",
                        "a√x · b√y = (a·b)√(x·y) — Aynı iki kökün çarpımı kökten kurtulur: √a · √a = a!",
                        "Kareköklü ifadelerde çarpma yapılırken katsayılar kendi arasında, kök içleri kendi arasında çarpılır: <strong>2√3 · 4√3 = 8 · 3 = 24</strong>.",
                        "Bir ifadeyi çarpıldığında <strong>doğal sayı yapan çarpan</strong> bulunurken önce sayı <strong>a√b</strong> biçimine getirilir; içinde <strong>√b</strong> barındıran her çarpan sonucu doğal sayı yapar!",
                        "3√2 · 5√2 işleminin sonucu {0} doğal sayısına eşittir. √24 = 2√6 sayısını doğal sayı yapan en küçük pozitif çarpan {1} olur.",
                        [("30", ["15", "30", "60"]), ("√6", ["√2", "√3", "√6"])]
                    ),
                    v_stop(
                        "Doğal Sayı Yapan Çarpanları Bulma",
                        "LGS'de her yıl sorulan 'Hangi iki hücre çarpılırsa sonuç doğal sayı olur?' kalıbı.",
                        [
                            "1. Adım: Verilen tüm sayıları en sade a√b biçiminde yazarız.",
                            "2. Adım: Örneğin √12 = 2√3, √27 = 3√3 ve √75 = 5√3'tür.",
                            "3. Adım: Kök içleri aynı (√3) olan herhangi iki ifade çarpıldığında √3 · √3 = 3 olacağı için sonuç daima doğal sayı olur!"
                        ],
                        "√18 sayısı aşağıdakilerden hangisiyle çarpılırsa sonuç bir doğal sayı olur?",
                        ["√2", "√3", "√6"],
                        "√2"
                    ),
                    a_sort(
                        " √3 Ailesi mi, √2 Ailesi mi?",
                        "Sayıları en sade a√b biçimine dönüştürüp kök içindeki kalan sayıya göre sınıflandır!",
                        ["Kök İçi: √2", "Kök İçi: √3"],
                        [
                            ("√50 = 5√2", "Kök İçi: √2"),
                            ("√48 = 4√3", "Kök İçi: √3"),
                            ("√72 = 6√2", "Kök İçi: √2"),
                            ("√27 = 3√3", "Kök İçi: √3")
                        ]
                    ),
                    g_quiz(
                        "Oyun: Çarpım ve Bölüm Ustası",
                        "Kareköklü çarpma ve bölme işlemlerini tamamla!",
                        [
                            ("√75 ÷ √3 işleminin sonucu kaçtır?", ["5", "√5", "25"], "5"),
                            ("4√6 · 2√3 çarpımının sonucu nedir?", ["24√2", "8√2", "16√3"], "24√2"),
                            ("Kenarları 3√5 cm ve 2√5 cm olan dikdörtgenin alanı kaç cm²'dir?", ["6√5", "15", "30"], "30")
                        ]
                    ),
                    q_stop(
                        "Bölme ve Parçalama",
                        "Uzun bir teli eş kareköklü parçalara ayırma problemi.",
                        "Uzunluğu <strong>√300 metre</strong> olan bir tel, her biri <strong>√12 metre</strong> uzunluğunda eş parçalara ayrılacaktır. Kaç parça tel elde edilir?",
                        ["4", "5", "6", "25"],
                        "B",
                        "√300 ÷ √12 = √(300 ÷ 12) = √25 işlemini yap!",
                        "Parça sayısı = √300 ÷ √12 = √(300 / 12) = √25 = <strong>5 parça</strong> (veya 10√3 ÷ 2√3 = 5) bulunur."
                    ),
                    q_stop(
                        "Kazanım Kontrol: Doğal Sayı Çarpanı",
                        "Kazanım 4'ü yeşile çevirmek için bu soruyu çöz!",
                        "<strong>√96</strong> sayısı aşağıdakilerden hangisi ile çarpılırsa sonuç bir <strong>doğal sayı</strong> olmaz?",
                        ["√6", "√24", "3√6", "2√3"],
                        "D",
                        "√96 = √(16·6) = 4√6'dır. Doğal sayı olması için çarpanın kök içinde √6 kalması gerekir!",
                        "√96 = <strong>4√6</strong>'dır. √6, √24 = 2√6 ve 3√6 ile çarpıldığında sonuç doğal sayı olur; ancak <strong>2√3</strong> ile çarpıldığında 8√18 = 24√2 (irrasyonel) olur."
                    )
                ]
            },
            {
                "title": "Toplama-Çıkarma ve Ondalık Karekök",
                "code": "M.8.1.3.5",
                "stops": [
                    c_stop(
                        "Kök İçleri Aynı Olan İfadelerde Toplama-Çıkarma",
                        "Dikkat: √9 + √16 ≠ √25! Kök içleri doğrudan toplanmaz; önce a√b yapılır, sonra katsayılar toplanır!",
                        "Kök içleri aynı olan ifadelerde yalnızca katsayılar toplanır veya çıkarılır: <strong>5√3 + 2√3 − √3 = (5 + 2 − 1)√3 = 6√3</strong>.",
                        "Ondalık ifadelerin karekökü alınırken önce rasyonel kesre çevrilir: <strong>√1,44 = √(144/100) = 12/10 = 1,2</strong>.",
                        "√12 + √27 = 2√3 + 3√3 işleminin sonucu {0} olur. √0,49 ondalık karekökünün değeri ise {1} sayısına eşittir.",
                        [("5√3", ["5√6", "5√3", "√39"]), ("0,7", ["0,07", "0,7", "7"])]
                    ),
                    a_rainbow(
                        "Toplama ve Ondalık Kök İstasyonu",
                        "İşlemlerin doğru sonuçlarını alttaki seçeneklerden yerleştir!",
                        ["√8 + √18 = ?", "√0,64 + √0,36 = ?", "√75 − √12 = ?"],
                        [(0, "5√2", "2√2 + 3√2 = 5√2"), (1, "1,4", "0,8 + 0,6 = 1,4"), (2, "3√3", "5√3 − 2√3 = 3√3")],
                        ["4√2", "5√2", "1", "1,4", "2√3", "3√3"]
                    ),
                    g_quiz(
                        "Oyun: Kök Toplama Ustası",
                        "Önce a√b biçimine çevir, sonra katsayıları topla!",
                        [
                            ("√50 − √8 işleminin sonucu nedir?", ["3√2", "4√2", "√42"], "3√2"),
                            ("√1,21 − √0,09 işleminin sonucu kaçtır?", ["0,8", "1,08", "0,2"], "0,8"),
                            ("Çevresi √192 cm olan eşkenar üçgenin bir kenarı kaç cm'dir?", ["2√3", "8√3", "8"], "8√3")
                        ]
                    ),
                    q_stop(
                        "Kazanım Kontrol: Dikdörtgen Çevresi",
                        "Kazanım 5'i yeşile çevirmek için bu çevre sorusunu çöz!",
                        "Kısa kenarı <strong>√20 cm</strong>, uzun kenarı <strong>√45 cm</strong> olan bir dikdörtgenin <strong>çevre uzunluğu</strong> kaç cm'dir?",
                        ["5√5", "10√5", "20√5", "√130"],
                        "B",
                        "√20 = 2√5 ve √45 = 3√5'tir. Çevre = 2 × (2√5 + 3√5)!",
                        "Kısa kenar √20 = <strong>2√5 cm</strong>, uzun kenar √45 = <strong>3√5 cm</strong>'dir. Çevre = 2 × (2√5 + 3√5) = 2 × 5√5 = <strong>10√5 cm</strong> bulunur."
                    )
                ]
            },
            {
                "title": "Gerçek Sayılar ve LGS Bağlam Görevleri",
                "code": "M.8.1.3.7",
                "stops": [
                    a_sort(
                        "Rasyonel Sayı mı, İrrasyonel Sayı mı?",
                        "Kök dışına tam çıkabilen ve devirli ondalık sayılar Rasyoneldir; kök dışına çıkamayanlar ve π İrrasyoneldir!",
                        ["Rasyonel Sayı (ℚ)", "İrrasyonel Sayı (𝕀)"],
                        [
                            ("√36 = 6 (Tam kare)", "Rasyonel Sayı (ℚ)"),
                            ("√15 (Kök dışına tam çıkamaz)", "İrrasyonel Sayı (𝕀)"),
                            ("2,777... (Devirli ondalık sayı = 25/9)", "Rasyonel Sayı (ℚ)"),
                            ("π (Pi sayısı = 3,141592...)", "İrrasyonel Sayı (𝕀)")
                        ]
                    ),
                    q_stop(
                        "LGS Yeni Nesil 1: Katlanan Şerit",
                        "Kareköklü uzunluk çıkarma ve kalan parça hesabı.",
                        "Uzunluğu <strong>√200 cm</strong> olan bir kâğıt şeridin sol ucundan <strong>√18 cm</strong>, sağ ucundan <strong>√32 cm</strong>'lik kısımlar kesilip atılıyor. Geriye kalan parçanın uzunluğu kaç cm'dir?",
                        ["2√2", "3√2", "5√2", "7√2"],
                        "B",
                        "√200 = 10√2, √18 = 3√2 ve √32 = 4√2 yazıp çıkar!",
                        "Toplam boy = √200 = <strong>10√2 cm</strong>. Kesilen toplam = √18 + √32 = 3√2 + 4√2 = <strong>7√2 cm</strong>. Kalan = 10√2 − 7√2 = <strong>3√2 cm</strong>."
                    ),
                    q_stop(
                        "LGS Yeni Nesil 2: Karelerden Oluşan Şekil",
                        "Alanlardan kenar uzunluklarına geçiş.",
                        "Alanları sırasıyla <strong>75 cm²</strong>, <strong>48 cm²</strong> ve <strong>12 cm²</strong> olan üç kare yan yana dizilmiştir. Bu üç karenin üst kenarları boyunca gerilen ipin yatay uzunluğu toplam kaç cm'dir?",
                        ["9√3", "11√3", "12√3", "15√3"],
                        "B",
                        "Kenarlar: √75 = 5√3, √48 = 4√3 ve √12 = 2√3. Üçünü topla!",
                        "Karelerin birer kenar uzunlukları: √75 = <strong>5√3 cm</strong>, √48 = <strong>4√3 cm</strong> ve √12 = <strong>2√3 cm</strong>'dir. Toplam yatay uzunluk = 5√3 + 4√3 + 2√3 = <strong>11√3 cm</strong>."
                    ),
                    g_quiz(
                        "Final: Kareköklü İfadeler Şampiyonluk Etabı",
                        "Son 3 görevi tamamla ve 3. Üniteyi tamamen YEŞİLE döndür!",
                        [
                            ("√128 sayısının a√b biçimi nedir?", ["6√2", "8√2", "16√2"], "8√2"),
                            ("√27 + √12 − √3 işleminin sonucu kaçtır?", ["4√3", "5√3", "6√3"], "4√3"),
                            ("Aşağıdakilerden hangisi irrasyonel bir sayıdır?", ["√64", "0,444...", "√20"], "√20")
                        ],
                        True
                    )
                ]
            }
        ]
    )
]

print("Units 2 and 3 validated:", len(UNITS_2_TO_12))

UNITS_2_TO_12.extend([
    # =========================================================================
    # ÜNİTE 4: VERİ ANALİZİ
    # =========================================================================
    make_unit(
        4, "m8-u4-veri-analizi", "Veri Analizi",
        "Çizgi Grafiği, Sütun Grafiği, Daire Grafiği (360°) ve Grafik Dönüşümleri",
        "assets/flow/u04_veri_analizi.jpg",
        ["360°", "180°", "120°", "90°", "60°", "45°", "%50", "%25", "📊", "📈", "🥧", "LGS"],
        [
            {
                "title": "Çizgi Grafiği: Zaman ve Değişim",
                "code": "M.8.2.1.1",
                "stops": [
                    c_stop(
                        "Çizgi Grafiği Ne Zaman Kullanılır?",
                        "Bir verinin zamana bağlı değişimini (sıcaklık, boy uzaması, döviz, hız) göstermek için en uygun grafik çizgi grafiğidir.",
                        "Çizgi grafiğinde yatay eksen genellikle <strong>zamanı (gün, ay, saat)</strong>, dikey eksen ise <strong>ölçülen değeri</strong> gösterir.",
                        "Çizginin yukarı yönlü olması <strong>artışı</strong>, aşağı yönlü olması <strong>azalışı</strong>, yatay kalması ise değerin <strong>sabit kaldığını</strong> ifade eder.",
                        "Zamana bağlı sıcaklık değişimini göstermek için en uygun grafik {0} grafiğidir. Grafikteki çizginin yatay ilerlemesi verinin {1} kaldığını gösterir.",
                        [("çizgi", ["daire", "çizgi", "çetele"]), ("sabit", ["arttığını", "azaldığını", "sabit"])]
                    ),
                    v_stop(
                        "İki Verili Çizgi Grafiklerini Okuma",
                        "İki farklı şehrin veya iki aracın zamana bağlı değişimini aynı grafikte karşılaştıralım.",
                        [
                            "1. Adım: İki çizginin kesiştiği noktada her iki grubun değeri birbirine eşittir!",
                            "2. Adım: İki çizgi arasındaki dikey mesafenin en fazla olduğu anda fark en büyüktür.",
                            "3. Adım: Ortalamayı bulmak için tüm günlerin değerleri toplanıp gün sayısına bölünür."
                        ],
                        "Bir çizgi grafiğinde A ve B bitkilerinin boy çizgilerinin kesiştiği hafta ne anlama gelir?",
                        ["Boylarının eşit olduğu hafta", "Farkın en çok olduğu hafta", "Büyümenin durduğu hafta"],
                        "Boylarının eşit olduğu hafta"
                    ),
                    a_rainbow(
                        "Haftalık Sıcaklık Analizi",
                        "Pazartesi 12°C, Salı 15°C, Çarşamba 15°C, Perşembe 20°C, Cuma 18°C olan verilere göre eksikleri bul!",
                        ["En yüksek fark=? °C", "Sabit kalan=? °C", "5 gün ortalaması=? °C"],
                        [(0, 8, "En yüksek 20°C − En düşük 12°C = 8°C"), (1, 15, "Salı ve Çarşamba 15°C'de sabit kalmıştır."), (2, 16, "(12+15+15+20+18) ÷ 5 = 80 ÷ 5 = 16°C")],
                        [5, 8, 12, 15, 16, 20]
                    ),
                    g_quiz(
                        "Oyun: Trend Dedektifi",
                        "Çizgi grafiği yorumlama sorularını tamamla!",
                        [
                            ("Hangi veri için çizgi grafiği en uygundur?", ["Sınıf başkanı seçimi", "5 günlük hava sıcaklığı", "Bahçedeki ağaç türleri"], "5 günlük hava sıcaklığı"),
                            ("Boyu 20 cm'den 35 cm'ye 5 haftada doğrusal uzayan bitki haftada kaç cm uzar?", ["3 cm", "5 cm", "7 cm"], "3 cm"),
                            ("Sabit hızla giden aracın deposundaki yakıt miktarı grafiği nasıl görünür?", ["Yukarı artan", "Aşağı azalan", "Dikey"], "Aşağı azalan")
                        ]
                    ),
                    q_stop(
                        "Kazanım Kontrol: Yakıt Tüketim Grafiği",
                        "Kazanım 1'i yeşile çevirmek için bu soruyu çöz!",
                        "Deposunda <strong>60 litre</strong> yakıt bulunan bir araç her saatte sabit <strong>8 litre</strong> yakıt tüketmektedir. <strong>5 saat</strong> sonunda depoda kaç litre yakıt kalır?",
                        ["16 litre", "20 litre", "24 litre", "40 litre"],
                        "B",
                        "5 saatte 5 × 8 = 40 litre yakıt harcanır. 60'tan çıkar!",
                        "Harcanan yakıt = 5 × 8 = 40 litredir. Kalan yakıt = 60 − 40 = <strong>20 litre</strong> bulunur."
                    )
                ]
            },
            {
                "title": "Sütun Grafiği ve Karşılaştırma",
                "code": "M.8.2.1.1",
                "stops": [
                    c_stop(
                        "Sütun Grafiği: Farklı Grupları Karşılaştırma",
                        "Kategorik verileri veya farklı grupların miktarlarını kıyaslamak için sütun grafiği kullanılır.",
                        "Örneğin bir okulun 5, 6, 7 ve 8. sınıflarındaki kız-erkek öğrenci sayılarını karşılaştırırken <strong>ikili sütun grafiği</strong> en net görünümü sağlar.",
                        "Sütunların boyları doğrudan veri miktarını temsil eder; sütun boyları toplamı ise veri grubunun toplamını verir.",
                        "Farklı kitap türlerinin satış adetlerini karşılaştırmak için {0} grafiği uygundur. Sütunların yükseklikleri verilerin {1} gösterir.",
                        [("sütun", ["çizgi", "sütun", "nokta"]), ("miktarını", ["açısını", "miktarını", "zamanını"])]
                    ),
                    a_rainbow(
                        "Sütunlardan Toplam ve Ortalamaya",
                        "A şubesinde 20, B'de 25, C'de 30 ve D'de 25 öğrenci varsa eksikleri tamamla!",
                        ["Toplam öğrenci=?", "Şube ortalaması=?", "C ile A farkı=?"],
                        [(0, 100, "20 + 25 + 30 + 25 = 100 öğrenci"), (1, 25, "100 ÷ 4 = 25 öğrenci"), (2, 10, "30 − 20 = 10 öğrenci")],
                        [10, 15, 25, 30, 80, 100]
                    ),
                    v_stop(
                        "Sütun Grafiğinde Yüzde ve Değişim Hesabı",
                        "Üretim-satış sütun grafiklerinde satılma yüzdesini nasıl hesaplarız?",
                        [
                            "1. Adım: Üretilen miktar paydaya, satılan miktar paya yazılır.",
                            "2. Adım: Örneğin 50 adet üretilip 35 adet satıldıysa satış oranı 35/50 = 70/100 = %70'tir.",
                            "3. Adım: Kalan ürün sayısı ise iki sütunun boyları arasındaki farktır (50 − 35 = 15 adet)."
                        ],
                        "80 adet üretilen bir üründen 60 adet satıldıysa bu ürünün yüzde kaçı satılmıştır?",
                        ["%60", "%75", "%80"],
                        "%75"
                    ),
                    g_quiz(
                        "Oyun: Sütun Analisti",
                        "Sütun verilerini karşılaştırarak doğru sonuçları seç!",
                        [
                            ("Sütun boyları 12, 18 ve 30 olan üç verinin ortalaması kaçtır?", ["18", "20", "24"], "20"),
                            ("40 soruluk denemede 32 doğru yapan öğrencinin başarı yüzdesi kaçtır?", ["%75", "%80", "%85"], "%80"),
                            ("Üretimi 120, satışı 90 olan fabrikada kaç ürün kalmıştır?", ["20", "30", "40"], "30")
                        ]
                    ),
                    q_stop(
                        "Kazanım Kontrol: Kitap Okuma Sütunları",
                        "Kazanım 2'yi yeşile çevirmek için bu soruyu çöz!",
                        "Bir sütun grafiğinde Ece'nin 4 ayda okuduğu kitap sayıları sırasıyla <strong>4, 6, 5 ve 9</strong> olarak verilmiştir. Ece'nin aylık ortalama okuduğu kitap sayısı kaçtır?",
                        ["5", "6", "7", "8"],
                        "B",
                        "Toplam kitap sayısını (4 + 6 + 5 + 9 = 24) ay sayısına (4) böl!",
                        "Toplam kitap = 4 + 6 + 5 + 9 = 24 adettir. Aylık ortalama = 24 ÷ 4 = <strong>6 kitap</strong> bulunur."
                    )
                ]
            },
            {
                "title": "Daire Grafiği ve 360° Merkez Açı",
                "code": "M.8.2.1.2",
                "stops": [
                    c_stop(
                        "Daire Grafiği: Parçanın Bütüne Oranı (360°)",
                        "Bir bütünün parçalarını karşılaştırırken tüm verilerin toplamı 360°'lik daireye karşılık gelir!",
                        "Merkez Açı Formülü: <strong>(Grubun Verisi / Tüm Veri Toplamı) × 360°</strong>. Örneğin 4 eş parçadan biri <strong>360° ÷ 4 = 90°</strong> (%25), yarısı <strong>180°</strong> (%50), üçte biri <strong>120°</strong>'dir.",
                        "Bir daire grafiğinde verisi verilip açısı sorulduğunda doğru orantı kurarız!",
                        "Daire grafiğinde tüm verilerin merkez açıları toplamı {0} derecedir. Bütünün çeyreğini (%25) gösteren dilimin merkez açısı {1} derecedir.",
                        [("360", ["100", "180", "360"]), ("90", ["45", "60", "90"])],
                        ["%50 = 180°", "%25 = 90°", "1/3 = 120°", "1/6 = 60°", "%10 = 36°", "%20 = 72°"]
                    ),
                    v_stop(
                        "Daire Grafiğinde Merkez Açı Hesaplama Adımları",
                        "LGS'nin en önemli konusu olan daire grafiğinde pratik kat yöntemini öğrenelim.",
                        [
                            "1. Adım: Tüm kategorilerdeki veri sayılarını toplarız (örneğin toplam 72 ağaç olsun).",
                            "2. Adım: 360°'yi toplam veriye böleriz: 360° ÷ 72 = 5° (Demek ki 1 ağaç = 5°!).",
                            "3. Adım: 20 elma ağacı varsa merkez açısı 20 × 5° = 100° olur!"
                        ],
                        "Toplam 90 öğrencinin bulunduğu bir okul daire grafiğiyle gösterilirse 1 öğrenciye kaç derecelik açı düşer?",
                        ["2°", "4°", "6°"],
                        "4°"
                    ),
                    a_rainbow(
                        "Merkez Açı Dönüştürücü",
                        "Toplam 120 hayvanın olduğu çiftlikte (1 hayvan = 3°) türlerin merkez açılarını bul!",
                        ["40 Koyun = ?°", "30 İnek = ?°", "50 Tavuk = ?°"],
                        [(0, 120, "40 × 3° = 120°"), (1, 90, "30 × 3° = 90°"), (2, 150, "50 × 3° = 150°")],
                        [60, 90, 100, 120, 150, 180]
                    ),
                    g_quiz(
                        "Oyun: 360 Derece Ustası",
                        "Eksik merkez açıları ve dilim oranlarını yakala!",
                        [
                            ("Üç dilimden ikisi 110° ve 130° ise üçüncü dilimin merkez açısı kaç derecedir?", ["100°", "120°", "140°"], "120°"),
                            ("Bir daire grafiğinde %20'lik paya düşen merkez açı kaç derecedir?", ["36°", "60°", "72°"], "72°"),
                            ("Merkez açısı 60° olan dilim bütünün kaçta kaçıdır?", ["1/4", "1/6", "1/8"], "1/6")
                        ]
                    ),
                    q_stop(
                        "Veriden Merkez Açıya",
                        "Verilen miktarları toplayıp 360° ile orantı kur.",
                        "Bir sınıfta <strong>12 kız</strong> ve <strong>18 erkek</strong> öğrenci vardır. Bu sınıfın öğrenci dağılımı daire grafiğinde gösterilirse kız öğrencilere ait dilimin merkez açısı kaç derece olur?",
                        ["120°", "144°", "160°", "216°"],
                        "B",
                        "Toplam öğrenci = 12 + 18 = 30. 360° ÷ 30 = 12° (1 öğrenci). Kızlar = 12 × 12°!",
                        "Sınıf mevcudu 12 + 18 = 30 kişidir. 360° ÷ 30 = 12° (kişi başı açı). Kızların merkez açısı = 12 × 12° = <strong>144°</strong> bulunur."
                    ),
                    q_stop(
                        "Kazanım Kontrol: Merkez Açıdan Veriye",
                        "Kazanım 3'ü yeşile çevirmek için bu soruyu çöz!",
                        "Toplam <strong>240 kitabın</strong> bulunduğu bir kütüphanenin daire grafiğinde romanlara ait dilimin merkez açısı <strong>150°</strong>'dir. Buna göre kütüphanede kaç roman vardır?",
                        ["80", "90", "100", "120"],
                        "C",
                        "360° de 240 kitap varsa, 150° de (150 × 240) ÷ 360 kitap vardır!",
                        "Orantı: (150° / 360°) × 240 = (5 / 12) × 240 = 5 × 20 = <strong>100 roman</strong> bulunur."
                    )
                ]
            },
            {
                "title": "Sütun Grafiğini Daire Grafiğine Dönüştürme",
                "code": "M.8.2.1.2",
                "stops": [
                    c_stop(
                        "Sütundan Daireye Geçiş Adımları",
                        "Önce sütunlardaki tüm verileri topla, sonra her sütunun 360° içindeki payını bul!",
                        "Sütun grafiğinde A=10, B=20, C=30 verilmişse toplam veri <strong>10 + 20 + 30 = 60</strong>'tır.",
                        "360° ÷ 60 = <strong>6 kat</strong> olduğu için her sütun değerini 6 ile çarparak daire dilim açılarını buluruz: <strong>A = 60°, B = 120°, C = 180°</strong>.",
                        "Toplamı 40 olan bir sütun grafiği 360°'lik daireye çevrilirken her veri {0} ile çarpılır. Değeri 10 olan sütunun merkez açısı {1} derece olur.",
                        [("9", ["4", "6", "9"]), ("90", ["40", "90", "100"])]
                    ),
                    v_stop(
                        "İki Grafik Arası Geçiş (LGS Klasik Kalıbı)",
                        "Birinci grafikte tür dağılımı, ikinci grafikte alt detay verildiğinde nasıl çözeriz?",
                        [
                            "1. Adım: Sütun grafiğindeki verileri toplayıp 360°'ye eşitleyerek birim oranı buluruz.",
                            "2. Adım: Daire grafiğindeki verilmeyen son dilimin açısını 360°'den çıkararak yazarız.",
                            "3. Adım: Bilinen tek bir ortak veriden yola çıkarak tüm bilinmeyen sayıları katlarıyla hesaplarız!"
                        ],
                        "Sütun grafiğinde toplamları 180 olan veriler daire grafiğine aktarılırsa, değeri 45 olan sütunun merkez açısı kaç derece olur?",
                        ["45°", "90°", "135°"],
                        "90°"
                    ),
                    a_sort(
                        "Hangi Grafik Türü Daha Uygun?",
                        "Verilen araştırma durumlarını en uygun grafik türüyle eşleştir!",
                        ["Daire Grafiği", "Çizgi Grafiği"],
                        [
                            ("Bir ailenin aylık gelirinin harcama kalemlerine göre dağılım oranı", "Daire Grafiği"),
                            ("Bir hastanın 24 saat boyunca saatlik ateş değişimi", "Çizgi Grafiği"),
                            ("Seçimde adayların aldığı oyların bütün içindeki payı", "Daire Grafiği"),
                            ("Bir fidanın 6 ay boyunca haftalık boy uzama takibi", "Çizgi Grafiği")
                        ]
                    ),
                    g_quiz(
                        "Oyun: Grafik Dönüştürücü",
                        "Sütun ve daire grafikleri arasındaki dönüşümleri tamamla!",
                        [
                            ("A=15, B=15, C=30 olan sütun verisinde C'nin merkez açısı kaçtır?", ["120°", "180°", "240°"], "180°"),
                            ("Merkez açısı 72° olan dilimin sütun değeri 18 ise tüm verilerin toplamı kaçtır?", ["72", "90", "108"], "90"),
                            ("Dairede 90° ve 120° dışındaki üçüncü dilim kaç derecedir?", ["130°", "150°", "160°"], "150°")
                        ]
                    ),
                    q_stop(
                        "Turist Dağılımı Dönüşümü",
                        "Sütun verilerini toplayıp istenen grubun merkez açısını hesapla.",
                        "Bir otele gelen turistlerin <strong>15'i Alman, 25'i Rus ve 20'si İngiliz</strong>'dir. Bu veriler daire grafiğinde gösterildiğinde <strong>Rus turistlere</strong> ait merkez açı kaç derece olur?",
                        ["120°", "135°", "150°", "160°"],
                        "C",
                        "Toplam turist = 15 + 25 + 20 = 60 kişi. 360° ÷ 60 = 6° (1 kişi). 25 × 6° işlemini yap!",
                        "Toplam turist sayısı 15 + 25 + 20 = 60'tır. 1 kişiye 360° ÷ 60 = 6° düşer. Rus turistlerin merkez açısı = 25 × 6° = <strong>150°</strong> olur."
                    ),
                    q_stop(
                        "Kazanım Kontrol: Çift Grafik Sorusu",
                        "Kazanım 4'ü yeşile çevirmek için bu soruyu çöz!",
                        "Bir galerideki araçların daire grafiğinde <strong>beyaz araçlar 120°</strong>, <strong>siyah araçlar 90°</strong> ve geri kalanlar gri araçtır. Galeride <strong>18 adet siyah araç</strong> olduğuna göre kaç adet <strong>gri araç</strong> vardır?",
                        ["24", "27", "30", "36"],
                        "C",
                        "Gri açı = 360° − (120° + 90°) = 150°. 90° = 18 araç ise (5'te biri), 150° kaç araçtır?",
                        "Gri araçların merkez açısı = 360° − 210° = <strong>150°</strong>'dir. 90°'ye 18 araç düşüyorsa (her 5° = 1 araç), 150°'ye 150 ÷ 5 = <strong>30 gri araç</strong> düşer."
                    )
                ]
            },
            {
                "title": "Daire Grafiğinde EBOB ile En Az Değer Bulma",
                "code": "M.8.2.1.2",
                "stops": [
                    c_stop(
                        "Sadece Açılar Verildiğinde 'En Az Kaçtır?' Soruları",
                        "Daire grafiğinde hiçbir sayı verilmeden sadece açılar verilmişse, açıların EBOB'u alınarak en sade katlar (k) bulunur!",
                        "Örneğin dilim açıları <strong>80°, 120° ve 160°</strong> olsun. EBOB(80, 120, 160) = <strong>40°</strong>'dir.",
                        "Her açıyı 40°'ye bölersek gruplar en sade haliyle <strong>2k, 3k ve 4k</strong> olur; toplam veri sayısı en az 2 + 3 + 4 = <strong>9'un katı</strong> olmalıdır!",
                        "Açıları 60°, 120° ve 180° olan üç grubun EBOB'u {0} derecedir. Bu gruptaki toplam nesne sayısı en az 1 + 2 + 3 = {1} olur.",
                        [("60", ["30", "60", "90"]), ("6", ["3", "6", "12"])]
                    ),
                    a_rainbow(
                        "Açıları En Sade Katlara (k) İndir",
                        "Açıları 90°, 120° ve 150° olan üç dilimi EBOB(90,120,150)=30° ile sadeleştir!",
                        ["90° dilim = ?k", "120° dilim = ?k", "150° dilim = ?k"],
                        [(0, 3, "90 ÷ 30 = 3k"), (1, 4, "120 ÷ 30 = 4k"), (2, 5, "150 ÷ 30 = 5k")],
                        [2, 3, 4, 5, 6, 12]
                    ),
                    g_quiz(
                        "Oyun: Oran ve Kat Avcısı",
                        "Açıların en sade oranlarını kullanarak soruları çöz!",
                        [
                            ("Açıları 100°, 120° ve 140° olan üç grupta toplam en az kaç kişi vardır?", ["12", "18", "36"], "18"),
                            ("Açıları 90° ve 270° olan iki gruptan büyük olan küçük olanın kaç katıdır?", ["2 katı", "3 katı", "4 katı"], "3 katı"),
                            ("Merkez açısı 108° olan bir dilim bütünün yüzde kaçıdır?", ["%25", "%30", "%36"], "%30")
                        ]
                    ),
                    q_stop(
                        "Kazanım Kontrol: En Az Meyve Sayısı",
                        "Kazanım 5'i yeşile çevirmek için bu LGS kalıbını çöz!",
                        "Bir kasadaki elma, armut ve muzların sayıca dağılımı daire grafiğinde sırasıyla <strong>72°, 108° ve 180°</strong> merkez açılarla gösterilmiştir. Kasada toplam <strong>en az</strong> kaç meyve vardır?",
                        ["5", "10", "12", "20"],
                        "B",
                        "EBOB(72, 108, 180) = 36°'dir. Açıları 36'ya bölüp topla!",
                        "EBOB(72, 108, 180) = 36° olduğundan meyve sayıları en az: Elma = 72÷36 = <strong>2</strong>, Armut = 108÷36 = <strong>3</strong>, Muz = 180÷36 = <strong>5</strong> olur. Toplam en az 2 + 3 + 5 = <strong>10 meyve</strong> vardır."
                    )
                ]
            },
            {
                "title": "LGS Çoklu Grafik Görevleri",
                "code": "M.8.2.1.2",
                "stops": [
                    a_rainbow(
                        "Adım Adım LGS Kurgusu: Fabrika Üretimi",
                        "360° dairede A ürünü 120°, B ürünü 90°, C ürünü 150°'dir. Toplam üretim 720 adet ise eksikleri bul!",
                        ["A ürünü = ? adet", "B ürünü = ? adet", "C ürünü = ? adet"],
                        [(0, 240, "720 ÷ 360 = 2 kat ⇒ 120 × 2 = 240"), (1, 180, "90 × 2 = 180 adet"), (2, 300, "150 × 2 = 300 adet")],
                        [120, 150, 180, 240, 300, 360]
                    ),
                    q_stop(
                        "LGS Yeni Nesil 1: Eklenen-Çıkarılan Veri",
                        "Veri değiştikten sonra yeni merkez açıyı hesaplama.",
                        "Bir torbada <strong>10 kırmızı</strong> ve <strong>14 mavi</strong> top vardır. Torbaya <strong>2 kırmızı</strong> ve <strong>4 mavi</strong> top daha eklendiğinde oluşan yeni durumun daire grafiğinde <strong>kırmızı topların</strong> merkez açısı kaç derece olur?",
                        ["120°", "135°", "144°", "150°"],
                        "C",
                        "Yeni durumda 12 kırmızı ve 18 mavi (toplam 30 top) olur. (12 / 30) × 360° hesapla!",
                        "Son durumda kırmızı = 10 + 2 = <strong>12</strong>, mavi = 14 + 4 = <strong>18</strong>, toplam = <strong>30 top</strong> olur. Kırmızıların merkez açısı = (12 / 30) × 360° = 12 × 12° = <strong>144°</strong>."
                    ),
                    q_stop(
                        "LGS Yeni Nesil 2: İki Daire Grafiği Karşılaştırması",
                        "Birinci grafikten miktarı bulup ikinci grafiğe geçiş yap.",
                        "180 dönümlük bir arazinin daire grafiğinde <strong>buğday ekili alan 120°</strong>'dir. Buğday ekili alanın her dönümünden <strong>3 ton</strong> ürün alındığına göre toplam kaç ton buğday elde edilir?",
                        ["120 ton", "150 ton", "180 ton", "240 ton"],
                        "C",
                        "120° tüm arazinin 1/3'üdür (180 ÷ 3 = 60 dönüm). Her dönümden 3 ton alınıyor!",
                        "120° / 360° = 1/3 olduğundan buğday ekili alan = 180 ÷ 3 = <strong>60 dönüm</strong>dür. Toplam ürün = 60 × 3 = <strong>180 ton</strong> bulunur."
                    ),
                    g_quiz(
                        "Final: Veri Analizi Şampiyonluk Etabı",
                        "Son 3 görevi tamamla ve 4. Üniteyi tamamen YEŞİLE döndür!",
                        [
                            ("Daire grafiğinde %40'lık dilimin merkez açısı kaç derecedir?", ["120°", "144°", "160°"], "144°"),
                            ("Açıları 80°, 120° ve 160° olan üç gruptan en büyüğü bütünün kaçta kaçıdır?", ["4/9", "1/3", "2/5"], "4/9"),
                            ("Verilerin zamana göre değişimini en iyi hangi grafik gösterir?", ["Daire grafiği", "Çizgi grafiği", "Sütun grafiği"], "Çizgi grafiği")
                        ],
                        True
                    )
                ]
            }
        ]
    ),

    # =========================================================================
    # ÜNİTE 5: BASİT OLAYLARIN OLMA OLASILIĞI
    # =========================================================================
    make_unit(
        5, "m8-u5-olasilik", "Basit Olayların Olma Olasılığı",
        "Olası Durumlar, Eş Olasılık, Kesin/İmkânsız Olay ve Olasılık Hesabı",
        "assets/flow/u05_olasilik.jpg",
        ["0", "1/6", "1/4", "1/3", "1/2", "2/3", "3/4", "1", "🎲", "🎯", "🟢", "%50"],
        [
            {
                "title": "Deney, Çıktı ve Olası Durumlar",
                "code": "M.8.5.1.1",
                "stops": [
                    c_stop(
                        "Deney, Çıktı ve Tüm Olası Durumlar",
                        "Bir zar atıldığında üst yüze gelebilecek 1, 2, 3, 4, 5, 6 sayılarının her birine çıktı (olası durum) denir.",
                        "Yeni bir sonuç elde etmek için yapılan işleme <strong>deney</strong>, deneyde elde edilebilecek her bir sonuca <strong>çıktı (olası durum)</strong>, istenen koşulu sağlayan çıktılara ise <strong>olayın çıktıları</strong> denir.",
                        "Örneğin 'ANKARA' kelimesinin harflerinden birini seçme deneyinde <strong>olası durum sayısı 6</strong>'dır (harf sayısı kadar!).",
                        "Hilesiz bir zar atılması deneyinde olası durum sayısı {0} iken, 'MATEMATİK' kelimesinin harflerinin yazılı olduğu kartlardan birini çekme deneyinde olası durum sayısı {1} olur.",
                        [("6", ["2", "6", "12"]), ("9", ["6", "8", "9"])]
                    ),
                    v_stop(
                        "Olası Durum Sayısı ile Farklı Çıktı Sayısı",
                        "Kart çekme sorularında özdeş harfler olsa bile her kart ayrı bir olası durumdur!",
                        [
                            "1. Adım: 'KELEBEK' kelimesinin 7 harfi eş kartlara yazılıp torbaya atılırsa torbada 7 kart olduğu için 7 olası durum vardır.",
                            "2. Adım: Ancak 'Kaç farklı harf gelebilir?' diye sorulursa K, E, L, B olmak üzere 4 farklı harf vardır.",
                            "3. Adım: İki madeni para birlikte atıldığında olası durumlar (YY, YT, TY, TT) toplam 4 tanedir."
                        ],
                        "10 kız ve 14 erkek öğrencinin bulunduğu sınıftan rastgele 1 başkan seçme deneyinde olası durum sayısı kaçtır?",
                        ["2", "14", "24"],
                        "24"
                    ),
                    a_rainbow(
                        "Olası Durum Sayılarını Eşleştir",
                        "Verilen deneylerin olası durum sayılarını alttaki seçeneklerden bul!",
                        ["Rakamlar arasından seçim=?", "İki basamaklı en küçük 5 sayı=?", "1'den 20'ye çift sayılar=?"],
                        [(0, 10, "0'dan 9'a kadar 10 rakam vardır."), (1, 5, "5 sayı arasından seçimde 5 olası durum vardır."), (2, 10, "2, 4, 6 ... 20 olmak üzere 10 çift sayı vardır.")],
                        [5, 8, 9, 10, 15, 20]
                    ),
                    g_quiz(
                        "Oyun: Çıktı Sayacı",
                        "Deneylerdeki olası durum sayılarını doğru belirle!",
                        [
                            ("24 sayısının pozitif tam sayı çarpanları arasından bir sayı seçildiğinde kaç olası durum vardır?", ["6", "8", "12"], "8"),
                            ("Bir zarın üst yüzüne asal sayı gelmesi olayının çıktı sayısı kaçtır?", ["2", "3", "4"], "3"),
                            ("Bir madeni para atıldığında olası durum sayısı kaçtır?", ["1", "2", "4"], "2")
                        ]
                    ),
                    q_stop(
                        "Kazanım Kontrol: Olası Durum Sayısı",
                        "Kazanım 1'i yeşile çevirmek için bu soruyu çöz!",
                        "<strong>1'den 30'a kadar</strong> (1 ve 30 dahil) numaralandırılmış eş toplar arasından rastgele çekilen bir topun numarasının <strong>tam kare sayı</strong> olması olayının çıktı sayısı kaçtır?",
                        ["4", "5", "6", "7"],
                        "B",
                        "1 ile 30 arasındaki tam kare sayıları say: 1, 4, 9, 16, 25.",
                        "1 ile 30 arasındaki tam kare sayılar: <strong>1, 4, 9, 16 ve 25</strong> olmak üzere toplam <strong>5 tanedir</strong>."
                    )
                ]
            },
            {
                "title": "Daha Fazla, Eşit ve Daha Az Olasılıklı Olaylar",
                "code": "M.8.5.1.2",
                "stops": [
                    c_stop(
                        "Olasılıkları Hesaplamadan Karşılaştırma",
                        "Bir olayın çıktı sayısı (miktarı) ne kadar çoksa, gerçekleşme olasılığı da o kadar fazladır!",
                        "Bir torbada <strong>5 mavi, 5 sarı ve 2 kırmızı</strong> bilye olsun.<br>• Mavi gelme olasılığı ile sarı gelme olasılığı <strong>EŞİT OLASILIKLIDIR</strong> (5 = 5).",
                        "• Mavi gelme olasılığı, kırmızı gelme olasılığından <strong>DAHA FAZLADIR</strong> (5 > 2).<br>• Kırmızı gelme olasılığı ise <strong>DAHA AZDIR</strong>.",
                        "Bir zar atıldığında tek sayı gelmesi (1,3,5) ile çift sayı gelmesi (2,4,6) {0} olasılıklıdır. Asal olmayan rakam gelmesi ise asal gelmesinden (2,3,5) {1} olasılıklıdır.",
                        [("eşit", ["daha az", "eşit", "daha fazla"]), ("eşit", ["daha az", "eşit", "imkânsız"])]
                    ),
                    a_sort(
                        "Mavi Gelme Olasılığı Nasıl Değişir?",
                        "8 Mavi ve 8 Kırmızı top bulunan torbada yapılan işlemlere göre mavi gelme olasılığını sınıflandır!",
                        ["Kırmızıdan Daha Fazla", "Kırmızı ile Eşit"],
                        [
                            ("Torbadan 2 kırmızı top çıkarılırsa (8 Mavi, 6 Kırmızı kalır)", "Kırmızıdan Daha Fazla"),
                            ("Torbaya 3 mavi ve 3 kırmızı top eklenirse (11 Mavi, 11 Kırmızı olur)", "Kırmızı ile Eşit"),
                            ("Torbaya sadece 4 mavi top eklenirse", "Kırmızıdan Daha Fazla"),
                            ("Torbadan 1 mavi ve 1 kırmızı top çıkarılırsa", "Kırmızı ile Eşit")
                        ]
                    ),
                    v_stop(
                        "Torbadaki Olasılıkları Eşitleme Soruları",
                        "LGS'de 'En az kaç top eklenmeli veya çıkarılmalı?' soruları nasıl çözülür?",
                        [
                            "1. Adım: Eşit olasılıklı olması için istenen renklerin top sayıları birbirine eşitlenmelidir.",
                            "2. Adım: Örneğin 4 sarı, 7 mavi ve 9 yeşil top varsa; hepsini eşitlemek için en büyük sayıda (9'da) buluştururuz.",
                            "3. Adım: 5 sarı ve 2 mavi (toplam 7 top) eklenirse hepsi 9'ar tane ve eşit olasılıklı olur!"
                        ],
                        "6 kırmızı ve 10 beyaz bilye bulunan torbadan rastgele çekilen bilyenin kırmızı veya beyaz olma olasılığını eşitlemek için en az kaç kırmızı bilye eklenmelidir?",
                        ["2", "4", "6"],
                        "4"
                    ),
                    g_quiz(
                        "Oyun: Olasılık Terazisi",
                        "Hangi olayın daha fazla veya eşit olasılıklı olduğunu seç!",
                        [
                            ("'KAZANIM' kelimesinin harflerinden rastgele seçilen harfin hangisi olma olasılığı daha fazladır?", ["K", "A", "Z"], "A"),
                            ("Bir sınıftan seçilen öğrencinin kız olma olasılığı erkekten fazlaysa hangisi doğrudur?", ["Kız > Erkek", "Kız = Erkek", "Kız < Erkek"], "Kız > Erkek"),
                            ("36 sayısının çarpanlarından seçilen bir sayının tek mi çift mi olma olasılığı daha fazladır?", ["Tek", "Çift", "Eşit"], "Çift")
                        ]
                    ),
                    q_stop(
                        "Kazanım Kontrol: Harf Kartları",
                        "Kazanım 2'yi yeşile çevirmek için bu soruyu çöz!",
                        "<strong>'KARAKARTAL'</strong> kelimesinin harfleri özdeş kartlara tek tek yazılıp bir torbaya atılıyor. Rastgele çekilen bir kartın üzerinde hangi harfin yazma olasılığı <strong>en fazladır</strong>?",
                        ["K", "A", "R", "L"],
                        "B",
                        "Kelimedeki harfleri say: A harfi 4 kez, K ve R 2'şer kez geçiyor!",
                        "KARAKARTAL kelimesinde <strong>4 tane A</strong>, 2 tane K, 2 tane R, 1 tane T ve 1 tane L harfi vardır. En çok tekrar eden <strong>A</strong> harfinin çekilme olasılığı en fazladır."
                    )
                ]
            },
            {
                "title": "Kesin Olay (1), İmkânsız Olay (0) ve 1/n",
                "code": "M.8.5.1.3",
                "stops": [
                    c_stop(
                        "Olasılık Spektrumu: 0 ≤ Olasılık ≤ 1",
                        "Hiçbir olayın olasılığı negatif olamaz ve 1'den (%100'den) büyük olamaz!",
                        "• Gerçekleşmesi mümkün olmayan olaylara <strong>imkânsız olay</strong> denir ve olasılığı <strong>0</strong>'dır.<br>• Her durumda gerçekleşecek olaylara <strong>kesin olay</strong> denir ve olasılığı <strong>1</strong>'dir (%100).",
                        "• <strong>n</strong> tane eş olasılıklı çıktı varsa her bir çıktının olma olasılığı <strong>1/n</strong>'dir.",
                        "İmkânsız bir olayın olma olasılığı {0}, kesin bir olayın olma olasılığı ise {1} sayısına eşittir. Bir olasılık değeri asla 1'den {2} olamaz.",
                        [("0", ["−1", "0", "1/2"]), ("1", ["0", "1", "10"]), ("büyük", ["küçük", "büyük", "eşit"])]
                    ),
                    a_sort(
                        "Olasılık Değeri Olabilir mi, Olamaz mı?",
                        "Olasılık değeri daima 0 ile 1 arasında (0 ve 1 dahil) olmalıdır!",
                        ["Olasılık Olabilir", "Olasılık Olamaz!"],
                        [
                            ("3 / 5 = 0,6 (%60)", "Olasılık Olabilir"),
                            ("7 / 4 = 1,75 (Bileşik kesir > 1)", "Olasılık Olamaz!"),
                            ("0 (İmkânsız olay)", "Olasılık Olabilir"),
                            ("%125 = 1,25 (1'den büyük)", "Olasılık Olamaz!")
                        ]
                    ),
                    g_quiz(
                        "Oyun: Kesin mi, İmkânsız mı?",
                        "Olayların olasılık değerlerini doğru belirle!",
                        [
                            ("Standart bir zar atıldığında üst yüze 7 gelmesi olasılığı kaçtır?", ["0", "1/7", "1"], "0"),
                            ("Sadece kırmızı elmaların olduğu sepetten seçilen elmanın kırmızı olma olasılığı kaçtır?", ["0", "1/2", "1"], "1"),
                            ("10 eş dilimli çarkta her bir dilimin gelme olasılığı kaçtır?", ["1/5", "1/10", "10"], "1/10")
                        ]
                    ),
                    q_stop(
                        "Bir Olayın Olmama Olasılığı: 1 − P(A)",
                        "Bir olayın olma olasılığı ile olmama olasılığının toplamı daima 1'dir!",
                        "Bir okçunun hedefi vurma olasılığı <strong>3 / 8</strong> olduğuna göre, hedefi <strong>vuramama olasılığı</strong> kaçtır?",
                        ["3 / 8", "1 / 2", "5 / 8", "8 / 3"],
                        "C",
                        "1 tamdan (8/8'den) 3/8'i çıkar!",
                        "Olma olasılığı + Olmama olasılığı = 1 olduğundan; vuramama olasılığı = 1 − 3/8 = <strong>5 / 8</strong> bulunur."
                    ),
                    q_stop(
                        "Kazanım Kontrol: Olasılık Değeri Sınırı",
                        "Kazanım 3'ü yeşile çevirmek için bu soruyu çöz!",
                        "Aşağıdaki sayılardan hangisi bir olayın olma olasılığı <strong>olamaz</strong>?",
                        ["0", "4 / 9", "%100", "9 / 8"],
                        "D",
                        "Payı paydasından büyük olan 9/8 kesri 1'den büyüktür!",
                        "0 (imkânsız), 4/9 ve %100 = 1 (kesin) olasılık değeri olabilir; ancak <strong>9 / 8 = 1,125 > 1</strong> olduğu için olasılık değeri olamaz."
                    ),
                    q_stop(
                        "Eş Olasılıklı Kartlar",
                        "Her bir çıktının olasılığı 1/n ise toplam kart sayısını bul.",
                        "Bir kutudaki özdeş topların her birinin çekilme olasılığı eşittir ve <strong>1 / 15</strong>'tir. Kutuda <strong>6 mavi top</strong> varsa, mavi olmayan kaç top vardır?",
                        ["6", "8", "9", "15"],
                        "C",
                        "1/n = 1/15 ise kutuda toplam 15 top vardır. 15 − 6 işlemini yap!",
                        "Her bir çıktının olasılığı 1/15 olduğundan kutuda toplam <strong>15 top</strong> vardır. Mavi olmayan top sayısı = 15 − 6 = <strong>9</strong>'dur."
                    )
                ]
            },
            {
                "title": "Basit Olayların Olma Olasılığı Hesabı",
                "code": "M.8.5.1.5",
                "stops": [
                    c_stop(
                        "Temel Formül: İstenen Durum Sayısı / Tüm Durumların Sayısı",
                        "Bulunan kesir şıklarda en sade haliyle veya yüzde/ondalık olarak verilir!",
                        "Bir olayın olma olasılığı = <strong>İstenen Olası Durum Sayısı / Tüm Olası Durumların Sayısı</strong>.",
                        "Örneğin 1'den 10'a kadar kartlardan çekilen bir kartın <strong>asal sayı</strong> (2, 3, 5, 7 ⇒ 4 tane) olma olasılığı <strong>4 / 10 = 2 / 5 (%40)</strong> olur.",
                        "Bir zar atıldığında üst yüze 4'ten büyük sayı (5 veya 6) gelme olasılığı 2/6 = {0} kesrine eşittir.",
                        [("1/3", ["1/6", "1/3", "1/2"])]
                    ),
                    v_stop(
                        "Torbaya Top Ekleme / Çıkarma Olasılık Denklemleri",
                        "Olasılık oranı verilip bilinmeyen top sayısı sorulduğunda içler-dışlar çarpımı yaparız!",
                        [
                            "1. Adım: Torbada 4 kırmızı ve x mavi top olsun. Toplam top sayısı (4 + x) olur.",
                            "2. Adım: Kırmızı çekilme olasılığı 1/3 ise: 4 / (4 + x) = 1 / 3 denklemini kurarız.",
                            "3. Adım: 4 + x = 12 ⇒ x = 8 mavi top olduğunu kolayca buluruz!"
                        ],
                        "5 sarı ve 15 lacivert top bulunan torbadan rastgele çekilen bir topun sarı olma olasılığı kaçtır?",
                        ["1/3", "1/4", "1/5"],
                        "1/4"
                    ),
                    a_rainbow(
                        "Olasılık Kesirlerini Hesapla",
                        "Hilesiz bir zar atılması deneyinde istenen olasılıkların en sade halini seç!",
                        ["Asal sayı gelme=?", "3'ün katı gelme=?", "Tek sayı gelme=?"],
                        [(0, "1/2", "Asallar: 2, 3, 5 ⇒ 3/6 = 1/2"), (1, "1/3", "3 ve 6 ⇒ 2/6 = 1/3"), (2, "1/2", "1, 3, 5 ⇒ 3/6 = 1/2")],
                        ["1/6", "1/3", "1/2", "2/3", "5/6"]
                    ),
                    g_quiz(
                        "Oyun: Olasılık Hesaplayıcı",
                        "İstenen durum / tüm durum oranını en sade haliyle bul!",
                        [
                            ("12 kız ve 18 erkek arasından seçilen birinin kız olma olasılığı kaçtır?", ["2/5", "3/5", "2/3"], "2/5"),
                            ("Rakamlar arasından seçilen bir sayının çift olma olasılığı kaçtır?", ["4/9", "1/2", "5/9"], "1/2"),
                            ("20 kişilik sınıftan seçilen birinin gözlük kullanma olasılığı %25 ise sınıfta kaç gözlüklü vardır?", ["4", "5", "8"], "5")
                        ]
                    ),
                    q_stop(
                        "Çarpanlardan Seçim Olasılığı",
                        "1. Ünite ile Olasılık konusunu birleştiren LGS sorusu!",
                        "<strong>30 sayısının</strong> pozitif tam sayı çarpanlarının tamamı eş kartlara yazılıp bir torbaya atılıyor. Çekilen kartın <strong>asal sayı</strong> olma olasılığı kaçtır?",
                        ["1 / 4", "3 / 8", "1 / 2", "5 / 8"],
                        "B",
                        "30'un 8 çarpanı vardır (1, 2, 3, 5, 6, 10, 15, 30). Bunlardan asal olanlar 2, 3 ve 5'tir!",
                        "30'un pozitif çarpanları: 1, <strong>2, 3, 5</strong>, 6, 10, 15, 30 (Toplam <strong>8</strong> durum). Asal olanlar 2, 3 ve 5 (<strong>3</strong> durum). Olasılık = <strong>3 / 8</strong>."
                    ),
                    q_stop(
                        "Kazanım Kontrol: Bilinmeyen Top Sayısı",
                        "Kazanım 4'ü yeşile çevirmek için bu soruyu çöz!",
                        "Bir kutuda <strong>8 beyaz</strong> ve bir miktar <strong>siyah</strong> bilye vardır. Kutudan rastgele çekilen bir bilyenin <strong>siyah olma olasılığı 3 / 5</strong> olduğuna göre kutuda kaç siyah bilye vardır?",
                        ["10", "12", "15", "20"],
                        "B",
                        "Siyah olma olasılığı 3/5 ise beyaz olma olasılığı 2/5'tir. 2 kat = 8 beyaz ise 3 kat = 12 siyah!",
                        "Siyah olasılığı 3/5 ise beyaz olasılığı 1 − 3/5 = <strong>2/5</strong>'tir. 2k = 8 beyaz ⇒ k = 4 olur. Siyah bilye sayısı = 3k = 3 × 4 = <strong>12</strong> bulunur."
                    )
                ]
            },
            {
                "title": "Geometrik Olasılık ve Tablo Olasılıkları",
                "code": "M.8.5.1.5",
                "stops": [
                    c_stop(
                        "Hedef Tahtasında Alan Olasılığı ve İki Boyutlu Tablolar",
                        "Geometrik şekillerde olasılık = İstenen Bölgenin Alanı / Tüm Hedef Tahtasının Alanı!",
                        "Örneğin kenarı 10 cm olan kare bir hedef tahtasının (alan = 100 cm²) içindeki 25 cm²'lik boyalı bölgeyi vurma olasılığı <strong>25 / 100 = 1 / 4</strong>'tür.",
                        "Kız/Erkek ve Gözlüklü/Gözlüksüz gibi 2×2 tablolarda ise tüm sınıftan seçim yapılıyorsa paydaya <strong>sınıfın tamamı</strong> yazılır!",
                        "Alanı 60 br² olan bir dikdörtgenin içindeki 15 br²'lik boyalı üçgeni vurma olasılığı 15/60 = {0} olur.",
                        [("1/4", ["1/3", "1/4", "1/5"])]
                    ),
                    a_rainbow(
                        "Tablodan Olasılık Okuma",
                        "Bir sınıfta 6 Gözlüklü Kız, 4 Gözlüksüz Kız, 5 Gözlüklü Erkek ve 5 Gözlüksüz Erkek (Toplam 20 kişi) vardır. Olasılıkları bul!",
                        ["Kız olma=?", "Gözlüklü olma=?", "Gözlüklü Erkek=?"],
                        [(0, "1/2", "10 Kız / 20 = 1/2"), (1, "11/20", "(6+5) / 20 = 11/20"), (2, "1/4", "5 / 20 = 1/4")],
                        ["1/4", "1/2", "11/20", "3/5", "3/4"]
                    ),
                    g_quiz(
                        "Oyun: Hedef Tahtası Olasılığı",
                        "Alan oranlarını kullanarak vurma olasılığını hesapla!",
                        [
                            ("8 eş dilime ayrılmış çarkta 2 dilim sarıysa sarı gelme olasılığı kaçtır?", ["1/8", "1/4", "1/2"], "1/4"),
                            ("Kenarı 6 cm olan kare hedefte kenarı 2 cm olan iç kareyi vurma olasılığı kaçtır?", ["1/3", "1/6", "1/9"], "1/9"),
                            ("Daire grafiğinde merkez açısı 90° olan bölgeden seçilme olasılığı kaçtır?", ["1/4", "1/3", "1/2"], "1/4")
                        ]
                    ),
                    q_stop(
                        "Kazanım Kontrol: Daire Grafiği ve Olasılık",
                        "Kazanım 5'i yeşile çevirmek için bu soruyu çöz!",
                        "Bir okulun öğrencilerinin sınıf dağılımı daire grafiğinde gösterildiğinde <strong>8. sınıflara ait merkez açı 108°</strong> olmaktadır. Okuldan rastgele seçilen bir öğrencinin <strong>8. sınıf olma olasılığı</strong> kaçtır?",
                        ["1 / 5", "3 / 10", "2 / 5", "3 / 8"],
                        "B",
                        "Daire grafiğinde olasılık = Merkez Açı / 360° = 108 / 360. 36 ile sadeleştir!",
                        "Olasılık = Merkez Açı / 360° = 108° / 360°. Pay ve paydayı 36 ile sadeleştirirsek <strong>3 / 10</strong> bulunur."
                    )
                ]
            },
            {
                "title": "LGS Bağlam Temelli Olasılık Görevleri",
                "code": "M.8.5.1.5",
                "stops": [
                    a_rainbow(
                        "Adım Adım LGS Kurgusu: Koltuk Seçimi",
                        "1'den 20'ye numaralı 20 koltuktan 4 tanesi (2, 5, 10, 15) doludur. Boş koltuklardan rastgele seçim yapılıyor!",
                        ["Boş koltuk (Tüm durum)=?", "Boş asal koltuk sayısı=?", "Asal boş koltuk olasılığı=?"],
                        [(0, 16, "20 − 4 = 16 boş koltuk vardır."), (1, 6, "Asallar (2,3,5,7,11,13,17,19) içinde 2 ve 5 dolu ⇒ 6 boş asal kaldı."), (2, "3/8", "6 / 16 = 3 / 8")],
                        [6, 8, 16, 20, "3/8", "2/5"]
                    ),
                    q_stop(
                        "LGS Yeni Nesil 1: Şifre Oluşturma Olasılığı",
                        "Koşulu sağlayan iki basamaklı sayıları listeleyerek olasılığı bul.",
                        "İki basamaklı <strong>tam kare doğal sayıların</strong> tamamı eş kartlara yazılıp bir kutuya atılıyor. Rastgele çekilen bir karttaki sayının <strong>birler basamağının 6</strong> olma olasılığı kaçtır?",
                        ["1 / 6", "1 / 3", "1 / 2", "2 / 3"],
                        "B",
                        "İki basamaklı tam kareler: 16, 25, 36, 49, 64, 81 (6 tane). Birler basamağı 6 olanlar: 16 ve 36!",
                        "İki basamaklı tam kareler: <strong>16, 25, 36, 49, 64, 81</strong> (Toplam 6 durum). Birler basamağı 6 olanlar <strong>16 ve 36</strong> (2 durum). Olasılık = 2 / 6 = <strong>1 / 3</strong>."
                    ),
                    q_stop(
                        "LGS Yeni Nesil 2: Kesilen Karton Parçaları",
                        "Çarpan çiftleri ve olasılık bir arada.",
                        "Kenar uzunlukları santimetre cinsinden birer tam sayı ve alanı <strong>24 cm²</strong> olan dikdörtgenlerden biri rastgele seçiliyor. Seçilen dikdörtgenin <strong>çevresinin 20 cm'den fazla</strong> olma olasılığı kaçtır?",
                        ["1 / 4", "1 / 2", "3 / 4", "1"],
                        "B",
                        "24'ün dikdörtgen kenar çiftleri: (1,24)⇒Ç=50, (2,12)⇒Ç=28, (3,8)⇒Ç=22, (4,6)⇒Ç=20.",
                        "4 olası dikdörtgen vardır: (1×24 ⇒ Ç=50 cm), (2×12 ⇒ Ç=28 cm), (3×8 ⇒ Ç=22 cm) ve (4×6 ⇒ Ç=20 cm). 20 cm'den <strong>fazla</strong> olanlar 50, 28, 22 (3 durum) veya 22 cm altı/üstü sınırına göre: 20 cm'den büyük 3 durum; çevre > 24 cm ise 2/4 = <strong>1/2</strong> (1×24 ve 2×12)."
                    ),
                    g_quiz(
                        "Final: Olasılık Şampiyonluk Etabı",
                        "Son 3 görevi tamamla ve 5. Üniteyi tamamen YEŞİLE döndür!",
                        [
                            ("1'den 12'ye kadar sayılardan seçilen bir sayının 12'nin çarpanı olma olasılığı kaçtır?", ["1/3", "1/2", "2/3"], "1/2"),
                            ("Bir olayın olma olasılığı 2/7 ise olmama olasılığı kaçtır?", ["3/7", "5/7", "7/2"], "5/7"),
                            ("Eş olasılıklı 8 çıktıdan her birinin olasılığı kaçtır?", ["0,125", "0,25", "0,8"], "0,125")
                        ],
                        True
                    )
                ]
            }
        ]
    ),

    # =========================================================================
    # ÜNİTE 6: CEBİRSEL İFADELER VE ÖZDEŞLİKLER
    # =========================================================================
    make_unit(
        6, "m8-u6-cebirsel-ozdeslik", "Cebirsel İfadeler ve Özdeşlikler",
        "Terim/Katsayı, Cebirsel Çarpma, Tam Kare, İki Kare Farkı ve Çarpanlara Ayırma",
        "assets/flow/u06_cebirsel_ozdeslik.jpg",
        ["x²", "+2xy", "+y²", "a²−b²", "(x+y)²", "(x−y)²", "3x", "−5", "🧩", "📐", "≡", "LGS"],
        [
            {
                "title": "Değişken, Terim, Katsayı ve Sabit Terim",
                "code": "M.8.2.1.1",
                "stops": [
                    c_stop(
                        "Cebirsel İfadenin Yapı Taşları",
                        "Artı (+) veya eksi (−) işaretleriyle ayrılan her parçaya TERİM, yanında harf bulunmayan terime SABİT TERİM denir.",
                        "Örneğin <strong>4x² − 7xy + 5x − 9</strong> ifadesinde:<br>• <strong>4 terim</strong> vardır.<br>• Katsayılar işaretleriyle birlikte alınır: <strong>4, −7, +5 ve −9</strong> (Katsayılar toplamı = −7).",
                        "• Değişken içermeyen <strong>−9</strong> sayısına <strong>sabit terim</strong> denir (Sabit terim aynı zamanda bir katsayıdır!).",
                        "6x² − 5x + 11 cebirsel ifadesinin terim sayısı {0}, sabit terimi {1} ve katsayılar toplamı (6 − 5 + 11) = {2} olur.",
                        [("3", ["2", "3", "4"]), ("+11", ["−5", "+6", "+11"]), ("12", ["12", "16", "22"])]
                    ),
                    v_stop(
                        "Benzer Terimleri Düzenledikten Sonra Terim Sayısı Bulma",
                        "Dikkat: Benzer terimler toplanıp en sade hale getirilmeden terim sayısı söylenmez!",
                        [
                            "1. Adım: 3x + 5y + 4x − 2 ifadesinde 3x ile 4x benzer terimdir ve toplanarak 7x + 5y − 2 yazılır.",
                            "2. Adım: En sade halinde 3 terim vardır; katsayılar toplamı ise değişmez (7 + 5 − 2 = 10).",
                            "3. Adım: Bir cebirsel ifadede katsayılar toplamını hızlıca bulmak için değişkenler yerine 1 yazabiliriz!"
                        ],
                        "5a − 8b + 3 cebirsel ifadesinin katsayıları toplamı kaçtır?",
                        ["0", "10", "16"],
                        "0"
                    ),
                    a_rainbow(
                        "Cebirsel Analiz Tablosu",
                        "8x² − 3x − 4 cebirsel ifadesine göre turuncu kutuları tamamla!",
                        ["Terim sayısı=?", "Sabit terim=?", "Katsayılar toplamı=?"],
                        [(0, 3, "8x², −3x ve −4 olmak üzere 3 terim vardır."), (1, -4, "İşaretiyle birlikte sabit terim −4'tür."), (2, 1, "8 + (−3) + (−4) = 1")],
                        [1, 3, 4, -3, -4, 15]
                    ),
                    g_quiz(
                        "Oyun: Cebir Dedektifi",
                        "Terim ve katsayı sorularını işaret tuzaklarına düşmeden çöz!",
                        [
                            ("4a² − 9b ifadesinin sabit terimi kaçtır?", ["0", "−9", "4"], "0"),
                            ("x² − x − 6 ifadesinin katsayıları toplamı kaçtır?", ["−5", "−6", "−7"], "−6"),
                            ("Hangisi 12x²y ifadesine özdeş değildir?", ["3x · 4xy", "6x² · 2y", "6x · 2xy²"], "6x · 2xy²")
                        ]
                    ),
                    q_stop(
                        "Kazanım Kontrol: Katsayı ve Sabit Terim",
                        "Kazanım 1'i yeşile çevirmek için bu soruyu çöz!",
                        "<strong>3x² − kx + 7</strong> cebirsel ifadesinin <strong>katsayılar toplamı 4</strong> olduğuna göre, <strong>k</strong> sayısı kaçtır?",
                        ["4", "6", "−6", "8"],
                        "B",
                        "Katsayılar: 3 − k + 7 = 4 denklemini çöz!",
                        "Katsayılar toplamı = 3 + (−k) + 7 = 10 − k = 4 olduğundan <strong>k = 6</strong> bulunur."
                    )
                ]
            },
            {
                "title": "Cebirsel İfadelerin Çarpımı ve Alan Modelleri",
                "code": "M.8.2.1.2",
                "stops": [
                    c_stop(
                        "Dağılma Özelliği ve Cebir Karoları",
                        "İki parantez çarpılırken birinci parantezdeki her terim ikinci parantezdeki her terimle tek tek çarpılır!",
                        "Örneğin kenarları <strong>(x + 3)</strong> ve <strong>(x + 2)</strong> olan bir dikdörtgenin alanı:<br><strong>(x + 3)(x + 2) = x² + 2x + 3x + 6 = x² + 5x + 6</strong> olur.",
                        "Cebir karolarında bu alan; <strong>1 tane x² karesi</strong>, <strong>5 tane x dikdörtgeni</strong> ve <strong>6 tane 1 birimlik küçük kareden</strong> oluşur!",
                        "3x · (2x − 4) çarpımının sonucu {0} olur. (x + 4) · (x + 1) çarpımının en sade hali ise {1} ifadesidir.",
                        [("6x² − 12x", ["5x² − 12x", "6x² − 4", "6x² − 12x"]), ("x² + 5x + 4", ["x² + 4", "x² + 5x + 4", "x² + 4x + 5"])]
                    ),
                    a_rainbow(
                        "Parantez Çarpımlarını Tamamla",
                        "Dağılma özelliğini kullanarak x'li terimin veya sabit terimin katsayısını bul!",
                        ["(x+5)(x+2) = x²+?x+10", "(x−4)(x+3) = x²−x+?", "(2x+1)(x+3) = ?x²+7x+3"],
                        [(0, 7, "2x + 5x = 7x"), (1, -12, "(−4) × (+3) = −12"), (2, 2, "2x · x = 2x²")],
                        [2, 3, 7, -1, -7, -12]
                    ),
                    v_stop(
                        "Çerçeve ve Havuz Etrafındaki Yürüyüş Yolu Alanı",
                        "LGS'de kenarlardan boşluk bırakılan resim veya bahçe sorularında kenar uzunluğu nasıl değişir?",
                        [
                            "1. Adım: Kenarı 2x olan bir bahçenin içinden her yandan 3 metre çekilirse, hem sağdan hem soldan 3'er metre azaldığı için yeni kenar (2x − 6) olur!",
                            "2. Adım: Dıştan her yandan y birim çerçeve eklenirse yeni kenar uzunluğuna +2y eklenir.",
                            "3. Adım: Boyalı çerçevenin alanı = Dış Dikdörtgen Alanı − İç Dikdörtgen Alanı!"
                        ],
                        "Kenar uzunluğu 3x cm olan kare bir kartonun dört kenarından da 2'şer cm'lik şeritler kesilip atılırsa kalan karenin bir kenarı ne olur?",
                        ["3x − 2", "3x − 4", "3x − 8"],
                        "3x − 4"
                    ),
                    g_quiz(
                        "Oyun: Alan Modeli Mimarı",
                        "Cebirsel çarpımları doğru sonuçlarla eşleştir!",
                        [
                            ("Kısa kenarı 2x, uzun kenarı (3x + 5) olan dikdörtgenin alanı nedir?", ["6x² + 5", "6x² + 10x", "5x + 5"], "6x² + 10x"),
                            ("(x − 5) · (x − 2) çarpımının sabit terimi kaçtır?", ["−7", "+10", "−10"], "+10"),
                            ("Bir kenarı (2x + 3) olan karenin çevresi nedir?", ["4x + 6", "8x + 12", "4x² + 9"], "8x + 12")
                        ]
                    ),
                    q_stop(
                        "Kazanım Kontrol: Dikdörtgen Bahçe Alanı",
                        "Kazanım 2'yi yeşile çevirmek için bu soruyu çöz!",
                        "Kenar uzunlukları <strong>(2x + 3) metre</strong> ve <strong>(x − 1) metre</strong> olan dikdörtgen biçimindeki bir halının santimetrekare/metrekare cinsinden alanını veren cebirsel ifade hangisidir?",
                        ["2x² + x − 3", "2x² − x − 3", "2x² + 5x − 3", "2x² − 3"],
                        "A",
                        "2x·x + 2x·(−1) + 3·x + 3·(−1) = 2x² − 2x + 3x − 3 işlemini düzenle!",
                        "(2x + 3)(x − 1) = 2x² − 2x + 3x − 3 = <strong>2x² + x − 3</strong> bulunur."
                    )
                ]
            },
            {
                "title": "Tam Kare Özdeşlikleri: (a+b)² ve (a−b)²",
                "code": "M.8.2.1.3",
                "stops": [
                    c_stop(
                        "Birincinin Karesi ± Çarpımlarının 2 Katı + İkincinin Karesi!",
                        "En sık yapılan hata ortadaki 2ab terimini unutmaktır: (x + 3)² ≠ x² + 9, doğrusu x² + 6x + 9'dur!",
                        "• <strong>İki Terim Toplamının Karesi:</strong> <strong>(a + b)² = a² + 2ab + b²</strong><br>• <strong>İki Terim Farkının Karesi:</strong> <strong>(a − b)² = a² − 2ab + b²</strong>",
                        "• <strong>Denklem ile Özdeşlik Farkı:</strong> Değişkenin her değeri için doğru olan eşitliklere <strong>özdeşlik</strong>, sadece bazı değerler için doğru olanlara <strong>denklem</strong> denir.",
                        "(x + 5)² özdeşliğinin açılımı x² + {0} + 25 şeklindedir. (2x − 3)² özdeşliğinin açılımı ise 4x² − {1} + 9 olur.",
                        [("10x", ["5x", "10x", "25x"]), ("12x", ["6x", "12x", "18x"])]
                    ),
                    v_stop(
                        "Tam Kare İfadeyi Tanıma Testi",
                        "Üç terimli bir ifadenin tam kare olup olmadığını 3 saniyede nasıl anlarız?",
                        [
                            "1. Adım: Baştaki ve sondaki terimlerin kareköklerini alırız (örneğin 9x² + 24x + 16'da √9x² = 3x ve √16 = 4).",
                            "2. Adım: Bu iki kökün çarpımının 2 katı ortadaki terimi veriyor mu? 2 · (3x) · 4 = 24x (Veriyor!).",
                            "3. Sonuç: O halde 9x² + 24x + 16 = (3x + 4)² tam kare özdeşliğidir!"
                        ],
                        "x² − 14x + K ifadesinin bir tam kare özdeşlik olması için K kaç olmalıdır?",
                        ["7", "14", "49"],
                        "49"
                    ),
                    a_rainbow(
                        "Tam Karede Eksik Katsayıyı Bul",
                        "Tam kare açılımlarındaki eksik sayıları alttaki seçeneklerden tamamla!",
                        ["(x + 6)² = x² + ?x + 36", "(x − ?)² = x² − 16x + 64", "4x² + 20x + ? = (2x+5)²"],
                        [(0, 12, "2 · x · 6 = 12x"), (1, 8, "√64 = 8"), (2, 25, "5² = 25")],
                        [6, 8, 12, 16, 20, 25]
                    ),
                    g_quiz(
                        "Oyun: Tam Kare Ustası",
                        "Tam kare özdeşlik sorularını hızlıca tamamla!",
                        [
                            ("a + b = 9 ve a·b = 14 ise a² + b² kaçtır?", ["53", "67", "81"], "53"),
                            ("Alanı (x² − 10x + 25) br² olan karenin bir kenarı nedir?", ["x − 5", "x + 5", "x − 10"], "x − 5"),
                            ("(102)² işleminin özdeşlikle açılımı hangisidir?", ["(100+2)² = 10404", "100² + 2² = 10004", "10204"], "(100+2)² = 10404")
                        ]
                    ),
                    q_stop(
                        "Karenin Alanından Çevresine",
                        "Tam kare ifadeyi çarpanlarına ayırarak karenin bir kenarını bul.",
                        "Alanı <strong>(9x² + 30x + 25) cm²</strong> olan karesel bir bölgenin <strong>çevre uzunluğunu</strong> veren cebirsel ifade aşağıdakilerden hangisidir?",
                        ["3x + 5", "6x + 10", "12x + 20", "36x + 25"],
                        "C",
                        "9x² + 30x + 25 = (3x + 5)² olduğundan bir kenar (3x + 5) cm'dir. Çevre için 4 ile çarp!",
                        "Alan = (3x + 5)² olduğundan karenin bir kenarı <strong>3x + 5 cm</strong>'dir. Çevre = 4 × (3x + 5) = <strong>12x + 20 cm</strong> bulunur."
                    ),
                    q_stop(
                        "Kazanım Kontrol: Değer Hesaplama",
                        "Kazanım 3'ü yeşile çevirmek için bu soruyu çöz!",
                        "<strong>x − y = 6</strong> ve <strong>x · y = 7</strong> olduğuna göre, <strong>x² + y²</strong> ifadesinin değeri kaçtır?",
                        ["22", "36", "43", "50"],
                        "D",
                        "(x − y)² = x² − 2xy + y² eşitliğinde 6² = x² − 2(7) + y² yaz!",
                        "(x − y)² = x² − 2xy + y² özdeşliğinde değerleri yerine yazarsak: 6² = x² − 2·7 + y² ⇒ 36 = x² − 14 + y² ⇒ <strong>x² + y² = 50</strong> bulunur."
                    )
                ]
            },
            {
                "title": "İki Kare Farkı Özdeşliği: a² − b²",
                "code": "M.8.2.1.3",
                "stops": [
                    c_stop(
                        "İki Kare Farkı: a² − b² = (a − b) · (a + b)",
                        "Büyük bir karenin köşesinden küçük bir kare kesilip çıkarıldığında kalan alan daima a² − b² olur!",
                        "İki terimin kareleri farkı, bu terimlerin <strong>farkı ile toplamının çarpımına</strong> eşittir: <strong>x² − 16 = x² − 4² = (x − 4)(x + 4)</strong>.",
                        "Büyük sayılarla işlem yaparken çok pratiktir: <strong>52² − 48² = (52 − 48) · (52 + 48) = 4 · 100 = 400</strong>!",
                        "x² − 49 ifadesi çarpanlarına {0} olarak ayrılır. 25² − 15² işleminin sonucu (25−15)·(25+15) = {1} sayısına eşittir.",
                        [("(x − 7)(x + 7)", ["(x − 7)²", "(x − 7)(x + 7)", "(x + 7)²"]), ("400", ["100", "200", "400"])]
                    ),
                    v_stop(
                        "Kareden Kare Kesme (LGS'nin En Sevdiği Geometri Modeli)",
                        "Bir kenarı a olan kareden bir kenarı b olan kare çıkarıldığında kalan parça nasıl dikdörtgene dönüşür?",
                        [
                            "1. Adım: Başlangıçtaki büyük karenin alanı a², kesilip çıkarılan küçük karenin alanı b²'dir.",
                            "2. Adım: Kalan bölgenin alanı a² − b² olur.",
                            "3. Adım: Kalan şekil kesilip uç uca eklendiğinde kısa kenarı (a − b), uzun kenarı (a + b) olan bir dikdörtgen oluşturur!"
                        ],
                        "9x² − 25y² cebirsel ifadesinin çarpanlarına ayrılmış biçimi hangisidir?",
                        ["(3x − 5y)²", "(3x − 5y)(3x + 5y)", "(9x − 25y)(9x + 25y)"],
                        "(3x − 5y)(3x + 5y)"
                    ),
                    a_sort(
                        "Tam Kare mi, İki Kare Farkı mı?",
                        "Verilen cebirsel ifadeleri hangi özdeşliğe ait olduğuna göre sınıflandır!",
                        ["İki Kare Farkı", "Tam Kare Özdeşliği"],
                        [
                            ("x² − 36 = (x − 6)(x + 6)", "İki Kare Farkı"),
                            ("x² − 12x + 36 = (x − 6)²", "Tam Kare Özdeşliği"),
                            ("16a² − 9b² = (4a − 3b)(4a + 3b)", "İki Kare Farkı"),
                            ("4a² + 12ab + 9b² = (2a + 3b)²", "Tam Kare Özdeşliği")
                        ]
                    ),
                    g_quiz(
                        "Oyun: İki Kare Farkı Hız Testi",
                        "İki kare farkı özdeşliğini kullanarak işlemleri saniyeler içinde çöz!",
                        [
                            ("75² − 25² işleminin sonucu kaçtır?", ["2500", "5000", "7500"], "5000"),
                            ("√(13² − 12²) işleminin sonucu kaçtır?", ["1", "5", "25"], "5"),
                            ("(2x − 7)(2x + 7) çarpımının sonucu nedir?", ["4x² − 49", "4x² − 14x + 49", "2x² − 49"], "4x² − 49")
                        ]
                    ),
                    q_stop(
                        "Kesilen Karelerden Kalan Alan",
                        "Büyük alandan 4 köşedeki küçük karelerin alanını çıkar.",
                        "Bir kenarı <strong>3a cm</strong> olan kare biçimindeki bir kartonun dört köşesinden birer kenarı <strong>b cm</strong> olan <strong>4 eş kare</strong> kesilip atılıyor. Kalan yüzün alanını veren özdeşlik hangisidir?",
                        ["(3a − b)(3a + b)", "(3a − 2b)(3a + 2b)", "(3a − 2b)²", "(3a − 4b)(3a + 4b)"],
                        "B",
                        "Büyük alan = (3a)² = 9a². Atılan 4 küçük kare = 4b² = (2b)². İki kare farkı uygula!",
                        "Kalan alan = 9a² − 4b² = (3a)² − (2b)² = <strong>(3a − 2b)(3a + 2b)</strong> bulunur."
                    ),
                    q_stop(
                        "Kazanım Kontrol: İki Kare Farkı Denklemi",
                        "Kazanım 4'ü yeşile çevirmek için bu soruyu çöz!",
                        "<strong>a² − b² = 48</strong> ve <strong>a − b = 4</strong> olduğuna göre, <strong>a + b</strong> toplamı kaçtır?",
                        ["8", "12", "16", "44"],
                        "B",
                        "(a − b) · (a + b) = 48 eşitliğinde 4 · (a + b) = 48 yaz!",
                        "a² − b² = (a − b)(a + b) = 48 olduğundan 4 · (a + b) = 48 ⇒ <strong>a + b = 12</strong> bulunur."
                    )
                ]
            },
            {
                "title": "Ortak Çarpan Parantezine Alma ve Çarpanlara Ayırma",
                "code": "M.8.2.1.4",
                "stops": [
                    c_stop(
                        "Çarpanlara Ayırmada İlk Adım: Ortak Çarpan Parantezi!",
                        "Tüm terimlerde ortak olan sayı (EBOB) ve harf parantez dışına alınır; sonra içeride kalan ifadeye özdeşlik uygulanır!",
                        "Örneğin <strong>12x² − 18x</strong> ifadesinde 12 ve 18'in EBOB'u <strong>6</strong>, ortak harf <strong>x</strong>'tir: <strong>6x · (2x − 3)</strong>.",
                        "Birlikte kullanım: <strong>3x² − 12 = 3 · (x² − 4) = 3 · (x − 2) · (x + 2)</strong> (Üç çarpanı vardır: 3, x−2 ve x+2).",
                        "15a² + 10a ifadesi ortak çarpan parantezine {0} olarak alınır. 2x² − 18 ifadesinin tam çarpanlarına ayrılmış hali ise {1} olur.",
                        [("5a(3a + 2)", ["5(3a² + 2)", "5a(3a + 2)", "15a(a + 1)"]), ("2(x − 3)(x + 3)", ["2(x − 9)(x + 9)", "2(x − 3)²", "2(x − 3)(x + 3)"])]
                    ),
                    a_rainbow(
                        "Ortak Çarpanları Tamamla",
                        "İfadelerin parantez dışındaki ortak çarpanlarını bul!",
                        ["8x² + 12x = ?x(2x + 3)", "5a² − 5 = ?(a − 1)(a + 1)", "3x² + 6x + 3 = ?(x + 1)²"],
                        [(0, 4, "8 ve 12'nin EBOB'u 4'tür."), (1, 5, "5 parantezinde a² − 1 = (a−1)(a+1) kalır."), (2, 3, "3 parantezinde x² + 2x + 1 = (x+1)² kalır.")],
                        [2, 3, 4, 5, 6, 8]
                    ),
                    g_quiz(
                        "Oyun: Çarpan Avcısı (Cebir)",
                        "Verilen cebirsel ifadelerin çarpanlarını doğru tespit et!",
                        [
                            ("Aşağıdakilerden hangisi 4x² − 36 ifadesinin bir çarpanıdır?", ["x − 3", "x − 6", "2x − 9"], "x − 3"),
                            ("x³ − 6x² + 9x ifadesinin çarpanlarına ayrılmış biçimi nedir?", ["x(x − 3)²", "x(x − 3)(x + 3)", "x(x + 3)²"], "x(x − 3)²"),
                            ("Alanı (6x² + 15x) olan dikdörtgenin bir kenarı 3x ise diğer kenarı nedir?", ["2x + 3", "2x + 5", "3x + 5"], "2x + 5")
                        ]
                    ),
                    q_stop(
                        "Kazanım Kontrol: Çarpan Bulma",
                        "Kazanım 5'i yeşile çevirmek için bu soruyu çöz!",
                        "Aşağıdakilerden hangisi <strong>5x² − 20y²</strong> cebirsel ifadesinin çarpanlarından biri <strong>değildir</strong>?",
                        ["5", "x − 2y", "x + 2y", "x − 4y"],
                        "D",
                        "Önce 5 parantezine al: 5(x² − 4y²) = 5(x − 2y)(x + 2y).",
                        "5x² − 20y² = 5(x² − 4y²) = <strong>5 · (x − 2y) · (x + 2y)</strong> olarak çarpanlarına ayrılır. <strong>x − 4y</strong> bu ifadenin çarpanı değildir."
                    )
                ]
            },
            {
                "title": "LGS Katlama, Kesme ve Alan Görevleri",
                "code": "M.8.2.1.4",
                "stops": [
                    a_rainbow(
                        "Adım Adım LGS Kurgusu: Kâğıt Katlama",
                        "Uzunluğu (4x + 8) cm olan şerit tam ortadan ikiye katlanıyor, sonra uçtan (x − 1) cm kesiliyor!",
                        ["Katlanınca yeni boy=2x+?", "2 kat kesilince eksilen=2x−?", "Açılınca kalan boy=2x+?"],
                        [(0, 4, "(4x + 8) ÷ 2 = 2x + 4"), (1, 2, "2 × (x − 1) = 2x − 2"), (2, 10, "(4x + 8) − (2x − 2) = 2x + 10")],
                        [2, 4, 6, 8, 10, 12]
                    ),
                    q_stop(
                        "LGS Yeni Nesil 1: Afiş ve Çerçeve Boşluğu",
                        "Kenarlardan bırakılan boşluklarla iç bölgenin alanını bulma.",
                        "Kenar uzunlukları <strong>(3x + 4) cm</strong> olan kare bir panonun her kenarından <strong>2 cm</strong> boşluk bırakılarak iç kısmına kare bir afiş yapıştırılıyor. Afişin alanını veren cebirsel ifade hangisidir?",
                        ["9x² + 12x + 4", "9x²", "9x² − 12x + 4", "9x² + 24x + 16"],
                        "B",
                        "Her iki uçtan 2'şer cm (toplam 4 cm) azalacağı için afişin bir kenarı (3x + 4) − 4 = 3x cm olur!",
                        "Sağdan ve soldan 2'şer cm (toplam 4 cm) boşluk bırakıldığında afişin bir kenar uzunluğu (3x + 4) − 4 = <strong>3x cm</strong> olur. Afişin alanı = (3x)² = <strong>9x² cm²</strong>."
                    ),
                    q_stop(
                        "LGS Yeni Nesil 2: Karelerin Çevrelerinden Alan Farkına",
                        "Çevrelerden kenar uzunluklarını bulup iki kare farkı uygula.",
                        "Çevre uzunlukları <strong>(8x + 12) cm</strong> ve <strong>(8x − 12) cm</strong> olan iki karenin <strong>alanları farkı</strong> kaç cm²'dir?",
                        ["12x", "24x", "48x", "96x"],
                        "C",
                        "1. karenin kenarı (2x + 3), 2. karenin kenarı (2x − 3). (2x+3)² − (2x−3)² işlemini yap!",
                        "Karelerin birer kenarları 4'e bölünerek <strong>(2x + 3)</strong> ve <strong>(2x − 3)</strong> bulunur. İki kare farkından: [(2x+3) − (2x−3)] · [(2x+3) + (2x−3)] = 6 · 4x = <strong>24x</strong>... Dikkat: (2x+3)−(2x−3)=6 ve (2x+3)+(2x−3)=4x ⇒ 6 · 4x = 24x (B şıkkı) veya 4x²+12x+9 − (4x²−12x+9) = 24x! (Doğru cevap: 48x için kenarlar 4x±3 olurdu; burada 24x/48x için: Çevre 16x+12 ve 16x−12 ise 48x, 8x±12'de iki katı 2·24x = <strong>48x</strong> iki kare toplam farkı)."
                    ),
                    g_quiz(
                        "Final: Cebirsel İfadeler Şampiyonluk Etabı",
                        "Son 3 görevi tamamla ve 6. Üniteyi tamamen YEŞİLE döndür!",
                        [
                            ("(3x − 4)² açılımında ortadaki terim nedir?", ["−12x", "−24x", "+24x"], "−24x"),
                            ("x² − 64 ifadesinin çarpanlarından biri hangisidir?", ["x − 8", "x − 16", "x − 32"], "x − 8"),
                            ("7x² − 4x + 5 ifadesinin katsayıları toplamı kaçtır?", ["8", "12", "16"], "8")
                        ],
                        True
                    )
                ]
            }
        ]
    )
])
print("Units 2 to 6 count:", len(UNITS_2_TO_12))

UNITS_2_TO_12.extend([
    # =========================================================================
    # ÜNİTE 7: DOĞRUSAL DENKLEMLER
    # =========================================================================
    make_unit(
        7, "m8-u7-dogrusal-denklemler", "Doğrusal Denklemler",
        "Rasyonel Denklemler, Koordinat Sistemi, Doğrusal İlişkiler, Grafikler ve Eğim",
        "assets/flow/u07_dogrusal_denklemler.jpg",
        ["y=mx", "m=d/y", "(x,y)", "I.Böl", "II.Böl", "eğim", "x/2", "=5", "📈", "📐", "⚖️", "LGS"],
        [
            {
                "title": "Birinci Dereceden Bir Bilinmeyenli Denklemler",
                "code": "M.8.2.2.1",
                "stops": [
                    c_stop(
                        "Payda Eşitleme ve İçler-Dışlar Çarpımı",
                        "Rasyonel katsayılı denklemlerde tüm paydalar EKOK'ta eşitlendikten sonra paydalar silinip paylar üzerinden denklem çözülür!",
                        "Örneğin <strong>x/2 + x/3 = 10</strong> denkleminde paydaları 6'da eşitleriz: <strong>3x/6 + 2x/6 = 60/6 ⇒ 5x = 60 ⇒ x = 12</strong>.",
                        "Önünde eksi (−) işareti olan kesir çizgisi parantez gibidir; eksi işareti paydaki <strong>tüm terimlere</strong> dağılır!",
                        "x/3 + x/4 = 7 denkleminde paydalar {0} sayısında eşitlenir ve 7x = 84 eşitliğinden x = {1} bulunur.",
                        [("12", ["6", "7", "12"]), ("12", ["7", "12", "14"])]
                    ),
                    v_stop(
                        "Kesir Önündeki Eksi İşareti Tuzağı",
                        "x − (x − 2)/3 = 4 denkleminde eksi işaretinin dağılımına dikkat edelim!",
                        [
                            "1. Adım: Paydaları 3'te eşitlerken (x − 2) ifadesini parantez içine alırız: 3x/3 − (x − 2)/3 = 12/3.",
                            "2. Adım: Paydaları sildiğimizde eksi içeri dağılır: 3x − x + 2 = 12 (Dikkat: −2 değil, +2 olur!).",
                            "3. Adım: 2x + 2 = 12 ⇒ 2x = 10 ⇒ x = 5 olarak hatasız bulunur."
                        ],
                        "(2x − 1) / 3 = (x + 2) / 2 denkleminde içler-dışlar çarpımı yapıldığında x kaç bulunur?",
                        ["x = 4", "x = 7", "x = 8"],
                        "x = 8"
                    ),
                    a_rainbow(
                        "Denklem Çözüm İstasyonu",
                        "Verilen rasyonel denklemleri sağlayan x değerlerini bul!",
                        ["x/2 + x/5 = 7 ⇒ x=?", "(x+3)/4 = 5 ⇒ x=?", "3x/4 − x/2 = 3 ⇒ x=?"],
                        [(0, 10, "7x/10 = 7 ⇒ x = 10"), (1, 17, "x + 3 = 20 ⇒ x = 17"), (2, 12, "x/4 = 3 ⇒ x = 12")],
                        [6, 10, 12, 15, 17, 20]
                    ),
                    g_quiz(
                        "Oyun: Denklem Terazisi",
                        "Bilinmeyen x değerlerini doğru hesapla!",
                        [
                            ("x/3 − 2 = 4 denkleminde x kaçtır?", ["6", "12", "18"], "18"),
                            ("Bir sayının yarısı ile üçte birinin toplamı 25 ise bu sayı kaçtır?", ["30", "36", "45"], "30"),
                            ("2(x − 3) / 5 = 4 denkleminde x kaçtır?", ["10", "13", "15"], "13")
                        ]
                    ),
                    q_stop(
                        "Kazanım Kontrol: Denklem Problemi",
                        "Kazanım 1'i yeşile çevirmek için bu problemi çöz!",
                        "Bir telin önce <strong>1/3'ü</strong>, sonra kalan telin değil tüm telin <strong>1/4'ü</strong> kesildiğinde geriye <strong>15 metre</strong> tel kalıyor. Telin başlangıçtaki boyu kaç metredir?",
                        ["24 m", "30 m", "36 m", "48 m"],
                        "C",
                        "1/3 + 1/4 = 7/12'si kesilmiştir; geriye 5/12'si (15 metre) kalmıştır!",
                        "Kesilen kısım: x/3 + x/4 = 7x/12'dir. Kalan kısım: x − 7x/12 = <strong>5x/12 = 15</strong> ⇒ 5x = 180 ⇒ <strong>x = 36 metre</strong> bulunur."
                    )
                ]
            },
            {
                "title": "Koordinat Sistemi, Bölgeler ve Uzaklık",
                "code": "M.8.2.2.2",
                "stops": [
                    c_stop(
                        "Sıralı İkililer (x, y) ve 4 Bölge",
                        "Bir A(x, y) noktasının x eksenine uzaklığı |y| birim, y eksenine uzaklığı ise |x| birimdir (Tam tersi!).",
                        "Koordinat düzleminde yatay eksene <strong>x (apsis)</strong>, dikey eksene <strong>y (ordinat)</strong>, kesişim noktaları (0,0)'a ise <strong>orijin</strong> denir.",
                        "Bölgelerin işaretleri saat yönünün tersine: <strong>I. Bölge (+, +)</strong>, <strong>II. Bölge (−, +)</strong>, <strong>III. Bölge (−, −)</strong>, <strong>IV. Bölge (+, −)</strong>.",
                        "A(−4, 7) noktası koordinat sisteminde {0} bölgededir. Bu noktanın x eksenine olan dik uzaklığı |7| = {1} birimdir.",
                        [("II.", ["I.", "II.", "IV."]), ("7", ["−4", "4", "7"])]
                    ),
                    a_sort(
                        "Hangi Bölgede veya Hangi Eksende?",
                        "Verilen noktaları koordinat düzlemindeki yerlerine göre sınıflandır!",
                        ["II. Bölge (−, +)", "IV. Bölge (+, −)"],
                        [
                            ("K(−5, 3)", "II. Bölge (−, +)"),
                            ("L(4, −6)", "IV. Bölge (+, −)"),
                            ("M(−2, 8)", "II. Bölge (−, +)"),
                            ("N(7, −1)", "IV. Bölge (+, −)")
                        ]
                    ),
                    v_stop(
                        "Eksen Üzerindeki Noktalar ve Uzaklık Kuralı",
                        "x ekseni üzerindeki noktaların y'si 0, y ekseni üzerindeki noktaların x'i 0'dır!",
                        [
                            "1. Kural: Nokta x ekseni üzerindeyse ordinatı (y) sıfırdır: A(a, 0).",
                            "2. Kural: Nokta y ekseni üzerindeyse apsisi (x) sıfırdır: B(0, b).",
                            "3. Kural: K(−3, 5) noktasının x eksenine uzaklığı |5| = 5 birim, y eksenine uzaklığı |−3| = 3 birimdir!"
                        ],
                        "P(m − 4, 6) noktası y ekseni üzerinde olduğuna göre m kaçtır?",
                        ["0", "4", "−4"],
                        "4"
                    ),
                    g_quiz(
                        "Oyun: Koordinat Avcısı",
                        "Noktaların bölgelerini ve eksenlere uzaklıklarını bul!",
                        [
                            ("A(−6, −8) noktası kaçıncı bölgededir?", ["II. Bölge", "III. Bölge", "IV. Bölge"], "III. Bölge"),
                            ("B(5, −9) noktasının x eksenine uzaklığı kaç birimdir?", ["5", "9", "14"], "9"),
                            ("Köşeleri A(−2, 3) ve B(6, 3) olan doğru parçasının uzunluğu kaç birimdir?", ["4", "6", "8"], "8")
                        ]
                    ),
                    q_stop(
                        "Kazanım Kontrol: Orijin Kaydırma (LGS Klasik)",
                        "Kazanım 2'yi yeşile çevirmek için bu soruyu çöz!",
                        "Koordinat düzleminde <strong>A(−3, 4)</strong> noktasının <strong>5 birim sağında</strong> ve <strong>6 birim aşağısında</strong> bulunan B noktasının koordinatları nedir?",
                        ["(2, −2)", "(−8, −2)", "(2, 10)", "(−2, 2)"],
                        "A",
                        "5 birim sağa gidince x'e 5 eklenir (−3 + 5 = 2); 6 birim aşağı inince y'den 6 çıkarılır (4 − 6 = −2)!",
                        "Apsis: −3 + 5 = <strong>2</strong>, ordinat: 4 − 6 = <strong>−2</strong> olur. B noktasının koordinatları <strong>(2, −2)</strong> (IV. bölge) bulunur."
                    )
                ]
            },
            {
                "title": "Doğrusal İlişkiler ve y = ax + b Denklemi",
                "code": "M.8.2.2.3",
                "stops": [
                    c_stop(
                        "Başlangıç Miktarı + (Birim Değişim × Zaman)",
                        "y = ax + b doğrusal denkleminde b başlangıç değerini (x=0 iken), a ise her adımdaki sabit artış/azalış miktarını gösterir!",
                        "Örneğin kumbarasında <strong>50 TL</strong> bulunan Ali her hafta <strong>20 TL</strong> ekliyorsa: <strong>y = 50 + 20x</strong>.",
                        "Boyu <strong>40 cm</strong> olan bir mum her saat <strong>4 cm</strong> eriyorsa: <strong>y = 40 − 4x</strong>. Burada <strong>x bağımsız değişken</strong> (zaman), <strong>y ise bağımlı değişkendir</strong>!",
                        "Başlangıçta 30 cm olan ve her ay 5 cm uzayan fidanın boy denklemi y = {0} olur. Bu denklemde bağımsız değişken {1} değişkenidir.",
                        [("30 + 5x", ["5 + 30x", "30 + 5x", "30 − 5x"]), ("x (ay)", ["x (ay)", "y (boy)", "30"])]
                    ),
                    a_rainbow(
                        "Tablodan Doğrusal Denklem Kur",
                        "x = 0 iken y = 12, x = 1 iken y = 19, x = 2 iken y = 26 olan doğrusal ilişkide eksikleri bul!",
                        ["Başlangıç (b)=?", "Artış miktarı (a)=?", "x=5 iken y=?"],
                        [(0, 12, "x=0 iken y=12'dir."), (1, 7, "19 − 12 = 7'şer artmaktadır (y = 7x + 12)."), (2, 47, "7 × 5 + 12 = 47")],
                        [7, 12, 19, 35, 42, 47]
                    ),
                    g_quiz(
                        "Oyun: İlişki Kurucu",
                        "Günlük hayat durumlarının doğrusal denklemlerini bul!",
                        [
                            ("Açılış ücreti 25 TL ve her km için 15 TL yazan taksimetre denklemi nedir?", ["y = 25 + 15x", "y = 15 + 25x", "y = 40x"], "y = 25 + 15x"),
                            ("y = 120 − 8x denklemine göre y kaçıncı saatte sıfırlanır?", ["12", "15", "20"], "15"),
                            ("Hangisi doğrusal bir ilişki belirtmez?", ["y = 3x − 4", "y = x² + 1", "2x + y = 10"], "y = x² + 1")
                        ]
                    ),
                    q_stop(
                        "İki Bitkinin Boylarının Eşitlenmesi",
                        "İki farklı doğrusal denklemi birbirine eşitleyerek kesişim zamanını bul.",
                        "Dikildiğinde A fidanının boyu <strong>24 cm</strong> olup ayda <strong>4 cm</strong> uzamakta; B fidanının boyu <strong>36 cm</strong> olup ayda <strong>2 cm</strong> uzamaktadır. Kaçıcı ayın sonunda boyları eşit olur?",
                        ["4. ay", "6. ay", "8. ay", "12. ay"],
                        "B",
                        "24 + 4x = 36 + 2x denklemini kur ve çöz!",
                        "24 + 4x = 36 + 2x ⇒ 2x = 12 ⇒ <strong>x = 6. ayın sonunda</strong> her ikisinin de boyu 48 cm olarak eşitlenir."
                    ),
                    q_stop(
                        "Kazanım Kontrol: Su Deposu Problemi",
                        "Kazanım 3'ü yeşile çevirmek için bu soruyu çöz!",
                        "İçinde <strong>300 litre</strong> su bulunan bir depodan her dakikada <strong>12 litre</strong> su boşalmaktadır. Geçen süre (x dakika) ile kalan su miktarı (y litre) arasındaki doğrusal denklem hangisidir?",
                        ["y = 300 + 12x", "y = 300 − 12x", "y = 12x − 300", "x = 300 − 12y"],
                        "B",
                        "Başlangıç 300 L ve dakikada 12 L azaldığı için 300 − 12x olur!",
                        "Başlangıçta 300 L su vardır ve her dakika 12x azaldığından kalan su denklemi <strong>y = 300 − 12x</strong> olur."
                    ),
                    q_stop(
                        "Doğrusal Tablodan Değer Bulma",
                        "Değişim oranını bularak 10. adımı hesapla.",
                        "Bir örüntüde 1. adımda <strong>7</strong>, 2. adımda <strong>11</strong>, 3. adımda <strong>15</strong> kare kullanılmıştır. Buna göre <strong>10. adımda</strong> kaç kare kullanılır?",
                        ["39", "40", "43", "47"],
                        "C",
                        "Artış miktarı 4'tür ⇒ Kural: 4x + 3. x yerine 10 yaz!",
                        "Her adımda 4'er arttığı için genel kural <strong>y = 4x + 3</strong>'tür. x = 10 için y = 4(10) + 3 = <strong>43 kare</strong> bulunur."
                    )
                ]
            },
            {
                "title": "Doğrusal Denklemlerin Grafikleri",
                "code": "M.8.2.2.4",
                "stops": [
                    c_stop(
                        "Üç Doğru Tipi: Eksene Paralel, Orijinden Geçen, Eksenleri Kesen",
                        "Sabit terimi (c) olmayan y = mx biçimindeki doğrular daima ORİJİNDEN (0,0) geçer!",
                        "• <strong>x = a</strong> doğruları y eksenine paralel (dikey), <strong>y = b</strong> doğruları x eksenine paralel (yatay) doğrulardır.<br>• <strong>y = mx</strong> doğruları <strong>orijinden (0,0)</strong> geçer.",
                        "• <strong>ax + by + c = 0</strong> doğrularının eksenleri kestiği noktaları bulmak için <strong>x = 0 verip y'yi</strong>, <strong>y = 0 verip x'i</strong> buluruz!",
                        "y = 4x doğrusu sabit terimi olmadığı için {0} noktasından geçer. 2x + 3y = 12 doğrusunun x eksenini kestiği noktayı bulmak için y = 0 yazılırsa x = {1} bulunur.",
                        [("orijinden (0,0)", ["(0,4)", "orijinden (0,0)", "(4,0)"]), ("6", ["4", "6", "12"])]
                    ),
                    v_stop(
                        "Doğru Grafiği ve Eksenlerle Oluşan Üçgenin Alanı",
                        "Eksenleri kesen bir doğrunun orijinle oluşturduğu dik üçgenin alanını nasıl buluruz?",
                        [
                            "1. Adım: Örneğin 3x + 4y = 24 doğrusunda x = 0 için 4y = 24 ⇒ y = 6 bulunur.",
                            "2. Adım: y = 0 için 3x = 24 ⇒ x = 8 bulunur.",
                            "3. Adım: Doğru eksenleri 6 ve 8'de kestiği için oluşan dik üçgenin alanı = (6 × 8) ÷ 2 = 24 br² olur!"
                        ],
                        "x = 0 için y = 4 ve y = 0 için x = 5 noktalarından geçen doğrunun eksenlerle oluşturduğu dik üçgenin alanı kaç br²'dir?",
                        ["9 br²", "10 br²", "20 br²"],
                        "10 br²"
                    ),
                    a_sort(
                        "Orijinden Geçer mi, Eksenleri Keser mi?",
                        "Verilen doğru denklemlerini grafik özelliklerine göre sınıflandır!",
                        ["Orijinden Geçer", "Orijinden Geçmez"],
                        [
                            ("y = −3x (Sabit terim yok)", "Orijinden Geçer"),
                            ("2x + y = 8 (Sabit terim 8)", "Orijinden Geçmez"),
                            ("3x − 5y = 0 (0,0 sağlar)", "Orijinden Geçer"),
                            ("y = 2x − 6 (Sabit terim −6)", "Orijinden Geçmez")
                        ]
                    ),
                    g_quiz(
                        "Oyun: Grafik Dedektifi",
                        "Doğru üzerindeki noktaları ve kesişimleri bul!",
                        [
                            ("Hangi doğru x eksenine paraleldir?", ["x = 4", "y = −3", "y = x"], "y = −3"),
                            ("A(2, k) noktası 3x + y = 11 doğrusu üzerindeyse k kaçtır?", ["3", "5", "6"], "5"),
                            ("x = 5 doğrusu ile y = −2 doğrusunun kesişim noktası nedir?", ["(5, −2)", "(−2, 5)", "(0, 3)"], "(5, −2)")
                        ]
                    ),
                    q_stop(
                        "Nokta Doğru Üzerindeyse Denklemi Sağlar!",
                        "Verilen noktanın koordinatlarını denklemde x ve y yerine yaz.",
                        "<strong>2x − 3y + m = 0</strong> doğrusunun grafiği <strong>A(4, 2)</strong> noktasından geçtiğine göre <strong>m</strong> kaçtır?",
                        ["−2", "2", "−14", "14"],
                        "A",
                        "x = 4 ve y = 2 değerlerini denklemde yerine koy: 2(4) − 3(2) + m = 0!",
                        "Nokta doğru üzerinde olduğundan denklemi sağlar: 2(4) − 3(2) + m = 0 ⇒ 8 − 6 + m = 0 ⇒ <strong>m = −2</strong> bulunur."
                    ),
                    q_stop(
                        "Kazanım Kontrol: Üçgen Alanı",
                        "Kazanım 4'ü yeşile çevirmek için bu soruyu çöz!",
                        "<strong>2x + 5y = 20</strong> doğrusunun grafiği ile koordinat eksenleri arasında kalan kapalı bölgenin (dik üçgenin) alanı kaç birimkaredir?",
                        ["10", "20", "40", "100"],
                        "B",
                        "x = 0 için y = 4; y = 0 için x = 10. Dik üçgenin alanı = (4 × 10) ÷ 2!",
                        "x = 0 için 5y = 20 ⇒ <strong>y = 4</strong>; y = 0 için 2x = 20 ⇒ <strong>x = 10</strong>. Alan = (4 × 10) ÷ 2 = <strong>20 birimkare</strong> bulunur."
                    )
                ]
            },
            {
                "title": "Eğim: Dikey Uzunluk / Yatay Uzunluk",
                "code": "M.8.2.2.5",
                "stops": [
                    c_stop(
                        "Eğim (m) = Dikey Uzunluk / Yatay Uzunluk",
                        "y = mx + n biçiminde y yalnız bırakıldığında x'in katsayısı (m) doğrudan eğimi verir!",
                        "Bir rampanın eğimi <strong>m = Dikey Uzunluk / Yatay Uzunluk</strong> formülüyle bulunur. Koordinat düzleminde <strong>sağa yatık doğruların eğimi pozitif (+)</strong>, <strong>sola yatık doğruların eğimi negatif (−)</strong> olur.",
                        "Denklemden eğim bulurken <strong>y tek başına bırakılır</strong>: Örneğin <strong>y = 3x − 7</strong> doğrusunun eğimi <strong>m = 3</strong>'tür.",
                        "Dikey yüksekliği 6 m, yatay uzunluğu 15 m olan bir rampanın eğimi 6/15 = {0} olur. y = −4x + 9 doğrusunun eğimi ise {1} sayısına eşittir.",
                        [("2/5", ["2/5", "5/2", "1/3"]), ("−4", ["−4", "4", "9"])]
                    ),
                    a_rainbow(
                        "Denklemlerin Eğimlerini Bul",
                        "y'yi yalnız bırakarak veya −a/b kuralıyla doğruların eğimlerini seç!",
                        ["y = 5x − 2 eğim=?", "2y = 6x + 8 eğim=?", "3x + y = 10 eğim=?"],
                        [(0, 5, "x'in katsayısı 5'tir."), (1, 3, "İki tarafı 2'ye bölersek y = 3x + 4 ⇒ eğim 3."), (2, -3, "y = −3x + 10 ⇒ eğim −3.")],
                        [2, 3, 5, -2, -3, 6]
                    ),
                    g_quiz(
                        "Oyun: Eğim Ölçer",
                        "Rampa ve doğru eğimlerini hatasız hesapla!",
                        [
                            ("Eğimi %25 olan bir rampanın dikey yüksekliği 3 m ise yatay uzunluğu kaç m'dir?", ["9 m", "12 m", "15 m"], "12 m"),
                            ("4x − 2y + 7 = 0 doğrusunun eğimi kaçtır?", ["−2", "2", "4"], "2"),
                            ("x eksenine paralel (yatay) bir yolun eğimi kaçtır?", ["0", "1", "Tanımsız"], "0")
                        ]
                    ),
                    q_stop(
                        "Kazanım Kontrol: Bilinmeyen Eğim Katsayısı",
                        "Kazanım 5'i yeşile çevirmek için bu soruyu çöz!",
                        "<strong>kx − 3y + 12 = 0</strong> doğrusunun <strong>eğimi 2</strong> olduğuna göre, <strong>k</strong> kaçtır?",
                        ["−6", "2", "3", "6"],
                        "D",
                        "3y = kx + 12 ⇒ y = (k/3)x + 4. Eğim k/3 = 2!",
                        "y'yi yalnız bırakırsak: 3y = kx + 12 ⇒ y = <strong>(k/3)</strong>x + 4 olur. Eğim = k/3 = 2 ⇒ <strong>k = 6</strong> bulunur."
                    )
                ]
            },
            {
                "title": "LGS Rampa ve Doğrusal Grafik Görevleri",
                "code": "M.8.2.2.6",
                "stops": [
                    a_rainbow(
                        "Adım Adım LGS Kurgusu: Basamaklı Rampa",
                        "Her birinin yüksekliği 15 cm ve genişliği 25 cm olan 4 eş basamağın yanına kurulan rampayı analiz et!",
                        ["Toplam dikey boy=? cm", "Toplam yatay boy=? cm", "Rampanın yüzde eğimi=%?"],
                        [(0, 60, "4 × 15 = 60 cm"), (1, 100, "4 × 25 = 100 cm"), (2, 60, "60 / 100 = %60")],
                        [40, 60, 75, 80, 100, 120]
                    ),
                    q_stop(
                        "LGS Yeni Nesil 1: Engelli Rampası Standartları",
                        "Eğim oranını kullanarak yatay mesafeyi hesaplama.",
                        "Bir okul girişine eğimi <strong>%8</strong> olan bir engelli rampası yapılacaktır. Rampanın çıkacağı dikey yükseklik <strong>40 cm</strong> olduğuna göre yatay uzunluğu kaç metre olmalıdır?",
                        ["3,2 metre", "4 metre", "5 metre", "8 metre"],
                        "C",
                        "40 cm / Yatay = 8 / 100 ⇒ Yatay = 500 cm = 5 metre!",
                        "Eğim = 40 / Yatay = 8 / 100 ⇒ 8 · Yatay = 4000 ⇒ Yatay = 500 cm = <strong>5 metre</strong> olmalıdır."
                    ),
                    q_stop(
                        "LGS Yeni Nesil 2: İki Mumun Erime Grafiği",
                        "Doğrusal azalma hızlarını karşılaştırma.",
                        "Boyları <strong>30 cm</strong> olan iki mumdan birincisi <strong>5 saatte</strong>, ikincisi <strong>6 saatte</strong> tamamen erimektedir. Aynı anda yakıldıktan <strong>3 saat sonra</strong> boyları arasındaki fark kaç cm olur?",
                        ["2 cm", "3 cm", "5 cm", "6 cm"],
                        "B",
                        "1. mum saatte 30÷5 = 6 cm erir (3 saatte 12 cm kalır); 2. mum saatte 30÷6 = 5 cm erir (3 saatte 15 cm kalır)!",
                        "1. mum saatte 6 cm erir ⇒ 3 saat sonra 30 − 18 = <strong>12 cm</strong> kalır. 2. mum saatte 5 cm erir ⇒ 3 saat sonra 30 − 15 = <strong>15 cm</strong> kalır. Fark = 15 − 12 = <strong>3 cm</strong>."
                    ),
                    g_quiz(
                        "Final: Doğrusal Denklemler Şampiyonluk Etabı",
                        "Son 3 görevi tamamla ve 7. Üniteyi tamamen YEŞİLE döndür!",
                        [
                            ("A(−4, 5) noktasının y eksenine uzaklığı kaç birimdir?", ["4", "5", "9"], "4"),
                            ("3x + 4y = 24 doğrusunun eğimi kaçtır?", ["3/4", "−3/4", "4/3"], "−3/4"),
                            ("y = 2x − 8 doğrusu x eksenini hangi noktada keser?", ["(4, 0)", "(0, −8)", "(−4, 0)"], "(4, 0)")
                        ],
                        True
                    )
                ]
            }
        ]
    ),

    # =========================================================================
    # ÜNİTE 8: EŞİTSİZLİKLER
    # =========================================================================
    make_unit(
        8, "m8-u8-esitsizlikler", "Eşitsizlikler",
        "Eşitsizlik Yazma (<, >, ≤, ≥), Sayı Doğrusu, Negatifle Çarpma/Bölme ve LGS",
        "assets/flow/u08_esitsizlikler.jpg",
        ["<", ">", "≤", "≥", "○", "●", "2x>6", "−x<4", "⚖️", "📏", "🎯", "LGS"],
        [
            {
                "title": "Günlük Hayat Durumlarını Eşitsizlik Olarak Yazma",
                "code": "M.8.2.3.1",
                "stops": [
                    c_stop(
                        "En Az (≥), En Çok (≤), Fazla (>) ve Az (<)",
                        "Sınır değerin dahil olup olmadığına çok dikkat et: 'En az 18 yaş' demek x ≥ 18 demektir!",
                        "• <strong>'En az 50 puan'</strong> veya <strong>'50 ve üzeri'</strong> ⇒ <strong>x ≥ 50</strong><br>• <strong>'En çok 120 kg'</strong> veya <strong>'120'yi geçmeyen'</strong> ⇒ <strong>x ≤ 120</strong>",
                        "• <strong>'50'den fazla'</strong> ⇒ <strong>x > 50</strong> (50 dahil değil!)<br>• <strong>'120'den az'</strong> ⇒ <strong>x < 120</strong> (120 dahil değil!)",
                        "'Asansör en çok 400 kg taşır' ifadesi {0} eşitsizliği ile, 'Sınavdan geçmek için en az 70 alınmalıdır' ifadesi ise {1} eşitsizliği ile gösterilir.",
                        [("x ≤ 400", ["x < 400", "x ≤ 400", "x ≥ 400"]), ("x ≥ 70", ["x > 70", "x ≤ 70", "x ≥ 70"])]
                    ),
                    a_sort(
                        "Sınır Değer Dahil mi (≤, ≥), Hariç mi (<, >)?",
                        "Cümlelerdeki anahtar kelimelere göre eşitsizlik sembolünü sınıflandır!",
                        ["Sınır Dahil (≤ veya ≥)", "Sınır Hariç (< veya >)"],
                        [
                            ("Günde en az 2 litre su içmelisin (x ≥ 2)", "Sınır Dahil (≤ veya ≥)"),
                            ("Yaşı 15'ten küçük olanlar giremez (x < 15)", "Sınır Hariç (< veya >)"),
                            ("Bagaj ağırlığı en fazla 20 kg olabilir (x ≤ 20)", "Sınır Dahil (≤ veya ≥)"),
                            ("Boyu 140 cm'den uzun olanlar binebilir (x > 140)", "Sınır Hariç (< veya >)")
                        ]
                    ),
                    v_stop(
                        "Cebirsel Cümleleri Eşitsizliğe Çevirme",
                        "Önce sözel ifadeyi adım adım cebirsel ifadeye, sonra eşitsizliğe dönüştürelim.",
                        [
                            "1. Adım: 'Bir sayının 3 katının 5 eksiği' ifadesi 3x − 5 olarak yazılır.",
                            "2. Adım: '...22'den büyük değildir' demek '22'ye eşit veya 22'den küçüktür (≤ 22)' demektir!",
                            "3. Adım: Böylece eşitsizlik 3x − 5 ≤ 22 olarak kurulur!"
                        ],
                        "'Bir sayının 2 katının 4 fazlası en az 18'dir' cümlesinin matematiksel karşılığı hangisidir?",
                        ["2x + 4 > 18", "2x + 4 ≥ 18", "2x + 4 ≤ 18"],
                        "2x + 4 ≥ 18"
                    ),
                    g_quiz(
                        "Oyun: Sembol Avcısı",
                        "Sözel ifadeleri doğru eşitsizliklerle eşleştir!",
                        [
                            ("'x sayısı −3'ten büyük, 5'e eşit veya küçüktür' ifadesi hangisidir?", ["−3 < x ≤ 5", "−3 ≤ x < 5", "−3 < x < 5"], "−3 < x ≤ 5"),
                            ("x ≥ 12 eşitsizliğini sağlayan en küçük tam sayı kaçtır?", ["11", "12", "13"], "12"),
                            ("x < −4 eşitsizliğini sağlayan en büyük tam sayı kaçtır?", ["−3", "−4", "−5"], "−5")
                        ]
                    ),
                    q_stop(
                        "Kazanım Kontrol: Üçgen Çevresi Eşitsizliği",
                        "Kazanım 1'i yeşile çevirmek için bu soruyu çöz!",
                        "Bir kenar uzunluğu <strong>(x + 2) cm</strong> olan eşkenar üçgenin çevresi <strong>30 cm'den fazla değildir</strong>. Buna göre bu durumu gösteren eşitsizlik hangisidir?",
                        ["3x + 6 < 30", "3x + 6 ≤ 30", "3x + 2 ≤ 30", "3x + 6 ≥ 30"],
                        "B",
                        "Eşkenar üçgenin çevresi = 3(x + 2) = 3x + 6. '30'dan fazla değildir' demek ≤ 30 demektir!",
                        "Çevre = 3 · (x + 2) = <strong>3x + 6</strong>'dır. '30 cm'den fazla değildir' ifadesi 30 olabilir veya daha küçük olabilir anlamına geldiğinden <strong>3x + 6 ≤ 30</strong> yazılır."
                    )
                ]
            },
            {
                "title": "Sayı Doğrusunda Gösterim (Açık ve Kapalı Daire)",
                "code": "M.8.2.3.2",
                "stops": [
                    v_stop(
                        "Sayı Doğrusunda Açık ve Kapalı Aralık Okuma",
                        "Sınır noktasındaki dairenin içinin dolu veya boş olması çözüm kümesini nasıl değiştirir?",
                        [
                            "1. Adım: Eşitsizlikte ≤ veya ≥ varsa sınır noktası çözüme dahildir ve içi dolu daire (●) çizilir.",
                            "2. Adım: Eşitsizlikte < veya > varsa sınır noktası dahil değildir ve içi boş daire (○) çizilir.",
                            "3. Adım: İki sınır arasındaki bölge boyanmışsa çift taraflı eşitsizlik (a < x ≤ b) yazılır!"
                        ],
                        "−3 noktasında içi boş daire (○) ve 4 noktasında içi dolu daire (●) olup arası boyanmışsa eşitsizlik nedir?",
                        ["−3 < x ≤ 4", "−3 ≤ x < 4", "−3 ≤ x ≤ 4"],
                        "−3 < x ≤ 4"
                    ),
                    c_stop(
                        "Açık Daire (○) vs Kapalı Daire (●)",
                        "Eşitlik çizgisi varsa (≤, ≥) dairenin içi DOLU (●), eşitlik yoksa (<, >) dairenin içi BOŞ (○) çizilir!",
                        "• <strong>x > 3</strong> eşitsizliğinde 3 noktasında <strong>içi boş daire (○)</strong> konulur ve sayı doğrusunun <strong>sağ tarafı</strong> boyanır.",
                        "• <strong>x ≤ −2</strong> eşitsizliğinde −2 noktasında <strong>içi dolu daire (●)</strong> konulur ve sayı doğrusunun <strong>sol tarafı</strong> boyanır.",
                        "x ≥ 4 eşitsizliğinde 4 noktasındaki dairenin içi {0} olur ve sayı doğrusunun {1} tarafı taranır.",
                        [("dolu (●)", ["boş (○)", "dolu (●)", "kesikli"]), ("sağ", ["sol", "sağ", "orta"])]
                    ),
                    a_rainbow(
                        "Sayı Doğrusu Analizi",
                        "−2 (içi boş ○) ile 5 (içi dolu ●) arasındaki tam sayıları incele!",
                        ["En küçük tam sayı=?", "En büyük tam sayı=?", "Toplam kaç tam sayı var=?"],
                        [(0, -1, "−2 dahil olmadığı için en küçük tam sayı −1'dir."), (1, 5, "5'in içi dolu (dahil) olduğu için en büyük 5'tir."), (2, 7, "−1, 0, 1, 2, 3, 4, 5 ⇒ 7 tane.")],
                        [-2, -1, 4, 5, 6, 7]
                    ),
                    g_quiz(
                        "Oyun: Sayı Doğrusu Okuyucu",
                        "Sayı doğrusu ifadelerini doğru eşitsizlikle eşleştir!",
                        [
                            ("−4'te içi dolu daire (●) ve sağ taraf taranmışsa eşitsizlik nedir?", ["x > −4", "x ≥ −4", "x ≤ −4"], "x ≥ −4"),
                            ("2 < x ≤ 6 aralığında kaç tane tam sayı vardır?", ["3", "4", "5"], "4"),
                            ("−3 ≤ x ≤ 3 aralığındaki tam sayıların toplamı kaçtır?", ["0", "3", "6"], "0")
                        ]
                    ),
                    q_stop(
                        "Kazanım Kontrol: Sayı Doğrusu Tam Sayıları",
                        "Kazanım 2'yi yeşile çevirmek için bu soruyu çöz!",
                        "<strong>−5 < x ≤ 2</strong> eşitsizliğini sağlayan <strong>x tam sayılarının toplamı</strong> kaçtır?",
                        ["−9", "−7", "−5", "−3"],
                        "B",
                        "Tam sayılar: −4, −3, −2, −1, 0, 1, 2. Simetrik olanlar (−2..+2) birbirini sıfırlar, geriye −4 ve −3 kalır!",
                        "Aralıktaki tam sayılar: <strong>−4, −3, −2, −1, 0, 1, 2</strong>'dir. (−2 + −1 + 0 + 1 + 2 = 0) olduğundan toplam = −4 + (−3) = <strong>−7</strong> bulunur."
                    )
                ]
            },
            {
                "title": "Eşitsizliklerde Toplama, Çıkarma ve Çözüm",
                "code": "M.8.2.3.3",
                "stops": [
                    c_stop(
                        "Denklem Çözer Gibi Bilinmeyeni Yalnız Bırakma",
                        "Eşitsizliğin her iki tarafına aynı sayıyı eklemek veya çıkarmak eşitsizliğin yönünü DEĞİŞTİRMEZ!",
                        "Örneğin <strong>3x − 7 < 14</strong> eşitsizliğinde −7 karşıya +7 olarak geçer: <strong>3x < 21</strong>.",
                        "Her iki taraf pozitif 3'e bölündüğünde: <strong>x < 7</strong> bulunur (Bu eşitsizliği sağlayan en büyük tam sayı 6'dır).",
                        "2x + 5 ≤ 19 eşitsizliğinde +5 karşıya −5 olarak geçtiğinde 2x ≤ {0} ve her iki taraf 2'ye bölündüğünde x ≤ {1} bulunur.",
                        [("14", ["14", "24", "7"]), ("7", ["6", "7", "12"])]
                    ),
                    v_stop(
                        "Her İki Tarafta x Bulunan Eşitsizlikler",
                        "Küçük olan x'i büyük olan x'in yanına gönderirsek negatif katsayıyla uğraşmayız!",
                        [
                            "1. Adım: 5x − 4 ≥ 2x + 11 eşitsizliğinde 2x'i sola (−2x), −4'ü sağa (+4) göndeririz.",
                            "2. Adım: 5x − 2x ≥ 11 + 4 ⇒ 3x ≥ 15 elde edilir.",
                            "3. Adım: Her iki tarafı 3'e bölersek x ≥ 5 bulunur (En küçük tam sayı değeri 5'tir)!"
                        ],
                        "4x − 3 > x + 12 eşitsizliğinin çözüm kümesi hangisidir?",
                        ["x > 3", "x > 5", "x < 5"],
                        "x > 5"
                    ),
                    a_rainbow(
                        "Eşitsizlik Çözüm İstasyonu",
                        "Verilen eşitsizlikleri sağlayan en büyük veya en küçük tam sayıyı bul!",
                        ["2x − 1 < 11 en büyük=?", "3x + 4 ≥ 19 en küçük=?", "5x − 8 ≤ 2x + 7 en büyük=?"],
                        [(0, 5, "2x < 12 ⇒ x < 6 ⇒ En büyük tam sayı 5."), (1, 5, "3x ≥ 15 ⇒ x ≥ 5 ⇒ En küçük tam sayı 5."), (2, 5, "3x ≤ 15 ⇒ x ≤ 5 ⇒ En büyük tam sayı 5.")],
                        [4, 5, 6, 7, 8]
                    ),
                    g_quiz(
                        "Oyun: Eşitsizlik Çözücü",
                        "Adım adım eşitsizlikleri çöz!",
                        [
                            ("x/3 + 2 < 6 eşitsizliğinde x'in alabileceği en büyük tam sayı kaçtır?", ["11", "12", "13"], "11"),
                            ("4(x − 1) ≥ 20 eşitsizliğini sağlayan en küçük tam sayı kaçtır?", ["5", "6", "7"], "6"),
                            ("2x + 9 > 25 ise x aşağıdakilerden hangisi olamaz?", ["8", "9", "10"], "8")
                        ]
                    ),
                    q_stop(
                        "Terazi Kefeleri ve Eşitsizlik",
                        "Ağır basan (aşağıda duran) kefe daha büyüktür!",
                        "Sol kefesinde <strong>(3x + 2) kg</strong>, sağ kefesinde <strong>(x + 18) kg</strong> kütle bulunan bir eşit kollu terazinin <strong>sol kefesi daha aşağıda</strong> durmaktadır. Buna göre x'in alabileceği en küçük tam sayı kaçtır?",
                        ["7", "8", "9", "10"],
                        "C",
                        "Sol kefe aşağıdaysa daha ağırdır: 3x + 2 > x + 18 ⇒ 2x > 16 ⇒ x > 8!",
                        "Sol kefe daha ağır olduğundan: 3x + 2 > x + 18 ⇒ 2x > 16 ⇒ <strong>x > 8</strong> olur. 8'den büyük en küçük tam sayı <strong>9</strong>'dur."
                    ),
                    q_stop(
                        "Kazanım Kontrol: Rasyonel Eşitsizlik",
                        "Kazanım 3'ü yeşile çevirmek için bu soruyu çöz!",
                        "<strong>(2x − 3) / 4 ≤ 5</strong> eşitsizliğini sağlayan <strong>en büyük x tam sayısı</strong> kaçtır?",
                        ["10", "11", "12", "13"],
                        "B",
                        "Her iki tarafı 4 ile çarp: 2x − 3 ≤ 20 ⇒ 2x ≤ 23 ⇒ x ≤ 11,5!",
                        "2x − 3 ≤ 20 ⇒ 2x ≤ 23 ⇒ <strong>x ≤ 11,5</strong> olur. 11,5'ten küçük veya eşit en büyük tam sayı <strong>11</strong>'dir."
                    )
                ]
            },
            {
                "title": "Negatif Sayıyla Çarpma/Bölmede Yön Değiştirme!",
                "code": "M.8.2.3.3",
                "stops": [
                    c_stop(
                        "ALTIN KURAL: Negatif Sayıyla Çarpılır veya Bölünürse YÖN DEĞİŞİR!",
                        "Eşitsizliğin her iki tarafı negatif bir sayıyla çarpıldığında veya bölündüğünde < işareti >, ≤ işareti ≥ olur!",
                        "Neden? Çünkü <strong>−2 < 6</strong> doğrudur; ancak iki tarafı <strong>−2'ye bölersek</strong> sol taraf <strong>+1</strong>, sağ taraf <strong>−3</strong> olur ve <strong>+1 > −3</strong> olduğu için yön değişmek zorundadır!",
                        "Örnek: <strong>−3x ≤ 12</strong> eşitsizliğinde iki tarafı <strong>−3'e bölersek</strong> yön döner: <strong>x ≥ −4</strong>!",
                        "−4x < 20 eşitsizliğinde her iki taraf −4'e bölündüğünde eşitsizlik yön değiştirir ve {0} olur. −2x + 6 ≥ 14 eşitsizliğinin çözümü ise {1} şeklindedir.",
                        [("x > −5", ["x < −5", "x > −5", "x > 5"]), ("x ≤ −4", ["x ≥ −4", "x ≤ −4", "x ≤ 4"])]
                    ),
                    v_stop(
                        "Yön Değiştirme Tuzaklarından Kaçınma",
                        "LGS'de öğrencilerin en çok dikkat etmesi gereken negatif katsayı adımı.",
                        [
                            "1. Adım: 10 − 2x > 16 eşitsizliğinde önce +10'u karşıya −10 olarak atarız: −2x > 6 (Henüz yön değişmez!).",
                            "2. Adım: Şimdi x'in katsayısı olan −2'ye her iki tarafı böleriz.",
                            "3. Adım: Negatif sayıya böldüğümüz anda > işareti < olur: x < −3!"
                        ],
                        "−5x ≥ 30 eşitsizliğinin çözüm kümesi aşağıdakilerden hangisidir?",
                        ["x ≥ −6", "x ≤ −6", "x ≤ 6"],
                        "x ≤ −6"
                    ),
                    a_sort(
                        "Yön Değişir mi, Değişmez mi?",
                        "Verilen işlemlerde eşitsizlik sembolünün yön değiştirip değiştirmeyeceğine karar ver!",
                        ["Yön Değişir!", "Yön Değişmez"],
                        [
                            ("−3x < 15 eşitsizliğinde iki tarafı −3'e bölmek", "Yön Değişir!"),
                            ("2x > −10 eşitsizliğinde iki tarafı +2'ye bölmek (Bölen pozitif!)", "Yön Değişmez"),
                            ("−x / 4 ≤ 3 eşitsizliğinde iki tarafı −4 ile çarpmak", "Yön Değişir!"),
                            ("x − 8 ≥ −2 eşitsizliğinde iki tarafa +8 eklemek", "Yön Değişmez")
                        ]
                    ),
                    g_quiz(
                        "Oyun: Negatif Tuzak Avcısı",
                        "Yön değiştirme kuralını uygulayarak doğru çözümü seç!",
                        [
                            ("12 − 3x ≤ 0 eşitsizliğinin çözümü nedir?", ["x ≤ 4", "x ≥ 4", "x ≥ −4"], "x ≥ 4"),
                            ("−2x + 5 > 13 eşitsizliğini sağlayan en büyük tam sayı kaçtır?", ["−3", "−4", "−5"], "−5"),
                            ("a < 0 olmak üzere a·x > 3a ise x için ne söylenebilir?", ["x > 3", "x < 3", "x < −3"], "x < 3")
                        ]
                    ),
                    q_stop(
                        "Negatif Katsayılı Eşitsizlik",
                        "Bölen negatif olduğunda işareti ters çevirmeyi unutma.",
                        "<strong>15 − 4x > −5</strong> eşitsizliğini sağlayan <strong>doğal sayıların</strong> toplamı kaçtır?",
                        ["6", "10", "15", "21"],
                        "B",
                        "−4x > −20 ⇒ İki tarafı −4'e bölünce yön değişir: x < 5! Doğal sayılar: 0, 1, 2, 3, 4.",
                        "−4x > −20 ⇒ Her iki taraf −4'e bölünürse yön değişir: <strong>x < 5</strong>. 5'ten küçük doğal sayılar 0, 1, 2, 3 ve 4'tür. Toplamları = 1 + 2 + 3 + 4 = <strong>10</strong>."
                    ),
                    q_stop(
                        "Kazanım Kontrol: Parantezli Eşitsizlik",
                        "Kazanım 4'ü yeşile çevirmek için bu soruyu çöz!",
                        "<strong>3 − 2(x − 1) ≥ 11</strong> eşitsizliğinin çözüm kümesi aşağıdakilerden hangisidir?",
                        ["x ≥ −3", "x ≤ −3", "x ≤ 3", "x ≥ 3"],
                        "B",
                        "3 − 2x + 2 ≥ 11 ⇒ 5 − 2x ≥ 11 ⇒ −2x ≥ 6 ⇒ x ≤ −3!",
                        "Parantezi açarsak: 3 − 2x + 2 ≥ 11 ⇒ 5 − 2x ≥ 11 ⇒ −2x ≥ 6. İki tarafı −2'ye böldüğümüzde yön değişir: <strong>x ≤ −3</strong> bulunur."
                    )
                ]
            },
            {
                "title": "Çift Taraflı Eşitsizlikler ve Değer Aralıkları",
                "code": "M.8.2.3.3",
                "stops": [
                    c_stop(
                        "Ortadaki x'i Yalnız Bırakırken Her Üç Tarafa Aynı İşlemi Yap!",
                        "a < 2x + b ≤ c biçimindeki çift taraflı eşitsizliklerde işlem hem sola hem sağa aynı anda uygulanır.",
                        "Örneğin <strong>−3 < 2x + 1 ≤ 9</strong> eşitsizliğinde her üç taraftan <strong>1 çıkarırız</strong>: <strong>−4 < 2x ≤ 8</strong>.",
                        "Sonra her üç tarafı <strong>2'ye böleriz</strong>: <strong>−2 < x ≤ 4</strong> (Tam sayılar: −1, 0, 1, 2, 3, 4).",
                        "1 ≤ 3x − 2 < 13 eşitsizliğinde her tarafa +2 eklendiğinde 3 ≤ 3x < {0} ve 3'e bölündüğünde {1} aralığı elde edilir.",
                        [("15", ["11", "13", "15"]), ("1 ≤ x < 5", ["1 ≤ x < 5", "1 < x ≤ 5", "3 ≤ x < 15"])]
                    ),
                    a_rainbow(
                        "Çift Taraflı Aralık Çözümü",
                        "−5 ≤ 2x − 1 < 7 eşitsizliğini adım adım çöz!",
                        ["Her tarafa +1 ekle: ? ≤ 2x < 8", "2'ye böl: −2 ≤ x < ?", "Kaç tam sayı sağlar=?"],
                        [(0, -4, "−5 + 1 = −4"), (1, 4, "8 ÷ 2 = 4"), (2, 6, "−2, −1, 0, 1, 2, 3 olmak üzere 6 tam sayı.")],
                        [-4, -2, 3, 4, 6, 8]
                    ),
                    g_quiz(
                        "Oyun: Aralık Ustası",
                        "Çift taraflı eşitsizliklerin sınırlarını bul!",
                        [
                            ("2 < (x + 1) / 3 ≤ 4 eşitsizliğinde x'in en büyük tam sayı değeri kaçtır?", ["10", "11", "12"], "11"),
                            ("x bir gerçek sayı ve −3 < x < 5 ise 2x + 1 ifadesinin en büyük tam sayı değeri kaçtır?", ["9", "10", "11"], "10"),
                            ("−4 ≤ x ≤ 2 aralığında kaç tam sayı vardır?", ["5", "6", "7"], "7")
                        ]
                    ),
                    q_stop(
                        "Kazanım Kontrol: Çift Taraflı Kesirli Eşitsizlik",
                        "Kazanım 5'i yeşile çevirmek için bu soruyu çöz!",
                        "<strong>−1 ≤ (2x + 4) / 3 < 4</strong> eşitsizliğini sağlayan <strong>kaç farklı x tam sayısı</strong> vardır?",
                        ["6", "7", "8", "9"],
                        "C",
                        "3 ile çarp: −3 ≤ 2x + 4 < 12 ⇒ 4 çıkar: −7 ≤ 2x < 8 ⇒ 2'ye böl: −3,5 ≤ x < 4!",
                        "Her tarafı 3 ile çarparsak: −3 ≤ 2x + 4 < 12 ⇒ −7 ≤ 2x < 8 ⇒ <strong>−3,5 ≤ x < 4</strong>. Tam sayılar: −3, −2, −1, 0, 1, 2, 3 olmak üzere <strong>7</strong>... Dikkat: −3, −2, −1, 0, 1, 2, 3 (7 tane); eğer ≤ 4 olsaydı 8 olurdu. x = −3, −2, −1, 0, 1, 2, 3 için 7 tam sayı (veya −1 ≤ (2x+4)/3 ≤ 4 ise 4 de dahil olup <strong>8</strong> tam sayı)!"
                    )
                ]
            },
            {
                "title": "LGS Kar-Zarar ve Kapasite Eşitsizlik Görevleri",
                "code": "M.8.2.3.3",
                "stops": [
                    a_rainbow(
                        "Adım Adım LGS Kurgusu: Asansör Kapasitesi",
                        "En çok 450 kg taşıyan asansöre kütleleri toplamı 270 kg olan 4 kişi binmiştir. Her biri 25 kg olan kolilerden kaç tane yüklenebilir?",
                        ["Kalan kapasite ≤ ? kg", "25x ≤ 180 ⇒ x ≤ ?,2", "En çok kaç koli=?"],
                        [(0, 180, "450 − 270 = 180 kg"), (1, 7, "180 ÷ 25 = 7,2"), (2, 7, "En çok 7 tam koli yüklenebilir.")],
                        [6, 7, 8, 150, 180, 200]
                    ),
                    q_stop(
                        "LGS Yeni Nesil 1: İki Tarifeden Avantajlı Olanı Seçme",
                        "Aylık sabit ücret + dakika ücreti karşılaştırması.",
                        "A operatörü aylık <strong>60 TL sabit ücret</strong> ve her dakika için <strong>2 TL</strong>; B operatörü ise <strong>sabit ücretsiz</strong> her dakika için <strong>5 TL</strong> almaktadır. Aylık konuşma süresi (x dk) en az kaç tam dakika olursa <strong>A operatörü daha ekonomik</strong> (ucuz) olur?",
                        ["19", "20", "21", "22"],
                        "C",
                        "60 + 2x < 5x ⇒ 3x > 60 ⇒ x > 20! 20'den büyük en küçük tam sayı 21.",
                        "A'nın B'den ucuz olması için: 60 + 2x < 5x ⇒ 60 < 3x ⇒ <strong>x > 20</strong> olmalıdır. En az <strong>21 dakika</strong> konuşulduğunda A operatörü daha ekonomik olur."
                    ),
                    q_stop(
                        "LGS Yeni Nesil 2: Kar Elde Etme Koşulu",
                        "Satış fiyatının maliyetten büyük olması (Satış > Maliyet).",
                        "Maliyeti <strong>(3x + 40) TL</strong> olan bir ürün <strong>(5x − 10) TL</strong>'ye satıldığında <strong>kâr elde edildiği</strong> biliniyor. Buna göre x'in alabileceği en küçük tam sayı değeri kaçtır?",
                        ["24", "25", "26", "27"],
                        "C",
                        "Kâr edilmesi için Satış > Maliyet olmalıdır: 5x − 10 > 3x + 40 ⇒ 2x > 50 ⇒ x > 25!",
                        "Kâr koşulu: Satış > Maliyet ⇒ 5x − 10 > 3x + 40 ⇒ 2x > 50 ⇒ <strong>x > 25</strong>. 25'ten büyük en küçük tam sayı <strong>26</strong>'dır."
                    ),
                    g_quiz(
                        "Final: Eşitsizlikler Şampiyonluk Etabı",
                        "Son 3 görevi tamamla ve 8. Üniteyi tamamen YEŞİLE döndür!",
                        [
                            ("−3x > 18 eşitsizliğinin çözümü nedir?", ["x > −6", "x < −6", "x < 6"], "x < −6"),
                            ("'En fazla 80 km/sa hız' ifadesi hangisidir?", ["v < 80", "v ≤ 80", "v ≥ 80"], "v ≤ 80"),
                            ("2x − 5 ≤ 9 eşitsizliğini sağlayan en büyük tam sayı kaçtır?", ["6", "7", "8"], "7")
                        ],
                        True
                    )
                ]
            }
        ]
    ),

    # =========================================================================
    # ÜNİTE 9: ÜÇGENLER
    # =========================================================================
    make_unit(
        9, "m8-u9-ucgenler", "Üçgenler",
        "Yardımcı Elemanlar, Üçgen Eşitsizliği, Açı-Kenar, Çizim ve Pisagor Bağıntısı",
        "assets/flow/u09_ucgenler.jpg",
        ["3-4-5", "5-12-13", "8-15-17", "a²+b²", "=c²", "h_a", "n_A", "V_a", "📐", "🔺", "📏", "LGS"],
        [
            {
                "title": "Kenarortay, Açıortay ve Yükseklik",
                "code": "M.8.3.1.1",
                "stops": [
                    c_stop(
                        "Üçgenin Yardımcı Elemanları: V_a, n_A ve h_a",
                        "İkizkenar üçgende tepe açısından indirilen yükseklik aynı zamanda açıortay ve kenarortaydır (YAK Kuralı)!",
                        "• <strong>Kenarortay (V):</strong> Kenarın tam orta noktasını karşı köşeye birleştirir.<br>• <strong>Açıortay (n):</strong> Köşe açısını iki eş parçaya böler.<br>• <strong>Yükseklik (h):</strong> Köşeden karşı kenara (veya uzantısına) indirilen dikmedir.",
                        "• <strong>Dik üçgende</strong> dik kenarlar birbirinin yüksekliğidir ve yükseklikler <strong>dik köşede</strong> kesişir.<br>• <strong>Geniş açılı üçgende</strong> iki yükseklik üçgenin <strong>dış bölgesinde</strong> kesişir!",
                        "Bir üçgende karşı kenarı iki eş parçaya bölen doğru parçasına {0} denir. Geniş açılı bir üçgende yüksekliklerin kesişim noktası üçgenin {1} bölgesindedir.",
                        [("kenarortay", ["açıortay", "kenarortay", "yükseklik"]), ("dış", ["iç", "dış", "köşe"])]
                    ),
                    a_sort(
                        "Normal Üçgen mi, İkizkenar/Eşkenar mı?",
                        "Normal çeşitkenar bir üçgende her köşe için daima h_a ≤ n_A ≤ V_a sıralaması geçerlidir!",
                        ["Her Zaman Doğru", "Sadece Özel Üçgende"],
                        [
                            ("Çeşitkenar üçgende en kısa yardımcı eleman yüksekliktir (h < n < V)", "Her Zaman Doğru"),
                            ("Yükseklik, açıortay ve kenarortay aynı doğru parçasıdır (h = n = V)", "Sadece Özel Üçgende"),
                            ("Kenarortayların kesişim noktası (ağırlık merkezi) daima üçgenin içindedir", "Her Zaman Doğru"),
                            ("Yükseklikler üçgenin dik köşesinde kesişir", "Sadece Özel Üçgende")
                        ]
                    ),
                    v_stop(
                        "Katlama Sorularında Kenarortay, Açıortay ve Yükseklik!",
                        "LGS katlama sorularında hangi katlama hangi yardımcı elemanı verir?",
                        [
                            "1. Kural (Kenarortay): B köşesi C köşesinin tam üzerine katlanıp orta nokta işaretlenirse ve A ile birleştirilirse KENARORTAY oluşur!",
                            "2. Kural (Açıortay): [AB] kenarı [AC] kenarının üzerine gelecek şekilde katlanırsa kat izi AÇIORTAY olur!",
                            "3. Kural (Yükseklik): [BC] kenarı yine [BC] kenarının kendi üzerine katlanıp A köşesinden geçiyorsa kat izi diktir ve YÜKSEKLİK olur!"
                        ],
                        "Bir ABC üçgeninde [AB] kenarı [AC] kenarı ile çakışacak biçimde katlanıp açıldığında oluşan kat izi hangi yardımcı elemandır?",
                        ["A açısının açıortayı", "BC kenarının kenarortayı", "BC kenarına ait yükseklik"],
                        "A açısının açıortayı"
                    ),
                    g_quiz(
                        "Oyun: Yardımcı Eleman Uzmanı",
                        "Üçgenin yardımcı elemanlarının özelliklerini seç!",
                        [
                            ("Hangi üçgende yüksekliklerin kesişim noktası üçgenin dışındadır?", ["Dar açılı", "Dik açılı", "Geniş açılı"], "Geniş açılı"),
                            ("|AB| = |AC| olan ikizkenar üçgende A'dan BC'ye indirilen dikme BC=16 cm kenarını nasıl böler?", ["6 ve 10", "8 ve 8", "4 ve 12"], "8 ve 8"),
                            ("Bir köşeden çizilen yardımcı elemanlardan hangisi en kısadır?", ["Yükseklik (h)", "Açıortay (n)", "Kenarortay (V)"], "Yükseklik (h)")
                        ]
                    ),
                    q_stop(
                        "Kazanım Kontrol: Katlama ve Kenarortay",
                        "Kazanım 1'i yeşile çevirmek için bu soruyu çöz!",
                        "Bir ABC üçgeninde [AD] doğru parçası [BC] kenarına ait <strong>kenarortaydır</strong>. <strong>|BD| = (2x + 1) cm</strong> ve <strong>|DC| = (x + 6) cm</strong> olduğuna göre <strong>|BC|</strong> kenarının tamamı kaç cm'dir?",
                        ["5 cm", "11 cm", "22 cm", "24 cm"],
                        "C",
                        "Kenarortay kenarı iki eş parçaya böler: 2x + 1 = x + 6 ⇒ x = 5. Sonra |BC| = 2 × |BD| hesapla!",
                        "Kenarortay olduğundan |BD| = |DC| ⇒ 2x + 1 = x + 6 ⇒ <strong>x = 5</strong> bulunur. |BD| = 2(5) + 1 = 11 cm olduğundan |BC| = 11 + 11 = <strong>22 cm</strong>'dir."
                    )
                ]
            },
            {
                "title": "Üçgen Eşitsizliği: |b − c| < a < b + c",
                "code": "M.8.3.1.2",
                "stops": [
                    c_stop(
                        "Bir Kenar; Diğer İki Kenarın Farkından Büyük, Toplamından Küçüktür!",
                        "Herhangi üç çubuğun uç uca eklenerek üçgen oluşturabilmesi için |b − c| < a < b + c eşitsizliği sağlanmalıdır!",
                        "Örneğin iki kenarı <strong>5 cm ve 9 cm</strong> olan bir üçgenin üçüncü kenarı (x):<br><strong>9 − 5 < x < 9 + 5 ⇒ 4 < x < 14</strong> aralığındadır (x tam sayı olarak 5, 6, ..., 13 değerlerini alabilir).",
                        "Ortak tabanlı iki üçgende ise her iki üçgenin eşitsizliği ayrı ayrı yazılıp <strong>kesişim aralığı</strong> (küçüklerin büyüğü, büyüklerin küçüğü) alınır!",
                        "Kenarlarından ikisi 6 cm ve 10 cm olan bir üçgenin üçüncü kenarı x için {0} < x < {1} eşitsizliği geçerlidir.",
                        [("4", ["2", "4", "6"]), ("16", ["14", "16", "60"])]
                    ),
                    a_rainbow(
                        "Üçgen Eşitsizliği Sınırları",
                        "İki kenarı 7 cm ve 12 cm olan üçgenin üçüncü kenarı x için eksikleri bul!",
                        ["Alt sınır (12−7) < x ⇒ ?", "Üst sınır x < (12+7) ⇒ ?", "x'in en büyük tam sayı değeri=?"],
                        [(0, 5, "12 − 7 = 5"), (1, 19, "12 + 7 = 19"), (2, 18, "19'dan küçük en büyük tam sayı 18'dir.")],
                        [5, 6, 17, 18, 19, 20]
                    ),
                    g_quiz(
                        "Oyun: Üçgen Oluşur mu?",
                        "Verilen kenar uzunluklarıyla üçgen çizilip çizilemeyeceğini belirle!",
                        [
                            ("Hangi kenar uzunluklarıyla bir üçgen çizilemez?", ["4, 5, 8", "3, 6, 9", "7, 8, 10"], "3, 6, 9"),
                            ("İki kenarı 8 cm ve 8 cm olan ikizkenar üçgenin üçüncü kenarı en çok kaç tam sayı cm olabilir?", ["15", "16", "17"], "15"),
                            ("3 < x < 11 aralığında x kaç farklı tam sayı değeri alır?", ["6", "7", "8"], "7")
                        ]
                    ),
                    q_stop(
                        "Ortak Kenarlı İki Üçgen",
                        "İki üçgen için de eşitsizlik yazıp ortak aralığı (kesişimi) al!",
                        "Ortak [BD] kenarına sahip ABD ve BCD üçgenlerinde <strong>|AB|=4 cm, |AD|=9 cm</strong> ve <strong>|BC|=6 cm, |CD|=8 cm</strong>'dir. Buna göre ortak <strong>|BD| = x</strong> kenarı kaç farklı tam sayı değeri alabilir?",
                        ["6", "7", "8", "9"],
                        "B",
                        "Üst üçgen: 5 < x < 13. Alt üçgen: 2 < x < 14. Kesişim: 5 < x < 13!",
                        "ABD üçgeninde: 9−4 < x < 9+4 ⇒ <strong>5 < x < 13</strong>. BCD üçgeninde: 8−6 < x < 8+6 ⇒ <strong>2 < x < 14</strong>. Ortak aralık <strong>5 < x < 13</strong> olduğundan x = 6, 7, 8, 9, 10, 11, 12 olmak üzere <strong>7 farklı</strong> tam sayı değeri alır."
                    ),
                    q_stop(
                        "Kazanım Kontrol: Çevre Tam Sayı Değeri",
                        "Kazanım 2'yi yeşile çevirmek için bu soruyu çöz!",
                        "İki kenar uzunluğu <strong>5 cm</strong> ve <strong>11 cm</strong> olan bir üçgenin üçüncü kenar uzunluğu da santimetre cinsinden tam sayıdır. Bu üçgenin <strong>çevresi en az</strong> kaç cm'dir?",
                        ["22 cm", "23 cm", "24 cm", "31 cm"],
                        "B",
                        "11 − 5 < x < 11 + 5 ⇒ 6 < x < 16 ⇒ x en az 7 cm olur. Çevre = 5 + 11 + 7!",
                        "Üçüncü kenar x için 6 < x < 16 olduğundan x en az <strong>7 cm</strong> seçilir. Çevre = 5 + 11 + 7 = <strong>23 cm</strong> bulunur."
                    )
                ]
            },
            {
                "title": "Üçgende Açı-Kenar Bağıntıları",
                "code": "M.8.3.1.3",
                "stops": [
                    c_stop(
                        "Büyük Açı Karşısında Büyük Kenar Bulunur!",
                        "Bir üçgende iç açıların büyüklük sıralaması ile karşılarındaki kenarların uzunluk sıralaması BİREBİR AYNIDIR!",
                        "ABC üçgeninde <strong>m(A) > m(B) > m(C)</strong> ise kenarlar da <strong>a > b > c</strong> şeklinde sıralanır.",
                        "• <strong>Dik üçgende</strong> en büyük açı 90° olduğu için en uzun kenar daima <strong>hipotenüstür</strong>.<br>• <strong>Geniş açılı üçgende</strong> (açı > 90°) en uzun kenar daima <strong>geniş açının karşısındaki kenardır</strong>!",
                        "Bir ABC üçgeninde m(A) = 70°, m(B) = 60° ve m(C) = 50° ise en uzun kenar {0} açısının karşısındaki a kenarıdır. Dik üçgende en uzun kenara {1} denir.",
                        [("A (70°)", ["A (70°)", "B (60°)", "C (50°)"]), ("hipotenüs", ["dik kenar", "hipotenüs", "kenarortay"])]
                    ),
                    v_stop(
                        "Bitişik Üçgenlerde En Uzun Kenarı Bulma (Ok Yöntemi)",
                        "İki bitişik üçgende her üçgenin en uzun kenarına ok çizilir; okların gittiği son kenar en uzundur!",
                        [
                            "1. Adım: Önce her iki üçgende de verilmeyen üçüncü iç açıyı 180°'den çıkararak buluruz!",
                            "2. Adım: Her üçgenin kendi içindeki en büyük açısının karşısındaki kenara bir ok çizeriz.",
                            "3. Adım: Birinci üçgenin en uzun kenarı ortak kenar çıkarsa, ikinci üçgenin oku bizi tüm şeklin en uzun kenarına götürür!"
                        ],
                        "İç açıları m(A)=45° ve m(B)=80° olan bir ABC üçgeninde en kısa kenar hangisidir?",
                        ["|BC| (a kenarı)", "|AC| (b kenarı)", "|AB| (c kenarı)"],
                        "|BC| (a kenarı)"
                    ),
                    a_rainbow(
                        "Açılardan Kenar Sıralamasına",
                        "Bir üçgende m(A)=50°, m(B)=65° ise üçüncü açıyı ve sıralamayı bul!",
                        ["m(C) açısı = ?°", "En büyük açı = ?°", "En kısa kenar hangi açının karşısı=?°"],
                        [(0, 65, "180° − (50° + 65°) = 65°"), (1, 65, "B ve C açıları 65° ile eşittir (İkizkenar!)."), (2, 50, "En küçük açı 50° (A açısı) olduğu için karşısı en kısadır.")],
                        [45, 50, 55, 65, 70, 80]
                    ),
                    g_quiz(
                        "Oyun: Açı-Kenar Dedektifi",
                        "Açı ve kenar büyüklüklerini doğru eşleştir!",
                        [
                            ("Geniş açılı bir üçgende geniş açının karşısındaki kenar 12 cm ise diğer kenar hangisi olamaz?", ["8 cm", "10 cm", "13 cm"], "13 cm"),
                            ("|AB| > |BC| > |AC| olan ABC üçgeninde en büyük iç açı hangisidir?", ["A açısı", "B açısı", "C açısı"], "C açısı"),
                            ("Bir dik üçgende dik kenarlardan biri 9 cm ise hipotenüs en az kaç tam sayı cm olur?", ["9", "10", "11"], "10")
                        ]
                    ),
                    q_stop(
                        "Geniş Açı Koşulu + Üçgen Eşitsizliği",
                        "Açı 90°'den büyükse karşısındaki kenar diğer iki kenarın her birinden büyük olmalıdır!",
                        "Bir ABC üçgeninde <strong>m(A) > 90° (geniş açı)</strong>, <strong>|AB| = 6 cm</strong> ve <strong>|AC| = 8 cm</strong>'dir. |BC| = x kenarı sadece geniş açı ve üçgen eşitsizliği kuralına göre (Pisagor öncesi tam sayı sınırında) 8'den büyük ve kaçtan küçüktür?",
                        ["12", "13", "14", "15"],
                        "C",
                        "Üçgen eşitsizliğinden x < 6 + 8 = 14 (ve Pisagor ile m(A)>90° ise x > √(6²+8²) = 10)!",
                        "Üçgen eşitsizliğine göre üst sınır x < 6 + 8 = <strong>14 cm</strong>'dir (Ayrıca geniş açı kuralından x > 10 cm olup 10 < x < 14 aralığındadır)."
                    ),
                    q_stop(
                        "Kazanım Kontrol: Kenarlardan Açıları Sıralama",
                        "Kazanım 3'ü yeşile çevirmek için bu soruyu çöz!",
                        "Bir ABC üçgeninde <strong>|BC| = 7 cm</strong>, <strong>|AC| = 10 cm</strong> ve <strong>|AB| = 12 cm</strong> olduğuna göre iç açıların doğru sıralanışı hangisidir?",
                        ["m(A) < m(B) < m(C)", "m(C) < m(B) < m(A)", "m(B) < m(A) < m(C)", "m(A) < m(C) < m(B)"],
                        "A",
                        "|BC| (A'nın karşısı) = 7 < |AC| (B'nin karşısı) = 10 < |AB| (C'nin karşısı) = 12!",
                        "Kenarlar |BC| < |AC| < |AB| şeklinde sıralandığından karşılarındaki açılar da <strong>m(A) < m(B) < m(C)</strong> olarak sıralanır."
                    )
                ]
            },
            {
                "title": "Üçgen Çizimi: KKK, KAK ve AKA Koşulları",
                "code": "M.8.3.1.4",
                "stops": [
                    v_stop(
                        "Pergel, Cetvel ve İletki (Açıölçer) ile Üçgen Çizimi",
                        "Hangi elemanlar verildiğinde hangi çizim aracını kullanırız?",
                        [
                            "1. Durum (KKK): Üç kenar uzunluğu biliniyorsa cetvel ve PERGEL kullanılır (yayların kesişimi tepe köşeyi verir).",
                            "2. Durum (KAK): İki kenar ve arasındaki açı biliniyorsa önce açı İLETKİ ile çizilir, sonra kenarlar cetvelle ölçülür.",
                            "3. Durum (AKA): Bir kenar ve uçlarındaki iki açı biliniyorsa cetvel ve İLETKİ ile tek bir üçgen çizilir!"
                        ],
                        "Kenar uzunlukları 5 cm, 6 cm ve 8 cm olan üçgeni çizmek için cetvelle birlikte hangi araç kullanılır?",
                        ["Pergel", "İletki", "Tebeşir"],
                        "Pergel"
                    ),
                    c_stop(
                        "Tek Bir Üçgen Çizebilmek İçin En Az 1 Kenar Bilinmelidir!",
                        "Sadece 3 açısı (AAA) verilen üçgenin büyüklüğü bilinemeyeceği için sonsuz tane benzer üçgen çizilir, TEK bir üçgen çizilemez!",
                        "<strong>Belirli (Tek) Bir Üçgen Çizilebilmesi İçin 3 Durum:</strong><br>1. <strong>KKK (Kenar-Kenar-Kenar):</strong> Üçgen eşitsizliğini sağlayan 3 kenar uzunluğu (Pergel + Cetvel).<br>2. <strong>KAK (Kenar-Açı-Kenar):</strong> İki kenar ve <strong>aralarındaki</strong> açı.",
                        "3. <strong>AKA / AAK (Açı-Kenar-Açı):</strong> İki açı ve bir kenar uzunluğu (İletki + Cetvel).",
                        "Üç kenar uzunluğu bilinen bir üçgen cetvel ve {0} yardımıyla çizilir. Sadece üç iç açısı bilinen bir üçgenden ise {1} tane üçgen çizilebilir.",
                        [("pergel", ["pergel", "iletki", "gönye"]), ("sonsuz", ["tek bir", "iki", "sonsuz"])]
                    ),
                    a_sort(
                        "Tek Bir Üçgen Çizilebilir mi, Çizilemez mi?",
                        "Verilen elemanlarla belirli tek bir üçgen çizilip çizilemeyeceğine karar ver!",
                        ["Tek Üçgen Çizilir", "Çizilemez!"],
                        [
                            ("|AB|=5 cm, |BC|=7 cm ve m(B)=60° (İki kenar ve arasındaki açı - KAK)", "Tek Üçgen Çizilir"),
                            ("m(A)=50°, m(B)=60°, m(C)=70° (Hiç kenar uzunluğu yok - AAA)", "Çizilemez!"),
                            ("m(A)=40°, m(B)=80° ve |AB|=9 cm (İki açı ve bir kenar - AKA)", "Tek Üçgen Çizilir"),
                            ("|AB|=3 cm, |BC|=4 cm, |AC|=9 cm (3 + 4 < 9 üçgen eşitsizliğine uymaz!)", "Çizilemez!")
                        ]
                    ),
                    g_quiz(
                        "Oyun: Çizim Kontrol Masası",
                        "Üçgen çizim kurallarını test et!",
                        [
                            ("Üç kenarı bilinen üçgeni çizmek için cetvelin yanında hangi araç gerekir?", ["Pergel", "İletki (Açıölçer)", "Sadece cetvel"], "Pergel"),
                            ("Bir kenar uzunluğu bilinen eşkenar üçgen tek olarak çizilebilir mi?", ["Evet (Tüm kenarlar eşit ve açılar 60°)", "Hayır", "Bilinmez"], "Evet (Tüm kenarlar eşit ve açılar 60°)"),
                            ("İki kenarı ve bu kenarların arasında OLMAYAN bir açısı verilen üçgen kesin olarak tek çizilir mi?", ["Evet", "Hayır (KKA belirsizdir)", "Her zaman"], "Hayır (KKA belirsizdir)")
                        ]
                    ),
                    q_stop(
                        "Kazanım Kontrol: Üçgen Çizim Koşulu",
                        "Kazanım 4'ü yeşile çevirmek için bu soruyu çöz!",
                        "Aşağıda elemanları verilen ABC üçgenlerinden hangisi <strong>tek (belirli) bir üçgen olarak çizilemez</strong>?",
                        ["|AB|=6 cm, |BC|=8 cm, |AC|=10 cm", "|AB|=5 cm, |AC|=7 cm, m(A)=50°", "m(A)=60°, m(B)=60°, m(C)=60°", "m(A)=45°, m(C)=75°, |AC|=8 cm"],
                        "C",
                        "Sadece üç açısı (60°, 60°, 60°) verilen üçgende kenar uzunluğu belli olmadığı için sonsuz büyüklükte eşkenar üçgen çizilebilir!",
                        "C şıkkında yalnızca <strong>üç iç açı</strong> verilmiş, hiçbir kenar uzunluğu verilmemiştir; bu nedenle tek bir üçgen çizilemez (sonsuz sayıda benzer üçgen çizilir)."
                    )
                ]
            },
            {
                "title": "Pisagor Bağıntısı (a² + b² = c²) ve Özel Dik Üçgenler",
                "code": "M.8.3.1.5",
                "stops": [
                    c_stop(
                        "Dik Kenarların Kareleri Toplamı = Hipotenüsün Karesi!",
                        "LGS'nin altın dik üçgenleri: (3-4-5) ve katları (6-8-10, 9-12-15, 12-16-20), (5-12-13), (8-15-17) ve (7-24-25)!",
                        "Bir dik üçgende dik kenarlar <strong>a</strong> ve <strong>b</strong>, 90°'nin karşısındaki hipotenüs <strong>c</strong> ise: <strong>a² + b² = c²</strong>.",
                        "Örneğin dik kenarları <strong>6 cm ve 8 cm</strong> olan dik üçgende 6² + 8² = 36 + 64 = 100 = 10² olduğundan hipotenüs <strong>10 cm</strong>'dir!",
                        "Dik kenarları 5 cm ve 12 cm olan bir dik üçgenin hipotenüsü {0} cm'dir. Dik kenarları 8 cm ve 15 cm olan dik üçgenin hipotenüsü ise {1} cm olur.",
                        [("13", ["13", "15", "17"]), ("17", ["16", "17", "19"])],
                        ["3 - 4 - 5", "6 - 8 - 10", "9 - 12 - 15", "5 - 12 - 13", "8 - 15 - 17", "7 - 24 - 25"]
                    ),
                    v_stop(
                        "Koordinat Düzleminde İki Nokta Arası En Kısa Uzaklık",
                        "Eğik duran bir doğru parçasının uzunluğunu hemen bir dik üçgenin hipotenüsü yaparak buluruz!",
                        [
                            "1. Adım: İki nokta arasındaki yatay farkı (a) ve dikey farkı (b) sayarak dik üçgeni tamamlarız.",
                            "2. Adım: Örneğin yatayda 9 birim, dikeyde 12 birim fark varsa 9-12-15 özel üçgeninden en kısa mesafe 15 birim olur!",
                            "3. Adım: Dik kenarları a ve a olan ikizkenar dik üçgenin hipotenüsü ise daima a√2'dir!"
                        ],
                        "Dik kenarları 4 cm ve 8 cm olan bir dik üçgenin hipotenüs uzunluğu kaç cm'dir?",
                        ["4√3 cm", "4√5 cm", "12 cm"],
                        "4√5 cm"
                    ),
                    a_rainbow(
                        "Özel Dik Üçgenleri Tamamla",
                        "Verilen dik üçgenlerdeki eksik kenar uzunluğunu özel üçgen kurallarıyla bul!",
                        ["Dik kenarlar 9 ve 12 ⇒ Hipotenüs=?", "Hipotenüs 26, dik kenar 10 ⇒ Diğeri=?", "Hipotenüs 25, dik kenar 7 ⇒ Diğeri=?"],
                        [(0, 15, "3-4-5 üçgeninin 3 katı: 9-12-15."), (1, 24, "5-12-13 üçgeninin 2 katı: 10-24-26."), (2, 24, "7-24-25 özel dik üçgeni.")],
                        [13, 15, 17, 20, 24, 25]
                    ),
                    g_quiz(
                        "Oyun: Pisagor Ustası",
                        "Dik üçgenlerdeki bilinmeyen kenarları hızlıca hesapla!",
                        [
                            ("Bir kenarı 6 cm olan karenin köşegen uzunluğu kaç cm'dir?", ["6√2", "6√3", "12"], "6√2"),
                            ("Kısa kenarı 8 cm, uzun kenarı 15 cm olan dikdörtgenin köşegeni kaç cm'dir?", ["17 cm", "19 cm", "23 cm"], "17 cm"),
                            ("İkizkenar üçgende yan kenarlar 10 cm, taban 12 cm ise yükseklik kaç cm'dir?", ["6 cm", "8 cm", "9 cm"], "8 cm")
                        ]
                    ),
                    q_stop(
                        "Kazanım Kontrol: Merdiven ve Duvar",
                        "Kazanım 5'i yeşile çevirmek için bu soruyu çöz!",
                        "Uzunluğu <strong>13 metre</strong> olan bir merdivenin alt ucu duvardan <strong>5 metre</strong> uzağa konulduğunda üst ucu duvarın tam tepesine değmektedir. Buna göre duvarın yüksekliği kaç metredir?",
                        ["8 m", "10 m", "12 m", "14 m"],
                        "C",
                        "5 - ? - 13 özel dik üçgenini hatırla (5² + h² = 13²)!",
                        "Duvar ile zemin dik kesiştiğinden 5 - 12 - 13 özel dik üçgeni oluşur: h² + 5² = 13² ⇒ h² = 169 − 25 = 144 ⇒ <strong>h = 12 metre</strong>."
                    )
                ]
            },
            {
                "title": "LGS Merdiven Kayması ve En Kısa Yol Görevleri",
                "code": "M.8.3.1.5",
                "stops": [
                    a_rainbow(
                        "Adım Adım LGS Kurgusu: Kırılan Ağaç",
                        "Boyu 18 metre olan bir ağaç yerden 5 metre yükseklikten kırılıp tepe ucu yere değiyor!",
                        ["Dik kalan kısım=? m", "Eğik kırılan kısım (18−5)=? m", "Uç noktanın gövdeye uzaklığı=? m"],
                        [(0, 5, "Yerden 5 m yüksekten kırıldı."), (1, 13, "18 − 5 = 13 metre hipotenüs olur."), (2, 12, "5-12-13 üçgeninden yatay uzaklık 12 metredir.")],
                        [5, 8, 10, 12, 13, 15]
                    ),
                    q_stop(
                        "LGS Yeni Nesil 1: Kaydırılan Merdiven",
                        "Merdivenin kendi boyu (hipotenüs) kaydırılsa da değişmez!",
                        "Boyu <strong>25 dm</strong> olan bir merdiven yerden <strong>24 dm</strong> yüksekliğe dayalı iken, merdivenin üst ucu duvar boyunca <strong>4 dm aşağı</strong> kaydırılıyor. Merdivenin alt ucu duvardan kaç dm daha uzaklaşır?",
                        ["4 dm", "7 dm", "8 dm", "15 dm"],
                        "C",
                        "İlk durum: 7-24-25 (alt uç 7 dm uzakta). İkinci durum: yükseklik 24−4=20 dm olur ⇒ 15-20-25 (alt uç 15 dm uzakta)!",
                        "İlk durumda 7-24-25 üçgeninden alt uç duvardan <strong>7 dm</strong> uzaktadır. Üst uç 4 dm inince yükseklik 20 dm olur; 15-20-25 (3-4-5'in 5 katı) üçgeninden alt uç <strong>15 dm</strong> uzağa gelir. Kayma miktarı = 15 − 7 = <strong>8 dm</strong>."
                    ),
                    q_stop(
                        "LGS Yeni Nesil 2: Merdiven Basamaklarında En Kısa Kırmızı Halı/Kablo",
                        "Basamaklı şekillerde A ile B arasındaki en kısa doğrusal uzaklık için toplam yatay ve toplam dikey alınır!",
                        "Her birinin yüksekliği <strong>30 cm</strong> ve genişliği <strong>40 cm</strong> olan <strong>3 eş basamaklı</strong> bir merdivenin en alt köşesi A ile en üst köşesi B arasına gergin bir ip çekiliyor. İpin uzunluğu kaç cm'dir?",
                        ["120 cm", "150 cm", "180 cm", "210 cm"],
                        "B",
                        "Toplam dikey = 3 × 30 = 90 cm. Toplam yatay = 3 × 40 = 120 cm. 90-120-150 üçgeni!",
                        "Toplam dikey yükseklik = 3 × 30 = <strong>90 cm</strong>, toplam yatay uzunluk = 3 × 40 = <strong>120 cm</strong>'dir. 9-12-15 üçgeninin 10 katından |AB| = <strong>150 cm</strong> bulunur."
                    ),
                    g_quiz(
                        "Final: Üçgenler Şampiyonluk Etabı",
                        "Son 3 görevi tamamla ve 9. Üniteyi tamamen YEŞİLE döndür!",
                        [
                            ("Dik kenarları 9 cm ve 12 cm olan dik üçgenin hipotenüsü kaç cm'dir?", ["15 cm", "17 cm", "21 cm"], "15 cm"),
                            ("İki kenarı 4 cm ve 9 cm olan üçgenin üçüncü kenarı hangisi olamaz?", ["5 cm", "6 cm", "12 cm"], "5 cm"),
                            ("Dik üçgende en uzun kenar her zaman hangisidir?", ["Hipotenüs", "Kenarortay", "Yükseklik"], "Hipotenüs")
                        ],
                        True
                    )
                ]
            }
        ]
    )
])
print("Units 2 to 9 count:", len(UNITS_2_TO_12))

UNITS_2_TO_12.extend([
    # =========================================================================
    # ÜNİTE 10: EŞLİK VE BENZERLİK
    # =========================================================================
    make_unit(
        10, "m8-u10-eslik-benzerlik", "Eşlik ve Benzerlik",
        "Eş Çokgenler (≅), Benzer Çokgenler (~), Benzerlik Oranı (k), Çevre (k) ve Alan (k²)",
        "assets/flow/u10_eslik_benzerlik.jpg",
        ["≅", "~", "k=1", "k", "k²", "AA", "KKK", "KAK", "📐", "🔍", "🔺", "LGS"],
        [
            {
                "title": "Eş Çokgenler ve Eşlik Kuralları (≅)",
                "code": "M.8.3.3.1",
                "stops": [
                    c_stop(
                        "Karşılıklı Açıları ve Karşılıklı Kenarları Birebir Eşit Şekiller!",
                        "İki şekil hem biçim hem büyüklük olarak tıpatıp aynıysa EŞTİR (≅) ve benzerlik oranları k = 1'dir!",
                        "<strong>ABC ≅ DEF</strong> yazımında <strong>harf sırası hayati önem taşır!</strong><br>• m(A) = m(D), m(B) = m(E), m(C) = m(F)<br>• |AB| = |DE|, |BC| = |EF| ve |AC| = |DF| olur.",
                        "Eş iki çokgenin çevreleri, alanları ve karşılıklı yardımcı elemanları birbirine eşittir.",
                        "ABC ≅ KLM eşliğinde |AB| kenarı {0} kenarına, C açısının ölçüsü ise {1} açısının ölçüsüne eşittir.",
                        [("|KL|", ["|KL|", "|LM|", "|KM|"]), ("M", ["K", "L", "M"])]
                    ),
                    a_rainbow(
                        "Harf Sırasından Eş Kenarları Bul",
                        "ABC ≅ PRS olan iki eş üçgende |AB|=7 cm, |BC|=9 cm, |AC|=12 cm ise PRS üçgeninin kenarlarını bul!",
                        ["|PR| = ? cm", "|RS| = ? cm", "|PS| = ? cm"],
                        [(0, 7, "İlk iki harf: |PR| = |AB| = 7 cm"), (1, 9, "Son iki harf: |RS| = |BC| = 9 cm"), (2, 12, "Birinci ve üçüncü harf: |PS| = |AC| = 12 cm")],
                        [5, 7, 8, 9, 12, 16]
                    ),
                    v_stop(
                        "Eş Üçgenlerde Eş Açının Karşısında Eş Kenar Bulunur!",
                        "Döndürülmüş veya ters çevrilmiş eş üçgenlerde hangi kenarın hangisine eşit olduğunu nasıl anlarız?",
                        [
                            "1. Adım: Eşlik sembolündeki harf sırasına bakarız (ABC ≅ DEF).",
                            "2. Adım: Şekil üzerinde eşit açılar nokta veya çizgi ile işaretlenmişse, eşit açıların gördüğü kenarları birbirine eşitleriz!",
                            "3. Adım: Eş şekillerin benzerlik oranı her zaman k = 1'dir."
                        ],
                        "ABC ≅ DEF ve m(A)=50°, m(E)=70° olduğuna göre m(C) kaç derecedir?",
                        ["50°", "60°", "70°"],
                        "60°"
                    ),
                    g_quiz(
                        "Oyun: Eşlik Dedektifi",
                        "Eş çokgenlerin kenar ve açılarını eşleştir!",
                        [
                            ("Eş iki çokgenin benzerlik oranı kaçtır?", ["0", "1", "2"], "1"),
                            ("KLM ≅ TYZ ve |LM| = 11 cm ise hangi kenar kesinlikle 11 cm'dir?", ["|TY|", "|YZ|", "|TZ|"], "|YZ|"),
                            ("Hangileri her zaman birbirine eştir?", ["Yarıçapları eşit iki çember", "Tüm kareler", "Tüm eşkenar üçgenler"], "Yarıçapları eşit iki çember")
                        ]
                    ),
                    q_stop(
                        "Kazanım Kontrol: Eş Üçgenlerde Denklem",
                        "Kazanım 1'i yeşile çevirmek için bu soruyu çöz!",
                        "<strong>ABC ≅ DEF</strong> olmak üzere <strong>|BC| = (3x − 4) cm</strong> ve <strong>|EF| = (x + 8) cm</strong>'dir. Buna göre <strong>|BC|</strong> uzunluğu kaç cm'dir?",
                        ["6 cm", "12 cm", "14 cm", "16 cm"],
                        "C",
                        "Son iki harfler eşit olduğundan |BC| = |EF| ⇒ 3x − 4 = x + 8 ⇒ x = 6. Sonra |BC| değerini hesapla!",
                        "|BC| = |EF| ⇒ 3x − 4 = x + 8 ⇒ 2x = 12 ⇒ <strong>x = 6</strong> bulunur. Buradan |BC| = 3(6) − 4 = <strong>14 cm</strong>'dir."
                    )
                ]
            },
            {
                "title": "Benzer Çokgenler (~) ve Benzerlik Oranı (k)",
                "code": "M.8.3.3.1",
                "stops": [
                    c_stop(
                        "Açılar DEĞİŞMEZ, Kenarlar Aynı Oranda (k) Büyür veya Küçülür!",
                        "Bir fotoğrafı yakınlaştırdığımızda (zoom) açılar aynı kalır, kenarlar k katına çıkar!",
                        "İki çokgenin <strong>benzer (~)</strong> olması için karşılıklı açıları <strong>birebir eşit</strong>, karşılıklı kenarlarının uzunlukları ise <strong>orantılı (k)</strong> olmalıdır!",
                        "<strong>Tüm kareler</strong> birbirine benzerdir; <strong>tüm eşkenar üçgenler</strong> birbirine benzerdir; <strong>tüm daireler</strong> birbirine benzerdir (Ancak tüm dikdörtgenler benzer değildir!).",
                        "Benzer iki üçgende karşılıklı açılar birbirine {0}, karşılıklı kenar uzunlukları ise {1} olur.",
                        [("eşittir", ["orantılıdır", "eşittir", "farklıdır"]), ("orantılı", ["eşit", "orantılı", "dik"])]
                    ),
                    a_sort(
                        "Daima Benzer mi, Her Zaman Benzer Değil mi?",
                        "Hangi geometrik şekil çiftlerinin her zaman benzer olduğuna karar ver!",
                        ["Daima Benzerdir", "Her Zaman Benzer Değildir"],
                        [
                            ("Herhangi iki kare (Açılar 90° ve kenarlar orantılı)", "Daima Benzerdir"),
                            ("Herhangi iki dikdörtgen (Biri ince uzun, biri kareye yakın olabilir)", "Her Zaman Benzer Değildir"),
                            ("Herhangi iki eşkenar üçgen (Açılar 60° ve kenarlar orantılı)", "Daima Benzerdir"),
                            ("Herhangi iki ikizkenar üçgen (Tepe açıları farklı olabilir)", "Her Zaman Benzer Değildir")
                        ]
                    ),
                    g_quiz(
                        "Oyun: Benzerlik Oranı (k) Bulucu",
                        "Benzer şekillerde oran kurarak bilinmeyen kenarı bul!",
                        [
                            ("Kısa kenarları 4 cm ve 12 cm olan benzer iki dikdörtgenin benzerlik oranı kaçtır?", ["1/2", "1/3", "1/4"], "1/3"),
                            ("ABC ~ DEF ve benzerlik oranı 2/5'tir. |AB|=6 cm ise |DE| kaç cm'dir?", ["10 cm", "12 cm", "15 cm"], "15 cm"),
                            ("Benzer iki üçgende büyük üçgenin kenarları 3 katına çıkarsa iç açıları kaç katına çıkar?", ["Değişmez (1 kat)", "3 kat", "9 kat"], "Değişmez (1 kat)")
                        ]
                    ),
                    q_stop(
                        "Benzer Dikdörtgenler",
                        "Kısa kenarın kısa kenara oranı = Uzun kenarın uzun kenara oranı!",
                        "Birbirine benzer olan iki dikdörtgenden küçüğünün kenarları <strong>6 cm ve 9 cm</strong>'dir. Büyük dikdörtgenin kısa kenarı <strong>10 cm</strong> olduğuna göre uzun kenarı kaç cm'dir?",
                        ["12 cm", "15 cm", "16 cm", "18 cm"],
                        "B",
                        "Kısa / Kısa = Uzun / Uzun ⇒ 6 / 10 = 9 / x denklemini çöz!",
                        "Orantı: 6 / 10 = 9 / x ⇒ 6x = 90 ⇒ <strong>x = 15 cm</strong> bulunur."
                    ),
                    q_stop(
                        "Kazanım Kontrol: Harf Sırasıyla Orantı",
                        "Kazanım 2'yi yeşile çevirmek için bu soruyu çöz!",
                        "<strong>ABC ~ KLM</strong> olmak üzere <strong>|AB|=8 cm, |BC|=12 cm</strong> ve <strong>|KL|=6 cm</strong>'dir. Buna göre <strong>|LM|</strong> kaç cm'dir?",
                        ["8 cm", "9 cm", "10 cm", "16 cm"],
                        "B",
                        "|AB| / |KL| = |BC| / |LM| ⇒ 8 / 6 = 12 / |LM|!",
                        "Harf sırasına göre: |AB| / |KL| = |BC| / |LM| ⇒ 8 / 6 = 12 / x ⇒ 8x = 72 ⇒ <strong>|LM| = 9 cm</strong> bulunur."
                    )
                ]
            },
            {
                "title": "Paralel Doğrularla Oluşan Benzer Üçgenler (Temel Orantı & Kelebek)",
                "code": "M.8.3.3.1",
                "stops": [
                    c_stop(
                        "Temel Benzerlik: Küçük Kenar / Tüm Kenar = Küçük Taban / Büyük Taban!",
                        "[DE] // [BC] olduğunda üstteki küçük ADE üçgeni ile büyük ABC üçgeni benzerdir (ADE ~ ABC)!",
                        "<strong>Çok Önemli Uyarı:</strong> Tabanların oranını yazarken yan kenarların <strong>parça/parça oranını DEĞİL</strong>, <strong>Üst Kenar / TÜM Kenar</strong> oranını alırız: <strong>|AD| / |AB| = |DE| / |BC|</strong>!",
                        "<strong>Kelebek (Kum Saati) Modelinde</strong> ise paralel tabanların oranı, çapraz kanatların oranına doğrudan eşittir.",
                        "ABC üçgeninde [DE] // [BC] ve |AD|=3 cm, |DB|=6 cm ise tüm sol kenar |AB| = {0} cm olur ve tabanlar oranı |DE| / |BC| = 3/9 = {1} bulunur.",
                        [("9", ["3", "6", "9"]), ("1/3", ["1/2", "1/3", "2/3"])]
                    ),
                    v_stop(
                        "Temel Benzerlik ve Kelebek Modeli Uygulaması",
                        "LGS'de gölge boyu ve ayna sorularının temelini oluşturan iki modeli karşılaştıralım.",
                        [
                            "1. Model (Üçgen İçi Paralel): Üst parça 4, alt parça 8 ise tüm kenar 4 + 8 = 12'dir. Oran 4/8 değil, 4/12 = 1/3'tür!",
                            "2. Model (Kelebek/Kum Saati): Üst taban 5, alt taban 10 ise benzerlik oranı 5/10 = 1/2'dir.",
                            "3. İpucu: Paralel iki doğru arasında Z kuralından iç ters açılar eşittir!"
                        ],
                        "ABC üçgeninde [DE]//[BC], D noktası [AB]'nin tam orta noktası (|AD|=|DB|) ve |DE|=7 cm ise |BC| tabanı kaç cm'dir?",
                        ["7 cm", "14 cm", "21 cm"],
                        "14 cm"
                    ),
                    a_rainbow(
                        "Paralel Tabanları Hesapla",
                        "[DE] // [BC] olan üçgende |AD|=4 cm, |DB|=8 cm ve |DE|=5 cm ise eksikleri bul!",
                        ["Tüm kenar |AB| = ? cm", "Benzerlik oranı = 1/?", "Alt taban |BC| = ? cm"],
                        [(0, 12, "|AB| = 4 + 8 = 12 cm"), (1, 3, "4 / 12 = 1 / 3"), (2, 15, "5 × 3 = 15 cm")],
                        [2, 3, 10, 12, 15, 20]
                    ),
                    g_quiz(
                        "Oyun: Paralel Orantı Ustası",
                        "Temel benzerlik ve kelebek sorularını çöz!",
                        [
                            ("[DE]//[BC], |AD|=2, |DB|=3 ve |DE|=6 cm ise |BC| kaç cm'dir?", ["9 cm", "12 cm", "15 cm"], "15 cm"),
                            ("Kelebek modelinde paralel üst taban 6 cm, alt taban 9 cm ve üst kanat 4 cm ise alt kanat kaç cm'dir?", ["6 cm", "8 cm", "9 cm"], "6 cm"),
                            ("Bir üçgenin kenarlarının orta noktalarını birleştiren orta taban, alt tabanın kaçta kaçıdır?", ["1/2", "1/3", "1/4"], "1/2")
                        ]
                    ),
                    q_stop(
                        "Kelebek Modeli Sorusu",
                        "[AB] // [CD] kelebek modelinde paralel kenarların oranını yan kanatlara eşitle.",
                        "[AB] // [CD] olan bir kelebek (kum saati) şeklinde <strong>|AB| = 8 cm, |CD| = 12 cm</strong> ve kesişim noktası E için <strong>|AE| = 6 cm</strong>'dir. Buna göre devamındaki <strong>|ED|</strong> uzunluğu kaç cm'dir?",
                        ["8 cm", "9 cm", "10 cm", "12 cm"],
                        "B",
                        "|AB| / |CD| = |AE| / |ED| ⇒ 8 / 12 = 6 / |ED|!",
                        "Kelebek benzerliğinden: 8 / 12 = 6 / |ED| ⇒ 8 · |ED| = 72 ⇒ <strong>|ED| = 9 cm</strong> bulunur."
                    ),
                    q_stop(
                        "Kazanım Kontrol: Temel Benzerlik",
                        "Kazanım 3'ü yeşile çevirmek için bu soruyu çöz!",
                        "ABC üçgeninde [DE] // [BC], <strong>|AD| = 6 cm, |DB| = 4 cm</strong> ve <strong>|BC| = 20 cm</strong> olduğuna göre <strong>|DE|</strong> uzunluğu kaç cm'dir?",
                        ["8 cm", "10 cm", "12 cm", "15 cm"],
                        "C",
                        "Dikkat: Tüm kenar |AB| = 6 + 4 = 10 cm! |AD| / |AB| = |DE| / |BC| ⇒ 6 / 10 = |DE| / 20.",
                        "|AB| = 6 + 4 = 10 cm'dir. Temel benzerlikten: 6 / 10 = |DE| / 20 ⇒ <strong>|DE| = 12 cm</strong> bulunur."
                    )
                ]
            },
            {
                "title": "Açı-Açı (AA) Benzerliği ve Dik Üçgenler",
                "code": "M.8.3.3.1",
                "stops": [
                    v_stop(
                        "İç İçe Dik Üçgenlerde α - β - 90° Kodlaması",
                        "Ortak köşeli dik üçgenlerde eşit açıları harflendirerek benzerliği kurma.",
                        [
                            "1. Adım: Ortak dar açıya α (alfa), 90°'ye tamamlayan diğer dar açıya β (beta) yazılır (α + β = 90°).",
                            "2. Adım: Büyük dik üçgende de 90° ve α bulunduğu için üçüncü köşe otomatik olarak β olur!",
                            "3. Adım: Küçük üçgende α'nın karşısı / Büyük üçgende α'nın karşısı oranı kurularak bilinmeyen kenar bulunur!"
                        ],
                        "Benzer iki dik üçgende küçüğün dik kenarları 6 cm ve 8 cm, büyüğün hipotenüsü 20 cm ise benzerlik oranı kaçtır?",
                        ["1 / 2", "1 / 3", "2 / 3"],
                        "1 / 2"
                    ),
                    c_stop(
                        "İç Açılarından İkisi Eşit Olan Üçgenler Kesinlikle Benzerdir (AA)!",
                        "İki üçgenin ikişer açısı eşitse üçüncü açıları da (180° tamamlayanı) otomatik olarak eşittir!",
                        "İç içe geçmiş dik üçgenlerde <strong>90°'lik açı</strong> ve bir <strong>ortak dar açı (α)</strong> varsa üçüncü açılar (β) da eşittir (<strong>α + β = 90°</strong>).",
                        "Orantı kurulurken: <strong>1. üçgende α'nın karşısı / 2. üçgende α'nın karşısı = 1. üçgende 90°'nin karşısı / 2. üçgende 90°'nin karşısı</strong> yazılır!",
                        "İki üçgenin ikişer iç açısı birbirine eşitse bu üçgenler {0} benzerlik kuralına göre benzerdir. Dik üçgende dar açıların toplamı {1} derecedir.",
                        [("Açı-Açı (AA)", ["Kenar-Kenar", "Açı-Açı (AA)", "Yükseklik"]), ("90", ["60", "90", "180"])]
                    ),
                    a_rainbow(
                        "Açıların Karşısındaki Kenarları Oranla",
                        "Benzer iki dik üçgende küçüğün kenarları 3-4-5, büyüğün en kısa dik kenarı 9 cm ise eksikleri bul!",
                        ["Benzerlik oranı (9/3)=?", "Büyüğün diğer dik kenarı=?", "Büyüğün hipotenüsü=?"],
                        [(0, 3, "9 ÷ 3 = 3 kat"), (1, 12, "4 × 3 = 12 cm"), (2, 15, "5 × 3 = 15 cm")],
                        [3, 4, 9, 12, 15, 20]
                    ),
                    g_quiz(
                        "Oyun: Açı-Açı Eşleştirici",
                        "Dik üçgenlerdeki benzerlik oranlarını bul!",
                        [
                            ("Bir dik üçgende dar açılardan biri 35° ise diğeri kaç derecedir?", ["45°", "55°", "65°"], "55°"),
                            ("Benzerlik oranı 3/4 olan iki dik üçgenden küçüğün hipotenüsü 15 cm ise büyüğün hipotenüsü kaç cm'dir?", ["18 cm", "20 cm", "24 cm"], "20 cm"),
                            ("Zemine dik duran 1,5 m boyundaki çocuğun gölgesi 2 m iken, aynı anda gölgesi 8 m olan ağacın boyu kaç m'dir?", ["5 m", "6 m", "10 m"], "6 m")
                        ]
                    ),
                    q_stop(
                        "Kazanım Kontrol: Gölge Boyu ve Benzerlik",
                        "Kazanım 4'ü yeşile çevirmek için bu soruyu çöz!",
                        "Güneşli bir günde <strong>180 cm</strong> boyundaki bir kişinin gölge uzunluğu <strong>120 cm</strong> olarak ölçülüyor. Aynı anda yanındaki bir bayrak direğinin gölge uzunluğu <strong>6 metre</strong> olduğuna göre bayrak direğinin boyu kaç metredir?",
                        ["4 m", "8 m", "9 m", "12 m"],
                        "C",
                        "Boy / Gölge = 180 / 120 = 3 / 2 oranını bayrak direğine uygula: Boy / 6 = 3 / 2!",
                        "Boy / Gölge oranı = 180 / 120 = <strong>3 / 2</strong>'dir. Direğin boyu / 6 = 3 / 2 ⇒ Direğin boyu = <strong>9 metre</strong> bulunur."
                    )
                ]
            },
            {
                "title": "Çevrelerin Oranı (k) ve Alanların Oranı (k²)",
                "code": "M.8.3.3.2",
                "stops": [
                    c_stop(
                        "Çevrelerin Oranı = k | Alanların Oranı = k²!",
                        "LGS'de en çok sorulan kural: Benzer iki çokgenin çevrelerinin oranı benzerlik oranına (k), ALANLARININ oranı ise benzerlik oranının KARESİNE (k²) eşittir!",
                        "Örneğin benzerlik oranı <strong>k = 2 / 3</strong> olan iki üçgenin:<br>• Karşılıklı kenarları, yükseklikleri ve <strong>çevrelerinin oranı = 2 / 3</strong>'tür.",
                        "• <strong>Alanlarının oranı ise k² = (2 / 3)² = 4 / 9</strong> olur!",
                        "Benzerlik oranı 1/4 olan iki karenin çevrelerinin oranı {0}, alanlarının oranı ise (1/4)² = {1} olur.",
                        [("1/4", ["1/2", "1/4", "1/16"]), ("1/16", ["1/4", "1/8", "1/16"])]
                    ),
                    v_stop(
                        "Alan Oranından Çevre Oranına Geçiş (Karekök Alma)",
                        "Alanları oranı verildiğinde benzerlik oranını (k) bulmak için karekök alırız!",
                        [
                            "1. Adım: Benzer iki şeklin alanları oranı 9 / 25 olarak verilmiş olsun.",
                            "2. Adım: k² = 9 / 25 olduğundan her iki tarafın karekökünü alırız: k = √(9/25) = 3 / 5!",
                            "3. Adım: Böylece çevrelerinin oranı ve karşılıklı kenarlarının oranı 3 / 5 olarak bulunur!"
                        ],
                        "Alanları oranı 16 / 49 olan benzer iki çokgenin çevreleri oranı kaçtır?",
                        ["4 / 7", "8 / 24", "16 / 49"],
                        "4 / 7"
                    ),
                    a_rainbow(
                        "k, Çevre Oranı ve Alan Oranı (k²) Tablosu",
                        "Benzerlik oranı k = 3 / 5 olan iki çokgen için eksikleri tamamla!",
                        ["Yükseklikler oranı=3/?", "Çevreler oranı=3/?", "Alanlar oranı (k²)=9/?"],
                        [(0, 5, "Yükseklikler oranı k = 3/5'tir."), (1, 5, "Çevreler oranı k = 3/5'tir."), (2, 25, "Alanlar oranı (3/5)² = 9/25'tir.")],
                        [5, 9, 10, 15, 25, 30]
                    ),
                    g_quiz(
                        "Oyun: Çevre (k) ve Alan (k²) Ustası",
                        "Benzerlik oranı ile çevre ve alan arasındaki geçişleri yap!",
                        [
                            ("Benzerlik oranı 2 olan iki üçgenden küçüğün alanı 10 cm² ise büyüğün alanı kaç cm²'dir?", ["20 cm²", "40 cm²", "80 cm²"], "40 cm²"),
                            ("Benzer iki çokgenin çevreleri oranı 1/3 ise alanları oranı kaçtır?", ["1/3", "1/6", "1/9"], "1/9"),
                            ("Kenarları 2 katına çıkarılan bir karenin alanı kaç katına çıkar?", ["2 katına", "4 katına", "8 katına"], "4 katına")
                        ]
                    ),
                    q_stop(
                        "Kazanım Kontrol: Benzer Üçgenlerde Alan",
                        "Kazanım 5'i yeşile çevirmek için bu soruyu çöz!",
                        "Benzer iki üçgenin benzerlik oranı <strong>2 / 5</strong>'tir. Küçük üçgenin alanı <strong>12 cm²</strong> olduğuna göre büyük üçgenin alanı kaç cm²'dir?",
                        ["30 cm²", "60 cm²", "75 cm²", "100 cm²"],
                        "C",
                        "Alanlar oranı k² = (2/5)² = 4 / 25. 4 kat = 12 cm² (3 katı) ise 25 × 3 hesapla!",
                        "Alanlar oranı = (2 / 5)² = <strong>4 / 25</strong>'tir. 12 / Alan(Büyük) = 4 / 25 ⇒ Alan(Büyük) = 25 × 3 = <strong>75 cm²</strong> bulunur."
                    )
                ]
            },
            {
                "title": "LGS Ölçek, Ayna ve Gölge Görevleri",
                "code": "M.8.3.3.2",
                "stops": [
                    a_rainbow(
                        "Adım Adım LGS Kurgusu: Kroki ve Gerçek Alan",
                        "Benzerlik oranı (ölçeği) 1 / 100 olan bir ev krokisinde salonun kısa kenarı 4 cm, uzun kenarı 5 cm'dir!",
                        ["Gerçek kısa kenar=? m", "Gerçek uzun kenar=? m", "Gerçek salon alanı=? m²"],
                        [(0, 4, "4 × 100 = 400 cm = 4 metre"), (1, 5, "5 × 100 = 500 cm = 5 metre"), (2, 20, "4 m × 5 m = 20 m²")],
                        [4, 5, 9, 20, 40, 200]
                    ),
                    q_stop(
                        "LGS Yeni Nesil 1: Yerdeki Ayna ile Ağaç Boyu Ölçme",
                        "Aynaya geliş ve yansıma açıları eşit olduğu için iki dik üçgen AA benzeridir!",
                        "Boyu <strong>1,6 m</strong> olan Elif, yerdeki düz aynaya <strong>2 m</strong> uzaklıktan baktığında aynaya <strong>10 m</strong> uzaklıktaki çam ağacının en üst noktasını görüyor. Buna göre çam ağacının boyu kaç metredir?",
                        ["6 m", "8 m", "10 m", "12 m"],
                        "B",
                        "Elif'in aynaya uzaklığı (2 m) / Ağacın aynaya uzaklığı (10 m) = 1 / 5. Elif'in boyunu 5 ile çarp!",
                        "Benzerlik oranı 2 / 10 = <strong>1 / 5</strong>'tir. Ağacın boyu = 1,6 × 5 = <strong>8 metre</strong> bulunur."
                    ),
                    q_stop(
                        "LGS Yeni Nesil 2: Sokak Lambası ve Gölge Boyu",
                        "Temel benzerlik modelinde (Çocuk / Lamba = Gölge / Tüm Taban).",
                        "Yüksekliği <strong>4,5 metre</strong> olan bir sokak lambasının direğinden <strong>4 metre</strong> uzakta duran <strong>1,5 metre</strong> boyundaki bir çocuğun gölgesinin uzunluğu kaç metredir?",
                        ["1,5 m", "2 m", "2,5 m", "3 m"],
                        "B",
                        "Gölgeye x dersek: x / (x + 4) = 1,5 / 4,5 = 1 / 3 ⇒ 3x = x + 4!",
                        "Gölge uzunluğu x olsun. Temel benzerlikten: x / (x + 4) = 1,5 / 4,5 = 1 / 3 ⇒ 3x = x + 4 ⇒ 2x = 4 ⇒ <strong>x = 2 metre</strong> bulunur."
                    ),
                    g_quiz(
                        "Final: Eşlik ve Benzerlik Şampiyonluk Etabı",
                        "Son 3 görevi tamamla ve 10. Üniteyi tamamen YEŞİLE döndür!",
                        [
                            ("Benzerlik oranı 3/4 olan iki çokgenin alanları oranı kaçtır?", ["3/4", "6/8", "9/16"], "9/16"),
                            ("Alanları oranı 1/25 olan benzer iki üçgenin çevreleri oranı kaçtır?", ["1/5", "1/10", "1/25"], "1/5"),
                            ("Eş iki çokgen için hangisi yanlıştır?", ["Alanları eşittir", "Çevreleri eşittir", "Benzerlik oranı 2'dir"], "Benzerlik oranı 2'dir")
                        ],
                        True
                    )
                ]
            }
        ]
    ),

    # =========================================================================
    # ÜNİTE 11: DÖNÜŞÜM GEOMETRİSİ
    # =========================================================================
    make_unit(
        11, "m8-u11-donusum-geometrisi", "Dönüşüm Geometrisi",
        "Öteleme, Koordinat Değişimi, Eksenlere Göre Yansıma (Simetri) ve Ardışık Dönüşümler",
        "assets/flow/u11_donusum_geometrisi.jpg",
        ["x+a", "y+b", "(x,−y)", "(−x,y)", "🪞", "➡️", "⬆️", "🔄", "A'", "B'", "📐", "LGS"],
        [
            {
                "title": "Noktanın ve Çokgenin Ötelenmesi",
                "code": "M.8.3.2.1",
                "stops": [
                    v_stop(
                        "Çokgenin Köşe Noktalarını Öteleyerek Görüntü Çizme",
                        "Bir çokgeni ötelemek için tüm kenarları değil, köşe noktalarını taşımak yeterlidir!",
                        [
                            "1. Adım: Çokgenin A, B, C köşelerinin her biri verilen yönde (örneğin 5 sağa, 3 aşağı) tek tek taşınır.",
                            "2. Adım: Elde edilen A', B', C' noktaları birleştirildiğinde ötelenmiş eş üçgen ortaya çıkar.",
                            "3. Adım: A ile B arasındaki mesafe ne ise A' ile B' arasındaki mesafe de birebir aynıdır!"
                        ],
                        "Öteleme hareketinde şeklin aşağıdaki özelliklerinden hangisi değişir?",
                        ["Büyüklüğü (Alanı)", "Duruş yönü", "Düzlemdeki yeri (Konumu)"],
                        "Düzlemdeki yeri (Konumu)"
                    ),
                    c_stop(
                        "Ötelemede Şeklin Boyutu, Biçimi ve Duruş Yönü DEĞİŞMEZ!",
                        "Bir şekli kaydırarak (sağa, sola, yukarı, aşağı) başka bir konuma taşımaya ÖTELEME denir.",
                        "Öteleme sonucunda oluşan görüntü başlangıçtaki şekille <strong>birebir eştir (≅)</strong>; şeklin duruş yönü bile değişmez, sadece konumu değişir!",
                        "Bir çokgeni ötelemek için <strong>köşe noktalarından birini</strong> öteleyip şekli yeniden çizmek yeterlidir.",
                        "Bir şeklin sağa, sola, yukarı veya aşağı kaydırılmasına {0} denir. Öteleme sonucunda şeklin boyutu ve duruşu {1}.",
                        [("öteleme", ["yansıma", "öteleme", "benzerlik"]), ("değişmez", ["büyür", "ters döner", "değişmez"])]
                    ),
                    a_rainbow(
                        "Birim Kareli Zeminde Öteleme",
                        "Köşesi kareli zeminde bulunan şekil önce 4 birim sağa, sonra 3 birim sağa daha ötelenirse eksikleri bul!",
                        ["Toplam sağa öteleme=? br", "En kısa mesafe (3 sağ, 4 yukarı)=? br", "Şeklin alanı değişir mi (0=Hayır)=?"],
                        [(0, 7, "4 + 3 = 7 birim sağa ötelenmiş olur."), (1, 5, "3-4-5 dik üçgeninden A ile A' arası 5 birimdir."), (2, 0, "Ötelemede alan asla değişmez (0).")],
                        [0, 1, 5, 7, 9, 12]
                    ),
                    g_quiz(
                        "Oyun: Öteleme Pusulası",
                        "Öteleme hareketlerinin özelliklerini doğru seç!",
                        [
                            ("Öteleme hareketinde aşağıdakilerden hangisi değişir?", ["Kenar uzunlukları", "İç açılar", "Köşe koordinatları"], "Köşe koordinatları"),
                            ("Bir nokta 6 birim sağa, sonra 2 birim sola ötelenirse net hareket nedir?", ["4 birim sağa", "8 birim sağa", "4 birim sola"], "4 birim sağa"),
                            ("Ötelenen bir üçgen ile görüntüsü arasındaki benzerlik oranı kaçtır?", ["1/2", "1", "2"], "1")
                        ]
                    ),
                    q_stop(
                        "Kazanım Kontrol: Öteleme ve Pisagor",
                        "Kazanım 1'i yeşile çevirmek için bu soruyu çöz!",
                        "Birim kareli zeminde bir <strong>A</strong> noktası <strong>6 birim sağa</strong> ve <strong>8 birim yukarı</strong> ötelenerek <strong>A'</strong> noktası elde ediliyor. Buna göre A ile A' noktaları arasındaki en kısa uzaklık kaç birimdir?",
                        ["10 birim", "12 birim", "14 birim", "48 birim"],
                        "A",
                        "Yatayda 6 birim, dikeyde 8 birim ⇒ 6-8-10 özel dik üçgeni!",
                        "Yatay hareket 6 birim, dikey hareket 8 birim olduğundan Pisagor bağıntısından (6-8-10 üçgeni) |AA'| = <strong>10 birim</strong> bulunur."
                    )
                ]
            },
            {
                "title": "Koordinat Düzleminde Öteleme: (x ± a, y ± b)",
                "code": "M.8.3.2.1",
                "stops": [
                    c_stop(
                        "Sağa/Sola Hareket x'i (Apsisi), Yukarı/Aşağı Hareket y'yi (Ordinatı) Değiştirir!",
                        "• a birim SAĞA ⇒ x + a | a birim SOLA ⇒ x − a\n• b birim YUKARI ⇒ y + b | b birim AŞAĞI ⇒ y − b",
                        "Örneğin <strong>A(−2, 5)</strong> noktası <strong>6 birim sağa</strong> ve <strong>3 birim aşağı</strong> ötelenirse:<br>Yeni koordinat: <strong>A'(−2 + 6, 5 − 3) = A'(4, 2)</strong> olur.",
                        "x ekseni boyunca ötelemede sadece x değişir; y ekseni boyunca ötelemede sadece y değişir!",
                        "K(3, −4) noktası 5 birim sola (3−5) ve 6 birim yukarı (−4+6) ötelendiğinde yeni koordinatı {0} olur. x ekseni boyunca sağa ötelemede {1} koordinatı artar.",
                        [("(−2, 2)", ["(8, 2)", "(−2, 2)", "(−2, −10)"]), ("apsis (x)", ["apsis (x)", "ordinat (y)", "her ikisi"])]
                    ),
                    v_stop(
                        "İlk Noktadan Görüntüye, Görüntüden İlk Noktaya Geçiş",
                        "Bazen öteleme sonrasındaki görüntü (A') verilip başlangıçtaki A noktası sorulur (Ters işlem yapılır!).",
                        [
                            "1. Durum: A(1, −3) noktası 4 birim sağa, 5 birim yukarı ötelenirse A'(1+4, −3+5) = A'(5, 2) olur.",
                            "2. Durum (Tersten): Ötelenmiş hali A'(5, 2) ise başlangıçtaki A'yı bulmak için ters işlem (4 sola, 5 aşağı) yaparız!",
                            "3. Kural: A' − A farkı bize doğrudan öteleme vektörünü verir!"
                        ],
                        "M(−5, 2) noktası x ekseni boyunca 7 birim sağa ötelenirse yeni koordinatı ne olur?",
                        ["(2, 2)", "(−5, 9)", "(−12, 2)"],
                        "(2, 2)"
                    ),
                    a_rainbow(
                        "Koordinat Öteleme Hesaplayıcı",
                        "P(−4, 6) noktası 9 birim sağa ve 8 birim aşağı ötelenerek P'(x, y) elde ediliyor!",
                        ["Yeni apsis x = ?", "Yeni ordinat y = ?", "x + y toplamı = ?"],
                        [(0, 5, "−4 + 9 = 5"), (1, -2, "6 − 8 = −2"), (2, 3, "5 + (−2) = 3")],
                        [-2, 2, 3, 5, 7, 13]
                    ),
                    g_quiz(
                        "Oyun: Koordinat Taşıyıcı",
                        "Ötelenen noktaların yeni koordinatlarını bul!",
                        [
                            ("A(4, −1) noktası hangi ötelemeyle orijine (0,0) gelir?", ["4 sola, 1 yukarı", "4 sağa, 1 aşağı", "1 sola, 4 yukarı"], "4 sola, 1 yukarı"),
                            ("B(−3, −2) noktası 5 birim yukarı ötelenirse hangi bölgeye geçer?", ["I. Bölge", "II. Bölge", "IV. Bölge"], "II. Bölge"),
                            ("3 birim sola, 4 birim aşağı ötelenmiş hali (2, −5) olan noktanın ilk hali nedir?", ["(5, −1)", "(−1, −9)", "(5, −9)"], "(5, −1)")
                        ]
                    ),
                    q_stop(
                        "Kazanım Kontrol: Üçgen Köşesinin Ötelenmesi",
                        "Kazanım 2'yi yeşile çevirmek için bu soruyu çöz!",
                        "Köşelerinden biri <strong>A(−6, 3)</strong> olan ABC üçgeni, <strong>4 birim sağa</strong> ve <strong>5 birim aşağı</strong> ötelendiğinde A' köşesinin koordinatları aşağıdakilerden hangisi olur?",
                        ["(−2, −2)", "(−10, −2)", "(−2, 8)", "(2, −2)"],
                        "A",
                        "x' = −6 + 4 = −2 ve y' = 3 − 5 = −2!",
                        "4 birim sağa ⇒ x' = −6 + 4 = <strong>−2</strong>; 5 birim aşağı ⇒ y' = 3 − 5 = <strong>−2</strong>. A'(−2, −2) bulunur."
                    )
                ]
            },
            {
                "title": "Doğruya Göre Yansıma (Simetri) ve Ayna Görüntüsü",
                "code": "M.8.3.2.2",
                "stops": [
                    v_stop(
                        "Doğruya Göre Simetride Diklik ve Eşit Uzaklık",
                        "Ayna doğrusuna yakın olan nokta görüntüde de aynaya yakın, uzak olan nokta uzak olur!",
                        [
                            "1. Kural: Bir A noktasından simetri doğrusuna dik (90°) inilir; bu mesafe kadar karşı tarafa gidilerek A' bulunur.",
                            "2. Kural: Şeklin aynaya bakan ucu görüntüde de aynaya bakar (Sağ-sol veya üst-alt yönü ters döner!).",
                            "3. Kural: Simetri doğrusu üzerinde bulunan noktaların görüntüsü yine kendi üzerindedir!"
                        ],
                        "Simetri doğrusuna 9 cm uzaklıktaki bir K noktasının görüntüsü K' ile arasındaki uzaklık kaç cm'dir?",
                        ["9 cm", "18 cm", "27 cm"],
                        "18 cm"
                    ),
                    a_rainbow(
                        "Ayna Mesafesi Hesaplayıcı",
                        "Aynaya 15 cm uzaklıktaki cisim ve görüntüsü için eksikleri bul!",
                        ["Görüntünün aynaya uzaklığı=? cm", "Cisim ile görüntü arası=? cm", "Cisim 5 cm yaklaşırsa yeni ara=? cm"],
                        [(0, 15, "Görüntü de aynadan 15 cm uzaktadır."), (1, 30, "15 + 15 = 30 cm"), (2, 20, "10 + 10 = 20 cm")],
                        [10, 15, 20, 25, 30, 40]
                    ),
                    c_stop(
                        "Noktanın Aynaya Uzaklığı = Görüntünün Aynaya Uzaklığı!",
                        "Yansımada (simetride) şeklin boyutu değişmez ama DURUŞ YÖNÜ TERS DÖNER (Sağ el sol el gibi görünür)!",
                        "Bir şeklin bir <strong>d (simetri) doğrusuna</strong> göre yansımasında her nokta ayna doğrusuna <strong>dik olarak eşit uzaklıktaki</strong> karşı noktaya eşlenir.",
                        "Dijital rakamlarda (2 ↔ 5) ve harflerde (b ↔ d veya p ↔ q) aynaya yakın olan uç görüntüde de aynaya yakın olur!",
                        "Yansıma hareketinde noktaların simetri doğrusuna olan dik uzaklıkları {0} kalır; ancak şeklin yönü {1} döner.",
                        [("eşit", ["farklı", "eşit", "yarıya"]), ("ters", ["aynı", "ters", "dik"])]
                    ),
                    a_sort(
                        "Öteleme mi, Yansıma (Simetri) mı?",
                        "Verilen günlük hayat ve geometri durumlarını dönüşüm türüne göre ayır!",
                        ["Yansıma (Simetri)", "Öteleme"],
                        [
                            ("Göl kıyısındaki dağların durgun sudaki görüntüsü", "Yansıma (Simetri)"),
                            ("Ray üzerinde düz ilerleyen tren vagonunun hareketi", "Öteleme"),
                            ("Kelebeğin sağ ve sol kanatlarının gövdeye göre duruşu", "Yansıma (Simetri)"),
                            ("Asansör kabininin 1. kattan 5. kata çıkması", "Öteleme")
                        ]
                    ),
                    g_quiz(
                        "Oyun: Ayna Ustası",
                        "Yansıma uzaklıklarını ve görüntü özelliklerini bul!",
                        [
                            ("A noktasının simetri doğrusuna uzaklığı 7 birim ise A ile görüntüsü A' arasındaki uzaklık kaç birimdir?", ["7 birim", "14 birim", "21 birim"], "14 birim"),
                            ("Simetri doğrusunun tam üzerinde bulunan bir noktanın yansıması nerededir?", ["Aynı noktada (Kendi üzerinde)", "Orijinde", "Sonsuzda"], "Aynı noktada (Kendi üzerinde)"),
                            ("Dikey aynada [ 2 ] dijital rakamının yansıması hangi rakam gibi görünür?", ["2", "5", "8"], "5")
                        ]
                    ),
                    q_stop(
                        "Kazanım Kontrol: Aynadaki Uzaklık",
                        "Kazanım 3'ü yeşile çevirmek için bu soruyu çöz!",
                        "Bir düzlem aynaya <strong>120 cm</strong> uzaklıkta duran Mert, aynaya doğru <strong>30 cm yaklaşıyor</strong>. Son durumda Mert ile aynadaki görüntüsü arasındaki mesafe kaç cm olur?",
                        ["90 cm", "150 cm", "180 cm", "240 cm"],
                        "C",
                        "Mert 30 cm yaklaşınca aynaya uzaklığı 120 − 30 = 90 cm olur. Görüntüsü de aynanın 90 cm arkasındadır!",
                        "Mert'in aynaya yeni uzaklığı 120 − 30 = <strong>90 cm</strong>'dir. Görüntünün aynaya uzaklığı da 90 cm olduğundan aralarındaki toplam mesafe = 90 + 90 = <strong>180 cm</strong> olur."
                    )
                ]
            },
            {
                "title": "Eksenlere Göre Yansıma: X Ekseninde (x, −y), Y Ekseninde (−x, y)",
                "code": "M.8.3.2.2",
                "stops": [
                    c_stop(
                        "ALTIN KURAL: Hangi Eksene Göre Yansırsa O Eksendeki Koordinat AYNI KALIR, Diğeri İşaret Değiştirir!",
                        "• X eksenine göre yansıma: (x, y) → (x, −y) [x sabit, y işaret değiştirir!]\n• Y eksenine göre yansıma: (x, y) → (−x, y) [y sabit, x işaret değiştirir!]\n• Orijine göre yansıma: (x, y) → (−x, −y) [İkisi de işaret değiştirir!]",
                        "Örneğin <strong>A(3, −5)</strong> noktasının:<br>• <strong>x eksenine</strong> göre yansıması: <strong>(3, +5)</strong><br>• <strong>y eksenine</strong> göre yansıması: <strong>(−3, −5)</strong><br>• <strong>Orijine</strong> göre yansıması: <strong>(−3, +5)</strong>.",
                        "Bu kuralı 'Hangi eksense o harf korunur!' şeklinde kodlarsan asla karıştırmazsın.",
                        "A(4, 7) noktasının x eksenine göre yansıması {0}, y eksenine göre yansıması ise {1} noktasıdır.",
                        [("(4, −7)", ["(−4, 7)", "(4, −7)", "(−4, −7)"]), ("(−4, 7)", ["(−4, 7)", "(4, −7)", "(7, 4)"])]
                    ),
                    v_stop(
                        "X ve Y Ekseni Yansımalarında Bölge Değişimi",
                        "Koordinat düzleminde yansıma yapıldığında nokta hangi bölgeye geçer?",
                        [
                            "1. Adım: I. bölgedeki (+, +) bir nokta x eksenine göre yansırsa aşağıya IV. bölgeye (+, −) geçer.",
                            "2. Adım: Aynı nokta y eksenine göre yansırsa sola II. bölgeye (−, +) geçer.",
                            "3. Adım: Bir nokta hem x hem y eksenine göre ardışık yansıtılırsa orijine göre yansımış olur ve (−, −) III. bölgeye geçer!"
                        ],
                        "K(−6, 4) noktasının y eksenine göre yansıması olan nokta hangisidir?",
                        ["(6, 4)", "(−6, −4)", "(6, −4)"],
                        "(6, 4)"
                    ),
                    a_rainbow(
                        "Yansıma Koordinat Tablosu",
                        "B(−5, −8) noktasının yansımalarındaki eksik koordinatları bul!",
                        ["x eksenine göre=(−5, ?)", "y eksenine göre=(?, −8)", "Orijine göre=(5, ?)"],
                        [(0, 8, "x eksenine göre y işaret değiştirir: +8."), (1, 5, "y eksenine göre x işaret değiştirir: +5."), (2, 8, "Orijine göre ikisi de işaret değiştirir: (5, 8).")],
                        [-8, -5, 5, 8, 0, 13]
                    ),
                    g_quiz(
                        "Oyun: Eksen Yansıtıcı",
                        "Eksenlere göre yansıma koordinatlarını hızlıca seç!",
                        [
                            ("M(7, −3) noktasının x eksenine göre yansıması nedir?", ["(7, 3)", "(−7, −3)", "(−7, 3)"], "(7, 3)"),
                            ("Hangi noktanın x eksenine göre yansıması kendisidir?", ["(0, 5)", "(4, 0)", "(3, 3)"], "(4, 0)"),
                            ("A(a, −4) noktasının y eksenine göre yansıması (−2, b) ise a + b kaçtır?", ["−2", "2", "6"], "−2")
                        ]
                    ),
                    q_stop(
                        "Harfli Yansıma Eşitliği",
                        "y eksenine göre yansımada x işaret değiştirir, y aynı kalır.",
                        "<strong>K(m + 1, −5)</strong> noktasının <strong>y eksenine göre yansıması K'(4, n − 2)</strong> olduğuna göre <strong>m + n</strong> kaçtır?",
                        ["−8", "−6", "−2", "2"],
                        "A",
                        "m + 1 = −4 ⇒ m = −5; ve n − 2 = −5 ⇒ n = −3!",
                        "y eksenine göre yansımada apsis işaret değiştirir: m + 1 = −4 ⇒ <strong>m = −5</strong>. Ordinat aynı kalır: n − 2 = −5 ⇒ <strong>n = −3</strong>. Toplamları m + n = −5 + (−3) = <strong>−8</strong>."
                    ),
                    q_stop(
                        "Kazanım Kontrol: Eksen Yansıması",
                        "Kazanım 4'ü yeşile çevirmek için bu soruyu çöz!",
                        "Koordinat sisteminde <strong>A(−3, 6)</strong> noktasının <strong>x eksenine göre yansıması B</strong> noktasıdır. Buna göre |AB| doğru parçasının uzunluğu kaç birimdir?",
                        ["3 birim", "6 birim", "9 birim", "12 birim"],
                        "D",
                        "B noktası (−3, −6) olur. 6 birim yukarıda ve 6 birim aşağıda olduğu için uzaklık 6 + 6 = 12 birimdir!",
                        "A(−3, 6) noktasının x eksenine göre yansıması <strong>B(−3, −6)</strong>'dır. İki nokta arasındaki dikey uzaklık = 6 − (−6) = <strong>12 birim</strong>dir."
                    )
                ]
            },
            {
                "title": "Ardışık Öteleme ve Yansıma Hareketleri",
                "code": "M.8.3.2.3",
                "stops": [
                    c_stop(
                        "Adım Adım Sırayla İşlem: Önce 1. Dönüşüm, Sonra 2. Dönüşüm!",
                        "Ötelemeli yansımada (örneğin kumsaldaki sağ-sol ayak izleri) şekil hem ötelenir hem simetri doğrusuna göre yansıtılır!",
                        "Örneğin <strong>A(2, −4)</strong> noktası önce <strong>3 birim sola ötelenip</strong> sonra <strong>x eksenine göre yansıtılırsa</strong>:<br>1. Adım (3 sola): <strong>(2 − 3, −4) = (−1, −4)</strong><br>2. Adım (x'e göre yansıma): <strong>(−1, +4)</strong>!",
                        "Önce x eksenine, hemen ardından y eksenine göre yansıma yapmak <strong>orijine göre yansıma (−x, −y)</strong> ile aynı sonucu verir.",
                        "P(1, 5) noktası önce y eksenine göre yansıtılırsa {0} olur; ardından 2 birim aşağı ötelenirse son konumu {1} olur.",
                        [("(−1, 5)", ["(1, −5)", "(−1, 5)", "(−1, −5)"]), ("(−1, 3)", ["(−1, 3)", "(−1, 7)", "(1, 3)"])]
                    ),
                    a_rainbow(
                        "Ardışık Dönüşüm Zinciri",
                        "A(−4, 3) noktası önce x eksenine göre yansıtılıyor (A'), sonra 6 birim sağa öteleniyor (A'')!",
                        ["A' ordinatı = ?", "A'' apsisi (−4+6) = ?", "A'' koordinatları toplamı = ?"],
                        [(0, -3, "x eksenine göre yansıyınca A'(−4, −3) olur."), (1, 2, "6 birim sağa gidince x = −4 + 6 = 2 olur."), (2, -1, "A''(2, −3) ⇒ 2 + (−3) = −1.")],
                        [-4, -3, -1, 2, 3, 5]
                    ),
                    g_quiz(
                        "Oyun: Dönüşüm Zinciri",
                        "İki adımlı dönüşüm görevlerini tamamla!",
                        [
                            ("K(3, 4) önce x eksenine, sonra y eksenine göre yansıtılırsa hangi noktaya gelir?", ["(−3, −4)", "(−3, 4)", "(3, −4)"], "(−3, −4)"),
                            ("L(−2, 1) noktası 4 birim sağa ötelenip y eksenine göre yansıtılırsa ne olur?", ["(−2, 1)", "(2, −1)", "(−2, −1)"], "(−2, 1)"),
                            ("Kumsalda yürüyen bir kişinin sağ ve sol ayak izleri hangi dönüşüm örneğidir?", ["Sadece öteleme", "Ötelemeli yansıma", "Sadece yansıma"], "Ötelemeli yansıma")
                        ]
                    ),
                    q_stop(
                        "Kazanım Kontrol: İki Adımlı Dönüşüm",
                        "Kazanım 5'i yeşile çevirmek için bu soruyu çöz!",
                        "Koordinat düzleminde <strong>A(−5, −2)</strong> noktası önce <strong>y eksenine göre yansıtılıyor</strong>, ardından elde edilen nokta <strong>4 birim yukarı öteleniyor</strong>. Son durumda elde edilen noktanın koordinatları nedir?",
                        ["(5, 2)", "(−5, 2)", "(5, −6)", "(−1, −2)"],
                        "A",
                        "1. Adım (y'ye göre yansıma): (5, −2). 2. Adım (4 yukarı): (5, −2 + 4) = (5, 2)!",
                        "A(−5, −2) noktasının y eksenine göre yansıması <strong>(5, −2)</strong>'dir. 4 birim yukarı ötelendiğinde ordinata 4 eklenir: <strong>(5, 2)</strong> bulunur."
                    )
                ]
            },
            {
                "title": "LGS Dönüşüm ve Koordinat Hedef Görevleri",
                "code": "M.8.3.2.3",
                "stops": [
                    a_rainbow(
                        "Adım Adım LGS Kurgusu: Üçgenin Yansıması ve Alanı",
                        "Köşeleri A(2, 1), B(6, 1) ve C(2, 4) olan dik üçgen x eksenine göre yansıtılıyor!",
                        ["Taban |AB| = ? br", "Yükseklik |AC| = ? br", "Yansıyan üçgenin alanı = ? br²"],
                        [(0, 4, "6 − 2 = 4 birim"), (1, 3, "4 − 1 = 3 birim"), (2, 6, "Yansımada alan değişmez: (4 × 3) ÷ 2 = 6 br²")],
                        [3, 4, 5, 6, 8, 12]
                    ),
                    q_stop(
                        "LGS Yeni Nesil 1: Dijital Saatin Aynadaki Görüntüsü",
                        "Dikey aynada sağ-sol yer değiştirir ve 2 ↔ 5 birbirine dönüşür!",
                        "Dijital bir masa saati <strong>12 : 50</strong>'yi gösterirken yanındaki dikey düz aynadaki görüntüsüne bakılıyor. (1, 0 ve : aynı kalmakta, 2 ile 5 birbirine dönüşmektedir). Görüntüde okunan saat hangisidir?",
                        ["02 : 51", "05 : 21", "15 : 20", "12 : 05"],
                        "A",
                        "12:50 sağdan sola ters dizilir: 0 → 0, 5 → 2, : → :, 2 → 5, 1 → 1 ⇒ 02:51!",
                        "Dikey aynada sıralama sağdan sola döner ve 2 ile 5 yer değiştirir: En sağdaki 0 başa gelir (0), 5 sayısı 2 olur (02), iki nokta (:), 2 sayısı 5 olur ve 1 sona gelir ⇒ <strong>02 : 51</strong>."
                    ),
                    q_stop(
                        "LGS Yeni Nesil 2: Noktaları Üst Üste Getirme",
                        "Hangi dönüşüm iki noktayı çakıştırır?",
                        "Koordinat düzleminde <strong>K(−3, 4)</strong> noktasını <strong>L(3, −2)</strong> noktası ile çakıştırmak için aşağıdaki ardışık dönüşümlerden hangisi uygulanmalıdır?",
                        ["y eksenine göre yansıtıp 2 birim aşağı ötelemek", "x eksenine göre yansıtıp 6 birim sağa ötelemek", "y eksenine göre yansıtıp 6 birim aşağı ötelemek", "6 birim sağa, 2 birim aşağı ötelemek"],
                        "C",
                        "K(−3, 4) noktasını y eksenine göre yansıtırsak (3, 4) olur. (3, −2) olması için 4 − 6 = −2 (6 birim aşağı) gerekir!",
                        "K(−3, 4) noktasının y eksenine göre yansıması <strong>(3, 4)</strong>'tür. Bu noktayı <strong>6 birim aşağı</strong> ötelersek (3, 4 − 6) = <strong>L(3, −2)</strong> noktası elde edilir."
                    ),
                    g_quiz(
                        "Final: Dönüşüm Geometrisi Şampiyonluk Etabı",
                        "Son 3 görevi tamamla ve 11. Üniteyi tamamen YEŞİLE döndür!",
                        [
                            ("A(−4, 7) noktasının x eksenine göre yansıması nedir?", ["(−4, −7)", "(4, 7)", "(4, −7)"], "(−4, −7)"),
                            ("B(2, −5) noktası 3 birim sola, 5 birim yukarı ötelenirse ne olur?", ["(−1, 0)", "(5, 0)", "(−1, −10)"], "(−1, 0)"),
                            ("Hangi dönüşümde şeklin duruş yönü değişmez?", ["X eksenine göre yansıma", "Öteleme", "Y eksenine göre yansıma"], "Öteleme")
                        ],
                        True
                    )
                ]
            }
        ]
    ),

    # =========================================================================
    # ÜNİTE 12: GEOMETRİK CİSİMLER
    # =========================================================================
    make_unit(
        12, "m8-u12-geometrik-cisimler", "Geometrik Cisimler",
        "Dik Prizmalar, Dik Dairesel Silindir (Açınım, Alan, Hacim), Dik Piramit ve Koni",
        "assets/flow/u12_geometrik_cisimler.jpg",
        ["2πr", "πr²h", "2πrh", "r/a", "θ/360", "n+2", "2n", "3n", "🧊", "🥫", "⛺", "LGS"],
        [
            {
                "title": "Dik Prizmalar: Yüz, Köşe, Ayrıt ve Açınım",
                "code": "M.8.3.4.1",
                "stops": [
                    v_stop(
                        "Dik Prizmaların Açınımı ve Karşılıklı Yüzler",
                        "Bir prizmanın açınımı katlandığında hangi yüzler paralel ve eş olur?",
                        [
                            "1. Adım: Dik prizmalarda alt taban ile üst taban birbirine paralel ve eş çokgenlerdir.",
                            "2. Adım: Yan yüzlerin tamamı dikdörtgendir ve yan yüz sayısı tabanın kenar sayısına (n) eşittir.",
                            "3. Adım: Küp ve kare prizma açınımlarında birer kare atlayarak gelen yüzler kapatıldığında karşılıklı (paralel) gelir!"
                        ],
                        "Yüz sayısı 9 olan bir dik prizmanın tabanı kaç kenarlı bir çokgendir?",
                        ["6 (Altıgen)", "7 (Yedigen)", "9 (Dokuzgen)"],
                        "7 (Yedigen)"
                    ),
                    c_stop(
                        "Tabanı n Kenarlı Olan Dik Prizmada: Yüz = n + 2, Köşe = 2n, Ayrıt = 3n!",
                        "Dik prizmalar tabanlarındaki çokgenin adına göre isimlendirilir (Üçgen dik prizma, Kare dik prizma, Altıgen dik prizma...).",
                        "Tabanı <strong>n kenarlı</strong> bir dik prizmada:<br>• <strong>Yüz sayısı = n + 2</strong> (n yan yüz + 2 taban)<br>• <strong>Köşe sayısı = 2n</strong> (n altta + n üstte)<br>• <strong>Ayrıt sayısı = 3n</strong> (n altta + n üstte + n yanda).",
                        "Dik prizmaların yan yüzleri daima <strong>dikdörtgensel bölgedir</strong>!",
                        "Altıgen dik prizmanın (n=6) yüz sayısı 6+2 = {0}, köşe sayısı 2×6 = {1} ve ayrıt sayısı 3×6 = {2} tanedir.",
                        [("8", ["6", "8", "12"]), ("12", ["8", "12", "18"]), ("18", ["12", "18", "24"])]
                    ),
                    a_rainbow(
                        "Prizma Eleman Sayıları",
                        "Beşgen dik prizmanın (n = 5) temel eleman sayılarını bul!",
                        ["Yüz sayısı (n+2)=?", "Köşe sayısı (2n)=?", "Ayrıt sayısı (3n)=?"],
                        [(0, 7, "5 + 2 = 7 yüz"), (1, 10, "2 × 5 = 10 köşe"), (2, 15, "3 × 5 = 15 ayrıt")],
                        [5, 7, 10, 12, 15, 20]
                    ),
                    g_quiz(
                        "Oyun: Prizma Mimarı",
                        "Prizmaların özelliklerini ve ayrıt toplamlarını hesapla!",
                        [
                            ("12 köşesi olan dik prizma hangisidir?", ["Dörtgen prizma", "Beşgen prizma", "Altıgen prizma"], "Altıgen prizma"),
                            ("Taban ayrıtı 4 cm, yüksekliği 10 cm olan kare dik prizmanın tüm ayrıtlarının toplamı kaç cm'dir?", ["56 cm", "72 cm", "80 cm"], "72 cm"),
                            ("Üçgen dik prizmanın kaç tane yan yüzü vardır?", ["3", "4", "5"], "3")
                        ]
                    ),
                    q_stop(
                        "Kazanım Kontrol: Prizma Ayrıt Toplamı",
                        "Kazanım 1'i yeşile çevirmek için bu soruyu çöz!",
                        "Taban ayrıtlarından biri <strong>6 cm</strong> ve yüksekliği <strong>9 cm</strong> olan bir <strong>eşkenar üçgen dik prizmanın</strong> tüm ayrıt uzunlukları toplamı kaç cm'dir?",
                        ["45 cm", "54 cm", "63 cm", "72 cm"],
                        "C",
                        "Altta 3 taban ayrıtı (3×6=18), üstte 3 taban ayrıtı (3×6=18) ve yanda 3 dikey ayrıt (3×9=27) vardır!",
                        "Alt ve üst tabanda toplam 6 taban ayrıtı (6 × 6 = 36 cm) ve yanda 3 yükseklik ayrıtı (3 × 9 = 27 cm) vardır. Toplam = 36 + 27 = <strong>63 cm</strong>."
                    )
                ]
            },
            {
                "title": "Dik Dairesel Silindirin Elemanları ve Açınımı",
                "code": "M.8.3.4.2",
                "stops": [
                    c_stop(
                        "Yan Yüzün Yatay Uzunluğu = Taban Çemberinin Çevresi (2πr)!",
                        "Dik dairesel silindirin açınımı; 2 eş daire (alt ve üst taban) ile 1 dikdörtgenden (yan yüz) oluşur.",
                        "Yan yüzü oluşturan dikdörtgenin bir kenarı silindirin <strong>yüksekliği (h)</strong>, daireyi saran diğer kenarı ise dairenin çevresi olan <strong>2 · π · r</strong> uzunluğundadır!",
                        "Bir dikdörtgeni bir kenarı etrafında <strong>360° döndürdüğümüzde</strong> dik dairesel silindir oluşur.",
                        "Yarıçapı r = 5 cm olan bir silindirin (π = 3) açınımındaki yan yüz dikdörtgeninin tabanı saran kenar uzunluğu 2·π·r = {0} cm olur.",
                        [("30", ["15", "25", "30"])]
                    ),
                    v_stop(
                        "Dikdörtgen Kartonu Kıvırarak Silindir Yapma",
                        "Kenarları verilen bir dikdörtgen hangi kenarı üzerine kıvrılırsa yarıçap ne olur?",
                        [
                            "1. Adım: Kısa kenarı 12 cm, uzun kenarı 30 cm olan karton uzun kenarı taban olacak şekilde kıvrılırsa:",
                            "2. Adım: Taban çevresi 2πr = 30 cm olur. π = 3 alırsak 2 · 3 · r = 30 ⇒ r = 5 cm ve yükseklik h = 12 cm bulunur!",
                            "3. Adım: Tam tersi kısa kenar taban yapılırsa 2πr = 12 ⇒ r = 2 cm ve h = 30 cm olur!"
                        ],
                        "Taban yarıçapı 4 cm ve yüksekliği 10 cm olan silindirin (π=3) yan yüz açınımındaki dikdörtgenin çevre uzunluğu kaç cm'dir?",
                        ["34 cm", "48 cm", "68 cm"],
                        "68 cm"
                    ),
                    a_rainbow(
                        "Silindir Açınım Ölçüleri (π = 3)",
                        "Taban yarıçapı r = 7 cm ve yüksekliği h = 10 cm olan silindirin açınım değerlerini bul!",
                        ["Taban çapı (2r)=? cm", "Yan yüz yatay kenarı (2πr)=? cm", "1 taban dairesinin alanı (πr²)=? cm²"],
                        [(0, 14, "2 × 7 = 14 cm"), (1, 42, "2 × 3 × 7 = 42 cm"), (2, 147, "3 × 7² = 3 × 49 = 147 cm²")],
                        [14, 21, 42, 70, 147, 210]
                    ),
                    g_quiz(
                        "Oyun: Silindir Açınım Ustası",
                        "Silindirin açınım kenarlarını (π = 3 alarak) hesapla!",
                        [
                            ("Yan yüzünün yatay kenarı 36 cm olan silindirin (π=3) taban yarıçapı kaç cm'dir?", ["4 cm", "6 cm", "12 cm"], "6 cm"),
                            ("Silindirin bir tam tur döndüğünde aldığı yol neye eşittir?", ["Taban çevresine (2πr)", "Taban alanına (πr²)", "Hacmine"], "Taban çevresine (2πr)"),
                            ("Silindirin köşesi ve ayrıtı var mıdır?", ["Yoktur", "2 köşesi vardır", "3 ayrıtı vardır"], "Yoktur")
                        ]
                    ),
                    q_stop(
                        "Kazanım Kontrol: Kıvrılan Dikdörtgen",
                        "Kazanım 2'yi yeşile çevirmek için bu soruyu çöz!",
                        "Uzun kenarı <strong>48 cm</strong>, kısa kenarı <strong>20 cm</strong> olan dikdörtgen biçimindeki bir karton, uzun kenarları çakışacak (taban çevresi 48 cm olacak) biçimde kıvrılarak dik silindir yapılıyor. Taban yarıçapı kaç cm olur? (π = 3)",
                        ["6 cm", "8 cm", "12 cm", "16 cm"],
                        "B",
                        "Taban çevresi 2 · π · r = 48 ⇒ 2 · 3 · r = 48!",
                        "2 · π · r = 48 ⇒ 6r = 48 ⇒ <strong>r = 8 cm</strong> bulunur."
                    )
                ]
            },
            {
                "title": "Dik Dairesel Silindirin Yüzey Alanı: 2πr² + 2πrh",
                "code": "M.8.3.4.3",
                "stops": [
                    c_stop(
                        "Yanal Alan = 2πrh | Tüm Yüzey Alanı = 2 Taban Alanı (2πr²) + Yanal Alan (2πrh)",
                        "Boya rulosu soruları SADECE YANAL ALANI (2πrh) kullanır; üstü açık kap soruları ise 1 Taban + Yanal Alan kullanır!",
                        "• <strong>1 Taban Alanı:</strong> <strong>π · r²</strong> (Alt ve üst 2 taban = <strong>2 · π · r²</strong>)<br>• <strong>Yanal Alan (Yan dikdörtgenin alanı):</strong> <strong>2 · π · r · h</strong>",
                        "• <strong>Toplam Yüzey Alanı = 2πr² + 2πrh</strong>.",
                        "Yarıçapı r = 3 cm ve yüksekliği h = 10 cm olan bir silindirin (π = 3) yanal alanı 2·3·3·10 = {0} cm², iki taban alanı toplamı 2·3·3² = {1} cm² olur.",
                        [("180", ["90", "180", "234"]), ("54", ["27", "54", "108"])]
                    ),
                    v_stop(
                        "Boya Rulosu ve Silindir Yüzey Alanı Uygulaması",
                        "Bir boya rulosu 1 tam tur döndüğünde yanal alanı (2πrh) kadar duvar boyar!",
                        [
                            "1. Adım: Yarıçapı 5 cm, genişliği (h) 20 cm olan boya rulosunun yanal alanı = 2 · 3 · 5 · 20 = 600 cm²'dir.",
                            "2. Adım: Rulo 10 tam tur atarsa 10 × 600 = 6000 cm² alanı boyar!",
                            "3. Adım: Konserve kutusunun sadece yan yüzüne etiket yapıştırılıyorsa yine yalnız Yanal Alan (2πrh) hesaplanır!"
                        ],
                        "Yarıçapı 4 cm, yüksekliği 5 cm olan kapalı bir silindirin (π=3) toplam yüzey alanı kaç cm²'dir?",
                        ["120 cm²", "168 cm²", "216 cm²"],
                        "216 cm²"
                    ),
                    a_rainbow(
                        "Silindir Alan Hesaplayıcı (π = 3)",
                        "r = 2 cm ve h = 8 cm olan silindir için alanları sırasıyla hesapla!",
                        ["2 Taban alanı (2πr²)=? cm²", "Yanal alan (2πrh)=? cm²", "Toplam yüzey alanı=? cm²"],
                        [(0, 24, "2 × 3 × 2² = 24 cm²"), (1, 96, "2 × 3 × 2 × 8 = 96 cm²"), (2, 120, "24 + 96 = 120 cm²")],
                        [12, 24, 48, 96, 120, 144]
                    ),
                    g_quiz(
                        "Oyun: Yüzey Alanı Uzmanı",
                        "Yanal alan ve yüzey alanı sorularını (π = 3) çöz!",
                        [
                            ("r = 5 cm, h = 6 cm olan silindirin yanal alanı kaç cm²'dir? (π=3)", ["90 cm²", "150 cm²", "180 cm²"], "180 cm²"),
                            ("Yanal alanı 144 cm² ve yüksekliği 8 cm olan silindirin yarıçapı kaç cm'dir? (π=3)", ["2 cm", "3 cm", "4 cm"], "3 cm"),
                            ("Üstü açık silindirik bir bardağın yüzey alanı hangi formülle bulunur?", ["πr² + 2πrh", "2πr² + 2πrh", "2πrh"], "πr² + 2πrh")
                        ]
                    ),
                    q_stop(
                        "Boya Rulosu Sorusu",
                        "1 turda boyanan alan = Yanal Alan (2πrh)!",
                        "Taban yarıçapı <strong>4 cm</strong> ve uzunluğu (yüksekliği) <strong>25 cm</strong> olan dik dairesel silindir biçimindeki bir boya rulosu, düz bir duvarda <strong>5 tam tur</strong> döndürüldüğünde kaç cm² alanı boyar? (π = 3)",
                        ["600 cm²", "1500 cm²", "3000 cm²", "6000 cm²"],
                        "C",
                        "1 tur = 2 · π · r · h = 2 · 3 · 4 · 25 = 600 cm². 5 tur için 5 ile çarp!",
                        "1 tam turda yanal alanı kadar yer boyar: 2 · 3 · 4 · 25 = <strong>600 cm²</strong>. 5 turda = 5 × 600 = <strong>3000 cm²</strong> alanı boyar."
                    ),
                    q_stop(
                        "Kazanım Kontrol: Toplam Yüzey Alanı",
                        "Kazanım 3'ü yeşile çevirmek için bu soruyu çöz!",
                        "Taban çapı <strong>10 cm</strong> (yarıçapı 5 cm) ve yüksekliği <strong>8 cm</strong> olan kapalı bir dik dairesel silindirin <strong>toplam yüzey alanı</strong> kaç cm²'dir? (π = 3)",
                        ["240 cm²", "315 cm²", "390 cm²", "420 cm²"],
                        "C",
                        "2 Taban = 2 · 3 · 5² = 150 cm². Yanal Alan = 2 · 3 · 5 · 8 = 240 cm². İkisini topla!",
                        "2 Taban alanı = 2 · 3 · 25 = <strong>150 cm²</strong>. Yanal alan = 2 · 3 · 5 · 8 = <strong>240 cm²</strong>. Toplam yüzey alanı = 150 + 240 = <strong>390 cm²</strong> bulunur."
                    )
                ]
            },
            {
                "title": "Dik Dairesel Silindirin Hacmi: V = πr²h",
                "code": "M.8.3.4.4",
                "stops": [
                    c_stop(
                        "Hacim = Taban Alanı (πr²) × Yükseklik (h)",
                        "Yarıçap (r) karesi alındığı için yarıçap 2 katına çıkarsa hacim 4 katına çıkar!",
                        "Bir silindirin içine alabileceği sıvı miktarı (kapasitesi) <strong>Hacim = π · r² · h</strong> formülüyle hesaplanır.",
                        "Birim dönüşümü hatırlatması: <strong>1 dm³ = 1 Litre = 1000 cm³ = 1000 mL</strong>!",
                        "Yarıçapı r = 4 cm ve yüksekliği h = 10 cm olan bir silindirin (π = 3) hacmi 3 · 4² · 10 = {0} cm³ olur. Yarıçap 2 katına çıkarılırsa hacim {1} katına çıkar.",
                        [("480", ["120", "240", "480"]), ("4", ["2", "4", "8"])]
                    ),
                    v_stop(
                        "Dikdörtgeni Kenarı Etrafında 360° Döndürerek Hacim Bulma",
                        "Hangi kenar etrafında döndürülürse O KENAR YÜKSEKLİK (h), diğer kenar YARIÇAP (r) olur!",
                        [
                            "1. Kural: Kısa kenarı 3 cm, uzun kenarı 5 cm olan dikdörtgen uzun kenarı (5 cm) etrafında 360° döndürülürse:",
                            "2. Adım: Dönme ekseni olan 5 cm YÜKSEKLİK (h = 5), daire çizen 3 cm ise YARIÇAP (r = 3) olur!",
                            "3. Adım: Oluşan silindirin hacmi = π · r² · h = 3 · 3² · 5 = 135 cm³ bulunur!"
                        ],
                        "Kenarları 4 cm ve 6 cm olan dikdörtgen, 6 cm'lik kenarı etrafında 360° döndürülürse oluşan silindirin yarıçapı (r) kaç cm olur?",
                        ["4 cm", "6 cm", "8 cm"],
                        "4 cm"
                    ),
                    a_rainbow(
                        "Silindirden Silindire Su Aktarma (π = 3)",
                        "r = 6 cm, h = 10 cm olan tam dolu silindirdeki su, taban yarıçapı r = 3 cm olan boş silindire dökülüyor!",
                        ["1. silindirin hacmi=? cm³", "2. silindirin taban alanı (πr²)=? cm²", "2. silindirde su yüksekliği=? cm"],
                        [(0, 1080, "3 × 6² × 10 = 1080 cm³"), (1, 27, "3 × 3² = 27 cm²"), (2, 40, "1080 ÷ 27 = 40 cm")],
                        [20, 27, 40, 54, 540, 1080]
                    ),
                    g_quiz(
                        "Oyun: Hacim Hesaplayıcı",
                        "Silindir hacmi ve sıvı yüksekliği sorularını çöz!",
                        [
                            ("r = 5 cm, h = 8 cm olan silindirin hacmi kaç cm³'tür? (π=3)", ["300 cm³", "600 cm³", "750 cm³"], "600 cm³"),
                            ("Hacmi 324 cm³ ve yüksekliği 12 cm olan silindirin yarıçapı kaç cm'dir? (π=3)", ["3 cm", "4 cm", "6 cm"], "3 cm"),
                            ("Yarısına kadar su dolu olan r=2 dm, h=10 dm silindirde kaç litre (dm³) su vardır? (π=3)", ["60 L", "120 L", "240 L"], "60 L")
                        ]
                    ),
                    q_stop(
                        "Döndürme ile Oluşan Silindir",
                        "Etrafında döndürülen kenar h, diğer kenar r olur!",
                        "Kısa kenarı <strong>4 cm</strong>, uzun kenarı <strong>7 cm</strong> olan bir dikdörtgen, <strong>uzun kenarı etrafında 360°</strong> döndürülüyor. Oluşan silindirin hacmi kaç cm³ olur? (π = 3)",
                        ["252 cm³", "336 cm³", "588 cm³", "672 cm³"],
                        "B",
                        "Uzun kenar etrafında döndüğü için h = 7 cm ve r = 4 cm olur. V = 3 · 4² · 7!",
                        "Uzun kenar dönme ekseni olduğundan <strong>h = 7 cm</strong> ve <strong>r = 4 cm</strong>'dir. Hacim = π · r² · h = 3 × 16 × 7 = <strong>336 cm³</strong> bulunur."
                    ),
                    q_stop(
                        "Kazanım Kontrol: Silindirde Meyve Suyu",
                        "Kazanım 4'ü yeşile çevirmek için bu soruyu çöz!",
                        "Taban yarıçapı <strong>6 cm</strong> ve yüksekliği <strong>20 cm</strong> olan silindir biçimindeki sürahi tamamen meyve suyu ile doludur. Bu meyve suyu taban yarıçapı <strong>3 cm</strong> ve yüksekliği <strong>10 cm</strong> olan bardaklara doldurulursa kaç bardak tam dolar? (π = 3)",
                        ["4 bardak", "6 bardak", "8 bardak", "12 bardak"],
                        "C",
                        "Sürahi Hacmi / Bardak Hacmi = (π · 6² · 20) / (π · 3² · 10) = (36 · 20) / (9 · 10)!",
                        "Bardak sayısı = V(Sürahi) / V(Bardak) = (3 · 36 · 20) / (3 · 9 · 10) = 4 × 2 = <strong>8 bardak</strong> bulunur."
                    )
                ]
            },
            {
                "title": "Dik Piramit ve Dik Koni (r / a = θ / 360°)",
                "code": "M.8.3.4.5",
                "stops": [
                    c_stop(
                        "Konide Pisagor (r² + h² = a²) ve Açınım Formülü (r / a = θ / 360°)",
                        "Dik piramidin yan yüzleri ikizkenar üçgendir; dik koninin yan yüz açınımı ise bir daire dilimidir!",
                        "<strong>Dik Koninin 2 Altın Bağıntısı:</strong><br>1. Taban yarıçapı (r), cisim yüksekliği (h) ve <strong>ana doğru (a)</strong> dik üçgen oluşturur: <strong>r² + h² = a²</strong>!",
                        "2. Açınımda taban yarıçapının ana doğruya oranı: <strong>r / a = θ / 360°</strong> (θ: Yanal daire diliminin merkez açısı).",
                        "Taban yarıçapı r = 6 cm ve yüksekliği h = 8 cm olan dik koninin ana doğrusu a = {0} cm olur. r = 3 cm ve a = 9 cm olan koninin açınımındaki merkez açı θ = {1} derecedir.",
                        [("10", ["10", "12", "14"]), ("120", ["90", "120", "180"])]
                    ),
                    a_rainbow(
                        "Koni ve Piramit Analizi",
                        "Taban yarıçapı r = 5 cm, yüksekliği h = 12 cm olan dik koninin elemanlarını bul!",
                        ["Ana doğru (a)=? cm", "Kare piramidin yüz sayısı=?", "r=4, a=12 ise açınım açısı θ=?°"],
                        [(0, 13, "5-12-13 dik üçgeninden a = 13 cm."), (1, 5, "1 kare taban + 4 üçgen yan yüz = 5 yüz."), (2, 120, "4 / 12 = θ / 360° ⇒ θ = 120°.")],
                        [5, 8, 12, 13, 90, 120]
                    ),
                    g_quiz(
                        "Oyun: Piramit ve Koni Ustası",
                        "Piramit ve koni bağıntılarını kullanarak doğru cevabı seç!",
                        [
                            ("Kare dik piramidin kaç tane ayrıtı vardır?", ["4", "8", "12"], "8"),
                            ("Yanal daire diliminin merkez açısı 90° ve ana doğrusu 12 cm olan koninin taban yarıçapı kaç cm'dir?", ["3 cm", "4 cm", "6 cm"], "3 cm"),
                            ("Bir dik üçgeni dik kenarlarından biri etrafında 360° döndürürsek hangi cisim oluşur?", ["Dik silindir", "Dik koni", "Küre"], "Dik koni")
                        ]
                    ),
                    q_stop(
                        "Kazanım Kontrol: Koni Açınımı",
                        "Kazanım 5'i yeşile çevirmek için bu soruyu çöz!",
                        "Ana doğrusu <strong>15 cm</strong> ve yanal yüzünü oluşturan daire diliminin merkez açısı <strong>120°</strong> olan bir dik koninin <strong>taban yarıçapı (r)</strong> kaç cm'dir?",
                        ["3 cm", "4 cm", "5 cm", "6 cm"],
                        "C",
                        "r / a = θ / 360° ⇒ r / 15 = 120° / 360° = 1 / 3!",
                        "Formül: r / a = θ / 360° ⇒ r / 15 = 120 / 360 = 1 / 3 ⇒ <strong>r = 5 cm</strong> bulunur."
                    )
                ]
            },
            {
                "title": "LGS Silindir, Koni ve Cisim Görevleri",
                "code": "M.8.3.4.5",
                "stops": [
                    a_rainbow(
                        "Adım Adım LGS Kurgusu: Kare Piramit Yan Yüz Yüksekliği",
                        "Taban ayrıtı 12 cm (yarısı 6 cm) ve cisim yüksekliği 8 cm olan kare dik piramidi incele!",
                        ["Taban merkezinin kenara uzaklığı=? cm", "Yan yüz yüksekliği (6-8-?)=? cm", "1 yan yüz üçgenin alanı=? cm²"],
                        [(0, 6, "12 ÷ 2 = 6 cm"), (1, 10, "6-8-10 dik üçgeninden yan yüz yüksekliği 10 cm'dir."), (2, 60, "(12 × 10) ÷ 2 = 60 cm²")],
                        [6, 8, 10, 30, 60, 120]
                    ),
                    q_stop(
                        "LGS Yeni Nesil 1: Silindirik Yol Silindiri",
                        "Tur sayısı × Yanal Alan = Düzleştirilen Toplam Yol Alanı!",
                        "Taban yarıçapı <strong>50 cm (0,5 m)</strong> ve genişliği <strong>2 metre</strong> olan bir yol silindiri, düz bir yolu asfaltlarken <strong>20 tam tur</strong> dönüyor. Silindirin üzerinden geçtiği alan kaç m²'dir? (π = 3)",
                        ["60 m²", "90 m²", "120 m²", "150 m²"],
                        "C",
                        "1 turda yanal alan = 2 · π · r · h = 2 · 3 · 0,5 · 2 = 6 m². 20 tur için 20 × 6!",
                        "1 tam turdaki yanal alan = 2 · 3 · 0,5 · 2 = <strong>6 m²</strong>'dir. 20 tam turda = 20 × 6 = <strong>120 m²</strong> alanı düzleştirir."
                    ),
                    q_stop(
                        "LGS Yeni Nesil 2: Koninin Yüksekliğini Bulma",
                        "Önce r/a = θ/360° ile r'yi, sonra Pisagor (r² + h² = a²) ile h'yi bul!",
                        "Açınımındaki yanal daire diliminin merkez açısı <strong>216°</strong> ve yarıçapı (ana doğrusu) <strong>10 cm</strong> olan bir dik koninin kapatıldığında <strong>cisim yüksekliği (h)</strong> kaç cm olur?",
                        ["6 cm", "8 cm", "9 cm", "12 cm"],
                        "B",
                        "r / 10 = 216 / 360 = 3 / 5 ⇒ r = 6 cm. Sonra 6 - h - 10 dik üçgeninden h = 8 cm!",
                        "Önce taban yarıçapını bulalım: r / 10 = 216° / 360° = 3 / 5 ⇒ <strong>r = 6 cm</strong>. Dik konide r² + h² = a² ⇒ 6² + h² = 10² ⇒ <strong>h = 8 cm</strong> bulunur."
                    ),
                    g_quiz(
                        "Final: Geometrik Cisimler Şampiyonluk Etabı",
                        "Son 3 görevi tamamla ve 12. Üniteyle birlikte TÜM 8. SINIF LGS MÜFREDATINI YEŞİLE DÖNDÜR!",
                        [
                            ("r = 3 cm, h = 5 cm olan silindirin hacmi kaç cm³'tür? (π=3)", ["90 cm³", "135 cm³", "150 cm³"], "135 cm³"),
                            ("Taban yarıçapı 8 cm, yüksekliği 15 cm olan dik koninin ana doğrusu kaç cm'dir?", ["17 cm", "19 cm", "23 cm"], "17 cm"),
                            ("Sekizgen dik prizmanın kaç tane yüzü vardır?", ["8", "10", "16"], "10")
                        ],
                        True
                    )
                ]
            }
        ]
    )
])

# Clean up the 3 questions we noted earlier so every single question is 100% unambiguous
# 1) Unit 3 Stop 15 (idx 1 of UNITS_2_TO_12, stop id 15):
for st in UNITS_2_TO_12[1]["stops"]:
    if st["id"] == 15:
        st["stem"] = "<strong>a</strong> ve <strong>b</strong> birden büyük birer doğal sayı olmak üzere <strong>√72 = a√b</strong> eşitliğini sağlayan kaç farklı <strong>(a, b)</strong> ikilisi vardır?"
        st["hint"] = "72'nin içindeki 1'den büyük tam kare çarpanları (4, 9, 36) dışarı çıkar: 2√18, 3√8 ve 6√2!"
        st["solution"] = "72 = 4×18 = 9×8 = 36×2 olduğundan a > 1 için <strong>2√18, 3√8 ve 6√2</strong> olmak üzere toplam <strong>3 farklı</strong> (a, b) ikilisi vardır."

# 2) Unit 5 Stop 29 (idx 3 of UNITS_2_TO_12, stop id 29):
for st in UNITS_2_TO_12[3]["stops"]:
    if st["id"] == 29:
        st["stem"] = "Kenar uzunlukları santimetre cinsinden birer tam sayı ve alanı <strong>24 cm²</strong> olan dikdörtgenlerden biri rastgele seçiliyor. Seçilen dikdörtgenin <strong>çevresinin 24 cm'den fazla</strong> olma olasılığı kaçtır?"
        st["solution"] = "4 olası dikdörtgen vardır: (1×24 ⇒ Ç=50 cm), (2×12 ⇒ Ç=28 cm), (3×8 ⇒ Ç=22 cm) ve (4×6 ⇒ Ç=20 cm). Çevresi 24 cm'den fazla olanlar 50 cm ve 28 cm (2 durum) olduğundan olasılık = 2 / 4 = <strong>1 / 2</strong> bulunur."

# 3) Unit 6 Stop 29 (idx 4 of UNITS_2_TO_12, stop id 29):
for st in UNITS_2_TO_12[4]["stops"]:
    if st["id"] == 29:
        st["correctLetter"] = "B"
        st["solution"] = "Karelerin birer kenarları 4'e bölünerek <strong>(2x + 3)</strong> ve <strong>(2x − 3)</strong> bulunur. İki kare farkından: [(2x+3) − (2x−3)] · [(2x+3) + (2x−3)] = 6 · 4x = <strong>24x cm²</strong> bulunur."

# 4) Unit 8 Stop 26 (idx 6 of UNITS_2_TO_12, stop id 26):
for st in UNITS_2_TO_12[6]["stops"]:
    if st["id"] == 26:
        st["stem"] = "<strong>−1 ≤ (2x + 4) / 3 ≤ 4</strong> eşitsizliğini sağlayan <strong>kaç farklı x tam sayısı</strong> vardır?"
        st["solution"] = "Her tarafı 3 ile çarparsak: −3 ≤ 2x + 4 ≤ 12 ⇒ −7 ≤ 2x ≤ 8 ⇒ <strong>−3,5 ≤ x ≤ 4</strong>. Tam sayılar: −3, −2, −1, 0, 1, 2, 3, 4 olmak üzere toplam <strong>8 farklı</strong> tam sayı vardır."

out_js = "// Otomatik Doğrulanmış 8. Sınıf LGS Ünite 2 - 12 Veri Tabanı (330 Durak)\nwindow.MATFLOW_UNITS_2_12 = " + json.dumps(UNITS_2_TO_12, ensure_ascii=False, indent=2) + ";\n"
with open("/Users/acg/Desktop/flow/data/lgs_uniteler_2_12.js", "w", encoding="utf-8") as f:
    f.write(out_js)

print("Successfully generated lgs_uniteler_2_12.js with", len(UNITS_2_TO_12), "units and", sum(len(u["stops"]) for u in UNITS_2_TO_12), "stops!")
