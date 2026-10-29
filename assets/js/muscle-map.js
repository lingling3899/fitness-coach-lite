/* 健身教練 Lite — 可旋轉解剖全身肌肉圖（示意＋一般飲食參考，非醫療） */
window.FITNESS_MUSCLE_MAP = (function () {
  "use strict";

  const HL = "#ff6a2a";
  const HL_SOFT = "rgba(255, 106, 42, 0.55)";
  const HL_GLOW = "rgba(255, 140, 60, 0.35)";

  /** 8 幀轉盤：拖曳左右旋轉（原創作解剖海報風格，非抄他牌） */
  const FRAMES = [
    { id: "front", src: "assets/img/bodymap/front.jpg", yaw: 0, hotspot: "front", label: "正面" },
    { id: "front-lq", src: "assets/img/bodymap/front-lq.jpg", yaw: 45, hotspot: "front", label: "左斜" },
    { id: "side-l", src: "assets/img/bodymap/side-l.jpg", yaw: 90, hotspot: null, label: "左側" },
    { id: "back-lq", src: "assets/img/bodymap/back-lq.jpg", yaw: 135, hotspot: "back", label: "背左斜" },
    { id: "back", src: "assets/img/bodymap/back.jpg", yaw: 180, hotspot: "back", label: "背面" },
    { id: "back-rq", src: "assets/img/bodymap/back-rq.jpg", yaw: 225, hotspot: "back", label: "背右斜" },
    { id: "side-r", src: "assets/img/bodymap/side-r.jpg", yaw: 270, hotspot: null, label: "右側" },
    { id: "front-rq", src: "assets/img/bodymap/front-rq.jpg", yaw: 315, hotspot: "front", label: "右斜" }
  ];

  const regions = [
    {
      id: "pecs",
      name: "胸大肌",
      latin: "Pectoralis major",
      side: "front",
      groupIds: ["chest"],
      exerciseIds: ["smith-bench", "chest-press-machine", "incline-chest-press", "pec-deck", "pushup", "dumbbell-press-home"],
      blurb: "胸大肌喺胸廓前面，負責推、夾同部分肩屈曲。練呢度通常用推胸、伏地挺身、夾胸；控制下放同肩胛微後夾較穩陣。",
      nutrition: "推胸日消耗較大，可喺訓練前後補蛋白質同適量碳水，幫助恢復同下一課有力。",
      foods: ["雞蛋／蛋清", "雞胸或魚肉", "豆腐／豆漿", "燕麥或飯", "香蕉"]
    },
    {
      id: "delts-front",
      name: "三角肌（前）",
      latin: "Anterior deltoid",
      side: "front",
      groupIds: ["shoulders"],
      exerciseIds: ["shoulder-press-machine", "db-shoulder-press", "incline-chest-press", "dumbbell-press-home"],
      blurb: "前三角協助推舉同前平舉。肩關節較脆弱，重量由輕開始，肘唔好過度外開。",
      nutrition: "肩日偏重小肌群，蛋白質均勻分餐即可；訓練前後可輕食碳水，唔使硬塞大量。",
      foods: ["希臘乳酪或替代", "雞蛋", "全麥包／飯", "深綠蔬菜", "果仁少許"]
    },
    {
      id: "delts-side",
      name: "三角肌（中）",
      latin: "Lateral deltoid",
      side: "front",
      groupIds: ["shoulders"],
      exerciseIds: ["lateral-raise-machine", "db-shoulder-press", "shoulder-press-machine"],
      blurb: "中三角主要負責側平舉，影響肩寬外觀。動作以控制為主，避免借力甩。",
      nutrition: "細肌群恢復相對快，日常蛋白質＋蔬菜已夠用；出汗多記得補水。",
      foods: ["雞胸／豆腐", "乳製品或替代", "蔬菜沙律", "水果", "充足飲水"]
    },
    {
      id: "delts-rear",
      name: "三角肌（後）",
      latin: "Posterior deltoid",
      side: "back",
      groupIds: ["shoulders", "back"],
      exerciseIds: ["face-pull", "seated-row", "db-row"],
      blurb: "後三角同肩胛穩定有關，常被忽略。面拉、划船類動作有助平衡前推過多。",
      nutrition: "拉嘅日可搭配蛋白質同複雜碳水；綠色蔬菜幫助日常微量營養素攝取。",
      foods: ["魚肉／雞蛋", "糙米或薯", "西蘭花等深綠菜", "豆類", "乳製品或替代"]
    },
    {
      id: "biceps",
      name: "肱二頭肌",
      latin: "Biceps brachii",
      side: "front",
      groupIds: ["arms"],
      exerciseIds: ["db-curl", "seated-row", "lat-pulldown", "assisted-pullup"],
      blurb: "二頭負責屈肘同部分前臂旋後。彎舉唔好借腰力；拉類動作亦會用到二頭作輔助。",
      nutrition: "手臂日以蛋白質修復為主，訓練前後可加少量碳水；唔使特別「只食某樣野增二頭」。",
      foods: ["雞蛋", "瘦肉或豆腐", "乳製品或替代", "香蕉", "燕麥"]
    },
    {
      id: "triceps",
      name: "肱三頭肌",
      latin: "Triceps brachii",
      side: "back",
      groupIds: ["arms"],
      exerciseIds: ["triceps-pushdown", "pushup", "smith-bench", "chest-press-machine", "db-shoulder-press"],
      blurb: "三頭喺上臂後面，負責伸肘，推胸同肩推都會用到。下壓時肘盡量固定喺身側。",
      nutrition: "推日三頭負擔較大，餐單可偏蛋白質＋適量碳水；恢復日一樣要食飽蛋白。",
      foods: ["雞胸／魚", "豆製品", "飯或麵", "雞蛋", "蔬菜"]
    },
    {
      id: "forearms",
      name: "前臂肌群",
      latin: "Forearm flexors / extensors",
      side: "both",
      groupIds: ["arms"],
      exerciseIds: ["db-curl", "seated-row", "db-row", "lat-pulldown"],
      blurb: "前臂負責握力同手腕穩定。多數拉、提動作都會練到；握力不足可先減重量求完整動作。",
      nutrition: "一般均衡飲食已支援前臂訓練；注意補水，長時間握器械後可做輕柔伸展。",
      foods: ["堅果少許", "乳製品或替代", "瘦肉／豆類", "水果", "全穀"]
    },
    {
      id: "abs",
      name: "腹直肌／核心",
      latin: "Rectus abdominis / core",
      side: "front",
      groupIds: ["core"],
      exerciseIds: ["plank", "hanging-leg-raise", "ab-crunch-machine", "bw-squat"],
      blurb: "核心唔止「腹肌線」，仲包括穩定腰椎同骨盆。平板撑、抬腿等以姿勢同呼吸為先，唔好閉氣硬撐。",
      nutrition: "核心訓練耗能唔一定好高，重點係整體蛋白質同蔬菜；唔靠極端節食「練出腹肌」。",
      foods: ["雞蛋／魚", "大量蔬菜", "燕麥或薯", "乳製品或替代", "充足飲水"]
    },
    {
      id: "lats",
      name: "闊背肌",
      latin: "Latissimus dorsi",
      side: "back",
      groupIds: ["back"],
      exerciseIds: ["lat-pulldown", "assisted-pullup", "straight-arm-pulldown", "seated-row", "db-row"],
      blurb: "闊背喺背兩側，負責下拉同內收手臂。練背重點係「拉到肩胛郁」，唔係淨係彎手肘。",
      nutrition: "背日多複合拉，訓練前後碳水有助表現；蛋白質分散三餐較易攝取。",
      foods: ["雞胸／牛肉適量", "飯或意粉", "雞蛋", "深綠蔬菜", "豆類"]
    },
    {
      id: "traps",
      name: "斜方肌／菱形肌",
      latin: "Trapezius / Rhomboids",
      side: "back",
      groupIds: ["back", "shoulders"],
      exerciseIds: ["face-pull", "seated-row", "db-row", "lat-pulldown"],
      blurb: "斜方同菱形協助肩胛上提、後縮同穩定。面拉、划船有助改善「圓肩」姿勢習慣（示意，非診斷）。",
      nutrition: "上背日可搭配蛋白質同複雜碳水；坐辦公室者更要均衡飲食同定時郁動。",
      foods: ["魚／雞蛋", "糙米或燕麥", "蔬菜", "豆腐", "水果"]
    },
    {
      id: "erectors",
      name: "豎脊肌／下背",
      latin: "Erector spinae",
      side: "back",
      groupIds: ["back", "core"],
      exerciseIds: ["smith-squat", "bw-squat", "glute-bridge", "db-row", "seated-row"],
      blurb: "豎脊協助維持脊柱直立。深蹲、硬拉類同橋式都會用到；腰有不適應即停，先查姿勢同負荷。",
      nutrition: "下肢／鉸鏈日消耗大，訓練後蛋白質＋碳水有助恢復；下背敏感者更要規律進食唔捱餓訓練。",
      foods: ["瘦肉／魚", "飯或薯", "乳製品或替代", "蔬菜", "香蕉"]
    },
    {
      id: "glutes",
      name: "臀大肌",
      latin: "Gluteus maximus",
      side: "back",
      groupIds: ["glutes"],
      exerciseIds: ["glute-bridge", "lunge", "bw-squat", "smith-squat", "hack-squat", "leg-press", "stair-climber"],
      blurb: "臀大肌負責髖伸展，走路、上樓梯、深蹲都靠佢。練臀重點髖鉸鏈同頂端夾臀，唔好淨用腰拱代替。",
      nutrition: "臀腿日通常較吃力，訓練前後碳水＋蛋白質較常見配搭；蔬菜同水分一樣重要。",
      foods: ["雞胸／豆製品", "燕麥或飯", "香蕉或莓果", "希臘乳酪或替代", "深綠蔬菜"]
    },
    {
      id: "quads",
      name: "股四頭肌",
      latin: "Quadriceps",
      side: "front",
      groupIds: ["legs"],
      exerciseIds: ["smith-squat", "hack-squat", "leg-press", "vertical-leg-press", "leg-extension", "dual-pedal-press", "bw-squat", "lunge"],
      blurb: "股四頭喺大腿前面，負責伸膝。深蹲、腿舉、腿伸展都會練到；膝蓋對準腳尖方向較穩。",
      nutrition: "腿日耗能高，可喺課前課後補碳水同蛋白質；唔建議空腹做大重量下肢。",
      foods: ["雞胸／魚", "飯、麵或薯", "雞蛋", "乳製品或替代", "香蕉"]
    },
    {
      id: "hamstrings",
      name: "腘繩肌",
      latin: "Hamstrings",
      side: "back",
      groupIds: ["legs"],
      exerciseIds: ["leg-curl", "glute-bridge", "smith-squat", "leg-press", "lunge"],
      blurb: "腘繩喺大腿後面，負責屈膝同協助髖伸。腿彎曲、橋式、鉸鏈類有助平衡前側過多。",
      nutrition: "腿／臀日同樣需要蛋白質修復；課後一餐有碳水有助補充肌糖原（一般運動營養概念）。",
      foods: ["瘦肉／豆腐", "飯或意粉", "雞蛋", "蔬菜", "乳製品或替代"]
    },
    {
      id: "calves",
      name: "小腿（腓腸肌）",
      latin: "Gastrocnemius",
      side: "both",
      groupIds: ["legs"],
      exerciseIds: ["stair-climber", "treadmill", "bw-squat", "leg-press"],
      blurb: "小腿協助踮腳同步行推進。樓梯機、步行、深蹲支撐都會用到；拉伸可喺訓練後輕做。",
      nutrition: "小腿常隨下肢同有氧一齊練，均衡飲食即可；出汗多記得鈉鉀來源來自正常飲食同水分。",
      foods: ["乳製品或替代", "香蕉", "全穀", "瘦肉／豆類", "充足飲水"]
    },
    {
      id: "hip-flexors",
      name: "髖屈肌（簡）",
      latin: "Hip flexors (simplified)",
      side: "front",
      groupIds: ["core", "legs"],
      exerciseIds: ["hanging-leg-raise", "lunge", "plank", "stair-climber"],
      blurb: "髖屈肌協助抬膝同髖屈曲。久坐者常感緊繃；訓練以控制為主，唔好過度強拉。",
      nutrition: "一般飲食足夠；配合適量步行同伸展。唔將某樣食物宣傳成「鬆髖特效」。",
      foods: ["蔬菜", "瘦肉／豆類", "全穀", "水果", "充足飲水"]
    },
    {
      id: "adductors",
      name: "內收肌（簡）",
      latin: "Hip adductors (simplified)",
      side: "front",
      groupIds: ["legs"],
      exerciseIds: ["bw-squat", "lunge", "leg-press", "hack-squat", "smith-squat"],
      blurb: "內收肌喺大腿內側，協助夾腿同穩定髖。深蹲、弓步等下肢動作都會用到（示意分區）。",
      nutrition: "下肢訓練日蛋白質同碳水並重；內側肌唔使另開「神奇補劑餐」。",
      foods: ["雞胸／豆腐", "飯或燕麥", "乳製品或替代", "蔬菜", "雞蛋"]
    }
  ];

  function byId(id) {
    return regions.find((r) => r.id === id) || null;
  }

  function escapeAttr(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;");
  }

  function hotspotAttrs(id, selected) {
    const on = selected === id;
    return `data-muscle-hotspot="${escapeAttr(id)}" role="button" tabindex="0" aria-label="${escapeAttr((byId(id) || {}).name || id)}" aria-pressed="${on ? "true" : "false"}" class="mm-hotspot${on ? " is-on" : ""}"`;
  }

  function fillFor(id, selected) {
    return selected === id ? HL_SOFT : "transparent";
  }

  function strokeFor(id, selected) {
    return selected === id ? HL : "transparent";
  }

  /** Photo-aligned front hotspots (viewBox matches 3:4 anatomy still) */
  function frontOverlaySvg(selected) {
    const f = (id) => fillFor(id, selected);
    const s = (id) => strokeFor(id, selected);
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400" class="muscle-map-overlay" aria-hidden="false" aria-label="正面肌肉熱點">
      <defs>
        <filter id="mmGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3.5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <!-- delts front -->
      <ellipse ${hotspotAttrs("delts-front", selected)} cx="98" cy="92" rx="22" ry="16" fill="${f("delts-front")}" stroke="${s("delts-front")}" stroke-width="1.5" filter="${selected === "delts-front" ? "url(#mmGlow)" : "none"}"/>
      <ellipse ${hotspotAttrs("delts-front", selected)} cx="202" cy="92" rx="22" ry="16" fill="${f("delts-front")}" stroke="${s("delts-front")}" stroke-width="1.5" filter="${selected === "delts-front" ? "url(#mmGlow)" : "none"}"/>
      <!-- delts side -->
      <ellipse ${hotspotAttrs("delts-side", selected)} cx="78" cy="98" rx="12" ry="15" fill="${f("delts-side")}" stroke="${s("delts-side")}" stroke-width="1.2" filter="${selected === "delts-side" ? "url(#mmGlow)" : "none"}"/>
      <ellipse ${hotspotAttrs("delts-side", selected)} cx="222" cy="98" rx="12" ry="15" fill="${f("delts-side")}" stroke="${s("delts-side")}" stroke-width="1.2" filter="${selected === "delts-side" ? "url(#mmGlow)" : "none"}"/>
      <!-- pecs -->
      <path ${hotspotAttrs("pecs", selected)} d="M105 78 Q150 68 195 78 L202 128 Q150 145 98 128 Z" fill="${f("pecs")}" stroke="${s("pecs")}" stroke-width="1.6" filter="${selected === "pecs" ? "url(#mmGlow)" : "none"}"/>
      <!-- abs -->
      <path ${hotspotAttrs("abs", selected)} d="M118 132 Q150 140 182 132 L176 195 Q150 208 124 195 Z" fill="${f("abs")}" stroke="${s("abs")}" stroke-width="1.4" filter="${selected === "abs" ? "url(#mmGlow)" : "none"}"/>
      <!-- hip flexors -->
      <path ${hotspotAttrs("hip-flexors", selected)} d="M122 188 Q150 198 178 188 L172 218 Q150 226 128 218 Z" fill="${f("hip-flexors")}" stroke="${s("hip-flexors")}" stroke-width="1.2" filter="${selected === "hip-flexors" ? "url(#mmGlow)" : "none"}"/>
      <!-- biceps -->
      <rect ${hotspotAttrs("biceps", selected)} x="58" y="105" width="24" height="52" rx="11" fill="${f("biceps")}" stroke="${s("biceps")}" stroke-width="1.4" transform="rotate(-8 70 131)" filter="${selected === "biceps" ? "url(#mmGlow)" : "none"}"/>
      <rect ${hotspotAttrs("biceps", selected)} x="218" y="105" width="24" height="52" rx="11" fill="${f("biceps")}" stroke="${s("biceps")}" stroke-width="1.4" transform="rotate(8 230 131)" filter="${selected === "biceps" ? "url(#mmGlow)" : "none"}"/>
      <!-- forearms -->
      <rect ${hotspotAttrs("forearms", selected)} x="48" y="158" width="18" height="48" rx="8" fill="${f("forearms")}" stroke="${s("forearms")}" stroke-width="1.2" transform="rotate(-12 57 182)" filter="${selected === "forearms" ? "url(#mmGlow)" : "none"}"/>
      <rect ${hotspotAttrs("forearms", selected)} x="234" y="158" width="18" height="48" rx="8" fill="${f("forearms")}" stroke="${s("forearms")}" stroke-width="1.2" transform="rotate(12 243 182)" filter="${selected === "forearms" ? "url(#mmGlow)" : "none"}"/>
      <!-- quads -->
      <rect ${hotspotAttrs("quads", selected)} x="118" y="222" width="28" height="78" rx="12" fill="${f("quads")}" stroke="${s("quads")}" stroke-width="1.4" filter="${selected === "quads" ? "url(#mmGlow)" : "none"}"/>
      <rect ${hotspotAttrs("quads", selected)} x="154" y="222" width="28" height="78" rx="12" fill="${f("quads")}" stroke="${s("quads")}" stroke-width="1.4" filter="${selected === "quads" ? "url(#mmGlow)" : "none"}"/>
      <!-- adductors -->
      <rect ${hotspotAttrs("adductors", selected)} x="138" y="235" width="12" height="50" rx="5" fill="${f("adductors")}" stroke="${s("adductors")}" stroke-width="1" filter="${selected === "adductors" ? "url(#mmGlow)" : "none"}"/>
      <rect ${hotspotAttrs("adductors", selected)} x="150" y="235" width="12" height="50" rx="5" fill="${f("adductors")}" stroke="${s("adductors")}" stroke-width="1" filter="${selected === "adductors" ? "url(#mmGlow)" : "none"}"/>
      <!-- calves front -->
      <rect ${hotspotAttrs("calves", selected)} x="122" y="308" width="20" height="48" rx="8" fill="${f("calves")}" stroke="${s("calves")}" stroke-width="1.2" filter="${selected === "calves" ? "url(#mmGlow)" : "none"}"/>
      <rect ${hotspotAttrs("calves", selected)} x="158" y="308" width="20" height="48" rx="8" fill="${f("calves")}" stroke="${s("calves")}" stroke-width="1.2" filter="${selected === "calves" ? "url(#mmGlow)" : "none"}"/>
    </svg>`;
  }

  function backOverlaySvg(selected) {
    const f = (id) => fillFor(id, selected);
    const s = (id) => strokeFor(id, selected);
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400" class="muscle-map-overlay" aria-label="背面肌肉熱點">
      <defs>
        <filter id="mmGlowB" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3.5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <!-- traps -->
      <path ${hotspotAttrs("traps", selected)} d="M110 72 Q150 58 190 72 L182 112 Q150 124 118 112 Z" fill="${f("traps")}" stroke="${s("traps")}" stroke-width="1.5" filter="${selected === "traps" ? "url(#mmGlowB)" : "none"}"/>
      <!-- rear delts -->
      <ellipse ${hotspotAttrs("delts-rear", selected)} cx="95" cy="95" rx="20" ry="15" fill="${f("delts-rear")}" stroke="${s("delts-rear")}" stroke-width="1.4" filter="${selected === "delts-rear" ? "url(#mmGlowB)" : "none"}"/>
      <ellipse ${hotspotAttrs("delts-rear", selected)} cx="205" cy="95" rx="20" ry="15" fill="${f("delts-rear")}" stroke="${s("delts-rear")}" stroke-width="1.4" filter="${selected === "delts-rear" ? "url(#mmGlowB)" : "none"}"/>
      <!-- lats -->
      <path ${hotspotAttrs("lats", selected)} d="M105 105 L118 115 L118 185 Q150 205 182 185 L182 115 L195 105 Q218 140 205 188 Q150 220 95 188 Q82 140 105 105 Z" fill="${f("lats")}" stroke="${s("lats")}" stroke-width="1.5" filter="${selected === "lats" ? "url(#mmGlowB)" : "none"}"/>
      <!-- erectors -->
      <path ${hotspotAttrs("erectors", selected)} d="M138 120 L162 120 L158 200 Q150 210 142 200 Z" fill="${f("erectors")}" stroke="${s("erectors")}" stroke-width="1.2" filter="${selected === "erectors" ? "url(#mmGlowB)" : "none"}"/>
      <!-- triceps -->
      <rect ${hotspotAttrs("triceps", selected)} x="58" y="105" width="22" height="54" rx="10" fill="${f("triceps")}" stroke="${s("triceps")}" stroke-width="1.4" transform="rotate(-6 69 132)" filter="${selected === "triceps" ? "url(#mmGlowB)" : "none"}"/>
      <rect ${hotspotAttrs("triceps", selected)} x="220" y="105" width="22" height="54" rx="10" fill="${f("triceps")}" stroke="${s("triceps")}" stroke-width="1.4" transform="rotate(6 231 132)" filter="${selected === "triceps" ? "url(#mmGlowB)" : "none"}"/>
      <!-- forearms back -->
      <rect ${hotspotAttrs("forearms", selected)} x="50" y="160" width="17" height="46" rx="7" fill="${f("forearms")}" stroke="${s("forearms")}" stroke-width="1.2" transform="rotate(-10 58 183)" filter="${selected === "forearms" ? "url(#mmGlowB)" : "none"}"/>
      <rect ${hotspotAttrs("forearms", selected)} x="233" y="160" width="17" height="46" rx="7" fill="${f("forearms")}" stroke="${s("forearms")}" stroke-width="1.2" transform="rotate(10 241 183)" filter="${selected === "forearms" ? "url(#mmGlowB)" : "none"}"/>
      <!-- glutes -->
      <ellipse ${hotspotAttrs("glutes", selected)} cx="128" cy="225" rx="26" ry="22" fill="${f("glutes")}" stroke="${s("glutes")}" stroke-width="1.5" filter="${selected === "glutes" ? "url(#mmGlowB)" : "none"}"/>
      <ellipse ${hotspotAttrs("glutes", selected)} cx="172" cy="225" rx="26" ry="22" fill="${f("glutes")}" stroke="${s("glutes")}" stroke-width="1.5" filter="${selected === "glutes" ? "url(#mmGlowB)" : "none"}"/>
      <!-- hamstrings -->
      <rect ${hotspotAttrs("hamstrings", selected)} x="118" y="248" width="26" height="62" rx="11" fill="${f("hamstrings")}" stroke="${s("hamstrings")}" stroke-width="1.4" filter="${selected === "hamstrings" ? "url(#mmGlowB)" : "none"}"/>
      <rect ${hotspotAttrs("hamstrings", selected)} x="156" y="248" width="26" height="62" rx="11" fill="${f("hamstrings")}" stroke="${s("hamstrings")}" stroke-width="1.4" filter="${selected === "hamstrings" ? "url(#mmGlowB)" : "none"}"/>
      <!-- calves -->
      <path ${hotspotAttrs("calves", selected)} d="M120 318 Q132 308 144 318 L140 362 Q132 370 124 362 Z" fill="${f("calves")}" stroke="${s("calves")}" stroke-width="1.2" filter="${selected === "calves" ? "url(#mmGlowB)" : "none"}"/>
      <path ${hotspotAttrs("calves", selected)} d="M156 318 Q168 308 180 318 L176 362 Q168 370 160 362 Z" fill="${f("calves")}" stroke="${s("calves")}" stroke-width="1.2" filter="${selected === "calves" ? "url(#mmGlowB)" : "none"}"/>
    </svg>`;
  }

  /** Legacy aliases kept for safety */
  function frontSvg(selected) {
    return frontOverlaySvg(selected);
  }
  function backSvg(selected) {
    return backOverlaySvg(selected);
  }

  function listForSide(side) {
    if (side === "front") {
      return regions.filter((r) => r.side === "front" || r.side === "both");
    }
    if (side === "back") {
      return regions.filter((r) => r.side === "back" || r.side === "both");
    }
    return regions.slice();
  }

  function frameAt(index) {
    const n = FRAMES.length;
    const i = ((index % n) + n) % n;
    return FRAMES[i];
  }

  function indexForSide(side) {
    if (side === "back") return FRAMES.findIndex((f) => f.id === "back");
    return FRAMES.findIndex((f) => f.id === "front");
  }

  function bestFrameForRegion(region) {
    if (!region) return 0;
    if (region.side === "back") return indexForSide("back");
    if (region.side === "front") return indexForSide("front");
    return null; // both: keep current
  }

  function sideFromFrame(frame) {
    if (!frame) return "front";
    if (frame.hotspot === "back") return "back";
    if (frame.hotspot === "front") return "front";
    // side views: infer from yaw
    const y = frame.yaw;
    if (y > 90 && y < 270) return "back";
    return "front";
  }

  return {
    regions,
    FRAMES,
    byId,
    frontSvg,
    backSvg,
    frontOverlaySvg,
    backOverlaySvg,
    listForSide,
    frameAt,
    indexForSide,
    bestFrameForRegion,
    sideFromFrame,
    HL
  };
})();
