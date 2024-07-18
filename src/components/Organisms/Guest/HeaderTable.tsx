import React, { useState, ChangeEvent } from "react";
import Modal from "react-modal";
import { Button } from "@relume_io/relume-ui";
import { useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../../../Features/Order/orderApi";
import { useGetVisitorByAccountIdQuery } from "../../../Features/Order/ticketApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { Event } from "../../../Types/event.type";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface HeaderTableProps {
  eventId: string;
  eventDetails: Event;
}

const HeaderTable: React.FC<HeaderTableProps> = ({ eventId, eventDetails }) => {
  const [quantities, setQuantities] = useState<number[]>([1]);
  const [showDropdown, setShowDropdown] = useState<number | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("option1");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const [createOrder] = useCreateOrderMutation();
  const accountId = useSelector((state: RootState) => state.auth.accountId); // Get accountId from Redux store
  const token = useSelector((state: RootState) => state.auth.token); // Get token from Redux store

  // Use the useGetVisitorByAccountIdQuery hook to fetch visitorId
  const { data: visitorData, error: visitorError, isLoading: isVisitorLoading } = useGetVisitorByAccountIdQuery(accountId, {
    skip: !accountId, // Skip the query if accountId is not available
  });

  if (visitorError) {
    toast.error("Error fetching visitor data: " + visitorError.message);
  }

  const handleQuantityChange = (index: number, value: number) => {
    if (value >= 0) {
      const newQuantities = [...quantities];
      newQuantities[index] = value;
      setQuantities(newQuantities);
    }
  };

  const handleMenuClick = (index: number) => {
    setShowDropdown(index === showDropdown ? null : index);
  };

  const handleOptionSelect = (option: string, index: number) => {
    if (option === "Edit") {
      alert(`Edit item at index ${index}`);
    } else if (option === "Delete") {
      alert(`Delete item at index ${index}`);
    }
    setShowDropdown(null);
  };

  const options = ["Edit", "Delete"];

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleCreateOrder = async () => {
    setErrorMessage(null);
    const currentDate = new Date();
    const eventStartDate = new Date(eventDetails.timeclosesale);

    if (eventStartDate < currentDate) {
      setErrorMessage("Cannot create ticket for expired event.");
      toast.error("Cannot create ticket for expired event.");
      return;
    }

    if (!accountId || !visitorData || !Array.isArray(visitorData) || visitorData.length === 0) {
      toast.error("Account ID or Visitor ID is missing.");
      return;
    }

    const visitorId = visitorData[0].visitorId; // Access the first element to get visitorId
    const orderDetails = {
      order: {
        visitorId: parseInt(visitorId, 10), // Ensure visitorId is a number
        eventId: eventDetails.id,
        statusCart: false,
        status: "PENDING",
        quantity: quantities[0]
      },
      headers: { // Include token in headers for authentication
        Authorization: `Bearer ${token}`
      }
    };

    console.log("Order details:", orderDetails); // Log the order details

    try {
      const response = await createOrder(orderDetails).unwrap();
      console.log("Order creation response:", response);
      const ticketId = response.TicketId; // Adjust according to your API response structure
      console.log("Ticket ID:", ticketId);
      if (response.message === "Ticket created successfully" && ticketId) {
        toast.success("Ticket created successfully");
        navigate("/paymentpage", { state: { eventDetails, quantity: quantities[0], ticketId } });
        console.log(ticketId);
      } else {
        toast.error("Order creation failed: " + response.message);
      }
    } catch (err) {
      toast.error("Failed to create order: " + err.message);
      setErrorMessage("Failed to create order.");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-left">Event Ticket</h2>
          <p className="text-sm text-gray-600"></p>
        </div>
        <Button onClick={handleCreateOrder} disabled={isVisitorLoading || !visitorData}>Check out</Button>
      </div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Event ID</th>
            <th className="px-4 py-2 border-b">Event Name</th>
            <th className="px-4 py-2 border-b">Price</th>
            <th className="px-4 py-2 border-b">Date</th>
            <th className="px-4 py-2 border-b">Quantity</th>
            <th className="px-4 py-2 border-b">Status</th>
            <th className="px-4 py-2 border-b"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-2 border-b text-center">{eventDetails.id}</td>
            <td className="px-4 py-2 border-b text-center">{eventDetails.name}</td>
            <td className="px-4 py-2 border-b text-center">{eventDetails.price}</td>
            <td className="px-4 py-2 border-b text-center">
              {new Date(eventDetails.timestart).toLocaleDateString()}
            </td>
            <td className="px-4 py-2 border-b text-center">
              <input
                className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
                type="number"
                value={quantities[0]}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleQuantityChange(0, Number(e.target.value))
                }
                min="0"
              />
            </td>
            <td className="px-4 py-2 border-b text-center">PENDING</td>
            <td className="px-2 py-2 border-b">
              <div className="relative">
                <button
                  onClick={() => handleMenuClick(0)}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  ...
                </button>
                {showDropdown === 0 && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-lg z-10">
                    {options.map((option) => (
                      <div
                        key={option}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleOptionSelect(option, 0)}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="fixed inset-0 flex items-center justify-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 shadow-lg w-96">
          {/* Component PaymentMethod chưa được định nghĩa trong câu hỏi này */}
          {/* <PaymentMethod
            selectedOption={selectedOption}
            onChange={setSelectedOption}
            onClose={closeModal}
          /> */}
        </div>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default HeaderTable;