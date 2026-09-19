/**
 * Tokens visuales del rediseño editorial de DataLab.
 * Un acento (naranja) para CTAs. Teal como color de marca. Radio: 12px imagen, pill botón.
 */
const theme = {
  colors: {
    paper: '#F3F1EC',
    paperElevated: '#FFFEFA',
    ink: '#1B2428',
    inkMuted: '#5C6569',
    teal: '#2A6F6F',
    tealDeep: '#245F5F',
    accent: '#D9891A',
    hairline: '#D5D2C8',
    overlay: 'rgba(15, 24, 28, 0.52)',
    white: '#F7F6F2',
    error: '#B42318',
    success: '#2A6F6F',
    // Alias para no romper componentes que aún leen el tema viejo
    primary: '#2A6F6F',
    secondary: '#D9891A',
    accentLegacy: '#2A6F6F',
    background: '#F3F1EC',
    backgroundAlt: '#EBE8E1',
    backgroundDark: '#1B2428',
    text: '#1B2428',
    textLight: '#5C6569',
    textDark: '#1B2428',
    textWhite: '#F7F6F2',
    border: '#D5D2C8',
    borderLight: '#E6E3DB',
    borderDark: '#C4C0B6',
    warning: '#D9891A',
  },

  fonts: {
    primary:
      '"Outfit", "Avenir Next", "Segoe UI", sans-serif',
    heading:
      '"Outfit", "Avenir Next", "Segoe UI", sans-serif',
    mono: '"IBM Plex Mono", "Consolas", monospace',
  },

  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    md: '1.0625rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
  },

  fontWeights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '6rem',
    '5xl': '8rem',
  },

  borderRadius: {
    none: '0',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '0.75rem',
    '2xl': '0.75rem',
    '3xl': '0.75rem',
    full: '9999px',
  },

  shadows: {
    sm: '0 1px 2px rgba(27, 36, 40, 0.04)',
    base: '0 8px 24px rgba(27, 36, 40, 0.06)',
    md: '0 12px 32px rgba(27, 36, 40, 0.08)',
    lg: '0 16px 40px rgba(27, 36, 40, 0.1)',
    xl: '0 20px 48px rgba(27, 36, 40, 0.12)',
    '2xl': '0 24px 56px rgba(27, 36, 40, 0.14)',
    inner: 'inset 0 1px 0 rgba(255, 254, 250, 0.5)',
  },

  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  zIndex: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  },

  transitions: {
    fast: '180ms cubic-bezier(0.16, 1, 0.3, 1)',
    base: '280ms cubic-bezier(0.16, 1, 0.3, 1)',
    slow: '480ms cubic-bezier(0.16, 1, 0.3, 1)',
    slower: '700ms cubic-bezier(0.16, 1, 0.3, 1)',
  },
};

export default theme;
