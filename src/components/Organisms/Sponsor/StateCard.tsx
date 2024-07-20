import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, description, icon }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-between h-full w-full">
      <div className="flex items-center justify-between w-full">
        {icon}
        <div className="dropdown relative">
          <button className="text-gray-500 hover:text-gray-700">
            ...
          </button>
          <div className="dropdown-content absolute right-0 hidden bg-white shadow-md rounded-md">
            <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Option 1</a>
            <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Option 2</a>
          </div>
        </div>
      </div>
      <div className="mt-4 text-center flex-1 flex flex-col justify-center">
        <p className="text-4xl font-bold">{value}</p>
        <p className="text-gray-600">{description}</p>
      </div>
      <div className="mt-4 text-center flex-1 flex flex-col justify-center">
        <p className="text-gray-600">{title}</p>
      </div>
    </div>
  );
};

export default StatCard;
