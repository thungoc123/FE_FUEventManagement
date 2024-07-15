import React, { ChangeEvent } from "react";

type SearchBarProps = {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClick: React.MouseEventHandler<HTMLInputElement>;
};

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onClick }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      onClick={onClick}
      
      placeholder="Search events by name"
      className="w-full p-2 border border-gray-300 rounded"
    />
  );
};

export default SearchBar;
