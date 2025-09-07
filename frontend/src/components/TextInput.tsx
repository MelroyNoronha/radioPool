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
  error?: string;
}

const TextInput = ({
  label,
  currentTheme = ThemeValues.light,
  style,
  error,
  ...otherProps
}: TextInput) => {
  const styles = getStyles(currentTheme, error);

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
      {error && (
        <Text size="small" color="error" style={styles.errorText}>
          {error}
        </Text>
      )}
    </View>
  );
};

const getStyles = (currentTheme: ThemeValues, error?: string) => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    textInput: {
      paddingHorizontal: spacings.small,
      paddingVertical: spacings.small,
      borderBottomWidth: 1,
      borderBottomColor: error
        ? colors[currentTheme].border.error
        : colors[currentTheme].border.default,
      fontSize: fontSizes.medium,
      color: colors[currentTheme].text.default,
    },
    errorText: {
      marginTop: spacings.small,
    },
  });
};

export default TextInput;
