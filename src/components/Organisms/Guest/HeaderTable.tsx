import React, { useState, ChangeEvent } from "react";
import Modal from "react-modal";
import "react-dropdown/style.css";
import { Button } from "@relume_io/relume-ui";
import { RxCube } from "react-icons/rx";
const HeaderTable: React.FC = () => {
  const [quantities, setQuantities] = useState<number[]>([1, 1]);
  const [showDropdown, setShowDropdown] = useState<number | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

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

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-left" >Heading goes here</h2>
          <p className="text-sm text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros.
          </p>
        </div>
        <Button onClick={openModal}>Check out</Button>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Transaction ID</th>
            <th className="px-4 py-2 border-b">Event</th>
            <th className="px-4 py-2 border-b">Date</th>
            <th className="px-4 py-2 border-b">Price</th>
            <th className="px-4 py-2 border-b">Quantity</th>
            <th className="px-4 py-2 border-b">Status</th>
            <th className="px-4 py-2 border-b"></th>
          </tr>
        </thead>
        <tbody>
          {quantities.map((quantity, index) => (
            <tr key={index}>
              <td className="px-4 py-2 border-b"></td>
              <td className="px-4 py-2 border-b"></td>
              <td className="px-4 py-2 border-b"></td>
              <td className="px-4 py-2 border-b"></td>
              <td className="px-4 py-2 border-b">
                <input
                  className="w-16 px-2 py-1 border border-gray-300 rounded"
                  type="number"
                  value={quantity}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleQuantityChange(index, Number(e.target.value))
                  }
                  min="0"
                />
              </td>
              <td className="px-4 py-2 border-b text-500">Not complete</td>
              <td className="px-4 py-2 border-b">
                <div className="relative">
                  <button
                    onClick={() => handleMenuClick(index)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    ...
                  </button>
                  {showDropdown === index && (
                    <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-lg">
                      {options.map((option) => (
                        <div
                          key={option}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleOptionSelect(option, index)}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="fixed inset-0 flex items-center justify-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded shadow-lg w-96">
          <h2 className="text-xl font-bold">
            <Button variant="tertiary" size="icon">
              <RxCube />
            </Button>
            Payment method
          </h2>
          <div className="mt-4">
            <label className="flex items-center p-4 border border-gray-200 rounded mb-2 cursor-pointer">
              <input type="radio" name="payment-method" className="mr-2" />
              <span>QR CODE</span>
            </label>
            <label className="flex items-center p-4 border border-gray-200 rounded mb-2 cursor-pointer">
              <input type="radio" name="payment-method" className="mr-2" />
              <span>Payment in Cash</span>
            </label>
            {/* <label className="flex items-center p-4 border border-gray-200 rounded mb-2 cursor-pointer">
              <input type="radio" name="payment-method" className="mr-2" />
              <span>Option 3</span>
            </label> */}
          </div>
          <button
            className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default HeaderTable;
