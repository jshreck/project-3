import React, { Component } from "react";
import "./NavBar.css";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Button, Col, Row } from "react-bootstrap";
import AddItemModal from "../AddItemModal";
import defaultTags from '../../utils/defaultTags';
import API from "../../utils/API";
class NavBar extends Component {
  state = {
    show: false,
    barcodeText: "",
    availableTags: [],
    addItem: {},//will gather input if checkbox checked then add that tag to it
    expDate: ""
  };

  componentWillMount() {
    //get availableTags
    API.getUserTags(this.state.userId)
    .then((res) => {
      this.setState({availableTags: defaultTags.concat(res.data)});
      console.log("Available Tags: " + JSON.stringify(this.state.availableTags));
    })
    .catch(err => console.log(err));
  }
  

  //MODAL 
  handleClose = () => {
    this.setState({ show: false });
  }

  handleShow = () => {
    this.setState({ show: true });
  }

  //AddItemForm
  handleBarcodeChange = (e) => {
    this.setState({ barcodeText: e.target.value }, () => {
      console.log("barcode text " + this.state.barcodeText);
    });
  }
  barcodeValidation = () => {
    const length = this.state.barcodeText.length;
    if (length > 11 || this.state.barcodeText === "999") return 'success';
    else if (length < 12) return 'error';
    return null;
  }
  handleCheckboxChange = (e) => {
    //grab id so know what tag and change that tag (state) to checked= true/false
    console.log(e.target);
    console.log(e.target.checked);
  }
  // handleExpDateChange = (value, formattedValue) => {
  //   console.log(value);
  //   console.log(formattedValue);
  // }

  render() {
    return (
      <Navbar fluid className="color" collapseOnSelect>
        <Navbar.Header>
          <h1>Portable Pantry</h1>
          {/* <Navbar.Brand>
            <a href="#home">Portable Pantry</a>
          </Navbar.Brand> */}
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem eventKey={1} href="#">

              <Button onClick={this.handleShow}>MODAL</Button>
              <Row>
                <Col xs={12} md={8}>
                  <AddItemModal
                    handleClose={this.handleClose}
                    show={this.state.show}
                    barcodeText={this.state.barcodeText}
                    handleBarcodeChange={this.handleBarcodeChange}
                    barcodeValidation={this.barcodeValidation}
                    handleCheckboxChange={this.handleCheckboxChange}
                    expDate={this.state.expDate}
                    handleExpDateChange={this.handleExpDateChange}
                    availableTags={this.state.availableTags}
                  />
                </Col>
              </Row>
            </NavItem>
          </Nav>
          <Nav pullRight>
            <NavDropdown pullRight eventKey={2} title="Dropdown" id="basic-nav-dropdown">
              <MenuItem eventKey={2.1}>Action</MenuItem>
              <MenuItem eventKey={2.2}>Another action</MenuItem>
              <MenuItem eventKey={2.3}>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={2.4}>Separated link</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default NavBar;
