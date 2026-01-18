import AboutIntro from "../aboutpage/AboutIntro";
import Experience from "../aboutpage/Experience";
import AboutService from "../aboutpage/AboutService";
import ErrorBoundary from "../base/ErrorBoundary";
const AboutPageView = () => {
  return (
    <>
      <ErrorBoundary>
        <AboutIntro />
      </ErrorBoundary>


      <ErrorBoundary>
        <Experience />
      </ErrorBoundary>

      <ErrorBoundary>
        <AboutService />
      </ErrorBoundary>
    </>
  );
};
export default AboutPageView;
