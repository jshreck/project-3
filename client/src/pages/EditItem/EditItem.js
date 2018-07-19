import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import defaultTags from '../../utils/defaultTags';
import API from "../../utils/API";
import AddItemForm from "../../components/AddItemForm";
import NavBar from '../../components/NavBar';
import './EditItem.css';

class EditItem extends Component {
    state = {
        userId: null,
        barcodeText: "",
        itemName: "",
        availableTags: [],//may not need to be a state
        checkVals: {}, //tagID:true/false
        hasExpDate: false,
        expDate: "",
        note: "",
        availableTagIds: [],
        itemTags: []
    };


    componentWillMount() {
        const user = JSON.parse(sessionStorage.user);
        this.setState({ userId: user.id }, () => {
            console.log(this.state.userId);

            API.getUserTags(this.state.userId)
                .then((res) => {
                    this.setState({ availableTags: defaultTags.concat(res.data) }, () => {
                        const tagIds = this.state.availableTags.map((tag) => {
                            return (tag.id).toString();
                          });
                          this.setState({availableTagIds: tagIds});
                          console.log(tagIds);
                        this.getItemInfo(window.location.href.split('edititem/')[1]);
                        console.log("Available Tags: " + JSON.stringify(this.state.availableTags));
                    }); 
                })
                .catch(err => console.log(err));
        });
    }

    getItemInfo = (id) => {
        console.log(id);
        API.getItemInfo(id)
            .then((res) => {
                console.log(res.data);
                const item = res.data
                const tags = item.tags.split(",").filter((tag) => {
                    return this.state.availableTagIds.includes(tag);
                });
                console.log(tags);
                if (item.exp_date !== null) {
                    this.setState({hasExpDate: true});
                }
                this.setState({ barcodeText: item.barcode, itemName: item.name , expDate: item.exp_date || "", note: item.note || "" , itemTags:tags})

            })
            .catch(err => console.log(err));
    }

    handleAutoSave = () => {
        this.setState({ autoSave: !this.state.autoSave });
    }
    handleScanSuccess = () => {
        if (this.state.autoSave) {
            console.log("HITTING AUTOSAVE TRUE");
            this.addItem();
        }
        else {
            return;
        }
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
        if (length > 5 || this.state.barcodeText === "999") return 'success';
        return 'error';
    }
    handleItemNameChange = (e) => {
        this.setState({ itemName: e.target.value }, () => {
            console.log("item name " + this.state.itemName);
        });
    }
    itemNameValidation = () => {
        const length = this.state.itemName.length;
        if (length > 2) return 'success';
        return 'error';
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

    //actually editing 
    addItem = (e) => {
        if (e) e.preventDefault();

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

        API.editItem({
            id: window.location.href.split('edititem/')[1],
            barcode: this.state.barcodeText,
            name: this.state.itemName,
            note: this.state.note,
            tags: itemTags,
            exp_date: exp_date,
            UserId: this.state.userId
        })
            .then(() => {
                console.log("edited!");
                window.location.replace(`/inventory`);
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div id="edit-item-page-wrapper">
                <NavBar />
                <Grid>
                    <Row>
                        <Col id="edit-item-wrapper" xs={12} md={8} mdOffset={2}>
                            <Row>
                                <Col xs={12}>
                                    <h4>Edit Item</h4>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={12}>
                                    <AddItemForm
                                        barcodeText={this.state.barcodeText}
                                        handleBarcodeChange={this.handleBarcodeChange}
                                        barcodeValidation={this.barcodeValidation}
                                        itemName={this.state.itemName}
                                        itemNameValidation={this.itemNameValidation}
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
                            <br />
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}

export default EditItem;
