import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

import UserSlice from "./UserSlice/UserSlider";
import NoteSlice from "./NoteSlice/NoteSlice";
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["user", "notes"],
};

const rootReducer = combineReducers({
  user: UserSlice,
  notes: NoteSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
