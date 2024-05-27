import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { clearAuthTokens } from "axios-jwt"
import { handleLoginAndToken } from "./loginApi"
export interface LoginState {
  isLoggedIn?: boolean
  userId?: string
}

export const isLoggedIn = (): boolean => {
  const tokens = localStorage.getItem("auth-tokens-development") // TODO value name?
  if (tokens) return true
  return false
}

const initialState: LoginState = {
  isLoggedIn: isLoggedIn(),
  userId: undefined,
}

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logIn: (
      state,
      action: PayloadAction<{ username: string; password: string }>,
    ) => {
      handleLoginAndToken(action.payload.username, action.payload.password)
      state.isLoggedIn = isLoggedIn()
      state.userId = action.payload.username
    },
    logOut: (state) => {
      clearAuthTokens()
        .then()
        .finally(() => {
          state.isLoggedIn = isLoggedIn()
          state.userId = undefined
        })
    },
  },
})

export const { logIn, logOut } = loginSlice.actions

export default loginSlice
