"use strict";

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const { yay } = require("./yay");
const { bankayiYukle, KOK } = require("./yukle");
const { indeksYaz, bantArtan, duraklar } = require("./indeks");
const { yanlisKitabi } = require("./yanlis");
const { metawordBolumu } = require("./metaword");
const { pdfYolu } = require("./ayikla");
const { UNITE } = require("./sema");

function kes(kod, bas, bit, dpi) {
  const hedef = path.join(KOK, "gorseller", kod);
  fs.mkdirSync(hedef, { recursive: true });
  const onek = path.join(hedef, "ham");
  const sonuc = spawnSync(
    "pdftoppm",
    ["-f", String(bas), "-l", String(bit), "-r", String(dpi || 130), "-png", pdfYolu(kod), onek],
    { encoding: "utf8" }
  );
  if (sonuc.status !== 0) {
    throw new Error(sonuc.stderr || "pdftoppm başarısız");
  }
  const bank = bankayiYukle();
  let adet = 0;
  for (const dosya of fs.readdirSync(hedef)) {
    const m = dosya.match(/^ham-(\d+)\.png$/);
    if (!m) continue;
    const pdfSayfa = Number(m[1]);
    const sayfa = [...bank.sayfa.values()].find((s) => s.kaynak === kod && s.pdfSayfa === pdfSayfa);
    const ad = sayfa
      ? `p${String(sayfa.basiliSayfa).padStart(3, "0")}.png`
      : `p${String(pdfSayfa).padStart(3, "0")}.png`;
    fs.renameSync(path.join(hedef, dosya), path.join(hedef, ad));
    adet += 1;
  }
  return adet;
}

function kontrol(bank) {
  const hatalar = [];
  const idler = new Set([...bank.altin.keys()]);
  function bak(kayit, liste, yer) {
    for (const id of liste || []) {
      if (!idler.has(id)) hatalar.push(`${yer} bilinmeyen kart ${id}`);
    }
  }
  for (const k of bank.kayitlar) {
    if (k.tur === "soru" || k.tur === "anlatim" || k.tur === "etkinlik" || k.tur === "sayfa" || k.tur === "altin_sayfa") {
      bak(k, k.altinBilgiId, k.id);
    }
    if (k.tur === "sayfa") {
      for (const s of k.sorular || []) bak(s, s.altinBilgiId, `${k.id} s${s.no}`);
    }
  }
  for (const kaz of UNITE.kazanimlar) {
    const liste = duraklar(bank.kayitlar, kaz.id);
    if (!bantArtan(liste)) hatalar.push(`${kaz.id} bant sırası bozuldu`);
  }
  const p11 = yanlisKitabi(bank, "mw-p011", "1", "B");
  if (!p11.dogru) hatalar.push("mw-p011 soru 1, B doğru olmalıydı");
  const yanlis = yanlisKitabi(bank, "mw-p011", "1", "A");
  if (yanlis.dogru !== false) hatalar.push("mw-p011 soru 1, A yanlış olmalıydı");
  if (!yanlis.oncelik || yanlis.oncelik.kod !== "olabilir-sannma") {
    hatalar.push("yanlış şık altın uyarıyı açmadı");
  }
  const bolum = metawordBolumu(bank, "k01");
  if (!bolum.blok.altin.length) hatalar.push("k01 altın kartı yok");
  if (bolum.sira[0] !== "altin") hatalar.push("Metaword sırası altın ile başlamıyor");
  const mw = bank.kayitlar.filter((k) => k.kaynak === "mw" && k.tur === "sayfa");
  if (!mw.some((s) => s.id === "mw-p009" && s.sorular.length)) hatalar.push("mw-p009 çözümsüz kaldı");
  if (mw.some((s) => s.basiliSayfa >= 45)) hatalar.push("Metaword ayıklama üslü ifadeye taştı");
  const sh = bank.kayitlar.filter((k) => k.kaynak === "sh");
  if (!sh.some((s) => s.id === "sh-p009" && s.sorular.length)) hatalar.push("sh-p009 çözümsüz kaldı");
  if (!sh.some((s) => s.id === "sh-p008" && s.tur === "altin_sayfa")) hatalar.push("sh-p008 altın sayfası değil");
  if (sh.some((s) => s.basiliSayfa >= 43)) hatalar.push("Soru Hazinesi ayıklama üslü ifadeye taştı");
  const cozumlu = bank.kayitlar.reduce((n, k) => n + ((k.sorular || []).length), 0);
  if (cozumlu < 30) hatalar.push(`çözümlü soru az: ${cozumlu}`);
  return { hatalar, cozumlu, mw: mw.length, sh: sh.length };
}

function yazdirListe(bank, kazanimId) {
  const liste = duraklar(bank.kayitlar, kazanimId);
  const satir = liste.map((d) => {
    if (d.tur === "soru") return `${d.bant}  ${d.id}  cevap ${d.cevap}`;
    return `${d.bant}  ${d.id}  ${d.rol}  ${d.baslik}`;
  });
  return satir.join("\n");
}

function main(argv) {
  const komut = argv[2] || "kur";
  if (komut === "kur") {
    const yaySonuc = yay();
    const bank = bankayiYukle();
    const indeks = indeksYaz(bank);
    const sonuc = kontrol(bank);
    console.log(JSON.stringify({
      sayfa: yaySonuc.sayfa,
      dusenCozum: yaySonuc.dusen,
      cozumlu: sonuc.cozumlu,
      metawordSayfa: sonuc.mw,
      hazineSayfa: sonuc.sh,
      kazanim: indeks.ozet,
      bekleyen: indeks.bekleyen.map((b) => b.id),
      hata: sonuc.hatalar
    }, null, 2));
    if (yaySonuc.dusen.length || sonuc.hatalar.length) process.exit(1);
    return;
  }
  if (komut === "liste") {
    const bank = bankayiYukle();
    console.log(yazdirListe(bank, argv[3] || "k01"));
    return;
  }
  if (komut === "yanlis") {
    const bank = bankayiYukle();
    console.log(JSON.stringify(yanlisKitabi(bank, argv[3], argv[4], argv[5]), null, 2));
    return;
  }
  if (komut === "metaword") {
    const bank = bankayiYukle();
    const bolum = metawordBolumu(bank, argv[3] || "k01");
    console.log(JSON.stringify({
      kazanimId: bolum.kazanimId,
      sira: bolum.sira,
      altin: bolum.blok.altin.map((a) => a.baslik),
      anlatim: bolum.blok.anlatim.map((a) => a.baslik),
      etkinlik: bolum.blok.etkinlik.map((a) => a.baslik),
      soruDurak: bolum.blok.soru.length
    }, null, 2));
    return;
  }
  if (komut === "kes") {
    const adet = kes(argv[3], Number(argv[4]), Number(argv[5]), Number(argv[6] || 130));
    console.log(JSON.stringify({ kesilen: adet }));
    return;
  }
  console.log("Komutlar: kur, liste <k01>, yanlis <sayfa> <no> <cevap>, metaword <k01>, kes <kaynak> <ilk> <son> [dpi]");
  process.exit(1);
}

main(process.argv);
