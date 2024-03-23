import { useEffect, useState } from "react";

export function useScrollPosition() {
  const [isBottom, setIsBottom] = useState(false);

  useEffect(() => {
    const listener = window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener(listener);
    };
  }, []);

  function handleScroll() {
    setIsBottom(
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight
    );
  }
  return { isBottom };
}
