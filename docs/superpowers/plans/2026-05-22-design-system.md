# Design System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the Lingua design system — brand colors, typography scale, and Poppins font loading — as the shared foundation for all app screens.

**Architecture:** Hybrid approach: CSS custom properties in `global.css` via Tailwind v4 `@theme {}` provide NativeWind utility classes (`bg-lingua-purple`, `text-h1`, etc.), while `constants/theme.ts` exports the same values as typed TypeScript for StyleSheet and logic code. Poppins is loaded via `expo-font`'s `useFonts` in `_layout.tsx`, with SplashScreen held until fonts are ready.

**Tech Stack:** Expo 55, React Native 0.83, NativeWind v5 preview.4, Tailwind CSS v4, TypeScript, expo-font, expo-splash-screen

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `assets/fonts/Poppins-Regular.ttf` | Create | Poppins 400 font file |
| `assets/fonts/Poppins-Medium.ttf` | Create | Poppins 500 font file |
| `assets/fonts/Poppins-SemiBold.ttf` | Create | Poppins 600 font file |
| `assets/fonts/Poppins-Bold.ttf` | Create | Poppins 700 font file |
| `constants/theme.ts` | Create | Typed TypeScript design tokens |
| `global.css` | Modify | `@theme {}` CSS vars + `@layer utilities` text scale classes |
| `src/app/_layout.tsx` | Modify | Load fonts with `useFonts`, guard SplashScreen |
| `src/app/index.tsx` | Modify | Smoke test screen showing colors + text scales |

---

## Task 1: Download Poppins Font Files

**Files:**
- Create: `assets/fonts/Poppins-Regular.ttf`
- Create: `assets/fonts/Poppins-Medium.ttf`
- Create: `assets/fonts/Poppins-SemiBold.ttf`
- Create: `assets/fonts/Poppins-Bold.ttf`

- [ ] **Step 1: Create fonts directory and download all 4 weights**

```bash
mkdir -p assets/fonts

curl -L "https://github.com/google/fonts/raw/main/ofl/poppins/Poppins-Regular.ttf" \
  -o assets/fonts/Poppins-Regular.ttf

curl -L "https://github.com/google/fonts/raw/main/ofl/poppins/Poppins-Medium.ttf" \
  -o assets/fonts/Poppins-Medium.ttf

curl -L "https://github.com/google/fonts/raw/main/ofl/poppins/Poppins-SemiBold.ttf" \
  -o assets/fonts/Poppins-SemiBold.ttf

curl -L "https://github.com/google/fonts/raw/main/ofl/poppins/Poppins-Bold.ttf" \
  -o assets/fonts/Poppins-Bold.ttf
```

- [ ] **Step 2: Verify all 4 files downloaded successfully**

```bash
ls -lh assets/fonts/
```

Expected output: 4 `.ttf` files, each between 50KB–200KB. If any file is under 1KB, the download failed — rerun the curl for that weight.

- [ ] **Step 3: Commit font files**

```bash
git add assets/fonts/
git commit -m "feat: add Poppins font files (Regular, Medium, SemiBold, Bold)"
```

---

## Task 2: Create TypeScript Design Tokens

**Files:**
- Create: `constants/theme.ts`

- [ ] **Step 1: Create constants/theme.ts with full token object**

Create the file `constants/theme.ts` with this exact content:

