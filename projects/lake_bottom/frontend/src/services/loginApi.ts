import {
  IAuthTokens,
  TokenRefreshRequest,
  applyAuthTokenInterceptor,
  getBrowserLocalStorage,
} from "axios-jwt";
import axios from "axios";

export const axiosInstance = axios.create({ baseURL: "/" });
const requestRefresh: TokenRefreshRequest = async (
  refreshToken: string,
): Promise<IAuthTokens | string> => {
  const response = await axios.post("/api/token/refresh/", {
    token: refreshToken,
  });
  return response.data.access;
};

const getStorage = getBrowserLocalStorage;
applyAuthTokenInterceptor(axiosInstance, { requestRefresh, getStorage });
