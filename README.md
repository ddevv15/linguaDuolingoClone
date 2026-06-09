# LinguaAI — AI-Powered Language Learning App

> A Duolingo-inspired mobile app built with Expo, React Native, and Stream Vision Agents. Designed as a **production-quality teaching project** — each feature is built step-by-step so developers can follow along and learn.

---

## What Is This?

LinguaAI is a full-featured language learning app where an AI teacher conducts real-time voice lessons powered by **Stream Vision Agents** and **OpenAI Realtime**. Users pick a language, work through structured lesson units, earn XP, and practice with an AI tutor that adapts to their pace — all inside a polished, playful mobile UI.

---

## Features

| Feature | Description |
|---|---|
| **AI Voice Teacher** | Real-time voice lessons with a language teacher powered by Stream Vision Agents + OpenAI Realtime |
| **Live Captions** | Real-time transcription displayed during AI teacher sessions |
| **Audio Lessons** | Structured audio-based learning with vocabulary and phrase practice |
| **Interactive Lessons** | Vocabulary cards, multiple-choice questions, and fill-in-the-blank exercises |
| **6 Languages** | Spanish, French, Japanese, Korean, German, Mandarin Chinese |
| **XP & Progress** | Local XP rewards and lesson completion tracking with Zustand + AsyncStorage |
| **Authentication** | Full sign-up / sign-in flow with email verification via Clerk |
| **Onboarding** | Animated welcome flow and language selection |
| **Analytics** | Screen tracking and touch capture via PostHog |

---

## Tech Stack

```
Mobile          → Expo 55 · React Native 0.83 · TypeScript · Expo Router
Styling         → NativeWind v5 (Tailwind CSS for React Native)
State           → Zustand · AsyncStorage
Auth            → Clerk v3
AI Teacher      → Stream Vision Agents · OpenAI Realtime API (gpt-realtime-2)
Video/Voice     → Stream Video React Native SDK
Analytics       → PostHog React Native
Backend         → Expo API Routes (server-side only)
```

---

## Architecture

```
DuolingoClone/
├── src/
│   ├── app/
│   │   ├── (auth)/          # Sign-in, Sign-up screens
│   │   ├── (tabs)/          # Home, AI Teacher, Profile tab screens
│   │   ├── lesson/[id].tsx  # Dynamic lesson screen
│   │   ├── onboarding.tsx
│   │   ├── language-selection.tsx
│   │   └── api/stream/      # Server-side Stream token API route
│   ├── components/          # Reusable UI: AudioLessonView, LiveCaptions, LanguageCard…
│   ├── constants/           # Theme, image registry, agent config
│   ├── data/                # Hardcoded lesson content (lessons.ts, languages.ts, units.ts)
│   ├── hooks/               # useAgentSession — manages Vision Agent lifecycle
│   ├── lib/                 # Clerk tokenCache, PostHog client, serverAuth helper
│   ├── store/               # Zustand: languageStore, userProgressStore
│   └── types/               # TypeScript types: Lesson, Language, Activity…
│
└── vision-agent/            # Python Vision Agent server
    └── main.py              # Stream Edge + OpenAI Realtime teacher agent
```

### How the AI Teacher Works

```
Expo App (client)
    │
    ├─→ GET /api/stream/session        # Clerk-authenticated; returns Stream token
    │       └─ signs HS256 JWT server-side; never exposes secrets to client
    │
    ├─→ Creates Stream Video call      # Packs lesson context into call.custom_data
    │       (title, vocabulary, phrases, AI prompt, etc.)
    │
    └─→ Joins call ─────────────────────────────────────────────────────────┐
                                                                            │
Python Vision Agent (server)                                                │
    ├─→ Receives call via AgentLauncher                                     │
    ├─→ Reads lesson context from call.custom_data                          │
    ├─→ Builds tailored system instructions per lesson                      │
    ├─→ Connects to OpenAI Realtime (gpt-realtime-2, voice: alloy)         │
    └─→ Conducts live voice lesson ←────────────────────────────────────────┘
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- Expo CLI (`npm install -g expo`)
- Python 3.12+ with `uv` (for the Vision Agent)
- iOS Simulator / Android Emulator or a physical device

### 1. Clone & Install

```bash
git clone https://github.com/your-username/DuolingoClone.git
cd DuolingoClone
npm install
```

### 2. Environment Variables

Create a `.env` file in the project root:

```env
# Clerk
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...

