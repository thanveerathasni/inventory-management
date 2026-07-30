import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { login, logout, register, type LoginResponse } from "../../services/api";

import type { AuthState, LoginCredentials, RegisterCredentials } from "./auth.types";
import { getApiErrorMessage } from "./auth.utils";

const createInitialState = (): AuthState => ({
  accessToken: null,
  error: null,
  isAuthenticated: false,
  isLoading: false,
  isSessionRestoring: true,
  user: null,
});

export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginCredentials,
  { rejectValue: string }
>("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const response = await login(credentials);

    if (!response._success || response._data === undefined) {
      return rejectWithValue(response._message);
    }

    return response._data;
  } catch (error: unknown) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

export const registerUser = createAsyncThunk<
  undefined,
  RegisterCredentials,
  { rejectValue: string }
>("auth/register", async (credentials, { rejectWithValue }) => {
  try {
    const response = await register(credentials);

    if (!response._success) {
      return rejectWithValue(response._message);
    }
  } catch (error: unknown) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await logout();

      if (!response._success) {
        return rejectWithValue(response._message);
      }
    } catch (error: unknown) {
      return rejectWithValue(getApiErrorMessage(error));
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: createInitialState(),
  reducers: {
    clearAuth: () => createInitialState(),
    initializeAuth: (state) => {
      state.isAuthenticated = state.accessToken !== null;
      state.isSessionRestoring = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.error = null;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload ?? action.error.message ?? null;
        state.isLoading = false;
      })
      .addCase(registerUser.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.error = null;
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload ?? action.error.message ?? null;
        state.isLoading = false;
      })
      .addCase(logoutUser.fulfilled, () => createInitialState());
  },
});

export const { clearAuth, initializeAuth } = authSlice.actions;
export const authReducer = authSlice.reducer;
