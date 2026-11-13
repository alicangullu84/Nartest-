/* =====================================================================
   NarTES+ Dinamik Soru & Etkinlik Varyant Motoru (Kural Koruyan)
   ===================================================================== */
(function (global) {
  "use strict";

  const SESSION_KEY = "nartes_variant_state_v1";

  function loadSessionMap() {
    try {
      const raw = global.sessionStorage && global.sessionStorage.getItem(SESSION_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (_) {
      return {};
    }
  }

  function saveSessionMap(map) {
    try {
      if (global.sessionStorage) {
        global.sessionStorage.setItem(SESSION_KEY, JSON.stringify(map));
      }
    } catch (_) {}
  }

  // ---- Matematik Yardımcıları ----
  function divisorsOf(n) {
    const num = Math.abs(Math.floor(Number(n) || 0));
    if (num <= 0) return [];
    const low = [];
    const high = [];
    const limit = Math.floor(Math.sqrt(num));
    for (let i = 1; i <= limit; i++) {
      if (num % i === 0) {
        low.push(i);
        const pair = num / i;
        if (pair !== i) high.unshift(pair);
      }
    }
    return low.concat(high);
  }

  function primeFactorizationList(n) {
    let rem = Math.abs(Math.floor(Number(n) || 0));
    const list = [];
    let d = 2;
    while (rem > 1 && d * d <= rem) {
      while (rem % d === 0) {
        list.push(d);
        rem = rem / d;
      }
      d += d === 2 ? 1 : 2;
    }
    if (rem > 1) list.push(rem);
    return list;
  }

  function primeFactorsUnique(n) {
    const seen = [];
    const list = primeFactorizationList(n);
    for (let i = 0; i < list.length; i++) {
      if (seen.indexOf(list[i]) === -1) seen.push(list[i]);
    }
    return seen;
  }

  function primeFactorCountMap(n) {
    const counts = {};
    const list = primeFactorizationList(n);
    for (let i = 0; i < list.length; i++) {
      const p = list[i];
      counts[p] = (counts[p] || 0) + 1;
    }
    return counts;
  }

  function primeFactorizationExpHtml(n) {
    const counts = primeFactorCountMap(n);
    const primes = Object.keys(counts).map(Number).sort((a, b) => a - b);
    if (!primes.length) return String(n);
    return primes
      .map((p) => (counts[p] > 1 ? `${p}<sup>${counts[p]}</sup>` : String(p)))
      .join(" &times; ");
  }

  function primeFactorizationExpText(n) {
    const counts = primeFactorCountMap(n);
    const primes = Object.keys(counts).map(Number).sort((a, b) => a - b);
    if (!primes.length) return String(n);
    return primes.map((p) => (counts[p] > 1 ? `${p}^${counts[p]}` : String(p))).join(" × ");
  }

  function gcd(a, b) {
    let x = Math.abs(Math.floor(Number(a) || 0));
    let y = Math.abs(Math.floor(Number(b) || 0));
    while (y) {
      const t = y;
      y = x % y;
      x = t;
    }
    return x || 1;
  }

  function lcm(a, b) {
    const x = Math.abs(Math.floor(Number(a) || 0));
    const y = Math.abs(Math.floor(Number(b) || 0));
    if (!x || !y) return 0;
    return (x / gcd(x, y)) * y;
  }

  function pickNextIndex(stopId, count, forceNext) {
    if (!count || count <= 1) return 0;
    const map = loadSessionMap();
    const key = String(stopId || "default");
    const entry = map[key] || { idx: -1 };
    let idx = typeof entry.idx === "number" ? entry.idx : -1;
    if (idx < 0) {
      idx = Math.floor(Math.random() * count);
    } else if (forceNext) {
      idx = (idx + 1) % count;
    }
    map[key] = { idx };
    saveSessionMap(map);
    return idx % count;
  }

  function enterStop(stopId, count) {
    return pickNextIndex(stopId, count, true);
  }

  function currentStopVariantIndex(stopId, count) {
    if (!count || count <= 1) return 0;
    const map = loadSessionMap();
    const entry = map[String(stopId || "default")];
    if (!entry || typeof entry.idx !== "number" || entry.idx < 0) {
      return pickNextIndex(stopId, count, true);
    }
    return entry.idx % count;
  }

  function buildPoolWithDistractors(needed, minVal, maxVal, extraCandidates) {
    const out = [];
    const seen = new Set();
    function add(v) {
      const n = Number(v);
      if (!Number.isFinite(n) || seen.has(n)) return;
      seen.add(n);
      out.push(n);
    }
    (needed || []).forEach(add);
    (extraCandidates || []).forEach(add);
    const distractors = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 16, 18, 20, 21, 24, 25, 27, 28, 30, 32, 36, 40, 42, 45, 48, 54, 60, 72];
    for (let i = 0; i < distractors.length && out.length < Math.max(needed.length + 3, 6); i++) {
      const c = distractors[i];
      if (c >= minVal && c <= maxVal) add(c);
    }
    return out.sort((a, b) => a - b).map(String);
  }

  // ---- Kural Koruyan Dinamik Oluşturucular ----
  function makeRainbowStage(n, stageLabel, promptOverride, hintOverride) {
    const divs = divisorsOf(n);
    const len = divs.length;
    const isSquare = len % 2 === 1;
    let blanks;
    if (isSquare) {
      const mid = Math.floor(len / 2);
      const leftIdx = Math.max(1, mid - 1);
      blanks = [leftIdx, mid];
    } else if (len >= 6) {
      blanks = [2, len - 3];
    } else {
      blanks = [1, len - 2];
    }
    const items = divs.map((d, i) => (blanks.indexOf(i) !== -1 ? null : d));
    const needed = blanks.map((bi) => divs[bi]);
    const pool = buildPoolWithDistractors(needed, 2, n - 1, [needed[0] + 1, Math.max(2, needed[0] - 1), needed[needed.length - 1] + 2]);
    return {
      title: stageLabel || `${n} Sayısının Çarpan Gökkuşağı`,
      target: n,
      prompt:
        promptOverride ||
        `${n} sayısının küçükten büyüğe dizilmiş çarpanlarında baştan ve sondan çarpımları ${n} olan eksikleri yerleştir:`,
      items,
      pool,
      hint:
        hintOverride ||
        (isSquare
          ? `${n} bir tam kare sayıdır! Ortadaki tek çarpan kendisiyle çarpılarak ${n} verir.`
          : `Her gökkuşağı yayı ${n} vermelidir: baştan ve sondan karşılıklı çarp!`)
    };
  }

  function makeSquareRectQuestion(n) {
    const divs = divisorsOf(n);
    const pairCount = Math.ceil(divs.length / 2);
    const isSquare = divs.length % 2 === 1;
    const pairList = [];
    for (let i = 0; i < pairCount; i++) {
      pairList.push(`${divs[i]}×${divs[divs.length - 1 - i]}`);
    }
    const wrong1 = Math.max(1, pairCount - 1);
    const wrong2 = pairCount + 1;
    const wrong3 = divs.length;
    const choices = [
      `${wrong1} farklı dikdörtgen`,
      `${pairCount} farklı dikdörtgen`,
      `${wrong2} farklı dikdörtgen`,
      `${wrong3} farklı dikdörtgen`
    ];
    return {
      prompt: `${n} adet birim kareden alanları ${n} br² olacak şekilde kaç farklı dikdörtgen (kare dahil) oluşturulabilir?`,
      choices,
      correctIndex: 1,
      feedback: `${n} sayısının pozitif çarpan çiftleri (${pairList.join(", ")}) olduğundan ${pairCount} farklı dikdörtgen çizilir${isSquare ? " (biri karedir)" : ""}.`,
      hint: `${n} sayısını iki doğal sayının çarpımı şeklinde kaç farklı yolla yazabileceğini bul!`
    };
  }

  function makeKatLadderStage(baseNum, startCount, totalCount) {
    const seq = [];
    for (let k = 1; k <= totalCount; k++) seq.push(baseNum * k);
    const blankIndices = [];
    for (let k = startCount; k < totalCount; k++) blankIndices.push(k);
    const items = seq.map((val, i) => (i < startCount ? val : null));
    const needed = blankIndices.map((i) => seq[i]);
    const extras = [
      needed[0] - Math.max(1, Math.floor(baseNum / 2)),
      needed[0] + Math.max(2, Math.floor(baseNum / 3)),
      needed[needed.length - 1] + baseNum
    ];
    const pool = buildPoolWithDistractors(needed, baseNum, seq[seq.length - 1] + baseNum * 2, extras);
    return {
      title: `${baseNum}'in Kat Merdiveni`,
      base: baseNum,
      prompt: `${baseNum}'in ilk ${totalCount} doğal sayı katını sırayla tamamla:`,
      items,
      pool,
      hint: `Her basamakta bir önceki sayıya +${baseNum} ekle!`
    };
  }

  function makeFactorTreeParts(n) {
    // Dengeli ikili asal çarpan ağacı (tüm yapraklar asal)
    function splitBalanced(val) {
      const pf = primeFactorizationList(val);
      if (pf.length <= 1) return { val, isPrime: true };
      const half = Math.floor(pf.length / 2);
      let leftVal = 1;
      for (let i = 0; i < half; i++) leftVal *= pf[i];
      let rightVal = val / leftVal;
      // Küçük asal solda kalacak şekilde düzenle
      if (leftVal > rightVal && primeFactorizationList(leftVal).length === 1) {
        const tmp = leftVal;
        leftVal = rightVal;
        rightVal = tmp;
      }
      return {
        val,
        isPrime: false,
        left: splitBalanced(leftVal),
        right: splitBalanced(rightVal)
      };
    }
    return splitBalanced(n);
  }

  function makeAlgoRows(n) {
    const primes = primeFactorizationList(n);
    const rows = [];
    let cur = n;
    for (let i = 0; i < primes.length; i++) {
      const p = primes[i];
      rows.push({ dividend: cur, divisor: p, next: cur / p });
      cur = cur / p;
    }
    return rows;
  }

  function make5MethodSet(n) {
    const divs = divisorsOf(n);
    const uniqPrimes = primeFactorsUnique(n);
    const allPrimes = primeFactorizationList(n);
    const expText = primeFactorizationExpText(n);
    const expHtml = primeFactorizationExpHtml(n);

    // 1) Gökkuşağı
    const rainbow = makeRainbowStage(
      n,
      `1. Yöntem • ${n}'in Çarpan Gökkuşağı`,
      `${n}'in tüm pozitif çarpanlarını küçükten büyüğe eşleştirerek eksikleri tamamla:`,
      `Karşılıklı her iki sayının çarpımı ${n} olmalıdır!`
    );

    // 2) Çarpan Çiçeği (özellikle 2 farklı asalı olan sayılarda net yapraklar; genel durumda da çalışır)
    const leafCount = divs.length;
    const primeLeaves = uniqPrimes;
    const compositeNon1 = divs.filter((d) => d > 1 && uniqPrimes.indexOf(d) === -1 && d !== n);
    const flowerBlankVals = [uniqPrimes[uniqPrimes.length - 1] || 2, compositeNon1[0] || divs[Math.floor(leafCount / 2)]];
    const flowerPool = buildPoolWithDistractors(
      flowerBlankVals,
      2,
      n,
      [uniqPrimes[0], compositeNon1[1] || Math.floor(n / 2), n - 1]
    );

    // 3) Asal Çarpan Ağacı
    const tree = makeFactorTreeParts(n);

    // 4) Bölen Listesi (Algoritma)
    const algoRows = makeAlgoRows(n);

    // 5) Üslü İfade Sentezi
    const synthPrompt = `${n} sayısının asal çarpanlarının çarpımı (üslü ifade) biçimindeki doğru gösterimini seç:`;
    const p0 = uniqPrimes[0] || 2;
    const p1 = uniqPrimes[1] || 3;
    const counts = primeFactorCountMap(n);
    const c0 = counts[p0] || 1;
    const c1 = counts[p1] || 1;
    const d1 = expText.replace(`${p0}^${c0}`, `${p0}^${c0 + 1}`).replace(new RegExp(`^${p0}(?!\\^)`), `${p0}^2`);
    const d2 = uniqPrimes.length >= 2
      ? `${p0}^${c1} × ${p1}^${c0}`
      : `${p0}^${c0 + 1}`;
    const d3 = uniqPrimes.map((p) => `${p}^2`).join(" × ");
    const synthSet = [expText];
    [d1, d2, d3, `${p0} × ${p1} × ${n}`].forEach((cand) => {
      if (cand && synthSet.indexOf(cand) === -1 && synthSet.length < 4) synthSet.push(cand);
    });
    while (synthSet.length < 4) {
      synthSet.push(`${p0}^${synthSet.length + 1} × ${p1}`);
    }
    const synthChoices = [synthSet[1], synthSet[0], synthSet[2], synthSet[3]];

    return {
      target: n,
      divisors: divs,
      uniquePrimes: uniqPrimes,
      allPrimes,
      expText,
      expHtml,
      rainbow,
      flower: {
        target: n,
        divisors: divs,
        uniquePrimes: uniqPrimes,
        blankValues: flowerBlankVals,
        pool: flowerPool,
        hint: `${n} çiçeğinin renkli yaprakları asal çarpanlarıdır (${uniqPrimes.join(" ve ")}). Her yaprak ${n}'i tam böler.`
      },
      tree: {
        target: n,
        root: tree,
        hint: `Dallardaki iki sayının çarpımı bir üstteki düğümü vermelidir.`
      },
      algo: {
        target: n,
        rows: algoRows,
        hint: `En küçük asal sayıdan (${allPrimes[0]}) başlayarak bölüp sol sütuna bölümü yaz.`
      },
      synth: {
        target: n,
        prompt: synthPrompt,
        choices: synthChoices,
        correctIndex: 1,
        feedback: `Harika! ${n} = ${allPrimes.join(" × ")} = ${expText}.`,
        hint: `Bölen listesinin sağ sütunundaki asalların her birinden kaç tane olduğunu üs olarak yaz.`
      }
    };
  }

  function applyVariantSpec(stop, forceNext) {
    if (!stop || !stop.variantSpec) return stop;
    const spec = stop.variantSpec;
    const pool = spec.pool || [];
    if (!pool.length) return stop;

    const idx = forceNext ? enterStop(stop.id, pool.length) : currentStopVariantIndex(stop.id, pool.length);
    const chosen = pool[idx];
    const cloned = JSON.parse(JSON.stringify(stop));
    cloned._variantIndex = idx;
    cloned._variantTotal = pool.length;

    switch (spec.kind) {
      case "rainbow_multi": {
        const pair = Array.isArray(chosen) ? chosen : [chosen, chosen === 24 ? 36 : 25];
        const a = pair[0];
        const b = pair[1];
        cloned.subtitle = `${a}'ün simetrik çarpanları ile tam kare ${b} sayısının ortanca çarpanını tamamla!`;
        cloned.stages = [
          makeRainbowStage(a, `1. Aşama • ${a} Sayısının Çarpan Kuşağı`),
          makeRainbowStage(b, `2. Aşama • Tam Kare Sayı (${b})`)
        ];
        if (cloned.stages.length > 0 && spec.extraStage) {
          cloned.stages.push(makeRainbowStage(pair[2] || 18, `3. Aşama • ${pair[2] || 18} Çarpanları`));
        }
        break;
      }
      case "factor_tiles_rect": {
        const n = Number(chosen);
        const divs = divisorsOf(n);
        cloned.subtitle = `${n} birim kareden oluşan dikdörtgen ve kare modellerini incele!`;
        cloned.visualData = {
          title: `${n} Birim Karelik Dikdörtgen Modelleri`,
          numbers: divs.map((d) => ({
            val: `${d} × ${n / d}`,
            note: `${d} satır, ${n / d} sütun`,
            prime: d === n / d
          })),
          summary: `${n} sayısının pozitif çarpanları: ${divs.join(", ")} (Toplam ${divs.length} çarpan).`
        };
        const q = makeSquareRectQuestion(n);
        cloned.quickQuestions = [q];
        cloned.quickQuestion = q;
        break;
      }
      case "kat_ladder_multi": {
        const pair = Array.isArray(chosen) ? chosen : [chosen, chosen + 3];
        const a = pair[0];
        const b = pair[1];
        cloned.subtitle = `${a} ve ${b} sayılarının ritmik kat merdivenlerini eksiksiz doldur!`;
        cloned.stages = [
          makeKatLadderStage(a, 2, 6),
          makeKatLadderStage(b, 2, 6)
        ];
        break;
      }
      case "factor_methods_5": {
        const n = Number(chosen);
        const set = make5MethodSet(n);
        cloned.subtitle = `Hedef ${n}: Gökkuşağı, Çarpan Çiçeği, Çarpan Ağacı, Bölen Listesi ve Üslü Sentez!`;
        cloned.methodsData = set;
        break;
      }
      case "prime_algo_steps": {
        const n = Number(chosen);
        const divs = divisorsOf(n);
        const expText = primeFactorizationExpText(n);
        const rows = makeAlgoRows(n);
        const blanks = rows.map((r, i) => ({
          id: `r${i}`,
          left: r.dividend,
          right: r.divisor,
          next: r.next
        }));
        cloned.subtitle = `${n} sayısının çarpan ağacı ve algoritma basamaklarını çöz!`;
        cloned.algoTarget = n;
        cloned.algoRows = blanks;
        cloned.quickQuestions = [
          {
            prompt: `${n} sayısının farklı asal çarpanlarının toplamı kaçtır?`,
            choices: [
              String(primeFactorsUnique(n).reduce((s, x) => s + x, 0) - 2),
              String(primeFactorsUnique(n).reduce((s, x) => s + x, 0)),
              String(primeFactorsUnique(n).reduce((s, x) => s + x, 0) + 3),
              String(divs.length)
            ],
            correctIndex: 1,
            feedback: `Doğru! ${n} = ${expText} olduğu için farklı asal çarpanları ${primeFactorsUnique(n).join(" ve ")} sayılarıdır.`,
            hint: `Algoritma sağ sütununda tekrar etmeyen asal sayıları topla.`
          }
        ];
        break;
      }
      case "venn_ebob": {
        const pair = Array.isArray(chosen) ? chosen : [24, 36];
        const a = pair[0];
        const b = pair[1];
        const g = gcd(a, b);
        const cA = primeFactorCountMap(a);
        const cB = primeFactorCountMap(b);
        const onlyA = [];
        const common = [];
        const onlyB = [];
        const allPrimes = Array.from(new Set(Object.keys(cA).concat(Object.keys(cB)).map(Number))).sort((x, y) => x - y);
        allPrimes.forEach((p) => {
          const ca = cA[p] || 0;
          const cb = cB[p] || 0;
          const minC = Math.min(ca, cb);
          for (let i = 0; i < minC; i++) common.push(p);
          for (let i = minC; i < ca; i++) onlyA.push(p);
          for (let i = minC; i < cb; i++) onlyB.push(p);
        });
        cloned.subtitle = `${a} ve ${b} sayılarının ortak asal çarpanlarını Venn kesim bölgesinde birleştir!`;
        cloned.vennData = {
          leftLabel: `${a} Sayısı`,
          rightLabel: `${b} Sayısı`,
          onlyLeft: onlyA.length ? onlyA : [1],
          common: common.length ? common : [1],
          onlyRight: onlyB.length ? onlyB : [1],
          ebob: g,
          ekok: lcm(a, b),
          formula: `EBOB(${a}, ${b}) = ${common.join(" × ")} = ${g}`
        };
        break;
      }
      case "ebob_ekok_calc": {
        const pair = Array.isArray(chosen) ? chosen : [24, 36];
        const a = pair[0];
        const b = pair[1];
        const g = gcd(a, b);
        const l = lcm(a, b);
        const mode = spec.mode || "ebob";
        if (mode === "ebob") {
          cloned.subtitle = `${a} ve ${b} sayılarının EBOB değerini pratik kurallarla hesapla!`;
          cloned.blanksPrompt = `${a} ve ${b} sayılarının En Büyük Ortak Bölenini (EBOB) belirle:`;
          cloned.slots = [
            { id: "e1", label: `EBOB(${a}, ${b})`, answer: String(g) },
            { id: "e2", label: `${a} ÷ EBOB`, answer: String(a / g) },
            { id: "e3", label: `${b} ÷ EBOB`, answer: String(b / g) }
          ];
          cloned.pool = buildPoolWithDistractors([g, a / g, b / g], 2, Math.max(a, b), [g * 2, Math.max(2, g - 2), l]);
        } else {
          cloned.subtitle = `${a} ve ${b} sayılarının EKOK ve ortak kat basamaklarını hesapla!`;
          cloned.blanksPrompt = `${a} ve ${b} sayılarının En Küçük Ortak Katını (EKOK) ve sonraki iki ortak katını tamamla:`;
          cloned.slots = [
            { id: "k1", label: `EKOK(${a}, ${b})`, answer: String(l) },
            { id: "k2", label: "2. Ortak Kat", answer: String(l * 2) },
            { id: "k3", label: "3. Ortak Kat", answer: String(l * 3) }
          ];
          cloned.pool = buildPoolWithDistractors([l, l * 2, l * 3], 6, l * 3 + 12, [g, a + b, l + a]);
        }
        break;
      }
      default:
        break;
    }
    return cloned;
  }

  function resolveStop(stop, options) {
    if (!stop) return stop;
    const forceNext = Boolean(options && options.next);
    if (Array.isArray(stop.variants) && stop.variants.length > 0) {
      const idx = forceNext ? enterStop(stop.id, stop.variants.length) : currentStopVariantIndex(stop.id, stop.variants.length);
      const patch = stop.variants[idx];
      const merged = Object.assign({}, JSON.parse(JSON.stringify(stop)), JSON.parse(JSON.stringify(patch)));
      merged._variantIndex = idx;
      merged._variantTotal = stop.variants.length;
      return merged;
    }
    if (stop.variantSpec) {
      return applyVariantSpec(stop, forceNext);
    }
    return stop;
  }

  function resolveSmartboardStop(stop, options) {
    if (!stop) return stop;
    const forceNext = Boolean(options && options.next);
    if (Array.isArray(stop.variantPacks) && stop.variantPacks.length > 0) {
      const idx = forceNext ? enterStop(stop.id, stop.variantPacks.length) : currentStopVariantIndex(stop.id, stop.variantPacks.length);
      const pack = stop.variantPacks[idx];
      const merged = Object.assign({}, JSON.parse(JSON.stringify(stop)));
      merged.questions = JSON.parse(JSON.stringify(pack.questions || stop.questions || []));
      if (pack.title) merged.title = pack.title;
      merged._variantIndex = idx;
      merged._variantTotal = stop.variantPacks.length;
      return merged;
    }
    return stop;
  }

  global.NartesVariantEngine = {
    divisorsOf,
    primeFactorizationList,
    primeFactorsUnique,
    primeFactorCountMap,
    primeFactorizationExpHtml,
    primeFactorizationExpText,
    gcd,
    lcm,
    enterStop,
    resolveStop,
    resolveSmartboardStop,
    makeRainbowStage,
    make5MethodSet,
    makeFactorTreeParts,
    makeAlgoRows
  };
})(window);
