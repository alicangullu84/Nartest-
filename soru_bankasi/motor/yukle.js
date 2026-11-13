"use strict";

const fs = require("fs");
const path = require("path");
const { UNITE, kazanim, KARISIK_ALTIN } = require("./sema");

const KOK = path.resolve(__dirname, "..");

function yuru(dizin, bulunan) {
  if (!fs.existsSync(dizin)) return;
  for (const ad of fs.readdirSync(dizin, { withFileTypes: true })) {
    const tam = path.join(dizin, ad.name);
    if (ad.isDirectory()) yuru(tam, bulunan);
    else if (ad.name === "kayit.json") bulunan.push(tam);
  }
}

function bankayiYukle() {
  const kok = path.join(KOK, UNITE.klasor);
  const dosyalar = [];
  yuru(kok, dosyalar);
  const kayitlar = dosyalar.map((dosya) => {
    const kayit = JSON.parse(fs.readFileSync(dosya, "utf8"));
    kayit._dosya = path.relative(KOK, dosya);
    return kayit;
  });
  const altin = new Map();
  const sayfa = new Map();
  for (const k of kayitlar) {
    if (k.tur === "altin") altin.set(k.id, k);
    if (k.tur === "sayfa" || k.tur === "altin_sayfa") sayfa.set(k.id, k);
  }
  return { kayitlar, altin, sayfa, kok: KOK };
}

function altinIdleri(kazanimId) {
  return null;
}

function sayfaAltinlari(bank, kazanimId) {
  if (KARISIK_ALTIN[kazanimId]) return KARISIK_ALTIN[kazanimId].slice();
  const liste = [];
  for (const kart of bank.altin.values()) {
    if (kart.kazanimId === kazanimId) liste.push(kart);
  }
  liste.sort((a, b) => a.sira - b.sira);
  return liste.map((k) => k.id);
}

function kazanimBaslik(id) {
  const k = kazanim(id);
  return k ? k.baslik : id;
}

module.exports = { KOK, bankayiYukle, sayfaAltinlari, kazanimBaslik, altinIdleri };
