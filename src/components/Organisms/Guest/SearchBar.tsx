import React, { ChangeEvent } from "react";

type SearchBarProps = {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Search events by name"
      className="w-full p-2 border border-gray-300 rounded"
    />
  );
};

export default SearchBar;
