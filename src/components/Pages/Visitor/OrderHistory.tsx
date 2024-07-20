import OrderHistoryTable from "../../Organisms/Visitor/OrderHistoryTable";
import { Footer } from "../../Organisms/Guest/FooterPayment";
import { Navbar2 } from "../../Organisms/Guest/Navbar";

export const OrderHistory = () => {
  return (
    <>
      <Navbar2 />
      <OrderHistoryTable />
      <Footer />
    </>
  );
};
