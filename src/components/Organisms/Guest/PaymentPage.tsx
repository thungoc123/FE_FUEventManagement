import React, { useState, useEffect } from "react";
import { Button } from "@relume_io/relume-ui";
import { useLazySendPaymentInfoQuery } from "../../../Features/Payment/paymentApi";
import { useNavigate, useLocation } from "react-router-dom";

interface Payment1Props {
  eventDetails: any;
  quantity: number;
}

const Payment1: React.FC<Payment1Props> = ({ eventDetails, quantity }) => {
  const [email, setEmail] = useState<string>("tienntse171382@fpt.edu.vn");
  const [amount, setAmount] = useState(0);
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  const [trigger, { isLoading, data, error }] = useLazySendPaymentInfoQuery();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (eventDetails) {
      setAmount(eventDetails.price * quantity);
    }
  }, [eventDetails, quantity]);

  const handlePayment = async () => {
    if (!email) {
      alert("Email is not available");
      return;
    }

    try {
      await trigger({
        amount,
        email,
        quantity,
        eventId: eventDetails.id,
      }).unwrap();
    } catch (err: any) {
      console.error("Failed to send payment information:", err);
      alert(
        `Failed to send payment information: ${
          err.message || "Unknown error occurred"
        }`
      );
    }
  };

  useEffect(() => {
    if (data) {
      console.log("Response from backend:", data);
      if (data.status === "ok") {
        setPaymentSuccessful(true);
        // Redirect to payment URL and wait for the payment to complete
        window.location.href = data.url;
      } else {
        alert(`Payment failed: ${data.message}`);
      }
    }
  }, [data]);

  useEffect(() => {
    if (paymentSuccessful) {
      navigate("/", { state: { message: "Bạn đã đặt vé thành công!" } });
    }
  }, [paymentSuccessful, navigate]);

  const getErrorMessage = (error: any) => {
    if (error?.data?.message) {
      return error.data.message;
    }
    if (error?.error) {
      return error.error;
    }
    return `Unknown error occurred: ${JSON.stringify(error)}`;
  };

  const handleCancel = () => {
    navigate("/paymentpage");
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
              onClick={handlePayment}
              className="w-1/2 bg-blue-500 text-white p-3 rounded-lg font-semibold"
              disabled={isLoading}
            >
              {isLoading ? "Đang xử lý..." : "Thanh toán"}
            </Button>

            <Button
              onClick={handleCancel}
              className="w-1/2 bg-red-500 text-white p-3 rounded-lg font-semibold"
            >
              Cancel
            </Button>
            {error && (
              <p className="text-red-500">Error: {getErrorMessage(error)}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment1;
