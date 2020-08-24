import React, { Component } from "react";
import ReactDOM from "react-dom";
import chart from "./chartD3.js";
import * as _ from "lodash";

//TODO: either dont render graph until theres enough data or find some way to keep it clean
//TODO: splice log to only include the last 10 minutes of data
//TODO: offer options to view graph from the last 1 minute, 10 minutes or since page load

class AltitudeGraph extends Component {
  componentDidMount() {
    let el = ReactDOM.findDOMNode(this);

    chart.create(
      el,
      {
        width: 960,
        height: 500,
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

  render() {
    return <div className="chart"></div>;
  }
}

export default AltitudeGraph;
