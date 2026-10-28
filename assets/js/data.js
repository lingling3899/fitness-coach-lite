/* 健身教練 Lite — 部位與動作資料（示意教學，非醫療） */
window.FITNESS_DATA = {
  muscles: [
    {
      id: "chest",
      name: "胸",
      emoji: "💪",
      tip: "練胸要留意肩胛微微後夾、唔好聳肩。推嘅時候呼氣，控制下放。新手先學伏地挺身同胸推機，再加蝴蝶夾胸。",
      targets: "胸大肌、前三角肌、三頭肌（輔助）",
      aliases: ["胸", "胸部", "胸肌", "上胸", "下胸", "增肌胸", "pecs", "chest", "推胸", "推胸機", "坐姿推胸", "上斜推胸"],
      moves: ["pushup", "smith-bench", "chest-press-machine", "incline-chest-press", "pec-deck", "dumbbell-press-home"]
    },
    {
      id: "back",
      name: "背",
      emoji: "🫁",
      tip: "練背重點係「拉到肩胛骨郁」，唔係淨係手臂用力。坐姿划船同啞鈴划船最易學到感覺；高位下拉注意唔好過度後仰。",
      targets: "闊背肌、中下斜方、菱形肌、二頭（輔助）",
      aliases: ["背", "背部", "後背", "闊背", "背肌", "增肌背", "back", "lats", "引體", "直臂下壓"],
      moves: ["seated-row", "lat-pulldown", "assisted-pullup", "straight-arm-pulldown", "db-row", "face-pull"]
    },
    {
      id: "shoulders",
      name: "肩",
      emoji: "🏋️",
      tip: "肩關節較脆弱，重量由輕開始。肩推時手肘唔好過度外開；面拉有助後三角同肩胛穩定，建議每週加一兩組。",
      targets: "前／中／後三角肌、斜方上部（輔助）",
      aliases: ["肩", "肩膀", "三角肌", "肩推", "增肌肩", "shoulders", "delts", "側平舉", "飛鳥"],
      moves: ["shoulder-press-machine", "lateral-raise-machine", "db-shoulder-press", "face-pull"]
    },
    {
      id: "arms",
      name: "手臂",
      emoji: "🦾",
      tip: "二頭三頭都要練，先求動作完整再加重量。三頭下壓肘固定喺身側；啞鈴彎舉唔好借腰力甩。",
      targets: "肱二頭肌、肱三頭肌、前臂",
      aliases: ["手臂", "手", "二頭", "三頭", "肱二頭", "肱三頭", "胳膊", "arms", "biceps", "triceps"],
      moves: ["triceps-pushdown", "db-curl", "pushup", "db-row"]
    },
    {
      id: "legs",
      name: "腿",
      emoji: "🦵",
      tip: "下肢係全身力量基礎。深蹲同腿舉注意膝蓋對準腳尖方向，腰背保持自然中立。家用可用徒手深蹲、弓步、臀橋起步。",
      targets: "股四頭、腘繩肌、臀大肌、小腿（輔助）",
      aliases: ["腿", "下肢", "大腿", "小腿", "股四", "增肌腿", "legs", "quads", "hamstrings", "蹬腿", "踏板", "腿伸展", "伸膝", "哈克", "腿彎曲", "腘繩", "垂直腿舉"],
      moves: ["smith-squat", "hack-squat", "leg-press", "vertical-leg-press", "dual-pedal-press", "leg-extension", "leg-curl", "bw-squat", "lunge", "glute-bridge"]
    },
    {
      id: "glutes",
      name: "臀",
      emoji: "🍑",
      tip: "練臀重點係髖鉸鏈同頂端夾臀，唔好淨係用腰拱起代替。臀橋、弓步、深蹲都有助臀部發力；控制下放效果更好。",
      targets: "臀大肌、臀中肌（穩定）、腘繩肌（輔助）",
      aliases: ["臀", "臀部", "屁股", "翹臀", "臀肌", "glutes", "glute"],
      moves: ["glute-bridge", "lunge", "bw-squat", "smith-squat", "hack-squat", "leg-press", "vertical-leg-press", "dual-pedal-press", "stair-climber"]
    },
    {
      id: "core",
      name: "核心",
      emoji: "🔥",
      tip: "核心唔止係腹肌，仲包括穩定腰椎同骨盆。平板撑先求時間同姿勢，再進階；呼吸要順，唔好閉氣用力。",
      targets: "腹直肌、腹橫肌、斜腹、豎脊肌（穩定）",
      aliases: ["核心", "腹肌", "腹", "腰腹", "中軸", "core", "abs", "腹部", "抬腿", "捲腹"],
      moves: ["plank", "hanging-leg-raise", "ab-crunch-machine", "glute-bridge", "bw-squat"]
    },
    {
      id: "cardio",
      name: "有氧",
      emoji: "❤️",
      tip: "有氧以能對話嘅輕至中等強度起步，逐步加時間。姿勢保持直立、唔聳肩；踏板／腳踏全程腳掌穩。示意教學，唔係醫療心肺評估。",
      targets: "心肺耐力、下肢（輔助）",
      aliases: ["有氧", "心肺", "跑步", "單車", "橢圓", "樓梯機", "跑步機", "cardio", "有氧器械", "燃脂"],
      moves: ["treadmill", "elliptical", "upright-bike", "recumbent-bike", "stair-climber"]
    }
  ],

  exercises: [
    /* —— 健身房器械 —— */
    {
      id: "smith-squat",
      name: "史密斯深蹲",
      category: "gym",
      muscles: ["legs", "glutes"],
      formCue: "knee",
      wrongCue: "膝內扣、腰過度塌",
      rightCue: "膝對腳尖、腰中立",
      muscleBadge: "腿",
      emoji: "🏋️",
      steps: [
        "槓位置於上斜方，雙腳與肩同寬或稍寬，腳尖微外開。",
        "解鎖安全扣，吸氣下蹲至大腿約平行地面。",
        "膝蓋跟腳尖方向一致，腰背保持中立。",
        "腳跟蹬地站起，呼氣，頂端唔鎖死膝蓋。"
      ],
      mistakes: ["膝蓋內扣", "腰過度塌或過度弓", "腳跟離地", "下放失控"],
      prescription: "新手 3 組 × 8–12 次",
      safety: "先用空槓或極輕重量練軌跡；史密斯軌跡固定，唔強求同自由槓完全一樣深度。"
    },
    {
      id: "smith-bench",
      name: "史密斯推胸",
      category: "gym",
      muscles: ["chest", "arms"],
      formCue: "spine",
      wrongCue: "聳肩、過度拱腰",
      rightCue: "肩胛後夾、腰輕貼",
      muscleBadge: "胸",
      emoji: "🛏️",
      steps: [
        "長凳置於槓下，眼約對槓；雙手略寬於肩握住。",
        "解鎖後下放至槓約胸口上方，手肘約 45°。",
        "呼氣向上推至手臂接近伸直（唔鎖死）。",
        "全程肩胛微後夾貼凳，臀部唔離凳。"
      ],
      mistakes: ["聳肩", "彈槓借力", "手肘過度外開至 90°", "腰過度拱起"],
      prescription: "新手 3 組 × 8–12 次",
      safety: "一定要設安全檔；無保護時重量保守。肩有舊患先咨詢專業人士。"
    },
    {
      id: "leg-press",
      name: "腿舉機",
      category: "gym",
      muscles: ["legs", "glutes"],
      formCue: "knee",
      wrongCue: "臀離墊、膝內扣",
      rightCue: "腰貼墊、膝跟腳尖",
      muscleBadge: "腿",
      emoji: "🦵",
      steps: [
        "坐穩，背貼靠墊；雙腳置踏板上約肩寬。",
        "解鎖後緩慢屈曲膝蓋，至舒適深度（腰唔離墊）。",
        "腳跟發力蹬回，呼氣，頂端唔鎖死膝。",
        "全程核心輕收，頭部靠穩。"
      ],
      mistakes: ["臀部離開靠墊（過度深）", "膝蓋內扣", "鎖死膝蓋", "下放太快"],
      prescription: "新手 3 組 × 10–15 次",
      safety: "深度以腰能貼住為準；重量循序。腳位高低會改變刺激部位，初學用中位即可。"
    },
    {
      id: "seated-row",
      name: "坐姿划船",
      category: "gym",
      muscles: ["back", "arms"],
      formCue: "spine",
      wrongCue: "用腰前後甩",
      rightCue: "軀幹穩、夾肩胛",
      muscleBadge: "背",
      emoji: "🚣",
      steps: [
        "坐穩，腳踏固定，微屈膝；雙手握把手。",
        "軀幹大致直立，拉向腹部／下胸，肘貼身側。",
        "感受肩胛向後夾緊，停半秒。",
        "控制伸直手臂還原，唔借腰前後晃。"
      ],
      mistakes: ["用腰前後甩", "聳肩拉到耳邊", "只彎手肘無肩胛動作", "還原失控"],
      prescription: "新手 3 組 × 10–12 次",
      safety: "重量以能完整夾肩胛為準；下背不適即停，檢查坐姿同腳踏。"
    },
    {
      id: "lat-pulldown",
      name: "高位下拉",
      category: "gym",
      muscles: ["back", "arms"],
      formCue: "spine",
      wrongCue: "過度後仰借力",
      rightCue: "微後傾、拉至上胸",
      muscleBadge: "背",
      emoji: "⬇️",
      steps: [
        "坐穩扣好大腿墊，雙手略寬於肩握槓。",
        "微微後傾（約 10–15°），拉槓至上胸。",
        "肘向下向後，肩胛下壓後夾。",
        "控制回升至手臂伸展但仍有張力。"
      ],
      mistakes: ["過度後仰借力", "拉到颈後（多數人唔建議）", "只用手臂無背感", "聳肩"],
      prescription: "新手 3 組 × 10–12 次",
      safety: "優先拉到胸前；肩活動度不足唔要硬拉颈後。重量以動作完整為先。"
    },
    {
      id: "pec-deck",
      name: "蝴蝶夾胸機",
      category: "gym",
      muscles: ["chest"],
      formCue: "spine",
      wrongCue: "肩向前塌、甩合",
      rightCue: "背貼墊、控制開合",
      muscleBadge: "胸",
      emoji: "🦋",
      steps: [
        "座椅調至手肘約與肩同高，背貼靠墊。",
        "前臂置於墊上（或握手把，視機型）。",
        "呼氣將兩側向中間夾，胸肌收緊停半秒。",
        "吸氣控制打開至有拉伸感但唔過肩。"
      ],
      mistakes: ["用衝力甩合", "肩向前塌", "打開幅度過大拉傷", "靠墊離開"],
      prescription: "新手 3 組 × 12–15 次",
      safety: "開合幅度以肩舒適為限；適合作胸推後輔助，唔建議一開始用極重。"
    },
    {
      id: "face-pull",
      name: "繩索面拉",
      category: "gym",
      muscles: ["shoulders", "back"],
      formCue: "head",
      wrongCue: "變划船、聳肩",
      rightCue: "肘高、外旋至頭側",
      muscleBadge: "肩",
      emoji: "🎯",
      steps: [
        "繩索調至約頭臉高度，握繩兩端。",
        "後退至手臂伸展有張力，微屈膝站穩。",
        "拉向臉／前額兩側，肘高，外旋使手在頭側。",
        "感受後三角同肩胛，控制還原。"
      ],
      mistakes: ["重量過重變成划船", "肘過低", "借腰晃", "全程聳肩"],
      prescription: "新手 3 組 × 12–15 次",
      safety: "輕中重量、高次數較合適；有助肩胛健康，動作質量重過重量。"
    },
    {
      id: "shoulder-press-machine",
      name: "肩推機",
      category: "gym",
      muscles: ["shoulders", "arms"],
      formCue: "spine",
      wrongCue: "過度拱腰、頭前伸",
      rightCue: "背貼墊、頸中立",
      muscleBadge: "肩",
      emoji: "⬆️",
      steps: [
        "座椅調至握把約與肩同高，背貼靠墊。",
        "握住握把，核心收緊。",
        "呼氣向上推至手臂接近伸直。",
        "吸氣下放至約耳肩高度，唔砸到底。"
      ],
      mistakes: ["過度拱腰", "鎖死手肘猛推", "頭部前伸", "下放過低扯肩"],
      prescription: "新手 3 組 × 8–12 次",
      safety: "選坐姿有靠背機型較穩；肩痛或活動受限應減幅度並咨詢專業人士。"
    },
    {
      id: "triceps-pushdown",
      name: "繩索三頭下壓",
      category: "gym",
      muscles: ["arms"],
      highlightArms: "triceps",
      formCue: "elbow",
      wrongCue: "肘甩開離開身側",
      rightCue: "肘固定貼身側",
      muscleBadge: "三頭",
      emoji: "📉",
      steps: [
        "高位滑輪接直槓或繩，肘貼身側。",
        "前臂下壓至手臂伸直，感受三頭收縮。",
        "控制回升至約前臂平行或稍高。",
        "軀幹穩定，唔借肩下壓借力。"
      ],
      mistakes: ["肘離開身側前後甩", "用肩同胸推", "重量過重動作變形", "腕過度屈曲"],
      prescription: "新手 3 組 × 10–15 次",
      safety: "肘關節唔適即減重或停；繩索版可微外展手腕，感覺更集中三頭。"
    },


    {
      id: "dual-pedal-press",
      name: "雙腳踏板蹬腿（坐姿）",
      category: "gym",
      muscles: ["legs", "glutes"],
      formCue: "knee",
      wrongCue: "臀離墊、膝內扣",
      rightCue: "背貼墊、膝跟腳尖",
      muscleBadge: "腿",
      emoji: "🦿",
      steps: [
        "坐穩，背貼靠墊；雙腳分別放喺兩塊獨立踏板上（約中位）。",
        "可雙腳一齊推，或者左右單邊輪流做。",
        "呼氣用腳跟蹬出，身／座椅向後推上去，頂端唔鎖死膝。",
        "吸氣控制屈曲膝蓋還原，腰背保持貼墊、核心輕收。"
      ],
      mistakes: ["臀部離開靠墊", "膝蓋內扣", "鎖死膝蓋猛蹬", "單邊時軀幹側傾"],
      prescription: "新手 3 組 × 10–15 次（單邊則每側 8–12 次）",
      safety: "深度以腰能貼住為準；獨立踏板可練左右平衡，先輕重量求軌跡。示意教學，非醫療建議。"
    },
    {
      id: "leg-extension",
      name: "腿伸展機",
      category: "gym",
      muscles: ["legs"],
      formCue: "knee",
      wrongCue: "借衝力甩起、臀離座",
      rightCue: "控速伸膝、背貼墊",
      muscleBadge: "股四",
      emoji: "🦵",
      steps: [
        "座椅調至膝關節對準機軸；小腿／腳腕抵住前方滾墊。",
        "可雙腳一齊提起，或者左右做一邊。",
        "呼氣伸直膝蓋將滾墊向上抬起，頂端輕停、唔猛鎖死。",
        "吸氣控制下放至舒適屈曲角度，腰背貼靠墊。"
      ],
      mistakes: ["用衝力甩起", "臀部離開座位", "過度鎖死膝蓋", "重量過重致膝前不適"],
      prescription: "新手 3 組 × 10–15 次（單邊則每側 8–12 次）",
      safety: "膝前痛或不適即減重／停；適合作腿日輔助，唔建議一開始用極重。示意非醫療。"
    },
    {
      id: "chest-press-machine",
      name: "坐姿推胸機",
      category: "gym",
      muscles: ["chest", "arms"],
      formCue: "spine",
      wrongCue: "聳肩、過度拱腰",
      rightCue: "肩胛後夾、背貼墊",
      muscleBadge: "胸",
      emoji: "🦾",
      steps: [
        "座椅調至握把約與胸口中位同高，背貼窄靠墊。",
        "雙手握住兩側獨立槓桿手把，肩胛微微後夾。",
        "呼氣向前推至手臂接近伸直（唔鎖死），感受胸肌發力。",
        "吸氣控制還原至胸前有拉伸感但唔過肩。"
      ],
      mistakes: ["聳肩", "用衝力甩推", "過度拱腰離墊", "下放過深扯肩"],
      prescription: "新手 3 組 × 8–12 次",
      safety: "獨立手把可單邊練；肩有舊患先咨詢專業人士，重量循序。示意教學，非醫療建議。"
    },


    {
      id: "hack-squat",
      name: "哈克深蹲機",
      category: "gym",
      muscles: ["legs", "glutes"],
      formCue: "knee",
      wrongCue: "膝內扣、腰離墊",
      rightCue: "背貼墊、膝跟腳尖",
      muscleBadge: "腿臀",
      emoji: "🦿",
      steps: [
        "背貼斜墊，雙肩頂住肩墊；雙腳置踏板約肩寬、中位。",
        "解鎖安全扣，吸氣緩慢屈膝下蹲至舒適深度。",
        "膝蓋跟腳尖方向一致，腰背保持貼墊。",
        "腳跟蹬地站起呼氣，頂端唔鎖死膝蓋。"
      ],
      mistakes: ["膝蓋內扣", "腰離開靠墊", "腳跟離地", "下放失控"],
      prescription: "新手 3 組 × 8–12 次",
      safety: "軌跡固定，深度以腰能貼住為準；重量循序。示意教學，非醫療建議。"
    },
    {
      id: "vertical-leg-press",
      name: "垂直腿舉",
      category: "gym",
      muscles: ["legs", "glutes"],
      formCue: "knee",
      wrongCue: "腰拱離墊、膝內扣",
      rightCue: "腰貼墊、控速蹬",
      muscleBadge: "腿",
      emoji: "⬆️",
      steps: [
        "仰臥穩坐，背貼靠墊；雙腳置垂直踏板約肩寬。",
        "雙手可握側把手；解鎖後緩慢屈膝下放。",
        "至舒適深度（腰唔離墊），呼氣腳跟蹬回。",
        "頂端唔鎖死膝，全程核心輕收。"
      ],
      mistakes: ["腰過度拱起離墊", "膝蓋內扣", "鎖死膝蓋猛蹬", "下放太深失控"],
      prescription: "新手 3 組 × 10–15 次",
      safety: "垂直軌跡負荷感較大，先輕重量；髖或腰不適即减幅度。示意非醫療。"
    },
    {
      id: "leg-curl",
      name: "腿彎曲機",
      category: "gym",
      muscles: ["legs", "glutes"],
      formCue: "knee",
      wrongCue: "借衝力甩起、臀抬離",
      rightCue: "控速屈膝、髖貼墊",
      muscleBadge: "腘繩",
      emoji: "🦵",
      steps: [
        "按機型俯臥或坐姿；膝關節對準機軸，腳踝抵滾墊。",
        "可雙腳一齊，或者左右單邊（機型允許時）。",
        "呼氣屈膝將滾墊向臀部方向拉起，頂端輕停。",
        "吸氣控制伸直還原，髖部貼穩唔借甩。"
      ],
      mistakes: ["用衝力甩起", "臀部抬離墊面", "重量過重致膝後扯", "還原失控"],
      prescription: "新手 3 組 × 10–15 次（單邊則每側 8–12 次）",
      safety: "腘繩／膝後不適即减重；掛片式北歐挺屬進階變化，新手先以機器控軌跡為主。示意非醫療。"
    },
    {
      id: "hanging-leg-raise",
      name: "抬腿訓練器",
      category: "gym",
      muscles: ["core"],
      formCue: "spine",
      wrongCue: "猛甩腿、靠慣性",
      rightCue: "收腹控速抬膝",
      muscleBadge: "腹",
      emoji: "🔼",
      steps: [
        "前臂置臂托，背貼靠墊，身體懸垂穩定。",
        "核心收緊，呼氣將雙膝向胸口方向提起。",
        "頂端輕停，感受腹肌發力，唔靠慣性甩。",
        "吸氣控制下放至雙腿伸展但仍有張力。"
      ],
      mistakes: ["前後大幅甩盪", "只用髖屈肌猛踢", "聳肩離墊", "憋氣"],
      prescription: "新手 3 組 × 8–12 次",
      safety: "肩或下背不適可改屈膝小幅度；進階可直腿抬。示意教學，非醫療建議。"
    },
    {
      id: "ab-crunch-machine",
      name: "腹肌訓練機",
      category: "gym",
      muscles: ["core"],
      formCue: "spine",
      wrongCue: "用頸拉、甩衝力",
      rightCue: "腹發力捲軀幹",
      muscleBadge: "腹",
      emoji: "🔥",
      steps: [
        "座椅調穩，胸墊／手把握於舒適高度，背貼起始位。",
        "核心收緊，呼氣將軀幹向前／向下捲曲。",
        "頂端輕停感受腹直肌，頸保持中立唔用力拉。",
        "吸氣控制回到起始，唔完全放鬆彈回。"
      ],
      mistakes: ["用手或頸硬拉", "用衝力甩", "過度弓腰還原", "重量過重失去腹感"],
      prescription: "新手 3 組 × 10–15 次",
      safety: "下背尖銳痛即停；適合作核心輔助，配合平板撑更全面。示意非醫療。"
    },
    {
      id: "lateral-raise-machine",
      name: "側平舉機",
      category: "gym",
      muscles: ["shoulders"],
      formCue: "head",
      wrongCue: "聳肩、甩重量",
      rightCue: "肘微屈側抬至肩高",
      muscleBadge: "中三角",
      emoji: "🪽",
      steps: [
        "站穩於飛鳥／側平舉機，雙手握側把手（或墊於上臂，視機型）。",
        "核心收緊，肘微屈，呼氣向兩側平舉至約肩高。",
        "頂端感受中三角，唔過度超過肩太多。",
        "吸氣控制下放，全程唔聳肩借斜方。"
      ],
      mistakes: ["聳肩至耳邊", "用衝力甩起", "手臂完全伸直鎖死", "過度後仰借力"],
      prescription: "新手 3 組 × 10–15 次",
      safety: "肩不適减幅度或减重；站姿多方位飛鳥機可調滑輪高度，先求側平軌跡。示意非醫療。"
    },
    {
      id: "assisted-pullup",
      name: "助力引體向上",
      category: "gym",
      muscles: ["back", "arms"],
      formCue: "spine",
      wrongCue: "只彎手無背感、甩腿",
      rightCue: "肩胛下壓再拉起",
      muscleBadge: "背",
      emoji: "🆙",
      steps: [
        "選合適助力（越重助力越易）；膝或腳踩輔助墊，雙手握上方橫槓。",
        "肩胛先下壓後夾，呼氣將身體向上拉。",
        "拉至下巴接近槓或舒適高度，肘向下向後。",
        "吸氣控制下放至手臂伸展但仍有背張力。"
      ],
      mistakes: ["只用手臂弯舉式拉", "身體大幅前後甩", "聳肩縮頸", "下放砸死"],
      prescription: "新手 3 組 × 6–10 次",
      safety: "肩活動受限可改中立握；逐步减助力。示意教學，非醫療建議。"
    },
    {
      id: "straight-arm-pulldown",
      name: "直臂下壓",
      category: "gym",
      muscles: ["back"],
      formCue: "spine",
      wrongCue: "弯肘變下拉、甩腰",
      rightCue: "手臂近似伸直壓至髖",
      muscleBadge: "闊背",
      emoji: "⬇️",
      steps: [
        "站於高位拉力器或直臂下壓機前，雙手握槓／把手，手臂近似伸直。",
        "微屈髖、核心收，呼氣將把手由高位壓向大腿前方。",
        "感受闊背發力，肘保持微屈但唔變成划船。",
        "吸氣控制回升至肩高附近，保持張力。"
      ],
      mistakes: ["過度弯肘變成下拉", "用腰前後甩", "聳肩", "鎖死手肘痛"],
      prescription: "新手 3 組 × 10–12 次",
      safety: "重量以能保持直臂軌跡為準；肩前不适可减幅度。示意非醫療。"
    },
    {
      id: "incline-chest-press",
      name: "上斜坐姿推胸機",
      category: "gym",
      muscles: ["chest", "shoulders", "arms"],
      formCue: "spine",
      wrongCue: "聳肩、過度拱腰",
      rightCue: "肩胛後夾、軌跡斜上",
      muscleBadge: "上胸",
      emoji: "📐",
      steps: [
        "座椅／靠墊呈上斜（約 30–45°），握把約對上胸高度，背貼墊。",
        "肩胛微後夾，雙手握獨立手把。",
        "呼氣向前上方推出至手臂接近伸直（唔鎖死）。",
        "吸氣控制還原至上胸有拉伸感但唔過肩。"
      ],
      mistakes: ["聳肩", "過度拱腰離墊", "用衝力甩推", "下放過深扯肩"],
      prescription: "新手 3 組 × 8–12 次",
      safety: "上斜較易帶到前三角，重量保守；肩舊患先咨詢專業人士。示意非醫療。"
    },
    {
      id: "treadmill",
      name: "跑步機",
      category: "cardio",
      muscles: ["cardio", "legs", "glutes"],
      formCue: "spine",
      wrongCue: "扶手挂身、步幅亂",
      rightCue: "軀幹直、自然步幅",
      muscleBadge: "有氧",
      emoji: "🏃",
      steps: [
        "先站穩兩側踏板，啟動後再踏上跑帶；速度由慢行開始。",
        "目光向前，軀幹直立，手臂自然擺動。",
        "腳掌中前掌着地，步幅自然，唔刻意跨大步。",
        "結束先减速至步行，再停機落機。"
      ],
      mistakes: ["雙手用力挂扶手代步", "低頭看腳", "速度突變失控", "急停跳落"],
      prescription: "新手 15–25 分鐘輕至中等強度（可對話）",
      safety: "夾繩安全鎖；膝踝不適改慢行或停。示意教學，非醫療／心肺評估。"
    },
    {
      id: "elliptical",
      name: "橢圓機",
      category: "cardio",
      muscles: ["cardio", "legs", "glutes"],
      formCue: "spine",
      wrongCue: "挂扶手、駝背",
      rightCue: "直立踩圓、輕握把手",
      muscleBadge: "有氧",
      emoji: "🔄",
      steps: [
        "雙腳踏穩踏板，雙手輕握活動把手或固定把手。",
        "軀幹直立，踩出橢圓軌跡，阻力由低開始。",
        "可正向或反向踩，保持核心輕收。",
        "完成後减阻力减速，再踏穩落機。"
      ],
      mistakes: ["整個人挂在把手上", "過度前傾駝背", "阻力過高令膝硬頂", "踏板未停妥就落機"],
      prescription: "新手 15–25 分鐘輕至中等強度",
      safety: "對關節相對溫和，但仍要循序；暈眩或不適即停。示意非醫療。"
    },
    {
      id: "upright-bike",
      name: "直立單車",
      category: "cardio",
      muscles: ["cardio", "legs"],
      formCue: "knee",
      wrongCue: "座太低膝過度屈、聳肩",
      rightCue: "座高適中、軀幹微傾",
      muscleBadge: "有氧",
      emoji: "🚴",
      steps: [
        "調座高度：腳在最低點時膝約微屈。",
        "雙手輕握車頭，軀幹微前傾但唔塌腰。",
        "腳掌踏穩，以可對話節奏踩動。",
        "結束减速，雙腳踏穩再落車。"
      ],
      mistakes: ["座椅過低致膝過度屈曲", "雙手死握聳肩", "阻力驟加失控", "下背過度圓塌"],
      prescription: "新手 15–25 分鐘輕至中等強度",
      safety: "膝前痛可调高座或减阻力；示意非醫療。"
    },
    {
      id: "recumbent-bike",
      name: "靠背單車",
      category: "cardio",
      muscles: ["cardio", "legs"],
      formCue: "knee",
      wrongCue: "腰離墊、座距不當",
      rightCue: "背貼墊、膝微屈最低點",
      muscleBadge: "有氧",
      emoji: "🪑",
      steps: [
        "坐穩背貼靠墊，調座距至腳最低點膝約微屈。",
        "雙手握前方把手，核心輕收。",
        "以平穩節奏踩動，阻力由低開始。",
        "結束减速，確認踏板停穩再起身。"
      ],
      mistakes: ["腰離開靠墊代發力", "座距過近令膝過度屈", "突然加大阻力", "起身過急失平衡"],
      prescription: "新手 15–25 分鐘輕至中等強度",
      safety: "靠背版對下背較友善，但仍要調好距離；不適即停。示意非醫療。"
    },
    {
      id: "stair-climber",
      name: "樓梯機",
      category: "cardio",
      muscles: ["cardio", "legs", "glutes"],
      formCue: "knee",
      wrongCue: "挂扶手、踩太重砸步",
      rightCue: "軀幹直、輕踩連步",
      muscleBadge: "有氧",
      emoji: "🪜",
      steps: [
        "雙手輕扶側桿保持平衡，唔將體重挂死扶手。",
        "軀幹直立，一步接一步踏上，節奏由慢開始。",
        "全腳掌或中足着步，臀腿發力。",
        "結束减速至可穩站，再落機。"
      ],
      mistakes: ["雙臂挂扶手減負荷過度", "步頻過快失控", "低頭駝背", "膝內扣砸步"],
      prescription: "新手 8–15 分鐘輕至中等強度",
      safety: "強度較高，初學短時間起步；膝踝不適即改其他有氧。示意非醫療。"
    },

    /* —— 家用／徒手／啞鈴 —— */
    {
      id: "bw-squat",
      name: "徒手深蹲",
      category: "home",
      muscles: ["legs", "glutes", "core"],
      formCue: "knee",
      wrongCue: "膝內扣、彎腰",
      rightCue: "膝對腳尖、胸挺",
      muscleBadge: "腿",
      emoji: "🪴",
      steps: [
        "雙腳約肩寬，腳尖微外開，目視前方。",
        "髖先行向後坐，膝隨之屈曲下蹲。",
        "盡量保持胸挺、腰中立，蹲至可控制深度。",
        "腳跟蹬地站起，臀部收緊。"
      ],
      mistakes: ["膝蓋過度內扣", "彎腰駝背", "腳跟抬起", "起身時先抬臀變成前傾"],
      prescription: "新手 3 組 × 10–15 次",
      safety: "膝或髖不適可减小幅度；可扶椅輔助。熱身後再正式組。"
    },
    {
      id: "pushup",
      name: "伏地挺身",
      category: "home",
      muscles: ["chest", "arms", "core"],
      formCue: "spine",
      wrongCue: "塌腰或撅臀",
      rightCue: "頭到腳跟成線",
      muscleBadge: "胸",
      emoji: "🤸",
      steps: [
        "平板支撑姿勢，手略寬於肩，身體成一直線。",
        "吸氣屈曲手肘下放，胸向地面。",
        "肘約 45°，核心收緊唔塌腰。",
        "呼氣推起至手臂伸展。"
      ],
      mistakes: ["塌腰或撅臀", "頭部下垂", "手肘過度貼身或過度外開", "幅度過小"],
      prescription: "新手 3 組 × 6–12 次（可膝撐減難）",
      safety: "腕痛可改用拳面或把手；初學可用靠牆或膝撐版本循序。"
    },
    {
      id: "plank",
      name: "平板撑",
      category: "home",
      muscles: ["core"],
      formCue: "spine",
      wrongCue: "塌腰致下背受力",
      rightCue: "收腹夾臀成線",
      muscleBadge: "核心",
      emoji: "🧱",
      steps: [
        "肘或手撑地，身體從頭到腳跟成一直線。",
        "收腹、夾臀，唔塌腰唔撅高。",
        "目視地面，頸保持中立。",
        "均勻呼吸，維持目標時間。"
      ],
      mistakes: ["塌腰致下背受力", "聳肩", "憋氣", "頭抬太高"],
      prescription: "新手 3 組 × 20–40 秒",
      safety: "下背不適即停，檢查髖位；可改跪姿平板。唔強求長時間。"
    },
    {
      id: "db-row",
      name: "啞鈴划船",
      category: "home",
      muscles: ["back", "arms"],
      formCue: "spine",
      wrongCue: "轉身甩腰、頸仰",
      rightCue: "背平、頸中立拉髖",
      muscleBadge: "背",
      emoji: "🏋️",
      steps: [
        "單膝單手撑凳（或微屈髖站姿單邊），另手持啞鈴。",
        "背約平行地面，肩胛先動，將啞鈴拉向髖側。",
        "肘貼身，頂端夾背停半秒。",
        "控制下放至手臂伸展。"
      ],
      mistakes: ["轉身甩腰", "聳肩", "只用手臂弯舉式拉", "頸過度抬頭"],
      prescription: "新手每側 3 組 × 10–12 次",
      safety: "選可控制之重量；下背緊绷可改單手撑凳減負荷。"
    },
    {
      id: "db-shoulder-press",
      name: "啞鈴肩推",
      category: "home",
      muscles: ["shoulders", "arms"],
      formCue: "spine",
      wrongCue: "過度拱腰、頭前伸",
      rightCue: "核心收、頸中立",
      muscleBadge: "肩",
      emoji: "🏋️",
      steps: [
        "坐姿或站姿，啞鈴舉至肩側，掌心向前或微內旋。",
        "核心收緊，呼氣向上推至頭頂上方。",
        "啞鈴接近但不碰撞，手臂唔鎖死。",
        "吸氣下放回肩側。"
      ],
      mistakes: ["過度拱腰", "借腿蹬借力（除非刻意借力推）", "下放砸肩", "頭部前伸"],
      prescription: "新手 3 組 × 8–12 次",
      safety: "坐姿有靠背較穩；肩活動受限可减幅度。重量雙側要對稱。"
    },
    {
      id: "glute-bridge",
      name: "臀橋",
      category: "home",
      muscles: ["glutes", "legs", "core"],
      formCue: "spine",
      wrongCue: "用腰拱代替夾臀",
      rightCue: "腳跟蹬、頂端夾臀",
      muscleBadge: "臀腿",
      emoji: "🌉",
      steps: [
        "仰臥，膝屈，腳掌着地約與髖同寬。",
        "腳跟蹬地，將髖向上推起。",
        "頂端夾臀，身體由肩到膝成斜線。",
        "控制下放，唔完全放鬆即做下一次。"
      ],
      mistakes: ["用腰過度拱起代替夾臀", "腳離臀部太遠", "膝內扣", "憋氣"],
      prescription: "新手 3 組 × 12–15 次",
      safety: "下背易緊者頂端唔要過度伸展腰椎；可雙腳靠近臀部改善發力。"
    },
    {
      id: "lunge",
      name: "弓步蹲",
      category: "home",
      muscles: ["legs", "glutes"],
      formCue: "knee",
      wrongCue: "前膝內扣或失控",
      rightCue: "前膝對腳尖、軀幹直",
      muscleBadge: "腿",
      emoji: "🚶",
      steps: [
        "站直，向前一大步，雙腳前後分開。",
        "下沉至前膝約 90°、後膝向地面靠近。",
        "前膝大致對準腳尖，軀幹直立。",
        "前腳跟蹬地回站，換邊或行进式連續。"
      ],
      mistakes: ["前膝過度內扣或超脚尖過多", "軀幹前塌", "步距太短致膝超負荷", "失去平衡晃動"],
      prescription: "新手每側 3 組 × 8–10 次",
      safety: "可扶牆保持平衡；膝痛可改後撤弓步或减小幅度。"
    },
    {
      id: "db-curl",
      name: "啞鈴彎舉",
      category: "home",
      muscles: ["arms"],
      highlightArms: "biceps",
      formCue: "elbow",
      wrongCue: "借腰晃、肘前移",
      rightCue: "肘貼身只彎前臂",
      muscleBadge: "二頭",
      emoji: "💪",
      steps: [
        "站直或坐穩，雙手持啞鈴垂於身側。",
        "肘固定身側，呼氣彎舉至肩前。",
        "頂端輕夾二頭，唔借擺動。",
        "吸氣控制下放至手臂伸展。"
      ],
      mistakes: ["借腰前後晃", "肘向前移變成肩動作", "下放過快", "握太死致前臂搶工"],
      prescription: "新手 3 組 × 10–12 次",
      safety: "輕重量專注控制；肘痛應停並檢查是否過度伸展或重量過大。"
    },
    {
      id: "dumbbell-press-home",
      name: "啞鈴胸推（地板／長凳）",
      category: "home",
      muscles: ["chest", "arms"],
      formCue: "spine",
      wrongCue: "過度拱腰、路徑不穩",
      rightCue: "肩胛後夾、控幅度",
      muscleBadge: "胸",
      emoji: "🛏️",
      steps: [
        "仰臥於地板或長凳，啞鈴舉於胸上方，掌心向前。",
        "吸氣屈曲手肘下放至上臂約平行（地板版觸地即停）。",
        "肘約 45°，肩胛微後夾。",
        "呼氣推回起始位置。"
      ],
      mistakes: ["啞鈴路徑不穩", "過度拱腰", "下放過低扯肩（長凳）", "鎖死猛撞"],
      prescription: "新手 3 組 × 8–12 次",
      safety: "地板版幅度較安全適合家用；起立時小心將啞鈴放低再起身。"
    }
  ],


  dailyTips: [
    { id: "warm", emoji: "🔥", text: "開組前花 5–8 分鐘輕量活動同動態伸展，關節熱咗再加重，感覺會穩陣啲。" },
    { id: "breathe", emoji: "🌬️", text: "發力時呼氣、下放時吸氣；唔好全程閉氣，尤其係推／蹲類動作。" },
    { id: "progress", emoji: "📈", text: "進階可以好溫柔：同一動作先求姿勢穩，再慢慢加次數或極小重量，唔使每堂都衝 PR。" },
    { id: "recover", emoji: "😴", text: "肌肉要休息先有空間適應。同一大肌群可隔日再練；睡眠同飲水都係訓練一部分。" },
    { id: "form", emoji: "🎯", text: "寧願輕啲但軌跡清晰，都好過重量大到借腰借勢。有痛（尖銳）即停，唔好硬撐。" }
  ],

  challenge: {
    title: "21 日入門挑戰",
    subtitle: "每日一動作 · 示意圖解 · 而家內建 35 款解剖圖解示意短片 · 其餘可自備連結",
    days: [
      { day: 1, exerciseId: "pushup" },
      { day: 2, exerciseId: "db-curl" },
      { day: 3, exerciseId: "db-shoulder-press" },
      { day: 4, exerciseId: "bw-squat" },
      { day: 5, exerciseId: "db-row" },
      { day: 6, exerciseId: "triceps-pushdown" },
      { day: 7, exerciseId: "plank" },
      { day: 8, exerciseId: "dumbbell-press-home" },
      { day: 9, exerciseId: "lat-pulldown" },
      { day: 10, exerciseId: "face-pull" },
      { day: 11, exerciseId: "lunge" },
      { day: 12, exerciseId: "glute-bridge" },
      { day: 13, exerciseId: "pec-deck" },
      { day: 14, exerciseId: "shoulder-press-machine" },
      { day: 15, exerciseId: "smith-squat" },
      { day: 16, exerciseId: "leg-press" },
      { day: 17, exerciseId: "seated-row" },
      { day: 18, exerciseId: "smith-bench" },
      { day: 19, exerciseId: "dual-pedal-press" },
      { day: 20, exerciseId: "leg-extension" },
      { day: 21, exerciseId: "chest-press-machine" }
    ]
  }
};
