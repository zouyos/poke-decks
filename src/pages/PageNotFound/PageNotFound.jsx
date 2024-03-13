import ronflex from "../../assets/img/ronflex.png";

export default function PageNotFound() {
  return (
    <div className="container p-2 d-flex flex-column align-items-center">
      <img
        src={ronflex}
        alt="Ronflex"
        className="col-6"
        style={{ marginTop: "50px" }}
      />
      <h1 className="text-center">Erreur 404 - Page Introuvable</h1>
    </div>
  );
}
