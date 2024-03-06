import logo from "../../assets/img/logo.png";
import { Title } from "../../components/Title/Title";
import { PokeDetails } from "../../components/PokeDetails/PokeDetails";
import { useEffect, useState } from "react";
import { PokemonAPI } from "../../api/pokemon";
import { QuestionCircleFill } from "react-bootstrap-icons";
import ReloadButton from "../../components/ReloadButton/ReloadButton";

export default function Home() {
  const [currentPokemons, setCurrentPokemons] = useState([]);

  async function fetchList() {
    try {
      const list = await PokemonAPI.fetchList();
      if (list.length > 0) {
        return list;
      }
    } catch (error) {
      alert(error.message);
    }
  }

  async function pickRandomSelection(numberOfPokemons) {
    const pokemons = await fetchList();
    const pokemonsSelected = [];
    const selectedIds = new Set();

    while (pokemonsSelected.length < numberOfPokemons) {
      let randomInt = Math.floor(Math.random() * 151);
      if (!selectedIds.has(randomInt)) {
        selectedIds.add(randomInt);
        pokemonsSelected.push(pokemons[randomInt]);
      }
    }

    setCurrentPokemons(pokemonsSelected);
  }

  useEffect(() => {
    pickRandomSelection(3);
  }, []);

  return (
    <>
      <div className="container-fluid p-2">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <div className="my-3">
            <Title
              image={logo}
              title="Poke'Decks"
              subtitle="Collectez des Pokemons dans votre Pokédex !"
            />
          </div>
          <div className="d-flex justify-content-center">
            <div title="Obtenez un deck de 3 Pokémons et choississez-en un à garder dans votre Pokédex ! &#013;Vous pouvez relancer la sélection toutes les 5min.">
              <QuestionCircleFill size={30} color="#d3d3d3" />
            </div>
          </div>
          <div className="mt-4 d-flex justify-content-center">
            {currentPokemons &&
              currentPokemons.map((currentPokemon, i) => {
                return <PokeDetails pokemon={currentPokemon} key={i} />;
              })}
          </div>
          <div className="my-4 d-flex justify-content-center">
            <ReloadButton pickRandomSelection={pickRandomSelection} />
          </div>
        </div>
      </div>
    </>
  );
}
