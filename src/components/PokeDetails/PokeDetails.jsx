import style from "./style.module.css";

export function PokeDetails({ pokemon, onClick }) {
  const pokemonTypes = pokemon.types.map((type, i) => {
    return (
      <ul className="list-unstyled" key={i}>
        <li className={pokemon.types.length < 2 ? style.typeContainer : ""}>
          <div>
            <img src={type.image} alt={type.name} className={style.type} />
            {type.name === "Électrik" ? "Électrique" : type.name}
          </div>
        </li>
      </ul>
    );
  });

  return (
    <>
      <div
        className="card mx-3 border border-2 border-danger"
        style={{ width: "18rem" }}
      >
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
          <div
            onClick={() => onClick(pokemon)}
            className="btn btn-outline-danger"
          >
            Ajouter au Pokédex
          </div>
        </div>
      </div>
    </>
  );
}
