import logo from "../../assets/img/logo.png";
import { Title } from "../../components/Title/Title";
import { PokeDetails } from "../../components/PokeDetails/PokeDetails";
import { useEffect, useState } from "react";
import { PokemonAPI } from "../../api/pokemon";
import { QuestionCircleFill } from "react-bootstrap-icons";
import ReloadButton from "../../components/ReloadButton/ReloadButton";
import AddButton from "../../components/AddButton/AddButton";
import { appendScore } from "../../config/config";
import Notifs from "../../components/Notifs/Notifs";
import { Button, Modal } from "react-bootstrap";

export default function Home() {
  const [currentPokemons, setCurrentPokemons] = useState([]);
  const [savedPokemons, setSavedPokemons] = useState([]);
  const [disableReload, setDisableReload] = useState(false);
  const [disableAdd, setDisableAdd] = useState(false);
  const [isHelpHovered, setIsHelpHovered] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [hideNotif, setHideNotif] = useState(true);
  const [message, setMessage] = useState("");
  const [time, setTime] = useState(30000);
  const [totalScore, setTotalScore] = useState(0);
  const [numberOfPokemons, setNumberOfPokemons] = useState(3);
  const [modalShow, setModalShow] = useState(false);

  const handleModalClose = () => setModalShow(false);
  const handleModalShow = () => setModalShow(true);

  const storedCurrentPokemons = localStorage.getItem("currentPokemons")
    ? JSON.parse(localStorage.getItem("currentPokemons"))
    : [];
  const storedSavedPokemons = localStorage.getItem("savedPokemons")
    ? JSON.parse(localStorage.getItem("savedPokemons"))
    : [];

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

  async function listWithScore() {
    let pokemons = await fetchList();

    appendScore(pokemons);
    // console.log(pokemons.sort((a, b) => a.score - b.score));
    // score total possible = 22904
    return pokemons;
  }

  async function pickRandomSelection(numberOfPokemons) {
    const pokemons = await listWithScore();
    const pokemonsSelected = [];

    const totalRate = pokemons.reduce(
      (acc, pokemon) => acc + (1 - (pokemon.score - 50) / (500 - 50)) * 100,
      0
    );

    while (pokemonsSelected.length < numberOfPokemons) {
      let rand = Math.random() * totalRate;
      let cumulativeRate = 0;

      for (const pokemon of pokemons) {
        cumulativeRate += (1 - (pokemon.score - 50) / (500 - 50)) * 100;
        if (rand <= cumulativeRate) {
          if (
            !pokemonsSelected.some(
              (selectedPokemon) =>
                selectedPokemon.pokedex_id === pokemon.pokedex_id
            )
          ) {
            pokemon.score += 5000;
            pokemonsSelected.push(pokemon);
            break;
          }
        }
      }
    }

    setCurrentPokemons(pokemonsSelected);
    localStorage.setItem("currentPokemons", JSON.stringify(pokemonsSelected));
  }

  useEffect(() => {
    if (storedCurrentPokemons.length > 0) {
      setCurrentPokemons(storedCurrentPokemons);
    } else {
      pickRandomSelection(3);
    }
    if (storedSavedPokemons.length > 0) {
      setSavedPokemons(storedSavedPokemons);
    }

    if (localStorage.getItem("disableAdd")) setDisableAdd(true);
  }, []);

  useEffect(() => {
    if (storedSavedPokemons.length > 0) {
      let result = 0;
      for (const pokemon of savedPokemons) {
        const score = pokemon.score;
        result += score;
      }
      const updatedTotalScore = result;
      setTotalScore(updatedTotalScore);

      if (updatedTotalScore < 5000) {
        localStorage.setItem("time", 30000);
        localStorage.setItem("numberOfPokemons", 3);
        localStorage.setItem("bonus", 0);
      } else if (updatedTotalScore >= 5000 && updatedTotalScore < 10000) {
        localStorage.setItem("time", 20000);
        localStorage.setItem("numberOfPokemons", 3);
        localStorage.setItem("bonus", 1);
      } else if (updatedTotalScore >= 10000 && updatedTotalScore < 15000) {
        localStorage.setItem("time", 20000);
        localStorage.setItem("numberOfPokemons", 4);
        localStorage.setItem("bonus", 2);
      } else if (updatedTotalScore >= 15000 && updatedTotalScore < 20000) {
        localStorage.setItem("time", 10000);
        localStorage.setItem("numberOfPokemons", 4);
        localStorage.setItem("bonus", 3);
      } else if (updatedTotalScore > 20000) {
        localStorage.setItem("time", 0);
        localStorage.setItem("numberOfPokemons", 5);
        localStorage.setItem("bonus", 4);
      }
      setNumberOfPokemons(parseInt(localStorage.getItem("numberOfPokemons")));
    }

    if (storedSavedPokemons.length >= 151) {
      setHideNotif(false);
      setMessage(
        "Bravo vous avez attrapé tous les Pokémons ! Vous êtes un super dresseur."
      );
      setTimeout(() => {
        setHideNotif(true);
      }, 5000);
    }
  }, [savedPokemons, currentPokemons, disableAdd, disableReload]);

  useEffect(() => {
    let timerInterval;

    const startTime = localStorage.getItem("startTime");
    const storedTime = localStorage.getItem("time");
    const storedRemainingTime = startTime
      ? storedTime - (Date.now() - parseInt(startTime))
      : 0;

    if (timerRunning || storedRemainingTime > 0) {
      setRemainingTime(Math.ceil(storedRemainingTime / 1000));
      setTimerRunning(true);
      setDisableReload(true);

      timerInterval = setInterval(() => {
        const elapsed =
          Date.now() - parseInt(localStorage.getItem("startTime"));
        const remaining = storedTime - elapsed;
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

  const handleReloadClick = () => {
    console.log(numberOfPokemons);
    setHideNotif(true);
    if (totalScore >= 20000) {
      if (localStorage.getItem("disableAdd")) {
        setDisableAdd(false);
        localStorage.removeItem("disableAdd");
      }
      pickRandomSelection(numberOfPokemons);
    } else {
      if (localStorage.getItem("disableAdd")) {
        setDisableAdd(false);
        localStorage.removeItem("disableAdd");
      }
      pickRandomSelection(numberOfPokemons);
      setDisableReload(true);
      setTimerRunning(true);
      localStorage.setItem("startTime", Date.now().toString());
    }
  };

  const handleAddClick = (cardData, cardsData) => {
    setCurrentPokemons(cardsData);
    localStorage.setItem("currentPokemons", JSON.stringify(cardsData));

    const existingId = storedSavedPokemons.some(
      (obj) => obj.pokedex_id === cardData.pokedex_id
    );

    if (!existingId) {
      const updatedSavedPokemons = [...storedSavedPokemons, cardData];
      localStorage.setItem(
        "savedPokemons",
        JSON.stringify(updatedSavedPokemons)
      );
      setSavedPokemons(updatedSavedPokemons);

      setDisableAdd(true);
      localStorage.setItem("disableAdd", true);

      setHideNotif(false);
      setMessage(`${cardData.name.fr} a été ajouté au Pokédex !`);
      setTimeout(() => {
        setHideNotif(true);
      }, 5000);
    } else {
      alert("Vous possédez déjà ce Pokémon !");
    }
  };

  return (
    <>
      <div className="container-fluid p-2">
        <div className="d-flex flex-column justify-content-center align-items-center">
          {!hideNotif && (
            <Notifs
              variant="success"
              message={message}
              onClose={setHideNotif}
            />
          )}
          <div className="mt-2 mb-3">
            <Title
              image={logo}
              title="Poke'Decks"
              subtitle="Collectez des Pokemons dans votre Pokédex !"
            />
          </div>
          <div className="d-flex justify-content-center">
            <div onClick={handleModalShow}>
              <QuestionCircleFill
                style={{
                  cursor: "pointer",
                }}
                className="rounded-pill"
                onMouseEnter={() => setIsHelpHovered(true)}
                onMouseLeave={() => setIsHelpHovered(false)}
                size={30}
                color={isHelpHovered ? "#212429" : "#aeb1b6"}
              />
            </div>
          </div>
          <div className="mt-3 d-flex justify-content-center flex-wrap">
            {currentPokemons &&
              currentPokemons.map((currentPokemon, i) => {
                let pokedexIconTrue = false;
                const existingId = storedSavedPokemons.some(
                  (obj) => obj.pokedex_id === currentPokemon.pokedex_id
                );
                if (existingId) {
                  pokedexIconTrue = true;
                }
                return (
                  <PokeDetails
                    pokemon={currentPokemon}
                    pokedexIcon={pokedexIconTrue}
                    key={i}
                  >
                    <AddButton
                      onClick={handleAddClick}
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
          <div className="mt-2 mb-3 d-flex flex-column justify-content-center align-items-center">
            {timerRunning && (
              <div className="mb-2 text-danger fs-4">
                Temps restant : {Math.floor(remainingTime / 60)}:
                {remainingTime % 60 < 10 ? "0" : ""}
                {remainingTime % 60}
              </div>
            )}
            <div className="mt-2">
              <ReloadButton
                onClick={handleReloadClick}
                disabled={disableReload}
              />
            </div>
          </div>
        </div>
        <Modal show={modalShow} onHide={handleModalClose}>
          <Modal.Header className="bg-danger">
            <Modal.Title
              className="fs-3 text-light text-center"
              style={{ margin: "0 auto" }}
            >
              Comment jouer ?
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center fs-5">
            <p>
              Obtenez un deck de 3 Pokémons et choississez-en un à garder dans
              votre Pokédex. Vous pouvez relancer la sélection toutes les 30
              secondes
            </p>
            <p className="fst-italic">
              Certains Pokémons ont un taux d'apparition moins élevé que
              d'autres, restez à l'affût de leurs scores et essayez d'attraper
              les Pokémons les plus rares !
            </p>
            <p>
              Vous obtiendrez un bonus tous les 5000 points (vous pouvez
              consulter vos bonus dans le Pokédex)
            </p>
            <p className="text-danger fw-bold">
              Il y a 151 Pokémons à collectionner, attrapez-les tous !
            </p>{" "}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={handleModalClose}
              style={{ margin: "0 auto" }}
            >
              Fermer
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
