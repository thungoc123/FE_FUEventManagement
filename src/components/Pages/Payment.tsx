import { useLocation, useParams } from "react-router-dom";
import { Footer } from "../Organisms/Guest/FooterPayment";
import HeaderTable from "../Organisms/Guest/HeaderTable";
// import { Navbar2 } from "../Organisms/Guest/Navbar";
import { useGetEventDetailsQuery } from "../../Features/Event/eventDisplayApi";
import { Navbar2 } from "../Organisms/Guest/Navbar";

export const Payment = () => {
  const { id } = useParams<{ id: string }>();

  const location = useLocation();
  // const eventDetails = location.state?.eventDetails; // Lấy eventDetails từ state
  const eventId = location.state?.eventId; // Lấy eventId từ state
  if (!id) {
    return <div>Error: Event ID is missing.</div>;
  }
  const { data, error, isLoading } = useGetEventDetailsQuery(id);

  if (isLoading) return <div className="loader"></div>;
  if (error) {
    let errorMessage;
    if ("status" in error) {
      errorMessage =
        "error" in error ? error.error : JSON.stringify(error.data);
    } else {
      errorMessage = error.message;
    }
    return <div>Error: {errorMessage}</div>;
  }
  const eventDetails = data; 
  const eventID = data?.id ?? "No event name available";
  const eventName = data?.name ?? "No description available";
  const Price = data?.price ? [data.stateEvent.name] : [];
  const date = data?.timestart
    ? new Date(data.timestart).toLocaleDateString()
    : "No date available";
    const quantity = data?.quantity ?? "No event name available";

  
  return (
    <>
      <Navbar2 />
      <HeaderTable 
      eventId={id}
      eventDetails={eventName}
      
 
      />
      <Footer />
    </>
  );
}
