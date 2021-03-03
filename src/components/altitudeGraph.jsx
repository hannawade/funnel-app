import React, { Component } from "react";
import ReactDOM from "react-dom";
import chart from "./chartD3.js";
import * as _ from "lodash";
import Spinner from "react-bootstrap/Spinner";

//TODO: either dont render graph until theres enough data or find some way to keep it clean
//TODO: offer options to view graph from the last 1 minute, 10 minutes or since page load
//TODO: add padding to the y axis (altitude)

class AltitudeGraph extends Component {
  componentDidMount() {
    let el = ReactDOM.findDOMNode(this);

    chart.create(
      el,
      {
        width: 810,
        height: 475,
      },
      this.getChartState()
    );
  }

  componentDidUpdate() {
    chart.update(this.getChartState());
  }

  //Checks to see if the log has been added to
  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(nextProps.log, this.props.log);
  }

  //Returns the log from the App component
  getChartState() {
    return {
      log: this.filterLog(),
    };
  }

  componentWillUnmount() {
    let el = ReactDOM.findDOMNode(this);
    chart.cleanUp(el);
  }

  filterLog() {
    if (this.props.log.length > 60) {
      return this.props.log.slice(Math.max(this.props.log.length - 60));
    } else {
      return this.props.log;
    }
  }

  isLoaded() {
    if (this.props.log.length < 3) {
      return (
        <div className="altitude-graph-loading">
          <Spinner animation="border" />
          <div>
            Please wait 30 seconds for graph to populate with enough data
          </div>
        </div>
      );
    } else {
      return <div className="chart" />;
    }
  }

  render() {
    return (
      <div className="altitude-graph">
        <h3 className="altitude-graph-title">Altitude Graph</h3>
        {this.isLoaded()}
      </div>
    );
  }
}

export default AltitudeGraph;
