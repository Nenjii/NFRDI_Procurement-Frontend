import React, { useState, useRef } from "react";
import style from "../Components/SearchResult.module.css";
import { FaWindowClose } from "react-icons/fa";
import { RxOpenInNewWindow } from "react-icons/rx";
import { TiArrowBack } from "react-icons/ti";

// SearchResult component definition
const SearchResult = ({ clickedContent, onGoBack }) => {
  // State to store the PDF URL and track focused button
  const [pdfUrl, setPdfUrl] = useState(null); // State to store the PDF URL
  const [focusedButton, setFocusedButton] = useState(null); // State to track focused button

  // Function to handle opening PDF view
  const handlePdfView = (newPdfUrl, buttonId) => {
    // Close previously opened PDF if any
    if (pdfUrl) {
      setPdfUrl(null);
    }
    // Open new PDF
    setPdfUrl(newPdfUrl);
    // Set the focused button
    setFocusedButton(buttonId);
  };
  // Function to close PDF viewer
  const closePdfViewer = () => {
    setPdfUrl(null);
  };
  // Function to handle going back
  const handleGoBack = () => {
    onGoBack(); // Call the onGoBack function to reset clickedContent state
  };
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
  // Function to handle container blur
  const handleContainerBlur = () => {
    // Remove focus when clicking outside the buttons
    setFocusedButton(null);
  };

  return (
    <div className={style.container}>
      <div className={style.content}>
        <p className={style.Shows} title={clickedContent.pr_no}>
          Showing result of: {clickedContent.pr_no}
        </p>
        <div className={style.GoBack} onClick={handleGoBack}>
          <TiArrowBack color="#1da1f2" size={25} />
          Go Back{" "}
        </div>
        <div className={style.Line}></div>
      </div>

      <div className={style.SearchContainer}>
        <div className={style.PRNumbers} title={clickedContent.pr_no}>
          PR Number: {clickedContent.pr_no}
        </div>
      </div>

      <div className={style.SearchBoxContainer}>
        <div className={style.SearchBox}>
          <div
            className={style.Boxes}
            title={getTypeString(clickedContent.type)}
          >
            {getTypeString(clickedContent.type)}
          </div>
          <div className={style.Boxes} title={clickedContent.status}>
            {clickedContent.status}
          </div>
          <div
            className={style.Boxes}
            title={convertDateFormat(clickedContent.date_published)}
          >
            {convertDateFormat(clickedContent.date_published)}
          </div>
        </div>
      </div>

      <div className={style.tablecontainer}>
        <table>
          <tbody>
            {/* Render table rows */}
            <tr>
              <th className={style.tableheader}>Title / Project</th>
              <td className={style.tablecontent} title={clickedContent.title}>
                {clickedContent.title}
              </td>
            </tr>
            <tr>
              <th className={style.tableheader}>Contractor</th>
              <td
                className={style.tablecontent}
                title={clickedContent.contractor}
              >
                {clickedContent.contractor}
              </td>
            </tr>
            <tr>
              <th className={style.tableheader}>Contract Amount</th>
              <td
                className={style.tablecontent}
                title={clickedContent.contract_amount}
              >
                {clickedContent.contract_amount}
              </td>
            </tr>
            <tr>
              <th className={style.tableheader}>Date Published</th>
              <td
                className={style.tablecontent}
                title={convertDateFormat(clickedContent.date_published)}
              >
                {convertDateFormat(clickedContent.date_published)}
              </td>
            </tr>
          </tbody>
        </table>
        {/* Render PDF viewer if pdfUrl is available */}
        {pdfUrl && (
          <div className={style.ResultpdfViewerContainer}>
            <div className={style.closeButton} onClick={closePdfViewer}>
              <FaWindowClose size={15} />
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
        {/* Render PDF buttons */}
        <table>
          <tbody>
            <tr>
              <th className={style.tablePDF}>BAC Resolution</th>
              <td>
                {clickedContent.bac_resolution ? (
                  <div>
                    <button
                      className={`${style.btn_SR_View} ${
                        focusedButton === "bac_resolution" ? "active" : ""
                      }`}
                      onClick={() =>
                        handlePdfView(
                          "http://localhost:5000/" +
                            clickedContent.bac_resolution,
                          "bac_resolution"
                        )
                      }
                    >
                      VIEW
                    </button>
                  </div>
                ) : (
                  <div>
                    <button
                      className={style.btn_SR_View}
                      disabled
                      title="PDF content unavailable or not yet uploaded."
                    >
                      No PDF Available
                    </button>
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <th className={style.tablePDF}>Notice of Award</th>
              <td>
                {clickedContent.notice_of_award ? (
                  <div>
                    <button
                      className={`${style.btn_SR_View} ${
                        focusedButton === "notice_of_award" ? "active" : ""
                      }`}
                      onClick={() =>
                        handlePdfView(
                          "http://localhost:5000/" +
                            clickedContent.notice_of_award,
                          "notice_of_award"
                        )
                      }
                    >
                      VIEW
                    </button>
                  </div>
                ) : (
                  <div>
                    <button
                      className={style.btn_SR_View}
                      disabled
                      title="PDF content unavailable or not yet uploaded."
                    >
                      No PDF Available
                    </button>
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <th className={style.tablePDF}>Contract</th>
              <td>
                {clickedContent.contract ? (
                  <div>
                    <button
                      className={`${style.btn_SR_View} ${
                        focusedButton === "contract" ? "active" : ""
                      }`}
                      onClick={() =>
                        handlePdfView(
                          "http://localhost:5000/" + clickedContent.contract,
                          "contract"
                        )
                      }
                    >
                      VIEW
                    </button>
                  </div>
                ) : (
                  <div>
                    <button
                      className={style.btn_SR_View}
                      disabled
                      title="PDF content unavailable or not yet uploaded."
                    >
                      No PDF Available
                    </button>
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <th className={style.tablePDF}>Notice to Proceed</th>
              <td>
                {clickedContent.notice_to_proceed ? (
                  <div>
                    <button
                      className={`${style.btn_SR_View} ${
                        focusedButton === "notice_to_proceed" ? "active" : ""
                      }`}
                      onClick={() =>
                        handlePdfView(
                          "http://localhost:5000/" +
                            clickedContent.notice_to_proceed,
                          "notice_to_proceed"
                        )
                      }
                    >
                      VIEW
                    </button>
                  </div>
                ) : (
                  <div>
                    <button
                      className={style.btn_SR_View}
                      disabled
                      title="PDF content unavailable or not yet uploaded."
                    >
                      No PDF Available
                    </button>
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <th className={style.tablePDF}> Philgeps Award Notice</th>
              <td>
                {clickedContent.philgeps_award_notice ? (
                  <div>
                    <button
                      className={`${style.btn_SR_View} ${
                        focusedButton === "philgeps_award_notice"
                          ? "active"
                          : ""
                      }`}
                      onClick={() =>
                        handlePdfView(
                          "http://localhost:5000/" +
                            clickedContent.philgeps_award_notice,
                          "philgeps_award_notice"
                        )
                      }
                    >
                      VIEW
                    </button>
                  </div>
                ) : (
                  <div>
                    <button
                      className={style.btn_SR_View}
                      disabled
                      title="PDF content unavailable or not yet uploaded."
                    >
                      No PDF Available
                    </button>
                  </div>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SearchResult;
