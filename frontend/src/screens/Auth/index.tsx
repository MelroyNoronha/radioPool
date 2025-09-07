import React, { useEffect, useMemo, useRef } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, StatusBar } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import { useNavigation } from '@react-navigation/native';

import { colors, ThemeValues } from '@/theme';
import useKeyboardHeight from '@/hooks/useKeyboardHeight';
import Form from '@/screens/Auth/components/Form';
import LogoWithText from './components/LogoWithText';
import { useIsAuthenticated } from '@/hooks/useAuth';

interface AuthProps {
  currentTheme?: ThemeValues;
}

const Auth = ({ currentTheme = ThemeValues.light }: AuthProps) => {
  const keyboardHeight = useKeyboardHeight();
  const scrollViewRef = useRef<ScrollView>(null);
  const styles = useMemo(() => getStyles(currentTheme), [currentTheme]);
  const { navigate } = useNavigation();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    RNBootSplash.hide({ fade: true });
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('Home');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (keyboardHeight > 0) {
      scrollViewRef.current?.scrollToEnd();
    }
  }, [keyboardHeight]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors[currentTheme].background.default}
      />
      <ScrollView ref={scrollViewRef}>
        <LogoWithText />
        <Form />
      </ScrollView>
    </SafeAreaView>
  );
};

const getStyles = (currentTheme: ThemeValues) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors[currentTheme].background.default,
      justifyContent: 'space-between',
    },
  });

export default Auth;
