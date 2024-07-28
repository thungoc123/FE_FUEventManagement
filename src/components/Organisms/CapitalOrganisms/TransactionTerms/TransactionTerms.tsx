import React from "react";
import Modal from "../../../Atoms/Modal";

interface TransactionTermsProps {
  isOpen: boolean;
  onClose: () => void;
  onTermsAccepted: () => void; // Add this prop
}

const TransactionTerms: React.FC<TransactionTermsProps> = ({
  isOpen,
  onClose,
  onTermsAccepted,
}) => {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      onTermsAccepted();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-4 max-h-96 overflow-y-auto">
        <h1 className="text-center text-xl font-semibold mb-4">Transaction Terms</h1>
        <h4 className="font-semibold mb-2">Temporary terms and conditions:</h4>
        <ul className="list-disc list-inside">
          <li className="mb-2">
            Participating in the middle of the withdrawal process will not be refunded.
          </li>
          <li className="mb-2">
            If the event is not profitable, the required shares may not be refunded.
          </li>
          <li className="mb-2">
            Investors must comply with the specified investment timelines.
          </li>
          <li className="mb-2">
            Any disputes will be resolved according to the event’s arbitration rules.
          </li>
          <li className="mb-2">
            The event organizer holds the right to amend the terms at any time.
          </li>
          <li>
            Investments are subject to market risks. Read all scheme-related documents carefully.
          </li>
        </ul>
      </div>
      <div className="p-4">
        <input type="checkbox" id="readTerms" onChange={handleCheckboxChange} />
        <label htmlFor="readTerms" className="ml-2">
          I have read all the conditions
        </label>
      </div>
    </Modal>
  );
};

export default TransactionTerms;
