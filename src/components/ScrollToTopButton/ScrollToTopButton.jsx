import { useState } from "react";
import { useEffect } from "react";
import { ArrowUpCircle } from "react-bootstrap-icons";
import style from "./style.module.css";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
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
    <ArrowUpCircle
      color={"rgba(146, 148, 151, 0.8)"}
      size={50}
      className={style.button}
      onClick={scrollToTop}
      style={{ display: isVisible ? "block" : "none" }}
    >
      Go to Top
    </ArrowUpCircle>
  );
};

export default ScrollToTopButton;