```ts
export const theme = {
  colors: {
    // Primary
    linguaPurple: "#6C4EF5",
    linguaDeepPurple: "#5B3BF6",
    linguaBlue: "#4D88FF",
    linguaGreen: "#21C16B",
    // Semantic
    success: "#21C16B",
    warning: "#FFCB00",
    streak: "#FF8A00",
    error: "#FF4D4F",
    info: "#4D88FF",
    // Neutrals
    textPrimary: "#001132",
    textSecondary: "#6B7280",
    border: "#E5E7EB",
    surface: "#F6F7FB",
    background: "#FFFFFF",
  },
  typography: {
    h1: { fontSize: 32, fontFamily: "Poppins-Bold", lineHeight: 38 },
    h2: { fontSize: 24, fontFamily: "Poppins-SemiBold", lineHeight: 31 },
    h3: { fontSize: 20, fontFamily: "Poppins-SemiBold", lineHeight: 26 },
    h4: { fontSize: 16, fontFamily: "Poppins-Medium", lineHeight: 22 },
    bodyLarge: { fontSize: 16, fontFamily: "Poppins-Regular", lineHeight: 26 },
    bodyMedium: { fontSize: 14, fontFamily: "Poppins-Regular", lineHeight: 22 },
    bodySmall: { fontSize: 13, fontFamily: "Poppins-Regular", lineHeight: 21 },
    caption: { fontSize: 11, fontFamily: "Poppins-Regular", lineHeight: 15 },
  },
} as const;

export type ThemeColors = typeof theme.colors;
export type TypographyScale = keyof typeof theme.typography;
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors. If errors appear, fix them before continuing.

- [ ] **Step 3: Commit**

```bash
git add constants/theme.ts
git commit -m "feat: add TypeScript design tokens in constants/theme.ts"
```

---

## Task 3: Update global.css with Brand Theme and Text Utilities

**Files:**
- Modify: `global.css`

- [ ] **Step 1: Replace global.css content with @theme block and text utilities**

Replace the full content of `global.css` with:

```css
@import "tailwindcss/theme.css" layer(theme);
@import "tailwindcss/preflight.css" layer(base);
@import "tailwindcss/utilities.css";

@import "nativewind/theme";

@theme {
  /* Primary */
  --color-lingua-purple: #6C4EF5;
  --color-lingua-deep-purple: #5B3BF6;
  --color-lingua-blue: #4D88FF;
  --color-lingua-green: #21C16B;

  /* Semantic */
  --color-success: #21C16B;
  --color-warning: #FFCB00;
  --color-streak: #FF8A00;
  --color-error: #FF4D4F;
  --color-info: #4D88FF;

  /* Neutrals */
  --color-text-primary: #001132;
  --color-text-secondary: #6B7280;
  --color-border: #E5E7EB;
  --color-surface: #F6F7FB;
  --color-background: #FFFFFF;

  /* Font family — default sans maps to Poppins Regular */
  --font-family-sans: "Poppins-Regular", system-ui, sans-serif;
}

/* ── Typography scale utilities ─────────────────────────────
   Each utility bundles font-size + font-family (weight variant) + line-height.
   In React Native, font weight is driven by loading distinct font files,
   so each scale references the appropriate Poppins weight directly.
   ──────────────────────────────────────────────────────────── */
