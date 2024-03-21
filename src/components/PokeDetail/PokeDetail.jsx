import style from "./style.module.css";
import pokedex from "../../assets/img/pokedex_icon.png";
import { Card } from "react-bootstrap";

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

  // function changeScoreColor(score) {
  //   if (score < 100) {
  //     return "text-success";
  //   } else if (score >= 100 && score < 200) {
  //     return "text-primary";
  //   } else if (score >= 200 && score < 300) {
  //     return "text-warning";
  //   } else if (score >= 300 && score < 400) {
  //     return "text-danger";
  //   } else if (score >= 400) {
  //     return "text-dark";
  //   }
  // }

  return (
    <>
      <Card className={style.card}>
        <div className="d-flex justify-content-between">
          <p className={`text-danger py-1 px-2 mb-0 fw-bold`}>
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
