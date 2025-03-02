import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import {RootState} from '@redux/store';
import {removeUserSession} from '@redux/auth/authSlice';
import {SPOTIFY_URLS} from '@constants/index';

import {
  SpotifyCurrentTrackResponse,
  SpotifyProfileResponse,
  SpotifyRecentTrackParams,
  SpotifyRecentTrackResponse,
} from './types';

const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: SPOTIFY_URLS.BASE,
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
    getSpotifyProfile: builder.query<SpotifyProfileResponse, void>({
      query: () => ({url: SPOTIFY_URLS.PROFILE}),
    }),
    getCurrentTrack: builder.query<SpotifyCurrentTrackResponse, void>({
      query: () => ({url: SPOTIFY_URLS.CURRENT_TRACK}),
    }),
    getRecentTracks: builder.query<
      SpotifyRecentTrackResponse,
      SpotifyRecentTrackParams
    >({
      query: params => ({
        url: SPOTIFY_URLS.RECENT_TRACKS,
        params,
      }),
    }),
  }),
});

export const {
  useGetSpotifyProfileQuery,
  useGetCurrentTrackQuery,
  useGetRecentTracksQuery,
} = spotifyApi;
