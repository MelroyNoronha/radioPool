import React, {useState} from 'react';
import {SafeAreaView, Button} from 'react-native';
import {Auth0Provider, useAuth0} from 'react-native-auth0';
import {AUTH0_DOMAIN, AUTH0_CLIENT_ID} from 'react-native-dotenv';

const Home = () => {
  const {authorize, clearSession} = useAuth0();
  const [isAuthorized, setIsAuthorized] = useState(false);

  const startLogin = async () => {
    try {
      await authorize();
      setIsAuthorized(true);
    } catch (err) {
      console.log(err);
    }
  };

  const startLogout = async () => {
    try {
      await clearSession();
      setIsAuthorized(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView>
      {!isAuthorized && <Button onPress={startLogin} title="Log In" />}
      {isAuthorized && <Button onPress={startLogout} title="Log Out" />}
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
