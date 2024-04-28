import Navigation from "../Navigation/Navigation.jsx";
import styles from "./AppBar.module.css";

const AppBar = () => {
  return (
    <div className={styles.AppBar}>
      <Navigation />
    </div>
  );
};

export default AppBar;
