/* 健身教練 Lite — UI／記錄／短片教學 */
(function () {
  "use strict";

  const LEGACY_LOG_KEY = "fitnessCoachLite.logs.v1";
  const VIDEO_KEY = "fitnessCoachLite.videos.v1";
  const USERS_KEY = "fitnessCoachLite.users.v1";
  const SESSION_KEY = "fitnessCoachLite.session.v1";
  const CACHE = "20261029g";
  const PREFS_KEY = "fitnessCoachLite.prefs.v1";
  const GOALS_KEY_PREFIX = "fitnessCoachLite.goals.v1.";
  const BUNDLED_VIDEOS = {
    "db-row": { src: "assets/videos/db-row.mp4", poster: "assets/videos/db-row.jpg" },
    "db-shoulder-press": { src: "assets/videos/db-shoulder-press.mp4", poster: "assets/videos/db-shoulder-press.jpg" },
    "db-curl": { src: "assets/videos/db-curl.mp4", poster: "assets/videos/db-curl.jpg" },
    "pushup": { src: "assets/videos/pushup.mp4", poster: "assets/videos/pushup.jpg" },
    "bw-squat": { src: "assets/videos/bw-squat.mp4", poster: "assets/videos/bw-squat.jpg" },
    "plank": { src: "assets/videos/plank.mp4", poster: "assets/videos/plank.jpg" },
    "lat-pulldown": { src: "assets/videos/lat-pulldown.mp4", poster: "assets/videos/lat-pulldown.jpg" },
    "pec-deck": { src: "assets/videos/pec-deck.mp4", poster: "assets/videos/pec-deck.jpg" },
    "glute-bridge": { src: "assets/videos/glute-bridge.mp4", poster: "assets/videos/glute-bridge.jpg" },
    "leg-press": { src: "assets/videos/leg-press.mp4", poster: "assets/videos/leg-press.jpg" },
    "smith-squat": { src: "assets/videos/smith-squat.mp4", poster: "assets/videos/smith-squat.jpg" },
    "lunge": { src: "assets/videos/lunge.mp4", poster: "assets/videos/lunge.jpg" },
    "seated-row": { src: "assets/videos/seated-row.mp4", poster: "assets/videos/seated-row.jpg" },
    "face-pull": { src: "assets/videos/face-pull.mp4", poster: "assets/videos/face-pull.jpg" },
    "triceps-pushdown": { src: "assets/videos/triceps-pushdown.mp4", poster: "assets/videos/triceps-pushdown.jpg" },
    "smith-bench": { src: "assets/videos/smith-bench.mp4", poster: "assets/videos/smith-bench.jpg" },
    "shoulder-press-machine": { src: "assets/videos/shoulder-press-machine.mp4", poster: "assets/videos/shoulder-press-machine.jpg" },
    "dumbbell-press-home": { src: "assets/videos/dumbbell-press-home.mp4", poster: "assets/videos/dumbbell-press-home.jpg" },
    "dual-pedal-press": { src: "assets/videos/dual-pedal-press.mp4", poster: "assets/videos/dual-pedal-press.jpg" },
    "leg-extension": { src: "assets/videos/leg-extension.mp4", poster: "assets/videos/leg-extension.jpg" },
    "chest-press-machine": { src: "assets/videos/chest-press-machine.mp4", poster: "assets/videos/chest-press-machine.jpg" },
    "hack-squat": { src: "assets/videos/hack-squat.mp4", poster: "assets/videos/hack-squat.jpg" },
    "vertical-leg-press": { src: "assets/videos/vertical-leg-press.mp4", poster: "assets/videos/vertical-leg-press.jpg" },
    "leg-curl": { src: "assets/videos/leg-curl.mp4", poster: "assets/videos/leg-curl.jpg" },
    "hanging-leg-raise": { src: "assets/videos/hanging-leg-raise.mp4", poster: "assets/videos/hanging-leg-raise.jpg" },
    "ab-crunch-machine": { src: "assets/videos/ab-crunch-machine.mp4", poster: "assets/videos/ab-crunch-machine.jpg" },
    "lateral-raise-machine": { src: "assets/videos/lateral-raise-machine.mp4", poster: "assets/videos/lateral-raise-machine.jpg" },
    "assisted-pullup": { src: "assets/videos/assisted-pullup.mp4", poster: "assets/videos/assisted-pullup.jpg" },
    "straight-arm-pulldown": { src: "assets/videos/straight-arm-pulldown.mp4", poster: "assets/videos/straight-arm-pulldown.jpg" },
    "incline-chest-press": { src: "assets/videos/incline-chest-press.mp4", poster: "assets/videos/incline-chest-press.jpg" },
    "treadmill": { src: "assets/videos/treadmill.mp4", poster: "assets/videos/treadmill.jpg" },
    "elliptical": { src: "assets/videos/elliptical.mp4", poster: "assets/videos/elliptical.jpg" },
    "upright-bike": { src: "assets/videos/upright-bike.mp4", poster: "assets/videos/upright-bike.jpg" },
    "recumbent-bike": { src: "assets/videos/recumbent-bike.mp4", poster: "assets/videos/recumbent-bike.jpg" },
    "stair-climber": { src: "assets/videos/stair-climber.mp4", poster: "assets/videos/stair-climber.jpg" },
    "pilates-hundred": { src: "assets/videos/pilates-hundred.mp4", poster: "assets/videos/pilates-hundred.jpg", posterFemale: "assets/videos/pilates-hundred-f.jpg" },
    "pilates-roll-up": { src: "assets/videos/pilates-roll-up.mp4", poster: "assets/videos/pilates-roll-up.jpg", posterFemale: "assets/videos/pilates-roll-up-f.jpg" },
    "pilates-single-leg-stretch": { src: "assets/videos/pilates-single-leg-stretch.mp4", poster: "assets/videos/pilates-single-leg-stretch.jpg", posterFemale: "assets/videos/pilates-single-leg-stretch-f.jpg" },
    "pilates-swan": { src: "assets/videos/pilates-swan.mp4", poster: "assets/videos/pilates-swan.jpg", posterFemale: "assets/videos/pilates-swan-f.jpg" },
    "pilates-side-kick": { src: "assets/videos/pilates-side-kick.mp4", poster: "assets/videos/pilates-side-kick.jpg", posterFemale: "assets/videos/pilates-side-kick-f.jpg" },
    "pilates-bridge": { src: "assets/videos/pilates-bridge.mp4", poster: "assets/videos/pilates-bridge.jpg", posterFemale: "assets/videos/pilates-bridge-f.jpg" },
    "reformer-footwork": { src: "assets/videos/reformer-footwork.mp4", poster: "assets/videos/reformer-footwork.jpg", posterFemale: "assets/videos/reformer-footwork-f.jpg" },
    "reformer-leg-circles": { src: "assets/videos/reformer-leg-circles.mp4", poster: "assets/videos/reformer-leg-circles.jpg", posterFemale: "assets/videos/reformer-leg-circles-f.jpg" },
    "reformer-elephant": { src: "assets/videos/reformer-elephant.mp4", poster: "assets/videos/reformer-elephant.jpg", posterFemale: "assets/videos/reformer-elephant-f.jpg" },
    "reformer-arms-pulling": { src: "assets/videos/reformer-arms-pulling.mp4", poster: "assets/videos/reformer-arms-pulling.jpg", posterFemale: "assets/videos/reformer-arms-pulling-f.jpg" },
    "reformer-knee-stretches": { src: "assets/videos/reformer-knee-stretches.mp4", poster: "assets/videos/reformer-knee-stretches.jpg", posterFemale: "assets/videos/reformer-knee-stretches-f.jpg" }
  };
  const data = window.FITNESS_DATA;
  const anatomy = window.FITNESS_ANATOMY;
  const muscleMap = window.FITNESS_MUSCLE_MAP;
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
    logFilterDate: "",
    goalQuery: "",
    tipIndex: 0,
    catalogMode: "all",
    catalogCategory: "",
    bodymapSide: "front",
    bodymapFrame: 0,
    bodymapRegion: null,
    visualGender: "neutral",
    lastGoalCalc: null,
    selectedMealId: null
  };

  const GOAL_CHIPS = [
    { id: "chest", label: "胸" },
    { id: "back", label: "背" },
    { id: "shoulders", label: "肩" },
    { id: "arms", label: "手臂" },
    { id: "legs", label: "腿" },
    { id: "core", label: "核心" },
    { id: "glutes", label: "臀" },
    { id: "cardio", label: "有氧" },
    { id: "pilates", label: "普拉提 · 女士" },
    { id: "full", label: "全身" }
  ];

  const FULL_BODY_PICKS = {
    push: ["pushup", "smith-bench", "chest-press-machine", "incline-chest-press", "dumbbell-press-home"],
    pull: ["seated-row", "db-row", "lat-pulldown", "assisted-pullup", "straight-arm-pulldown"],
    legs: ["bw-squat", "smith-squat", "hack-squat", "leg-press", "vertical-leg-press", "dual-pedal-press", "leg-extension", "leg-curl"],
    core: ["plank", "hanging-leg-raise", "ab-crunch-machine", "glute-bridge"],
    cardio: ["treadmill", "elliptical", "upright-bike"],
    pilates: ["pilates-hundred", "pilates-bridge", "reformer-footwork"]
  };

  function byId(id) {
    return data.exercises.find((e) => e.id === id);
  }

  function muscleName(id) {
    const m = data.muscles.find((x) => x.id === id);
    return m ? m.name : id;
  }

  function catLabel(c) {
    if (c === "gym") return "健身房";
    if (c === "cardio") return "有氧";
    if (c === "pilates") return "普拉提";
    return "家用";
  }

  /* —— Prefs (visual gender) —— */
  function loadPrefs() {
    try {
      const raw = localStorage.getItem(PREFS_KEY);
      if (!raw) return { visualGender: "neutral" };
      const o = JSON.parse(raw);
      const g = o && o.visualGender;
      if (g === "female" || g === "male" || g === "neutral") return { visualGender: g };
    } catch (e) {}
    return { visualGender: "neutral" };
  }
  function savePrefs(prefs) {
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs || { visualGender: state.visualGender }));
  }
  function getVisualGender() {
    return state.visualGender === "female" || state.visualGender === "male"
      ? state.visualGender
      : "neutral";
  }
  function setVisualGender(g) {
    if (g !== "female" && g !== "male" && g !== "neutral") g = "neutral";
    state.visualGender = g;
    savePrefs({ visualGender: g });
    syncGenderChips();
    if (state.view === "bodymap") renderBodyMap();
    if (state.view === "shorts") renderShorts();
    if (state.view === "moves") renderMoves();
    if (state.detailId) openDetail(state.detailId, state.detailFromShorts);
    toast(g === "female" ? "已切換女圖" : g === "male" ? "已切換男圖" : "已切換通用圖");
  }
  function syncGenderChips() {
    $$("[data-visual-gender]").forEach((b) => {
      const on = b.dataset.visualGender === state.visualGender;
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  function resolvePoster(bundled) {
    if (!bundled) return { src: "", isFallback: true };
    const g = getVisualGender();
    if (g === "female" && bundled.posterFemale) {
      return { src: bundled.posterFemale, isFallback: false };
    }
    if (g === "male" && bundled.posterMale) {
      return { src: bundled.posterMale, isFallback: false };
    }
    const wantSpecific = g === "female" || g === "male";
    const hasSpecific = g === "female" ? !!bundled.posterFemale : g === "male" ? !!bundled.posterMale : true;
    return { src: bundled.poster, isFallback: wantSpecific ? !hasSpecific : false };
  }

  function bodyMapFrames() {
    if (!muscleMap) return [];
    const g = getVisualGender();
    if (muscleMap.getFrames) {
      return muscleMap.getFrames(g === "female" ? "female" : "male");
    }
    return muscleMap.FRAMES || [];
  }

  /* —— Goals / nutrition snapshots —— */
  function goalsStorageKey() {
    const u = currentUser();
    return GOALS_KEY_PREFIX + (u ? u.username : "guest");
  }
  function loadGoalSnapshots() {
    try {
      const raw = localStorage.getItem(goalsStorageKey());
      const list = raw ? JSON.parse(raw) : [];
      return Array.isArray(list) ? list : [];
    } catch (e) {
      return [];
    }
  }
  function saveGoalSnapshots(list) {
    localStorage.setItem(goalsStorageKey(), JSON.stringify(list || []));
  }
  function calcMifflin(sex, age, heightCm, weightKg, activity) {
    const w = Number(weightKg);
    const h = Number(heightCm);
    const a = Number(age);
    const act = Number(activity) || 1.375;
    let bmr =
      sex === "male"
        ? 10 * w + 6.25 * h - 5 * a + 5
        : 10 * w + 6.25 * h - 5 * a - 161;
    bmr = Math.round(bmr);
    const tdee = Math.round(bmr * act);
    return { bmr, tdee, activity: act };
  }
  function calorieRangeForTarget(tdee, target) {
    if (target === "fatLoss") {
      return { low: tdee - 500, high: tdee - 300, label: "減脂約 TDEE−300～500" };
    }
    if (target === "muscleGain") {
      return { low: tdee + 200, high: tdee + 300, label: "增肌約 TDEE＋200～300" };
    }
    return { low: tdee - 100, high: tdee + 100, label: "維持約接近 TDEE" };
  }
  function mealPlansFor(target) {
    const plans = data.mealPlans || {};
    if (target === "fatLoss") return plans.fatLoss || [];
    if (target === "muscleGain") return plans.muscleGain || [];
    return plans.maintain || [];
  }
  function suggestMovesForGoal(target, sex) {
    if (target === "fatLoss") {
      const ids =
        sex === "female"
          ? ["treadmill", "elliptical", "pilates-hundred", "pilates-bridge", "reformer-footwork", "bw-squat"]
          : ["treadmill", "elliptical", "bw-squat", "pushup", "plank", "stair-climber"];
      return ids.map(byId).filter(Boolean);
    }
    if (target === "muscleGain") {
      return ["smith-bench", "seated-row", "smith-squat", "lat-pulldown", "db-shoulder-press", "glute-bridge"]
        .map(byId)
        .filter(Boolean);
    }
    return ["bw-squat", "pushup", "plank", "pilates-hundred"].map(byId).filter(Boolean);
  }

  /* —— Auth (local multi-account) —— */
  function toHex(buffer) {
    const bytes = new Uint8Array(buffer);
    let out = "";
    for (let i = 0; i < bytes.length; i++) {
      out += bytes[i].toString(16).padStart(2, "0");
    }
    return out;
  }

  async function sha256Hex(str) {
    const data = new TextEncoder().encode(String(str));
    const digest = await crypto.subtle.digest("SHA-256", data);
    return toHex(digest);
  }

  function randomSalt() {
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    return toHex(bytes);
  }

  async function hashPassword(salt, password) {
    return sha256Hex(String(salt) + String(password));
  }

  function loadUsers() {
    try {
      const raw = localStorage.getItem(USERS_KEY);
      if (!raw) return {};
      const obj = JSON.parse(raw);
      return obj && typeof obj === "object" ? obj : {};
    } catch (_) {
      return {};
    }
  }

  function saveUsers(map) {
    localStorage.setItem(USERS_KEY, JSON.stringify(map));
  }

  function normalizeUsername(raw) {
    return String(raw || "").trim().toLowerCase();
  }

  function validateUsername(raw) {
    const u = String(raw || "").trim();
    if (u.length < 2 || u.length > 20) return "用戶名要 2–20 個字";
    if (!/^[A-Za-z0-9_一-鿿㐀-䶿]+$/.test(u)) {
      return "用戶名只可以用英文字母、數字、底線或中文";
    }
    return "";
  }

  function getSession() {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (!raw) return null;
      const obj = JSON.parse(raw);
      if (!obj || typeof obj.username !== "string") return null;
      const key = normalizeUsername(obj.username);
      const users = loadUsers();
      if (!users[key]) return null;
      return { username: key };
    } catch (_) {
      return null;
    }
  }

  function setSession(username) {
    if (!username) {
      localStorage.removeItem(SESSION_KEY);
      return;
    }
    localStorage.setItem(SESSION_KEY, JSON.stringify({ username: normalizeUsername(username) }));
  }

  function currentUser() {
    const sess = getSession();
    if (!sess) return null;
    const users = loadUsers();
    return users[sess.username] || null;
  }

  function isLoggedIn() {
    return !!currentUser();
  }

  function userLogKey(username) {
    return LEGACY_LOG_KEY + "." + normalizeUsername(username);
  }

  function loadLegacyLogs() {
    try {
      const raw = localStorage.getItem(LEGACY_LOG_KEY);
      if (!raw) return [];
      const arr = JSON.parse(raw);
      return Array.isArray(arr) ? arr : [];
    } catch (_) {
      return [];
    }
  }

  function loadLogs() {
    const user = currentUser();
    if (!user) return [];
    try {
      const raw = localStorage.getItem(userLogKey(user.username));
      if (!raw) return [];
      const arr = JSON.parse(raw);
      return Array.isArray(arr) ? arr : [];
    } catch (_) {
      return [];
    }
  }

  function saveLogs(logs) {
    const user = currentUser();
    if (!user) return;
    localStorage.setItem(userLogKey(user.username), JSON.stringify(logs));
  }

  async function registerUser(usernameRaw, password, displayName) {
    const err = validateUsername(usernameRaw);
    if (err) return { ok: false, error: err };
    const key = normalizeUsername(usernameRaw);
    if (password.length < 4) return { ok: false, error: "密碼至少 4 個字" };
    const users = loadUsers();
    if (users[key]) return { ok: false, error: "呢個用戶名已經有人用" };
    const salt = randomSalt();
    const passHash = await hashPassword(salt, password);
    const display = String(displayName || "").trim() || String(usernameRaw).trim();
    users[key] = {
      username: key,
      displayName: display,
      passHash: passHash,
      salt: salt,
      createdAt: new Date().toISOString()
    };
    saveUsers(users);
    if (!localStorage.getItem(userLogKey(key))) {
      localStorage.setItem(userLogKey(key), "[]");
    }
    setSession(key);
    return { ok: true, user: users[key] };
  }

  async function loginUser(usernameRaw, password) {
    const key = normalizeUsername(usernameRaw);
    if (!key) return { ok: false, error: "請輸入用戶名" };
    if (!password) return { ok: false, error: "請輸入密碼" };
    const users = loadUsers();
    const user = users[key];
    if (!user) return { ok: false, error: "用戶名或密碼唔正確" };
    const hash = await hashPassword(user.salt, password);
    if (hash !== user.passHash) return { ok: false, error: "用戶名或密碼唔正確" };
    setSession(key);
    return { ok: true, user: user };
  }

  function logoutUser() {
    setSession(null);
  }

  function migrateLegacyIntoCurrent() {
    const user = currentUser();
    if (!user) return { ok: false, error: "未登入" };
    const legacy = loadLegacyLogs();
    if (!legacy.length) return { ok: false, error: "冇舊記錄" };
    const existing = loadLogs();
    const merged = legacy.concat(existing);
    saveLogs(merged);
    localStorage.removeItem(LEGACY_LOG_KEY);
    return { ok: true, count: legacy.length };
  }

  function updateAccountChip() {
    const chip = $("#accountChip");
    if (!chip) return;
    const user = currentUser();
    if (!user) {
      chip.innerHTML = `<button type="button" class="btn ghost account-btn" id="authOpenBtn" data-open-auth>登入／註冊</button>`;
      updateHeroCta();
      return;
    }
    const name = escapeHtml(user.displayName || user.username);
    chip.innerHTML = `
      <span class="account-name" title="${name}">${name}</span>
      <button type="button" class="btn ghost account-btn" id="logoutBtn" data-logout>登出</button>`;
    updateHeroCta();
  }

  function updateHeroCta() {
    const row = $("#heroCtaRow");
    if (!row) return;
    const pilatesBtn = `<button type="button" class="btn pilates-cta" data-open-pilates>女士 · 普拉提</button>`;
    const mapBtn = `<button type="button" class="btn ghost" data-view-jump="bodymap">全身肌肉圖</button>`;
    if (isLoggedIn()) {
      row.innerHTML = `
        <button type="button" class="btn primary" data-view-jump="log">去記今日訓練</button>
        ${pilatesBtn}
        ${mapBtn}
        <button type="button" class="btn ghost" data-view-jump="goals">目標／營養</button>`;
    } else {
      row.innerHTML = `
        <button type="button" class="btn primary" data-open-auth data-auth-tab="register">註冊／登入</button>
        ${pilatesBtn}
        ${mapBtn}
        <button type="button" class="btn ghost" data-view-jump="goals">目標／營養</button>`;
    }
  }

  function openPilatesCatalog() {
    state.catalogMode = "all";
    state.catalogCategory = "pilates";
    showView("shorts");
    const grid = $("#dayGrid");
    if (grid) grid.scrollIntoView({ behavior: "smooth", block: "start" });
    toast("已篩選：普拉提 · 女士");
  }

  function setAuthError(id, msg) {
    const el = $(id);
    if (!el) return;
    if (!msg) {
      el.hidden = true;
      el.textContent = "";
      return;
    }
    el.hidden = false;
    el.textContent = msg;
  }

  function openAuthModal(tab) {
    const modal = $("#authModal");
    if (!modal) return;
    switchAuthTab(tab === "register" ? "register" : "login");
    setAuthError("#loginError", "");
    setAuthError("#regError", "");
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    const focusId = tab === "register" ? "#regUser" : "#loginUser";
    const focusEl = $(focusId);
    if (focusEl) setTimeout(() => focusEl.focus(), 50);
  }

  function closeAuthModal() {
    const modal = $("#authModal");
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  }

  function switchAuthTab(tab) {
    $$("[data-auth-tab-btn]").forEach((b) => {
      const on = b.dataset.authTabBtn === tab;
      b.classList.toggle("active", on);
      b.setAttribute("aria-selected", on ? "true" : "false");
    });
    $$("[data-auth-pane]").forEach((p) => {
      const on = p.dataset.authPane === tab;
      p.hidden = !on;
    });
    const title = $("#authModalTitle");
    if (title) title.textContent = tab === "register" ? "開帳戶" : "歡迎返嚟";
  }

  async function onLoginSubmit(ev) {
    ev.preventDefault();
    setAuthError("#loginError", "");
    const user = ($("#loginUser") && $("#loginUser").value) || "";
    const pass = ($("#loginPass") && $("#loginPass").value) || "";
    const res = await loginUser(user, pass);
    if (!res.ok) {
      setAuthError("#loginError", res.error);
      return;
    }
    if ($("#loginPass")) $("#loginPass").value = "";
    closeAuthModal();
    updateAccountChip();
    toast("歡迎返嚟，" + (res.user.displayName || res.user.username));
    if (state.view === "log") renderLog();
    if (state.view === "goals") renderGoalsPage();
  }

  async function onRegisterSubmit(ev) {
    ev.preventDefault();
    setAuthError("#regError", "");
    const user = ($("#regUser") && $("#regUser").value) || "";
    const display = ($("#regDisplay") && $("#regDisplay").value) || "";
    const pass = ($("#regPass") && $("#regPass").value) || "";
    const pass2 = ($("#regPass2") && $("#regPass2").value) || "";
    if (pass !== pass2) {
      setAuthError("#regError", "兩次密碼唔一致");
      return;
    }
    const res = await registerUser(user, pass, display);
    if (!res.ok) {
      setAuthError("#regError", res.error);
      return;
    }
    if ($("#regPass")) $("#regPass").value = "";
    if ($("#regPass2")) $("#regPass2").value = "";
    closeAuthModal();
    updateAccountChip();
    toast("註冊成功，已登入");
    if (state.view === "log") renderLog();
    if (state.view === "goals") renderGoalsPage();
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
          <video controls playsinline loop muted poster="${escapeAttr(resolvePoster(bundled).src)}?v=${CACHE}" src="${escapeAttr(bundled.src)}?v=${CACHE}"></video>
          ${resolvePoster(bundled).isFallback && getVisualGender() === "female" ? '<p class="poster-fallback-note">此動作暫用通用圖</p>' : ""}
          <p class="video-caption">解剖圖解示意短片（非真人）</p>
        </div>`
      : `<div class="video-placeholder">
          <strong>未有內建短片</strong>
          <span>可自備 YouTube／短片網址（本機儲存）。而家內建 35 款解剖圖解示意短片。</span>
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
    if (name === "bodymap") {
      closeDetail();
      renderBodyMap();
    }
    if (name === "moves") {
      closeDetail();
      renderMoves();
    }
    if (name === "shorts") {
      closeDetail();
      renderShorts();
    }
    if (name === "goals") {
      closeDetail();
      renderGoalsPage();
    }
    if (name === "log") renderLog();
  }

  function tipPool() {
    const daily = (data.dailyTips || []).slice();
    const fromMuscles = (data.muscles || []).map((m) => ({
      id: "m-" + m.id,
      emoji: m.emoji,
      text: m.tip
    }));
    return daily.concat(fromMuscles);
  }

  function renderDailyTip() {
    const el = $("#dailyTipText");
    if (!el) return;
    const pool = tipPool();
    if (!pool.length) {
      el.textContent = "熱身、控制呼吸、循序加重 — 穩陣先最重要。";
      return;
    }
    if (state.tipIndex < 0 || state.tipIndex >= pool.length) state.tipIndex = 0;
    const tip = pool[state.tipIndex];
    el.innerHTML = `<span class="tip-emoji" aria-hidden="true">${tip.emoji || "💡"}</span> ${escapeHtml(tip.text)}`;
  }

  function nextDailyTip() {
    const pool = tipPool();
    if (!pool.length) return;
    state.tipIndex = (state.tipIndex + 1) % pool.length;
    renderDailyTip();
  }

  function normalizeGoalQuery(q) {
    return String(q || "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "");
  }

  function matchMuscleIds(query) {
    const q = normalizeGoalQuery(query);
    if (!q) return { ids: [], full: false, unknown: false };
    if (q === "全身" || q === "全身訓練" || q === "full" || q === "fullbody" || q === "wholebody") {
      return { ids: [], full: true, unknown: false };
    }
    if (
      q === "pilates" ||
      q === "普拉提" ||
      q === "拉根" ||
      q === "reformer" ||
      q === "核心穩定" ||
      q === "女士拉根" ||
      q === "女士" ||
      q === "女士普拉提" ||
      q === "女仔普拉提" ||
      q.includes("普拉提") ||
      q.includes("拉根") ||
      q.includes("reformer") ||
      q.includes("pilates") ||
      q.includes("女士普拉")
    ) {
      return { ids: ["core", "glutes", "legs", "back", "shoulders"], full: false, unknown: false, category: "pilates" };
    }
    const hits = [];
    data.muscles.forEach((m) => {
      const names = [m.name, m.id].concat(m.aliases || []);
      const matched = names.some((a) => {
        const n = normalizeGoalQuery(a);
        return n && (q === n || q.includes(n) || n.includes(q));
      });
      if (matched) hits.push(m.id);
    });
    // also map common free-text not covered if muscle missing
    if (!hits.length) {
      return { ids: [], full: false, unknown: true };
    }
    return { ids: hits, full: false, unknown: false };
  }

  function pickFullBodyMix() {
    const out = [];
    const seen = new Set();
    Object.keys(FULL_BODY_PICKS).forEach((k) => {
      const list = FULL_BODY_PICKS[k];
      for (let i = 0; i < list.length; i++) {
        const ex = byId(list[i]);
        if (ex && !seen.has(ex.id)) {
          seen.add(ex.id);
          out.push(ex);
          break;
        }
      }
    });
    return out;
  }

  function rankExercisesForMuscles(ids) {
    const scored = data.exercises
      .map((ex) => {
        const overlap = ex.muscles.filter((m) => ids.includes(m)).length;
        return { ex, overlap };
      })
      .filter((x) => x.overlap > 0);
    scored.sort((a, b) => {
      if (b.overlap !== a.overlap) return b.overlap - a.overlap;
      // prefer primary muscle match listed first on exercise
      const aPrimary = ids.includes(a.ex.muscles[0]) ? 1 : 0;
      const bPrimary = ids.includes(b.ex.muscles[0]) ? 1 : 0;
      if (bPrimary !== aPrimary) return bPrimary - aPrimary;
      return a.ex.name.localeCompare(b.ex.name, "zh-Hant");
    });
    return scored.map((x) => x.ex);
  }

  function suggestionCardHtml(ex) {
    const tags = ex.muscles.map((m) => `<span class="tag">${escapeHtml(muscleName(m))}</span>`).join("");
    const cue = escapeHtml(ex.rightCue || ex.formCue || "");
    return `
      <article class="card move-card suggest-card" data-ex="${ex.id}">
        <div class="card-head">
          <span class="card-emoji" aria-hidden="true">${ex.emoji}</span>
          <div>
            <h3>${escapeHtml(ex.name)}</h3>
            <p class="muted tiny"><span class="pill ${ex.category}">${catLabel(ex.category)}</span> ${tags}</p>
          </div>
        </div>
        <p class="cue-line muted tiny">✓ ${cue}</p>
        <div class="btn-row">
          <button type="button" class="btn primary" data-open-ex="${ex.id}">教學詳情</button>
          <button type="button" class="btn ghost" data-quick-log="${ex.id}">今日訓練</button>
        </div>
      </article>`;
  }

  function renderGoalSuggestions(targetId, syncInputs) {
    const box = $(targetId || "#goalResults");
    if (!box) return;
    const q = state.goalQuery;
    const match = matchMuscleIds(q);

    // sync chip active states
    $$(".goal-chip").forEach((btn) => {
      const id = btn.dataset.goalChip;
      let on = false;
      if (id === "full") on = match.full;
      else if (id === "pilates") on = match.category === "pilates";
      else if (match.ids.includes(id) && !match.full && match.category !== "pilates") on = true;
      btn.classList.toggle("active", on);
    });

    if (syncInputs) {
      const gi = $("#goalInput");
      const gim = $("#goalInputMoves");
      if (gi && gi.value !== q) gi.value = q;
      if (gim && gim.value !== q) gim.value = q;
    }

    if (!normalizeGoalQuery(q)) {
      const emptyHtml = `<div class="goal-empty"><p>試下撳上面部位，或輸入例如「胸」「腿」「二頭」</p></div>`;
      const main = $("#goalResults");
      const moves = $("#goalResultsMoves");
      if (main) {
        main.hidden = false;
        main.innerHTML = emptyHtml;
      }
      if (moves) {
        moves.hidden = true;
        moves.innerHTML = "";
      }
      $$(".goal-chip").forEach((btn) => btn.classList.remove("active"));
      return;
    }

    let list = [];
    let tipHtml = "";
    if (match.full) {
      list = pickFullBodyMix();
      tipHtml = `<div class="goal-tips"><p class="coach-tip compact"><strong>全身入門組合：</strong>推、拉、腿、核心各一款，先求動作完整再加量。</p></div>`;
    } else if (match.unknown || !match.ids.length) {
      box.hidden = false;
      box.innerHTML = `<div class="goal-empty"><p>暫時對唔上「${escapeHtml(q)}」。試下撳上面部位，或輸入例如「胸」「腿」「二頭」</p></div>`;
      return;
    } else {
      list = rankExercisesForMuscles(match.ids);
      tipHtml = match.ids
        .map((id) => {
          const m = data.muscles.find((x) => x.id === id);
          if (!m) return "";
          return `<p class="coach-tip compact"><span aria-hidden="true">${m.emoji}</span> <strong>${escapeHtml(m.name)} tip：</strong>${escapeHtml(m.tip)}</p>`;
        })
        .join("");
      tipHtml = `<div class="goal-tips">${tipHtml}</div>`;
    }

    let relatedOther = [];
    if (match.category === "pilates") {
      relatedOther = rankExercisesForMuscles(match.ids)
        .filter((e) => e.category !== "pilates")
        .slice(0, 6);
      list = data.exercises.filter((e) => e.category === "pilates");
      tipHtml =
        `<div class="goal-tips"><p class="coach-tip compact"><span aria-hidden="true">🧘</span> <strong>普拉提／拉根 tip：</strong>重點係核心穩定同控制呼吸；拉根（Reformer）彈簧阻力要由教練調。懷孕、腰傷或術後請先咨詢專業人士。示意非醫療。</p></div>`;
    }

    const gym = list.filter((e) => e.category === "gym");
    const cardio = list.filter((e) => e.category === "cardio");
    const home = list.filter((e) => e.category === "home");
    const pilates = list.filter((e) => e.category === "pilates");

    function section(title, items, emptyMsg) {
      if (!items.length) {
        return `<div class="goal-section"><h3 class="section-label">${title}</h3><p class="muted tiny">${emptyMsg}</p></div>`;
      }
      return `<div class="goal-section"><h3 class="section-label">${title}</h3><div class="grid">${items.map(suggestionCardHtml).join("")}</div></div>`;
    }

    box.hidden = false;
    let sectionsHtml = tipHtml;
    if (match.category === "pilates") {
      sectionsHtml +=
        section("普拉提地墊／拉根", pilates, "暫時未收錄普拉提動作。") +
        section("相關核心／臀腿（其他類）", relatedOther, "可再睇核心部位建議。");
    } else {
      sectionsHtml +=
        section("健身房儀器", gym, "呢個目標暫時未收錄對應健身房儀器，可睇其他建議。") +
        section("有氧器械", cardio, "呢個目標暫時未收錄有氧器械。") +
        section("普拉提／拉根", pilates, "呢個目標暫時未收錄普拉提動作。") +
        section("家用／徒手／啞鈴", home, "呢個目標暫時未收錄家用動作，可睇其他建議。");
    }
    box.innerHTML = sectionsHtml;

    // also mirror to the other results box if present
    const other = targetId === "#goalResultsMoves" ? $("#goalResults") : $("#goalResultsMoves");
    if (other && other !== box) {
      other.hidden = box.hidden;
      other.innerHTML = box.innerHTML;
    }
  }

  function setGoalQuery(q, opts) {
    state.goalQuery = q || "";
    renderGoalSuggestions((opts && opts.target) || "#goalResults", true);
    if (opts && opts.jumpMuscles) showView("muscles");
  }

  function renderGoalChips() {
    const html = GOAL_CHIPS.map(
      (c) =>
        `<button type="button" class="goal-chip" data-goal-chip="${c.id}">${escapeHtml(c.label)}</button>`
    ).join("");
    const a = $("#goalChips");
    const b = $("#goalChipsMoves");
    if (a) a.innerHTML = html;
    if (b) b.innerHTML = html;
  }


  function renderBodyMap() {
    const stage = $("#bodymapStage");
    const info = $("#bodymapInfo");
    const chips = $("#bodymapChips");
    if (!stage || !muscleMap) {
      if (stage) stage.innerHTML = `<p class="empty">肌肉圖資料未載入。</p>`;
      return;
    }

    const frames = bodyMapFrames();
    if (!frames.length) {
      stage.innerHTML = `<p class="empty">解剖圖幀未載入。</p>`;
      return;
    }

    let fi = typeof state.bodymapFrame === "number" ? state.bodymapFrame : 0;
    fi = ((fi % frames.length) + frames.length) % frames.length;
    state.bodymapFrame = fi;
    const frame = frames[fi];
    state.bodymapSide = muscleMap.sideFromFrame(frame);

    $$("[data-bodymap-side]").forEach((b) => {
      const side = b.dataset.bodymapSide;
      if (side === "front" || side === "back") {
        const on = side === state.bodymapSide;
        b.classList.toggle("active", on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
      }
    });

    const selected = state.bodymapRegion;
    const hotspotSide = frame.hotspot; // 'front' | 'back' | null
    let overlay = "";
    if (hotspotSide === "front") overlay = muscleMap.frontOverlaySvg(selected);
    else if (hotspotSide === "back") overlay = muscleMap.backOverlaySvg(selected);

    const degLabel = frame.label || "";
    stage.innerHTML = `
      <div class="bodymap-turntable" id="bodymapTurntable" role="img" aria-label="可拖曳旋轉嘅解剖全身圖 · 而家：${escapeAttr(degLabel)}">
        <div class="bodymap-frame-wrap">
          <img class="bodymap-frame-img" src="${escapeAttr(frame.src)}?v=${CACHE}" alt="解剖全身圖 · ${escapeAttr(degLabel)}" draggable="false" width="864" height="1152" />
          ${overlay ? `<div class="bodymap-overlay-layer${hotspotSide ? "" : " is-dim"}">${overlay}</div>` : `<div class="bodymap-overlay-layer is-dim" aria-hidden="true"></div>`}
        </div>
        <p class="bodymap-drag-hint" aria-hidden="true">↔ 左右拖曳旋轉 · 撳橙色區睇介紹</p>
        <p class="bodymap-angle-label"><span>${escapeHtml(degLabel)}</span> · ${fi + 1}/${frames.length}</p>
      </div>`;

    if (!_bodymapDragging) {
      bindBodyMapDrag(stage.querySelector("#bodymapTurntable"));
    }

    const listSide = state.bodymapSide === "back" ? "back" : "front";
    const list = muscleMap.listForSide(listSide);
    if (chips) {
      chips.innerHTML = list
        .map((r) => {
          const on = selected === r.id;
          return `<button type="button" class="bodymap-chip${on ? " active" : ""}" data-muscle-hotspot="${escapeAttr(r.id)}" role="listitem">${escapeHtml(r.name)}</button>`;
        })
        .join("");
    }

    if (!info) return;
    const region = selected ? muscleMap.byId(selected) : null;
    if (!region) {
      info.innerHTML = `
        <h3 class="bodymap-info-title">揀一塊肌</h3>
        <p class="lead compact">左右拖曳旋轉解剖全身圖；喺正面／背面可撳肌肉熱點，或下面名稱。會顯示肌名、簡介、一般飲食靈感，同可跳去嘅相關動作。</p>
        <p class="disclaimer compact-disc"><strong>飲食聲明：</strong>一般飲食參考，因人而異；有需要請咨詢註冊營養師／醫生。</p>`;
      return;
    }

    const moves = (region.exerciseIds || [])
      .map(byId)
      .filter(Boolean)
      .slice(0, 8);
    const moveBtns = moves
      .map(
        (ex) =>
          `<button type="button" class="mini-chip" data-open-ex="${ex.id}">${ex.emoji} ${escapeHtml(ex.name)}</button>`
      )
      .join("");
    const foods = (region.foods || [])
      .map((f) => `<li>${escapeHtml(f)}</li>`)
      .join("");
    const groupLinks = (region.groupIds || [])
      .map((gid) => {
        const m = data.muscles.find((x) => x.id === gid);
        if (!m) return "";
        return `<button type="button" class="btn ghost" data-goto-moves="${m.id}">部位：${escapeHtml(m.name)}</button>`;
      })
      .filter(Boolean)
      .join("");

    info.innerHTML = `
      <p class="bodymap-kicker">${escapeHtml(degLabel)} · ${listSide === "back" ? "背面肌群" : "正面肌群"}</p>
      <h3 class="bodymap-info-title">${escapeHtml(region.name)}</h3>
      <p class="muted tiny bodymap-latin">${escapeHtml(region.latin)}</p>
      <p class="coach-tip">${escapeHtml(region.blurb)}</p>
      <div class="bodymap-nutri">
        <h4>飲食靈感（一般參考）</h4>
        <p>${escapeHtml(region.nutrition)}</p>
        <ul class="plain-list nutri-foods">${foods}</ul>
        <p class="disclaimer compact-disc"><strong>聲明：</strong>一般飲食參考，因人而異；有需要請咨詢註冊營養師／醫生。非醫療建議、非治療宣稱。</p>
      </div>
      <div class="bodymap-moves">
        <h4>相關動作（本站）</h4>
        <div class="mini-row">${moveBtns || `<span class="muted tiny">暫無直接連結</span>`}</div>
        <div class="btn-row" style="margin-top:10px">${groupLinks}</div>
      </div>`;
  }

  let _bodymapDragAbort = null;
  let _bodymapDragging = false;

  function applyBodyMapFrameOnly() {
    if (!muscleMap) return;
    const frames = bodyMapFrames();
    if (!frames.length) return;
    let fi = typeof state.bodymapFrame === "number" ? state.bodymapFrame : 0;
    fi = ((fi % frames.length) + frames.length) % frames.length;
    state.bodymapFrame = fi;
    const frame = frames[fi];
    state.bodymapSide = muscleMap.sideFromFrame(frame);
    const img = document.querySelector(".bodymap-frame-img");
    const overlay = document.querySelector(".bodymap-overlay-layer");
    const angle = document.querySelector(".bodymap-angle-label");
    const tt = document.querySelector("#bodymapTurntable");
    if (img) {
      const src = frame.src + "?v=" + CACHE;
      const file = frame.src.split("/").pop();
      if (!img.getAttribute("src") || !img.getAttribute("src").includes(file)) {
        img.src = src;
      }
      img.alt = "解剖全身圖 · " + (frame.label || "");
    }
    if (overlay) {
      const selected = state.bodymapRegion;
      if (frame.hotspot === "front") {
        overlay.classList.remove("is-dim");
        overlay.innerHTML = muscleMap.frontOverlaySvg(selected);
        overlay.removeAttribute("aria-hidden");
      } else if (frame.hotspot === "back") {
        overlay.classList.remove("is-dim");
        overlay.innerHTML = muscleMap.backOverlaySvg(selected);
        overlay.removeAttribute("aria-hidden");
      } else {
        overlay.classList.add("is-dim");
        overlay.innerHTML = "";
        overlay.setAttribute("aria-hidden", "true");
      }
    }
    if (angle) {
      angle.innerHTML = `<span>${escapeHtml(frame.label || "")}</span> · ${fi + 1}/${frames.length}`;
    }
    if (tt) {
      tt.setAttribute("aria-label", "可拖曳旋轉嘅解剖全身圖 · 而家：" + (frame.label || ""));
    }
    $$("[data-bodymap-side]").forEach((b) => {
      const side = b.dataset.bodymapSide;
      if (side === "front" || side === "back") {
        const on = side === state.bodymapSide;
        b.classList.toggle("active", on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
      }
    });
  }

  function bindBodyMapDrag(el) {
    if (!el || !muscleMap) return;
    if (_bodymapDragAbort) {
      _bodymapDragAbort.abort();
      _bodymapDragAbort = null;
    }
    const frames = bodyMapFrames();
    if (!frames.length) return;
    const ac = new AbortController();
    _bodymapDragAbort = ac;
    const sig = { signal: ac.signal };
    let startX = 0;
    let acc = 0;
    const STEP = 40;

    el.addEventListener(
      "pointerdown",
      (ev) => {
        if (ev.target.closest && ev.target.closest("[data-muscle-hotspot]")) return;
        if (ev.button != null && ev.button !== 0) return;
        _bodymapDragging = true;
        acc = 0;
        startX = ev.clientX;
        el.classList.add("is-dragging");
        try {
          el.setPointerCapture(ev.pointerId);
        } catch (e) {}
      },
      sig
    );
    el.addEventListener(
      "pointermove",
      (ev) => {
        if (!_bodymapDragging) return;
        const dx = ev.clientX - startX;
        startX = ev.clientX;
        acc += dx;
        if (Math.abs(acc) >= STEP) {
          const steps = Math.trunc(acc / STEP);
          acc -= steps * STEP;
          state.bodymapFrame = (state.bodymapFrame || 0) - steps;
          applyBodyMapFrameOnly();
        }
      },
      sig
    );
    function endDrag(ev) {
      if (!_bodymapDragging) return;
      _bodymapDragging = false;
      el.classList.remove("is-dragging");
      try {
        if (ev && ev.pointerId != null) el.releasePointerCapture(ev.pointerId);
      } catch (e) {}
      // refresh chips/info for side change after spin
      renderBodyMap();
    }
    el.addEventListener("pointerup", endDrag, sig);
    el.addEventListener("pointercancel", endDrag, sig);
    el.addEventListener(
      "lostpointercapture",
      () => {
        if (!_bodymapDragging) return;
        _bodymapDragging = false;
        el.classList.remove("is-dragging");
        renderBodyMap();
      },
      sig
    );
  }

  function selectBodyMapRegion(id) {
    if (!muscleMap || !muscleMap.byId(id)) return;
    state.bodymapRegion = id;
    const region = muscleMap.byId(id);
    const best = muscleMap.bestFrameForRegion(region);
    if (typeof best === "number" && best >= 0) {
      state.bodymapFrame = best;
    }
    if (region.side === "front" || region.side === "back") {
      if (region.side !== "both") state.bodymapSide = region.side;
    }
    renderBodyMap();
    const info = $("#bodymapInfo");
    if (info && window.matchMedia && window.matchMedia("(max-width: 899px)").matches) {
      info.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }

  function renderMuscles() {
    const grid = $("#muscleGrid");
    if (!grid) return;
    updateHeroCta();
    renderDailyTip();
    grid.innerHTML = data.muscles
      .map((m) => {
        const moves = (m.moves || []).map(byId).filter(Boolean).slice(0, 4);
        const chips = moves
          .map(
            (ex) =>
              `<button type="button" class="mini-chip" data-open-ex="${ex.id}">${ex.emoji} ${ex.name}</button>`
          )
          .join("");
        const tipShort = m.tip.length > 42 ? m.tip.slice(0, 42) + "…" : m.tip;
        return `
        <article class="card muscle-card accent-${m.id}" data-muscle="${m.id}">
          <div class="card-head">
            <span class="card-emoji lg" aria-hidden="true">${m.emoji}</span>
            <div>
              <h2>${escapeHtml(m.name)}</h2>
              <p class="muted tiny">主要：${escapeHtml(m.targets)}</p>
            </div>
          </div>
          <p class="coach-tip preview"><strong>教練提示：</strong>${escapeHtml(tipShort)}</p>
          <button type="button" class="btn tip-toggle ghost" data-toggle-tip="${m.id}">睇 tip</button>
          <div class="tip-full" id="tip-full-${m.id}" hidden>
            <p class="coach-tip"><strong>教練提示：</strong>${escapeHtml(m.tip)}</p>
          </div>
          <div class="mini-row">${chips}</div>
          <div class="btn-row">
            <button type="button" class="btn primary" data-goal-chip="${m.id}">拎建議</button>
            <button type="button" class="btn ghost" data-goto-moves="${m.id}">全部動作</button>
          </div>
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

  function challengeDayByExercise() {
    const map = {};
    const days = (data.challenge && data.challenge.days) || [];
    days.forEach((d) => {
      if (d.exerciseId && map[d.exerciseId] == null) map[d.exerciseId] = d.day;
    });
    return map;
  }

  function catalogEntries() {
    const dayMap = challengeDayByExercise();
    if (state.catalogMode === "challenge") {
      const days = (data.challenge && data.challenge.days) || [];
      return days
        .map((d) => {
          const ex = byId(d.exerciseId);
          if (!ex) return null;
          return { ex, badge: "DAY " + d.day, day: d.day, key: "d" + d.day + "-" + ex.id };
        })
        .filter(Boolean);
    }
    // 全部圖解：有海報嘅動作（BUNDLED_VIDEOS 順序）
    const ids = Object.keys(BUNDLED_VIDEOS);
    let n = 0;
    return ids
      .map((id) => {
        const ex = byId(id);
        if (!ex) return null;
        n += 1;
        const day = dayMap[id];
        const badge = day != null ? "DAY " + day : "#" + n;
        return { ex, badge, day: day || n, key: "all-" + id };
      })
      .filter(Boolean);
  }

  function syncCatalogChips() {
    $$("[data-catalog-mode]").forEach((b) => {
      b.classList.toggle("active", b.dataset.catalogMode === state.catalogMode);
      b.setAttribute("aria-pressed", b.dataset.catalogMode === state.catalogMode ? "true" : "false");
    });
    $$("[data-catalog-cat]").forEach((b) => {
      const cat = b.dataset.catalogCat;
      const on = (cat === "" && !state.catalogCategory) || cat === state.catalogCategory;
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  function renderShorts() {
    const grid = $("#dayGrid");
    if (!grid) return;
    syncCatalogChips();
    let entries = catalogEntries();
    if (state.catalogCategory) {
      entries = entries.filter((e) => e.ex.category === state.catalogCategory);
    }
    const countEl = $("#catalogCount");
    if (countEl) {
      const modeLabel = state.catalogMode === "challenge" ? "21 日挑戰" : "全部圖解";
            const catLabelText =
        state.catalogCategory === "gym"
          ? " · 健身房"
          : state.catalogCategory === "cardio"
            ? " · 有氧"
            : state.catalogCategory === "home"
              ? " · 家用"
              : state.catalogCategory === "pilates"
                ? " · 普拉提 · 女士"
                : "";
      countEl.textContent = modeLabel + catLabelText + " · " + entries.length + " 款";
    }
    if (!entries.length) {
      grid.innerHTML = `<p class="empty">呢個篩選未有圖解。試吓換「全部圖解」或清類別篩選。</p>`;
      return;
    }
    // 女圖偏好時普拉提排前，方便女士揾
    if (getVisualGender() === "female" && !state.catalogCategory && state.catalogMode === "all") {
      entries = entries.slice().sort((a, b) => {
        const ap = a.ex.category === "pilates" ? 0 : 1;
        const bp = b.ex.category === "pilates" ? 0 : 1;
        return ap - bp;
      });
    }
    grid.innerHTML = entries
      .map(({ ex, badge, key }) => {
        const bundled = getBundledVideo(ex.id);
        const resolved = resolvePoster(bundled);
        const poster = resolved.src ? resolved.src + "?v=" + CACHE : "";
        const shortName = ex.name.length > 16 ? ex.name.slice(0, 15) + "…" : ex.name;
        const fallback = resolved.isFallback && getVisualGender() === "female"
          ? `<span class="poster-fallback-pill">暫用通用圖</span>`
          : "";
        const img = poster
          ? `<img class="poster-img" src="${escapeAttr(poster)}" alt="" loading="lazy" decoding="async" />`
          : `<div class="day-fig">${figureHtml(ex)}</div>`;
        return `
        <button type="button" class="poster-card" data-open-ex-shorts="${ex.id}" data-catalog-key="${key}" aria-label="${escapeAttr(ex.name)}：撳入教學">
          <span class="poster-badge">${badge}</span>
          <div class="poster-media">${img}${fallback}</div>
          <div class="poster-name">${escapeHtml(shortName)}</div>
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
    if (toolbar) toolbar.textContent = fromShorts ? "圖解教學詳情" : "動作教學";

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

    const visuals = fromShorts
      ? shortsBlocks
      : `${basicHero}
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
      ${videoSlotHtml(ex)}`;

    const copyBlocks = `
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
        <p class="rx-body">${ex.prescription}</p>
      </section>
      <section class="detail-block">
        <h3>安全提示</h3>
        <p class="rx-body">${ex.safety}</p>
      </section>
      <button type="button" class="btn primary block" data-quick-log="${ex.id}">加入今日訓練記錄</button>
      <p class="muted tiny center">示意教學 · 非醫療建議 · 請咨詢專業教練</p>`;

    body.innerHTML = `
      ${titleHidden}
      <div class="detail-layout">
        <div class="detail-visuals">${visuals}</div>
        <div class="detail-copy">${copyBlocks}</div>
      </div>
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
    if (!isLoggedIn()) {
      toast("請先登入");
      openAuthModal("login");
      return;
    }
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
    if (!isLoggedIn()) {
      toast("請先登入");
      closeQuickLog();
      openAuthModal("login");
      return;
    }
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
    if (!isLoggedIn()) {
      toast("請先登入");
      return;
    }
    const logs = loadLogs().filter((x) => x.id !== id);
    saveLogs(logs);
    renderLog();
    toast("已刪除記錄");
  }

  function renderLog() {
    const listEl = $("#logList");
    const summary = $("#logSummary");
    const lead = $("#logLead");
    const gate = $("#logGate");
    const controls = $("#logControls");
    const migrate = $("#logMigrate");
    if (!listEl) return;

    const user = currentUser();
    if (!user) {
      if (lead) {
        lead.textContent =
          "請先註冊或登入，先可以記錄同睇自己嘅訓練。資料只存此裝置瀏覽器，唔上雲。";
      }
      if (gate) gate.hidden = false;
      if (controls) controls.hidden = true;
      if (migrate) migrate.hidden = true;
      listEl.innerHTML = "";
      if (summary) summary.textContent = "";
      return;
    }

    if (lead) {
      lead.textContent =
        "已登入：" +
        (user.displayName || user.username) +
        " · 記錄只存此裝置瀏覽器，唔上雲。";
    }
    if (gate) gate.hidden = true;
    if (controls) controls.hidden = false;

    const legacy = loadLegacyLogs();
    const myLogs = loadLogs();
    if (migrate) {
      if (legacy.length && myLogs.length === 0) {
        migrate.hidden = false;
        const mt = $("#logMigrateText");
        if (mt) {
          mt.textContent =
            "發現本機舊記錄 " + legacy.length + " 筆，匯入到我嘅帳戶？";
        }
      } else {
        migrate.hidden = true;
      }
    }

    let logs = myLogs.slice();
    if (state.logFilterDate) {
      logs = logs.filter((l) => l.date === state.logFilterDate);
    }
    if (state.logFilterMuscle) {
      logs = logs.filter((l) => (l.muscles || []).includes(state.logFilterMuscle));
    }
    if (summary) {
      summary.textContent =
        "本帳戶共 " + myLogs.length + " 筆 · 目前顯示 " + logs.length + " 筆";
    }
    if (!logs.length) {
      listEl.innerHTML =
        '<p class="empty">未有訓練記錄。去「儀器／動作」或「短片教學」撳「今日訓練」即可新增。</p>';
      return;
    }
    listEl.innerHTML = logs
      .map((l) => {
        const w =
          l.weightKg == null || Number.isNaN(l.weightKg)
            ? "自體／未填重量"
            : l.weightKg + " kg";
        const tags = (l.muscles || [])
          .map((m) => '<span class="tag">' + muscleName(m) + "</span>")
          .join("");
        return (
          '<article class="card log-card">' +
          '<div class="log-top"><div>' +
          "<h3>" +
          escapeHtml(l.exerciseName) +
          "</h3>" +
          '<p class="muted tiny">' +
          escapeHtml(l.date) +
          ' · <span class="pill ' +
          escapeAttr(l.category) +
          '">' +
          catLabel(l.category) +
          "</span> " +
          tags +
          "</p></div>" +
          '<button type="button" class="btn ghost danger-btn" data-del-log="' +
          escapeAttr(l.id) +
          '" aria-label="刪除記錄">刪除</button></div>' +
          '<p class="log-sets"><strong>' +
          l.sets +
          "</strong> 組 × <strong>" +
          l.reps +
          "</strong> 次 · " +
          w +
          "</p>" +
          (l.notes
            ? '<p class="muted tiny">備註：' + escapeHtml(l.notes) + "</p>"
            : "") +
          "</article>"
        );
      })
      .join("");
  }


  function targetLabel(t) {
    if (t === "fatLoss") return "減脂";
    if (t === "muscleGain") return "增肌";
    return "維持";
  }

  function readGoalsForm() {
    return {
      sex: ($("#goalSex") && $("#goalSex").value) || "female",
      age: Number(($("#goalAge") && $("#goalAge").value) || 0),
      heightCm: Number(($("#goalHeight") && $("#goalHeight").value) || 0),
      weightKg: Number(($("#goalWeight") && $("#goalWeight").value) || 0),
      activity: Number(($("#goalActivity") && $("#goalActivity").value) || 1.375),
      target: ($("#goalTarget") && $("#goalTarget").value) || "fatLoss"
    };
  }

  function runGoalsCalc(ev) {
    if (ev) ev.preventDefault();
    const input = readGoalsForm();
    if (!input.age || !input.heightCm || !input.weightKg) {
      toast("請填齊年齡、身高、體重");
      return;
    }
    const { bmr, tdee } = calcMifflin(input.sex, input.age, input.heightCm, input.weightKg, input.activity);
    const range = calorieRangeForTarget(tdee, input.target);
    const meals = mealPlansFor(input.target);
    if (!state.selectedMealId || !meals.some((m) => m.id === state.selectedMealId)) {
      state.selectedMealId = meals[0] ? meals[0].id : null;
    }
    state.lastGoalCalc = {
      input,
      bmr,
      tdee,
      range,
      mealId: state.selectedMealId,
      at: new Date().toISOString()
    };
    renderGoalsResult();
  }

  function renderGoalsResult() {
    const box = $("#goalsResult");
    if (!box) return;
    const calc = state.lastGoalCalc;
    if (!calc) {
      box.hidden = true;
      box.innerHTML = "";
      return;
    }
    const { input, bmr, tdee, range } = calc;
    const meals = mealPlansFor(input.target);
    const selected = meals.find((m) => m.id === state.selectedMealId) || meals[0];
    const moves = suggestMovesForGoal(input.target, input.sex);
    const mealTabs = meals
      .map(
        (m) =>
          `<button type="button" class="catalog-chip${selected && selected.id === m.id ? " active" : ""}" data-select-meal="${escapeAttr(m.id)}">${escapeHtml(m.title)}</button>`
      )
      .join("");
    const mealBody = selected
      ? `<div class="meal-card">
          <h4>${escapeHtml(selected.title)}</h4>
          <ul class="plain-list">${selected.meals
            .map((x) => `<li><strong>${escapeHtml(x.name)}：</strong>${escapeHtml(x.items)}</li>`)
            .join("")}</ul>
          <p class="muted tiny">${escapeHtml(selected.proteinNote || "")}</p>
        </div>`
      : "<p class=\"empty\">暫無餐單模板</p>";
    const moveChips = moves
      .map(
        (ex) =>
          `<button type="button" class="mini-chip" data-open-ex="${ex.id}">${ex.emoji || ""} ${escapeHtml(ex.name)}</button>`
      )
      .join("");
    box.hidden = false;
    box.innerHTML = `
      <h3 class="section-label">粗估結果 · ${escapeHtml(targetLabel(input.target))}</h3>
      <div class="goals-stats">
        <div class="stat-pill"><span class="stat-k">BMR</span><span class="stat-v">${bmr}</span><span class="stat-u">kcal／日</span></div>
        <div class="stat-pill"><span class="stat-k">TDEE</span><span class="stat-v">${tdee}</span><span class="stat-u">kcal／日</span></div>
        <div class="stat-pill wide"><span class="stat-k">${escapeHtml(range.label)}</span><span class="stat-v">${range.low}–${range.high}</span><span class="stat-u">kcal／日（範圍）</span></div>
      </div>
      <p class="disclaimer compact-disc"><strong>聲明：</strong>以上為 Mifflin-St Jeor 粗估，因人而異，唔係醫療建議，亦唔保證減脂／增肌效果。懷孕、傷患、飲食限制請咨詢專業人士。</p>
      <h3 class="section-label">粵語營養餐示例</h3>
      <div class="catalog-chip-row thin">${mealTabs}</div>
      ${mealBody}
      <h3 class="section-label">可配合動作（示意）</h3>
      <div class="mini-row">${moveChips || "<span class=\"muted tiny\">—</span>"}</div>
      ${
        input.sex === "female" && input.target === "fatLoss"
          ? '<p class="muted tiny">女士減脂可多睇「女士 · 普拉提」同有氧；撳頂欄或首頁 CTA 即到。</p>'
          : ""
      }
    `;
  }

  function saveCurrentGoalSnapshot() {
    if (!state.lastGoalCalc) {
      runGoalsCalc();
    }
    if (!state.lastGoalCalc) {
      toast("請先試算");
      return;
    }
    const calc = state.lastGoalCalc;
    const snap = {
      id: uid(),
      date: todayStr(),
      createdAt: new Date().toISOString(),
      input: calc.input,
      bmr: calc.bmr,
      tdee: calc.tdee,
      range: calc.range,
      mealId: state.selectedMealId || calc.mealId,
      summary:
        targetLabel(calc.input.target) +
        " · BMR " +
        calc.bmr +
        " · TDEE " +
        calc.tdee +
        " · 建議 " +
        calc.range.low +
        "–" +
        calc.range.high +
        " kcal"
    };
    const list = loadGoalSnapshots();
    list.unshift(snap);
    saveGoalSnapshots(list);
    renderGoalsSavedList();
    toast("已儲存分析快照");
  }

  function deleteGoalSnapshot(id) {
    const list = loadGoalSnapshots().filter((x) => x.id !== id);
    saveGoalSnapshots(list);
    renderGoalsSavedList();
    toast("已刪除快照");
  }

  function renderGoalsSavedList() {
    const el = $("#goalsSavedList");
    if (!el) return;
    const list = loadGoalSnapshots();
    const hint = $("#goalSaveHint");
    if (hint) {
      hint.textContent = isLoggedIn()
        ? "已登入：快照存於 " + goalsStorageKey()
        : "訪客快照：fitnessCoachLite.goals.v1.guest · 登入後用個人鍵";
    }
    if (!list.length) {
      el.innerHTML = '<p class="empty">未有儲存快照。試算後撳「儲存呢次分析」。</p>';
      return;
    }
    el.innerHTML = list
      .map((s) => {
        const meal = (mealPlansFor((s.input && s.input.target) || "maintain") || []).find(
          (m) => m.id === s.mealId
        );
        return (
          '<article class="card log-card">' +
          '<div class="log-top"><div>' +
          "<h3>" +
          escapeHtml(s.summary || "分析快照") +
          "</h3>" +
          '<p class="muted tiny">' +
          escapeHtml(s.date || "") +
          (meal ? " · 餐單：" + escapeHtml(meal.title) : "") +
          "</p></div>" +
          '<button type="button" class="btn ghost danger-btn" data-del-goal="' +
          escapeAttr(s.id) +
          '" aria-label="刪除快照">刪除</button></div>' +
          '<p class="muted tiny">' +
          escapeHtml(
            "輸入：" +
              ((s.input && s.input.sex) === "male" ? "男" : "女") +
              " · " +
              (s.input && s.input.age) +
              " 歲 · " +
              (s.input && s.input.heightCm) +
              " cm · " +
              (s.input && s.input.weightKg) +
              " kg"
          ) +
          "</p></article>"
        );
      })
      .join("");
  }

  function renderGoalsPage() {
    renderGoalsSavedList();
    if (state.lastGoalCalc) renderGoalsResult();
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
        `<option value="cardio">有氧器械</option>` +
        `<option value="pilates">普拉提／拉根</option>` +
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
    const openAuth = ev.target.closest("[data-open-auth]");
    if (openAuth) {
      openAuthModal(openAuth.dataset.authTab || "login");
      return;
    }
    const tabBtn = ev.target.closest("[data-auth-tab-btn]");
    if (tabBtn) {
      switchAuthTab(tabBtn.dataset.authTabBtn);
      return;
    }
    if (ev.target.closest("[data-close-auth]")) {
      closeAuthModal();
      return;
    }
    if (ev.target.closest("[data-logout]")) {
      logoutUser();
      updateAccountChip();
      toast("已登出");
      if (state.view === "log") renderLog();
      if (state.view === "goals") renderGoalsPage();
      return;
    }
    if (ev.target.id === "migrateLegacyBtn") {
      const res = migrateLegacyIntoCurrent();
      if (res.ok) {
        toast("已匯入 " + res.count + " 筆舊記錄");
        renderLog();
      } else {
        toast(res.error || "匯入失敗");
      }
      return;
    }
    if (ev.target.id === "dismissMigrateBtn") {
      const migrate = $("#logMigrate");
      if (migrate) migrate.hidden = true;
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
    const jump = ev.target.closest("[data-view-jump]");
    if (jump) {
      showView(jump.dataset.viewJump);
      return;
    }
    const tipToggle = ev.target.closest("[data-toggle-tip]");
    if (tipToggle) {
      const id = tipToggle.dataset.toggleTip;
      const full = $("#tip-full-" + id);
      const card = tipToggle.closest(".muscle-card");
      if (full) {
        const open = full.hidden;
        full.hidden = !open;
        tipToggle.textContent = open ? "收起 tip" : "睇 tip";
        if (card) {
          const preview = card.querySelector(".coach-tip.preview");
          if (preview) preview.hidden = open;
        }
      }
      return;
    }
    const goalChip = ev.target.closest("[data-goal-chip]");
    if (goalChip) {
      const id = goalChip.dataset.goalChip;
      const label =
        id === "full"
          ? "全身"
          : id === "pilates"
            ? "普拉提"
            : (data.muscles.find((x) => x.id === id) || {}).name || id;
      state.goalQuery = label;
      const onMoves = state.view === "moves";
      if (!onMoves && state.view !== "muscles") showView("muscles");
      const target = onMoves ? "#goalResultsMoves" : "#goalResults";
      renderGoalSuggestions(target, true);
      const box = $(target);
      if (box) box.scrollIntoView({ behavior: "smooth", block: "nearest" });
      return;
    }
    if (ev.target.id === "dailyTipNext") {
      nextDailyTip();
      return;
    }
    const bodymapSideBtn = ev.target.closest("[data-bodymap-side]");
    if (bodymapSideBtn) {
      const act = bodymapSideBtn.dataset.bodymapSide;
      if (act === "spin-left") {
        state.bodymapFrame = (state.bodymapFrame || 0) - 1;
        renderBodyMap();
        return;
      }
      if (act === "spin-right") {
        state.bodymapFrame = (state.bodymapFrame || 0) + 1;
        renderBodyMap();
        return;
      }
      const side = act === "back" ? "back" : "front";
      state.bodymapSide = side;
      if (muscleMap && muscleMap.indexForSide) {
        state.bodymapFrame = muscleMap.indexForSide(side, getVisualGender() === "female" ? "female" : "male");
      }
      const cur = state.bodymapRegion && muscleMap ? muscleMap.byId(state.bodymapRegion) : null;
      if (cur && cur.side !== "both" && cur.side !== state.bodymapSide) {
        state.bodymapRegion = null;
      }
      renderBodyMap();
      return;
    }
    const hotspot = ev.target.closest("[data-muscle-hotspot]");
    if (hotspot) {
      selectBodyMapRegion(hotspot.dataset.muscleHotspot);
      if (state.view !== "bodymap") showView("bodymap");
      return;
    }
    const catalogModeBtn = ev.target.closest("[data-catalog-mode]");
    if (catalogModeBtn) {
      state.catalogMode = catalogModeBtn.dataset.catalogMode || "all";
      renderShorts();
      return;
    }
    const catalogCatBtn = ev.target.closest("[data-catalog-cat]");
    if (catalogCatBtn) {
      state.catalogCategory = catalogCatBtn.dataset.catalogCat || "";
      renderShorts();
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
      return;
    }
    const genderBtn = ev.target.closest("[data-visual-gender]");
    if (genderBtn) {
      setVisualGender(genderBtn.dataset.visualGender);
      return;
    }
    if (ev.target.closest("[data-open-pilates]")) {
      openPilatesCatalog();
      return;
    }
    const selMeal = ev.target.closest("[data-select-meal]");
    if (selMeal) {
      state.selectedMealId = selMeal.dataset.selectMeal;
      if (state.lastGoalCalc) state.lastGoalCalc.mealId = state.selectedMealId;
      renderGoalsResult();
      return;
    }
    if (ev.target.id === "goalSaveBtn") {
      saveCurrentGoalSnapshot();
      return;
    }
    const delGoal = ev.target.closest("[data-del-goal]");
    if (delGoal) {
      if (confirm("確定刪除呢筆分析快照？")) deleteGoalSnapshot(delGoal.dataset.delGoal);
      return;
    }
  }

  function preloadBodyMapFrames() {
    if (!muscleMap) return;
    const all = []
      .concat((muscleMap.FRAMES_MALE || muscleMap.FRAMES || []))
      .concat(muscleMap.FRAMES_FEMALE || []);
    all.forEach((f) => {
      const im = new Image();
      im.src = f.src + "?v=" + CACHE;
    });
  }

  function initStats() {
    const gym = data.exercises.filter((e) => e.category === "gym").length;
    const cardio = data.exercises.filter((e) => e.category === "cardio").length;
    const pilates = data.exercises.filter((e) => e.category === "pilates").length;
    const home = data.exercises.filter((e) => e.category === "home").length;
    const days = (data.challenge && data.challenge.days && data.challenge.days.length) || 0;
    const el = $("#aboutStats");
    if (el) {
      const vids = Object.keys(BUNDLED_VIDEOS).length;
      const mapN = (muscleMap && muscleMap.regions && muscleMap.regions.length) || 0;
      el.textContent = `而家收錄：健身房器械 ${gym} 款 · 有氧 ${cardio} 款 · 普拉提／拉根 ${pilates} 款 · 家用／徒手／啞鈴 ${home} 款 · 部位 ${data.muscles.length} 個 · 肌肉圖分區 ${mapN} · 挑戰 ${days} 日 · 內建解剖短片 ${vids} 款`;
    }
  }

  function bindGoalSearch() {
    renderGoalChips();
    const pool = tipPool();
    const daySeed = new Date().getDate() + new Date().getMonth() * 31;
    state.tipIndex = pool.length ? daySeed % pool.length : 0;
    renderDailyTip();

    function onGoalInput(ev, target) {
      setGoalQuery(ev.target.value, { target: target });
    }
    const gi = $("#goalInput");
    if (gi) {
      gi.addEventListener("input", (e) => onGoalInput(e, "#goalResults"));
    }
    const gim = $("#goalInputMoves");
    if (gim) {
      gim.addEventListener("input", (e) => {
        state.goalQuery = e.target.value;
        renderGoalSuggestions("#goalResultsMoves", true);
      });
    }
    // empty state hint once
    renderGoalSuggestions("#goalResults", false);
  }

  document.addEventListener("DOMContentLoaded", () => {
    const prefs = loadPrefs();
    state.visualGender = prefs.visualGender || "neutral";
    syncGenderChips();
    bindFilters();
    bindGoalSearch();
    preloadBodyMapFrames();
    document.addEventListener("click", onClick);
    const goalsForm = $("#goalsForm");
    if (goalsForm) goalsForm.addEventListener("submit", runGoalsCalc);
    document.addEventListener("keydown", (ev) => {
      if (ev.key !== "Enter" && ev.key !== " ") return;
      const hs = ev.target.closest && ev.target.closest("[data-muscle-hotspot]");
      if (!hs) return;
      ev.preventDefault();
      selectBodyMapRegion(hs.dataset.muscleHotspot);
      if (state.view !== "bodymap") showView("bodymap");
    });
    const form = $("#logForm");
    if (form) form.addEventListener("submit", submitQuickLog);
    const loginForm = $("#authLoginForm");
    if (loginForm) loginForm.addEventListener("submit", onLoginSubmit);
    const regForm = $("#authRegisterForm");
    if (regForm) regForm.addEventListener("submit", onRegisterSubmit);
    const backdrop = $("#detailBackdrop");
    if (backdrop) backdrop.addEventListener("click", closeDetail);
    const logModal = $("#logModal");
    if (logModal) {
      logModal.addEventListener("click", (e) => {
        if (e.target === logModal) closeQuickLog();
      });
    }
    const authModal = $("#authModal");
    if (authModal) {
      authModal.addEventListener("click", (e) => {
        if (e.target === authModal) closeAuthModal();
      });
    }
    updateAccountChip();
    initStats();
    showView("muscles");
  });
})();
