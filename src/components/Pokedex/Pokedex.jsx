import { useState } from "react";
import { PokeDetails } from "../PokeDetails/PokeDetails";
import style from "./style.module.css";
import { XSquareFill } from "react-bootstrap-icons";

export default function Pokedex() {
  const [storedSavedPokemons, setStoredSavedPokemons] = useState(
    JSON.parse(localStorage.getItem("savedPokemons"))?.sort(
      (a, b) => a.pokedex_id - b.pokedex_id
    ) || []
  );

  let totalScore = 0;
  for (const pokemon of storedSavedPokemons) {
    const score = pokemon.score;
    totalScore += score;
    console.log(score);
  }

  function handleClick(id) {
    const updatedSavedPokemons = storedSavedPokemons.filter(
      (item) => item.pokedex_id !== id
    );
    localStorage.setItem("savedPokemons", JSON.stringify(updatedSavedPokemons));
    setStoredSavedPokemons(updatedSavedPokemons);
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
              <div className="d-flex justify-content-end">
                <XSquareFill
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
      <h1
        className="text-center text-danger col"
        style={{ margin: "50px 22px 0" }}
      >
        Bienvenue dans votre Pokédex
      </h1>
      <p
        className="fs-5 text-danger border border-danger p-2 rounded"
        style={{
          maxWidth: "fit-content",
          textAlign: "end",
          margin: "0 7px 0 auto",
        }}
      >
        Score Total : {totalScore}
      </p>
      {storedSavedPokemons.length > 0 ? cards : warningDiv}
    </div>
  );
}
