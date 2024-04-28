import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "../../redux/auth/selectors.js";
import { addContact } from "../../redux/contacts/operations.js";
import { selectIsLoading } from "../../redux/contacts/selectors.js";
import Loader from "../Loader/Loader.jsx";

import styles from "./ContactForm.module.css";

const INIT_CONTACT_FORM = {
  contactName: "",
  contactNumber: "",
};

const contactValidationScheme = Yup.object({
  contactName: Yup.string()
    .min(3, "Too short")
    .max(50, "Too long")
    .required("Required"),
  contactNumber: Yup.string()
    .min(3, "Too short")
    .max(50, "Too long")
    .required("Required"),
});

const ContactForm = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const isLoading = useSelector(selectIsLoading);

  const handleSubmit = (formValues, actions) => {
    const newContact = {
      name: formValues.contactName,
      number: formValues.contactNumber,
    };
    dispatch(addContact({ token, newContact }));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={INIT_CONTACT_FORM}
      validationSchema={contactValidationScheme}
      onSubmit={handleSubmit}
    >
      <Form className={styles.contactForm}>
        <label className={styles.contactLabel}>
          {"Name"}
          <Field type="text" name="contactName" />
          <ErrorMessage
            className={styles.contactValidationError}
            component="p"
            name="contactName"
          />
        </label>
        <label className={styles.contactLabel}>
          {"Number"}
          <Field type="tel" name="contactNumber" />
          <ErrorMessage
            className={styles.contactValidationError}
            component="p"
            name="contactNumber"
          />
        </label>
        {!isLoading ? (
          <button type="submit">Add new contact</button>
        ) : (
          <Loader />
        )}
      </Form>
    </Formik>
  );
};

export default ContactForm;
