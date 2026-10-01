/**
 * MISIÓN MATEMÁTICA — VALIDADOR Y GENERADOR DE FEEDBACK EDUCATIVO
 * Asegura retroalimentación pedagógica inmediata, motivadora y constructiva.
 */

window.GAME_VALIDATOR = (function () {
  const PRAISE_MESSAGES = [
    "¡Excelente trabajo! ¡Cálculo impecable!",
    "¡Brillante! Has encontrado el resultado exacto.",
    "¡Magnífico razonamiento matemático!",
    "¡Avanzas como un auténtico Archimago!",
    "¡Puntería numérica perfecta!"
  ];

  const ENCOURAGING_MESSAGES = [
    "Todavía no, pero estás muy cerca. ¡Inténtalo de nuevo!",
    "Buen esfuerzo. Revisa con calma el último paso.",
    "Casi lo tienes. Puedes usar la pista si necesitas una guía.",
    "¡No te rindas! De cada intento aprendemos algo nuevo."
  ];

  function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  return {
    validateAnswer: function (userInput, expectedAnswer) {
      if (userInput === null || userInput === undefined || userInput === "") {
        return {
          isValid: false,
          isEmpty: true,
          feedbackText: "Escribe o elige una respuesta antes de comprobar."
        };
      }

      const numUser = parseInt(userInput, 10);
      const numExpected = parseInt(expectedAnswer, 10);
      const isCorrect = (numUser === numExpected);

      return {
        isValid: true,
        isCorrect,
        userValue: numUser,
        expectedValue: numExpected,
        feedbackText: isCorrect ? getRandom(PRAISE_MESSAGES) : getRandom(ENCOURAGING_MESSAGES)
      };
    }
  };
})();
