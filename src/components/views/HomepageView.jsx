import Hero from "../homepage/Hero";
import ErrorBoundary from "../base/ErrorBoundary";
import ClientSlider from "../homepage/ClientSlider";
import Services from "../homepage/Services";
const HomepageView = () => {
  return (
    <>
      <ErrorBoundary>
        <Hero />
      </ErrorBoundary>

      <ErrorBoundary>
        <ClientSlider />
      </ErrorBoundary>
      <ErrorBoundary>
        <Services />
      </ErrorBoundary>
    </>
  );
};
export default HomepageView;
