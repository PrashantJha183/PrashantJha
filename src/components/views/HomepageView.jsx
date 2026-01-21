import Hero from "../homepage/Hero";
import ErrorBoundary from "../base/ErrorBoundary";
import ClientSlider from "../homepage/ClientSlider";
import TestimonialsCarousel from "../homepage/TestimonialsCarousel";
import Services from "../homepage/Services";
import Gallery from "../homepage/Gallery";
import Choose from "../homepage/Choose";

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
        <TestimonialsCarousel />
      </ErrorBoundary>


    </>
  );
};
export default HomepageView;
