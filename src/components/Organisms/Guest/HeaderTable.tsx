import React, { useState, ChangeEvent } from "react";
import Modal from "react-modal";
import { Button } from "@relume_io/relume-ui";
import { useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../../../Features/Order/orderApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { Event } from "../../../Types/event.type";

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
  const visitorId = localStorage.getItem("visitorId"); // Lấy visitorId từ localStorage
  const token = useSelector((state: RootState) => state.auth.token); // Lấy token từ state

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
      return;
    }

    if (!visitorId) {
      console.log("Visitor ID is missing.");
      return;
    }

    try {
      const response = await createOrder({
        order: {
          visitorId: parseInt(visitorId, 10), // Đảm bảo visitorId là kiểu số
          eventId: eventDetails.id,
          statusCart: false,
          status: "PENDING",
          quantity: quantities[0]
        },
        headers: { // Thêm phần này để gửi token xác thực
          Authorization: `Bearer ${token}`
        }
      }).unwrap();
      if (response.message === "Ticket created successfully") {
        navigate("/paymentpage", { state: { eventDetails, quantity: quantities[0] } });
      } else {
        console.error("Order creation failed: ", response);
      }
    } catch (err) {
      console.error("Failed to create order: ", err);
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
        <Button onClick={handleCreateOrder}>Check out</Button>
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
    </div>
  );
};

export default HeaderTable;
