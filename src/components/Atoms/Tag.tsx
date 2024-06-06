import React from 'react';

interface TagProps {
  text: string;
}

const Tag: React.FC<TagProps> = ({ text }) => {
  return (
    <div className="bg-gray-100 text-gray-800 font-semibold py-1 px-3 rounded-md inline-block">
      {text}
    </div>
  );
}

export default Tag;