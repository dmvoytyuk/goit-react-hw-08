import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { login } from "../redux/auth/operations.js";

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
      <Form>
        <label>
          {"Email"}
          <Field type="email" name="userEmail" />
          <ErrorMessage component="p" name="userEmail" />
        </label>
        <label>
          {"Password"}
          <Field type="password" name="userPassword" />
          <ErrorMessage component="p" name="userPassword" />
        </label>
        <button type="submit">Log In</button>
      </Form>
    </Formik>
  );
};

export default LoginPage;
