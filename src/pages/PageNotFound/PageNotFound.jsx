import ronflex from "../../assets/img/ronflex.jpg";

export default function PageNotFound() {
  return (
    <div className="container-fluid p-2 d-flex flex-column justify-content-center align-items-center">
      <img src={ronflex} alt="Ronflex" width="600" />
      <h1>Erreur 404 - Page Introuvable</h1>
    </div>
  );
}
