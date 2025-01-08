import React, {useCallback} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';

import {removeUserSession} from '@redux/auth/authSlice';
import {useGetSpotifyProfileQuery} from '@services/spotifyApi';

export default () => {
  const dispatch = useDispatch();

  const {data: spotifyProfile, isLoading} = useGetSpotifyProfileQuery();

  const logOut = useCallback(() => {
    dispatch(removeUserSession());
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Welcome {spotifyProfile?.display_name}!</Text>
      <Button title="Log Out" onPress={logOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
