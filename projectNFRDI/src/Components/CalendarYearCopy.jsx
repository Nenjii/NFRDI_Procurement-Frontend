// Importing necessary modules and components
import React, { useState, useRef, useEffect } from "react";
import style from "../Components/CalendarYearCopy.module.css";
import { IoAddCircle } from "react-icons/io5";
import { FaWindowClose } from "react-icons/fa";
import { useVisibilityToggles } from "../../src/utils/OngoComFunctions";
import { RxOpenInNewWindow } from "react-icons/rx";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

// Defining the YearContent component
const YearContent = ({
  year,
  activeYear,
  activeSection,
  toggleYearContent,
}) => (
  <>
    <div
      className={`${style[`CY${year}`]} ${
        activeYear === year ? style.active : ""
      }`}
      onClick={() => toggleYearContent(year, null)}
      id={style.YearLines}
    >
      {year}{" "}
    </div>
    {activeYear === year && (
      <div className={`${style[`CYContent${year}`]} ${style.active}`}>
        <div
          className={`${style[`Bidding${year}`]} ${
            activeSection === "Bidding" ? style.active : ""
          }`}
          onClick={() => toggleYearContent(year, "Bidding")}
          id={style.BiddingLines}
        >
          Bidding
        </div>
        <div
          className={`${style[`Alternative${year}`]} ${
            activeSection === "Alternative" ? style.active : ""
          }`}
          onClick={() => toggleYearContent(year, "Alternative")}
          id={style.AlternativeLines}
        >
          Alternative
        </div>
      </div>
    )}
  </>
);

