// SearchContent.jsx
import style from "../Components/SearchContent.module.css";
import NextPages from "../Components/NextPages";
import { useState, useEffect } from "react";
import axios from "axios";

const SearchContent = ({ searchTerm }) => {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (searchTerm) {
      getSearch();
    } else {
      setFilteredData([]); // Reset filtered data if search term is empty
    }
  }, [searchTerm]);

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
    });
  }

  const convertDateFormat = (date) => {
    const options = { year: "numeric" };
    const finalDate = new Date(date);
    return finalDate.toLocaleDateString("en-US", options);
  };

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

  return searchTerm ? (
    <div className={style.container}>
      <div className={style.content}>
        <p className={style.Shows}>
          Showing results of:{" "}
          <span className={style.Highlight}>{searchTerm}</span>
        </p>
        <div className={style.Line}></div>
      </div>

      {filteredData.map((item, index) => (
        <div key={index} className={style.SearchContainer}>
          <div className={style.Searches}>{item.title}</div>

          <div className={style.SearchBoxes}>
            <div className={style.Boxes}>{"PR Number: " + item.pr_no}</div>
            <div className={style.Boxes}>{getTypeString(item.type)}</div>{" "}
            {/* Use the function here */}
            <div className={style.Boxes}>{item.status}</div>
            <div className={style.Boxes}>
              {convertDateFormat(item.date_published)}
            </div>
          </div>
        </div>
      ))}

      <div>
        <NextPages />
      </div>
    </div>
  ) : null;
};

export default SearchContent;
