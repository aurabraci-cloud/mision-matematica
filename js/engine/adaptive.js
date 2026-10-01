/**
 * MISIÓN MATEMÁTICA — MOTOR DE ADAPTACIÓN PEDAGÓGICA
 * Regula la dificultad dinámica, detecta patrones de error y ofrece andamiaje (scaffolding).
 */

window.GAME_ADAPTIVE = (function () {
  let consecutiveErrors = 0;
  let consecutiveSuccesses = 0;

  return {
    resetSession: function () {
      consecutiveErrors = 0;
      consecutiveSuccesses = 0;
    },

    registerResult: function (isCorrect, exercise) {
      if (isCorrect) {
        consecutiveSuccesses++;
        consecutiveErrors = 0;
      } else {
        consecutiveErrors++;
        consecutiveSuccesses = 0;
      }

      return {
        consecutiveErrors,
        consecutiveSuccesses,
        shouldOfferHint: consecutiveErrors >= 2,
        isHighPerformer: consecutiveSuccesses >= 3
      };
    },

    getScaffoldingTip: function (exercise) {
      if (!exercise) return null;
      if (exercise.operator === "+") {
        return "Prueba sumando primero las unidades, o agrupando en decenas.";
      }
      if (exercise.operator === "-") {
        return "Piensa cuánto le falta al número pequeño para alcanzar al grande.";
      }
      if (exercise.operator === "×") {
        return "Recuerda que multiplicar es sumar grupos del mismo tamaño.";
      }
      if (exercise.operator === "÷") {
        return "Piensa en la tabla de multiplicar inversa: ¿qué número por el divisor da el total?";
      }
      return "Sigue la regla: primero paréntesis, luego multiplicaciones y divisiones.";
    }
  };
})();
