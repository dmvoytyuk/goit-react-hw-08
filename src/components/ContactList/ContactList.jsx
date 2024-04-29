import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "../../redux/auth/selectors.js";
import { getContacts } from "../../redux/contacts/operations.js";
import { selectFilteredContacts } from "../../redux/filters/selectors.js";
import Contact from "../Contact/Contact.jsx";
import styles from "./ContactList.module.css";

const ContactList = () => {
  const contacts = useSelector(selectFilteredContacts);
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  useEffect(() => {
    dispatch(getContacts(token));
  }, [dispatch, token]);

  return (
    <>
      {contacts &&
        (contacts.length > 0 ? (
          <ul className={styles.contactList}>
            {contacts.map((contact) => {
              return <Contact key={contact.id} contact={contact} />;
            })}
          </ul>
        ) : (
          <p>No contacts were found, add some contact, or change filter</p>
        ))}
    </>
  );
};

export default ContactList;
