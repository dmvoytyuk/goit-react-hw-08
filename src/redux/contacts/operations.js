import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiAddContact,
  apiDeleteContact,
  apiGetContacts,
} from "../../utils/api.js";

export const getContacts = createAsyncThunk(
  "contacts/get",
  async (token, thunkApi) => {
    try {
      return await apiGetContacts(token);
    } catch (e) {
      return thunkApi.rejectWithValue(e.message);
    }
  },
);

export const addContact = createAsyncThunk(
  "contacts/add",
  async ({ token, newContact }, thunkApi) => {
    try {
      return await apiAddContact(token, newContact);
    } catch (e) {
      return thunkApi.rejectWithValue(e.message);
    }
  },
);

export const deleteContact = createAsyncThunk(
  "contacts/delete",
  async ({ token, contactId }, thunkApi) => {
    try {
      return await apiDeleteContact(token, contactId);
    } catch (e) {
      return thunkApi.rejectWithValue(e.message);
    }
  },
);
