/**
 * MISIÓN MATEMÁTICA — PANTALLA DE RETOS ESPECIALES
 * Modo Contrarreloj (Time Trial) y Acertijos del Guardián del Templo.
 */

window.GAME_SCREEN_SPECIAL = (function () {
  let activeChallenge = null;
  let timerInterval = null;
  let timeLeft = 60;
  let currentQuestionIndex = 0;
  let correctCount = 0;

  function render() {
    const container = document.getElementById("screen-special");
    if (!container) return;

    if (activeChallenge) {
      renderActiveChallenge(container);
      return;
    }

    const specials = window.GAME_DATA.SPECIAL_CHALLENGES;
    const timeTrials = specials.timeTrials || [];
    const riddles = specials.guardianRiddles || [];

    const ttCardsHtml = timeTrials.map(tt => `
      <div class="game-card" style="display: flex; flex-direction: column; justify-content: space-between; gap: 14px;">
        <div>
          <span style="font-size: 2rem;">⚡</span>
          <h4 style="font-family: var(--font-fun); font-size: 1.3rem; color: #ffffff; margin: 6px 0;">${tt.title}</h4>
          <p style="color: var(--text-muted); font-size: 0.95rem;">${tt.description}</p>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
          <span style="color: var(--color-coin); font-weight: 700;">⚡ +${tt.xpReward} XP • 🪙 +${tt.coinReward}</span>
          <button class="btn-primary btn-start-tt" data-id="${tt.id}" type="button">¡Comenzar! ⏱️</button>
        </div>
      </div>
    `).join("");

    const riddlesHtml = riddles.map(r => `
      <div class="game-card" style="display: flex; flex-direction: column; justify-content: space-between; gap: 14px; border-color: var(--color-templo);">
        <div>
          <span style="font-size: 2rem;">🧠</span>
          <h4 style="font-family: var(--font-fun); font-size: 1.3rem; color: #ffffff; margin: 6px 0;">${r.title}</h4>
          <p style="color: var(--text-muted); font-size: 0.95rem;">${r.story}</p>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
          <span style="color: var(--color-coin); font-weight: 700;">⚡ +${r.xpReward} XP • 🪙 +${r.coinReward}</span>
          <button class="btn-primary btn-start-riddle" data-id="${r.id}" type="button">Resolver Enigma 🔮</button>
        </div>
      </div>
    `).join("");

    container.innerHTML = `
      <div class="map-view-header">
        <h2 class="map-view-title">⚡ Zona de Retos Especiales</h2>
        <p class="map-view-subtitle">Supera pruebas de velocidad y enigmas para ganar recompensas legendarias.</p>
        <div style="margin-top: 16px;">
          <button id="btn-specials-back-map" class="btn-secondary" type="button">← Volver al Mapa</button>
        </div>
      </div>

      <div style="margin-top: 20px;">
        <h3 style="font-family: var(--font-fun); font-size: 1.4rem; color: #ffffff; margin-bottom: 14px;">⏱️ Retos Contrarreloj (60 Segundos)</h3>
        <div class="territories-grid" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));">
          ${ttCardsHtml}
        </div>
      </div>

      <div style="margin-top: 30px;">
        <h3 style="font-family: var(--font-fun); font-size: 1.4rem; color: #ffffff; margin-bottom: 14px;">🧠 Acertijos del Gran Guardián</h3>
        <div class="territories-grid" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));">
          ${riddlesHtml}
        </div>
      </div>
    `;

    bindSpecialEvents(container);
  }

  function bindSpecialEvents(container) {
    const btnBack = container.querySelector("#btn-specials-back-map");
    if (btnBack) {
      btnBack.addEventListener("click", () => {
        window.GAME_SOUND.playClick();
        window.GAME_ROUTER.navigateTo("screen-map");
      });
    }

    container.querySelectorAll(".btn-start-tt").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        startTimeTrial(id);
      });
    });

    container.querySelectorAll(".btn-start-riddle").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        startRiddle(id);
      });
    });
  }

  // --- INICIO DE CONTRARRELOJ ---
  function startTimeTrial(id) {
    const tt = window.GAME_DATA.SPECIAL_CHALLENGES.timeTrials.find(t => t.id === id);
    if (!tt) return;

    activeChallenge = { type: "time_trial", data: tt };
    timeLeft = tt.durationSeconds || 60;
    currentQuestionIndex = 0;
    correctCount = 0;

    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      timeLeft--;
      const timerDisplay = document.getElementById("tt-timer-val");
      if (timerDisplay) timerDisplay.textContent = `${timeLeft}s`;

      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        finishTimeTrial(false);
      }
    }, 1000);

    render();
  }

  function renderActiveChallenge(container) {
    if (activeChallenge.type === "time_trial") {
      const tt = activeChallenge.data;
      const q = tt.questions[currentQuestionIndex];

      const choicesHtml = (q.options || []).map((opt, idx) => `
        <button type="button" class="choice-btn" data-val="${opt}">
          <span style="font-size: 0.9rem; opacity: 0.7; margin-right: 6px;">${idx + 1}.</span> ${opt}
        </button>
      `).join("");

      container.innerHTML = `
        <div class="special-challenge-arena">
          <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
            <span style="font-family: var(--font-fun); font-size: 1.2rem; color: var(--color-xp);">Pregunta ${currentQuestionIndex + 1} de ${tt.questions.length}</span>
            <span id="tt-timer-val" style="font-family: var(--font-fun); font-size: 1.8rem; font-weight: 800; color: ${timeLeft < 15 ? 'var(--color-danger)' : 'var(--color-coin)'};">
              ${timeLeft}s
            </span>
            <button id="btn-cancel-special" class="btn-secondary" style="min-width: auto; padding: 6px 14px;">✕ Salir</button>
          </div>

          <div class="math-equation-display" style="width: 100%; border-color: var(--color-xp);">
            ${q.q}
          </div>

          <div class="choices-grid">
            ${choicesHtml}
          </div>
        </div>
      `;

      const btnCancel = container.querySelector("#btn-cancel-special");
      if (btnCancel) {
        btnCancel.addEventListener("click", () => {
          clearInterval(timerInterval);
          activeChallenge = null;
          render();
        });
      }

      container.querySelectorAll(".choice-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const val = parseInt(btn.getAttribute("data-val"), 10);
          if (val === q.a) {
            window.GAME_SOUND.playCorrect();
            btn.classList.add("correct-choice");
            correctCount++;
            setTimeout(() => {
              currentQuestionIndex++;
              if (currentQuestionIndex >= tt.questions.length) {
                clearInterval(timerInterval);
                finishTimeTrial(true);
              } else {
                render();
              }
            }, 300);
          } else {
            window.GAME_SOUND.playWrong();
            btn.classList.add("wrong-choice");
            setTimeout(() => btn.classList.remove("wrong-choice"), 400);
          }
        });
      });
    } else if (activeChallenge.type === "riddle") {
      renderActiveRiddle(container);
    }
  }

  function finishTimeTrial(success) {
    const tt = activeChallenge.data;
    if (success) {
      window.GAME_SOUND.playVictory();
      window.GAME_FX.launchVictoryConfetti();
      if (window.GAME_VOICE) {
        window.GAME_VOICE.speakCorrect();
      }
      window.GAME_GAMIFICATION.addXP(tt.xpReward);
      window.GAME_GAMIFICATION.addCoins(tt.coinReward);
      window.GAME_STATE.recordSpecialChallengeCompleted();
      window.GAME_GAMIFICATION.showToast(`⚡ ¡Reto Contrarreloj Superado! +${tt.xpReward} XP`);
    } else {
      window.GAME_SOUND.playWrong();
      if (window.GAME_VOICE) {
        window.GAME_VOICE.speakEncouragement();
      }
      window.GAME_GAMIFICATION.showToast(`⏱️ ¡Tiempo terminado! Lograste ${correctCount} de ${tt.questions.length}. ¡Buen intento!`);
    }
    activeChallenge = null;
    render();
  }

  // --- ACERTIJO DEL GUARDIÁN ---
  function startRiddle(id) {
    const r = window.GAME_DATA.SPECIAL_CHALLENGES.guardianRiddles.find(item => item.id === id);
    if (!r) return;
    activeChallenge = { type: "riddle", data: r };
    render();
  }

  function renderActiveRiddle(container) {
    const r = activeChallenge.data;
    const choicesHtml = (r.options || []).map((opt, idx) => `
      <button type="button" class="choice-btn" data-val="${opt}">
        <span style="font-size: 0.9rem; opacity: 0.7; margin-right: 6px;">${idx + 1}.</span> ${opt}
      </button>
    `).join("");

    container.innerHTML = `
      <div class="special-challenge-arena">
        <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
          <span style="font-family: var(--font-fun); font-size: 1.2rem; color: var(--color-templo);">🧠 ${r.title}</span>
          <button id="btn-cancel-riddle" class="btn-secondary" style="min-width: auto; padding: 6px 14px;">✕ Salir</button>
        </div>

        <div class="game-card" style="width: 100%; border-color: var(--color-templo);">
          <p style="font-size: 1.2rem; line-height: 1.6; margin-bottom: 12px;">"${r.riddleText}"</p>
          <div style="font-family: var(--font-fun); font-size: 1.4rem; color: var(--color-coin); text-align: center;">
            ${r.equationHint}
          </div>
        </div>

        <div class="choices-grid">
          ${choicesHtml}
        </div>
      </div>
    `;

    container.querySelector("#btn-cancel-riddle").onclick = () => {
      activeChallenge = null;
      render();
    };

    container.querySelectorAll(".choice-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const val = parseInt(btn.getAttribute("data-val"), 10);
        if (val === r.correctAnswer) {
          window.GAME_SOUND.playVictory();
          window.GAME_FX.launchVictoryConfetti();
          if (window.GAME_VOICE) {
            window.GAME_VOICE.speakCorrect();
          }
          window.GAME_GAMIFICATION.addXP(r.xpReward);
          window.GAME_GAMIFICATION.addCoins(r.coinReward);
          window.GAME_STATE.recordSpecialChallengeCompleted();
          window.GAME_GAMIFICATION.showToast(`🧠 ¡Enigma Resuelto! +${r.xpReward} XP`);
          activeChallenge = null;
          render();
        } else {
          window.GAME_SOUND.playWrong();
          if (window.GAME_VOICE) {
            window.GAME_VOICE.speakEncouragement();
          }
          btn.classList.add("wrong-choice");
          setTimeout(() => btn.classList.remove("wrong-choice"), 400);
          window.GAME_GAMIFICATION.showToast(r.hint);
        }
      });
    });
  }

  return {
    render
  };
})();
