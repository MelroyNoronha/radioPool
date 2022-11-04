import React, {useEffect, useState} from 'react';
import {SafeAreaView, Button, Text, Image, View} from 'react-native';
import {Auth0Provider, useAuth0} from 'react-native-auth0';
import {AUTH0_DOMAIN, AUTH0_CLIENT_ID} from 'react-native-dotenv';

const Home = () => {
  const {authorize, clearSession, user} = useAuth0();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (user) {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }
  }, [user]);

  const startLogin = async () => {
    try {
      await authorize();
    } catch (err) {
      console.log(err);
    }
  };

  const startLogout = async () => {
    try {
      await clearSession();
    } catch (err) {
      console.log(err);
    }
  };

  const UserProfile = ({username, imageUri}) => {
    return (
      <View style={{alignItems: 'center'}}>
        <Image source={{uri: imageUri}} style={{height: 100, width: 100}} />
        <Text>{username}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView>
      {!isAuthorized && <Button onPress={startLogin} title="Log In" />}
      {isAuthorized && <Button onPress={startLogout} title="Log Out" />}
      {user && <UserProfile username={user.name} imageUri={user.picture} />}
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
