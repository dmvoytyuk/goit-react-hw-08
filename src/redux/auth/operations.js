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
      return thunkApi.rejectWithValue(e.code);
    }
  },
);

export const login = createAsyncThunk("auth/login", async (user, thunkApi) => {
  try {
    return await apiLoginUser(user);
  } catch (e) {
    return thunkApi.rejectWithValue(e.code);
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (token, thunkApi) => {
    try {
      return await apiRefreshUser(token);
    } catch (e) {
      return thunkApi.rejectWithValue(e.code);
    }
  },
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (token, thunkApi) => {
    try {
      return await apiLogout(token);
    } catch (e) {
      return thunkApi.rejectWithValue(e.code);
    }
  },
);
