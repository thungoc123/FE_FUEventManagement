// SearchBar.tsx
import React, { ChangeEvent } from "react";
import { RxMagnifyingGlass } from "react-icons/rx";

type SearchBarProps = {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className="flex items-center border border-gray-400 rounded px-2 py-1">
      <RxMagnifyingGlass className="text-gray-500" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search"
        className="ml-2 outline-none w-full"
      />
    </div>
  );
};

export default SearchBar;
