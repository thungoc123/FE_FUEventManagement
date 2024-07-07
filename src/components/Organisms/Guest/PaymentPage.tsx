// src/Organisms/Guest/PaymentPage.tsx

import React, { useState } from 'react';
import QRCode from 'qrcode.react'; // Make sure to install this package using `npm install qrcode.react`
import { Button } from '@relume_io/relume-ui';

interface Payment1Props {
  eventDetails: any;
  quantity: number;
}

const Payment1: React.FC<Payment1Props> = ({ eventDetails, quantity }) => {
  const [showQRCode, setShowQRCode] = useState(false);

  const handleCheckboxChange = () => {
    setShowQRCode(!showQRCode);
  };
  const handlePayment = () =>{ 

  }
  return (
    <div className="min-h-screen bg-white p-4 flex">
      <div className="w-1/2 pr-4">
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
              <p className="text-gray-700">{eventDetails?.price}</p>
            </div>
            <div className="mb-2">
              <h3 className="text-lg font-semibold">Date</h3>
              <p className="text-gray-700">{new Date(eventDetails?.timestart).toLocaleString()}</p>
            </div>
            <div className="mb-2">
              <h3 className="text-lg font-semibold">Quantity</h3>
              <p className="text-gray-700">{quantity}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/2 pl-4">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Payment</h2>
          <div className="flex items-center mb-6">
            <input 
              type="checkbox" 
              id="vnpay" 
              className="mr-2" 
              checked={showQRCode} 
              onChange={handleCheckboxChange} 
            />
            <label htmlFor="vnpay" className="text-gray-700">VNpay</label>
          </div>
              
          <Button 
          onChange={handlePayment}
          
          className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold">Thanh toán</Button>
        </div>
      </div>
    </div>
  );
}

export default Payment1;
