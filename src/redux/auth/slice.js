import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { login, logout, refreshUser, register } from "./operations.js";

const INITIAL_STATE = {
  token: null,
  user: null,
  isLoggedIn: false,
  isRefreshing: false,
  isLoading: false,
  isError: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  extraReducers: (builder) =>
    builder
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(logout.fulfilled, () => {
        return INITIAL_STATE;
      })
      .addMatcher(
        isAnyOf(
          register.pending,
          login.pending,
          refreshUser.pending,
          logout.pending,
        ),
        (state) => {
          state.isLoading = true;
          state.isError = false;
          state.error = null;
        },
      )
      .addMatcher(
        isAnyOf(
          register.rejected,
          login.rejected,
          refreshUser.rejected,
          logout.rejected,
        ),
        (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.error = action.payload;
        },
      )
      .addMatcher(
        isAnyOf(register.fulfilled, login.fulfilled),
        (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isLoggedIn = true;
          state.error = null;
          state.user = action.payload.user;
          state.token = action.payload.token;
        },
      ),
});

export const authReducer = authSlice.reducer;
