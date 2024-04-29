import { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage.jsx";
import { refreshUser } from "../../redux/auth/operations.js";
import {
  selectError,
  selectIsError,
  selectSuccessfullyLoggedIn,
  selectSuccessfullyRegistered,
  selectToken,
} from "../../redux/auth/selectors.js";
import Layout from "../Layout/Layout.jsx";
import Loader from "../Loader/Loader.jsx";
import PrivateRoute from "../PrivateRoute/PrivateRoute.jsx";
import RestrictedRoute from "../RestrictedRoute/RestrictedRoute.jsx";
import toast, { Toaster } from "react-hot-toast";

const ContactsPage = lazy(
  () => import("../../pages/ContactsPage/ContactsPage.jsx"),
);
const LoginPage = lazy(() => import("../../pages/LoginPage/LoginPage.jsx"));
const NotFoundPage = lazy(() => import("../../pages/NotFoundPage.jsx"));
const RegistrationPage = lazy(
  () => import("../../pages/RegistrationPage/RegistrationPage.jsx"),
);

function App() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const successfullyLoggedIn = useSelector(selectSuccessfullyLoggedIn);
  const successfullyRegistered = useSelector(selectSuccessfullyRegistered);
  const isError = useSelector(selectIsError);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(refreshUser(token));
  }, [token, dispatch]);

  useEffect(() => {
    if (successfullyLoggedIn) {
      toast.success("Successfully logged in!");
    }
    if (successfullyRegistered) {
      toast.success("Successfully registered!");
    }
  }, [successfullyLoggedIn, successfullyRegistered]);

  useEffect(() => {
    if (isError) {
      if (error) {
        if (error.includes("401")) return;
      }
      toast.error(error);
    }
  }, [isError, error]);

  return (
    <>
      <Layout>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/register"
              element={
                <RestrictedRoute>
                  <RegistrationPage />
                </RestrictedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <RestrictedRoute>
                  <LoginPage />
                </RestrictedRoute>
              }
            />
            <Route
              path="/contacts"
              element={
                <PrivateRoute>
                  <ContactsPage />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Layout>
      <Toaster />
    </>
  );
}

export default App;
