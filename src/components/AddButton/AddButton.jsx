export default function AddButton({
  pokemon,
  onClick,
  pokemons,
  children,
  disabled,
}) {
  return (
    <button
      onClick={() => onClick(pokemon, pokemons)}
      className="btn btn-outline-danger"
      disabled={disabled}
    >
      {children}
    </button>
  );
}
