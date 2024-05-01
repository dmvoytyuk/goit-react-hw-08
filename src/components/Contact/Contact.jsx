import { useMemo } from "react";
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

  const randomBgColor = useMemo(() => {
    const bgcolors = [
      "#00AA55",
      "#009FD4",
      "#B381B3",
      "#939393",
      "#E3BC00",
      "#D47500",
      "#DC2A2A",
    ];
    return bgcolors[Math.floor(Math.random() * bgcolors.length)];
  }, []);
  let splitName;

  if (contact) {
    splitName = contact.name.split(" ");
  }
  let initials;
  if (splitName.length > 1) {
    initials = splitName[0][0] + splitName[1][0];
  } else {
    initials = splitName[0][0];
  }

  return (
    <li className={styles.contact}>
      <div className={styles.contactInfo}>
        <div
          style={{ backgroundColor: randomBgColor }}
          className={styles.contactAvatar}
        >
          {initials}
        </div>
        <div className={styles.contactData}>
          <h4>{contact.name}</h4>
          <p>{contact.number}</p>
        </div>
      </div>
      {/*<Loader />*/}
      {!isDeleting || deletingContactId !== contact.id ? (
        <button className={styles.contactButton} onClick={onDelete}>
          Delete
        </button>
      ) : (
        deletingContactId === contact.id && <Loader color="#2F699E" />
      )}
    </li>
  );
};

export default Contact;
