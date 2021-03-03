import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

//Top navigation bar to display logo and current altitude fixed to the 15th decimal
const NavBar = (props) => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="https://github.com/hannawade/funnel-app">
        Satellite Monitoring
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="https://github.com/hannawade/funnel-app">
          Repository
        </Nav.Link>
        <Nav.Link href="http://nestio.space/api/satellite/data">
          Endpoint
        </Nav.Link>
      </Nav>
      <Navbar.Text>Current Altitude: {props.altitude.toFixed(15)}</Navbar.Text>
    </Navbar>
  );
};

export default NavBar;
