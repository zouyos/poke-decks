import logo from "../../assets/img/logo.png";
import { Title } from "../../components/Title/Title";
import { PokeDetails } from "../../components/PokeDetails/PokeDetails";
import { useEffect, useState } from "react";
import { PokemonAPI } from "../../api/pokemon";
import { QuestionCircleFill } from "react-bootstrap-icons";
import ReloadButton from "../../components/ReloadButton/ReloadButton";
import AddButton from "../../components/AddButton/AddButton";

export default function Home() {
  const [currentPokemons, setCurrentPokemons] = useState([]);
  const [savedPokemons, setSavedPokemons] = useState([]);
  const [disable, setDisable] = useState(false);
  const [isHelpHovered, setIsHelpHovered] = useState(false);

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
    localStorage.setItem("currentPokemons", JSON.stringify(pokemonsSelected));
  }

  useEffect(() => {
    const storedCurrentPokemons = JSON.parse(
      localStorage.getItem("currentPokemons")
    );
    if (storedCurrentPokemons) {
      setCurrentPokemons(storedCurrentPokemons);
    } else {
      pickRandomSelection(3);
    }

    const storedSavedPokemons = JSON.parse(
      localStorage.getItem("savedPokemons")
    );
    if (storedSavedPokemons) {
      setSavedPokemons(storedSavedPokemons);
    }
  }, []);

  const handleReloadClick = () => {
    pickRandomSelection(3);
    setDisable(true);

    setTimeout(() => {
      //Il faut changer le code en-dessous (faire en sorte que le disable ne soit false qu'une fois qu'on a cliqué sur un Pokemon)
      setDisable(false);
    }, 5000);
  };

  const handleCardClick = (cardData, cardsData) => {
    setSavedPokemons([...savedPokemons, cardData]);
    setCurrentPokemons(cardsData);
    localStorage.setItem("currentPokemons", JSON.stringify(cardsData));

    const storedSavedPokemons = JSON.parse(
      localStorage.getItem("savedPokemons")
    );

    const checkId = (id, array) => array.some((obj) => obj.pokedex_id === id);

    if (!checkId(cardData.pokedex_id, storedSavedPokemons)) {
      localStorage.setItem(
        "savedPokemons",
        JSON.stringify([...savedPokemons, cardData])
      );
    } else {
      alert("Vous possédez déjà ce Pokémon !");
    }

    setDisable(true);

    setTimeout(() => {
      setDisable(false);
      localStorage.removeItem("currentPokemons");
      pickRandomSelection(3);
    }, 5000);
  };

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
            <div data-bs-toggle="modal" data-bs-target="#help">
              <QuestionCircleFill
                style={{ cursor: "pointer" }}
                onMouseEnter={() => setIsHelpHovered(true)}
                onMouseLeave={() => setIsHelpHovered(false)}
                size={30}
                color={isHelpHovered ? "#212429" : "#aeb1b6"}
              />
            </div>
          </div>
          <div className="mt-4 d-flex justify-content-center">
            {currentPokemons &&
              currentPokemons.map((currentPokemon, i) => {
                return (
                  <PokeDetails pokemon={currentPokemon} key={i}>
                    <AddButton
                      onClick={handleCardClick}
                      pokemon={currentPokemon}
                      pokemons={currentPokemons}
                    >
                      Ajouter au Pokédex
                    </AddButton>
                  </PokeDetails>
                );
              })}
          </div>
          <div className="my-4 d-flex justify-content-center">
            <ReloadButton onClick={handleReloadClick} disable={disable} />
          </div>
        </div>
        {/* Modal */}
        <div
          className="modal fade"
          id="help"
          tabindex="-1"
          aria-labelledby="helpLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-danger">
                <div
                  className="modal-title fs-4 text-light"
                  id="helpLabel"
                  style={{ margin: "0 auto" }}
                >
                  Comment Jouer ?
                </div>
              </div>
              <div className="modal-body text-center fs-5">
                <p>
                  Obtenez un deck de 3 Pokémons et choississez-en un à garder
                  dans votre Pokédex !
                </p>
                <p>Vous pouvez relancer la sélection toutes les 5 minutes.</p>
              </div>
              <div className="modal-footer d-flex justify-content-center">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}