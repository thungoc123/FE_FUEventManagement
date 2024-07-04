import { Input } from "@relume_io/relume-ui";
import React, { useState, useRef, useEffect } from "react";


type Props = {
    onSubmit: (searchData: { searchTerm: string }) => void,
    searchValue?: string,
    onSearchChange?: (value: string) => void

};
// onSearchChange
// searchValue
const SearchFilterForm: React.FC<Props> = (prop) => {
    const [searchTerm, setSearchTerm] = useState('');
    const typingTimeoutRef = useRef<number | null>(null);
    // const events = useSelector((state:RootState) => state.event.events)
    const search = prop.searchValue ?? '';
    useEffect(() => {
        setSearchTerm(search);
    }, [prop.searchValue]);
    const [result, setResult] = useState({});
    const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (prop.onSearchChange) {
            prop.onSearchChange(value);
        }
        // Clear the previous timeout if it exists
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }
        // Set a new timeout to handle the debounce
        typingTimeoutRef.current = window.setTimeout(() => {
            prop.onSubmit({ searchTerm: value }); // Use the current input value
        }, 300);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Ensure the search term is submitted immediately when the form is submitted
        prop.onSubmit({ searchTerm });
    };

    return (
        <form onSubmit={handleSubmit}>
            <Input 
                type="text" 
                name="search" 
                placeholder="Search..." 
                value={prop.searchValue} 
                onChange={handleSearchInput} 
            />
             {/* <ul>
                {filteredEvents.map((event) => (
                    <li key={event.id}>
                        {event.name}
                    </li>
                ))}
            </ul> */}
            {/* <button type="submit">Submit</button> */}
        </form>
    );
};

export default SearchFilterForm;
