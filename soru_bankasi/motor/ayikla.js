"use strict";

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const { KAYNAKLAR } = require("./sema");
const { KOK } = require("./yukle");

const PDF_KOK = path.join(KOK, "..", "kaynakPDF_MD", "01_8_sinif_kaynak_kitaplar");
const GECICI = path.join(KOK, "_gecici");

function pdfYolu(kod) {
  return path.join(PDF_KOK, KAYNAKLAR[kod].dosya);
}

function metinCek(kod, bas, bit, hedef) {
  fs.mkdirSync(path.dirname(hedef), { recursive: true });
  const sonuc = spawnSync(
    "pdftotext",
    ["-f", String(bas), "-l", String(bit), "-layout", "-enc", "UTF-8", pdfYolu(kod), hedef],
    { encoding: "utf8" }
  );
  if (sonuc.status !== 0) {
    throw new Error(`pdftotext ${kod} başarısız: ${sonuc.stderr || sonuc.stdout}`);
  }
  return fs.readFileSync(hedef, "utf8");
}

function sayfalaraBol(metin, ilkPdf) {
  const parcalar = metin.split("\f");
  const sayfalar = [];
  let pdf = ilkPdf;
  if (parcalar.length && parcalar[0].trim() === "") {
    parcalar.shift();
  }
  for (const parca of parcalar) {
    if (parca.trim()) sayfalar.push({ pdfSayfa: pdf, metin: parca });
    pdf += 1;
  }
  return sayfalar;
}

function basiliSayfa(metin, pdfSayfa) {
  const satirlar = metin.split(/\n/);
  for (let i = satirlar.length - 1; i >= 0; i -= 1) {
    const m = satirlar[i].trim().match(/^(\d{1,3})$/);
    if (m) return Number(m[1]);
  }
  return pdfSayfa;
}

function mwBant(metin) {
  if (/Beceri Temelli/i.test(metin)) return "D5";
  if (/Geliştiren Sorular/i.test(metin)) return "D4";
  if (/Pekiştiren Sorular/i.test(metin)) return "D3";
  if (/Öğreten Sorular/i.test(metin)) return "D1";
  return "D1";
}

function mwKazanim(metin) {
  if (/Beceri Temelli/i.test(metin)) return "k08";
  if (/Aralarında Asal/i.test(metin)) return "k05";
  if (/EKOK \(En Küçük Ortak Kat\) Problemleri/i.test(metin)) return "k04";
  if (/EKOK \(En Küçük Ortak Kat\) Hesaplama/i.test(metin)) return "k04";
  if (/EBOB \(En Büyük Ortak Bölen\) Problemleri/i.test(metin)) return "k03";
  if (/EBOB \(En Büyük Ortak Bölen\) Hesaplama/i.test(metin)) return "k03";
  if (/Asal Çarpanlara Ayırma/i.test(metin)) return "k02";
  if (/Pozitif Tam Sayıların Pozitif Çarpanları/i.test(metin)) return "k01";
  return null;
}

function baslikCek(metin) {
  const aday = [
    "Pozitif Tam Sayıların Pozitif Çarpanları",
    "Asal Çarpanlara Ayırma",
    "EBOB (En Büyük Ortak Bölen) Problemleri",
    "EBOB (En Büyük Ortak Bölen) Hesaplama",
    "EKOK (En Küçük Ortak Kat) Problemleri",
    "EKOK (En Küçük Ortak Kat) Hesaplama",
    "Aralarında Asal Sayılar",
    "Beceri Temelli Sorular"
  ];
  return aday.find((a) => metin.includes(a)) || "Çarpanlar ve Katlar";
}

function sayfaId(kod, basili) {
  return `${kod}-p${String(basili).padStart(3, "0")}`;
}

