import React, { Component } from "react";

//Top navigation bar to display logo and current altitude fixed to the 15th decimal
class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-light bg-light">
        <a href="https://funnelleasing.com">
          Funnel's Lucruative Lunar Real Estate Satellite
        </a>
        Current Altitude: {this.props.altitude.toFixed(15)}
      </nav>
    );
  }
}

export default NavBar;
