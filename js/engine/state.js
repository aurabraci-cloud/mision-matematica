/**
 * MISIÓN MATEMÁTICA — GESTIÓN DE ESTADO Y PERSISTENCIA (LocalStorage)
 * Maneja el perfil del estudiante, progresión, cristales, rachas y guardado automático.
 */

window.GAME_STATE = (function () {
  const STORAGE_KEY = "mision_matematica_save_v1";

  const DEFAULT_STATE = {
    name: "Explorador",
    avatar: "🚀",
    level: 1,
    xp: 0,
    coins: 0,
    streak: 0,
    maxStreak: 0,
    totalAnswers: 0,
    correctAnswers: 0,
    hintsUsed: 0,
    specialChallengesCompleted: 0,
    completedMissions: {}, // { [missionId]: { completedAt, attempts } }
    crystals: {
      bosque_sumas: false,
      desierto_restas: false,
      planeta_mult: false,
      castillo_div: false,
      templo_operaciones: false
    },
    unlockedBadges: {} // { [badgeId]: timestamp }
  };

  let currentState = Object.assign({}, DEFAULT_STATE);
  const listeners = [];

  function loadState() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        currentState = Object.assign({}, DEFAULT_STATE, parsed);
        // Garantizar objetos anidados
        currentState.completedMissions = Object.assign({}, parsed.completedMissions || {});
        currentState.crystals = Object.assign({}, DEFAULT_STATE.crystals, parsed.crystals || {});
        currentState.unlockedBadges = Object.assign({}, parsed.unlockedBadges || {});
      }
    } catch (e) {
      console.warn("No se pudo cargar el progreso previo:", e);
      currentState = Object.assign({}, DEFAULT_STATE);
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(currentState));
    } catch (e) {
      console.warn("No se pudo guardar el progreso:", e);
    }
    notifyListeners();
  }

  function notifyListeners() {
    listeners.forEach(cb => {
      try {
        cb(currentState);
      } catch (err) {
        console.error("Error en listener de estado:", err);
      }
    });
  }

  // Cargar estado inicial
  loadState();

  return {
    get: function () {
      return currentState;
    },

    subscribe: function (callback) {
      if (typeof callback === "function") {
        listeners.push(callback);
        // Llamada inmediata para sincronización inicial
        callback(currentState);
      }
    },

    update: function (updater) {
      if (typeof updater === "function") {
        updater(currentState);
      } else if (typeof updater === "object") {
        Object.assign(currentState, updater);
      }
      saveState();
    },

    setAvatar: function (avatarEmoji) {
      currentState.avatar = avatarEmoji;
      saveState();
    },

    setPlayerName: function (name) {
      if (name && name.trim()) {
        currentState.name = name.trim();
        saveState();
      }
    },

    addAnswerRecord: function (isCorrect) {
      currentState.totalAnswers = (currentState.totalAnswers || 0) + 1;
      if (isCorrect) {
        currentState.correctAnswers = (currentState.correctAnswers || 0) + 1;
        currentState.streak = (currentState.streak || 0) + 1;
        if (currentState.streak > (currentState.maxStreak || 0)) {
          currentState.maxStreak = currentState.streak;
        }
      } else {
        currentState.streak = 0;
      }
      saveState();
    },

    recordHintUsed: function () {
      currentState.hintsUsed = (currentState.hintsUsed || 0) + 1;
      saveState();
    },

    markMissionCompleted: function (missionId, territoryId, isCrystalMission) {
      if (!currentState.completedMissions[missionId]) {
        currentState.completedMissions[missionId] = {
          completedAt: new Date().toISOString()
        };
      }
      if (isCrystalMission && territoryId) {
        currentState.crystals[territoryId] = true;
      }
      saveState();
    },

    recordSpecialChallengeCompleted: function () {
      currentState.specialChallengesCompleted = (currentState.specialChallengesCompleted || 0) + 1;
      saveState();
    },

    resetAllProgress: function () {
      currentState = JSON.parse(JSON.stringify(DEFAULT_STATE));
      saveState();
    }
  };
})();
