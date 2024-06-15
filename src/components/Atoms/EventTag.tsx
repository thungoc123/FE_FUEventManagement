import { XMarkIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { BiX } from "react-icons/bi";

interface TagProps {
  text: string;
}

const EventTag: React.FC<TagProps> = ({ text }) => {
  return (
    <div className="bg-gray-100 text-gray-800 font-semibold py-1 px-3  inline-block mb-10">
      
    <span className='flex items-center'>{text}<BiX className='ml-1 text-red-600 cursor-pointer'/></span>
    </div>
  );
}

export default EventTag;