import React, { Component } from "react";
import "./NavBar.css";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Button, Modal, FormGroup, ControlLabel } from "react-bootstrap";
// import AddItemModal from "../AddItemModal";   => making modal part of navbar instead
import defaultTags from '../../utils/defaultTags';
import API from "../../utils/API";
import BarcodeReader from "../Barcode/BarcodeReader";
import AddItemForm from "../AddItemForm";

import Toggle from 'react-toggle'


class NavBar extends Component {
  state = {
    userId: 1, //for testing
    show: false,
    autoSave: true,
    barcodeText: "",
    itemName: "",
    availableTags: [],
    checkVals: {}, //tagID:true/false
    hasExpDate: false,
    expDate: "",
    note: ""
  };

  componentWillMount() {
    //get availableTags
    API.getUserTags(this.state.userId)
      .then((res) => {
        this.setState({ availableTags: defaultTags.concat(res.data) });
        console.log("Available Tags: " + JSON.stringify(this.state.availableTags));
      })
      .catch(err => console.log(err));
  }


  //MODAL 
  handleClose = () => {
    this.setState({ show: false });
    this.setState({ checkVals: {} }, () => {
      console.log("checkVals " + JSON.stringify(this.state.checkVals));
    });
  }

  handleShow = () => {
    this.setState({ show: true });
    let checkVals = this.state.checkVals;
    this.state.availableTags.forEach((tag) => {
      checkVals[tag.id] = false;
    });
    this.setState({ checkVals: checkVals }, () => {
      console.log("checkVals " + JSON.stringify(this.state.checkVals));
    });
  }
  handleAutoSave = () => {
    this.setState({ autoSave: !this.state.autoSave });
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
  handleItemNameChange = (e) => {
    this.setState({ itemName: e.target.value }, () => {
      console.log("item name " + this.state.itemName);
    });
  }
  handleCheckboxChange = (e) => {
    const currentVals = this.state.checkVals;
    currentVals[e.target.id] = !currentVals[e.target.id];
    this.setState({ checkVals: currentVals });
  }
  handleHasExpDate = (e) => {
    const currentVal = this.state.hasExpDate;
    this.setState({ hasExpDate: !currentVal });
    console.log(this.state.hasExpDate);
  }
  handleDayChange = (day) => {
    console.log(day);
    this.setState({ expDate: day });
  }
  handleNoteChange = (e) => {
    this.setState({ note: e.target.value }, () => {
      console.log("note text " + this.state.note);
    });
  }
  addItem = (e) => {
    e.preventDefault();//take this away after testing
    //want to capture item details and then hit api to add item
    let itemTags = "";
    const checked = this.state.checkVals;
    for (let key in checked) {
      if (checked[key] === true) {
        itemTags += key + ",";
      }
    }
    console.log(`
    Barcode: ${this.state.barcodeText}
    Item Name: ${this.state.itemName}
    Note: ${this.state.note}
    Tags: ${itemTags}`);
    if (this.state.hasExpDate) {
      console.log(`Exp date: ${this.state.expDate}`);
    }
  }
  // handleExpDateChange = (value, formattedValue) => {
  //   console.log(value);
  //   console.log(formattedValue);
  // }

  render() {
    return (
      <div>
        <Navbar fluid className="color" collapseOnSelect>
          <Navbar.Header>
            <h1>Portable Pantry</h1>
            {/* <Navbar.Brand>
            <a href="#home">Portable Pantry</a>
          </Navbar.Brand> */}
          </Navbar.Header>
          <Navbar.Collapse>

            <Nav pullRight>
              <NavDropdown pullRight eventKey={2} title="Menu" id="basic-nav-dropdown">
                <MenuItem eventKey={2.1}>Add Labels</MenuItem>
                <MenuItem eventKey={2.2}>Grocery List</MenuItem>
                <MenuItem eventKey={2.3}>Recipes</MenuItem>
                <MenuItem eventKey={2.5}>Analytics</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={2.5}>Log Out</MenuItem>
              </NavDropdown>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={1} href="#">
                <Button onClick={this.handleShow}>MODAL</Button>
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>


        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Scan Item Barcode</h4>

            <FormGroup>
              <ControlLabel>AutoSave</ControlLabel>
              <Toggle
                checked={this.state.autoSave}
                name="autoSave"
                onChange={this.handleAutoSave}
                icons={false} />
            </FormGroup>

            <BarcodeReader handleBarcodeChange={this.handleBarcodeChange} />
            <hr />
            <AddItemForm
              barcodeText={this.state.barcodeText}
              handleBarcodeChange={this.handleBarcodeChange}
              barcodeValidation={this.barcodeValidation}
              itemName={this.state.itemName}
              handleItemNameChange={this.handleItemNameChange}
              availableTags={this.state.availableTags}
              checkVals={this.state.checkVals}
              randomKey={this.state.randomKey}
              handleCheckboxChange={this.handleCheckboxChange}
              hasExpDate={this.state.hasExpDate}
              handleHasExpDate={this.handleHasExpDate}
              expDate={this.state.expDate}
              handleDayChange={this.handleDayChange}
              handleExpDateChange={this.handleExpDateChange}
              note={this.state.note}
              handleNoteChange={this.handleNoteChange}
              addItem={this.addItem}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>

      </div>
    )
  }
}

export default NavBar;
