import {configureStore,combineReducers} from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import tweetSlice from "./tweetSlice";
import darkModeReducer from './darkModeReducer.js';

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
  import storage from 'redux-persist/lib/storage'
import appSlice from "./appSlice";
// import socketSlice from "./socketSlice.js";

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }

const rootReducer = combineReducers({
    user:userSlice,
    tweet:tweetSlice,
    // sokcet:socketSlice,
    darkMode: darkModeReducer,
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export default store;
