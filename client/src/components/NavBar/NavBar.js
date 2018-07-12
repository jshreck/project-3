import React, { Component } from "react";
import "./NavBar.css";
import { Navbar, Nav, NavDropdown, MenuItem } from "react-bootstrap";


class NavBar extends Component {
 
    getName = () => { 
 
    let message = "Welcome";
    if (sessionStorage.user) {
      const user = JSON.parse(sessionStorage.user);
      message = `Welcome, ${user.name}`;
    }
    return (message);
  }

render () {
  return (
    <Navbar fluid className="color" collapseOnSelect>
      <Navbar.Header>
        <h1>Portable Pantry</h1>
        <h6>{this.getName()}</h6>
        {/* <Navbar.Brand>
            <a href="#home">Portable Pantry</a>
          </Navbar.Brand> */}
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          <NavDropdown pullRight eventKey={2} title="Menu" id="basic-nav-dropdown">
            <MenuItem eventKey={2.1} href="/">View Inventory</MenuItem>
            <MenuItem eventKey={2.2} href="/AddItem">Add to Inventory</MenuItem>
            <MenuItem eventKey={2.3} disabled>Grocery List</MenuItem>
            <MenuItem eventKey={2.4} disabled>Recipes</MenuItem>
            <MenuItem eventKey={2.5} disabled>Analytics</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={2.6} disabled>Log Out</MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
}

export default NavBar;
