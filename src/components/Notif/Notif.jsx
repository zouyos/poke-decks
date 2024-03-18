import Alert from "react-bootstrap/Alert";
import style from "./style.module.css";

function Notif({ variant, message, onClose, heading }) {
  return (
    <>
      <Alert
        className={style.alert}
        variant={variant}
        dismissible
        onClose={() => onClose(true)}
      >
        {heading && (
          <Alert.Heading className="text-wrap">{heading}</Alert.Heading>
        )}
        <span className="text-wrap">{message}</span>
      </Alert>
    </>
  );
}

export default Notif;
