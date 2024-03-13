import style from "./style.module.css";

export function PokeDetails({ pokemon, children }) {
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
      <div
        className="card mx-3 border border-2 border-danger my-2"
        style={{ width: "16rem", boxShadow: "0 4px 4px rgba(0, 0, 0, 0.25)" }}
      >
        <p className="text-danger pt-1 px-2">Score : {pokemon.score}</p>
        <img
          src={pokemon.sprites.regular}
          className="card-img-top"
          alt={pokemon.name.fr}
        />
        <div className="card-body">
          <h2 className="card-title fw-bold text-center mb-3">
            {pokemon.name.fr}
          </h2>
          <h5 className="text-decoration-underline mb-3">Type(s) :</h5>
          <div>{pokemonTypes}</div>
          {children}
        </div>
      </div>
    </>
  );
}