function metawordSayfalari(metin) {
  const sayfalar = sayfalaraBol(metin, 9);
  const cikti = [];
  for (const s of sayfalar) {
    if (/ÜSLÜ İFADELER|Tam Sayıların Tam Sayı Kuvvetleri/.test(s.metin)) break;
    const kazanimId = mwKazanim(s.metin);
    if (!kazanimId) continue;
    const basili = basiliSayfa(s.metin, s.pdfSayfa);
    cikti.push({
      id: sayfaId("mw", basili),
      tur: "sayfa",
      uniteId: "u01",
      kazanimId,
      bant: mwBant(s.metin),
      baslik: baslikCek(s.metin),
      kaynak: "mw",
      pdfSayfa: s.pdfSayfa,
      basiliSayfa: basili,
      altinVar: /Altın Bilgiler/.test(s.metin),
      sorular: []
    });
  }
  return cikti;
}

function soruHazinesiSayfalari(metin) {
  const sayfalar = sayfalaraBol(metin, 1);
  const cikti = [];
  for (const s of sayfalar) {
    // Bu kitapta metin katmanının sayfa numarası, basılı numaradan 1 büyüktür.
    const basili = basiliSayfa(s.metin, s.pdfSayfa) - 1;
    if (basili >= 43) break;
    if (basili < 7) continue;
    const id = sayfaId("sh", basili);
    if (basili <= 8 || /NE İŞE YARAR/.test(s.metin)) {
      const ozetKartlar = [
        "ab-u01-k01-07",
        "ab-u01-k01-05",
        "ab-u01-k02-06",
        "ab-u01-k05-02",
        "ab-u01-k03-05",
        "ab-u01-k04-06"
      ];
      cikti.push({
        id,
        tur: "altin_sayfa",
        uniteId: "u01",
        kazanimId: "k01",
        bant: null,
        baslik: basili === 7 ? "Ünite kazanımları" : "Ne işe yarar",
        kaynak: "sh",
        pdfSayfa: s.pdfSayfa,
        basiliSayfa: basili,
        altinBilgiId: basili === 8 ? ozetKartlar : undefined,
        not: "Soru yok. Ünitenin altın özeti. Kartlar bu sayfadan damıtıldı.",
        sorular: []
      });
      continue;
    }
    let kazanimId = "k01";
    let baslik = "Pozitif tam sayıların çarpanları";
    if (basili >= 41) {
      kazanimId = "k08";
      baslik = "Açık uçlu sorular";
    } else if (basili >= 35) {
      kazanimId = "k06";
      baslik = "Konu değerlendirme";
    } else if (basili >= 31) {
      kazanimId = "k05";
      baslik = "Aralarında asal sayılar";
    } else if (basili >= 27) {
      kazanimId = "k06";
      baslik = "EBOB ve EKOK birlikte";
    } else if (basili >= 25) {
      kazanimId = "k04";
      baslik = "EKOK hesaplama";
    } else if (basili >= 21) {
      kazanimId = "k03";
      baslik = "EBOB hesaplama";
    }
    cikti.push({
      id,
      tur: "sayfa",
      uniteId: "u01",
      kazanimId,
      bant: "D5",
      baslik,
      kaynak: "sh",
      pdfSayfa: s.pdfSayfa,
      basiliSayfa: basili,
      sorular: []
    });
  }
  return cikti;
}

function ayikla() {
  fs.mkdirSync(GECICI, { recursive: true });
  const mwMetin = metinCek("mw", 9, 50, path.join(GECICI, "mw_u1.txt"));
  const shMetin = metinCek("sh", 1, 50, path.join(GECICI, "sh_u1.txt"));
  const sayfalar = metawordSayfalari(mwMetin).concat(soruHazinesiSayfalari(shMetin));
  const hedef = path.join(KOK, "icerik", "u01_sayfa.json");
  fs.mkdirSync(path.dirname(hedef), { recursive: true });
  fs.writeFileSync(hedef, JSON.stringify(sayfalar, null, 2), "utf8");
  return sayfalar;
}

module.exports = { ayikla, pdfYolu, GECICI };
