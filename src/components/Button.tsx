import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleSheet,
} from 'react-native';

import { colors, fontSizes, spacings, ThemeValues } from '@/theme';
import { Text } from '@/components';

interface ButtonProps extends PressableProps {
  label: string;
  isLoading?: boolean;
  currentTheme?: ThemeValues;
}

const Button = ({
  label,
  currentTheme = ThemeValues.light,
  isLoading = false,
  ...otherProps
}: ButtonProps) => {
  const styles = getStyles(currentTheme);

  return (
    <Pressable aria-label={label} style={styles.container} {...otherProps}>
      {!isLoading && <Text color="button">{label}</Text>}
      {isLoading && <ActivityIndicator animating />}
    </Pressable>
  );
};

const getStyles = (currentTheme: ThemeValues) => {
  return StyleSheet.create({
    container: {
      width: '100%',
      backgroundColor: colors[currentTheme].background.button,
      padding: spacings.small,
      borderRadius: fontSizes.large,
      alignItems: 'center',
    },
  });
};

export default Button;
