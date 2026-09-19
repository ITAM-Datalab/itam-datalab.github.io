/**
 * Tipos del tema editorial. Incluye tokens nuevos y alias del tema anterior.
 */
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      paper: string;
      paperElevated: string;
      ink: string;
      inkMuted: string;
      teal: string;
      tealDeep: string;
      accent: string;
      hairline: string;
      overlay: string;
      white: string;
      error: string;
      success: string;
      primary: string;
      secondary: string;
      accentLegacy: string;
      background: string;
      backgroundAlt: string;
      backgroundDark: string;
      text: string;
      textLight: string;
      textDark: string;
      textWhite: string;
      border: string;
      borderLight: string;
      borderDark: string;
      warning: string;
    };
    fonts: {
      primary: string;
      heading: string;
      mono: string;
    };
    fontSizes: {
      xs: string;
      sm: string;
      base: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
      '4xl': string;
      '5xl': string;
      '6xl': string;
    };
    fontWeights: {
      light: number;
      normal: number;
      medium: number;
      semibold: number;
      bold: number;
      extrabold: number;
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
      '4xl': string;
      '5xl': string;
    };
    borderRadius: {
      none: string;
      sm: string;
      base: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
      full: string;
    };
    shadows: {
      sm: string;
      base: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
      inner: string;
    };
    breakpoints: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
    };
    zIndex: {
      hide: number;
      auto: string;
      base: number;
      docked: number;
      dropdown: number;
      sticky: number;
      banner: number;
      overlay: number;
      modal: number;
      popover: number;
      skipLink: number;
      toast: number;
      tooltip: number;
    };
    transitions: {
      fast: string;
      base: string;
      slow: string;
      slower: string;
    };
  }
}
