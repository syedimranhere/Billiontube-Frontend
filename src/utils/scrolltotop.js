import { useEffect } from "react";
import { useLocation } from "react-router-dom";

//so that everytime we navigate to a new page the top of the page is visible
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;
