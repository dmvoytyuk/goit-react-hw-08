import { useDispatch, useSelector } from "react-redux";
import { selectNameFilter } from "../../redux/filters/selectors.js";
import { changeFilter } from "../../redux/filters/slice.js";

import styles from "./SearchBox.module.css";
const SearchBox = () => {
  const dispatch = useDispatch();
  const inputValue = useSelector(selectNameFilter);

  return (
    <div className={styles.searchBox}>
      <input
        className={styles.searhcInput}
        type="text"
        value={inputValue}
        onChange={(e) => dispatch(changeFilter(e.target.value))}
        placeholder="Search contacts by name"
      />
    </div>
  );
};

export default SearchBox;
