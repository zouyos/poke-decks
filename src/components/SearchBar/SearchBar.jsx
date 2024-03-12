import style from "./style.module.css";
import { Search } from "react-bootstrap-icons";

export default function SearchBar({ placeholder, onTextChange, disable }) {
  return (
    <>
      <Search size={20} className={style.icon} />
      <input
        type="text"
        className={style.input}
        onChange={(e) => onTextChange(e.target.value)}
        placeholder={placeholder}
        disabled={disable}
      />
    </>
  );
}
