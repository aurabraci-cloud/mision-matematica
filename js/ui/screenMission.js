/**
 * MISIÓN MATEMÁTICA — CONTROLADOR DEL ÁREA DE MISIÓN
 * Orquesta las 3 Fases pedagógicas:
 * FASE 1: DESCUBRE (Concepto + Manipulativos)
 * FASE 2: ENTRENA (Ejercicios interactivos con progresión de dificultad)
 * FASE 3: DESAFÍO (Problema contextualizado y victoria)
 */

window.GAME_SCREEN_MISSION = (function () {
  let mission = null;
  let phase = 1; // 1: Descubre, 2: Entrena, 3: Desafío
  let exerciseIndex = 0;
  let hearts = 3;
  let selectedValue = null;
  let currentNumpadValue = "";
  let missionStats = {
    totalAnswers: 0,
    correctAnswers: 0,
    streakInMission: 0,
    maxStreakInMission: 0
  };

  function startMission(missionId) {
    const found = (window.GAME_DATA.MISSIONS || []).find(m => m.id === missionId);
    if (!found) {
      console.error("Misión no encontrada:", missionId);
      return;
    }

    mission = found;
    phase = 1;
    exerciseIndex = 0;
    hearts = 3;
    selectedValue = null;
    currentNumpadValue = "";
    missionStats = {
      totalAnswers: 0,
      correctAnswers: 0,
      streakInMission: 0,
      maxStreakInMission: 0
    };

    window.GAME_ADAPTIVE.resetSession();
    render();
    window.GAME_ROUTER.navigateTo("screen-mission");
  }

  function render() {
    const container = document.getElementById("screen-mission");
    if (!container || !mission) return;

    const totalExercises = (mission.trainingExercises || []).length;
    let progressPercent = 0;
    if (phase === 1) progressPercent = 10;
    else if (phase === 2) progressPercent = 20 + Math.round(((exerciseIndex) / totalExercises) * 60);
    else if (phase === 3) progressPercent = 90;

    let heartsHtml = "";
    for (let i = 0; i < 3; i++) {
      heartsHtml += `<span>${i < hearts ? '❤️' : '🤍'}</span>`;
    }

    container.innerHTML = `
      <div class="mission-play-container">
        <!-- Barra de Progreso de la Misión -->
        <div class="mission-progress-bar-wrap">
          <div class="phase-steps-indicator">
            <span class="phase-pill ${phase === 1 ? 'current' : (phase > 1 ? 'done' : '')}">1. Descubre</span>
            <span class="phase-pill ${phase === 2 ? 'current' : (phase > 2 ? 'done' : '')}">2. Entrena</span>
            <span class="phase-pill ${phase === 3 ? 'current' : ''}">3. Desafío</span>
          </div>

          <div class="progress-track" style="flex: 1; margin: 0 12px;">
            <div class="progress-fill" style="width: ${progressPercent}%;"></div>
          </div>

          <div class="mission-hearts-life" title="Intentos disponibles">${heartsHtml}</div>
        </div>

        <!-- Contenedor Principal de la Fase -->
        <div id="mission-phase-content" class="phase-card">
          <!-- Inyectado según la fase -->
        </div>
      </div>
    `;

    if (phase === 1) {
      renderPhase1Discover();
    } else if (phase === 2) {
      renderPhase2Training();
    } else if (phase === 3) {
      renderPhase3Challenge();
    }
  }

  // ========================================================
  // FASE 1: DESCUBRE
  // ========================================================
  function renderPhase1Discover() {
    const content = document.getElementById("mission-phase-content");
    if (!content || !mission) return;

    const disc = mission.discoveryPhase;
    const visualHtml = window.GAME_WIDGETS.renderDiscoveryVisual(disc);

    content.innerHTML = `
      <div class="discover-hero">
        <span class="discover-badge">FASE 1: DESCUBRE EL CONCEPTO</span>
        <h3 class="discover-title">${disc.title}</h3>
        <p class="discover-story">${disc.story}</p>

        <!-- Manipulativo interactivo visual -->
        ${visualHtml}

        <div style="margin-top: 18px;">
          <button id="btn-start-training" class="btn-primary btn-sparkle" type="button" style="font-size: 1.3rem; padding: 16px 36px;">
            ¡Entendido! Vamos a entrenar 🚀
          </button>
        </div>
      </div>
    `;

    const btnStartTraining = content.querySelector("#btn-start-training");
    if (btnStartTraining) {
      btnStartTraining.addEventListener("click", () => {
        window.GAME_SOUND.playClick();
        phase = 2;
        exerciseIndex = 0;
        render();
      });
    }
  }

  // ========================================================
  // FASE 2: ENTRENA
  // ========================================================
  function renderPhase2Training() {
    const content = document.getElementById("mission-phase-content");
    if (!content || !mission) return;

    const exercises = mission.trainingExercises || [];
    const ex = exercises[exerciseIndex];
    if (!ex) {
      // Todos los entrenamientos completados -> Pasar a Desafío
      phase = 3;
      render();
      return;
    }

    selectedValue = null;
    currentNumpadValue = "";

    const isNumpad = (ex.type === "numpad");
    let interactionHtml = "";

    if (isNumpad) {
      interactionHtml = `
        <div class="numpad-container">
          <div id="numpad-display" class="numpad-input-box empty">?</div>
          <div class="numpad-grid">
            <button type="button" class="numpad-key" data-key="1">1</button>
            <button type="button" class="numpad-key" data-key="2">2</button>
            <button type="button" class="numpad-key" data-key="3">3</button>
            <button type="button" class="numpad-key" data-key="4">4</button>
            <button type="button" class="numpad-key" data-key="5">5</button>
            <button type="button" class="numpad-key" data-key="6">6</button>
            <button type="button" class="numpad-key" data-key="7">7</button>
            <button type="button" class="numpad-key" data-key="8">8</button>
            <button type="button" class="numpad-key" data-key="9">9</button>
            <button type="button" class="numpad-key key-action" data-key="C">C</button>
            <button type="button" class="numpad-key" data-key="0">0</button>
            <button type="button" class="numpad-key key-action" data-key="back">⌫</button>
          </div>
        </div>
      `;
    } else {
      // Opciones de selección
      const options = ex.options || [];
      const choicesButtons = options.map((opt, idx) => `
        <button type="button" class="choice-btn" data-val="${opt}">
          <span style="font-size: 0.9rem; opacity: 0.7; margin-right: 6px;">${idx + 1}.</span> ${opt}
        </button>
      `).join("");

      interactionHtml = `
        <div class="choices-grid">
          ${choicesButtons}
        </div>
      `;
    }

    content.innerHTML = `
      <div class="exercise-header">
        <span class="exercise-number-pill">ENTRENAMIENTO • ${exerciseIndex + 1} de ${exercises.length}</span>
        <button id="btn-exercise-hint" class="btn-hint" type="button">
          💡 Pista
        </button>
      </div>

      <div class="question-prompt">${ex.question}</div>

      <div class="math-equation-display">
        ${ex.equationText || ''}
      </div>

      ${interactionHtml}

      <!-- Panel de Feedback -->
      <div id="exercise-feedback" class="exercise-feedback-panel" style="display: none;"></div>

      <div class="exercise-bottom-actions">
        <button id="btn-quit-mission" class="btn-secondary" type="button" style="min-width: auto; padding: 10px 18px; font-size: 0.95rem;">
          ✕ Salir
        </button>
        <button id="btn-check-exercise" class="btn-primary" type="button" disabled>
          Comprobar Respuesta ✔
        </button>
      </div>
    `;

    bindTrainingEvents(content, ex);
  }

  function bindTrainingEvents(content, ex) {
    const btnCheck = content.querySelector("#btn-check-exercise");
    const feedbackBox = content.querySelector("#exercise-feedback");
    const btnHint = content.querySelector("#btn-exercise-hint");
    const btnQuit = content.querySelector("#btn-quit-mission");

    // Salir
    if (btnQuit) {
      btnQuit.addEventListener("click", () => {
        if (confirm("¿Quieres volver al mapa? No te preocupes, podrás reanudar cuando quieras.")) {
          window.GAME_SOUND.playClick();
          window.GAME_ROUTER.navigateTo("screen-map");
        }
      });
    }

    // Pista
    if (btnHint) {
      btnHint.addEventListener("click", () => {
        window.GAME_SOUND.playHint();
        window.GAME_STATE.recordHintUsed();
        showHintModal(ex.hint || "Descompón los números paso a paso.");
      });
    }

    // Interacción Opciones Múltiples
    if (ex.type !== "numpad") {
      content.querySelectorAll(".choice-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          window.GAME_SOUND.playClick();
          content.querySelectorAll(".choice-btn").forEach(b => b.classList.remove("selected-choice"));
          btn.classList.add("selected-choice");
          selectedValue = btn.getAttribute("data-val");
          btnCheck.disabled = false;
        });
      });
    } else {
      // Interacción Numpad
      const display = content.querySelector("#numpad-display");
      content.querySelectorAll(".numpad-key").forEach(key => {
        key.addEventListener("click", () => {
          window.GAME_SOUND.playClick();
          const k = key.getAttribute("data-key");
          if (k === "C") {
            currentNumpadValue = "";
          } else if (k === "back") {
            currentNumpadValue = currentNumpadValue.slice(0, -1);
          } else {
            if (currentNumpadValue.length < 5) {
              currentNumpadValue += k;
            }
          }

          if (currentNumpadValue === "") {
            display.textContent = "?";
            display.classList.add("empty");
            btnCheck.disabled = true;
          } else {
            display.textContent = currentNumpadValue;
            display.classList.remove("empty");
            selectedValue = currentNumpadValue;
            btnCheck.disabled = false;
          }
        });
      });
    }

    // Comprobar Respuesta
    if (btnCheck) {
      btnCheck.addEventListener("click", () => {
        const valRes = window.GAME_VALIDATOR.validateAnswer(selectedValue, ex.correctAnswer);
        missionStats.totalAnswers++;
        window.GAME_STATE.addAnswerRecord(valRes.isCorrect);

        const adaptiveInfo = window.GAME_ADAPTIVE.registerResult(valRes.isCorrect, ex);

        if (valRes.isCorrect) {
          // --- RESPUESTA CORRECTA ---
          window.GAME_SOUND.playCorrect();
          if (window.GAME_VOICE) {
            window.GAME_VOICE.speakCorrect(missionStats.streakInMission + 1);
          }
          missionStats.correctAnswers++;
          missionStats.streakInMission++;
          if (missionStats.streakInMission > missionStats.maxStreakInMission) {
            missionStats.maxStreakInMission = missionStats.streakInMission;
          }

          if (missionStats.streakInMission >= 3) {
            window.GAME_SOUND.playStreak();
          }

          feedbackBox.className = "exercise-feedback-panel feedback-success";
          feedbackBox.innerHTML = `
            <span style="font-size: 1.8rem;">🎉</span>
            <div>
              <strong>${valRes.feedbackText}</strong>
              <p>${ex.explanation || ''}</p>
            </div>
          `;
          feedbackBox.style.display = "flex";

          // Deshabilitar botones para evitar multi-clic
          btnCheck.disabled = true;
          content.querySelectorAll(".choice-btn, .numpad-key").forEach(b => b.disabled = true);

          // Si es múltiple opción, pintar verde
          const correctBtn = content.querySelector(`.choice-btn[data-val="${ex.correctAnswer}"]`);
          if (correctBtn) correctBtn.classList.add("correct-choice");

          // Efecto XP flotante
          window.GAME_FX.spawnFloatingXP("+15 XP", btnCheck);
          window.GAME_GAMIFICATION.addXP(15);

          setTimeout(() => {
            exerciseIndex++;
            render();
          }, 1400);

        } else {
          // --- RESPUESTA INCORRECTA (APRENDIZAJE PEDAGÓGICO) ---
          window.GAME_SOUND.playWrong();
          if (window.GAME_VOICE) {
            window.GAME_VOICE.speakEncouragement();
          }
          missionStats.streakInMission = 0;

          feedbackBox.className = "exercise-feedback-panel feedback-retry";
          feedbackBox.innerHTML = `
            <span style="font-size: 1.8rem;">💡</span>
            <div>
              <strong>${valRes.feedbackText}</strong>
              <p>${ex.hint || 'Revisa las operaciones con calma.'}</p>
            </div>
          `;
          feedbackBox.style.display = "flex";

          // Sacudir botón incorrecto
          if (ex.type !== "numpad") {
            const wrongBtn = content.querySelector(`.choice-btn[data-val="${selectedValue}"]`);
            if (wrongBtn) {
              wrongBtn.classList.add("wrong-choice");
              setTimeout(() => wrongBtn.classList.remove("wrong-choice"), 600);
            }
          }

          // Si ha tenido 2 errores, destacar botón de pista
          if (adaptiveInfo.shouldOfferHint && btnHint) {
            btnHint.classList.add("btn-sparkle");
            btnHint.focus();
          }

          // Corazones amigables
          if (hearts > 1) {
            hearts--;
          }
          // Actualizar corazones en header
          const heartsEl = document.querySelector(".mission-hearts-life");
          if (heartsEl) {
            let hHtml = "";
            for (let i = 0; i < 3; i++) hHtml += `<span>${i < hearts ? '❤️' : '🤍'}</span>`;
            heartsEl.innerHTML = hHtml;
          }
        }
      });
    }
  }

  // ========================================================
  // FASE 3: DESAFÍO CONTEXTUALIZADO
  // ========================================================
  function renderPhase3Challenge() {
    const content = document.getElementById("mission-phase-content");
    if (!content || !mission) return;

    const ch = mission.challengePhase;
    selectedValue = null;

    const options = ch.options || [];
    const choicesButtons = options.map((opt, idx) => `
      <button type="button" class="choice-btn" data-val="${opt}">
        <span style="font-size: 0.9rem; opacity: 0.7; margin-right: 6px;">${idx + 1}.</span> ${opt}
      </button>
    `).join("");

    content.innerHTML = `
      <div class="exercise-header">
        <span class="exercise-number-pill" style="color: var(--color-coin);">FASE 3: EL GRAN DESAFÍO NARRATIVO</span>
        <button id="btn-challenge-hint" class="btn-hint" type="button">
          💡 Pista
        </button>
      </div>

      <div style="background: rgba(0,0,0,0.3); border: 2px solid rgba(255,255,255,0.1); border-radius: 14px; padding: 20px; margin: 12px 0;">
        <h4 style="font-family: var(--font-fun); font-size: 1.3rem; color: var(--color-coin); margin-bottom: 8px;">
          ${ch.title}
        </h4>
        <p style="font-size: 1.15rem; color: var(--text-main); line-height: 1.6;">
          "${ch.storyText}"
        </p>
      </div>

      <div class="math-equation-display" style="border-color: var(--color-coin);">
        ${ch.question}
      </div>

      <div class="choices-grid">
        ${choicesButtons}
      </div>

      <div id="challenge-feedback" class="exercise-feedback-panel" style="display: none;"></div>

      <div class="exercise-bottom-actions">
        <button id="btn-quit-challenge" class="btn-secondary" type="button">
          Volver
        </button>
        <button id="btn-check-challenge" class="btn-primary btn-sparkle" type="button" disabled>
          ¡Completar Desafío! 🏆
        </button>
      </div>
    `;

    bindChallengeEvents(content, ch);
  }

  function bindChallengeEvents(content, ch) {
    const btnCheck = content.querySelector("#btn-check-challenge");
    const feedbackBox = content.querySelector("#challenge-feedback");
    const btnHint = content.querySelector("#btn-challenge-hint");
    const btnQuit = content.querySelector("#btn-quit-challenge");

    if (btnQuit) {
      btnQuit.addEventListener("click", () => {
        window.GAME_SOUND.playClick();
        window.GAME_ROUTER.navigateTo("screen-map");
      });
    }

    if (btnHint) {
      btnHint.addEventListener("click", () => {
        window.GAME_SOUND.playHint();
        window.GAME_STATE.recordHintUsed();
        showHintModal(ch.hint || "Analiza qué operación une o separa los datos de la historia.");
      });
    }

    content.querySelectorAll(".choice-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        window.GAME_SOUND.playClick();
        content.querySelectorAll(".choice-btn").forEach(b => b.classList.remove("selected-choice"));
        btn.classList.add("selected-choice");
        selectedValue = btn.getAttribute("data-val");
        btnCheck.disabled = false;
      });
    });

    if (btnCheck) {
      btnCheck.addEventListener("click", () => {
        const valRes = window.GAME_VALIDATOR.validateAnswer(selectedValue, ch.correctAnswer);
        missionStats.totalAnswers++;
        window.GAME_STATE.addAnswerRecord(valRes.isCorrect);

        if (valRes.isCorrect) {
          window.GAME_SOUND.playCorrect();
          if (window.GAME_VOICE) {
            window.GAME_VOICE.speakCorrect();
          }
          missionStats.correctAnswers++;
          missionStats.streakInMission++;

          feedbackBox.className = "exercise-feedback-panel feedback-success";
          feedbackBox.innerHTML = `
            <span style="font-size: 1.8rem;">🎉</span>
            <div>
              <strong>¡Desafío Superado!</strong>
              <p>${ch.explanation || ''}</p>
            </div>
          `;
          feedbackBox.style.display = "flex";
          btnCheck.disabled = true;

          const correctBtn = content.querySelector(`.choice-btn[data-val="${ch.correctAnswer}"]`);
          if (correctBtn) correctBtn.classList.add("correct-choice");

          // Concluir la misión con victoria
          setTimeout(() => {
            completeMissionVictory();
          }, 1200);

        } else {
          window.GAME_SOUND.playWrong();
          if (window.GAME_VOICE) {
            window.GAME_VOICE.speakEncouragement();
          }
          feedbackBox.className = "exercise-feedback-panel feedback-retry";
          feedbackBox.innerHTML = `
            <span style="font-size: 1.8rem;">💡</span>
            <div>
              <strong>Todavía no.</strong>
              <p>${ch.hint || 'Revisa el cálculo de la historia.'}</p>
            </div>
          `;
          feedbackBox.style.display = "flex";

          const wrongBtn = content.querySelector(`.choice-btn[data-val="${selectedValue}"]`);
          if (wrongBtn) {
            wrongBtn.classList.add("wrong-choice");
            setTimeout(() => wrongBtn.classList.remove("wrong-choice"), 600);
          }
        }
      });
    }
  }

  // ========================================================
  // VICTORIA DE MISIÓN & CELEBRACIÓN
  // ========================================================
  function completeMissionVictory() {
    window.GAME_SOUND.playVictory();
    window.GAME_FX.launchVictoryConfetti();

    // Guardar misión en estado
    const isCrystal = !!mission.isCrystalMission;
    window.GAME_STATE.markMissionCompleted(mission.id, mission.territoryId, isCrystal);

    // Recompensas de misión
    window.GAME_GAMIFICATION.addXP(mission.xpReward || 100);
    window.GAME_GAMIFICATION.addCoins(mission.coinReward || 25);

    // Si es misión de cristal, sonido especial
    if (isCrystal) {
      setTimeout(() => {
        window.GAME_SOUND.playCrystal();
      }, 800);
    }

    // Modal de Victoria
    const modal = document.getElementById("modal-victory");
    const vTitle = document.getElementById("victory-title");
    const vSub = document.getElementById("victory-subtitle");
    const vShowcase = document.getElementById("victory-rewards-showcase");
    const vXp = document.getElementById("victory-xp");
    const vCoins = document.getElementById("victory-coins");
    const vAccuracy = document.getElementById("victory-accuracy");
    const vStreak = document.getElementById("victory-streak");
    const btnContinue = document.getElementById("btn-victory-continue");

    if (modal) {
      vTitle.textContent = isCrystal ? "¡CRISTAL DESPERTADO!" : "¡Misión Cumplida!";
      vSub.textContent = isCrystal 
        ? `¡Has obtenido el sagrado ${mission.title}! ¡El poder del reino aumenta!` 
        : `¡Has completado con éxito la misión "${mission.title}"!`;

      vXp.textContent = `+${mission.xpReward} XP`;
      vCoins.textContent = `+${mission.coinReward}`;

      const totalA = Math.max(1, missionStats.totalAnswers);
      const acc = Math.round((missionStats.correctAnswers / totalA) * 100);
      vAccuracy.textContent = `${acc}%`;
      vStreak.textContent = `${missionStats.maxStreakInMission || 1}`;

      if (isCrystal) {
        const terr = (window.GAME_DATA.TERRITORIES || []).find(t => t.id === mission.territoryId);
        vShowcase.innerHTML = `
          <div style="font-size: 3.5rem; animation: bounce 1.5s infinite;">
            ${terr ? terr.gemIcon : '💎'}
          </div>
        `;
      } else {
        vShowcase.innerHTML = `
          <div style="font-size: 2.8rem;">⭐ 🏅 ⭐</div>
        `;
      }

      modal.classList.remove("hidden");

      if (window.GAME_VOICE) {
        window.GAME_VOICE.speakVictory(mission.title, isCrystal);
      }

      btnContinue.onclick = function () {
        if (window.GAME_VOICE) {
          window.GAME_VOICE.stop();
        }
        window.GAME_SOUND.playClick();
        modal.classList.add("hidden");
        window.GAME_ROUTER.navigateTo("screen-map");
      };
    }
  }

  // Modal de Pistas Pedagógicas
  function showHintModal(hintText) {
    const modal = document.getElementById("modal-hint");
    const body = document.getElementById("modal-hint-body");
    const btnClose = document.getElementById("btn-close-hint");
    const btnConfirm = document.getElementById("btn-confirm-hint");

    if (modal && body) {
      body.innerHTML = `
        <p style="font-size: 1.15rem; line-height: 1.6;">${hintText}</p>
      `;
      modal.classList.remove("hidden");

      const closeFunc = () => {
        window.GAME_SOUND.playClick();
        modal.classList.add("hidden");
      };

      if (btnClose) btnClose.onclick = closeFunc;
      if (btnConfirm) btnConfirm.onclick = closeFunc;
    }
  }

  return {
    startMission
  };
})();
