import { useState } from "react";
import { useEffect } from "react";
import { ArrowUpCircle, ArrowDownCircle } from "react-bootstrap-icons";
import style from "./style.module.css";

const ScrollButton = () => {
  const [isButtonTopVisible, setIsButtonTopVisible] = useState(false);
  const [isButtonDownVisible, setIsButtonDownVisible] = useState(false);
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
      setIsBottom(
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight
      );

      if (window.scrollY > 200) {
        setIsButtonTopVisible(true);
        if (!isBottom) {
          setIsButtonDownVisible(true);
        }
      } else {
        setIsButtonTopVisible(false);
        setIsButtonDownVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isBottom) {
      setIsButtonDownVisible(false);
      console.log("hello");
    }
  }, [isBottom]);

  return (
    <div className={style.centeredFixedDiv}>
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

export default ScrollButton;
