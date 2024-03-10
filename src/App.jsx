import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import style from "./style.module.css";

export default function App() {
  return (
    <div className={style.container}>
      <NavBar />
      <Outlet />
    </div>
  );
}
