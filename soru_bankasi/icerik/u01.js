"use strict";

/**
 * Ünite 1 çekirdeği.
 * Altın kartlar Metaword "Altın Bilgiler" ve Soru Hazinesi "Ne işe yarar" sayfasından
 * damıtıldı. Çözümlü soruların cevapları yeniden hesaplandı.
 * Sayfa kabukları ayikla.js ile gelir; buradaki çözümler o sayfalara işlenir.
 */

const altin = [
  {
    id: "ab-u01-k01-01",
    sira: 1,
    kazanimId: "k01",
    baslik: "Çarpan, bölen demektir",
    metin: "Bir doğal sayıyı kalansız bölen pozitif tam sayılar, o sayının çarpanıdır. Çarpan ile bölen aynı anlamdadır. Kalan 0 değilse o sayı çarpan değildir.",
    ornek: "24 ÷ 6 = 4 ve kalan 0 olduğu için 6, 24'ün çarpanıdır. 24 ÷ 5 = 4 kalan 4 olduğu için 5, 24'ün çarpanı değildir.",
    yanlis: [
      { kod: "kalanli", uyari: "Bölme yapılmış olması yetmez. Kalan 0 değilse çarpan sayma." }
    ],
    kaynak: [{ kod: "mw", sayfa: 9, yer: "Altın Bilgiler" }]
  },
  {
    id: "ab-u01-k01-02",
    sira: 2,
    kazanimId: "k01",
    baslik: "En küçük çarpan 1, en büyük kendisidir",
    metin: "Her pozitif tam sayının en küçük pozitif çarpanı 1, en büyük çarpanı kendisidir. 'Kendisi dışında' denince kendisi toplama veya listeye katılmaz.",
    ornek: "28'in pozitif çarpanları 1, 2, 4, 7, 14 ve 28'dir. Kendisi dışında kalanların toplamı 1+2+4+7+14 = 28 eder.",
    yanlis: [
      { kod: "kendini-katma", uyari: "'Kendisi dışında' ifadesi varsa sayının kendisini toplama ekleme." },
      { kod: "biri-unuttum", uyari: "Listede 1 yoksa liste eksiktir. Her sayının çarpanı 1'dir." }
    ],
    kaynak: [{ kod: "mw", sayfa: 9, yer: "Altın Bilgiler" }]
  },
  {
    id: "ab-u01-k01-03",
    sira: 3,
    kazanimId: "k01",
    baslik: "Çarpan ile kat birbirinin tersidir",
    metin: "a, b'nin çarpanı ise b, a'nın katıdır. Biri söylenince diğeri de söylenmiş olur.",
    ornek: "4, 24'ün çarpanıdır. O halde 24, 4'ün katıdır.",
    yanlis: [
      { kod: "ters-kurma", uyari: "Çarpan ile katı yer değiştirme. Bölen çarpandır; bölümün büyüğü kattır." }
    ],
    kaynak: [{ kod: "mw", sayfa: 9, yer: "Altın Bilgiler" }]
  },
  {
    id: "ab-u01-k01-04",
    sira: 4,
    kazanimId: "k01",
    baslik: "Çarpanlar çift çift bulunur",
    metin: "Çarpanlar, çarpımları sayıya eşit olan ikililer halinde aranır. Küçükten büyüğe yaz, ikililer ortadan buluşunca dur. Dikdörtgende bu ikililer kenar uzunluğudur. Çevre, kenarların toplamının iki katıdır.",
    ornek: "45 = 1×45 = 3×15 = 5×9. Çarpanlar 1, 3, 5, 9, 15, 45. Alanı 20 olan tam kenarlı dikdörtgenler 1×20, 2×10 ve 4×5'tir. Çevreleri 42, 24 ve 18'dir. 36 bu listede yoktur.",
    yanlis: [
      { kod: "ikili-kacirma", uyari: "Ortadaki ikiliyi atlama. 36'da 1×36, 2×18, 3×12, 4×9 biter; 6 da var çünkü 6×6." },
      { kod: "olabilir-sannma", uyari: "'Olamaz' diyen soruda mümkün çevreleri yaz, seçeneklerde olmayanı işaretle." }
    ],
    kaynak: [{ kod: "mw", sayfa: 9, yer: "Altın Bilgiler" }, { kod: "mw", sayfa: 11, yer: "Pekiştiren" }]
  },
  {
    id: "ab-u01-k01-05",
    sira: 5,
    kazanimId: "k01",
    baslik: "Tam karenin bölen sayısı tektir",
    metin: "Tam kare sayıların pozitif bölen sayısı tektir. Tam kare olmayanların bölen sayısı çifttir. 1'den n'e kadar lambalar, kapılar veya günler açılıp kapanıyorsa sonda açık kalanlar tam kare numaralardır.",
    ornek: "16'nın bölenleri 1, 2, 4, 8, 16 olmak üzere 5 tanedir. 10'un bölenleri 1, 2, 5, 10 olmak üzere 4 tanedir. 1'den 10'a kadar lambada açık kalanlar 1, 4 ve 9 numaradır: 3 lamba.",
    yanlis: [
      { kod: "cift-sanma", uyari: "Tam karede ortadaki bölen bir kez yazılır. 4 hem 2×2'dir hem tek bir çarpandır; onu iki kez sayma, bölen listesinde bir kez durur." }
    ],
    kaynak: [{ kod: "mw", sayfa: 10, yer: "Altın Bilgiler" }, { kod: "sh", sayfa: 8, yer: "Ne işe yarar" }]
  },
  {
    id: "ab-u01-k01-06",
    sira: 6,
    kazanimId: "k01",
    baslik: "Asalın 2, karesinin 3 böleni vardır",
    metin: "Asal sayının tam 2 pozitif çarpanı vardır: 1 ve kendisi. Bir asal sayının karesinin tam 3 pozitif çarpanı vardır: 1, asalın kendisi ve karesi.",
    ornek: "7 asaldır, çarpanları 1 ve 7. 49 = 7² çarpanları 1, 7 ve 49.",
    yanlis: [
      { kod: "biri-asal-sanma", uyari: "1'in tek çarpanı vardır. Asal olmak için tam iki çarpan gerekir. 1 asal değildir." }
    ],
    kaynak: [{ kod: "mw", sayfa: 10, yer: "Altın Bilgiler" }]
  },
  {
    id: "ab-u01-k01-07",
    sira: 7,
    kazanimId: "k01",
    baslik: "Bölen sayısı üslerden gelir",
    metin: "Sayı asal çarpanlarına ayrılıp p^a · q^b · r^c biçiminde yazılırsa pozitif bölen sayısı (a+1)(b+1)(c+1) eder. Üsse 1 eklenir, sonuçlar çarpılır.",
    ornek: "12 = 2² · 3¹. Bölen sayısı (2+1)(1+1) = 6. Bölenler: 1, 2, 3, 4, 6, 12.",
    yanlis: [
      { kod: "ussu-carpan", uyari: "Üssü doğrudan çarpma. Önce her üsse 1 ekle, sonra çarp." },
      { kod: "ayirmadan-sayma", uyari: "Formülden önce sayıyı asal çarpanlarına ayır. 12'yi 4×3 diye bırakırsan üsler yanlış kalır; 4 asal değil." }
    ],
    kaynak: [{ kod: "sh", sayfa: 8, yer: "Ne işe yarar" }]
  },
  {
    id: "ab-u01-k02-01",
    sira: 1,
    kazanimId: "k02",
    baslik: "Asal: 1 ve kendisinden başka böleni yok",
    metin: "1'den büyük ve 1 ile kendisinden başka pozitif böleni olmayan sayılar asaldır. 1 asal değildir. En küçük asal 2'dir.",
    ornek: "2, 3, 5, 7, 11, 13, 17, 19 asaldır. 1, 9, 15, 21, 91 asal değildir.",
    yanlis: [
      { kod: "biri-asal", uyari: "1'i asal sayma." },
      { kod: "tek-olan-asal", uyari: "Her tek sayı asal değildir. 9, 15, 21, 25, 27, 91 tek olduğu halde asaldır denemez." }
    ],
    kaynak: [{ kod: "mw", sayfa: 13, yer: "Altın Bilgiler" }]
  },
  {
    id: "ab-u01-k02-02",
    sira: 2,
    kazanimId: "k02",
    baslik: "Çift asal yalnız 2'dir",
    metin: "2'den büyük her çift sayı 2'ye bölünür. Bu yüzden 2'den başka çift asal sayı yoktur.",
    ornek: "14, 26 ve 100 çift olduğu için asal değildir. 2 asaldır.",
    yanlis: [
      { kod: "ikiyi-cift-diye-ele", uyari: "2'yi çift diye eleyemezsin. Çift olup da asal olan tek sayı 2'dir." }
    ],
    kaynak: [{ kod: "mw", sayfa: 13, yer: "Altın Bilgiler" }]
  },
  {
    id: "ab-u01-k02-03",
    sira: 3,
    kazanimId: "k02",
    baslik: "Her sayı asal çarpanların çarpımıdır",
    metin: "1'den büyük her tam sayı, asal sayıların çarpımı olarak tek şekilde yazılır. Aynı asal tekrar ederse üs olarak yazılır.",
    ornek: "48 = 2 · 2 · 2 · 2 · 3 = 2⁴ · 3¹.",
    yanlis: [
      { kod: "bire-bolmeyi-unutma", uyari: "Algoritma 1 kalınca biter. 1'i asal çarpan gibi sağa yazma." }
    ],
    kaynak: [{ kod: "mw", sayfa: 13, yer: "Altın Bilgiler" }]
  },
  {
    id: "ab-u01-k02-04",
    sira: 4,
    kazanimId: "k02",
    baslik: "Algoritma küçük asaldan bölünür",
    metin: "Sayı, bölünebildiği en küçük asal ile bölünür. Bölüm alta yazılır, asal sağa yazılır. 1 kalınca sağdaki asallar çarpılır. Aynı asal kaç kez yazıldıysa üs o kadardır.",
    ornek: "180 = 2² · 3² · 5¹. Üsler 2, 2 ve 1 ise toplamları 5'tir.",
    yanlis: [
      { kod: "buyukten-bolme", uyari: "Bölmeye büyük asaldan başlama. Her zaman 2'den, o bölmezse 3'ten, sonra 5'ten ilerle." }
    ],
    kaynak: [{ kod: "mw", sayfa: 13, yer: "Altın Bilgiler" }]
  },
  {
    id: "ab-u01-k02-05",
    sira: 5,
    kazanimId: "k02",
    baslik: "Ağaç da aynı çarpımı verir",
    metin: "Asal çarpan ağacında sayı iki çarpana ayrılır. Asal olmayan her dal yine ayrılır. Uçtaki asallar çarpılınca sayı bulunur. Algoritma ile ağacın sonucu aynıdır.",
    ornek: "24 ağaçta 2×12, 12 ise 2×6, 6 ise 2×3. Uçlar 2, 2, 2, 3. 24 = 2³ · 3.",
    yanlis: [
      { kod: "dali-birakma", uyari: "Dalın ucu asal değilse durma. 4, 6, 8, 9, 10 gibi uçlar tekrar ayrılır." }
    ],
    kaynak: [{ kod: "mw", sayfa: 13, yer: "Altın Bilgiler" }]
  },
  {
    id: "ab-u01-k02-06",
    sira: 6,
    kazanimId: "k02",
    baslik: "121'den küçük sayıda 2, 3, 5, 7 yeter",
    metin: "1'den büyük ve 121'den küçük bir sayı 2, 3, 5 ve 7'ye bölünmüyorsa asaldır. Bölünüyorsa asal değildir. Kitaptaki '120'den küçük' ifadesi bu kuraldır; sınır 11² = 121 olduğu için 120'ye kadar güvenlidir.",
    ornek: "91, 120'den küçüktür ve 7'ye bölünür: 91 = 7×13. Asal değildir. 97 bu dört asala bölünmez, asaldır.",
    yanlis: [
      { kod: "yediye-bakmama", uyari: "2, 3 ve 5'e bakıp durma. 49, 77 ve 91 ancak 7 ile elenir." }
    ],
    kaynak: [{ kod: "sh", sayfa: 8, yer: "Ne işe yarar" }, { kod: "mw", sayfa: 13, yer: "Altın Bilgiler" }]
  },
  {
    id: "ab-u01-k03-01",
    sira: 1,
    kazanimId: "k03",
    baslik: "EBOB ortak bölenlerin en büyüğüdür",
    metin: "İki doğal sayıyı da bölen en büyük doğal sayı, bu sayıların EBOB'udur. Gösterim EBOB(a, b) şeklindedir.",
    ornek: "18'in bölenleri 1, 2, 3, 6, 9, 18. 24'ün bölenleri 1, 2, 3, 4, 6, 8, 12, 24. Ortaklar 1, 2, 3, 6. En büyüğü 6. EBOB(18, 24) = 6.",
    yanlis: [
      { kod: "ortak-kucugu", uyari: "Ortak bölenlerin en küçüğü her zaman 1'dir. EBOB en büyük ortak bölendir." }
    ],
    kaynak: [{ kod: "mw", sayfa: 17, yer: "Altın Bilgiler" }]
  },
  {
    id: "ab-u01-k03-02",
    sira: 2,
    kazanimId: "k03",
    baslik: "EBOB'ta ortak asalların küçük üssü alınır",
    metin: "İki sayı birlikte bölünür. Sağda yalnız ikisinin de bölündüğü asallar çarpılır. Üslü biçimde ortak asalların küçük kuvveti alınır. Ortak olmayan asal EBOB'a girmez.",
    ornek: "24 = 2³ · 3, 40 = 2³ · 5. Ortak asal 2, küçük üs 3. EBOB(24, 40) = 2³ = 8.",
    yanlis: [
      { kod: "tum-asallari-carma", uyari: "Sağdaki bütün asalları çarparsan EKOK bulursun. EBOB'ta yalnız ortak basamaklar kalır." }
    ],
    kaynak: [{ kod: "mw", sayfa: 17, yer: "Altın Bilgiler" }]
  },
  {
    id: "ab-u01-k03-03",
    sira: 3,
    kazanimId: "k03",
    baslik: "EBOB sayılardan büyük olamaz",
    metin: "EBOB her iki sayının da bölenidir. Bu yüzden sayılardan büyük olamaz. Biri diğerinin katıysa EBOB küçük olan sayıdır.",
    ornek: "36, 18'in katıdır. EBOB(18, 36) = 18.",
    yanlis: [
      { kod: "buyuk-olani-yazma", uyari: "Biri diğerinin katıysa büyük olanı EBOB yazma. Küçük olan EBOB'tur." }
    ],
    kaynak: [{ kod: "mw", sayfa: 18, yer: "Altın Bilgiler" }]
  },
  {
    id: "ab-u01-k03-04",
    sira: 4,
    kazanimId: "k03",
    baslik: "Ortak asal yoksa EBOB 1'dir",
    metin: "İki sayının ortak asal çarpanı yoksa EBOB 1'dir. Ardışık sayma sayılarının EBOB'u her zaman 1'dir.",
    ornek: "8 ve 9'un ortak asal çarpanı yoktur. EBOB(8, 9) = 1. EBOB(14, 15) = 1.",
    yanlis: [
      { kod: "sifir-yazma", uyari: "Ortak bölen yok diye 0 yazma. 1 her zaman ortaktır. Sonuç 1'dir." }
    ],
    kaynak: [{ kod: "mw", sayfa: 17, yer: "Altın Bilgiler" }, { kod: "mw", sayfa: 18, yer: "Altın Bilgiler" }]
  },
  {
    id: "ab-u01-k03-05",
    sira: 5,
    kazanimId: "k03",
    baslik: "Eşit paylaştırma ve eş parça EBOB'tur",
    metin: "İki miktar artmayacak ve karışmayacak şekilde eşit parçalara ayrılacaksa, parça olabildiğince büyükse EBOB kullanılır. Kapalı bir çevrede fidan veya direk köşelere de dikiliyorsa adet, çevrenin EBOB'a bölümüdür. Açık bir doğru parçasında başta ve sonda da nesne varsa aralık sayısına 1 eklenir.",
    ornek: "48 m ve 72 m kenarlı bahçede en geniş eşit aralık EBOB(48, 72) = 24 m'dir. Çevre 240 m olduğundan 240 ÷ 24 = 10 fidan gerekir. 60 L ve 72 L yağ, en büyük şişede EBOB(60, 72) = 12 L olur. Şişe sayısı 60/12 + 72/12 = 11.",
    yanlis: [
      { kod: "ekok-secme", uyari: "Parça ayırıp artmayacak diyorsa EKOK değil EBOB. EKOK bütünü birleştirir, EBOB parçalar." },
      { kod: "kapali-cevreye-bir-ekleme", uyari: "Bahçe veya karenin çevresinde köşe zaten bir kez sayılır. Çevre ÷ aralık yeter. +1, başı ve sonu ayrı olan düz yolda kullanılır." }
    ],
    kaynak: [{ kod: "mw", sayfa: 21, yer: "Altın Bilgiler" }, { kod: "sh", sayfa: 8, yer: "Ne işe yarar" }]
  },
  {
    id: "ab-u01-k03-06",
    sira: 6,
    kazanimId: "k03",
    baslik: "Ortak bölenler, EBOB'un bölenleridir",
    metin: "İki sayının bütün ortak bölenleri, EBOB'larının bölenleridir. Farklı şişe, farklı aralık veya farklı parça sayısı sorulursa EBOB'un pozitif bölenleri sayılır.",
    ornek: "EBOB 12 ise ortak bölenler 1, 2, 3, 4, 6 ve 12'dir. 6 farklı pozitif parça vardır.",
    yanlis: [
      { kod: "sadece-ebob", uyari: "'Kaç farklı' sorusunda yalnız EBOB'u yazma. EBOB'un bütün bölenlerini say." }
    ],
    kaynak: [{ kod: "mw", sayfa: 21, yer: "Altın Bilgiler" }]
  },
  {
    id: "ab-u01-k03-07",
    sira: 7,
    kazanimId: "k03",
    baslik: "İki sayıda EBOB çarpı EKOK, çarpıma eşittir",
    metin: "İki doğal sayı için EBOB(a, b) × EKOK(a, b) = a × b. Biri biliniyorsa diğeri çarpımdan bulunur. Bu eşitlik üç sayıya doğrudan uygulanmaz.",
    ornek: "EBOB(12, 18) = 6 ve EKOK(12, 18) = 36. 6 × 36 = 216 ve 12 × 18 = 216.",
    yanlis: [
      { kod: "uc-sayida-kullanma", uyari: "Bu çarpım kuralını üç sayıya birden uygulama. Kural iki sayı içindir." }
    ],
    kaynak: [{ kod: "mw", sayfa: 25, yer: "Altın Bilgiler" }]
  },
  {
    id: "ab-u01-k04-01",
    sira: 1,
    kazanimId: "k04",
    baslik: "EKOK ortak katların en küçüğüdür",
    metin: "İki doğal sayının da katı olan en küçük pozitif sayı EKOK'tur. Gösterim EKOK(a, b) şeklindedir.",
    ornek: "12'nin katları 12, 24, 36, 48… 18'in katları 18, 36, 54… İlk ortak kat 36'dır. EKOK(12, 18) = 36.",
    yanlis: [
      { kod: "buyuk-ortagi", uyari: "Ortak katların en büyüğü yoktur; katlar sonsuza gider. İstenen en küçük ortak kattır." }
    ],
    kaynak: [{ kod: "mw", sayfa: 25, yer: "Altın Bilgiler" }]
  },
  {
    id: "ab-u01-k04-02",
    sira: 2,
    kazanimId: "k04",
    baslik: "EKOK'ta sağdaki bütün asallar çarpılır",
    metin: "Ortak algoritmada sağa düşen bütün asallar EKOK için çarpılır. Üslü biçimde her asalın büyük kuvveti alınır. Yalnız bir sayıda olan asal da çarpıma girer.",
    ornek: "18 = 2 · 3² ve 30 = 2 · 3 · 5. Büyük üsler: 2¹, 3², 5¹. EKOK(18, 30) = 2 · 9 · 5 = 90.",
    yanlis: [
      { kod: "ortak-ussu-kucuk", uyari: "Küçük üssü alırsan EBOB bulursun. EKOK'ta her asalın büyük üssü kalır." }
    ],
    kaynak: [{ kod: "mw", sayfa: 25, yer: "Altın Bilgiler" }]
  },
  {
    id: "ab-u01-k04-03",
    sira: 3,
    kazanimId: "k04",
    baslik: "EKOK sayılardan küçük olamaz",
    metin: "EKOK her iki sayının katıdır. Bu yüzden sayılardan küçük olamaz. Biri diğerinin katıysa EKOK büyük olan sayıdır. Bu durumda küçük olan EBOB'tur.",
    ornek: "30, 15'in katıdır. EKOK(15, 30) = 30 ve EBOB(15, 30) = 15.",
    yanlis: [
      { kod: "kucugu-yazma", uyari: "Biri diğerinin katıysa EKOK küçük sayı değildir. Büyük sayı EKOK'tur." }
    ],
    kaynak: [{ kod: "mw", sayfa: 26, yer: "Altın Bilgiler" }]
  },
  {
    id: "ab-u01-k04-04",
    sira: 4,
    kazanimId: "k04",
    baslik: "Ortak asal yoksa EKOK çarpımdır",
    metin: "Ortak asal çarpanı olmayan sayıların EKOK'u, sayıların çarpımına eşittir. Ardışık sayıların EKOK'u da çarpımlarıdır.",
    ornek: "4 ve 7 aralarında asaldır. EKOK(4, 7) = 28. 100'den küçük en büyük ortak kat 84'tür.",
    yanlis: [
      { kod: "carpimi-ebob-sanma", uyari: "Çarpım EKOK'tur, EBOB değil. Ortak asal yoksa EBOB 1 kalır." }
    ],
    kaynak: [{ kod: "mw", sayfa: 25, yer: "Altın Bilgiler" }, { kod: "mw", sayfa: 26, yer: "Altın Bilgiler" }]
  },
  {
    id: "ab-u01-k04-05",
    sira: 5,
    kazanimId: "k04",
    baslik: "Buluşturma ve döşeme EKOK'tur",
    metin: "İki farklı tempo, tur, zil veya sefer aynı anda yeniden buluşacaksa EKOK kullanılır. İki farklı parça, boşluk kalmadan bir bütünü ilk kez dolduracaksa yine EKOK kullanılır. Kesirlerde payda eşitlemek de EKOK'tur.",
    ornek: "12 ve 15 dakikada bir kalkan seferler 60 dakikada bir birlikte kalkar. EKOK(12, 15) = 60. Saat 10.40 ise sonraki ortak sefer 11.40'tır.",
    yanlis: [
      { kod: "ebob-secme", uyari: "Birlikte yeniden başlama, en kısa bütün veya payda eşitleme EKOK'tur. Parçaya ayırma EBOB'tur." }
    ],
    kaynak: [{ kod: "mw", sayfa: 29, yer: "Altın Bilgiler" }, { kod: "sh", sayfa: 8, yer: "Ne işe yarar" }]
  },
  {
    id: "ab-u01-k04-06",
    sira: 6,
    kazanimId: "k04",
    baslik: "Başta ve sonda varsa aralığa 1 eklenir",
    metin: "Düz bir yolun başına ve sonuna da nesne dikiliyorsa nesne sayısı, yol uzunluğunun aralığa bölümünün 1 fazlasıdır. İki kenar varsa her kenar ayrı hesaplanır. Kapalı çevrede bu +1 yapılmaz.",
    ornek: "Bir kenara 15 m, diğer kenara 12 m aralıkla, başa ve sona da fidan dikilir. En kısa yol EKOK(15, 12) = 60 m. Bir kenar 60/15+1 = 5, diğer kenar 60/12+1 = 5. Toplam 10 fidan.",
    yanlis: [
      { kod: "arti-bir-unutma", uyari: "Baş ve son da dikiliyorsa bölüme 1 ekle. Yalnız aralık sayısını yazma." },
      { kod: "kapaliya-ekleme", uyari: "Bu +1 düz yol içindir. Bahçenin çevresine ekleme." }
    ],
    kaynak: [{ kod: "mw", sayfa: 29, yer: "Öğreten örnek" }, { kod: "sh", sayfa: 8, yer: "Ne işe yarar" }]
  },
  {
    id: "ab-u01-k05-01",
    sira: 1,
    kazanimId: "k05",
    baslik: "EBOB 1 ise aralarında asaldır",
    metin: "1'den başka ortak pozitif böleni olmayan sayma sayıları aralarında asaldır. Kısa kural: EBOB 1 ise aralarında asaldır. Sayıların kendisi asal olmak zorunda değildir.",
    ornek: "8 ve 9 asal olmadığı halde EBOB(8, 9) = 1 olduğu için aralarında asaldır. 14 ve 21 aralarında asal değildir çünkü 7 ortaktır.",
    yanlis: [
      { kod: "ikisi-de-asal-sarti", uyari: "Aralarında asal olmak için iki sayının da asal olması gerekmez. 8 ile 15 aralarında asaldır." }
    ],
    kaynak: [{ kod: "mw", sayfa: 33, yer: "Altın Bilgiler" }]
  },
  {
    id: "ab-u01-k05-02",
    sira: 2,
    kazanimId: "k05",
    baslik: "Ardışık sayılar ve 1 her zaman uyar",
    metin: "Ardışık sayma sayıları aralarında asaldır. Ardışık tek sayılar da aralarında asaldır. 1, her sayma sayısı ile aralarında asaldır. Birbirinden farklı asal sayılar aralarında asaldır.",
    ornek: "14 ile 15 ardışıktır, aralarında asaldır. 8 ile 10 ardışık değildir ve 2 ortaktır.",
    yanlis: [
      { kod: "ciftleri-eleme", uyari: "İkisi de çiftse 2 ortaktır, aralarında asal olamazlar. Biri çift biri tek olabilir." }
    ],
    kaynak: [{ kod: "mw", sayfa: 33, yer: "Altın Bilgiler" }, { kod: "mw", sayfa: 34, yer: "Altın Bilgiler" }, { kod: "sh", sayfa: 8, yer: "Ne işe yarar" }]
  },
  {
    id: "ab-u01-k05-03",
    sira: 3,
    kazanimId: "k05",
    baslik: "Ortak asal çarpan yoksa aralarında asaldır",
    metin: "İki sayının asal çarpan kümeleri kesişmiyorsa aralarında asaldırlar. Birinin asalı diğerini bölüyorsa değillerdir.",
    ornek: "14 = 2·7 ve 15 = 3·5. Ortak asal yok, aralarında asaldır. 12 = 2²·3 ve 18 = 2·3². 2 ve 3 ortak, değillerdir.",
    yanlis: [
      { kod: "tum-bolenleri-yazma", uyari: "Bütün bölenleri dökmeden önce asal çarpanlara bak. Ortak asal varsa iş bitmiştir." }
    ],
    kaynak: [{ kod: "mw", sayfa: 34, yer: "Altın Bilgiler" }]
  },
  {
    id: "ab-u01-k05-04",
    sira: 4,
    kazanimId: "k05",
    baslik: "Aralarında asalsa EKOK çarpımdır, kesir sadeleşmez",
    metin: "a ve b aralarında asal ise EBOB(a, b) = 1 ve EKOK(a, b) = a·b. a/b kesri bu durumda daha küçük sayılarla sadeleşmez.",
    ornek: "Çarpımları 48 olan aralarında asal ikililer yalnız (1, 48) ve (3, 16). Toplamların en büyüğü 49, en küçüğü 19'dur. 49+19 = 68.",
    yanlis: [
      { kod: "ortak-carpanli-ikili", uyari: "2 ile 24'ün çarpımı 48 eder ama EBOB 2'dir. Aralarında asal ikiliye yazma." }
    ],
    kaynak: [{ kod: "mw", sayfa: 33, yer: "Altın Bilgiler" }, { kod: "mw", sayfa: 34, yer: "Altın Bilgiler" }]
  },
  {
    id: "ab-u01-k06-01",
    sira: 1,
    kazanimId: "k06",
    baslik: "Önce aracı seç",
    metin: "Karışık soruda işlemden önce araç seçilir. Eşit parçaya ayırma, artmama, en büyük ortak bölen veya en geniş aralık EBOB'tur. Birlikte tekrar, en kısa bütün, döşeme ve payda eşitleme EKOK'tur. Ortak bölen yalnız 1 ise aralarında asaldır. Bölenin kaç tane olduğu veya tek sayıda bölen soruluyorsa bölen sayısı formülü ve tam kare kuralı kullanılır.",
    ornek: "İki ip artmadan eşit kesilecekse EBOB. İki zil birlikte çalacaksa EKOK. İki sayının ortak böleni yalnız 1 mi diye soruluyorsa aralarında asal. Kaç böleni var deniyorsa (üs+1) çarpımı.",
    yanlis: [
      { kod: "araci-karistirma", uyari: "Parçala diyorsa EBOB, birleştir veya buluştur diyorsa EKOK. Sorunun fiiline bak." }
    ],
    kaynak: [{ kod: "sh", sayfa: 8, yer: "Ne işe yarar" }, { kod: "mw", sayfa: 21, yer: "Altın Bilgiler" }, { kod: "mw", sayfa: 29, yer: "Altın Bilgiler" }]
  }
];

