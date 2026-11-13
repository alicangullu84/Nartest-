"use strict";

const { duraklar } = require("./indeks");

/**
 * Bir kazanımın Metaword düzeni.
 * Sıra: altın kartlar, anlatım, etkinlik, sonra D1'den D5'e sorular.
 * Ünite 2-12 ve Metaword sayfası bu sırayla kurulur.
 */
function metawordBolumu(bank, kazanimId) {
  const altin = bank.kayitlar
    .filter((k) => k.tur === "altin" && k.kazanimId === kazanimId)
    .sort((a, b) => a.sira - b.sira)
    .map((k) => ({
      tur: "altin",
      id: k.id,
      baslik: k.baslik,
      metin: k.metin,
      ornek: k.ornek
    }));
  const anlatim = bank.kayitlar
    .filter((k) => k.tur === "anlatim" && k.kazanimId === kazanimId)
    .map((k) => ({
      tur: "anlatim",
      id: k.id,
      baslik: k.baslik,
      adimlar: k.adimlar,
      ornek: k.ornek,
      altinBilgiId: k.altinBilgiId
    }));
  const etkinlik = bank.kayitlar
    .filter((k) => k.tur === "etkinlik" && k.kazanimId === kazanimId)
    .map((k) => ({
      tur: "etkinlik",
      id: k.id,
      baslik: k.baslik,
      yonerge: k.yonerge,
      maddeler: k.maddeler,
      altinBilgiId: k.altinBilgiId
    }));
  const soru = duraklar(bank.kayitlar, kazanimId);
  return {
    kazanimId,
    sira: ["altin", "anlatim", "etkinlik", "soru"],
    blok: { altin, anlatim, etkinlik, soru }
  };
}

module.exports = { metawordBolumu };
