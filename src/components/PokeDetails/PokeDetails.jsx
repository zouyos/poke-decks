import style from "./style.module.css";

export function PokeDetails({ pokemon }) {
  const pokemonTypes = pokemon.types.map((type) => {
    return (
      <ul className="list-unstyled">
        <li>
          <img src={type.image} alt={type.name} className={style.type} />
          {type.name === "Électrik" ? "Électrique" : type.name}
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
          <h2 className="card-title fw-bold text-center">{pokemon.name.fr}</h2>
          <h5 className="text-decoration-underline mb-3">Types :</h5>
          <div>{pokemonTypes}</div>
          <a href="#" className="btn btn-primary">
            Plus d'infos
          </a>
        </div>
      </div>
    </>
  );
}
