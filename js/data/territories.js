/**
 * MISIÓN MATEMÁTICA — DEFINICIÓN DE TERRITORIOS Y CRISTALES
 * Configuración narrativa, visual y requisitos de desbloqueo.
 */

window.GAME_DATA = window.GAME_DATA || {};

window.GAME_DATA.TERRITORIES = [
  {
    id: "bosque_sumas",
    name: "Bosque de las Sumas",
    icon: "🌳",
    gemIcon: "💚",
    gemName: "Cristal Esmeralda",
    themeColor: "#10b981",
    themeGlow: "rgba(16, 185, 129, 0.45)",
    gemClass: "gem-bosque",
    operation: "+",
    operationName: "Suma",
    description: "Un bosque mágico donde los árboles dan frutos mágicos que aumentan al juntarse.",
    lore: "Los antiguos Guardianes protegían el bosque uniendo fuerzas. Para restaurar su energía, debes dominar el arte de agrupar y sumar cantidades.",
    requiredTerritoryId: null, // Desbloqueado desde el inicio
    requiredMissions: 0,
    missionsCount: 4
  },
  {
    id: "desierto_restas",
    name: "Desierto de las Restas",
    icon: "🏜️",
    gemIcon: "💛",
    gemName: "Cristal Ámbar",
    themeColor: "#f59e0b",
    themeGlow: "rgba(245, 158, 11, 0.45)",
    gemClass: "gem-desierto",
    operation: "-",
    operationName: "Resta",
    description: "Dunas doradas donde el viento transporta arena y descubres la diferencia entre lo que queda y lo que se fue.",
    lore: "El sol del desierto consume las reservas de agua de los exploradores. Aprende a calcular diferencias y lo que necesitas para sobrevivir.",
    requiredTerritoryId: "bosque_sumas",
    requiredMissions: 3, // Requiere al menos 3 misiones del bosque
    missionsCount: 4
  },
  {
    id: "planeta_mult",
    name: "Planeta de las Multiplicaciones",
    icon: "🚀",
    gemIcon: "💙",
    gemName: "Cristal Zafiro",
    themeColor: "#3b82f6",
    themeGlow: "rgba(59, 130, 246, 0.45)",
    gemClass: "gem-planeta",
    operation: "×",
    operationName: "Multiplicación",
    description: "Una estación espacial orbital con colonias alienígenas organizadas en cuadrículas perfectas.",
    lore: "Los reactores estelares necesitan paquetes iguales de energía cuántica. ¡Multiplicar te permitirá viajar más rápido que la luz!",
    requiredTerritoryId: "desierto_restas",
    requiredMissions: 3,
    missionsCount: 4
  },
  {
    id: "castillo_div",
    name: "Castillo de las Divisiones",
    icon: "🏰",
    gemIcon: "💜",
    gemName: "Cristal Amatista",
    themeColor: "#8b5cf6",
    themeGlow: "rgba(139, 92, 246, 0.45)",
    gemClass: "gem-castillo",
    operation: "÷",
    operationName: "División",
    description: "Un imponente castillo medieval donde se reparten tesoros y raciones con absoluta justicia equitativa.",
    lore: "El Rey de los Números exige que todos los habitantes reciban partes exactamente iguales. Aprende a repartir sin dejar a nadie atrás.",
    requiredTerritoryId: "planeta_mult",
    requiredMissions: 3,
    missionsCount: 4
  },
  {
    id: "templo_operaciones",
    name: "Templo de las Operaciones",
    icon: "🌌",
    gemIcon: "💎",
    gemName: "Cristal Diamante Supremo",
    themeColor: "#ec4899",
    themeGlow: "rgba(236, 72, 153, 0.45)",
    gemClass: "gem-templo",
    operation: "∑",
    operationName: "Operaciones Combinadas",
    description: "El santuario místico del cosmos donde convergen todos los poderes matemáticos en perfecta armonía.",
    lore: "La prueba final para el Archimago de los Números: resolver ecuaciones donde varias operaciones trabajan juntas siguiendo el Orden Sagrado.",
    requiredTerritoryId: "castillo_div",
    requiredMissions: 3,
    missionsCount: 4
  }
];
