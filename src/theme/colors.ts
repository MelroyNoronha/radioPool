import { ThemeValues, Theme } from './types';

const colors = {
  primary: '#5271ff',
  white: '#fffffa',
  black: '#0d1321',
  grey: '#bcccdc',
  red: '#ef2d56',
  green: '#0cce6b',
};

const theme: Theme = {
  [ThemeValues.dark]: {
    text: {
      default: colors.white,
      subtle: colors.grey,
      button: colors.white,
      link: colors.primary,
      error: colors.red,
    },
    background: {
      default: colors.black,
      button: colors.primary,
    },
    border: {
      default: colors.primary,
      error: colors.red,
    },
  },
  [ThemeValues.light]: {
    text: {
      default: colors.black,
      subtle: colors.grey,
      button: colors.white,
      link: colors.primary,
      error: colors.red,
    },
    background: {
      default: colors.white,
      button: colors.primary,
    },
    border: {
      default: colors.primary,
      error: colors.red,
    },
  },
};

export default theme;
