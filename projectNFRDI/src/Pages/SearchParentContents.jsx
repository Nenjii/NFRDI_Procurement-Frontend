import React, { useState, useEffect } from "react";
import SearchBar from "../Components/SearchBar";
import SearchContent from "../Components/SearchContent";
import axios from "axios";

const ParentComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (value) => {
    setSearchTerm(value); // Update searchTerm state with the search value
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <SearchContent searchTerm={searchTerm} />{" "}
      {/* Pass searchTerm to SearchContent */}
    </div>
  );
};

export default ParentComponent;
