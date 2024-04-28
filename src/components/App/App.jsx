import { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import HomePage from "../../pages/HomePage.jsx";
import { refreshUser } from "../../redux/auth/operations.js";
import { selectToken } from "../../redux/auth/selectors.js";
import Layout from "../Layout/Layout.jsx";
import Loader from "../Loader/Loader.jsx";
import PrivateRoute from "../PrivateRoute/PrivateRoute.jsx";
import RestrictedRoute from "../RestrictedRoute/RestrictedRoute.jsx";

const ContactsPage = lazy(() => import("../../pages/ContactsPage.jsx"));
const LoginPage = lazy(() => import("../../pages/LoginPage.jsx"));
const NotFoundPage = lazy(() => import("../../pages/NotFoundPage.jsx"));
const RegistrationPage = lazy(() => import("../../pages/RegistrationPage.jsx"));

function App() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  useEffect(() => {
    dispatch(refreshUser(token));
  }, [token, dispatch]);

  return (
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
  );
}

export default App;
