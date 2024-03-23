import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import ScrollButton from "./components/ScrollButton/ScrollButton";

export default function App() {
  return (
    <>
      <NavBar />
      <Outlet />
      <ScrollButton />
    </>
  );
}
