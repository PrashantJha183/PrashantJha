import Hero from "../homepage/Hero";
import ErrorBoundary from "../base/ErrorBoundary";
const AboutPageView = () => {
  return (
    <>
      <ErrorBoundary>
        <Hero />
      </ErrorBoundary>
    </>
  );
};
export default AboutPageView;
