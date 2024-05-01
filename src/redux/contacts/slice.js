import { createSlice } from "@reduxjs/toolkit";
import { logout } from "../auth/operations.js";
import { addContact, deleteContact, getContacts } from "./operations.js";

const INITIAL_STATE = {
  contacts: null,
  isLoading: false,
  isDeleting: false,
  deletingContactId: null,
  successfullyAdded: false,
  successfullyDeleted: false,
  isError: false,
};

// noinspection JSCheckFunctionSignatures
export const contactsSlice = createSlice({
  name: "contacts",
  initialState: INITIAL_STATE,
  reducers: {
    setDeletingContactId: (state, action) => {
      state.deletingContactId = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getContacts.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.successfullyDeleted = false;
        state.successfullyAdded = false;
      })
      .addCase(getContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.contacts = action.payload;
      })
      .addCase(getContacts.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(addContact.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.successfullyAdded = false;
        state.successfullyDeleted = false;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.successfullyAdded = true;
        state.contacts = [...state.contacts, action.payload];
      })
      .addCase(addContact.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(deleteContact.pending, (state) => {
        state.isLoading = false;
        state.isDeleting = true;
        state.isError = false;
        state.successfullyDeleted = false;
        state.successfullyAdded = false;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isDeleting = false;
        state.isError = false;
        state.successfullyDeleted = true;
        state.deletingContactId = null;
        state.contacts = state.contacts.filter(
          (contact) => contact.id !== action.payload.id,
        );
      })
      .addCase(deleteContact.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.contacts = null;
      }),
});

export const { setDeletingContactId } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
