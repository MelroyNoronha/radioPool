import { Pressable, PressableProps, StyleSheet } from 'react-native';

import { colors, fontSizes, spacings, ThemeValues } from '@/theme';
import { Text } from '@/components';

interface ButtonProps extends PressableProps {
  label: string;
  currentTheme?: ThemeValues;
}

const Button = ({
  label,
  currentTheme = ThemeValues.light,
  ...otherProps
}: ButtonProps) => {
  const styles = getStyles(currentTheme);

  return (
    <Pressable aria-label={label} style={styles.container} {...otherProps}>
      <Text color="button">{label}</Text>
    </Pressable>
  );
};

const getStyles = (currentTheme: ThemeValues) => {
  return StyleSheet.create({
    container: {
      width: '100%',
      backgroundColor: colors[currentTheme].primary,
      padding: spacings.small,
      borderRadius: fontSizes.large,
      alignItems: 'center',
    },
  });
};

export default Button;
