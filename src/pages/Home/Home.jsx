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
  const [disableReload, setDisableReload] = useState(false);
  const [disableAdd, setDisableAdd] = useState(false);
  const [isHelpHovered, setIsHelpHovered] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);

  async function fetchList() {
    try {
      const list = await PokemonAPI.fetchByGen(1);
      if (list.length > 0) {
        return list;
      }
    } catch (error) {
      alert(error.message);
    }
  }

  async function appendScoreToList() {
    let pokemons = await fetchList();

    for (const pokemon of pokemons) {
      let score = 5;

      if (Object.keys(pokemon.types).length > 1) score += 5;

      if (["Pikachu", "Mewtwo", "Mew"].includes(pokemon.name.fr)) score = 150;

      pokemon.score = score;
    }
    return pokemons;
  }

  async function pickRandomSelection(numberOfPokemons) {
    const pokemons = await appendScoreToList();
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
    setDisableAdd(false);
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

  useEffect(() => {
    let timerInterval;

    const startTime = localStorage.getItem("startTime");
    const storedRemainingTime = startTime
      ? 60000 - (Date.now() - parseInt(startTime))
      : 0;

    if (timerRunning || storedRemainingTime > 0) {
      setRemainingTime(Math.ceil(storedRemainingTime / 1000));
      setTimerRunning(true);
      setDisableReload(true);

      timerInterval = setInterval(() => {
        const elapsed =
          Date.now() - parseInt(localStorage.getItem("startTime"));
        const remaining = 60000 - elapsed;
        if (remaining <= 0) {
          setRemainingTime(0);
          setTimerRunning(false);
          setDisableReload(false);
          clearInterval(timerInterval);
          localStorage.removeItem("startTime");
        } else {
          setRemainingTime(Math.ceil(remaining / 1000));
        }
      }, 1000);
    }

    return () => clearInterval(timerInterval);
  }, [timerRunning]);

  useEffect(() => {
    if (localStorage.getItem("disableAdd")) setDisableAdd(true);
  }, []);

  const handleReloadClick = () => {
    if (localStorage.getItem("disableAdd")) {
      setDisableAdd(false);
      localStorage.removeItem("disableAdd");
    }
    pickRandomSelection(3);
    setDisableReload(true);
    setTimerRunning(true);
    localStorage.setItem("startTime", Date.now().toString());

    setTimeout(() => {
      setDisableReload(false);
      setTimerRunning(false);
    }, 60000);
  };

  const handleCardClick = (cardData, cardsData) => {
    setCurrentPokemons(cardsData);
    localStorage.setItem("currentPokemons", JSON.stringify(cardsData));

    const storedSavedPokemons =
      JSON.parse(localStorage.getItem("savedPokemons")) || [];

    const existingId = storedSavedPokemons.some(
      (obj) => obj.pokedex_id === cardData.pokedex_id
    );

    if (!existingId) {
      localStorage.setItem(
        "savedPokemons",
        JSON.stringify([...savedPokemons, cardData])
      );

      setDisableAdd(true);
      localStorage.setItem("disableAdd", true);

      alert(`${cardData.name.fr} a été ajouté au Pokédex !`);
    } else {
      alert("Vous possédez déjà ce Pokémon !");
    }
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
                      disabled={disableAdd}
                    >
                      Ajouter au Pokédex
                    </AddButton>
                  </PokeDetails>
                );
              })}
          </div>
          <div className="my-4 d-flex flex-column justify-content-center align-items-center">
            <ReloadButton
              onClick={handleReloadClick}
              disabled={disableReload}
            />
            {timerRunning && (
              <div className="my-3 text-danger fs-4">
                Temps restant : {Math.floor(remainingTime / 60)}:
                {remainingTime % 60 < 10 ? "0" : ""}
                {remainingTime % 60}
              </div>
            )}
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
                <p>Vous pouvez relancer la sélection toutes les minutes.</p>
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
