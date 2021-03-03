import React from "react";
import Moment from "moment";
import Table from "react-bootstrap/Table";
import "../App.css";

const AltitudeLog = (props) => {
  //TODO: could reverse the log so latest entry is at the top

  //Splice the log to only include the last 10 minutes (60 enteries)
  function filterLog() {
    if (props.log.length > 60) {
      return props.log.slice(Math.max(props.log.length - 60));
    } else {
      return props.log;
    }
  }
  return (
    <div className="altitude-log">
      <h3 className="altitude-log-title">Altitude Log</h3>
      <Table striped bordered hover variant="light" bsPrefix="table">
        <thead>
          <tr>
            <th>Date/Time</th>
            <th>Altitude</th>
          </tr>
        </thead>
        <tbody>
          {filterLog().map((c) => (
            <tr>
              <td>{Moment(c.last_updated).format("MM/DD/YYYY  h:mm:ss a")}</td>
              <td>{c.altitude.toFixed(15)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AltitudeLog;
