import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStaticNavigation } from '@react-navigation/native';

import Auth from '@/screens/Auth';
import Home from '@/screens/Home';
import { useIsAuthenticated, useIsNotAuthenticated } from '@/hooks/useAuth';

const RootStack = createNativeStackNavigator({
  screenOptions: {
    headerShown: false,
  },
  screens: {
    Auth: {
      if: useIsNotAuthenticated,
      screen: Auth,
    },
    Home: {
      if: useIsAuthenticated,
      screen: Home,
    },
  },
});

export default createStaticNavigation(RootStack);
