import { ArrowRepeat } from "react-bootstrap-icons";

export default function ReloadButton({ onClick, disable }) {
  return (
    <button onClick={onClick} className="btn btn-danger" disabled={disable}>
      <ArrowRepeat size={50} />
    </button>
  );
}
