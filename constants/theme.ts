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
