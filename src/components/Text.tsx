import {
  TextProps as DefaultTextProps,
  Text as DefaultText,
  StyleSheet,
} from 'react-native';

import { colors, fontSizes, ThemeValues } from '@/theme';
import type { FontSizes, ThemeColors } from '@/theme/types';

interface TextProps extends DefaultTextProps {
  children: React.ReactNode;
  size?: keyof FontSizes;
  color?: keyof ThemeColors['text'];
  currentTheme?: ThemeValues;
}

const Text = ({
  children,
  currentTheme = ThemeValues.light,
  size = 'medium',
  color = 'default',
  style,
  ...otherProps
}: TextProps) => {
  const styles = getStyles(size, color, currentTheme);

  return (
    <DefaultText
      style={StyleSheet.flatten([styles.text, style])}
      {...otherProps}
    >
      {children}
    </DefaultText>
  );
};

const getStyles = (
  size: keyof FontSizes,
  color: keyof ThemeColors['text'],
  currentTheme: ThemeValues,
) => {
  return StyleSheet.create({
    text: {
      fontSize: fontSizes[size],
      color: colors[currentTheme].text[color],
    },
  });
};

export default Text;
