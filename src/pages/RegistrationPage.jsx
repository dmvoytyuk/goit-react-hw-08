import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { register } from "../redux/auth/operations.js";

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

    console.log(user);
    dispatch(register(user));
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
          {"Name"}
          <Field type="text" name="userName" />
          <ErrorMessage component="p" name="userName" />
        </label>
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
        <button type="submit">Register</button>
      </Form>
    </Formik>
  );
};

export default RegistrationPage;
