import React from "react";
import '../NavBar/NavBar';
import { Navbar } from "react-bootstrap";


const LoginNavBar = () => {
    return (
      <Navbar fluid id="navbar" collapseOnSelect>
        <Navbar.Header>
          <h1>Portable Pantry</h1>
          <br/>
          {/* <Navbar.Brand>
            <a href="#home">Portable Pantry</a>
          </Navbar.Brand> */}
        </Navbar.Header>
      </Navbar>
    )
  }

export default LoginNavBar;
