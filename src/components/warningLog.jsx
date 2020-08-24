import React, { Component } from "react";

class WarningLog extends Component {
  state = {};

  //TODO: add time the warning was added
  render() {
    return (
      <div className="col-md-8 col-lg-8 col-sm-8">
        <h3>Warning Log</h3>
        <div className="table-responsive">
          <table className="table table-sm">
            <tbody>
              {this.props.warnings.map((w) => (
                <tr>
                  <td>{w}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default WarningLog;
