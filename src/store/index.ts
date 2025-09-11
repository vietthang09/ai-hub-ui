import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./authSlice";

// Chỉ định những key nào trong slice 'auth' được persist
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["authUser", "userInfo"],
};

// Kết hợp reducer, bọc slice 'auth' bằng persistReducer
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
});

// Persist tổng thể, có thể whitelist chính 'auth'
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Bắt buộc ignore các action nội bộ của redux-persist
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Persistor để gate rehydration
export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
