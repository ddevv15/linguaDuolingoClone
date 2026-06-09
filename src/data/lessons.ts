import type { Lesson } from "@/types/learning";

export const lessons: Lesson[] = [
  // ═══════════════════════════════════════════════════════════════════════
  // SPANISH — Unit: es-unit-1
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: "es-unit1-lesson1",
    unitId: "es-unit-1",
    title: "Greetings",
    description: "Say hello, goodbye, and introduce yourself.",
    order: 1,
    type: "vocabulary",
    xpReward: 10,
    estimatedMinutes: 5,
    goal: {
      description: "Learn 6 essential Spanish greetings.",
      targetWords: 6,
    },
    aiTeacher: {
      prompt:
        "This is the student's very first Spanish lesson, so make it warm and welcoming. Walk them through hola, adiós, buenos días, buenas noches, por favor, and gracias — one at a time, slowly, always with the English meaning — and drop each into a tiny everyday sentence before asking them to try saying it back.",
      voiceTone: "friendly",
      pace: "slow",
      focusWords: ["hola", "adiós", "buenos días", "buenas noches", "por favor", "gracias"],
    },
    activities: [
      {
        type: "vocabulary",
        items: [
          {
            word: "hola",
            translation: "hello",
            phonetic: "OH-lah",
            exampleSentence: "¡Hola! ¿Cómo estás?",
            exampleTranslation: "Hello! How are you?",
          },
          {
            word: "adiós",
            translation: "goodbye",
            phonetic: "ah-DYOHS",
            exampleSentence: "¡Adiós! Hasta mañana.",
            exampleTranslation: "Goodbye! See you tomorrow.",
          },
          {
            word: "buenos días",
            translation: "good morning",
            phonetic: "BWEH-nohs DEE-ahs",
            exampleSentence: "Buenos días, señor.",
            exampleTranslation: "Good morning, sir.",
          },
          {
            word: "buenas noches",
            translation: "good night",
            phonetic: "BWEH-nahs NOH-chehs",
            exampleSentence: "Buenas noches, amigos.",
            exampleTranslation: "Good night, friends.",
          },
          {
            word: "por favor",
            translation: "please",
            phonetic: "por fah-VOR",
            exampleSentence: "Un café, por favor.",
            exampleTranslation: "A coffee, please.",
          },
          {
            word: "gracias",
            translation: "thank you",
            phonetic: "GRAH-syahs",
            exampleSentence: "Muchas gracias.",
            exampleTranslation: "Thank you very much.",
          },
        ],
      },
      {
        type: "multiple-choice",
        questions: [
          {
            question: "What does 'hola' mean?",
            options: ["goodbye", "please", "hello", "thank you"],
            correctIndex: 2,
          },
          {
            question: "How do you say 'good morning' in Spanish?",
            options: ["buenas noches", "buenos días", "adiós", "gracias"],
            correctIndex: 1,
          },
        ],
      },
    ],
  },

  {
    id: "es-unit1-lesson2",
    unitId: "es-unit-1",
    title: "Numbers 1–10",
    description: "Count from one to ten in Spanish.",
    order: 2,
    type: "vocabulary",
    xpReward: 10,
    estimatedMinutes: 6,
    goal: {
      description: "Learn and pronounce numbers 1 through 10.",
      targetWords: 10,
    },
    aiTeacher: {
      prompt:
        "Be a patient counting buddy today. Walk the student through uno to diez one at a time — say each number slowly with its English meaning, use it to count something simple like fingers or steps, and cheer them on as they echo it back. Finish by counting from one to ten together.",
      voiceTone: "encouraging",
      pace: "slow",
      focusWords: ["uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve", "diez"],
    },
    activities: [
      {
        type: "vocabulary",
        items: [
          { word: "uno", translation: "one", phonetic: "OO-noh" },
          { word: "dos", translation: "two", phonetic: "dohs" },
          { word: "tres", translation: "three", phonetic: "trehs" },
          { word: "cuatro", translation: "four", phonetic: "KWAH-troh" },
          { word: "cinco", translation: "five", phonetic: "SEEN-koh" },
          { word: "seis", translation: "six", phonetic: "says" },
          { word: "siete", translation: "seven", phonetic: "SYEH-teh" },
          { word: "ocho", translation: "eight", phonetic: "OH-choh" },
          { word: "nueve", translation: "nine", phonetic: "NWEH-beh" },
          { word: "diez", translation: "ten", phonetic: "dyehs" },
        ],
      },
      {
        type: "fill-blank",
        questions: [
          {
            sentence: "Tengo ___ perros.",
            answer: "dos",
            options: ["uno", "dos", "cinco", "diez"],
            translation: "I have ___ dogs.",
          },
          {
            sentence: "___ más ___ son cinco.",
            answer: "dos",
            options: ["tres", "dos", "cuatro", "seis"],
            translation: "___ plus ___ equals five.",
          },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // FRENCH — Unit: fr-unit-1
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: "fr-unit1-lesson1",
    unitId: "fr-unit-1",
    title: "Bonjour!",
    description: "Master French greetings and polite expressions.",
    order: 1,
    type: "vocabulary",
    xpReward: 10,
    estimatedMinutes: 5,
    goal: {
      description: "Learn 6 core French greeting phrases.",
      targetPhrases: 6,
    },
    aiTeacher: {
      prompt:
        "Welcome the student into their very first French conversation. Bring them through bonjour, bonsoir, au revoir, merci, s'il vous plaît, and enchanté one at a time — slow and clear, with the English meaning and a quick word on when French speakers actually say it — and cheer on every attempt, wobbly or not.",
      voiceTone: "friendly",
      pace: "slow",
      focusWords: ["bonjour", "bonsoir", "au revoir", "merci", "s'il vous plaît", "enchanté"],
    },
    activities: [
      {
        type: "phrases",
        items: [
          {
            phrase: "Bonjour",
            translation: "Hello / Good morning",
            phonetic: "bohn-ZHOOR",
            context: "greeting",
          },
          {
            phrase: "Bonsoir",
            translation: "Good evening",
            phonetic: "bohn-SWAHR",
            context: "greeting",
          },
          {
            phrase: "Au revoir",
            translation: "Goodbye",
            phonetic: "oh ruh-VWAHR",
            context: "farewell",
          },
          {
            phrase: "Merci",
            translation: "Thank you",
            phonetic: "mehr-SEE",
            context: "politeness",
          },
          {
            phrase: "S'il vous plaît",
            translation: "Please",
            phonetic: "seel voo PLEH",
            context: "politeness",
          },
          {
            phrase: "Enchanté(e)",
            translation: "Nice to meet you",
            phonetic: "ahn-shahn-TAY",
            context: "introduction",
          },
        ],
      },
      {
        type: "multiple-choice",
        questions: [
          {
            question: "What does 'au revoir' mean?",
            options: ["hello", "please", "goodbye", "thank you"],
            correctIndex: 2,
          },
          {
            question: "Which phrase do you say when meeting someone for the first time?",
            options: ["bonsoir", "merci", "au revoir", "enchanté"],
            correctIndex: 3,
          },
        ],
      },
    ],
  },

  {
    id: "fr-unit1-lesson2",
    unitId: "fr-unit-1",
    title: "Les Couleurs",
    description: "Learn the most common colors in French.",
    order: 2,
    type: "vocabulary",
    xpReward: 10,
    estimatedMinutes: 6,
    goal: {
      description: "Name 8 colors in French.",
      targetWords: 8,
    },
    aiTeacher: {
      prompt:
        "Picture you and the student noticing colors on a sunny walk. Teach rouge, bleu, vert, jaune, blanc, noir, orange, and violet one at a time — the French word, slowly, with its English meaning and a quick sentence like 'Le ciel est bleu' — and ask them to spot something that color and name it back to you.",
      voiceTone: "friendly",
      pace: "normal",
      focusWords: ["rouge", "bleu", "vert", "jaune", "blanc", "noir", "orange", "violet"],
    },
    activities: [
      {
        type: "vocabulary",
        items: [
          { word: "rouge", translation: "red", phonetic: "roozh" },
          { word: "bleu", translation: "blue", phonetic: "bluh" },
          { word: "vert", translation: "green", phonetic: "vehr" },
          { word: "jaune", translation: "yellow", phonetic: "zhohn" },
          { word: "blanc", translation: "white", phonetic: "blahn" },
          { word: "noir", translation: "black", phonetic: "nwahr" },
          { word: "orange", translation: "orange", phonetic: "oh-RAHNZH" },
          { word: "violet", translation: "purple", phonetic: "vyoh-LEH" },
        ],
      },
      {
        type: "fill-blank",
        questions: [
          {
            sentence: "Le ciel est ___.",
            answer: "bleu",
            options: ["rouge", "bleu", "noir", "vert"],
            translation: "The sky is ___.",
          },
          {
            sentence: "La pomme est ___.",
            answer: "rouge",
            options: ["jaune", "blanc", "rouge", "violet"],
            translation: "The apple is ___.",
          },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // JAPANESE — Unit: ja-unit-1
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: "ja-unit1-lesson1",
    unitId: "ja-unit-1",
    title: "Hiragana Basics",
    description: "Learn the five core hiragana vowel characters.",
    order: 1,
    type: "vocabulary",
    xpReward: 15,
    estimatedMinutes: 7,
    goal: {
      description: "Recognize and pronounce the 5 hiragana vowels.",
      targetWords: 5,
    },
    aiTeacher: {
      prompt:
        "This is the student's first taste of written Japanese, so keep it calm and steady. Bring them through あ, い, う, え, and お one at a time — say the sound slowly, give its romaji and English meaning, and share a simple word that starts with it — repeating each one before moving on.",
      voiceTone: "professional",
      pace: "slow",
      focusWords: ["あ", "い", "う", "え", "お"],
    },
    activities: [
      {
        type: "vocabulary",
        items: [
          {
            word: "あ",
            translation: "a",
            phonetic: "ah",
            exampleSentence: "あおい (aoi)",
            exampleTranslation: "blue",
          },
          {
            word: "い",
            translation: "i",
            phonetic: "ee",
            exampleSentence: "いぬ (inu)",
            exampleTranslation: "dog",
          },
          {
            word: "う",
            translation: "u",
            phonetic: "oo (short)",
            exampleSentence: "うみ (umi)",
            exampleTranslation: "ocean",
          },
          {
            word: "え",
            translation: "e",
            phonetic: "eh",
            exampleSentence: "えき (eki)",
            exampleTranslation: "train station",
          },
          {
            word: "お",
            translation: "o",
            phonetic: "oh",
            exampleSentence: "おかあさん (okaasan)",
            exampleTranslation: "mother",
          },
        ],
      },
      {
        type: "multiple-choice",
        questions: [
          {
            question: "Which hiragana character makes the 'ee' sound?",
            options: ["あ", "う", "い", "お"],
            correctIndex: 2,
          },
          {
            question: "What does 'いぬ' mean?",
            options: ["ocean", "dog", "mother", "blue"],
            correctIndex: 1,
          },
        ],
      },
    ],
  },

  {
    id: "ja-unit1-lesson2",
    unitId: "ja-unit-1",
    title: "Japanese Greetings",
    description: "Essential phrases for daily Japanese conversation.",
    order: 2,
    type: "phrases",
    xpReward: 10,
    estimatedMinutes: 5,
    goal: {
      description: "Learn 6 common Japanese greetings.",
      targetPhrases: 6,
    },
    aiTeacher: {
      prompt:
        "Show the student how to greet people at any time of day in Japan. Teach おはようございます, こんにちは, こんばんは, さようなら, ありがとう, and すみません one at a time — slowly, with the English meaning — and explain in a sentence or two exactly when someone would say it.",
      voiceTone: "friendly",
      pace: "slow",
      focusWords: ["おはようございます", "こんにちは", "こんばんは", "さようなら", "ありがとう", "すみません"],
    },
    activities: [
      {
        type: "phrases",
        items: [
          {
            phrase: "おはようございます",
            translation: "Good morning",
            phonetic: "o-ha-YO go-ZAI-mas",
            context: "greeting (morning)",
          },
          {
            phrase: "こんにちは",
            translation: "Hello / Good afternoon",
            phonetic: "kon-NICHI-wa",
            context: "greeting (daytime)",
          },
          {
            phrase: "こんばんは",
            translation: "Good evening",
            phonetic: "kon-BAN-wa",
            context: "greeting (evening)",
          },
          {
            phrase: "さようなら",
            translation: "Goodbye",
            phonetic: "sa-YO-na-ra",
            context: "farewell",
          },
          {
            phrase: "ありがとう",
            translation: "Thank you",
            phonetic: "a-ri-GA-to",
            context: "gratitude",
          },
          {
            phrase: "すみません",
            translation: "Excuse me / I'm sorry",
            phonetic: "su-mi-MA-sen",
            context: "apology / getting attention",
          },
        ],
      },
      {
        type: "multiple-choice",
        questions: [
          {
            question: "Which phrase do you use to say 'good morning' in Japanese?",
            options: ["こんにちは", "さようなら", "おはようございます", "こんばんは"],
            correctIndex: 2,
          },
          {
            question: "What does 'すみません' mean?",
            options: ["thank you", "good evening", "goodbye", "excuse me"],
            correctIndex: 3,
          },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // SPANISH — Unit: es-unit-1  (lessons 3–6)
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: "es-unit1-lesson3",
    unitId: "es-unit-1",
    title: "Common Phrases",
    description: "Everyday expressions for real conversations.",
    order: 3,
    type: "phrases",
    xpReward: 10,
    estimatedMinutes: 5,
    goal: { description: "Use 6 essential conversational phrases.", targetPhrases: 6 },
    aiTeacher: {
      prompt:
        "Help the student get ready for their first real conversation in Spanish. Teach ¿Cómo estás?, Muy bien, No entiendo, Habla más despacio, ¿Dónde está?, and Me llamo one at a time, slowly with the English meaning, and a quick everyday moment when they'd reach for it.",
      voiceTone: "friendly",
      pace: "slow",
      focusWords: ["¿Cómo estás?", "Muy bien", "No entiendo", "Habla más despacio", "¿Dónde está?", "Me llamo"],
    },
    activities: [
      {
        type: "phrases",
        items: [
          { phrase: "¿Cómo estás?", translation: "How are you?", phonetic: "KOH-moh ess-TAHS", context: "greeting" },
          { phrase: "Muy bien", translation: "Very well", phonetic: "mwee BYEHN", context: "response" },
          { phrase: "No entiendo", translation: "I don't understand", phonetic: "noh ehn-TYEHN-doh", context: "clarification" },
          { phrase: "Habla más despacio", translation: "Speak more slowly", phonetic: "AH-blah mahs dess-PAH-syoh", context: "clarification" },
          { phrase: "¿Dónde está?", translation: "Where is it?", phonetic: "DOHN-deh ess-TAH", context: "directions" },
          { phrase: "Me llamo", translation: "My name is", phonetic: "meh YAH-moh", context: "introduction" },
        ],
      },
      {
        type: "multiple-choice",
        questions: [
          { question: "How do you say 'I don't understand' in Spanish?", options: ["Muy bien", "Me llamo", "No entiendo", "¿Dónde está?"], correctIndex: 2 },
          { question: "What does '¿Cómo estás?' mean?", options: ["Where is it?", "How are you?", "My name is", "Speak slowly"], correctIndex: 1 },
        ],
      },
    ],
  },

  {
    id: "es-unit1-lesson4",
    unitId: "es-unit-1",
    title: "Colors / Colores",
    description: "Name the most common colors in Spanish.",
    order: 4,
    type: "vocabulary",
    xpReward: 10,
    estimatedMinutes: 5,
    goal: { description: "Learn 8 colors in Spanish.", targetWords: 8 },
    aiTeacher: {
      prompt:
        "You and the student are noticing colorful things together. Teach rojo, azul, verde, amarillo, blanco, negro, naranja, and morado one at a time — slowly, with the English meaning and a short everyday sentence — and ask them to repeat each one back before moving on.",
      voiceTone: "friendly",
      pace: "normal",
      focusWords: ["rojo", "azul", "verde", "amarillo", "blanco", "negro", "naranja", "morado"],
    },
    activities: [
      {
        type: "vocabulary",
        items: [
          { word: "rojo", translation: "red", phonetic: "ROH-hoh" },
          { word: "azul", translation: "blue", phonetic: "ah-SOOL" },
          { word: "verde", translation: "green", phonetic: "BEHR-deh" },
          { word: "amarillo", translation: "yellow", phonetic: "ah-mah-REE-yoh" },
          { word: "blanco", translation: "white", phonetic: "BLAHN-koh" },
          { word: "negro", translation: "black", phonetic: "NEH-groh" },
          { word: "naranja", translation: "orange", phonetic: "nah-RAHN-hah" },
          { word: "morado", translation: "purple", phonetic: "moh-RAH-doh" },
        ],
      },
      {
        type: "multiple-choice",
        questions: [
          { question: "What color is 'azul'?", options: ["red", "green", "blue", "yellow"], correctIndex: 2 },
          { question: "How do you say 'black' in Spanish?", options: ["blanco", "negro", "rojo", "verde"], correctIndex: 1 },
        ],
      },
    ],
  },

  {
    id: "es-unit1-lesson5",
    unitId: "es-unit-1",
    title: "Days of the Week",
    description: "Learn the seven days in Spanish.",
    order: 5,
    type: "vocabulary",
    xpReward: 10,
    estimatedMinutes: 6,
    goal: { description: "Name all 7 days of the week.", targetWords: 7 },
    aiTeacher: {
      prompt:
        "You're planning out a week together. Teach lunes through domingo one at a time, slowly with the English meaning, weaving each into a tiny sentence about plans — and gently mention that the Spanish week starts on Monday, not Sunday, so it doesn't trip them up later.",
      voiceTone: "encouraging",
      pace: "normal",
      focusWords: ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"],
    },
    activities: [
      {
        type: "vocabulary",
        items: [
          { word: "lunes", translation: "Monday", phonetic: "LOO-nehs" },
          { word: "martes", translation: "Tuesday", phonetic: "MAR-tehs" },
          { word: "miércoles", translation: "Wednesday", phonetic: "MYEHR-koh-lehs" },
          { word: "jueves", translation: "Thursday", phonetic: "HWEH-behs" },
          { word: "viernes", translation: "Friday", phonetic: "BYEHR-nehs" },
          { word: "sábado", translation: "Saturday", phonetic: "SAH-bah-doh" },
          { word: "domingo", translation: "Sunday", phonetic: "doh-MEEN-goh" },
        ],
      },
      {
        type: "multiple-choice",
        questions: [
          { question: "Which day comes after 'jueves'?", options: ["miércoles", "lunes", "viernes", "sábado"], correctIndex: 2 },
          { question: "What does 'domingo' mean?", options: ["Saturday", "Monday", "Friday", "Sunday"], correctIndex: 3 },
        ],
      },
    ],
  },

  {
    id: "es-unit1-lesson6",
    unitId: "es-unit-1",
    title: "Food & Drinks",
    description: "Order food and drinks with confidence.",
    order: 6,
    type: "vocabulary",
    xpReward: 15,
    estimatedMinutes: 7,
    goal: { description: "Learn 6 food and drink words.", targetWords: 6 },
    aiTeacher: {
      prompt:
        "Picture the two of you at a cozy café. Teach café, agua, pan, leche, fruta, and carne one at a time — slowly, with the English meaning and a short, real sentence you'd actually use ordering — and have the student practice saying each one like they're placing the order themselves.",
      voiceTone: "friendly",
      pace: "normal",
      focusWords: ["café", "agua", "pan", "leche", "fruta", "carne"],
    },
    activities: [
      {
        type: "vocabulary",
        items: [
          { word: "café", translation: "coffee", phonetic: "kah-FEH", exampleSentence: "Un café, por favor.", exampleTranslation: "A coffee, please." },
          { word: "agua", translation: "water", phonetic: "AH-gwah", exampleSentence: "Quiero agua.", exampleTranslation: "I want water." },
          { word: "pan", translation: "bread", phonetic: "pahn", exampleSentence: "El pan está fresco.", exampleTranslation: "The bread is fresh." },
          { word: "leche", translation: "milk", phonetic: "LEH-cheh", exampleSentence: "Leche fría, por favor.", exampleTranslation: "Cold milk, please." },
          { word: "fruta", translation: "fruit", phonetic: "FROO-tah", exampleSentence: "Me gusta la fruta.", exampleTranslation: "I like fruit." },
          { word: "carne", translation: "meat", phonetic: "KAR-neh", exampleSentence: "La carne está rica.", exampleTranslation: "The meat is delicious." },
        ],
      },
      {
        type: "multiple-choice",
        questions: [
          { question: "What does 'agua' mean?", options: ["coffee", "bread", "water", "milk"], correctIndex: 2 },
          { question: "How do you say 'bread' in Spanish?", options: ["fruta", "carne", "café", "pan"], correctIndex: 3 },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // FRENCH — Unit: fr-unit-1  (lessons 3–6)
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: "fr-unit1-lesson3",
    unitId: "fr-unit-1",
    title: "Les Chiffres 1–10",
    description: "Count from one to ten in French.",
    order: 3,
    type: "vocabulary",
    xpReward: 10,
    estimatedMinutes: 5,
    goal: { description: "Learn numbers 1 through 10 in French.", targetWords: 10 },
    aiTeacher: {
      prompt:
        "Count things together with the student, French-style. Teach un through dix one at a time, slowly with the English meaning, dropping each into a quick everyday sentence — then count from one to ten together to finish strong.",
      voiceTone: "professional",
      pace: "slow",
      focusWords: ["un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix"],
    },
    activities: [
      {
        type: "vocabulary",
        items: [
          { word: "un", translation: "one", phonetic: "uhn" },
          { word: "deux", translation: "two", phonetic: "duh" },
          { word: "trois", translation: "three", phonetic: "twah" },
          { word: "quatre", translation: "four", phonetic: "KAT-ruh" },
          { word: "cinq", translation: "five", phonetic: "sank" },
          { word: "six", translation: "six", phonetic: "seese" },
          { word: "sept", translation: "seven", phonetic: "set" },
          { word: "huit", translation: "eight", phonetic: "weet" },
          { word: "neuf", translation: "nine", phonetic: "nuhf" },
          { word: "dix", translation: "ten", phonetic: "deese" },
        ],
      },
      {
        type: "multiple-choice",
        questions: [
          { question: "What is 'cinq' in English?", options: ["three", "five", "seven", "nine"], correctIndex: 1 },
          { question: "How do you say 'eight' in French?", options: ["sept", "neuf", "huit", "dix"], correctIndex: 2 },
        ],
      },
    ],
  },

  {
    id: "fr-unit1-lesson4",
    unitId: "fr-unit-1",
    title: "La Famille",
    description: "Talk about your family members in French.",
    order: 4,
    type: "vocabulary",
    xpReward: 10,
    estimatedMinutes: 5,
    goal: { description: "Learn 6 family member words.", targetWords: 6 },
    aiTeacher: {
      prompt:
        "You're getting to know each other's families. Teach père, mère, frère, sœur, fils, and fille one at a time — slowly with the English meaning — and weave each into a warm little sentence like 'Mon père s'appelle Paul,' then invite the student to try one about their own family.",
      voiceTone: "friendly",
      pace: "normal",
      focusWords: ["père", "mère", "frère", "sœur", "fils", "fille"],
    },
    activities: [
      {
        type: "vocabulary",
        items: [
          { word: "père", translation: "father", phonetic: "pehr", exampleSentence: "Mon père est médecin.", exampleTranslation: "My father is a doctor." },
          { word: "mère", translation: "mother", phonetic: "mehr", exampleSentence: "Ma mère est gentille.", exampleTranslation: "My mother is kind." },
          { word: "frère", translation: "brother", phonetic: "frehr", exampleSentence: "J'ai un frère.", exampleTranslation: "I have a brother." },
          { word: "sœur", translation: "sister", phonetic: "suhr", exampleSentence: "Ma sœur est grande.", exampleTranslation: "My sister is tall." },
          { word: "fils", translation: "son", phonetic: "fees" },
          { word: "fille", translation: "daughter", phonetic: "fee-yuh" },
        ],
      },
      {
        type: "multiple-choice",
        questions: [
          { question: "What does 'mère' mean?", options: ["father", "sister", "mother", "daughter"], correctIndex: 2 },
          { question: "How do you say 'brother' in French?", options: ["fils", "père", "frère", "sœur"], correctIndex: 2 },
        ],
      },
    ],
  },

  {
    id: "fr-unit1-lesson5",
    unitId: "fr-unit-1",
    title: "La Nourriture",
    description: "Essential food and drink vocabulary.",
    order: 5,
    type: "vocabulary",
    xpReward: 10,
    estimatedMinutes: 6,
    goal: { description: "Name 6 common foods and drinks.", targetWords: 6 },
    aiTeacher: {
      prompt:
        "You two are chatting about French food like old friends at a bistro. Teach eau, pain, fromage, café, vin, and poulet one at a time — slowly with the English meaning, a short everyday sentence, and a fun bite of food culture — and ask the student to say each word back to you.",
      voiceTone: "friendly",
      pace: "normal",
      focusWords: ["eau", "pain", "fromage", "café", "vin", "poulet"],
    },
    activities: [
      {
        type: "vocabulary",
        items: [
          { word: "eau", translation: "water", phonetic: "oh", exampleSentence: "Je voudrais de l'eau.", exampleTranslation: "I would like some water." },
          { word: "pain", translation: "bread", phonetic: "pan", exampleSentence: "Le pain est chaud.", exampleTranslation: "The bread is warm." },
          { word: "fromage", translation: "cheese", phonetic: "froh-MAHZH" },
          { word: "café", translation: "coffee", phonetic: "kah-FAY" },
          { word: "vin", translation: "wine", phonetic: "van" },
          { word: "poulet", translation: "chicken", phonetic: "poo-LEH" },
        ],
      },
      {
        type: "multiple-choice",
        questions: [
          { question: "What does 'fromage' mean?", options: ["bread", "cheese", "wine", "chicken"], correctIndex: 1 },
          { question: "How do you say 'water' in French?", options: ["café", "vin", "eau", "pain"], correctIndex: 2 },
        ],
      },
    ],
  },

  {
    id: "fr-unit1-lesson6",
    unitId: "fr-unit-1",
    title: "Les Jours de la Semaine",
    description: "The seven days of the week in French.",
    order: 6,
    type: "vocabulary",
    xpReward: 15,
    estimatedMinutes: 6,
    goal: { description: "Name all 7 days of the week in French.", targetWords: 7 },
    aiTeacher: {
      prompt:
        "Map out the week together in French. Teach lundi through dimanche one at a time, slowly with the English meaning, in a short sentence like 'Lundi je travaille' — and gently mention that French days aren't capitalized, then ask the student to try a day of their own.",
      voiceTone: "professional",
      pace: "normal",
      focusWords: ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"],
    },
    activities: [
      {
        type: "vocabulary",
        items: [
          { word: "lundi", translation: "Monday", phonetic: "luhn-DEE" },
          { word: "mardi", translation: "Tuesday", phonetic: "mar-DEE" },
          { word: "mercredi", translation: "Wednesday", phonetic: "mehr-kruh-DEE" },
          { word: "jeudi", translation: "Thursday", phonetic: "zhuh-DEE" },
          { word: "vendredi", translation: "Friday", phonetic: "vahn-druh-DEE" },
          { word: "samedi", translation: "Saturday", phonetic: "sam-DEE" },
          { word: "dimanche", translation: "Sunday", phonetic: "dee-MAHNSH" },
        ],
      },
      {
        type: "multiple-choice",
        questions: [
          { question: "What does 'vendredi' mean?", options: ["Monday", "Wednesday", "Friday", "Sunday"], correctIndex: 2 },
          { question: "Which day is 'dimanche'?", options: ["Saturday", "Sunday", "Thursday", "Tuesday"], correctIndex: 1 },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // JAPANESE — Unit: ja-unit-1  (lessons 3–6)
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: "ja-unit1-lesson3",
    unitId: "ja-unit-1",
    title: "数字 (Numbers)",
    description: "Count from one to ten in Japanese.",
    order: 3,
    type: "vocabulary",
    xpReward: 15,
    estimatedMinutes: 6,
    goal: { description: "Learn numbers 1–10 in Japanese.", targetWords: 10 },
    aiTeacher: {
      prompt:
        "Count together in Japanese, one number at a time. Teach いち through じゅう slowly — the word, its romaji, and its English meaning — using each in a short counting sentence, and repeat each one before moving to the next.",
      voiceTone: "professional",
      pace: "slow",
      focusWords: ["いち", "に", "さん", "し", "ご", "ろく", "なな", "はち", "きゅう", "じゅう"],
    },
    activities: [
      {
        type: "vocabulary",
        items: [
          { word: "いち", translation: "one", phonetic: "i-chi" },
          { word: "に", translation: "two", phonetic: "ni" },
          { word: "さん", translation: "three", phonetic: "san" },
          { word: "し", translation: "four", phonetic: "shi" },
          { word: "ご", translation: "five", phonetic: "go" },
          { word: "ろく", translation: "six", phonetic: "ro-ku" },
          { word: "なな", translation: "seven", phonetic: "na-na" },
          { word: "はち", translation: "eight", phonetic: "ha-chi" },
          { word: "きゅう", translation: "nine", phonetic: "kyu" },
          { word: "じゅう", translation: "ten", phonetic: "juu" },
        ],
      },
      {
        type: "multiple-choice",
        questions: [
          { question: "Which number is 'ご'?", options: ["three", "five", "seven", "nine"], correctIndex: 1 },
          { question: "How do you say 'eight' in Japanese?", options: ["なな", "はち", "きゅう", "じゅう"], correctIndex: 1 },
        ],
      },
    ],
  },

  {
    id: "ja-unit1-lesson4",
    unitId: "ja-unit-1",
    title: "曜日 (Days of the Week)",
    description: "Learn the seven days of the week in Japanese.",
    order: 4,
    type: "vocabulary",
    xpReward: 10,
    estimatedMinutes: 6,
    goal: { description: "Name all 7 days of the week in Japanese.", targetWords: 7 },
    aiTeacher: {
      prompt:
        "Walk the student through a week in Japan. Teach the seven days one at a time, slowly with the English meaning, and share the fun fact that each one is named after an element — moon, fire, water, wood, metal, earth, sun. Ask the student to echo each day back before moving on.",
      voiceTone: "professional",
      pace: "slow",
      focusWords: ["月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日", "日曜日"],
    },
    activities: [
      {
        type: "vocabulary",
        items: [
          { word: "月曜日", translation: "Monday", phonetic: "ge-tsu-you-bi", exampleSentence: "月曜日に学校があります。", exampleTranslation: "There is school on Monday." },
          { word: "火曜日", translation: "Tuesday", phonetic: "ka-you-bi" },
          { word: "水曜日", translation: "Wednesday", phonetic: "sui-you-bi" },
          { word: "木曜日", translation: "Thursday", phonetic: "mo-ku-you-bi" },
          { word: "金曜日", translation: "Friday", phonetic: "kin-you-bi" },
          { word: "土曜日", translation: "Saturday", phonetic: "do-you-bi" },
          { word: "日曜日", translation: "Sunday", phonetic: "ni-chi-you-bi" },
        ],
      },
      {
        type: "multiple-choice",
        questions: [
          { question: "What does '金曜日' mean?", options: ["Monday", "Wednesday", "Friday", "Sunday"], correctIndex: 2 },
          { question: "Which day is '日曜日'?", options: ["Saturday", "Sunday", "Monday", "Tuesday"], correctIndex: 1 },
        ],
      },
    ],
  },

  {
    id: "ja-unit1-lesson5",
    unitId: "ja-unit-1",
    title: "色 (Colors)",
    description: "Describe colors in Japanese.",
    order: 5,
    type: "vocabulary",
    xpReward: 10,
    estimatedMinutes: 5,
    goal: { description: "Learn 6 color words in Japanese.", targetWords: 6 },
    aiTeacher: {
      prompt:
        "Notice colors around you together. Teach 赤, 青, 緑, 黄色, 白, and 黒 one at a time — slowly with the English meaning and a tiny example like 青い空 (blue sky) — and gently mention that Japanese color words often end in い. Have the student repeat each one back.",
      voiceTone: "friendly",
      pace: "normal",
      focusWords: ["赤", "青", "緑", "黄色", "白", "黒"],
    },
    activities: [
      {
        type: "vocabulary",
        items: [
          { word: "赤", translation: "red", phonetic: "a-ka", exampleSentence: "赤いりんご", exampleTranslation: "red apple" },
          { word: "青", translation: "blue", phonetic: "a-o", exampleSentence: "青い空", exampleTranslation: "blue sky" },
          { word: "緑", translation: "green", phonetic: "mi-do-ri" },
          { word: "黄色", translation: "yellow", phonetic: "ki-i-ro" },
          { word: "白", translation: "white", phonetic: "shi-ro" },
          { word: "黒", translation: "black", phonetic: "ku-ro" },
        ],
      },
      {
        type: "multiple-choice",
        questions: [
          { question: "What color is '青'?", options: ["red", "green", "yellow", "blue"], correctIndex: 3 },
          { question: "How do you say 'white' in Japanese?", options: ["黒", "白", "赤", "緑"], correctIndex: 1 },
        ],
      },
    ],
  },

  {
    id: "ja-unit1-lesson6",
    unitId: "ja-unit-1",
    title: "家族 (Family)",
    description: "Talk about your family in Japanese.",
    order: 6,
    type: "vocabulary",
    xpReward: 15,
    estimatedMinutes: 7,
    goal: { description: "Learn 6 family member words.", targetWords: 6 },
    aiTeacher: {
      prompt:
        "You're getting to know each other's families. Teach おかあさん, おとうさん, おにいさん, おねえさん, おとうと, and いもうと one at a time, slowly with the English meaning, gently noting that Japanese has separate words for older and younger siblings — and ask the student to try one in a simple sentence.",
      voiceTone: "professional",
      pace: "slow",
      focusWords: ["おかあさん", "おとうさん", "おにいさん", "おねえさん", "おとうと", "いもうと"],
    },
    activities: [
      {
        type: "vocabulary",
        items: [
          { word: "おかあさん", translation: "mother", phonetic: "o-ka-a-san" },
          { word: "おとうさん", translation: "father", phonetic: "o-to-u-san" },
          { word: "おにいさん", translation: "older brother", phonetic: "o-ni-i-san" },
          { word: "おねえさん", translation: "older sister", phonetic: "o-ne-e-san" },
          { word: "おとうと", translation: "younger brother", phonetic: "o-to-u-to" },
          { word: "いもうと", translation: "younger sister", phonetic: "i-mo-u-to" },
        ],
      },
      {
        type: "multiple-choice",
        questions: [
          { question: "What does 'おにいさん' mean?", options: ["younger brother", "older sister", "older brother", "father"], correctIndex: 2 },
          { question: "How do you say 'mother' in Japanese?", options: ["おとうさん", "おかあさん", "おねえさん", "いもうと"], correctIndex: 1 },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // KOREAN — Unit: ko-unit-1
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: "ko-unit1-lesson1",
    unitId: "ko-unit-1",
    title: "인사말 (Greetings)",
    description: "Essential Korean greetings and polite expressions.",
    order: 1,
    type: "phrases",
    xpReward: 10,
    estimatedMinutes: 5,
    goal: { description: "Learn 6 essential Korean greetings.", targetPhrases: 6 },
    aiTeacher: {
      prompt:
        "Show the student how Koreans greet each other warmly and politely. Teach 안녕하세요, 안녕히 가세요, 감사합니다, 죄송합니다, 반갑습니다, and 잘 있어요 one at a time — nice and slow, with the English meaning and a quick word on when to use the polite form — and ask the student to say each one back.",
      voiceTone: "friendly",
      pace: "slow",
      focusWords: ["안녕하세요", "안녕히 가세요", "감사합니다", "죄송합니다", "반갑습니다", "잘 있어요"],
    },
    activities: [
      {
        type: "phrases",
        items: [
          { phrase: "안녕하세요", translation: "Hello / Good day", phonetic: "an-nyeong-ha-se-yo", context: "greeting" },
          { phrase: "안녕히 가세요", translation: "Goodbye (to someone leaving)", phonetic: "an-nyeong-hi ga-se-yo", context: "farewell" },
          { phrase: "감사합니다", translation: "Thank you", phonetic: "gam-sa-ham-ni-da", context: "gratitude" },
          { phrase: "죄송합니다", translation: "I'm sorry", phonetic: "joe-song-ham-ni-da", context: "apology" },
          { phrase: "반갑습니다", translation: "Nice to meet you", phonetic: "ban-gap-seum-ni-da", context: "introduction" },
          { phrase: "잘 있어요", translation: "I'm well / Take care", phonetic: "jal is-seo-yo", context: "farewell" },
        ],
      },
      {
        type: "multiple-choice",
        questions: [
          { question: "What does '감사합니다' mean?", options: ["I'm sorry", "Goodbye", "Thank you", "Nice to meet you"], correctIndex: 2 },
          { question: "Which phrase means 'Hello' in Korean?", options: ["죄송합니다", "안녕하세요", "반갑습니다", "잘 있어요"], correctIndex: 1 },
        ],
      },
    ],
  },

  {
    id: "ko-unit1-lesson2",
    unitId: "ko-unit-1",
    title: "숫자 (Numbers)",
    description: "Count from one to ten in Korean.",
    order: 2,
    type: "vocabulary",
    xpReward: 10,
    estimatedMinutes: 5,
    goal: { description: "Learn Sino-Korean numbers 1–10.", targetWords: 10 },
    aiTeacher: {
      prompt:
        "Count together using Sino-Korean numbers. Teach 일 through 십 one at a time — slowly, with the romanization and English meaning, and a short counting sentence — and gently mention that Korean actually has two number systems, with this being one of them.",
      voiceTone: "professional",
      pace: "slow",
      focusWords: ["일", "이", "삼", "사", "오", "육", "칠", "팔", "구", "십"],
    },
    activities: [
      {
        type: "vocabulary",
        items: [
          { word: "일", translation: "one", phonetic: "il" },
          { word: "이", translation: "two", phonetic: "i" },
          { word: "삼", translation: "three", phonetic: "sam" },
          { word: "사", translation: "four", phonetic: "sa" },
          { word: "오", translation: "five", phonetic: "o" },
          { word: "육", translation: "six", phonetic: "yuk" },
          { word: "칠", translation: "seven", phonetic: "chil" },
          { word: "팔", translation: "eight", phonetic: "pal" },
          { word: "구", translation: "nine", phonetic: "gu" },
          { word: "십", translation: "ten", phonetic: "sip" },
        ],
      },
      {
        type: "multiple-choice",
        questions: [
          { question: "What is '오' in English?", options: ["three", "five", "seven", "nine"], correctIndex: 1 },
          { question: "How do you say 'eight' in Korean?", options: ["칠", "팔", "구", "십"], correctIndex: 1 },
        ],
      },
    ],
  },

  {
    id: "ko-unit1-lesson3",
    unitId: "ko-unit-1",
    title: "색깔 (Colors)",
    description: "Describe colors in Korean.",
    order: 3,
    type: "vocabulary",
    xpReward: 10,
    estimatedMinutes: 5,
    goal: { description: "Learn 6 color words in Korean.", targetWords: 6 },
    aiTeacher: {
      prompt:
        "Point out colorful things together. Teach 빨간색, 파란색, 초록색, 노란색, 흰색, and 검은색 one at a time — slowly with the English meaning, noting that they all end in 색 ('color') — and ask the student to use one in their own simple sentence.",
      voiceTone: "friendly",
      pace: "normal",
      focusWords: ["빨간색", "파란색", "초록색", "노란색", "흰색", "검은색"],
    },
    activities: [
      {
        type: "vocabulary",
        items: [
          { word: "빨간색", translation: "red", phonetic: "ppal-gan-saek" },
          { word: "파란색", translation: "blue", phonetic: "pa-ran-saek" },
          { word: "초록색", translation: "green", phonetic: "cho-rok-saek" },
          { word: "노란색", translation: "yellow", phonetic: "no-ran-saek" },
          { word: "흰색", translation: "white", phonetic: "huin-saek" },
          { word: "검은색", translation: "black", phonetic: "geo-meun-saek" },
        ],
      },
      {
        type: "multiple-choice",
        questions: [
          { question: "What color is '파란색'?", options: ["red", "green", "yellow", "blue"], correctIndex: 3 },
          { question: "How do you say 'white' in Korean?", options: ["검은색", "흰색", "빨간색", "초록색"], correctIndex: 1 },
        ],
      },
    ],
  },

  {
    id: "ko-unit1-lesson4",
    unitId: "ko-unit-1",
    title: "가족 (Family)",
    description: "Talk about your family members in Korean.",
    order: 4,
    type: "vocabulary",
    xpReward: 10,
    estimatedMinutes: 5,
    goal: { description: "Learn 6 family member words.", targetWords: 6 },
    aiTeacher: {
      prompt:
        "Chat about family together. Teach 어머니, 아버지, 오빠, 언니, 동생, and 할머니 one at a time, slowly with the English meaning, gently explaining that Korean family words can change depending on who's speaking — keep it warm and simple for a beginner.",
      voiceTone: "friendly",
      pace: "slow",
      focusWords: ["어머니", "아버지", "오빠", "언니", "동생", "할머니"],
    },
    activities: [
      {
        type: "vocabulary",
        items: [
          { word: "어머니", translation: "mother", phonetic: "eo-meo-ni" },
          { word: "아버지", translation: "father", phonetic: "a-beo-ji" },
          { word: "오빠", translation: "older brother (female speaker)", phonetic: "op-pa" },
          { word: "언니", translation: "older sister (female speaker)", phonetic: "eon-ni" },
          { word: "동생", translation: "younger sibling", phonetic: "dong-saeng" },
          { word: "할머니", translation: "grandmother", phonetic: "hal-meo-ni" },
        ],
      },
      {
        type: "multiple-choice",
        questions: [
          { question: "What does '아버지' mean?", options: ["mother", "father", "grandmother", "sibling"], correctIndex: 1 },
          { question: "Which word means 'younger sibling'?", options: ["오빠", "언니", "동생", "할머니"], correctIndex: 2 },
        ],
      },
    ],
  },

  {
    id: "ko-unit1-lesson5",
    unitId: "ko-unit-1",
    title: "음식 (Food)",
    description: "Discover popular Korean foods.",
    order: 5,
    type: "vocabulary",
    xpReward: 15,
    estimatedMinutes: 6,
    goal: { description: "Learn 6 Korean food words.", targetWords: 6 },
    aiTeacher: {
      prompt:
        "You two are excitedly planning a Korean food adventure. Teach 밥, 김치, 불고기, 비빔밥, 냉면, and 삼겹살 one at a time — slowly with the English meaning and a fun bite of cultural trivia — and have the student repeat each dish name back like they're ordering it.",
      voiceTone: "encouraging",
      pace: "normal",
      focusWords: ["밥", "김치", "불고기", "비빔밥", "냉면", "삼겹살"],
    },
    activities: [
      {
        type: "vocabulary",
        items: [
          { word: "밥", translation: "rice / meal", phonetic: "bap", exampleSentence: "밥 먹었어요?", exampleTranslation: "Did you eat?" },
          { word: "김치", translation: "kimchi (fermented cabbage)", phonetic: "gim-chi" },
          { word: "불고기", translation: "bulgogi (marinated beef)", phonetic: "bul-go-gi" },
          { word: "비빔밥", translation: "bibimbap (mixed rice bowl)", phonetic: "bi-bim-bap" },
          { word: "냉면", translation: "cold noodles", phonetic: "naeng-myeon" },
          { word: "삼겹살", translation: "pork belly", phonetic: "sam-gyeop-sal" },
        ],
      },
      {
        type: "multiple-choice",
        questions: [
          { question: "What is '김치'?", options: ["rice", "marinated beef", "fermented cabbage", "cold noodles"], correctIndex: 2 },
          { question: "What does '밥' mean?", options: ["soup", "rice / meal", "noodles", "pork"], correctIndex: 1 },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // GERMAN — Unit: de-unit-1
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: "de-unit1-lesson1",
    unitId: "de-unit-1",
    title: "Begrüßung (Greetings)",
    description: "Common German greetings and polite phrases.",
    order: 1,
    type: "phrases",
    xpReward: 10,
    estimatedMinutes: 5,
    goal: { description: "Learn 6 essential German greetings.", targetPhrases: 6 },
    aiTeacher: {
      prompt:
        "Show the student how to greet people warmly in German. Teach Hallo, Guten Morgen, Guten Abend, Auf Wiedersehen, Danke, and Bitte one at a time, slowly with the English meaning, and gently point out the difference between casual and formal greetings — then ask them to try each one back.",
      voiceTone: "friendly",
      pace: "slow",
      focusWords: ["Hallo", "Guten Morgen", "Guten Abend", "Auf Wiedersehen", "Danke", "Bitte"],
    },
    activities: [
      {
        type: "phrases",
        items: [
          { phrase: "Hallo", translation: "Hello", phonetic: "ha-LO", context: "informal greeting" },
          { phrase: "Guten Morgen", translation: "Good morning", phonetic: "GOO-ten MOR-gen", context: "morning greeting" },
          { phrase: "Guten Abend", translation: "Good evening", phonetic: "GOO-ten AH-bent", context: "evening greeting" },
          { phrase: "Auf Wiedersehen", translation: "Goodbye (formal)", phonetic: "owf VEE-der-zay-en", context: "farewell" },
          { phrase: "Danke", translation: "Thank you", phonetic: "DAHN-ke", context: "gratitude" },
          { phrase: "Bitte", translation: "Please / You're welcome", phonetic: "BI-te", context: "politeness" },
        ],
      },
      {
        type: "multiple-choice",
        questions: [
          { question: "What does 'Auf Wiedersehen' mean?", options: ["Good morning", "Hello", "Thank you", "Goodbye"], correctIndex: 3 },
          { question: "Which phrase means 'Good morning' in German?", options: ["Guten Abend", "Hallo", "Guten Morgen", "Danke"], correctIndex: 2 },
        ],
      },
    ],
  },

  {
    id: "de-unit1-lesson2",
    unitId: "de-unit-1",
    title: "Zahlen 1–10",
    description: "Count from one to ten in German.",
    order: 2,
    type: "vocabulary",
    xpReward: 10,
    estimatedMinutes: 5,
    goal: { description: "Learn German numbers 1 through 10.", targetWords: 10 },
    aiTeacher: {
      prompt:
        "Count together in German, step by step. Teach eins through zehn one at a time, slowly with the English meaning, dropping each into a quick everyday sentence — then count from one to ten together to finish.",
      voiceTone: "encouraging",
      pace: "slow",
      focusWords: ["eins", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun", "zehn"],
    },
    activities: [
      {
        type: "vocabulary",
        items: [
          { word: "eins", translation: "one", phonetic: "ines" },
          { word: "zwei", translation: "two", phonetic: "tsvai" },
          { word: "drei", translation: "three", phonetic: "dry" },
          { word: "vier", translation: "four", phonetic: "feer" },
          { word: "fünf", translation: "five", phonetic: "fuenf" },
          { word: "sechs", translation: "six", phonetic: "zeks" },
          { word: "sieben", translation: "seven", phonetic: "ZEE-ben" },
          { word: "acht", translation: "eight", phonetic: "akht" },
          { word: "neun", translation: "nine", phonetic: "noyn" },
          { word: "zehn", translation: "ten", phonetic: "tsayn" },
        ],
      },
      {
        type: "multiple-choice",
        questions: [
          { question: "What is 'fünf' in English?", options: ["three", "five", "seven", "nine"], correctIndex: 1 },
          { question: "How do you say 'ten' in German?", options: ["acht", "neun", "zehn", "sieben"], correctIndex: 2 },
        ],
      },
    ],
  },

  {
    id: "de-unit1-lesson3",
    unitId: "de-unit-1",
    title: "Farben (Colors)",
    description: "Name colors in German.",
    order: 3,
    type: "vocabulary",
    xpReward: 10,
    estimatedMinutes: 5,
    goal: { description: "Learn 8 German color words.", targetWords: 8 },
    aiTeacher: {
      prompt:
        "Describe the colorful world around you together. Teach rot, blau, grün, gelb, weiß, schwarz, orange, and lila one at a time — slowly with the English meaning and a simple sentence — and keep it easy by sticking to these base forms for now, since German color endings can shift later.",
      voiceTone: "friendly",
      pace: "normal",
      focusWords: ["rot", "blau", "grün", "gelb", "weiß", "schwarz", "orange", "lila"],
    },
    activities: [
      {
        type: "vocabulary",
        items: [
          { word: "rot", translation: "red", phonetic: "roht" },
          { word: "blau", translation: "blue", phonetic: "blow" },
          { word: "grün", translation: "green", phonetic: "gruen" },
          { word: "gelb", translation: "yellow", phonetic: "gelp" },
          { word: "weiß", translation: "white", phonetic: "vice" },
          { word: "schwarz", translation: "black", phonetic: "shvarts" },
          { word: "orange", translation: "orange", phonetic: "oh-RAHN-zheh" },
          { word: "lila", translation: "purple", phonetic: "LEE-la" },
        ],
      },
      {
        type: "multiple-choice",
        questions: [
          { question: "What color is 'grün'?", options: ["red", "yellow", "green", "blue"], correctIndex: 2 },
          { question: "How do you say 'black' in German?", options: ["weiß", "schwarz", "blau", "rot"], correctIndex: 1 },
        ],
      },
    ],
  },

  {
    id: "de-unit1-lesson4",
    unitId: "de-unit-1",
    title: "Familie (Family)",
    description: "Talk about your family in German.",
    order: 4,
    type: "vocabulary",
    xpReward: 10,
    estimatedMinutes: 5,
    goal: { description: "Learn 6 German family member words.", targetWords: 6 },
    aiTeacher: {
      prompt:
        "You're getting to know each other's families. Teach Mutter, Vater, Bruder, Schwester, Großmutter, and Großvater one at a time, slowly with the English meaning, weaving each into a warm sentence like 'Meine Mutter kocht gut' — and remind the student that German capitalizes every noun.",
      voiceTone: "friendly",
      pace: "normal",
      focusWords: ["Mutter", "Vater", "Bruder", "Schwester", "Großmutter", "Großvater"],
    },
    activities: [
      {
        type: "vocabulary",
        items: [
          { word: "Mutter", translation: "mother", phonetic: "MU-ter", exampleSentence: "Meine Mutter kocht gut.", exampleTranslation: "My mother cooks well." },
          { word: "Vater", translation: "father", phonetic: "FAH-ter" },
          { word: "Bruder", translation: "brother", phonetic: "BROO-der" },
          { word: "Schwester", translation: "sister", phonetic: "SHVES-ter" },
          { word: "Großmutter", translation: "grandmother", phonetic: "GROHS-mu-ter" },
          { word: "Großvater", translation: "grandfather", phonetic: "GROHS-fah-ter" },
        ],
      },
      {
        type: "multiple-choice",
        questions: [
          { question: "What does 'Schwester' mean?", options: ["brother", "mother", "sister", "grandmother"], correctIndex: 2 },
          { question: "How do you say 'father' in German?", options: ["Mutter", "Bruder", "Großvater", "Vater"], correctIndex: 3 },
        ],
      },
    ],
  },

  {
    id: "de-unit1-lesson5",
    unitId: "de-unit-1",
    title: "Essen und Trinken",
    description: "Essential food and drink vocabulary in German.",
    order: 5,
    type: "vocabulary",
    xpReward: 15,
    estimatedMinutes: 6,
    goal: { description: "Learn 6 German food and drink words.", targetWords: 6 },
    aiTeacher: {
      prompt:
        "You two are chatting about favorite foods like friends at a German café. Teach Brot, Wasser, Milch, Apfel, Käse, and Bier one at a time — slowly with the English meaning, a short everyday sentence, and a fun cultural note — and ask the student to repeat each one back.",
      voiceTone: "encouraging",
      pace: "normal",
      focusWords: ["Brot", "Wasser", "Milch", "Apfel", "Käse", "Bier"],
    },
    activities: [
      {
        type: "vocabulary",
        items: [
          { word: "Brot", translation: "bread", phonetic: "broht", exampleSentence: "Das Brot ist frisch.", exampleTranslation: "The bread is fresh." },
          { word: "Wasser", translation: "water", phonetic: "VA-ser" },
          { word: "Milch", translation: "milk", phonetic: "milkh" },
          { word: "Apfel", translation: "apple", phonetic: "AP-fel" },
          { word: "Käse", translation: "cheese", phonetic: "KAY-ze" },
          { word: "Bier", translation: "beer", phonetic: "beer" },
        ],
      },
      {
        type: "multiple-choice",
        questions: [
          { question: "What does 'Käse' mean?", options: ["bread", "apple", "cheese", "milk"], correctIndex: 2 },
          { question: "How do you say 'water' in German?", options: ["Milch", "Bier", "Apfel", "Wasser"], correctIndex: 3 },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // CHINESE — Unit: zh-unit-1
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: "zh-unit1-lesson1",
    unitId: "zh-unit-1",
    title: "问候 (Greetings)",
    description: "Essential Chinese greetings and polite phrases.",
    order: 1,
    type: "phrases",
    xpReward: 10,
    estimatedMinutes: 5,
    goal: { description: "Learn 6 essential Mandarin greetings.", targetPhrases: 6 },
    aiTeacher: {
      prompt:
        "Show the student how to greet people warmly in Mandarin. Teach 你好, 再见, 谢谢, 对不起, 很高兴认识你, and 早上好 one at a time — slowly, with the pinyin, tones, and English meaning, plus a quick word on when people actually say it — and ask them to try each one back.",
      voiceTone: "friendly",
      pace: "slow",
      focusWords: ["你好", "再见", "谢谢", "对不起", "很高兴认识你", "早上好"],
    },
    activities: [
      {
        type: "phrases",
        items: [
          { phrase: "你好", translation: "Hello", phonetic: "nǐ hǎo", context: "greeting" },
          { phrase: "再见", translation: "Goodbye", phonetic: "zài jiàn", context: "farewell" },
          { phrase: "谢谢", translation: "Thank you", phonetic: "xiè xie", context: "gratitude" },
          { phrase: "对不起", translation: "I'm sorry / Excuse me", phonetic: "duì bu qǐ", context: "apology" },
          { phrase: "很高兴认识你", translation: "Nice to meet you", phonetic: "hěn gāo xìng rèn shi nǐ", context: "introduction" },
          { phrase: "早上好", translation: "Good morning", phonetic: "zǎo shang hǎo", context: "morning greeting" },
        ],
      },
      {
        type: "multiple-choice",
        questions: [
          { question: "What does '谢谢' mean?", options: ["Hello", "Goodbye", "Thank you", "I'm sorry"], correctIndex: 2 },
          { question: "Which phrase means 'Goodbye' in Mandarin?", options: ["你好", "再见", "谢谢", "早上好"], correctIndex: 1 },
        ],
      },
    ],
  },

  {
    id: "zh-unit1-lesson2",
    unitId: "zh-unit-1",
    title: "数字 (Numbers)",
    description: "Count from one to ten in Mandarin Chinese.",
    order: 2,
    type: "vocabulary",
    xpReward: 10,
    estimatedMinutes: 5,
    goal: { description: "Learn Chinese numbers 1–10.", targetWords: 10 },
    aiTeacher: {
      prompt:
        "Count together in Mandarin, one tone at a time. Teach 一 through 十 slowly — the character, its pinyin and tone, and its English meaning — then count from one to ten together, and mention how wonderfully consistent Chinese numbers are.",
      voiceTone: "professional",
      pace: "slow",
      focusWords: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"],
    },
    activities: [
      {
        type: "vocabulary",
        items: [
          { word: "一", translation: "one", phonetic: "yī" },
          { word: "二", translation: "two", phonetic: "èr" },
          { word: "三", translation: "three", phonetic: "sān" },
          { word: "四", translation: "four", phonetic: "sì" },
          { word: "五", translation: "five", phonetic: "wǔ" },
          { word: "六", translation: "six", phonetic: "liù" },
          { word: "七", translation: "seven", phonetic: "qī" },
          { word: "八", translation: "eight", phonetic: "bā" },
          { word: "九", translation: "nine", phonetic: "jiǔ" },
          { word: "十", translation: "ten", phonetic: "shí" },
        ],
      },
      {
        type: "multiple-choice",
        questions: [
          { question: "What is '五' in English?", options: ["three", "five", "seven", "nine"], correctIndex: 1 },
          { question: "How do you say 'eight' in Mandarin?", options: ["七", "八", "九", "十"], correctIndex: 1 },
        ],
      },
    ],
  },

  {
    id: "zh-unit1-lesson3",
    unitId: "zh-unit-1",
    title: "颜色 (Colors)",
    description: "Describe colors in Mandarin Chinese.",
    order: 3,
    type: "vocabulary",
    xpReward: 10,
    estimatedMinutes: 5,
    goal: { description: "Learn 6 color words in Mandarin.", targetWords: 6 },
    aiTeacher: {
      prompt:
        "Notice colorful things together. Teach 红色, 蓝色, 绿色, 黄色, 白色, and 黑色 one at a time — slowly with the pinyin and English meaning, pointing out that 色 means 'color' — and use each in a short sentence like 这是红色的苹果。 Ask the student to repeat each one back.",
      voiceTone: "friendly",
      pace: "normal",
      focusWords: ["红色", "蓝色", "绿色", "黄色", "白色", "黑色"],
    },
    activities: [
      {
        type: "vocabulary",
        items: [
          { word: "红色", translation: "red", phonetic: "hóng sè", exampleSentence: "这是红色的苹果。", exampleTranslation: "This is a red apple." },
          { word: "蓝色", translation: "blue", phonetic: "lán sè" },
          { word: "绿色", translation: "green", phonetic: "lǜ sè" },
          { word: "黄色", translation: "yellow", phonetic: "huáng sè" },
          { word: "白色", translation: "white", phonetic: "bái sè" },
          { word: "黑色", translation: "black", phonetic: "hēi sè" },
        ],
      },
      {
        type: "multiple-choice",
        questions: [
          { question: "What color is '蓝色'?", options: ["red", "green", "yellow", "blue"], correctIndex: 3 },
          { question: "How do you say 'white' in Mandarin?", options: ["黑色", "白色", "红色", "绿色"], correctIndex: 1 },
        ],
      },
    ],
  },

  {
    id: "zh-unit1-lesson4",
    unitId: "zh-unit-1",
    title: "家人 (Family)",
    description: "Learn family member vocabulary in Mandarin.",
    order: 4,
    type: "vocabulary",
    xpReward: 10,
    estimatedMinutes: 5,
    goal: { description: "Learn 6 Chinese family words.", targetWords: 6 },
    aiTeacher: {
      prompt:
        "Chat about family together. Teach 妈妈, 爸爸, 哥哥, 姐姐, 弟弟, and 妹妹 one at a time, slowly with the pinyin and English meaning, gently noting that Chinese has different words for older and younger siblings — keep it warm and simple.",
      voiceTone: "friendly",
      pace: "slow",
      focusWords: ["妈妈", "爸爸", "哥哥", "姐姐", "弟弟", "妹妹"],
    },
    activities: [
      {
        type: "vocabulary",
        items: [
          { word: "妈妈", translation: "mom / mother", phonetic: "māma" },
          { word: "爸爸", translation: "dad / father", phonetic: "bàba" },
          { word: "哥哥", translation: "older brother", phonetic: "gēge" },
          { word: "姐姐", translation: "older sister", phonetic: "jiějie" },
          { word: "弟弟", translation: "younger brother", phonetic: "dìdi" },
          { word: "妹妹", translation: "younger sister", phonetic: "mèimei" },
        ],
      },
      {
        type: "multiple-choice",
        questions: [
          { question: "What does '哥哥' mean?", options: ["younger brother", "older sister", "older brother", "father"], correctIndex: 2 },
          { question: "How do you say 'mom' in Mandarin?", options: ["爸爸", "妈妈", "姐姐", "妹妹"], correctIndex: 1 },
        ],
      },
    ],
  },

  {
    id: "zh-unit1-lesson5",
    unitId: "zh-unit-1",
    title: "食物 (Food)",
    description: "Discover popular Chinese foods.",
    order: 5,
    type: "vocabulary",
    xpReward: 15,
    estimatedMinutes: 6,
    goal: { description: "Learn 6 Chinese food words.", targetWords: 6 },
    aiTeacher: {
      prompt:
        "You two are excitedly talking about Chinese food. Teach 米饭, 面条, 饺子, 包子, 豆腐, and 火锅 one at a time — slowly with the pinyin, English meaning, and a fun bite of cultural trivia — and have the student repeat each dish name back like they're ordering it.",
      voiceTone: "encouraging",
      pace: "normal",
      focusWords: ["米饭", "面条", "饺子", "包子", "豆腐", "火锅"],
    },
    activities: [
      {
        type: "vocabulary",
        items: [
          { word: "米饭", translation: "rice", phonetic: "mǐ fàn", exampleSentence: "我想吃米饭。", exampleTranslation: "I want to eat rice." },
          { word: "面条", translation: "noodles", phonetic: "miàn tiáo" },
          { word: "饺子", translation: "dumplings", phonetic: "jiǎo zi" },
          { word: "包子", translation: "steamed buns", phonetic: "bāo zi" },
          { word: "豆腐", translation: "tofu", phonetic: "dòu fu" },
          { word: "火锅", translation: "hot pot", phonetic: "huǒ guō" },
        ],
      },
      {
        type: "multiple-choice",
        questions: [
          { question: "What is '饺子'?", options: ["rice", "noodles", "dumplings", "tofu"], correctIndex: 2 },
          { question: "What does '米饭' mean?", options: ["noodles", "rice", "hot pot", "steamed buns"], correctIndex: 1 },
        ],
      },
    ],
  },

];

// ─── Helpers ───────────────────────────────────────────────────────────────

export function getLessonsByUnit(unitId: string): Lesson[] {
  return lessons
    .filter((l) => l.unitId === unitId)
    .sort((a, b) => a.order - b.order);
}

export function getLessonById(id: string): Lesson | undefined {
  return lessons.find((l) => l.id === id);
}
