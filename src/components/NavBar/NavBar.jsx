import { useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import pokedex from "../../assets/img/pokedex.png";

export default function NavBar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar bg-danger ">
      <div className="container-fluid">
        <div
          className="navbar-brand text-light d-flex align-items-center"
          title="Accueil"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            alt="Logo"
            width="50"
            height="50"
            className="d-inline-block align-text-top me-1"
          />
          <h2 className="fw-bold mt-1">Poke'Decks</h2>
        </div>
        <div
          className="nav-item my-1"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/pokedex")}
        >
          <img
            src={pokedex}
            alt="Pokedex Icon"
            width="60"
            height="60"
            title="Pokédex"
          />
        </div>
      </div>
    </nav>
  );
}
