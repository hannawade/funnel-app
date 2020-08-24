import React, { Component } from "react";
import NavBar from "./components/navbar.jsx";
import AltitudeLog from "./components/altitudeLog.jsx";
import WarningLog from "./components/warningLog.jsx";
import "./App.css";
import AltitudeGraph from "./components/altitudeGraph.jsx";

//TODO: Add better handling for when data isnt fetched
//TODO: Check to see if theres a better way to pass the data to the children modules so we dont have to map things multiple times
//TODO: Hide alert until first alert is called
class App extends Component {
  state = {
    data: [],
    log: [],
    warnings: [],
    warningMessage:
      "Warnings will display here when satellite orbit average altitude is under 160k for 1 minute",
    isFetching: false,
  };

  //Calls fetchData every 10 seconds
  componentDidMount() {
    this.fetchData();
    this.timer = setInterval(() => this.fetchData(), 10000);
  }

  //Clears timer
  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
  }

  //Fetches data from the API
  fetchData = () => {
    const apiUrl = "http://nestio.space/api/satellite/data";
    this.setState({ ...this.state, isFetching: true });
    fetch(apiUrl)
      .then((response) => response.json())
      .then((result) => {
        this.setState({ data: [result], isFetching: false });
        this.addDataToLog([result]);
        this.calculateWarning();
      })
      .catch((e) => {
        this.setState({ ...this.state, isFetching: false });
      });
  };

  //Adds last_updated and altitude to the state
  addDataToLog = (data) => {
    const newLog = this.state.log.concat(data);
    this.setState({ ...this.state, log: newLog });
  };

  //Calculates the average altitude when there is a minute (6 enteries) worth of data
  calculateAverageAltitude() {
    var sum = 0;
    var average = 0;
    if (this.state.log.length > 5) {
      for (var i = this.state.log.length - 6; i < this.state.log.length; i++) {
        sum += this.state.log[i].altitude;
      }
      average = sum / 6;
    } else {
      for (var i = 0; i < this.state.log.length; i++) {
        sum += this.state.log[i].altitude;
      }
      average = sum / this.state.log.length;
    }
    return average;
  }

  //Adds warning to warnings
  //Filter the warnings so they arent repeating in the log
  addWarningsToLog = (warning) => {
    if (
      this.state.warningMessage !=
      this.state.warnings[this.state.warnings.length - 1]
    ) {
      const newWarnings = this.state.warnings.concat(warning);
      this.setState({ ...this.state, warnings: newWarnings });
    }
  };

  //Sets the warning and adds it to the warning log
  calculateWarning() {
    var averageAltitude = this.calculateAverageAltitude();
    if (averageAltitude < 160 && this.state.log.length > 5) {
      this.setState({
        ...this.state,
        warningMessage: "WARNING: RAPID ORBITAL DECAY IMMINENT",
      });
    } else if (
      averageAltitude >= 160 &&
      this.state.warningMessage == "WARNING: RAPID ORBITAL DECAY IMMINENT"
    ) {
      this.setState({
        ...this.state,
        warningMessage: "Sustained Low Earth Orbit Resumed",
      });
    }
    this.addWarningsToLog(this.state.warningMessage);
  }

  //Formats the warning type between danger(red) and success(green)
  getWarningClass() {
    let warningClass = "alert alert-";
    warningClass +=
      this.state.warningMessage === "WARNING: RAPID ORBITAL DECAY IMMINENT"
        ? "danger"
        : "success";
    return warningClass;
  }

  render() {
    const { data, log, isFetching } = this.state;
    return (
      <React.Fragment>
        {data.map((d) => (
          <NavBar altitude={d.altitude} />
        ))}
        <main className="container">
          <div className={this.getWarningClass()} role="alert">
            {this.state.warningMessage}{" "}
          </div>
          <AltitudeGraph log={log} />
          {data.map((d) => (
            <AltitudeLog
              altitude={d.altitude}
              last_updated={d.last_updated}
              log={log}
            />
          ))}
          <WarningLog warnings={this.state.warnings} />
        </main>
      </React.Fragment>
    );
  }
}
export default App;
