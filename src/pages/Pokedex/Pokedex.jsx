import { useEffect, useState } from "react";
import { PokeDetails } from "../../components/PokeDetails/PokeDetails";
import { XSquareFill, StarFill, Clock } from "react-bootstrap-icons";
import SearchBar from "../../components/SearchBar/SearchBar";
import Notifs from "../../components/Notifs/Notifs";
import { Modal } from "react-bootstrap";
import pokeball from "../../assets/img/pokeball.png";

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

  const storedSavedPokemons = localStorage.getItem("savedPokemons")
    ? JSON.parse(localStorage.getItem("savedPokemons"))
    : [];
  const numberOfPokemons = localStorage.getItem("numberOfPokemons")
    ? JSON.parse(localStorage.getItem("numberOfPokemons"))
    : 3;
  const time = localStorage.getItem("time")
    ? JSON.parse(localStorage.getItem("time"))
    : 30000;
  const bonus = localStorage.getItem("bonus")
    ? JSON.parse(localStorage.getItem("bonus"))
    : 0;

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
    localStorage.setItem("totalScore", updatedTotalScore);
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

  function handleClick(id, name) {
    const updatedSavedPokemons = savedPokemons.filter(
      (item) => item.pokedex_id !== id
    );
    localStorage.setItem("savedPokemons", JSON.stringify(updatedSavedPokemons));
    setSavedPokemons(updatedSavedPokemons);
    setVariant("danger");
    setHideNotif(false);
    setMessage(`${name} a bien été retiré du Pokédex`);
    setTimeout(() => {
      setHideNotif(true);
    }, 5000);
  }

  const warningDiv = (
    <div className="d-flex justify-content-center align-items-center text-center">
      <div
        className="fs-2 border border-danger text-danger p-4 rounded text-wrap"
        style={{ marginTop: "100px" }}
      >
        Vous n'avez aucun Pokémon pour l'instant
      </div>
    </div>
  );

  const cards = (
    <div className="row d-flex justify-content-center flex-wrap mb-5">
      {filteredList.map((pokemon, i) => {
        return (
          <div style={{ width: "max-content" }} key={i}>
            <PokeDetails pokemon={pokemon} pokedexIcon={false}>
              <div className="d-flex justify-content-end">
                <XSquareFill
                  onClick={() =>
                    window.confirm(
                      `Êtes-vous sûr de vouloir supprimer ce Pokémon : ${pokemon.name.fr} ?`
                    ) && handleClick(pokemon.pokedex_id, pokemon.name.fr)
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

  let palier = "";
  switch (true) {
    case bonus === 0:
      palier = "5000";
      break;
    case bonus === 1:
      palier = "10000";
      break;
    case bonus === 2:
      palier = "15000";
      break;
    case bonus === 3:
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
  const bonusP = (
    <div>
      {bonus > 0 ? (
        <div>
          <p>
            <span className="d-flex align-items-center">
              <Clock size={20} color="#dc3546" className="me-2 mt-1" /> Temps de
              relance : {time / 1000} secondes
            </span>
          </p>
          <p>
            <span className="d-flex align-items-center">
              <img
                src={pokeball}
                style={{ width: "21px" }}
                alt="Pokeball"
                className="me-2"
              />
              Deck de départ : {numberOfPokemons}
            </span>
          </p>
        </div>
      ) : (
        <p>Vous n'avez pas de bonus pour le moment</p>
      )}
    </div>
  );

  return (
    <>
      <div className="container-fluid">
        <div className="d-flex justify-content-center">
          {!hideNotif && (
            <Notifs
              variant={variant}
              message={message}
              onClose={setHideNotif}
            />
          )}
        </div>
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
        {savedPokemons.length > 0 ? cards : warningDiv}
      </div>
      <Modal show={modalShow} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">Bonus</Modal.Title>
        </Modal.Header>
        <Modal.Body> {bonusP}</Modal.Body>
        {bonus < 4 && <Modal.Footer>{palierP}</Modal.Footer>}
      </Modal>
    </>
  );
}
