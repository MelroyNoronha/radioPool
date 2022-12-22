import React from 'react';
import {View, Text, Button} from 'react-native';
import {useDispatch} from 'react-redux';

import {removeUserSession} from '../redux/auth/authSlice';

export default () => {
  const dispatch = useDispatch();

  const logOut = async () => {
    try {
      dispatch(removeUserSession());
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View>
      <Text>Welcome Home</Text>
      <Button title="Log Out" onPress={logOut} />
    </View>
  );
};
