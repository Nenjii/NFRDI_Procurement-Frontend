import React, { useState, useRef, useEffect } from "react";
import style from "../Components/CalendarYearCopy.module.css";
import NextPages from "../Components/NextPages";
import { IoAddCircle } from "react-icons/io5";
import { FaWindowClose } from "react-icons/fa";
import { useVisibilityToggles } from "../../src/utils/OngoComFunctions";
import { RxOpenInNewWindow } from "react-icons/rx";

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

const CalendarYear = () => {
  const [activeYear, setActiveYear] = useState(null);
  const [activeSection, setActiveSection] = useState(null);
  const [clickedYear, setClickedYear] = useState(null);

  const toggleYearContent = (year, section) => {
    if (activeYear === year && activeSection === section) {
      setActiveYear(null);
      setActiveSection(null);
      setClickedYear(null);
    } else {
      setActiveYear(year);
      setActiveSection(section);
      setClickedYear(year); // Set the clicked year
    }
  };

  const containerRef = useRef(null);

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  const [pdfUrl, setPdfUrl] = useState(null); // State to store the PDF URL

  const handlePdfView = (pdfUrl) => {
    setPdfUrl(pdfUrl);
  };

  const closePdfViewer = () => {
    setPdfUrl(null);
  };

  const {
    isOngoingActive,
    isCompletedActive,
    toggleOngoingVisibility,
    toggleCompletedVisibility,
  } = useVisibilityToggles(); // OngoCom Visibility when it is clicked

  const [projectList, setprojectList] = useState(
    JSON.parse(localStorage.getItem("projects"))
  );

  const convertDateFormat = (date) => {
    const options = { month: "short", day: "2-digit", year: "numeric" };
    const finalDate = new Date(date);
    return finalDate.toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem("projects")));
  }, []);

  return (
    <div>
      <div className={style.bodyCalendarYear}>
        <div className={`${style.txtCalendarYear} ${style.animateCharacter}`}>
          Calendar Year
        </div>

        <div
          className={style.bodyContentCY}
          id={style.Lines}
          ref={containerRef}
        >
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
        {/* Repeat for other years */}
        <div className={style.CYotherYears} onClick={scrollToBottom}>
          <IoAddCircle className={style.Add} color="#1DA1F2" size={25} />
          <div>browse other years...</div>
        </div>
      </div>

      {pdfUrl && (
        <div className={style.pdfViewerContainer}>
          <div className={style.closeButton} onClick={closePdfViewer}>
            <FaWindowClose size={23} />
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
      {(activeSection === "Bidding" || activeSection === "Alternative") && ( // Only render the table if activeSection is Bidding or Alternative
        <div className={style.tablecontainer}>
          {activeSection === "Bidding" && (
            <div className={style.tablebiddingcontainer}>
              <h2>List of Bidding / {clickedYear}</h2>

              <table className={style.TableContent}>
                <thead>
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
                <div className={style.Choose}>
                  {!isOngoingActive &&
                    !isCompletedActive &&
                    "Please select what you would like to display: 'Ongoing' or 'Completed'."}
                </div>
                <>
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
                      <tbody className={style.TableRowColor}>
                        {projectList &&
                          projectList
                            .filter((data) => {
                              const projectYear = new Date(data.date_published)
                                .getFullYear()
                                .toString();
                              const isBidding = data.type === 1;
                              const isOngoing =
                                data.status.toLowerCase() === "ongoing";
                              const isCompleted =
                                data.status.toLowerCase() === "completed";
                              return (
                                projectYear === clickedYear &&
                                isBidding &&
                                ((isOngoing && isOngoingActive) ||
                                  (isCompleted && isCompletedActive))
                              );
                            })
                            .map((data, index) => (
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
                                        handlePdfView(
                                          "http://localhost:5000/" +
                                            data.bac_resolution
                                        )
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
                                        handlePdfView(
                                          "http://localhost:5000/" +
                                            data.notice_of_award
                                        )
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
                                        handlePdfView(
                                          "http://localhost:5000/" +
                                            data.contract
                                        )
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
                                        handlePdfView(
                                          "http://localhost:5000/" +
                                            data.notice_to_proceed
                                        )
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
                                          "http://localhost:5000/" +
                                            data.philgeps_award_notice
                                        )
                                      }
                                    >
                                      VIEW
                                    </button>
                                  )}
                                </td>
                                <td>
                                  {convertDateFormat(data.date_published)}
                                </td>
                              </tr>
                            ))}
                      </tbody>
                      <div>
                        <NextPages />
                      </div>
                    </>
                  )}
                </>
              </table>
            </div>
          )}

          {activeSection === "Alternative" && (
            <div className={style.tablealternativecontainer}>
              <h2>List of Alternative / {clickedYear}</h2>

              <table className={style.TableContent}>
                <thead>
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
                <div className={style.Choose}>
                  {!isOngoingActive &&
                    !isCompletedActive &&
                    "Please select what you would like to display: 'Ongoing' or 'Completed'."}
                </div>
                <>
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
                      <tbody className={style.TableRowColor}>
                        {projectList &&
                          projectList
                            .filter((data) => {
                              const projectYear = new Date(data.date_published)
                                .getFullYear()
                                .toString();
                              const isAlternative = data.type === 2;
                              const isOngoing =
                                data.status.toLowerCase() === "ongoing";
                              const isCompleted =
                                data.status.toLowerCase() === "completed";
                              return (
                                projectYear === clickedYear &&
                                isAlternative &&
                                ((isOngoing && isOngoingActive) ||
                                  (isCompleted && isCompletedActive))
                              );
                            })
                            .map((data, index) => (
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
                                        handlePdfView(
                                          "http://localhost:5000/" +
                                            data.bac_resolution
                                        )
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
                                        handlePdfView(
                                          "http://localhost:5000/" +
                                            data.notice_of_award
                                        )
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
                                        handlePdfView(
                                          "http://localhost:5000/" +
                                            data.contract
                                        )
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
                                        handlePdfView(
                                          "http://localhost:5000/" +
                                            data.notice_to_proceed
                                        )
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
                                          "http://localhost:5000/" +
                                            data.philgeps_award_notice
                                        )
                                      }
                                    >
                                      VIEW
                                    </button>
                                  )}
                                </td>
                                <td>
                                  {convertDateFormat(data.date_published)}
                                </td>
                              </tr>
                            ))}
                      </tbody>
                      <div>
                        <NextPages />
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
