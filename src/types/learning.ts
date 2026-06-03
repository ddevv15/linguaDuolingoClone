// ─── Vocabulary ────────────────────────────────────────────────────────────

export type VocabularyItem = {
  word: string;
  translation: string;
  phonetic?: string;
  exampleSentence?: string;
  exampleTranslation?: string;
};

// ─── Phrases ───────────────────────────────────────────────────────────────

export type PhraseItem = {
  phrase: string;
  translation: string;
  phonetic?: string;
  /** Usage context, e.g. "greeting", "restaurant", "emergency" */
  context?: string;
};

// ─── Quiz question shapes ──────────────────────────────────────────────────

export type MultipleChoiceQuestion = {
  question: string;
  options: string[];
  correctIndex: number;
};

export type FillBlankQuestion = {
  /** Sentence containing ___ where the answer goes */
  sentence: string;
  answer: string;
  options: string[];
  translation: string;
};

// ─── Activities (discriminated union) ─────────────────────────────────────

export type Activity =
  | { type: "vocabulary"; items: VocabularyItem[] }
  | { type: "phrases"; items: PhraseItem[] }
  | { type: "multiple-choice"; questions: MultipleChoiceQuestion[] }
  | { type: "fill-blank"; questions: FillBlankQuestion[] };

// ─── Lesson ────────────────────────────────────────────────────────────────

export type LessonType = "vocabulary" | "phrases" | "quiz" | "listening";

export type LessonGoal = {
  description: string;
  targetWords?: number;
  targetPhrases?: number;
};

/**
 * Config passed to the future Stream Vision Agent audio teacher.
 * The prompt describes what the AI should teach and how.
 */
export type AITeacherConfig = {
  prompt: string;
  voiceTone: "friendly" | "encouraging" | "professional";
  pace: "slow" | "normal" | "fast";
  focusWords: string[];
};

export type Lesson = {
  id: string;
  unitId: string;
  title: string;
  description: string;
  order: number;
  type: LessonType;
  xpReward: number;
  estimatedMinutes: number;
  goal: LessonGoal;
  aiTeacher: AITeacherConfig;
  activities: Activity[];
};

// ─── Unit ──────────────────────────────────────────────────────────────────

export type Unit = {
  id: string;
  languageId: string;
  title: string;
  description: string;
  order: number;
  /** Hex color used as the unit card accent */
  color: string;
  /** Emoji icon shown on the unit card */
  icon: string;
  totalLessons: number;
};

// ─── Language ──────────────────────────────────────────────────────────────

export type Language = {
  id: string;
  /** BCP 47 language code, e.g. "es", "fr", "ja" */
  code: string;
  name: string;
  nativeName: string;
  /** Flag image URL, e.g. "https://flagcdn.com/w320/es.png" */
  flag: string;
  description: string;
  totalUnits: number;
  /** Pre-formatted learner count string, e.g. "28.4M learners" */
  learnerCount?: string;
};