const anlatim = [
  {
    id: "an-u01-k01",
    kazanimId: "k01",
    baslik: "Çarpanı ikili ikili yaz",
    altinBilgiId: ["ab-u01-k01-01", "ab-u01-k01-02", "ab-u01-k01-04", "ab-u01-k01-05", "ab-u01-k01-07"],
    adimlar: [
      "1'den başla. Sayıyı bölen her böleni, eşiyle birlikte yaz.",
      "İkili ortadan buluşunca dur. Tam karede ortadaki çarpan tek kalır.",
      "Bölen sayısı sorulursa önce asal çarpanlara ayır, her üsse 1 ekleyip çarp."
    ],
    ornek: {
      istem: "36'nın bütün pozitif çarpanlarını yazıp kaç tane olduğunu bul.",
      cozum: "1×36, 2×18, 3×12, 4×9, 6×6. Çarpanlar: 1, 2, 3, 4, 6, 9, 12, 18, 36. 9 tanedir. 36 = 2²·3² olduğundan (2+1)(2+1) = 9. Tam kare olduğu için adet tektir."
    }
  },
  {
    id: "an-u01-k02",
    kazanimId: "k02",
    baslik: "Algoritmayı 2'den başlat",
    altinBilgiId: ["ab-u01-k02-01", "ab-u01-k02-03", "ab-u01-k02-04", "ab-u01-k02-06"],
    adimlar: [
      "1 asal değildir. Çift aday yalnız 2 olabilir.",
      "Sayıyı en küçük asaldan böl. Sağ sütunu say, aynı asalı üs yap.",
      "120'den küçük adayda 2, 3, 5 ve 7'ye bakmak yeter."
    ],
    ornek: {
      istem: "84'ü asal çarpanların üslü çarpımı olarak yaz.",
      cozum: "84 ÷ 2 = 42, 42 ÷ 2 = 21, 21 ÷ 3 = 7, 7 ÷ 7 = 1. 84 = 2² · 3¹ · 7¹."
    }
  },
  {
    id: "an-u01-k03",
    kazanimId: "k03",
    baslik: "EBOB'ta yalnız ortaklar kalır",
    altinBilgiId: ["ab-u01-k03-01", "ab-u01-k03-02", "ab-u01-k03-03", "ab-u01-k03-05"],
    adimlar: [
      "İki sayıyı aynı çizgide en küçük ortak asaldan böl.",
      "Sağda yalnız ikisinin de bölündüğü asalları çarp.",
      "Biri diğerinin katıysa küçük olanı yaz. Parça artmasın diyorsa bu sayıdır."
    ],
    ornek: {
      istem: "EBOB(48, 72) kaçtır? Bu aralıkla bahçenin çevresine kaç fidan dikilir?",
      cozum: "48 = 2⁴·3, 72 = 2³·3². Ortak küçük üsler 2³·3 = 24. Çevre 2·(48+72) = 240. 240 ÷ 24 = 10 fidan. Çevre kapalı olduğu için 1 eklenmez."
    }
  },
  {
    id: "an-u01-k04",
    kazanimId: "k04",
    baslik: "EKOK'ta bütün asallar kalır",
    altinBilgiId: ["ab-u01-k04-01", "ab-u01-k04-02", "ab-u01-k04-03", "ab-u01-k04-05", "ab-u01-k04-06"],
    adimlar: [
      "Her asalın büyük üssünü al. Yalnız birinde olan asalı atma.",
      "Biri diğerinin katıysa büyük olan EKOK'tur.",
      "Buluşturma sorusunda bu süre veya bu uzunluk ilk ortak andır. Düz yolda baş ve son varsa 1 ekle."
    ],
    ornek: {
      istem: "12 dakikada bir ve 15 dakikada bir kalkan seferler kaç dakikada bir birlikte kalkar?",
      cozum: "12 = 2²·3, 15 = 3·5. EKOK = 2²·3·5 = 60. 60 dakikada bir birlikte kalkarlar."
    }
  },
  {
    id: "an-u01-k05",
    kazanimId: "k05",
    baslik: "Ortak asal var mı, ona bak",
    altinBilgiId: ["ab-u01-k05-01", "ab-u01-k05-02", "ab-u01-k05-04"],
    adimlar: [
      "EBOB 1 mi diye bak. 1 ise aralarında asaldır.",
      "Ardışık iki sayı görürsen yeniden bölme; aralarında asaldır.",
      "Çarpım ve toplam sorusunda yalnız ortak asalı olmayan ikilileri tut."
    ],
    ornek: {
      istem: "8 ile 15 aralarında asal mıdır?",
      cozum: "8 = 2³, 15 = 3·5. Ortak asal yok. EBOB = 1. Aralarında asaldır. EKOK = 8×15 = 120."
    }
  },
  {
    id: "an-u01-k06",
    kazanimId: "k06",
    baslik: "Karışık soruda önce fiil",
    altinBilgiId: ["ab-u01-k06-01"],
    adimlar: [
      "Ayır, paylaştır, artmasın, en geniş aralık: EBOB.",
      "Buluşsun, döşensin, en kısa bütün, payda: EKOK.",
      "Kaç böleni var veya tek sayıda bölen: tam kare ve üs formülü."
    ],
    ornek: {
      istem: "180 cm ve 200 cm boru artmadan eş parçalara ayrılacak. En uzun parça kaç cm, en az kaç parça çıkar?",
      cozum: "Ayırma işi EBOB. EBOB(180, 200) = 20. Parça sayısı 180/20 + 200/20 = 9+10 = 19."
    }
  }
];

