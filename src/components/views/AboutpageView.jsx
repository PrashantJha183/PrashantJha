import AboutIntro from "../aboutpage/AboutIntro";
import Experience from "../aboutpage/Experience";
import AboutService from "../aboutpage/AboutService";
import Story from "../aboutpage/Story";

import ClientSlider from "../homepage/ClientSlider";
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


      <ErrorBoundary>
        <ClientSlider />
      </ErrorBoundary>

      <ErrorBoundary>
        <Story />
      </ErrorBoundary>
    </>
  );
};
export default AboutPageView;
