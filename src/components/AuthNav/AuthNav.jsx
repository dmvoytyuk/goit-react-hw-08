import styles from "./AuthNav.module.css";

const AuthNav = ({ children }) => {
  return <div className={styles.authNav}>{children}</div>;
};

export default AuthNav;
