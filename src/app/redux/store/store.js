import { combineReducers } from "@reduxjs/toolkit";
import { configureStore} from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import logger from 'redux-logger';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  userSlice: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
    if (process.env.NODE_ENV === 'development') {
      return middleware.concat(logger)
    }
    return middleware
  }
});

export const persistor = persistStore(store);
