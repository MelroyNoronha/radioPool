import { useMemo } from 'react';
import { StyleSheet, View, Platform } from 'react-native';

import { Button, TextInput, PressableText, Text } from '@/components';
import { spacings, ThemeValues } from '@/theme';
import useKeyboardHeight from '@/hooks/useKeyboardHeight';
import useEmail from '@/screens/Auth/hooks/useEmailInput';
import usePasswordInput from '@/screens/Auth/hooks/usePasswordInput';
import useSignUp from '@/screens/Auth/hooks/useSignUp';

interface FormProps {
  currentTheme?: ThemeValues;
}

const Form = ({}: FormProps) => {
  const [
    email,
    emailError,
    validateEmail,
    handleEmailInputChange,
    handleEmailInputBlur,
  ] = useEmail();

  const [password, passwordError, validatePassword, handlePasswordInputChange] =
    usePasswordInput();

  const [handleSignUpPress, isLoading] = useSignUp(
    email,
    password,
    validateEmail,
    validatePassword,
    emailError,
    passwordError,
  );

  const keyboardHeight = useKeyboardHeight();
  const styles = useMemo(() => getStyles(keyboardHeight), [keyboardHeight]);

  const handleLogInPress = () => {};

  return (
    <View style={styles.container}>
      <TextInput
        label="Email"
        placeholder="radio.pooler@email.com"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={handleEmailInputChange}
        onBlur={handleEmailInputBlur}
        error={emailError}
        editable={!isLoading}
      />
      <TextInput
        label="Password"
        placeholder="******"
        secureTextEntry
        autoCapitalize="none"
        value={password}
        onChangeText={handlePasswordInputChange}
        error={passwordError}
      />

      <View style={styles.buttonContainer}>
        <Text size="small">New here?</Text>
        <Button
          label="Sign Up"
          onPress={handleSignUpPress}
          isLoading={isLoading}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Text size="small">Already have an account?</Text>
        <Button label="Log In" onPress={handleLogInPress} />
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
