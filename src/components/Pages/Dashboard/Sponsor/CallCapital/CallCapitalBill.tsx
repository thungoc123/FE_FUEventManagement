import React from 'react';
import { useNavigate } from 'react-router-dom';

const CallCapitalBill: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gray-100">
      <button 
        onClick={handleGoBack}
        className="absolute top-4 left-4 bg-blue-500 text-white p-2 rounded-lg font-semibold"
      >
        Back
      </button>
      <Invoice />
    </div>
  );
}

const Invoice: React.FC = () => {
  const recipient = "NGUYEN VAN A";
  const amount = "$100";
  const eventName = "Annual Conference";

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-96 h-96">
      <h1 className="text-2xl font-bold mb-4 text-center text-red-500">CALL CAPITAL BILL</h1>
      <p className="mb-2"><strong>Người nhận:</strong> {recipient}</p>
      <p className="mb-2"><strong>Số tiền:</strong> {amount}</p>
      <p className="mb-2"><strong>Event Name:</strong> {eventName}</p>
    </div>
  );
}

export default CallCapitalBill;