import { buildGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";
import { lakebottomApi } from "./services/lakebottomApi";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    [lakebottomApi.reducerPath]: lakebottomApi.reducer,
  },
  middleware: (getDefaultMidddleware) =>
    getDefaultMidddleware().concat(lakebottomApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type Dispatch = typeof store.dispatch;
