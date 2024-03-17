import { XSquare } from "react-bootstrap-icons";
import Table from "react-bootstrap/Table";
import style from "./style.module.css";
import { useEffect, useState } from "react";

const PokedexTable = ({ pokemons, handleClick, savedPokemons }) => {
  const [noPokemons, setNoPokemons] = useState(true);

  useEffect(() => {
    if (savedPokemons.length > 0) {
      setNoPokemons(false);
    } else {
      setNoPokemons(true);
    }
  }, [savedPokemons]);

  const warning = (
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
  );

  const tds = pokemons.map((pokemon, i) => {
    return (
      <tr key={i}>
        <td className="text-center fs-4 fw-bold">#{pokemon.pokedex_id}</td>
        <td>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <div className="mb-1 fst-italic text-center text-wrap">
              {pokemon.name.fr}
            </div>
            <img
              src={pokemon.sprites.regular}
              alt={pokemon.name.fr}
              className={style.image}
            />
          </div>
        </td>
        <td>
          <div className="d-flex justify-content-center align-items-center flex-wrap">
            {pokemon.types.map((type, i) => (
              <span className="m-2" key={i}>
                <img
                  src={type.image}
                  alt={`Type ${type.image}`}
                  className={style.type}
                />
              </span>
            ))}
          </div>
        </td>
        <td>
          <div className="d-flex justify-content-center align-items-center">
            <XSquare
              onClick={() =>
                window.confirm(
                  `Êtes-vous sûr de vouloir supprimer ce Pokémon : ${pokemon.name.fr} ?`
                ) && handleClick(pokemon.pokedex_id, pokemon.name.fr)
              }
              size={20}
              color="#ffffff"
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
          <th className="text-center">Pokédex ID</th>
          <th className="text-center">Identité</th>
          <th className="text-center">Types</th>
          <th className="text-center"></th>
        </tr>
      </thead>
      <tbody>{noPokemons ? warning : tds}</tbody>
    </Table>
  );
};

export default PokedexTable;