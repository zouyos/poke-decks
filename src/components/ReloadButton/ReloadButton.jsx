import { ArrowRepeat } from "react-bootstrap-icons";

export default function ReloadButton({ onClick, disabled }) {
  return (
    <button onClick={onClick} className="btn btn-danger" disabled={disabled}>
      <ArrowRepeat size={50} />
    </button>
  );
}
