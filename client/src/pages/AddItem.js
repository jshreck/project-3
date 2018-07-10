import React, { Component } from "react";
import { Grid, Row, Col, FormGroup, ControlLabel } from "react-bootstrap";
import defaultTags from '../utils/defaultTags';
import API from "../utils/API";
import BarcodeReader from "../components/Barcode/BarcodeReader";
import AddItemForm from "../components/AddItemForm";
import Toggle from 'react-toggle'
import NoItemInfoAlert from "../components/NoItemInfoAlert";

class AddItem extends Component {
    state = {
        userId: 1, //for testing
        alertShow: false,
        autoSave: false,
        barcodeText: "",
        itemName: "",
        availableTags: [],//may not need to be a state
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

    handleAutoSave = () => {
        this.setState({ autoSave: !this.state.autoSave}, () => {
            console.log("autoSave from AddItem = " + this.state.autoSave);
        });
        
    }
    clearForm = () => {
        this.setState({ barcodeText: "", itemName: "", checkVals: {}, hasExpDate: false, expDate: "", note: "" })
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
        e.preventDefault();

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
                this.clearForm();
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={12} md={8} mdOffset={2}>
                        <Row>
                            <Col xs={12}>
                                <h4>Scan Item Barcode</h4>
                                <FormGroup>
                                    <ControlLabel>AutoSave</ControlLabel>
                                    <Toggle
                                        checked={this.state.autoSave}
                                        name="autoSave"
                                        onChange={this.handleAutoSave}
                                        icons={false} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                <NoItemInfoAlert
                                    alertShow={this.state.alertShow}
                                    handleAlertDismiss={this.handleAlertDismiss}
                                    clearBarcode={this.clearBarcode}
                                />

                                <BarcodeReader
                                    handleBarcodeChange={this.handleBarcodeChange}
                                    handleItemNameChange={this.handleItemNameChange}
                                    handleAlertShow={this.handleAlertShow}
                                    autoSaveOn={this.state.autoSave}
                                />

                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
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
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default AddItem;