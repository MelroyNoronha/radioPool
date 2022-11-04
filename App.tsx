import React from 'react';
import {SafeAreaView, Button} from 'react-native';
import {Auth0Provider, useAuth0} from 'react-native-auth0';
import {AUTH0_DOMAIN, AUTH0_CLIENT_ID} from 'react-native-dotenv';

const Home = () => {
  const {authorize} = useAuth0();

  const onPress = async () => {
    try {
      await authorize();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView>
      <Button onPress={onPress} title="Log in" />
    </SafeAreaView>
  );
};

const App: React.FC = () => {
  return (
    <Auth0Provider domain={AUTH0_DOMAIN} clientId={AUTH0_CLIENT_ID}>
      <Home />
    </Auth0Provider>
  );
};

export default App;
