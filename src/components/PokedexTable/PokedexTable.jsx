import { XSquare, XSquareFill } from "react-bootstrap-icons";
import Table from "react-bootstrap/Table";
import style from "./style.module.css";
import { useEffect, useState } from "react";

const PokedexTable = ({
  pokemons,
  handleDeleteClick,
  savedPokemons,
  handleDeleteAllClick,
}) => {
  const [noPokemons, setNoPokemons] = useState(true);

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
      <tr key={i}>
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
                key={i}
              >
                <img
                  src={type.image}
                  alt={`Type ${type.image}`}
                  className={style.type}
                />
                {/* <div className={style.typeName}>{type.name}</div> */}
              </span>
            ))}
          </div>
        </td>
        <td className="align-middle">
          <div className="d-flex justify-content-center align-items-center">
            <XSquare
              onClick={() =>
                window.confirm(
                  `Êtes-vous sûr de vouloir supprimer ce Pokémon : ${pokemon.name.fr} ?`
                ) && handleDeleteClick(pokemon.pokedex_id, pokemon.name.fr)
              }
              size={20}
              color="#dc3546"
              style={{ cursor: "pointer" }}
            />
          </div>
        </td>
      </tr>
    );
  });
  return (
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
  );
};

export default PokedexTable;
