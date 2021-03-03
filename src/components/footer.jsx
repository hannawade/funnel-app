import React from "react";
import Navbar from "react-bootstrap/Navbar";
import "../App.css";

//Top navigation bar to display logo and current altitude fixed to the 15th decimal
const Footer = () => {
  return (
    <Navbar bg="light" variant="light" sticky>
      <Navbar.Text>
        <a href="https://github.com/hannawade/">Github</a> {" | "}
        <a href="https://www.linkedin.com/in/hanna-wade/">LinkedIn</a>
      </Navbar.Text>
    </Navbar>
  );
};

export default Footer;