const etkinlik = [
  {
    id: "et-u01-k01-01",
    kazanimId: "k01",
    baslik: "Çarpan çiftlerini sırala",
    yonerge: "Sayının pozitif çarpanlarını küçükten büyüğe virgülle yaz.",
    altinBilgiId: ["ab-u01-k01-04", "ab-u01-k01-02"],
    maddeler: [
      { id: "a", istem: "20", cevap: "1, 2, 4, 5, 10, 20" },
      { id: "b", istem: "24", cevap: "1, 2, 3, 4, 6, 8, 12, 24" },
      { id: "c", istem: "16", cevap: "1, 2, 4, 8, 16" },
      { id: "d", istem: "45", cevap: "1, 3, 5, 9, 15, 45" }
    ]
  },
  {
    id: "et-u01-k01-02",
    kazanimId: "k01",
    baslik: "Bölen sayısı tek mi",
    yonerge: "Pozitif bölen sayısı tek olanlara evet, olmayanlara hayır yaz.",
    altinBilgiId: ["ab-u01-k01-05"],
    maddeler: [
      { id: "a", istem: "18", cevap: "hayır" },
      { id: "b", istem: "16", cevap: "evet" },
      { id: "c", istem: "36", cevap: "evet" },
      { id: "d", istem: "49", cevap: "evet" },
      { id: "e", istem: "24", cevap: "hayır" },
      { id: "f", istem: "81", cevap: "evet" }
    ]
  },
  {
    id: "et-u01-k02-01",
    kazanimId: "k02",
    baslik: "Asal olanı işaretle",
    yonerge: "Asal olana evet, olmayana hayır yaz.",
    altinBilgiId: ["ab-u01-k02-01", "ab-u01-k02-06"],
    maddeler: [
      { id: "a", istem: "18", cevap: "hayır" },
      { id: "b", istem: "47", cevap: "evet" },
      { id: "c", istem: "91", cevap: "hayır" },
      { id: "d", istem: "101", cevap: "evet" },
      { id: "e", istem: "111", cevap: "hayır" },
      { id: "f", istem: "2", cevap: "evet" }
    ]
  },
  {
    id: "et-u01-k03-01",
    kazanimId: "k03",
    baslik: "EBOB'u yaz",
    yonerge: "İki sayının EBOB'unu yaz.",
    altinBilgiId: ["ab-u01-k03-02", "ab-u01-k03-03"],
    maddeler: [
      { id: "a", istem: "20 ve 35", cevap: "5" },
      { id: "b", istem: "45 ve 75", cevap: "15" },
      { id: "c", istem: "36 ve 48", cevap: "12" },
      { id: "d", istem: "18 ve 36", cevap: "18" }
    ]
  },
  {
    id: "et-u01-k04-01",
    kazanimId: "k04",
    baslik: "EKOK'u yaz",
    yonerge: "İki sayının EKOK'unu yaz.",
    altinBilgiId: ["ab-u01-k04-02", "ab-u01-k04-03"],
    maddeler: [
      { id: "a", istem: "12 ve 18", cevap: "36" },
      { id: "b", istem: "15 ve 30", cevap: "30" },
      { id: "c", istem: "4 ve 7", cevap: "28" },
      { id: "d", istem: "18 ve 30", cevap: "90" }
    ]
  },
  {
    id: "et-u01-k05-01",
    kazanimId: "k05",
    baslik: "Aralarında asal mı",
    yonerge: "Aralarında asal olan çifte evet, olmayana hayır yaz.",
    altinBilgiId: ["ab-u01-k05-01", "ab-u01-k05-02"],
    maddeler: [
      { id: "a", istem: "8 ile 10", cevap: "hayır" },
      { id: "b", istem: "17 ile 20", cevap: "evet" },
      { id: "c", istem: "14 ile 15", cevap: "evet" },
      { id: "d", istem: "12 ile 18", cevap: "hayır" },
      { id: "e", istem: "8 ile 9", cevap: "evet" },
      { id: "f", istem: "21 ile 28", cevap: "hayır" }
    ]
  }
];

