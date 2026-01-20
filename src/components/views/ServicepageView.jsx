import ServiceHero from "../servicepage/ServiceHero";
import ErrorBoundary from "../base/ErrorBoundary";
import ServiceGrid from "../servicepage/ServiceGrid";
import ProcessTimeline from "../servicepage/ProcessTimeline";
import UseCases from "../servicepage/UseCases";
import WhyChooseMe from "../servicepage/WhyChooseMe";
const ServicePageView = () => {
  return (
    <>
      <ErrorBoundary>
        <ServiceHero />
      </ErrorBoundary>

      <ErrorBoundary>
        <ServiceGrid />
      </ErrorBoundary>


      <ErrorBoundary>
        <ProcessTimeline />
      </ErrorBoundary>



      <ErrorBoundary>
        <UseCases />
      </ErrorBoundary>


      <ErrorBoundary>
        <WhyChooseMe />
      </ErrorBoundary>
    </>
  );
};
export default ServicePageView;
