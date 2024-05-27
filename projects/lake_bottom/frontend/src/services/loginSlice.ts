import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { setAuthTokens, clearAuthTokens } from "axios-jwt"
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

const handleLoginAndToken = async (username: string, password: string) => {
  const response = await axiosInstance
    .post("/api/token/", {
      username: username,
      password: password,
    })
    .then((response) =>
      setAuthTokens({
        accessToken: response.data.access,
        refreshToken: response.data.refresh,
      }),
    )
    .catch(
      (err) => console.log(err),
      // TODO - Toast here?
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
      state.isLoggedIn = isLoggedIn()
      state.userId = action.payload.username
      // navigate('/')
    },
    logOut: (state) => {
      clearAuthTokens()
        .then()
        .finally(() => {
          state.isLoggedIn = isLoggedIn()
          state.userId = undefined
          // navigate('/')
        })
    },
  },
})

export const { logIn, logOut } = loginSlice.actions

export default loginSlice
