<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the DuolingoClone Expo app. PostHog is initialized as a singleton in `src/lib/posthog.ts` using `expo-constants` to read the API key and host from `app.config.js` extras (which read from `.env`). The root layout wraps the app in `PostHogProvider` with autocapture enabled for touch events, and a `ScreenTracker` component fires `posthog.screen()` on every route change for automatic screen tracking. User identity is established on sign-in and sign-up via `posthog.identify()` using the user's email as the distinct ID.

| Event | Description | File |
|---|---|---|
| `onboarding_get_started_tapped` | User tapped "Get Started" on the onboarding screen — top of the conversion funnel | `src/app/onboarding.tsx` |
| `sign_up_completed` | User successfully completed email/password or SSO sign-up | `src/app/(auth)/sign-up.tsx` |
| `sign_up_failed` | Sign-up attempt failed (validation error, existing account, etc.) | `src/app/(auth)/sign-up.tsx` |
| `sign_in_completed` | User successfully signed in via email OTP or SSO | `src/app/(auth)/sign-in.tsx` |
| `sign_in_failed` | Sign-in attempt failed | `src/app/(auth)/sign-in.tsx` |
| `language_selected` | User chose a language and tapped Continue | `src/app/language-selection.tsx` |
| `lesson_tapped` | User tapped a lesson row to start or view a lesson | `src/app/(tabs)/learn.tsx` |
| `lesson_completed` | User completed a lesson | `src/store/userProgressStore.ts` |
| `xp_earned` | User earned XP — tracks engagement depth and daily goal progress | `src/store/userProgressStore.ts` |
| `daily_goal_reached` | User hit their daily XP goal | `src/store/userProgressStore.ts` |
| `continue_learning_tapped` | User tapped the "Continue" button on the home screen | `src/app/(tabs)/index.tsx` |
| `ai_teacher_opened` | User navigated to the AI Teacher tab | `src/app/(tabs)/ai-teacher.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics dashboard](/dashboard/1653010)
- [Sign-ups over time](/insights/MUn0EBvs)
- [Lesson completions over time](/insights/6QfIc5E3)
- [Daily goal reached](/insights/g4UGvWjD)
- [Onboarding to sign-up funnel](/insights/L9UGLzwM)
- [Lesson engagement funnel](/insights/kx2JvNCg)

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
