/**
 * MISIÓN MATEMÁTICA — ENRUTADOR Y SINCRONIZADOR DE INTERFAZ
 * Gestiona el cambio fluido de pantallas y la actualización reactiva del header global.
 */

window.GAME_ROUTER = (function () {
  let currentScreenId = "screen-home";

  const SCREENS = [
    "screen-home",
    "screen-map",
    "screen-territory",
    "screen-mission",
    "screen-profile",
    "screen-special"
  ];

  function navigateTo(screenId) {
    if (!SCREENS.includes(screenId)) {
      console.warn("Pantalla desconocida:", screenId);
      return;
    }

    currentScreenId = screenId;

    // Actualizar visibilidad de secciones
    SCREENS.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        if (id === screenId) {
          el.classList.remove("hidden");
          el.classList.add("active");
        } else {
          el.classList.add("hidden");
          el.classList.remove("active");
        }
      }
    });

    // Control del Header Global
    const header = document.getElementById("global-header");
    if (header) {
      if (screenId === "screen-home") {
        header.classList.add("hidden");
      } else {
        header.classList.remove("hidden");
      }
    }

    // Disparar renderizado específico de la pantalla si corresponde
    if (screenId === "screen-home") {
      window.GAME_SCREEN_HOME.render();
    } else if (screenId === "screen-map") {
      window.GAME_SCREEN_MAP.renderMap();
    } else if (screenId === "screen-profile") {
      window.GAME_SCREEN_PROFILE.render();
    } else if (screenId === "screen-special") {
      window.GAME_SCREEN_SPECIAL.render();
    }

    // Scroll al inicio
    window.scrollTo({ top: 0, behavior: "smooth" });
    syncHeader();
  }

  function syncHeader() {
    const state = window.GAME_STATE.get();
    const rank = window.GAME_GAMIFICATION.getRankForXP(state.xp);

    // Avatar y Nombre
    const avatarEl = document.getElementById("header-avatar");
    if (avatarEl) avatarEl.textContent = state.avatar || "🚀";

    const nameEl = document.getElementById("header-player-name");
    if (nameEl) nameEl.textContent = state.name || "Explorador";

    const rankEl = document.getElementById("header-player-rank");
    if (rankEl) rankEl.textContent = `Nivel ${state.level || 1} • ${rank.title}`;

    // XP y Barra
    const currentXpEl = document.getElementById("header-xp-current");
    const nextXpEl = document.getElementById("header-xp-next");
    const barEl = document.getElementById("header-xp-bar");

    const xpInLevel = Math.max(0, state.xp - rank.minXP);
    const xpSpan = Math.max(1, rank.nextXP - rank.minXP);
    const percent = Math.min(100, Math.round((xpInLevel / xpSpan) * 100));

    if (currentXpEl) currentXpEl.textContent = state.xp;
    if (nextXpEl) nextXpEl.textContent = rank.nextXP >= 99999 ? "MAX" : rank.nextXP;
    if (barEl) barEl.style.width = `${percent}%`;

    // Racha
    const streakEl = document.getElementById("header-streak-count");
    const streakWrap = document.getElementById("header-streak-container");
    if (streakEl) streakEl.textContent = state.streak || 0;
    if (streakWrap) {
      if ((state.streak || 0) >= 3) {
        streakWrap.classList.add("active-streak");
      } else {
        streakWrap.classList.remove("active-streak");
      }
    }

    // Monedas
    const coinsEl = document.getElementById("header-coins-count");
    if (coinsEl) coinsEl.textContent = state.coins || 0;

    // Icono de Sonido
    const soundIcon = document.getElementById("sound-icon");
    if (soundIcon) {
      soundIcon.textContent = window.GAME_SOUND.isMuted() ? "🔇" : "🔊";
    }

    // Icono de Voz del Narrador
    const voiceIcon = document.getElementById("voice-icon");
    if (voiceIcon && window.GAME_VOICE) {
      voiceIcon.textContent = window.GAME_VOICE.isEnabled() ? "🗣️" : "🔇";
    }
  }

  function initHeaderEvents() {
    // Volver al mapa
    const btnBackMap = document.getElementById("btn-back-map");
    if (btnBackMap) {
      btnBackMap.addEventListener("click", () => {
        window.GAME_SOUND.playClick();
        navigateTo("screen-map");
      });
    }

    // Píldora de perfil
    const pill = document.getElementById("player-profile-pill");
    if (pill) {
      pill.addEventListener("click", () => {
        window.GAME_SOUND.playClick();
        navigateTo("screen-profile");
      });
      pill.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          window.GAME_SOUND.playClick();
          navigateTo("screen-profile");
        }
      });
    }

    // Botón de trofeos
    const btnTrophies = document.getElementById("btn-open-trophies");
    if (btnTrophies) {
      btnTrophies.addEventListener("click", () => {
        window.GAME_SOUND.playClick();
        navigateTo("screen-profile");
      });
    }

    // Botón de sonido
    const btnSound = document.getElementById("btn-sound-toggle");
    if (btnSound) {
      btnSound.addEventListener("click", () => {
        window.GAME_SOUND.toggleMute();
        syncHeader();
      });
    }

    // Botón de voz narradora
    const btnVoice = document.getElementById("btn-voice-toggle");
    if (btnVoice) {
      btnVoice.addEventListener("click", () => {
        if (window.GAME_VOICE) {
          window.GAME_VOICE.toggleVoice();
          syncHeader();
        }
      });
    }

    // Suscribirse a cambios de estado para mantener el header sincronizado
    window.GAME_STATE.subscribe(() => {
      syncHeader();
    });
  }

  return {
    getCurrentScreen: () => currentScreenId,
    navigateTo,
    syncHeader,
    initHeaderEvents
  };
})();
