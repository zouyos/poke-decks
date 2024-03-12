import { useEffect, useState } from "react";
import { PokeDetails } from "../../components/PokeDetails/PokeDetails";
import { XSquareFill } from "react-bootstrap-icons";
import SearchBar from "../../components/SearchBar/SearchBar";

export default function Pokedex() {
  const [savedPokemons, setSavedPokemons] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [disableSearch, setDisableSearch] = useState(true);

  useEffect(() => {
    const storedSavedPokemons = JSON.parse(
      localStorage.getItem("savedPokemons")
    );
    if (storedSavedPokemons.length > 0) {
      storedSavedPokemons.sort((a, b) => a.pokedex_id - b.pokedex_id);
      setSavedPokemons(storedSavedPokemons);
      setDisableSearch(false);
    } else {
      setDisableSearch(true);
    }
  }, [savedPokemons]);

  const filteredList = savedPokemons.filter((pokemon) => {
    const searchTextUpper = searchText.trim().toUpperCase();
    const containsName = pokemon.name.fr
      .toUpperCase()
      .includes(searchTextUpper);

    let containsType = false;
    for (const type of pokemon.types) {
      if (type.name.toUpperCase().includes(searchTextUpper)) {
        containsType = true;
        break;
      }
    }

    return containsName || containsType;
  });

  let totalScore = 0;
  for (const pokemon of savedPokemons) {
    const score = pokemon.score;
    totalScore += score;
  }

  function handleClick(id) {
    const updatedSavedPokemons = savedPokemons.filter(
      (item) => item.pokedex_id !== id
    );
    localStorage.setItem("savedPokemons", JSON.stringify(updatedSavedPokemons));
    setSavedPokemons(updatedSavedPokemons);
  }

  const warningDiv = (
    <div className="d-flex justify-content-center align-items-center text-center">
      <div
        className="fs-2 border border-danger text-danger p-4 rounded text-wrap"
        style={{ marginTop: "120px" }}
      >
        Vous n'avez aucun Pokémon pour l'instant
      </div>
    </div>
  );

  const cards = (
    <div className="mt-4 row d-flex justify-content-center flex-wrap">
      {filteredList.map((pokemon, i) => {
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
        className="text-center text-danger text-wrap"
        style={{ margin: "50px 50px 0" }}
      >
        Bienvenue dans votre Pokédex
      </h1>
      <p
        className="fs-5 text-danger border border-danger p-2 rounded"
        style={{
          maxWidth: "fit-content",
          margin: "20px 10px 20px auto",
        }}
      >
        Score Total : {totalScore}
      </p>
      <div className="row justify-content-center mb-5">
        <div className="col-sm-12 col-md-4">
          <SearchBar
            placeholder="Rechercher un Pokémon ou un Type..."
            onTextChange={setSearchText}
            disable={disableSearch}
          />
        </div>
      </div>
      {savedPokemons.length > 0 ? cards : warningDiv}
    </div>
  );
}
