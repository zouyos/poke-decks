import { PokeDetails } from "../PokeDetails/PokeDetails";
import style from "./style.module.css";
import { XSquare } from "react-bootstrap-icons";

export default function Pokedex() {
  const storedSavedPokemons = JSON.parse(localStorage.getItem("savedPokemons"));

  function handleClick(id) {
    const index = storedSavedPokemons.findIndex(
      (item) => item.pokedex_id === id
    );
    storedSavedPokemons.splice(index, 1);
    localStorage.setItem("savedPokemons", JSON.stringify(storedSavedPokemons));
    window.location.reload();
  }

  const warningDiv = (
    <div className={style.center}>
      <div className="fs-2 border border-danger text-danger p-4 rounded">
        Vous n'avez aucun Pokémon pour l'instant
      </div>
    </div>
  );

  const cards = (
    <div className="mt-4 row d-flex justify-content-center flex-wrap">
      {storedSavedPokemons.map((pokemon, i) => {
        return (
          <div className="mb-5" style={{ width: "max-content" }} key={i}>
            <PokeDetails pokemon={pokemon}>
              <div className="d-flex justify-content-center">
                <XSquare
                  onClick={() =>
                    window.confirm(
                      `Êtes-vous sûr de vouloir supprimer ce Pokémon : ${pokemon.name.fr} ?`
                    ) && handleClick(pokemon.pokedex_id)
                  }
                  size={20}
                  color="#dc3546"
                  style={{ cursor: "pointer" }}
                />
              </div>
            </PokeDetails>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="container-fluid">
      <h1 className="text-center text-danger my-5">
        Bienvenue dans votre Pokédex
      </h1>
      {storedSavedPokemons.length > 0 ? cards : warningDiv}
    </div>
  );
}
