/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "../../redux/auth/selectors.js";
import { deleteContact } from "../../redux/contacts/operations.js";
import {
  selectDeletingContactId,
  selectIsDeleting,
} from "../../redux/contacts/selectors.js";
import { setDeletingContactId } from "../../redux/contacts/slice.js";
import Loader from "../Loader/Loader.jsx";
import styles from "./Contact.module.css";

const Contact = ({ contact }) => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const isDeleting = useSelector(selectIsDeleting);
  const deletingContactId = useSelector(selectDeletingContactId);

  const onDelete = () => {
    const data = {
      token: token,
      contactId: contact.id,
    };
    dispatch(setDeletingContactId(contact.id));
    dispatch(deleteContact(data));
  };

  return (
    <li className={styles.contact}>
      <div>
        <p>{contact.name}</p>
        <p>{contact.number}</p>
      </div>
      {!isDeleting || deletingContactId !== contact.id ? (
        <button onClick={onDelete}>Delete</button>
      ) : (
        deletingContactId === contact.id && <Loader color="#2F699E" />
      )}
    </li>
  );
};

export default Contact;
