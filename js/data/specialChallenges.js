/**
 * MISIÓN MATEMÁTICA — RETOS ESPECIALES
 * Retos Contrarreloj, Acertijos del Guardián y Desafíos del Cristal.
 */

window.GAME_DATA = window.GAME_DATA || {};

window.GAME_DATA.SPECIAL_CHALLENGES = {
  timeTrials: [
    {
      id: "tt_bosque",
      territoryId: "bosque_sumas",
      title: "⚡ Reto Contrarreloj: Brisa del Bosque",
      description: "¡Resuelve 5 sumas antes de que caigan todas las hojas mágicas!",
      durationSeconds: 60,
      targetCount: 5,
      xpReward: 120,
      coinReward: 35,
      questions: [
        { q: "4 + 5 = ?", a: 9, options: [8, 9, 10, 11] },
        { q: "8 + 6 = ?", a: 14, options: [13, 14, 15, 16] },
        { q: "12 + 7 = ?", a: 19, options: [18, 19, 20, 21] },
        { q: "15 + 15 = ?", a: 30, options: [25, 28, 30, 32] },
        { q: "24 + 18 = ?", a: 42, options: [38, 40, 42, 44] }
      ]
    },
    {
      id: "tt_desierto",
      territoryId: "desierto_restas",
      title: "⚡ Reto Contrarreloj: Tormenta de Arena",
      description: "¡Resuelve 5 restas rápidas para encontrar el oasis!",
      durationSeconds: 60,
      targetCount: 5,
      xpReward: 140,
      coinReward: 40,
      questions: [
        { q: "10 - 4 = ?", a: 6, options: [5, 6, 7, 8] },
        { q: "17 - 9 = ?", a: 8, options: [7, 8, 9, 10] },
        { q: "25 - 8 = ?", a: 17, options: [16, 17, 18, 19] },
        { q: "40 - 15 = ?", a: 25, options: [20, 25, 30, 35] },
        { q: "52 - 24 = ?", a: 28, options: [26, 27, 28, 29] }
      ]
    },
    {
      id: "tt_galactico",
      territoryId: "planeta_mult",
      title: "⚡ Reto Contrarreloj: Propulsión Cósmica",
      description: "¡Activa los 5 propulsores con multiplicaciones certeras!",
      durationSeconds: 60,
      targetCount: 5,
      xpReward: 160,
      coinReward: 45,
      questions: [
        { q: "3 × 4 = ?", a: 12, options: [10, 12, 14, 16] },
        { q: "6 × 5 = ?", a: 30, options: [25, 30, 35, 40] },
        { q: "7 × 8 = ?", a: 56, options: [54, 56, 58, 62] },
        { q: "9 × 6 = ?", a: 54, options: [48, 52, 54, 56] },
        { q: "8 × 8 = ?", a: 64, options: [60, 62, 64, 72] }
      ]
    }
  ],
  guardianRiddles: [
    {
      id: "riddle_templo",
      territoryId: "templo_operaciones",
      title: "🧠 Acertijo del Gran Búho Matemático",
      story: "El sabio del Templo te muestra un grabado antiguo con tres cofres mágicos.",
      riddleText: "Pienso en un número. Si lo multiplico por 4 y luego le sumo 6, el resultado es 26. ¿Cuál es mi número?",
      equationHint: "(X × 4) + 6 = 26",
      correctAnswer: 5,
      options: [4, 5, 6, 7],
      hint: "Haz el camino inverso: a 26 réstale 6 (da 20), y luego divide 20 entre 4.",
      explanation: "¡Exacto! 5 × 4 = 20, y 20 + 6 = 26. ¡Has resuelto el enigma del Búho!",
      xpReward: 200,
      coinReward: 50
    }
  ]
};
