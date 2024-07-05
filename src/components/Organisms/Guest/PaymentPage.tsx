import React, { useState } from 'react';
import QRCode from 'qrcode.react'; // Make sure to install this package using `npm install qrcode.react`

function Payment1() {
  const [showQRCode, setShowQRCode] = useState(false);

  const handleCheckboxChange = () => {
    setShowQRCode(!showQRCode);
  };

  return (
    <div className="min-h-screen bg-white p-4 flex">
      <div className="w-1/2 pr-4">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Ticket</h2>
          <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
            <div className="mb-2">
              <h3 className="text-lg font-semibold">EventName</h3>
              <p className="text-gray-700">Description of the event</p>
            </div>
            <div className="mb-2">
              <h3 className="text-lg font-semibold">Price</h3>
              <p className="text-gray-700">$100</p>
            </div>
            <div className="mb-2">
              <h3 className="text-lg font-semibold">Date time buy</h3>
              <p className="text-gray-700">01/01/2023 10:00 AM</p>
            </div>
            <div className="mb-2">
              <h3 className="text-lg font-semibold">Date expired</h3>
              <p className="text-gray-700">01/01/2024 10:00 AM</p>
            </div>
            <div className="mb-2">
              <h3 className="text-lg font-semibold">Quantity &lt;= 5</h3>
              <p className="text-gray-700">4</p>
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
          {showQRCode && (
            <div className="mb-6">
              <QRCode value="https://example.com" size={128} />
            </div>
          )}
          <button className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold">Thanh toán</button>
        </div>
      </div>
    </div>
  );
}

export default Payment1;
