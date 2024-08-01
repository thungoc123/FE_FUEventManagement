import { useState, useEffect } from "react";
import { useLazySendCapitalPaymentInfoQuery } from "../../../../Features/Payment/paymentApi"; // Updated import
import { useGetSponsorByIdQuery } from "../../../../Features/Sponsor/sponsorApi"; // Import the hook
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@relume_io/relume-ui";
import Modal from "../../../Atoms/Modal";

// Extracting email from localStorage
const email = window.localStorage.getItem("email");

interface PaymentProps {
  isOpen: boolean;
  onClose: () => void;
  eventId: string;
  accountId: string | null;
  fundraising: number; // Add fundraising prop
  percentage: number; // Add percentage prop
}

const Payment = ({ isOpen, onClose, eventId, accountId, fundraising, percentage }: PaymentProps) => {
  const [amount, setAmount] = useState<string>("");
  const [sponsorId, setSponsorId] = useState<string | null>(null);
  const [capitalWay, setCapitalWay] = useState<string | null>(null);
  const [trigger, { isLoading }] = useLazySendCapitalPaymentInfoQuery(); // Updated hook

  // Use the hook to get sponsor details by accountId
  const { data: sponsorData, error: sponsorError, isLoading: sponsorLoading } = useGetSponsorByIdQuery(accountId || "");

  // Extract sponsor details from the response data
  useEffect(() => {
    if (sponsorData && Array.isArray(sponsorData) && sponsorData.length > 0) {
      const sponsor = sponsorData[0]; // Assuming you need the first sponsor
      setSponsorId(sponsor.id);
      // Optionally store sponsorId in localStorage
      window.localStorage.setItem("sponsorId", sponsor.id);
    }
  }, [sponsorData]);

  const handleAction = async () => {
    if (!amount || isNaN(Number(amount))) {
      toast.error("Please enter a valid amount.");
      return;
    }
    try {
      const result = await trigger({ amount, email, sponsorId, eventId }).unwrap(); // Updated call
      if (result.status === "ok") {
        toast.success(result.message || "Payment initiated successfully!");
        console.log("Backend response:", result);
        if (result.url) {
          window.location.href = result.url;
        }
      } else {
        toast.error(result.message || "Failed to initiate payment.");
      }
    } catch (err) {
      toast.error("Failed to send payment information.");
    }
  };

  // Handle loading and error states for the sponsor query
  if (sponsorLoading) {
    return <div>Loading sponsor details...</div>;
  }

  if (sponsorError) {
    return <div>Error loading sponsor details.</div>;
  }

  const handlePercentageClick = (percentage: number) => {
    const calculatedAmount = Math.round(fundraising * (percentage / 100)).toString();
    setAmount(calculatedAmount);
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
                <h3 className="text-sm font-semibold">Fundraising and Percentage</h3>
                <p className="text-gray-700">Fundraising: {fundraising} VND</p>
                <p className="text-gray-700">Capital Percentage: {percentage}%</p>
              </div>
              <div className="mb-2">
                <h3 className="text-sm font-semibold">Price</h3>
                {!capitalWay && (
                  <div>
                    <h1>Please choose the capital way:</h1>
                    <p onClick={() => setCapitalWay("noPercent")} className="cursor-pointer text-blue-500 underline">Capital no need percent</p>
                    <p onClick={() => setCapitalWay("needPercent")} className="cursor-pointer text-blue-500 underline">Capital need percent</p>
                  </div>
                )}
                {capitalWay && (
                  <div className="mb-4">
                    <button onClick={() => setCapitalWay(null)} className="text-black-500 cursor-pointer">
                      ← Back
                    </button>
                  </div>
                )}
                {capitalWay === "noPercent" && (
                  <input
                    className="text-gray-700"
                    type="text"
                    placeholder="Enter your money quantity for capital"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                )}
                {capitalWay === "needPercent" && (
                  <ul>
                    <li onClick={() => handlePercentageClick(50)} className="cursor-pointer text-blue-500 underline">Diamond: 50%</li>
                    <li onClick={() => handlePercentageClick(30)} className="cursor-pointer text-blue-500 underline">Gold: 30%</li>
                    <li onClick={() => handlePercentageClick(20)} className="cursor-pointer text-blue-500 underline">Silver: 20%</li>
                  </ul>
                )}
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
