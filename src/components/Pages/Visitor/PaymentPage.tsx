// src/pages/PaymentPage.tsx

import { Footer } from "../../Organisms/Guest/FooterPayment";
import { Navbar2 } from "../../Organisms/Guest/Navbar";
import Payment1 from "../../Organisms/Guest/PaymentPage";
import { useLocation } from "react-router-dom";

export const PaymentPage = () => {
  const location = useLocation();
  const eventDetails = location.state?.eventDetails;
  const quantity = location.state?.quantity;
  
  return (
    <>
      <Navbar2 />
      <Payment1 eventDetails={eventDetails} quantity={quantity} />
      <Footer />
    </>
  );
};
