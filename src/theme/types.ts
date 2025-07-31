export enum ThemeValues {
  light = 'light',
  dark = 'dark',
}

export interface ThemeColors {
  text: {
    default: string;
    subtle: string;
    button: string;
    link: string;
    error: string;
  };
  background: {
    default: string;
    button: string;
  };
  border: {
    default: string;
    error: string;
  };
}

export interface Theme {
  [ThemeValues.dark]: ThemeColors;
  [ThemeValues.light]: ThemeColors;
}

export interface FontSizes {
  small: number;
  medium: number;
  large: number;
}
