import { useState } from "react";
import { ArrowRepeat } from "react-bootstrap-icons";

export default function ReloadButton({ pickRandomSelection }) {
  const [disable, setDisable] = useState(false);

  const handleClick = () => {
    pickRandomSelection(3);

    // setDisable(true);
    // setTimeout(() => {
    //   setDisable(false);
    // }, 5 * 60 * 1000);
  };

  return (
    <button onClick={handleClick} className="btn btn-danger" disabled={disable}>
      <ArrowRepeat size={50} />
    </button>
  );
}
