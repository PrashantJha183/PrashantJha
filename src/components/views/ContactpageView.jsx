import Contact from "../contactpage/Contact"
import ErrorBoundary from "../base/ErrorBoundary";
const ContactPageView = () => {
  return (
    <>
      <ErrorBoundary>
        <Contact />
      </ErrorBoundary>
    </>
  );
};
export default ContactPageView;
