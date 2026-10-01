/**
 * MISIÓN MATEMÁTICA — MOTOR DE VOCES NATURALES (Web Speech API)
 * Dedicado exclusivamente a felicitar al estudiante cuando acierta
 * y a animarlo de manera cálida y positiva cuando se equivoca.
 */

window.GAME_VOICE = (function () {
  let isVoiceEnabled = true;
  let naturalVoice = null;
  const synth = (typeof window !== "undefined" && window.speechSynthesis) ? window.speechSynthesis : null;

  // Cargar preferencia guardada de voz
  try {
    const saved = localStorage.getItem("mision_matematica_voice_enabled");
    if (saved !== null) {
      isVoiceEnabled = JSON.parse(saved);
    }
  } catch (e) {
    console.warn("No se pudo acceder a localStorage para voz", e);
  }

  /**
   * Busca la voz más natural, humana y fluida disponible en el sistema.
   * Prioriza voces 'Natural', 'Neural', 'Online' (Edge/Windows) y 'Google español' (Chrome).
   */
  function findBestNaturalVoice(voices) {
    if (!voices || !voices.length) return null;

    // Filtrar voces en idioma español
    const spanishVoices = voices.filter(v => {
      const l = (v.lang || "").toLowerCase().replace("_", "-");
      return l.startsWith("es") || l.includes("spanish");
    });

    if (!spanishVoices.length) {
      return voices[0];
    }

    // 1. Máxima Prioridad: Voces Naturales / Neurales Online (sonido humano real)
    const neuralVoice = spanishVoices.find(v => {
      const n = (v.name || "").toLowerCase();
      return n.includes("natural") || n.includes("neural") || n.includes("online");
    });
    if (neuralVoice) return neuralVoice;

    // 2. Voces de Google (alta naturalidad en Chrome)
    const googleVoice = spanishVoices.find(v => {
      const n = (v.name || "").toLowerCase();
      return n.includes("google");
    });
    if (googleVoice) return googleVoice;

    // 3. Voces de Microsoft con entonación cálida
    const warmNames = ["dalia", "sabina", "laura", "paloma", "elvira", "salome", "jorge", "alvaro", "pablo"];
    const warmVoice = spanishVoices.find(v => {
      const n = (v.name || "").toLowerCase();
      return warmNames.some(w => n.includes(w));
    });
    if (warmVoice) return warmVoice;

    // 4. Voces nativas regionales (España, México, Colombia, etc.)
    const regionalVoice = spanishVoices.find(v => {
      const l = (v.lang || "").toLowerCase();
      return l.startsWith("es-es") || l.startsWith("es-mx") || l.startsWith("es-co") || l.startsWith("es-us");
    });
    if (regionalVoice) return regionalVoice;

    return spanishVoices[0];
  }

  function updateVoices() {
    if (!synth) return;
    try {
      const voices = synth.getVoices() || [];
      if (voices.length > 0) {
        naturalVoice = findBestNaturalVoice(voices);
      }
    } catch (e) {
      console.warn("Error cargando voces naturales:", e);
    }
  }

  if (synth) {
    updateVoices();
    if (typeof synth.onvoiceschanged !== "undefined") {
      synth.onvoiceschanged = updateVoices;
    }
  }

  /**
   * Reproduce una locución con entonación y tono 100% natural
   */
  function speak(text, options = {}) {
    if (!isVoiceEnabled || !synth) return;
    if (window.GAME_SOUND && window.GAME_SOUND.isMuted()) return;

    try {
      synth.cancel(); // Cancelar cualquier locución anterior

      if (!naturalVoice) {
        updateVoices();
      }

      const UtteranceClass = window.SpeechSynthesisUtterance || global.SpeechSynthesisUtterance;
      if (!UtteranceClass) return;

      const utterance = new UtteranceClass(text);
      utterance.lang = naturalVoice ? naturalVoice.lang : "es-ES";
      if (naturalVoice) {
        utterance.voice = naturalVoice;
      }

      // Parámetros a 1.0 para preservar el timbre humano original y evitar distorsión robótica
      utterance.rate = options.rate !== undefined ? options.rate : 1.0;
      utterance.pitch = options.pitch !== undefined ? options.pitch : 1.0;
      utterance.volume = options.volume !== undefined ? options.volume : 1.0;

      if (options.onEnd) {
        utterance.onend = options.onEnd;
      }

      synth.speak(utterance);
    } catch (e) {
      console.warn("Error en síntesis de voz:", e);
    }
  }

  function stop() {
    if (synth) {
      try {
        synth.cancel();
      } catch (e) {}
    }
  }

  function toggleVoice() {
    isVoiceEnabled = !isVoiceEnabled;
    try {
      localStorage.setItem("mision_matematica_voice_enabled", JSON.stringify(isVoiceEnabled));
    } catch (e) {}

    if (isVoiceEnabled) {
      speak("Voz activada.");
    } else {
      stop();
    }
    return isVoiceEnabled;
  }

  // ========================================================
  // FRASES EXCLUSIVAS DE FELICITACIÓN (AL ACERTAR)
  // ========================================================
  const PRAISES = [
    "¡Excelente trabajo!",
    "¡Muy bien hecho!",
    "¡Fantástico, lo lograste!",
    "¡Genial, qué buen cálculo!",
    "¡Increíble, sigue así!",
    "¡Eso es! ¡Respuesta correcta!",
    "¡Muy inteligente, excelente!",
    "¡Perfecto, diste en el blanco!"
  ];

  const STREAK_PRAISES = [
    "¡Estás en racha de fuego! ¡Imparable!",
    "¡Racha fantástica! ¡Sigue con esa energía!",
    "¡Qué precisión y agilidad matemática!"
  ];

  function speakCorrect(streak) {
    // Breve pausa (160ms) para que suene primero el efecto de campanita de acierto
    setTimeout(() => {
      if (streak && streak >= 3) {
        const idx = Math.floor(Math.random() * STREAK_PRAISES.length);
        speak(`¡Llevas ${streak} aciertos seguidos! ${STREAK_PRAISES[idx]}`);
      } else {
        const idx = Math.floor(Math.random() * PRAISES.length);
        speak(PRAISES[idx]);
      }
    }, 160);
  }

  // ========================================================
  // FRASES EXCLUSIVAS DE ÁNIMO (AL EQUIVOCARSE)
  // ========================================================
  const ENCOURAGEMENTS = [
    "¡Casi lo logras! Inténtalo de nuevo, tú puedes.",
    "No te preocupes, ¡vamos a intentarlo otra vez!",
    "¡Ánimo! Con calma seguro lo resuelves.",
    "Buen intento, ¡respira y vuelve a calcular!",
    "¡Tú eres muy capaz, sigue intentándolo!",
    "Tranquilo, de cada intento aprendemos algo nuevo."
  ];

  function speakEncouragement() {
    // Breve pausa (160ms) tras el efecto de sonido suave de error
    setTimeout(() => {
      const idx = Math.floor(Math.random() * ENCOURAGEMENTS.length);
      speak(ENCOURAGEMENTS[idx]);
    }, 160);
  }

  // Mantenemos compatibilidad con QA sin hablar en pantallas innecesarias
  function sanitizeMathForSpeech(text) {
    if (!text || typeof text !== "string") return "";
    return text.replace(/\+/g, " más ").replace(/=/g, " es igual a ").replace(/\s+/g, " ").trim();
  }

  return {
    isEnabled: () => isVoiceEnabled,
    toggleVoice,
    speak,
    stop,
    speakCorrect,
    speakEncouragement,
    sanitizeMathForSpeech,
    // Métodos no invasivos (no hablarán para no saturar al estudiante)
    speakAvatar: () => {},
    speakTerritory: () => {},
    speakExercise: () => {},
    speakStory: () => {},
    speakHint: () => {},
    speakVictory: (title) => {
      speak(`¡Misión cumplida! ¡Excelente trabajo!`);
    }
  };
})();
