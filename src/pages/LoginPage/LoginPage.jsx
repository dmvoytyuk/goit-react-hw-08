import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { login } from "../../redux/auth/operations.js";

import styles from "./LoginPage.module.css";

const INIT_USER_FORM = {
  userEmail: "",
  userPassword: "",
};

const userValidationScheme = Yup.object({
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

const LoginPage = () => {
  const dispatch = useDispatch();

  const handleSubmit = (formValues, actions) => {
    const user = {
      email: formValues.userEmail,
      password: formValues.userPassword,
    };

    dispatch(login(user));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={INIT_USER_FORM}
      validationSchema={userValidationScheme}
      onSubmit={handleSubmit}
    >
      <Form className={styles.loginForm}>
        <label className={styles.loginFormLabel}>
          {"Email"}
          <Field
            className={styles.loginFormInput}
            type="email"
            name="userEmail"
          />
          <ErrorMessage
            className={styles.loginFormError}
            component="p"
            name="userEmail"
          />
        </label>
        <label className={styles.loginFormLabel}>
          {"Password"}
          <Field
            className={styles.loginFormInput}
            type="password"
            name="userPassword"
          />
          <ErrorMessage
            className={styles.loginFormError}
            component="p"
            name="userPassword"
          />
        </label>
        <button className={styles.loginFormButton} type="submit">
          Log In
        </button>
      </Form>
    </Formik>
  );
};

export default LoginPage;
