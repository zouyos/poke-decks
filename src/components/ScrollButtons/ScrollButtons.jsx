import { useRef, useState } from "react";
import { useEffect } from "react";
import { ArrowUpCircle, ArrowDownCircle } from "react-bootstrap-icons";
import style from "./style.module.css";
import { useScrollPosition } from "../../hooks/useScrollPosition";

const ScrollButtons = ({ hideScrollButtons }) => {
  const [isButtonTopVisible, setIsButtonTopVisible] = useState(false);
  const [isButtonDownVisible, setIsButtonDownVisible] = useState(false);

  const isFirstRender = useRef(true);

  const { isTop, isBottom, scrollPossible } = useScrollPosition();

  const scrollToPosition = (position) => {
    if (position === "top") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    if (position === "bottom") {
      window.scrollTo({
        top: document.documentElement.offsetHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (!isTop) {
      setIsButtonTopVisible(true);
      setIsButtonDownVisible(true);
      if (isBottom) {
        setIsButtonTopVisible(true);
        setIsButtonDownVisible(false);
      }
    } else if (isTop && scrollPossible) {
      setIsButtonTopVisible(false);
      setIsButtonDownVisible(true);
    } else {
      setIsButtonTopVisible(false);
      setIsButtonDownVisible(false);
    }
  }, [isTop, scrollPossible, isBottom]);

  return (
    <div>
      <ArrowUpCircle
        color={"rgba(146, 148, 151, 0.5)"}
        size={50}
        className={style.buttonTop}
        onClick={() => scrollToPosition("top")}
        style={{
          display: isButtonTopVisible && !hideScrollButtons ? "block" : "none",
        }}
      />
      <ArrowDownCircle
        color={"rgba(146, 148, 151, 0.5)"}
        size={50}
        className={style.buttonDown}
        onClick={() => scrollToPosition("bottom")}
        style={{
          display: isButtonDownVisible && !hideScrollButtons ? "block" : "none",
        }}
      />
    </div>
  );
};

export default ScrollButtons;
