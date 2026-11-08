// ============================================================================
// MatFlow — 8. Sınıf LGS 12 Ünite (360 Durak) Etkileşimli Pencere Akış Motoru
// ============================================================================

(function () {
  const unit1 = window.MATFLOW_UNIT;
  unit1.badgeCells = ["1","2","3","4","5","6","7","8","9","10","11","12"];
  const units2to12 = window.MATFLOW_UNITS_2_12 || [];
  const ALL_UNITS = [unit1, ...units2to12];

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
      document.body.classList.toggle('handheld', isHandheldDevice());
    }

    syncLandscapeGate();
    return { device, orientation };
  }

  function currentOrientation() {
    if (window.matchMedia) {
      if (window.matchMedia('(orientation: portrait)').matches) return 'portrait';
      if (window.matchMedia('(orientation: landscape)').matches) return 'landscape';
    }
    return window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
  }

  // Bilgisayar penceresi daraltılınca telefon sayılmaz. Yalnızca telefon ve tablet.
  function isHandheldDevice() {
    const ua = navigator.userAgent || '';
    const touchPoints = navigator.maxTouchPoints || 0;
    const isTouch = ('ontouchstart' in window) || touchPoints > 0;
    if (/iPhone|iPod|iPad|Android|BlackBerry|IEMobile|Opera Mini|webOS/i.test(ua)) return true;
    if (isTouch && /Macintosh/i.test(ua) && touchPoints > 1) return true;
    if (!isTouch || !window.matchMedia) return false;
    return window.matchMedia('(pointer: coarse)').matches && window.matchMedia('(hover: none)').matches;
  }

  function handheldNoun() {
    const ua = navigator.userAgent || '';
    const touchPoints = navigator.maxTouchPoints || 0;
    const isTouch = ('ontouchstart' in window) || touchPoints > 0;
    const isIPad = /iPad/i.test(ua) || (isTouch && /Macintosh/i.test(ua) && touchPoints > 1);
    const isAndroidTablet = /Android/i.test(ua) && !/Mobile/i.test(ua);
    if (isIPad || isAndroidTablet) return 'tableti';
    if (/iPhone|iPod/i.test(ua) || (/Android/i.test(ua) && /Mobile/i.test(ua))) return 'telefonu';
    const minDim = Math.min(window.innerWidth, window.innerHeight);
    return minDim >= 600 ? 'tableti' : 'telefonu';
  }

  function syncLandscapeGate() {
    const handheld = isHandheldDevice();
    const orientation = currentOrientation();
    const show = handheld && orientation === 'portrait';
    if (document.body) document.body.classList.toggle('needs-landscape', show);
    const overlay = document.getElementById('rotateOverlay');
    const title = document.getElementById('rotateTitle');
    const wasShowing = !!(overlay && !overlay.hidden);
    if (title) title.textContent = 'Lütfen ' + handheldNoun() + ' yatay çevirin';
    if (overlay) overlay.hidden = !show;
    if (!show && wasShowing && document.body && document.body.classList.contains('auth-locked')) {
      const input = document.getElementById('authPasswordInput');
      if (input) input.focus();
    }
    syncFullscreenButton();
  }

  function isDocumentFullscreen() {
    return !!(document.fullscreenElement || document.webkitFullscreenElement);
  }

  function syncFullscreenButton() {
    const btn = document.getElementById('btnEnterFullscreen');
    const fullscreen = isDocumentFullscreen();
    if (document.body) document.body.classList.toggle('is-fullscreen', fullscreen);
    if (!btn) return;
    const show = isHandheldDevice() && currentOrientation() === 'landscape' && !fullscreen;
    btn.hidden = !show;
  }

  function requestHandheldFullscreenFromTap() {
    if (!isHandheldDevice()) return;
    const root = document.documentElement;
    const requestFs = root.requestFullscreen || root.webkitRequestFullscreen;
    if (typeof requestFs === 'function') {
      try {
        const pending = requestFs.call(root);
        if (pending && typeof pending.catch === 'function') pending.catch(function () {});
      } catch (e) {}
    }
    const orientationApi = window.screen && screen.orientation;
    if (orientationApi && typeof orientationApi.lock === 'function') {
      try {
        const lockPending = orientationApi.lock('landscape');
        if (lockPending && typeof lockPending.catch === 'function') lockPending.catch(function () {});
      } catch (e) {}
    }
  }

  function isQuitIgnoredTarget(target) {
    if (!target || !target.closest) return true;
    return !!target.closest(
      'button, a, input, textarea, select, label, summary, [role="button"], [role="link"], .kazanim-item, .unit-card-item, .modal-backdrop, .auth-gate-overlay, .rotate-overlay, .enter-fullscreen-btn'
    );
  }

  function exitLessonToLock() {
    if (!isDocumentFullscreen()) return;
    const exitFs = document.exitFullscreen || document.webkitExitFullscreen;
    if (typeof exitFs === 'function') {
      try {
        const pending = exitFs.call(document);
        if (pending && typeof pending.catch === 'function') pending.catch(function () {});
      } catch (e) {}
    }
    const btnLock = document.getElementById('btnLockApp');
    if (btnLock) {
      btnLock.click();
      return;
    }
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (e) {}
    document.body.classList.add('auth-locked');
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
    "⁻": "-", "⁺": "+", "ⁿ": "n"
  };

  function unicodeMathToLatex(expr) {
    let s = String(expr);
    // Üslü karakter dizilerini ^{...} biçimine çevir
    s = s.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺ⁿ]+/g, (m) => {
      const converted = m.split("").map(ch => SUP_MAP[ch] || ch).join("");
      return `^{${converted}}`;
    });
    // Karekök: √(a+b) veya 6√2 veya a√b veya √72
    s = s.replace(/√\(([^)]+)\)/g, "\\sqrt{$1}");
    s = s.replace(/√([0-9a-zA-Z^{}+-]+)/g, "\\sqrt{$1}");
    // EBOB / EKOK
    s = s.replace(/\b(EBOB|EKOK)\s*\(/g, "\\text{$1}(");
    // Semboller
    s = s.replace(/≤/g, " \\le ")
         .replace(/≥/g, " \\ge ")
         .replace(/≠/g, " \\ne ")
         .replace(/×/g, " \\times ")
         .replace(/÷/g, " \\div ")
         .replace(/·/g, " \\cdot ")
         .replace(/π/g, "\\pi ")
         .replace(/°/g, "^{\\circ}");
    return s;
  }

  // Şık, Buton ve Chip İçerikleri İçin KaTeX HTML Üretici
  function renderOptionMath(rawText) {
    const str = String(rawText).trim();
    if (!window.katex) return str;

    // Sadece Türkçe kelimelerden oluşan sözel şıklar (ör. "böleni (çarpanı)", "Aralarında Asal", "Daire Grafiği")
    const hasMathSymbol = /[0-9√⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺≤≥≠×÷·π°=<>+\-*/^()]/.test(str);
    const hasTurkishLetters = /[a-zA-ZçğıöşüÇĞİÖŞÜ]{3,}/.test(str.replace(/\b(EBOB|EKOK|br|cm|mm|km|kg|dk|sn|veya|ile|ve)\b/g, ""));

    if (hasMathSymbol && !hasTurkishLetters) {
      // Saf matematiksel ifade veya birim içeren sayı (ör. "2³ · 3²", "6√2", "40 cm²", "x ≤ -4", "24")
      let latex = unicodeMathToLatex(str);
      latex = latex.replace(/\b(cm|mm|m|km|br|kg|g|L|mL|dk|sn|saat)\b/g, "\\text{ $1}");
      try {
        return window.katex.renderToString(latex, { throwOnError: false, displayMode: false });
      } catch (e) {
        return str;
      }
    }
    return upgradeInlineMathInText(str);
  }

  // Metin İçindeki Matematiksel İfadeleri $...$ İle Sarıp KaTeX'e Hazırlama
  function upgradeInlineMathInText(text) {
    if (!window.katex) return text;
    let out = String(text);

    // 1) EBOB(...) = ... veya EKOK(...) = ... veya EBOB(...)
    out = out.replace(/\b(EBOB|EKOK)\([0-9a-zA-Z,\s+-]+\)(\s*=\s*[0-9a-zA-Z·×^{}+-]+)?/g, (m) => {
      try {
        return window.katex.renderToString(unicodeMathToLatex(m), { throwOnError: false });
      } catch (e) { return m; }
    });

    // 2) Denklemler, eşitsizlikler, üslü/köklü/işlemli ifadeler
    const mathPattern = /(?:[0-9a-zA-Z()]+\s*[×·÷+\-*/=≤≥<>]\s*)+[0-9a-zA-Z√⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺().,/]+|[0-9a-zA-Z()]*[√⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺π°][0-9a-zA-Z√⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺().,+\-*/=·×]*/g;
    out = out.replace(mathPattern, (match) => {
      if (!/[0-9√⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺≤≥≠×÷·π°=]/.test(match)) return match;
      try {
        return window.katex.renderToString(unicodeMathToLatex(match), { throwOnError: false });
      } catch (e) {
        return match;
      }
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
          if (parent.closest(".katex")) return NodeFilter.FILTER_REJECT;
          if (/[0-9√⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺≤≥≠×÷·π°=<>]/.test(node.nodeValue)) {
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
        const upgraded = upgradeInlineMathInText(original);
        if (upgraded !== original) {
          const span = document.createElement("span");
          span.innerHTML = upgraded;
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
      const doneInKaz = kaz.stops.filter(s => isStopDone(s, UNIT)).length;

      const item = document.createElement("div");
      item.className = `kazanim-item ${done ? "status-done" : "status-todo"} ${isCurrent ? "is-current" : ""}`;

      const dotsHtml = kaz.stops.map(sId => {
        const sDone = isStopDone(sId, UNIT);
        const sCurr = sId === uState.currentStopId;
        return `<span class="kazanim-mini-dot ${sDone ? "done" : ""} ${sCurr ? "active" : ""}"></span>`;
      }).join("");

      item.innerHTML = `
        <div class="kazanim-node">${done ? "✓" : kaz.no}</div>
        <div class="kazanim-info">
          <div class="kazanim-title">${kaz.title}</div>
          <div class="kazanim-meta">
            <span>${done ? "Tamamlandı (Yeşil)" : `Durak ${doneInKaz}/${kaz.stops.length}`}</span>
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
    renderUnitSelector();
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
      roadLabel.textContent = `${UNIT.unitNo}. Ünite (${UNIT.title}) Yol Haritası — 30 Durak`;
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
        conn.className = `road-connector ${prevDone ? "done" : ""}`;
        wrap.appendChild(conn);
      }

      const btn = document.createElement("button");
      btn.className = `road-stop-btn ${done ? "status-done" : "status-todo"} ${isCurrent ? "is-current" : ""}`;
      btn.id = `road-stop-${stop.id}`;
      btn.title = `${stop.id}. Durak: ${stop.title} (${stop.typeLabel})`;

      btn.innerHTML = `
        <div class="stop-circle">${done ? "✓" : stop.icon}</div>
        <span class="stop-label">${stop.id}. ${stop.typeLabel.split(" ")[0]}</span>
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

    const maxUnlocked = getMaxUnlockedStopId(UNIT);
    document.getElementById("roadStatusSummary").textContent =
      `Aktif: ${uState.currentStopId}. Durak • Açık: ${maxUnlocked}/30 • Tamamlanan (Yeşil): ${uState.completedStops.length}`;
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
    leftCol.innerHTML = stop.explanation.map(p => `<p>${p}</p>`).join("");

    if (stop.barsDemo) {
      const bars = document.createElement("div");
      bars.className = "factor-bars-demo";
      bars.innerHTML = `
        <div class="bar-card">
          <div class="bar-row">
            <div class="bar-seg" style="flex:3;background:#f97316">3</div>
            <div class="bar-seg" style="flex:3;background:#f97316">3</div>
            <div class="bar-seg" style="flex:3;background:#f97316">3</div>
            <div class="bar-seg" style="flex:3;background:#f97316">3</div>
          </div>
          <div class="bar-total" style="background:#a21caf">12</div>
          <div class="bar-caption">✓ 12 sayısı 3'e tam bölünür (4 × 3 = 12)</div>
        </div>
        <div class="bar-card">
          <div class="bar-row">
            <div class="bar-seg" style="flex:4;background:#16a34a">4</div>
            <div class="bar-seg" style="flex:4;background:#16a34a">4</div>
            <div class="bar-seg bar-seg-overflow" style="flex:4;background:#16a34a;opacity:0.45">4 (Taştı)</div>
          </div>
          <div class="bar-total" style="background:#2563eb;width:83%">10</div>
          <div class="bar-caption">✗ 10 sayısı 4'e kalansız bölünemez (Kalan: 2)</div>
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
    rightCol.className = "flow-visual-box";
    const imgPath = kaz.visual || UNIT.coverImage;
    rightCol.innerHTML = `
      <img src="${imgPath}" onerror="this.src='assets/flow/kapak_carpanlar_katlar.jpg'" alt="${kaz.title}">
      <div class="flow-visual-caption">${kaz.title}</div>
    `;

    topSplit.appendChild(leftCol);
    topSplit.appendChild(rightCol);
    container.appendChild(topSplit);

    const sentenceBox = document.createElement("div");
    sentenceBox.className = "interactive-sentence-box";

    const filledState = {};
    let activeBlankId = 0;

    function updateSentenceHtml() {
      let html = stop.sentenceHtml;
      stop.blanks.forEach(b => {
        const val = filledState[b.id];
        const cls = val ? "blank-slot filled-correct" : "blank-slot";
        const label = val ? `✓ ${renderOptionMath(val)}` : "???";
        html = html.replace(`{${b.id}}`, `<button class="${cls}" data-blank="${b.id}">${label}</button>`);
      });
      sentenceBox.innerHTML = `<div>${html}</div><div id="slotPickerArea"></div>`;

      sentenceBox.querySelectorAll(".blank-slot").forEach(btn => {
        btn.addEventListener("click", () => {
          const bId = parseInt(btn.getAttribute("data-blank"), 10);
          if (!filledState[bId]) {
            activeBlankId = bId;
            renderPicker();
          }
        });
      });

      renderPicker();
      applyKaTeX(sentenceBox);
    }

    function renderPicker() {
      const pickerArea = sentenceBox.querySelector("#slotPickerArea");
      const targetBlank = stop.blanks.find(b => b.id === activeBlankId && !filledState[b.id])
                       || stop.blanks.find(b => !filledState[b.id]);
      if (!targetBlank) {
        pickerArea.innerHTML = "";
        return;
      }
      activeBlankId = targetBlank.id;

      const picker = document.createElement("div");
      picker.className = "slot-picker";
      picker.innerHTML = `<span class="slot-picker-label">Seçenekler:</span>`;

      targetBlank.choices.forEach(choice => {
        const cBtn = document.createElement("button");
        cBtn.className = "slot-choice-btn";
        cBtn.innerHTML = renderOptionMath(choice);
        cBtn.addEventListener("click", () => {
          if (String(choice) === String(targetBlank.correct)) {
            playTone("click");
            filledState[targetBlank.id] = choice;
            updateSentenceHtml();
            if (Object.keys(filledState).length === stop.blanks.length) {
              completeCurrentStop("Tüm boşlukları doğru doldurdun!");
            }
          } else {
            playTone("error");
            cBtn.style.background = "#fee2e2";
            cBtn.style.borderColor = "#ef4444";
            showToast("Tekrar düşün! Cümledeki matematiksel ilişkiye dikkat et.");
          }
        });
        picker.appendChild(cBtn);
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
      <div>
        <div style="display:inline-block;font-size:11.5px;font-weight:800;color:#9333ea;background:#f3e8ff;padding:4px 10px;border-radius:999px;margin-bottom:12px;">
          🎬 Doğrulama Sorusu
        </div>
        <h3 style="font-size:clamp(16px, 1.25vw, 19.5px);font-weight:800;color:#0f172a;margin-bottom:16px;line-height:1.4;">${stop.quickQuestion}</h3>
        <div id="videoQuickChoices" style="display:flex;flex-direction:column;gap:10px;"></div>
      </div>
    `;

    wrap.appendChild(player);
    wrap.appendChild(checkPanel);
    container.appendChild(wrap);

    function drawVisualStep(stepIdx) {
      const stage = player.querySelector("#videoVisualStage");
      const tabsEl = player.querySelector("#videoStepTabs");
      const step = stop.steps[stepIdx];

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
      btn.textContent = stepIdx < stop.steps.length - 1
        ? `▶ Sonraki Adım (${stepIdx + 1}/${stop.steps.length})`
        : `↻ Baştan Oynat (${stop.steps.length}/${stop.steps.length})`;

      speakText(step.text);

      if (stop.videoScene === "rectangles_18") {
        const configs = [
          { r: 1, c: 18, color: "#38bdf8", label: "1 × 18 = 18 br²" },
          { r: 2, c: 9,  color: "#22c55e", label: "2 × 9 = 18 br²" },
          { r: 3, c: 6,  color: "#f97316", label: "3 × 6 = 18 br²" },
          { r: 0, c: 0,  color: "#eab308", label: "Çarpanlar: 1, 2, 3, 6, 9, 18" }
        ];
        const cfg = configs[stepIdx];
        if (cfg.r > 0) {
          let cells = "";
          for (let i = 0; i < cfg.r * cfg.c; i++) {
            cells += `<div style="width:22px;height:22px;background:${cfg.color};border-radius:4px;"></div>`;
          }
          stage.innerHTML = `
            <div style="display:grid;grid-template-columns:repeat(${cfg.c}, 22px);gap:4px;padding:14px;background:rgba(255,255,255,0.06);border-radius:12px;">
              ${cells}
            </div>
            <div style="margin-top:12px;font-weight:800;font-size:18px;color:#fde047;">${cfg.label}</div>
            <div style="margin-top:8px;font-size:14.5px;color:#e2e8f0;text-align:center;max-width:560px;">${step.text}</div>
          `;
        } else {
          stage.innerHTML = `
            <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;justify-content:center;">
              ${[1, 2, 3, 6, 9, 18].map(n => `<div style="width:46px;height:46px;border-radius:50%;background:#22c55e;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:17px;">${n}</div>`).join("")}
            </div>
            <div style="margin-top:12px;font-weight:800;font-size:16px;color:#86efac;">Baştan ve sondan çarpımlar: 1×18 = 2×9 = 3×6 = 18</div>
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
      currentStepIdx = (currentStepIdx + 1) % stop.steps.length;
      drawVisualStep(currentStepIdx);
    });

    const choicesBox = checkPanel.querySelector("#videoQuickChoices");
    const letters = ["A", "B", "C", "D"];
    stop.quickChoices.forEach((ch, idx) => {
      const btn = document.createElement("button");
      btn.className = "option-btn";
      btn.innerHTML = `<span class="option-letter">${letters[idx] || "•"}</span><span>${renderOptionMath(ch)}</span>`;
      btn.addEventListener("click", () => {
        if (String(ch) === String(stop.quickCorrect)) {
          btn.classList.add("correct");
          completeCurrentStop("Anlatımı ve doğrulama sorusunu başarıyla tamamladın!");
        } else {
          playTone("error");
          btn.classList.add("wrong");
          showToast("Soldaki animasyon adımlarını kontrol edip tekrar dene!");
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
      board.innerHTML = `<div style="text-align:center;font-weight:700;color:#334155;">Turuncu/Seçili kutu için alttaki doğru değere tıkla:</div>`;
      board.appendChild(seqRow);

      const poolWrap = document.createElement("div");
      poolWrap.className = "chip-grid";
      stop.pool.forEach(val => {
        const chip = document.createElement("button");
        chip.className = "num-chip";
        chip.innerHTML = renderOptionMath(val);
        chip.addEventListener("click", () => {
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
            chip.classList.add("wrong");
            setTimeout(() => chip.classList.remove("wrong"), 400);
            showToast(`İpucu: ${currentTarget.hint}`);
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

      function drawTreeNodes() {
        nodesWrap.innerHTML = "";
        nodeStates.forEach((n, idx) => {
          const card = document.createElement("div");
          card.style.cssText = `padding:14px;border-radius:12px;text-align:center;font-weight:800;font-size:16px;cursor:pointer;border:2px solid ${n.done ? "#16a34a" : (idx === activeNodeIdx ? "#2563eb" : "#f97316")};background:${n.done ? "#dcfce7" : (idx === activeNodeIdx ? "#eff6ff" : "#fff7ed")};`;
          card.textContent = n.done ? n.label.replace("[ ? ]", n.answer) : n.label;
          card.addEventListener("click", () => {
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

      const pool = document.createElement("div");
      pool.className = "chip-grid";
      stop.pool.forEach(num => {
        const btn = document.createElement("button");
        btn.className = "num-chip";
        btn.innerHTML = renderOptionMath(num);
        btn.addEventListener("click", () => {
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
            btn.classList.add("wrong");
            setTimeout(() => btn.classList.remove("wrong"), 400);
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
              "${item.text}"
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
              b.classList.add("wrong");
              setTimeout(() => b.classList.remove("wrong"), 400);
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
              btn.classList.add("wrong");
              setTimeout(() => btn.classList.remove("wrong"), 400);
              showToast(`${lvl.target} sayısı ${n}'e kalansız bölünmez!`);
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
              showToast("Hedef sayıyı aştın! Sıfırlanıyor...");
              setTimeout(renderSynth, 500);
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
              btn.classList.add("wrong");
              setTimeout(() => btn.classList.remove("wrong"), 400);
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
            <div style="font-size:clamp(17px, 1.4vw, 21px);font-weight:800;color:#0f172a;line-height:1.45;margin-bottom:20px;">${ch.q}</div>
            <div class="chip-grid" id="finalChoices"></div>
          </div>
        `;
        const wrap = gameBox.querySelector("#finalChoices");
        ch.choices.forEach(opt => {
          const btn = document.createElement("button");
          btn.className = "num-chip";
          btn.innerHTML = renderOptionMath(opt);
          btn.addEventListener("click", () => {
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
              btn.classList.add("wrong");
              setTimeout(() => btn.classList.remove("wrong"), 400);
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
  // TÜR 5: ❓ SORU & ADIM ADIM AÇILIR ÇÖZÜM KARTI (Sade ve Estetik)
  // ==========================================================================
  function renderQuestionStop(stop, kaz, container, UNIT) {
    const layout = document.createElement("div");
    layout.className = "question-layout";

    const left = document.createElement("div");
    left.className = "question-left-col";
    left.innerHTML = `
      <div class="lead-text" style="padding:4px 2px;">
        ${stop.stem}
      </div>
      <div class="options-grid" id="qOptionsGrid"></div>
    `;

    const imgPath = kaz.visual || UNIT.coverImage;
    const right = document.createElement("div");
    right.className = "question-right-col";
    right.innerHTML = `
      <div class="flow-visual-box">
        <img src="${imgPath}" onerror="this.src='assets/flow/kapak_carpanlar_katlar.jpg'" alt="${kaz.title}">
        <div class="flow-visual-caption">${kaz.title}</div>
      </div>
      <div id="solutionArea"></div>
    `;

    const grid = left.querySelector("#qOptionsGrid");
    const solArea = right.querySelector("#solutionArea");

    if (isStopDone(stop.id, UNIT)) {
      solArea.innerHTML = `
        <div class="solution-box">
          <h4>✓ Adım Adım Çözüm</h4>
          <div>${stop.solution}</div>
        </div>
      `;
    }

    stop.options.forEach(opt => {
      const btn = document.createElement("button");
      btn.className = "option-btn";
      if (isStopDone(stop.id, UNIT) && opt.letter === stop.correctLetter) {
        btn.classList.add("correct");
      }
      btn.innerHTML = `<span class="option-letter">${opt.letter}</span><span>${renderOptionMath(opt.text)}</span>`;

      btn.addEventListener("click", () => {
        if (opt.letter === stop.correctLetter) {
          grid.querySelectorAll(".option-btn").forEach(b => b.disabled = true);
          btn.classList.add("correct");
          solArea.innerHTML = `
            <div class="solution-box">
              <h4>✓ Adım Adım Çözüm</h4>
              <div>${stop.solution}</div>
            </div>
          `;
          applyKaTeX(solArea);
          completeCurrentStop("Soruyu doğru çözdün!");
        } else {
          playTone("error");
          btn.classList.add("wrong");
          solArea.innerHTML = `
            <div class="solution-box" style="background:#fffbeb;border-color:#fde68a;color:#92400e;">
              <h4 style="color:#b45309;">💡 İpucu</h4>
              <div>${stop.hint}</div>
            </div>
          `;
          applyKaTeX(solArea);
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
              ${isDone ? "✓ Tamamlandı" : `${doneCount}/30 Durak`}
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
    const rememberChk = document.getElementById("authRememberChk");
    const errMsg = document.getElementById("authErrorMsg");
    const btnLock = document.getElementById("btnLockApp");

    function unlockNow() {
      document.body.classList.remove("auth-locked");
      onUnlocked();
    }

    if (btnLock) {
      btnLock.addEventListener("click", () => {
        playTone("click");
        localStorage.removeItem(AUTH_STORAGE_KEY);
        sessionStorage.removeItem(AUTH_STORAGE_KEY);
        document.body.classList.add("auth-locked");
        if (input) {
          input.value = "";
          setTimeout(() => input.focus(), 80);
        }
      });
    }

    if (isSaved) {
      unlockNow();
      return;
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
    document.addEventListener("fullscreenchange", onViewportChange);
    document.addEventListener("webkitfullscreenchange", onViewportChange);
    const btnEnterFullscreen = document.getElementById("btnEnterFullscreen");
    if (btnEnterFullscreen) {
      btnEnterFullscreen.addEventListener("click", () => {
        requestHandheldFullscreenFromTap();
      });
    }
    let lastSurfaceTapAt = 0;
    document.addEventListener("pointerup", (event) => {
      if (!isHandheldDevice() || !isDocumentFullscreen() || document.body.classList.contains("auth-locked")) {
        lastSurfaceTapAt = 0;
        return;
      }
      if (event.button !== undefined && event.button !== 0) return;
      if (isQuitIgnoredTarget(event.target)) {
        lastSurfaceTapAt = 0;
        return;
      }
      const now = Date.now();
      if (now - lastSurfaceTapAt > 0 && now - lastSurfaceTapAt <= 350) {
        lastSurfaceTapAt = 0;
        exitLessonToLock();
        return;
      }
      lastSurfaceTapAt = now;
    }, true);
    document.addEventListener("dblclick", (event) => {
      if (!isHandheldDevice() || !isDocumentFullscreen() || document.body.classList.contains("auth-locked")) return;
      if (isQuitIgnoredTarget(event.target)) return;
      exitLessonToLock();
    }, true);
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
    if (winCardEl) {
      winCardEl.addEventListener("touchstart", (e) => {
        if (!e.touches || !e.touches[0]) return;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }, { passive: true });

      winCardEl.addEventListener("touchend", (e) => {
        if (!e.changedTouches || !e.changedTouches[0]) return;
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

    document.getElementById("roadScrollLeft").addEventListener("click", () => {
      document.getElementById("roadViewport").scrollBy({ left: -260, behavior: "smooth" });
    });
    document.getElementById("roadScrollRight").addEventListener("click", () => {
      document.getElementById("roadViewport").scrollBy({ left: 260, behavior: "smooth" });
    });

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
    btnSound.addEventListener("click", () => {
      state.soundEnabled = !state.soundEnabled;
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
