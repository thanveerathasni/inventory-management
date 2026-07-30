import axios from 'axios';

import { configureApiInterceptors } from './interceptors';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

configureApiInterceptors(apiClient);
