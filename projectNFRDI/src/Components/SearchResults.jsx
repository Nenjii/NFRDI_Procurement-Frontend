import React, { useState, useRef } from "react";
import style from "../Components/SearchResult.module.css";
import { FaWindowClose } from "react-icons/fa";
import { RxOpenInNewWindow } from "react-icons/rx";

const SearchResult = () => {
  const [pdfUrl, setPdfUrl] = useState(null); // State to store the PDF URL

  const handlePdfView = (pdfUrl) => {
    setPdfUrl(pdfUrl);
  };

  const closePdfViewer = () => {
    setPdfUrl(null);
  };

  return (
    <div className={style.container}>
      <div className={style.content}>
        <p className={style.Shows}>Showing result of: PR Number 3393-23BAC</p>
        <div className={style.Line}></div>
      </div>

      <div className={style.SearchContainer}>
        <div className={style.PRNumbers}>PR Number: 3393-23BAC</div>
      </div>

      <div className={style.SearchBoxContainer}>
        <div className={style.SearchBox}>
          <div className={style.Boxes}>Bidding</div>
          <div className={style.Boxes}>Completed</div>
          <div className={style.Boxes}>2024</div>
        </div>
      </div>

      <div className={style.tablecontainer}>
        <table>
          <tbody>
            <tr>
              <th className={style.tableheader}>Title / Project</th>
              <td className={style.tablecontent}>
                Supply of Labor and Materials for the Upgrading of Mass Rearing
                House into Biological Control Laboratory at BPI-Davao National
                Crop Research, Development and Production Support Center
                (DNCRDPSC), Bago Oshiro, Davao City, Davao del Sur
              </td>
            </tr>
            <tr>
              <th className={style.tableheader}>Contractor</th>
              <td className={style.tablecontent}>
                GESCHAFT EQUIPMENT CORPORATION
              </td>
            </tr>
            <tr>
              <th className={style.tableheader}>Contract Amount</th>
              <td className={style.tablecontent}>79,400.00</td>
            </tr>
            <tr>
              <th className={style.tableheader}>Date Published</th>
              <td className={style.tablecontent}>January 19, 2024</td>
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
                      handlePdfView("../../public/pdfs/PR_No._1500-23BAC...pdf")
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
                      "../../public/pdfs/PR_No._1500-23CONTRACT.pdf"
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
                    handlePdfView("../../public/pdfs/PR_No._1500-23NOA.pdf")
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
                    handlePdfView("../../public/pdfs/PR_No._1500-23NTP.pdf")
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
                      "../../public/pdfs/PR_No._1500-23PhilGeps.pdf"
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
