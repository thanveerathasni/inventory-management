import type {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

export const configureApiInterceptors = (client: AxiosInstance): void => {
  client.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => config,
    (error: AxiosError): Promise<never> => Promise.reject(error),
  );
  client.interceptors.response.use(
    <T>(response: AxiosResponse<T>): AxiosResponse<T> => response,
    (error: AxiosError): Promise<never> => Promise.reject(error),
  );
};
