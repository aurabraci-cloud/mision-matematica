/**
 * MISIÓN MATEMÁTICA — MOTOR DE AUDIO SINTETIZADO (Web Audio API)
 * Generador de efectos de sonido dinámicos para una experiencia de videojuego nativa.
 * Funciona offline, sin descargas de audio externas, con latencia cero y volumen controlado.
 */

window.GAME_SOUND = (function () {
  let audioCtx = null;
  let isMuted = false;

  // Cargar preferencia guardada de audio
  try {
    const saved = localStorage.getItem("mision_matematica_sound_muted");
    if (saved !== null) {
      isMuted = JSON.parse(saved);
    }
  } catch (e) {
    console.warn("No se pudo acceder a localStorage para sonido", e);
  }

  function initContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }
  }

  // Tono básico sintetizado con envolvente ADSR
  function playTone(freq, type = "sine", duration = 0.2, gainPeak = 0.2, startDelay = 0) {
    if (isMuted) return;
    initContext();
    if (!audioCtx) return;

    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime + startDelay);

    const now = audioCtx.currentTime + startDelay;
    gainNode.gain.setValueAtTime(0.0001, now);
    gainNode.gain.linearRampToValueAtTime(gainPeak, now + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.05);
  }

  return {
    isMuted: () => isMuted,

    toggleMute: function () {
      isMuted = !isMuted;
      try {
        localStorage.setItem("mision_matematica_sound_muted", JSON.stringify(isMuted));
      } catch (e) {}
      if (!isMuted) {
        this.playClick();
      }
      return isMuted;
    },

    // 1. Clic táctil de botón
    playClick: function () {
      if (isMuted) return;
      playTone(600, "triangle", 0.06, 0.15);
    },

    // 2. Respuesta Correcta (Acorde Mayor C-E-G-C brillante)
    playCorrect: function () {
      if (isMuted) return;
      initContext();
      const notes = [523.25, 659.25, 783.99, 1046.50]; // Do, Mi, Sol, Do agudo
      notes.forEach((freq, idx) => {
        playTone(freq, "triangle", 0.22, 0.25, idx * 0.08);
      });
    },

    // 3. Respuesta Incorrecta (Tono suave pedagógico, no agresivo)
    playWrong: function () {
      if (isMuted) return;
      initContext();
      // Dos notas descendentes suaves tipo marimba
      playTone(280, "sine", 0.25, 0.2, 0);
      playTone(220, "sine", 0.35, 0.2, 0.12);
    },

    // 4. Pista pedagógica (Arpegio místico de campanas)
    playHint: function () {
      if (isMuted) return;
      initContext();
      const notes = [659.25, 830.61, 987.77, 1318.51];
      notes.forEach((freq, idx) => {
        playTone(freq, "sine", 0.35, 0.2, idx * 0.09);
      });
    },

    // 5. Racha de Aciertos (Fueguitos)
    playStreak: function () {
      if (isMuted) return;
      initContext();
      const notes = [880, 1108.73, 1318.51, 1760];
      notes.forEach((freq, idx) => {
        playTone(freq, "triangle", 0.18, 0.22, idx * 0.06);
      });
    },

    // 6. Victoria de Misión (Fanfarria alegre)
    playVictory: function () {
      if (isMuted) return;
      initContext();
      const melody = [
        { f: 523.25, d: 0.15, t: 0 },
        { f: 659.25, d: 0.15, t: 0.14 },
        { f: 783.99, d: 0.18, t: 0.28 },
        { f: 1046.50, d: 0.45, t: 0.44 },
        { f: 880.00, d: 0.2, t: 0.7 },
        { f: 1046.50, d: 0.6, t: 0.9 }
      ];
      melody.forEach(item => {
        playTone(item.f, "triangle", item.d, 0.3, item.t);
      });
    },

    // 7. Subida de Nivel / Desbloqueo de Cristal
    playCrystal: function () {
      if (isMuted) return;
      initContext();
      const shimmer = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98, 2093.00];
      shimmer.forEach((freq, idx) => {
        playTone(freq, "sine", 0.5, 0.22, idx * 0.07);
      });
    }
  };
})();
