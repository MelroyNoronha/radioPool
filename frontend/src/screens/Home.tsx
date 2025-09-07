import React, { useEffect } from 'react';
import { SafeAreaView, Text } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';

export default () => {
  useEffect(() => {
    RNBootSplash.hide({ fade: true });
  }, []);

  return (
    <SafeAreaView>
      <Text>Welcome to radioPool</Text>
    </SafeAreaView>
  );
};
