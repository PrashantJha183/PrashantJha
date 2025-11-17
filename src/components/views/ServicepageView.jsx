import Home from "../homepage/Home";
import ErrorBoundary from "../base/ErrorBoundary";
const ServicePageView = () => {
  return (
    <>
      <ErrorBoundary>
        <Home />
      </ErrorBoundary>
    </>
  );
};
export default ServicePageView;
