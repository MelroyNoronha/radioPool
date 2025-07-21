import {
  TextInput as DefaultTextInput,
  TextInputProps as DefaultTextInputProps,
  View,
  StyleSheet,
} from 'react-native';

import { colors, fontSizes, spacings, ThemeValues } from '@/theme';
import { Text } from '@/components';

interface TextInput extends DefaultTextInputProps {
  label: string;
  currentTheme?: ThemeValues;
}

const TextInput = ({
  label,
  currentTheme = ThemeValues.light,
  style,
  ...otherProps
}: TextInput) => {
  const styles = getStyles(currentTheme);

  return (
    <View style={styles.container}>
      <Text size="small" nativeID={label}>
        {label}
      </Text>
      <DefaultTextInput
        aria-labelledby={label}
        style={StyleSheet.flatten([styles.textInput, style])}
        placeholderTextColor={colors[currentTheme].text.subtle}
        {...otherProps}
      />
    </View>
  );
};

const getStyles = (currentTheme: ThemeValues) => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    textInput: {
      paddingHorizontal: spacings.small,
      paddingVertical: spacings.small,
      borderBottomWidth: 1,
      borderBottomColor: colors[currentTheme].primary,
      fontSize: fontSizes.medium,
      color: colors[currentTheme].text.default,
    },
  });
};

export default TextInput;
