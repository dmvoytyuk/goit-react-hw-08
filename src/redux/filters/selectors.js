import { createSelector } from "@reduxjs/toolkit";
import { selectContacts } from "../contacts/selectors.js";

export const selectNameFilter = (state) => state.filters.name;
export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, filter) => {
    if (contacts) {
      return contacts.filter((contact) => {
        return contact.name.toLowerCase().includes(filter.toLowerCase());
      });
    }
  },
);
