import React from "react";
import { shallow } from "enzyme";
import App from "./App";
let testData = require("./test-data.json");
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

//TODO: Tests wont run - TypeError: appComponent.calculateAverageAltitude is not a function
//TODO: finish tests

describe("App", () => {
  const appComponent = shallow(<App />);
  beforeEach(() => {
    appComponent.setState({
      data: testData.data,
      log: testData.log1,
      warnings: [],
      warningMessage:
        "Warnings will display here when satellite orbit average altitude is under 160k for 1 minute",
      isFetching: false,
    });
  });

  describe("addDataToLog()", () => {
    it("should add data to log", () => {
      //
    });
  });

  describe("calculateAverageAltitude()", () => {
    const result = appComponent.calculateAverageAltitude();
    it("should return the average altitude when there are less than 6 entries in the log", () => {
      expect(result).toEqual(201.67950222753996);
    });
    it("should return the average altitude when there are at least 6 entries in the log", () => {
      appComponent.setState({ ...appComponent.state, log: testData.log30 });
      const result = appComponent.calculateAverageAltitude();
      //expect(result).toEqual(NEED TO CALCULATE AVERAGE OF TEST DATA);
    });
  });

  describe("addWarningsToLog()", () => {
    it("should add each warning to warnings", () => {
      //
    });

    describe("calculateWarning()", () => {
      it('should set the warning to "WARNING: RAPID ORBITAL DECAY IMMINENT" when average altitude of 1 minute is lower than 160', () => {
        appComponent.setState({
          ...appComponent.state,
          log: [
            {
              altitude: 108.038475772933879,
              last_updated: "2020-08-24T16:15:00",
            },
            {
              altitude: 101.782256423440259,
              last_updated: "2020-08-24T16:15:10",
            },
            {
              altitude: 100.036550378854244,
              last_updated: "2020-08-24T16:15:20",
            },
            {
              altitude: 102.936609022290867,
              last_updated: "2020-08-24T16:15:30",
            },
            {
              altitude: 110.257745646697558,
              last_updated: "2020-08-24T16:15:40",
            },
            {
              altitude: 121.432743418807576,
              last_updated: "2020-08-24T16:16:00",
            },
          ],
        });
        const result = appComponent.calculateAverageAltitude();
        expect(this.state.warning).toEqual(
          "WARNING: RAPID ORBITAL DECAY IMMINENT"
        );
      });
      it('should set the warning to "Sustained Low Earth Orbit Resumed" when average altitude of 1 minute is more than 160', () => {
        appComponent.setState({
          ...appComponent.state,
          log: [
            {
              altitude: 168.350386057603714,
              last_updated: "2020-08-24T16:16:30",
            },
            {
              altitude: 184.404198584547629,
              last_updated: "2020-08-24T16:16:40",
            },
            {
              altitude: 198.567256581192225,
              last_updated: "2020-08-24T16:16:50",
            },
            {
              altitude: 209.742254353302286,
              last_updated: "2020-08-24T16:17:00",
            },
            {
              altitude: 217.063390977709048,
              last_updated: "2020-08-24T16:17:10",
            },
            {
              altitude: 219.963449621145742,
              last_updated: "2020-08-24T16:17:20",
            },
          ],
        });
        const result = appComponent.calculateAverageAltitude();
        //expect(true).toEqual(true);
      });
    });
  });

  describe("HTML", () => {
    //
  });

  describe("Navbar", () => {
    //
  });

  describe("AltitudeGraph", () => {
    //
  });

  describe("AltitudeLog", () => {
    //
  });

  describe("WarningLog", () => {
    //
  });
});
