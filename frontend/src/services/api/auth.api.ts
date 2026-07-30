import { API_ENDPOINTS } from "../../constants/api";

import { apiClient } from "./axios";
import type { ApiResponse } from "./api.types";

export interface LoginRequest {
  readonly email: string;
  readonly password: string;
}

export interface RegisterRequest {
  readonly email: string;
  readonly name: string;
  readonly password: string;
}

export interface AuthenticatedUser {
  readonly _id: string;
  readonly email: string;
  readonly name: string;
}

export interface LoginResponse {
  readonly accessToken: string;
  readonly user: AuthenticatedUser;
}

export const login = async (
  payload: LoginRequest,
): Promise<ApiResponse<LoginResponse>> => {
  const response = await apiClient.post<ApiResponse<LoginResponse>>(
    API_ENDPOINTS.AUTH.LOGIN,
    payload,
  );

  return response.data;
};

export const logout = async (): Promise<ApiResponse<undefined>> => {
  const response = await apiClient.post<ApiResponse<undefined>>(
    API_ENDPOINTS.AUTH.LOGOUT,
  );

  return response.data;
};

export const register = async (
  payload: RegisterRequest,
): Promise<ApiResponse<AuthenticatedUser>> => {
  const response = await apiClient.post<ApiResponse<AuthenticatedUser>>(
    API_ENDPOINTS.AUTH.REGISTER,
    payload,
  );

  return response.data;
};
