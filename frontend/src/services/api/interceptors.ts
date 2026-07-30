import type {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import toast from "react-hot-toast";

import { getApiErrorMessage } from "../../features/auth/auth.utils";

export const configureApiInterceptors = (client: AxiosInstance): void => {
  client.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => config,
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
