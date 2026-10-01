/**
 * MISIÓN MATEMÁTICA — BASE DE DATOS DE MISIONES Y EJERCICIOS
 * Contenido pedagógico completo para los 5 territorios:
 * Suma, Resta, Multiplicación, División y Operaciones Combinadas.
 * Cada misión incluye: Fase 1 (Descubre), Fase 2 (Entrena), Fase 3 (Desafío).
 */

window.GAME_DATA = window.GAME_DATA || {};

window.GAME_DATA.MISSIONS = [
  // ========================================================
  // TERRITORIO 1: BOSQUE DE LAS SUMAS (4 Misiones)
  // ========================================================
  {
    id: "sum_m1",
    territoryId: "bosque_sumas",
    missionNumber: 1,
    roleTitle: "Aprendiz de la Suma",
    title: "Misión 1: Las Manzanas Mágicas",
    description: "Aprende el poder de juntar tesoros y sumar cantidades iniciales.",
    xpReward: 100,
    coinReward: 25,
    discoveryPhase: {
      title: "¿Qué significa sumar?",
      story: "Sumar es como juntar tesoros en tu mochila de explorador. Cuando tienes una cantidad y encuentras más, ¡el total crece!",
      visualType: "manipulative_add",
      itemEmoji: "🍎",
      leftCount: 3,
      rightCount: 2,
      operator: "+",
      equation: "3 + 2 = 5",
      explanationSteps: [
        "En una rama encontramos 3 manzanas mágicas: 🍎🍎🍎",
        "En la otra rama encontramos 2 manzanas más: 🍎🍎",
        "Al juntarlas todas en nuestra canasta tenemos: 1, 2, 3, 4 y ¡5 manzanas!",
        "La regla matemática se escribe: 3 + 2 = 5"
      ]
    },
    trainingExercises: [
      {
        id: "sum_1_e1",
        type: "multiple_choice",
        question: "¿Cuántas frutas mágicas hay en total?",
        equationText: "3 + 2 = ?",
        correctAnswer: 5,
        options: [4, 5, 6, 7],
        hint: "Cuenta las manzanas: tienes 3, agrega una (4) y otra más (5).",
        explanation: "3 + 2 = 5. ¡Excelente! Has sumado con éxito.",
        visual: { emoji: "🍎", a: 3, b: 2 }
      },
      {
        id: "sum_1_e2",
        type: "multiple_choice",
        question: "Juntamos 4 bayas del bosque y 3 bayas doradas.",
        equationText: "4 + 3 = ?",
        correctAnswer: 7,
        options: [6, 7, 8, 9],
        hint: "Empieza en el 4 y cuenta 3 pasos hacia adelante: 5, 6, 7.",
        explanation: "4 + 3 = 7. ¡Muy bien calculado!",
        visual: { emoji: "🫐", a: 4, b: 3 }
      },
      {
        id: "sum_1_e3",
        type: "numpad",
        question: "Usa el teclado mágico para resolver:",
        equationText: "5 + 4 = ?",
        correctAnswer: 9,
        hint: "Piensa: 5 + 5 sería 10, así que 5 + 4 es uno menos, ¡9!",
        explanation: "5 + 4 = 9. ¡Tu velocidad de cálculo está aumentando!",
        visual: { emoji: "⭐", a: 5, b: 4 }
      },
      {
        id: "sum_1_e4",
        type: "fill_blank",
        question: "Encuentra el número que completa el hechizo:",
        equationText: "6 + [ ? ] = 10",
        correctAnswer: 4,
        options: [3, 4, 5, 6],
        hint: "¿Cuánto le falta a 6 para llegar al número redondo 10? Puedes contar con tus dedos.",
        explanation: "6 + 4 = 10. ¡Los amigos del 10 son fundamentales!",
        visual: { emoji: "💎", a: 6, target: 10 }
      }
    ],
    challengePhase: {
      id: "sum_1_ch",
      title: "Desafío del Duende Mensajero",
      storyText: "El duende del bosque guardaba 7 semillas mágicas. Una mariposa luminosa le trajo 5 semillas más. ¿Cuántas semillas mágicas tiene ahora para plantar?",
      question: "7 + 5 = ?",
      correctAnswer: 12,
      options: [11, 12, 13, 14],
      hint: "Separa el 5 en 3 y 2. Así: 7 + 3 = 10, y 10 + 2 = 12.",
      explanation: "7 + 5 = 12 semillas. ¡Has salvado la arboleda sagrada!"
    }
  },
  {
    id: "sum_m2",
    territoryId: "bosque_sumas",
    missionNumber: 2,
    roleTitle: "Explorador del Bosque",
    title: "Misión 2: El Sendero de las Decenas",
    description: "Aprende a sumar números más grandes combinando decenas y unidades.",
    xpReward: 120,
    coinReward: 30,
    discoveryPhase: {
      title: "Sumar Decenas y Unidades",
      story: "Cuando los números crecen, podemos organizarlos en grupos de 10 (decenas) y unidades sueltas para sumar con facilidad.",
      visualType: "manipulative_base10",
      itemEmoji: "🟩",
      leftCount: 14,
      rightCount: 5,
      operator: "+",
      equation: "14 + 5 = 19",
      explanationSteps: [
        "El número 14 tiene 1 decena (10) y 4 unidades: [10] + [4]",
        "Queremos sumarle 5 unidades más.",
        "Sumamos primero las unidades: 4 + 5 = 9 unidades.",
        "Mantenemos la decena: 10 + 9 = ¡19 en total!"
      ]
    },
    trainingExercises: [
      {
        id: "sum_2_e1",
        type: "multiple_choice",
        question: "¿Cuál es el resultado de sumar unidades a una decena?",
        equationText: "12 + 6 = ?",
        correctAnswer: 18,
        options: [16, 17, 18, 19],
        hint: "Suma las unidades: 2 + 6 = 8. Agrega el diez: 18.",
        explanation: "12 + 6 = 18. ¡Dominas las unidades con soltura!",
        visual: { emoji: "🍄", a: 12, b: 6 }
      },
      {
        id: "sum_2_e2",
        type: "numpad",
        question: "Resuelve con el teclado numérico:",
        equationText: "15 + 8 = ?",
        correctAnswer: 23,
        hint: "15 + 5 = 20. Luego suma los 3 que quedaban del 8: 20 + 3 = 23.",
        explanation: "15 + 8 = 23. ¡Descomponer números es la mejor estrategia!",
        visual: { emoji: "🌸", a: 15, b: 8 }
      },
      {
        id: "sum_2_e3",
        type: "multiple_choice",
        question: "Sumando decenas completas:",
        equationText: "20 + 30 = ?",
        correctAnswer: 50,
        options: [40, 50, 60, 500],
        hint: "Piensa en 2 decenas + 3 decenas = 5 decenas (50).",
        explanation: "20 + 30 = 50. ¡Las decenas son pan comido para ti!",
        visual: { emoji: "🌳", a: 20, b: 30 }
      },
      {
        id: "sum_2_e4",
        type: "fill_blank",
        question: "Completa la suma mágica:",
        equationText: "25 + [ ? ] = 32",
        correctAnswer: 7,
        options: [5, 6, 7, 8],
        hint: "De 25 a 30 faltan 5. Y de 30 a 32 faltan 2. Total: 5 + 2 = 7.",
        explanation: "25 + 7 = 32. ¡Gran razonamiento matemático!",
        visual: { emoji: "🪙", a: 25, target: 32 }
      }
    ],
    challengePhase: {
      id: "sum_2_ch",
      title: "El Puente de Troncos Sagrados",
      storyText: "Para cruzar el río del bosque necesitas colocar 24 tablas de roble y 18 tablas de abeto. ¿Cuántas tablas usarás en total para armar el puente?",
      question: "24 + 18 = ?",
      correctAnswer: 42,
      options: [38, 40, 42, 44],
      hint: "Suma 24 + 10 = 34. Ahora suma los 8 restantes: 34 + 8 = 42.",
      explanation: "24 + 18 = 42 tablas. ¡El puente es resistente y seguro!"
    }
  },
  {
    id: "sum_m3",
    territoryId: "bosque_sumas",
    missionNumber: 3,
    roleTitle: "Guardián del Bosque",
    title: "Misión 3: Problemas de la Naturaleza",
    description: "Aplica tus sumas para resolver historias y enigmas de los seres del bosque.",
    xpReward: 140,
    coinReward: 35,
    discoveryPhase: {
      title: "Comprender Problemas Matemáticos",
      story: "Un problema matemático es una historia con pistas. El secreto es buscar los datos y la pregunta.",
      visualType: "manipulative_story",
      itemEmoji: "🐿️",
      leftCount: 8,
      rightCount: 6,
      operator: "+",
      equation: "8 + 6 = 14",
      explanationSteps: [
        "Paso 1: ¿Qué datos tenemos? 8 ardillas y 6 castañas.",
        "Paso 2: ¿Qué nos piden? El total.",
        "Paso 3: Juntamos los dos grupos con la suma: 8 + 6.",
        "Paso 4: 8 + 6 = 14. ¡Siempre responde con las unidades correctas!"
      ]
    },
    trainingExercises: [
      {
        id: "sum_3_e1",
        type: "multiple_choice",
        question: "En un nido hay 9 pajarillos y llegan 7 más. ¿Cuántos hay ahora?",
        equationText: "9 + 7 = ?",
        correctAnswer: 16,
        options: [15, 16, 17, 18],
        hint: "9 está muy cerca de 10. Quítale 1 al 7 y dáselo al 9: 10 + 6 = 16.",
        explanation: "9 + 7 = 16 pajarillos cantando alegremente.",
        visual: { emoji: "🐦", a: 9, b: 7 }
      },
      {
        id: "sum_3_e2",
        type: "multiple_choice",
        question: "Un ciervo corre 16 km por la mañana y 15 km por la tarde. ¿Cuánto recorrió?",
        equationText: "16 + 15 = ?",
        correctAnswer: 31,
        options: [29, 30, 31, 32],
        hint: "15 + 15 = 30, y como teníamos 16 (uno más), el resultado es 31.",
        explanation: "16 + 15 = 31 km. ¡Estrategia de dobles dominada!",
        visual: { emoji: "🦌", a: 16, b: 15 }
      },
      {
        id: "sum_3_e3",
        type: "numpad",
        question: "Recogiste 35 flores rojas y 27 flores azules. ¿Total?",
        equationText: "35 + 27 = ?",
        correctAnswer: 62,
        hint: "Suma las decenas (30 + 20 = 50) y luego las unidades (5 + 7 = 12). 50 + 12 = 62.",
        explanation: "35 + 27 = 62 hermosas flores.",
        visual: { emoji: "🌺", a: 35, b: 27 }
      }
    ],
    challengePhase: {
      id: "sum_3_ch",
      title: "El Festín de la Reina de las Hadas",
      storyText: "En la mesa real hay 46 copas de néctar. Las hadas cocineras traen 38 copas recién preparadas. ¿Cuántas copas de néctar habrá para los invitados?",
      question: "46 + 38 = ?",
      correctAnswer: 84,
      options: [82, 84, 86, 94],
      hint: "46 + 40 = 86. Como sumamos 2 de más (era 38), restamos 2: 86 - 2 = 84.",
      explanation: "46 + 38 = 84 copas de néctar. ¡El banquete es todo un éxito!"
    }
  },
  {
    id: "sum_m4",
    territoryId: "bosque_sumas",
    missionNumber: 4,
    roleTitle: "Gran Desafío del Cristal Esmeralda",
    title: "Misión 4: La Prueba del Árbol Ancestral",
    description: "Supera la prueba suprema de las sumas para despertar el Cristal Verde del Conocimiento.",
    xpReward: 250,
    coinReward: 50,
    isCrystalMission: true,
    discoveryPhase: {
      title: "El Poder de la Reagrupación",
      story: "Cuando sumamos y las unidades pasan de 9, formamos una nueva decena. ¡Es la magia de la reagrupación!",
      visualType: "manipulative_carry",
      itemEmoji: "✨",
      leftCount: 47,
      rightCount: 36,
      operator: "+",
      equation: "47 + 36 = 83",
      explanationSteps: [
        "Unidades: 7 + 6 = 13 (3 unidades y nos llevamos 1 decena).",
        "Decenas: 4 decenas + 3 decenas + 1 decena que llevamos = 8 decenas.",
        "Total: 8 decenas y 3 unidades = ¡83!"
      ]
    },
    trainingExercises: [
      {
        id: "sum_4_e1",
        type: "multiple_choice",
        question: "Resuelve con reagrupación:",
        equationText: "58 + 25 = ?",
        correctAnswer: 83,
        options: [73, 82, 83, 85],
        hint: "8 + 5 = 13 (anota 3, lleva 1). 5 + 2 + 1 = 8. Resultado: 83.",
        explanation: "58 + 25 = 83. ¡Reagrupación perfecta!",
        visual: { emoji: "🍃", a: 58, b: 25 }
      },
      {
        id: "sum_4_e2",
        type: "numpad",
        question: "Cálculo mental del Gran Árbol:",
        equationText: "64 + 29 = ?",
        correctAnswer: 93,
        hint: "Suma 64 + 30 = 94, y quita 1 porque era 29: 93.",
        explanation: "64 + 29 = 93. ¡Tu mente brilla como el cristal!",
        visual: { emoji: "🌿", a: 64, b: 29 }
      },
      {
        id: "sum_4_e3",
        type: "multiple_choice",
        question: "¡Suma de tres números mágicos!",
        equationText: "15 + 25 + 30 = ?",
        correctAnswer: 70,
        options: [60, 65, 70, 75],
        hint: "Agrupa primero los números amigables: 15 + 25 = 40. Luego 40 + 30 = 70.",
        explanation: "15 + 25 + 30 = 70. ¡Agrupar inteligentemente facilita todo!",
        visual: { emoji: "🔮", a: 40, b: 30 }
      }
    ],
    challengePhase: {
      id: "sum_4_ch",
      title: "Despertar del Cristal Esmeralda",
      storyText: "El pedestal sagrado necesita 150 unidades de energía pura. En el altar oeste hay 78 unidades y en el altar este hay 72 unidades. ¿Reunirás la energía necesaria?",
      question: "78 + 72 = ?",
      correctAnswer: 150,
      options: [140, 148, 150, 152],
      hint: "70 + 70 = 140. Y 8 + 2 = 10. 140 + 10 = 150.",
      explanation: "78 + 72 = 150. ¡El Cristal Esmeralda se enciende con un brillo esmeralda resplandeciente!"
    }
  },

  // ========================================================
  // TERRITORIO 2: DESIERTO DE LAS RESTAS (4 Misiones)
  // ========================================================
  {
    id: "sub_m1",
    territoryId: "desierto_restas",
    missionNumber: 1,
    roleTitle: "Aprendiz de la Resta",
    title: "Misión 1: Las Cantimploras de Agua",
    description: "Descubre cómo quitar elementos y encontrar cuántos quedan.",
    xpReward: 120,
    coinReward: 25,
    discoveryPhase: {
      title: "¿Qué significa restar?",
      story: "Restar es quitar, separar o comparar. En el desierto, cada sorbo de agua consumido disminuye la reserva.",
      visualType: "manipulative_sub",
      itemEmoji: "💧",
      leftCount: 6,
      rightCount: 2,
      operator: "-",
      equation: "6 - 2 = 4",
      explanationSteps: [
        "Teníamos 6 gotas de agua pura: 💧💧💧💧💧💧",
        "Bebemos 2 gotas para refrescarnos: ❌❌",
        "Contamos las que nos quedan: 1, 2, 3 y 4.",
        "La regla matemática se escribe: 6 - 2 = 4"
      ]
    },
    trainingExercises: [
      {
        id: "sub_1_e1",
        type: "multiple_choice",
        question: "¿Cuántas gotas de agua quedan?",
        equationText: "7 - 3 = ?",
        correctAnswer: 4,
        options: [3, 4, 5, 6],
        hint: "Tienes 7, quita 3: retrocede 6, 5, 4.",
        explanation: "7 - 3 = 4. ¡Exacto!",
        visual: { emoji: "💧", a: 7, b: 3 }
      },
      {
        id: "sub_1_e2",
        type: "numpad",
        question: "Resta básica del explorador:",
        equationText: "9 - 4 = ?",
        correctAnswer: 5,
        hint: "Piensa al revés: ¿qué número sumado a 4 da 9? ¡Es 5!",
        explanation: "9 - 4 = 5. ¡La resta es la operación inversa de la suma!",
        visual: { emoji: "🏜️", a: 9, b: 4 }
      },
      {
        id: "sub_1_e3",
        type: "fill_blank",
        question: "¿Qué número falta?",
        equationText: "10 - [ ? ] = 7",
        correctAnswer: 3,
        options: [2, 3, 4, 5],
        hint: "De 10 a 7, ¿cuántos pasos hacia atrás das?",
        explanation: "10 - 3 = 7. ¡Gran intuición numérica!",
        visual: { emoji: "☀️", a: 10, target: 7 }
      }
    ],
    challengePhase: {
      id: "sub_1_ch",
      title: "El Oasis Escondido",
      storyText: "En la caravana había 14 dátiles dulces. Durante la travesía por las dunas se comieron 6 dátiles. ¿Cuántos dátiles quedan para la cena?",
      question: "14 - 6 = ?",
      correctAnswer: 8,
      options: [7, 8, 9, 10],
      hint: "Quita primero 4 para llegar a 10 (14 - 4 = 10). Luego quita los 2 que faltan: 10 - 2 = 8.",
      explanation: "14 - 6 = 8 dátiles. ¡La caravana está a salvo en el oasis!"
    }
  },
  {
    id: "sub_m2",
    territoryId: "desierto_restas",
    missionNumber: 2,
    roleTitle: "Explorador del Desierto",
    title: "Misión 2: Huellas en la Arena",
    description: "Aprende a restar con números de dos cifras sin miedo a equivocarte.",
    xpReward: 140,
    coinReward: 30,
    discoveryPhase: {
      title: "Restar Decenas y Unidades",
      story: "Al restar números más grandes, podemos restar primero las decenas y luego las unidades.",
      visualType: "manipulative_sub_dec",
      itemEmoji: "🪙",
      leftCount: 28,
      rightCount: 13,
      operator: "-",
      equation: "28 - 13 = 15",
      explanationSteps: [
        "Tenemos 28 monedas mágicas.",
        "Restamos 13 (que es 10 + 3).",
        "Primero restamos la decena: 28 - 10 = 18.",
        "Luego restamos las 3 unidades: 18 - 3 = ¡15!"
      ]
    },
    trainingExercises: [
      {
        id: "sub_2_e1",
        type: "multiple_choice",
        question: "Resta de dos cifras sencilla:",
        equationText: "27 - 14 = ?",
        correctAnswer: 13,
        options: [11, 12, 13, 14],
        hint: "Decenas: 20 - 10 = 10. Unidades: 7 - 4 = 3. Total: 13.",
        explanation: "27 - 14 = 13. ¡Súper metódico y acertado!",
        visual: { emoji: "🏺", a: 27, b: 14 }
      },
      {
        id: "sub_2_e2",
        type: "numpad",
        question: "Calcula con el teclado numérico:",
        equationText: "35 - 12 = ?",
        correctAnswer: 23,
        hint: "35 - 10 = 25. Ahora 25 - 2 = 23.",
        explanation: "35 - 12 = 23. ¡Cálculo mental afinado!",
        visual: { emoji: "🌵", a: 35, b: 12 }
      },
      {
        id: "sub_2_e3",
        type: "multiple_choice",
        question: "Restando a una centena:",
        equationText: "100 - 30 = ?",
        correctAnswer: 70,
        options: [60, 70, 80, 90],
        hint: "10 decenas menos 3 decenas son 7 decenas (70).",
        explanation: "100 - 30 = 70. ¡Dominas los números grandes!",
        visual: { emoji: "💎", a: 100, b: 30 }
      }
    ],
    challengePhase: {
      id: "sub_2_ch",
      title: "El Reloj de Arena Encantado",
      storyText: "El reloj tenía 45 granos de polvo estelar. El viento del desierto se llevó 18 granos. ¿Cuántos granos estelares quedan en el reloj?",
      question: "45 - 18 = ?",
      correctAnswer: 27,
      options: [25, 27, 28, 33],
      hint: "45 - 20 = 25. Como quitamos 2 de más (era 18), sumamos 2 de vuelta: 25 + 2 = 27.",
      explanation: "45 - 18 = 27 granos estelares. ¡El tiempo mágico se estabiliza!"
    }
  },
  {
    id: "sub_m3",
    territoryId: "desierto_restas",
    missionNumber: 3,
    roleTitle: "Guardián del Desierto",
    title: "Misión 3: Misterios de las Pirámides",
    description: "Resuelve problemas de diferencia y comparación en las ruinas ancestrales.",
    xpReward: 160,
    coinReward: 35,
    discoveryPhase: {
      title: "La Diferencia: ¿Cuánto más o cuánto menos?",
      story: "La resta también sirve para saber cuánto le saca un explorador a otro o la distancia entre dos puntos.",
      visualType: "manipulative_compare",
      itemEmoji: "🧭",
      leftCount: 15,
      rightCount: 9,
      operator: "-",
      equation: "15 - 9 = 6",
      explanationSteps: [
        "La pirámide A mide 15 metros de altura.",
        "La pirámide B mide 9 metros de altura.",
        "Para saber cuánto es más alta la pirámide A, calculamos la diferencia:",
        "15 - 9 = 6 metros de diferencia."
      ]
    },
    trainingExercises: [
      {
        id: "sub_3_e1",
        type: "multiple_choice",
        question: "Lucas tiene 32 flechas mágicas y Ana tiene 19. ¿Cuántas flechas más tiene Lucas?",
        equationText: "32 - 19 = ?",
        correctAnswer: 13,
        options: [11, 12, 13, 14],
        hint: "32 - 20 = 12. Suma 1 porque 19 es uno menos que 20: 12 + 1 = 13.",
        explanation: "32 - 19 = 13 flechas de diferencia.",
        visual: { emoji: "🏹", a: 32, b: 19 }
      },
      {
        id: "sub_3_e2",
        type: "numpad",
        question: "En una cueva había 50 antorchas encendidas. Se apagaron 24. ¿Cuántas siguen brillando?",
        equationText: "50 - 24 = ?",
        correctAnswer: 26,
        hint: "50 - 20 = 30. Luego 30 - 4 = 26.",
        explanation: "50 - 24 = 26 antorchas alumbrando el camino.",
        visual: { emoji: "🔥", a: 50, b: 24 }
      }
    ],
    challengePhase: {
      id: "sub_3_ch",
      title: "El Tesoro del Faraón Matemático",
      storyText: "El cofre dorado tenía 84 gemas preciosas. Un guardián colocó 39 gemas en el altar del templo. ¿Cuántas gemas quedaron dentro del cofre?",
      question: "84 - 39 = ?",
      correctAnswer: 45,
      options: [43, 45, 47, 55],
      hint: "Resta 84 - 40 = 44, y luego añade 1: 44 + 1 = 45.",
      explanation: "84 - 39 = 45 gemas. ¡El faraón te bendice con su sabiduría!"
    }
  },
  {
    id: "sub_m4",
    territoryId: "desierto_restas",
    missionNumber: 4,
    roleTitle: "Gran Desafío del Cristal Ámbar",
    title: "Misión 4: La Prueba de la Esfinge de Arena",
    description: "Supera la prueba suprema de las restas para obtener el Cristal Ámbar Solar.",
    xpReward: 250,
    coinReward: 50,
    isCrystalMission: true,
    discoveryPhase: {
      title: "Resta con Desagrupación (Pedir Prestado)",
      story: "Cuando a las unidades no les alcanza para quitar, abrimos una decena y la transformamos en 10 unidades sueltas.",
      visualType: "manipulative_borrow",
      itemEmoji: "💛",
      leftCount: 52,
      rightCount: 27,
      operator: "-",
      equation: "52 - 27 = 25",
      explanationSteps: [
        "A 2 no podemos quitarle 7 unidades.",
        "Transformamos 1 decena del 50 en 10 unidades: el 2 se convierte en 12, y el 5 pasa a ser 4 decenas.",
        "Unidades: 12 - 7 = 5 unidades.",
        "Decenas: 4 - 2 = 2 decenas.",
        "Resultado final: ¡25!"
      ]
    },
    trainingExercises: [
      {
        id: "sub_4_e1",
        type: "multiple_choice",
        question: "Resuelve con desagrupación:",
        equationText: "63 - 28 = ?",
        correctAnswer: 35,
        options: [33, 35, 45, 48],
        hint: "13 - 8 = 5 unidades. 5 decenas - 2 decenas = 3 decenas. Total: 35.",
        explanation: "63 - 28 = 35. ¡La Esfinge asiente satisfecha!",
        visual: { emoji: "🦁", a: 63, b: 28 }
      },
      {
        id: "sub_4_e2",
        type: "numpad",
        question: "El enigma final de las dunas:",
        equationText: "91 - 46 = ?",
        correctAnswer: 45,
        hint: "11 - 6 = 5. 8 - 4 = 4. Resultado: 45.",
        explanation: "91 - 46 = 45. ¡Cálculo impecable!",
        visual: { emoji: "⏳", a: 91, b: 46 }
      }
    ],
    challengePhase: {
      id: "sub_4_ch",
      title: "El Despertar del Cristal Ámbar",
      storyText: "La tormenta de arena tenía 120 ráfagas de viento. El amuleto del explorador neutralizó 75 ráfagas. ¿Cuántas ráfagas quedaron antes de que el cielo se despejara por completo?",
      question: "120 - 75 = ?",
      correctAnswer: 45,
      options: [35, 45, 55, 65],
      hint: "De 75 a 100 van 25. De 100 a 120 van 20. 25 + 20 = 45.",
      explanation: "120 - 75 = 45. ¡El cielo brilla en oro puro y el Cristal Ámbar flota en tus manos!"
    }
  },

  // ========================================================
  // TERRITORIO 3: PLANETA DE LAS MULTIPLICACIONES (4 Misiones)
  // ========================================================
  {
    id: "mul_m1",
    territoryId: "planeta_mult",
    missionNumber: 1,
    roleTitle: "Aprendiz de la Multiplicación",
    title: "Misión 1: Flotillas de Robots",
    description: "Comprende la multiplicación como la forma rápida de sumar grupos iguales.",
    xpReward: 140,
    coinReward: 30,
    discoveryPhase: {
      title: "¿Qué es multiplicar?",
      story: "¡Multiplicar es sumar el mismo número varias veces! En vez de sumar 3 + 3 + 3 + 3, decimos: 4 veces 3, o 4 × 3.",
      visualType: "manipulative_mult_groups",
      itemEmoji: "🤖",
      groupCount: 3,
      itemsPerGroup: 4,
      operator: "×",
      equation: "3 × 4 = 12",
      explanationSteps: [
        "Imagina 3 escuadrones de robots espaciales.",
        "Cada escuadrón tiene 4 robots: [🤖🤖🤖🤖] [🤖🤖🤖🤖] [🤖🤖🤖🤖]",
        "Sumando: 4 + 4 + 4 = 12 robots.",
        "Multiplicando rápidamente: 3 grupos × 4 robots = ¡12 robots!"
      ]
    },
    trainingExercises: [
      {
        id: "mul_1_e1",
        type: "multiple_choice",
        question: "Tenemos 4 naves con 2 astronautas cada una:",
        equationText: "4 × 2 = ?",
        correctAnswer: 8,
        options: [6, 8, 10, 12],
        hint: "Es lo mismo que 2 + 2 + 2 + 2.",
        explanation: "4 × 2 = 8 astronautas listos para despegar.",
        visual: { emoji: "🚀", a: 4, b: 2 }
      },
      {
        id: "mul_1_e2",
        type: "multiple_choice",
        question: "3 filas de 5 estrellas de energía:",
        equationText: "3 × 5 = ?",
        correctAnswer: 15,
        options: [12, 14, 15, 18],
        hint: "Cuenta de 5 en 5 tres veces: 5, 10, 15.",
        explanation: "3 × 5 = 15 estrellas cargadas de luz.",
        visual: { emoji: "⭐", a: 3, b: 5 }
      },
      {
        id: "mul_1_e3",
        type: "numpad",
        question: "Multiplicación de la estación orbital:",
        equationText: "5 × 4 = ?",
        correctAnswer: 20,
        hint: "Cinco veces cuatro: 4, 8, 12, 16, 20. ¡O 4 veces 5!",
        explanation: "5 × 4 = 20. ¡La propiedad conmutativa dice que 4 × 5 también es 20!",
        visual: { emoji: "🛸", a: 5, b: 4 }
      }
    ],
    challengePhase: {
      id: "mul_1_ch",
      title: "La Carga de los Tanques de Helio",
      storyText: "El cohete tiene 6 compartimentos de combustible. Cada compartimento lleva 3 baterías de helio cuántico. ¿Cuántas baterías lleva en total el cohete?",
      question: "6 × 3 = ?",
      correctAnswer: 18,
      options: [15, 18, 21, 24],
      hint: "Piensa en 5 × 3 = 15, y suma un 3 más: 15 + 3 = 18.",
      explanation: "6 × 3 = 18 baterías. ¡Motores listos para velocidad luz!"
    }
  },
  {
    id: "mul_m2",
    territoryId: "planeta_mult",
    missionNumber: 2,
    roleTitle: "Explorador de las Tablas",
    title: "Misión 2: Los Paneles Solares Cósmicos",
    description: "Descubre cómo organizar matrices en filas y columnas para multiplicar sin esfuerzo.",
    xpReward: 160,
    coinReward: 35,
    discoveryPhase: {
      title: "Filas y Columnas (Matrices Rectangulares)",
      story: "Un panel solar gigante está formado por filas horizontales y columnas verticales. Para saber el total, solo multiplicamos fila × columna.",
      visualType: "manipulative_mult_grid",
      itemEmoji: "🟦",
      rows: 4,
      cols: 6,
      operator: "×",
      equation: "4 × 6 = 24",
      explanationSteps: [
        "El panel tiene 4 filas de altura.",
        "Cada fila tiene 6 celdas azules de ancho.",
        "Total de celdas: 4 × 6 = ¡24 celdas solares!"
      ]
    },
    trainingExercises: [
      {
        id: "mul_2_e1",
        type: "multiple_choice",
        question: "Una matriz de 6 filas y 6 columnas:",
        equationText: "6 × 6 = ?",
        correctAnswer: 36,
        options: [30, 32, 36, 42],
        hint: "6 × 5 = 30. Suma un 6 más: 30 + 6 = 36.",
        explanation: "6 × 6 = 36. ¡Un cuadrado perfecto!",
        visual: { emoji: "🛰️", a: 6, b: 6 }
      },
      {
        id: "mul_2_e2",
        type: "numpad",
        question: "La tabla del 7 en el espacio:",
        equationText: "7 × 4 = ?",
        correctAnswer: 28,
        hint: "El doble de 7 es 14, y el doble de 14 es 28.",
        explanation: "7 × 4 = 28. ¡Multiplicar por 4 es hacer dos veces el doble!",
        visual: { emoji: "🪐", a: 7, b: 4 }
      },
      {
        id: "mul_2_e3",
        type: "multiple_choice",
        question: "El truco de la tabla del 9:",
        equationText: "9 × 5 = ?",
        correctAnswer: 45,
        options: [40, 45, 50, 54],
        hint: "10 × 5 = 50. Como es 9, resta 5: 50 - 5 = 45.",
        explanation: "9 × 5 = 45. ¡Fíjate que 4 + 5 = 9!",
        visual: { emoji: "🌌", a: 9, b: 5 }
      }
    ],
    challengePhase: {
      id: "mul_2_ch",
      title: "La Cúpula Geodésica Marciana",
      storyText: "En el invernadero de Marte hay 8 mesas de cultivo hidropónico. En cada mesa caben 6 plantas de tomate espacial. ¿Cuántas plantas se pueden cultivar?",
      question: "8 × 6 = ?",
      correctAnswer: 48,
      options: [42, 46, 48, 54],
      hint: "8 × 5 = 40. Añade un 8 más: 40 + 8 = 48.",
      explanation: "8 × 6 = 48 plantas espaciales. ¡Alimento garantizado para la tripulación!"
    }
  },
  {
    id: "mul_m3",
    territoryId: "planeta_mult",
    missionNumber: 3,
    roleTitle: "Guardián de la Galaxia",
    title: "Misión 3: Satélites y Constelaciones",
    description: "Domina las tablas avanzadas del 7, 8 y 9 para sincronizar satélites interplanetarios.",
    xpReward: 180,
    coinReward: 40,
    discoveryPhase: {
      title: "Patrones y Multiplicaciones Mayores",
      story: "Los números grandes tienen patrones mágicos: por ejemplo, multiplicar por 10 es solo añadir un cero al final.",
      visualType: "manipulative_mult_patterns",
      itemEmoji: "✨",
      baseNumber: 7,
      multiplier: 8,
      operator: "×",
      equation: "7 × 8 = 56",
      explanationSteps: [
        "Un truco legendario para recordar 7 × 8: cuenta 5, 6, 7, 8...",
        "¡56 = 7 × 8! Los números van en orden: 5, 6, 7, 8.",
        "¡Con este truco jamás olvidarás 7 × 8 = 56!"
      ]
    },
    trainingExercises: [
      {
        id: "mul_3_e1",
        type: "multiple_choice",
        question: "Uno de los cálculos más famosos de la galaxia:",
        equationText: "7 × 8 = ?",
        correctAnswer: 56,
        options: [54, 56, 58, 64],
        hint: "Recuerda la rima: 5, 6, 7, 8 -> ¡56 = 7 × 8!",
        explanation: "7 × 8 = 56. ¡Magia matemática pura!",
        visual: { emoji: "💫", a: 7, b: 8 }
      },
      {
        id: "mul_3_e2",
        type: "numpad",
        question: "Cálculo orbital:",
        equationText: "8 × 8 = ?",
        correctAnswer: 64,
        hint: "8 × 7 era 56. Suma 8 más: 56 + 8 = 64.",
        explanation: "8 × 8 = 64. ¡Excelente puntería cuántica!",
        visual: { emoji: "🌠", a: 8, b: 8 }
      },
      {
        id: "mul_3_e3",
        type: "multiple_choice",
        question: "Multiplicar por decenas:",
        equationText: "9 × 20 = ?",
        correctAnswer: 180,
        options: [160, 180, 200, 1800],
        hint: "Haz 9 × 2 = 18, y agrega el cero al final: 180.",
        explanation: "9 × 20 = 180. ¡Cálculo ultra veloz!",
        visual: { emoji: "⚡", a: 9, b: 20 }
      }
    ],
    challengePhase: {
      id: "mul_3_ch",
      title: "La Red de Satélites Láser",
      storyText: "La estación necesita desplegar 9 constelaciones de satélites. Cada constelación está formada por 7 satélites reflectores. ¿Cuántos satélites se lanzarán en total?",
      question: "9 × 7 = ?",
      correctAnswer: 63,
      options: [56, 61, 63, 72],
      hint: "10 × 7 = 70. Quita 7: 70 - 7 = 63.",
      explanation: "9 × 7 = 63 satélites. ¡La red de comunicaciones está online!"
    }
  },
  {
    id: "mul_m4",
    territoryId: "planeta_mult",
    missionNumber: 4,
    roleTitle: "Gran Desafío del Cristal Zafiro",
    title: "Misión 4: El Núcleo de Fusión Hiperespacial",
    description: "Supera la prueba suprema de multiplicaciones para despertar el Cristal Zafiro Cósmico.",
    xpReward: 250,
    coinReward: 50,
    isCrystalMission: true,
    discoveryPhase: {
      title: "La Propiedad Distributiva Estelar",
      story: "Para multiplicar un número grande como 12 × 4, lo desarmamos: (10 × 4) + (2 × 4) = 40 + 8 = 48.",
      visualType: "manipulative_mult_distributive",
      itemEmoji: "💠",
      operator: "×",
      equation: "12 × 5 = 60",
      explanationSteps: [
        "12 se separa en 10 y 2.",
        "Multiplicamos 10 × 5 = 50.",
        "Multiplicamos 2 × 5 = 10.",
        "Juntamos: 50 + 10 = ¡60!"
      ]
    },
    trainingExercises: [
      {
        id: "mul_4_e1",
        type: "multiple_choice",
        question: "¿Cuánto es 12 × 4 usando descomposición?",
        equationText: "12 × 4 = ?",
        correctAnswer: 48,
        options: [44, 46, 48, 52],
        hint: "10 × 4 = 40, y 2 × 4 = 8. 40 + 8 = 48.",
        explanation: "12 × 4 = 48. ¡Estrategia magistral!",
        visual: { emoji: "💙", a: 12, b: 4 }
      },
      {
        id: "mul_4_e2",
        type: "numpad",
        question: "Potencia del generador estelar:",
        equationText: "15 × 3 = ?",
        correctAnswer: 45,
        hint: "10 × 3 = 30. 5 × 3 = 15. 30 + 15 = 45.",
        explanation: "15 × 3 = 45. ¡El núcleo vibra con poder!",
        visual: { emoji: "🌀", a: 15, b: 3 }
      }
    ],
    challengePhase: {
      id: "mul_4_ch",
      title: "El Despertar del Cristal Zafiro",
      storyText: "El hiperpropulsor requiere sincronizar 25 pulsos magnéticos en 4 sectores simultáneos. ¿Cuántos pulsos magnéticos en total activarán el salto dimensional?",
      question: "25 × 4 = ?",
      correctAnswer: 100,
      options: [80, 90, 100, 125],
      hint: "Piensa en monedas: 4 monedas de 25 centavos hacen 100.",
      explanation: "25 × 4 = 100 pulsos. ¡El Cristal Zafiro irradia una deslumbrante luz azul cósmica!"
    }
  },

  // ========================================================
  // TERRITORIO 4: CASTILLO DE LAS DIVISIONES (4 Misiones)
  // ========================================================
  {
    id: "div_m1",
    territoryId: "castillo_div",
    missionNumber: 1,
    roleTitle: "Aprendiz de la División",
    title: "Misión 1: El Banquete de los Caballeros",
    description: "Aprende a repartir en partes exactamente iguales con justicia y equidad.",
    xpReward: 160,
    coinReward: 30,
    discoveryPhase: {
      title: "¿Qué significa dividir?",
      story: "Dividir es repartir una cantidad total en grupos iguales para que nadie reciba más ni menos.",
      visualType: "manipulative_div_share",
      itemEmoji: "🍞",
      totalItems: 12,
      recipientCount: 3,
      operator: "÷",
      equation: "12 ÷ 3 = 4",
      explanationSteps: [
        "El cocinero real horneó 12 panes dorados.",
        "Hay 3 caballeros en la mesa redonda: 🛡️ 🛡️ 🛡️",
        "Repartimos uno a uno equitativamente...",
        "A cada caballero le tocan exactamente 4 panes: 12 ÷ 3 = 4."
      ]
    },
    trainingExercises: [
      {
        id: "div_1_e1",
        type: "multiple_choice",
        question: "Repartir 10 escudos entre 2 guardias:",
        equationText: "10 ÷ 2 = ?",
        correctAnswer: 5,
        options: [4, 5, 6, 8],
        hint: "¿La mitad de 10? ¿Qué número multiplicado por 2 da 10?",
        explanation: "10 ÷ 2 = 5 escudos para cada guardia.",
        visual: { emoji: "🛡️", a: 10, b: 2 }
      },
      {
        id: "div_1_e2",
        type: "numpad",
        question: "Reparto de monedas de plata:",
        equationText: "15 ÷ 3 = ?",
        correctAnswer: 5,
        hint: "Pregúntate: ¿3 por cuánto da 15? 3 × 5 = 15.",
        explanation: "15 ÷ 3 = 5 monedas. ¡La división es la inversa de la multiplicación!",
        visual: { emoji: "🪙", a: 15, b: 3 }
      },
      {
        id: "div_1_e3",
        type: "multiple_choice",
        question: "Repartir 16 gemas en 4 cofres:",
        equationText: "16 ÷ 4 = ?",
        correctAnswer: 4,
        options: [3, 4, 5, 6],
        hint: "4 × 4 = 16.",
        explanation: "16 ÷ 4 = 4 gemas por cofre.",
        visual: { emoji: "💎", a: 16, b: 4 }
      }
    ],
    challengePhase: {
      id: "div_1_ch",
      title: "El Botín del Dragón Amistoso",
      storyText: "Un dragón bondadoso compartió 24 manzanas de oro con 4 aldeanos necesitados. ¿Cuántas manzanas de oro recibió cada aldeano?",
      question: "24 ÷ 4 = ?",
      correctAnswer: 6,
      options: [5, 6, 7, 8],
      hint: "¿Qué número multiplicado por 4 da 24? 4 × 6 = 24.",
      explanation: "24 ÷ 4 = 6 manzanas de oro. ¡Todos quedaron felices y agradecidos!"
    }
  },
  {
    id: "div_m2",
    territoryId: "castillo_div",
    missionNumber: 2,
    roleTitle: "Explorador del Castillo",
    title: "Misión 2: Los Batallones de Arqueros",
    description: "Descubre cómo la multiplicación te ayuda a resolver cualquier división al instante.",
    xpReward: 180,
    coinReward: 35,
    discoveryPhase: {
      title: "La Familia de Operaciones",
      story: "Si sabes que 6 × 7 = 42, ¡automáticamente sabes que 42 ÷ 6 = 7 y que 42 ÷ 7 = 6!",
      visualType: "manipulative_div_family",
      itemEmoji: "🏹",
      totalItems: 18,
      groupSize: 6,
      operator: "÷",
      equation: "18 ÷ 6 = 3",
      explanationSteps: [
        "18 soldados formados en grupos de 6.",
        "¿Cuántos grupos se forman? 3 grupos.",
        "Porque 3 × 6 = 18, entonces 18 ÷ 6 = 3."
      ]
    },
    trainingExercises: [
      {
        id: "div_2_e1",
        type: "multiple_choice",
        question: "Usa tus tablas al revés:",
        equationText: "35 ÷ 5 = ?",
        correctAnswer: 7,
        options: [6, 7, 8, 9],
        hint: "¿Qué número por 5 da 35? 5 × 7 = 35.",
        explanation: "35 ÷ 5 = 7. ¡Exacto!",
        visual: { emoji: "🏰", a: 35, b: 5 }
      },
      {
        id: "div_2_e2",
        type: "numpad",
        question: "División del Gran Maestro:",
        equationText: "48 ÷ 6 = ?",
        correctAnswer: 8,
        hint: "¿6 por cuánto da 48? Recuerda 6 × 8 = 48.",
        explanation: "48 ÷ 6 = 8. ¡Memoria de arquero!",
        visual: { emoji: "🎯", a: 48, b: 6 }
      },
      {
        id: "div_2_e3",
        type: "multiple_choice",
        question: "La tabla del 8 al rescate:",
        equationText: "56 ÷ 8 = ?",
        correctAnswer: 7,
        options: [6, 7, 8, 9],
        hint: "Recuerda: 5, 6, 7, 8... 56 = 7 × 8.",
        explanation: "56 ÷ 8 = 7. ¡Genial!",
        visual: { emoji: "⚔️", a: 56, b: 8 }
      }
    ],
    challengePhase: {
      id: "div_2_ch",
      title: "Las Antorchas de la Muralla Real",
      storyText: "El alcaide tiene 63 antorchas mágicas para colocar en 9 torres de vigilancia. Si cada torre debe tener exactamente la misma cantidad, ¿cuántas antorchas van en cada torre?",
      question: "63 ÷ 9 = ?",
      correctAnswer: 7,
      options: [6, 7, 8, 9],
      hint: "¿Qué número multiplicado por 9 da 63? 9 × 7 = 63.",
      explanation: "63 ÷ 9 = 7 antorchas por torre. ¡Las murallas quedan iluminadas y protegidas!"
    }
  },
  {
    id: "div_m3",
    territoryId: "castillo_div",
    missionNumber: 3,
    roleTitle: "Guardián de la Justicia",
    title: "Misión 3: Problemas de Reparto y Agrupación",
    description: "Aplica la división en situaciones de la vida cotidiana del reino.",
    xpReward: 200,
    coinReward: 40,
    discoveryPhase: {
      title: "Dividir Cantidades Mayores",
      story: "Para dividir un número como 84 entre 2, dividimos las decenas y luego las unidades: (80 ÷ 2) + (4 ÷ 2) = 40 + 2 = 42.",
      visualType: "manipulative_div_twodigit",
      itemEmoji: "👑",
      totalItems: 84,
      divisor: 2,
      operator: "÷",
      equation: "84 ÷ 2 = 42",
      explanationSteps: [
        "8 decenas ÷ 2 = 4 decenas (40).",
        "4 unidades ÷ 2 = 2 unidades.",
        "Total: 40 + 2 = ¡42!"
      ]
    },
    trainingExercises: [
      {
        id: "div_3_e1",
        type: "multiple_choice",
        question: "¿La mitad de 68?",
        equationText: "68 ÷ 2 = ?",
        correctAnswer: 34,
        options: [32, 34, 36, 44],
        hint: "Mitad de 60 es 30. Mitad de 8 es 4. 30 + 4 = 34.",
        explanation: "68 ÷ 2 = 34. ¡Rápido y certero!",
        visual: { emoji: "🛡️", a: 68, b: 2 }
      },
      {
        id: "div_3_e2",
        type: "numpad",
        question: "Dividir entre 3:",
        equationText: "96 ÷ 3 = ?",
        correctAnswer: 32,
        hint: "90 ÷ 3 = 30. 6 ÷ 3 = 2. 30 + 2 = 32.",
        explanation: "96 ÷ 3 = 32. ¡Cálculo digno de un Archimago!",
        visual: { emoji: "📜", a: 96, b: 3 }
      }
    ],
    challengePhase: {
      id: "div_3_ch",
      title: "Las Raciones del Ejército Real",
      storyText: "En las caballerizas hay 90 sacos de avena que deben repartirse entre 5 escuadrones de corceles. ¿Cuántos sacos de avena recibirá cada escuadrón?",
      question: "90 ÷ 5 = ?",
      correctAnswer: 18,
      options: [16, 18, 20, 25],
      hint: "Para dividir entre 5, divide entre 10 (da 9) y luego duplica (9 × 2 = 18).",
      explanation: "90 ÷ 5 = 18 sacos. ¡Los corceles están fuertes y veloces!"
    }
  },
  {
    id: "div_m4",
    territoryId: "castillo_div",
    missionNumber: 4,
    roleTitle: "Gran Desafío del Cristal Amatista",
    title: "Misión 4: El Cáliz Sagrado del Rey",
    description: "Supera la prueba suprema de las divisiones para liberar el Cristal Amatista Real.",
    xpReward: 250,
    coinReward: 50,
    isCrystalMission: true,
    discoveryPhase: {
      title: "Divisiones Exactas y Pruebas Reales",
      story: "Para verificar si una división está bien hecha, multiplicamos el resultado por el divisor. ¡Debe darnos el número original!",
      visualType: "manipulative_div_check",
      itemEmoji: "💜",
      operator: "÷",
      equation: "72 ÷ 8 = 9",
      explanationSteps: [
        "72 dividido entre 8 da 9.",
        "Comprobación: 9 × 8 = 72.",
        "¡Cuando la multiplicación coincide, la respuesta es 100% segura!"
      ]
    },
    trainingExercises: [
      {
        id: "div_4_e1",
        type: "multiple_choice",
        question: "Encuentra el cociente:",
        equationText: "72 ÷ 8 = ?",
        correctAnswer: 9,
        options: [7, 8, 9, 10],
        hint: "¿8 × 9 da 72?",
        explanation: "72 ÷ 8 = 9. ¡Perfectamente comprobado!",
        visual: { emoji: "🔮", a: 72, b: 8 }
      },
      {
        id: "div_4_e2",
        type: "numpad",
        question: "Cálculo del Cáliz:",
        equationText: "81 ÷ 9 = ?",
        correctAnswer: 9,
        hint: "9 × 9 = 81.",
        explanation: "81 ÷ 9 = 9. ¡La tabla del 9 dominada por completo!",
        visual: { emoji: "🏆", a: 81, b: 9 }
      }
    ],
    challengePhase: {
      id: "div_4_ch",
      title: "El Despertar del Cristal Amatista",
      storyText: "El Gran Rey reparte 144 piedras mágicas entre los 12 guardianes del trono con absoluta igualdad. ¿Cuántas piedras recibe cada guardián?",
      question: "144 ÷ 12 = ?",
      correctAnswer: 12,
      options: [10, 11, 12, 14],
      hint: "¿Qué número multiplicado por sí mismo da 144? 12 × 12 = 144.",
      explanation: "144 ÷ 12 = 12 piedras. ¡El Cristal Amatista se eleva brillando con destellos violetas de pura justicia!"
    }
  },

  // ========================================================
  // TERRITORIO 5: TEMPLO DE LAS OPERACIONES COMBINADAS (4 Misiones)
  // ========================================================
  {
    id: "comb_m1",
    territoryId: "templo_operaciones",
    missionNumber: 1,
    roleTitle: "Aprendiz de la Armonía Cósmica",
    title: "Misión 1: La Regla del Orden Sagrado",
    description: "Descubre la jerarquía de las operaciones: multiplicaciones antes que sumas.",
    xpReward: 180,
    coinReward: 35,
    discoveryPhase: {
      title: "El Orden Sagrado de las Operaciones",
      story: "En el Templo Cósmico no resolvemos de izquierda a derecha sin pensar. ¡La multiplicación y la división tienen súper poderes y van PRIMERO!",
      visualType: "manipulative_comb_order",
      itemEmoji: "⚡",
      operator: "∑",
      equation: "2 + 3 × 4 = 14",
      explanationSteps: [
        "Mira esta expresión: 2 + 3 × 4",
        "¡Cuidado! No hagas 2 + 3 primero.",
        "Paso 1: Resolvemos primero la multiplicación: 3 × 4 = 12.",
        "Paso 2: Luego sumamos el 2: 2 + 12 = ¡14!"
      ]
    },
    trainingExercises: [
      {
        id: "comb_1_e1",
        type: "multiple_choice",
        question: "Recuerda: la multiplicación va primero.",
        equationText: "5 + 2 × 3 = ?",
        correctAnswer: 11,
        options: [11, 16, 21, 25],
        hint: "Primero calcula 2 × 3 = 6. Luego 5 + 6 = 11.",
        explanation: "5 + (2 × 3) = 5 + 6 = 11. ¡Excelente respeto del orden!",
        visual: { emoji: "✨", a: 5, b: 6 }
      },
      {
        id: "comb_1_e2",
        type: "multiple_choice",
        question: "Resta y multiplicación combinadas:",
        equationText: "20 - 3 × 4 = ?",
        correctAnswer: 8,
        options: [8, 12, 16, 68],
        hint: "Primero 3 × 4 = 12. Luego 20 - 12 = 8.",
        explanation: "20 - 12 = 8. ¡No caíste en la trampa!",
        visual: { emoji: "🌌", a: 20, b: 12 }
      },
      {
        id: "comb_1_e3",
        type: "numpad",
        question: "Cálculo del Templo:",
        equationText: "10 + 4 × 5 = ?",
        correctAnswer: 30,
        hint: "4 × 5 = 20. Luego 10 + 20 = 30.",
        explanation: "10 + 20 = 30. ¡Tu mente procesa las operaciones como un sabio!",
        visual: { emoji: "🔮", a: 10, b: 20 }
      }
    ],
    challengePhase: {
      id: "comb_1_ch",
      title: "La Poción del Alquimista",
      storyText: "En el caldero había 8 gotas de savia de luna. El mago agregó 4 frascos que contenían 5 gotas cada uno. ¿Cuántas gotas de savia hay ahora en el caldero?",
      question: "8 + (4 × 5) = ?",
      correctAnswer: 28,
      options: [24, 26, 28, 60],
      hint: "Primero multiplica los frascos: 4 × 5 = 20 gotas. Luego suma las 8 iniciales: 20 + 8 = 28.",
      explanation: "8 + 20 = 28 gotas mágicas. ¡La poción brilla con poder estelar!"
    }
  },
  {
    id: "comb_m2",
    territoryId: "templo_operaciones",
    missionNumber: 2,
    roleTitle: "Explorador de los Paréntesis",
    title: "Misión 2: El Escudo de los Paréntesis",
    description: "Aprende cómo los paréntesis ( ) tienen la máxima prioridad y mandan sobre todo.",
    xpReward: 200,
    coinReward: 40,
    discoveryPhase: {
      title: "El Poder Absoluto de los Paréntesis ( )",
      story: "Los paréntesis son como un escudo protector mágico. ¡Todo lo que esté dentro de un paréntesis SE RESUELVE ANTES QUE CUALQUIER OTRA COSA!",
      visualType: "manipulative_comb_parentheses",
      itemEmoji: "🛡️",
      operator: "()",
      equation: "(2 + 3) × 4 = 20",
      explanationSteps: [
        "Compara estas dos expresiones:",
        "Sin paréntesis: 2 + 3 × 4 = 14",
        "Con paréntesis: (2 + 3) × 4 -> Primero resolvemos (2 + 3) = 5.",
        "Luego 5 × 4 = ¡20! ¡Los paréntesis cambian el resultado por completo!"
      ]
    },
    trainingExercises: [
      {
        id: "comb_2_e1",
        type: "multiple_choice",
        question: "Resuelve primero lo que está entre paréntesis:",
        equationText: "(4 + 3) × 2 = ?",
        correctAnswer: 14,
        options: [10, 14, 16, 24],
        hint: "(4 + 3) = 7. Luego 7 × 2 = 14.",
        explanation: "(4 + 3) × 2 = 7 × 2 = 14. ¡Muy bien!",
        visual: { emoji: "🪐", a: 7, b: 2 }
      },
      {
        id: "comb_2_e2",
        type: "numpad",
        question: "Paréntesis con resta:",
        equationText: "5 × (10 - 6) = ?",
        correctAnswer: 20,
        hint: "(10 - 6) = 4. Luego 5 × 4 = 20.",
        explanation: "5 × 4 = 20. ¡Impecable!",
        visual: { emoji: "⚡", a: 5, b: 4 }
      },
      {
        id: "comb_2_e3",
        type: "multiple_choice",
        question: "División dentro de paréntesis:",
        equationText: "(24 ÷ 3) + 7 = ?",
        correctAnswer: 15,
        options: [12, 14, 15, 18],
        hint: "(24 ÷ 3) = 8. Luego 8 + 7 = 15.",
        explanation: "8 + 7 = 15. ¡Dominas todos los símbolos!",
        visual: { emoji: "💎", a: 8, b: 7 }
      }
    ],
    challengePhase: {
      id: "comb_2_ch",
      title: "Los Cofres de los Tres Guardianes",
      storyText: "Cada uno de los 3 guardianes recibió 15 monedas de oro, pero tuvo que pagar 4 monedas de peaje. ¿Cuántas monedas tienen en total entre los tres guardianes?",
      question: "3 × (15 - 4) = ?",
      correctAnswer: 33,
      options: [28, 33, 41, 45],
      hint: "Primero calcula cuánto le queda a cada uno: 15 - 4 = 11 monedas. Luego multiplica por los 3 guardianes: 3 × 11 = 33.",
      explanation: "3 × 11 = 33 monedas de oro. ¡Excelente aplicación práctica!"
    }
  },
  {
    id: "comb_m3",
    territoryId: "templo_operaciones",
    missionNumber: 3,
    roleTitle: "Guardián del Templo Sagrado",
    title: "Misión 3: El Laberinto de las Cuatro Fuerzas",
    description: "Combina sumas, restas, multiplicaciones y divisiones en expresiones de alta sabiduría.",
    xpReward: 220,
    coinReward: 45,
    discoveryPhase: {
      title: "La Pirámide de la Sabiduría",
      story: "Regla mística definitiva: 1º Paréntesis ( ), 2º Multiplicaciones × y Divisiones ÷, 3º Sumas + y Restas -.",
      visualType: "manipulative_comb_pyramid",
      itemEmoji: "🏛️",
      operator: "PEMDAS",
      equation: "15 + 10 ÷ 2 - 3 = 17",
      explanationSteps: [
        "Expresión: 15 + 10 ÷ 2 - 3",
        "Paso 1: Hacemos la división: 10 ÷ 2 = 5.",
        "Queda: 15 + 5 - 3.",
        "Paso 2: Sumamos y restamos de izquierda a derecha: 15 + 5 = 20, y 20 - 3 = ¡17!"
      ]
    },
    trainingExercises: [
      {
        id: "comb_3_e1",
        type: "multiple_choice",
        question: "Aplica los pasos en orden:",
        equationText: "12 + 8 ÷ 4 = ?",
        correctAnswer: 14,
        options: [5, 12, 14, 20],
        hint: "Primero la división: 8 ÷ 4 = 2. Luego 12 + 2 = 14.",
        explanation: "12 + 2 = 14. ¡Muy metódico!",
        visual: { emoji: "🌟", a: 12, b: 2 }
      },
      {
        id: "comb_3_e2",
        type: "numpad",
        question: "Resuelve con atención:",
        equationText: "30 - 2 × (5 + 3) = ?",
        correctAnswer: 14,
        hint: "1º Paréntesis: (5 + 3) = 8. 2º Multiplicación: 2 × 8 = 16. 3º Resta: 30 - 16 = 14.",
        explanation: "30 - 16 = 14. ¡Increíble habilidad de cálculo!",
        visual: { emoji: "🔮", a: 30, b: 16 }
      }
    ],
    challengePhase: {
      id: "comb_3_ch",
      title: "La Balanza del Cosmos",
      storyText: "Un explorador compra 3 paquetes de pergaminos a 6 gemas cada uno, y una poción que costaba 20 gemas pero tenía un descuento de 8 gemas. ¿Cuántas gemas gastó en total?",
      question: "(3 × 6) + (20 - 8) = ?",
      correctAnswer: 30,
      options: [26, 28, 30, 32],
      hint: "Pergaminos: 3 × 6 = 18. Poción: 20 - 8 = 12. Total: 18 + 12 = 30.",
      explanation: "18 + 12 = 30 gemas. ¡El mercader cósmico te hace una reverencia de respeto!"
    }
  },
  {
    id: "comb_m4",
    territoryId: "templo_operaciones",
    missionNumber: 4,
    roleTitle: "Gran Desafío del Cristal Diamante Supremo",
    title: "Misión 4: La Coronación del Archimago",
    description: "La prueba final de todo el reino: despierta el Cristal Diamante y restaura la armonía del universo numérico.",
    xpReward: 350,
    coinReward: 100,
    isCrystalMission: true,
    discoveryPhase: {
      title: "La Fusión de Todos los Cristales",
      story: "Has dominado el Bosque (+), el Desierto (-), el Planeta (×) y el Castillo (÷). Ahora todos los elementos danzan juntos en perfecta sincronía.",
      visualType: "manipulative_comb_master",
      itemEmoji: "👑",
      operator: "∞",
      equation: "50 - (4 × 5) + (18 ÷ 2) = 39",
      explanationSteps: [
        "Analicemos: 50 - (4 × 5) + (18 ÷ 2)",
        "Primer paréntesis: 4 × 5 = 20.",
        "Segundo paréntesis: 18 ÷ 2 = 9.",
        "Operación resultante: 50 - 20 + 9.",
        "50 - 20 = 30, y 30 + 9 = ¡39!"
      ]
    },
    trainingExercises: [
      {
        id: "comb_4_e1",
        type: "multiple_choice",
        question: "Prueba final de maestría:",
        equationText: "(6 × 4) + (35 ÷ 5) = ?",
        correctAnswer: 31,
        options: [28, 30, 31, 35],
        hint: "(6 × 4) = 24. (35 ÷ 5) = 7. 24 + 7 = 31.",
        explanation: "24 + 7 = 31. ¡Brillante como una supernova!",
        visual: { emoji: "💎", a: 24, b: 7 }
      },
      {
        id: "comb_4_e2",
        type: "numpad",
        question: "El sello del Archimago:",
        equationText: "100 - (8 × 7) = ?",
        correctAnswer: 44,
        hint: "8 × 7 = 56. Luego 100 - 56 = 44.",
        explanation: "100 - 56 = 44. ¡La cúspide del cálculo mental!",
        visual: { emoji: "👑", a: 100, b: 56 }
      }
    ],
    challengePhase: {
      id: "comb_4_ch",
      title: "El Despertar del Cristal Diamante Supremo",
      storyText: "En el centro del universo, los 4 altares aportan energía: 4 grupos de 15 rayos, más un haz concentrado de 50 rayos, menos un vórtice que absorbe 30 rayos. ¿Cuál es la energía total que corona al nuevo Archimago Matemático?",
      question: "(4 × 15) + 50 - 30 = ?",
      correctAnswer: 80,
      options: [70, 75, 80, 85],
      hint: "4 × 15 = 60. 60 + 50 = 110. 110 - 30 = 80.",
      explanation: "60 + 50 - 30 = 80 unidades de poder cósmico. ¡El Cristal Diamante resplandece con todos los colores del arcoíris y te corona como el Gran Archimago de Misión Matemática!"
    }
  }
];