const cozumlu = [
  {
    kaynak: "mw", basiliSayfa: 9, no: "1",
    kok: "28'in kendisi dışındaki pozitif tam sayı çarpanlarının toplamı kaçtır?",
    cevap: "28",
    cozum: "28 = 2²·7. Çarpanlar 1, 2, 4, 7, 14, 28. Kendisi çıkarılınca 1+2+4+7+14 = 28.",
    altinBilgiId: ["ab-u01-k01-02", "ab-u01-k01-04"]
  },
  {
    kaynak: "mw", basiliSayfa: 9, no: "3",
    kok: "45'in çarpanları küçükten büyüğe 1, 3, 5, 9, A, 45 ise A kaçtır?",
    cevap: "15",
    cozum: "5×9 = 45 olduğundan ikili 1×45, 3×15, 5×9. A = 15.",
    altinBilgiId: ["ab-u01-k01-04"]
  },
  {
    kaynak: "mw", basiliSayfa: 10, no: "5",
    kok: "A6 iki basamaklı sayısının tek sayıda pozitif böleni vardır. A yerine yazılabilecek rakamların toplamı kaçtır?",
    cevap: "4",
    cozum: "Tek sayıda bölen, sayının tam kare olması demektir. 6 ile biten iki basamaklı tam kareler 16 ve 36'dır. Onlar basamağı 1 ve 3'tür. Toplam 4.",
    altinBilgiId: ["ab-u01-k01-05"]
  },
  {
    kaynak: "mw", basiliSayfa: 10, no: "7",
    kok: "1'den 10'a kadar kapalı lambalara, her çocuk kendi katlarının düğmesine basıyor. Sonda kaç lamba açık kalır?",
    cevap: "3",
    cozum: "Her lamba bölen sayısı kadar basılır. Tek sayıda böleni olan tam kareler açık kalır: 1, 4 ve 9. 3 lamba.",
    altinBilgiId: ["ab-u01-k01-05"]
  },
  {
    kaynak: "mw", basiliSayfa: 11, no: "1",
    kok: "Alanı 20 m² ve kenarları tam sayı olan bahçenin çevresi metre cinsinden hangisi olamaz? A) 42  B) 36  C) 24  D) 18",
    cevap: "B",
    cozum: "İkililer 1×20, 2×10, 4×5. Çevreler 42, 24 ve 18. 36 bu listede yoktur.",
    altinBilgiId: ["ab-u01-k01-04"],
    yanlis: { A: "olabilir-sannma", C: "olabilir-sannma", D: "olabilir-sannma" }
  },
  {
    kaynak: "mw", basiliSayfa: 13, no: "2",
    kok: "Asal çarpanları tam olarak 3 ve 5 olan, 120'den küçük kaç doğal sayı vardır?",
    cevap: "3",
    cozum: "3^a·5^b < 120 ve a≥1, b≥1. 15, 45 ve 75. 135 ve 225 sınırı aşar. 3 sayı.",
    altinBilgiId: ["ab-u01-k02-03", "ab-u01-k01-07"]
  },
  {
    kaynak: "mw", basiliSayfa: 14, no: "6",
    kok: "Asal çarpanlarının toplamı 5 olan en büyük iki basamaklı doğal sayı kaçtır?",
    cevap: "96",
    cozum: "Farklı asal çarpanların toplamı 5 ise asallar 2 ve 3'tür. 2^a·3^b biçimindeki en büyük iki basamaklı sayı 32×3 = 96'dır.",
    altinBilgiId: ["ab-u01-k02-03"]
  },
  {
    kaynak: "mw", basiliSayfa: 17, no: "1a",
    kok: "EBOB(20, 35) kaçtır?",
    cevap: "5",
    cozum: "20 = 2²·5, 35 = 5·7. Ortak asal 5. EBOB = 5.",
    altinBilgiId: ["ab-u01-k03-02"]
  },
  {
    kaynak: "mw", basiliSayfa: 17, no: "1b",
    kok: "EBOB(45, 75) kaçtır?",
    cevap: "15",
    cozum: "45 = 3²·5, 75 = 3·5². Küçük üsler 3¹·5¹ = 15.",
    altinBilgiId: ["ab-u01-k03-02"]
  },
  {
    kaynak: "mw", basiliSayfa: 17, no: "1c",
    kok: "EBOB(36, 48) kaçtır?",
    cevap: "12",
    cozum: "36 = 2²·3², 48 = 2⁴·3. Küçük üsler 2²·3 = 12.",
    altinBilgiId: ["ab-u01-k03-02"]
  },
  {
    kaynak: "mw", basiliSayfa: 17, no: "1d",
    kok: "EBOB(120, 160) kaçtır?",
    cevap: "40",
    cozum: "120 = 2³·3·5, 160 = 2⁵·5. Ortak küçük üsler 2³·5 = 40.",
    altinBilgiId: ["ab-u01-k03-02"]
  },
  {
    kaynak: "mw", basiliSayfa: 17, no: "1e",
    kok: "EBOB(150, 180) kaçtır?",
    cevap: "30",
    cozum: "150 = 2·3·5², 180 = 2²·3²·5. Ortak 2·3·5 = 30.",
    altinBilgiId: ["ab-u01-k03-02"]
  },
  {
    kaynak: "mw", basiliSayfa: 17, no: "1f",
    kok: "EBOB(240, 360) kaçtır?",
    cevap: "120",
    cozum: "240 = 2⁴·3·5, 360 = 2³·3²·5. Ortak 2³·3·5 = 120.",
    altinBilgiId: ["ab-u01-k03-02"]
  },
  {
    kaynak: "mw", basiliSayfa: 18, no: "5",
    kok: "İki farklı sayının EBOB'u 24 olduğuna göre bu sayıların toplamı en az kaçtır?",
    cevap: "72",
    cozum: "Sayılar 24m ve 24n, m ile n aralarında asal ve farklı. En küçük ikili 1 ve 2. Toplam 24+48 = 72.",
    altinBilgiId: ["ab-u01-k03-01", "ab-u01-k05-01"]
  },
  {
    kaynak: "mw", basiliSayfa: 21, no: "1a",
    kok: "60 L ve 72 L yağ artmadan eşit şişelere konacak. Şişe hacmi en fazla kaç litre olur?",
    cevap: "12",
    cozum: "En büyük eşit parça EBOB(60, 72) = 12 litredir.",
    altinBilgiId: ["ab-u01-k03-05"]
  },
  {
    kaynak: "mw", basiliSayfa: 21, no: "1b",
    kok: "60 L ve 72 L yağ 12 litrelik şişelere konursa en az kaç şişe gerekir?",
    cevap: "11",
    cozum: "60/12 = 5 ve 72/12 = 6. Toplam 11 şişe.",
    altinBilgiId: ["ab-u01-k03-05"]
  },
  {
    kaynak: "mw", basiliSayfa: 21, no: "1c",
    kok: "60 L ve 72 L için kaç farklı pozitif tam litre şişe kullanılabilir?",
    cevap: "6",
    cozum: "Farklı parçalar EBOB'un bölenleridir. 12'nin bölenleri 1, 2, 3, 4, 6, 12. 6 çeşit.",
    altinBilgiId: ["ab-u01-k03-06"]
  },
  {
    kaynak: "mw", basiliSayfa: 25, no: "1a",
    kok: "EKOK(15, 30) kaçtır?",
    cevap: "30",
    cozum: "30, 15'in katıdır. EKOK büyük olan sayıdır.",
    altinBilgiId: ["ab-u01-k04-03"]
  },
  {
    kaynak: "mw", basiliSayfa: 25, no: "1b",
    kok: "EKOK(72, 96) kaçtır?",
    cevap: "288",
    cozum: "72 = 2³·3², 96 = 2⁵·3. Büyük üsler 2⁵·3² = 32·9 = 288.",
    altinBilgiId: ["ab-u01-k04-02"]
  },
  {
    kaynak: "mw", basiliSayfa: 25, no: "1c",
    kok: "EKOK(40, 60) kaçtır?",
    cevap: "120",
    cozum: "40 = 2³·5, 60 = 2²·3·5. EKOK = 2³·3·5 = 120.",
    altinBilgiId: ["ab-u01-k04-02"]
  },
  {
    kaynak: "mw", basiliSayfa: 25, no: "1d",
    kok: "EKOK(18, 27) kaçtır?",
    cevap: "54",
    cozum: "18 = 2·3², 27 = 3³. EKOK = 2·3³ = 54.",
    altinBilgiId: ["ab-u01-k04-02"]
  },
  {
    kaynak: "mw", basiliSayfa: 25, no: "1e",
    kok: "EKOK(45, 75) kaçtır?",
    cevap: "225",
    cozum: "45 = 3²·5, 75 = 3·5². EKOK = 3²·5² = 225.",
    altinBilgiId: ["ab-u01-k04-02"]
  },
  {
    kaynak: "mw", basiliSayfa: 25, no: "1f",
    kok: "EKOK(24, 80) kaçtır?",
    cevap: "240",
    cozum: "24 = 2³·3, 80 = 2⁴·5. EKOK = 2⁴·3·5 = 240.",
    altinBilgiId: ["ab-u01-k04-02"]
  },
  {
    kaynak: "mw", basiliSayfa: 25, no: "2",
    kok: "24 ve 42'nin ortak katı olan en küçük sayma sayısı kaçtır?",
    cevap: "168",
    cozum: "24 = 2³·3, 42 = 2·3·7. EKOK = 2³·3·7 = 168.",
    altinBilgiId: ["ab-u01-k04-02"]
  },
  {
    kaynak: "mw", basiliSayfa: 25, no: "3",
    kok: "4'er ve 7'şer ritmik saymada 100'den küçük en büyük ortak sayı kaçtır?",
    cevap: "84",
    cozum: "EKOK(4, 7) = 28. 28'in 100'den küçük katları 28, 56, 84. En büyüğü 84.",
    altinBilgiId: ["ab-u01-k04-04"]
  },
  {
    kaynak: "mw", basiliSayfa: 29, no: "1a",
    kok: "Yükseklikleri 10 cm ve 12 cm olan tuğlalarla, boşluksuz örülebilecek en kısa duvar kaç metredir?",
    cevap: "0,6",
    cozum: "EKOK(10, 12) = 60 cm = 0,6 m.",
    altinBilgiId: ["ab-u01-k04-05"]
  },
  {
    kaynak: "mw", basiliSayfa: 29, no: "2a",
    kok: "Bir kenara 15 m, diğer kenara 12 m aralıkla ve uçlara da fidan dikilirse yol en az kaç metre olur?",
    cevap: "60",
    cozum: "En kısa ortak uzunluk EKOK(15, 12) = 60 metredir.",
    altinBilgiId: ["ab-u01-k04-05"]
  },
  {
    kaynak: "mw", basiliSayfa: 29, no: "2b",
    kok: "60 metrelik yolun iki kenarına, 15 m ve 12 m aralıkla, başa ve sona da fidan dikilirse toplam en az kaç fidan gerekir?",
    cevap: "10",
    cozum: "Bir kenar 60/15+1 = 5, diğer kenar 60/12+1 = 5. Toplam 10. Baş ve son düz yolda 1 eklenir.",
    altinBilgiId: ["ab-u01-k04-06"]
  },
  {
    kaynak: "mw", basiliSayfa: 33, no: "2",
    kok: "Çarpımları 48 olan aralarında asal iki sayının toplamlarının en büyüğü a, en küçüğü b ise a+b kaçtır?",
    cevap: "68",
    cozum: "Aralarında asal ikililer (1, 48) ve (3, 16). Toplamlar 49 ve 19. 2 ile 24 elenir çünkü EBOB 2'dir. a+b = 49+19 = 68.",
    altinBilgiId: ["ab-u01-k05-04"]
  },
  {
    kaynak: "sh", basiliSayfa: 9, no: "1",
    kok: "Hangisi 24'ün çarpanıdır? A) 9  B) 7  C) 5  D) 3",
    cevap: "D",
    cozum: "24 = 2³·3. 3 böler. 9, 7 ve 5 bölmez.",
    altinBilgiId: ["ab-u01-k01-01", "ab-u01-k02-03"]
  },
  {
    kaynak: "sh", basiliSayfa: 9, no: "2",
    kok: "12'nin çarpanları 1, 2, 3, 4, A, 12 ise A kaçtır? A) 5  B) 6  C) 8  D) 10",
    cevap: "B",
    cozum: "12 = 1×12 = 2×6 = 3×4. Eksik olan 6'dır.",
    altinBilgiId: ["ab-u01-k01-04"]
  },
  {
    kaynak: "sh", basiliSayfa: 9, no: "3",
    kok: "18'in bölenleri 1, 2, 3, A, B, 18 ise A+B kaçtır? A) 15  B) 12  C) 9  D) 6",
    cevap: "A",
    cozum: "Bölenler 1, 2, 3, 6, 9, 18. A+B = 6+9 = 15.",
    altinBilgiId: ["ab-u01-k01-04"]
  }
];

