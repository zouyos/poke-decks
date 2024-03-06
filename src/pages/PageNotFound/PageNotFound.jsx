import ronflex from "../../assets/img/ronflex.jpg";

export default function PageNotFound() {
  return (
    <div className="container-fluid p-2 d-flex flex-column justify-content-center align-items-center">
      <img src={ronflex} alt="Ronflex" width="600" />
      <h1>404 - Page Not Found</h1>
    </div>
  );
}
