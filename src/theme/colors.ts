import { ThemeValues, Theme } from '@/theme';

const colors = {
  primary: '#5271ff',
  white: '#fff',
  black: '#000',
  grey: '#ddd',
};

const theme: Theme = {
  [ThemeValues.dark]: {
    text: {
      default: colors.white,
      subtle: colors.grey,
      button: colors.white,
      link: colors.primary,
    },
    background: colors.black,
    primary: colors.primary,
  },
  [ThemeValues.light]: {
    text: {
      default: colors.black,
      subtle: colors.grey,
      button: colors.white,
      link: colors.primary,
    },
    background: colors.white,
    primary: colors.primary,
  },
};

export default theme;
