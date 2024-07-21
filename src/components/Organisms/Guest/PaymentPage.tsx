import React, { useState, useEffect } from "react";
import { Button } from "@relume_io/relume-ui";
import { useLazySendPaymentInfoQuery } from "../../../Features/Payment/paymentApi";
import { useDeleteTicketMutation, useUpdateTicketStatusMutation } from "../../../Features/Order/ticketApi";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { addNotification } from "../../../Features/Utils/notificationsSlice";
import { useDispatch } from "react-redux";

interface Payment1Props {
  eventDetails?: any;
  quantity?: number;
  ticketId?: string;
}

const Payment1: React.FC<Payment1Props> = () => {
  const location = useLocation();
  console.log('location.state:', location.state); // Debug logging
  const emailData = localStorage.getItem('email');
  const { eventDetails = {}, quantity = 0, ticketId = '' } = location.state || {};
  const [email, setEmail] = useState<string>(emailData);
  const [amount, setAmount] = useState(0);
  const [trigger, { isLoading, data, error }] = useLazySendPaymentInfoQuery();
  const [updateTicketStatus, { isLoading: isUpdating, isSuccess: isUpdateSuccess, isError: isUpdateError, error: updateError }] = useUpdateTicketStatusMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [deleteTicket, { isLoading: isDeleting, isSuccess: isDeleteSuccess, isError: isDeleteError, error: DeleteError }] = useDeleteTicketMutation();
  useEffect(() => {
    if (eventDetails) {
      setAmount(eventDetails.price * quantity);
    }
  }, [eventDetails, quantity]);

  const handleAction = async (action: 'payment' | 'cancel') => {
    if (action === 'payment') {
      localStorage.setItem('ticketId', ticketId);
      if (!email) {
        toast.error("Email is not available");
        return;
      }

      const requestBody = {
        amount,
        email,
        quantity,
        eventId: eventDetails.id,
      };

      toast.info("Sending payment information...");
      console.log("Request body:", requestBody);

      try {
        await trigger(requestBody).unwrap();
        toast.success("Payment information sent successfully");

        // Update the ticket status to PAID using ticketId from location state
        // await updateTicketStatus({ id: ticketId, status: 'PAID' }).unwrap();
        toast.success("Ticket status updated to PAID");

      } catch (err: any) {
        toast.error(
          `Failed to send payment information: ${
            err.message || "Unknown error occurred"
          }`
        );
      }
    } else if (action === 'cancel') {
      try {
        console.log(ticketId);
        await deleteTicket(ticketId).unwrap();
        toast.success("Ticket status updated to DELELTED");
        dispatch(
          addNotification({
            id: new Date().getTime(), // Sử dụng timestamp làm ID
            message: "Cancel payment successfully!",
            type: "success",
            timestamp: Date.now(), // Thời gian hiện tại
          })
        );
      } catch (err: any) {
        toast.error(
          `Failed to delete ticket status to CANCELLED: ${
            err.message || "Unknown error occurred"
          }`
        );
      } finally {
        navigate("/");
      }
    }
  };

  useEffect(() => {
    if (data) {
      console.log("Response from backend:", data);
      if (data.status === "ok") {
        window.location.href = data.url;
      } else {
        toast.error(`Payment failed: ${data.message}`);
      }
    }
  }, [data]);

  const getErrorMessage = (error: any) => {
    if (error?.data?.message) {
      return error.data.message;
    }
    if (error?.error) {
      return error.error;
    }
    return `Unknown error occurred: ${JSON.stringify(error)}`;
  };

  return (
    <div className="min-h-screen bg-white p-4 flex items-center justify-center">
      <div className="w-1/2">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Ticket</h2>
          <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
            <div className="mb-2">
              <h3 className="text-lg font-semibold">Event ID</h3>
              <p className="text-gray-700">{eventDetails?.id}</p>
            </div>
            <div className="mb-2">
              <h3 className="text-lg font-semibold">Event Name</h3>
              <p className="text-gray-700">{eventDetails?.name}</p>
            </div>
            <div className="mb-2">
              <h3 className="text-lg font-semibold">Price</h3>
              <p className="text-gray-700">{amount}</p>
            </div>
            <div className="mb-2">
              <h3 className="text-lg font-semibold">Date</h3>
              <p className="text-gray-700">
                {new Date(eventDetails?.timestart).toLocaleString()}
              </p>
            </div>
            <div className="mb-2">
              <h3 className="text-lg font-semibold">Quantity</h3>
              <p className="text-gray-700">{quantity}</p>
            </div>
          </div>
          <div className="flex space-x-4 mt-4">
            <Button
              onClick={() => handleAction('payment')}
              className="w-1/2 bg-blue-500 text-white p-3 rounded-lg font-semibold"
              disabled={isLoading || isUpdating}
            >
              {isLoading || isUpdating ? "Đang xử lý..." : "Thanh toán"}
            </Button>

            <Button
              onClick={() => handleAction('cancel')}
              className="w-1/2 bg-red-500 text-white p-3 rounded-lg font-semibold"
            >
              Cancel
            </Button>
            {error && (
              <p className="text-red-500">Error: {getErrorMessage(error)}</p>
            )}
            {isUpdateError && (
              <p className="text-red-500">Error: {getErrorMessage(updateError)}</p>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Payment1;
