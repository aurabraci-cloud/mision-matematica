/**
 * MISIÓN MATEMÁTICA — SUITE DE PRUEBAS DE CALIDAD (QA TESTING)
 * Verifica el funcionamiento integral de la lógica de juego, gamificación,
 * estado, validador y adaptabilidad pedagógica.
 */

// Simulación de entorno de navegador (DOM & LocalStorage)
let storageData = {};
global.localStorage = {
  getItem: (key) => storageData[key] || null,
  setItem: (key, val) => { storageData[key] = String(val); },
  removeItem: (key) => { delete storageData[key]; },
  clear: () => { storageData = {}; }
};

let lastSpokenText = "";
let spokenQueue = [];

global.SpeechSynthesisUtterance = class {
  constructor(text) {
    this.text = text;
    this.lang = "es-ES";
  }
};

global.window = {
  AudioContext: class {
    constructor() { this.currentTime = 0; this.state = "running"; }
    createOscillator() { return { type: "sine", frequency: { setValueAtTime: () => {} }, connect: () => {}, start: () => {}, stop: () => {} }; }
    createGain() { return { gain: { setValueAtTime: () => {}, linearRampToValueAtTime: () => {}, exponentialRampToValueAtTime: () => {} }, connect: () => {} }; }
    resume() {}
  },
  speechSynthesis: {
    getVoices: () => [
      { name: "Google Español", lang: "es-ES" },
      { name: "Microsoft Sabina", lang: "es-MX" }
    ],
    speak: (utt) => {
      lastSpokenText = utt.text;
      spokenQueue.push(utt.text);
    },
    cancel: () => {
      spokenQueue = [];
    }
  },
  SpeechSynthesisUtterance: global.SpeechSynthesisUtterance
};
global.document = {
  getElementById: (id) => ({
    classList: { add: () => {}, remove: () => {} },
    appendChild: () => {},
    style: {}
  }),
  createElement: (tag) => ({
    className: '',
    innerHTML: '',
    style: {},
    remove: () => {}
  }),
  querySelectorAll: () => []
};

// Cargar módulos
require('../js/data/territories.js');
require('../js/data/badges.js');
require('../js/data/specialChallenges.js');
require('../js/data/missions.js');
require('../js/engine/sound.js');
require('../js/engine/voice.js');
require('../js/engine/state.js');
require('../js/engine/gamification.js');
require('../js/engine/adaptive.js');
require('../js/engine/validator.js');
require('../js/ui/interactiveWidgets.js');

let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
  if (condition) {
    passedTests++;
    console.log('  ✓ ' + message);
  } else {
    failedTests++;
    console.error('  ✗ FALLÓ: ' + message);
  }
}

console.log('=== INICIANDO QA TEST SUITE: MISIÓN MATEMÁTICA ===\n');

// 1. Prueba de Estado y Persistencia
console.log('1. Probando GAME_STATE...');
window.GAME_STATE.resetAllProgress();
let state = window.GAME_STATE.get();
assert(state.xp === 0, 'Estado inicial XP es 0');
assert(state.level === 1, 'Estado inicial Nivel es 1');
assert(state.streak === 0, 'Estado inicial Racha es 0');

window.GAME_STATE.setAvatar("🦉");
assert(window.GAME_STATE.get().avatar === "🦉", 'Actualización de avatar a Búho');

window.GAME_STATE.addAnswerRecord(true);
window.GAME_STATE.addAnswerRecord(true);
assert(window.GAME_STATE.get().streak === 2, 'Racha se incrementa a 2 tras 2 aciertos');
assert(window.GAME_STATE.get().maxStreak === 2, 'Racha máxima se actualiza a 2');

window.GAME_STATE.addAnswerRecord(false);
assert(window.GAME_STATE.get().streak === 0, 'Racha se reinicia tras un error');
assert(window.GAME_STATE.get().maxStreak === 2, 'Racha máxima se conserva intacta');

// 2. Prueba de Gamificación y Niveles
console.log('\n2. Probando GAME_GAMIFICATION...');
let rank = window.GAME_GAMIFICATION.getRankForXP(0);
assert(rank.level === 1 && rank.title === "Explorador Novato", 'Nivel 1 corresponde a Explorador Novato');

rank = window.GAME_GAMIFICATION.getRankForXP(150);
assert(rank.level === 2, '150 XP otorga Nivel 2');

rank = window.GAME_GAMIFICATION.getRankForXP(1050);
assert(rank.level === 6 && rank.title === "Archimago Supremo", '1050 XP otorga Nivel 6 Archimago Supremo');

window.GAME_GAMIFICATION.addXP(200);
assert(window.GAME_STATE.get().xp === 200, 'Añadir 200 XP actualiza el estado');
assert(window.GAME_STATE.get().level === 2, 'El nivel del jugador sube reactivamente a 2');

// 3. Prueba de Desbloqueo de Territorios
console.log('\n3. Probando Desbloqueo de Territorios...');
assert(window.GAME_GAMIFICATION.isTerritoryUnlocked("bosque_sumas") === true, 'Bosque de las Sumas siempre desbloqueado');
assert(window.GAME_GAMIFICATION.isTerritoryUnlocked("desierto_restas") === false, 'Desierto de las Restas bloqueado inicialmente');

