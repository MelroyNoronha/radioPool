import { StyleSheet, View, Platform } from 'react-native';

import { Button, TextInput, PressableText, Text } from '@/components';
import { spacings, ThemeValues } from '@/theme';
import useKeyboardHeight from '@/hooks/useKeyboardHeight';
import { useMemo } from 'react';

interface FormProps {
  currentTheme?: ThemeValues;
}

const Form = ({}: FormProps) => {
  const keyboardHeight = useKeyboardHeight();
  const styles = useMemo(() => getStyles(keyboardHeight), [keyboardHeight]);

  return (
    <View style={styles.container}>
      <TextInput
        label="Email"
        placeholder="radio.pooler@email.com"
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        placeholder="********"
        secureTextEntry
        autoCapitalize="none"
      />

      <View style={styles.buttonContainer}>
        <Text size="small">New here?</Text>
        <Button label="Sign Up" />
      </View>

      <View style={styles.buttonContainer}>
        <Text size="small">Already have an account?</Text>
        <Button label="Log In" />
        <PressableText label="Forgot Password?" />
      </View>
    </View>
  );
};

const getStyles = (keyboardHeight: number) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: spacings.large,
      rowGap: spacings.large,
      paddingBottom:
        // on iOS we need to offset the keyboard height when it opens
        keyboardHeight > 0 && Platform.OS === 'ios'
          ? keyboardHeight + spacings.medium
          : spacings.medium,
    },
    buttonContainer: {
      rowGap: spacings.small,
      alignItems: 'center',
    },
  });

export default Form;
