import Alert from "react-bootstrap/Alert";
import style from "./style.module.css";

function Notifs({ variant, message, onClose }) {
  return (
    <>
      <Alert
        className={style.alert}
        variant={variant}
        dismissible
        onClose={() => onClose(true)}
      >
        {message}
      </Alert>
    </>
  );
}

export default Notifs;
