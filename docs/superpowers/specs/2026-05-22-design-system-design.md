# Design System Implementation Spec
**Date:** 2026-05-22
**Status:** Approved

---

## Overview

Implement the Lingua design system using NativeWind v5 + Tailwind v4. Establishes all color tokens, typography scales, and Poppins font loading as the foundation every subsequent feature screen will build on.

**Approach:** Hybrid — CSS variables in `global.css` for NativeWind class usage, plus a `constants/theme.ts` TypeScript file for programmatic access (StyleSheet, logic code).

---

## File Structure

```
constants/
  theme.ts                         ← TypeScript token exports

src/app/
  _layout.tsx                      ← Updated: useFonts + SplashScreen guard

assets/fonts/
  Poppins-Regular.ttf
  Poppins-Medium.ttf
  Poppins-SemiBold.ttf
  Poppins-Bold.ttf

global.css                         ← Updated: @theme block with all CSS vars + BEM utilities
```

---

## Design Tokens — `constants/theme.ts`

Single exported `theme` object with typed colors and typography.

### Colors

| Token | Hex | Usage |
|---|---|---|
| `linguaPurple` | `#6C4EF5` | Primary brand, CTAs |
| `linguaDeepPurple` | `#5B3BF6` | Primary pressed/hover |
| `linguaBlue` | `#4D88FF` | Info, secondary actions |
| `linguaGreen` | `#21C16B` | Success, XP, progress |
| `success` | `#21C16B` | Positive feedback |
| `warning` | `#FFCB00` | Caution states |
| `streak` | `#FF8A00` | Streak indicator |
| `error` | `#FF4D4F` | Error states |
| `info` | `#4D88FF` | Informational |
| `textPrimary` | `#001132` | Body/heading text |
| `textSecondary` | `#6B7280` | Supporting text |
| `border` | `#E5E7EB` | Dividers, card borders |
| `surface` | `#F6F7FB` | Card backgrounds |
| `background` | `#FFFFFF` | Screen background |

### Typography

Font family: **Poppins** (geometric sans-serif)

| Scale | Size | Weight | Line Height | Role |
|---|---|---|---|---|
| `h1` | 32px | 700 (Bold) | 1.2 | Page / Screen Title |
| `h2` | 24px | 600 (SemiBold) | 1.3 | Section Title |
| `h3` | 20px | 600 (SemiBold) | 1.3 | Card / Module Title |
| `h4` | 16px | 500 (Medium) | 1.4 | Subheading |
| `bodyLarge` | 16px | 400 (Regular) | 1.6 | Important content |
| `bodyMedium` | 14px | 400 (Regular) | 1.6 | Body text |
| `bodySmall` | 13px | 400 (Regular) | 1.6 | Supporting text |
| `caption` | 11px | 400 (Regular) | 1.4 | Labels, meta text |

---

## global.css — `@theme` Block

Tailwind v4 CSS custom properties that NativeWind maps to utility classes:

- `--color-lingua-purple` → `bg-lingua-purple`, `text-lingua-purple`
- `--color-text-primary` → `text-text-primary`
- `--color-surface` → `bg-surface`
- `--font-sans: "Poppins"` → `font-sans`
- `--font-size-h1: 32px` → `text-h1`
- etc.

BEM composite utilities defined via `@layer utilities` for bundled text scales:
- `.text-h1` — sets font-size + font-weight + line-height for H1
- `.text-h2` — same for H2
- `.text-h3` — same for H3
- `.text-h4` — same for H4
- `.text-body-lg` — same for Body Large
- `.text-body-md` — same for Body Medium
- `.text-body-sm` — same for Body Small
- `.text-caption` — same for Caption

These spare repeated class combinations on every Text component.

---

## Font Loading — `_layout.tsx`

1. Call `useFonts()` from `expo-font` with all 4 Poppins weights mapped to named keys:
   - `Poppins-Regular`, `Poppins-Medium`, `Poppins-SemiBold`, `Poppins-Bold` (hyphen convention — fonts loaded locally, not from `@expo-google-fonts`)
2. Call `SplashScreen.preventAutoHideAsync()` before the component renders.
3. Once `fontsLoaded` is true, call `SplashScreen.hideAsync()` in a `useEffect`.
4. Return `null` while fonts are loading to prevent flash of unstyled text.

---

## Constraints

- NativeWind v5 preview.4 — use `@theme {}` syntax (Tailwind v4), not `tailwind.config.js`
- Do not use `StyleSheet` for color/typography tokens; those come from NativeWind classes
- `SafeAreaView` must still use inline styles per AGENTS.md style exception rules
- No new libraries — `expo-font` is already installed

---

## Out of Scope

- Spacing scale (will be added per-feature as needed)
- Shadow/elevation tokens
- Dark mode
- Animation tokens
