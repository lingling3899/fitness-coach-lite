/* 健身教練 Lite — 全身肌肉圖（示意＋一般飲食參考，非醫療） */
window.FITNESS_MUSCLE_MAP = (function () {
  "use strict";

  const HL = "#ff6a2a";
  const HL_SOFT = "rgba(255, 106, 42, 0.35)";
  const BODY = "#4b5563";
  const BODY_LT = "#6b7280";
  const OUT = "#374151";
  const BG = "#111827";

  /** @type {Array<{id:string,name:string,latin:string,side:string,groupIds:string[],exerciseIds:string[],blurb:string,nutrition:string,foods:string[]}>} */
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
    return `data-muscle-hotspot="${escapeAttr(id)}" role="button" tabindex="0" aria-label="${escapeAttr((byId(id) || {}).name || id)}" aria-pressed="${on ? "true" : "false"}" class="mm-hotspot${on ? " is-on" : ""}" style="cursor:pointer; outline:none;"`;
  }

  function fillFor(id, selected, base) {
    return selected === id ? HL : base || BODY;
  }

  /** Front view SVG with clickable regions */
  function frontSvg(selected) {
    const f = (id) => fillFor(id, selected, BODY);
    const soft = (id) => (selected === id ? HL : BODY_LT);
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 420" width="100%" height="100%" class="muscle-map-svg" aria-label="正面全身肌肉示意圖">
      <rect x="0" y="0" width="200" height="420" fill="${BG}" rx="16"/>
      <!-- head -->
      <circle cx="100" cy="36" r="22" fill="${BODY_LT}" stroke="${OUT}" stroke-width="1.5"/>
      <rect x="92" y="56" width="16" height="14" rx="4" fill="${BODY}"/>
      <!-- delts front / side -->
      <ellipse ${hotspotAttrs("delts-front", selected)} cx="62" cy="88" rx="18" ry="14" fill="${f("delts-front")}" stroke="${OUT}" stroke-width="1.2"/>
      <ellipse ${hotspotAttrs("delts-front", selected)} cx="138" cy="88" rx="18" ry="14" fill="${f("delts-front")}" stroke="${OUT}" stroke-width="1.2"/>
      <ellipse ${hotspotAttrs("delts-side", selected)} cx="48" cy="92" rx="10" ry="12" fill="${f("delts-side")}" stroke="${OUT}" stroke-width="1"/>
      <ellipse ${hotspotAttrs("delts-side", selected)} cx="152" cy="92" rx="10" ry="12" fill="${f("delts-side")}" stroke="${OUT}" stroke-width="1"/>
      <!-- pecs -->
      <path ${hotspotAttrs("pecs", selected)} d="M70 78 Q100 70 130 78 L136 128 Q100 142 64 128 Z" fill="${f("pecs")}" stroke="${OUT}" stroke-width="1.4"/>
      <!-- abs / core -->
      <path ${hotspotAttrs("abs", selected)} d="M74 130 Q100 138 126 130 L122 188 Q100 198 78 188 Z" fill="${f("abs")}" stroke="${OUT}" stroke-width="1.2"/>
      <!-- hip flexors band -->
      <path ${hotspotAttrs("hip-flexors", selected)} d="M78 178 Q100 186 122 178 L118 205 Q100 212 82 205 Z" fill="${soft("hip-flexors")}" stroke="${OUT}" stroke-width="1" opacity="0.95"/>
      <!-- biceps -->
      <rect ${hotspotAttrs("biceps", selected)} x="28" y="98" width="20" height="48" rx="9" fill="${f("biceps")}" stroke="${OUT}" stroke-width="1.2" transform="rotate(-10 38 122)"/>
      <rect ${hotspotAttrs("biceps", selected)} x="152" y="98" width="20" height="48" rx="9" fill="${f("biceps")}" stroke="${OUT}" stroke-width="1.2" transform="rotate(10 162 122)"/>
      <!-- forearms -->
      <rect ${hotspotAttrs("forearms", selected)} x="22" y="148" width="16" height="46" rx="7" fill="${f("forearms")}" stroke="${OUT}" stroke-width="1" transform="rotate(-14 30 171)"/>
      <rect ${hotspotAttrs("forearms", selected)} x="162" y="148" width="16" height="46" rx="7" fill="${f("forearms")}" stroke="${OUT}" stroke-width="1" transform="rotate(14 170 171)"/>
      <ellipse cx="18" cy="198" rx="9" ry="8" fill="${BODY_LT}"/>
      <ellipse cx="182" cy="198" rx="9" ry="8" fill="${BODY_LT}"/>
      <!-- quads -->
      <rect ${hotspotAttrs("quads", selected)} x="72" y="205" width="24" height="88" rx="11" fill="${f("quads")}" stroke="${OUT}" stroke-width="1.2"/>
      <rect ${hotspotAttrs("quads", selected)} x="104" y="205" width="24" height="88" rx="11" fill="${f("quads")}" stroke="${OUT}" stroke-width="1.2"/>
      <!-- adductors (inner thigh) -->
      <rect ${hotspotAttrs("adductors", selected)} x="90" y="220" width="10" height="55" rx="5" fill="${soft("adductors")}" stroke="${OUT}" stroke-width="0.8"/>
      <rect ${hotspotAttrs("adductors", selected)} x="100" y="220" width="10" height="55" rx="5" fill="${soft("adductors")}" stroke="${OUT}" stroke-width="0.8"/>
      <!-- calves front hint -->
      <rect ${hotspotAttrs("calves", selected)} x="76" y="298" width="16" height="52" rx="7" fill="${f("calves")}" stroke="${OUT}" stroke-width="1"/>
      <rect ${hotspotAttrs("calves", selected)} x="108" y="298" width="16" height="52" rx="7" fill="${f("calves")}" stroke="${OUT}" stroke-width="1"/>
      <ellipse cx="84" cy="360" rx="16" ry="8" fill="${BODY_LT}"/>
      <ellipse cx="116" cy="360" rx="16" ry="8" fill="${BODY_LT}"/>
      <text x="100" y="400" text-anchor="middle" fill="#9ca3af" font-size="11" font-family="sans-serif">正面 · 撳色塊睇介紹</text>
    </svg>`;
  }

  /** Back view SVG */
  function backSvg(selected) {
    const f = (id) => fillFor(id, selected, BODY);
    const soft = (id) => (selected === id ? HL : BODY_LT);
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 420" width="100%" height="100%" class="muscle-map-svg" aria-label="背面全身肌肉示意圖">
      <rect x="0" y="0" width="200" height="420" fill="${BG}" rx="16"/>
      <circle cx="100" cy="36" r="22" fill="${BODY_LT}" stroke="${OUT}" stroke-width="1.5"/>
      <rect x="92" y="56" width="16" height="14" rx="4" fill="${BODY}"/>
      <!-- traps -->
      <path ${hotspotAttrs("traps", selected)} d="M70 72 Q100 62 130 72 L124 108 Q100 118 76 108 Z" fill="${f("traps")}" stroke="${OUT}" stroke-width="1.3"/>
      <!-- rear delts -->
      <ellipse ${hotspotAttrs("delts-rear", selected)} cx="58" cy="90" rx="16" ry="12" fill="${f("delts-rear")}" stroke="${OUT}" stroke-width="1.2"/>
      <ellipse ${hotspotAttrs("delts-rear", selected)} cx="142" cy="90" rx="16" ry="12" fill="${f("delts-rear")}" stroke="${OUT}" stroke-width="1.2"/>
      <!-- lats -->
      <path ${hotspotAttrs("lats", selected)} d="M68 100 L78 108 L78 175 Q100 188 122 175 L122 108 L132 100 Q148 130 140 175 Q100 200 60 175 Q52 130 68 100 Z" fill="${f("lats")}" stroke="${OUT}" stroke-width="1.3"/>
      <!-- erectors / lower back strip -->
      <path ${hotspotAttrs("erectors", selected)} d="M90 120 L110 120 L108 195 Q100 202 92 195 Z" fill="${soft("erectors")}" stroke="${OUT}" stroke-width="1"/>
      <!-- triceps -->
      <rect ${hotspotAttrs("triceps", selected)} x="30" y="98" width="18" height="50" rx="8" fill="${f("triceps")}" stroke="${OUT}" stroke-width="1.2" transform="rotate(-8 39 123)"/>
      <rect ${hotspotAttrs("triceps", selected)} x="152" y="98" width="18" height="50" rx="8" fill="${f("triceps")}" stroke="${OUT}" stroke-width="1.2" transform="rotate(8 161 123)"/>
      <!-- forearms back -->
      <rect ${hotspotAttrs("forearms", selected)} x="24" y="150" width="15" height="44" rx="6" fill="${f("forearms")}" stroke="${OUT}" stroke-width="1" transform="rotate(-12 31 172)"/>
      <rect ${hotspotAttrs("forearms", selected)} x="161" y="150" width="15" height="44" rx="6" fill="${f("forearms")}" stroke="${OUT}" stroke-width="1" transform="rotate(12 169 172)"/>
      <ellipse cx="20" cy="198" rx="9" ry="8" fill="${BODY_LT}"/>
      <ellipse cx="180" cy="198" rx="9" ry="8" fill="${BODY_LT}"/>
      <!-- glutes -->
      <ellipse ${hotspotAttrs("glutes", selected)} cx="86" cy="215" rx="22" ry="20" fill="${f("glutes")}" stroke="${OUT}" stroke-width="1.3"/>
      <ellipse ${hotspotAttrs("glutes", selected)} cx="114" cy="215" rx="22" ry="20" fill="${f("glutes")}" stroke="${OUT}" stroke-width="1.3"/>
      <!-- hamstrings -->
      <rect ${hotspotAttrs("hamstrings", selected)} x="72" y="235" width="22" height="70" rx="10" fill="${f("hamstrings")}" stroke="${OUT}" stroke-width="1.2"/>
      <rect ${hotspotAttrs("hamstrings", selected)} x="106" y="235" width="22" height="70" rx="10" fill="${f("hamstrings")}" stroke="${OUT}" stroke-width="1.2"/>
      <!-- calves -->
      <path ${hotspotAttrs("calves", selected)} d="M74 308 Q84 300 92 308 L90 355 Q83 362 76 355 Z" fill="${f("calves")}" stroke="${OUT}" stroke-width="1.1"/>
      <path ${hotspotAttrs("calves", selected)} d="M108 308 Q118 300 126 308 L124 355 Q117 362 110 355 Z" fill="${f("calves")}" stroke="${OUT}" stroke-width="1.1"/>
      <ellipse cx="84" cy="368" rx="15" ry="7" fill="${BODY_LT}"/>
      <ellipse cx="116" cy="368" rx="15" ry="7" fill="${BODY_LT}"/>
      <text x="100" y="400" text-anchor="middle" fill="#9ca3af" font-size="11" font-family="sans-serif">背面 · 撳色塊睇介紹</text>
    </svg>`;
  }

  function listForSide(side) {
    if (side === "front") {
      return regions.filter((r) => r.side === "front" || r.side === "both");
    }
    return regions.filter((r) => r.side === "back" || r.side === "both");
  }

  return {
    regions,
    byId,
    frontSvg,
    backSvg,
    listForSide,
    HL
  };
})();
