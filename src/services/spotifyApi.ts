import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import {RootState} from '../redux/store';
import {removeUserSession} from '../redux/auth/authSlice';
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
  }),
});

export const {useGetSpotifyProfileQuery} = spotifyApi;
