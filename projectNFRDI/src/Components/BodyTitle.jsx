// Importing a CSS module for styling
import style from "../Components/BodyTitle.module.css";

// Importing the ReactTyped component for text animation
import { ReactTyped } from "react-typed";

// Defining a functional component named BodyTitle
const BodyTitle = () => {
  // Returning JSX to render the component
  return (
    // Applying the bodyTitle class from the CSS module to the div
    <div className={style.bodyTitle}>
      {/* Applying the bodyContentTitle1 class and displaying static text */}
      <div className={style.bodyContentTitle1}>Welcome to the</div>

      {/* Using ReactTyped component to animate text with typing effect */}
      <ReactTyped
        className={style.bodyContentTitle2}
        strings={[
          "Procurement Monitoring", // Text to be typed
          "DA-NFRDI", // Text to be typed
          "National Fisheries Research and Development Institute", // Text to be typed
        ]}
        typeSpeed={40} // Speed of typing
        backSpeed={40} // Speed of deleting
        loop // Enable looping of the typed text
      ></ReactTyped>

      {/* Applying the bodyContentTitle3 class and displaying static text */}
      <div className={style.bodyContentTitle3}>Reports</div>
    </div>
  );
};

// Exporting the BodyTitle component as the default export
export default BodyTitle;
