import {
  persistReducer,
  persistStore,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import * as localForage from "localforage";
import { appReducer } from "./appReducer.js";

const defaultMiddlewareOptions = {
  serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  },
};

const buildPersistedStore = () => {
  const persistedStore = configureStore({
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware(defaultMiddlewareOptions),
    reducer: persistReducer(
      {
        version: 1,
        key: "studygram",
        storage: localForage,
      },
      appReducer,
    ),
  });

  return { persistedStore, storePersistor: persistStore(persistedStore) };
};

export default buildPersistedStore();
