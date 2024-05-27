import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import {
  isLoggedIn as jwtLoggedIn,
  setAuthTokens,
  clearAuthTokens,
  getAccessToken,
  getRefreshToken,
} from "axios-jwt"
import { axiosInstance } from "./loginApi"
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

console.log(initialState)

const handleLoginAndToken = async (username: string, password: string) => {
  const response = await axiosInstance.post("/api/token/", {
    username: username,
    password: password,
  })
  setAuthTokens({
    accessToken: response.data.access,
    refreshToken: response.data.refresh,
  })
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
