import React, { useState, ChangeEvent } from "react";
import Modal from "react-modal";
import "react-dropdown/style.css";
import { Button } from "@relume_io/relume-ui";
import { RxCube } from "react-icons/rx";
import { RadioGroup, RadioGroupItem, Label } from "@relume_io/relume-ui";
import PaymentMethod from "../../Molecules/PaymentMethod";

const HeaderTable: React.FC = () => {
  const [quantities, setQuantities] = useState<number[]>([1, 1]);
  const [showDropdown, setShowDropdown] = useState<number | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("option1");

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
          <h2 className="text-xl font-bold text-left">Heading goes here</h2>
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
              <td className="px-4 py-2 border-b text-center">123456</td>
              <td className="px-4 py-2 border-b text-center">Company name</td>
              <td className="px-4 py-2 border-b text-center">1/11/2050</td>
              <td className="px-4 py-2 border-b text-center">$55.00</td>
              <td className="px-4 py-2 border-b text-center">
                <input
                  className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
                  type="number"
                  value={quantity}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleQuantityChange(index, Number(e.target.value))
                  }
                  min="0"
                />
              </td>
              {/* bg-red-100 text-black font-bold p-4 rounded-md */}
              <td className="px-2 py-2 border-b text-center">
                <span className="text-500 text-black bg-red-100 py-1 px-1"> Not complete</span>
              </td>
              <td className="px-2 py-2 border-b">
                <div className="relative">
                  <button
                    onClick={() => handleMenuClick(index)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    ...
                  </button>
                  {showDropdown === index && (
                    <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-lg z-10">
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
        <div className="bg-white p-6 shadow-lg w-96">
          <PaymentMethod
            selectedOption={selectedOption}
            onChange={setSelectedOption}
            onClose={closeModal}
          />

          {/* <h2 className="text-xl font-bold">
            <Button variant="tertiary" size="icon">
              <RxCube />
            </Button>
            Payment method
          </h2>
          
          <RadioGroup defaultValue="option-one">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-one" id="option-one" />
              <Label htmlFor="option-one">Option one</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-two" id="option-two" />
              <Label htmlFor="option-two">Option two</Label>
            </div>
          </RadioGroup> */}
          {/* <button
            className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
            
          >
            Close
          </button> */}
        </div>
      </Modal>
    </div>
  );
};

export default HeaderTable;
