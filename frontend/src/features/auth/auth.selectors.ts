import type { RootState } from '../../store/store';

export const selectAuthState = (state: RootState) => state.auth;
export const selectAccessToken = (state: RootState) =>
  selectAuthState(state).accessToken;
export const selectAuthError = (state: RootState) =>
  selectAuthState(state).error;
export const selectIsAuthenticated = (state: RootState) =>
  selectAuthState(state).isAuthenticated;
export const selectIsAuthLoading = (state: RootState) =>
  selectAuthState(state).isLoading;
export const selectCurrentUser = (state: RootState) =>
  selectAuthState(state).user;
