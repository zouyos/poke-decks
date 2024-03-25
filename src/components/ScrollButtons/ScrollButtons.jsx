import { useState } from "react";
import { useEffect } from "react";
import { ArrowUpCircle, ArrowDownCircle } from "react-bootstrap-icons";
import style from "./style.module.css";

const ScrollButtons = () => {
  const [isButtonTopVisible, setIsButtonTopVisible] = useState(false);
  const [isButtonDownVisible, setIsButtonDownVisible] = useState(false);
  const [scrollPossible, setScrollPossible] = useState(false);
  const [isBottom, setIsBottom] = useState(false);

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
    const handleScroll = () => {
      setScrollPossible(
        document.documentElement.offsetHeight > window.innerHeight + 100
      );

      setIsBottom(
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 100
      );

      if (document.documentElement.scrollTop >= 100) {
        setIsButtonTopVisible(true);
        setIsButtonDownVisible(true);
        if (isBottom) {
          setIsButtonDownVisible(false);
        }
      } else if (scrollPossible) {
        setIsButtonTopVisible(false);
        setIsButtonDownVisible(true);
      } else {
        setIsButtonTopVisible(false);
        setIsButtonDownVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPossible, isBottom]);

  return (
    <div>
      <ArrowUpCircle
        color={"rgba(146, 148, 151, 0.5)"}
        size={50}
        className={style.buttonTop}
        onClick={() => scrollToPosition("top")}
        style={{ display: isButtonTopVisible ? "block" : "none" }}
      />
      <ArrowDownCircle
        color={"rgba(146, 148, 151, 0.5)"}
        size={50}
        className={style.buttonDown}
        onClick={() => scrollToPosition("bottom")}
        style={{ display: isButtonDownVisible ? "block" : "none" }}
      />
    </div>
  );
};

export default ScrollButtons;
