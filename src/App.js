import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavBar from "./components/navbar.jsx";
import AltitudeLog from "./components/altitudeLog.jsx";
import WarningLog from "./components/warningLog.jsx";
import AltitudeGraph from "./components/altitudeGraph.jsx";
import AvgAltitude from "./components/averageAltitude.jsx";
import TimeOpen from "./components/timeOpen.jsx";
import Footer from "./components/footer.jsx";
import "./App.css";

//TODO: Add better handling for when data isnt fetched

class App extends Component {
  state = {
    data: [],
    log: [],
    warnings: [],
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
      for (let i = this.state.log.length - 6; i < this.state.log.length; i++) {
        sum += this.state.log[i].altitude;
      }
      average = sum / 6;
    } else {
      for (let i = 0; i < this.state.log.length; i++) {
        sum += this.state.log[i].altitude;
      }
      average = sum / this.state.log.length;
    }
    return average;
  }

  //Filter the warnings so they arent repeating in the log
  addWarningsToLog = (warning) => {
    if (warning !== this.state.warnings[this.state.warnings.length - 1]) {
      const newWarnings = this.state.warnings.concat(warning);
      this.setState({ warnings: newWarnings });
    }
  };

  //Sets the warning and adds it to the warning log
  calculateWarning() {
    var averageAltitude = this.calculateAverageAltitude();
    if (averageAltitude < 160 && this.state.log.length > 5) {
      this.addWarningsToLog("WARNING: RAPID ORBITAL DECAY IMMINENT");
      return (
        <div className="alert alert-danger" role="alert">
          WARNING: RAPID ORBITAL DECAY IMMINENT
        </div>
      );
    } else if (averageAltitude >= 160) {
      this.addWarningsToLog("Sustained Low Earth Orbit");
    }
  }

  render() {
    const { data, log, isFetching } = this.state;
    return (
      <div>
        {data.map((d) => (
          <NavBar altitude={d.altitude} />
        ))}
        {this.calculateWarning()}
        <div className="app">
          <Container fluid="true">
            <Row noGutters="true">
              <Col className="borders">
                <AltitudeGraph log={log} />
              </Col>
              <Col className="borders">
                {data.map((d) => (
                  <AltitudeLog
                    altitude={d.altitude}
                    last_updated={d.last_updated}
                    log={log}
                  />
                ))}
              </Col>
            </Row>
            <Row noGutters="true">
              <Col className="borders">
                <WarningLog warnings={this.state.warnings} />
              </Col>
              <Col xs={4}>
                <Row noGutters="true">
                  <Col className="borders">
                    <AvgAltitude altitude={this.calculateAverageAltitude()} />
                  </Col>
                </Row>
                <Row noGutters="true">
                  <Col className="borders">
                    <TimeOpen time={this.state.log.length * 10} />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
        <Footer />
      </div>
    );
  }
}
export default App;
