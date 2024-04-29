import logo from "../../assets/img/logo.png";
import { Title } from "../../components/Title/Title";
import { PokeDetail } from "../../components/PokeDetail/PokeDetail";
import { useEffect, useState } from "react";
import { PokemonAPI } from "../../api/pokemon";
import { QuestionCircleFill } from "react-bootstrap-icons";
import ReloadButton from "../../components/ReloadButton/ReloadButton";
import AddButton from "../../components/AddButton/AddButton";
import { appendScore } from "../../config/config";
import Notif from "../../components/Notif/Notif";
import { Button, Modal } from "react-bootstrap";
import style from "./style.module.css";
import pikachu from "../../assets/img/pikachu.png";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useRef } from "react";
import ScrollButtons from "../../components/ScrollButtons/ScrollButtons";

export default function Home() {
  const [currentPokemons, setCurrentPokemons] = useState([]);
  const [disableReload, setDisableReload] = useState(false);
  const [disableAdd, setDisableAdd] = useState(false);
  const [isHelpHovered, setIsHelpHovered] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [hideNotif, setHideNotif] = useState(true);
  const [hideBonusNotif, setHideBonusNotif] = useState(true);
  const [variant, setVariant] = useState("primary");
  const [message, setMessage] = useState("");
  const [bonusMessage, setBonusMessage] = useState("");
  const [alertHeading, setAlertHeading] = useState("");
  const [totalScore, setTotalScore] = useState(0);
  const [numberOfPokemons, setNumberOfPokemons] = useState(3);
  const [modalShow, setModalShow] = useState(false);
  const [game, setGame] = useState(true);
  const isFirstRender = useRef(true);

  const handleModalClose = () => setModalShow(false);
  const handleModalShow = () => setModalShow(true);

  const { getItem, setItem, removeItem } = useLocalStorage(
    [
      "currentPokemons",
      "savedPokemons",
      "disableAdd",
      "time",
      "numberOfPokemons",
      "startTime",
      "bonus",
    ],
    [[], [], false, 30000, 3, 0, 0]
  );

  const storedSavedPokemons = getItem("savedPokemons");
  const storedBonus = getItem("bonus");

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
    return pokemons;
  }

  async function pickRandomSelection(numberOfPokemons) {
    const pokemons = await listWithScore();
    const pokemonsSelected = [];
    const minScore = 50;
    const maxScore = 404;
    const targetMin = 5; // in %
    const targetMax = 100;

    // Calculate the total score range
    const scoreRange = maxScore - minScore;

    // Calculate the base probability
    const baseProbability = (targetMax - targetMin) / 100;

    // Calculate the total base probability for all pokemons
    const totalBaseProbability = pokemons.reduce((acc, pokemon) => {
      const probability =
        baseProbability * (1 - (pokemon.score - minScore) / scoreRange);
      return acc + probability;
    }, 0);

    // Calculate the scaling factor to normalize probabilities
    const scalingFactor = numberOfPokemons / totalBaseProbability;

    // Select pokemons based on their probabilities
    while (pokemonsSelected.length < numberOfPokemons) {
      let rand = Math.random() * totalBaseProbability;
      let cumulativeProbability = 0;

      for (const pokemon of pokemons) {
        const probability =
          baseProbability * (1 - (pokemon.score - minScore) / scoreRange);
        cumulativeProbability += probability * scalingFactor;

        if (rand <= cumulativeProbability) {
          if (
            !pokemonsSelected.some(
              (selectedPokemon) =>
                selectedPokemon.pokedex_id === pokemon.pokedex_id
            )
          ) {
            pokemonsSelected.push(pokemon);
            break;
          }
        }
      }
    }

    setCurrentPokemons(pokemonsSelected);
    setItem("currentPokemons", pokemonsSelected);
  }

  useEffect(() => {
    if (getItem("currentPokemons").length > 0) {
      setCurrentPokemons(getItem("currentPokemons"));
    } else {
      pickRandomSelection(numberOfPokemons);
    }

    if (getItem("disableAdd")) setDisableAdd(true);
  }, []);

  useEffect(() => {
    if (storedSavedPokemons.length > 0) {
      let result = 0;
      for (const pokemon of storedSavedPokemons) {
        const score = pokemon.score;
        result += score;
      }
      const updatedTotalScore = result;
      setTotalScore(updatedTotalScore);

      if (updatedTotalScore < 5000) {
        setItem("time", 30000);
        setItem("numberOfPokemons", 3);
      } else if (updatedTotalScore >= 5000 && updatedTotalScore < 10000) {
        setItem("time", 20000);
        setItem("numberOfPokemons", 3);
        setItem("bonus", 1);
      } else if (updatedTotalScore >= 10000 && updatedTotalScore < 15000) {
        setItem("time", 20000);
        setItem("numberOfPokemons", 4);
        setItem("bonus", 2);
      } else if (updatedTotalScore >= 15000 && updatedTotalScore < 20000) {
        setItem("time", 10000);
        setItem("numberOfPokemons", 4);
        setItem("bonus", 3);
      } else if (updatedTotalScore > 20000) {
        setItem("time", 0);
        setItem("numberOfPokemons", 5);
        setItem("bonus", 4);
      }
      setNumberOfPokemons(getItem("numberOfPokemons"));
    }

    if (storedSavedPokemons.length >= 151) {
      setGame(false);
      setVariant("success");
      setHideNotif(false);
      setAlertHeading("Félicitations !");
      setMessage("Vous avez collecté tous les Pokémons !");
      setTimeout(() => {
        setHideNotif(true);
      }, 5000);
    }
  }, [currentPokemons, disableAdd, disableReload]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (storedBonus === 1 || storedBonus === 3) {
      setHideBonusNotif(false);
      setBonusMessage("Nouveau bonus activé : 10 secondes de temps en moins");
      setTimeout(() => {
        setHideBonusNotif(true);
      }, 5000);
    }
    if (storedBonus === 2) {
      setHideBonusNotif(false);
      setBonusMessage("Nouveau bonus activé : 1 pokémon supplémentaire");
      setTimeout(() => {
        setHideBonusNotif(true);
      }, 5000);
    }
    if (storedBonus === 4) {
      setHideBonusNotif(false);
      setBonusMessage(
        "Nouveau bonus activé : 1 pokémon supplémentaire / aucun temps de relance"
      );
      setTimeout(() => {
        setHideBonusNotif(true);
      }, 5000);
    }
  }, [storedBonus]);

  useEffect(() => {
    let timerInterval;

    const storedRemainingTime = getItem("startTime")
      ? getItem("time") - (Date.now() - getItem("startTime"))
      : 0;

    if (timerRunning || storedRemainingTime > 0) {
      setRemainingTime(Math.ceil(storedRemainingTime / 1000));
      setTimerRunning(true);
      setDisableReload(true);

      timerInterval = setInterval(() => {
        const elapsed = Date.now() - getItem("startTime");
        const remaining = getItem("time") - elapsed;
        if (remaining <= 0) {
          setRemainingTime(0);
          setTimerRunning(false);
          setDisableReload(false);
          removeItem("startTime");
          clearInterval(timerInterval);
        } else {
          setRemainingTime(Math.ceil(remaining / 1000));
        }
      }, 1000);
    }

    if (getItem("disableAdd") && storedRemainingTime === 0) {
      handleReload();
    }

    return () => clearInterval(timerInterval);
  }, [timerRunning]);

  const handleReload = () => {
    setDisableAdd(false);
    removeItem("disableAdd");
    if (totalScore >= 20000) {
      pickRandomSelection(numberOfPokemons);
    } else {
      pickRandomSelection(numberOfPokemons);
      setDisableReload(true);
      setTimerRunning(true);
      setItem("startTime", Date.now().toString());
    }
  };

  const handleAddClick = (cardData, cardsData) => {
    setCurrentPokemons(cardsData);
    setItem("currentPokemons", cardsData);

    const existingId = storedSavedPokemons.some(
      (obj) => obj.pokedex_id === cardData.pokedex_id
    );

    if (!existingId) {
      const updatedSavedPokemons = [...storedSavedPokemons, cardData];
      setItem("savedPokemons", updatedSavedPokemons);

      setDisableAdd(true);
      setItem("disableAdd", true);

      setVariant("success");
      setHideNotif(false);
      setMessage(`${cardData.name.fr} a été ajouté au Pokédex !`);
      setTimeout(() => {
        setHideNotif(true);
      }, 5000);
      if (!disableReload) {
        handleReload();
      }
    } else {
      setVariant("danger");
      setHideNotif(false);
      setMessage("Vous possédez déjà ce Pokémon");
      setTimeout(() => {
        setHideNotif(true);
      }, 5000);
    }
  };

  return (
    <>
      <div className={`${style.container} container-fluid`}>
        {!hideNotif && (
          <div className={`d-flex justify-content-center ${style.alert}`}>
            <Notif
              heading={alertHeading}
              variant={variant}
              message={message}
              onClose={setHideNotif}
            />
          </div>
        )}
        {!hideBonusNotif && (
          <div className={`d-flex justify-content-center ${style.bonus}`}>
            <Notif
              variant="primary"
              message={bonusMessage}
              onClose={setHideBonusNotif}
            />
          </div>
        )}
        <div className="d-flex flex-column justify-content-center align-items-center">
          <p
            className="text-danger align-self-end mt-2 mb-0 me-2"
            style={{ fontSize: "12px" }}
          >
            Score Total : <span className="fw-bold">{totalScore}</span>
          </p>
          <div className="mb-3">
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
          {game ? (
            <div className="game">
              <div className="mt-3 d-flex justify-content-center flex-wrap">
                {currentPokemons &&
                  currentPokemons.map((currentPokemon, i) => {
                    let pokedexIconTrue = false;
                    const existingId = getItem("savedPokemons").some(
                      (obj) => obj.pokedex_id === currentPokemon.pokedex_id
                    );
                    if (existingId) {
                      pokedexIconTrue = true;
                    }
                    return (
                      <PokeDetail
                        pokemon={currentPokemon}
                        pokedexIcon={pokedexIconTrue}
                        key={i}
                      >
                        <AddButton
                          onClick={handleAddClick}
                          pokemon={currentPokemon}
                          pokemons={currentPokemons}
                          disabled={disableAdd || pokedexIconTrue}
                        >
                          Ajouter au Pokédex
                        </AddButton>
                      </PokeDetail>
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
                    onClick={handleReload}
                    disabled={disableReload}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="d-flex justify-content-center">
              <img src={pikachu} alt="Pikachu" className={style.image} />
            </div>
          )}
        </div>

        <Modal show={modalShow} onHide={handleModalClose}>
          <Modal.Header className="bg-danger">
            <Modal.Title
              className="fs-4 text-light text-center"
              style={{ margin: "0 auto" }}
            >
              Comment jouer ?
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            <p>
              Obtenez un deck de 3 Pokémons et choisissez-en un à garder dans
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
            </p>
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

        <ScrollButtons />
      </div>
    </>
  );
}
