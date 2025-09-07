import { Pressable, PressableProps, StyleSheet } from 'react-native';

import { Text } from '@/components';
import { spacings, ThemeValues } from '@/theme';

interface PressableTextProps extends PressableProps {
  label: string;
  currentTheme?: ThemeValues;
}

const PressableText = ({ label, ...otherProps }: PressableTextProps) => {
  return (
    <Pressable aria-label={label} hitSlop={spacings.medium} {...otherProps}>
      <Text size="small" color="link" style={styles.label}>
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  label: {
    fontWeight: 'bold',
    padding: spacings.small,
  },
});

export default PressableText;
