import { XSquare, XSquareFill } from "react-bootstrap-icons";
import Table from "react-bootstrap/Table";
import style from "./style.module.css";
import { useEffect, useState } from "react";
import { Modal, Nav } from "react-bootstrap";
import { PokemonAPI } from "../../api/pokemon";
import { appendScore } from "../../config/config";

const PokedexTable = ({
  pokemons,
  handleDeleteClick,
  savedPokemons,
  handleDeleteAllClick,
}) => {
  const [noPokemons, setNoPokemons] = useState(true);
  const [modalShow, setModalShow] = useState({});
  const [activeTab, setActiveTab] = useState("#general");
  const [storedList, setStoredList] = useState([]);

  const handleModalShow = (pokedexId) => {
    setModalShow((prev) => ({
      ...prev,
      [pokedexId]: true,
    }));
  };
  const handleModalClose = (pokedexId) => {
    setModalShow((prev) => ({
      ...prev,
      [pokedexId]: false,
    }));
    setActiveTab("#general");
  };

  const handleSelect = (selectedTab) => {
    setActiveTab(selectedTab);
  };

  function getProbabilityPercentage(score) {
    const minScore = 50;
    const maxScore = 404;
    const targetMin = 5; // in %
    const targetMax = 100;

    // Calculate the range of scores
    const scoreRange = maxScore - minScore;

    // Calculate the base probability range
    const probabilityRange = targetMax - targetMin;

    // Calculate the base probability for the given score
    const baseProbability =
      targetMin + (1 - (score - minScore) / scoreRange) * probabilityRange;

    // Round the probability to two decimal places
    const probabilityPercentage = Math.round(baseProbability * 100) / 100;

    return probabilityPercentage;
  }

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
    localStorage.setItem("list", JSON.stringify(pokemons));
  }

  useEffect(() => {
    listWithScore();
    setStoredList(JSON.parse(localStorage.getItem("list")));
  }, []);

  useEffect(() => {
    if (savedPokemons.length > 0) {
      setNoPokemons(false);
    } else {
      setNoPokemons(true);
    }
  }, [savedPokemons]);

  const warning = (
    <tr>
      <td colSpan={4}>
        <div className={`${style.warning} text-white bg-dark text-wrap`}>
          <div
            className="fs-2 border border-danger p-4 rounded text-wrap"
            style={{ margin: "150px 0" }}
          >
            Vous n'avez aucun Pokémon pour l'instant
          </div>
        </div>
      </td>
    </tr>
  );

  const tds = pokemons.map((pokemon, i) => {
    return (
      <>
        <Modal
          show={modalShow[pokemon.pokedex_id]}
          onHide={() => handleModalClose(pokemon.pokedex_id)}
        >
          <Modal.Header closeButton>
            <Nav
              variant="tabs"
              defaultActiveKey="#general"
              onSelect={handleSelect}
            >
              <Nav.Item>
                <Nav.Link href="#general">Général</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#talents">Talents</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#evolutions">Évolution(s)</Nav.Link>
              </Nav.Item>
            </Nav>
          </Modal.Header>
          <Modal.Body>
            <div>
              <img
                src={pokemon.sprites.regular}
                alt={pokemon.name.fr}
                className="w-100"
              />
            </div>
            <h2 className="fst-italic fw-bold text-center mb-4">
              {pokemon.name.fr}
            </h2>
            {activeTab === "#general" && (
              <>
                <div className="fs-5">
                  <p>
                    <span className="fw-bold text-decoration-underline me-2">
                      Catégorie :
                    </span>
                    <span>« {pokemon.category} »</span>
                  </p>
                  <hr />
                  <p>
                    <span className="fw-bold text-decoration-underline me-1">
                      Types :
                    </span>
                    {pokemon.types.map((type, i) => (
                      <span key={type.name + i} className="mx-2">
                        <img
                          src={type.image}
                          alt={`Type ${type.image}`}
                          className={style.type}
                          title={type.name}
                        />
                        <span className="ms-2">{type.name}</span>
                      </span>
                    ))}
                  </p>
                  <hr />
                  <p className="d-flex">
                    <span className="me-4">
                      <span className="fw-bold text-decoration-underline me-2">
                        Taille :
                      </span>
                      {pokemon.height}
                    </span>
                    <span>
                      <span className="fw-bold text-decoration-underline me-2">
                        Poids :
                      </span>
                      {pokemon.weight}
                    </span>
                  </p>
                </div>
              </>
            )}
            {activeTab === "#talents" && (
              <>
                <div className="fs-5">
                  <p className="fw-bold text-decoration-underline">Stats :</p>
                  <div className="d-flex justify-content-around my-2">
                    <div>
                      <span className="fw-bold text-danger">PV :</span>{" "}
                      <span>{pokemon.stats.hp}</span>
                    </div>
                    <div>
                      <span className="fw-bold text-danger">ATQ :</span>{" "}
                      <span>{pokemon.stats.atk}</span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-around my-2">
                    <div>
                      <span className="fw-bold text-danger">VIT :</span>{" "}
                      <span>{pokemon.stats.vit}</span>
                    </div>
                    <div>
                      <span className="fw-bold text-danger">DEF :</span>{" "}
                      <span>{pokemon.stats.def}</span>
                    </div>
                  </div>
                  <hr />
                  <p className="fw-bold text-decoration-underline">
                    Pouvoirs :
                  </p>
                  <div>
                    {pokemon.talents.map((talent, i) => {
                      return (
                        <p key={i}>
                          <span className="me-2">« {talent.name} »</span>
                          <span className="fst-italic text-danger">
                            {talent.tc && "(Talent Caché)"}
                          </span>
                        </p>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
            {activeTab === "#evolutions" && (
              <>
                {pokemon.evolution &&
                storedList?.some(
                  (item) =>
                    item.evolution?.pre?.name === pokemon.evolution.pre?.name ||
                    item.evolution?.next?.name === pokemon.evolution.next?.name
                ) ? (
                  <>
                    {pokemon.evolution.pre &&
                      storedList?.some(
                        (item) =>
                          item.evolution?.pre?.name ===
                          pokemon.evolution.pre?.name
                      ) && (
                        <>
                          <p className="fw-bold text-decoration-underline">
                            Précédente(s) :
                          </p>
                          <div>
                            {pokemon.evolution.pre.map((evo, i) => {
                              const evoObj = storedList?.find(
                                (item) => item.name.fr === evo.name
                              );
                              return (
                                <p
                                  key={i}
                                  className="d-flex align-items-center"
                                >
                                  {evoObj && (
                                    <img
                                      src={evoObj.sprites.regular}
                                      alt={evo.name}
                                      className={style.thumb}
                                    />
                                  )}
                                  <span className="ms-3 fst-italic">
                                    {evo.name}
                                  </span>
                                </p>
                              );
                            })}
                          </div>
                        </>
                      )}
                    {pokemon.evolution.next &&
                      storedList.some(
                        (item) =>
                          item.evolution?.next?.name ===
                          pokemon.evolution.next?.name
                      ) && (
                        <>
                          <p className="fw-bold text-decoration-underline">
                            Suivante(s) :
                          </p>
                          <div>
                            {pokemon.evolution.next.map((evo, i) => {
                              const evoObj = storedList?.find(
                                (item) => item.name.fr === evo.name
                              );
                              return (
                                <p
                                  key={i}
                                  className="d-flex align-items-center"
                                >
                                  {evoObj && (
                                    <img
                                      src={evoObj.sprites.regular}
                                      alt={evo.name}
                                      className={style.thumb}
                                    />
                                  )}
                                  <span className="ms-3 fst-italic">
                                    {evo.name}
                                  </span>
                                </p>
                              );
                            })}
                          </div>
                        </>
                      )}
                  </>
                ) : pokemon.evolution ? (
                  <p className="fs-5 text-center">
                    Ce Pokemon ne possède pas d'évolutions présente dans la
                    première génération de Pokémons
                  </p>
                ) : (
                  <p className="fs-5 text-center">
                    Ce Pokemon ne possède pas d'évolutions
                  </p>
                )}
              </>
            )}
          </Modal.Body>
          {activeTab === "#general" && (
            <Modal.Footer className="bg-danger d-flex justify-content-center">
              <h5 className="text-white text-center">
                Taux d'apparition : {getProbabilityPercentage(pokemon.score)} %
              </h5>
            </Modal.Footer>
          )}
        </Modal>

        <tr
          onClick={() => handleModalShow(pokemon.pokedex_id)}
          style={{ cursor: "pointer" }}
        >
          <td className="text-center fs-3 fw-bold align-middle">
            #{pokemon.pokedex_id}
          </td>
          <td className="align-middle">
            <div className="d-flex flex-column justify-content-center align-items-center">
              <div className="fst-italic text-center text-wrap mt-1">
                {pokemon.name.fr}
              </div>
              <img
                src={pokemon.sprites.regular}
                alt={pokemon.name.fr}
                className={style.image}
              />
              <div className="text-center text-danger text-wrap my-1">
                {pokemon.score} pts
              </div>
            </div>
          </td>
          <td className="align-middle">
            <div className="d-flex justify-content-center align-items-center flex-wrap">
              {pokemon.types.map((type, i) => (
                <span
                  className="m-1 d-flex flex-column justify-content-center align-items-center"
                  key={type.name + i}
                >
                  <img
                    src={type.image}
                    alt={`Type ${type.image}`}
                    className={style.type}
                    title={type.name}
                  />
                  {/* <div className={style.typeName}>{type.name}</div> */}
                </span>
              ))}
            </div>
          </td>
          <td className="align-middle">
            <div className="d-flex justify-content-center align-items-center flex-wrap">
              <XSquare
                onClick={(e) => {
                  if (
                    window.confirm(
                      `Êtes-vous sûr de vouloir supprimer ce Pokémon : ${pokemon.name.fr} ?`
                    )
                  ) {
                    handleDeleteClick(pokemon.pokedex_id, pokemon.name.fr);
                  }
                  e.stopPropagation();
                }}
                size={20}
                color="#dc3546"
                style={{ cursor: "pointer", margin: "8px" }}
              />
            </div>
          </td>
        </tr>
      </>
    );
  });

  return (
    <>
      <Table
        striped
        bordered
        hover
        variant="dark"
        className="border border-danger"
      >
        <thead>
          <tr>
            <th className="text-center align-middle">Pokédex ID</th>
            <th className="text-center align-middle">Identité</th>
            <th className="text-center align-middle">Type(s)</th>
            <th className="text-center align-middle">
              <div className="d-flex justify-content-center align-items-center">
                {savedPokemons.length > 0 && (
                  <XSquareFill
                    onClick={() =>
                      window.confirm(
                        "Êtes-vous sûr de vouloir supprimer tous les Pokémons ?"
                      ) && handleDeleteAllClick()
                    }
                    size={20}
                    color="#dc3546"
                    style={{ cursor: "pointer" }}
                  />
                )}
              </div>
            </th>
          </tr>
        </thead>
        <tbody>{noPokemons ? warning : tds}</tbody>
      </Table>
    </>
  );
};

export default PokedexTable;
