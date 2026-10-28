/* 健身教練 Lite — UI／記錄 */
(function () {
  "use strict";

  const STORAGE_KEY = "fitnessCoachLite.logs.v1";
  const data = window.FITNESS_DATA;
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
    if (name === "log") renderLog();
  }

  function renderMuscles() {
    const grid = $("#muscleGrid");
    if (!grid) return;
    grid.innerHTML = data.muscles
      .map((m) => {
        const moves = (m.moves || [])
          .map(byId)
          .filter(Boolean)
          .slice(0, 4);
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

  function openDetail(id) {
    const ex = byId(id);
    const panel = $("#detailPanel");
    const body = $("#detailBody");
    if (!ex || !panel || !body) return;
    state.detailId = id;
    const tags = ex.muscles.map((m) => `<span class="tag">${muscleName(m)}</span>`).join("");
    const steps = ex.steps.map((s, i) => `<li><span class="step-n">${i + 1}</span>${s}</li>`).join("");
    const mistakes = ex.mistakes.map((s) => `<li>${s}</li>`).join("");
    body.innerHTML = `
      <div class="detail-hero">
        <span class="card-emoji lg" aria-hidden="true">${ex.emoji}</span>
        <div>
          <h2 id="detailTitle">${ex.name}</h2>
          <p class="muted"><span class="pill ${ex.category}">${catLabel(ex.category)}</span> ${tags}</p>
        </div>
      </div>
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
      <button type="button" class="btn primary block" data-quick-log="${ex.id}">加入今日訓練記錄</button>
      <p class="muted tiny center">示意教學 · 非醫療建議 · 請咨詢專業教練</p>
    `;
    panel.classList.add("open");
    panel.setAttribute("aria-hidden", "false");
    const bd = $("#detailBackdrop");
    if (bd) { bd.classList.add("open"); bd.setAttribute("aria-hidden", "false"); }
    document.body.classList.add("detail-open");
  }

  function closeDetail() {
    state.detailId = null;
    const panel = $("#detailPanel");
    if (panel) {
      panel.classList.remove("open");
      panel.setAttribute("aria-hidden", "true");
    }
    const bd = $("#detailBackdrop");
    if (bd) { bd.classList.remove("open"); bd.setAttribute("aria-hidden", "true"); }
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
      listEl.innerHTML = `<p class="empty">未有訓練記錄。去「儀器／動作」撳「今日訓練」即可新增。</p>`;
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
    const openEx = ev.target.closest("[data-open-ex]");
    if (openEx) {
      openDetail(openEx.dataset.openEx);
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
    const el = $("#aboutStats");
    if (el) {
      el.textContent = `而家收錄：健身房器械 ${gym} 款 · 家用／徒手／啞鈴 ${home} 款 · 部位 ${data.muscles.length} 個`;
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
