import style from "./style.module.css";

export default function Pokedex() {
  return (
    <div className={style.center}>
      <div className="fs-2 border border-danger text-danger p-4 rounded">
        Vous n'avez aucun Pokémon pour l'instant
      </div>
    </div>
  );
}
