import React, { useState } from "react";
import { GrFormNext } from "react-icons/gr";
import style from "../Components/NextPages.module.css";

const NextPage = () => {
  return (
    <div className={style.tablePage}>
      <div className={style.tablePageNumber}>Page 1 of 2</div>
      <div className={style.tableNextPage}>
        Next Page
        <div className={style.tableNextIcon}>
          <GrFormNext size={25} />
        </div>
      </div>
    </div>
  );
};

export default NextPage;
