import React from "react";
import Table from "react-bootstrap/Table";
import Moment from "moment";
import "../App.css";

const WarningLog = (props) => {
  //TODO: add time the warning was added
  return (
    <div className="warning-log">
      <h3 className="warning-log-title">Warning Log</h3>
      <Table striped bordered hover variant="light">
        <thead>
          <tr>
            <th>Date/Time</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {props.warnings.map((w) => (
            <tr>
              <td>{Moment().format("MM/DD/YYYY h:mm:ss a")}</td>
              <td>{w}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default WarningLog;
