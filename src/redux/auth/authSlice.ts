import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../store';

interface UserSession {
  accessToken: string;
  refreshToken: string;
}

interface AuthState {
  userSession: UserSession;
}

const initialState: AuthState = {
  userSession: {
    accessToken: '',
    refreshToken: '',
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserSession: (state, action: PayloadAction<UserSession>) => {
      state.userSession = action.payload;
    },
    removeUserSession: state => {
      state.userSession = {accessToken: '', refreshToken: ''};
    },
  },
});

export const {setUserSession, removeUserSession} = authSlice.actions;

export const selectUserSession = (state: RootState): UserSession =>
  state.auth.userSession;
export const selectAccessToken = (state: RootState): string =>
  state.auth.userSession.accessToken;
export const selectRefreshToken = (state: RootState): string =>
  state.auth.userSession.refreshToken;

export default authSlice.reducer;
