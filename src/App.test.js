import React from "react";
import { render } from "@testing-library/react";
import calculateAverageAltitude from "./App";
let testData = require("./test-data.json");

//TODO: finish tests

describe("App", () => {
  const { container } = render(<App />);
  beforeEach(() => {
    App.setState({
      ...this.state,
      data: testData.data,
      log: testData.log1,
      warnings: [],
      warningMessage:
        "Warnings will display here when satellite orbit average altitude is under 160k for 1 minute",
      isFetching: false,
    });
  });

  describe("addDataToLog()", () => {
    const result = calculateAverageAltitude();
    it("should add data to log", () => {
      expect(true).toEqual(true);
    });
  });

  describe("calculateAverageAltitude()", () => {
    const result = calculateAverageAltitude();
    it("should return the average altitude when there are less than 6 entries in the log", () => {
      expect(result).toEqual(201.67950222753996);
    });
    it("should return the average altitude when there are at least 6 entries in the log", () => {
      this.state.log = testData.log30;
      const result = calculateAverageAltitude();
      expect(true).toEqual(true);
    });
  });

  describe("addWarningsToLog()", () => {
    it("should add each warning to warnings", () => {
      //
    });

    describe("calculateWarning()", () => {
      it('should set the warning to "WARNING: RAPID ORBITAL DECAY IMMINENT" when average altitude of 1 minute is higher than 160', () => {
        expect(true).toEqual(true);
      });
      it('should set the warning to "Sustained Low Earth Orbit Resumed" when average altitude of 1 minute is lower than 160', () => {
        expect(true).toEqual(true);
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
