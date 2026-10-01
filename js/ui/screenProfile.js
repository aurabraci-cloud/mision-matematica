/**
 * MISIÓN MATEMÁTICA — PANTALLA DE PERFIL Y SALÓN DE LA FAMA
 * Estadísticas completas, medallero de insignias, cristales obtenidos y ajustes.
 */

window.GAME_SCREEN_PROFILE = (function () {

  function render() {
    const container = document.getElementById("screen-profile");
    if (!container) return;

    const state = window.GAME_STATE.get();
    const rank = window.GAME_GAMIFICATION.getRankForXP(state.xp);
    const badges = window.GAME_DATA.BADGES || [];
    const territories = window.GAME_DATA.TERRITORIES || [];

    const totalQuestions = state.totalAnswers || 0;
    const correctCount = state.correctAnswers || 0;
    const accuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 100;
    const completedMissionsCount = Object.keys(state.completedMissions || {}).length;

    // Badges HTML
    const badgesHtml = badges.map(b => {
      const isUnlocked = !!state.unlockedBadges[b.id];
      return `
        <div class="badge-item-card ${isUnlocked ? '' : 'locked-badge'}" 
             title="${b.title}: ${b.description}">
          <div class="badge-icon-wrap">${b.icon}</div>
          <div class="badge-title">${b.title}</div>
          <div class="badge-desc">${b.description}</div>
          <div style="font-size: 0.75rem; color: ${isUnlocked ? 'var(--color-success)' : 'var(--text-dim)'}; font-weight: 700;">
            ${isUnlocked ? '✓ Desbloqueada' : '🔒 Bloqueada'}
          </div>
        </div>
      `;
    }).join("");

    // Cristales HTML
    const crystalsHtml = territories.map(t => {
      const isObtained = !!state.crystals[t.id];
      return `
        <div class="crystal-slot ${isObtained ? 'obtained ' + t.gemClass : ''}" style="padding: 8px 14px; font-size: 1rem;">
          <span style="font-size: 1.5rem;">${isObtained ? t.gemIcon : '⚪'}</span>
          <span>${t.gemName}</span>
        </div>
      `;
    }).join("");

    container.innerHTML = `
      <div class="profile-view-wrap">
        <!-- Encabezado del Perfil -->
        <div class="profile-header-card">
          <div style="display: flex; align-items: center; gap: 20px;">
            <div class="profile-avatar-large">${state.avatar || '🚀'}</div>
            <div>
              <h2 style="font-family: var(--font-fun); font-size: 2rem; color: #ffffff;">${state.name || 'Explorador'}</h2>
              <div style="display: flex; gap: 10px; align-items: center; margin-top: 4px;">
                <span class="home-badge-pill" style="color: var(--color-coin); border-color: var(--color-coin);">
                  Nivel ${state.level || 1} • ${rank.title}
                </span>
              </div>
            </div>
          </div>
          <button id="btn-profile-back-map" class="btn-primary" type="button">
            🗺️ Volver al Mapa
          </button>
        </div>

        <!-- Cuadrícula de Estadísticas Globales -->
        <div class="profile-stats-grid">
          <div class="pstat-box">
            <span class="pstat-num">⚡ ${state.xp || 0}</span>
            <span class="pstat-label">Experiencia Total (XP)</span>
          </div>
          <div class="pstat-box">
            <span class="pstat-num">🪙 ${state.coins || 0}</span>
            <span class="pstat-label">Monedas Mágicas</span>
          </div>
          <div class="pstat-box">
            <span class="pstat-num">🎯 ${accuracy}%</span>
            <span class="pstat-label">Precisión Global (${correctCount}/${totalQuestions})</span>
          </div>
          <div class="pstat-box">
            <span class="pstat-num">🔥 ${state.maxStreak || 0}</span>
            <span class="pstat-label">Racha Máxima de Aciertos</span>
          </div>
          <div class="pstat-box">
            <span class="pstat-num">🗺️ ${completedMissionsCount}/20</span>
            <span class="pstat-label">Misiones Completadas</span>
          </div>
          <div class="pstat-box">
            <span class="pstat-num">💡 ${state.hintsUsed || 0}</span>
            <span class="pstat-label">Pistas Consultadas</span>
          </div>
        </div>

        <!-- Vitrina de Cristales Sagrados -->
        <div class="game-card">
          <h3 style="font-family: var(--font-fun); font-size: 1.4rem; color: #ffffff; margin-bottom: 12px;">
            💎 Cristales Sagrados del Conocimiento
          </h3>
          <div style="display: flex; gap: 14px; flex-wrap: wrap;">
            ${crystalsHtml}
          </div>
        </div>

        <!-- Galería de Insignias y Logros -->
        <div class="game-card">
          <h3 style="font-family: var(--font-fun); font-size: 1.4rem; color: #ffffff; margin-bottom: 16px;">
            🏆 Salón de Medallas e Insignias
          </h3>
          <div class="badges-grid">
            ${badgesHtml}
          </div>
        </div>

        <!-- Zona de Ajustes y Reinicio -->
        <div class="game-card" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; border-color: rgba(239, 68, 68, 0.3);">
          <div>
            <h4 style="font-family: var(--font-fun); font-size: 1.2rem; color: #ffffff;">Reiniciar Aventura</h4>
            <p style="color: var(--text-muted); font-size: 0.9rem;">Borra todos los datos guardados en este navegador para comenzar de cero.</p>
          </div>
          <button id="btn-reset-progress" class="btn-danger" type="button" style="min-width: auto; padding: 10px 20px; font-size: 0.95rem;">
            ⚠️ Reiniciar Progreso
          </button>
        </div>
      </div>
    `;

    bindEvents(container);
  }

  function bindEvents(container) {
    const btnBack = container.querySelector("#btn-profile-back-map");
    if (btnBack) {
      btnBack.addEventListener("click", () => {
        window.GAME_SOUND.playClick();
        window.GAME_ROUTER.navigateTo("screen-map");
      });
    }

    const btnReset = container.querySelector("#btn-reset-progress");
    if (btnReset) {
      btnReset.addEventListener("click", () => {
        if (confirm("¿Estás seguro de que deseas reiniciar todo tu progreso? Se restablecerán tus niveles, monedas y cristales.")) {
          window.GAME_SOUND.playClick();
          window.GAME_STATE.resetAllProgress();
          render();
          window.GAME_GAMIFICATION.showToast("Progreso reiniciado correctamente.");
        }
      });
    }
  }

  return {
    render
  };
})();
