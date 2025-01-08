import React from 'react';
import {SafeAreaView, Button} from 'react-native';
import {SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET} from '@env';
import {authorize} from 'react-native-app-auth';
import {useDispatch} from 'react-redux';

import {setUserSession} from '@redux/auth/authSlice';

export default () => {
  const dispatch = useDispatch();

  const signInToSpotify = async () => {
    const config = {
      clientId: SPOTIFY_CLIENT_ID,
      clientSecret: SPOTIFY_CLIENT_SECRET,
      redirectUrl: 'com.radiopool:/oauth', // the redirect you defined after creating the app
      scopes: [
        'user-read-email',
        'playlist-modify-public',
        'user-read-private',
      ], // the scopes you need to access
      serviceConfiguration: {
        authorizationEndpoint: 'https://accounts.spotify.com/authorize',
        tokenEndpoint: 'https://accounts.spotify.com/api/token',
      },
    };

    try {
      const authState = await authorize(config);
      const {accessToken, refreshToken} = authState;

      dispatch(setUserSession({accessToken, refreshToken}));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <SafeAreaView>
      <Button onPress={signInToSpotify} title={'Sign in to Spotify'} />
    </SafeAreaView>
  );
};
