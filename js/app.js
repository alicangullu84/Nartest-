// ============================================================================
// MatFlow — 8. Sınıf LGS 12 Ünite (360 Durak) Etkileşimli Pencere Akış Motoru
// ============================================================================

(function () {
  const unit1 = window.MATFLOW_UNIT;
  unit1.badgeCells = ["1","2","3","4","5","6","7","8","9","10","11","12"];
  const units2to12 = window.MATFLOW_UNITS_2_12 || [];
  const ALL_UNITS = [unit1, ...units2to12];

  // Alt başlık (kazanım) sonlarına tanımlanan Uygulama Zamanı / Akıllı Tahta duraklarını otomatik yerleştir
  function injectSmartboardStopsIntoUnits(units) {
    const bank = window.NARTES_SMARTBOARD_BANK || {};
    units.forEach(unit => {
      if (!unit || unit._smartboardInjected) return;
      const unitBank = bank[unit.id];

      const rebuiltStops = [];
      (unit.kazanimlar || []).forEach(kaz => {
        const currentKazStops = (unit.stops || []).filter(s => s.kazanimId === kaz.id);
        const sbRaw = unitBank ? unitBank[kaz.id] : null;
        const sbList = Array.isArray(sbRaw) ? sbRaw : (sbRaw ? [sbRaw] : []);

        const beforeFinal = sbList.filter(sb => sb && sb.insertBeforeFinalGame && Array.isArray(sb.questions) && sb.questions.length > 0);
        const afterAll = sbList.filter(sb => sb && !sb.insertBeforeFinalGame && Array.isArray(sb.questions) && sb.questions.length > 0);

        if (beforeFinal.length > 0 && currentKazStops.length > 0 && currentKazStops[currentKazStops.length - 1].gameType === "final_marathon") {
          const finalGameStop = currentKazStops[currentKazStops.length - 1];
          currentKazStops.slice(0, -1).forEach(s => rebuiltStops.push(s));
          beforeFinal.forEach((sbEntry, bIdx) => {
            rebuiltStops.push({
              id: 0,
              kazanimId: kaz.id,
              boardId: sbEntry.boardId || `${kaz.id}_b${bIdx}`,
              type: "smartboard",
              icon: sbEntry.icon || "✏️",
              roadLabel: sbEntry.roadLabel || "Uygula",
              typeLabel: sbEntry.typeLabel || "Uygulama Zamanı",
              title: sbEntry.title || `Uygulama Zamanı: ${kaz.title}`,
              subtitle: sbEntry.subtitle || "Bu alt başlığı tamamlamak için kaleminle tahtada soruları çöz!",
              variantPacks: sbEntry.variantPacks || null,
              questions: sbEntry.questions
            });
          });
          rebuiltStops.push(finalGameStop);
        } else {
          currentKazStops.forEach(s => rebuiltStops.push(s));
          beforeFinal.concat(afterAll).forEach((sbEntry, bIdx) => {
            rebuiltStops.push({
              id: 0,
              kazanimId: kaz.id,
              boardId: sbEntry.boardId || (sbList.length > 1 ? `${kaz.id}_${bIdx + 1}` : kaz.id),
              type: "smartboard",
              icon: sbEntry.icon || "✏️",
              roadLabel: sbEntry.roadLabel || "Uygula",
              typeLabel: sbEntry.typeLabel || "Uygulama Zamanı",
              title: sbEntry.title || `Uygulama Zamanı: ${kaz.title}`,
              subtitle: sbEntry.subtitle || "Bu alt başlığı tamamlamak için kaleminle tahtada soruları çöz!",
              variantPacks: sbEntry.variantPacks || null,
              questions: sbEntry.questions
            });
          });
          return;
        }

        afterAll.forEach((sbEntry, bIdx) => {
          rebuiltStops.push({
            id: 0,
            kazanimId: kaz.id,
            boardId: sbEntry.boardId || `${kaz.id}_a${bIdx}`,
            type: "smartboard",
            icon: sbEntry.icon || "✏️",
            roadLabel: sbEntry.roadLabel || "Uygula",
            typeLabel: sbEntry.typeLabel || "Uygulama Zamanı",
            title: sbEntry.title || `Uygulama Zamanı: ${kaz.title}`,
            subtitle: sbEntry.subtitle || "Bu alt başlığı tamamlamak için kaleminle tahtada soruları çöz!",
            variantPacks: sbEntry.variantPacks || null,
            questions: sbEntry.questions
          });
        });
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

  // Web Audio API ile Zenginleştirilmiş Öğretici Ses Efektleri & Kutlama Parçacıkları
  let audioCtx = null;
  function playTone(type) {
    if (!state.soundEnabled) return;
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === "suspended") audioCtx.resume();
      const now = audioCtx.currentTime;

      const note = (freq, startOff, dur, wave, vol, slideTo) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = wave || "sine";
        osc.frequency.setValueAtTime(freq, now + startOff);
        if (slideTo) {
          osc.frequency.exponentialRampToValueAtTime(slideTo, now + startOff + dur);
        }
        gain.gain.setValueAtTime(vol || 0.09, now + startOff);
        gain.gain.exponentialRampToValueAtTime(0.001, now + startOff + dur);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now + startOff);
        osc.stop(now + startOff + dur + 0.01);
      };

      if (type === "click") {
        note(540, 0, 0.065, "sine", 0.075, 720);
      } else if (type === "pop") {
        note(420, 0, 0.085, "triangle", 0.12, 840);
        note(840, 0.03, 0.09, "sine", 0.07, 1120);
      } else if (type === "combo") {
        [587.33, 783.99, 1046.5].forEach((f, idx) => {
          note(f, idx * 0.065, 0.2, "triangle", 0.11);
        });
      } else if (type === "magic") {
        [523.25, 659.25, 783.99, 1174.66].forEach((f, idx) => {
          note(f, idx * 0.045, 0.24, "sine", 0.08);
        });
      } else if (type === "fanfare") {
        [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((f, idx) => {
          note(f, idx * 0.075, 0.32, "triangle", 0.12);
        });
      } else if (type === "success") {
        [523.25, 659.25, 783.99, 1046.5].forEach((f, idx) => {
          note(f, idx * 0.07, 0.23, "triangle", 0.11);
        });
      } else if (type === "error") {
        note(240, 0, 0.13, "triangle", 0.09, 175);
        note(185, 0.09, 0.14, "sine", 0.07, 145);
      }
    } catch (e) {}
  }

  function spawnCelebrationBurst(anchorEl) {
    if (!anchorEl || typeof anchorEl.getBoundingClientRect !== "function") return;
    try {
      const rect = anchorEl.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const colors = ["#22c55e", "#f97316", "#38bdf8", "#facc15", "#a855f7", "#ec4899"];
      for (let i = 0; i < 14; i++) {
        const p = document.createElement("span");
        p.className = "nartes-fx-particle";
        const angle = (Math.PI * 2 * i) / 14 + (Math.random() - 0.5) * 0.3;
        const dist = 42 + Math.random() * 48;
        p.style.left = `${cx}px`;
        p.style.top = `${cy}px`;
        p.style.background = colors[i % colors.length];
        p.style.setProperty("--tx", `${Math.round(Math.cos(angle) * dist)}px`);
        p.style.setProperty("--ty", `${Math.round(Math.sin(angle) * dist - 14)}px`);
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 820);
      }
    } catch (e) {}
  }

  function speakText(text, forceSpeak) {
    if ((!state.voiceEnabled && !forceSpeak) || !("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.cancel();
      const clean = String(text || "")
        .replace(/<[^>]+>/g, " ")
        .replace(/×/g, " çarpı ")
        .replace(/÷/g, " bölü ")
        .replace(/·/g, " çarpı ")
        .replace(/\s+/g, " ")
        .trim();
      if (!clean) return;
      const utter = new SpeechSynthesisUtterance(clean);
      utter.lang = "tr-TR";
      utter.rate = 1.01;
      window.speechSynthesis.speak(utter);
    } catch (e) {}
  }

  window.NartesSFX = {
    play: playTone,
    burst: spawnCelebrationBurst,
    speak: (txt) => speakText(txt, true)
  };

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
      // 10 adımlı modüler yapıya (schemaVersion: 2) geçişte eski 1. Ünite durak indekslerini sıfırla
      const u1Prog = state.unitProgress[unit1.id];
      if (u1Prog && u1Prog.schemaVersion !== 2) {
        u1Prog.currentStopId = 1;
        u1Prog.completedStops = [];
        u1Prog.schemaVersion = 2;
      } else if (u1Prog) {
        u1Prog.schemaVersion = 2;
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
        kaz.isMasterySection ? "is-mastery-section" : "",
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
        const target = state.teacherUnlock
          ? firstStop
          : (isStopUnlocked(firstIncomplete, UNIT) ? firstIncomplete : firstStop);
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
    if (!stop) return "Adım";
    if (stop.roadLabel) return stop.roadLabel;
    const tl = String(stop.typeLabel || "");
    if (/Maraton/i.test(tl)) return "Final Kupası";
    if (stop.type === "concept") return "Keşif";
    if (stop.type === "video") return "Anlatım";
    if (stop.type === "activity") return "Etkinlik";
    if (stop.type === "game") return "Oyun";
    if (stop.type === "question") return "Soru";
    if (stop.type === "smartboard") return "Uygula";
    return tl.split(" ")[0] || "Adım";
  }

  // ==========================================================================
  // ALT KISIM: MODÜLER ALT BAŞLIK DÖNGÜSÜ & 3. DERECEDEN EĞRİ YOL HARİTASI
  //   - Her alt başlıkta (kazanım) döngü 1. adımdan yeniden başlar:
  //     1. Keşif → 2. Anlatım → 3. Etkinlik → 4. Oyun → 5. Soru → 6. Uygula
  //   - Düz çizgi yerine y(u) = A·(3.1u³ − 2.35u) kübik denklem eğrisi boyunca
  //     hafif yükseliş ve hafif alçalışlarla dalgalanan şık SVG yol çizer.
  // ==========================================================================
  function computeCubicWaveOffsetPx(idx, total) {
    if (total <= 1) return 0;
    const u = (2 * idx) / (total - 1) - 1; // [-1, +1]
    // 3. dereceden polinom eğrisi: hafif yükseliş, büküm noktası ve hafif alçalış
    const poly = 3.1 * u * u * u - 2.35 * u;
    return Math.round(poly * 10.5 * 10) / 10;
  }

  function drawCubicRoadSvg() {
    const roadEl = document.getElementById("roadStops");
    const svgEl = document.getElementById("roadCubicSvg");
    if (!roadEl || !svgEl) return;

    const stopBtns = Array.from(roadEl.querySelectorAll(".road-stop-btn:not(.road-portal-btn)"));
    if (stopBtns.length < 2) {
      svgEl.innerHTML = "";
      return;
    }

    const roadRect = roadEl.getBoundingClientRect();
    if (roadRect.width < 20) return;

    const pts = stopBtns.map(btn => {
      const circle = btn.querySelector(".stop-circle") || btn;
      const r = circle.getBoundingClientRect();
      return {
        x: r.left - roadRect.left + r.width / 2,
        y: r.top - roadRect.top + r.height / 2,
        done: btn.classList.contains("status-done"),
        current: btn.classList.contains("is-current")
      };
    });

    const w = Math.max(roadEl.scrollWidth, Math.ceil(roadRect.width));
    const h = Math.max(roadEl.offsetHeight, Math.ceil(roadRect.height), 68);
    svgEl.setAttribute("viewBox", `0 0 ${w} ${h}`);
    svgEl.setAttribute("width", String(w));
    svgEl.setAttribute("height", String(h));

    // Pürüzsüz Catmull-Rom -> Kübik Bézier (C) dönüşümü
    function buildSmoothSegment(i) {
      const p0 = pts[Math.max(0, i - 1)];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[Math.min(pts.length - 1, i + 2)];
      const tension = 0.32;
      const cp1x = p1.x + (p2.x - p0.x) * tension;
      const cp1y = p1.y + (p2.y - p0.y) * tension;
      const cp2x = p2.x - (p3.x - p1.x) * tension;
      const cp2y = p2.y - (p3.y - p1.y) * tension;
      return `M ${p1.x.toFixed(1)} ${p1.y.toFixed(1)} C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
    }

    let fullPath = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[Math.max(0, i - 1)];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[Math.min(pts.length - 1, i + 2)];
      const tension = 0.32;
      const cp1x = p1.x + (p2.x - p0.x) * tension;
      const cp1y = p1.y + (p2.y - p0.y) * tension;
      const cp2x = p2.x - (p3.x - p1.x) * tension;
      const cp2y = p2.y - (p3.y - p1.y) * tension;
      fullPath += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
    }

    let segPathsHtml = "";
    for (let i = 0; i < pts.length - 1; i++) {
      const segD = buildSmoothSegment(i);
      const isSegDone = pts[i].done && (pts[i + 1].done || pts[i + 1].current);
      if (isSegDone) {
        segPathsHtml += `<path d="${segD}" fill="none" stroke="url(#cubicDoneGrad)" stroke-width="6.5" stroke-linecap="round"/>`;
      } else {
        segPathsHtml += `<path d="${segD}" fill="none" stroke="url(#cubicTodoGrad)" stroke-width="4.5" stroke-dasharray="8 7" stroke-linecap="round"/>`;
      }
    }

    svgEl.innerHTML = `
      <defs>
        <linearGradient id="cubicDoneGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#22c55e"/>
          <stop offset="50%" stop-color="#10b981"/>
          <stop offset="100%" stop-color="#16a34a"/>
        </linearGradient>
        <linearGradient id="cubicTodoGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#fb923c"/>
          <stop offset="100%" stop-color="#f59e0b"/>
        </linearGradient>
      </defs>
      <!-- Yumuşak Kübik Eğri Yatak İzi -->
      <path d="${fullPath}" fill="none" stroke="rgba(148, 163, 184, 0.24)" stroke-width="13" stroke-linecap="round"/>
      <path d="${fullPath}" fill="none" stroke="#ffffff" stroke-width="8.5" stroke-linecap="round" opacity="0.9"/>
      ${segPathsHtml}
    `;
  }

  function renderRoad() {
    const UNIT = getActiveUnit();
    const uState = getUnitState(UNIT);
    const roadEl = document.getElementById("roadStops");
    if (!roadEl) return;
    roadEl.innerHTML = `<svg class="road-cubic-svg" id="roadCubicSvg" aria-hidden="true"></svg>`;

    const currentStop = UNIT.stops.find(s => s.id === uState.currentStopId) || UNIT.stops[0];
    const activeKazIdx = Math.max(0, UNIT.kazanimlar.findIndex(k => k.id === currentStop.kazanimId));
    const activeKaz = UNIT.kazanimlar[activeKazIdx] || UNIT.kazanimlar[0];
    const kazStops = UNIT.stops.filter(s => s.kazanimId === activeKaz.id);
    const kazDoneCount = kazStops.filter(s => isStopDone(s.id, UNIT)).length;

    const roadLabel = document.getElementById("roadUnitTitleLabel");
    if (roadLabel) {
      roadLabel.innerHTML = `
        <span class="road-cycle-badge">Bölüm ${activeKaz.no} / ${UNIT.kazanimlar.length}</span>
        <strong>${activeKaz.title}</strong>
      `;
    }

    // Önceki Alt Başlık Geçiş Kapsülü (2. ve sonraki alt başlıklarda)
    if (activeKazIdx > 0) {
      const prevKaz = UNIT.kazanimlar[activeKazIdx - 1];
      const prevLastStopId = prevKaz.stops[prevKaz.stops.length - 1];
      const prevWrap = document.createElement("div");
      prevWrap.className = "road-stop-item road-portal-item";
      const prevBtn = document.createElement("button");
      prevBtn.type = "button";
      prevBtn.className = "road-stop-btn road-portal-btn is-prev-portal";
      prevBtn.title = `Önceki Bölüm: ${prevKaz.no}. ${prevKaz.title}`;
      prevBtn.innerHTML = `
        <div class="stop-circle portal-circle">‹</div>
        <span class="stop-label">Bölüm ${prevKaz.no}</span>
      `;
      prevBtn.addEventListener("click", () => goToStop(prevLastStopId, "prev"));
      prevWrap.appendChild(prevBtn);
      roadEl.appendChild(prevWrap);
    }

    // Aktif Alt Başlığın Kendi Modüler Döngüsü (Her Alt Başlıkta 1..N'den Başlar!)
    kazStops.forEach((stop, localIdx) => {
      const done = isStopDone(stop.id, UNIT);
      const isCurrent = stop.id === uState.currentStopId;
      const unlocked = isStopUnlocked(stop.id, UNIT);
      const yOffset = computeCubicWaveOffsetPx(localIdx, kazStops.length);

      const wrap = document.createElement("div");
      wrap.className = "road-stop-item";

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = [
        "road-stop-btn",
        done ? "status-done" : "status-todo",
        isCurrent ? "is-current" : "",
        unlocked ? "is-unlocked" : "is-locked"
      ].filter(Boolean).join(" ");
      btn.id = `road-stop-${stop.id}`;
      btn.style.setProperty("--cubic-y", `${yOffset}px`);
      btn.title = `${activeKaz.title} — ${localIdx + 1}. Adım: ${stop.title} (${stop.typeLabel})`;

      btn.innerHTML = `
        <div class="stop-circle">${done ? "✓" : stop.icon}</div>
        <span class="stop-label">${localIdx + 1}. ${getFriendlyStopShortLabel(stop)}</span>
      `;

      btn.addEventListener("click", () => {
        if (!unlocked) {
          playTone("error");
          showToast(`🔒 Sırayla ilerlenir! Önce sıradaki adımı tamamla.`);
          return;
        }
        goToStop(stop.id);
      });

      wrap.appendChild(btn);
      roadEl.appendChild(wrap);
    });

    // Sonraki Alt Başlık Döngü Başlatıcı Kapsülü
    if (activeKazIdx < UNIT.kazanimlar.length - 1) {
      const nextKaz = UNIT.kazanimlar[activeKazIdx + 1];
      const nextFirstId = nextKaz.stops[0];
      const nextUnlocked = isStopUnlocked(nextFirstId, UNIT);
      const nextWrap = document.createElement("div");
      nextWrap.className = "road-stop-item road-portal-item";
      const nextBtn = document.createElement("button");
      nextBtn.type = "button";
      nextBtn.className = `road-stop-btn road-portal-btn is-next-portal ${nextUnlocked ? "is-unlocked" : "is-locked"}`;
      nextBtn.title = `Sıradaki Bölümde Döngü Yeniden Başlar: ${nextKaz.no}. ${nextKaz.title}`;
      nextBtn.innerHTML = `
        <div class="stop-circle portal-circle">↻</div>
        <span class="stop-label">${nextKaz.no}. Bölüme Geç</span>
      `;
      nextBtn.addEventListener("click", () => {
        if (!nextUnlocked) {
          playTone("error");
          showToast(`🔒 "${nextKaz.title}" döngüsünü açmak için önce bu bölümün 6 adımını tamamla!`);
          return;
        }
        goToStop(nextFirstId, "next");
      });
      nextWrap.appendChild(nextBtn);
      roadEl.appendChild(nextWrap);
    }

    requestAnimationFrame(() => {
      drawCubicRoadSvg();
      const activeBtn = document.getElementById(`road-stop-${uState.currentStopId}`);
      if (activeBtn) {
        activeBtn.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    });
    setTimeout(drawCubicRoadSvg, 120);

    const kazPct = kazStops.length > 0 ? Math.round((kazDoneCount / kazStops.length) * 100) : 0;
    const roadFill = document.getElementById("roadProgressFill");
    if (roadFill) roadFill.style.width = `${kazPct}%`;
    const roadPctEl = document.getElementById("roadProgressPct");
    if (roadPctEl) roadPctEl.textContent = `%${kazPct}`;

    const localStepNo = Math.max(1, kazStops.findIndex(s => s.id === uState.currentStopId) + 1);
    document.getElementById("roadStatusSummary").textContent =
      `Adım ${localStepNo}/${kazStops.length} • Bölüm: ${kazDoneCount}/${kazStops.length} • Ünite: ${uState.completedStops.length}/${UNIT.stops.length}`;
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
      showToast(`🔒 Sırayla ilerlenir! Önce aktif adımı tamamla.`);
      return;
    }

    if (document.body.classList.contains("sidebar-drawer-open")) {
      document.body.classList.remove("sidebar-drawer-open");
    }
    const prevStop = UNIT.stops.find(s => s.id === uState.currentStopId);
    const nextStopObj = UNIT.stops.find(s => s.id === stopId);
    const dir = direction || (stopId >= uState.currentStopId ? "next" : "prev");
    uState.currentStopId = stopId;
    saveState();

    if (prevStop && nextStopObj && prevStop.kazanimId !== nextStopObj.kazanimId) {
      playTone("magic");
      const enteredKaz = UNIT.kazanimlar.find(k => k.id === nextStopObj.kazanimId);
      if (enteredKaz) {
        showToast(`🚀 ${enteredKaz.no}. Bölüm: "${enteredKaz.title}" — Adım döngüsü 1. Keşif'ten başladı!`);
      }
    } else {
      playTone("click");
    }

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
    const currentStopObj = UNIT.stops.find(s => s.id === id);
    const currentKaz = currentStopObj && UNIT.kazanimlar.find(k => k.id === currentStopObj.kazanimId);
    const alreadyDone = isStopDone(id, UNIT);
    if (!alreadyDone) {
      uState.completedStops.push(id);
      saveState();
    }

    const isLastInKaz = currentKaz && currentKaz.stops[currentKaz.stops.length - 1] === id;
    playTone(isLastInKaz ? "fanfare" : "success");
    const nextBtnAnchor = document.getElementById("btnNextStop");
    if (nextBtnAnchor) spawnCelebrationBurst(nextBtnAnchor);

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
      fb.innerHTML = `🎉 ${customMsg || (isLastInKaz ? "Bölüm tamamlandı! Sıradaki alt başlık döngüsüne geçiliyor..." : "Harika! Bu adımı tamamladın, sıradaki adıma geçiliyor...")}`;
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
      }, 1400);
    } else {
      showUnitCompletedModal(UNIT);
    }
  }

  // ==========================================================================
  // ORTA PENCERE SAHNESİNİ RENDER ETME
  // ==========================================================================
  let lastRenderedVisitKey = "";

  function renderWindow(forceNewVariant) {
    const UNIT = getActiveUnit();
    const uState = getUnitState(UNIT);
    const rawStop = UNIT.stops.find(s => s.id === uState.currentStopId) || UNIT.stops[0];
    const visitKey = `${UNIT.id}:${rawStop.id}`;
    const isNewVisit = Boolean(forceNewVariant) || (visitKey !== lastRenderedVisitKey);
    lastRenderedVisitKey = visitKey;

    const stop = (window.NartesVariantEngine && rawStop.type !== "smartboard")
      ? window.NartesVariantEngine.resolveStop(rawStop, { next: isNewVisit })
      : rawStop;

    const kaz = UNIT.kazanimlar.find(k => k.id === stop.kazanimId) || UNIT.kazanimlar[0];
    const kazStops = UNIT.stops.filter(s => s.kazanimId === kaz.id);
    const localStepNo = Math.max(1, kazStops.findIndex(s => s.id === stop.id) + 1);
    const isLastInKaz = localStepNo === kazStops.length && stop.id < UNIT.stops.length;
    const done = isStopDone(stop.id, UNIT);

    window.__nartesActiveVoiceText = `${stop.title}. ${stop.subtitle || ""}`;

    const uBadge = document.getElementById("crumbUnitBadge");
    if (uBadge) uBadge.textContent = `${UNIT.unitNo}. Ünite`;
    document.getElementById("crumbKazanim").textContent = `${kaz.no}. ${kaz.title}`;
    const typeBadge = document.getElementById("crumbType");
    typeBadge.className = `crumb-badge type-${stop.type}`;
    typeBadge.textContent = `${stop.icon} ${stop.typeLabel}`;
    document.getElementById("crumbStopNo").textContent = `Adım ${localStepNo} / ${kazStops.length} • Durak ${stop.id}`;

    const statusPill = document.getElementById("stepStatusPill");
    if (statusPill) {
      const hasVar = Boolean(rawStop.variantSpec || (Array.isArray(rawStop.variants) && rawStop.variants.length > 1));
      const varBtnHtml = (hasVar && rawStop.type !== "smartboard")
        ? ` <button type="button" id="btnRefreshStopVariant" class="btn-variant-refresh" title="Farklı sayılarla yeniden çöz" style="margin-left:8px;padding:3px 10px;border-radius:999px;border:1.5px solid #cbd5e1;background:#ffffff;color:#1e293b;font-size:11.5px;font-weight:800;cursor:pointer;">🔄 Yeni Örnek</button>`
        : "";
      if (done) {
        statusPill.className = "step-status-pill done";
        statusPill.innerHTML = `<span class="pill-dot">✓</span> <span class="pill-txt">Tamamlandı</span>${varBtnHtml}`;
      } else {
        statusPill.className = "step-status-pill todo";
        statusPill.innerHTML = `<span class="pill-dot">🟠</span> <span class="pill-txt">Devam Ediyor</span>${varBtnHtml}`;
      }
      const refBtn = document.getElementById("btnRefreshStopVariant");
      if (refBtn) {
        refBtn.addEventListener("click", () => {
          playTone("click");
          renderWindow(true);
        });
      }
    }

    document.getElementById("windowTitle").textContent = stop.title;
    document.getElementById("windowSubtitle").textContent = stop.subtitle;

    // Üst başlıkta seslendir butonu bulunmasın (varsa temizle)
    const staleListenBtn = document.getElementById("btnListenStop");
    if (staleListenBtn) staleListenBtn.remove();

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
    const nextBtnLabel = nextBtn ? nextBtn.querySelector("span") : null;
    if (nextBtnLabel) {
      nextBtnLabel.textContent = isLastInKaz ? "Sıradaki Bölüme Geç ↻" : "Sonraki Adıma Geç";
    }
    if (done) {
      fb.className = "foot-feedback success";
      fb.innerHTML = isLastInKaz
        ? "✓ Bu bölümü tamamladın! Sıradaki alt başlık döngüsüne geçebilirsin."
        : "✓ Bu adımı tamamladın! İstersen tekrar inceleyebilir veya sağa geçebilirsin.";
      nextBtn.disabled = false;
    } else if (state.teacherUnlock) {
      fb.className = "foot-feedback";
      fb.innerHTML = "👩‍🏫 <strong>Öğretmen Modu:</strong> Alt yol haritasındaki tüm bölümlere ve oklara ilerlemek zorunda kalmadan istediğiniz an tıklayabilirsiniz.";
      nextBtn.disabled = false;
    } else {
      fb.className = "foot-feedback";
      fb.innerHTML = "👆 Sıradaki adımın kilidini açmak için bu penceredeki etkinliği tamamla.";
      nextBtn.disabled = true;
    }

    if (window.NartesSmartboard) {
      window.NartesSmartboard.cleanup();
    }
    const winCardElRef = document.getElementById("windowCard");
    if (winCardElRef) {
      winCardElRef.classList.toggle("is-smartboard-stop", stop.type === "smartboard");
    }

    // Temel bağlamı önce bildir; ardından alt render fonksiyonları (Soru Paketi, Yöntem Atölyesi, Akıllı Tahta) daha detaylı ekran verisiyle günceller
    if (stop.type !== "smartboard" && window.NartesMentor) {
      window.NartesMentor.setContext({ unit: UNIT, kaz, stop });
      if (typeof window.NartesMentor.notifyScreenTask === "function") {
        const rawText = [
          stop.title,
          stop.subtitle,
          Array.isArray(stop.explanation) ? stop.explanation.join(" ") : "",
          stop.sentenceHtml || "",
          stop.quickQuestion || "",
          stop.stem || ""
        ].map(stripPlain).join(" ");
        const nums = Array.from(new Set((rawText.match(/\b\d{1,4}\b/g) || []).map(Number).filter(n => n >= 2 && n <= 2000))).slice(0, 6);
        window.NartesMentor.notifyScreenTask({
          signature: `stop:${UNIT.unitNo}:${stop.id}:v${stop._variantIndex || 0}`,
          taskTitle: stop.title,
          promptText: [stop.subtitle, stop.sentenceHtml, stop.quickQuestion, stop.stem].filter(Boolean).map(stripPlain).join(" "),
          numbers: nums,
          targetNumber: stop.targetNumber || (stop.gridModel && stop.gridModel.total) || nums[0] || undefined,
          hint: stop.hint || "",
          solution: stop.solution || ""
        });
      }
    }

    const body = document.getElementById("windowBody");
    body.innerHTML = "";

    if (stop.type === "concept") {
      if (Array.isArray(stop.explanation)) {
        window.__nartesActiveVoiceText = `${stop.title}. ${stop.explanation.map(stripPlain).join(" ")}`;
      }
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
      const bCfg = typeof stop.barsDemo === "object"
        ? stop.barsDemo
        : { total: stop.targetNumber || 24, goodDiv: 6, badDiv: 5 };
      const tot = bCfg.total;
      const gDiv = bCfg.goodDiv;
      const gCount = Math.floor(tot / gDiv);
      const bDiv = bCfg.badDiv;
      const bCount = Math.floor(tot / bDiv);
      const bRem = tot % bDiv;
      const bars = document.createElement("div");
      bars.className = "factor-bars-demo";
      bars.innerHTML = `
        <div class="bar-card">
          <div class="bar-row">
            ${Array.from({ length: gCount }, () => `<div class="bar-seg" style="flex:${gDiv};background:#f97316">${gDiv}</div>`).join("")}
          </div>
          <div class="bar-total" style="background:#a21caf">${tot}</div>
          <div class="bar-caption">✓ ${tot} sayısı ${gDiv}'ya tam bölünür (${gCount} × ${gDiv} = ${tot})</div>
        </div>
        <div class="bar-card">
          <div class="bar-row">
            ${Array.from({ length: bCount }, () => `<div class="bar-seg" style="flex:${bDiv};background:#16a34a">${bDiv}</div>`).join("")}
            <div class="bar-seg bar-seg-overflow" style="flex:${bDiv};background:#16a34a;opacity:0.45">${bDiv} (Taştı)</div>
          </div>
          <div class="bar-total" style="background:#2563eb;width:92%">${tot}</div>
          <div class="bar-caption">✗ ${tot} sayısı ${bDiv}'e kalansız bölünemez (Kalan: ${bRem})</div>
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
    } else if (stop.visualData && Array.isArray(stop.visualData.numbers)) {
      rightCol.className = "flow-visual-box";
      rightCol.innerHTML = `
        <div style="width:100%;padding:12px;background:#f8fafc;border-radius:14px;border:1.5px solid #cbd5e1;">
          <div style="font-weight:900;font-size:13px;color:#0f172a;margin-bottom:8px;">📐 ${escSvg(stop.visualData.title || kaz.title)}</div>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(108px,1fr));gap:8px;">
            ${stop.visualData.numbers.map(it => `
              <div style="padding:8px 10px;border-radius:10px;background:${it.prime ? "#fef9c3" : "#eff6ff"};border:1.5px solid ${it.prime ? "#facc15" : "#bfdbfe"};text-align:center;">
                <div style="font-weight:900;font-size:14px;color:#0f172a;">${escSvg(it.val)}</div>
                <div style="font-size:11px;font-weight:700;color:#475569;">${escSvg(it.note || "")}</div>
              </div>
            `).join("")}
          </div>
          ${stop.visualData.summary ? `<div style="margin-top:8px;font-size:12px;font-weight:700;color:#15803d;">${escSvg(stop.visualData.summary)}</div>` : ""}
        </div>
      `;
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
        const passed = idx < stepIdx;
        return `<span style="border:1.5px solid ${active ? "#38bdf8" : (passed ? "rgba(74,222,128,0.5)" : "rgba(255,255,255,0.16)")};background:${active ? "rgba(56,189,248,0.22)" : (passed ? "rgba(34,197,94,0.16)" : "rgba(255,255,255,0.05)")};color:${active ? "#fde047" : (passed ? "#86efac" : "#94a3b8")};padding:4px 11px;border-radius:999px;font-size:11.5px;font-weight:800;user-select:none;">${passed ? "✓ " : ""}${idx + 1}. Adım</span>`;
      }).join("");

      player.querySelector("#videoProgFill").style.width = `${((stepIdx + 1) / stop.steps.length) * 100}%`;
      const btn = player.querySelector("#btnNextVideoStep");
      btn.classList.toggle("to-question-ready", isLastStep);
      btn.textContent = !isLastStep
        ? `▶ Sonraki Adım (${stepIdx + 1}/${stop.steps.length})`
        : `🎯 Yandaki Soruya Geç (${stop.steps.length}/${stop.steps.length}) →`;

      if (stop.videoScene === "rectangles_24" || stop.videoScene === "rectangles_18" || stop.videoScene === "rectangles_dynamic") {
        const dynN = Number(stop.targetNumber || (stop.visualData && stop.visualData.numbers && stop.visualData.numbers[0] ? 0 : 0)) || 24;
        const divs = window.NartesVariantEngine
          ? window.NartesVariantEngine.divisorsOf(dynN)
          : [1, 2, 3, 4, 6, 8, 12, 24];
        const colors = ["#38bdf8", "#22c55e", "#f97316", "#a855f7", "#ec4899"];
        const configs = [];
        for (let i = 0; i < Math.ceil(divs.length / 2); i++) {
          const r = divs[i];
          const c = dynN / r;
          configs.push({ r, c, color: colors[i % colors.length], label: `${r} × ${c} = ${dynN} br²` });
        }
        configs.push({ r: 0, c: 0, color: "#eab308", label: `${dynN} Çarpanları: ${divs.join(", ")}` });
        const cfg = configs[stepIdx] || configs[0];
        if (cfg.r > 0) {
          const cellSize = cfg.c > 12 ? 15 : 22;
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
              ${divs.map(n => `<div style="width:44px;height:44px;border-radius:50%;background:#22c55e;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:16px;">${n}</div>`).join("")}
            </div>
            <div style="margin-top:12px;font-weight:800;font-size:16px;color:#86efac;">${cfg.label}</div>
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
      } else if (stop.videoScene === "coprime_concept") {
        const scenesHtml = [
          `
            <div style="display:flex;align-items:center;gap:18px;flex-wrap:wrap;justify-content:center;">
              <div style="background:rgba(56,189,248,0.16);border:2px solid #38bdf8;border-radius:14px;padding:14px 20px;text-align:center;">
                <div style="font-size:22px;font-weight:900;color:#f8fafc;">9 = 3²</div>
                <div style="font-size:12px;color:#bae6fd;font-weight:700;">Asal Bölen: Yalnız 3</div>
              </div>
              <div style="font-size:22px;font-weight:900;color:#4ade80;">✓ Ortak Asal Yok</div>
              <div style="background:rgba(34,197,94,0.16);border:2px solid #4ade80;border-radius:14px;padding:14px 20px;text-align:center;">
                <div style="font-size:22px;font-weight:900;color:#f8fafc;">16 = 2⁴</div>
                <div style="font-size:12px;color:#bbf7d0;font-weight:700;">Asal Bölen: Yalnız 2</div>
              </div>
            </div>
          `,
          `
            <div style="display:flex;align-items:center;gap:18px;flex-wrap:wrap;justify-content:center;">
              <div style="background:rgba(249,115,22,0.18);border:2px solid #fb923c;border-radius:14px;padding:14px 20px;text-align:center;">
                <div style="font-size:22px;font-weight:900;color:#fde047;">14 ve 22</div>
                <div style="font-size:12.5px;color:#fed7aa;font-weight:700;">İkisi de Çift ⇒ 2'ye Bölünür ✗</div>
              </div>
              <div style="background:rgba(34,197,94,0.18);border:2px solid #4ade80;border-radius:14px;padding:14px 20px;text-align:center;">
                <div style="font-size:22px;font-weight:900;color:#86efac;">14 ve 15</div>
                <div style="font-size:12.5px;color:#dcfce7;font-weight:700;">Ardışık Sayılar ⇒ Daima Asal ✓</div>
              </div>
            </div>
          `,
          `
            <div style="background:rgba(255,255,255,0.08);border:2px solid #38bdf8;border-radius:14px;padding:16px 24px;text-align:center;">
              <div style="font-size:20px;font-weight:900;color:#f8fafc;margin-bottom:6px;">(x + 1) / (y − 2) = 15 / 25  ⇒  <span style="color:#4ade80;">3 / 5</span></div>
              <div style="font-size:13.5px;color:#fde047;font-weight:800;">5 ile sadeleştir ⇒ x + 1 = 3 (x = 2) ve y − 2 = 5 (y = 7)</div>
            </div>
          `
        ];
        stage.innerHTML = `
          ${scenesHtml[stepIdx] || scenesHtml[0]}
          <div style="margin-top:14px;font-size:14.5px;color:#e2e8f0;text-align:center;max-width:580px;">${step.text}</div>
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
      window.__nartesActiveVoiceText = `${step.text} Doğrulama sorusu: ${stop.quickQuestion}`;
      if (window.NartesMentor) {
        window.NartesMentor.updateProgress({
          liveScreen: {
            mode: "video",
            stepIndex: stepIdx + 1,
            stepTotal: stop.steps.length,
            activeText: step.text,
            questionText: stop.quickQuestion
          }
        });
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

    const quickList = Array.isArray(stop.quickQuestions) && stop.quickQuestions.length > 0
      ? stop.quickQuestions.map(q => ({
          prompt: q.prompt || stop.quickQuestion,
          choices: q.choices || stop.quickChoices || [],
          correct: typeof q.correctIndex === "number" ? (q.choices || [])[q.correctIndex] : (q.correct || stop.quickCorrect),
          feedback: q.feedback || "Doğru!",
          hint: q.hint || stop.hint || "Soldaki adımlara ve verilere tekrar dikkat et."
        }))
      : [{
          prompt: stop.quickQuestion,
          choices: stop.quickChoices || [],
          correct: stop.quickCorrect,
          feedback: "Anlatımı ve doğrulama sorusunu başarıyla tamamladın!",
          hint: "Soldaki animasyon adımlarında oluşan farklı durumların sayısına ve son adımdaki özete tekrar dikkat et."
        }];
    let activeQuickIdx = 0;

    function renderQuickCheckQuestion() {
      const qObj = quickList[activeQuickIdx] || quickList[0];
      const titleEl = checkPanel.querySelector(".vcp-question-title");
      const helperEl = checkPanel.querySelector("#vcpHelperSub");
      const badgeEl = checkPanel.querySelector(".vcp-badge");
      if (badgeEl) {
        badgeEl.textContent = quickList.length > 1
          ? `🎯 Adım Sonu Doğrulama (${activeQuickIdx + 1} / ${quickList.length})`
          : "🎯 Adım Sonu Doğrulama";
      }
      if (titleEl) titleEl.innerHTML = safeMathHtml(qObj.prompt || "");
      if (helperEl) {
        helperEl.textContent = quickList.length > 1
          ? `Soru ${activeQuickIdx + 1} / ${quickList.length} — Doğru seçeneği işaretle:`
          : "Soldaki adımları inceledikten sonra doğru seçeneği işaretle:";
      }

      if (window.NartesMentor && typeof window.NartesMentor.notifyScreenTask === "function") {
        const plainQ = stripPlain(qObj.prompt || "");
        const qNums = Array.from(new Set((plainQ.match(/\b\d{1,4}\b/g) || []).map(Number).filter(n => n >= 2 && n <= 2000))).slice(0, 6);
        window.NartesMentor.notifyScreenTask({
          signature: `video:${UNIT.unitNo}:${stop.id}:v${stop._variantIndex || 0}:q${activeQuickIdx}`,
          taskTitle: `${stop.title} (Soru ${activeQuickIdx + 1})`,
          promptText: plainQ,
          numbers: qNums,
          targetNumber: stop.targetNumber || qNums[0] || undefined,
          options: qObj.choices,
          correctAnswer: qObj.correct,
          hint: qObj.hint
        });
      }

      const choicesBox = checkPanel.querySelector("#videoQuickChoices");
      choicesBox.innerHTML = "";
      const letters = ["A", "B", "C", "D"];
      (qObj.choices || []).forEach((ch, idx) => {
        const btn = document.createElement("button");
        btn.className = "option-btn vcp-option-btn";
        btn.innerHTML = `<span class="option-letter">${letters[idx] || "•"}</span><span class="vcp-option-text">${renderOptionMath(ch)}</span>`;
        btn.addEventListener("click", () => {
          if (window.NartesMentor && window.NartesMentor.isRemediationLocked()) return;
          if (String(ch) === String(qObj.correct)) {
            choicesBox.querySelectorAll(".option-btn").forEach(b => b.disabled = true);
            btn.classList.add("correct");
            spawnCelebrationBurst(btn);
            if (activeQuickIdx < quickList.length - 1) {
              playTone("combo");
              setTimeout(() => {
                activeQuickIdx++;
                renderQuickCheckQuestion();
              }, 700);
            } else {
              completeCurrentStop(qObj.feedback || "Anlatımı ve doğrulama sorusunu başarıyla tamamladın!");
            }
          } else {
            playTone("error");
            btn.classList.add("wrong-flash");
            if (window.NartesMentor) {
              window.NartesMentor.onWrong({
                wrongValue: ch,
                targetKey: `video_verify_${activeQuickIdx}`,
                targetLabel: qObj.prompt,
                correctAnswerToMask: qObj.correct,
                customHint: qObj.hint
              }, () => {
                btn.classList.remove("wrong-flash");
              });
            }
          }
        });
        choicesBox.appendChild(btn);
      });
      applyKaTeX(checkPanel);
    }

    renderQuickCheckQuestion();
  }

  // ==========================================================================
  // YARDIMCI: TEK SATIRLI ETKİLEŞİMLİ EŞ MERKEZLİ GÖKKUŞAĞI YAYLARI (SVG)
  //   - Eliptik yaylar (A rx ry 0 0 1) kullanıldığı için yaylar ASLA üst üste binmez.
  //   - Sayı düğümleri doğrudan SVG içinde tıklanabilir; altta ikinci bir kutu satırı yoktur.
  // ==========================================================================
  function buildRainbowArcsSvgHtml(seq, targetStates, targetNum, activeTargetIdx) {
    const isNumericList = seq.every(v => v === "?" || typeof v === "number" || /^[0-9]+$/.test(String(v)));
    if (!isNumericList || seq.length < 4) return "";

    const n = seq.length;
    const stepX = n <= 8 ? 72 : Math.max(58, Math.floor(528 / (n - 1)));
    const padX = 48;
    const width = padX * 2 + (n - 1) * stepX;
    const pairCount = Math.floor(n / 2);
    const hasCenterSquare = (n % 2 === 1);

    const innerRy = hasCenterSquare ? 42 : 28;
    const stepRy = 22;
    const maxRy = innerRy + Math.max(0, pairCount - 1) * stepRy;

    const topMargin = 42;
    const yAnchor = topMargin + maxRy;
    const nodeCy = yAnchor + 25;
    const svgHeight = nodeCy + 34;

    const colors = ["#ef4444", "#f97316", "#eab308", "#10b981", "#0ea5e9", "#8b5cf6"];

    let arcsHtml = "";
    for (let i = 0; i < pairCount; i++) {
      const j = n - 1 - i;
      const x1 = padX + i * stepX;
      const x2 = padX + j * stepX;
      const rx = (x2 - x1) / 2;
      const ry = innerRy + (pairCount - 1 - i) * stepRy;

      const mLeft = targetStates.find(m => m.index === i);
      const mRight = targetStates.find(m => m.index === j);
      const pairComplete = (!mLeft || mLeft.solved) && (!mRight || mRight.solved);
      const pairHasFocus =
        (mLeft && !mLeft.solved && targetStates.indexOf(mLeft) === activeTargetIdx) ||
        (mRight && !mRight.solved && targetStates.indexOf(mRight) === activeTargetIdx);
      const col = colors[i % colors.length];

      arcsHtml += `
        <path d="M ${x1} ${yAnchor} A ${rx} ${ry} 0 0 1 ${x2} ${yAnchor}"
              fill="none" stroke="${pairHasFocus ? "#2563eb" : col}"
              stroke-width="${pairComplete ? 3.8 : (pairHasFocus ? 3.2 : 2.5)}"
              stroke-dasharray="${pairComplete ? "none" : "7 5"}"
              opacity="${pairComplete ? 0.96 : (pairHasFocus ? 0.9 : 0.48)}"
              stroke-linecap="round"/>
      `;
    }

    if (hasCenterSquare) {
      const midIdx = Math.floor(n / 2);
      const mx = padX + midIdx * stepX;
      const mMid = targetStates.find(m => m.index === midIdx);
      const midSolved = !mMid || mMid.solved;
      const midFocused = Boolean(mMid && !mMid.solved && targetStates.indexOf(mMid) === activeTargetIdx);
      arcsHtml += `
        <path d="M ${mx - 13} ${yAnchor} A 14 23 0 1 1 ${mx + 13} ${yAnchor}"
              fill="none" stroke="${midFocused ? "#2563eb" : "#9333ea"}"
              stroke-width="${midSolved ? 3.2 : 2.4}"
              stroke-dasharray="${midSolved ? "none" : "5 4"}"
              opacity="${midSolved ? 0.96 : 0.65}" stroke-linecap="round"/>
        <text x="${mx}" y="${yAnchor - 28}" text-anchor="middle" font-size="10.5" font-weight="900" fill="#7e22ce">Tam Kare</text>
      `;
    }

    const nodesHtml = seq.map((item, idx) => {
      const x = padX + idx * stepX;
      const miss = targetStates.find(m => m.index === idx);
      if (!miss) {
        return `
          <g>
            <rect x="${x - 23}" y="${nodeCy - 22}" width="46" height="44" rx="13" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2.2"/>
            <text x="${x}" y="${nodeCy + 6}" text-anchor="middle" font-size="16" font-weight="900" fill="#0f172a">${escSvg(item)}</text>
          </g>
        `;
      }
      const mIdx = targetStates.indexOf(miss);
      const isSelected = !miss.solved && mIdx === activeTargetIdx;
      const valTxt = miss.solved ? miss.answer : "?";
      const fillBg = miss.solved ? "#dcfce7" : (isSelected ? "#dbeafe" : "#fff7ed");
      const strokeCol = miss.solved ? "#16a34a" : (isSelected ? "#2563eb" : "#f97316");
      const txtCol = miss.solved ? "#15803d" : (isSelected ? "#1d4ed8" : "#c2410c");
      const haloRing = isSelected
        ? `<rect x="${x - 28}" y="${nodeCy - 27}" width="56" height="54" rx="16" fill="none" stroke="rgba(37,99,235,0.22)" stroke-width="4"/>`
        : "";
      return `
        <g class="rainbow-interactive-node" data-slot-idx="${mIdx}" style="cursor:${miss.solved ? "default" : "pointer"};">
          ${haloRing}
          <rect x="${x - 23}" y="${nodeCy - 22}" width="46" height="44" rx="13" fill="${fillBg}" stroke="${strokeCol}" stroke-width="${isSelected ? 3.2 : 2.6}"/>
          <text x="${x}" y="${nodeCy + 6}" text-anchor="middle" font-size="16.5" font-weight="900" fill="${txtCol}">${escSvg(valTxt)}</text>
        </g>
      `;
    }).join("");

    return `
      <div class="rainbow-svg-stage">
        <svg viewBox="0 0 ${width} ${svgHeight}" class="rainbow-arcs-svg" role="img" aria-label="${targetNum || ""} Gökkuşağı Çarpan Modeli">
          <text x="${width / 2}" y="22" text-anchor="middle" font-size="13.5" font-weight="800" fill="#334155">
            Simetrik Çarpan Eşleşmesi ${targetNum ? `(Her Yayın Çarpımı = ${targetNum})` : ""}
          </text>
          ${arcsHtml}
          ${nodesHtml}
        </svg>
      </div>
    `;
  }

  function buildNonClickableStepBannerHtml(stepNo, totalSteps, badgeTitle, completedFlags) {
    if (totalSteps <= 1) return "";
    const dotsHtml = Array.from({ length: totalSteps }, (_, idx) => {
      const isDone = completedFlags && completedFlags[idx];
      const isActive = idx === stepNo - 1;
      return `<span class="linear-step-dot ${isDone ? "done" : ""} ${isActive ? "active" : ""}"></span>`;
    }).join("");
    return `
      <div class="linear-step-banner">
        <div class="linear-step-left">
          <span class="linear-step-pill">ADIM ${stepNo} / ${totalSteps}</span>
          <span class="linear-step-name">${escSvg(badgeTitle || `${stepNo}. Görev`)}</span>
        </div>
        <div class="linear-step-dots" aria-hidden="true">${dotsHtml}</div>
      </div>
    `;
  }

  // ==========================================================================
  // TÜR 3: 🧩 ADIM ADIM İLERLEYEN ÇOK ÇEŞİTLİ ETKİNLİKLER & 4 YÖNTEM ATÖLYESİ
  // ==========================================================================
  function renderActivityStop(stop, kaz, container) {
    const board = document.createElement("div");
    board.className = "interactive-board";

    if (stop.activityMode === "rainbow_pairs" || stop.activityMode === "multi_stage_rainbow") {
      const stages = stop.activityMode === "multi_stage_rainbow" && Array.isArray(stop.stages)
        ? stop.stages
        : [{
            badge: stop.title,
            prompt: "Seçili kutu için alttaki doğru değere tıkla:",
            targetNumber: stop.targetNumber,
            sequence: stop.sequence,
            missingTargets: stop.missingTargets,
            pool: stop.pool
          }];

      const stageModels = stages.map(st => {
        // NartesVariantEngine items dizisi verirse missingTargets'ı otomatik üret
        let seq = st.sequence;
        let mTargets = st.missingTargets;
        if (!Array.isArray(seq) && Array.isArray(st.items) && (typeof st.target === "number" || typeof st.base === "number")) {
          const fullSeq = window.NartesVariantEngine
            ? (st.base ? Array.from({ length: st.items.length }, (_, k) => st.base * (k + 1)) : window.NartesVariantEngine.divisorsOf(st.target))
            : st.items;
          seq = st.items.map(v => (v === null ? "?" : v));
          mTargets = [];
          st.items.forEach((v, idx) => {
            if (v === null) {
              mTargets.push({
                index: idx,
                answer: fullSeq[idx],
                hint: st.hint || `Sıradaki kutunun değerini kurala göre hesapla.`
              });
            }
          });
        }
        return {
          ...st,
          variety: st.variety || (st.base ? "kat_ladder" : undefined),
          stepBase: st.stepBase || st.base,
          badge: st.badge || st.title,
          targetNumber: st.targetNumber || st.target || st.base || stop.targetNumber,
          sequence: seq || [],
          targets: (mTargets || []).map(m => ({ ...m, solved: false })),
          completed: false
        };
      });
      let activeStageIdx = 0;

      function detectStageVariety(st) {
        if (st.variety) return st.variety;
        const seq = st.sequence || [];
        const isNum = seq.length >= 4 && seq.every(v => v === "?" || typeof v === "number" || /^[0-9]+$/.test(String(v)));
        return isNum ? "rainbow" : "equation_cards";
      }

      function renderActiveStage() {
        const st = stageModels[activeStageIdx];
        const variety = detectStageVariety(st);
        let activeMissingIdx = st.targets.findIndex(m => !m.solved);
        if (activeMissingIdx === -1) activeMissingIdx = 0;

        board.innerHTML = "";

        if (stageModels.length > 1) {
          const cleanBadge = String(st.badge || `${activeStageIdx + 1}. Görev`).replace(/^Adım\s*\d+\s*\/\s*\d+\s*•\s*/i, "");
          const bannerWrap = document.createElement("div");
          bannerWrap.innerHTML = buildNonClickableStepBannerHtml(
            activeStageIdx + 1,
            stageModels.length,
            cleanBadge,
            stageModels.map(m => m.completed)
          );
          if (bannerWrap.firstElementChild) board.appendChild(bannerWrap.firstElementChild);
        }

        const promptEl = document.createElement("div");
        promptEl.className = "activity-stage-prompt";
        promptEl.innerHTML = safeMathHtml(st.prompt || "Mavi seçili kutu için alttaki doğru değere tıkla:");
        board.appendChild(promptEl);

        const stageVisualArea = document.createElement("div");
        stageVisualArea.className = "activity-variety-stage";
        board.appendChild(stageVisualArea);

        const poolWrap = document.createElement("div");
        poolWrap.className = "chip-grid";
        board.appendChild(poolWrap);

        function syncStageMentor() {
          const currT = st.targets[activeMissingIdx];
          if (window.NartesMentor) {
            const pTxt = stripPlain(st.prompt || "");
            const seqNums = (st.sequence || [])
              .map(v => parseInt(v, 10))
              .filter(n => !isNaN(n) && n >= 2 && n <= 2000);
            const tNum = Number(st.targetNumber || 0) || undefined;
            const stageNums = Array.from(new Set([...(tNum ? [tNum] : []), ...seqNums])).slice(0, 8);
            if (typeof window.NartesMentor.notifyScreenTask === "function") {
              window.NartesMentor.notifyScreenTask({
                signature: `act:${stop.id}:v${stop._variantIndex || 0}:st${activeStageIdx}`,
                taskTitle: `${stop.title} • ${st.badge || (activeStageIdx + 1) + ". Aşama"}`,
                promptText: `${pTxt} (Dizi: ${(st.sequence || []).join(", ")})`,
                numbers: stageNums,
                targetNumber: tNum,
                missingTargets: st.targets.filter(t => !t.solved),
                hint: currT ? currT.hint : (st.hint || "")
              });
            }
            window.NartesMentor.updateProgress({
              liveScreen: {
                mode: stop.activityMode,
                variety,
                stageBadge: st.badge || stop.title,
                stageIndex: activeStageIdx + 1,
                stageTotal: stageModels.length,
                prompt: pTxt,
                targetNumber: st.targetNumber,
                activeSlotLabel: currT ? String((st.sequence && st.sequence[currT.index]) || "Seçili Kutu") : "Tamamlandı",
                activeSlotHint: currT ? currT.hint : ""
              }
            });
          }
        }

        function bindSlotClickHandlers() {
          stageVisualArea.querySelectorAll("[data-slot-idx]").forEach(el => {
            el.addEventListener("click", () => {
              if (window.NartesMentor && window.NartesMentor.isRemediationLocked()) return;
              const idx = parseInt(el.getAttribute("data-slot-idx"), 10);
              if (st.targets[idx] && !st.targets[idx].solved) {
                playTone("click");
                activeMissingIdx = idx;
                refreshStageVisual();
                syncStageMentor();
              }
            });
          });
        }

        function refreshStageVisual() {
          if (variety === "rainbow") {
            stageVisualArea.innerHTML = buildRainbowArcsSvgHtml(st.sequence, st.targets, st.targetNumber, activeMissingIdx);
          } else if (variety === "factor_pairs") {
            const pairs = st.pairs || [];
            stageVisualArea.innerHTML = `
              <div class="fpairs-grid">
                ${pairs.map((p) => {
                  const hasSlot = typeof p.targetIdx === "number";
                  const tObj = hasSlot ? st.targets[p.targetIdx] : null;
                  const isSel = hasSlot && !tObj.solved && p.targetIdx === activeMissingIdx;
                  const renderTerm = (val, isMissingSide) => {
                    if (!isMissingSide || !tObj) {
                      return `<span class="fpair-num">${escSvg(val)}</span>`;
                    }
                    return `<button type="button" class="fpair-slot ${tObj.solved ? "solved" : ""} ${isSel ? "selected" : ""}" data-slot-idx="${p.targetIdx}">
                      ${tObj.solved ? tObj.answer : "?"}
                    </button>`;
                  };
                  return `
                    <div class="fpair-card ${p.isSquare ? "is-square-pair" : ""}">
                      <span class="fpair-tag">${p.isSquare ? "Tam Kare" : "Çarpan Çifti"}</span>
                      <div class="fpair-eq">
                        ${renderTerm(p.left, p.left === "?")}
                        <span class="fpair-op">×</span>
                        ${renderTerm(p.right, p.right === "?")}
                        <span class="fpair-op">=</span>
                        <span class="fpair-total">${escSvg(st.targetNumber)}</span>
                      </div>
                    </div>
                  `;
                }).join("")}
              </div>
            `;
          } else if (variety === "kat_ladder") {
            const stepBase = st.stepBase || st.sequence[0] || 8;
            stageVisualArea.innerHTML = `
              <div class="kat-ladder-track">
                ${st.sequence.map((item, idx) => {
                  const missObj = st.targets.find(m => m.index === idx);
                  const mIdx = missObj ? st.targets.indexOf(missObj) : -1;
                  const isSel = missObj && !missObj.solved && mIdx === activeMissingIdx;
                  const jumpArrow = idx < st.sequence.length - 1
                    ? `<div class="kat-jump-arrow"><span class="kat-jump-plus">+${escSvg(stepBase)}</span><span class="kat-jump-chev">→</span></div>`
                    : "";
                  if (!missObj) {
                    return `
                      <div class="kat-step-unit">
                        <span class="kat-step-ord">${idx + 1}. kat</span>
                        <div class="kat-step-box static">${escSvg(item)}</div>
                      </div>
                      ${jumpArrow}
                    `;
                  }
                  return `
                    <div class="kat-step-unit">
                      <span class="kat-step-ord">${idx + 1}. kat</span>
                      <button type="button" class="kat-step-box slot ${missObj.solved ? "solved" : ""} ${isSel ? "selected" : ""}" data-slot-idx="${mIdx}">
                        ${missObj.solved ? missObj.answer : "?"}
                      </button>
                    </div>
                    ${jumpArrow}
                  `;
                }).join("")}
              </div>
            `;
          } else if (variety === "venn_ebob") {
            const sCommon1 = st.targets[0];
            const sCommon2 = st.targets[1];
            const sel0 = !sCommon1.solved && activeMissingIdx === 0;
            const sel1 = !sCommon2.solved && activeMissingIdx === 1;
            stageVisualArea.innerHTML = `
              <div class="venn-ebob-wrap">
                <svg viewBox="0 0 520 212" class="venn-ebob-svg" role="img" aria-label="${st.numA} ve ${st.numB} Ortak Bölen Kesişim Şeması">
                  <circle cx="192" cy="112" r="82" fill="rgba(59, 130, 246, 0.12)" stroke="#2563eb" stroke-width="2.4"/>
                  <circle cx="328" cy="112" r="82" fill="rgba(249, 115, 22, 0.12)" stroke="#ea580c" stroke-width="2.4"/>
                  <text x="144" y="22" text-anchor="middle" font-size="13" font-weight="900" fill="#1d4ed8">${st.numA}'in Bölenleri</text>
                  <text x="376" y="22" text-anchor="middle" font-size="13" font-weight="900" fill="#c2410c">${st.numB}'ün Bölenleri</text>
                  <text x="260" y="22" text-anchor="middle" font-size="12" font-weight="900" fill="#15803d">Ortak Bölenler</text>

                  <!-- Yalnız A bölgesi -->
                  <text x="142" y="96" text-anchor="middle" font-size="16" font-weight="900" fill="#1e3a8a">${escSvg(st.onlyA[0] || "")}</text>
                  <text x="142" y="136" text-anchor="middle" font-size="16" font-weight="900" fill="#1e3a8a">${escSvg(st.onlyA[1] || "")}</text>

                  <!-- Yalnız B bölgesi -->
                  <text x="374" y="82" text-anchor="middle" font-size="15.5" font-weight="900" fill="#9a3412">${escSvg(st.onlyB[0] || "")}</text>
                  <text x="392" y="112" text-anchor="middle" font-size="15.5" font-weight="900" fill="#9a3412">${escSvg(st.onlyB[1] || "")}</text>
                  <text x="374" y="142" text-anchor="middle" font-size="15.5" font-weight="900" fill="#9a3412">${escSvg(st.onlyB[2] || "")}</text>
                  <text x="352" y="168" text-anchor="middle" font-size="15.5" font-weight="900" fill="#9a3412">${escSvg(st.onlyB[3] || "")}</text>

                  <!-- Ortak Bölge (dinamik ortak bölenler + EBOB) -->
                  ${(() => { const cf = st.commonFixed || [1, 2]; return `
                  <circle cx="242" cy="76" r="15" fill="#f0fdf4" stroke="#86efac" stroke-width="1.8"/>
                  <text x="242" y="81" text-anchor="middle" font-size="13.5" font-weight="900" fill="#14532d">${escSvg(cf[0] ?? 1)}</text>
                  <circle cx="278" cy="76" r="15" fill="#f0fdf4" stroke="#86efac" stroke-width="1.8"/>
                  <text x="278" y="81" text-anchor="middle" font-size="13.5" font-weight="900" fill="#14532d">${escSvg(cf[1] ?? "")}</text>
                  `; })()}

                  <g data-slot-idx="0" style="cursor:${sCommon1.solved ? "default" : "pointer"};">
                    <rect x="236" y="100" width="48" height="32" rx="10"
                          fill="${sCommon1.solved ? "#dcfce7" : (sel0 ? "#dbeafe" : "#fff7ed")}"
                          stroke="${sCommon1.solved ? "#16a34a" : (sel0 ? "#2563eb" : "#f97316")}" stroke-width="2.6"/>
                    <text x="260" y="121" text-anchor="middle" font-size="14.5" font-weight="900" fill="#0f172a">${sCommon1.solved ? sCommon1.answer : "?"}</text>
                  </g>

                  <g data-slot-idx="1" style="cursor:${sCommon2.solved ? "default" : "pointer"};">
                    <rect x="226" y="140" width="68" height="34" rx="11"
                          fill="${sCommon2.solved ? "#dcfce7" : (sel1 ? "#dbeafe" : "#fff7ed")}"
                          stroke="${sCommon2.solved ? "#16a34a" : (sel1 ? "#2563eb" : "#f97316")}" stroke-width="2.8"/>
                    <text x="260" y="162" text-anchor="middle" font-size="13.5" font-weight="900" fill="#0f172a">${sCommon2.solved ? `★ ${sCommon2.answer}` : "EBOB ?"}</text>
                  </g>
                </svg>
              </div>
            `;
          } else {
            // equation_cards: "EBOB(20, 30) = ?" veya genel denklem kartları
            stageVisualArea.innerHTML = `
              <div class="eq-cards-grid">
                ${st.sequence.map((item, idx) => {
                  const missObj = st.targets.find(m => m.index === idx);
                  const mIdx = missObj ? st.targets.indexOf(missObj) : -1;
                  const isSel = missObj && !missObj.solved && mIdx === activeMissingIdx;
                  const rawStr = String(item);
                  const eqParts = rawStr.includes("=") ? rawStr.split("=") : [rawStr, ""];
                  const leftLabel = eqParts[0].trim();
                  if (!missObj) {
                    return `
                      <div class="eq-solve-card static">
                        <span class="eq-card-lhs">${renderOptionMath(rawStr)}</span>
                      </div>
                    `;
                  }
                  return `
                    <button type="button" class="eq-solve-card ${missObj.solved ? "solved" : ""} ${isSel ? "selected" : ""}" data-slot-idx="${mIdx}">
                      <span class="eq-card-lhs">${renderOptionMath(leftLabel)}</span>
                      <span class="eq-card-sign">=</span>
                      <span class="eq-card-slot">${missObj.solved ? renderOptionMath(missObj.answer) : "?"}</span>
                    </button>
                  `;
                }).join("")}
              </div>
            `;
          }

          bindSlotClickHandlers();
          applyKaTeX(stageVisualArea);
        }

        refreshStageVisual();
        syncStageMentor();

        st.pool.forEach(val => {
          const chip = document.createElement("button");
          chip.className = "num-chip";
          const alreadyExhausted = !st.targets.some(t => !t.solved && String(t.answer) === String(val)) &&
            st.targets.some(t => t.solved && String(t.answer) === String(val));
          if (alreadyExhausted) {
            chip.classList.add("correct");
            chip.disabled = true;
          }
          chip.innerHTML = renderOptionMath(val);
          chip.addEventListener("click", () => {
            if (window.NartesMentor && window.NartesMentor.isRemediationLocked()) return;
            const currentTarget = st.targets[activeMissingIdx];
            if (!currentTarget || currentTarget.solved) return;
            if (String(val) === String(currentTarget.answer)) {
              currentTarget.solved = true;
              const stillNeeded = st.targets.some(t => !t.solved && String(t.answer) === String(val));
              if (!stillNeeded) {
                chip.classList.add("correct");
                chip.disabled = true;
              }
              const nextUnsolved = st.targets.findIndex(m => !m.solved);
              if (nextUnsolved !== -1) {
                playTone("pop");
                activeMissingIdx = nextUnsolved;
                refreshStageVisual();
                syncStageMentor();
              } else {
                st.completed = true;
                playTone("combo");
                spawnCelebrationBurst(chip);
                refreshStageVisual();
                const nextStage = stageModels.findIndex(sModel => !sModel.completed);
                if (nextStage !== -1) {
                  clearTimeout(state.autoAdvanceTimer);
                  state.autoAdvanceTimer = setTimeout(() => {
                    activeStageIdx = nextStage;
                    renderActiveStage();
                  }, 780);
                } else {
                  completeCurrentStop("Tüm etkinlik adımlarını başarıyla tamamladın!");
                }
              }
            } else {
              playTone("error");
              chip.classList.add("wrong-flash");
              if (window.NartesMentor) {
                window.NartesMentor.onWrong({
                  wrongValue: val,
                  targetKey: `stage_${activeStageIdx}_${activeMissingIdx}`,
                  targetLabel: `${st.badge || stop.title} — ${String((st.sequence && st.sequence[currentTarget.index]) || "Seçili Kutu")}`,
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
        applyKaTeX(board);
      }

      renderActiveStage();
    } else if (stop.activityMode === "factor_methods_lab") {
      // ======================================================================
      // DİNAMİK 5 YÖNTEM ATÖLYESİ (Üstte Sekme Yok — İlerledikçe Sırayla Gelir!)
      // 1) 🌈 Gökkuşağı -> 2) 🌸 Çarpan Çiçeği -> 3) 🌳 Asal Çarpan Ağacı
      // -> 4) 📏 Bölen Listesi -> 5) ✨ Üslü İfade Sentezi
      // ======================================================================
      const targetN = Number(stop.targetNumber || (stop.methodsData && stop.methodsData.target) || 24);
      const md = stop.methodsData || (window.NartesVariantEngine ? window.NartesVariantEngine.make5MethodSet(targetN) : null);
      if (!md) {
        board.innerHTML = `<div class="lead-text"><p>Yöntem verisi yüklenemedi.</p></div>`;
        container.appendChild(board);
        return;
      }

      const rbDivs = md.divisors || [1, 2, 3, 4, 6, 8, 12, 24];
      const rbItems = md.rainbow && Array.isArray(md.rainbow.items)
        ? md.rainbow.items
        : rbDivs.map((v, i) => (i === 2 || i === rbDivs.length - 3 ? null : v));
      const rbSequence = rbItems.map(v => (v === null ? "?" : v));
      const rbSlots = [];
      rbItems.forEach((v, idx) => {
        if (v === null) {
          const ans = rbDivs[idx];
          const partner = targetN / ans;
          rbSlots.push({
            index: idx,
            answer: ans,
            label: `${idx + 1}. kutu (? × ${partner} = ${targetN})`,
            hint: `${targetN} ÷ ${partner} = ${ans} olur; küçükten büyüğe sırada bu kutuya ${ans} gelir.`,
            solved: false
          });
        }
      });

      // Çarpan Çiçeği Dinamik Yapraklar & Slotlar
      const fCount = rbDivs.length;
      const flSlots = [];
      const flPetalMeta = rbDivs.map((d, i) => ({
        val: d,
        angle: -90 + (360 / fCount) * i,
        pairIdx: Math.min(i, fCount - 1 - i)
      }));
      const slotCandidateIndices = fCount >= 8 ? [fCount - 4, fCount - 3, fCount - 2] : [fCount - 3, fCount - 2];
      slotCandidateIndices.forEach((pIdx) => {
        if (pIdx > 0 && pIdx < fCount - 1) {
          const ans = rbDivs[pIdx];
          const mate = targetN / ans;
          flSlots.push({
            petalIdx: pIdx,
            answer: ans,
            label: `${mate} yaprağının karşısı (${mate} × ? = ${targetN})`,
            hint: `Çarpan çiçeğinde ${mate} yaprağının tam karşısında ${targetN} ÷ ${mate} = ${ans} yazar.`,
            solved: false
          });
        }
      });
      const lastPrimeLeaf = md.uniquePrimes[md.uniquePrimes.length - 1] || 3;
      const leafSlotIdx = flSlots.length;
      flSlots.push({
        key: "primeLeaf",
        answer: lastPrimeLeaf,
        label: `Sağdaki yeşil asal çarpan yaprağı`,
        hint: `${targetN} sayısının çarpanları içinden asal olanlar: ${md.uniquePrimes.join(" ve ")}.`,
        solved: false
      });
      const flPoolNums = Array.from(new Set(flSlots.map(s => s.answer).concat((md.flower && md.flower.pool ? md.flower.pool.map(Number) : [2, 3, 4, 6, 8, 9, 12])))).filter(x => Number.isFinite(x)).sort((a, b) => a - b);

      // Asal Çarpan Ağacı Dinamik Düğüm Zinciri
      const allPrimes = md.allPrimes || [2, 2, 2, 3];
      const treeSteps = [];
      let curNodeVal = targetN;
      for (let i = 0; i < allPrimes.length - 1; i++) {
        const p = allPrimes[i];
        const nextVal = curNodeVal / p;
        treeSteps.push({ parent: curNodeVal, leftPrime: p, rightVal: nextVal, isLastLeaf: i === allPrimes.length - 2 });
        curNodeVal = nextVal;
      }
      const treeSlots = treeSteps.map((ts, i) => ({
        stepIdx: i,
        answer: ts.rightVal,
        label: `${i + 1}. Basamak: ${ts.parent} = ${ts.leftPrime} × [ ? ]`,
        hint: `${ts.parent} sayısını ${ts.leftPrime}'e böldüğümüzde sağ dala ${ts.parent} ÷ ${ts.leftPrime} = ${ts.rightVal} gelir.`,
        solved: false
      }));
      const treePool = Array.from(new Set(
        treeSlots.map(s => s.answer).concat(allPrimes, [Math.max(2, targetN / 2 - 2), allPrimes[0] + 3])
      )).filter(n => Number.isFinite(n) && n >= 2).sort((a, b) => a - b).slice(0, 7);

      // Bölen Listesi (Algoritma) Dinamik Satırlar
      const algoRows = (md.algo && md.algo.rows) || [];
      const rowSecondIdx = Math.min(1, Math.max(0, algoRows.length - 1));
      const rowLastIdx = Math.max(0, algoRows.length - 1);
      const algoSlots = [];
      if (algoRows.length >= 2) {
        algoSlots.push({
          rowIdx: rowSecondIdx,
          col: "dividend",
          answer: algoRows[rowSecondIdx].dividend,
          label: `Sol sütun ${rowSecondIdx + 1}. satır (${algoRows[rowSecondIdx - 1].dividend} ÷ ${algoRows[rowSecondIdx - 1].divisor})`,
          hint: `${algoRows[rowSecondIdx - 1].dividend} sayısını sağdaki ${algoRows[rowSecondIdx - 1].divisor} asalına bölüp altına yaz.`,
          solved: false
        });
      }
      if (algoRows.length >= 3) {
        algoSlots.push({
          rowIdx: rowLastIdx,
          col: "dividend",
          answer: algoRows[rowLastIdx].dividend,
          label: `Sol sütun ${rowLastIdx + 1}. satır bölümü`,
          hint: `Üstteki ${algoRows[rowLastIdx - 1].dividend} sayısını sağındaki ${algoRows[rowLastIdx - 1].divisor} asalıyla böl.`,
          solved: false
        });
      }
      if (algoRows.length >= 1) {
        algoSlots.push({
          rowIdx: rowLastIdx,
          col: "divisor",
          answer: algoRows[rowLastIdx].divisor,
          label: `Sağ sütun son asal bölen (${algoRows[rowLastIdx].dividend} ÷ ? = 1)`,
          hint: `Sol sütundaki ${algoRows[rowLastIdx].dividend} sayısını 1 yapmak için kendisine bölen asal sayıyı seç.`,
          solved: false
        });
      }
      const algoPool = Array.from(new Set(
        algoSlots.map(s => s.answer).concat(md.uniquePrimes, [Math.floor(targetN / 2), 9, 15].filter(x => x >= 2))
      )).filter(n => Number.isFinite(n)).sort((a, b) => a - b).slice(0, 7);

      const synthData = md.synth || {
        target: targetN,
        prompt: `${targetN} sayısının asal çarpanlarının çarpımı (üslü ifade) biçimindeki doğru gösterimini seç:`,
        choices: [`2^2 × 3`, md.expText, `2 × 3^2`, `2^3 × 5`],
        correctIndex: 1,
        feedback: `Harika! ${targetN} = ${md.expText}.`,
        hint: `Asal bölenlerin kaç kez tekrar ettiğini üs olarak yaz.`
      };

      const methods = [
        {
          id: "rainbow",
          icon: "🌈",
          shortTitle: `Gökkuşağı Yöntemi (${targetN})`,
          targetNumber: targetN,
          subtitle: `<strong>${targetN}</strong> sayısının küçükten büyüğe dizilmiş çarpanlarında simetrik yayların uçlarındaki eksikleri bul:`,
          takeaway: `✓ ${targetN}'in ${rbDivs.length} pozitif çarpanı vardır • En küçük ve en büyük: 1 × ${targetN}`,
          sequence: rbSequence,
          slots: rbSlots,
          pool: (md.rainbow && md.rainbow.pool) || [3, 4, 6, 8, 9, 12],
          completed: false
        },
        {
          id: "flower",
          icon: "🌸",
          shortTitle: `Çarpan Çiçeği (${targetN})`,
          targetNumber: targetN,
          subtitle: `Göbeğinde <strong>${targetN}</strong> yazan <strong>Çarpan Çiçeği</strong>nde karşılıklı yaprakların çarpımı ${targetN} olacak şekilde eksikleri ve yeşil <strong>asal yaprağı</strong> tamamla:`,
          takeaway: `✓ ${targetN} Çarpan Çiçeği tamamlandı! Asal yapraklar: ${md.uniquePrimes.join(" ve ")}`,
          slots: flSlots,
          pool: flPoolNums,
          completed: false
        },
        {
          id: "tree",
          icon: "🌳",
          shortTitle: `Asal Çarpan Ağacı (${targetN})`,
          targetNumber: targetN,
          subtitle: `En tepesinde <strong>${targetN}</strong> bulunan <strong>Asal Çarpan Ağacı</strong>ndaki eksik sağ dalları yukarıdan aşağıya tamamla:`,
          takeaway: `✓ Asal yaprakların çarpımı: ${targetN} = ${allPrimes.join(" × ")}!`,
          slots: treeSlots,
          pool: treePool,
          completed: false
        },
        {
          id: "algo",
          icon: "📏",
          shortTitle: `Bölen Listesi / Algoritma (${targetN})`,
          targetNumber: targetN,
          subtitle: `<strong>${targetN}</strong> sayısının dikey <strong>asal çarpanlar algoritmasında</strong> eksik kalan bölüm ve asal bölenleri yerleştir:`,
          takeaway: `✓ Sağ sütundaki asal bölenler: ${allPrimes.join(", ")} ⇒ ${targetN} = ${md.expText}!`,
          slots: algoSlots,
          pool: algoPool,
          completed: false
        },
        {
          id: "synth",
          icon: "✨",
          shortTitle: `Üslü İfade Sentezi (${targetN})`,
          targetNumber: targetN,
          subtitle: safeMathHtml(synthData.prompt),
          takeaway: synthData.feedback || `✓ ${targetN} = ${md.expText}!`,
          slots: [],
          choices: synthData.choices || [],
          correctChoice: (synthData.choices || [])[synthData.correctIndex || 0],
          synthHint: synthData.hint || `Her asal bölenin tekrar sayısını üs olarak yaz.`,
          pool: [],
          completed: false
        }
      ];

      let activeMethodIdx = 0;
      let activeSlotIdx = 0;

      function renderWorkshop() {
        const m = methods[activeMethodIdx];
        const firstUnsolved = m.slots.findIndex(s => !s.solved);
        if (firstUnsolved !== -1 && (!m.slots[activeSlotIdx] || m.slots[activeSlotIdx].solved)) {
          activeSlotIdx = firstUnsolved;
        }
        const currSlot = m.slots[activeSlotIdx] || m.slots[0];
        const doneMethodsCount = methods.filter(x => x.completed).length;

        if (window.NartesMentor) {
          if (typeof window.NartesMentor.notifyScreenTask === "function") {
            window.NartesMentor.notifyScreenTask({
              signature: `fml:${stop.id}:v${stop._variantIndex || 0}:t${targetN}:m${activeMethodIdx}`,
              taskTitle: m.shortTitle,
              promptText: stripPlain(m.subtitle),
              numbers: [m.targetNumber],
              targetNumber: m.targetNumber,
              missingTargets: m.slots.filter(s => !s.solved).map(s => ({ answer: s.answer, hint: s.hint })),
              hint: currSlot ? currSlot.hint : (m.synthHint || "")
            });
          }
          window.NartesMentor.updateProgress({
            liveScreen: {
              mode: "factor_methods_lab",
              methodId: m.id,
              methodTitle: m.shortTitle,
              targetNumber: m.targetNumber,
              completedMethods: `${doneMethodsCount}/${methods.length}`,
              activeSlotLabel: currSlot && !currSlot.solved ? currSlot.label : (m.id === "synth" ? "Üslü Sentez Seçimi" : "Tamamlandı"),
              activeSlotHint: currSlot ? currSlot.hint : (m.synthHint || m.takeaway)
            }
          });
        }

        let diagramHtml = "";
        if (m.id === "rainbow") {
          diagramHtml = buildRainbowArcsSvgHtml(m.sequence, m.slots, m.targetNumber, activeSlotIdx);
        } else if (m.id === "flower") {
          const cx = 172, cy = 128, rad = 86;
          const pairColors = ["#fecaca", "#fed7aa", "#fef08a", "#d9f99d", "#bae6fd", "#e9d5ff"];
          const petalsSvg = flPetalMeta.map((pm, pIdx) => {
            const radAng = (pm.angle * Math.PI) / 180;
            const px = Math.round(cx + rad * Math.cos(radAng));
            const py = Math.round(cy + rad * Math.sin(radAng));
            const sIdx = m.slots.findIndex(sl => sl.petalIdx === pIdx);
            if (sIdx !== -1) {
              const sl = m.slots[sIdx];
              const isSel = activeSlotIdx === sIdx && !sl.solved;
              const fill = sl.solved ? "#dcfce7" : (isSel ? "#dbeafe" : "#fff7ed");
              const stroke = sl.solved ? "#16a34a" : (isSel ? "#2563eb" : "#f97316");
              return `
                <line x1="${cx}" y1="${cy}" x2="${px}" y2="${py}" stroke="#94a3b8" stroke-width="2.2" stroke-dasharray="4 3"/>
                <g class="fml-svg-slot" data-slot-idx="${sIdx}" style="cursor:pointer;">
                  <circle cx="${px}" cy="${py}" r="21" fill="${fill}" stroke="${stroke}" stroke-width="${isSel ? 3.2 : 2.6}"/>
                  <text x="${px}" y="${py + 5}" text-anchor="middle" font-size="14.5" font-weight="900" fill="#0f172a">${sl.solved ? sl.answer : "?"}</text>
                </g>
              `;
            }
            return `
              <line x1="${cx}" y1="${cy}" x2="${px}" y2="${py}" stroke="#cbd5e1" stroke-width="2.2"/>
              <circle cx="${px}" cy="${py}" r="20" fill="${pairColors[pm.pairIdx % pairColors.length]}" stroke="#64748b" stroke-width="1.8"/>
              <text x="${px}" y="${py + 5}" text-anchor="middle" font-size="14" font-weight="900" fill="#0f172a">${pm.val}</text>
            `;
          }).join("");

          const leafSlot = m.slots[leafSlotIdx];
          const leafSel = leafSlot && activeSlotIdx === leafSlotIdx && !leafSlot.solved;
          const fixedPrimes = md.uniquePrimes.slice(0, -1);
          const extraNote = md.uniquePrimes.length > 2 ? ` (+ ${fixedPrimes.join(", ")})` : "";
          diagramHtml = `
            <div class="fml-svg-wrap">
              <svg viewBox="0 0 530 256" class="fml-diagram-svg" role="img" aria-label="${targetN} Çarpan Çiçeği Modeli">
                <path d="M ${cx} ${cy + 32} Q 252 236 336 184" fill="none" stroke="#15803d" stroke-width="5" stroke-linecap="round"/>
                ${petalsSvg}
                <circle cx="${cx}" cy="${cy}" r="32" fill="#facc15" stroke="#ca8a04" stroke-width="3.2"/>
                <text x="${cx}" y="${cy + 7}" text-anchor="middle" font-size="21" font-weight="900" fill="#713f12">${targetN}</text>

                <rect x="326" y="42" width="186" height="170" rx="18" fill="#f0fdf4" stroke="#86efac" stroke-width="2"/>
                <text x="419" y="68" text-anchor="middle" font-size="12.5" font-weight="900" fill="#15803d">🌿 ASAL YAPRAKLAR</text>
                <text x="419" y="86" text-anchor="middle" font-size="11" font-weight="700" fill="#166534">(${targetN}'in Asal Çarpanları${extraNote})</text>

                <ellipse cx="378" cy="138" rx="28" ry="20" fill="#4ade80" stroke="#15803d" stroke-width="2.2"/>
                <text x="378" y="144" text-anchor="middle" font-size="16" font-weight="900" fill="#052e16">${fixedPrimes[0] || md.uniquePrimes[0]}</text>

                <g class="fml-svg-slot" data-slot-idx="${leafSlotIdx}" style="cursor:pointer;">
                  <ellipse cx="458" cy="138" rx="29" ry="20"
                    fill="${leafSlot.solved ? "#4ade80" : (leafSel ? "#dbeafe" : "#fff7ed")}"
                    stroke="${leafSlot.solved ? "#15803d" : (leafSel ? "#2563eb" : "#f97316")}" stroke-width="${leafSel ? 3.2 : 2.6}"/>
                  <text x="458" y="144" text-anchor="middle" font-size="16" font-weight="900" fill="#0f172a">${leafSlot.solved ? leafSlot.answer : "?"}</text>
                </g>
                <text x="419" y="192" text-anchor="middle" font-size="11.5" font-weight="800" fill="#15803d">Karşılıklı Yapraklar = ${targetN}</text>
              </svg>
            </div>
          `;
        } else if (m.id === "tree") {
          const rowH = 68;
          const totalRows = treeSteps.length;
          const svgH = Math.max(230, 56 + totalRows * rowH);
          let linesSvg = "";
          let nodesSvg = "";
          let rootX = 250;
          let rootY = 30;
          nodesSvg += `
            <rect x="${rootX - 34}" y="${rootY - 19}" width="68" height="38" rx="12" fill="#1e293b"/>
            <text x="${rootX}" y="${rootY + 6}" text-anchor="middle" font-size="17.5" font-weight="900" fill="#fde047">${targetN}</text>
          `;
          let parentX = rootX;
          let parentY = rootY;
          treeSteps.forEach((ts, sIdx) => {
            const leftX = Math.max(85, parentX - 82);
            const rightX = Math.min(455, parentX + 74);
            const nextY = parentY + rowH;
            linesSvg += `
              <line x1="${parentX}" y1="${parentY + 19}" x2="${leftX}" y2="${nextY - 19}" stroke="#64748b" stroke-width="2.4"/>
              <line x1="${parentX}" y1="${parentY + 19}" x2="${rightX}" y2="${nextY - 19}" stroke="#64748b" stroke-width="2.4"/>
            `;
            nodesSvg += `
              <circle cx="${leftX}" cy="${nextY}" r="19" fill="#dcfce7" stroke="#16a34a" stroke-width="2.4"/>
              <text x="${leftX}" y="${nextY + 6}" text-anchor="middle" font-size="15.5" font-weight="900" fill="#14532d">${ts.leftPrime}</text>
            `;
            const sObj = m.slots[sIdx];
            const sel = sObj && activeSlotIdx === sIdx && !sObj.solved;
            const fill = sObj && sObj.solved ? "#dcfce7" : (sel ? "#dbeafe" : "#fff7ed");
            const stroke = sObj && sObj.solved ? "#16a34a" : (sel ? "#2563eb" : "#f97316");
            nodesSvg += `
              <g class="fml-svg-slot" data-slot-idx="${sIdx}" style="cursor:pointer;">
                <rect x="${rightX - 30}" y="${nextY - 19}" width="60" height="38" rx="11" fill="${fill}" stroke="${stroke}" stroke-width="${sel ? 3.2 : 2.6}"/>
                <text x="${rightX}" y="${nextY + 6}" text-anchor="middle" font-size="15.5" font-weight="900" fill="#0f172a">${sObj && sObj.solved ? sObj.answer : "?"}</text>
              </g>
            `;
            parentX = rightX;
            parentY = nextY;
          });
          diagramHtml = `
            <div class="fml-svg-wrap">
              <svg viewBox="0 0 540 ${svgH}" class="fml-diagram-svg" role="img" aria-label="${targetN} Asal Çarpan Ağacı">
                ${linesSvg}
                ${nodesSvg}
              </svg>
            </div>
          `;
        } else if (m.id === "algo") {
          const renderAlgoBtn = (sObj, idx) => {
            const sel = activeSlotIdx === idx && !sObj.solved;
            return `<button type="button" class="fml-algo-slot ${sObj.solved ? "solved" : ""} ${sel ? "selected" : ""}" data-slot-idx="${idx}">
              ${sObj.solved ? sObj.answer : "?"}
            </button>`;
          };
          const rowsHtml = algoRows.map((row, rIdx) => {
            const dSlotIdx = m.slots.findIndex(sl => sl.rowIdx === rIdx && sl.col === "dividend");
            const pSlotIdx = m.slots.findIndex(sl => sl.rowIdx === rIdx && sl.col === "divisor");
            const leftCell = dSlotIdx !== -1 ? renderAlgoBtn(m.slots[dSlotIdx], dSlotIdx) : row.dividend;
            const rightCell = pSlotIdx !== -1 ? renderAlgoBtn(m.slots[pSlotIdx], pSlotIdx) : row.divisor;
            return `<div class="fml-algo-row"><span class="fml-algo-left">${leftCell}</span><span class="fml-algo-bar">|</span><span class="fml-algo-right">${rightCell}</span></div>`;
          }).join("") + `<div class="fml-algo-row"><span class="fml-algo-left">1</span><span class="fml-algo-bar">|</span><span class="fml-algo-right"></span></div>`;

          diagramHtml = `
            <div class="fml-algo-layout">
              <div class="fml-algo-table">
                ${rowsHtml}
              </div>
              <div class="fml-algo-summary">
                <div class="fml-algo-sum-badge">ÜSLÜ ÇARPIM BİÇİMİ</div>
                <div class="fml-algo-sum-eq">${m.completed ? `${targetN} = ${md.expHtml}` : `${targetN} = ?`}</div>
                <div class="fml-algo-sum-sub">Her satırda soldaki sayıyı sağdaki asal sayıya bölerek alt satıra yazarız.</div>
              </div>
            </div>
          `;
        } else if (m.id === "synth") {
          diagramHtml = `
            <div class="vcp-choices-list" id="fmlSynthChoices" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:10px;margin-top:8px;">
              ${(m.choices || []).map((ch, idx) => `
                <button type="button" class="option-btn vcp-option-btn fml-synth-btn" data-choice="${escSvg(ch)}">
                  <span class="option-letter">${["A", "B", "C", "D"][idx] || "•"}</span>
                  <span class="vcp-option-text">${renderOptionMath(ch)}</span>
                </button>
              `).join("")}
            </div>
          `;
        }

        board.innerHTML = `
          <div class="fml-wrap">
            ${buildNonClickableStepBannerHtml(
              activeMethodIdx + 1,
              methods.length,
              `${m.icon} ${m.shortTitle}`,
              methods.map(mt => mt.completed)
            )}
            <div class="fml-stage-card">
              <div class="fml-stage-subtitle">${safeMathHtml(m.subtitle)}</div>
              ${m.id !== "synth"
                ? (currSlot && !currSlot.solved
                  ? `<div class="fml-active-target">🎯 Seçili Kutu: <strong>${escSvg(currSlot.label)}</strong></div>`
                  : `<div class="fml-takeaway-banner">${escSvg(m.takeaway)}</div>`)
                : `<div class="fml-active-target">✨ Son Adım: Asal çarpanların çarpımını tek üslü ifade olarak seç!</div>`}
              ${diagramHtml}
              ${m.id !== "synth" ? `<div class="chip-grid fml-pool-grid" id="fmlPoolGrid"></div>` : ""}
            </div>
          </div>
        `;

        if (m.id === "synth") {
          board.querySelectorAll(".fml-synth-btn").forEach(btn => {
            btn.addEventListener("click", () => {
              if (window.NartesMentor && window.NartesMentor.isRemediationLocked()) return;
              const picked = btn.getAttribute("data-choice");
              if (String(picked) === String(m.correctChoice)) {
                m.completed = true;
                playTone("fanfare");
                btn.classList.add("correct");
                board.querySelectorAll(".fml-synth-btn").forEach(b => b.disabled = true);
                spawnCelebrationBurst(btn);
                completeCurrentStop(`Muhteşem! ${targetN} sayısı için 5 yöntemin tamamını ve üslü sentezini başarıyla bitirdin!`);
              } else {
                playTone("error");
                btn.classList.add("wrong-flash");
                if (window.NartesMentor) {
                  window.NartesMentor.onWrong({
                    wrongValue: picked,
                    targetKey: `fml_synth_${targetN}`,
                    targetLabel: m.shortTitle,
                    targetNumber: targetN,
                    correctAnswerToMask: m.correctChoice,
                    customHint: m.synthHint
                  }, () => {
                    btn.classList.remove("wrong-flash");
                  });
                }
              }
            });
          });
          applyKaTeX(board);
          return;
        }

        board.querySelectorAll("[data-slot-idx]").forEach(el => {
          el.addEventListener("click", () => {
            if (window.NartesMentor && window.NartesMentor.isRemediationLocked()) return;
            const idx = parseInt(el.getAttribute("data-slot-idx"), 10);
            if (m.slots[idx] && !m.slots[idx].solved) {
              playTone("click");
              activeSlotIdx = idx;
              renderWorkshop();
            }
          });
        });

        const poolEl = board.querySelector("#fmlPoolGrid");
        if (poolEl) {
          m.pool.forEach(val => {
            const btn = document.createElement("button");
            btn.className = "num-chip";
            const neededMore = m.slots.some(s => !s.solved && String(s.answer) === String(val));
            const usedBefore = m.slots.some(s => s.solved && String(s.answer) === String(val));
            if (!neededMore && usedBefore) {
              btn.classList.add("correct");
              btn.disabled = true;
            }
            btn.innerHTML = renderOptionMath(val);
            btn.addEventListener("click", () => {
              if (window.NartesMentor && window.NartesMentor.isRemediationLocked()) return;
              const target = m.slots[activeSlotIdx];
              if (!target || target.solved) return;
              if (String(val) === String(target.answer)) {
                target.solved = true;
                const nextOpen = m.slots.findIndex(s => !s.solved);
                if (nextOpen !== -1) {
                  playTone("pop");
                  activeSlotIdx = nextOpen;
                  renderWorkshop();
                } else {
                  m.completed = true;
                  playTone("combo");
                  spawnCelebrationBurst(btn);
                  renderWorkshop();
                  const nextMethod = methods.findIndex(mt => !mt.completed);
                  if (nextMethod !== -1) {
                    clearTimeout(state.autoAdvanceTimer);
                    state.autoAdvanceTimer = setTimeout(() => {
                      activeMethodIdx = nextMethod;
                      activeSlotIdx = 0;
                      renderWorkshop();
                    }, 900);
                  } else {
                    completeCurrentStop(`Muhteşem! ${targetN} sayısı için 5 yöntemi de adım adım tamamladın!`);
                  }
                }
              } else {
                playTone("error");
                btn.classList.add("wrong-flash");
                if (window.NartesMentor) {
                  window.NartesMentor.onWrong({
                    wrongValue: val,
                    targetKey: `fml_${m.id}_${activeSlotIdx}`,
                    targetLabel: `${m.shortTitle} — ${target.label}`,
                    targetNumber: m.targetNumber,
                    correctAnswerToMask: target.answer,
                    customHint: target.hint
                  }, () => {
                    btn.classList.remove("wrong-flash");
                  });
                }
              }
            });
            poolEl.appendChild(btn);
          });
        }

        applyKaTeX(board);
      }

      renderWorkshop();
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
            playTone("pop");
            target.done = true;
            const stillNeeded = nodeStates.some(x => !x.done && String(x.answer) === String(num));
            if (!stillNeeded) {
              btn.classList.add("correct");
              btn.disabled = true;
            }
            solved++;
            const nextIdx = nodeStates.findIndex(x => !x.done);
            if (nextIdx !== -1) activeNodeIdx = nextIdx;
            drawTreeNodes();
            if (solved === nodeStates.length) {
              spawnCelebrationBurst(btn);
              completeCurrentStop("Çarpan ağacını başarıyla kurdun!");
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
        window.__nartesActiveVoiceText = `Kart ${currentIdx + 1}: ${stripPlain(item.text)}`;
        if (window.NartesMentor) {
          window.NartesMentor.updateProgress({
            liveScreen: {
              mode: stop.activityMode,
              cardIndex: currentIdx + 1,
              cardTotal: stop.items.length,
              questionText: stripPlain(item.text),
              choices
            }
          });
        }
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
              playTone("pop");
              b.classList.add("correct");
              spawnCelebrationBurst(b);
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

    // 0) ÖZEL YÖNTEM ŞEMALARI: ÇARPAN ÇİÇEĞİ, ÇARPAN AĞACI VE GÖKKUŞAĞI
    if (stop.schematicType === "factor_flower") {
      const centerNum = stop.schematicNum || 28;
      return `
        <svg class="q-schematic-svg" viewBox="0 0 360 ${vbH}" role="img" aria-label="${centerNum} Çarpan Çiçeği Modeli">
          <line x1="128" y1="82" x2="54" y2="48" stroke="#94a3b8" stroke-width="2"/>
          <line x1="128" y1="82" x2="202" y2="116" stroke="#94a3b8" stroke-width="2"/>
          <line x1="128" y1="82" x2="202" y2="48" stroke="#94a3b8" stroke-width="2"/>
          <line x1="128" y1="82" x2="54" y2="116" stroke="#94a3b8" stroke-width="2"/>
          <line x1="128" y1="82" x2="128" y2="26" stroke="#2563eb" stroke-width="2.4" stroke-dasharray="4 3"/>
          <line x1="128" y1="82" x2="128" y2="138" stroke="#2563eb" stroke-width="2.4" stroke-dasharray="4 3"/>
          <circle cx="54" cy="48" r="16" fill="#fed7aa" stroke="#ea580c" stroke-width="1.8"/><text x="54" y="53" text-anchor="middle" font-size="12" font-weight="900" fill="#0f172a">1</text>
          <circle cx="202" cy="116" r="16" fill="#fed7aa" stroke="#ea580c" stroke-width="1.8"/><text x="202" y="121" text-anchor="middle" font-size="11.5" font-weight="900" fill="#0f172a">${centerNum}</text>
          <circle cx="202" cy="48" r="16" fill="#bbf7d0" stroke="#16a34a" stroke-width="1.8"/><text x="202" y="53" text-anchor="middle" font-size="12" font-weight="900" fill="#0f172a">2</text>
          <circle cx="54" cy="116" r="16" fill="#bbf7d0" stroke="#16a34a" stroke-width="1.8"/><text x="54" y="121" text-anchor="middle" font-size="11.5" font-weight="900" fill="#0f172a">${centerNum / 2}</text>
          <circle cx="128" cy="26" r="16" fill="#dbeafe" stroke="#2563eb" stroke-width="2.2"/><text x="128" y="31" text-anchor="middle" font-size="12.5" font-weight="900" fill="#1e3a8a">4</text>
          <circle cx="128" cy="138" r="16" fill="#fff7ed" stroke="#f97316" stroke-width="2.4"/><text x="128" y="143" text-anchor="middle" font-size="13" font-weight="900" fill="#c2410c">?</text>
          <circle cx="128" cy="82" r="23" fill="#facc15" stroke="#ca8a04" stroke-width="2.6"/><text x="128" y="88" text-anchor="middle" font-size="15" font-weight="900" fill="#713f12">${centerNum}</text>
          <rect x="234" y="32" width="112" height="100" rx="12" fill="#f0fdf4" stroke="#86efac" stroke-width="1.8"/>
          <text x="290" y="54" text-anchor="middle" font-size="11" font-weight="900" fill="#15803d">🌿 Asal Yapraklar</text>
          <ellipse cx="268" cy="88" rx="18" ry="13" fill="#4ade80" stroke="#15803d" stroke-width="1.8"/><text x="268" y="92" text-anchor="middle" font-size="12" font-weight="900" fill="#052e16">?</text>
          <ellipse cx="314" cy="88" rx="18" ry="13" fill="#4ade80" stroke="#15803d" stroke-width="1.8"/><text x="314" y="92" text-anchor="middle" font-size="12" font-weight="900" fill="#052e16">?</text>
          <text x="290" y="120" text-anchor="middle" font-size="10" font-weight="800" fill="#166534">Karşı Yapraklar = ${centerNum}</text>
        </svg>
      `;
    }

    if (stop.schematicType === "factor_tree") {
      return `
        <svg class="q-schematic-svg" viewBox="0 0 360 ${vbH}" role="img" aria-label="Asal Çarpan Ağacı Modeli">
          <line x1="180" y1="36" x2="116" y2="82" stroke="#64748b" stroke-width="2.4"/>
          <line x1="180" y1="36" x2="244" y2="82" stroke="#64748b" stroke-width="2.4"/>
          <line x1="244" y1="108" x2="202" y2="144" stroke="#64748b" stroke-width="2.4"/>
          <line x1="244" y1="108" x2="286" y2="144" stroke="#64748b" stroke-width="2.4"/>
          <rect x="152" y="12" width="56" height="30" rx="9" fill="#dbeafe" stroke="#2563eb" stroke-width="2.2"/>
          <text x="180" y="32" text-anchor="middle" font-size="14" font-weight="900" fill="#1e3a8a">K = ?</text>
          <circle cx="116" cy="94" r="16" fill="#dcfce7" stroke="#16a34a" stroke-width="2.2"/>
          <text x="116" y="99" text-anchor="middle" font-size="13.5" font-weight="900" fill="#14532d">3</text>
          <rect x="216" y="78" width="56" height="30" rx="9" fill="#fff7ed" stroke="#f97316" stroke-width="2.2"/>
          <text x="244" y="98" text-anchor="middle" font-size="14" font-weight="900" fill="#c2410c">L = ?</text>
          <circle cx="202" cy="144" r="15" fill="#dcfce7" stroke="#16a34a" stroke-width="2.2"/>
          <text x="202" y="149" text-anchor="middle" font-size="13" font-weight="900" fill="#14532d">3</text>
          <circle cx="286" cy="144" r="15" fill="#dcfce7" stroke="#16a34a" stroke-width="2.2"/>
          <text x="286" y="149" text-anchor="middle" font-size="13" font-weight="900" fill="#14532d">5</text>
        </svg>
      `;
    }

    if (stop.schematicType === "rainbow") {
      const targetN = stop.schematicNum || 20;
      return `
        <svg class="q-schematic-svg" viewBox="0 0 360 ${vbH}" role="img" aria-label="${targetN} Gökkuşağı Çarpan Kuşağı">
          <path d="M 46 106 A 134 76 0 0 1 314 106" fill="none" stroke="#ef4444" stroke-width="2.8" stroke-linecap="round"/>
          <path d="M 98 106 A 82 50 0 0 1 262 106" fill="none" stroke="#f97316" stroke-width="2.6" stroke-dasharray="6 4" stroke-linecap="round"/>
          <path d="M 152 106 A 28 24 0 0 1 208 106" fill="none" stroke="#16a34a" stroke-width="2.6" stroke-dasharray="6 4" stroke-linecap="round"/>
          <circle cx="46" cy="122" r="16" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/><text x="46" y="127" text-anchor="middle" font-size="12.5" font-weight="900" fill="#0f172a">1</text>
          <circle cx="98" cy="122" r="16" fill="#fff7ed" stroke="#f97316" stroke-width="2"/><text x="98" y="127" text-anchor="middle" font-size="12.5" font-weight="900" fill="#0f172a">2</text>
          <circle cx="152" cy="122" r="16" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/><text x="152" y="127" text-anchor="middle" font-size="12.5" font-weight="900" fill="#1e3a8a">?</text>
          <circle cx="208" cy="122" r="16" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/><text x="208" y="127" text-anchor="middle" font-size="12.5" font-weight="900" fill="#1e3a8a">?</text>
          <circle cx="262" cy="122" r="16" fill="#fff7ed" stroke="#f97316" stroke-width="2"/><text x="262" y="127" text-anchor="middle" font-size="12.5" font-weight="900" fill="#0f172a">?</text>
          <circle cx="314" cy="122" r="16" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/><text x="314" y="127" text-anchor="middle" font-size="12.5" font-weight="900" fill="#0f172a">${targetN}</text>
          <text x="180" y="${vbH - 6}" text-anchor="middle" font-size="11.5" font-weight="800" fill="#334155">Simetrik çarpan çiftlerinin çarpımı = ${targetN}</text>
        </svg>
      `;
    }

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
    const hasPack = Array.isArray(stop.questionPack) && stop.questionPack.length > 0;
    const pack = hasPack ? stop.questionPack : [stop];
    const solvedFlags = pack.map(() => false);
    let activeQIdx = 0;

    const outer = document.createElement("div");
    outer.className = "question-pack-outer";
    container.appendChild(outer);

    function renderActiveSubQuestion() {
      const curQ = pack[activeQIdx];
      const isQuickPick = curQ.qFormat === "quick_pick";
      const modelStopView = {
        ...stop,
        ...curQ,
        title: curQ.badge || stop.title,
        questionVisual: curQ.questionVisual || (hasPack ? "" : stop.questionVisual)
      };

      if (window.NartesMentor) {
        window.NartesMentor.setContext({
          unit: UNIT,
          kaz,
          activeQuestionIndex: activeQIdx,
          stop: {
            ...stop,
            stem: curQ.stem,
            options: curQ.options,
            correctLetter: curQ.correctLetter,
            hint: curQ.hint,
            solution: curQ.solution,
            activeQuestionIndex: activeQIdx,
            packTotal: pack.length,
            subQuestionBadge: curQ.badge || `Soru ${activeQIdx + 1}`
          }
        });
        if (typeof window.NartesMentor.notifyScreenTask === "function") {
          const stemPlain = stripPlain(curQ.stem || "");
          const qNums = Array.from(new Set((stemPlain.match(/\b\d{1,4}\b/g) || []).map(Number).filter(n => n >= 2 && n <= 2000))).slice(0, 6);
          window.NartesMentor.notifyScreenTask({
            signature: `q:${stop.id}:v${stop._variantIndex || 0}:idx${activeQIdx}`,
            taskTitle: `${stop.title} (${curQ.badge || (activeQIdx + 1) + ". Soru"})`,
            promptText: stemPlain,
            numbers: qNums,
            targetNumber: qNums[0] || undefined,
            options: (curQ.options || []).map(o => `${o.letter}) ${stripPlain(o.text)}`),
            correctAnswer: curQ.correctLetter || "",
            hint: curQ.hint || "",
            solution: curQ.solution || ""
          });
        }
      }

      outer.innerHTML = "";

      const layout = document.createElement("div");
      layout.className = "question-layout";

      const meta = extractQuestionSummaryMeta(modelStopView);
      const givenBadgesHtml = meta.givenPills.length > 0
        ? meta.givenPills.map(g => `<span class="q-book-given-pill">${renderOptionMath(g)}</span>`).join("")
        : `<span class="q-book-given-pill">${escSvg(kaz.title)}</span>`;

      const stepDotsHtml = hasPack && pack.length > 1
        ? `<div class="linear-step-dots" aria-hidden="true">${pack.map((_, idx) => `<span class="linear-step-dot ${solvedFlags[idx] ? "done" : ""} ${idx === activeQIdx ? "active" : ""}"></span>`).join("")}</div>`
        : "";

      const left = document.createElement("div");
      left.className = "question-left-col";
      left.innerHTML = `
        <article class="question-book-card ${isQuickPick ? "is-quick-pick-card" : ""}">
          <div class="question-book-top">
            <span class="question-book-ribbon">📘 ${escSvg(curQ.badge || (hasPack && pack.length > 1 ? `Adım ${activeQIdx + 1} / ${pack.length}` : "Kazanım Sorusu"))}</span>
            <div style="display:flex;align-items:center;gap:10px;">
              ${stepDotsHtml}
              <span class="question-book-topic">${escSvg(kaz.title)}</span>
            </div>
          </div>
          <div class="question-book-stem">
            <p>${safeMathHtml(curQ.stem)}</p>
          </div>
          <div class="question-book-summary">
            <span class="q-book-sum-label">Önemli Veriler:</span>
            <div class="q-book-sum-pills">${givenBadgesHtml}</div>
          </div>
        </article>
        <div class="options-grid ${isQuickPick ? "is-quick-pick-grid" : ""}" id="qOptionsGrid"></div>
      `;

      const right = document.createElement("div");
      right.className = "question-right-col";
      right.innerHTML = `
        ${buildQuestionModelCardHtml(modelStopView, kaz, UNIT)}
        <div id="solutionArea"></div>
      `;

      const grid = left.querySelector("#qOptionsGrid");
      const solArea = right.querySelector("#solutionArea");

      function advanceToNextQuestion() {
        if (activeQIdx < pack.length - 1) {
          clearTimeout(state.autoAdvanceTimer);
          state.autoAdvanceTimer = null;
          activeQIdx++;
          renderActiveSubQuestion();
        }
      }

      function renderSolvedBox(autoStepping) {
        const hasMoreInPack = activeQIdx < pack.length - 1;
        solArea.innerHTML = `
          <div class="solution-box">
            <h4>✓ Adım Adım Çözüm</h4>
            <p>${safeMathHtml(curQ.solution)}</p>
            ${hasMoreInPack ? `
              <button type="button" class="qpack-next-btn" id="btnNextPackQuestion">
                ${autoStepping ? `Sıradaki Soruya Geçiliyor (${activeQIdx + 2} / ${pack.length}) →` : `Sıradaki Soruya Geç (${activeQIdx + 2} / ${pack.length}) →`}
              </button>
            ` : ""}
          </div>
        `;
        const nextPackBtn = solArea.querySelector("#btnNextPackQuestion");
        if (nextPackBtn) {
          nextPackBtn.addEventListener("click", () => {
            playTone("pop");
            advanceToNextQuestion();
          });
        }
        applyKaTeX(solArea);
      }

      if (solvedFlags[activeQIdx]) {
        renderSolvedBox(false);
      }

      curQ.options.forEach(opt => {
        const btn = document.createElement("button");
        btn.className = `option-btn ${isQuickPick ? "quick-pick-option" : ""}`;
        if (solvedFlags[activeQIdx]) {
          btn.disabled = true;
          if (opt.letter === curQ.correctLetter) btn.classList.add("correct");
        }
        if (isQuickPick) {
          btn.innerHTML = `<span class="option-text-body">${renderOptionMath(opt.text)}</span>`;
        } else {
          btn.innerHTML = `<span class="option-letter">${opt.letter}</span><span class="option-text-body">${renderOptionMath(opt.text)}</span>`;
        }

        btn.addEventListener("click", () => {
          if (window.NartesMentor && window.NartesMentor.isRemediationLocked()) return;
          if (opt.letter === curQ.correctLetter) {
            solvedFlags[activeQIdx] = true;
            grid.querySelectorAll(".option-btn").forEach(b => b.disabled = true);
            btn.classList.add("correct");
            spawnCelebrationBurst(btn);

            const allPackSolved = solvedFlags.every(Boolean);
            if (allPackSolved) {
              renderSolvedBox(false);
              completeCurrentStop(hasPack && pack.length > 1
                ? `Harika! ${pack.length} soruluk adımı başarıyla tamamladın!`
                : "Soruyu doğru çözdün!");
            } else {
              playTone("combo");
              renderSolvedBox(true);
              clearTimeout(state.autoAdvanceTimer);
              state.autoAdvanceTimer = setTimeout(() => {
                advanceToNextQuestion();
              }, 1650);
            }
          } else {
            playTone("error");
            btn.classList.add("wrong-flash");
            const wrongLabel = isQuickPick ? opt.text : `${opt.letter}) ${opt.text}`;
            if (window.NartesMentor) {
              window.NartesMentor.onWrong({
                wrongValue: wrongLabel,
                targetKey: `question_${stop.id}_${activeQIdx}`,
                targetLabel: curQ.stem,
                customHint: curQ.hint
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
      outer.appendChild(layout);
      applyKaTeX(outer);
    }

    renderActiveSubQuestion();
  }

  // ==========================================================================
  // 12 ÜNİTE LGS KAMPÜS HARİTASI MODALI
  // ==========================================================================
  function openAllUnitsModal() {
    const modal = document.getElementById("infoModal");
    const modalContent = document.getElementById("infoModalContent");
    const totalStopsAll = ALL_UNITS.reduce((acc, u) => acc + u.stops.length, 0);

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
              ${isDone ? "✓ Tamamlandı" : `${doneCount}/${u.stops.length} Adım`}
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
          <h2 style="font-size:21px;font-weight:900;color:#0f172a;">📚 8. Sınıf LGS Matematik — Tüm 12 Ünite (${totalStopsAll} Etkileşimli Adım)</h2>
          <p style="font-size:13px;color:#64748b;">Çalışmak istediğin ünite kartına tıklayarak o ünitenin modüler yol haritasına geçebilirsin.</p>
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
          Bu ünitedeki ${UNIT.kazanimlar.length} bölümün tamamı ve tüm ${UNIT.stops.length} adım <strong>YEŞİL</strong> oldu!
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
  // ÖZEL ŞİFRELİ GİRİŞ KAPISI (ÖĞRENCİ GİRİŞİ & ÖĞRETMEN GİRİŞİ — AYNI ŞİFRE)
  // ==========================================================================
  const AUTH_STORAGE_KEY = "nartes_plus_auth_unlocked_v1";
  const AUTH_ROLE_KEY = "nartes_plus_auth_role_v1";

  // Öğrenci Girişi ve Öğretmen Girişi tamamen AYNI şifrelerle çalışır (şifre değişikliği yok)
  const ALLOWED_PASS_HASHES = [
    "ecf2a0206d7f0",
    "158d55f281293c",
    "8645f7c65e238",
    "e141883f829d6",
    "d8b84bde7f068",
    "117b7bd219e16",
    "600d07e84b09b"
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

  function applyRoleUnlockState(isTeacher, showBanner) {
    state.teacherUnlock = Boolean(isTeacher);
    window.MATFLOW_TEACHER_MODE = state.teacherUnlock;
    const btnTeacher = document.getElementById("btnTeacherMode");
    if (btnTeacher) {
      btnTeacher.textContent = state.teacherUnlock
        ? "👩‍🏫 Öğretmen Modu (Tüm Bölümler Açık)"
        : "🎓 Sıralı Öğrenci Modu";
    }
    renderUnitSelector();
    renderSidebar();
    renderRoad();
    renderWindow();
    if (showBanner) {
      if (state.teacherUnlock) {
        showToast("👩‍🏫 Öğretmen Girişi Aktif: Alttaki tüm bölümlere ve 12 üniteye istediğiniz an tıklayabilirsiniz!");
      } else {
        showToast("🎓 Öğrenci Girişi Aktif: Adım adım başarı yolculuğuna hoş geldin!");
      }
    }
  }

  function initAuthGate(onUnlocked) {
    const isSaved = localStorage.getItem(AUTH_STORAGE_KEY) === "1" || sessionStorage.getItem(AUTH_STORAGE_KEY) === "1";
    const savedRole = localStorage.getItem(AUTH_ROLE_KEY) || sessionStorage.getItem(AUTH_ROLE_KEY) || "student";
    const form = document.getElementById("authGateForm");
    const input = document.getElementById("authPasswordInput");
    const togglePassBtn = document.getElementById("authTogglePassBtn");
    const rememberChk = document.getElementById("authRememberChk");
    const errMsg = document.getElementById("authErrorMsg");
    const btnLock = document.getElementById("btnLockApp");
    const roleStudentBtn = document.getElementById("authRoleStudentBtn");
    const roleTeacherBtn = document.getElementById("authRoleTeacherBtn");
    const submitBtn = document.getElementById("authSubmitBtn");
    const gateBadge = document.getElementById("authGateBadge");
    const gateDesc = document.getElementById("authGateDesc");

    let selectedRole = (savedRole === "teacher" || savedRole === "admin") ? "teacher" : "student";

    function syncLoginRoleUI(role) {
      selectedRole = role === "teacher" ? "teacher" : "student";
      const isTeacher = selectedRole === "teacher";

      if (roleStudentBtn) {
        roleStudentBtn.classList.toggle("is-active", !isTeacher);
        roleStudentBtn.setAttribute("aria-selected", !isTeacher ? "true" : "false");
      }
      if (roleTeacherBtn) {
        roleTeacherBtn.classList.toggle("is-active", isTeacher);
        roleTeacherBtn.setAttribute("aria-selected", isTeacher ? "true" : "false");
      }
      if (submitBtn) {
        submitBtn.classList.toggle("is-teacher-mode", isTeacher);
        submitBtn.textContent = isTeacher
          ? "👩‍🏫 Öğretmen Girişi Yap (Tüm Bölümler Açık) →"
          : "🎓 Öğrenci Girişi Yap ve Kampüsü Aç →";
      }
      if (gateBadge) {
        gateBadge.textContent = isTeacher
          ? "👩‍🏫 ÖĞRETMEN SERBEST ÖNİZLEME GİRİŞİ"
          : "🎓 ÖĞRENCİ ÇALIŞMA KAMPÜSÜ GİRİŞİ";
      }
      if (gateDesc) {
        gateDesc.textContent = isTeacher
          ? "Öğretmen girişinde alttaki tüm duraklar ve 12 ünite açıktır; ilerlemek zorunda kalmadan istediğiniz bölüme tıklayıp anında görebilirsiniz."
          : "Öğrenci girişinde duraklar adım adım tamamlanarak açılır ve kaldığınız yerden devam edersiniz.";
      }
    }

    syncLoginRoleUI(selectedRole);

    if (roleStudentBtn) {
      roleStudentBtn.addEventListener("click", () => {
        playTone("click");
        syncLoginRoleUI("student");
        if (errMsg) errMsg.hidden = true;
        if (input) input.focus();
      });
    }
    if (roleTeacherBtn) {
      roleTeacherBtn.addEventListener("click", () => {
        playTone("click");
        syncLoginRoleUI("teacher");
        if (errMsg) errMsg.hidden = true;
        if (input) input.focus();
      });
    }

    function unlockNow(isTeacher, fromLoginSubmit) {
      state.teacherUnlock = Boolean(isTeacher);
      window.MATFLOW_TEACHER_MODE = state.teacherUnlock;
      document.body.classList.remove("auth-locked");
      onUnlocked();
      applyRoleUnlockState(Boolean(isTeacher), Boolean(fromLoginSubmit));
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
        localStorage.removeItem(AUTH_ROLE_KEY);
        sessionStorage.removeItem(AUTH_ROLE_KEY);
        state.teacherUnlock = false;
        window.MATFLOW_TEACHER_MODE = false;
        const btnTeacher = document.getElementById("btnTeacherMode");
        if (btnTeacher) btnTeacher.textContent = "🎓 Sıralı Öğrenci Modu";
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
        const h = hashPass(val);
        if (ALLOWED_PASS_HASHES.includes(h)) {
          const isTeacherLogin = selectedRole === "teacher";
          const roleStr = isTeacherLogin ? "teacher" : "student";
          if (errMsg) errMsg.hidden = true;
          if (rememberChk && rememberChk.checked) {
            try {
              localStorage.setItem(AUTH_STORAGE_KEY, "1");
              localStorage.setItem(AUTH_ROLE_KEY, roleStr);
            } catch (err) {}
          } else {
            try {
              sessionStorage.setItem(AUTH_STORAGE_KEY, "1");
              sessionStorage.setItem(AUTH_ROLE_KEY, roleStr);
            } catch (err) {}
          }
          playTone("success");
          unlockNow(isTeacherLogin, true);
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
      unlockNow(savedRole === "teacher" || savedRole === "admin", false);
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
      requestAnimationFrame(drawCubicRoadSvg);
      setTimeout(drawCubicRoadSvg, 180);
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
        setTimeout(drawCubicRoadSvg, 280);
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
    if (btnVoice) {
      btnVoice.addEventListener("click", () => {
        state.voiceEnabled = !state.voiceEnabled;
        btnVoice.classList.toggle("muted", !state.voiceEnabled);
      });
    }

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
      window.MATFLOW_TEACHER_MODE = state.teacherUnlock;
      const roleVal = state.teacherUnlock ? "teacher" : "student";
      try {
        if (localStorage.getItem(AUTH_STORAGE_KEY) === "1") localStorage.setItem(AUTH_ROLE_KEY, roleVal);
        if (sessionStorage.getItem(AUTH_STORAGE_KEY) === "1") sessionStorage.setItem(AUTH_ROLE_KEY, roleVal);
      } catch (e) {}
      btnTeacher.textContent = state.teacherUnlock ? "👩‍🏫 Öğretmen Modu (Tüm Bölümler Açık)" : "🎓 Sıralı Öğrenci Modu";
      renderSidebar();
      renderRoad();
      renderWindow();
      showToast(state.teacherUnlock
        ? "👩‍🏫 Öğretmen Modu: Alttaki tüm bölümlere ve 12 üniteye serbestçe tıklayabilirsiniz."
        : "🎓 Öğrenci Modu: Duraklar sırayla tamamlanarak açılır.");
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
