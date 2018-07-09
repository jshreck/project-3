import React, { Component } from "react";
import "./NavBar.css";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Button, Modal, FormGroup, ControlLabel } from "react-bootstrap";
// import AddItemModal from "../AddItemModal";   => making modal part of navbar instead
import defaultTags from '../../utils/defaultTags';
import API from "../../utils/API";
import BarcodeReader from "../Barcode/BarcodeReader";
import AddItemForm from "../AddItemForm";

import Toggle from 'react-toggle'
import NoItemInfoAlert from "../NoItemInfoAlert";

class NavBar extends Component {
  state = {
    userId: 1, //for testing
    show: false,
    alertShow: false,
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

  //ALERT
  handleAlertDismiss = () => {
    this.setState({ alertShow: false });
  }
  handleAlertShow = () => {
    this.setState({ alertShow: true });
  }
  clearBarcode = () => {
    this.setState({ barcodeText: "" });
    this.setState({ alertShow: false })
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

  //ADD ITEM FORM
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
    let exp_date = null;
    const checked = this.state.checkVals;
    for (let key in checked) {
      if (checked[key] === true) {
        itemTags += key + ",";
      }
    }

    if (this.state.hasExpDate) {
      exp_date = this.state.expDate;
    }

    console.log(`
    Barcode: ${this.state.barcodeText}
    Item Name: ${this.state.itemName}
    Note: ${this.state.note}
    Tags: ${itemTags}
    Exp date: ${exp_date}`);

    API.addItem({
      barcode: this.state.barcodeText,
      name: this.state.itemName,
      note: this.state.note,
      tags: itemTags,
      exp_date: exp_date,
      UserId: this.state.userId
    })
      .then(() => {
        console.log("added!");
      })
      .catch(err => console.log(err))
  }

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
                <MenuItem eventKey={2.1} disabled>Add Labels</MenuItem>
                <MenuItem eventKey={2.2} disabled>Grocery List</MenuItem>
                <MenuItem eventKey={2.3} disabled>Recipes</MenuItem>
                <MenuItem eventKey={2.5} disabled>Analytics</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={2.5} disabled>Log Out</MenuItem>
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

            <NoItemInfoAlert
              alertShow={this.state.alertShow}
              handleAlertDismiss={this.handleAlertDismiss}
              clearBarcode={this.clearBarcode}
            />

            <BarcodeReader
              handleBarcodeChange={this.handleBarcodeChange}
              handleItemNameChange={this.handleItemNameChange}
              handleAlertShow={this.handleAlertShow}
            />
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
