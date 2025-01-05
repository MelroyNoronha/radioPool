import {combineReducers} from 'redux';

import authReducer from './auth/authSlice';
import {spotifyApi} from '../services/spotifyApi';

const reducers = combineReducers({
  auth: authReducer,
  [spotifyApi.reducerPath]: spotifyApi.reducer,
});

export default reducers;
