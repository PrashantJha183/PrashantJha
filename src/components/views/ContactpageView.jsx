import Home from "../homepage/Home";
import ErrorBoundary from "../base/ErrorBoundary";
const ContactPageView = () => {
  return (
    <>
      <ErrorBoundary>
        <Home />
      </ErrorBoundary>
    </>
  );
};
export default ContactPageView;
