/**
 * MISIÓN MATEMÁTICA — MOTOR DE GAMIFICACIÓN
 * Niveles, rangos, cálculo de XP, monedas, insignias y desbloqueo de contenidos.
 */

window.GAME_GAMIFICATION = (function () {
  const RANKS = [
    { level: 1, title: "Explorador Novato", minXP: 0, nextXP: 100 },
    { level: 2, title: "Rastreador Numérico", minXP: 100, nextXP: 250 },
    { level: 3, title: "Aventurero del Cálculo", minXP: 250, nextXP: 450 },
    { level: 4, title: "Guardián de la Aritmética", minXP: 450, nextXP: 700 },
    { level: 5, title: "Sabio de las Operaciones", minXP: 700, nextXP: 1000 },
    { level: 6, title: "Archimago Supremo", minXP: 1000, nextXP: 99999 }
  ];

  function getRankForXP(xp) {
    let currentRank = RANKS[0];
    for (let i = 0; i < RANKS.length; i++) {
      if (xp >= RANKS[i].minXP) {
        currentRank = RANKS[i];
      }
    }
    return currentRank;
  }

  return {
    RANKS,
    getRankForXP,

    // Añade XP, calcula niveles y notifica subida de nivel
    addXP: function (amount) {
      if (!amount || amount <= 0) return;
      const state = window.GAME_STATE.get();
      const prevRank = getRankForXP(state.xp);
      const newXP = state.xp + amount;
      const nextRank = getRankForXP(newXP);

      window.GAME_STATE.update(s => {
        s.xp = newXP;
        s.level = nextRank.level;
      });

      // Detectar subida de nivel
      if (nextRank.level > prevRank.level) {
        window.GAME_SOUND.playCrystal();
        this.showToast(`🎉 ¡Subiste al Nivel ${nextRank.level}: ${nextRank.title}!`);
      }

      this.checkBadges();
    },

    addCoins: function (amount) {
      if (!amount || amount <= 0) return;
      window.GAME_STATE.update(s => {
        s.coins = (s.coins || 0) + amount;
      });
    },

    // Comprobador y desbloqueador de insignias
    checkBadges: function () {
      const state = window.GAME_STATE.get();
      const badges = window.GAME_DATA.BADGES || [];
      const newlyUnlocked = [];

      badges.forEach(badge => {
        if (!state.unlockedBadges[badge.id]) {
          if (badge.checkUnlock(state)) {
            newlyUnlocked.push(badge);
            state.unlockedBadges[badge.id] = new Date().toISOString();
          }
        }
      });

      if (newlyUnlocked.length > 0) {
        window.GAME_STATE.update(s => {
          s.unlockedBadges = state.unlockedBadges;
        });

        newlyUnlocked.forEach(badge => {
          window.GAME_SOUND.playCrystal();
          this.showToast(`🏅 ¡Insignia Desbloqueada: ${badge.title}!`, "toast-badge-unlock");
        });
      }
    },

    // Comprobar si un territorio está desbloqueado
    isTerritoryUnlocked: function (territoryId) {
      const terrList = window.GAME_DATA.TERRITORIES;
      const target = terrList.find(t => t.id === territoryId);
      if (!target) return false;
      if (!target.requiredTerritoryId) return true; // El bosque siempre está desbloqueado

      // Revisa misiones completadas del territorio previo
      const state = window.GAME_STATE.get();
      const prevMissions = (window.GAME_DATA.MISSIONS || [])
        .filter(m => m.territoryId === target.requiredTerritoryId);
      
      const completedCount = prevMissions.filter(m => state.completedMissions[m.id]).length;
      return completedCount >= (target.requiredMissions || 3);
    },

    // Comprobar si una misión está desbloqueada
    isMissionUnlocked: function (missionId) {
      const missions = window.GAME_DATA.MISSIONS || [];
      const mission = missions.find(m => m.id === missionId);
      if (!mission) return false;

      // El territorio debe estar desbloqueado primero
      if (!this.isTerritoryUnlocked(mission.territoryId)) return false;

      // La primera misión del territorio está siempre disponible si el territorio está abierto
      if (mission.missionNumber === 1) return true;

      // Para misiones 2, 3, 4: la misión anterior debe estar completada
      const state = window.GAME_STATE.get();
      const prevMission = missions.find(m => 
        m.territoryId === mission.territoryId && m.missionNumber === (mission.missionNumber - 1)
      );

      return prevMission ? !!state.completedMissions[prevMission.id] : false;
    },

    // Notificaciones Toast flotantes
    showToast: function (message, customClass = "") {
      const container = document.getElementById("toast-container");
      if (!container) return;

      const toast = document.createElement("div");
      toast.className = `toast ${customClass}`;
      toast.innerHTML = `<span>${message}</span>`;
      container.appendChild(toast);

      setTimeout(() => {
        toast.style.transition = "opacity 0.4s ease, transform 0.4s ease";
        toast.style.opacity = "0";
        toast.style.transform = "translateX(50px)";
        setTimeout(() => toast.remove(), 400);
      }, 3500);
    }
  };
})();
