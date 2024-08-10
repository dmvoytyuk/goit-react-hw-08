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
	successfullyLoggedIn: false,
	successfullyRegistered: false,
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
				state.isRefreshing = false;
			})
			.addCase(logout.fulfilled, () => {
				return INITIAL_STATE;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.isLoggedIn = true;
				state.error = null;
				state.successfullyRegistered = true;
				state.successfullyLoggedIn = false;
				state.user = action.payload.user;
				state.token = action.payload.token;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.isLoggedIn = true;
				state.error = null;
				state.successfullyLoggedIn = true;
				state.successfullyRegistered = false;
				state.user = action.payload.user;
				state.token = action.payload.token;
			})
			.addCase(refreshUser.pending, (state) => {
				state.isLoading = false;
				state.isError = false;
				state.error = null;
				state.successfullyLoggedIn = false;
				state.successfullyRegistered = false;
				state.isRefreshing = true;
			})
			.addMatcher(
				isAnyOf(register.pending, login.pending, logout.pending),
				(state) => {
					state.isLoading = true;
					state.isError = false;
					state.error = null;
					state.successfullyLoggedIn = false;
					state.successfullyRegistered = false;
					state.isRefreshing = false;
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
					state.successfullyRegistered = false;
					state.successfullyLoggedIn = false;
					state.isRefreshing = false;
				},
			),
});

export const authReducer = authSlice.reducer;
