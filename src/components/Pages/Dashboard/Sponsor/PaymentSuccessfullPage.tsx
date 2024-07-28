import { useNavigate } from 'react-router-dom';
import { Button } from "@relume_io/relume-ui"; // Assuming you're using relume-ui for buttons

const PaymentSuccessfullPage = () => {
  const navigate = useNavigate();

  const handleGoHome = async() => {
    navigate('/sponsor/dashboard/program/call-capital');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4 ">Payment Successful!</h1>
        <p className="text-gray-700 mb-6">Thank you for your purchase. Your payment has been successfully processed.</p>
        <div className="flex justify-center space-x-4">
          <Button
            onClick={handleGoHome}
            className="bg-blue-500 text-white p-3 rounded-lg font-semibold"
          >
            Go to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessfullPage;
