import { createContext, useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import {
  clearStorage,
  getRefreshToken,
  getToken,
  setAuthTokens,
} from "./storage";
import fetch, { BASE_URL } from "./fetch";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logout = useCallback(() => {
    clearStorage();
    setIsAuthenticated(false);
    router.replace("/");
  }, [router]);

  useEffect(() => {
    const updateAuthState = () => setIsAuthenticated(Boolean(getToken()));
    updateAuthState();
    window.addEventListener("authchange", updateAuthState);
    window.addEventListener("storage", updateAuthState);

    let refreshRequest;
    const interceptorId = fetch.interceptors.response.use(
      (response) => response,
      async (error) => {
        const request = error.config;
        const status = error.response?.status;
        const message = error.response?.data?.message || "";
        const tokenExpired =
          status === 401 ||
          (status === 400 && /token expired/i.test(message));
        const isRefreshRequest = request?.url?.includes("/refresh-token");

        if (!request || !tokenExpired || request._retry || isRefreshRequest) {
          return Promise.reject(error);
        }

        request._retry = true;
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
          logout();
          return Promise.reject(error);
        }

        try {
          if (!refreshRequest) {
            refreshRequest = axios
              .post(`${BASE_URL}/user/refresh-token`, { refreshToken })
              .then(({ data }) => {
                if (data.statusCode !== 201 || !data.data?.token) {
                  throw new Error(data.message || "Unable to refresh session");
                }
                setAuthTokens(data.data);
                return data.data.token;
              })
              .finally(() => {
                refreshRequest = null;
              });
          }

          const newToken = await refreshRequest;
          request.headers = request.headers || {};
          request.headers.Authorization = `Bearer ${newToken}`;
          return fetch(request);
        } catch (refreshError) {
          if (refreshError.response?.status === 401) logout();
          return Promise.reject(refreshError);
        }
      },
    );

    return () => {
      window.removeEventListener("authchange", updateAuthState);
      window.removeEventListener("storage", updateAuthState);
      fetch.interceptors.response.eject(interceptorId);
    };
  }, [logout]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
