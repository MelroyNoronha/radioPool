import React from 'react';
import {View, Text, Button} from 'react-native';

import {useAppDispatch} from '../redux/hooks';
import {removeUserSession} from '../redux/auth/authSlice';

export default ({navigation}) => {
  const dispatch = useAppDispatch();

  const logOut = async () => {
    dispatch(removeUserSession());
    navigation.navigate('SignIn');
  };

  return (
    <View>
      <Text>Welcome Home</Text>
      <Button title="Log Out" onPress={logOut} />
    </View>
  );
};
