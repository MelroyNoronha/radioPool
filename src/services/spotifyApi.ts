import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import {RootState} from '@redux/store';
import {removeUserSession} from '@redux/auth/authSlice';
import {
  SPOTIFY_API_BASE_URL,
  SPOTIFY_PROFILE_ENDPOINT,
  SPOTIFY_CURRENT_TRACK_ENDPOINT,
} from '@constants/index';

import {SpotifyCurrentTrack, SpotifyProfile} from './types';

const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: SPOTIFY_API_BASE_URL,
  prepareHeaders: (headers, {getState}) => {
    const token = (getState() as RootState).auth.userSession.accessToken;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  const response = await baseQueryWithAuth(args, api, extraOptions);
  if (response.error && response.error.status === 401) {
    api.dispatch(removeUserSession());
  }
  // TODO: Add a refresh token logic here
  return response;
};

export const spotifyApi = createApi({
  reducerPath: 'spotifyApi',
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    getSpotifyProfile: builder.query<SpotifyProfile, void>({
      query: () => ({url: SPOTIFY_PROFILE_ENDPOINT}),
    }),
    getCurrentTrack: builder.query<SpotifyCurrentTrack, void>({
      query: () => ({url: SPOTIFY_CURRENT_TRACK_ENDPOINT}),
    }),
  }),
});

export const {useGetSpotifyProfileQuery, useGetCurrentTrackQuery} = spotifyApi;
