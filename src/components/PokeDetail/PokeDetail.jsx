import { ArrowCounterclockwise } from "react-bootstrap-icons";

export function PokeDetail({ pokemon, onClick }) {
  const pokemonTypes = pokemon.types.map((type) => {
    return (
      <ul>
        <li className="card-text">{type.name}</li>
      </ul>
    );
  });

  return (
    <>
      <div className="card mx-3">
        <img
          src={pokemon.sprites.regular}
          className="card-img-top"
          alt={pokemon.name.fr}
        />
        <div className="card-body">
          <h3 className="card-title fw-bold">{pokemon.name.fr}</h3>
          <h5 className="text-decoration-underline">Types :</h5>
          <div>{pokemonTypes}</div>
          <a href="#" className="btn btn-primary">
            Plus d'infos
          </a>
        </div>
      </div>
      <div className="my-5 d-flex justify-content-center">
        <button onClick={() => onClick()} className="btn btn-danger">
          <ArrowCounterclockwise size={30} />
        </button>
      </div>
    </>
  );
}
