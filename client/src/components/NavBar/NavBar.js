import React, { Component } from "react";
import "./NavBar.css";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Button, Col, Row } from "react-bootstrap";
import AddItemModal from "../AddItemModal";
import defaultTags from '../../utils/defaultTags';
import API from "../../utils/API";
import AddItemForm from "../AddItemForm";
class NavBar extends Component {
  state = {
    userId: 1, //for testing
    show: false,
    barcodeText: "",
    availableTags: [],
    addItem: {},//will gather input if checkbox checked then add that tag to it
    expDate: "",
    checkVals:{}, //array of item ids for checked? in csv then can pop straight into database
    randomKey: Math.random() //needed to trigger checkbox render
  };

  componentWillMount() {
    //get availableTags
    API.getUserTags(this.state.userId)
    .then((res) => {
      this.setState({availableTags: defaultTags.concat(res.data)});
      console.log("Available Tags: " + JSON.stringify(this.state.availableTags));
    })
    .catch(err => console.log(err));

    // .then(() => 
    // this.state.availableTags.forEach((tag) => {
    //   this.state.checkVals.push({[tag.id]: false});
    // }))


    // then(() => {
    //   //set checkVals to false
    //   let checkVals = [];
    //   this.state.availableTags.forEach((tag) => { 
    //     checkVals.push({[tag.id+"checked"]:false})
    //   });
    //   this.setState({checkVals: checkVals});
    //   console.log("checkVals " + JSON.stringify(this.state.checkVals));
    // })
}


  //MODAL 
  handleClose = () => {
    this.setState({ show: false });
    this.setState({checkVals: {}}, () => {
      console.log("checkVals " + JSON.stringify(this.state.checkVals));
    });
  }

  handleShow = () => {
    this.setState({ show: true });
    let checkVals = this.state.checkVals;
      this.state.availableTags.forEach((tag) => { 
        checkVals[tag.id] = false;
      });
      this.setState({checkVals: checkVals}, () => {
        console.log("checkVals " + JSON.stringify(this.state.checkVals));
      });
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
    const currentVals = this.state.checkVals;
    currentVals[e.target.id] = true;
    this.setState({checkVals:currentVals, randomKey:Math.random()}); 
   
    //not immediately updating state
    console.log(this.state.checkVals);
    
    // let currentTags = this.state.availableTags;
    // const selected = currentTags.filter(tag => tag.id === event.target.id);
    // const index = currentTags.indexOf(selected[0]);
    // console.log("selected " + JSON.stringify(selected) + index);
    // selected[0].checked ? selected[0].checked=false : selected[0].checked=true;
    // currentTags.splice(index, 1, selected[0]);
    // console.log(currentTags);
    // this.setState({availableTags: currentTags});
    // console.log(this.state.availableTags);
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
                    checkVals={this.state.checkVals}
                    randomKey={this.state.randomKey}
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
