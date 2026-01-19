import Hero from "../homepage/Hero";
import ErrorBoundary from "../base/ErrorBoundary";
const ServicePageView = () => {
  return (
    <>
      <ErrorBoundary>
        <Hero />
      </ErrorBoundary>
    </>
  );
};
export default ServicePageView;
