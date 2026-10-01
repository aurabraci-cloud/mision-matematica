/**
 * MISIÓN MATEMÁTICA — INICIALIZADOR PRINCIPAL DE LA APLICACIÓN
 * Punto de entrada del videojuego educativo.
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Inicializar eventos globales del header y suscripciones de estado
  window.GAME_ROUTER.initHeaderEvents();

  // 2. Verificar insignias y rangos iniciales
  window.GAME_GAMIFICATION.checkBadges();

  // 3. Accesibilidad por Teclado Global (Teclas 1, 2, 3, 4 y Enter)
  document.addEventListener("keydown", (e) => {
    // Si estamos escribiendo en un input de texto, ignorar atajos numéricos
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
      return;
    }

    const currentScreen = window.GAME_ROUTER.getCurrentScreen();

    // Atajos en Misión o Retos Especiales
    if (currentScreen === "screen-mission" || currentScreen === "screen-special") {
      if (["1", "2", "3", "4"].includes(e.key)) {
        const choiceButtons = document.querySelectorAll(".choices-grid .choice-btn");
        const idx = parseInt(e.key, 10) - 1;
        if (choiceButtons && choiceButtons[idx] && !choiceButtons[idx].disabled) {
          choiceButtons[idx].click();
        }
      } else if (e.key === "Enter") {
        const btnCheck = document.getElementById("btn-check-exercise") || 
                         document.getElementById("btn-check-challenge") ||
                         document.getElementById("btn-start-training") ||
                         document.getElementById("btn-victory-continue");
        if (btnCheck && !btnCheck.disabled) {
          btnCheck.click();
        }
      }
    }
  });

  // 4. Iniciar en la Pantalla de Inicio
  window.GAME_ROUTER.navigateTo("screen-home");

  console.log("🎮 ¡Misión Matemática iniciada con éxito!");
});
