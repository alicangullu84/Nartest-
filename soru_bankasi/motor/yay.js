"use strict";

const fs = require("fs");
const path = require("path");
const { UNITE, kazanim } = require("./sema");
const { KOK, sayfaAltinlari, bankayiYukle } = require("./yukle");
const { ayikla } = require("./ayikla");
const { altin, anlatim, etkinlik, cozumlu, aralik } = require("../icerik/u01");

function yaz(dosya, kayit) {
  fs.mkdirSync(path.dirname(dosya), { recursive: true });
  const kopya = { ...kayit };
  delete kopya._dosya;
  fs.writeFileSync(dosya, JSON.stringify(kopya, null, 2), "utf8");
}

function normCevap(s) {
  return String(s).trim().toLocaleLowerCase("tr-TR").replace(/\s+/g, "").replace(/,/g, ".");
}

function cozumleriIsle(sayfalar) {
  const harita = new Map(sayfalar.map((s) => [s.id, s]));
  const dusen = [];
  for (const c of cozumlu) {
    const id = `${c.kaynak}-p${String(c.basiliSayfa).padStart(3, "0")}`;
    const sayfa = harita.get(id);
    if (!sayfa) {
      dusen.push(id + " s" + c.no);
      continue;
    }
    sayfa.sorular.push({
      no: String(c.no),
      kok: c.kok,
      cevap: String(c.cevap),
      cozum: c.cozum,
      altinBilgiId: c.altinBilgiId,
      yanlis: c.yanlis || {}
    });
  }
  return dusen;
}

function yay(secenek = {}) {
  const sayfalar = secenek.sayfalar || ayikla();
  const dusen = cozumleriIsle(sayfalar);
  const uniteKok = path.join(KOK, UNITE.klasor);
  fs.rmSync(uniteKok, { recursive: true, force: true });

  const bankaOn = { altin: new Map(altin.map((a) => [a.id, a])) };
  for (const kart of altin) {
    const k = kazanim(kart.kazanimId);
    yaz(path.join(uniteKok, "altin", kart.id, "kayit.json"), {
      ...kart,
      tur: "altin",
      uniteId: "u01",
      kazanimKodu: k.kod
    });
  }
  for (const a of anlatim) {
    const k = kazanim(a.kazanimId);
    yaz(path.join(uniteKok, k.klasor, "anlatim", a.id, "kayit.json"), {
      ...a,
      tur: "anlatim",
      uniteId: "u01"
    });
  }
  for (const e of etkinlik) {
    const k = kazanim(e.kazanimId);
    yaz(path.join(uniteKok, k.klasor, "etkinlik", e.id, "kayit.json"), {
      ...e,
      tur: "etkinlik",
      uniteId: "u01"
    });
  }
  for (const s of sayfalar) {
    const k = kazanim(s.kazanimId);
    const kartlar = s.altinBilgiId && s.altinBilgiId.length
      ? s.altinBilgiId
      : sayfaAltinlari(bankaOn, s.kazanimId);
    const kayit = {
      ...s,
      altinBilgiId: kartlar,
      gorsel: `gorseller/${s.kaynak}/p${String(s.basiliSayfa).padStart(3, "0")}.png`
    };
    if (s.tur === "altin_sayfa") {
      yaz(path.join(uniteKok, "altin_sayfa", s.id, "kayit.json"), kayit);
    } else {
      yaz(path.join(uniteKok, k.klasor, s.bant, s.id, "kayit.json"), kayit);
    }
  }
  for (const a of aralik) {
    yaz(path.join(uniteKok, "bekleyen", a.id, "kayit.json"), a);
  }
  yaz(path.join(uniteKok, "unite.json"), {
    id: UNITE.id,
    baslik: UNITE.baslik,
    kazanimlar: UNITE.kazanimlar
  });
  return { sayfa: sayfalar.length, dusen, kok: uniteKok };
}

function normlariEsle(beklenen, gelen) {
  return normCevap(beklenen) === normCevap(gelen);
}

module.exports = { yay, normCevap, normlariEsle, bankayiYukle };
