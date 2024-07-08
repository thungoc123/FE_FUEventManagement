import { useLocation } from "react-router-dom";
import { Footer } from "../../Organisms/Guest/FooterPayment";
import HeaderTable from "../../Organisms/Guest/HeaderTable";
import { useGetEventDetailsQuery } from "../../../Features/Event/eventDisplayApi";
import { Navbar2 } from "../../Organisms/Guest/Navbar";

export const Payment = () => {
  const location = useLocation();
  const { eventId, eventDetails } = location.state || {};

  if (!eventId) {
    return <div>Error: Event ID is missing.</div>;
  }

  const { data, error, isLoading } = useGetEventDetailsQuery(eventId);

  if (isLoading) return <div className="loader"></div>;
  if (error) {
    let errorMessage;
    if ("status" in error) {
      errorMessage = "error" in error ? error.error : JSON.stringify(error.data);
    } else {
      errorMessage = error.message;
    }
    return <div>Error: {errorMessage}</div>;
  }

  return (
    <>
      <Navbar2 />
      {eventDetails && (
        <HeaderTable
          eventId={eventId}
          eventDetails={eventDetails || data}
        />
      )}
      <Footer />
    </>
  );
};

export default Payment;
