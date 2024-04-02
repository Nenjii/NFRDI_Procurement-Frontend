import React, { useState, useRef } from "react";
import style from "../Components/SearchResult.module.css";
import { FaWindowClose } from "react-icons/fa";
import { RxOpenInNewWindow } from "react-icons/rx";
import { TiArrowBack } from "react-icons/ti";

const SearchResult = ({ clickedContent, onGoBack }) => {
  const [pdfUrl, setPdfUrl] = useState(null); // State to store the PDF URL

  const handlePdfView = (pdfUrl) => {
    setPdfUrl(pdfUrl);
  };

  const closePdfViewer = () => {
    setPdfUrl(null);
  };

  const handleGoBack = () => {
    onGoBack(); // Call the onGoBack function to reset clickedContent state
  };

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

  return (
    <div className={style.container}>
      <div className={style.content}>
        <p className={style.Shows}>Showing result of: {clickedContent.pr_no}</p>
        <div className={style.GoBack} onClick={handleGoBack}>
          <TiArrowBack color="#1da1f2" size={25} />
          Go Back{" "}
        </div>
        <div className={style.Line}></div>
      </div>

      <div className={style.SearchContainer}>
        <div className={style.PRNumbers}>PR Number: {clickedContent.pr_no}</div>
      </div>

      <div className={style.SearchBoxContainer}>
        <div className={style.SearchBox}>
          <div className={style.Boxes}>
            {getTypeString(clickedContent.type)}
          </div>
          <div className={style.Boxes}>{clickedContent.status}</div>
          <div className={style.Boxes}>
            {convertDateFormat(clickedContent.date_published)}
          </div>
        </div>
      </div>

      <div className={style.tablecontainer}>
        <table>
          <tbody>
            <tr>
              <th className={style.tableheader}>Title / Project</th>
              <td className={style.tablecontent}>{clickedContent.title}</td>
            </tr>
            <tr>
              <th className={style.tableheader}>Contractor</th>
              <td className={style.tablecontent}>
                {clickedContent.contractor}
              </td>
            </tr>
            <tr>
              <th className={style.tableheader}>Contract Amount</th>
              <td className={style.tablecontent}>
                {clickedContent.contract_amount}
              </td>
            </tr>
            <tr>
              <th className={style.tableheader}>Date Published</th>
              <td className={style.tablecontent}>
                {convertDateFormat(clickedContent.date_published)}
              </td>
            </tr>
          </tbody>
        </table>

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

        <table>
          <tbody>
            <tr>
              <th className={style.tablePDF}>BAC Resolution</th>
              <td>
                <div>
                  <button
                    className={style.btn_SR_View}
                    onClick={() =>
                      handlePdfView(
                        "http://localhost:5000/" + clickedContent.bac_resolution
                      )
                    }
                  >
                    VIEW
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <th className={style.tablePDF}>Notice of Award</th>
              <td>
                <button
                  className={style.btn_SR_View}
                  onClick={() =>
                    handlePdfView(
                      "http://localhost:5000/" + clickedContent.notice_of_award
                    )
                  }
                >
                  VIEW
                </button>
              </td>
            </tr>
            <tr>
              <th className={style.tablePDF}>Contract</th>
              <td>
                <button
                  className={style.btn_SR_View}
                  onClick={() =>
                    handlePdfView(
                      "http://localhost:5000/" + clickedContent.contract
                    )
                  }
                >
                  VIEW
                </button>
              </td>
            </tr>
            <tr>
              <th className={style.tablePDF}>Notice to Proceed</th>
              <td>
                <button
                  className={style.btn_SR_View}
                  onClick={() =>
                    handlePdfView(
                      "http://localhost:5000/" +
                        clickedContent.notice_to_proceed
                    )
                  }
                >
                  VIEW
                </button>
              </td>
            </tr>
            <tr>
              <th className={style.tablePDF}> Philgeps Award Notice</th>
              <td>
                <button
                  className={style.btn_SR_View}
                  onClick={() =>
                    handlePdfView(
                      "http://localhost:5000/" +
                        clickedContent.philgeps_award_notice
                    )
                  }
                >
                  VIEW
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SearchResult;
