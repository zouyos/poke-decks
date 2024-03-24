import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import ScrollButtons from "./components/ScrollButtons/ScrollButtons";

export default function App() {
  return (
    <>
      <NavBar />
      <Outlet />
      <ScrollButtons />
    </>
  );
}
