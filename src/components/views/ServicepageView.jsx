import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import ServiceHero from "../servicepage/ServiceHero";
import ErrorBoundary from "../base/ErrorBoundary";
import ServiceGrid from "../servicepage/ServiceGrid";
import ProcessTimeline from "../servicepage/ProcessTimeline";
import UseCases from "../servicepage/UseCases";
import WhyChooseMe from "../servicepage/WhyChooseMe";

const ServicePageView = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(
        location.hash.replace("#", "")
      );
      if (el) {
        el.scrollIntoView({
          behavior: "auto", //  no smooth scroll
          block: "start",
        });
      }
    }
  }, [location]);

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
