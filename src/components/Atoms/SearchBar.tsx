import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Button, Input } from "@relume_io/relume-ui";
import React from "react";
interface SearchBarProps {
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = (props) => {
  return (
    <div className="grid items-center gap-6 md:grid-cols-[1fr_max-content]">
      <Input type="email" placeholder={props.placeholder} />
      <Button>Search</Button>
    </div>
  );
};
SearchBar.defaultProps = {
  placeholder: "search",
};
export default SearchBar;
