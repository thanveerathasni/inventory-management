import type { AuthenticatedUser, LoginRequest } from '../../services/api';

export type LoginCredentials = LoginRequest;
export type LoginFormValues = LoginRequest;

export interface AuthState {
  readonly accessToken: string | null;
  readonly error: string | null;
  readonly isAuthenticated: boolean;
  readonly isLoading: boolean;
  readonly user: AuthenticatedUser | null;
}
