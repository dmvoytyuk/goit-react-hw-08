export const selectContacts = (state) => state.contacts.contacts;
export const selectIsLoading = (state) => state.contacts.isLoading;
export const selectIsError = (state) => state.contacts.isError;
export const selectIsDeleting = (state) => state.contacts.isDeleting;
export const selectDeletingContactId = (state) =>
  state.contacts.deletingContactId;
