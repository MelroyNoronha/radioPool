import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import {RootState} from '../redux/store';
import {SPOTIFY_API_BASE_URL, SPOTIFY_PROFILE_ENDPOINT} from '../constants';

interface SpotifyProfile {
  /**
   * almost all the fields from the Spotify ProfileAPI
   * Reference: https://developer.spotify.com/documentation/web-api/reference/get-current-users-profile
   * Optional fields are marked with a ? because we are not using them yet
   */
  country: string;
  display_name: string;
  email: string;
  explicit_content?: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  external_urls?: {
    spotify: string;
  };
  followers?: {
    href: string | null;
    total: number;
  };
  id: string;
  images?: [];
  product: 'premium' | 'free';
  type: 'user';
  uri: string;
}

export const spotifyApi = createApi({
  reducerPath: 'spotifyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: SPOTIFY_API_BASE_URL,
    prepareHeaders: (headers, {getState}) => {
      const token = (getState() as RootState).auth.userSession.accessToken;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    getSpotifyProfile: builder.query<SpotifyProfile, void>({
      query: () => ({url: SPOTIFY_PROFILE_ENDPOINT}),
    }),
  }),
});

export const {useGetSpotifyProfileQuery} = spotifyApi;
