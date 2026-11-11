// ============================================================================
// Nartes+ — Akıllı Tahta Soru Çözüm Ekranı (problemcoz.com / Soru Çöz Motoru)
// - Kalem (P), Fosforlu Kalem (H), Silgi (E), 6 Renk, 3 Kalınlık
// - Basınca duyarlı (Apple Pencil / Akıllı Tahta Kalemi / Dokunmatik / Fare)
//   perfect-freehand pürüzsüz mürekkep motoru + Geri Al / Yinele / Temizle
// - Alt büyük dairesel A-B-C-D şıkları + Sağ Optik Cevap Kâğıdı + Sokratik İpucu
// ============================================================================

(function () {
  "use strict";

  // --------------------------------------------------------------------------
  // 1. PERFECT-FREEHAND PÜRÜZSÜZ MÜREKKEP MOTORU (problemcoz.com Birebir Motor)
  // --------------------------------------------------------------------------
  const PI_EPS = Math.PI + 1e-4;

  function neg(A) { return [-A[0], -A[1]]; }
  function add(A, B) { return [A[0] + B[0], A[1] + B[1]]; }
  function addInto(out, A, B) { out[0] = A[0] + B[0]; out[1] = A[1] + B[1]; return out; }
  function sub(A, B) { return [A[0] - B[0], A[1] - B[1]]; }
  function subInto(out, A, B) { out[0] = A[0] - B[0]; out[1] = A[1] - B[1]; return out; }
  function mul(A, s) { return [A[0] * s, A[1] * s]; }
  function mulInto(out, A, s) { out[0] = A[0] * s; out[1] = A[1] * s; return out; }
  function div(A, s) { return [A[0] / s, A[1] / s]; }
  function per(A) { return [A[1], -A[0]]; }
  function perInto(out, A) { const x = A[0]; out[0] = A[1]; out[1] = -x; return out; }
  function dpr(A, B) { return A[0] * B[0] + A[1] * B[1]; }
  function isEqual(A, B) { return A[0] === B[0] && A[1] === B[1]; }
  function len(A) { return Math.hypot(A[0], A[1]); }
  function dist2(A, B) { const dx = A[0] - B[0], dy = A[1] - B[1]; return dx * dx + dy * dy; }
  function uni(A) { return div(A, len(A) || 1); }
  function dist(A, B) { return Math.hypot(A[1] - B[1], A[0] - B[0]); }
  function lrp(A, B, t) { return add(A, mul(sub(B, A), t)); }
  function lrpInto(out, A, B, t) { out[0] = A[0] + (B[0] - A[0]) * t; out[1] = A[1] + (B[1] - A[1]) * t; return out; }
  function prj(A, B, c) { return add(A, mul(B, c)); }

  function rotAround(A, C, r) {
    const s = Math.sin(r), c = Math.cos(r);
    const px = A[0] - C[0], py = A[1] - C[1];
    return [px * c - py * s + C[0], px * s + py * c + C[1]];
  }
  function rotAroundInto(out, A, C, r) {
    const s = Math.sin(r), c = Math.cos(r);
    const px = A[0] - C[0], py = A[1] - C[1];
    out[0] = px * c - py * s + C[0];
    out[1] = px * s + py * c + C[1];
    return out;
  }

  function getStrokeRadius(size, thinning, pressure, easing) {
    return size * (easing || (t => t))(0.5 - thinning * (0.5 - pressure));
  }

  function simulatePressure(prevPressure, distance, size) {
    const sp = Math.min(1, distance / size);
    const rp = Math.min(1, 1 - sp);
    return Math.min(1, prevPressure + (rp - prevPressure) * (sp * 0.275));
  }

  function getStrokePoints(points, options) {
    const streamline = options.streamline !== undefined ? options.streamline : 0.5;
    const size = options.size !== undefined ? options.size : 16;
    const isComplete = Boolean(options.last);
    if (points.length === 0) return [];

    const t = 0.15 + (1 - streamline) * 0.85;
    let pts = Array.isArray(points[0])
      ? points.slice()
      : points.map(p => [p.x, p.y, p.pressure !== undefined ? p.pressure : 0.5]);

    if (pts.length === 2) {
      const last = pts[1];
      pts = pts.slice(0, -1);
      for (let i = 1; i < 5; i++) pts.push(lrp(pts[0], last, i / 4));
    }
    if (pts.length === 1) {
      pts = [pts[0], [pts[0][0] + 1, pts[0][1] + 1, pts[0][2] !== undefined ? pts[0][2] : 0.5]];
    }

    const strokePoints = [{
      point: [pts[0][0], pts[0][1]],
      pressure: pts[0][2] >= 0 ? pts[0][2] : 0.25,
      vector: [1, 1],
      distance: 0,
      runningLength: 0
    }];

    let hasReachedMinimumLength = false;
    let runningLength = 0;
    let prev = strokePoints[0];
    const max = pts.length - 1;
    const tmpVec = [0, 0];

    for (let i = 1; i < pts.length; i++) {
      const point = isComplete && i === max
        ? [pts[i][0], pts[i][1]]
        : lrp(prev.point, pts[i], t);
      if (isEqual(prev.point, point)) continue;
      const d = dist(point, prev.point);
      runningLength += d;
      if (i < max && !hasReachedMinimumLength) {
        if (runningLength < size) continue;
        hasReachedMinimumLength = true;
      }
      subInto(tmpVec, prev.point, point);
      prev = {
        point,
        pressure: pts[i][2] >= 0 ? pts[i][2] : 0.5,
        vector: uni(tmpVec),
        distance: d,
        runningLength
      };
      strokePoints.push(prev);
    }
    strokePoints[0].vector = (strokePoints[1] && strokePoints[1].vector) || [0, 0];
    return strokePoints;
  }

  function getStrokeOutlinePoints(strokePoints, options) {
    const size = options.size !== undefined ? options.size : 16;
    const smoothing = options.smoothing !== undefined ? options.smoothing : 0.5;
    const thinning = options.thinning !== undefined ? options.thinning : 0.5;
    const simPressure = options.simulatePressure !== undefined ? options.simulatePressure : true;
    const isComplete = Boolean(options.last);

    if (strokePoints.length === 0 || size <= 0) return [];
    const totalLength = strokePoints[strokePoints.length - 1].runningLength;
    const minDist = Math.pow(size * smoothing, 2);
    const leftPts = [];
    const rightPts = [];

    let prevPressure = strokePoints.slice(0, 10).reduce((acc, curr) => {
      let p = curr.pressure;
      if (simPressure) p = simulatePressure(acc, curr.distance, size);
      return (acc + p) / 2;
    }, strokePoints[0].pressure);

    let radius = getStrokeRadius(size, thinning, strokePoints[strokePoints.length - 1].pressure);
    let firstRadius = undefined;
    let prevVector = strokePoints[0].vector;
    let pl = strokePoints[0].point;
    let pr = pl;
    let tl = pl;
    let tr = pr;
    let isPrevPointSharpCorner = false;

    const offset = [0, 0];
    const tmpL = [0, 0];
    const tmpR = [0, 0];

    for (let i = 0; i < strokePoints.length; i++) {
      let pressure = strokePoints[i].pressure;
      const sp = strokePoints[i];
      const isLast = i === strokePoints.length - 1;
      if (!isLast && totalLength - sp.runningLength < 3) continue;

      if (thinning) {
        if (simPressure) pressure = simulatePressure(prevPressure, sp.distance, size);
        radius = getStrokeRadius(size, thinning, pressure);
      } else {
        radius = size / 2;
      }
      if (firstRadius === undefined) firstRadius = radius;
      radius = Math.max(0.01, radius);

      const nextVector = (isLast ? strokePoints[i] : strokePoints[i + 1]).vector;
      const nextDpr = isLast ? 1 : dpr(sp.vector, nextVector);
      const isPointSharpCorner = dpr(sp.vector, prevVector) < 0 && !isPrevPointSharpCorner;
      const isNextPointSharpCorner = nextDpr !== null && nextDpr < 0;

      if (isPointSharpCorner || isNextPointSharpCorner) {
        perInto(offset, prevVector);
        mulInto(offset, offset, radius);
        for (let step = 0; step <= 1; step += 1 / 13) {
          subInto(tmpL, sp.point, offset);
          rotAroundInto(tmpL, tmpL, sp.point, PI_EPS * step);
          tl = [tmpL[0], tmpL[1]];
          leftPts.push(tl);

          addInto(tmpR, sp.point, offset);
          rotAroundInto(tmpR, tmpR, sp.point, PI_EPS * -step);
          tr = [tmpR[0], tmpR[1]];
          rightPts.push(tr);
        }
        pl = tl;
        pr = tr;
        if (isNextPointSharpCorner) isPrevPointSharpCorner = true;
        continue;
      }

      isPrevPointSharpCorner = false;
      if (isLast) {
        perInto(offset, sp.vector);
        mulInto(offset, offset, radius);
        leftPts.push(sub(sp.point, offset));
        rightPts.push(add(sp.point, offset));
        continue;
      }

      lrpInto(offset, nextVector, sp.vector, nextDpr);
      perInto(offset, offset);
      mulInto(offset, offset, radius);

      subInto(tmpL, sp.point, offset);
      tl = [tmpL[0], tmpL[1]];
      if (i <= 1 || dist2(pl, tl) > minDist) {
        leftPts.push(tl);
        pl = tl;
      }

      addInto(tmpR, sp.point, offset);
      tr = [tmpR[0], tmpR[1]];
      if (i <= 1 || dist2(pr, tr) > minDist) {
        rightPts.push(tr);
        pr = tr;
      }

      prevPressure = pressure;
      prevVector = sp.vector;
    }

    const firstPoint = [strokePoints[0].point[0], strokePoints[0].point[1]];
    const lastPoint = strokePoints.length > 1
      ? [strokePoints[strokePoints.length - 1].point[0], strokePoints[strokePoints.length - 1].point[1]]
      : add(strokePoints[0].point, [1, 1]);

    if (strokePoints.length === 1) {
      const r = firstRadius || radius;
      const start = prj(firstPoint, uni(per(sub(firstPoint, add(firstPoint, [1, 1])))), -r);
      const dotPts = [];
      for (let step = 1 / 13; step <= 1; step += 1 / 13) {
        dotPts.push(rotAround(start, firstPoint, PI_EPS * 2 * step));
      }
      return dotPts;
    }

    const startCap = [];
    if (rightPts.length > 0) {
      for (let step = 1 / 13; step <= 1; step += 1 / 13) {
        startCap.push(rotAround(rightPts[0], firstPoint, PI_EPS * step));
      }
    }

    const endCap = [];
    const direction = per(neg(strokePoints[strokePoints.length - 1].vector));
    const endStart = prj(lastPoint, direction, radius);
    for (let step = 1 / 29; step < 1; step += 1 / 29) {
      endCap.push(rotAround(endStart, lastPoint, PI_EPS * 3 * step));
    }

    return leftPts.concat(endCap, rightPts.reverse(), startCap);
  }

  function getPerfectStroke(points, options) {
    return getStrokeOutlinePoints(getStrokePoints(points, options || {}), options || {});
  }

  function outlineToPath2D(pts) {
    if (!pts || pts.length < 4) return null;
    const mid = (a, b) => (a + b) / 2;
    let p0 = pts[0], p1 = pts[1], p2 = pts[2];
    let d = `M${p0[0]},${p0[1]} Q${p1[0]},${p1[1]} ${mid(p1[0], p2[0])},${mid(p1[1], p2[1])} T`;
    for (let i = 2; i < pts.length - 1; i++) {
      p0 = pts[i];
      p1 = pts[i + 1];
      d += `${mid(p0[0], p1[0])},${mid(p0[1], p1[1])} `;
    }
    return new Path2D(d + "Z");
  }

  // --------------------------------------------------------------------------
  // 2. PROBLEMCOZ.COM ARAÇ & RENK AYARLARI + ÇİFT KATMANLI TUVAL YÖNETİCİSİ
  // --------------------------------------------------------------------------
  const BASE_REF_W = 1000;
  const TOOL_SPECS = {
    kalem:    { boyutlar: [2.5, 4.0, 6.8], thinning: 0.58, smoothing: 0.55, streamline: 0.42, alfa: 1 },
    fosforlu: { boyutlar: [16, 24, 34],    thinning: 0,    smoothing: 0.6,  streamline: 0.6,  alfa: 0.32 },
    silgi:    { boyutlar: [16, 30, 58],    thinning: 0,    smoothing: 0.4,  streamline: 0.3,  alfa: 1 }
  };

  const PEN_COLORS = ["#1f2937", "#ef7d00", "#ec5f69", "#2a9fd0", "#7ea61f", "#a964a3"];
  const HIGHLIGHT_COLORS = ["#f7a520", "#b1cd4d", "#54c2e8", "#c997c4"];
  const OPTION_COLORS = {
    A: "#ef7d00",
    B: "#9db832",
    C: "#38b2dc",
    D: "#b87eb3"
  };

  class SmartboardCanvas {
    constructor(tuval, canli, kapsayici, onChange) {
      this.tuval = tuval;
      this.canli = canli;
      this.kapsayici = kapsayici;
      this.ctx = tuval.getContext("2d");
      this.cctx = canli.getContext("2d");
      this.onChange = onChange || function () {};
      this.arac = "kalem";
      this.renk = PEN_COLORS[0];
      this.kalinlik = 1;
      this.gecmis = [];
      this.ileri = [];
      this.aktif = null;
      this.kalemGoruldu = false;
      this.cerceve = 0;
      this.tahmin = [];
      this.kopya = null;

      canli.addEventListener("pointerdown", e => this._onDown(e));
      canli.addEventListener("pointermove", e => this._onMove(e));
      canli.addEventListener("pointerup", e => this._onUp(e));
      canli.addEventListener("pointercancel", e => this._onUp(e));
      canli.addEventListener("contextmenu", e => e.preventDefault());

      // Kaydırma / swipe çakışmalarını engelle
      ["touchstart", "touchmove", "touchend"].forEach(evName => {
        canli.addEventListener(evName, e => e.stopPropagation(), { passive: true });
      });

      this._ro = new ResizeObserver(() => this.boyutla());
      this._ro.observe(kapsayici);
      this.boyutla();
    }

    get genislik() {
      return this.kapsayici.clientWidth || 1;
    }

    destroy() {
      if (this._ro) this._ro.disconnect();
      cancelAnimationFrame(this.cerceve);
    }

    boyutla() {
      const dprVal = window.devicePixelRatio || 1;
      const w = this.kapsayici.clientWidth;
      const h = this.kapsayici.clientHeight;
      if (!w || !h) return;
      [this.tuval, this.canli].forEach(cv => {
        cv.width = Math.round(w * dprVal);
        cv.height = Math.round(h * dprVal);
        cv.getContext("2d").setTransform(dprVal, 0, 0, dprVal, 0, 0);
      });
      this.ciz();
    }

    yukle(kayit) {
      this.gecmis = Array.isArray(kayit) ? kayit.slice() : [];
      this.ileri = [];
      this.aktif = null;
      this.ciz();
    }

    geriAl() {
      if (!this.gecmis.length) return;
      this.ileri.push(this.gecmis.pop());
      this.ciz();
      this.onChange(this.gecmis);
    }

    yinele() {
      if (!this.ileri.length) return;
      this.gecmis.push(this.ileri.pop());
      this.ciz();
      this.onChange(this.gecmis);
    }

    temizle() {
      if (!this.gecmis.length || this.gecmis[this.gecmis.length - 1].tip === "temizle") return;
      this.gecmis.push({ tip: "temizle" });
      this.ileri = [];
      this.ciz();
      this.onChange(this.gecmis);
    }

    ciz() {
      const ctx = this.ctx;
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, this.tuval.width, this.tuval.height);
      ctx.restore();

      for (const item of this.gecmis) {
        if (item.tip === "temizle") {
          ctx.save();
          ctx.setTransform(1, 0, 0, 1, 0, 0);
          ctx.clearRect(0, 0, this.tuval.width, this.tuval.height);
          ctx.restore();
        } else {
          this._strokeCiz(ctx, item);
        }
      }
    }

    _strokeCiz(ctx, stroke, extraPts) {
      const spec = TOOL_SPECS[stroke.arac] || TOOL_SPECS.kalem;
      const w = this.genislik;
      const allPts = (extraPts && extraPts.length ? stroke.noktalar.concat(extraPts) : stroke.noktalar)
        .map(p => [p[0] * w, p[1] * w, p[2]]);
      const pxSize = (spec.boyutlar[stroke.kalinlik] || spec.boyutlar[1]) * w / BASE_REF_W;

      const outline = getPerfectStroke(allPts, {
        size: pxSize,
        thinning: spec.thinning,
        smoothing: spec.smoothing,
        streamline: spec.streamline,
        simulatePressure: stroke.arac === "kalem" && !stroke.basinc,
        last: (!extraPts || !extraPts.length) && stroke !== this.aktif
      });

      ctx.save();
      ctx.globalAlpha = spec.alfa;
      ctx.globalCompositeOperation = stroke.arac === "silgi" ? "destination-out" : "source-over";
      ctx.fillStyle = stroke.arac === "silgi" ? "#000000" : stroke.renk;
      const path = outlineToPath2D(outline);
      if (path) {
        ctx.fill(path);
      } else if (allPts.length) {
        ctx.beginPath();
        ctx.arc(allPts[0][0], allPts[0][1], pxSize / 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    _izinliMi(e) {
      if (e.pointerType === "pen") this.kalemGoruldu = true;
      if (e.pointerType === "touch" && this.kalemGoruldu) return false;
      if (e.pointerType === "mouse" && e.button !== 0) return false;
      return true;
    }

    _noktaOku(e) {
      const rect = this.canli.getBoundingClientRect();
      const w = this.genislik;
      const p = e.pointerType === "pen" ? Math.max(e.pressure || 0.5, 0.05) : 0.5;
      return [(e.clientX - rect.left) / w, (e.clientY - rect.top) / w, p];
    }

    _createBackupCanvas() {
      if (typeof OffscreenCanvas !== "undefined") {
        const oc = new OffscreenCanvas(this.tuval.width || 1, this.tuval.height || 1);
        oc.getContext("2d").drawImage(this.tuval, 0, 0);
        return oc;
      }
      const c = document.createElement("canvas");
      c.width = this.tuval.width || 1;
      c.height = this.tuval.height || 1;
      c.getContext("2d").drawImage(this.tuval, 0, 0);
      return c;
    }

    _onDown(e) {
      if (!this._izinliMi(e) || this.aktif) return;
      e.preventDefault();
      e.stopPropagation();
      try { this.canli.setPointerCapture(e.pointerId); } catch (_) {}

      this.aktif = {
        tip: "cizgi",
        arac: this.arac,
        renk: this.renk,
        kalinlik: this.kalinlik,
        basinc: e.pointerType === "pen",
        noktalar: [this._noktaOku(e)],
        id: e.pointerId
      };

      if (this.arac === "silgi") {
        this.kopya = this._createBackupCanvas();
      }
      this.tahmin = [];
      this._cercevePlanla();
    }

    _onMove(e) {
      if (!this.aktif || e.pointerId !== this.aktif.id) return;
      e.preventDefault();
      e.stopPropagation();
      let coalesced = typeof e.getCoalescedEvents === "function" ? e.getCoalescedEvents() : [];
      if (!coalesced || !coalesced.length) coalesced = [e];
      for (const ev of coalesced) {
        this.aktif.noktalar.push(this._noktaOku(ev));
      }
      const predicted = typeof e.getPredictedEvents === "function" ? e.getPredictedEvents() : [];
      this.tahmin = (predicted || []).slice(0, 2).map(ev => this._noktaOku(ev));
      this._cercevePlanla();
    }

    _onUp(e) {
      if (!this.aktif || e.pointerId !== this.aktif.id) return;
      e.stopPropagation();
      const biten = this.aktif;
      delete biten.id;
      this.aktif = null;
      this.tahmin = [];
      cancelAnimationFrame(this.cerceve);
      this.cctx.clearRect(0, 0, this.canli.width, this.canli.height);
      this.gecmis.push(biten);
      this.ileri = [];
      if (biten.arac === "silgi") {
        this.ciz();
      } else {
        this._strokeCiz(this.ctx, biten);
      }
      this.kopya = null;
      this.onChange(this.gecmis);
    }

    _cercevePlanla() {
      cancelAnimationFrame(this.cerceve);
      this.cerceve = requestAnimationFrame(() => {
        if (!this.aktif) return;
        if (this.aktif.arac === "silgi" && this.kopya) {
          const ctx = this.ctx;
          ctx.save();
          ctx.setTransform(1, 0, 0, 1, 0, 0);
          ctx.clearRect(0, 0, this.tuval.width, this.tuval.height);
          ctx.drawImage(this.kopya, 0, 0);
          ctx.restore();
          this._strokeCiz(ctx, this.aktif);
        } else {
          this.cctx.clearRect(0, 0, this.canli.width, this.canli.height);
          this._strokeCiz(this.cctx, this.aktif, this.tahmin);
        }
      });
    }
  }

  // --------------------------------------------------------------------------
  // 3. YEREL SAKLAMA YARDIMCILARI (Çizimler & Doğrulanan Cevaplar)
  // --------------------------------------------------------------------------
  function readStore(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (_) {
      return fallback;
    }
  }

  function writeStore(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (_) {}
  }

  // --------------------------------------------------------------------------
  // 4. NARTES+ AKILLI TAHTA DURAĞI RENDER MOTORU
  // --------------------------------------------------------------------------
  let activeKeyHandler = null;
  let activeBoardInstance = null;

  function cleanupPreviousBoard() {
    if (activeKeyHandler) {
      window.removeEventListener("keydown", activeKeyHandler);
      activeKeyHandler = null;
    }
    if (activeBoardInstance) {
      activeBoardInstance.destroy();
      activeBoardInstance = null;
    }
    document.body.classList.remove("sb-expanded-mode");
  }

  function renderSmartboardStop(opts) {
    cleanupPreviousBoard();

    const stop = opts.stop;
    const kaz = opts.kaz;
    const UNIT = opts.unit;
    const container = opts.container;
    const safeMathHtml = opts.safeMathHtml || (s => s);
    const renderOptionMath = opts.renderOptionMath || (s => s);
    const applyKaTeX = opts.applyKaTeX || (() => {});
    const playTone = opts.playTone || (() => {});
    const completeCurrentStop = opts.completeCurrentStop || (() => {});
    const isStopDone = opts.isStopDone || (() => false);

    const questions = Array.isArray(stop.questions) ? stop.questions : [];
    if (!questions.length) {
      container.innerHTML = `<div class="lead-text"><p>Bu alt başlık için henüz akıllı tahta sorusu eklenmedi.</p></div>`;
      return;
    }

    const ansStoreKey = `nartes_sb_ans_${UNIT.id}_${kaz.id}`;
    const solvedMap = readStore(ansStoreKey, {});
    let currentIdx = Math.max(0, questions.findIndex((_, idx) => !solvedMap[idx]));
    if (currentIdx >= questions.length) currentIdx = 0;

    const root = document.createElement("div");
    root.className = "sb-calisma";
    root.innerHTML = `
      <!-- Üst Akıllı Tahta Gezinti Şeridi -->
      <div class="sb-ust-bar">
        <div class="sb-ust-sol">
          <span class="sb-konu-etiket">✏️ Akıllı Tahta • ${kaz.no}. ${kaz.title}</span>
          <span class="sb-soru-etiket-pill" id="sbActiveBadge">Soru 1</span>
        </div>

        <div class="sb-gezinti">
          <button type="button" class="sb-gez-btn" id="sbPrevQ" title="Önceki Soru">
            <svg viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"/></svg>
            <span>Önceki</span>
          </button>
          <span class="sb-soru-sayac" id="sbCounter">1 / ${questions.length}</span>
          <button type="button" class="sb-gez-btn" id="sbNextQ" title="Sonraki Soru">
            <span>Sonraki</span>
            <svg viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>

        <div class="sb-ust-sag">
          <button type="button" class="sb-aksiyon-btn sb-cozum-ac-btn" id="sbToggleSolution" hidden>
            <span>📘</span> <span>Çözümü Gör</span>
          </button>
          <button type="button" class="sb-aksiyon-btn" id="sbExpandToggle" title="Akıllı Tahtayı Genişlet / Küçült">
            <span id="sbExpandIcon">⛶</span> <span id="sbExpandLabel">Geniş Tahta</span>
          </button>
        </div>
      </div>

      <!-- Orta Çalışma Masası: Noktalı Soru Kâğıdı + Dikey Çizim Araçları + Sağ Optik Form -->
      <div class="sb-masa">
        <div class="sb-kagit" id="sbKagit">
          <!-- Soru Baskı Katmanı (Üzerine doğrudan kalemle yazılabilir) -->
          <div class="sb-kagit-icerik" id="sbQuestionSheet"></div>
          <div class="sb-karalama-filigran" aria-hidden="true">✍️ İşlem &amp; Karalama Alanı</div>

          <!-- Çift Katmanlı Akıllı Tahta Tuvali -->
          <canvas class="sb-tuval" id="sbTuval"></canvas>
          <canvas class="sb-tuval sb-canli" id="sbCanli"></canvas>

          <div class="sb-ipucu-etiket" id="sbDrawHint">
            ✏️ Sorunun üzerine ve noktalı alana kalemle, parmağınla ya da fareyle işlem yapabilirsin
          </div>

          <!-- Çözüm Çekmecesi (Doğru çözüldükten sonra incelenebilir) -->
          <div class="sb-cozum-cekmecesi" id="sbSolutionDrawer" hidden>
            <div class="sb-cozum-baslik">
              <strong>📘 Adım Adım Çözüm</strong>
              <button type="button" class="sb-cozum-kapat" id="sbCloseSolution" aria-label="Kapat">✕</button>
            </div>
            <div class="sb-cozum-govde" id="sbSolutionBody"></div>
          </div>
        </div>

        <!-- problemcoz.com Dikey Çizim Araç Çubuğu -->
        <div class="sb-arac-cubugu" id="sbToolbar" role="toolbar" aria-label="Akıllı tahta çizim araçları">
          <button type="button" class="sb-arac secili" data-arac="kalem" title="Kalem (P)">
            <svg viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
          </button>
          <button type="button" class="sb-arac" data-arac="fosforlu" title="Fosforlu Kalem (H)">
            <svg viewBox="0 0 24 24"><path d="m9 11-6 6v3h9l3-3"/><path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4"/></svg>
          </button>
          <button type="button" class="sb-arac" data-arac="silgi" title="Silgi (E)">
            <svg viewBox="0 0 24 24"><path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"/><path d="M22 21H7"/><path d="m5 11 9 9"/></svg>
          </button>
          <span class="sb-ayrac"></span>
          <div class="sb-renkler" id="sbColors"></div>
          <span class="sb-ayrac"></span>
          <div class="sb-kalinliklar" id="sbSizes"></div>
          <span class="sb-ayrac"></span>
          <button type="button" class="sb-arac" id="sbUndo" title="Geri Al (Ctrl+Z)">
            <svg viewBox="0 0 24 24"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/></svg>
          </button>
          <button type="button" class="sb-arac" id="sbRedo" title="Yinele (Ctrl+Shift+Z)">
            <svg viewBox="0 0 24 24"><path d="M21 7v6h-6"/><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7"/></svg>
          </button>
          <button type="button" class="sb-arac sb-arac-temizle" id="sbClear" title="Karalamayı Temizle">
            <svg viewBox="0 0 24 24"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          </button>
        </div>

        <!-- Sağ Optik Cevap Kâğıdı -->
        <aside class="sb-optik" aria-label="Cevap Kâğıdı">
          <div class="sb-optik-baslik">
            <h3>Cevap Kâğıdı</h3>
            <div class="sb-optik-skor" id="sbScoreSummary"></div>
          </div>
          <ol class="sb-optik-liste" id="sbOptikList"></ol>
          <div class="sb-optik-alt" id="sbOptikFoot"></div>
        </aside>
      </div>

      <!-- Alt Büyük Renkli Şık Daireleri (problemcoz.com İmza Şerit) -->
      <div class="sb-cevap-satiri" id="sbAnswerBar" role="group" aria-label="Soru şıkları"></div>
    `;

    container.appendChild(root);

    const kagitEl = root.querySelector("#sbKagit");
    const tuvalEl = root.querySelector("#sbTuval");
    const canliEl = root.querySelector("#sbCanli");
    const drawHintEl = root.querySelector("#sbDrawHint");
    const sheetEl = root.querySelector("#sbQuestionSheet");
    const colorsEl = root.querySelector("#sbColors");
    const sizesEl = root.querySelector("#sbSizes");
    const answerBarEl = root.querySelector("#sbAnswerBar");
    const optikListEl = root.querySelector("#sbOptikList");
    const scoreSummaryEl = root.querySelector("#sbScoreSummary");
    const optikFootEl = root.querySelector("#sbOptikFoot");
    const solDrawerEl = root.querySelector("#sbSolutionDrawer");
    const solBodyEl = root.querySelector("#sbSolutionBody");
    const toggleSolBtn = root.querySelector("#sbToggleSolution");

    let saveTimer = null;
    function getStrokeStoreKey(qIdx) {
      return `nartes_sb_ink_${UNIT.id}_${kaz.id}_q${qIdx}`;
    }

    const board = new SmartboardCanvas(tuvalEl, canliEl, kagitEl, (strokes) => {
      if (drawHintEl && strokes.length > 0) drawHintEl.hidden = true;
      clearTimeout(saveTimer);
      const targetIdx = currentIdx;
      saveTimer = setTimeout(() => {
        writeStore(getStrokeStoreKey(targetIdx), strokes);
      }, 240);
    });
    activeBoardInstance = board;

    // Araç çubuğu renk & kalınlık kurulumu
    function renderColors() {
      const palette = board.arac === "fosforlu" ? HIGHLIGHT_COLORS : PEN_COLORS;
      if (!palette.includes(board.renk)) board.renk = palette[0];
      colorsEl.innerHTML = "";
      palette.forEach(hex => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "sb-renk" + (hex === board.renk ? " secili" : "");
        b.style.setProperty("--renk", hex);
        b.title = "Kalem rengi";
        b.addEventListener("click", () => {
          board.renk = hex;
          if (board.arac === "silgi") selectTool("kalem");
          else renderColors();
        });
        colorsEl.appendChild(b);
      });
      colorsEl.classList.toggle("pasif", board.arac === "silgi");
    }

    function selectTool(toolName) {
      board.arac = toolName;
      root.querySelectorAll("[data-arac]").forEach(btn => {
        btn.classList.toggle("secili", btn.getAttribute("data-arac") === toolName);
      });
      renderColors();
    }

    [0, 1, 2].forEach(szIdx => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "sb-kalinlik" + (szIdx === board.kalinlik ? " secili" : "");
      b.title = ["İnce Uç", "Orta Uç", "Kalın Uç"][szIdx];
      b.innerHTML = `<span style="--k:${[4, 7, 11][szIdx]}px"></span>`;
      b.addEventListener("click", () => {
        board.kalinlik = szIdx;
        sizesEl.querySelectorAll(".sb-kalinlik").forEach((el, idx) => {
          el.classList.toggle("secili", idx === szIdx);
        });
      });
      sizesEl.appendChild(b);
    });

    root.querySelectorAll("[data-arac]").forEach(btn => {
      btn.addEventListener("click", () => selectTool(btn.getAttribute("data-arac")));
    });
    renderColors();

    root.querySelector("#sbUndo").addEventListener("click", () => board.geriAl());
    root.querySelector("#sbRedo").addEventListener("click", () => board.yinele());
    root.querySelector("#sbClear").addEventListener("click", () => board.temizle());

    // Klavye kısayolları (P, H, E, Ctrl+Z, Ctrl+Shift+Z, Esc)
    activeKeyHandler = function (e) {
      if (!document.body.contains(root)) {
        cleanupPreviousBoard();
        return;
      }
      const tag = (e.target && e.target.tagName || "").toLowerCase();
      if (tag === "input" || tag === "textarea" || (e.target && e.target.isContentEditable)) return;

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
        e.preventDefault();
        if (e.shiftKey) board.yinele();
        else board.geriAl();
        return;
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "y") {
        e.preventDefault();
        board.yinele();
        return;
      }
      if (!e.ctrlKey && !e.metaKey && !e.altKey) {
        const k = e.key.toLowerCase();
        if (k === "p") selectTool("kalem");
        else if (k === "h") selectTool("fosforlu");
        else if (k === "e") selectTool("silgi");
        else if (e.key === "Escape" && document.body.classList.contains("sb-expanded-mode")) {
          toggleExpanded(false);
        }
      }
    };
    window.addEventListener("keydown", activeKeyHandler);

    // Geniş Tahta (Tam Sahne) Modu
    const expandBtn = root.querySelector("#sbExpandToggle");
    const expandIcon = root.querySelector("#sbExpandIcon");
    const expandLabel = root.querySelector("#sbExpandLabel");

    function toggleExpanded(forceVal) {
      const next = typeof forceVal === "boolean"
        ? forceVal
        : !document.body.classList.contains("sb-expanded-mode");
      document.body.classList.toggle("sb-expanded-mode", next);
      expandIcon.textContent = next ? "🗗" : "⛶";
      expandLabel.textContent = next ? "Normal Görünüm" : "Geniş Tahta";
      setTimeout(() => board.boyutla(), 60);
    }
    expandBtn.addEventListener("click", () => {
      playTone("click");
      toggleExpanded();
    });

    // Çözüm Çekmecesi
    toggleSolBtn.addEventListener("click", () => {
      playTone("click");
      solDrawerEl.hidden = !solDrawerEl.hidden;
    });
    root.querySelector("#sbCloseSolution").addEventListener("click", () => {
      solDrawerEl.hidden = true;
    });

    // Aktif soruyu Bilge NarTES Sokratik yapay zekâsına bildir
    function syncActiveQuestionToMentor() {
      const q = questions[currentIdx];
      if (!q || !window.NartesMentor) return;
      const fullStem = [q.stem || "", q.questionPrompt || ""].filter(Boolean).join(" ");
      const virtualStop = Object.assign({}, stop, {
        type: "question",
        activeQuestionIndex: currentIdx,
        title: `${stop.title} (${currentIdx + 1}. Soru)`,
        stem: fullStem,
        options: q.options || [],
        correctLetter: q.correctLetter,
        hint: q.hint || "",
        solution: q.solution || ""
      });
      window.NartesMentor.setContext({ unit: UNIT, kaz, stop: virtualStop });
    }

    // Şık Seçimi ve Sokratik Doğrulama
    function handleSelectLetter(qIndex, letter, clickedBtn) {
      if (window.NartesMentor && window.NartesMentor.isRemediationLocked()) return;
      if (qIndex !== currentIdx) {
        currentIdx = qIndex;
        renderCurrentQuestion();
      }
      const q = questions[qIndex];
      if (!q) return;

      // Daha önce doğru çözüldüyse çözümü aç
      if (solvedMap[qIndex] === q.correctLetter) {
        solDrawerEl.hidden = false;
        return;
      }

      if (letter === q.correctLetter) {
        solvedMap[qIndex] = letter;
        writeStore(ansStoreKey, solvedMap);
        playTone("success");
        if (window.NartesMentor) window.NartesMentor.onCorrect();
        renderAnswerControls();

        const solvedTotal = questions.filter((item, idx) => solvedMap[idx] === item.correctLetter).length;
        if (solvedTotal === questions.length) {
          completeCurrentStop(`Harika! ${kaz.title} alt başlığının tüm Akıllı Tahta sorularını kaleminle çözüp tamamladın!`);
        } else {
          // Otomatik olarak sıradaki çözülmemiş soruya geç
          const nextUnanswered = questions.findIndex((item, idx) => solvedMap[idx] !== item.correctLetter);
          if (nextUnanswered !== -1) {
            setTimeout(() => {
              currentIdx = nextUnanswered;
              renderCurrentQuestion();
            }, 950);
          }
        }
      } else {
        playTone("error");
        if (clickedBtn) clickedBtn.classList.add("yanlis");
        const chosenOpt = (q.options || []).find(o => o.letter === letter);
        const correctOpt = (q.options || []).find(o => o.letter === q.correctLetter);

        if (window.NartesMentor) {
          syncActiveQuestionToMentor();
          window.NartesMentor.onWrong({
            wrongValue: chosenOpt ? `${letter}) ${chosenOpt.text}` : `${letter} şıkkı`,
            targetKey: `sb_q_${UNIT.id}_${kaz.id}_${qIndex}`,
            targetLabel: `${qIndex + 1}. Soru`,
            correctAnswerToMask: correctOpt ? correctOpt.text : q.correctLetter,
            customHint: q.hint
          }, () => {
            if (clickedBtn) clickedBtn.classList.remove("yanlis");
          });
        } else if (clickedBtn) {
          setTimeout(() => clickedBtn.classList.remove("yanlis"), 600);
        }
      }
    }

    function renderAnswerControls() {
      const q = questions[currentIdx];
      const isSolved = solvedMap[currentIdx] === q.correctLetter;

      // 1) Çözüm butonu durumu
      toggleSolBtn.hidden = !isSolved;
      solBodyEl.innerHTML = `<div class="sb-cozum-metin">${safeMathHtml(q.solution || "Doğru cevap: " + q.correctLetter)}</div>`;
      applyKaTeX(solBodyEl);

      // 2) Alt Büyük Dairesel Şık Şeridi (problemcoz.com İmza Görünümü)
      answerBarEl.innerHTML = "";
      const labelSpan = document.createElement("span");
      labelSpan.className = "sb-cevap-etiket";
      labelSpan.textContent = isSolved
        ? `✓ ${currentIdx + 1}. Soru Doğru Çözüldü:`
        : `${currentIdx + 1}. Soru Cevabın:`;
      if (isSolved) labelSpan.classList.add("is-solved");
      answerBarEl.appendChild(labelSpan);

      ["A", "B", "C", "D"].forEach(letter => {
        const btn = document.createElement("button");
        btn.type = "button";
        const isCorrectMarked = isSolved && letter === q.correctLetter;
        btn.className = "sb-sik" + (isCorrectMarked ? " dogru-isaret" : "");
        btn.style.setProperty("--renk", OPTION_COLORS[letter] || "#ef7d00");
        btn.textContent = letter;
        btn.setAttribute("aria-label", `${letter} şıkkı`);
        btn.addEventListener("click", () => handleSelectLetter(currentIdx, letter, btn));
        answerBarEl.appendChild(btn);
      });

      // 3) Sağ Optik Cevap Kâğıdı
      const solvedCount = questions.filter((item, idx) => solvedMap[idx] === item.correctLetter).length;
      const remainCount = questions.length - solvedCount;
      scoreSummaryEl.innerHTML = `
        <span class="sb-skor-d">✓ ${solvedCount} Doğru</span>
        <span>•</span>
        <span>${remainCount} Kaldı</span>
      `;

      optikListEl.innerHTML = "";
      questions.forEach((item, idx) => {
        const li = document.createElement("li");
        li.className = "sb-optik-satir" + (idx === currentIdx ? " aktif" : "");

        const noBtn = document.createElement("button");
        noBtn.type = "button";
        noBtn.className = "sb-optik-no";
        noBtn.textContent = `${idx + 1}.`;
        noBtn.addEventListener("click", () => {
          playTone("click");
          currentIdx = idx;
          renderCurrentQuestion();
        });
        li.appendChild(noBtn);

        const rowSolved = solvedMap[idx] === item.correctLetter;
        ["A", "B", "C", "D"].forEach(letter => {
          const bub = document.createElement("button");
          bub.type = "button";
          bub.className = "sb-kabarcik" + (rowSolved && letter === item.correctLetter ? " dogru-isaret" : "");
          bub.textContent = letter;
          bub.addEventListener("click", () => handleSelectLetter(idx, letter, bub));
          li.appendChild(bub);
        });

        optikListEl.appendChild(li);
      });

      if (solvedCount === questions.length || isStopDone(stop.id, UNIT)) {
        optikFootEl.innerHTML = `
          <div class="sb-tamam-rozet">🎉 Alt başlık testi tamamlandı! Sıradaki bölüme geçebilirsin.</div>
        `;
      } else {
        optikFootEl.innerHTML = `
          <div class="sb-bekleyen-not">Kalemle işlemlerini yapıp tüm soruları doğru işaretleyerek bölümü tamamla.</div>
        `;
      }
    }

    function renderCurrentQuestion() {
      const q = questions[currentIdx];
      if (!q) return;

      solDrawerEl.hidden = true;
      root.querySelector("#sbActiveBadge").textContent = q.badge || `${currentIdx + 1}. Soru`;
      root.querySelector("#sbCounter").textContent = `${currentIdx + 1} / ${questions.length}`;
      root.querySelector("#sbPrevQ").disabled = currentIdx === 0;
      root.querySelector("#sbNextQ").disabled = currentIdx >= questions.length - 1;

      // Soru Kâğıdı Baskısı (Görsel soru VEYA Kitap Dizgisi + Şema)
      if (q.image) {
        sheetEl.innerHTML = `
          <img class="sb-soru-resim" src="${q.image}" alt="${currentIdx + 1}. Soru" draggable="false">
        `;
      } else {
        const optsHtml = (q.options || []).map(o => `
          <div class="sb-basili-sik">
            <span class="sb-basili-harf" style="--renk:${OPTION_COLORS[o.letter] || "#ef7d00"}">${o.letter})</span>
            <span class="sb-basili-metin">${renderOptionMath(o.text)}</span>
          </div>
        `).join("");

        sheetEl.innerHTML = `
          <div class="sb-basili-soru-karti">
            <div class="sb-basili-no-satir">
              <span class="sb-basili-no">${currentIdx + 1}. SORU</span>
              <span class="sb-basili-kaz">${kaz.code || ""} • ${kaz.title}</span>
            </div>
            <div class="sb-basili-kok">${safeMathHtml(q.stem || "")}</div>
            ${q.modelSvg ? `<div class="sb-basili-sema">${q.modelSvg}</div>` : ""}
            ${q.questionPrompt ? `<div class="sb-basili-soru-cumlesi">${safeMathHtml(q.questionPrompt)}</div>` : ""}
            <div class="sb-basili-siklar">${optsHtml}</div>
          </div>
        `;
        applyKaTeX(sheetEl);
      }

      // Bu soruya ait kayıtlı el yazısı çizimlerini yükle
      const savedStrokes = readStore(getStrokeStoreKey(currentIdx), []);
      board.yukle(savedStrokes);
      if (drawHintEl) drawHintEl.hidden = savedStrokes.length > 0;

      renderAnswerControls();
      syncActiveQuestionToMentor();
    }

    root.querySelector("#sbPrevQ").addEventListener("click", () => {
      if (currentIdx > 0) {
        playTone("click");
        currentIdx--;
        renderCurrentQuestion();
      }
    });

    root.querySelector("#sbNextQ").addEventListener("click", () => {
      if (currentIdx < questions.length - 1) {
        playTone("click");
        currentIdx++;
        renderCurrentQuestion();
      }
    });

    renderCurrentQuestion();
  }

  window.NartesSmartboard = {
    renderStop: renderSmartboardStop,
    cleanup: cleanupPreviousBoard
  };
})();
