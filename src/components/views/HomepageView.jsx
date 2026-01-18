import Hero from "../homepage/Hero";
import ErrorBoundary from "../base/ErrorBoundary";
import ClientSlider from "../homepage/ClientSlider";
import Services from "../homepage/Services";
import Gallery from "../homepage/Gallery";
import Choose from "../homepage/Choose";
import Project from "../homepage/Project";
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
      <ErrorBoundary>
        <Gallery />
      </ErrorBoundary>

      <ErrorBoundary>
        <Choose />
      </ErrorBoundary>

      <ErrorBoundary>
        <Project />
      </ErrorBoundary>
    </>
  );
};
export default HomepageView;
