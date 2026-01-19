import Hero from "../homepage/Hero";
import ErrorBoundary from "../base/ErrorBoundary";
const PricingPageView = () => {
  return (
    <>
      <ErrorBoundary>
        <Hero />
      </ErrorBoundary>
    </>
  );
};
export default PricingPageView;
