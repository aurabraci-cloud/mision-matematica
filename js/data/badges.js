/**
 * MISIÓN MATEMÁTICA — CATÁLOGO DE INSIGNIAS Y LOGROS
 * Definición de medallas, iconos, descripciones y condiciones evaluables.
 */

window.GAME_DATA = window.GAME_DATA || {};

window.GAME_DATA.BADGES = [
  {
    id: "badge_first_step",
    title: "Primeros Pasos",
    icon: "🌱",
    description: "Completaste tu primera misión matemática en el reino.",
    checkUnlock: (state) => {
      return Object.values(state.completedMissions || {}).length >= 1;
    }
  },
  {
    id: "badge_master_sum",
    title: "Maestro de las Sumas",
    icon: "🌳",
    description: "Dominaste todas las misiones del Bosque de las Sumas.",
    checkUnlock: (state) => {
      const sumMissions = ["sum_m1", "sum_m2", "sum_m3", "sum_m4"];
      return sumMissions.every(id => state.completedMissions && state.completedMissions[id]);
    }
  },
  {
    id: "badge_guardian_sub",
    title: "Guardián de las Restas",
    icon: "🏜️",
    description: "Superaste el calor del Desierto y dominaste la resta.",
    checkUnlock: (state) => {
      const subMissions = ["sub_m1", "sub_m2", "sub_m3", "sub_m4"];
      return subMissions.every(id => state.completedMissions && state.completedMissions[id]);
    }
  },
  {
    id: "badge_expert_mult",
    title: "Experto en Multiplicaciones",
    icon: "🚀",
    description: "Conquistaste la estación espacial y las tablas cósmicas.",
    checkUnlock: (state) => {
      const mulMissions = ["mul_m1", "mul_m2", "mul_m3", "mul_m4"];
      return mulMissions.every(id => state.completedMissions && state.completedMissions[id]);
    }
  },
  {
    id: "badge_master_div",
    title: "Maestro de las Divisiones",
    icon: "🏰",
    description: "Repartiste con justicia matemática en el Gran Castillo.",
    checkUnlock: (state) => {
      const divMissions = ["div_m1", "div_m2", "div_m3", "div_m4"];
      return divMissions.every(id => state.completedMissions && state.completedMissions[id]);
    }
  },
  {
    id: "badge_hero_comb",
    title: "Héroe de las Operaciones",
    icon: "🌌",
    description: "Desbloqueaste el Templo Cósmico y las operaciones combinadas.",
    checkUnlock: (state) => {
      const combMissions = ["comb_m1", "comb_m2", "comb_m3", "comb_m4"];
      return combMissions.every(id => state.completedMissions && state.completedMissions[id]);
    }
  },
  {
    id: "badge_streak_5",
    title: "Racha Imparable",
    icon: "🔥",
    description: "Lograste 5 respuestas correctas consecutivas.",
    checkUnlock: (state) => (state.maxStreak || 0) >= 5
  },
  {
    id: "badge_streak_10",
    title: "Furia Numérica",
    icon: "⚡",
    description: "¡Increíble racha de 10 aciertos seguidos!",
    checkUnlock: (state) => (state.maxStreak || 0) >= 10
  },
  {
    id: "badge_hint_learner",
    title: "Mente Curiosa",
    icon: "💡",
    description: "Consultaste la pista del sabio para comprender un ejercicio.",
    checkUnlock: (state) => (state.hintsUsed || 0) >= 1
  },
  {
    id: "badge_speed_racer",
    title: "Relámpago Mental",
    icon: "⏱️",
    description: "Superaste con éxito un Reto Contrarreloj.",
    checkUnlock: (state) => (state.specialChallengesCompleted || 0) >= 1
  },
  {
    id: "badge_crystal_collector",
    title: "Coleccionista de Cristales",
    icon: "💎",
    description: "Reuniste los 5 Cristales Sagrados del Conocimiento.",
    checkUnlock: (state) => {
      const crystals = state.crystals || {};
      return ["bosque_sumas", "desierto_restas", "planeta_mult", "castillo_div", "templo_operaciones"]
        .every(id => crystals[id]);
    }
  },
  {
    id: "badge_grand_master",
    title: "Archimago Supremo",
    icon: "👑",
    description: "Alcanzaste el máximo Nivel 6 de sabiduría matemática.",
    checkUnlock: (state) => (state.level || 1) >= 6
  }
];
