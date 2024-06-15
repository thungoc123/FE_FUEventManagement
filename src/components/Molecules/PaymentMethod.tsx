import React from "react";
import type { ImgProps, ButtonProps } from "@relume_io/relume-ui";

interface PaymentOption {
  id: string;
  label: string;
  description: string;
  icon: string;
  logo: ImgProps;
}

interface PaymentMethodProps {
  options: PaymentOption[];
  selectedOption: string;
  onChange: (id: string) => void;
  onClose: () => void;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({
  options,
  selectedOption,
  onChange,
  onClose
}) => {
  return (
    <div className="p-6 max-w-lg mx-auto" onClick={onClose}>
      <div className="flex items-center mb-4">
        <img src="https://relume-assets.s3.amazonaws.com/logo-image.svg" alt="Payment icon" className="w-8 h-8 mr-2" />
        <h2 className="text-xl font-bold">Payment method</h2>
      </div >
      {options.map((option) => (
        <label onClick={(e) => e.stopPropagation()}
        /// sẽ handle phần chuyển link ở đây
          key={option.id}
          className="flex items-center justify-between p-4 mb-4 border cursor-pointer hover:bg-gray-100"
        >
          <div className="flex items-center">
            <img
              src={option.logo.src}
              alt={option.label}
              className="w-10 h-10 mr-4"
            />
            <div>
              <p className="font-bold">{option.label}</p>
              <p className="text-sm text-gray-600">{option.description}</p>
            </div>
          </div>
          {/* <input
            type="radio"
            name="payment-method"
            value={option.id}
            checked={selectedOption === option.id}
            onChange={() => onChange(option.id)}
            className="form-radio text-blue-600"
          /> */}
        </label>
      ))}
    </div>
  );
};
PaymentMethod.defaultProps = {
  options: [
    {
      logo: {
        src: "https://relume-assets.s3.amazonaws.com/logo-image.svg",
        alt: "Logo image",
      },
      id: "option1",
      label: "Radio button",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      icon: "your-icon-url",
    },
    {
      logo: {
        src: "https://relume-assets.s3.amazonaws.com/logo-image.svg",
        alt: "Logo image",
      },
      id: "option2",
      label: "Radio button",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      icon: "your-icon-url",
    },
    {
      logo: {
        src: "https://relume-assets.s3.amazonaws.com/logo-image.svg",
        alt: "Logo image",
      },
      id: "option3",
      label: "Radio button",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      icon: "your-icon-url",
    },
  ],
};
export default PaymentMethod;
