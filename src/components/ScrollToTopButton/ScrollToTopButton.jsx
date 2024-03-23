import { useState } from "react";
import { useEffect } from "react";
import { ArrowUpCircle, ArrowDownCircle } from "react-bootstrap-icons";
import style from "./style.module.css";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

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
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={style.centeredFixedDiv}>
      <ArrowUpCircle
        color={"rgba(146, 148, 151, 0.5)"}
        size={50}
        className={style.buttonTop}
        onClick={() => scrollToPosition("top")}
        style={{ display: isVisible ? "block" : "none" }}
      />
      <ArrowDownCircle
        color={"rgba(146, 148, 151, 0.5)"}
        size={50}
        className={style.buttonDown}
        onClick={() => scrollToPosition("bottom")}
        style={{ display: isVisible ? "block" : "none" }}
      />
    </div>
  );
};

export default ScrollToTopButton;
