import { ArrowRepeat } from "react-bootstrap-icons";

export default function ReloadButton({ onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      className="btn btn-danger"
      disabled={disabled}
      style={{ boxShadow: "0 4px 4px rgba(0, 0, 0, 0.25)" }}
    >
      <ArrowRepeat size={50} />
    </button>
  );
}