// Completar 3 misiones del bosque
window.GAME_STATE.markMissionCompleted("sum_m1", "bosque_sumas", false);
window.GAME_STATE.markMissionCompleted("sum_m2", "bosque_sumas", false);
window.GAME_STATE.markMissionCompleted("sum_m3", "bosque_sumas", false);
assert(window.GAME_GAMIFICATION.isTerritoryUnlocked("desierto_restas") === true, 'Desierto de las Restas se desbloquea tras 3 misiones de Suma');

// 4. Prueba de Desbloqueo Secuencial de Misiones
console.log('\n4. Probando Desbloqueo Secuencial de Misiones...');
assert(window.GAME_GAMIFICATION.isMissionUnlocked("sub_m1") === true, 'Misión 1 del desierto abierta');
assert(window.GAME_GAMIFICATION.isMissionUnlocked("sub_m2") === false, 'Misión 2 del desierto cerrada hasta completar la 1');
window.GAME_STATE.markMissionCompleted("sub_m1", "desierto_restas", false);
assert(window.GAME_GAMIFICATION.isMissionUnlocked("sub_m2") === true, 'Misión 2 del desierto ahora abierta');

// 5. Prueba de Insignias
console.log('\n5. Probando Detección de Insignias...');
window.GAME_GAMIFICATION.checkBadges();
assert(!!window.GAME_STATE.get().unlockedBadges["badge_first_step"], 'Insignia "Primeros Pasos" desbloqueada');

// 6. Prueba del Motor de Adaptación Pedagógica
console.log('\n6. Probando GAME_ADAPTIVE...');
window.GAME_ADAPTIVE.resetSession();
let res1 = window.GAME_ADAPTIVE.registerResult(false, { operator: "+" });
assert(res1.shouldOfferHint === false, '1 fallo no fuerza pista');
let res2 = window.GAME_ADAPTIVE.registerResult(false, { operator: "+" });
assert(res2.shouldOfferHint === true, '2 fallos consecutivos activan sugerencia de pista pedagógica');

let tip = window.GAME_ADAPTIVE.getScaffoldingTip({ operator: "+" });
assert(typeof tip === "string" && tip.length > 10, 'Generación de tip pedagógico para sumas');

// 7. Prueba del Validador Pedagógico
console.log('\n7. Probando GAME_VALIDATOR...');
let valSuccess = window.GAME_VALIDATOR.validateAnswer("42", 42);
assert(valSuccess.isCorrect === true, 'Validación correcta de 42 == 42');
assert(valSuccess.feedbackText.length > 5, 'Feedback motivador presente');

let valFail = window.GAME_VALIDATOR.validateAnswer("30", 42);
assert(valFail.isCorrect === false, 'Validación incorrecta detectada');
assert(valFail.feedbackText.includes("Todavía") || valFail.feedbackText.includes("esfuerzo") || valFail.feedbackText.includes("casi") || valFail.feedbackText.includes("rindas"), 'Feedback constructivo sin castigo');

// 8. Prueba de Widgets Manipulativos
console.log('\n8. Probando GAME_WIDGETS...');
let htmlAdd = window.GAME_WIDGETS.renderDiscoveryVisual({
  visualType: "manipulative_add", leftCount: 3, rightCount: 2, itemEmoji: "🍎"
});
assert(htmlAdd.includes("🍎") && htmlAdd.includes("3 + 2 = 5"), 'Renderizado de manipulativo de suma');

let htmlSub = window.GAME_WIDGETS.renderDiscoveryVisual({
  visualType: "manipulative_sub", leftCount: 6, rightCount: 2, itemEmoji: "💧"
});
assert(htmlSub.includes("💧") && htmlSub.includes("6 - 2 = 4"), 'Renderizado de manipulativo de resta');

let htmlMult = window.GAME_WIDGETS.renderDiscoveryVisual({
  visualType: "manipulative_mult_grid", rows: 4, cols: 6, itemEmoji: "🚀"
});
assert(htmlMult.includes("4 × 6 = 24"), 'Renderizado de matriz rectangular de multiplicación');

// 9. Prueba de Voces Naturales Pedagógicas (Felicitación y Ánimo)
console.log('\n9. Probando GAME_VOICE...');
assert(typeof window.GAME_VOICE.speak === "function", 'Función speak disponible');
assert(window.GAME_VOICE.isEnabled() === true, 'Voz del narrador habilitada por defecto');
assert(typeof window.GAME_VOICE.speakCorrect === "function", 'Función de felicitación speakCorrect disponible');
assert(typeof window.GAME_VOICE.speakEncouragement === "function", 'Función de ánimo speakEncouragement disponible');

window.GAME_VOICE.speak("¡Excelente trabajo!");
assert(lastSpokenText.includes("Excelente"), 'Locución de felicitación reproducida');

window.GAME_VOICE.toggleVoice();
assert(window.GAME_VOICE.isEnabled() === false, 'Voz desactivada correctamente');
window.GAME_VOICE.toggleVoice();
assert(window.GAME_VOICE.isEnabled() === true, 'Voz reactivada correctamente');

console.log(`\n=== RESULTADOS: ${passedTests} PRUEBAS PASADAS, ${failedTests} FALLOS ===`);
if (failedTests > 0) process.exit(1);
