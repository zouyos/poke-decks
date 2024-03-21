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
      className="btn btn-danger"
      disabled={disabled}
      style={{ boxShadow: "4px 2px 4px rgba(0,0,0,0.4)" }}
    >
      {children}
    </button>
  );
}
