import style from "../Components/SearchContent.module.css";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { useState, useEffect } from "react";
import axios from "axios";

// SearchContent component definition
const SearchContent = ({ searchTerm, onContentClick }) => {
  // State for holding filtered data, current page, total pages, and visibility
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isVisible, setIsVisible] = useState(false); // State to manage visibility

  // useEffect hook to handle changes in searchTerm
  useEffect(() => {
    if (searchTerm) {
      getSearch();
      setIsVisible(true); // Show the SearchContent
    } else {
      setFilteredData([]); // Reset filtered data if search term is empty
      setIsVisible(false); // Hide the SearchContent
    }
  }, [searchTerm]);

  // Function to fetch search results from the server
  function getSearch() {
    axios.get("http://localhost:5000/getProject").then(function (response) {
      const searchData = response.data.filter((item) => {
        // Convert item.type to its string representation
        let itemType = "";
        if (item.type === 1) {
          itemType = "bidding";
        } else if (item.type === 2) {
          itemType = "alternative";
        }

        // Filter by title, pr_no, status, date_published, and type
        const titleMatch = item.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const prNoMatch = item.pr_no
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const statusMatch =
          item.status.toLowerCase() === searchTerm.toLowerCase();
        const dateMatch = item.date_published
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const typeMatch = itemType.includes(searchTerm.toLowerCase()); // New condition for type

        return titleMatch || prNoMatch || statusMatch || dateMatch || typeMatch;
      });
      setFilteredData(searchData);

      // Calculate total pages based on the number of filtered data
      setTotalPages(Math.ceil(searchData.length / 6));
      setCurrentPage(1); // Reset current page to 1
    });
  }

  // Function to convert date format
  const convertDateFormat = (date) => {
    const options = { year: "numeric" };
    const finalDate = new Date(date);
    return finalDate.toLocaleDateString("en-US", options);
  };

  // Function to get type string based on type number
  const getTypeString = (type) => {
    switch (type) {
      case 1:
        return "Bidding";
      case 2:
        return "Alternative";
      default:
        return "Unknown Type"; // Fallback for unexpected type values
    }
  };

  // Calculate the start and end index of contents for the current page
  const startIndex = (currentPage - 1) * 5;
  let endIndex = startIndex + 5; // Default end index

  // Check if any content's title exceeds 145 characters
  if (
    filteredData
      .slice(startIndex, startIndex + 5)
      .some((item) => item.title.length > 145)
  ) {
    endIndex = startIndex + 5; // Adjust end index to 5 if condition is met
  }

  return isVisible ? ( // Render only when isVisible is true
    <div className={style.container}>
      <div className={style.content}>
        {searchTerm && filteredData.length === 0 ? (
          <p className={style.Shows}>
            No results found for:{" "}
            <span className={style.Highlight}>{searchTerm}</span>
          </p>
        ) : (
          <p className={style.Shows}>
            Showing results of:{" "}
            <span className={style.Highlight}>{searchTerm}</span>
          </p>
        )}
        <div className={style.Line}></div>
      </div>
      {/* Render search results */}
      {filteredData.slice(startIndex, endIndex).map((item, index) => (
        <div
          key={index}
          className={style.SearchContainer}
          onClick={() => onContentClick(item)}
        >
          <div className={style.Searches} title={item.title}>
            {item.title.length > 145
              ? `${item.title.substring(0, 145)} . . .`
              : item.title}
          </div>

          <div className={style.SearchBoxes}>
            <div className={style.Boxes}>{"PR Number: " + item.pr_no}</div>
            <div className={style.Boxes}>{getTypeString(item.type)}</div>{" "}
            <div className={style.Boxes}>{item.status}</div>
            <div className={style.Boxes}>
              {convertDateFormat(item.date_published)}
            </div>
          </div>
        </div>
      ))}
      {/* Pagination */}
      <div className={style.tablePage}>
        <div className={style.tablePageNumber}>
          Page {currentPage} of {totalPages}
        </div>
        {/* Previous page button */}
        {currentPage > 1 && (
          <div
            className={style.tablePreviousPage}
            onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
          >
            Previous Page
            <div className={style.tableNextIcon}>
              <GrFormPrevious size={25} />
            </div>
          </div>
        )}
        {/* Next page button */}
        {currentPage < totalPages && (
          <div
            className={style.tableNextPage}
            onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
          >
            Next Page
            <div className={style.tableNextIcon}>
              <GrFormNext size={25} />
            </div>
          </div>
        )}
      </div>
    </div>
  ) : null; // Return null when isVisible is false
};

export default SearchContent;
