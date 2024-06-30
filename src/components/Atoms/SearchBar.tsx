import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Button, Input } from "@relume_io/relume-ui";
import React, { useState } from "react";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="grid items-center gap-6 md:grid-cols-[1fr_max-content]">
      <Input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder={placeholder}
      />
      <Button onClick={handleSearch}>
        <MagnifyingGlassIcon className="h-5 w-5" />
      </Button>
    </div>
  );
};

SearchBar.defaultProps = {
  placeholder: "Search",
};

export default SearchBar;
