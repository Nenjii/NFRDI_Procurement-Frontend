import style from "../Components/BodyTitle.module.css";
import { ReactTyped } from "react-typed";

const BodyTitle = () => {
  return (
    <div className={style.bodyTitle}>
      <div className={style.bodyContentTitle1}>Welcome to the</div>
      <ReactTyped
        className={style.bodyContentTitle2}
        strings={[
          "Procurement Monitoring",
          "DA-NFRDI",
          "National Fisheries Research and Development Institute",
        ]}
        typeSpeed={40}
        backSpeed={40}
        loop
      ></ReactTyped>
      <div className={style.bodyContentTitle3}>Reports</div>
    </div>
  );
};

export default BodyTitle;
