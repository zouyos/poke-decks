import ronflex from "../../assets/img/ronflex.png";
import style from "./style.module.css";

export default function PageNotFound() {
  return (
    <div className={style.container}>
      <img src={ronflex} alt="Ronflex" className={style.img} />
      <h1 className="text-center text-wrap mb-0">
        Erreur 404 - Page Introuvable
      </h1>
    </div>
  );
}
