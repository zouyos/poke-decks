import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import ScrollToTopButton from "./components/ScrollToTopButton/ScrollToTopButton";

export default function App() {
  return (
    <>
      <NavBar />
      <Outlet />
      <ScrollToTopButton />
    </>
  );
}
