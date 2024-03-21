import style from "./style.module.css";
import pokedex from "../../assets/img/pokedex_icon.png";
import { Card } from "react-bootstrap";
import { changeScoreColor } from "../../config/config";

export function PokeDetail({ pokemon, pokedexIcon, children }) {
  const pokemonTypes = pokemon.types.map((type, i) => {
    return (
      <ul className="list-unstyled" key={i}>
        <li className={pokemon.types.length < 2 ? style.typeContainer : ""}>
          <div>
            <img src={type.image} alt={type.name} className={style.type} />
            {type.name}
          </div>
        </li>
      </ul>
    );
  });

  return (
    <>
      <Card className={style.card}>
        <div className="d-flex justify-content-between">
          <p
            className="py-1 px-2 mb-0 fw-bold"
            style={{ color: changeScoreColor(pokemon.name.fr) }}
          >
            {pokemon.score} pts
          </p>
          {pokedexIcon && (
            <img
              src={pokedex}
              alt="Icône Pokédex"
              className="px-2 pt-2 mb-0"
              style={{
                width: "auto",
                height: "40px",
                position: "absolute",
                right: "0",
              }}
            />
          )}
        </div>
        <Card.Img
          variant="top"
          src={pokemon.sprites.regular}
          alt={pokemon.name.fr}
        />
        <Card.Body>
          <Card.Title className="fs-2 fw-bold text-center mb-3">
            {pokemon.name.fr}
          </Card.Title>
          <p className="fs-5 text-decoration-underline mb-3">Type(s) :</p>
          <div>{pokemonTypes}</div>
          {children}
        </Card.Body>
      </Card>
    </>
  );
}
