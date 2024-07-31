import { useState } from "react";
import { useLazySendPaymentInfoQuery } from "../../../../Features/Payment/paymentApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@relume_io/relume-ui";
import Modal from "../../../Atoms/Modal";

const email = window.localStorage.getItem("email");

interface PaymentProps {
  isOpen: boolean;
  onClose: () => void;
  eventId: string;
}

const Payment = ({
  isOpen,
  onClose,
  eventId,
}: PaymentProps) => {
  const [amount, setAmount] = useState<string>("");
  const [trigger, { isLoading }] = useLazySendPaymentInfoQuery();
 
  const handleAction = async () => {
    if (!amount || isNaN(Number(amount))) {
      toast.error("Please enter a valid amount.");
      return;
    }

    try {
      const result = await trigger({ amount, email, eventId }).unwrap();
      // Handle the response data from the backend
      if (result.status === "ok") {
        toast.success(result.message || "Payment initiated successfully!");
        console.log("Backend response:", result);
        // Redirect to the provided URL
        if (result.url) {
          window.location.href = result.url;
        }
      } else {
        toast.error(result.message || "Failed to initiate payment.");
      }
    } catch (err) {
      console.error("Failed to send payment information:", err);
      toast.error("Failed to send payment information.");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white p-4 flex items-center justify-center">
        <div className="w-2/3">
          <div className="mb-6">
            <h2 className="text-md font-semibold mb-2 text-center">
              To finish the capital, please help us with your payment
            </h2>
            <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
              <div className="mb-2">
                <h3 className="text-sm font-semibold">
                  We will send your bill by email
                </h3>
                <p className="text-gray-700">{email}</p>
              </div>
              <div className="mb-2">
                <h3 className="text-sm font-semibold">Price</h3>
                <input
                  className="text-gray-700"
                  type="text"
                  placeholder="Enter your money quantity for capital"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <Button
                onClick={handleAction}
                className="bg-blue-500 text-white p-3 rounded-lg font-semibold"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Pay for this event capital"}
              </Button>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </Modal>
  );
};

export default Payment;
