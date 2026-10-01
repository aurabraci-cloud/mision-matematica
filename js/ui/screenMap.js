/**
 * MISIÓN MATEMÁTICA — PANTALLA DE MAPA Y SELECTOR DE TERRITORIOS
 * Visualización del mapa de los 5 mundos, estado de cristales y lista de misiones.
 */

window.GAME_SCREEN_MAP = (function () {
  let activeTerritoryId = null;

  // 1. Renderiza el Mapa General con los 5 Territorios
  function renderMap() {
    const container = document.getElementById("screen-map");
    if (!container) return;

    const state = window.GAME_STATE.get();
    const territories = window.GAME_DATA.TERRITORIES;

    // Cinturón de Cristales
    const crystalsHtml = territories.map(t => {
      const isObtained = !!state.crystals[t.id];
      return `
        <div class="crystal-slot ${isObtained ? 'obtained ' + t.gemClass : ''}" 
             title="${t.gemName} (${isObtained ? '¡Conseguido!' : 'Por conseguir en ' + t.name})">
          <span>${isObtained ? t.gemIcon : '⚪'}</span>
          <span>${t.operationName}</span>
        </div>
      `;
    }).join("");

    // Tarjetas de Territorios
    const territoriesHtml = territories.map(t => {
      const isUnlocked = window.GAME_GAMIFICATION.isTerritoryUnlocked(t.id);
      const terrMissions = (window.GAME_DATA.MISSIONS || []).filter(m => m.territoryId === t.id);
      const completedCount = terrMissions.filter(m => state.completedMissions[m.id]).length;
      const progressPercent = Math.round((completedCount / terrMissions.length) * 100);
      const hasGem = !!state.crystals[t.id];

      return `
        <div class="territory-card ${isUnlocked ? '' : 'locked'}" 
             data-territory-id="${t.id}"
             style="--theme-color: ${t.themeColor}; --theme-glow: ${t.themeGlow};"
             role="button"
             tabindex="${isUnlocked ? '0' : '-1'}"
             aria-label="${t.name}: ${isUnlocked ? 'Disponible' : 'Bloqueado'}">
          ${!isUnlocked ? `
            <div class="lock-badge-overlay">
              🔒 Bloqueado
            </div>
          ` : ''}

          <div class="territory-card-top">
            <span class="territory-icon">${t.icon}</span>
            <span class="territory-gem-indicator ${hasGem ? '' : 'gem-locked'}" title="${t.gemName}">
              ${hasGem ? t.gemIcon : '💎'}
            </span>
          </div>

          <div>
            <h3 class="territory-title">${t.name}</h3>
            <p class="territory-desc">${t.description}</p>
          </div>

          <div class="territory-progress-wrap">
            <div class="territory-progress-labels">
              <span>Misiones: ${completedCount}/${terrMissions.length}</span>
              <span>${progressPercent}%</span>
            </div>
            <div class="progress-track" role="progressbar" aria-valuenow="${progressPercent}" aria-valuemin="0" aria-valuemax="100">
              <div class="progress-fill" style="width: ${progressPercent}%;"></div>
            </div>
          </div>
        </div>
      `;
    }).join("");

    container.innerHTML = `
      <div class="map-view-header">
        <h2 class="map-view-title">🗺️ Mapa de Aventuras Matemáticas</h2>
        <p class="map-view-subtitle">Explora los territorios, completa las misiones y despierta los 5 Cristales Sagrados.</p>
        
        <!-- Cinturón de Cristales del Explorador -->
        <div class="crystals-belt">
          ${crystalsHtml}
        </div>
      </div>

      <!-- Cuadrícula de Territorios -->
      <div class="territories-grid">
        ${territoriesHtml}
      </div>

      <!-- Banner de Retos Especiales -->
      <div class="game-card" style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; margin-top: 10px; border-color: var(--color-coin);">
        <div style="display: flex; align-items: center; gap: 16px;">
          <span style="font-size: 2.5rem;">⚡</span>
          <div>
            <h4 style="font-family: var(--font-fun); font-size: 1.25rem; color: #ffffff;">Retos Especiales del Reino</h4>
            <p style="color: var(--text-muted); font-size: 0.95rem;">Pon a prueba tu agilidad en los Retos Contrarreloj y Enigmas de los Guardianes.</p>
          </div>
        </div>
        <button id="btn-open-specials" class="btn-primary" type="button">
          ¡Aceptar el Desafío! ⏱️
        </button>
      </div>
    `;

    bindMapEvents(container);
  }

  function bindMapEvents(container) {
    container.querySelectorAll(".territory-card:not(.locked)").forEach(card => {
      const terrId = card.getAttribute("data-territory-id");
      card.addEventListener("click", () => {
        window.GAME_SOUND.playClick();
        showTerritoryDetail(terrId);
      });
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          window.GAME_SOUND.playClick();
          showTerritoryDetail(terrId);
        }
      });
    });

    const btnSpecials = container.querySelector("#btn-open-specials");
    if (btnSpecials) {
      btnSpecials.addEventListener("click", () => {
        window.GAME_SOUND.playClick();
        window.GAME_ROUTER.navigateTo("screen-special");
      });
    }
  }

  // 2. Renderiza la lista de misiones de un territorio específico
  function showTerritoryDetail(territoryId) {
    activeTerritoryId = territoryId;
    const container = document.getElementById("screen-territory");
    if (!container) return;

    const territory = window.GAME_DATA.TERRITORIES.find(t => t.id === territoryId);
    if (!territory) return;

    const state = window.GAME_STATE.get();
    const missions = (window.GAME_DATA.MISSIONS || []).filter(m => m.territoryId === territoryId);

    const missionsHtml = missions.map(m => {
      const isCompleted = !!state.completedMissions[m.id];
      const isUnlocked = window.GAME_GAMIFICATION.isMissionUnlocked(m.id);
      const isCrystal = !!m.isCrystalMission;

      return `
        <div class="mission-row-card ${isCompleted ? 'completed' : ''} ${isUnlocked ? '' : 'locked'}"
             data-mission-id="${m.id}"
             role="button"
             tabindex="${isUnlocked ? '0' : '-1'}">
          <div class="mission-row-left">
            <div class="mission-number-badge">
              ${isCompleted ? '✓' : (isUnlocked ? m.missionNumber : '🔒')}
            </div>
            <div class="mission-text-details">
              <h4>${m.title} ${isCrystal ? '💎' : ''}</h4>
              <p>${m.description}</p>
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap;">
            <div class="mission-rewards-pill">
              <span>⚡ +${m.xpReward} XP</span>
              <span>🪙 +${m.coinReward}</span>
            </div>
            <button class="btn-primary" type="button" ${isUnlocked ? '' : 'disabled'}>
              ${isCompleted ? 'Repetir 🔁' : 'Jugar ▶'}
            </button>
          </div>
        </div>
      `;
    }).join("");

    container.innerHTML = `
      <div class="territory-detail-header" style="border-left: 6px solid ${territory.themeColor};">
        <div class="td-info">
          <span class="td-icon">${territory.icon}</span>
          <div>
            <h2 class="td-title">${territory.name}</h2>
            <p class="td-subtitle">${territory.lore}</p>
          </div>
        </div>
        <button id="btn-back-to-map" class="btn-secondary" type="button">
          ← Volver al Mapa
        </button>
      </div>

      <div class="missions-list">
        ${missionsHtml}
      </div>
    `;

    bindTerritoryEvents(container);
    window.GAME_ROUTER.navigateTo("screen-territory");
  }

  function bindTerritoryEvents(container) {
    const btnBack = container.querySelector("#btn-back-to-map");
    if (btnBack) {
      btnBack.addEventListener("click", () => {
        window.GAME_SOUND.playClick();
        window.GAME_ROUTER.navigateTo("screen-map");
      });
    }

    container.querySelectorAll(".mission-row-card:not(.locked)").forEach(row => {
      const missionId = row.getAttribute("data-mission-id");
      row.addEventListener("click", () => {
        window.GAME_SOUND.playClick();
        window.GAME_SCREEN_MISSION.startMission(missionId);
      });
    });
  }

  return {
    renderMap,
    showTerritoryDetail,
    getActiveTerritoryId: () => activeTerritoryId
  };
})();
