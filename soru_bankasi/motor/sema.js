"use strict";

/** Birinci ünitenin omurgası. Yeni ünite eklenince aynı şekil kopyalanır. */

const BANTLAR = ["D1", "D2", "D3", "D4", "D5"];

const KAYNAKLAR = {
  nt: {
    kod: "nt",
    ad: "NARTEST Tane Tane 8 (2021)",
    dosya: "NARTEST_TaneTane_8_2021.pdf",
    metinKatmani: false,
    varsayilanBant: "D1",
    rol: "Tane Tane Öğren ve Tane Tane Çöz. Konu bitince ilk çözülen kaynak."
  },
  pr: {
    kod: "pr",
    ad: "Prestij İlkadım 8 Matematik (2024)",
    dosya: "Prestij_Ilkadim_8_Matematik_2024.pdf",
    metinKatmani: false,
    varsayilanBant: "D2",
    rol: "İlk adım pekiştirmesi. Tane Tane bittikten sonra."
  },
  mb1: {
    kod: "mb1",
    ad: "MEB Matematik Soruları 2027, 1. dönem",
    dosya: "LGS 2027 - MEB MATEMATİK SORULARI - 1. DÖNEM.pdf",
    metinKatmani: true,
    varsayilanBant: "D3",
    rol: "Resmi soru kalıbı. Çarpanlar ve Katlar bu kitapta sayfa 2-64."
  },
  mb2: {
    kod: "mb2",
    ad: "MEB Matematik Soruları 2027, 2. dönem",
    dosya: "LGS 2027 - MEB MATEMATİK SORULARI - 2. DÖNEM.pdf",
    metinKatmani: true,
    varsayilanBant: "D3",
    rol: "2. dönem konuları. Çarpanlar ve Katlar bu ciltte yok."
  },
  mw: {
    kod: "mw",
    ad: "Metaword 8 Matematik V2",
    dosya: "Metaword_8_Matematik_V2.pdf",
    metinKatmani: true,
    varsayilanBant: "D3",
    rol: "Altın bilgi, öğreten, pekiştiren, geliştiren. Diğer ünitelerin sayfa kalıbı bu kitaptır."
  },
  sh: {
    kod: "sh",
    ad: "Prestij Matematik Soru Hazinesi 8",
    dosya: "Soru_Hazinesi_8.pdf",
    metinKatmani: true,
    varsayilanBant: "D5",
    rol: "Hacim bankası. Konunun en sonunda çözülür. Bin soruluk kitap da bu bandın sonuna eklenir."
  }
};

const KAYNAK_SIRA = ["nt", "pr", "mb1", "mb2", "mw", "sh"];

const KAZANIMLAR = [
  { id: "k01", no: 1, klasor: "k01_carpanlar", kod: "M.8.1.1.1", baslik: "Çarpanlar ve Katlar" },
  { id: "k02", no: 2, klasor: "k02_asal_carpanlar", kod: "M.8.1.1.1", baslik: "Asal Sayılar ve Asal Çarpanlar" },
  { id: "k03", no: 3, klasor: "k03_ebob", kod: "M.8.1.1.2", baslik: "En Büyük Ortak Bölen (EBOB)" },
  { id: "k04", no: 4, klasor: "k04_ekok", kod: "M.8.1.1.2", baslik: "En Küçük Ortak Kat (EKOK)" },
  { id: "k05", no: 5, klasor: "k05_aralarinda_asal", kod: "M.8.1.1.3", baslik: "Aralarında Asal Sayılar" },
  { id: "k06", no: 6, klasor: "k06_alistirma", kod: "M.8.1.1", baslik: "Alıştırma ve karışık pekiştirme", karisik: true },
  { id: "k07", no: 7, klasor: "k07_ornek_sorular", kod: "MEB", baslik: "Örnek sorular", karisik: true },
  { id: "k08", no: 8, klasor: "k08_lgs", kod: "LGS", baslik: "LGS ve beceri temelli sorular", karisik: true }
];

const UNITE = {
  id: "u01",
  no: 1,
  klasor: "u01_carpanlar_ve_katlar",
  baslik: "Çarpanlar ve Katlar",
  kazanimlar: KAZANIMLAR
};

/** Karışık sayfalarda açılacak kartlar. Karar kartı önce gelir. */
const KARISIK_ALTIN = {
  k06: ["ab-u01-k06-01", "ab-u01-k03-05", "ab-u01-k04-05", "ab-u01-k05-01", "ab-u01-k01-07"],
  k07: ["ab-u01-k06-01", "ab-u01-k01-07", "ab-u01-k03-02", "ab-u01-k04-02"],
  k08: ["ab-u01-k06-01", "ab-u01-k03-05", "ab-u01-k04-06", "ab-u01-k05-04", "ab-u01-k01-05"]
};

const BANT_AD = {
  D1: "Öğreten / Tane Tane",
  D2: "İlkadım",
  D3: "Pekiştiren / MEB",
  D4: "Geliştiren / Metaword",
  D5: "Soru Hazinesi ve beceri"
};

function kazanim(id) {
  return KAZANIMLAR.find((k) => k.id === id) || null;
}

function bantSirasi(bant) {
  const i = BANTLAR.indexOf(bant);
  return i === -1 ? 99 : i;
}

function kaynakSirasi(kod) {
  const i = KAYNAK_SIRA.indexOf(kod);
  return i === -1 ? 99 : i;
}

module.exports = {
  BANTLAR,
  BANT_AD,
  KAYNAKLAR,
  KAYNAK_SIRA,
  KAZANIMLAR,
  UNITE,
  KARISIK_ALTIN,
  kazanim,
  bantSirasi,
  kaynakSirasi
};
