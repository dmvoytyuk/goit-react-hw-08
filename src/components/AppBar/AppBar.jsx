import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors.js";
import AuthNav from "../AuthNav/AuthNav.jsx";
import Navigation from "../Navigation/Navigation.jsx";
import UserMenu from "../UserMenu/UserMenu.jsx";
import styles from "./AppBar.module.css";

const isLinkActive = ({ isActive }) =>
  clsx(styles.link, { [styles.activeLink]: isActive });

const AppBar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div className={styles.AppBar}>
      <Navigation isLinkActive={isLinkActive} />
      {!isLoggedIn ? <AuthNav isLinkActive={isLinkActive} /> : <UserMenu />}
    </div>
  );
};

export default AppBar;
