import ronflex from "../../assets/img/ronflex.png";

export default function PageNotFound() {
  return (
    <div className="container p-2">
      <div className="d-flex justify-content-center">
        <img
          src={ronflex}
          alt="Ronflex"
          style={{ marginTop: "50px", width: "300px" }}
        />
      </div>
      <h1 className="text-center text-wrap">Erreur 404 - Page Introuvable</h1>
    </div>
  );
}
