import React, { useEffect } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';

const App: React.FC = () => {
  useEffect(() => {
    setTimeout(() => {
      // check for auth token and navigate to auth or home
      RNBootSplash.hide({ fade: true });
    }, 2000);
  }, []);

  return (
    <SafeAreaView>
      <View>
        <Text>Welcome to radioPool!</Text>
      </View>
    </SafeAreaView>
  );
};

export default App;
