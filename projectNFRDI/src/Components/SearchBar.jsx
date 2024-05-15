import React, { useState } from "react";
import style from "../Components/SearchBar.module.css";
import { BsSearch } from "react-icons/bs";

// SearchBar component definition
const SearchBar = ({ onSearch }) => {
  // State for holding search input value
  const [searchValue, setSearchValue] = useState("");

  // Function to handle search
  const handleSearch = () => {
    onSearch(searchValue);
  };

  // Function to handle key down events
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === "Backspace") {
      if (searchValue.trim() === "" && e.key === "Backspace") {
        onSearch(""); // Call onSearch with empty string when backspace is pressed and searchValue is empty
      } else if (e.key === "Enter") {
        onSearch(searchValue);
      }
    }
  };

  // Function to handle input change
  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className={style.bodySearchBar}>
      {/* Search input */}
      <input
        type="text"
        className={style.placeholdercolor}
        placeholder="Procurement search here..."
        value={searchValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        title="Please search here for the procurement title, PR number, bidding/alternative method (if applicable), status (ongoing or completed), or simply the year."
      />
      {/* Search button */}
      <div onClick={handleSearch}>
        <BsSearch
          color="#f5f5f5"
          size={36}
          className={style.bodySearchButton}
          title="Search"
        />
      </div>
    </div>
  );
};

export default SearchBar;
