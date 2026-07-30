import { useSelector } from "react-redux";

import {
  selectCurrentUser,
  selectIsAuthenticated,
  selectIsAuthLoading,
  selectIsSessionRestoring,
} from "../features/auth";

export interface UseAuthResult {
  readonly isAuthenticated: boolean;
  readonly isLoading: boolean;
  readonly isSessionRestoring: boolean;
  readonly user: ReturnType<typeof selectCurrentUser>;
}

export const useAuth = (): UseAuthResult => ({
  isAuthenticated: useSelector(selectIsAuthenticated),
  isLoading: useSelector(selectIsAuthLoading),
  isSessionRestoring: useSelector(selectIsSessionRestoring),
  user: useSelector(selectCurrentUser),
});
