import { lakebottomApi } from "./services/lakebottomApi"
import { loginSlice } from "./services/loginSlice"
import { configureStore } from "@reduxjs/toolkit"
import { useDispatch, useSelector } from "react-redux"
import { setupListeners } from "@reduxjs/toolkit/query"

export const store = configureStore({
  reducer: {
    [lakebottomApi.reducerPath]: lakebottomApi.reducer,
    login: loginSlice.reducer,
  },
  middleware: (getDefaultMidddleware) =>
    getDefaultMidddleware().concat(lakebottomApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export const useTypedSelector = useSelector.withTypes<RootState>()
export type Dispatch = typeof store.dispatch
export const useTypedDispatch = useDispatch.withTypes<Dispatch>()
