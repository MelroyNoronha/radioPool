import React, {useCallback} from 'react';
import {View, Text, Button, StyleSheet, Image} from 'react-native';
import {useDispatch} from 'react-redux';

import {removeUserSession} from '@redux/auth/authSlice';
import {
  useGetSpotifyProfileQuery,
  useGetCurrentTrackQuery,
  useGetRecentTracksQuery,
} from '@services/spotifyApi';

export default () => {
  const dispatch = useDispatch();

  const {
    data: spotifyProfile,
    isLoading: isLoadingProfile,
    isError: isErrorProfile,
  } = useGetSpotifyProfileQuery();

  const {
    data: currentTrack,
    isLoading: isCurrentTrackLoading,
    isError: isErrorCurrentTrack,
  } = useGetCurrentTrackQuery(undefined, {pollingInterval: 5000});

  const {
    data: recentTracks,
    isLoading: isRecentTracksLoading,
    isError: isErrorRecentTracks,
  } = useGetRecentTracksQuery({limit: 1}, {pollingInterval: 5000});

  const isLoading =
    isLoadingProfile || isCurrentTrackLoading || isRecentTracksLoading;

  const isError = isErrorProfile || isErrorCurrentTrack || isErrorRecentTracks;

  const trackName =
    currentTrack?.item?.name ||
    recentTracks?.items[0]?.track?.name ||
    'No track found';

  const imageSource =
    currentTrack?.item?.album?.images[1]?.url ||
    recentTracks?.items[0]?.track?.album?.images[1]?.url;

  const artistName =
    currentTrack?.item?.album?.artists?.map(artist => artist.name).join(', ') ||
    recentTracks?.items[0]?.track?.artists
      .map(artist => artist.name)
      .join(', ');

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

  if (isError) {
    return (
      <View style={styles.container}>
        <Text>Something went wrong :/</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Welcome {spotifyProfile?.display_name}!</Text>

      <Image source={{uri: imageSource}} style={styles.image} />

      <Text>{trackName}</Text>
      <Text>{artistName}</Text>
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
  image: {
    width: 200,
    height: 200,
  },
});
