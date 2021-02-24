import React from "react";
import Moment from "moment";

const AltitudeLog = (props) => {
  //TODO: could format the date and time to be local to the timezone
  //TODO: could reverse the log so latest entry is at the top

  //Splice the log to only include the last 10 minutes (60 enteries)
  function filterLog() {
    if (props.log.length > 60) {
      return props.log.slice(Math.max(this.props.log.length - 60));
    } else {
      return props.log;
    }
  }
  return (
    <div className="col-md-6 col-lg-6 col-sm-6">
      <h3>Altitude Log</h3>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>Date/Time</th>
              <th>Altitude</th>
            </tr>
          </thead>
          <tbody>
            {filterLog().map((c) => (
              <tr>
                <td>
                  {Moment(c.last_updated).format("MM-DD-YYYY  h:mm:ss a")}
                </td>
                <td>{c.altitude.toFixed(15)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AltitudeLog;