// Defining the CalendarYear component
const CalendarYear = () => {
  // State management using hooks
  const [activeYear, setActiveYear] = useState(null);
  const [activeSection, setActiveSection] = useState(null);
  const [clickedYear, setClickedYear] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [projectList, setProjectList] = useState(
    JSON.parse(localStorage.getItem("projects"))
  );

  // Function to toggle year content
  const toggleYearContent = (year, section) => {
    if (activeYear === year && activeSection === section) {
      setActiveYear(null);
      setActiveSection(null);
      setClickedYear(null);
      setCurrentPage(1); // Reset currentPage to 1
    } else {
      setActiveYear(year);
      setActiveSection(section);
      setClickedYear(year); // Set the clicked year
      setCurrentPage(1); // Reset currentPage to 1
    }
  };

  // Ref for scrolling to bottom
  const containerRef = useRef(null);

  // Function to scroll to the bottom of container
  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  // State to store PDF URL and functions to handle PDF viewing
  const [pdfUrl, setPdfUrl] = useState(null); // State to store the PDF URL

  const handlePdfView = (pdfUrl) => {
    setPdfUrl(pdfUrl);
  };

  const closePdfViewer = () => {
    setPdfUrl(null);
  };

  // Custom hook for toggling visibility
  const {
    isOngoingActive,
    isCompletedActive,
    toggleOngoingVisibility,
    toggleCompletedVisibility,
  } = useVisibilityToggles(); // OngoCom Visibility when it is clicked

  // Function to convert date format
  const convertDateFormat = (date) => {
    const options = { month: "short", day: "2-digit", year: "numeric" };
    const finalDate = new Date(date);
    return finalDate.toLocaleDateString("en-US", options);
  };

  // Constants for pagination
  const itemsPerPage = 5;

  // Effect to calculate total pages for pagination
  useEffect(() => {
    const filteredProjectList = projectList.filter((data) => {
      const projectYear = new Date(data.date_published)
        .getFullYear()
        .toString();
      return (
        projectYear === clickedYear && // Match the year
        ((activeSection === "Bidding" && data.type === 1) ||
          (activeSection === "Alternative" && data.type === 2)) && // Match the section
        ((isOngoingActive && data.status.toLowerCase() === "ongoing") ||
          (isCompletedActive && data.status.toLowerCase() === "completed"))
      ); // Match the status
    });
    const totalPages = Math.ceil(filteredProjectList.length / itemsPerPage);
    setTotalPages(totalPages);
  }, [
    projectList,
    clickedYear,
    activeSection,
    isOngoingActive,
    isCompletedActive,
  ]);

  // Effect to reset currentPage when ongoing/completed toggles are changed
  useEffect(() => {
    setCurrentPage(1); // Reset currentPage when ongoing/completed toggles are changed
  }, [isOngoingActive, isCompletedActive]);

  // Functions for handling pagination
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Calculating start and end index for pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, projectList.length);

  // Function to render table rows
  const renderTableRows = () => {
    const filteredProjects = projectList.filter((data) => {
      const projectYear = new Date(data.date_published)
        .getFullYear()
        .toString();
      return (
        projectYear === clickedYear &&
        ((activeSection === "Bidding" && data.type === 1) ||
          (activeSection === "Alternative" && data.type === 2)) &&
        ((isOngoingActive && data.status.toLowerCase() === "ongoing") ||
          (isCompletedActive && data.status.toLowerCase() === "completed"))
      );
    });
    const paginatedProjects = filteredProjects.slice(startIndex, endIndex);

    return paginatedProjects.map((data, index) => (
      <tr key={index}>
        <td>{data.pr_no}</td>
        <td>{data.title}</td>
        <td>{data.contractor}</td>
        <td>{data.contract_amount}</td>
        <td>
          {data.bac_resolution && (
            <button
              className={style.viewbutton}
              onClick={() =>
                handlePdfView("http://localhost:5000/" + data.bac_resolution)
              }
            >
              VIEW
            </button>
          )}
        </td>
        <td>
          {data.notice_of_award && (
            <button
              className={style.viewbutton}
              onClick={() =>
                handlePdfView("http://localhost:5000/" + data.notice_of_award)
              }
            >
              VIEW
            </button>
          )}
        </td>
        <td>
          {data.contract && (
            <button
              className={style.viewbutton}
              onClick={() =>
                handlePdfView("http://localhost:5000/" + data.contract)
              }
            >
              VIEW
            </button>
          )}
        </td>
        <td>
          {data.notice_to_proceed && (
            <button
              className={style.viewbutton}
              onClick={() =>
                handlePdfView("http://localhost:5000/" + data.notice_to_proceed)
              }
            >
              VIEW
            </button>
          )}
        </td>
        <td>
          {data.philgeps_award_notice && (
            <button
              className={style.viewbutton}
              onClick={() =>
                handlePdfView(
                  "http://localhost:5000/" + data.philgeps_award_notice
                )
              }
            >
              VIEW
            </button>
          )}
        </td>
        <td>{convertDateFormat(data.date_published)}</td>
      </tr>
    ));
  };

  return (
    <div>
      <div className={style.bodyCalendarYear}>
        {/* Render the Calendar Year header */}
        <div className={`${style.txtCalendarYear} ${style.animateCharacter}`}>
          Calendar Year
        </div>

        {/* Render year content */}
        <div
          className={style.bodyContentCY}
          id={style.Lines}
          ref={containerRef}
        >
          {/* Render YearContent component for each year */}
          {/* Example: YearContent for year 2024 */}
          <YearContent
            year="2024"
            activeYear={activeYear}
            activeSection={activeSection}
            toggleYearContent={toggleYearContent}
          />
          <YearContent
            year="2023"
            activeYear={activeYear}
            activeSection={activeSection}
            toggleYearContent={toggleYearContent}
          />
          <YearContent
            year="2022"
            activeYear={activeYear}
            activeSection={activeSection}
            toggleYearContent={toggleYearContent}
          />
          <YearContent
            year="2021"
            activeYear={activeYear}
            activeSection={activeSection}
            toggleYearContent={toggleYearContent}
          />
          <YearContent
            year="2020"
            activeYear={activeYear}
            activeSection={activeSection}
            toggleYearContent={toggleYearContent}
          />
          <YearContent
            year="2019"
            activeYear={activeYear}
            activeSection={activeSection}
            toggleYearContent={toggleYearContent}
          />
          <YearContent
            year="2018"
            activeYear={activeYear}
            activeSection={activeSection}
            toggleYearContent={toggleYearContent}
          />
          <YearContent
            year="2017"
            activeYear={activeYear}
            activeSection={activeSection}
            toggleYearContent={toggleYearContent}
          />
          <YearContent
            year="2016"
            activeYear={activeYear}
            activeSection={activeSection}
            toggleYearContent={toggleYearContent}
          />
          <YearContent
            year="2015"
            activeYear={activeYear}
            activeSection={activeSection}
            toggleYearContent={toggleYearContent}
          />
        </div>
        {/* Render button to browse other years */}
        <div className={style.CYotherYears} onClick={scrollToBottom}>
          <IoAddCircle className={style.Add} color="#1DA1F2" size={25} />
          <div>browse other years...</div>
        </div>
      </div>
      {/* Render PDF viewer container if pdfUrl is not null */}
      {pdfUrl && (
        <div className={style.pdfViewerContainer}>
          <div className={style.closeButton} onClick={closePdfViewer}>
            <FaWindowClose size={20} />
          </div>
          <div
            className={style.viewInNewTabButton}
            onClick={() => window.open(pdfUrl)}
          >
            <RxOpenInNewWindow size={15} />
            View PDF on a New Tab
          </div>
          <iframe src={pdfUrl} title="PDF Viewer"></iframe>
        </div>
      )}
      {/* Only render the table if activeSection is Bidding or Alternative */}
      {(activeSection === "Bidding" || activeSection === "Alternative") && ( // Only render the table if activeSection is Bidding or Alternative
        <div className={style.tablecontainer}>
          {/* Render table for Bidding section */}
          {activeSection === "Bidding" && (
            <div className={style.tablebiddingcontainer}>
              {/* Render Bidding table header */}
              <h2>List of Bidding / {clickedYear}</h2>
              {/* Render table for Bidding projects */}
              <table className={style.TableContent}>
                <thead>
                  {/* Render table headers */}
                  {/* Ongoing and Completed buttons for toggling visibility */}
                  <tr>
                    {/* Ongoing button */}
                    <th
                      className={`${style.Ongoing} ${
                        isOngoingActive && style.active
                      }`}
                      colSpan="5"
                      onClick={toggleOngoingVisibility}
                    >
                      {" "}
                      Ongoing{" "}
                    </th>
                    {/* Completed button */}
                    <th
                      className={`${style.Completed} ${
                        isCompletedActive && style.active
                      }`}
                      colSpan="5"
                      onClick={toggleCompletedVisibility}
                    >
                      {" "}
                      Completed{" "}
                    </th>
                  </tr>
                </thead>
                {/* Render a message if neither ongoing nor completed is active */}
                <div className={style.Choose}>
                  {!isOngoingActive &&
                    !isCompletedActive &&
                    "Please select what you would like to display: 'Ongoing' or 'Completed'."}
                </div>
                <>
                  {(isOngoingActive || isCompletedActive) && (
                    <>
                      {/* Render table headers */}
                      <thead className={style.TableColumnColor}>
                        <tr>
                          <th>PR Number</th>
                          <th>Title / Project</th>
                          <th>Contractor</th>
                          <th>Contract Amount</th>
                          <th>BAC Resolution</th>
                          <th>Notice of Award</th>
                          <th>Contract</th>
                          <th>Notice to Proceed</th>
                          <th>Philgeps Award Notice</th>
                          <th>Date Published</th>
                        </tr>
                      </thead>
                      {/* Render table body with paginated projects */}
                      <tbody className={style.TableRowColor}>
                        {renderTableRows()}
                      </tbody>
                      {/* Render pagination controls */}
                      <div className={style.tablePage}>
                        <div className={style.tablePageNumber}>
                          {totalPages > 0
                            ? `Page ${currentPage} of ${totalPages}`
                            : "No PROCUREMENTS available as of the moment."}
                        </div>
                        {/* Render Previous Page button if currentPage is greater than 1 */}
                        {currentPage > 1 && (
                          <div
                            className={style.tablePreviousPage}
                            onClick={handlePreviousPage}
                          >
                            Previous Page
                            <div className={style.tableNextIcon}>
                              <GrFormPrevious size={25} />
                            </div>
                          </div>
                        )}
                        {/* Render Next Page button if currentPage is less than totalPages */}
                        {currentPage < totalPages && (
                          <div
                            className={style.tableNextPage}
                            onClick={handleNextPage}
                          >
                            Next Page
                            <div className={style.tableNextIcon}>
                              <GrFormNext size={25} />
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </>
              </table>
            </div>
          )}
          {/* Render table for Alternative section */}
          {activeSection === "Alternative" && (
            <div className={style.tablealternativecontainer}>
              <h2>List of Alternative / {clickedYear}</h2>
              {/* Render table for Alternative projects */}
              <table className={style.TableContent}>
                <thead>
                  {/* Render table headers */}
                  {/* Ongoing and Completed buttons for toggling visibility */}
                  <tr>
                    {/* Ongoing button */}
                    <th
                      className={`${style.Ongoing} ${
                        isOngoingActive && style.active
                      }`}
                      colSpan="5"
                      onClick={toggleOngoingVisibility}
                    >
                      {" "}
                      Ongoing{" "}
                    </th>
                    {/* Completed button */}
                    <th
                      className={`${style.Completed} ${
                        isCompletedActive && style.active
                      }`}
                      colSpan="5"
                      onClick={toggleCompletedVisibility}
                    >
                      {" "}
                      Completed{" "}
                    </th>
                  </tr>
                </thead>
                {/* Render a message if neither ongoing nor completed is active */}
                <div className={style.Choose}>
                  {!isOngoingActive &&
                    !isCompletedActive &&
                    "Please select what you would like to display: 'Ongoing' or 'Completed'."}
                </div>
                <>
                  {/* Render table headers */}
                  {(isOngoingActive || isCompletedActive) && (
                    <>
                      <thead className={style.TableColumnColor}>
                        <tr>
                          <th>PR Number</th>
                          <th>Title / Project</th>
                          <th>Contractor</th>
                          <th>Contract Amount</th>
                          <th>BAC Resolution</th>
                          <th>Notice of Award</th>
                          <th>Contract</th>
                          <th>Notice to Proceed</th>
                          <th>Philgeps Award Notice</th>
                          <th>Date Published</th>
                        </tr>
                      </thead>
                      {/* Render table body with paginated projects */}
                      <tbody className={style.TableRowColor}>
                        {renderTableRows()}
                      </tbody>
                      <div className={style.tablePage}>
                        <div className={style.tablePageNumber}>
                          {totalPages > 0
                            ? `Page ${currentPage} of ${totalPages}`
                            : "No PROCUREMENTS available as of the moment."}
                        </div>
                        {/* Render Previous Page button if currentPage is greater than 1 */}
                        {currentPage > 1 && (
                          <div
                            className={style.tablePreviousPage}
                            onClick={handlePreviousPage}
                          >
                            Previous Page
                            <div className={style.tableNextIcon}>
                              <GrFormPrevious size={25} />
                            </div>
                          </div>
                        )}
                        {/* Render Next Page button if currentPage is less than totalPages */}
                        {currentPage < totalPages && (
                          <div
                            className={style.tableNextPage}
                            onClick={handleNextPage}
                          >
                            Next Page
                            <div className={style.tableNextIcon}>
                              <GrFormNext size={25} />
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CalendarYear;
