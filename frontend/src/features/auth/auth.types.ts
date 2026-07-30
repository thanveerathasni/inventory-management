import type { AuthenticatedUser, LoginRequest, RegisterRequest } from "../../services/api";

export type LoginCredentials = LoginRequest;
export type LoginFormValues = LoginRequest;
export type RegisterCredentials = RegisterRequest;
export type RegisterFormValues = RegisterSchema; 

// We need to import RegisterSchema but avoid circular dependency or just type it as the z.infer
import type { RegisterSchema } from "./auth.validation";

export interface AuthState {
  readonly accessToken: string | null;
  readonly error: string | null;
  readonly isAuthenticated: boolean;
  readonly isLoading: boolean;
  readonly isSessionRestoring: boolean;
  readonly user: AuthenticatedUser | null;
}
