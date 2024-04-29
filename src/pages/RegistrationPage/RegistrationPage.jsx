import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { register } from "../../redux/auth/operations.js";

import styles from "./RegistrationPage.module.css";

const INIT_USER_FORM = {
  userName: "",
  userEmail: "",
  userPassword: "",
};

const userValidationScheme = Yup.object({
  userName: Yup.string()
    .min(5, "Name too short")
    .max(20, "Name too long")
    .required("Required"),
  userEmail: Yup.string()
    .min(3, "Email too short")
    .max(50, "Email too long")
    .email("Not valid email address")
    .required("Required"),
  userPassword: Yup.string()
    .min(8, "Password too short")
    .max(20, "Password too long")
    .required("Required"),
});

const RegistrationPage = () => {
  const dispatch = useDispatch();
  const handleSubmit = (formValues, actions) => {
    const user = {
      name: formValues.userName,
      email: formValues.userEmail,
      password: formValues.userPassword,
    };

    dispatch(register(user));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={INIT_USER_FORM}
      validationSchema={userValidationScheme}
      onSubmit={handleSubmit}
    >
      <Form className={styles.registrationForm}>
        <label className={styles.registrationFormLabel}>
          {"Name"}
          <Field
            className={styles.registrationFormInput}
            type="text"
            name="userName"
          />
          <ErrorMessage
            className={styles.registrationFormError}
            component="p"
            name="userName"
          />
        </label>
        <label className={styles.registrationFormLabel}>
          {"Email"}
          <Field
            className={styles.registrationFormInput}
            type="email"
            name="userEmail"
          />
          <ErrorMessage
            className={styles.registrationFormError}
            component="p"
            name="userEmail"
          />
        </label>
        <label className={styles.registrationFormLabel}>
          {"Password"}
          <Field
            className={styles.registrationFormInput}
            type="password"
            name="userPassword"
          />
          <ErrorMessage
            className={styles.registrationFormError}
            component="p"
            name="userPassword"
          />
        </label>
        <button className={styles.registrationFormButton} type="submit">
          Register
        </button>
      </Form>
    </Formik>
  );
};

export default RegistrationPage;
