export const colors = {
  bg: "#000000", // true black
  surface: "#1C1C1E", // card background
  surface2: "#2C2C2E", // buttons / raised
  border: "rgba(255,255,255,0.08)",
  border2: "rgba(255,255,255,0.15)",

  text: "#FFFFFF", // primary text
  text2: "#8E8E93", // secondary (iOS gray)
  text3: "#636366", // subtle labels

  accent: "#FF9F0A", // 🍊 Apple orange
  accent2: "#FFD60A", // lighter orange/yellow
  accentGlow: "rgba(255,159,10,0.25)",

  green: "#30D158", // iOS green
  greenBg: "rgba(48,209,88,0.12)",
  greenBorder: "rgba(48,209,88,0.25)",
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
};

export const radius = {
  sm: 10,
  md: 14,
  lg: 18,
  full: 100,
};

export const typography = {
  heading: {
    fontSize: 26,
    fontWeight: "600" as const,
    letterSpacing: -0.5,
    color: colors.text,
  },
  subheading: {
    fontSize: 14,
    fontWeight: "300" as const,
    color: colors.text2,
  },
  label: {
    fontSize: 11,
    fontWeight: "500" as const,
    color: colors.text3,
    letterSpacing: 1,
    textTransform: "uppercase" as const,
  },
  input: {
    fontSize: 28,
    fontWeight: "500" as const,
    color: colors.text,
  },
  body: {
    fontSize: 14,
    fontWeight: "400" as const,
    color: colors.text,
  },
  caption: {
    fontSize: 12,
    fontWeight: "400" as const,
    color: colors.text2,
  },
};
