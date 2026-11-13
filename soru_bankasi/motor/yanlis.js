"use strict";

const { normCevap } = require("./yay");

function harf(s) {
  const t = String(s).trim().toLocaleUpperCase("tr-TR");
  return /^[A-D]$/.test(t) ? t : null;
}

function ayniMi(beklenen, gelen) {
  const bh = harf(beklenen);
  const gh = harf(gelen);
  if (bh && gh) return bh === gh;
  return normCevap(beklenen) === normCevap(gelen);
}

function kartlariGetir(bank, idler) {
  return idler.map((id) => {
    const kart = bank.altin.get(id);
    if (!kart) return { id, eksik: true };
    return {
      id: kart.id,
      baslik: kart.baslik,
      metin: kart.metin,
      ornek: kart.ornek,
      yanlis: kart.yanlis
    };
  });
}

/**
 * Çocuk bir soruyu yanlış işaretleyince açılan onarım kitabı.
 * sayfaId: mw-p011 gibi. soruNo boşsa sayfanın kartları açılır.
 */
function yanlisKitabi(bank, sayfaId, soruNo, secilen) {
  const sayfa = bank.sayfa.get(sayfaId);
  if (!sayfa) return { hata: "Sayfa yok", sayfaId };
  if (soruNo == null || soruNo === "") {
    return {
      dogru: null,
      sayfaId,
      baslik: sayfa.baslik,
      kartlar: kartlariGetir(bank, sayfa.altinBilgiId || [])
    };
  }
  const soru = (sayfa.sorular || []).find((s) => String(s.no) === String(soruNo));
  if (!soru) {
    return {
      hata: "Bu sorunun çözüm anahtarı henüz yok",
      sayfaId,
      soruNo: String(soruNo),
      kartlar: kartlariGetir(bank, sayfa.altinBilgiId || [])
    };
  }
  if (ayniMi(soru.cevap, secilen)) {
    return { dogru: true, sayfaId, soruNo: String(soruNo), cevap: soru.cevap };
  }
  const idler = soru.altinBilgiId && soru.altinBilgiId.length
    ? soru.altinBilgiId
    : (sayfa.altinBilgiId || []);
  const kartlar = kartlariGetir(bank, idler);
  const kod = soru.yanlis ? soru.yanlis[harf(secilen) || secilen] : null;
  let oncelik = null;
  if (kod) {
    for (const kart of kartlar) {
      const uyari = (kart.yanlis || []).find((y) => y.kod === kod);
      if (uyari) oncelik = { kart: kart.baslik, ...uyari };
    }
  }
  return {
    dogru: false,
    sayfaId,
    soruNo: String(soruNo),
    secilen: secilen == null ? "" : String(secilen),
    cevap: soru.cevap,
    cozum: soru.cozum,
    oncelik,
    kartlar
  };
}

module.exports = { yanlisKitabi, ayniMi };