const aralik = [
  {
    id: "mb1-u01",
    tur: "aralik",
    uniteId: "u01",
    kazanimId: "k07",
    kaynak: "mb1",
    bant: "D3",
    pdfBas: 2,
    pdfBit: 64,
    durum: "gorsel-kesim-bekliyor",
    not: "İçindekilerde Çarpanlar ve Katlar sayfa 2'de başlar, sonraki konu sayfa 65'tedir. Yazı katmanı bozuk olduğu için sayfa sayfa kazanım ayrımı görsel kesimden sonra yapılacak."
  },
  {
    id: "nt-u01",
    tur: "aralik",
    uniteId: "u01",
    kazanimId: "k01",
    kaynak: "nt",
    bant: "D1",
    durum: "sayfa-araligi-bekliyor",
    not: "Metin katmanı yok. Kitap sırası Tane Tane Öğren, Tane Tane Çöz, sonra çoklu kazanım ve yeni nesil. Sayfa aralığı görüntüden işlenecek. Bant D1 olarak playlistin başına girecek."
  },
  {
    id: "pr-u01",
    tur: "aralik",
    uniteId: "u01",
    kazanimId: "k01",
    kaynak: "pr",
    bant: "D2",
    durum: "sayfa-araligi-bekliyor",
    not: "Metin katmanı yok. 1. ünite kapağı çarpanlar ve üslü ifadeleri birlikte açar. Çarpanlar sayfaları D2 bandına, üslü sayfalar bir sonraki üniteye ayrılacak."
  }
];

module.exports = { altin, anlatim, etkinlik, cozumlu, aralik };
