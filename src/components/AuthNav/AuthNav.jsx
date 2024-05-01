import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectIsLoading } from "../../redux/auth/selectors.js";
import Loader from "../Loader/Loader.jsx";

import styles from "./AuthNav.module.css";

const AuthNav = ({ isLinkActive }) => {
  const isLoading = useSelector(selectIsLoading);

  return !isLoading ? (
    <div className={styles.authNav}>
      <NavLink className={isLinkActive} to="/register">
        Registration
      </NavLink>
      <NavLink className={isLinkActive} to="/login">
        Log In
      </NavLink>
    </div>
  ) : (
    <Loader color={"white"} />
  );
};

export default AuthNav;
