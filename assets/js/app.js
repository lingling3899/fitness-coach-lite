/* 健身教練 Lite — UI／記錄／短片教學 */
(function () {
  "use strict";

  const STORAGE_KEY = "fitnessCoachLite.logs.v1";
  const VIDEO_KEY = "fitnessCoachLite.videos.v1";
  const CACHE = "20261028c";
  const BUNDLED_VIDEOS = {
    "db-row": { src: "assets/videos/db-row.mp4", poster: "assets/videos/db-row.jpg" },
    "db-shoulder-press": { src: "assets/videos/db-shoulder-press.mp4", poster: "assets/videos/db-shoulder-press.jpg" },
    "db-curl": { src: "assets/videos/db-curl.mp4", poster: "assets/videos/db-curl.jpg" }
  };
  const data = window.FITNESS_DATA;
  const anatomy = window.FITNESS_ANATOMY;
  if (!data) {
    console.error("FITNESS_DATA missing");
    return;
  }

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  const state = {
    view: "muscles",
    muscleFilter: "",
    categoryFilter: "",
    search: "",
    detailId: null,
    detailFromShorts: false,
    logFilterMuscle: "",
    logFilterDate: ""
  };

  function byId(id) {
    return data.exercises.find((e) => e.id === id);
  }

  function muscleName(id) {
    const m = data.muscles.find((x) => x.id === id);
    return m ? m.name : id;
  }

  function catLabel(c) {
    return c === "gym" ? "健身房" : "家用";
  }

  function loadLogs() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const arr = JSON.parse(raw);
      return Array.isArray(arr) ? arr : [];
    } catch (_) {
      return [];
    }
  }

  function saveLogs(logs) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
  }

  function loadVideos() {
    try {
      const raw = localStorage.getItem(VIDEO_KEY);
      if (!raw) return {};
      const obj = JSON.parse(raw);
      return obj && typeof obj === "object" ? obj : {};
    } catch (_) {
      return {};
    }
  }

  function saveVideos(map) {
    localStorage.setItem(VIDEO_KEY, JSON.stringify(map));
  }

  function getVideoUrl(exerciseId) {
    const map = loadVideos();
    return (map[exerciseId] || "").trim();
  }

  function setVideoUrl(exerciseId, url) {
    const map = loadVideos();
    const cleaned = (url || "").trim();
    if (!cleaned) delete map[exerciseId];
    else map[exerciseId] = cleaned;
    saveVideos(map);
  }

  function getBundledVideo(exerciseId) {
    return BUNDLED_VIDEOS[exerciseId] || null;
  }

  function videoSlotHtml(ex) {
    const bundled = getBundledVideo(ex.id);
    const videoUrl = getVideoUrl(ex.id);
    const videoPreview = videoUrl
      ? `<p class="video-link-preview">已存連結：<a href="${escapeAttr(videoUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(videoUrl)}</a></p>`
      : "";
    const player = bundled
      ? `<div class="bundled-video">
          <video controls playsinline loop muted poster="${escapeAttr(bundled.poster)}?v=${CACHE}" src="${escapeAttr(bundled.src)}?v=${CACHE}"></video>
          <p class="video-caption">解剖圖解示意短片（非真人）</p>
        </div>`
      : `<div class="video-placeholder">
          <strong>未有內建短片</strong>
          <span>可自備 YouTube／短片網址（本機儲存）。已內建 3 款：啞鈴划船、啞鈴肩推、啞鈴彎舉。</span>
        </div>`;
    return `
      <section class="video-slot">
        <h3>短片位</h3>
        ${player}
        <label class="field" for="videoUrlInput">自備短片網址（可選／額外）</label>
        <div class="video-row">
          <input type="url" id="videoUrlInput" placeholder="https://www.youtube.com/watch?v=…" value="${escapeAttr(videoUrl)}" autocomplete="off" />
          <button type="button" class="btn primary" data-save-video="${ex.id}">儲存</button>
        </div>
        ${videoPreview}
        <p class="video-embed-note">鍵：fitnessCoachLite.videos.v1 · 清空網址再儲存即刪除</p>
      </section>`;
  }

  function isLikelyVideoUrl(url) {
    if (!url) return false;
    try {
      const u = new URL(url);
      return u.protocol === "https:" || u.protocol === "http:";
    } catch (_) {
      return false;
    }
  }

  function uid() {
    return "L" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  function todayStr() {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return y + "-" + m + "-" + day;
  }

  function figureHtml(ex) {
    if (anatomy && anatomy.figureForExercise) return anatomy.figureForExercise(ex);
    return `<div class="card-emoji lg">${ex.emoji || "💪"}</div>`;
  }

  function formSvgs(ex) {
    const kind = (ex && ex.formCue) || "spine";
    if (anatomy && anatomy.formCompare) return anatomy.formCompare(kind);
    return { wrong: "", right: "" };
  }

  /* —— Views —— */
  function showView(name) {
    state.view = name;
    $$(".nav-tabs button").forEach((b) => {
      b.classList.toggle("active", b.dataset.view === name);
    });
    $$(".view").forEach((v) => {
      v.classList.toggle("active", v.id === "view-" + name);
    });
    if (name === "muscles") renderMuscles();
    if (name === "moves") {
      closeDetail();
      renderMoves();
    }
    if (name === "shorts") {
      closeDetail();
      renderShorts();
    }
    if (name === "log") renderLog();
  }

  function renderMuscles() {
    const grid = $("#muscleGrid");
    if (!grid) return;
    grid.innerHTML = data.muscles
      .map((m) => {
        const moves = (m.moves || []).map(byId).filter(Boolean).slice(0, 4);
        const chips = moves
          .map(
            (ex) =>
              `<button type="button" class="mini-chip" data-open-ex="${ex.id}">${ex.emoji} ${ex.name}</button>`
          )
          .join("");
        return `
        <article class="card muscle-card" data-muscle="${m.id}">
          <div class="card-head">
            <span class="card-emoji" aria-hidden="true">${m.emoji}</span>
            <div>
              <h2>${m.name}</h2>
              <p class="muted tiny">主要：${m.targets}</p>
            </div>
          </div>
          <p class="coach-tip"><strong>教練提示：</strong>${m.tip}</p>
          <div class="mini-row">${chips}</div>
          <button type="button" class="btn ghost block" data-goto-moves="${m.id}">睇呢部位全部動作</button>
        </article>`;
      })
      .join("");
  }

  function filteredExercises() {
    let list = data.exercises.slice();
    if (state.categoryFilter) {
      list = list.filter((e) => e.category === state.categoryFilter);
    }
    if (state.muscleFilter) {
      list = list.filter((e) => e.muscles.includes(state.muscleFilter));
    }
    if (state.search) {
      const q = state.search.trim().toLowerCase();
      list = list.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.muscles.some((m) => muscleName(m).includes(q)) ||
          catLabel(e.category).includes(q)
      );
    }
    return list;
  }

  function renderMoves() {
    const grid = $("#moveGrid");
    const count = $("#moveCount");
    if (!grid) return;
    const list = filteredExercises();
    if (count) count.textContent = `共 ${list.length} 個動作`;
    if (!list.length) {
      grid.innerHTML = `<p class="empty">冇符合條件嘅動作，試下清篩選。</p>`;
      return;
    }
    grid.innerHTML = list
      .map((ex) => {
        const tags = ex.muscles.map((m) => `<span class="tag">${muscleName(m)}</span>`).join("");
        return `
        <article class="card move-card" data-ex="${ex.id}">
          <div class="card-head">
            <span class="card-emoji" aria-hidden="true">${ex.emoji}</span>
            <div>
              <h2>${ex.name}</h2>
              <p class="muted tiny"><span class="pill ${ex.category}">${catLabel(ex.category)}</span> ${tags}</p>
            </div>
          </div>
          <p class="muted tiny">${ex.prescription}</p>
          <div class="btn-row">
            <button type="button" class="btn primary" data-open-ex="${ex.id}">教學詳情</button>
            <button type="button" class="btn ghost" data-quick-log="${ex.id}">今日訓練</button>
          </div>
        </article>`;
      })
      .join("");
  }

  function renderShorts() {
    const grid = $("#dayGrid");
    if (!grid) return;
    const days = (data.challenge && data.challenge.days) || [];
    if (!days.length) {
      grid.innerHTML = `<p class="empty">未有挑戰日程。</p>`;
      return;
    }
    grid.innerHTML = days
      .map((d) => {
        const ex = byId(d.exerciseId);
        if (!ex) return "";
        const shortName = ex.name.length > 14 ? ex.name.slice(0, 13) + "…" : ex.name;
        const hasVid = !!getBundledVideo(ex.id);
        return `
        <button type="button" class="day-card" data-open-day="${d.day}" data-open-ex-shorts="${ex.id}" aria-label="第 ${d.day} 日：${ex.name}">
          <span class="day-badge">DAY ${d.day}</span>
          ${hasVid ? `<span class="vid-badge">有短片</span>` : ""}
          <div class="day-fig">${figureHtml(ex)}</div>
          <div class="day-name">${shortName}</div>
        </button>`;
      })
      .join("");
  }

  function openDetail(id, fromShorts) {
    const ex = byId(id);
    const panel = $("#detailPanel");
    const body = $("#detailBody");
    if (!ex || !panel || !body) return;
    state.detailId = id;
    state.detailFromShorts = !!fromShorts;
    panel.classList.toggle("shorts-mode", !!fromShorts);
    const toolbar = $("#detailToolbarLabel");
    if (toolbar) toolbar.textContent = fromShorts ? "短片教學詳情" : "動作教學";

    const tags = ex.muscles.map((m) => `<span class="tag">${muscleName(m)}</span>`).join("");
    const steps = ex.steps.map((s, i) => `<li><span class="step-n">${i + 1}</span>${s}</li>`).join("");
    const mistakes = ex.mistakes.map((s) => `<li>${s}</li>`).join("");
    const badge = ex.muscleBadge || muscleName(ex.muscles[0] || "");
    const forms = formSvgs(ex);
    const wrongCue = ex.wrongCue || "姿勢變形";
    const rightCue = ex.rightCue || "保持中立穩定";
    const shortsBlocks = `
      <div class="muscle-banner">
        <div class="mb-icon">${figureHtml(ex)}</div>
        <div>
          <div class="mb-label">${escapeHtml(badge)}</div>
          <p class="mb-sub">${escapeHtml(ex.name)} · <span class="pill ${ex.category}">${catLabel(ex.category)}</span></p>
        </div>
      </div>

      <div class="form-split" aria-label="錯誤與正確對比">
        <div class="form-panel wrong">
          <span class="form-badge" aria-label="錯誤">✕</span>
          <div class="form-fig">${forms.wrong}</div>
          <div class="form-cue">${escapeHtml(wrongCue)}</div>
        </div>
        <div class="form-panel right">
          <span class="form-badge" aria-label="正確">✓</span>
          <div class="form-fig">${forms.right}</div>
          <div class="form-cue">${escapeHtml(rightCue)}</div>
        </div>
      </div>

      <div class="demo-split" aria-label="肌群與組數">
        <div class="demo-left">${figureHtml(ex)}</div>
        <div class="demo-right">
          <div class="rx">${escapeHtml(ex.prescription)}</div>
          <p class="rx-sub">目標：${ex.muscles.map(muscleName).join("、")}</p>
          <p class="rx-sub">示意解剖高亮 · 非醫學圖</p>
        </div>
      </div>

      ${videoSlotHtml(ex)}
    `;

    const basicHero = fromShorts
      ? ""
      : `
      <div class="detail-hero">
        <span class="card-emoji lg" aria-hidden="true">${ex.emoji}</span>
        <div>
          <h2 id="detailTitle">${ex.name}</h2>
          <p class="muted"><span class="pill ${ex.category}">${catLabel(ex.category)}</span> ${tags}</p>
        </div>
      </div>`;

    // When from shorts, title is in banner; still need id for a11y
    const titleHidden = fromShorts ? `<h2 id="detailTitle" class="visually-hidden" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);">${escapeHtml(ex.name)}</h2>` : "";

    body.innerHTML = `
      ${titleHidden}
      ${fromShorts ? shortsBlocks : basicHero}
      ${!fromShorts ? `
      <div class="form-split" aria-label="錯誤與正確對比">
        <div class="form-panel wrong">
          <span class="form-badge" aria-label="錯誤">✕</span>
          <div class="form-fig">${forms.wrong}</div>
          <div class="form-cue">${escapeHtml(wrongCue)}</div>
        </div>
        <div class="form-panel right">
          <span class="form-badge" aria-label="正確">✓</span>
          <div class="form-fig">${forms.right}</div>
          <div class="form-cue">${escapeHtml(rightCue)}</div>
        </div>
      </div>` : ""}
      <section class="detail-block">
        <h3>步驟</h3>
        <ol class="step-list">${steps}</ol>
      </section>
      <section class="detail-block">
        <h3>常見錯誤</h3>
        <ul class="plain-list warn">${mistakes}</ul>
      </section>
      <section class="detail-block">
        <h3>建議組數（新手參考）</h3>
        <p>${ex.prescription}</p>
      </section>
      <section class="detail-block">
        <h3>安全提示</h3>
        <p>${ex.safety}</p>
      </section>
      ${!fromShorts ? videoSlotHtml(ex) : ""}
      <button type="button" class="btn primary block" data-quick-log="${ex.id}">加入今日訓練記錄</button>
      <p class="muted tiny center">示意教學 · 非醫療建議 · 請咨詢專業教練</p>
    `;
    panel.classList.add("open");
    panel.setAttribute("aria-hidden", "false");
    const bd = $("#detailBackdrop");
    if (bd) {
      bd.classList.add("open");
      bd.setAttribute("aria-hidden", "false");
    }
    document.body.classList.add("detail-open");
  }

  function closeDetail() {
    state.detailId = null;
    state.detailFromShorts = false;
    const panel = $("#detailPanel");
    if (panel) {
      panel.classList.remove("open", "shorts-mode");
      panel.setAttribute("aria-hidden", "true");
    }
    const bd = $("#detailBackdrop");
    if (bd) {
      bd.classList.remove("open");
      bd.setAttribute("aria-hidden", "true");
    }
    document.body.classList.remove("detail-open");
  }

  function openQuickLog(exerciseId) {
    const ex = byId(exerciseId);
    const modal = $("#logModal");
    if (!ex || !modal) return;
    $("#logExId").value = ex.id;
    $("#logExName").textContent = ex.name;
    $("#logDate").value = todayStr();
    $("#logWeight").value = "";
    $("#logReps").value = "10";
    $("#logSets").value = "3";
    $("#logNotes").value = "";
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  }

  function closeQuickLog() {
    const modal = $("#logModal");
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  }

  function submitQuickLog(ev) {
    ev.preventDefault();
    const id = $("#logExId").value;
    const ex = byId(id);
    if (!ex) return;
    const entry = {
      id: uid(),
      date: $("#logDate").value || todayStr(),
      exerciseId: ex.id,
      exerciseName: ex.name,
      muscles: ex.muscles.slice(),
      category: ex.category,
      sets: Number($("#logSets").value) || 1,
      reps: Number($("#logReps").value) || 0,
      weightKg: $("#logWeight").value === "" ? null : Number($("#logWeight").value),
      notes: ($("#logNotes").value || "").trim(),
      createdAt: new Date().toISOString()
    };
    const logs = loadLogs();
    logs.unshift(entry);
    saveLogs(logs);
    closeQuickLog();
    toast("已記錄：\u00a0" + ex.name);
    if (state.view === "log") renderLog();
  }

  function deleteLog(id) {
    const logs = loadLogs().filter((x) => x.id !== id);
    saveLogs(logs);
    renderLog();
    toast("已刪除記錄");
  }

  function renderLog() {
    const listEl = $("#logList");
    const summary = $("#logSummary");
    if (!listEl) return;
    let logs = loadLogs();
    if (state.logFilterDate) {
      logs = logs.filter((l) => l.date === state.logFilterDate);
    }
    if (state.logFilterMuscle) {
      logs = logs.filter((l) => (l.muscles || []).includes(state.logFilterMuscle));
    }
    if (summary) {
      const all = loadLogs();
      summary.textContent = `本機共 ${all.length} 筆 · 目前顯示 ${logs.length} 筆`;
    }
    if (!logs.length) {
      listEl.innerHTML = `<p class="empty">未有訓練記錄。去「儀器／動作」或「短片教學」撳「今日訓練」即可新增。</p>`;
      return;
    }
    listEl.innerHTML = logs
      .map((l) => {
        const w =
          l.weightKg == null || Number.isNaN(l.weightKg)
            ? "自體／未填重量"
            : l.weightKg + " kg";
        const tags = (l.muscles || [])
          .map((m) => `<span class="tag">${muscleName(m)}</span>`)
          .join("");
        return `
        <article class="card log-card">
          <div class="log-top">
            <div>
              <h3>${l.exerciseName}</h3>
              <p class="muted tiny">${l.date} · <span class="pill ${l.category}">${catLabel(l.category)}</span> ${tags}</p>
            </div>
            <button type="button" class="icon-btn" data-del-log="${l.id}" aria-label="刪除記錄">🗑</button>
          </div>
          <p class="log-sets"><strong>${l.sets}</strong> 組 × <strong>${l.reps}</strong> 次 · ${w}</p>
          ${l.notes ? `<p class="muted tiny">備註：${escapeHtml(l.notes)}</p>` : ""}
        </article>`;
      })
      .join("");
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function escapeAttr(s) {
    return escapeHtml(s).replace(/'/g, "&#39;");
  }

  let toastTimer = null;
  function toast(msg) {
    let el = $("#toast");
    if (!el) {
      el = document.createElement("div");
      el.id = "toast";
      el.className = "toast";
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2200);
  }

  function bindFilters() {
    const cat = $("#categoryFilter");
    const mus = $("#muscleFilter");
    const search = $("#moveSearch");
    if (cat) {
      cat.innerHTML =
        `<option value="">全部類別</option>` +
        `<option value="gym">健身房器械</option>` +
        `<option value="home">家用／徒手／啞鈴</option>`;
      cat.addEventListener("change", () => {
        state.categoryFilter = cat.value;
        renderMoves();
      });
    }
    if (mus) {
      mus.innerHTML =
        `<option value="">全部部位</option>` +
        data.muscles.map((m) => `<option value="${m.id}">${m.name}</option>`).join("");
      mus.addEventListener("change", () => {
        state.muscleFilter = mus.value;
        renderMoves();
      });
    }
    if (search) {
      search.addEventListener("input", () => {
        state.search = search.value;
        renderMoves();
      });
    }

    const logDate = $("#logFilterDate");
    const logMus = $("#logFilterMuscle");
    if (logDate) {
      logDate.addEventListener("change", () => {
        state.logFilterDate = logDate.value;
        renderLog();
      });
    }
    if (logMus) {
      logMus.innerHTML =
        `<option value="">全部部位</option>` +
        data.muscles.map((m) => `<option value="${m.id}">${m.name}</option>`).join("");
      logMus.addEventListener("change", () => {
        state.logFilterMuscle = logMus.value;
        renderLog();
      });
    }
  }

  function onClick(ev) {
    const t = ev.target.closest("[data-view]");
    if (t && t.matches(".nav-tabs button")) {
      showView(t.dataset.view);
      return;
    }
    const openShorts = ev.target.closest("[data-open-ex-shorts]");
    if (openShorts) {
      openDetail(openShorts.dataset.openExShorts, true);
      return;
    }
    const openEx = ev.target.closest("[data-open-ex]");
    if (openEx) {
      openDetail(openEx.dataset.openEx, false);
      return;
    }
    const goto = ev.target.closest("[data-goto-moves]");
    if (goto) {
      state.muscleFilter = goto.dataset.gotoMoves;
      const mus = $("#muscleFilter");
      if (mus) mus.value = state.muscleFilter;
      showView("moves");
      return;
    }
    const quick = ev.target.closest("[data-quick-log]");
    if (quick) {
      openQuickLog(quick.dataset.quickLog);
      return;
    }
    const saveVid = ev.target.closest("[data-save-video]");
    if (saveVid) {
      const id = saveVid.dataset.saveVideo;
      const input = $("#videoUrlInput");
      const url = input ? input.value.trim() : "";
      if (url && !isLikelyVideoUrl(url)) {
        toast("請輸入有效網址（http／https）");
        return;
      }
      setVideoUrl(id, url);
      toast(url ? "已儲存短片連結" : "已清除短片連結");
      openDetail(id, state.detailFromShorts);
      return;
    }
    const del = ev.target.closest("[data-del-log]");
    if (del) {
      if (confirm("確定刪除呢筆訓練記錄？")) deleteLog(del.dataset.delLog);
      return;
    }
    if (ev.target.closest("[data-close-detail]")) {
      closeDetail();
      return;
    }
    if (ev.target.closest("[data-close-log-modal]")) {
      closeQuickLog();
      return;
    }
    if (ev.target.id === "clearLogFilters") {
      state.logFilterDate = "";
      state.logFilterMuscle = "";
      const ld = $("#logFilterDate");
      const lm = $("#logFilterMuscle");
      if (ld) ld.value = "";
      if (lm) lm.value = "";
      renderLog();
    }
  }

  function initStats() {
    const gym = data.exercises.filter((e) => e.category === "gym").length;
    const home = data.exercises.filter((e) => e.category === "home").length;
    const days = (data.challenge && data.challenge.days && data.challenge.days.length) || 0;
    const el = $("#aboutStats");
    if (el) {
      const vids = Object.keys(BUNDLED_VIDEOS).length;
      el.textContent = `而家收錄：健身房器械 ${gym} 款 · 家用／徒手／啞鈴 ${home} 款 · 部位 ${data.muscles.length} 個 · 挑戰 ${days} 日 · 內建解剖短片 ${vids} 款`;
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    bindFilters();
    document.addEventListener("click", onClick);
    const form = $("#logForm");
    if (form) form.addEventListener("submit", submitQuickLog);
    const backdrop = $("#detailBackdrop");
    if (backdrop) backdrop.addEventListener("click", closeDetail);
    const logModal = $("#logModal");
    if (logModal) {
      logModal.addEventListener("click", (e) => {
        if (e.target === logModal) closeQuickLog();
      });
    }
    initStats();
    showView("muscles");
  });
})();
