import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import {
  isLoggedIn,
  setAuthTokens,
  clearAuthTokens,
  getAccessToken,
  getRefreshToken,
} from "axios-jwt"
import { axiosInstance } from "./loginApi"
export interface LoginState {
  isLoggedIn: boolean
  userId?: string
  access?: string
  refresh?: string
}

const initialState: LoginState = {
  isLoggedIn: false,
  userId: undefined,
  refresh: undefined,
  access: undefined,
}

const handleLoginAndToken = async (username: string, password: string) => {
  const response = await axiosInstance.post("/api/token/", {
    username: username,
    password: password,
  })
  setAuthTokens({
    accessToken: response.data.access,
    refreshToken: response.data.refresh,
  })
  console.log(
    `access: ${response.data.access} \n refresh: ${response.data.refresh}`,
  )
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
      state.isLoggedIn = true
      state.userId = action.payload.username
    },
    logOut: (state) => {
      clearAuthTokens()
      state = initialState
    },
  },
})

export const { logIn, logOut } = loginSlice.actions
export default loginSlice
