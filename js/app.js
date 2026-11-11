// ============================================================================
// MatFlow — 8. Sınıf LGS 12 Ünite (360 Durak) Etkileşimli Pencere Akış Motoru
// ============================================================================

(function () {
  const unit1 = window.MATFLOW_UNIT;
  unit1.badgeCells = ["1","2","3","4","5","6","7","8","9","10","11","12"];
  const units2to12 = window.MATFLOW_UNITS_2_12 || [];
  const ALL_UNITS = [unit1, ...units2to12];

  // Alt başlık (kazanım) sonlarına tanımlanan Akıllı Tahta Soru Çözüm duraklarını otomatik yerleştir
  function injectSmartboardStopsIntoUnits(units) {
    const bank = window.NARTES_SMARTBOARD_BANK || {};
    units.forEach(unit => {
      if (!unit || unit._smartboardInjected) return;
      const unitBank = bank[unit.id];
      if (!unitBank) return;

      const rebuiltStops = [];
      (unit.kazanimlar || []).forEach(kaz => {
        const currentKazStops = (unit.stops || []).filter(s => s.kazanimId === kaz.id);
        currentKazStops.forEach(s => rebuiltStops.push(s));

        const sbEntry = unitBank[kaz.id];
        if (sbEntry && Array.isArray(sbEntry.questions) && sbEntry.questions.length > 0) {
          rebuiltStops.push({
            id: 0,
            kazanimId: kaz.id,
            type: "smartboard",
            icon: "✏️",
            typeLabel: "Akıllı Tahta Soru Çözümü",
            title: sbEntry.title || `Konu Sonu Akıllı Tahta: ${kaz.title}`,
            subtitle: sbEntry.subtitle || "Bu alt başlığı tamamlamak için kaleminle akıllı tahtada soruları çöz!",
            questions: sbEntry.questions
          });
        }
      });

      rebuiltStops.forEach((s, idx) => {
        s.id = idx + 1;
      });
      unit.stops = rebuiltStops;
      (unit.kazanimlar || []).forEach(kaz => {
        kaz.stops = rebuiltStops.filter(s => s.kazanimId === kaz.id).map(s => s.id);
      });
      unit._smartboardInjected = true;
    });
  }
  injectSmartboardStopsIntoUnits(ALL_UNITS);

  const STORAGE_KEY_ALL = "matflow_lgs_12units_v1";
  const LEGACY_KEY_U1 = "matflow_progress_m8_u1_v1";

  let state = {
    currentUnitNo: 1,
    // unitProgress[unitId] = { currentStopId: 1, completedStops: [] }
    unitProgress: {},
    soundEnabled: true,
    voiceEnabled: false,
    teacherUnlock: false,
    autoAdvanceTimer: null
  };

  function getActiveUnit() {
    return ALL_UNITS.find(u => u.unitNo === state.currentUnitNo) || ALL_UNITS[0];
  }

  function getUnitState(unit) {
    const u = unit || getActiveUnit();
    if (!state.unitProgress[u.id]) {
      state.unitProgress[u.id] = { currentStopId: 1, completedStops: [] };
    }
    return state.unitProgress[u.id];
  }

  // ==========================================================================
  // CİHAZ ALGILAMA VE DUYARLI DÜZEN MODU (Telefon / Tablet / Bilgisayar)
  // ==========================================================================
  function updateDeviceMode() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const minDim = Math.min(w, h);
    const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    const ua = navigator.userAgent || '';
    const isMobileUA = /Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
    const isIPad = /iPad/i.test(ua) || (isTouch && /Macintosh/i.test(ua) && minDim >= 600);

    let device = 'desktop';
    if ((isMobileUA && !isIPad) || (isTouch && minDim <= 520) || w <= 640) {
      device = 'phone';
    } else if (isIPad || (isTouch && minDim > 520) || (w > 640 && w <= 1080)) {
      device = 'tablet';
    } else {
      device = 'desktop';
    }

    const orientation = currentOrientation();

    document.documentElement.setAttribute('data-device', device);
    document.documentElement.setAttribute('data-orientation', orientation);

    if (document.body) {
      document.body.classList.remove('device-phone', 'device-tablet', 'device-desktop', 'is-portrait', 'is-landscape');
      document.body.classList.add('device-' + device, 'is-' + orientation);
    }

    return { device, orientation };
  }

  function currentOrientation() {
    if (window.matchMedia) {
      if (window.matchMedia('(orientation: portrait)').matches) return 'portrait';
      if (window.matchMedia('(orientation: landscape)').matches) return 'landscape';
    }
    return window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
  }

  function syncVisualViewport() {
    const root = document.documentElement;
    const vv = window.visualViewport;
    const height = vv ? vv.height : window.innerHeight;
    const width = vv ? vv.width : window.innerWidth;
    const offsetTop = vv ? vv.offsetTop : 0;
    const offsetLeft = vv ? vv.offsetLeft : 0;
    root.style.setProperty('--app-height', Math.round(height) + 'px');
    root.style.setProperty('--app-width', Math.round(width) + 'px');
    root.style.setProperty('--vv-offset-top', Math.round(offsetTop) + 'px');
    root.style.setProperty('--vv-offset-left', Math.round(offsetLeft) + 'px');
  }

  // Web Audio API ile Temiz Ses Efektleri
  let audioCtx = null;
  function playTone(type) {
    if (!state.soundEnabled) return;
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const now = audioCtx.currentTime;
      if (type === "click") {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.exponentialRampToValueAtTime(680, now + 0.06);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.07);
      } else if (type === "success") {
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, now + idx * 0.07);
          gain.gain.setValueAtTime(0.11, now + idx * 0.07);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.22);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now + idx * 0.07);
          osc.stop(now + idx * 0.07 + 0.22);
        });
      } else if (type === "error") {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(210, now);
        osc.frequency.linearRampToValueAtTime(150, now + 0.18);
        gain.gain.setValueAtTime(0.09, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.2);
      }
    } catch (e) {}
  }

  function speakText(text) {
    if (!state.voiceEnabled || !("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.cancel();
      const clean = text.replace(/<[^>]+>/g, "");
      const utter = new SpeechSynthesisUtterance(clean);
      utter.lang = "tr-TR";
      utter.rate = 1.02;
      window.speechSynthesis.speak(utter);
    } catch (e) {}
  }

  // ==========================================================================
  // KATEX MATEMATİKSEL İFADE DÖNÜŞTÜRÜCÜ VE RENDER MOTORU
  // ==========================================================================
  const SUP_MAP = {
    "⁰": "0", "¹": "1", "²": "2", "³": "3", "⁴": "4",
    "⁵": "5", "⁶": "6", "⁷": "7", "⁸": "8", "⁹": "9",
    "⁻": "-", "⁺": "+", "ⁿ": "n", "ᵃ": "a", "ᵇ": "b",
    "ˣ": "x", "ʸ": "y", "ᵏ": "k", "ᵐ": "m"
  };

  // Eşitsizliklerdeki (< ve >) işaretlerinin HTML etiketi sanılıp yutulmasını önler
  function safeMathHtml(raw) {
    return String(raw || "").replace(/<(?![\/!]?(?:strong|em|b|i|u|br|span|sub|sup|p|div|button)\b)/gi, "&lt;");
  }

  function unicodeMathToLatex(expr, forceBold) {
    let s = String(expr);
    // Üslü karakter dizilerini ^{...} biçimine çevir
    s = s.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺ⁿᵃᵇˣʸᵏᵐ]+/g, (m) => {
      const converted = m.split("").map(ch => SUP_MAP[ch] || ch).join("");
      return `^{${converted}}`;
    });
    // Karekök: √(a+b) veya 6√2 veya a√b veya √72
    s = s.replace(/√\(([^)]+)\)/g, "\\sqrt{$1}");
    s = s.replace(/√([0-9a-zA-Z^{}+-]+)/g, "\\sqrt{$1}");
    // EBOB / EKOK
    s = s.replace(/\b(EBOB|EKOK)\s*\(/g, "\\textbf{$1}(");
    // Ölçü birimlerini tek geçişte kalın (\textbf{...}) yap (çift sarmalamayı önler ve sayı-birim boşluğunu korur)
    s = s.replace(/(^|[0-9)}\],]|\s+)(br|cm|mm|km|dm|m|kg|g|mg|L|mL|dk|sn|saat)(?=(?:\^\{[0-9]+\})?(?:$|[^a-zA-ZçğıöşüÇĞİÖŞÜ]))/g, (full, pre, unit) => {
      // Tek başına "m" veya "g" harfini yalnızca sayıdan veya üsten hemen sonra birim yap (m + n gibi cebirsel harfleri bozmasın)
      const trimmedPre = pre.replace(/\s+$/, "");
      const hadSpace = /\s/.test(pre);
      if ((unit === "m" || unit === "g") && !/[0-9)}\]]/.test(trimmedPre) && !hadSpace && !new RegExp("^" + unit + "\\^").test(full.slice(pre.length))) {
        return full;
      }
      if (/[0-9)}\]]/.test(trimmedPre) || hadSpace) {
        return `${trimmedPre}\\,\\textbf{${unit}}`;
      }
      return `${pre}\\textbf{${unit}}`;
    });
    // Tek başına m² / m³ gibi birimler
    s = s.replace(/(^|[^a-zA-ZçğıöşüÇĞİÖŞÜ0-9\\}])(m)(?=\^\{[23]\})/g, "$1\\textbf{$2}");
    // Kalın birimlerin üslerini de kalın yap (\textbf{br}^{2} -> \textbf{br}^{\mathbf{2}})
    s = s.replace(/(\\textbf\{[a-zA-Z]+\})\^\{([0-9]+)\}/g, "$1^{\\mathbf{$2}}");
    // Semboller
    s = s.replace(/≤/g, " \\le ")
         .replace(/≥/g, " \\ge ")
         .replace(/≠/g, " \\ne ")
         .replace(/×/g, " \\times ")
         .replace(/÷/g, " \\div ")
         .replace(/·/g, " \\cdot ")
         .replace(/−/g, " - ")
         .replace(/π/g, "\\pi ")
         .replace(/°/g, "^{\\circ}");
    if (forceBold) {
      // KaTeX'te rakamların KaTeX_Main-Bold ile tam kalın çıkması için dışarıdaki rakam dizilerini \mathbf{...} içine al
      const boldDigits = s.replace(/(\\(?:textbf|mathbf|sqrt)\{[^{}]*\})|([0-9]+)/g, (m, cmd, num) => {
        return cmd ? cmd : `\\mathbf{${num}}`;
      });
      return `\\boldsymbol{${boldDigits}}`;
    }
    return s;
  }

  // Şık, Buton ve Chip İçerikleri İçin KaTeX HTML Üretici
  function renderOptionMath(rawText) {
    const str = String(rawText).trim();
    if (!window.katex) return safeMathHtml(str);

    const hasMathSymbol = /[0-9√⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺ⁿᵃᵇˣʸᵏᵐ≤≥≠×÷·−π°=<>+\-*/^()]/.test(str);
    const strippedWords = str.replace(/\b(EBOB|EKOK|br|cm|mm|km|dm|m|kg|g|mg|L|mL|dk|sn|saat|veya|ile|ve)\b/g, "");
    const hasTurkishLetters = /[a-zA-ZçğıöşüÇĞİÖŞÜ]{3,}/.test(strippedWords);

    if (hasMathSymbol && !hasTurkishLetters) {
      const latex = unicodeMathToLatex(str, true);
      try {
        return window.katex.renderToString(latex, { throwOnError: false, displayMode: false });
      } catch (e) {
        return safeMathHtml(str);
      }
    }
    return upgradeInlineMathInText(str, true);
  }

  // Metin içindeki matematiksel ifadeleri ve ölçü birimlerini (br, br², cm², m² vb.) kitap dizgisi kalitesinde kalın KaTeX HTML'ine çevirir.
  function upgradeInlineMathInText(text, forceBold) {
    if (!window.katex) return safeMathHtml(text);
    const source = String(text);
    if (source.includes("katex")) return source;

    const shields = [];
    const shield = (html) => {
      const token = "\u0000KATEX" + shields.length + "\u0000";
      shields.push(html);
      return token;
    };
    const renderPiece = (raw) => {
      // Baştaki/sondaki boşlukları, cümle sonu noktalamayı ve eşleşmemiş dış parantezleri matematik kutusunun dışında bırak
      let lead = "";
      let core = String(raw);
      let trail = "";

      while (/^\s/.test(core)) {
        lead += core[0];
        core = core.slice(1);
      }
      while (/\s$/.test(core)) {
        trail = core.slice(-1) + trail;
        core = core.slice(0, -1);
      }
      while (/[.,:;!?]$/.test(core)) {
        trail = core.slice(-1) + trail;
        core = core.slice(0, -1);
      }
      while (/\s$/.test(core)) {
        trail = core.slice(-1) + trail;
        core = core.slice(0, -1);
      }
      const openCount = (core.match(/\(/g) || []).length;
      const closeCount = (core.match(/\)/g) || []).length;
      if (openCount > closeCount && core.startsWith("(")) {
        lead += "(";
        core = core.slice(1);
      } else if (closeCount > openCount && core.endsWith(")")) {
        trail = ")" + trail;
        core = core.slice(0, -1);
      }
      if (!core.trim()) return raw;
      try {
        return lead + shield(window.katex.renderToString(unicodeMathToLatex(core, Boolean(forceBold)), { throwOnError: false, displayMode: false })) + trail;
      } catch (e) {
        return raw;
      }
    };

    let out = source;
    // 1) EBOB(...) / EKOK(...)
    out = out.replace(/\b(EBOB|EKOK)\([0-9a-zA-Z,\s+-]+\)(\s*=\s*[0-9a-zA-Z·×^{}+-]+)?/g, (m) => renderPiece(m));

    // 2) Sayı / karekök / parantez + ölçü birimi: "(9x² + 30x + 25) cm²", "√20 cm", "3√5 cm", "24 br²", "36 m²", "48 dm"
    out = out.replace(/(^|[^a-zA-ZçğıöşüÇĞİÖŞÜ0-9√\u0000])(\([^()]+\)\s*(?:br|cm|mm|km|dm|m)[²³]?|(?:[0-9]+(?:[.,][0-9]+)?)?√[0-9a-zA-Z]+\s*(?:br|cm|mm|km|dm|m|kg|g|L|mL|dk|sn|saat)[²³]?|[0-9]+(?:[.,][0-9]+)?[⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺ⁿᵃᵇˣʸ]*\s*(?:br|cm|mm|km|dm|m|kg|g|mg|L|mL|dk|sn|saat)[²³]?)(?![a-zA-ZçğıöşüÇĞİÖŞÜ])/g, (full, pre, expr) => {
      return pre + renderPiece(expr);
    });

    // 3) Tek başına birim ifadeleri: "br²", "cm²", "m²", "cm³", "br"
    out = out.replace(/(^|[^a-zA-ZçğıöşüÇĞİÖŞÜ0-9\u0000])((?:br|cm|mm|km|dm|m)[²³]|br)(?![a-zA-ZçğıöşüÇĞİÖŞÜ0-9])/g, (full, pre, expr) => {
      return pre + renderPiece(expr);
    });

    // 4) Koordinat noktaları: A(−3, 4), K'(4, n − 2)
    out = out.replace(/\b([A-Z]'?\(\s*[−+-]?[0-9a-zA-Z+\-\s]+\s*,\s*[−+-]?[0-9a-zA-Z+\-\s]+\s*\))/g, (m) => {
      if (m.indexOf("\u0000") !== -1) return m;
      return renderPiece(m);
    });

    // 5) Genel matematiksel bağıntılar, eşitsizlikler, üslü ve köklü ifadeler (ondalık virgül 0,00045 × 10¹¹ dahil)
    const mathPattern = /(?:[−-]?\s*[0-9a-zA-Z√⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺ⁿᵃᵇˣʸᵏᵐ(),.]+\s*[×·÷−+\-*/=≤≥<>]\s*)+[−-]?\s*[0-9a-zA-Z√⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺ⁿᵃᵇˣʸᵏᵐ().,/]+|[0-9a-zA-Z()]*[√⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺ⁿᵃᵇˣʸᵏᵐπ°][0-9a-zA-Z√⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺ⁿᵃᵇˣʸᵏᵐ().,+\-*/=·×−]*/g;
    out = out.replace(mathPattern, (match) => {
      if (match.indexOf("\u0000") !== -1) return match;
      if (!/[0-9√⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺ⁿᵃᵇˣʸᵏᵐ≤≥≠×÷·−π°=<>]/.test(match)) return match;
      return renderPiece(match);
    });

    shields.forEach((html, index) => {
      out = out.split("\u0000KATEX" + index + "\u0000").join(html);
    });
    return out;
  }

  function applyKaTeX(container) {
    if (!container || !window.katex) return;
    try {
      const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          const tag = parent.tagName.toLowerCase();
          if (tag === "script" || tag === "style" || tag === "svg" || tag === "textarea") {
            return NodeFilter.FILTER_REJECT;
          }
          if (parent.closest(".katex") || parent.closest("svg")) return NodeFilter.FILTER_REJECT;
          if (/[0-9√⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺ⁿᵃᵇˣʸᵏᵐ≤≥≠×÷·−π°=<>]/.test(node.nodeValue) || /(^|[^a-zA-ZçğıöşüÇĞİÖŞÜ])br(?![a-zA-ZçğıöşüÇĞİÖŞÜ])/.test(node.nodeValue)) {
            return NodeFilter.FILTER_ACCEPT;
          }
          return NodeFilter.FILTER_SKIP;
        }
      });

      const nodes = [];
      let current;
      while ((current = walker.nextNode())) {
        nodes.push(current);
      }

      nodes.forEach(textNode => {
        const original = textNode.nodeValue;
        const parentEl = textNode.parentElement;
        const isBoldCtx = Boolean(
          parentEl && parentEl.closest("strong, b, h1, h2, h3, h4, .vcp-question-title, .option-btn, .slot-choice-btn, .blank-slot, .bar-caption, .q-data-chip")
        );
        const upgraded = upgradeInlineMathInText(original, isBoldCtx);
        if (upgraded !== original) {
          const span = document.createElement("span");
          span.className = "math-inline-run";
          span.innerHTML = safeMathHtml(upgraded);
          textNode.parentNode.replaceChild(span, textNode);
        }
      });

      if (window.renderMathInElement) {
        window.renderMathInElement(container, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false },
            { left: "\\(", right: "\\)", display: false }
          ],
          throwOnError: false
        });
      }
    } catch (e) {}
  }

  // Kayıtlı İlerlemeyi Yükle / Kaydet
  function loadState() {
    try {
      const rawAll = localStorage.getItem(STORAGE_KEY_ALL);
      if (rawAll) {
        const parsed = JSON.parse(rawAll);
        if (parsed.unitProgress) state.unitProgress = parsed.unitProgress;
        if (typeof parsed.currentUnitNo === "number") state.currentUnitNo = parsed.currentUnitNo;
      } else {
        // Eski tek ünite kaydı varsa aktar
        const legacy = localStorage.getItem(LEGACY_KEY_U1);
        if (legacy) {
          const p = JSON.parse(legacy);
          state.unitProgress[unit1.id] = {
            currentStopId: p.currentStopId || 1,
            completedStops: Array.isArray(p.completedStops) ? p.completedStops : []
          };
        }
      }
    } catch (e) {}
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY_ALL, JSON.stringify({
        currentUnitNo: state.currentUnitNo,
        unitProgress: state.unitProgress
      }));
    } catch (e) {}
  }

  // Sırayla İlerleme Kuralı
  function getMaxUnlockedStopId(unit) {
    const u = unit || getActiveUnit();
    const uState = getUnitState(u);
    if (state.teacherUnlock) return u.stops.length;
    for (let i = 1; i <= u.stops.length; i++) {
      if (!uState.completedStops.includes(i)) return i;
    }
    return u.stops.length;
  }

  function isStopUnlocked(stopId, unit) {
    if (state.teacherUnlock) return true;
    return stopId <= getMaxUnlockedStopId(unit);
  }

  function isStopDone(stopId, unit) {
    const uState = getUnitState(unit);
    return uState.completedStops.includes(stopId);
  }

  function isKazanimDone(kazanim, unit) {
    return kazanim.stops.every(sId => isStopDone(sId, unit));
  }

  let toastTimeout = null;
  function showToast(msg) {
    const el = document.getElementById("toastMsg");
    if (!el) return;
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => el.classList.remove("show"), 2600);
  }

  // ==========================================================================
  // ÜNİTE DEĞİŞTİRME (1..12 LGS Üniteleri)
  // ==========================================================================
  function switchUnit(unitNo) {
    if (state.autoAdvanceTimer) {
      clearTimeout(state.autoAdvanceTimer);
      state.autoAdvanceTimer = null;
    }
    const targetUnit = ALL_UNITS.find(u => u.unitNo === unitNo);
    if (!targetUnit) return;
    state.currentUnitNo = targetUnit.unitNo;
    saveState();
    playTone("click");
    renderUnitSelector();
    renderSidebar();
    renderRoad();
    renderWindow();
  }

  function renderUnitSelector() {
    const sel = document.getElementById("unitQuickSelect");
    if (!sel) return;
    sel.innerHTML = "";
    ALL_UNITS.forEach(u => {
      const uState = getUnitState(u);
      const doneCount = uState.completedStops.length;
      const isFullDone = doneCount === u.stops.length;
      const opt = document.createElement("option");
      opt.value = u.unitNo;
      opt.selected = u.unitNo === state.currentUnitNo;
      opt.textContent = `${isFullDone ? "🟢" : "🟠"} ${u.unitNo}. Ünite: ${u.title} (${doneCount}/${u.stops.length})`;
      sel.appendChild(opt);
    });

    // 12 Ünite genel toplam ilerleme
    const totalDoneAll = ALL_UNITS.reduce((acc, u) => acc + getUnitState(u).completedStops.length, 0);
    const totalStopsAll = ALL_UNITS.reduce((acc, u) => acc + u.stops.length, 0);
    const totalEl = document.getElementById("topTotalLgsText");
    if (totalEl) {
      totalEl.textContent = `LGS: ${totalDoneAll} / ${totalStopsAll}`;
    }
  }

  // ==========================================================================
  // SOL PANEL (Kapak + Yeşil/Turuncu Kazanım Listesi) Render
  // ==========================================================================
  function renderSidebar() {
    const UNIT = getActiveUnit();
    const uState = getUnitState(UNIT);

    // Sol Üst Kapak Görseli ve Başlık Güncelleme
    const heroEl = document.getElementById("sidebarHero");
    heroEl.style.backgroundImage = `url('${UNIT.coverImage}')`;
    document.getElementById("heroUnitTag").textContent = `8. Sınıf • ${UNIT.unitNo}. Ünite`;
    document.getElementById("heroUnitTitle").textContent = UNIT.title;

    const badgeEl = document.getElementById("heroGridBadge");
    const cells = UNIT.badgeCells || ["1","2","3","4","5","6","7","8","9","10","11","12"];
    badgeEl.innerHTML = cells.slice(0, 12).map(c => `<span>${c}</span>`).join("");

    const listEl = document.getElementById("kazanimList");
    const currentStop = UNIT.stops.find(s => s.id === uState.currentStopId) || UNIT.stops[0];
    const doneKazanimCount = UNIT.kazanimlar.filter(k => isKazanimDone(k, UNIT)).length;
    const todoKazanimCount = UNIT.kazanimlar.length - doneKazanimCount;

    document.getElementById("legendDoneCount").textContent = `${doneKazanimCount} Tamamlandı`;
    document.getElementById("legendTodoCount").textContent = `${todoKazanimCount} Kaldı`;

    listEl.innerHTML = "";
    UNIT.kazanimlar.forEach(kaz => {
      const done = isKazanimDone(kaz, UNIT);
      const isCurrent = currentStop && currentStop.kazanimId === kaz.id;
      const unlocked = isStopUnlocked(kaz.stops[0], UNIT);
      const doneInKaz = kaz.stops.filter(s => isStopDone(s, UNIT)).length;

      const item = document.createElement("div");
      item.className = [
        "kazanim-item",
        done ? "status-done" : "status-todo",
        isCurrent ? "is-current" : "",
        unlocked ? "is-unlocked" : "is-locked"
      ].filter(Boolean).join(" ");

      const dotsHtml = kaz.stops.map(sId => {
        const sDone = isStopDone(sId, UNIT);
        const sCurr = sId === uState.currentStopId;
        return `<span class="kazanim-mini-dot ${sDone ? "done" : ""} ${sCurr ? "active" : ""}"></span>`;
      }).join("");

      let statusLabel = `${doneInKaz}/${kaz.stops.length} Durak`;
      if (done) {
        statusLabel = "Tamamlandı";
      } else if (isCurrent) {
        statusLabel = `Aktif • ${doneInKaz}/${kaz.stops.length}`;
      } else if (!unlocked) {
        statusLabel = `Sırada • 0/${kaz.stops.length}`;
      }

      item.innerHTML = `
        <div class="kazanim-node">${done ? "✓" : kaz.no}</div>
        <div class="kazanim-info">
          <div class="kazanim-title">${kaz.title}</div>
          <div class="kazanim-meta">
            <span class="kazanim-status-txt">${statusLabel}</span>
            <div class="kazanim-mini-dots">${dotsHtml}</div>
          </div>
        </div>
      `;

      item.addEventListener("click", () => {
        const firstStop = kaz.stops[0];
        const firstIncomplete = kaz.stops.find(s => !isStopDone(s, UNIT)) || firstStop;
        const target = isStopUnlocked(firstIncomplete, UNIT) ? firstIncomplete : firstStop;
        if (!isStopUnlocked(target, UNIT)) {
          playTone("error");
          showToast(`🔒 Sırayla ilerlenir! Önce Durak ${getMaxUnlockedStopId(UNIT)} görevini tamamla.`);
          return;
        }
        document.body.classList.remove("sidebar-drawer-open");
        goToStop(target);
      });

      listEl.appendChild(item);
    });

    const totalDone = uState.completedStops.length;
    const pct = Math.round((totalDone / UNIT.stops.length) * 100);
    document.getElementById("topProgressText").textContent = `${totalDone} / ${UNIT.stops.length} Durak (%${pct})`;
    const sidebarMeter = document.getElementById("sidebarUnitMeterFill");
    if (sidebarMeter) sidebarMeter.style.width = `${pct}%`;
    renderUnitSelector();
  }

  function getFriendlyStopShortLabel(stop) {
    if (!stop) return "Durak";
    const tl = String(stop.typeLabel || "");
    if (/Maraton/i.test(tl)) return "Maraton";
    if (stop.type === "concept") return "Keşif";
    if (stop.type === "video") return "Anlatım";
    if (stop.type === "activity") return "Etkinlik";
    if (stop.type === "game") return "Oyun";
    if (stop.type === "question") return "Soru";
    if (stop.type === "smartboard") return "Tahta Testi";
    return tl.split(" ")[0] || "Durak";
  }

  // ==========================================================================
  // ALT KISIM: 30 DURAKLI YOL HARİTASI Render
  // ==========================================================================
  function renderRoad() {
    const UNIT = getActiveUnit();
    const uState = getUnitState(UNIT);
    const roadEl = document.getElementById("roadStops");
    roadEl.innerHTML = "";

    const roadLabel = document.getElementById("roadUnitTitleLabel");
    if (roadLabel) {
      roadLabel.textContent = `${UNIT.unitNo}. Ünite (${UNIT.title}) Yol Haritası — ${UNIT.stops.length} Durak`;
    }

    UNIT.stops.forEach((stop, idx) => {
      const done = isStopDone(stop.id, UNIT);
      const isCurrent = stop.id === uState.currentStopId;
      const unlocked = isStopUnlocked(stop.id, UNIT);

      const wrap = document.createElement("div");
      wrap.className = "road-stop-item";

      if (idx > 0) {
        const prevDone = isStopDone(UNIT.stops[idx - 1].id, UNIT);
        const conn = document.createElement("div");
        conn.className = `road-connector ${prevDone ? "done" : ""} ${unlocked ? "unlocked" : ""}`;
        wrap.appendChild(conn);
      }

      const btn = document.createElement("button");
      btn.className = [
        "road-stop-btn",
        done ? "status-done" : "status-todo",
        isCurrent ? "is-current" : "",
        unlocked ? "is-unlocked" : "is-locked"
      ].filter(Boolean).join(" ");
      btn.id = `road-stop-${stop.id}`;
      btn.title = `${stop.id}. Durak: ${stop.title} (${stop.typeLabel})`;

      btn.innerHTML = `
        <div class="stop-circle">${done ? "✓" : stop.icon}</div>
        <span class="stop-label">${stop.id}. ${getFriendlyStopShortLabel(stop)}</span>
      `;

      btn.addEventListener("click", () => {
        if (!unlocked) {
          playTone("error");
          showToast(`🔒 Sırayla gitmek zorundasın! Önce ${getMaxUnlockedStopId(UNIT)}. durağı tamamla.`);
          return;
        }
        goToStop(stop.id);
      });

      wrap.appendChild(btn);
      roadEl.appendChild(wrap);
    });

    setTimeout(() => {
      const activeBtn = document.getElementById(`road-stop-${uState.currentStopId}`);
      if (activeBtn) {
        activeBtn.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    }, 60);

    const doneCount = uState.completedStops.length;
    const roadPct = Math.round((doneCount / UNIT.stops.length) * 100);
    const roadFill = document.getElementById("roadProgressFill");
    if (roadFill) roadFill.style.width = `${roadPct}%`;
    const roadPctEl = document.getElementById("roadProgressPct");
    if (roadPctEl) roadPctEl.textContent = `%${roadPct}`;

    const maxUnlocked = getMaxUnlockedStopId(UNIT);
    document.getElementById("roadStatusSummary").textContent =
      `Aktif: ${uState.currentStopId}. Durak • Açık: ${maxUnlocked}/${UNIT.stops.length} • Biten: ${doneCount}/${UNIT.stops.length}`;
  }

  // ==========================================================================
  // DURAĞA GEÇİŞ (Yatay Pencere Kayma Animasyonu)
  // ==========================================================================
  function goToStop(stopId, direction) {
    const UNIT = getActiveUnit();
    const uState = getUnitState(UNIT);

    if (state.autoAdvanceTimer) {
      clearTimeout(state.autoAdvanceTimer);
      state.autoAdvanceTimer = null;
    }
    if (stopId < 1 || stopId > UNIT.stops.length) return;
    if (!isStopUnlocked(stopId, UNIT)) {
      playTone("error");
      showToast(`🔒 Sırayla ilerlenir! Önce ${getMaxUnlockedStopId(UNIT)}. durağı tamamla.`);
      return;
    }

    if (document.body.classList.contains("sidebar-drawer-open")) {
      document.body.classList.remove("sidebar-drawer-open");
    }
    const dir = direction || (stopId >= uState.currentStopId ? "next" : "prev");
    uState.currentStopId = stopId;
    saveState();
    playTone("click");

    const card = document.getElementById("windowCard");
    card.classList.remove("slide-in-right", "slide-in-left");
    void card.offsetWidth;
    card.classList.add(dir === "next" ? "slide-in-right" : "slide-in-left");

    renderSidebar();
    renderRoad();
    renderWindow();
  }

  // Görev Tamamlandığında Çağrılır -> Durağı Yeşile Çevirir ve Sağa Kaydırır
  function completeCurrentStop(customMsg) {
    const UNIT = getActiveUnit();
    const uState = getUnitState(UNIT);
    const id = uState.currentStopId;
    const alreadyDone = isStopDone(id, UNIT);
    if (!alreadyDone) {
      uState.completedStops.push(id);
      saveState();
    }
    playTone("success");
    if (window.NartesMentor) window.NartesMentor.onCorrect();
    renderSidebar();
    renderRoad();

    const fb = document.getElementById("footFeedback");
    const nextBtn = document.getElementById("btnNextStop");
    const rightArrow = document.getElementById("arrowNext");
    const statusPill = document.getElementById("stepStatusPill");

    if (statusPill) {
      statusPill.className = "step-status-pill done";
      statusPill.innerHTML = "✓ Tamamlandı (Yeşil)";
    }

    if (fb) {
      fb.className = "foot-feedback success";
      fb.innerHTML = `🎉 ${customMsg || "Harika! Bu durağı tamamladın, sıradaki pencereye geçiliyor..."}`;
    }
    if (nextBtn) {
      nextBtn.disabled = false;
    }
    if (rightArrow && id < UNIT.stops.length) {
      rightArrow.disabled = false;
      rightArrow.classList.add("next-ready");
    }

    if (id < UNIT.stops.length) {
      clearTimeout(state.autoAdvanceTimer);
      state.autoAdvanceTimer = setTimeout(() => {
        goToStop(id + 1, "next");
      }, 1350);
    } else {
      showUnitCompletedModal(UNIT);
    }
  }

  // ==========================================================================
  // ORTA PENCERE SAHNESİNİ RENDER ETME
  // ==========================================================================
  function renderWindow() {
    const UNIT = getActiveUnit();
    const uState = getUnitState(UNIT);
    const stop = UNIT.stops.find(s => s.id === uState.currentStopId) || UNIT.stops[0];
    const kaz = UNIT.kazanimlar.find(k => k.id === stop.kazanimId) || UNIT.kazanimlar[0];
    const done = isStopDone(stop.id, UNIT);

    const uBadge = document.getElementById("crumbUnitBadge");
    if (uBadge) uBadge.textContent = `${UNIT.unitNo}. Ünite`;
    document.getElementById("crumbKazanim").textContent = `${kaz.no}. ${kaz.title}`;
    const typeBadge = document.getElementById("crumbType");
    typeBadge.className = `crumb-badge type-${stop.type}`;
    typeBadge.textContent = `${stop.icon} ${stop.typeLabel}`;
    document.getElementById("crumbStopNo").textContent = `Durak ${stop.id} / ${UNIT.stops.length}`;

    const statusPill = document.getElementById("stepStatusPill");
    if (statusPill) {
      if (done) {
        statusPill.className = "step-status-pill done";
        statusPill.innerHTML = '<span class="pill-dot">✓</span> <span class="pill-txt">Tamamlandı</span>';
      } else {
        statusPill.className = "step-status-pill todo";
        statusPill.innerHTML = '<span class="pill-dot">🟠</span> <span class="pill-txt">Devam Ediyor</span>';
      }
    }

    document.getElementById("windowTitle").textContent = stop.title;
    document.getElementById("windowSubtitle").textContent = stop.subtitle;

    const arrowPrev = document.getElementById("arrowPrev");
    const arrowNext = document.getElementById("arrowNext");
    const btnPrevStop = document.getElementById("btnPrevStop");
    arrowPrev.disabled = stop.id <= 1;
    if (btnPrevStop) btnPrevStop.disabled = stop.id <= 1;
    const nextUnlocked = stop.id < UNIT.stops.length && isStopUnlocked(stop.id + 1, UNIT);
    arrowNext.disabled = !nextUnlocked;
    arrowNext.classList.toggle("next-ready", done && stop.id < UNIT.stops.length);

    const fb = document.getElementById("footFeedback");
    const nextBtn = document.getElementById("btnNextStop");
    if (done) {
      fb.className = "foot-feedback success";
      fb.innerHTML = "✓ Bu durağı tamamladın! İstersen tekrar inceleyebilir veya sağa geçebilirsin.";
      nextBtn.disabled = false;
    } else {
      fb.className = "foot-feedback";
      fb.innerHTML = "👆 Sıradaki durağın kilidini açmak için bu penceredeki etkinliği tamamla.";
      nextBtn.disabled = !state.teacherUnlock;
    }

    if (window.NartesSmartboard) {
      window.NartesSmartboard.cleanup();
    }
    const winCardElRef = document.getElementById("windowCard");
    if (winCardElRef) {
      winCardElRef.classList.toggle("is-smartboard-stop", stop.type === "smartboard");
    }

    const body = document.getElementById("windowBody");
    body.innerHTML = "";

    if (stop.type === "concept") {
      renderConceptStop(stop, kaz, body, UNIT);
    } else if (stop.type === "video") {
      renderVideoStop(stop, kaz, body, UNIT);
    } else if (stop.type === "activity") {
      renderActivityStop(stop, kaz, body, UNIT);
    } else if (stop.type === "game") {
      renderGameStop(stop, kaz, body, UNIT);
    } else if (stop.type === "question") {
      renderQuestionStop(stop, kaz, body, UNIT);
    } else if (stop.type === "smartboard" && window.NartesSmartboard) {
      window.NartesSmartboard.renderStop({
        stop,
        kaz,
        unit: UNIT,
        container: body,
        safeMathHtml,
        renderOptionMath,
        applyKaTeX,
        playTone,
        completeCurrentStop,
        isStopDone
      });
    }

    applyKaTeX(document.getElementById("windowCard"));
    if (stop.type !== "smartboard" && window.NartesMentor) {
      window.NartesMentor.setContext({ unit: UNIT, kaz, stop });
    }
    speakText(`${stop.title}. ${stop.subtitle}`);
  }

  // ==========================================================================
  // TÜR 1: 💡 ÖRNEK & KEŞİF
  // ==========================================================================
  function renderConceptStop(stop, kaz, container, UNIT) {
    const topSplit = document.createElement("div");
    topSplit.className = "content-split";

    const leftCol = document.createElement("div");
    leftCol.className = "lead-text";
    leftCol.innerHTML = stop.explanation.map(p => `<p>${safeMathHtml(p)}</p>`).join("");

    if (stop.barsDemo) {
      const bars = document.createElement("div");
      bars.className = "factor-bars-demo";
      bars.innerHTML = `
        <div class="bar-card">
          <div class="bar-row">
            <div class="bar-seg" style="flex:6;background:#f97316">6</div>
            <div class="bar-seg" style="flex:6;background:#f97316">6</div>
            <div class="bar-seg" style="flex:6;background:#f97316">6</div>
            <div class="bar-seg" style="flex:6;background:#f97316">6</div>
          </div>
          <div class="bar-total" style="background:#a21caf">24</div>
          <div class="bar-caption">✓ 24 sayısı 6'ya tam bölünür (4 × 6 = 24)</div>
        </div>
        <div class="bar-card">
          <div class="bar-row">
            <div class="bar-seg" style="flex:5;background:#16a34a">5</div>
            <div class="bar-seg" style="flex:5;background:#16a34a">5</div>
            <div class="bar-seg" style="flex:5;background:#16a34a">5</div>
            <div class="bar-seg" style="flex:5;background:#16a34a">5</div>
            <div class="bar-seg bar-seg-overflow" style="flex:5;background:#16a34a;opacity:0.45">5 (Taştı)</div>
          </div>
          <div class="bar-total" style="background:#2563eb;width:92%">24</div>
          <div class="bar-caption">✗ 24 sayısı 5'e kalansız bölünemez (Kalan: 4)</div>
        </div>
      `;
      leftCol.appendChild(bars);
    }

    if (stop.primeStripDemo) {
      const strip = document.createElement("div");
      strip.style.cssText = "display:flex;gap:8px;flex-wrap:wrap;margin-top:12px;";
      stop.primeStripDemo.forEach(p => {
        const badge = document.createElement("span");
        badge.style.cssText = "background:#dcfce7;border:2px solid #16a34a;color:#15803d;font-weight:800;padding:6px 12px;border-radius:10px;font-size:13.5px;";
        badge.textContent = p;
        strip.appendChild(badge);
      });
      leftCol.appendChild(strip);
    }

    const rightCol = document.createElement("div");
    if (stop.gridModel) {
      rightCol.className = "flow-visual-box factor-grid-showcase";
      const gm = stop.gridModel;
      let activeIdx = gm.defaultPairIdx || 0;
      const palette = [
        "linear-gradient(135deg, #38bdf8, #2563eb)",
        "linear-gradient(135deg, #4ade80, #16a34a)",
        "linear-gradient(135deg, #fb923c, #ea580c)",
        "linear-gradient(135deg, #facc15, #ca8a04)",
        "linear-gradient(135deg, #c084fc, #9333ea)",
        "linear-gradient(135deg, #f472b6, #db2777)"
      ];

      function renderGridModel() {
        const pair = gm.pairs[activeIdx];
        let cellsHtml = "";
        for (let r = 0; r < pair.rows; r++) {
          for (let c = 0; c < pair.cols; c++) {
            const idx = r * pair.cols + c + 1;
            const bg = palette[(r + c) % palette.length];
            cellsHtml += `<div class="fg-unit-cell" style="background:${bg};" title="${idx}. birimkare">${pair.cols <= 12 ? idx : ""}</div>`;
          }
        }

        const tabsHtml = gm.pairs.map((p, i) => `
          <button type="button" class="fg-pair-tab ${i === activeIdx ? "active" : ""}" data-pidx="${i}">
            ${p.rows} × ${p.cols}
          </button>
        `).join("");

        rightCol.innerHTML = `
          <div class="fg-header">
            <span class="fg-badge">📐 Birimkare Çarpan Modeli</span>
            <span class="fg-total-pill">Alan = ${gm.total} br²</span>
          </div>
          <div class="fg-stage">
            <div class="fg-dim-top">${pair.cols} birim (sütun)</div>
            <div class="fg-middle-row">
              <div class="fg-dim-left">${pair.rows} br (satır)</div>
              <div class="fg-grid-board" style="grid-template-columns: repeat(${pair.cols}, minmax(0, 1fr));" data-cols="${pair.cols}">
                ${cellsHtml}
              </div>
            </div>
            <div class="fg-equation-Readout">${pair.rows} satır × ${pair.cols} sütun = <strong>${gm.total} birimkare</strong></div>
          </div>
          <div class="fg-tabs-row" role="tablist" aria-label="24 sayısının çarpan dikdörtgenleri">
            ${tabsHtml}
          </div>
        `;

        rightCol.querySelectorAll(".fg-pair-tab").forEach(btn => {
          btn.addEventListener("click", () => {
            playTone("click");
            activeIdx = parseInt(btn.getAttribute("data-pidx"), 10);
            renderGridModel();
          });
        });
      }

      renderGridModel();
    } else {
      rightCol.className = "flow-visual-box";
      const imgPath = kaz.visual || UNIT.coverImage;
      rightCol.innerHTML = `
        <img src="${imgPath}" onerror="this.src='assets/flow/kapak_carpanlar_katlar.jpg'" alt="${kaz.title}">
        <div class="flow-visual-caption">${kaz.title}</div>
      `;
    }

    topSplit.appendChild(leftCol);
    topSplit.appendChild(rightCol);
    container.appendChild(topSplit);

    const sentenceBox = document.createElement("div");
    sentenceBox.className = "interactive-sentence-box";

    const filledState = {};
    let activeBlankId = stop.blanks && stop.blanks[0] ? stop.blanks[0].id : 0;

    function syncProgressToMentor() {
      if (window.NartesMentor && typeof window.NartesMentor.updateProgress === "function") {
        window.NartesMentor.updateProgress({ filledBlanks: Object.assign({}, filledState), activeBlankId });
      }
    }

    function resolveActiveBlank() {
      const target = stop.blanks.find(b => b.id === activeBlankId && !filledState[b.id])
                  || stop.blanks.find(b => !filledState[b.id]);
      activeBlankId = target ? target.id : -1;
      return target || null;
    }

    function updateSentenceHtml() {
      const targetBlank = resolveActiveBlank();

      let html = safeMathHtml(stop.sentenceHtml);
      stop.blanks.forEach((b) => {
        const val = filledState[b.id];
        const isFocused = Boolean(targetBlank && targetBlank.id === b.id);
        const cls = val
          ? "blank-slot filled-correct"
          : (isFocused ? "blank-slot is-active-blank" : "blank-slot is-pending-blank");
        const label = val
          ? `<span class="blank-check-ico">✓</span><span>${renderOptionMath(val)}</span>`
          : `<span class="blank-dots" aria-hidden="true">• • •</span>`;
        html = html.replace(
          `{${b.id}}`,
          `<button type="button" class="${cls}" data-blank="${b.id}" title="Boşluğu seç">${label}</button>`
        );
      });

      sentenceBox.innerHTML = `
        <div class="sentence-statement">${html}</div>
        <div id="slotPickerArea" class="slot-picker-wrap"></div>
      `;

      sentenceBox.querySelectorAll(".blank-slot").forEach(btn => {
        btn.addEventListener("click", () => {
          if (window.NartesMentor && window.NartesMentor.isRemediationLocked()) return;
          const bId = parseInt(btn.getAttribute("data-blank"), 10);
          if (!filledState[bId] && activeBlankId !== bId) {
            playTone("click");
            activeBlankId = bId;
            updateSentenceHtml();
          }
        });
      });

      renderPicker(targetBlank);
      syncProgressToMentor();
      applyKaTeX(sentenceBox);
    }

    function renderPicker(targetBlank) {
      const pickerArea = sentenceBox.querySelector("#slotPickerArea");
      if (!pickerArea) return;
      if (!targetBlank) {
        pickerArea.innerHTML = `
          <div class="slot-complete-banner">
            ✨ Harika! Cümledeki tüm matematiksel kavramları doğru yerleştirdin.
          </div>
        `;
        return;
      }

      const picker = document.createElement("div");
      picker.className = "slot-picker";
      picker.innerHTML = `
        <span class="slot-picker-label">Seçenekler:</span>
        <div class="slot-choices-group"></div>
      `;
      const choicesGroup = picker.querySelector(".slot-choices-group");

      targetBlank.choices.forEach(choice => {
        const cBtn = document.createElement("button");
        cBtn.type = "button";
        cBtn.className = "slot-choice-btn";
        cBtn.innerHTML = renderOptionMath(choice);

        cBtn.addEventListener("click", () => {
          if (window.NartesMentor && window.NartesMentor.isRemediationLocked()) return;
          if (String(choice) === String(targetBlank.correct)) {
            playTone("click");
            filledState[targetBlank.id] = choice;
            updateSentenceHtml();
            if (Object.keys(filledState).length === stop.blanks.length) {
              completeCurrentStop("Tüm boşlukları doğru doldurdun!");
            }
          } else {
            playTone("error");
            cBtn.classList.add("wrong-flash");
            if (window.NartesMentor) {
              window.NartesMentor.onWrong({
                wrongValue: choice,
                targetKey: `blank_${targetBlank.id}`,
                targetLabel: "Seçili mavi boşluk",
                correctAnswerToMask: targetBlank.correct,
                customHint: stop.hint || "Çarpma ve bölme işleminde kalansız bölen sayıya çarpan (bölen), elde edilen çarpıma ise kat denir."
              }, () => {
                cBtn.classList.remove("wrong-flash");
              });
            }
          }
        });
        choicesGroup.appendChild(cBtn);
      });
      pickerArea.innerHTML = "";
      pickerArea.appendChild(picker);
    }

    updateSentenceHtml();
    container.appendChild(sentenceBox);
  }

  // ==========================================================================
  // TÜR 2: 🎬 ANİMASYONLU & SESLİ ANLATIM SAHNESİ
  // ==========================================================================
  function renderVideoStop(stop, kaz, container, UNIT) {
    let currentStepIdx = 0;
    const wrap = document.createElement("div");
    wrap.className = "video-stage-wrap";

    const player = document.createElement("div");
    player.className = "canvas-player";
    player.innerHTML = `
      <div class="video-slot" role="img" aria-label="Buraya video gelecek">
        <span class="video-slot-play" aria-hidden="true">▶</span>
        <span class="video-slot-label">Buraya video gelecek</span>
      </div>
      <div id="videoStepTabs" style="display:flex;gap:8px;flex-wrap:wrap;flex-shrink:0;"></div>
      <div class="video-canvas-area" id="videoVisualStage"></div>
      <div class="video-controls">
        <button class="btn-video-play" id="btnNextVideoStep">▶ Sonraki Adım (1/${stop.steps.length})</button>
        <div class="video-progress-track">
          <div class="video-progress-fill" id="videoProgFill" style="width:${(1 / stop.steps.length) * 100}%"></div>
        </div>
      </div>
    `;

    const checkPanel = document.createElement("div");
    checkPanel.className = "video-check-panel";
    checkPanel.innerHTML = `
      <div class="vcp-card-inner">
        <div class="vcp-top-row">
          <span class="vcp-badge">🎯 Adım Sonu Doğrulama</span>
          <span class="vcp-step-indicator" id="vcpStepStatus">Adım 1 / ${stop.steps.length}</span>
        </div>
        <h3 class="vcp-question-title">${safeMathHtml(stop.quickQuestion)}</h3>
        <p class="vcp-helper-sub" id="vcpHelperSub">Soldaki adımları inceledikten sonra doğru seçeneği işaretle:</p>
        <div id="videoQuickChoices" class="vcp-choices-list"></div>
        <div class="vcp-mentor-row">
          <button type="button" class="vcp-ask-nartes-btn" id="btnAskNartesVideo">
            <span>🦉</span> <span>Takıldın mı? NarTES'ten Sokratik İpucu İste</span>
          </button>
        </div>
      </div>
    `;

    wrap.appendChild(player);
    wrap.appendChild(checkPanel);
    container.appendChild(wrap);

    const askVideoBtn = checkPanel.querySelector("#btnAskNartesVideo");
    if (askVideoBtn) {
      askVideoBtn.addEventListener("click", () => {
        playTone("click");
        if (window.NartesMentor) window.NartesMentor.openWithHint();
      });
    }

    function focusQuestionPanel() {
      checkPanel.classList.remove("vcp-pulse-focus");
      void checkPanel.offsetWidth;
      checkPanel.classList.add("vcp-pulse-focus", "vcp-ready-highlight");
      const helperEl = checkPanel.querySelector("#vcpHelperSub");
      if (helperEl) {
        helperEl.innerHTML = "✨ <strong>Tüm adımları tamamladın!</strong> Şimdi aşağıdaki doğru seçeneği işaretleyerek sıradaki durağa geç:";
        helperEl.classList.add("ready");
      }
      const firstChoice = checkPanel.querySelector(".option-btn:not(:disabled)");
      if (firstChoice) {
        checkPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
        firstChoice.focus({ preventScroll: true });
      }
      if (window.NartesMentor) {
        window.NartesMentor.nudgeQuestionPanel(stop.quickQuestion);
      }
    }

    function drawVisualStep(stepIdx) {
      const stage = player.querySelector("#videoVisualStage");
      const tabsEl = player.querySelector("#videoStepTabs");
      const step = stop.steps[stepIdx];
      const isLastStep = stepIdx >= stop.steps.length - 1;

      const stepStatusEl = checkPanel.querySelector("#vcpStepStatus");
      if (stepStatusEl) {
        stepStatusEl.textContent = isLastStep ? "✓ Tüm Adımlar İncelendi" : `Adım ${stepIdx + 1} / ${stop.steps.length}`;
        stepStatusEl.classList.toggle("done", isLastStep);
      }
      checkPanel.classList.toggle("vcp-ready-highlight", isLastStep);

      tabsEl.innerHTML = stop.steps.map((_, idx) => {
        const active = idx === stepIdx;
        return `<button type="button" data-step="${idx}" style="border:1.5px solid ${active ? "#38bdf8" : "rgba(255,255,255,0.18)"};background:${active ? "rgba(56,189,248,0.22)" : "rgba(255,255,255,0.06)"};color:${active ? "#fde047" : "#cbd5e1"};padding:5px 12px;border-radius:999px;font-size:12px;font-weight:800;cursor:pointer;">${idx + 1}. Adım</button>`;
      }).join("");

      tabsEl.querySelectorAll("button").forEach(b => {
        b.addEventListener("click", () => {
          playTone("click");
          currentStepIdx = parseInt(b.getAttribute("data-step"), 10);
          drawVisualStep(currentStepIdx);
        });
      });

      player.querySelector("#videoProgFill").style.width = `${((stepIdx + 1) / stop.steps.length) * 100}%`;
      const btn = player.querySelector("#btnNextVideoStep");
      btn.classList.toggle("to-question-ready", isLastStep);
      btn.textContent = !isLastStep
        ? `▶ Sonraki Adım (${stepIdx + 1}/${stop.steps.length})`
        : `🎯 Yandaki Soruya Geç (${stop.steps.length}/${stop.steps.length}) →`;

      speakText(step.text);

      if (stop.videoScene === "rectangles_24" || stop.videoScene === "rectangles_18") {
        const configs = [
          { r: 1, c: 24, color: "#38bdf8", label: "1 × 24 = 24 br²" },
          { r: 2, c: 12, color: "#22c55e", label: "2 × 12 = 24 br²" },
          { r: 3, c: 8,  color: "#f97316", label: "3 × 8 = 24 br²" },
          { r: 4, c: 6,  color: "#a855f7", label: "4 × 6 = 24 br²" },
          { r: 0, c: 0,  color: "#eab308", label: "Çarpanlar: 1, 2, 3, 4, 6, 8, 12, 24" }
        ];
        const cfg = configs[stepIdx] || configs[0];
        if (cfg.r > 0) {
          const cellSize = cfg.c > 12 ? 17 : 22;
          let cells = "";
          for (let i = 0; i < cfg.r * cfg.c; i++) {
            cells += `<div style="width:${cellSize}px;height:${cellSize}px;background:${cfg.color};border-radius:4px;"></div>`;
          }
          stage.innerHTML = `
            <div style="display:grid;grid-template-columns:repeat(${cfg.c}, ${cellSize}px);gap:4px;padding:14px;background:rgba(255,255,255,0.06);border-radius:12px;max-width:100%;overflow-x:auto;">
              ${cells}
            </div>
            <div style="margin-top:12px;font-weight:800;font-size:18px;color:#fde047;">${cfg.label}</div>
            <div style="margin-top:8px;font-size:14.5px;color:#e2e8f0;text-align:center;max-width:560px;">${step.text}</div>
          `;
        } else {
          stage.innerHTML = `
            <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;justify-content:center;">
              ${[1, 2, 3, 4, 6, 8, 12, 24].map(n => `<div style="width:44px;height:44px;border-radius:50%;background:#22c55e;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:16px;">${n}</div>`).join("")}
            </div>
            <div style="margin-top:12px;font-weight:800;font-size:16px;color:#86efac;">Baştan ve sondan çarpımlar: 1×24 = 2×12 = 3×8 = 4×6 = 24</div>
            <div style="margin-top:8px;font-size:14.5px;color:#e2e8f0;text-align:center;">${step.text}</div>
          `;
        }
      } else if (stop.videoScene === "prime_algo_72") {
        const rows = [
          ["72", "2", true],
          ["36", "2", true],
          ["18", "2", true],
          ["9",  "3", stepIdx >= 1],
          ["3",  "3", stepIdx >= 1],
          ["1",  "",  stepIdx >= 1]
        ];
        stage.innerHTML = `
          <div style="display:flex;align-items:center;gap:28px;flex-wrap:wrap;justify-content:center;">
            <div style="font-family:monospace;font-size:20px;font-weight:800;line-height:1.55;">
              ${rows.map(([l, r, show]) => show ? `
                <div style="display:flex;gap:14px;">
                  <span style="width:38px;text-align:right;color:#f8fafc;">${l}</span>
                  <span style="color:#f97316;">|</span>
                  <span style="color:#4ade80;">${r}</span>
                </div>` : "").join("")}
            </div>
            ${stepIdx >= 2 ? `<div style="background:rgba(34,197,94,0.18);border:2px solid #4ade80;padding:14px 20px;border-radius:12px;font-size:22px;font-weight:900;color:#fde047;">72 = 2³ · 3²</div>` : ""}
          </div>
          <div style="margin-top:12px;font-size:14.5px;color:#e2e8f0;text-align:center;max-width:560px;">${step.text}</div>
        `;
      } else {
        const imgPath = kaz.visual || UNIT.coverImage;
        stage.innerHTML = `
          <div style="display:flex;align-items:center;gap:20px;width:100%;padding:8px;flex-wrap:wrap;justify-content:center;">
            <img src="${imgPath}" onerror="this.src='assets/flow/kapak_carpanlar_katlar.jpg'" style="width:clamp(155px, 17vw, 240px);height:clamp(140px, 21vh, 210px);border-radius:14px;border:2px solid #475569;object-fit:cover;flex-shrink:0;box-shadow:0 10px 24px rgba(0,0,0,0.35);">
            <div style="flex:1;min-width:210px;background:rgba(255,255,255,0.07);border:1.5px solid rgba(56,189,248,0.45);border-radius:14px;padding:clamp(14px, 1.8vw, 22px);">
              <div style="font-size:12px;font-weight:800;color:#38bdf8;margin-bottom:8px;letter-spacing:0.5px;">
                SAHNE ADIMI ${stepIdx + 1} / ${stop.steps.length}
              </div>
              <div style="font-size:clamp(15px, 1.25vw, 18.5px);font-weight:700;line-height:1.55;color:#fde047;">
                ${step.text}
              </div>
            </div>
          </div>
        `;
      }
      applyKaTeX(stage);
    }

    drawVisualStep(0);

    player.querySelector("#btnNextVideoStep").addEventListener("click", () => {
      playTone("click");
      if (currentStepIdx < stop.steps.length - 1) {
        currentStepIdx++;
        drawVisualStep(currentStepIdx);
        if (currentStepIdx === stop.steps.length - 1) {
          checkPanel.classList.add("vcp-ready-highlight");
        }
      } else {
        focusQuestionPanel();
      }
    });

    const choicesBox = checkPanel.querySelector("#videoQuickChoices");
    const letters = ["A", "B", "C", "D"];
    stop.quickChoices.forEach((ch, idx) => {
      const btn = document.createElement("button");
      btn.className = "option-btn vcp-option-btn";
      btn.innerHTML = `<span class="option-letter">${letters[idx] || "•"}</span><span class="vcp-option-text">${renderOptionMath(ch)}</span>`;
      btn.addEventListener("click", () => {
        if (window.NartesMentor && window.NartesMentor.isRemediationLocked()) return;
        if (String(ch) === String(stop.quickCorrect)) {
          choicesBox.querySelectorAll(".option-btn").forEach(b => b.disabled = true);
          btn.classList.add("correct");
          completeCurrentStop("Anlatımı ve doğrulama sorusunu başarıyla tamamladın!");
        } else {
          playTone("error");
          btn.classList.add("wrong-flash");
          if (window.NartesMentor) {
            window.NartesMentor.onWrong({
              wrongValue: ch,
              targetKey: "video_verify",
              targetLabel: stop.quickQuestion,
              correctAnswerToMask: stop.quickCorrect,
              customHint: "Soldaki animasyon adımlarında oluşan farklı durumların sayısına ve son adımdaki özete tekrar dikkat et."
            }, () => {
              btn.classList.remove("wrong-flash");
            });
          }
        }
      });
      choicesBox.appendChild(btn);
    });
  }

  // ==========================================================================
  // TÜR 3: 🧩 ETKİLEŞİMLİ ETKİNLİK
  // ==========================================================================
  function renderActivityStop(stop, kaz, container) {
    const board = document.createElement("div");
    board.className = "interactive-board";

    if (stop.activityMode === "rainbow_pairs") {
      const targetStates = stop.missingTargets.map(m => ({ ...m, solved: false }));
      let solvedCount = 0;
      const totalMissing = targetStates.length;
      let activeMissingIdx = 0;

      const seqRow = document.createElement("div");
      seqRow.style.cssText = "display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin:14px 0;";

      const poolWrap = document.createElement("div");
      poolWrap.className = "chip-grid";

      function renderSlots() {
        seqRow.innerHTML = "";
        stop.sequence.forEach((item, idx) => {
          const missObj = targetStates.find(m => m.index === idx);
          const box = document.createElement("div");
          if (missObj) {
            const isSolved = missObj.solved;
            const isSelected = targetStates[activeMissingIdx] === missObj;
            box.style.cssText = `padding:12px 18px;border-radius:12px;font-weight:900;font-size:15.5px;cursor:pointer;border:2.5px solid ${isSolved ? "#16a34a" : (isSelected ? "#2563eb" : "#f97316")};background:${isSolved ? "#dcfce7" : (isSelected ? "#dbeafe" : "#fff7ed")};color:#0f172a;`;
            const rawText = isSolved ? `${item.toString().replace("?", missObj.answer)}` : String(item);
            box.innerHTML = renderOptionMath(rawText);
            box.addEventListener("click", () => {
              if (window.NartesMentor && window.NartesMentor.isRemediationLocked()) return;
              if (!isSolved) {
                activeMissingIdx = targetStates.indexOf(missObj);
                renderSlots();
              }
            });
          } else {
            box.style.cssText = "padding:12px 18px;border-radius:12px;font-weight:800;font-size:15.5px;background:#e2e8f0;color:#1e293b;";
            box.innerHTML = renderOptionMath(item);
          }
          seqRow.appendChild(box);
        });
        applyKaTeX(seqRow);
      }

      renderSlots();
      board.innerHTML = `<div style="text-align:center;font-weight:700;color:#334155;">Mavi seçili kutu için alttaki doğru değere tıkla:</div>`;
      board.appendChild(seqRow);

      stop.pool.forEach(val => {
        const chip = document.createElement("button");
        chip.className = "num-chip";
        chip.innerHTML = renderOptionMath(val);
        chip.addEventListener("click", () => {
          if (window.NartesMentor && window.NartesMentor.isRemediationLocked()) return;
          const currentTarget = targetStates[activeMissingIdx];
          if (!currentTarget || currentTarget.solved) return;
          if (String(val) === String(currentTarget.answer)) {
            playTone("click");
            currentTarget.solved = true;
            chip.classList.add("correct");
            chip.disabled = true;
            solvedCount++;
            const nextUnsolved = targetStates.findIndex(m => !m.solved);
            if (nextUnsolved !== -1) activeMissingIdx = nextUnsolved;
            renderSlots();
            if (solvedCount === totalMissing) {
              completeCurrentStop("Tüm eşleştirmeleri doğru tamamladın!");
            }
          } else {
            playTone("error");
            chip.classList.add("wrong-flash");
            if (window.NartesMentor) {
              window.NartesMentor.onWrong({
                wrongValue: val,
                targetKey: `rainbow_${activeMissingIdx}`,
                targetLabel: String(stop.sequence[currentTarget.index] || "Seçili Kutu"),
                correctAnswerToMask: currentTarget.answer,
                customHint: currentTarget.hint
              }, () => {
                chip.classList.remove("wrong-flash");
              });
            }
          }
        });
        poolWrap.appendChild(chip);
      });
      board.appendChild(poolWrap);
    } else if (stop.activityMode === "factor_tree") {
      let solved = 0;
      board.innerHTML = `<div style="font-weight:700;color:#334155;margin-bottom:12px;">${stop.treeDescription}</div>`;
      const nodesWrap = document.createElement("div");
      nodesWrap.style.cssText = "display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:14px;";

      let activeNodeIdx = 0;
      const nodeStates = stop.missingNodes.map(n => ({ ...n, done: false }));

      const pool = document.createElement("div");
      pool.className = "chip-grid";

      function drawTreeNodes() {
        nodesWrap.innerHTML = "";
        nodeStates.forEach((n, idx) => {
          const card = document.createElement("div");
          card.style.cssText = `padding:14px;border-radius:12px;text-align:center;font-weight:800;font-size:16px;cursor:pointer;border:2px solid ${n.done ? "#16a34a" : (idx === activeNodeIdx ? "#2563eb" : "#f97316")};background:${n.done ? "#dcfce7" : (idx === activeNodeIdx ? "#eff6ff" : "#fff7ed")};`;
          card.textContent = n.done ? n.label.replace("[ ? ]", n.answer) : n.label;
          card.addEventListener("click", () => {
            if (window.NartesMentor && window.NartesMentor.isRemediationLocked()) return;
            if (!n.done) {
              activeNodeIdx = idx;
              drawTreeNodes();
            }
          });
          nodesWrap.appendChild(card);
        });
        applyKaTeX(nodesWrap);
      }
      drawTreeNodes();
      board.appendChild(nodesWrap);

      stop.pool.forEach(num => {
        const btn = document.createElement("button");
        btn.className = "num-chip";
        btn.innerHTML = renderOptionMath(num);
        btn.addEventListener("click", () => {
          if (window.NartesMentor && window.NartesMentor.isRemediationLocked()) return;
          const target = nodeStates[activeNodeIdx];
          if (!target || target.done) return;
          if (String(num) === String(target.answer)) {
            playTone("click");
            target.done = true;
            btn.classList.add("correct");
            btn.disabled = true;
            solved++;
            const nextIdx = nodeStates.findIndex(x => !x.done);
            if (nextIdx !== -1) activeNodeIdx = nextIdx;
            drawTreeNodes();
            if (solved === nodeStates.length) {
              completeCurrentStop("60 = 2² · 3 · 5 çarpan ağacını başarıyla kurdun!");
            }
          } else {
            playTone("error");
            btn.classList.add("wrong-flash");
            if (window.NartesMentor) {
              window.NartesMentor.onWrong({
                wrongValue: num,
                targetKey: `tree_${activeNodeIdx}`,
                targetLabel: target.label,
                correctAnswerToMask: target.answer,
                customHint: `"${target.label}" dalında iki dalın çarpımı üstteki sayıyı vermelidir.`
              }, () => {
                btn.classList.remove("wrong-flash");
              });
            }
          }
        });
        pool.appendChild(btn);
      });
      board.appendChild(pool);
    } else if (stop.activityMode === "ebob_ekok_sort" || stop.activityMode === "coprime_check" || stop.activityMode === "custom_sort") {
      let currentIdx = 0;
      const choices = stop.sortChoices
        ? stop.sortChoices
        : (stop.activityMode === "ebob_ekok_sort" ? ["EBOB", "EKOK"] : ["Aralarında Asal", "Değil"]);

      function renderCardItem() {
        const item = stop.items[currentIdx];
        board.innerHTML = `
          <div style="text-align:center;padding:12px;">
            <div style="font-size:12px;font-weight:800;color:#f97316;margin-bottom:6px;">KART ${currentIdx + 1} / ${stop.items.length}</div>
            <div style="font-size:18px;font-weight:800;color:#0f172a;background:#ffffff;padding:18px;border-radius:14px;border:2px solid #cbd5e1;margin-bottom:16px;">
              "${safeMathHtml(item.text)}"
            </div>
            <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap;" id="sortBtns"></div>
          </div>
        `;
        const btnWrap = board.querySelector("#sortBtns");
        choices.forEach(c => {
          const b = document.createElement("button");
          b.className = "num-chip";
          b.style.minWidth = "175px";
          b.innerHTML = renderOptionMath(c);
          b.addEventListener("click", () => {
            if (window.NartesMentor && window.NartesMentor.isRemediationLocked()) return;
            if (String(c) === String(item.answer)) {
              playTone("click");
              b.classList.add("correct");
              currentIdx++;
              if (currentIdx < stop.items.length) {
                setTimeout(renderCardItem, 350);
              } else {
                completeCurrentStop("Tüm kartları doğru sınıflandırdın!");
              }
            } else {
              playTone("error");
              b.classList.add("wrong-flash");
              if (window.NartesMentor) {
                window.NartesMentor.onWrong({
                  wrongValue: c,
                  targetKey: `sort_${currentIdx}`,
                  targetLabel: item.text,
                  correctAnswerToMask: item.answer,
                  customHint: item.reason || "Karttaki durumun bütünden eş parçalara mı (EBOB) yoksa küçük nöbet/parçalardan ortak buluşmaya mı (EKOK / Aralarında Asallık) gittiğini kontrol et."
                }, () => {
                  b.classList.remove("wrong-flash");
                });
              }
            }
          });
          btnWrap.appendChild(b);
        });
        applyKaTeX(board);
      }
      renderCardItem();
    }

    container.appendChild(board);
  }

  // ==========================================================================
  // TÜR 4: 🎮 GÖMÜLÜ HTML5 MİNİ OYUNLAR (Sade, Ferah & Estetik Tasarım)
  // ==========================================================================
  function renderGameStop(stop, kaz, container) {
    const gameBox = document.createElement("div");
    gameBox.className = "interactive-board";

    if (stop.gameType === "factor_hunter") {
      let lvlIdx = 0;
      let found = [];

      function renderHunterLevel() {
        const lvl = stop.levels[lvlIdx];
        found = [];
        gameBox.innerHTML = `
          <div style="text-align:center;max-width:680px;margin:0 auto;width:100%;">
            <div style="display:inline-flex;align-items:center;gap:10px;background:#f0fdf4;border:1px solid #bbf7d0;color:#15803d;padding:5px 14px;border-radius:999px;font-weight:800;font-size:12px;margin-bottom:12px;">
              <span>SEVİYE ${lvlIdx + 1} / ${stop.levels.length}</span>
              <span>•</span>
              <span id="hunterCounter">Bulunan: 0 / ${lvl.divisors.length}</span>
            </div>
            <div style="font-size:clamp(18px, 1.5vw, 22px);font-weight:800;color:#0f172a;margin-bottom:16px;">
              <span style="color:#2563eb;">${lvl.target}</span> sayısının tüm tam bölenlerini seç
            </div>
            <div class="chip-grid" id="hunterGrid"></div>
          </div>
        `;
        const grid = gameBox.querySelector("#hunterGrid");
        lvl.options.forEach(n => {
          const btn = document.createElement("button");
          btn.className = "num-chip";
          btn.textContent = n;
          btn.addEventListener("click", () => {
            if (window.NartesMentor && window.NartesMentor.isRemediationLocked()) return;
            if (lvl.divisors.includes(n)) {
              if (!found.includes(n)) {
                playTone("click");
                found.push(n);
                btn.classList.add("correct");
                btn.disabled = true;
                gameBox.querySelector("#hunterCounter").textContent = `Bulunan: ${found.length} / ${lvl.divisors.length}`;
                if (found.length === lvl.divisors.length) {
                  lvlIdx++;
                  if (lvlIdx < stop.levels.length) {
                    setTimeout(renderHunterLevel, 500);
                  } else {
                    completeCurrentStop("Çarpan Avcısı oyununu tüm seviyeleriyle kazandın!");
                  }
                }
              }
            } else {
              playTone("error");
              btn.classList.add("wrong-flash");
              if (window.NartesMentor) {
                window.NartesMentor.onWrong({
                  wrongValue: n,
                  targetKey: `hunter_${lvlIdx}`,
                  targetNumber: lvl.target,
                  customHint: `${lvl.target} sayısını ${n} sayısına böldüğümüzde kalan ${lvl.target % n} oluyor. Tam bölen olabilmesi için kalan 0 olmalıdır.`
                }, () => {
                  btn.classList.remove("wrong-flash");
                });
              }
            }
          });
          grid.appendChild(btn);
        });
      }
      renderHunterLevel();
    } else if (stop.gameType === "prime_synth") {
      let tIdx = 0;
      let product = 1;
      let chosen = [];

      function renderSynth() {
        const target = stop.targets[tIdx];
        product = 1;
        chosen = [];
        gameBox.innerHTML = `
          <div style="text-align:center;max-width:640px;margin:0 auto;">
            <div style="display:inline-block;font-size:12px;font-weight:800;color:#0284c7;background:#e0f2fe;padding:4px 12px;border-radius:999px;margin-bottom:10px;">
              HEDEF ${tIdx + 1} / ${stop.targets.length}
            </div>
            <div style="font-size:clamp(20px, 1.7vw, 25px);font-weight:900;color:#0f172a;margin-bottom:8px;">
              Hedef Sayı: <span style="color:#2563eb;">${target}</span> &nbsp;|&nbsp; Çarpım: <span id="currProd" style="color:#16a34a;">1</span>
            </div>
            <div style="font-size:14px;color:#64748b;margin-bottom:16px;font-weight:600;" id="chosenFormula">Asal çarpanlara tıklayarak ${target} sayısını elde et</div>
            <div style="display:flex;gap:12px;justify-content:center;margin-bottom:14px;flex-wrap:wrap;" id="primeBtns"></div>
            <button id="btnResetSynth" style="background:#f1f5f9;color:#475569;border:1px solid #cbd5e1;padding:7px 16px;border-radius:999px;cursor:pointer;font-weight:700;font-size:12.5px;">↺ Çarpımı Sıfırla</button>
          </div>
        `;
        const pWrap = gameBox.querySelector("#primeBtns");
        [2, 3, 5, 7].forEach(p => {
          const b = document.createElement("button");
          b.className = "num-chip";
          b.style.cssText = "border-color:#22c55e;color:#15803d;font-size:18px;";
          b.textContent = `× ${p}`;
          b.addEventListener("click", () => {
            if (window.NartesMentor && window.NartesMentor.isRemediationLocked()) return;
            product *= p;
            chosen.push(p);
            gameBox.querySelector("#currProd").textContent = product;
            gameBox.querySelector("#chosenFormula").textContent = chosen.join(" × ") + " = " + product;
            if (product === target) {
              playTone("click");
              tIdx++;
              if (tIdx < stop.targets.length) {
                setTimeout(renderSynth, 550);
              } else {
                completeCurrentStop("Tüm hedef sayıları asal çarpanlarıyla sentezledin!");
              }
            } else if (product > target) {
              playTone("error");
              if (window.NartesMentor) {
                window.NartesMentor.onWrong({
                  wrongValue: product,
                  targetKey: `synth_${tIdx}`,
                  targetNumber: target,
                  customHint: `Hedef sayı ${target} iken seçtiğin asal çarpanların çarpımı ${product} oldu. ${target} sayısını kalansız bölen asal sayıları seçerek ilerle.`
                }, () => {
                  renderSynth();
                });
              } else {
                setTimeout(renderSynth, 500);
              }
            } else {
              playTone("click");
            }
          });
          pWrap.appendChild(b);
        });
        gameBox.querySelector("#btnResetSynth").addEventListener("click", renderSynth);
      }
      renderSynth();
    } else if (stop.gameType === "ebob_carpenter" || stop.gameType === "ekok_gears" || stop.gameType === "coprime_vault") {
      const list = stop.rounds || stop.locks;
      let rIdx = 0;

      function renderRound() {
        const r = list[rIdx];
        let promptHtml = "";
        let correctVal = 0;
        if (stop.gameType === "ebob_carpenter") {
          promptHtml = `<strong>${r.lenA} cm</strong> ve <strong>${r.lenB} cm</strong>'lik iki çubuğu hiç artmayacak şekilde <strong>en büyük eş parçalara</strong> ayırmak için bir parçanın uzunluğu (EBOB) kaç cm olmalıdır?`;
          correctVal = r.ebob;
        } else if (stop.gameType === "ekok_gears") {
          promptHtml = `Biri <strong>${r.p1} dakikada</strong>, diğeri <strong>${r.p2} dakikada</strong> tam tur atan iki çark ilk kez kaçıncı dakikada (EKOK) birlikte başlangıç hizasına gelir?`;
          correctVal = r.ekok;
        } else {
          promptHtml = `Anahtar Sayı: <strong>${r.keyNum}</strong>. Kilidi açmak için <strong>${r.keyNum} ile aralarında asal</strong> olan sayıyı seç:`;
          correctVal = r.correct;
        }

        gameBox.innerHTML = `
          <div style="text-align:center;max-width:680px;margin:0 auto;padding:8px;">
            <div style="display:inline-block;font-size:11.5px;font-weight:800;color:#ea580c;background:#ffedd5;padding:4px 12px;border-radius:999px;margin-bottom:12px;">
              ADIM ${rIdx + 1} / ${list.length}
            </div>
            <div style="font-size:clamp(16.5px, 1.35vw, 20px);line-height:1.55;color:#0f172a;margin-bottom:20px;">${promptHtml}</div>
            <div class="chip-grid" id="roundChoices"></div>
          </div>
        `;
        const cWrap = gameBox.querySelector("#roundChoices");
        r.options.forEach(opt => {
          const btn = document.createElement("button");
          btn.className = "num-chip";
          btn.innerHTML = renderOptionMath(opt);
          btn.addEventListener("click", () => {
            if (window.NartesMentor && window.NartesMentor.isRemediationLocked()) return;
            if (String(opt) === String(correctVal)) {
              playTone("click");
              btn.classList.add("correct");
              rIdx++;
              if (rIdx < list.length) {
                setTimeout(renderRound, 500);
              } else {
                completeCurrentStop("Oyundaki tüm görevleri başarıyla tamamladın!");
              }
            } else {
              playTone("error");
              btn.classList.add("wrong-flash");
              if (window.NartesMentor) {
                window.NartesMentor.onWrong({
                  wrongValue: opt,
                  targetKey: `round_${rIdx}`,
                  targetLabel: promptHtml.replace(/<[^>]+>/g, ""),
                  correctAnswerToMask: correctVal,
                  customHint: r.reason || "Verilen sayıların ortak bölenlerini (EBOB), ortak katlarını (EKOK) veya ortak asal böleni olup olmadığını tekrar kontrol et."
                }, () => {
                  btn.classList.remove("wrong-flash");
                });
              }
            }
          });
          cWrap.appendChild(btn);
        });
        applyKaTeX(gameBox);
      }
      renderRound();
    } else if (stop.gameType === "final_marathon") {
      let cIdx = 0;
      function renderChallenge() {
        const ch = stop.challenges[cIdx];
        gameBox.innerHTML = `
          <div style="text-align:center;max-width:680px;margin:0 auto;padding:10px;">
            <div style="display:inline-block;font-size:11.5px;font-weight:800;color:#15803d;background:#dcfce7;padding:4px 12px;border-radius:999px;margin-bottom:12px;">
              ETAP ${cIdx + 1} / ${stop.challenges.length}
            </div>
            <div style="font-size:clamp(17px, 1.4vw, 21px);font-weight:800;color:#0f172a;line-height:1.45;margin-bottom:20px;">${safeMathHtml(ch.q)}</div>
            <div class="chip-grid" id="finalChoices"></div>
          </div>
        `;
        const wrap = gameBox.querySelector("#finalChoices");
        ch.choices.forEach(opt => {
          const btn = document.createElement("button");
          btn.className = "num-chip";
          btn.innerHTML = renderOptionMath(opt);
          btn.addEventListener("click", () => {
            if (window.NartesMentor && window.NartesMentor.isRemediationLocked()) return;
            if (String(opt) === String(ch.ans)) {
              playTone("click");
              btn.classList.add("correct");
              cIdx++;
              if (cIdx < stop.challenges.length) {
                setTimeout(renderChallenge, 420);
              } else {
                completeCurrentStop("Tebrikler! Bu oyun etabındaki tüm görevleri başarıyla bitirdin!");
              }
            } else {
              playTone("error");
              btn.classList.add("wrong-flash");
              if (window.NartesMentor) {
                window.NartesMentor.onWrong({
                  wrongValue: opt,
                  targetKey: `marathon_${cIdx}`,
                  targetLabel: ch.q,
                  correctAnswerToMask: ch.ans,
                  customHint: ch.hint || "Sorudaki anahtar matematiksel kuralı düşünerek seçenekleri değerlendir."
                }, () => {
                  btn.classList.remove("wrong-flash");
                });
              }
            }
          });
          wrap.appendChild(btn);
        });
        applyKaTeX(gameBox);
      }
      renderChallenge();
    }

    container.appendChild(gameBox);
  }

  // ==========================================================================
  // TÜR 5: ❓ KİTAP DİZGİSİ KALİTESİNDE SORU KARTI + İLİŞKİLİ MATEMATİKSEL MODEL
  // ==========================================================================
  function escSvg(val) {
    return String(val || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function stripPlain(raw) {
    return String(raw || "")
      .replace(/<\/?[a-zA-Z][^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function extractQuestionSummaryMeta(stop) {
    const plain = stripPlain(stop.stem);
    // Koyu (<strong>) vurgulanan anahtar verileri ayıkla
    const boldMatches = [];
    const reBold = /<strong[^>]*>([\s\S]*?)<\/strong>/gi;
    let m;
    while ((m = reBold.exec(stop.stem || "")) !== null) {
      const cleaned = stripPlain(m[1]);
      if (cleaned && !boldMatches.includes(cleaned)) boldMatches.push(cleaned);
    }
    const qSentences = plain.split(/[.!]+/).map(s => s.trim()).filter(Boolean);
    const goalSent = qSentences.find(s => s.includes("?")) || qSentences[qSentences.length - 1] || "";
    const shortGoal = goalSent.length > 68 ? goalSent.slice(0, 66) + "…" : goalSent;
    const givenPills = boldMatches.slice(0, 3);
    return { givenPills, shortGoal };
  }

  function buildDynamicMathSchematic(stop, kaz, UNIT) {
    const plain = stripPlain(stop.stem);
    const lower = plain.toLocaleLowerCase("tr-TR");
    const hasPhoto = Boolean(stop.questionVisual);
    const vbH = hasPhoto ? 162 : 210;

    // 1) DİKDÖRTGEN PROBLEMLERİ (ör. U1S5 ABCD Bahçe 36 m², U1S16 KLMN Park 40 m & 64 m, U2S15, U3S26, U6S10, U12S10)
    if (lower.includes("dikdörtgen") && !lower.includes("yan yana ve alt alta")) {
      const verts = plain.includes("KLMN") ? ["K", "L", "M", "N"] : ["A", "B", "C", "D"];
      const areaMatch = plain.match(/(\([^)]+\)\s*(?:br|cm|mm|m)[²2]|[0-9]+(?:[.,][0-9]+)?\s*(?:br|cm|mm|m)[²2])/i);
      const sideMatches = plain.match(/(?:[0-9⁰¹²³⁴⁵⁶⁷⁸⁹]+√[0-9]+|√[0-9]+|\([^)]+\)|[0-9]+[⁰¹²³⁴⁵⁶⁷⁸⁹]+|[0-9]+)\s*(?:cm|m|dm|br)\b/gi) || [];

      let topLabel = `|${verts[0]}${verts[1]}| = a m`;
      let rightLabel = `|${verts[1]}${verts[2]}| = b m`;
      let centerMain = areaMatch ? `Alan(${verts.join("")}) = ${areaMatch[1]}` : `${verts.join("")} Dikdörtgeni`;
      let subFormula = areaMatch
        ? "a, b ∈ ℤ⁺  •  Çevre = 2·(a + b)"
        : (lower.includes("direk") ? "Köşelere de direk dikilecek • Eşit aralık" : "Karşılıklı kenarlar eşittir");

      if (sideMatches.length >= 2) {
        const s1 = sideMatches[0].trim();
        const s2 = sideMatches[1].trim();
        topLabel = `|${verts[0]}${verts[1]}| = ${s2}`;
        rightLabel = `|${verts[1]}${verts[2]}| = ${s1}`;
        if (!areaMatch) {
          centerMain = lower.includes("direk")
            ? `${verts.join("")} Parkı`
            : (lower.includes("alan") ? `Alan(${verts.join("")}) = ?` : `${verts.join("")} Modeli`);
        }
      }

      const ry = hasPhoto ? 28 : 42;
      const rh = hasPhoto ? 86 : 108;
      const rx = 74;
      const rw = 196;
      const showPoles = lower.includes("direk") || lower.includes("fidan");

      return `
        <svg class="q-schematic-svg" viewBox="0 0 360 ${vbH}" role="img" aria-label="${escSvg(verts.join(""))} Dikdörtgen Modeli">
          <defs>
            <linearGradient id="rectFillGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#ecfdf5"/>
              <stop offset="100%" stop-color="#dbeafe"/>
            </linearGradient>
          </defs>
          <!-- Dikdörtgen Gövde -->
          <rect x="${rx}" y="${ry}" width="${rw}" height="${rh}" rx="4" fill="url(#rectFillGrad)" stroke="#1d4ed8" stroke-width="2.4"/>
          <!-- İç Birim Izgara Dokusu -->
          <line x1="${rx + rw / 3}" y1="${ry}" x2="${rx + rw / 3}" y2="${ry + rh}" stroke="#93c5fd" stroke-width="1" stroke-dasharray="4 4" opacity="0.65"/>
          <line x1="${rx + (2 * rw) / 3}" y1="${ry}" x2="${rx + (2 * rw) / 3}" y2="${ry + rh}" stroke="#93c5fd" stroke-width="1" stroke-dasharray="4 4" opacity="0.65"/>
          <line x1="${rx}" y1="${ry + rh / 2}" x2="${rx + rw}" y2="${ry + rh / 2}" stroke="#93c5fd" stroke-width="1" stroke-dasharray="4 4" opacity="0.65"/>
          <!-- Dik Açı Sembolleri -->
          <path d="M ${rx + 12} ${ry} L ${rx + 12} ${ry + 12} L ${rx} ${ry + 12}" fill="none" stroke="#1e40af" stroke-width="1.5"/>
          <path d="M ${rx + rw - 12} ${ry} L ${rx + rw - 12} ${ry + 12} L ${rx + rw} ${ry + 12}" fill="none" stroke="#1e40af" stroke-width="1.5"/>
          <path d="M ${rx + 12} ${ry + rh} L ${rx + 12} ${ry + rh - 12} L ${rx} ${ry + rh - 12}" fill="none" stroke="#1e40af" stroke-width="1.5"/>
          <path d="M ${rx + rw - 12} ${ry + rh} L ${rx + rw - 12} ${ry + rh - 12} L ${rx + rw} ${ry + rh - 12}" fill="none" stroke="#1e40af" stroke-width="1.5"/>
          <!-- Köşe Noktaları -->
          <circle cx="${rx}" cy="${ry}" r="${showPoles ? 5.5 : 4}" fill="${showPoles ? "#f97316" : "#1d4ed8"}"/>
          <circle cx="${rx + rw}" cy="${ry}" r="${showPoles ? 5.5 : 4}" fill="${showPoles ? "#f97316" : "#1d4ed8"}"/>
          <circle cx="${rx + rw}" cy="${ry + rh}" r="${showPoles ? 5.5 : 4}" fill="${showPoles ? "#f97316" : "#1d4ed8"}"/>
          <circle cx="${rx}" cy="${ry + rh}" r="${showPoles ? 5.5 : 4}" fill="${showPoles ? "#f97316" : "#1d4ed8"}"/>
          <!-- Köşe Harfleri -->
          <text x="${rx - 14}" y="${ry - 6}" font-size="13" font-weight="800" fill="#0f172a">${verts[0]}</text>
          <text x="${rx + rw + 7}" y="${ry - 6}" font-size="13" font-weight="800" fill="#0f172a">${verts[1]}</text>
          <text x="${rx + rw + 7}" y="${ry + rh + 14}" font-size="13" font-weight="800" fill="#0f172a">${verts[2]}</text>
          <text x="${rx - 14}" y="${ry + rh + 14}" font-size="13" font-weight="800" fill="#0f172a">${verts[3]}</text>
          <!-- Üst ve Sağ Kenar Etiketleri -->
          <text x="${rx + rw / 2}" y="${ry - 9}" text-anchor="middle" font-size="12.5" font-weight="800" fill="#1d4ed8">${escSvg(topLabel)}</text>
          <text x="${rx + rw + 10}" y="${ry + rh / 2 + 4}" text-anchor="start" font-size="12" font-weight="800" fill="#15803d">${escSvg(rightLabel)}</text>
          <!-- Merkez Alan Etiketi -->
          <rect x="${rx + 26}" y="${ry + rh / 2 - 15}" width="${rw - 52}" height="30" rx="8" fill="#ffffff" fill-opacity="0.94" stroke="#93c5fd" stroke-width="1.3"/>
          <text x="${rx + rw / 2}" y="${ry + rh / 2 + 5}" text-anchor="middle" font-size="13" font-weight="800" fill="#0f172a">${escSvg(centerMain)}</text>
          <!-- Alt Bağıntı Satırı -->
          <text x="180" y="${vbH - 10}" text-anchor="middle" font-size="11.5" font-weight="700" fill="#475569">${escSvg(subFormula)}</text>
        </svg>
      `;
    }

    // 2) ASAL ÇARPANLAR ALGORİTMASI / BÖLEN LİSTESİ (ör. U1S10: A | 2, 2, 3, 5)
    if (lower.includes("algoritma") || lower.includes("bölen listesi")) {
      return `
        <svg class="q-schematic-svg" viewBox="0 0 360 205" role="img" aria-label="Asal Çarpanlar Algoritması">
          <rect x="34" y="14" width="292" height="176" rx="14" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
          <line x1="126" y1="26" x2="126" y2="176" stroke="#ea580c" stroke-width="2.6" stroke-linecap="round"/>
          <text x="108" y="46" text-anchor="end" font-size="16" font-weight="900" fill="#1d4ed8">A</text>
          <text x="142" y="46" font-size="15" font-weight="800" fill="#15803d">2</text>
          <text x="108" y="76" text-anchor="end" font-size="15" font-weight="800" fill="#334155">B</text>
          <text x="142" y="76" font-size="15" font-weight="800" fill="#15803d">2</text>
          <text x="108" y="106" text-anchor="end" font-size="15" font-weight="800" fill="#334155">C</text>
          <text x="142" y="106" font-size="15" font-weight="800" fill="#15803d">3</text>
          <text x="108" y="136" text-anchor="end" font-size="15" font-weight="800" fill="#334155">D</text>
          <text x="142" y="136" font-size="15" font-weight="800" fill="#15803d">5</text>
          <text x="108" y="166" text-anchor="end" font-size="15" font-weight="900" fill="#0f172a">1</text>
          <rect x="184" y="64" width="126" height="68" rx="10" fill="#eff6ff" stroke="#93c5fd" stroke-width="1.5"/>
          <text x="247" y="91" text-anchor="middle" font-size="12" font-weight="800" fill="#1e40af">Üslü Çarpım</text>
          <text x="247" y="116" text-anchor="middle" font-size="14" font-weight="900" fill="#0f172a">A = 2² · 3¹ · 5¹</text>
        </svg>
      `;
    }

    // 3) DİKDÖRTGEN KARTLARLA KARE OLUŞTURMA (ör. U1S21: 8 cm × 12 cm → ABCD Karesi)
    if (lower.includes("yan yana ve alt alta") || (lower.includes("kart") && lower.includes("kare"))) {
      return `
        <svg class="q-schematic-svg" viewBox="0 0 360 ${vbH}" role="img" aria-label="Dikdörtgen Kartlarla ABCD Karesi Modeli">
          <rect x="112" y="18" width="120" height="120" rx="4" fill="#eff6ff" stroke="#16a34a" stroke-width="2.5"/>
          <!-- 8x12 örnek kartlar -->
          <rect x="112" y="18" width="42" height="60" fill="#dbeafe" stroke="#2563eb" stroke-width="1.8"/>
          <rect x="154" y="18" width="42" height="60" fill="#bfdbfe" stroke="#2563eb" stroke-width="1.8"/>
          <rect x="112" y="78" width="42" height="60" fill="#bfdbfe" stroke="#2563eb" stroke-width="1.8"/>
          <text x="133" y="51" text-anchor="middle" font-size="10.5" font-weight="800" fill="#1e3a8a">8×12</text>
          <text x="212" y="84" text-anchor="middle" font-size="14" font-weight="800" fill="#64748b">• • •</text>
          <!-- ABCD Köşeleri -->
          <text x="98" y="18" font-size="12.5" font-weight="800" fill="#0f172a">A</text>
          <text x="238" y="18" font-size="12.5" font-weight="800" fill="#0f172a">B</text>
          <text x="238" y="144" font-size="12.5" font-weight="800" fill="#0f172a">C</text>
          <text x="98" y="144" font-size="12.5" font-weight="800" fill="#0f172a">D</text>
          <text x="246" y="82" font-size="11.5" font-weight="800" fill="#15803d">|BC| = k cm</text>
          <text x="180" y="${vbH - 6}" text-anchor="middle" font-size="11.5" font-weight="800" fill="#334155">1 Kart: 8 cm × 12 cm  ⇒  En küçük ABCD karesi</text>
        </svg>
      `;
    }

    // 4) ZEYTİNYAĞI / ŞİŞELEME / ÇUVAL PAYLAŞTIRMA (ör. U1S15: 48 L & 60 L → x L şişe)
    if (lower.includes("şişe") || (lower.includes("çuval") && lower.includes("doldur"))) {
      const nums = plain.match(/[0-9⁰¹²³⁴⁵⁶⁷⁸⁹]+\s*(?:L|litre|kg)/gi) || ["48 L", "60 L"];
      const v1 = nums[0] || "1. Kap";
      const v2 = nums[1] || "2. Kap";
      return `
        <svg class="q-schematic-svg" viewBox="0 0 360 ${vbH}" role="img" aria-label="Eşit Hacimli Paylaştırma Şeması">
          <rect x="34" y="34" width="76" height="86" rx="12" fill="#fef9c3" stroke="#ca8a04" stroke-width="2"/>
          <text x="72" y="74" text-anchor="middle" font-size="14" font-weight="900" fill="#854d0e">${escSvg(v1)}</text>
          <text x="72" y="94" text-anchor="middle" font-size="10.5" font-weight="700" fill="#713f12">1. Bütün</text>

          <rect x="126" y="22" width="76" height="98" rx="12" fill="#ffedd5" stroke="#ea580c" stroke-width="2"/>
          <text x="164" y="68" text-anchor="middle" font-size="14" font-weight="900" fill="#9a3412">${escSvg(v2)}</text>
          <text x="164" y="88" text-anchor="middle" font-size="10.5" font-weight="700" fill="#7c2d12">2. Bütün</text>

          <path d="M 216 74 L 248 74" stroke="#2563eb" stroke-width="2.5" stroke-linecap="round"/>
          <polygon points="248,68 258,74 248,80" fill="#2563eb"/>

          <rect x="268" y="48" width="58" height="62" rx="10" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
          <text x="297" y="77" text-anchor="middle" font-size="13" font-weight="900" fill="#15803d">x Birim</text>
          <text x="297" y="95" text-anchor="middle" font-size="10" font-weight="700" fill="#166534">Eşit Parça</text>

          <text x="180" y="${vbH - 8}" text-anchor="middle" font-size="11.5" font-weight="800" fill="#334155">Karıştırmadan &amp; artmadan en az sayıda eşit kap</text>
        </svg>
      `;
    }

    // 5) TOMRUK / TEL / ŞERİT KESİMİ (ör. U1S28: 48 dm & 72 dm, U3S21, U3S28)
    if (lower.includes("tomruk") || lower.includes("kesim") || (lower.includes("tel") && lower.includes("parça")) || lower.includes("şeridin")) {
      const lens = plain.match(/(?:√[0-9]+|[0-9]+)\s*(?:dm|cm|m|metre)\b/gi) || ["48 dm", "72 dm"];
      const l1 = lens[0] || "I. Parça";
      const l2 = lens[1] || "";
      return `
        <svg class="q-schematic-svg" viewBox="0 0 360 ${vbH}" role="img" aria-label="Eşit Parçalara Kesim Modeli">
          <rect x="44" y="34" width="176" height="28" rx="8" fill="#fed7aa" stroke="#c2410c" stroke-width="2"/>
          <line x1="132" y1="29" x2="132" y2="67" stroke="#dc2626" stroke-width="2" stroke-dasharray="4 3"/>
          <text x="232" y="53" font-size="12.5" font-weight="800" fill="#9a3412">I: ${escSvg(l1)}</text>

          ${l2 ? `
          <rect x="44" y="82" width="246" height="28" rx="8" fill="#fde68a" stroke="#b45309" stroke-width="2"/>
          <line x1="126" y1="77" x2="126" y2="115" stroke="#dc2626" stroke-width="2" stroke-dasharray="4 3"/>
          <line x1="208" y1="77" x2="208" y2="115" stroke="#dc2626" stroke-width="2" stroke-dasharray="4 3"/>
          <text x="298" y="101" font-size="12.5" font-weight="800" fill="#92400e">II: ${escSvg(l2)}</text>
          ` : ""}
          <text x="180" y="${vbH - 8}" text-anchor="middle" font-size="11.5" font-weight="800" fill="#334155">Kural: N eş parça elde etmek için (N − 1) kesim yapılır</text>
        </svg>
      `;
    }

    // 6) GÜNEŞ PANELLERİ / ORTAK HİZA DİZİLİMİ (ör. U1S29: 60 cm A & 80 cm B)
    if (lower.includes("panel") || lower.includes("aynı hizada")) {
      return `
        <svg class="q-schematic-svg" viewBox="0 0 360 ${vbH}" role="img" aria-label="Ortak Hiza Panel Dizilimi">
          <line x1="42" y1="18" x2="42" y2="126" stroke="#16a34a" stroke-width="2.2" stroke-dasharray="4 3"/>
          <line x1="318" y1="18" x2="318" y2="126" stroke="#16a34a" stroke-width="2.2" stroke-dasharray="4 3"/>
          <!-- Üst sıra: A (60 cm) -->
          <rect x="42" y="28" width="69" height="34" rx="4" fill="#dbeafe" stroke="#1d4ed8" stroke-width="1.8"/>
          <rect x="111" y="28" width="69" height="34" rx="4" fill="#dbeafe" stroke="#1d4ed8" stroke-width="1.8"/>
          <rect x="180" y="28" width="138" height="34" rx="4" fill="#eff6ff" stroke="#93c5fd" stroke-width="1.5" stroke-dasharray="5 4"/>
          <text x="76" y="49" text-anchor="middle" font-size="11.5" font-weight="800" fill="#1e3a8a">A: 60 cm</text>
          <text x="145" y="49" text-anchor="middle" font-size="11.5" font-weight="800" fill="#1e3a8a">60 cm</text>
          <text x="249" y="49" text-anchor="middle" font-size="12" font-weight="800" fill="#64748b">• • •</text>
          <!-- Alt sıra: B (80 cm) -->
          <rect x="42" y="76" width="92" height="34" rx="4" fill="#dcfce7" stroke="#15803d" stroke-width="1.8"/>
          <rect x="134" y="76" width="92" height="34" rx="4" fill="#dcfce7" stroke="#15803d" stroke-width="1.8"/>
          <rect x="226" y="76" width="92" height="34" rx="4" fill="#f0fdf4" stroke="#86efac" stroke-width="1.5" stroke-dasharray="5 4"/>
          <text x="88" y="97" text-anchor="middle" font-size="11.5" font-weight="800" fill="#14532d">B: 80 cm</text>
          <text x="180" y="97" text-anchor="middle" font-size="11.5" font-weight="800" fill="#14532d">80 cm</text>
          <text x="272" y="97" text-anchor="middle" font-size="12" font-weight="800" fill="#64748b">• • •</text>
          <text x="180" y="${vbH - 8}" text-anchor="middle" font-size="11.5" font-weight="800" fill="#15803d">Ortak Hat Uzunluğu = L = EKOK(60, 80)</text>
        </svg>
      `;
    }

    // 7) ARTAN CEVİZLER / GRUPLANDIRMA (ör. U1S22: 6'şar ve 8'er + 3 artan, > 100)
    if (lower.includes("ceviz") || lower.includes("artmaktadır")) {
      return `
        <svg class="q-schematic-svg" viewBox="0 0 360 ${vbH}" role="img" aria-label="Kalanlı Gruplandırma Bağıntısı">
          <rect x="28" y="22" width="304" height="102" rx="14" fill="#fffbeb" stroke="#f59e0b" stroke-width="1.8"/>
          <text x="180" y="52" text-anchor="middle" font-size="13.5" font-weight="900" fill="#92400e">Ceviz Sayısı (C) Bağıntısı</text>
          <text x="180" y="80" text-anchor="middle" font-size="14" font-weight="800" fill="#0f172a">C = 6 · x + 3 = 8 · y + 3</text>
          <text x="180" y="106" text-anchor="middle" font-size="12.5" font-weight="800" fill="#1d4ed8">Koşul: C &gt; 100  ⇒  En az C = ?</text>
          <text x="180" y="${vbH - 8}" text-anchor="middle" font-size="11.5" font-weight="700" fill="#475569">6 ve 8'in ortak katından 3 fazla olan sayı</text>
        </svg>
      `;
    }

    // 8) BİTİŞİK VEYA TEKİL KARELER (ör. U3S5: 64 cm² & 25 cm², U3S29, U6S15, U6S28, U6S29)
    if (lower.includes("kare") && !lower.includes("tam kare")) {
      const areas = plain.match(/(?:\([^)]+\)|[0-9]+)\s*(?:cm|m|br)[²2]/gi) || [];
      if (areas.length >= 2) {
        return `
          <svg class="q-schematic-svg" viewBox="0 0 360 205" role="img" aria-label="Bitişik Kareler Modeli">
            <rect x="66" y="34" width="112" height="112" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2.4"/>
            <rect x="178" y="68" width="78" height="78" fill="#dcfce7" stroke="#15803d" stroke-width="2.4"/>
            <text x="122" y="95" text-anchor="middle" font-size="13.5" font-weight="900" fill="#1e3a8a">${escSvg(areas[0])}</text>
            <text x="217" y="112" text-anchor="middle" font-size="12.5" font-weight="900" fill="#14532d">${escSvg(areas[1])}</text>
            <line x1="66" y1="164" x2="256" y2="164" stroke="#ea580c" stroke-width="2.2"/>
            <text x="161" y="184" text-anchor="middle" font-size="12.5" font-weight="800" fill="#c2410c">Toplam Uzunluk = ?</text>
          </svg>
        `;
      }
      const label = areas[0] || (plain.match(/\([^)]+\)\s*cm/i) || ["a cm"])[0];
      return `
        <svg class="q-schematic-svg" viewBox="0 0 360 205" role="img" aria-label="ABCD Karesi Modeli">
          <rect x="118" y="28" width="124" height="124" rx="4" fill="#eff6ff" stroke="#1d4ed8" stroke-width="2.4"/>
          <text x="104" y="26" font-size="12.5" font-weight="800" fill="#0f172a">A</text>
          <text x="248" y="26" font-size="12.5" font-weight="800" fill="#0f172a">B</text>
          <text x="248" y="164" font-size="12.5" font-weight="800" fill="#0f172a">C</text>
          <text x="104" y="164" font-size="12.5" font-weight="800" fill="#0f172a">D</text>
          <text x="180" y="95" text-anchor="middle" font-size="12.5" font-weight="900" fill="#1e3a8a">${escSvg(label)}</text>
          <text x="180" y="188" text-anchor="middle" font-size="11.5" font-weight="700" fill="#475569">ABCD Karesi • Tüm kenar uzunlukları eşittir</text>
        </svg>
      `;
    }

    // 9) DAİRE GRAFİĞİ / SÜTUN GRAFİĞİ (Ünite 4 & U5S26)
    if (lower.includes("daire grafiği")) {
      const degs = (plain.match(/[0-9]+\s*°/g) || ["120°", "90°"]).slice(0, 3);
      return `
        <svg class="q-schematic-svg" viewBox="0 0 360 205" role="img" aria-label="360 Derece Daire Grafiği Modeli">
          <circle cx="132" cy="100" r="68" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2.2"/>
          <path d="M 132 100 L 132 32 A 68 68 0 0 1 191 134 Z" fill="#bbf7d0" stroke="#15803d" stroke-width="2"/>
          <path d="M 132 100 L 191 134 A 68 68 0 0 1 73 134 Z" fill="#fed7aa" stroke="#ea580c" stroke-width="2"/>
          <circle cx="132" cy="100" r="3" fill="#0f172a"/>
          <text x="156" y="84" font-size="12" font-weight="900" fill="#14532d">${escSvg(degs[0])}</text>
          ${degs[1] ? `<text x="132" y="146" text-anchor="middle" font-size="12" font-weight="900" fill="#9a3412">${escSvg(degs[1])}</text>` : ""}
          <rect x="218" y="54" width="118" height="92" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
          <text x="277" y="82" text-anchor="middle" font-size="12" font-weight="800" fill="#1e40af">Tam Açı</text>
          <text x="277" y="106" text-anchor="middle" font-size="16" font-weight="900" fill="#0f172a">360°</text>
          <text x="277" y="128" text-anchor="middle" font-size="10.5" font-weight="700" fill="#475569">Orantı Kur</text>
        </svg>
      `;
    }

    if (lower.includes("sütun grafiği")) {
      return `
        <svg class="q-schematic-svg" viewBox="0 0 360 205" role="img" aria-label="Sütun Grafiği Modeli">
          <line x1="58" y1="30" x2="58" y2="162" stroke="#334155" stroke-width="2"/>
          <line x1="58" y1="162" x2="310" y2="162" stroke="#334155" stroke-width="2"/>
          <rect x="84" y="106" width="34" height="56" rx="5" fill="#60a5fa"/>
          <rect x="138" y="78" width="34" height="84" rx="5" fill="#34d399"/>
          <rect x="192" y="92" width="34" height="70" rx="5" fill="#fbbf24"/>
          <rect x="246" y="42" width="34" height="120" rx="5" fill="#f97316"/>
          <text x="101" y="99" text-anchor="middle" font-size="12" font-weight="800" fill="#1e3a8a">4</text>
          <text x="155" y="71" text-anchor="middle" font-size="12" font-weight="800" fill="#065f46">6</text>
          <text x="209" y="85" text-anchor="middle" font-size="12" font-weight="800" fill="#92400e">5</text>
          <text x="263" y="35" text-anchor="middle" font-size="12" font-weight="800" fill="#9a3412">9</text>
          <text x="180" y="188" text-anchor="middle" font-size="11.5" font-weight="800" fill="#475569">Aritmetik Ortalama = Toplam ÷ Veri Sayısı</text>
        </svg>
      `;
    }

    // 10) KOORDİNAT DÜZLEMİ / YANSIMA / ÖTELEME (Ünite 7 & 11)
    if (lower.includes("koordinat") || lower.includes("eksen") || lower.includes("ötele") || lower.includes("yansıma")) {
      const pt = (plain.match(/[A-Z]'?\([^)]+\)/) || ["A(x, y)"])[0];
      return `
        <svg class="q-schematic-svg" viewBox="0 0 360 205" role="img" aria-label="Koordinat Sistemi Modeli">
          <rect x="34" y="16" width="292" height="172" rx="12" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
          <line x1="60" y1="102" x2="300" y2="102" stroke="#334155" stroke-width="2"/>
          <line x1="180" y1="26" x2="180" y2="176" stroke="#334155" stroke-width="2"/>
          <text x="306" y="106" font-size="12.5" font-weight="900" fill="#0f172a">x</text>
          <text x="186" y="30" font-size="12.5" font-weight="900" fill="#0f172a">y</text>
          <circle cx="132" cy="64" r="5.5" fill="#2563eb"/>
          <line x1="132" y1="64" x2="132" y2="102" stroke="#93c5fd" stroke-dasharray="3 3" stroke-width="1.5"/>
          <line x1="132" y1="64" x2="180" y2="64" stroke="#93c5fd" stroke-dasharray="3 3" stroke-width="1.5"/>
          <text x="124" y="54" text-anchor="end" font-size="12.5" font-weight="900" fill="#1d4ed8">${escSvg(pt)}</text>
        </svg>
      `;
    }

    // 11) ÜÇGEN / PİSAGOR / EĞİM / BENZERLİK (Ünite 7, 9, 10)
    if (lower.includes("üçgen") || lower.includes("hipotenüs") || lower.includes("rampa") || lower.includes("gölge") || lower.includes("pisagor")) {
      const meas = plain.match(/[0-9]+(?:[.,][0-9]+)?\s*(?:cm|m|metre|%)/gi) || [];
      const m1 = meas[0] || "a";
      const m2 = meas[1] || "b";
      return `
        <svg class="q-schematic-svg" viewBox="0 0 360 205" role="img" aria-label="ABC Üçgeni Geometrik Modeli">
          <polygon points="92,38 92,154 268,154" fill="#eff6ff" stroke="#1d4ed8" stroke-width="2.5" stroke-linejoin="round"/>
          <path d="M 92 138 L 108 138 L 108 154" fill="none" stroke="#1e40af" stroke-width="1.8"/>
          <text x="76" y="38" font-size="13" font-weight="900" fill="#0f172a">A</text>
          <text x="76" y="162" font-size="13" font-weight="900" fill="#0f172a">B</text>
          <text x="276" y="162" font-size="13" font-weight="900" fill="#0f172a">C</text>
          <text x="82" y="102" text-anchor="end" font-size="12.5" font-weight="800" fill="#15803d">${escSvg(m1)}</text>
          <text x="180" y="174" text-anchor="middle" font-size="12.5" font-weight="800" fill="#1d4ed8">${escSvg(m2)}</text>
          <text x="192" y="88" font-size="12.5" font-weight="800" fill="#ea580c">|AC| = ?</text>
        </svg>
      `;
    }

    // 12) GEOMETRİK CİSİMLER: SİLİNDİR / KONİ / PRİZMA (Ünite 12)
    if (lower.includes("silindir") || lower.includes("koni") || lower.includes("prizma")) {
      const isCone = lower.includes("koni");
      const rMatch = (plain.match(/yarıçapı\s*([0-9]+\s*(?:cm|m))/i) || [])[1] || "r";
      const hMatch = (plain.match(/(?:yüksekliği|uzunluğu|genişliği)\s*([0-9]+\s*(?:cm|m|metre))/i) || [])[1] || "h";
      if (isCone) {
        return `
          <svg class="q-schematic-svg" viewBox="0 0 360 205" role="img" aria-label="Dik Koni Modeli">
            <polygon points="180,28 112,152 248,152" fill="#eff6ff" stroke="#1d4ed8" stroke-width="2.3"/>
            <ellipse cx="180" cy="152" rx="68" ry="18" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2.2"/>
            <line x1="180" y1="28" x2="180" y2="152" stroke="#16a34a" stroke-width="1.8" stroke-dasharray="4 3"/>
            <line x1="180" y1="152" x2="248" y2="152" stroke="#ea580c" stroke-width="2"/>
            <text x="172" y="98" text-anchor="end" font-size="12" font-weight="800" fill="#15803d">h</text>
            <text x="214" y="146" text-anchor="middle" font-size="12" font-weight="800" fill="#c2410c">${escSvg(rMatch)}</text>
          </svg>
        `;
      }
      return `
        <svg class="q-schematic-svg" viewBox="0 0 360 205" role="img" aria-label="Dik Dairesel Silindir Modeli">
          <rect x="116" y="46" width="128" height="106" fill="#eff6ff" stroke="none"/>
          <line x1="116" y1="46" x2="116" y2="152" stroke="#1d4ed8" stroke-width="2.3"/>
          <line x1="244" y1="46" x2="244" y2="152" stroke="#1d4ed8" stroke-width="2.3"/>
          <ellipse cx="180" cy="152" rx="64" ry="16" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2.2"/>
          <ellipse cx="180" cy="46" rx="64" ry="16" fill="#bfdbfe" stroke="#1d4ed8" stroke-width="2.2"/>
          <line x1="180" y1="46" x2="244" y2="46" stroke="#ea580c" stroke-width="2"/>
          <text x="212" y="40" text-anchor="middle" font-size="12" font-weight="800" fill="#c2410c">r: ${escSvg(rMatch)}</text>
          <text x="256" y="104" font-size="12.5" font-weight="800" fill="#15803d">h: ${escSvg(hMatch)}</text>
        </svg>
      `;
    }

    // 13) TERAZİ / EŞİTSİZLİK SAYI DOĞRUSU / CETVEL (Ünite 3 & 8)
    if (lower.includes("terazi")) {
      return `
        <svg class="q-schematic-svg" viewBox="0 0 360 205" role="img" aria-label="Eşitsizlik Terazisi Modeli">
          <polygon points="180,126 160,172 200,172" fill="#cbd5e1" stroke="#475569" stroke-width="2"/>
          <line x1="76" y1="112" x2="284" y2="78" stroke="#1e293b" stroke-width="3.2" stroke-linecap="round"/>
          <rect x="46" y="114" width="68" height="34" rx="8" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>
          <rect x="246" y="80" width="68" height="34" rx="8" fill="#dcfce7" stroke="#15803d" stroke-width="2"/>
          <text x="80" y="135" text-anchor="middle" font-size="11.5" font-weight="800" fill="#1e3a8a">3x + 2 kg</text>
          <text x="280" y="101" text-anchor="middle" font-size="11.5" font-weight="800" fill="#14532d">x + 18 kg</text>
          <text x="180" y="192" text-anchor="middle" font-size="11.5" font-weight="800" fill="#475569">Sol kefe daha ağır ⇒ 3x + 2 &gt; x + 18</text>
        </svg>
      `;
    }

    if (lower.includes("cetvel") || lower.includes("eşitsizli")) {
      return `
        <svg class="q-schematic-svg" viewBox="0 0 360 205" role="img" aria-label="Sayı Doğrusu Modeli">
          <rect x="28" y="28" width="304" height="148" rx="14" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
          <line x1="52" y1="108" x2="308" y2="108" stroke="#334155" stroke-width="2.4"/>
          <polygon points="308,103 318,108 308,113" fill="#334155"/>
          <polygon points="52,103 42,108 52,113" fill="#334155"/>
          <line x1="110" y1="98" x2="110" y2="118" stroke="#1d4ed8" stroke-width="2.4"/>
          <line x1="250" y1="98" x2="250" y2="118" stroke="#15803d" stroke-width="2.4"/>
          <line x1="110" y1="108" x2="250" y2="108" stroke="#2563eb" stroke-width="5" opacity="0.45"/>
          <circle cx="110" cy="108" r="5.5" fill="#ffffff" stroke="#1d4ed8" stroke-width="2.4"/>
          <circle cx="250" cy="108" r="5.5" fill="#16a34a"/>
          <text x="180" y="72" text-anchor="middle" font-size="13" font-weight="800" fill="#0f172a">${escSvg((extractQuestionSummaryMeta(stop).givenPills[0] || kaz.title).slice(0, 34))}</text>
          <text x="180" y="152" text-anchor="middle" font-size="11.5" font-weight="700" fill="#475569">Sınır noktalarının dahil / hariç durumuna dikkat et</text>
        </svg>
      `;
    }

    // 14) CEBİRSEL / KESİR / ÜSLÜ / OLASILIK BAĞINTI KARTI (Tüm sembolik sorularla %100 ilişkili)
    const meta = extractQuestionSummaryMeta(stop);
    const line1 = meta.givenPills[0] || kaz.title;
    const line2 = meta.givenPills[1] || `Ünite ${UNIT.unitNo} • ${kaz.code || "LGS"}`;
    return `
      <svg class="q-schematic-svg" viewBox="0 0 360 205" role="img" aria-label="Soru Bağıntı Şeması">
        <rect x="26" y="18" width="308" height="168" rx="16" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.6"/>
        <rect x="46" y="36" width="268" height="48" rx="10" fill="#eff6ff" stroke="#93c5fd" stroke-width="1.5"/>
        <text x="180" y="55" text-anchor="middle" font-size="10.5" font-weight="800" fill="#1d4ed8">VERİLEN BAĞINTI</text>
        <text x="180" y="74" text-anchor="middle" font-size="13.5" font-weight="900" fill="#0f172a">${escSvg(line1.slice(0, 36))}</text>

        <path d="M 180 88 L 180 106" stroke="#2563eb" stroke-width="2" stroke-linecap="round"/>
        <polygon points="175,104 180,112 185,104" fill="#2563eb"/>

        <rect x="46" y="116" width="268" height="50" rx="10" fill="#f0fdf4" stroke="#86efac" stroke-width="1.5"/>
        <text x="180" y="135" text-anchor="middle" font-size="10.5" font-weight="800" fill="#15803d">HEDEF &amp; İLİŞKİ</text>
        <text x="180" y="154" text-anchor="middle" font-size="12.5" font-weight="800" fill="#14532d">${escSvg(line2.slice(0, 38))}</text>
      </svg>
    `;
  }

  function buildQuestionModelCardHtml(stop, kaz, UNIT) {
    const schematicSvg = buildDynamicMathSchematic(stop, kaz, UNIT);
    const flowImgHtml = stop.questionVisual
      ? `
        <div class="q-flow-scene-frame">
          <img src="${stop.questionVisual}" onerror="this.parentElement.style.display='none'" alt="${escSvg(stop.title)}">
          <span class="q-flow-scene-tag">✨ Google Flow Sahne</span>
        </div>
      `
      : "";

    return `
      <div class="q-model-card ${stop.questionVisual ? "has-flow-scene" : ""}">
        <div class="q-model-head">
          <span class="q-model-badge">📐 Görsel &amp; Matematiksel Model</span>
          <span class="q-model-code">${escSvg(kaz.code || `Ünite ${UNIT.unitNo}`)}</span>
        </div>
        ${flowImgHtml}
        <div class="q-schematic-stage">
          ${schematicSvg}
        </div>
      </div>
    `;
  }

  function renderQuestionStop(stop, kaz, container, UNIT) {
    const layout = document.createElement("div");
    layout.className = "question-layout";

    const meta = extractQuestionSummaryMeta(stop);
    const givenBadgesHtml = meta.givenPills.length > 0
      ? meta.givenPills.map(g => `<span class="q-book-given-pill">${renderOptionMath(g)}</span>`).join("")
      : `<span class="q-book-given-pill">${escSvg(kaz.title)}</span>`;

    const left = document.createElement("div");
    left.className = "question-left-col";
    left.innerHTML = `
      <article class="question-book-card">
        <div class="question-book-top">
          <span class="question-book-ribbon">📘 SORU KARTI • DURAK ${stop.id}</span>
          <span class="question-book-topic">${escSvg(kaz.title)}</span>
        </div>
        <div class="question-book-stem">
          <p>${safeMathHtml(stop.stem)}</p>
        </div>
        <div class="question-book-summary">
          <span class="q-book-sum-label">Önemli Veriler:</span>
          <div class="q-book-sum-pills">${givenBadgesHtml}</div>
        </div>
      </article>
      <div class="options-grid" id="qOptionsGrid"></div>
    `;

    const right = document.createElement("div");
    right.className = "question-right-col";
    right.innerHTML = `
      ${buildQuestionModelCardHtml(stop, kaz, UNIT)}
      <div id="solutionArea"></div>
    `;

    const grid = left.querySelector("#qOptionsGrid");
    const solArea = right.querySelector("#solutionArea");

    if (isStopDone(stop.id, UNIT)) {
      solArea.innerHTML = `
        <div class="solution-box">
          <h4>✓ Adım Adım Çözüm</h4>
          <p>${safeMathHtml(stop.solution)}</p>
        </div>
      `;
    }

    stop.options.forEach(opt => {
      const btn = document.createElement("button");
      btn.className = "option-btn";
      if (isStopDone(stop.id, UNIT) && opt.letter === stop.correctLetter) {
        btn.classList.add("correct");
      }
      btn.innerHTML = `<span class="option-letter">${opt.letter}</span><span class="option-text-body">${renderOptionMath(opt.text)}</span>`;

      btn.addEventListener("click", () => {
        if (window.NartesMentor && window.NartesMentor.isRemediationLocked()) return;
        if (opt.letter === stop.correctLetter) {
          grid.querySelectorAll(".option-btn").forEach(b => b.disabled = true);
          btn.classList.add("correct");
          solArea.innerHTML = `
            <div class="solution-box">
              <h4>✓ Adım Adım Çözüm</h4>
              <p>${safeMathHtml(stop.solution)}</p>
            </div>
          `;
          applyKaTeX(solArea);
          completeCurrentStop("Soruyu doğru çözdün!");
        } else {
          playTone("error");
          btn.classList.add("wrong-flash");
          const wrongLabel = `${opt.letter}) ${opt.text}`;
          if (window.NartesMentor) {
            window.NartesMentor.onWrong({
              wrongValue: wrongLabel,
              targetKey: `question_${stop.id}`,
              targetLabel: stop.stem,
              customHint: stop.hint
            }, () => {
              btn.classList.remove("wrong-flash");
            });
          }
        }
      });

      grid.appendChild(btn);
    });

    layout.appendChild(left);
    layout.appendChild(right);
    container.appendChild(layout);
  }

  // ==========================================================================
  // 12 ÜNİTE LGS KAMPÜS HARİTASI MODALI
  // ==========================================================================
  function openAllUnitsModal() {
    const modal = document.getElementById("infoModal");
    const modalContent = document.getElementById("infoModalContent");

    const cardsHtml = ALL_UNITS.map(u => {
      const uState = getUnitState(u);
      const doneCount = uState.completedStops.length;
      const isDone = doneCount === u.stops.length;
      const isActive = u.unitNo === state.currentUnitNo;
      return `
        <div class="unit-card-item ${isDone ? "unit-done" : "unit-todo"} ${isActive ? "unit-active" : ""}" data-unit="${u.unitNo}">
          <div class="unit-card-thumb" style="background-image:url('${u.coverImage}')">
            <span class="unit-card-no">${u.unitNo}. ÜNİTE</span>
            <span class="unit-card-status ${isDone ? "done" : "todo"}">
              ${isDone ? "✓ Tamamlandı" : `${doneCount}/${u.stops.length} Durak`}
            </span>
          </div>
          <div class="unit-card-body">
            <div class="unit-card-title">${u.title}</div>
            <div class="unit-card-sub">${u.subtitle}</div>
          </div>
        </div>
      `;
    }).join("");

    modalContent.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
        <div>
          <h2 style="font-size:21px;font-weight:900;color:#0f172a;">📚 8. Sınıf LGS Matematik — Tüm 12 Ünite (360 Durak)</h2>
          <p style="font-size:13px;color:#64748b;">Çalışmak istediğin ünite kartına tıklayarak o ünitenin 30 duraklık yol haritasına geçebilirsin.</p>
        </div>
        <button id="closeModalBtn" style="border:none;background:#e2e8f0;padding:8px 14px;border-radius:10px;cursor:pointer;font-weight:800;">Kapat ✕</button>
      </div>
      <div class="units-grid-modal">${cardsHtml}</div>
    `;

    modal.hidden = false;
    document.getElementById("closeModalBtn").onclick = () => { modal.hidden = true; };
    modalContent.querySelectorAll(".unit-card-item").forEach(card => {
      card.addEventListener("click", () => {
        const uNo = parseInt(card.getAttribute("data-unit"), 10);
        modal.hidden = true;
        switchUnit(uNo);
      });
    });
  }

  // ==========================================================================
  // NARTES+ LOGO TASARIM ATÖLYESİ & CANLI LOGO SEÇİCİ (6 Vektörel SVG + 4 Stüdyo Pano)
  // ==========================================================================
  const NARTES_LOGOS = [
    {
      id: "logo-1-karo-nar",
      title: "1. Karo Nar Tacı & Hibrit t/+ (Önerilen)",
      desc: "Nartest'in Nar tacını matematik karolarıyla birleştiren amblem + sondaki 't' harfi '+' olarak tasarlanmış Nartes+.",
      svgDark: `<svg class="nartes-svg-logo" viewBox="0 0 196 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 7L15 3L18.5 6.5L22 3L25 7H12Z" fill="#F97316"/>
        <rect x="6" y="9" width="7.5" height="7.5" rx="2.2" fill="#F97316"/>
        <rect x="15" y="9" width="7.5" height="7.5" rx="2.2" fill="#22C55E"/>
        <rect x="24" y="9" width="7.5" height="7.5" rx="2.2" fill="#38BDF8"/>
        <rect x="6" y="18" width="7.5" height="7.5" rx="2.2" fill="#FACC15"/>
        <rect x="15" y="18" width="7.5" height="7.5" rx="2.2" fill="#3B82F6"/>
        <rect x="24" y="18" width="7.5" height="7.5" rx="2.2" fill="#F97316"/>
        <rect x="10" y="27" width="7.5" height="7.5" rx="2.2" fill="#22C55E"/>
        <rect x="19.5" y="27" width="7.5" height="7.5" rx="2.2" fill="#FACC15"/>
        <text x="39" y="28" fill="#FFFFFF" font-family="Inter, sans-serif" font-weight="900" font-size="24" letter-spacing="-0.6">Nartes</text>
        <g transform="translate(120, 5)">
          <rect x="9.5" y="2" width="6.5" height="25" rx="3.2" fill="#22C55E"/>
          <rect x="1" y="11" width="23.5" height="6.5" rx="3.2" fill="#F97316"/>
          <rect x="9.5" y="11" width="6.5" height="6.5" rx="1.5" fill="#FACC15"/>
        </g>
      </svg>`
    },
    {
      id: "logo-2-3d-kup",
      title: "2. NARTES+ 3B Oyun Küpü (Seçilen Ana Logo)",
      desc: "Renkli 3B NARTES tipografisi ve sonda hafif eğimli parlayan turuncu-yeşil '+' oyun küpü (T-Artı).",
      svgDark: `<svg class="nartes-svg-logo" viewBox="0 0 212 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gradN" x1="0" y1="6" x2="0" y2="36" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#60A5FA"/>
            <stop offset="100%" stop-color="#2563EB"/>
          </linearGradient>
          <linearGradient id="gradA" x1="0" y1="6" x2="0" y2="36" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#4ADE80"/>
            <stop offset="100%" stop-color="#16A34A"/>
          </linearGradient>
          <linearGradient id="gradR" x1="0" y1="6" x2="0" y2="36" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#FDE047"/>
            <stop offset="100%" stop-color="#CA8A04"/>
          </linearGradient>
          <linearGradient id="gradT" x1="0" y1="6" x2="0" y2="36" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#34D399"/>
            <stop offset="100%" stop-color="#059669"/>
          </linearGradient>
          <linearGradient id="gradE" x1="0" y1="6" x2="0" y2="36" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#BEF264"/>
            <stop offset="100%" stop-color="#65A30D"/>
          </linearGradient>
          <linearGradient id="gradS" x1="0" y1="6" x2="0" y2="36" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#FB923C"/>
            <stop offset="100%" stop-color="#EA580C"/>
          </linearGradient>
          <linearGradient id="cubeBody" x1="0" y1="0" x2="34" y2="34" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#F97316"/>
            <stop offset="48%" stop-color="#F59E0B"/>
            <stop offset="100%" stop-color="#10B981"/>
          </linearGradient>
          <linearGradient id="plusInner" x1="6" y1="6" x2="28" y2="28" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#EA580C"/>
            <stop offset="100%" stop-color="#059669"/>
          </linearGradient>
        </defs>
        <g font-family="'Inter', -apple-system, BlinkMacSystemFont, sans-serif" font-weight="900" font-size="28" letter-spacing="0.4">
          <text x="2"   y="32" fill="url(#gradN)">N</text>
          <text x="25"  y="32" fill="url(#gradA)">A</text>
          <text x="48"  y="32" fill="url(#gradR)">R</text>
          <text x="70"  y="32" fill="url(#gradT)">T</text>
          <text x="90"  y="32" fill="url(#gradE)">E</text>
          <text x="110" y="32" fill="url(#gradS)">S</text>
        </g>
        <g transform="translate(133, 4) rotate(10 17 17)">
          <rect x="2" y="3" width="32" height="32" rx="8.5" fill="#064E3B" opacity="0.65"/>
          <rect x="1" y="1" width="32" height="32" rx="8.5" fill="url(#cubeBody)" stroke="#FDE68A" stroke-width="1.3"/>
          <path d="M17 8V26M8 17H26" stroke="#FFFFFF" stroke-width="6.6" stroke-linecap="round"/>
          <path d="M17 8V26M8 17H26" stroke="url(#plusInner)" stroke-width="4" stroke-linecap="round"/>
        </g>
      </svg>`
    },
    {
      id: "logo-3-tangram-nar",
      title: "3. Tangram Nar & Kurumsal Nartes+",
      desc: "Geometrik Tangram üçgenlerinden oluşan Nar amblemi ve 't' kuyruklu zarif Nartes+ logotipi.",
      svgDark: `<svg class="nartes-svg-logo" viewBox="0 0 198 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="14,7 18,2 22,7" fill="#F97316"/>
        <polygon points="8,12 18,7 28,12 18,21" fill="#EF4444"/>
        <polygon points="7,13 17,22 7,31" fill="#F97316"/>
        <polygon points="29,13 19,22 29,31" fill="#22C55E"/>
        <polygon points="8,32 18,23 28,32 18,37" fill="#38BDF8"/>
        <text x="37" y="28" fill="#FFFFFF" font-family="Inter, sans-serif" font-weight="800" font-size="24" letter-spacing="-0.5">Nartes</text>
        <path d="M126 9V27C126 30 128 31 131 31M118 17H134" stroke="#F97316" stroke-width="5.2" stroke-linecap="round"/>
        <circle cx="126" cy="17" r="2.6" fill="#22C55E"/>
      </svg>`
    },
    {
      id: "logo-4-akis-dugum",
      title: "4. Yeşil-Turuncu Akış Yolu (N-Flow) Nartes+",
      desc: "Uygulamadaki tamamlanan (Yeşil) ve bekleyen (Turuncu) duraklardan oluşan 'N' akış ikonu + Nartes+.",
      svgDark: `<svg class="nartes-svg-logo" viewBox="0 0 202 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 30L14 11L23 29L30 10" stroke="url(#nodeLine)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="7" cy="30" r="4.5" fill="#16A34A"/>
        <circle cx="14" cy="11" r="4.5" fill="#22C55E"/>
        <circle cx="23" cy="29" r="4.5" fill="#F97316"/>
        <circle cx="30" cy="10" r="4.5" fill="#FACC15"/>
        <text x="41" y="28" fill="#FFFFFF" font-family="Inter, sans-serif" font-weight="900" font-size="23.5" letter-spacing="-0.5">Nartes</text>
        <g transform="translate(121, 7)">
          <rect x="8.5" y="1" width="5.5" height="22" rx="2.7" fill="#22C55E"/>
          <rect x="0" y="9" width="22.5" height="5.5" rx="2.7" fill="#F97316"/>
        </g>
        <defs>
          <linearGradient id="nodeLine" x1="7" y1="20" x2="30" y2="20" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#22C55E"/>
            <stop offset="100%" stop-color="#F97316"/>
          </linearGradient>
        </defs>
      </svg>`
    },
    {
      id: "logo-5-t-arti-minimal",
      title: "5. Saf Tipografik NARTES+ (T = +)",
      desc: "Sondaki T harfinin üst şapkası ile + işaretinin birleştiği keskin, modern kurumsal NARTEST / NARTES+ hibriti.",
      svgDark: `<svg class="nartes-svg-logo" viewBox="0 0 186 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="4" y="28" fill="#FFFFFF" font-family="Inter, sans-serif" font-weight="900" font-size="24" letter-spacing="-0.3">NARTES</text>
        <g transform="translate(107, 6)">
          <!-- Üst T şapkası (ince) + Orta + kolu (vurgu) -->
          <rect x="2" y="1" width="20" height="4.5" rx="2.2" fill="#38BDF8" opacity="0.85"/>
          <rect x="9" y="1" width="6" height="24" rx="3" fill="#22C55E"/>
          <rect x="1" y="11" width="22" height="6" rx="3" fill="#F97316"/>
        </g>
      </svg>`
    },
    {
      id: "logo-6-rozet-kapsul",
      title: "6. Nartes+ Akıllı Kapsül Rozeti",
      desc: "Lacivert-turuncu kapsül içinde Nartes ve sağda yeşil onaylı '+' rozeti.",
      svgDark: `<svg class="nartes-svg-logo" viewBox="0 0 196 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="4" width="146" height="32" rx="16" fill="#1E293B" stroke="#F97316" stroke-width="1.8"/>
        <text x="18" y="26" fill="#FFFFFF" font-family="Inter, sans-serif" font-weight="900" font-size="20" letter-spacing="-0.4">Nartes</text>
        <circle cx="118" cy="20" r="12" fill="#16A34A"/>
        <path d="M118 13V27M111 20H125" stroke="#FFFFFF" stroke-width="3.6" stroke-linecap="round"/>
      </svg>`
    }
  ];

  function applySelectedLogo(logoId) {
    const chosen = NARTES_LOGOS.find(l => l.id === logoId) || NARTES_LOGOS[0];
    const mount = document.getElementById("brandLogoMount");
    if (mount) {
      mount.innerHTML = chosen.svgDark;
    }
    try {
      localStorage.setItem("nartes_plus_logo_id", chosen.id);
    } catch (e) {}
  }

  function openLogoStudioModal() {
    const modal = document.getElementById("infoModal");
    const modalContent = document.getElementById("infoModalContent");
    const currentLogoId = localStorage.getItem("nartes_plus_logo_id") || NARTES_LOGOS[0].id;

    const svgCardsHtml = NARTES_LOGOS.map(l => {
      const isSelected = l.id === currentLogoId;
      return `
        <div style="border:2px solid ${isSelected ? "#16a34a" : "#e2e8f0"};border-radius:16px;padding:14px;background:${isSelected ? "#f0fdf4" : "#ffffff"};display:flex;flex-direction:column;justify-content:space-between;gap:10px;">
          <div style="background:#111827;padding:14px;border-radius:12px;display:flex;align-items:center;justify-content:center;min-height:64px;">
            ${l.svgDark}
          </div>
          <div>
            <div style="font-size:14px;font-weight:800;color:#0f172a;margin-bottom:4px;">${l.title}</div>
            <div style="font-size:12px;color:#64748b;line-height:1.4;">${l.desc}</div>
          </div>
          <button class="btn-use-logo" data-logo="${l.id}" style="border:none;padding:9px 14px;border-radius:10px;font-weight:800;font-size:12.5px;cursor:pointer;background:${isSelected ? "#16a34a" : "#0f172a"};color:#ffffff;">
            ${isSelected ? "✓ Aktif Kullanılan Logo" : "Bu Logoyu Üst Barda Kullan"}
          </button>
        </div>
      `;
    }).join("");

    const studioBoards = [
      { img: "assets/logos/logo_konsept_1.jpg", title: "Stüdyo Konsept 1: Karo Nar Tacı & t/+ Hibrit Kurumsal Kimlik" },
      { img: "assets/logos/logo_konsept_2.jpg", title: "Stüdyo Konsept 2: 3B Dokunsal Oyun Küpü (NARTES+)" },
      { img: "assets/logos/logo_konsept_3.jpg", title: "Stüdyo Konsept 3: Tangram Nar & Minimalist Nartes+ Yayıncılık" },
      { img: "assets/logos/logo_konsept_4.jpg", title: "Stüdyo Konsept 4: Yeşil-Turuncu Akış Düğümleri & Uygulama İkonu" }
    ].map(b => `
      <div style="border:1.5px solid #e2e8f0;border-radius:16px;overflow:hidden;background:#0f172a;">
        <img src="${b.img}" alt="${b.title}" style="width:100%;height:210px;object-fit:cover;display:block;">
        <div style="padding:10px 14px;color:#f8fafc;font-size:12.5px;font-weight:700;">${b.title}</div>
      </div>
    `).join("");

    modalContent.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
        <div>
          <h2 style="font-size:21px;font-weight:900;color:#0f172a;">✨ Nartes+ (NARTEST) Logo Tasarım Atölyesi</h2>
          <p style="font-size:13px;color:#64748b;">Sondaki <strong>T</strong> harfinin <strong>+</strong> (Artı) ile bütünleştiği 6 canlı vektörel SVG logo ve 4 stüdyo marka panosu. İstediğin logoyu tek tıkla üst bara uygulayabilirsin:</p>
        </div>
        <button id="closeModalBtn" style="border:none;background:#e2e8f0;padding:8px 14px;border-radius:10px;cursor:pointer;font-weight:800;">Kapat ✕</button>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(260px, 1fr));gap:12px;margin-bottom:20px;">
        ${svgCardsHtml}
      </div>
      <h3 style="font-size:16px;font-weight:800;color:#0f172a;margin-bottom:10px;">🎨 3B & Kurumsal Stüdyo Marka Panoları (4 Konsept)</h3>
      <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(360px, 1fr));gap:14px;">
        ${studioBoards}
      </div>
    `;

    modal.hidden = false;
    document.getElementById("closeModalBtn").onclick = () => { modal.hidden = true; };
    modalContent.querySelectorAll(".btn-use-logo").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-logo");
        playTone("success");
        applySelectedLogo(id);
        openLogoStudioModal();
        showToast("✨ Yeni Nartes+ logosu üst bara uygulandı!");
      });
    });
  }

  // Ünite Tamamlandı Kutlama Modalı
  function showUnitCompletedModal(UNIT) {
    const modal = document.getElementById("infoModal");
    const content = document.getElementById("infoModalContent");
    const nextUnit = ALL_UNITS.find(u => u.unitNo === UNIT.unitNo + 1);

    content.innerHTML = `
      <div style="text-align:center;padding:14px;">
        <div style="font-size:52px;margin-bottom:8px;">🏆</div>
        <h2 style="font-size:24px;font-weight:900;color:#15803d;margin-bottom:8px;">
          Tebrikler! "${UNIT.unitNo}. Ünite: ${UNIT.title}" Tamamlandı!
        </h2>
        <p style="font-size:15px;color:#475569;margin-bottom:18px;">
          Bu ünitedeki 6 kazanımın tamamı ve alttaki 30 durağın hepsi <strong>YEŞİL</strong> oldu!
        </p>
        <div style="display:flex;gap:12px;justify-content:center;">
          <button id="btnCloseCongrats" class="btn-primary-next" style="background:#334155;">Yol Haritasında Kal</button>
          ${nextUnit ? `<button id="btnGoNextUnit" class="btn-primary-next">🚀 ${nextUnit.unitNo}. Üniteye Geç (${nextUnit.title}) →</button>` : ""}
        </div>
      </div>
    `;
    modal.hidden = false;
    document.getElementById("btnCloseCongrats").onclick = () => { modal.hidden = true; };
    if (nextUnit) {
      document.getElementById("btnGoNextUnit").onclick = () => {
        modal.hidden = true;
        switchUnit(nextUnit.unitNo);
      };
    }
  }

  // ==========================================================================
  // ÖZEL ŞİFRELİ GİRİŞ KAPISI (NARTES+ PRIVATE ACCESS GATE)
  // ==========================================================================
  const AUTH_STORAGE_KEY = "nartes_plus_auth_unlocked_v1";
  const ALLOWED_PASS_HASHES = [
    "ecf2a0206d7f0",
    "158d55f281293c",
    "8645f7c65e238",
    "e141883f829d6",
    "d8b84bde7f068"
  ];

  function hashPass(str) {
    const s = String(str || "").trim().toLowerCase();
    let h1 = 0xdeadbeef ^ s.length, h2 = 0x41c6ce57 ^ s.length;
    for (let i = 0, ch; i < s.length; i++) {
      ch = s.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(16);
  }

  function initAuthGate(onUnlocked) {
    const isSaved = localStorage.getItem(AUTH_STORAGE_KEY) === "1" || sessionStorage.getItem(AUTH_STORAGE_KEY) === "1";
    const form = document.getElementById("authGateForm");
    const input = document.getElementById("authPasswordInput");
    const togglePassBtn = document.getElementById("authTogglePassBtn");
    const rememberChk = document.getElementById("authRememberChk");
    const errMsg = document.getElementById("authErrorMsg");
    const btnLock = document.getElementById("btnLockApp");

    function unlockNow() {
      document.body.classList.remove("auth-locked");
      onUnlocked();
    }

    if (togglePassBtn && input) {
      togglePassBtn.addEventListener("click", () => {
        const isPass = input.type === "password";
        input.type = isPass ? "text" : "password";
        togglePassBtn.textContent = isPass ? "🙈" : "👁️";
        input.focus();
      });
    }

    if (btnLock) {
      btnLock.addEventListener("click", () => {
        playTone("click");
        localStorage.removeItem(AUTH_STORAGE_KEY);
        sessionStorage.removeItem(AUTH_STORAGE_KEY);
        document.body.classList.add("auth-locked");
        if (input) {
          input.type = "password";
          if (togglePassBtn) togglePassBtn.textContent = "👁️";
          input.value = "";
          setTimeout(() => input.focus(), 80);
        }
      });
    }

    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const val = input ? input.value : "";
        if (ALLOWED_PASS_HASHES.includes(hashPass(val))) {
          if (errMsg) errMsg.hidden = true;
          if (rememberChk && rememberChk.checked) {
            try { localStorage.setItem(AUTH_STORAGE_KEY, "1"); } catch (err) {}
          } else {
            try { sessionStorage.setItem(AUTH_STORAGE_KEY, "1"); } catch (err) {}
          }
          playTone("success");
          unlockNow();
        } else {
          playTone("error");
          if (errMsg) errMsg.hidden = false;
          if (input) {
            input.value = "";
            input.focus();
          }
        }
      });
    }

    if (isSaved) {
      unlockNow();
    }
  }

  // ==========================================================================
  // BAŞLATMA VE OLAY DİNLEYİCİLERİ
  // ==========================================================================
  window.addEventListener("DOMContentLoaded", () => {
    let appBooted = false;
    const onViewportChange = () => {
      syncVisualViewport();
      updateDeviceMode();
    };
    window.addEventListener("resize", onViewportChange);
    window.addEventListener("orientationchange", onViewportChange);
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", syncVisualViewport);
      window.visualViewport.addEventListener("scroll", syncVisualViewport);
    }
    if (window.matchMedia) {
      const portraitQuery = window.matchMedia("(orientation: portrait)");
      const onPortraitChange = () => onViewportChange();
      if (portraitQuery.addEventListener) portraitQuery.addEventListener("change", onPortraitChange);
      else if (portraitQuery.addListener) portraitQuery.addListener(onPortraitChange);
    }
    if (window.screen && screen.orientation && screen.orientation.addEventListener) {
      screen.orientation.addEventListener("change", onViewportChange);
    }
    syncVisualViewport();
    updateDeviceMode();

    function bootApp() {
      if (appBooted) return;
      appBooted = true;
      updateDeviceMode();
      loadState();
      applySelectedLogo("logo-2-3d-kup");
      renderUnitSelector();
      renderSidebar();
      renderRoad();
      renderWindow();
    }
    initAuthGate(bootApp);

    document.getElementById("unitQuickSelect").addEventListener("change", (e) => {
      switchUnit(parseInt(e.target.value, 10));
    });

    document.getElementById("navCoursesBtn").addEventListener("click", openAllUnitsModal);
    document.getElementById("brandHomeBtn").addEventListener("click", openAllUnitsModal);
    document.getElementById("btnOpenUnitsHero").addEventListener("click", openAllUnitsModal);
    const logoStudioBtn = document.getElementById("navLogoStudioBtn");
    if (logoStudioBtn) logoStudioBtn.addEventListener("click", openLogoStudioModal);

    document.getElementById("arrowPrev").addEventListener("click", () => {
      const uState = getUnitState();
      if (uState.currentStopId > 1) goToStop(uState.currentStopId - 1, "prev");
    });

    const btnPrevStop = document.getElementById("btnPrevStop");
    if (btnPrevStop) {
      btnPrevStop.addEventListener("click", () => {
        const uState = getUnitState();
        if (uState.currentStopId > 1) goToStop(uState.currentStopId - 1, "prev");
      });
    }

    document.getElementById("arrowNext").addEventListener("click", () => {
      const UNIT = getActiveUnit();
      const uState = getUnitState(UNIT);
      if (uState.currentStopId < UNIT.stops.length) goToStop(uState.currentStopId + 1, "next");
    });

    document.getElementById("btnNextStop").addEventListener("click", () => {
      const UNIT = getActiveUnit();
      const uState = getUnitState(UNIT);
      if (uState.currentStopId < UNIT.stops.length) goToStop(uState.currentStopId + 1, "next");
    });

    // Sol Kazanım Paneli Aç / Daralt (PC, Mac ve Tablet Çekmece Uyumlu)
    const btnToggleSidebar = document.getElementById("btnToggleSidebar");
    const sidebarBackdrop = document.getElementById("sidebarBackdrop");
    if (btnToggleSidebar) {
      btnToggleSidebar.addEventListener("click", () => {
        playTone("click");
        if (window.innerWidth <= 950) {
          document.body.classList.toggle("sidebar-drawer-open");
        } else {
          document.body.classList.toggle("sidebar-collapsed");
        }
      });
    }
    if (sidebarBackdrop) {
      sidebarBackdrop.addEventListener("click", () => {
        document.body.classList.remove("sidebar-drawer-open");
      });
    }

    // Tam Ekran (Fullscreen) Desteği (Mac / PC / Tablet)
    const btnFullscreen = document.getElementById("btnFullscreen");
    if (btnFullscreen) {
      btnFullscreen.addEventListener("click", () => {
        playTone("click");
        if (!document.fullscreenElement && !document.webkitFullscreenElement) {
          const docEl = document.documentElement;
          if (docEl.requestFullscreen) docEl.requestFullscreen();
          else if (docEl.webkitRequestFullscreen) docEl.webkitRequestFullscreen();
        } else {
          if (document.exitFullscreen) document.exitFullscreen();
          else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
        }
      });
    }

    // Tablet & Dokunmatik Ekranlar İçin Yatay Parmak Kaydırma (Swipe) ile Geçiş
    const winCardEl = document.getElementById("windowCard");
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartedInCanvas = false;
    if (winCardEl) {
      winCardEl.addEventListener("touchstart", (e) => {
        touchStartedInCanvas = Boolean(e.target && e.target.closest(".sb-kagit, .sb-arac-cubugu"));
        if (touchStartedInCanvas || !e.touches || !e.touches[0]) return;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }, { passive: true });

      winCardEl.addEventListener("touchend", (e) => {
        if (touchStartedInCanvas || !e.changedTouches || !e.changedTouches[0]) return;
        const dx = e.changedTouches[0].clientX - touchStartX;
        const dy = e.changedTouches[0].clientY - touchStartY;
        if (Math.abs(dx) > 68 && Math.abs(dx) > Math.abs(dy) * 1.6) {
          const UNIT = getActiveUnit();
          const uState = getUnitState(UNIT);
          if (dx < 0 && uState.currentStopId < UNIT.stops.length && isStopUnlocked(uState.currentStopId + 1, UNIT)) {
            goToStop(uState.currentStopId + 1, "next");
          } else if (dx > 0 && uState.currentStopId > 1) {
            goToStop(uState.currentStopId - 1, "prev");
          }
        }
      }, { passive: true });
    }

    const roadViewportEl = document.getElementById("roadViewport");
    document.getElementById("roadScrollLeft").addEventListener("click", () => {
      roadViewportEl.scrollBy({ left: -280, behavior: "smooth" });
    });
    document.getElementById("roadScrollRight").addEventListener("click", () => {
      roadViewportEl.scrollBy({ left: 280, behavior: "smooth" });
    });
    if (roadViewportEl) {
      roadViewportEl.addEventListener("wheel", (e) => {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          e.preventDefault();
          roadViewportEl.scrollLeft += e.deltaY * 1.15;
        }
      }, { passive: false });
    }

    window.addEventListener("keydown", (e) => {
      const UNIT = getActiveUnit();
      const uState = getUnitState(UNIT);
      if (e.key === "ArrowLeft" && uState.currentStopId > 1) {
        goToStop(uState.currentStopId - 1, "prev");
      } else if (e.key === "ArrowRight" && uState.currentStopId < UNIT.stops.length && isStopUnlocked(uState.currentStopId + 1, UNIT)) {
        goToStop(uState.currentStopId + 1, "next");
      }
    });

    const btnSound = document.getElementById("btnToggleSound");
    window.MATFLOW_SOUND_MUTED = !state.soundEnabled;
    btnSound.addEventListener("click", () => {
      state.soundEnabled = !state.soundEnabled;
      window.MATFLOW_SOUND_MUTED = !state.soundEnabled;
      btnSound.textContent = state.soundEnabled ? "🔊" : "🔇";
      btnSound.classList.toggle("muted", !state.soundEnabled);
    });

    const btnVoice = document.getElementById("btnToggleVoice");
    btnVoice.addEventListener("click", () => {
      state.voiceEnabled = !state.voiceEnabled;
      btnVoice.classList.toggle("muted", !state.voiceEnabled);
      showToast(state.voiceEnabled ? "🗣️ Sesli anlatım açıldı" : "🗣️ Sesli anlatım kapatıldı");
    });

    document.getElementById("btnResetProgress").addEventListener("click", () => {
      const UNIT = getActiveUnit();
      if (confirm(`"${UNIT.title}" ünitesinin ilerlemesini sıfırlayıp 1. duraktan başlamak istiyor musunuz?`)) {
        state.unitProgress[UNIT.id] = { currentStopId: 1, completedStops: [] };
        saveState();
        renderSidebar();
        renderRoad();
        renderWindow();
        showToast("Ünite ilerlemesi sıfırlandı, 1. duraktan başlandı.");
      }
    });

    const btnTeacher = document.getElementById("btnTeacherMode");
    btnTeacher.addEventListener("click", () => {
      state.teacherUnlock = !state.teacherUnlock;
      btnTeacher.textContent = state.teacherUnlock ? "🔓 Öğretmen Modu (Açık)" : "🔒 Sıralı Öğrenci Modu";
      renderSidebar();
      renderRoad();
      renderWindow();
      showToast(state.teacherUnlock
        ? "Öğretmen Önizleme Modu: Tüm 12 ünitedeki 360 durağa serbestçe tıklayabilirsiniz."
        : "Öğrenci Modu: Duraklar sırayla tamamlanarak açılır.");
    });

    const modal = document.getElementById("infoModal");
    const modalContent = document.getElementById("infoModalContent");

    document.getElementById("navPolypadBtn").addEventListener("click", () => {
      modalContent.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
          <h2 style="font-size:20px;font-weight:900;">🧮 Canlı LGS Hesaplama Tahtası (Çarpan, EBOB-EKOK, Karekök, Pisagor)</h2>
          <button id="closeModalBtn" style="border:none;background:#e2e8f0;padding:6px 12px;border-radius:8px;cursor:pointer;font-weight:800;">Kapat ✕</button>
        </div>
        <p style="font-size:13.5px;color:#475569;margin-bottom:12px;">İki pozitif tam sayı girerek çarpanlarını, EBOB-EKOK değerlerini, kareköklerini ve Pisagor hipotenüsünü anında incele:</p>
        <div style="display:flex;gap:10px;margin-bottom:14px;">
          <input id="calcA" type="number" value="12" min="1" max="999" style="padding:10px;border:2px solid #cbd5e1;border-radius:10px;font-size:16px;font-weight:800;width:120px;">
          <input id="calcB" type="number" value="16" min="1" max="999" style="padding:10px;border:2px solid #cbd5e1;border-radius:10px;font-size:16px;font-weight:800;width:120px;">
          <button id="btnRunCalc" class="btn-primary-next">Analiz Et</button>
        </div>
        <div id="calcOutput" style="background:#f8fafc;padding:14px;border-radius:12px;border:1.5px solid #e2e8f0;font-size:14px;line-height:1.75;"></div>
      `;
      modal.hidden = false;
      document.getElementById("closeModalBtn").onclick = () => { modal.hidden = true; };

      function runAnalysis() {
        const a = Math.max(1, parseInt(document.getElementById("calcA").value, 10) || 12);
        const b = Math.max(1, parseInt(document.getElementById("calcB").value, 10) || 16);
        const gcd = (x, y) => (!y ? x : gcd(y, x % y));
        const ebob = gcd(a, b);
        const ekok = (a * b) / ebob;
        const divs = n => Array.from({ length: n }, (_, i) => i + 1).filter(k => n % k === 0);
        const hyp = Math.sqrt(a * a + b * b);
        const calcOut = document.getElementById("calcOutput");
        calcOut.innerHTML = `
          <div>• <strong>${a} sayısının çarpanları:</strong> ${divs(a).join(", ")}</div>
          <div>• <strong>${b} sayısının çarpanları:</strong> ${divs(b).join(", ")}</div>
          <div style="color:#15803d;font-weight:800;margin-top:6px;">• $\\text{EBOB}(${a}, ${b}) = ${ebob}$ ${ebob === 1 ? "(Aralarında Asal!)" : ""} &nbsp;|&nbsp; $\\text{EKOK}(${a}, ${b}) = ${ekok}$</div>
          <div style="color:#1d4ed8;font-weight:800;">• Dik kenarları $${a}$ ve $${b}$ olan dik üçgenin hipotenüsü: $\\sqrt{${a}^2 + ${b}^2} = \\sqrt{${a*a + b*b}} = ${Number.isInteger(hyp) ? hyp : hyp.toFixed(2)}$</div>
        `;
        applyKaTeX(calcOut);
      }
      runAnalysis();
      document.getElementById("btnRunCalc").onclick = runAnalysis;
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.hidden = true;
    });
  });
})();
