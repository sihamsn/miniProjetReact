import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import demandReducer from './demandSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    demands: demandReducer,
  },
});
export default store;
