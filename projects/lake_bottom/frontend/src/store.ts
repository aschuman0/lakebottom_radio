import { lakebottomApi } from "./services/lakebottomApi";
import { loginSlice } from "./services/loginSlice";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    [lakebottomApi.reducerPath]: lakebottomApi.reducer,
    login: loginSlice.reducer,
  },
  middleware: (getDefaultMidddleware) =>
    getDefaultMidddleware().concat(lakebottomApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type Dispatch = typeof store.dispatch;
export const useTypedDispatch = useDispatch.withTypes<Dispatch>();
