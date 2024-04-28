import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "../../redux/auth/selectors.js";
import { getContacts } from "../../redux/contacts/operations.js";
import { selectContacts } from "../../redux/contacts/selectors.js";
import Contact from "../Contact/Contact.jsx";
import styles from "./ContactList.module.css";

const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  useEffect(() => {
    dispatch(getContacts(token));
  }, [dispatch, token]);

  return (
    <>
      {contacts && (
        <ul className={styles.contactList}>
          {contacts.map((contact) => {
            return <Contact key={contact.id} contact={contact} />;
          })}
        </ul>
      )}
    </>
  );
};

export default ContactList;
