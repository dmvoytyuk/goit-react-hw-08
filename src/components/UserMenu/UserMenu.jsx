import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth/operations.js";
import { selectToken, selectUserData } from "../../redux/auth/selectors.js";
import styles from "./UserMenu.module.css";

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserData);
  const token = useSelector(selectToken);
  const onLogout = () => {
    dispatch(logout(token));
  };

  return (
    <div className={styles.userMenu}>
      <p>Hello, {user.name}</p>
      <button onClick={onLogout}>Log Out</button>
    </div>
  );
};

export default UserMenu;
