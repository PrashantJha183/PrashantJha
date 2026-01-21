import Blog from "../blogpage/Blog";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ErrorBoundary from "../base/ErrorBoundary";
const PricingPageView = () => {


  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(
        location.hash.replace("#", "")
      );
      if (el) {
        el.scrollIntoView({
          behavior: "auto", //  no smooth scroll
          block: "start",
        });
      }
    }
  }, [location]);
  return (
    <>
      <ErrorBoundary>
        <Blog />
      </ErrorBoundary>
    </>
  );
};
export default PricingPageView;
