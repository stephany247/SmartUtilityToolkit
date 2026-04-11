export const colors = {
  bg: '#0F0F12',
  surface: '#18181D',
  surface2: '#22222A',
  border: 'rgba(255,255,255,0.07)',
  border2: 'rgba(255,255,255,0.12)',
  text: '#F0EFF4',
  text2: '#9897A4',
  text3: '#5A5965',
  accent: '#7C6FFF',
  accent2: '#B8AFFF',
  accentGlow: 'rgba(124,111,255,0.18)',
  green: '#34C98A',
  greenBg: 'rgba(52,201,138,0.1)',
  greenBorder: 'rgba(52,201,138,0.2)',
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
    fontWeight: '600' as const,
    letterSpacing: -0.5,
    color: colors.text,
  },
  subheading: {
    fontSize: 14,
    fontWeight: '300' as const,
    color: colors.text2,
  },
  label: {
    fontSize: 11,
    fontWeight: '500' as const,
    color: colors.text3,
    letterSpacing: 1,
    textTransform: 'uppercase' as const,
  },
  input: {
    fontSize: 28,
    fontWeight: '500' as const,
    color: colors.text,
  },
  body: {
    fontSize: 14,
    fontWeight: '400' as const,
    color: colors.text,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
    color: colors.text2,
  },
};
