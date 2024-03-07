export default function AddButton({ pokemon, onClick, pokemons, children }) {
  return (
    <div
      onClick={() => onClick(pokemon, pokemons)}
      className="btn btn-outline-danger"
    >
      {children}
    </div>
  );
}
