import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth/operations.js";
import {
  selectIsLoading,
  selectToken,
  selectUserData,
} from "../../redux/auth/selectors.js";
import Loader from "../Loader/Loader.jsx";
import styles from "./UserMenu.module.css";

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserData);
  const token = useSelector(selectToken);
  const isLoading = useSelector(selectIsLoading);

  const onLogout = () => {
    dispatch(logout(token));
  };

  return !isLoading ? (
    <div className={styles.userMenu}>
      <p>Hello, {user.name}</p>
      <button className={styles.userMenuButton} onClick={onLogout}>
        Log Out
      </button>
    </div>
  ) : (
    <Loader color={"white"} />
  );
};

export default UserMenu;
