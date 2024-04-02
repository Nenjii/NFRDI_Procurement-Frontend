import React, { useState, useEffect } from "react";
import SearchBar from "../Components/SearchBar";
import SearchContent from "../Components/SearchContent";
import SearchResult from "../Components/SearchResults";
import axios from "axios";

const ParentComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [clickedContent, setClickedContent] = useState(null);

  const handleSearch = (value) => {
    setSearchTerm(value); // Update searchTerm state with the search value
    setClickedContent(null); // Reset clicked content when a new search is performed
  };

  const handleContentClick = (content) => {
    setClickedContent(content); // Set the clicked content
  };

  const handleGoBack = () => {
    setClickedContent(null); // Reset clicked content when "Go Back" is clicked
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {clickedContent ? ( // Show SearchResult only when clickedContent is not null
        <SearchResult clickedContent={clickedContent} onGoBack={handleGoBack} />
      ) : (
        <SearchContent
          searchTerm={searchTerm}
          onContentClick={handleContentClick}
        />
      )}
    </div>
  );
};

export default ParentComponent;
