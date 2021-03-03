import React from "react";
import "../App.css";

const AvgAltitude = (props) => {
  return (
    <div className="average-altitude">
      <h3>Average Altitude</h3>for last 60 seconds
      <h2>{props.altitude}</h2>
    </div>
  );
};

export default AvgAltitude;
