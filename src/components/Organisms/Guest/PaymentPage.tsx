// src/Organisms/Guest/PaymentPage.tsx

import React, { useState, useEffect } from 'react';
import { Button } from '@relume_io/relume-ui';
import { useLazySendPaymentInfoQuery } from '../../../Features/Payment/paymentApi';

interface Payment1Props {
  eventDetails: any;
  quantity: number;
}

const Payment1: React.FC<Payment1Props> = ({ eventDetails, quantity }) => {
  const [email, setEmail] = useState<string>('tienntse171382@fpt.edu.vn'); // Đặt email mặc định
  const [amount, setAmount] = useState(0);
  const [trigger, { isLoading, data, error }] = useLazySendPaymentInfoQuery();

  useEffect(() => {
    if (eventDetails) {
      setAmount(eventDetails.price * quantity);
    }
  }, [eventDetails, quantity]);

  const handlePayment = async () => {
    if (!email) {
      alert('Email is not available');
      return;
    }

    try {
      await trigger({ amount, email }).unwrap();
    } catch (err: any) {
      console.error('Failed to send payment information:', err);
      alert(`Failed to send payment information: ${err.message || 'Unknown error occurred'}`);
    }
  };

  useEffect(() => {
    if (data) {
      console.log('Response from backend:', data);
      if (data.status === 'ok') {
        alert('Payment information sent successfully!');
        // Redirect to payment URL
        window.location.href = data.url;
      } else {
        alert(`Payment failed: ${data.message}`);
      }
    }
  }, [data]);

  const getErrorMessage = (error: any) => {
    if (error?.data?.message) {
      return error.data.message;
    }
    if (error?.error) {
      return error.error;
    }
    return `Unknown error occurred: ${JSON.stringify(error)}`;
  };

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
              <p className="text-gray-700">{amount}</p>
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
          <h2 className="text-xl font-semibold mb-2">Thanh Toán</h2>
          <Button 
            onClick={handlePayment}
            className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold"
            disabled={isLoading}
          >
            {isLoading ? 'Đang xử lý...' : 'Thanh toán'}
          </Button>
        </div>

        {error && <p>Error: {getErrorMessage(error)}</p>}
        {data && data.status === 'ok' && <p>Payment information sent successfully!</p>}
      </div>
    </div>
  );
};

export default Payment1;
