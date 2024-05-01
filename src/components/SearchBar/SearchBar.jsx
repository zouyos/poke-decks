import style from "./style.module.css";
import { Search, X } from "react-bootstrap-icons";

export default function SearchBar({
  placeholder,
  setSearchText,
  disable,
  searchText,
}) {
  return (
    <div className={style.container}>
      <Search size={20} className={style.searchIcon} />
      <input
        type="text"
        className={style.input}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder={placeholder}
        disabled={disable}
        value={searchText}
      />
      {searchText && (
        <X
          size={30}
          className={style.xIcon}
          onClick={() => setSearchText("")}
        />
      )}
    </div>
  );
}