@layer utilities {
  .text-h1 {
    font-size: 32px;
    line-height: 38px;
    font-family: "Poppins-Bold";
  }

  .text-h2 {
    font-size: 24px;
    line-height: 31px;
    font-family: "Poppins-SemiBold";
  }

  .text-h3 {
    font-size: 20px;
    line-height: 26px;
    font-family: "Poppins-SemiBold";
  }

  .text-h4 {
    font-size: 16px;
    line-height: 22px;
    font-family: "Poppins-Medium";
  }

  .text-body-lg {
    font-size: 16px;
    line-height: 26px;
    font-family: "Poppins-Regular";
  }

  .text-body-md {
    font-size: 14px;
    line-height: 22px;
    font-family: "Poppins-Regular";
  }

  .text-body-sm {
    font-size: 13px;
    line-height: 21px;
    font-family: "Poppins-Regular";
  }

  .text-caption {
    font-size: 11px;
    line-height: 15px;
    font-family: "Poppins-Regular";
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add global.css
git commit -m "feat: add brand colors and typography scale to global.css @theme"
```

---

## Task 4: Update _layout.tsx — Font Loading and SplashScreen Guard

**Files:**
- Modify: `src/app/_layout.tsx`

- [ ] **Step 1: Replace _layout.tsx content with font loading setup**

Replace the full content of `src/app/_layout.tsx` with:

```tsx
import "../../global.css";

import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return <Stack />;
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/_layout.tsx
git commit -m "feat: load Poppins fonts in layout with SplashScreen guard"
```

---

## Task 5: Smoke Test — Design System Preview Screen

**Files:**
- Modify: `src/app/index.tsx`

This screen visually verifies all tokens render correctly. It will be replaced by real app content in later features.

- [ ] **Step 1: Replace index.tsx with design system preview**

Replace the full content of `src/app/index.tsx` with:

```tsx
import { ScrollView, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const colorSwatches = [
  { label: "Lingua Purple", className: "bg-lingua-purple" },
  { label: "Lingua Deep Purple", className: "bg-lingua-deep-purple" },
  { label: "Lingua Blue", className: "bg-lingua-blue" },
  { label: "Lingua Green", className: "bg-lingua-green" },
  { label: "Warning", className: "bg-warning" },
  { label: "Streak", className: "bg-streak" },
  { label: "Error", className: "bg-error" },
  { label: "Surface", className: "bg-surface border border-border" },
];

export default function Index() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView className="flex-1 px-5 py-6">
        <Text className="text-h1 text-text-primary mb-1">Design System</Text>
        <Text className="text-body-md text-text-secondary mb-8">
          Lingua brand tokens — colors &amp; typography
        </Text>

        <Text className="text-h3 text-text-primary mb-4">Colors</Text>
        <View className="flex-row flex-wrap gap-3 mb-8">
          {colorSwatches.map((s) => (
            <View key={s.label} className="items-center gap-1">
              <View className={`w-14 h-14 rounded-xl ${s.className}`} />
              <Text className="text-caption text-text-secondary">{s.label}</Text>
            </View>
          ))}
        </View>

        <Text className="text-h3 text-text-primary mb-4">Typography</Text>
        <View className="gap-3">
          <Text className="text-h1 text-text-primary">H1 — Page Title</Text>
          <Text className="text-h2 text-text-primary">H2 — Section Title</Text>
          <Text className="text-h3 text-text-primary">H3 — Card Title</Text>
          <Text className="text-h4 text-text-primary">H4 — Subheading</Text>
          <Text className="text-body-lg text-text-primary">Body Large — Important content</Text>
          <Text className="text-body-md text-text-secondary">Body Medium — Body text</Text>
          <Text className="text-body-sm text-text-secondary">Body Small — Supporting text</Text>
          <Text className="text-caption text-text-secondary">Caption — Labels, meta text</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
```

- [ ] **Step 2: Run the app and visually verify**

```bash
npx expo start --ios
```

Open on simulator/device. Expected:
- Screen background is white
- H1 "Design System" renders at ~32px in Poppins Bold, dark navy color
- Color swatches show purple, blue, green, orange, red, light gray
- Each typography row uses the correct Poppins weight and size
- No "font not found" warnings in Metro console

If fonts appear as system default (not Poppins), check that TTF files exist in `assets/fonts/` and the keys in `useFonts` match the font-family names in `global.css`.

- [ ] **Step 3: Commit**

```bash
git add src/app/index.tsx
git commit -m "feat: add design system smoke test preview to index screen"
```

---

## Self-Review Checklist

- [x] **Spec coverage:** All 4 spec sections covered — font files (Task 1), `constants/theme.ts` (Task 2), `global.css @theme` (Task 3), `_layout.tsx` font loading (Task 4)
- [x] **Placeholder scan:** No TBD/TODO in plan. All code blocks are complete.
- [x] **Type consistency:** `fontFamily` string values in `theme.ts` (`"Poppins-Bold"`) exactly match the keys used in `useFonts` in `_layout.tsx` and the `font-family` values in `global.css` utilities.
- [x] **Font weight / RN constraint:** Using separate font files per weight (not `fontWeight` CSS property) — correct for React Native.
- [x] **Line heights:** All computed in pixels (RN requirement), not multipliers.
- [x] **Style exceptions:** `SafeAreaView` in Task 5 uses inline `style={{ flex: 1, backgroundColor: "#FFFFFF" }}` per AGENTS.md rules.
