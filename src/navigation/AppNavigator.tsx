import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AuthStack from './AuthStack';
import AppStack from './AppStack';
import {selectUserSession} from '../redux/auth/authSlice';
import {useAppSelector} from '../redux/hooks';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const {accessToken} = useAppSelector(selectUserSession);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {accessToken ? (
          <Stack.Screen
            name="App"
            component={AppStack}
            options={{headerShown: false}}
          />
        ) : (
          <Stack.Screen
            name="Auth"
            component={AuthStack}
            options={{headerShown: false}}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
