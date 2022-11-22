import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../store';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useNavigation} from '@react-navigation/native';

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
      const {accessToken, refreshToken} = action.payload;
      const setInSecureStorage = async () => {
        try {
          await EncryptedStorage.setItem(
            'userSession',
            JSON.stringify({
              accessToken,
              refreshToken,
            }),
          );
        } catch (err) {
          console.error(err);
        }
      };
      setInSecureStorage();

      state.userSession = action.payload;
    },
    removeUserSession: state => {
      const removeFromSecureStorage = async () => {
        try {
          await EncryptedStorage.removeItem('user_session');
        } catch (err) {
          console.error(err);
        }
      };
      removeFromSecureStorage();

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
