import React, { useEffect, useMemo, useRef } from 'react';
import {
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  StatusBar,
} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';

import { colors, ThemeValues } from '@/theme';
import useKeyboardHeight from '@/hooks/useKeyboardHeight';
import Form from '@/screens/Auth/components/Form';
import { Text } from '@/components';

interface AuthProps {
  currentTheme?: ThemeValues;
}

const Auth = ({ currentTheme = ThemeValues.light }: AuthProps) => {
  const keyboardHeight = useKeyboardHeight();
  const scrollViewRef = useRef<ScrollView>(null);
  const screenHeight = Dimensions.get('screen').height;

  const styles = useMemo(
    () => getStyles(currentTheme, screenHeight),
    [currentTheme, screenHeight],
  );

  useEffect(() => {
    RNBootSplash.hide({ fade: true });
  }, []);

  useEffect(() => {
    if (keyboardHeight > 0) {
      scrollViewRef.current?.scrollToEnd();
    }
  }, [keyboardHeight]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors[currentTheme].background}
      />
      <ScrollView ref={scrollViewRef}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.image}
          />
          <Text size="large">radioPool</Text>
        </View>
        <Form />
      </ScrollView>
    </SafeAreaView>
  );
};

const getStyles = (currentTheme: ThemeValues, screenHeight: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors[currentTheme].background,
      justifyContent: 'space-between',
    },
    imageContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      height: screenHeight * 0.4, // occupy 40% of the screen height
    },
    image: {
      height: screenHeight * 0.1, // 10% of the screen height
      width: screenHeight * 0.1,
    },
  });

export default Auth;
