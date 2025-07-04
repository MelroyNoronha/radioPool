import React, { useEffect } from 'react';
import { Pressable, SafeAreaView, Text } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';

const Auth = () => {
  useEffect(() => {
    RNBootSplash.hide({ fade: true });
  }, []);

  return (
    <SafeAreaView>
      <Text>New here?</Text>
      <Pressable>
        <Text>Sign Up</Text>
      </Pressable>

      <Text>Already have an account?</Text>
      <Pressable>
        <Text>Log In</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Auth;
