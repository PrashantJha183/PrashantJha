import Home from "../homepage/Home";
import ErrorBoundary from "../base/ErrorBoundary";
const PricingPageView = () => {
  return (
    <>
      <ErrorBoundary>
        <Home />
      </ErrorBoundary>
    </>
  );
};
export default PricingPageView;
