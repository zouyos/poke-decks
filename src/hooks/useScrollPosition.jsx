import { useEffect } from "react";
import { useState } from "react";

export const useScrollPosition = () => {
  const [isBottom, setIsBottom] = useState(false);
  const [isTop, setIsTop] = useState(false);
  const [scrollPossible, setScrollPossible] = useState(false);

  useEffect(() => {
    const listener = window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener(listener);
    };
  }, []);

  function handleScroll() {
    setIsTop(document.documentElement.scrollTop < 100);

    setIsBottom(
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
    );

    setScrollPossible(
      document.documentElement.offsetHeight > window.innerHeight + 100
    );
  }
  return { isTop, isBottom, scrollPossible };
};
