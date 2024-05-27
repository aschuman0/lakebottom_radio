import {
  IAuthTokens,
  TokenRefreshRequest,
  applyAuthTokenInterceptor,
  getBrowserLocalStorage,
  setAuthTokens,
} from "axios-jwt"
import axios from "axios"

export const axiosInstance = axios.create({ baseURL: "/" })
const requestRefresh: TokenRefreshRequest = async (
  refreshToken: string,
): Promise<IAuthTokens | string> => {
  const response = await axios.post("/api/token/refresh/", {
    refresh: refreshToken,
  })
  return response.data.access
}

const getStorage = getBrowserLocalStorage
applyAuthTokenInterceptor(axiosInstance, { requestRefresh, getStorage })

export const handleLoginAndToken = async (
  username: string,
  password: string,
) => {
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
