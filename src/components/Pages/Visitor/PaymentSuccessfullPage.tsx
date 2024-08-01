import { useNavigate } from 'react-router-dom';
import { Button } from "@relume_io/relume-ui"; // Assuming you're using relume-ui for buttons
import { useUpdateTicketStatusMutation } from "../../../Features/Order/ticketApi";
import { useDispatch } from 'react-redux';
import { addNotification } from '../../../Features/Utils/notificationsSlice';

const PaymentSuccessfullPage = () => {
  const navigate = useNavigate();
  const ticketId = localStorage.getItem('ticketId');
  const [updateTicketStatus, { isLoading: isUpdating, isSuccess: isUpdateSuccess, isError: isUpdateError, error: updateError }] = useUpdateTicketStatusMutation();
  const dispatch = useDispatch();

  const handleGoHomeWithTicket = async () => {
    try {
      await updateTicketStatus({ id: ticketId, status: 'PAID' }).unwrap();
      navigate('/');
      dispatch(
        addNotification({
          id: new Date().getTime(), // Use timestamp as ID
          message: "Buy Ticket successfully!",
          type: "success",
          timestamp: Date.now(), // Current time
        })
      );
    } catch (err: any) {
      console.error(err.message || "Unknown error occurred");
    }
  };

  const handleGoHomeWithoutTicket = () => {
    navigate('/sponsor/dashboard/program/call-capital');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h1>
        <p className="text-gray-700 mb-6">
          {ticketId ? "Thank you for your purchase. Your payment has been successfully processed." : "Thank you for your capital money. Your payment has been successfully processed."}
        </p>
        <div className="flex justify-center space-x-4">
          <Button
            onClick={ticketId ? handleGoHomeWithTicket : handleGoHomeWithoutTicket}
            className="bg-blue-500 text-white p-3 rounded-lg font-semibold"
          >
            Go to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessfullPage;
