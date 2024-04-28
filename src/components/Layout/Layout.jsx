/* eslint-disable react/prop-types */

import AppBar from "../AppBar/AppBar.jsx";
import styles from "./Layout.module.css";

const Layout = ({ children }) => {
  return (
    <>
      <AppBar />
      <main className={styles.container}>{children}</main>
    </>
  );
};

export default Layout;
