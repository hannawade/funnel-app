import React from "react";
import "../App.css";

const TimeOpen = (props) => {
  return (
    <div className="time-open">
      <h3>Time page open</h3>
      <h2>{props.time}</h2> seconds
    </div>
  );
};

export default TimeOpen;
