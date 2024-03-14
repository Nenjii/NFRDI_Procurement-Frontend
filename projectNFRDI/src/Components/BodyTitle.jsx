import style from "../Components/BodyTitle.module.css";

const BodyTitle = () => {
  return (
    <div className={style.bodyTitle}>
      <div className={style.bodyContentTitle1}>Welcome to the</div>
      <div className={style.bodyContentTitle2}>Procurement Monitoring</div>
      <div className={style.bodyContentTitle3}>Reports</div>
    </div>
  );
};

export default BodyTitle;
