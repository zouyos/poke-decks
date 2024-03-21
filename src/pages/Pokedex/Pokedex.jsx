import { useEffect, useState } from "react";
import { StarFill, Clock } from "react-bootstrap-icons";
import SearchBar from "../../components/SearchBar/SearchBar";
import Notif from "../../components/Notif/Notif";
import { Modal } from "react-bootstrap";
import cards from "../../assets/img/playing_cards.png";
import PokedexTable from "../../components/PokedexTable/PokedexTable";
import { useLocalStorage } from "../../hooks/useLocalStorage";

export default function Pokedex() {
  const [savedPokemons, setSavedPokemons] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [disableSearch, setDisableSearch] = useState(true);
  const [hideNotif, setHideNotif] = useState(true);
  const [variant, setVariant] = useState("primary");
  const [message, setMessage] = useState("");
  const [totalScore, setTotalScore] = useState(0);
  const [modalShow, setModalShow] = useState(false);

  const handleModalClose = () => setModalShow(false);
  const handleModalShow = () => setModalShow(true);

  const { getItem, setItem } = useLocalStorage(
    ["savedPokemons", "numberOfPokemons", "time", "bonus"],
    [[], 3, 30000, 0]
  );

  const storedSavedPokemons = getItem("savedPokemons");

  useEffect(() => {
    if (storedSavedPokemons.length > 0) {
      storedSavedPokemons.sort((a, b) => a.pokedex_id - b.pokedex_id);
      setSavedPokemons(storedSavedPokemons);
    }
  }, []);

  useEffect(() => {
    if (savedPokemons.length > 0) {
      setDisableSearch(false);
    } else {
      setDisableSearch(true);
    }

    let result = 0;
    for (const pokemon of savedPokemons) {
      const score = pokemon.score;
      result += score;
    }
    const updatedTotalScore = result;
    setTotalScore(updatedTotalScore);
    if (updatedTotalScore < 5000) {
      setItem("time", 30000);
      setItem("numberOfPokemons", 3);
      setItem("bonus", 0);
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

  function handleDeleteClick(id, name) {
    const updatedSavedPokemons = savedPokemons.filter(
      (item) => item.pokedex_id !== id
    );
    setItem("savedPokemons", updatedSavedPokemons);
    setSavedPokemons(updatedSavedPokemons);
    setVariant("danger");
    setHideNotif(false);
    setMessage(`${name} a bien été retiré du Pokédex`);
    setTimeout(() => {
      setHideNotif(true);
    }, 5000);
  }

  function handleDeleteAllClick() {
    const updatedSavedPokemons = [];
    setItem("savedPokemons", updatedSavedPokemons);
    setSavedPokemons(updatedSavedPokemons);
    setVariant("danger");
    setHideNotif(false);
    setMessage("Tous les Pokémons on éte supprimés");
    setTimeout(() => {
      setHideNotif(true);
    }, 5000);
  }

  const bonusClock = (
    <p className="mb-0">
      <span className="d-flex align-items-center">
        <Clock size={20} color="#dc3546" style={{ margin: "0 13px 0 3px" }} />
        Temps de relance : {getItem("time") / 1000} secondes
      </span>
    </p>
  );

  const bonusDeck = (
    <p className="mb-0">
      <span className="d-flex align-items-center">
        <img
          src={cards}
          style={{ width: "27px", margin: "2px 9px 0 0" }}
          alt="Icône Cartes"
        />
        Deck de départ : {getItem("numberOfPokemons")}
      </span>
    </p>
  );

  const bonusP = (
    <div>
      {getItem("bonus") === 0 ? (
        <p className="mb-0">Vous n'avez pas de bonus pour le moment</p>
      ) : getItem("bonus") === 1 ? (
        bonusClock
      ) : (
        <>
          <div className="mt-1 mb-3">{bonusClock}</div>
          <div className="mt-3 mb-1">{bonusDeck}</div>
        </>
      )}
    </div>
  );

  let palier = "";
  switch (true) {
    case getItem("bonus") === 0:
      palier = "5000";
      break;
    case getItem("bonus") === 1:
      palier = "10000";
      break;
    case getItem("bonus") === 2:
      palier = "15000";
      break;
    case getItem("bonus") === 3:
      palier = "20000";
      break;
    default:
      palier = "5000";
      break;
  }

  const palierP = (
    <p>
      Prochain palier : <span className="text-danger">{palier}</span>
    </p>
  );

  return (
    <>
      <div className="container-fluid">
        <div className="d-flex justify-content-center"></div>
        <h1
          className="text-center text-danger text-wrap my-4"
          style={{ fontSize: "50px" }}
        >
          Pokédex
        </h1>
        <div className="d-flex justify-content-between align-items-center mx-1">
          <p className="text-danger mb-0 text-wrap">
            Score Total : <span className="fw-bold">{totalScore}</span>
          </p>
          <p
            className="text-danger border border-danger p-2 rounded mb-0"
            style={{
              maxWidth: "fit-content",
              margin: "0 4px 0 auto",
              cursor: "pointer",
              boxShadow: "4px 2px 4px rgba(0,0,0,0.4)",
            }}
            onClick={handleModalShow}
          >
            <span className="d-flex align-items-center">
              <StarFill size={15} color="#dc3546" className="me-1 mb-0" /> Bonus
            </span>
          </p>
        </div>
        <p className="mx-1 mb-0 text-wrap">
          Nombre de Pokémons :{" "}
          <span className="fw-bold">{storedSavedPokemons.length}</span>
        </p>
        <div className="row justify-content-center mt-4 mb-5">
          <div className="col-sm-12 col-md-4">
            <SearchBar
              placeholder="Rechercher un Pokémon ou un Type..."
              onTextChange={setSearchText}
              disable={disableSearch}
            />
          </div>
        </div>
        {
          <PokedexTable
            pokemons={filteredList}
            handleDeleteClick={handleDeleteClick}
            handleDeleteAllClick={handleDeleteAllClick}
            savedPokemons={savedPokemons}
          />
        }
      </div>

      {!hideNotif && (
        <div className="d-flex justify-content-center">
          <Notif variant={variant} message={message} onClose={setHideNotif} />
        </div>
      )}

      <Modal show={modalShow} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">Bonus</Modal.Title>
        </Modal.Header>
        <Modal.Body>{bonusP}</Modal.Body>
        {getItem("bonus") < 4 && <Modal.Footer>{palierP}</Modal.Footer>}
      </Modal>
    </>
  );
}
