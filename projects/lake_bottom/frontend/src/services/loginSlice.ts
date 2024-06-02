// TODO - REMOVE MODULE IF UNUSED
import { createSlice } from "@reduxjs/toolkit"

export interface LoginState {
  isLoggedIn?: boolean
}

export const isLoggedIn = (): boolean => {
  const tokens = localStorage.getItem("auth-tokens-development") // TODO value name?
  if (tokens) return true
  return false
}

const initialState: LoginState = {
  isLoggedIn: isLoggedIn(),
}

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logIn: (state) => {
      state.isLoggedIn = isLoggedIn()
    },
    logOut: (state) => {
      state.isLoggedIn = isLoggedIn()
    },
  },
})

export const { logIn, logOut } = loginSlice.actions

export default loginSlice
