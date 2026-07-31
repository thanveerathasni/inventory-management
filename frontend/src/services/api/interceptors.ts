import type {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import toast from "react-hot-toast";

import { getApiErrorMessage } from "../../features/auth/auth.utils";

import type { Store } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";

let injectedStore: Store<RootState> | null = null;

export const injectStore = (store: Store<RootState>): void => {
  injectedStore = store;
};

export const configureApiInterceptors = (client: AxiosInstance): void => {
  client.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
      if (injectedStore) {
        const token = injectedStore.getState().auth.accessToken;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    },
    (error: AxiosError): Promise<never> => Promise.reject(error),
  );
  client.interceptors.response.use(
    <T>(response: AxiosResponse<T>): AxiosResponse<T> => response,
    (error: AxiosError): Promise<never> => {
      const message = getApiErrorMessage(error);
      
      // Do not toast for 401s since they are often handled gracefully, unless they are login attempts
      // We will toast generic 500s or unexpected errors
      if (error.response?.status !== 401) {
        toast.error(message);
      }
      return Promise.reject(error);
    },
  );
};
