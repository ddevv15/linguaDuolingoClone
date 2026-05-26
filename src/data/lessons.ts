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
        "You are a friendly Spanish teacher. Teach the student basic Spanish greetings: hola, adiós, buenos días, buenas noches, por favor, and gracias. Pronounce each word clearly, use it in a simple sentence, and ask the student to repeat. Keep the lesson encouraging and fun.",
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
        "You are an encouraging Spanish teacher. Teach the numbers uno through diez. Say each number, spell it out, and use it in a short counting sentence. Ask the student to repeat after you. End with a quick count from one to ten together.",
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
        "You are a warm French teacher. Teach the student bonjour, bonsoir, au revoir, merci, s'il vous plaît, and enchanté. For each phrase, give the pronunciation, a sample sentence, and a brief cultural note. Encourage the student after every response.",
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
        "You are a creative French teacher. Teach the student the names of 8 colors in French: rouge, bleu, vert, jaune, blanc, noir, orange, and violet. For each color, say the French word, the English translation, and use it in a sentence like 'Le ciel est bleu.' Ask the student to repeat each color.",
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
        "You are a patient Japanese teacher. Teach the five hiragana vowels: あ (a), い (i), う (u), え (e), お (o). For each character, say the sound clearly, write the romaji, and give a word that starts with that sound. Repeat each character twice and keep a calm, steady pace.",
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
        "You are a cheerful Japanese teacher. Teach the student these greetings: おはようございます (good morning), こんにちは (hello/good afternoon), こんばんは (good evening), さようなら (goodbye), ありがとう (thank you), and すみません (excuse me). Say each phrase at normal speed, then slowly, and explain when to use it.",
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
