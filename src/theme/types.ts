export enum ThemeValues {
  light = 'light',
  dark = 'dark',
}

export interface ThemeColors {
  primary: string;
  text: {
    default: string;
    subtle: string;
    button: string;
    link: string;
  };
  background: string;
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
