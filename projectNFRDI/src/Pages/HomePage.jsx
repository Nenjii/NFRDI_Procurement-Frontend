import React, { useState, useEffect } from "react";
import style from "./HomePage.module.css";
import Header from "../Components/Header";
import CalendarYearCopy from "../Components/CalendarYearCopy";
import BodyTitle from "../Components/BodyTitle";
import SearchParentContent from "./SearchParentContents";

import axios from "axios";

const HomePage = () => {
  useEffect(() => {
    axios
      .get("http://10.0.224.100:5000/getProject")
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("projects", JSON.stringify(res.data));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={style.container}>
      <Header />
      <CalendarYearCopy />
      <SearchParentContent />
      <BodyTitle />
    </div>
  );
};

export default HomePage;
