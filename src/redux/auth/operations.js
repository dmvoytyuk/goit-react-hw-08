import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiLoginUser,
  apiLogout,
  apiRefreshUser,
  apiRegisterUser,
} from "../../utils/api.js";

export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkApi) => {
    try {
      return await apiRegisterUser(user);
    } catch (e) {
      if (e.response.data.message) {
        return thunkApi.rejectWithValue(
          e.response.data.errors.password.message,
        );
      } else if (e.response.data.code) {
        return thunkApi.rejectWithValue(
          `Email ${e.response.data.keyValue.email} already exists`,
        );
      } else {
        return thunkApi.rejectWithValue(
          "Something went wrong, please try again",
        );
      }
    }
  },
);

export const login = createAsyncThunk("auth/login", async (user, thunkApi) => {
  try {
    return await apiLoginUser(user);
  } catch (e) {
    if (e.response.status === 400) {
      return thunkApi.rejectWithValue("Wrong email or password");
    } else {
      return thunkApi.rejectWithValue("Something went wrong, please try again");
    }
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (token, thunkApi) => {
    try {
      return await apiRefreshUser(token);
    } catch (e) {
      return thunkApi.rejectWithValue(e.message);
    }
  },
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (token, thunkApi) => {
    try {
      return await apiLogout(token);
    } catch (e) {
      return thunkApi.rejectWithValue(e.message);
    }
  },
);
