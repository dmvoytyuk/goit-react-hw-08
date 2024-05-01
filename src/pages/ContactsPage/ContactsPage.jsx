import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import ContactForm from "../../components/ContactForm/ContactForm.jsx";
import ContactList from "../../components/ContactList/ContactList.jsx";
import SearchBox from "../../components/SearchBox/SearchBox.jsx";
import {
  selectIsError,
  selectSuccessfullyAdded,
  selectSuccessfullyDeleted,
} from "../../redux/contacts/selectors.js";
import {
  setSuccessfullyAdded,
  setSuccessfullyDeleted,
} from "../../redux/contacts/slice.js";

import styles from "./ContactsPage.module.css";

const ContactsPage = () => {
  const dispatch = useDispatch();
  const isError = useSelector(selectIsError);
  const successfullyDeleted = useSelector(selectSuccessfullyDeleted);
  const successfullyAdded = useSelector(selectSuccessfullyAdded);

  useEffect(() => {
    if (successfullyDeleted) {
      toast.success("Contact successfully deleted!");
      dispatch(setSuccessfullyDeleted(false));
    }
    if (successfullyAdded) {
      toast.success("New contact successfully added!");
      dispatch(setSuccessfullyAdded(false));
    }
  }, [dispatch, successfullyDeleted, successfullyAdded]);

  useEffect(() => {
    if (isError) {
      toast.error("Something went wrong, try again!");
    }
  }, [isError]);

  return (
    <div className={styles.contactsPage}>
      <div className={styles.contactsPageForms}>
        <SearchBox />
        <ContactForm />
      </div>
      <ContactList />
      <Toaster />
    </div>
  );
};

export default ContactsPage;
