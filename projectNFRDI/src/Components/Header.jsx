import React, { useState, useEffect } from "react";
import style from "../Components/Header.module.css";
import { RxAccessibility } from "react-icons/rx";
import { IoArrowBackCircle } from "react-icons/io5";
import {
  FaExternalLinkSquareAlt,
  FaFacebookSquare,
  FaTwitterSquare,
  FaYoutubeSquare,
} from "react-icons/fa";

const Header = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const generateMonth = (month) => months[month - 1];
  const generateDay = (day) => daysOfWeek[day];

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const day = time.getDate().toString();
  const month = time.getMonth().toString();
  const year = time.getFullYear().toString();
  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");
  const daysOftheWeek = time.getDay();

  return (
    <div className={style.headerbkg}>
      <div className={style.headercontent}>
        <div className={style.headercontentspaces}>
          <div className={style.headerAcccessibility}>
            <RxAccessibility color="#69DDFF" size={25} />
            Accessibility
          </div>
        </div>
        <div className={style.headerIcons}>
          <div>
            <a className={style.headerGoBack} href="https://nfrdi.da.gov.ph/">
              <IoArrowBackCircle color="#69DDFF" size={25} />
              Go to Home
            </a>
          </div>
          <div className={style.headerAdminLogin}>
            <FaExternalLinkSquareAlt color="#69DDFF" size={20} />
            Admin login
          </div>
          <div className={style.headerPST}>
            Philippine Standard Time:
            <p>{`${generateDay(daysOftheWeek)}, ${generateMonth(
              month
            )} ${day}, ${year}  ${hours}:${minutes}:${seconds}`}</p>
          </div>
        </div>
      </div>
      <div className={style.headercontentimage}>
        <img
          id={style.imagecontent}
          src="../../public/images/HeaderContentBelow2.svg"
          alt="HomeImage"
        />
        <div className={style.headercontentsocmed}>
          <div>
            <a href="https://www.facebook.com/nfrdiphilippines" target="_blank">
              <FaFacebookSquare
                className={style.SocMedIcons}
                color="#3b5998"
                size={25}
              />
            </a>
          </div>
          <div className={style.Twitter}>
            <a href="https://twitter.com/DA_NFRDI" target="_blank">
              <FaTwitterSquare
                className={style.SocMedIcons}
                color="#1DA1F2"
                size={25}
              />
            </a>
          </div>
          <div className={style.Youtube}>
            <a href="http://www.youtube.com/@DA_NFRDI" target="_blank">
              <FaYoutubeSquare
                className={style.SocMedIcons}
                color="#FF0000"
                size={25}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
