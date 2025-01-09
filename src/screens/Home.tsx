import React, {useCallback} from 'react';
import {View, Text, Button, StyleSheet, Image} from 'react-native';
import {useDispatch} from 'react-redux';

import {removeUserSession} from '@redux/auth/authSlice';
import {
  useGetSpotifyProfileQuery,
  useGetCurrentTrackQuery,
} from '@services/spotifyApi';

export default () => {
  const dispatch = useDispatch();

  const {data: spotifyProfile, isLoading: isLoadingProfile} =
    useGetSpotifyProfileQuery();
  const {data: currentTrack, isLoading: isCurrentTrackLoading} =
    useGetCurrentTrackQuery(undefined, {pollingInterval: 1000});

  const isLoading = isLoadingProfile || isCurrentTrackLoading;

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

      <Image
        source={{uri: currentTrack?.item?.album.images[1].url}}
        style={{
          width: currentTrack?.item?.album.images[1].width,
          height: currentTrack?.item?.album.images[1].height,
        }}
      />

      <Text>Current Track: {currentTrack?.item?.name}</Text>
      <Text>
        {currentTrack?.item?.artists.map(artist => artist.name).join(', ')}
      </Text>
      <Button title="Log Out" onPress={logOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
