"use strict";

const fs = require("fs");
const path = require("path");
const { BANTLAR, bantSirasi, kaynakSirasi, kazanim, UNITE } = require("./sema");
const { KOK } = require("./yukle");

function sayfaSirasi(a, b) {
  const bant = bantSirasi(a.bant) - bantSirasi(b.bant);
  if (bant) return bant;
  const kaynak = kaynakSirasi(a.kaynak) - kaynakSirasi(b.kaynak);
  if (kaynak) return kaynak;
  return a.basiliSayfa - b.basiliSayfa;
}

function duraklar(kayitlar, kazanimId) {
  const sayfalar = kayitlar
    .filter((k) => k.tur === "sayfa" && k.kazanimId === kazanimId)
    .sort(sayfaSirasi);
  const liste = [];
  for (const sayfa of sayfalar) {
    const cozuk = (sayfa.sorular || [])
      .filter((s) => s.cevap != null && String(s.cevap).trim() !== "")
      .slice()
      .sort((a, b) => String(a.no).localeCompare(String(b.no), "tr"));
    for (const s of cozuk) {
      liste.push({
        tur: "soru",
        id: `${sayfa.id}-s${s.no}`,
        sayfaId: sayfa.id,
        no: String(s.no),
        kazanimId,
        bant: sayfa.bant,
        kaynak: sayfa.kaynak,
        basiliSayfa: sayfa.basiliSayfa,
        kok: s.kok,
        cevap: s.cevap,
        gorsel: sayfa.gorsel,
        altinBilgiId: s.altinBilgiId
      });
    }
    const kalanVar = sayfa.soruSayisi == null || cozuk.length < sayfa.soruSayisi || cozuk.length === 0;
    if (cozuk.length === 0) {
      liste.push({
        tur: "sayfa",
        rol: "tam",
        id: sayfa.id,
        kazanimId,
        bant: sayfa.bant,
        kaynak: sayfa.kaynak,
        basiliSayfa: sayfa.basiliSayfa,
        baslik: sayfa.baslik,
        gorsel: sayfa.gorsel,
        altinBilgiId: sayfa.altinBilgiId
      });
    } else if (kalanVar) {
      liste.push({
        tur: "sayfa",
        rol: "kalan",
        id: sayfa.id,
        kazanimId,
        bant: sayfa.bant,
        kaynak: sayfa.kaynak,
        basiliSayfa: sayfa.basiliSayfa,
        baslik: `${sayfa.baslik} — çözüm anahtarı işlenmemiş sorular`,
        gorsel: sayfa.gorsel,
        altinBilgiId: sayfa.altinBilgiId
      });
    }
  }
  return liste;
}

function indeksYaz(bank) {
  const hedef = path.join(KOK, "indeks", UNITE.id);
  fs.rmSync(hedef, { recursive: true, force: true });
  fs.mkdirSync(hedef, { recursive: true });
  const ozet = [];
  for (const k of UNITE.kazanimlar) {
    const liste = duraklar(bank.kayitlar, k.id);
    const anlatim = bank.kayitlar.filter((x) => x.tur === "anlatim" && x.kazanimId === k.id);
    const etkinlik = bank.kayitlar.filter((x) => x.tur === "etkinlik" && x.kazanimId === k.id);
    const altin = bank.kayitlar
      .filter((x) => x.tur === "altin" && x.kazanimId === k.id)
      .sort((a, b) => a.sira - b.sira);
    const dosya = {
      kazanimId: k.id,
      baslik: k.baslik,
      kod: k.kod,
      altin: altin.map((a) => a.id),
      anlatim: anlatim.map((a) => a.id),
      etkinlik: etkinlik.map((a) => a.id),
      durak: liste.length,
      bantlar: BANTLAR.map((b) => ({
        bant: b,
        durak: liste.filter((d) => d.bant === b).length
      })),
      liste
    };
    fs.writeFileSync(path.join(hedef, `${k.id}.json`), JSON.stringify(dosya, null, 2), "utf8");
    ozet.push({
      id: k.id,
      baslik: k.baslik,
      altin: altin.length,
      anlatim: anlatim.length,
      etkinlik: etkinlik.length,
      durak: liste.length,
      cozumlu: liste.filter((d) => d.tur === "soru").length,
      sayfa: liste.filter((d) => d.tur === "sayfa").length
    });
  }
  const bekleyen = bank.kayitlar.filter((k) => k.tur === "aralik");
  fs.writeFileSync(
    path.join(hedef, "unite.json"),
    JSON.stringify({ id: UNITE.id, baslik: UNITE.baslik, kazanimlar: ozet, bekleyen }, null, 2),
    "utf8"
  );
  return { ozet, bekleyen, hedef };
}

function bantArtan(liste) {
  let once = -1;
  for (const d of liste) {
    const s = bantSirasi(d.bant);
    if (s < once) return false;
    once = s;
  }
  return true;
}

module.exports = { duraklar, indeksYaz, bantArtan, sayfaSirasi, kazanim };
