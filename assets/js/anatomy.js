/* 健身教練 Lite — 原創簡化解剖 SVG（示意，非抄襲） */
window.FITNESS_ANATOMY = (function () {
  "use strict";

  const HL = "#ff6a2a";
  const BODY = "#6b7280";
  const BODY_LT = "#9ca3af";
  const OUT = "#4b5563";

  function svgWrap(inner, opts) {
    const w = (opts && opts.w) || 160;
    const h = (opts && opts.h) || 200;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="100%" height="100%" aria-hidden="true" class="anatomy-svg">${inner}</svg>`;
  }

  /** Standing figure with optional highlights: chest, back, shoulders, arms(biceps|triceps), legs, core */
  function standing(highlights) {
    const hl = highlights || {};
    const arm = hl.arms === "triceps" ? "triceps" : hl.arms === "biceps" ? "biceps" : hl.arms ? "biceps" : null;
    // anatomy parts
    // legs
    const legFill = hl.legs ? HL : BODY;
    // core
    const coreFill = hl.core ? HL : BODY;
    // chest
    const chestFill = hl.chest ? HL : BODY;
    // shoulders
    const shFill = hl.shoulders ? HL : BODY;
    // back (shown as rear torso strip when needed — front view uses mid-back hint)
    const backFill = hl.back ? HL : BODY;
    // biceps / triceps overlays on upper arms
    const biFill = arm === "biceps" ? HL : BODY;
    const triFill = arm === "triceps" ? HL : BODY;

    return svgWrap(`
      <rect x="0" y="0" width="160" height="200" fill="#f3f4f6" rx="8"/>
      <!-- head -->
      <circle cx="80" cy="28" r="14" fill="${BODY_LT}" stroke="${OUT}" stroke-width="1.5"/>
      <!-- neck -->
      <rect x="74" y="40" width="12" height="10" rx="3" fill="${BODY}"/>
      <!-- shoulders -->
      <ellipse cx="52" cy="58" rx="14" ry="10" fill="${shFill}" stroke="${OUT}" stroke-width="1"/>
      <ellipse cx="108" cy="58" rx="14" ry="10" fill="${shFill}" stroke="${OUT}" stroke-width="1"/>
      <!-- torso / chest -->
      <path d="M58 52 Q80 48 102 52 L108 95 Q80 108 52 95 Z" fill="${chestFill}" stroke="${OUT}" stroke-width="1.2"/>
      <!-- core band -->
      <path d="M56 92 Q80 100 104 92 L100 118 Q80 124 60 118 Z" fill="${coreFill}" stroke="${OUT}" stroke-width="1"/>
      <!-- back hint (rear diamond under chest when back highlighted) -->
      ${hl.back ? `<path d="M68 62 L80 72 L92 62 L88 88 L80 94 L72 88 Z" fill="${backFill}" opacity="0.85"/>` : ""}
      <!-- upper arms -->
      <rect x="30" y="62" width="16" height="36" rx="7" fill="${biFill}" stroke="${OUT}" stroke-width="1" transform="rotate(-8 38 80)"/>
      <rect x="114" y="62" width="16" height="36" rx="7" fill="${biFill}" stroke="${OUT}" stroke-width="1" transform="rotate(8 122 80)"/>
      ${arm === "triceps" ? `
        <rect x="33" y="64" width="10" height="32" rx="5" fill="${triFill}" transform="rotate(-8 38 80)"/>
        <rect x="117" y="64" width="10" height="32" rx="5" fill="${triFill}" transform="rotate(8 122 80)"/>
      ` : ""}
      <!-- forearms -->
      <rect x="26" y="96" width="14" height="32" rx="6" fill="${BODY}" stroke="${OUT}" stroke-width="1" transform="rotate(-12 33 112)"/>
      <rect x="120" y="96" width="14" height="32" rx="6" fill="${BODY}" stroke="${OUT}" stroke-width="1" transform="rotate(12 127 112)"/>
      <!-- hands / dumbbells hint -->
      <circle cx="22" cy="132" r="7" fill="${BODY_LT}" stroke="${OUT}" stroke-width="1"/>
      <circle cx="138" cy="132" r="7" fill="${BODY_LT}" stroke="${OUT}" stroke-width="1"/>
      <rect x="12" y="128" width="20" height="8" rx="3" fill="#374151"/>
      <rect x="128" y="128" width="20" height="8" rx="3" fill="#374151"/>
      <!-- legs -->
      <rect x="58" y="118" width="18" height="52" rx="8" fill="${legFill}" stroke="${OUT}" stroke-width="1"/>
      <rect x="84" y="118" width="18" height="52" rx="8" fill="${legFill}" stroke="${OUT}" stroke-width="1"/>
      <!-- feet -->
      <ellipse cx="66" cy="176" rx="14" ry="7" fill="${BODY_LT}"/>
      <ellipse cx="94" cy="176" rx="14" ry="7" fill="${BODY_LT}"/>
    `, { w: 160, h: 200 });
  }

  /** Curl pose — arm bent, biceps focus */
  function curl(highlights) {
    const hl = Object.assign({ arms: "biceps" }, highlights || {});
    const bi = HL;
    const sh = hl.shoulders ? HL : BODY;
    return svgWrap(`
      <rect x="0" y="0" width="160" height="200" fill="#f3f4f6" rx="8"/>
      <circle cx="80" cy="26" r="13" fill="${BODY_LT}" stroke="${OUT}" stroke-width="1.5"/>
      <rect x="74" y="38" width="12" height="9" rx="3" fill="${BODY}"/>
      <ellipse cx="54" cy="55" rx="12" ry="9" fill="${sh}" stroke="${OUT}" stroke-width="1"/>
      <ellipse cx="106" cy="55" rx="12" ry="9" fill="${sh}" stroke="${OUT}" stroke-width="1"/>
      <path d="M60 50 Q80 46 100 50 L104 100 Q80 110 56 100 Z" fill="${BODY}" stroke="${OUT}" stroke-width="1.2"/>
      <!-- bent left arm curl -->
      <rect x="28" y="58" width="18" height="34" rx="8" fill="${bi}" stroke="${OUT}" stroke-width="1.2" transform="rotate(-25 37 75)"/>
      <rect x="18" y="78" width="14" height="28" rx="6" fill="${BODY}" stroke="${OUT}" stroke-width="1" transform="rotate(-95 25 92)"/>
      <rect x="8" y="68" width="22" height="8" rx="3" fill="#374151"/>
      <!-- right arm -->
      <rect x="114" y="58" width="18" height="34" rx="8" fill="${bi}" stroke="${OUT}" stroke-width="1.2" transform="rotate(25 123 75)"/>
      <rect x="128" y="78" width="14" height="28" rx="6" fill="${BODY}" stroke="${OUT}" stroke-width="1" transform="rotate(95 135 92)"/>
      <rect x="130" y="68" width="22" height="8" rx="3" fill="#374151"/>
      <rect x="60" y="108" width="16" height="48" rx="7" fill="${BODY}" stroke="${OUT}" stroke-width="1"/>
      <rect x="84" y="108" width="16" height="48" rx="7" fill="${BODY}" stroke="${OUT}" stroke-width="1"/>
      <ellipse cx="68" cy="162" rx="12" ry="6" fill="${BODY_LT}"/>
      <ellipse cx="92" cy="162" rx="12" ry="6" fill="${BODY_LT}"/>
    `);
  }

  /** Overhead press pose */
  function press(highlights) {
    const hl = highlights || {};
    const sh = hl.shoulders || hl.arms ? HL : BODY;
    const arm = hl.arms === "triceps" ? HL : (hl.shoulders ? HL : BODY);
    const chest = hl.chest ? HL : BODY;
    return svgWrap(`
      <rect x="0" y="0" width="160" height="200" fill="#f3f4f6" rx="8"/>
      <circle cx="80" cy="40" r="13" fill="${BODY_LT}" stroke="${OUT}" stroke-width="1.5"/>
      <rect x="74" y="52" width="12" height="8" rx="3" fill="${BODY}"/>
      <ellipse cx="52" cy="68" rx="14" ry="10" fill="${sh}" stroke="${OUT}" stroke-width="1"/>
      <ellipse cx="108" cy="68" rx="14" ry="10" fill="${sh}" stroke="${OUT}" stroke-width="1"/>
      <path d="M58 62 Q80 58 102 62 L106 105 Q80 116 54 105 Z" fill="${chest}" stroke="${OUT}" stroke-width="1.2"/>
      <!-- arms up -->
      <rect x="38" y="18" width="16" height="48" rx="7" fill="${arm}" stroke="${OUT}" stroke-width="1" transform="rotate(-5 46 42)"/>
      <rect x="106" y="18" width="16" height="48" rx="7" fill="${arm}" stroke="${OUT}" stroke-width="1" transform="rotate(5 114 42)"/>
      <rect x="34" y="8" width="24" height="10" rx="3" fill="#374151"/>
      <rect x="102" y="8" width="24" height="10" rx="3" fill="#374151"/>
      <path d="M56 102 Q80 110 104 102 L100 125 Q80 130 60 125 Z" fill="${hl.core ? HL : BODY}" stroke="${OUT}" stroke-width="1"/>
      <rect x="60" y="125" width="16" height="42" rx="7" fill="${hl.legs ? HL : BODY}" stroke="${OUT}" stroke-width="1"/>
      <rect x="84" y="125" width="16" height="42" rx="7" fill="${hl.legs ? HL : BODY}" stroke="${OUT}" stroke-width="1"/>
      <ellipse cx="68" cy="174" rx="12" ry="6" fill="${BODY_LT}"/>
      <ellipse cx="92" cy="174" rx="12" ry="6" fill="${BODY_LT}"/>
    `);
  }

  /** Row / hinge pose (bent over) */
  function row(highlights) {
    const hl = highlights || {};
    const back = hl.back ? HL : BODY;
    const arm = hl.arms ? HL : BODY;
    return svgWrap(`
      <rect x="0" y="0" width="160" height="200" fill="#f3f4f6" rx="8"/>
      <!-- bench hint -->
      <rect x="20" y="120" width="70" height="12" rx="3" fill="#d1d5db"/>
      <rect x="30" y="132" width="10" height="40" fill="#9ca3af"/>
      <rect x="70" y="132" width="10" height="40" fill="#9ca3af"/>
      <!-- bent torso -->
      <ellipse cx="55" cy="95" rx="28" ry="14" fill="${back}" stroke="${OUT}" stroke-width="1.2" transform="rotate(-25 55 95)"/>
      <circle cx="38" cy="72" r="12" fill="${BODY_LT}" stroke="${OUT}" stroke-width="1.5"/>
      <!-- supporting arm -->
      <rect x="48" y="100" width="12" height="28" rx="5" fill="${BODY}" transform="rotate(20 54 114)"/>
      <!-- pulling arm -->
      <rect x="78" y="78" width="36" height="14" rx="7" fill="${arm}" stroke="${OUT}" stroke-width="1.2"/>
      <rect x="108" y="72" width="22" height="10" rx="3" fill="#374151"/>
      <!-- legs -->
      <rect x="70" y="110" width="14" height="50" rx="6" fill="${hl.legs ? HL : BODY}" stroke="${OUT}" stroke-width="1"/>
      <ellipse cx="78" cy="168" rx="14" ry="7" fill="${BODY_LT}"/>
    `);
  }

  /** Squat pose */
  function squat(highlights) {
    const hl = highlights || {};
    const legs = hl.legs ? HL : BODY;
    const core = hl.core ? HL : BODY;
    return svgWrap(`
      <rect x="0" y="0" width="160" height="200" fill="#f3f4f6" rx="8"/>
      <circle cx="80" cy="22" r="12" fill="${BODY_LT}" stroke="${OUT}" stroke-width="1.5"/>
      <rect x="74" y="33" width="12" height="8" rx="3" fill="${BODY}"/>
      <ellipse cx="55" cy="50" rx="12" ry="8" fill="${BODY}" stroke="${OUT}" stroke-width="1"/>
      <ellipse cx="105" cy="50" rx="12" ry="8" fill="${BODY}" stroke="${OUT}" stroke-width="1"/>
      <path d="M58 45 Q80 42 102 45 L104 78 Q80 86 56 78 Z" fill="${BODY}" stroke="${OUT}" stroke-width="1"/>
      <path d="M58 76 Q80 82 102 76 L98 100 Q80 106 62 100 Z" fill="${core}" stroke="${OUT}" stroke-width="1"/>
      <!-- thighs -->
      <rect x="48" y="98" width="22" height="40" rx="10" fill="${legs}" stroke="${OUT}" stroke-width="1.2" transform="rotate(-20 59 118)"/>
      <rect x="90" y="98" width="22" height="40" rx="10" fill="${legs}" stroke="${OUT}" stroke-width="1.2" transform="rotate(20 101 118)"/>
      <!-- shanks -->
      <rect x="42" y="138" width="16" height="36" rx="7" fill="${legs}" stroke="${OUT}" stroke-width="1"/>
      <rect x="102" y="138" width="16" height="36" rx="7" fill="${legs}" stroke="${OUT}" stroke-width="1"/>
      <ellipse cx="50" cy="180" rx="14" ry="7" fill="${BODY_LT}"/>
      <ellipse cx="110" cy="180" rx="14" ry="7" fill="${BODY_LT}"/>
      <!-- arms forward for balance -->
      <rect x="28" y="55" width="14" height="40" rx="6" fill="${BODY}" transform="rotate(40 35 75)"/>
      <rect x="118" y="55" width="14" height="40" rx="6" fill="${BODY}" transform="rotate(-40 125 75)"/>
    `);
  }

  /** Plank / pushup horizontal */
  function plank(highlights) {
    const hl = highlights || {};
    const core = hl.core || hl.chest ? HL : BODY;
    const arms = hl.arms || hl.chest ? HL : BODY;
    return svgWrap(`
      <rect x="0" y="0" width="160" height="200" fill="#f3f4f6" rx="8"/>
      <rect x="10" y="150" width="140" height="8" rx="2" fill="#e5e7eb"/>
      <!-- body horizontal -->
      <ellipse cx="90" cy="118" rx="48" ry="16" fill="${core}" stroke="${OUT}" stroke-width="1.2"/>
      <circle cx="40" cy="112" r="12" fill="${BODY_LT}" stroke="${OUT}" stroke-width="1.5"/>
      <!-- arms -->
      <rect x="48" y="118" width="12" height="36" rx="5" fill="${arms}" stroke="${OUT}" stroke-width="1"/>
      <rect x="100" y="118" width="12" height="36" rx="5" fill="${arms}" stroke="${OUT}" stroke-width="1"/>
      <!-- legs -->
      <rect x="120" y="110" width="36" height="14" rx="6" fill="${hl.legs ? HL : BODY}" stroke="${OUT}" stroke-width="1"/>
      <ellipse cx="158" cy="118" rx="8" ry="6" fill="${BODY_LT}"/>
    `, { w: 160, h: 200 });
  }

  /** Wrong vs right mini stick for spine cue */
  function formCompare(kind) {
    // kind: 'spine' | 'elbow' | 'knee' | 'head'
    if (kind === "elbow") {
      return {
        wrong: svgWrap(`
          <rect width="140" height="160" fill="#1a1a1a" rx="6"/>
          <circle cx="70" cy="28" r="10" fill="#9ca3af"/>
          <line x1="70" y1="38" x2="70" y2="70" stroke="#9ca3af" stroke-width="6" stroke-linecap="round"/>
          <line x1="70" y1="55" x2="110" y2="40" stroke="#9ca3af" stroke-width="6" stroke-linecap="round"/>
          <line x1="110" y1="40" x2="125" y2="70" stroke="#9ca3af" stroke-width="5" stroke-linecap="round"/>
          <line x1="55" y1="55" x2="100" y2="35" stroke="#ef4444" stroke-width="3" stroke-dasharray="4 3"/>
          <text x="70" y="145" text-anchor="middle" fill="#f87171" font-size="11" font-family="sans-serif">肘甩開</text>
        `, { w: 140, h: 160 }),
        right: svgWrap(`
          <rect width="140" height="160" fill="#1a1a1a" rx="6"/>
          <circle cx="70" cy="28" r="10" fill="#9ca3af"/>
          <line x1="70" y1="38" x2="70" y2="70" stroke="#9ca3af" stroke-width="6" stroke-linecap="round"/>
          <line x1="70" y1="55" x2="95" y2="90" stroke="#9ca3af" stroke-width="6" stroke-linecap="round"/>
          <line x1="95" y1="90" x2="100" y2="55" stroke="#9ca3af" stroke-width="5" stroke-linecap="round"/>
          <line x1="70" y1="50" x2="95" y2="88" stroke="#22c55e" stroke-width="3"/>
          <text x="70" y="145" text-anchor="middle" fill="#4ade80" font-size="11" font-family="sans-serif">肘貼身側</text>
        `, { w: 140, h: 160 })
      };
    }
    if (kind === "knee") {
      return {
        wrong: svgWrap(`
          <rect width="140" height="160" fill="#1a1a1a" rx="6"/>
          <circle cx="70" cy="22" r="9" fill="#9ca3af"/>
          <line x1="70" y1="31" x2="70" y2="70" stroke="#9ca3af" stroke-width="6" stroke-linecap="round"/>
          <line x1="70" y1="70" x2="45" y2="110" stroke="#9ca3af" stroke-width="6" stroke-linecap="round"/>
          <line x1="70" y1="70" x2="100" y2="110" stroke="#9ca3af" stroke-width="6" stroke-linecap="round"/>
          <line x1="45" y1="110" x2="40" y2="145" stroke="#9ca3af" stroke-width="5"/>
          <line x1="100" y1="110" x2="115" y2="145" stroke="#9ca3af" stroke-width="5"/>
          <line x1="55" y1="95" x2="90" y2="95" stroke="#ef4444" stroke-width="3"/>
          <text x="70" y="155" text-anchor="middle" fill="#f87171" font-size="11" font-family="sans-serif">膝內扣</text>
        `, { w: 140, h: 160 }),
        right: svgWrap(`
          <rect width="140" height="160" fill="#1a1a1a" rx="6"/>
          <circle cx="70" cy="22" r="9" fill="#9ca3af"/>
          <line x1="70" y1="31" x2="70" y2="70" stroke="#9ca3af" stroke-width="6" stroke-linecap="round"/>
          <line x1="70" y1="70" x2="50" y2="110" stroke="#9ca3af" stroke-width="6" stroke-linecap="round"/>
          <line x1="70" y1="70" x2="90" y2="110" stroke="#9ca3af" stroke-width="6" stroke-linecap="round"/>
          <line x1="50" y1="110" x2="48" y2="145" stroke="#9ca3af" stroke-width="5"/>
          <line x1="90" y1="110" x2="92" y2="145" stroke="#9ca3af" stroke-width="5"/>
          <line x1="50" y1="90" x2="50" y2="140" stroke="#22c55e" stroke-width="2.5"/>
          <line x1="90" y1="90" x2="90" y2="140" stroke="#22c55e" stroke-width="2.5"/>
          <text x="70" y="155" text-anchor="middle" fill="#4ade80" font-size="11" font-family="sans-serif">膝對腳尖</text>
        `, { w: 140, h: 160 })
      };
    }
    if (kind === "head") {
      return {
        wrong: svgWrap(`
          <rect width="140" height="160" fill="#1a1a1a" rx="6"/>
          <circle cx="85" cy="35" r="11" fill="#9ca3af"/>
          <line x1="70" y1="55" x2="70" y2="120" stroke="#9ca3af" stroke-width="7" stroke-linecap="round"/>
          <line x1="70" y1="55" x2="85" y2="42" stroke="#9ca3af" stroke-width="5"/>
          <path d="M68 50 Q90 45 95 30" fill="none" stroke="#ef4444" stroke-width="3"/>
          <text x="70" y="145" text-anchor="middle" fill="#f87171" font-size="11" font-family="sans-serif">頭前伸／仰</text>
        `, { w: 140, h: 160 }),
        right: svgWrap(`
          <rect width="140" height="160" fill="#1a1a1a" rx="6"/>
          <circle cx="70" cy="28" r="11" fill="#9ca3af"/>
          <line x1="70" y1="39" x2="70" y2="120" stroke="#9ca3af" stroke-width="7" stroke-linecap="round"/>
          <line x1="70" y1="28" x2="70" y2="50" stroke="#22c55e" stroke-width="3"/>
          <text x="70" y="145" text-anchor="middle" fill="#4ade80" font-size="11" font-family="sans-serif">頸中立</text>
        `, { w: 140, h: 160 })
      };
    }
    // default spine
    return {
      wrong: svgWrap(`
        <rect width="140" height="160" fill="#1a1a1a" rx="6"/>
        <circle cx="78" cy="28" r="10" fill="#9ca3af"/>
        <path d="M70 40 Q95 70 65 100 Q90 125 70 145" fill="none" stroke="#9ca3af" stroke-width="7" stroke-linecap="round"/>
        <path d="M72 45 Q100 75 60 105" fill="none" stroke="#ef4444" stroke-width="3"/>
        <text x="70" y="155" text-anchor="middle" fill="#f87171" font-size="11" font-family="sans-serif">圓背／塌腰</text>
      `, { w: 140, h: 160 }),
      right: svgWrap(`
        <rect width="140" height="160" fill="#1a1a1a" rx="6"/>
        <circle cx="70" cy="26" r="10" fill="#9ca3af"/>
        <line x1="70" y1="36" x2="70" y2="145" stroke="#9ca3af" stroke-width="7" stroke-linecap="round"/>
        <line x1="70" y1="40" x2="70" y2="140" stroke="#22c55e" stroke-width="3"/>
        <text x="70" y="155" text-anchor="middle" fill="#4ade80" font-size="11" font-family="sans-serif">脊柱中立</text>
      `, { w: 140, h: 160 })
    };
  }

  function highlightsForExercise(ex) {
    const h = {};
    if (!ex) return h;
    (ex.muscles || []).forEach((m) => {
      if (m === "arms") {
        // prefer explicit highlightArms on exercise
        h.arms = ex.highlightArms || "biceps";
      } else {
        h[m] = true;
      }
    });
    if (ex.highlightArms) h.arms = ex.highlightArms;
    return h;
  }

  function poseForExercise(ex) {
    if (!ex) return "standing";
    const id = ex.id || "";
    if (/curl|pushdown|triceps/.test(id)) return /pushdown|triceps|extension/.test(id) ? "press" : "curl";
    if (/press|pushup|pec|bench/.test(id)) return /pushup/.test(id) ? "plank" : "press";
    if (/row|pulldown|face-pull/.test(id)) return "row";
    if (/squat|lunge|leg-press|bridge/.test(id)) return "squat";
    if (/plank/.test(id)) return "plank";
    return "standing";
  }

  function figureForExercise(ex) {
    const hl = highlightsForExercise(ex);
    const pose = poseForExercise(ex);
    switch (pose) {
      case "curl": return curl(hl);
      case "press": return press(hl);
      case "row": return row(hl);
      case "squat": return squat(hl);
      case "plank": return plank(hl);
      default: return standing(hl);
    }
  }

  // fix undeclared var in standing
  function standingFixed(highlights) {
    return standing(highlights);
  }

  return {
    standing: standingFixed,
    curl,
    press,
    row,
    squat,
    plank,
    formCompare,
    figureForExercise,
    highlightsForExercise,
    poseForExercise
  };
})();
