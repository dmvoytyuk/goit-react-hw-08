import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectIsLoggedIn } from "../../redux/auth/selectors.js";
import styles from "./Navigation.module.css";

const Navigation = ({ isLinkActive }) => {
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
      </nav>
    </>
  );
};

export default Navigation;
