# 🎮 MISIÓN MATEMÁTICA — LA AVENTURA DEL EXPLORADOR NUMÉRICO

Una experiencia digital educativa y gamificada diseñada para que estudiantes de educación primaria aprendan, practiquen y dominen las operaciones matemáticas fundamentales a través de una aventura interactiva en mundos legendarios.

---

## 🌟 1. Concepto y Narrativa Pedagógica

El estudiante asume el rol de un **Explorador Matemático** (Cosmo, Foxy, Ada, Leo o Merlín) que debe viajar por 5 territorios cósmicos para recuperar los **5 Cristales Sagrados del Conocimiento Matemático**:

1. 🌳 **Bosque de las Sumas** — Dominar la adición y la reagrupación (Cristal Esmeralda).
2. 🏜️ **Desierto de las Restas** — Dominar la sustracción, comparación y desagrupación (Cristal Ámbar).
3. 🚀 **Planeta de las Multiplicaciones** — Dominar grupos iguales, cuadrículas y tablas (Cristal Zafiro).
4. 🏰 **Castillo de las Divisiones** — Dominar el reparto equitativo y cocientes (Cristal Amatista).
5. 🌌 **Templo de las Operaciones** — Dominar la jerarquía de operaciones y el orden sagrado PEMDAS (Cristal Diamante Supremo).

---

## 🎯 2. Estructura Didáctica de las Misiones (Metodología CPA)

Cada uno de los 5 territorios contiene **4 Misiones** (Aprendiz, Explorador, Guardián y Gran Desafío), para un total de **20 misiones completas**.

Cada misión implementa rigurosamente el modelo pedagógico **Concreto → Pictórico → Abstracto (CPA)** en 3 fases:

* **FASE 1: DESCUBRE**:
  * Explicación interactiva del concepto con manipulativos visuales concretos (manzanas, gotas de agua, matrices de robots, platos de reparto, balanzas).
  * Narrativa contextual breve que despierta la curiosidad sin sobrecargar cognitivamente.
* **FASE 2: ENTRENA**:
  * Serie secuencial de ejercicios prácticos con progresión de dificultad suave (scaffolding).
  * Variedad de mecánicas: selección múltiple, teclado numérico táctil interactivo (Numpad) y completar términos faltantes.
  * Botón de **Pistas Pedagógicas (💡)** que descompone el problema en partes manejables sin revelar la respuesta de golpe.
  * Feedback inmediato constructivo: no existe el castigo punitivo de "GAME OVER"; el error se transforma en oportunidad de aprendizaje ("*Todavía no. Recuerda juntar primero las unidades...*").
* **FASE 3: DESAFÍO**:
  * Problema verbal contextualizado en la aventura (reparto de raciones en el castillo, combustible de cohetes, duendes del bosque) que evalúa la transferencia del aprendizaje a situaciones reales.

---

## 🏆 3. Sistema de Gamificación Integral

* **Experiencia (XP) y Rangos**:
  * Nivel 1: *Explorador Novato* (0 - 100 XP)
  * Nivel 2: *Rastreador Numérico* (101 - 250 XP)
  * Nivel 3: *Aventurero del Cálculo* (251 - 450 XP)
  * Nivel 4: *Guardián de la Aritmética* (451 - 700 XP)
  * Nivel 5: *Sabio de las Operaciones* (701 - 1000 XP)
  * Nivel 6: *Archimago Supremo* (1001+ XP)
* **Monedas Mágicas (🪙)**: Recompensas para motivar la constancia y completar desafíos.
* **Rachas (🔥)**: Multiplicador visual y sonoro al encadenar aciertos consecutivos.
* **Medallero (12 Insignias)**:
  * Primeros Pasos, Maestro de las Sumas, Guardián de las Restas, Experto en Multiplicaciones, Maestro de las Divisiones, Héroe de las Operaciones, Racha Imparable (5x), Furia Numérica (10x), Mente Curiosa (uso de pista), Relámpago Mental (contrarreloj), Coleccionista de Cristales (los 5 cristales) y Archimago Supremo (Nivel 6).
* **Retos Especiales**:
  * ⚡ *Retos Contrarreloj*: 60 segundos para resolver operaciones a gran velocidad mental.
  * 🧠 *Acertijos del Guardián*: Desafíos de lógica y operaciones inversas.

---

