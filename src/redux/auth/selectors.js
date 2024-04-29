export const selectUserData = (state) => state.auth.user;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsError = (state) => state.auth.isError;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectError = (state) => state.auth.error;
export const selectToken = (state) => state.auth.token;
export const selectSuccessfullyLoggedIn = (state) =>
  state.auth.successfullyLoggedIn;
export const selectSuccessfullyRegistered = (state) =>
  state.auth.successfullyRegistered;
