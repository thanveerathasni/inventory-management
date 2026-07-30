const API_BASE_PATH = "/api";
const AUTH_BASE_PATH = `${API_BASE_PATH}/auth`;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${AUTH_BASE_PATH}/login`,
    LOGOUT: `${AUTH_BASE_PATH}/logout`,
    REFRESH: `${AUTH_BASE_PATH}/refresh`,
    REGISTER: `${AUTH_BASE_PATH}/register`,
  },
} as const;
