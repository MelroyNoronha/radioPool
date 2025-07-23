import { useMemo } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

import { Text } from '@/components';

const LogoWithText = () => {
  const screenHeight = Dimensions.get('screen').height;
  const styles = useMemo(() => getStyles(screenHeight), [screenHeight]);

  return (
    <View style={styles.imageContainer}>
      <Image
        source={require('../../../assets/logo.png')}
        style={styles.image}
      />
      <Text>
        <Text size="large">radio</Text>
        <Text size="large" color="link">
          Pool
        </Text>
      </Text>
    </View>
  );
};

const getStyles = (screenHeight: number) =>
  StyleSheet.create({
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

export default LogoWithText;
