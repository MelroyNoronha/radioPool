import authReducer from './auth/authSlice';
import {combineReducers} from 'redux';

const reducers = combineReducers({
  auth: authReducer,
});

export default reducers;
