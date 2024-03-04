import { Title } from "./components/Title/Title";
import logo from "./assets/img/logo.png";
import { PokeDetails } from "./components/PokeDetails/PokeDetails";
import { useEffect, useState } from "react";
import { PokemonAPI } from "./api/pokemon";

export default function App() {
  const [currentPokemon, setCurrentPokemon] = useState();
  const randomInt = Math.floor(Math.random() * 151);

  async function fetchRandom() {
    try {
      const list = await PokemonAPI.fetchList();
      if (list.length > 0) {
        setCurrentPokemon(list[randomInt]);
      }
    } catch (error) {
      alert(error.message);
    }
  }

  useEffect(() => {
    fetchRandom();
  }, []);

  return (
    <div className="container-fluid m-2">
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="my-2">
          <Title
            image={logo}
            title="Poke'Random"
            subtitle="Collectez des Pokemons dans votre Pokedex !"
          />
        </div>
        <div className="my-4">
          {currentPokemon && (
            <PokeDetails pokemon={currentPokemon} onClick={fetchRandom} />
          )}
        </div>
      </div>
    </div>
  );
}