## 🛠️ 4. Arquitectura Técnica

La aplicación fue desarrollada siguiendo estándares de arquitectura frontend limpia y desacoplada:

```
juego/
├── index.html                   # Shell semántico, accesible, viewport responsive
├── css/
│   ├── main.css                 # Variables, tokens de diseño, layout global y temas
│   ├── components.css           # Botones 3D táctiles, tarjetas, numpad, modales
│   ├── animations.css           # Keyframes, confeti, flotantes, chispas y transiciones
│   └── responsive.css           # Adaptabilidad para móviles, tablets y monitores grandes
├── js/
│   ├── data/
│   │   ├── territories.js       # 5 territorios, lore, cristales y temas cromáticos
│   │   ├── missions.js          # 20 misiones pedagógicas completas (Descubre, Entrena, Desafío)
│   │   ├── badges.js            # 12 insignias con evaluadores de desbloqueo
│   │   └── specialChallenges.js # Retos contrarreloj y acertijos
│   ├── engine/
│   │   ├── sound.js             # Sintetizador nativo Web Audio API (latencia 0, sin archivos externos)
│   │   ├── state.js             # Estado reactivo y persistencia LocalStorage
│   │   ├── gamification.js      # Niveles, XP, insignias y desbloqueo progresivo
│   │   ├── adaptive.js          # Detección de patrones de error y sugerencia dinámica de pistas
│   │   └── validator.js         # Validación matemática y feedback constructivo
│   ├── ui/
│   │   ├── fx.js                # Canvas de confeti y partículas de victoria
│   │   ├── interactiveWidgets.js# Manipulativos visuales interactivos (CPA)
│   │   ├── screenHome.js        # Bienvenida, avatares y reanudación de partida
│   │   ├── screenMap.js         # Mapa visual del mundo y selector de misiones
│   │   ├── screenMission.js     # Reproductor de las 3 fases pedagógicas
│   │   ├── screenProfile.js     # Perfil del explorador, estadísticas y medallas
│   │   ├── screenSpecial.js     # Arena de Retos Especiales
│   │   └── router.js            # Navegación SPA y sincronización del Header
│   └── app.js                   # Inicialización y atajos de accesibilidad por teclado
└── tests/
    └── qa_full_suite.js         # Suite automatizada de pruebas unitarias y de integración
```

### Principales Decisiones Técnicas:
1. **Cero Dependencias Pesadas**: Ejecución instantánea en cualquier navegador de ordenadores escolares, tabletas o teléfonos sin necesidad de servidores complejos o procesos de build lentos.
2. **Audio Sintetizado con Web Audio API**: No depende de archivos de audio externos que puedan fallar en redes escolares filtradas; sintetiza campanillas mayores, fanfarrias y tonos suaves en tiempo real.
3. **Persistencia Local Segura**: Guarda automáticamente el nivel, XP, cristales, medallas y misiones completadas en `localStorage`.
4. **Accesibilidad Integral**:
   * Contraste de color certificado y botones táctiles grandes ($\ge 48\text{px}$).
   * Soporte para teclado (teclas `1`, `2`, `3`, `4` para opciones, `Enter` para comprobar).
   * Teclado virtual en pantalla (Numpad) para evitar que el teclado virtual del sistema tape la interfaz en tablets y móviles.
   * `prefers-reduced-motion` para estudiantes sensibles al movimiento.

---

## 🚀 5. Cómo Ejecutar la Aplicación

### Opción A (Directa en el Navegador):
Haz doble clic sobre el archivo `index.html` para abrirlo en cualquier navegador moderno (Chrome, Edge, Firefox, Safari).

### Opción B (Con Servidor Local):
Si prefieres servirlo mediante un servidor HTTP local:
```bash
# Con Python:
python -m http.server 8080

# O con Node:
npx serve .
```
Luego abre `http://localhost:8080` en tu navegador.

---

## 🧪 6. Pruebas de Calidad (QA Testing)

La aplicación incluye un banco de pruebas automatizado que verifica:
* Consistencia matemática de todos los ejercicios.
* Desbloqueo progresivo de territorios y misiones.
* Racha, XP, niveles e insignias.
* Motor de adaptación y validación de respuestas.

Para ejecutar la suite de pruebas:
```bash
node tests/qa_full_suite.js
```
Resultado: **30/30 pruebas pasadas con 0 fallos**.
