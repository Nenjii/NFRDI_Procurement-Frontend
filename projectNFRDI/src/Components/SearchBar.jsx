import React, { useState } from "react";
import style from "../Components/SearchBar.module.css";
import { BsSearch } from "react-icons/bs";

const SearchBar = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    onSearch(searchValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(searchValue);
    }
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className={style.bodySearchBar}>
      <input
        type="text"
        className={style.placeholdercolor}
        placeholder="Search here..."
        value={searchValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <div onClick={handleSearch}>
        <BsSearch
          color="#f5f5f5"
          size={36}
          className={style.bodySearchButton}
        />
      </div>
    </div>
  );
};

export default SearchBar;
