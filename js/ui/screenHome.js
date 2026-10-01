/**
 * MISIÓN MATEMÁTICA — PANTALLA DE INICIO (HOME)
 * Selección de explorador, bienvenida, comenzar misión y continuar partida guardada.
 */

window.GAME_SCREEN_HOME = (function () {
  const AVATARS = [
    { emoji: "🚀", name: "Cosmo el Astronauta" },
    { emoji: "🦊", name: "Foxy el Zorro Aventurero" },
    { emoji: "🦉", name: "Ada la Sabia Búho" },
    { emoji: "🦁", name: "Leo el Valiente" },
    { emoji: "🧙", name: "Merlín el Archimago" }
  ];

  function render() {
    const container = document.getElementById("screen-home");
    if (!container) return;

    const state = window.GAME_STATE.get();
    const hasProgress = Object.keys(state.completedMissions || {}).length > 0;
    const crystalCount = Object.values(state.crystals || {}).filter(Boolean).length;
    const currentRank = window.GAME_GAMIFICATION.getRankForXP(state.xp);

    const avatarButtonsHtml = AVATARS.map(av => `
      <button type="button" 
              class="avatar-option-btn ${state.avatar === av.emoji ? 'selected' : ''}" 
              data-avatar="${av.emoji}" 
              title="${av.name}" 
              aria-label="${av.name}">
        ${av.emoji}
      </button>
    `).join("");

    container.innerHTML = `
      <div class="home-hero">
        <div class="home-logo-wrap">
          <div class="home-badge-pill">✨ Aventura Pedagógica Infantil</div>
          <h1 class="home-title">MISIÓN MATEMÁTICA</h1>
          <p class="home-subtitle">Recorre mundos legendarios, resuelve misiones y recupera los 5 Cristales Sagrados del Conocimiento.</p>
        </div>

        <!-- Selector de Avatar del Explorador -->
        <div class="avatar-selection-box">
          <label class="avatar-selector-title" for="player-name-input">Elige tu explorador y escribe tu nombre:</label>
          <div class="avatars-grid">
            ${avatarButtonsHtml}
          </div>
          <input type="text" id="player-name-input" class="numpad-input-box" 
                 style="font-size: 1.25rem; min-height: 48px; max-width: 260px;" 
                 value="${state.name || 'Explorador'}" maxlength="16" placeholder="Tu nombre">
        </div>

        <!-- Acciones Principales -->
        <div class="home-actions">
          <button id="btn-start-game" class="btn-primary btn-sparkle" type="button">
            ${hasProgress ? '¡Continuar Aventura! 🗺️' : '¡Comenzar Misión! 🚀'}
          </button>
          <button id="btn-view-profile-home" class="btn-secondary" type="button">
            🏆 Salón de la Fama y Medallas
          </button>
          ${hasProgress ? `
            <div class="resume-info-pill">
              ⭐ Nivel ${state.level || 1} (${currentRank.title}) • 💎 ${crystalCount}/5 Cristales
            </div>
          ` : ''}
        </div>
      </div>
    `;

    bindEvents(container);
  }

  function bindEvents(container) {
    // Selección de avatar
    container.querySelectorAll(".avatar-option-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        window.GAME_SOUND.playClick();
        const avatar = btn.getAttribute("data-avatar");
        window.GAME_STATE.setAvatar(avatar);
        container.querySelectorAll(".avatar-option-btn").forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
      });
    });

    // Guardado de nombre
    const nameInput = container.querySelector("#player-name-input");
    if (nameInput) {
      nameInput.addEventListener("input", (e) => {
        window.GAME_STATE.setPlayerName(e.target.value);
      });
    }

    // Botón comenzar
    const btnStart = container.querySelector("#btn-start-game");
    if (btnStart) {
      btnStart.addEventListener("click", () => {
        window.GAME_SOUND.playClick();
        window.GAME_ROUTER.navigateTo("screen-map");
      });
    }

    // Botón Salón de Trofeos
    const btnProfile = container.querySelector("#btn-view-profile-home");
    if (btnProfile) {
      btnProfile.addEventListener("click", () => {
        window.GAME_SOUND.playClick();
        window.GAME_ROUTER.navigateTo("screen-profile");
      });
    }
  }

  return {
    render
  };
})();
