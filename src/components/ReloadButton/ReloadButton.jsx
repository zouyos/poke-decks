import { ArrowRepeat } from "react-bootstrap-icons";

export default function ReloadButton({ onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      className="btn btn-danger"
      disabled={disabled}
      style={{ boxShadow: "4px 2px 4px rgba(0,0,0,0.4)" }}
    >
      <ArrowRepeat size={50} />
    </button>
  );
}
