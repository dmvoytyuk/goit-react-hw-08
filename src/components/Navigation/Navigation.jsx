import clsx from "clsx";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  selectIsLoading,
  selectIsLoggedIn,
} from "../../redux/auth/selectors.js";
import AuthNav from "../AuthNav/AuthNav.jsx";
import Loader from "../Loader/Loader.jsx";
import UserMenu from "../UserMenu/UserMenu.jsx";
import styles from "./Navigation.module.css";

const isLinkActive = ({ isActive }) =>
  clsx(styles.link, { [styles.activeLink]: isActive });

const Navigation = () => {
  const isLoading = useSelector(selectIsLoading);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <>
      <nav className={styles.links}>
        <div>
          <NavLink className={isLinkActive} to="/">
            Home
          </NavLink>
          {isLoggedIn && (
            <NavLink className={isLinkActive} to="/contacts">
              /Contacts
            </NavLink>
          )}
        </div>
        {!isLoggedIn && !isLoading ? (
          <AuthNav>
            <NavLink className={isLinkActive} to="/register">
              Registration
            </NavLink>
            <NavLink className={isLinkActive} to="/login">
              Log In
            </NavLink>
          </AuthNav>
        ) : (
          isLoading && <Loader color={"white"} />
        )}
        {isLoggedIn && !isLoading && <UserMenu />}
      </nav>
    </>
  );
};

export default Navigation;