# Stream
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
EXPO_PUBLIC_STREAM_API_KEY=your_stream_api_key

# PostHog
EXPO_PUBLIC_POSTHOG_API_KEY=phc_...
EXPO_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

Create a `.env` file in `vision-agent/`:

```env
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
OPENAI_API_KEY=sk-...
```

### 3. Start the App

```bash
# iOS
npm run ios

# Android
npm run android
```

### 4. Start the Vision Agent (AI Teacher)

```bash
cd vision-agent
uv sync
uv run main.py listen --service-account-id language-teacher
```

---

## Supported Languages

| Language | Code | Lessons |
|---|---|---|
| 🇪🇸 Spanish | `es` | Greetings · Numbers · Phrases · Colors · Days · Food |
| 🇫🇷 French | `fr` | Bonjour · Colors · Numbers · Family · Food · Days |
| 🇯🇵 Japanese | `ja` | Hiragana · Greetings · Numbers · Days · Colors · Family |
| 🇰🇷 Korean | `ko` | Greetings · Numbers · Colors · Family · Food |
| 🇩🇪 German | `de` | Greetings · Numbers · Colors · Family · Food |
| 🇨🇳 Chinese | `zh` | Greetings · Numbers · Colors · Family · Food |

Each language has a structured **Unit 1** with 5–6 lessons covering vocabulary, phrases, multiple-choice, and fill-in-the-blank exercises.

---

## Lesson Content Structure

Every lesson is defined as a typed TypeScript object — no database required:

```ts
{
  id: "es-unit1-lesson1",
  title: "Greetings",
  type: "vocabulary",
  xpReward: 10,
  estimatedMinutes: 5,
  aiTeacher: {
    prompt: "This is the student's very first Spanish lesson…",
    voiceTone: "friendly",
    pace: "slow",
    focusWords: ["hola", "adiós", "buenos días", …],
  },
  activities: [
    { type: "vocabulary", items: […] },
    { type: "multiple-choice", questions: […] },
  ],
}
```

The AI teacher's prompt, voice tone, pace, and focus words are all packaged into the Stream call's `custom_data` so the Vision Agent receives a fully-tailored lesson context.

---

## Key Implementation Details

**Server-side token generation** — `src/app/api/stream/session+api.ts` uses the Web Crypto API to sign HS256 JWTs without any Node.js dependencies, keeping Stream secrets off the client.

**Auth routing guard** — `_layout.tsx` coordinates Clerk auth state, Zustand hydration, and Expo Router segments to route users to onboarding → language selection → home in the correct order.

**Vision Agent context injection** — `vision-agent/main.py` reads `call.custom_data` after joining to rebuild the system prompt with the exact lesson vocabulary, phrases, goal, and teacher style for that session.

**NativeWind v5** — All styling uses Tailwind utility classes via NativeWind. `StyleSheet` is used only for platform-specific exceptions (SafeAreaView, Animated values, dynamic styles).

---

## Scripts

```bash
npm run start        # Start Expo dev server
npm run ios          # Run on iOS Simulator
npm run android      # Run on Android Emulator
npm run web          # Run in browser
npm run lint         # ESLint
```

---

## Learning Path (Prompts)

The `assetsFromChannel/prompts/` folder contains the full series of prompts used to build this app step by step:

```
01 — NativeWind setup
02 — Design theme
03 — Onboarding UI
04 — Authentication UI
05 — Clerk integration
06 — Content system (lessons & languages)
07 — Language selection UI
08 — Zustand stores
09 — Bottom tab navigation
10 — Home screen UI
11 — Lesson screen UI
12 — Audio lesson UI
13 — Stream integration
14 — Vision Agents (AI teacher)
15 — Connecting AI teacher to UI
16 — AI teacher improvements
17 — Live captions
18 — PostHog analytics
```

---

## License

MIT
