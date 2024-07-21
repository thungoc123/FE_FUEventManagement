import React from 'react';
import { formatNumber } from '../../../ulities/Stringhandle';
import '../Style/dashboard.css';
interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, description, icon }) => {
  
  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-between h-full w-full card_amount">
      <div className="flex items-center justify-between w-full">
      </div>
      <div className="mt-4 text-center flex-1 flex flex-col justify-center">
        <p className="text-gray-600">{title}</p>
      </div>
      <div className="mt-4 text-center flex-1 flex flex-col justify-center">
        <p className="text-4xl font-bold">{formatNumber(value)} VND</p>
        <p className="text-gray-600">{description}</p>
      </div>
     
    </div>
  );
};

export default StatCard;
