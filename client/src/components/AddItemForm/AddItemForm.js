import React from "react";
import { FormGroup, FormControl, ControlLabel, Checkbox, Button, Row, Col } from "react-bootstrap";
import Tag from "../Tag";
import DayPickerInput from 'react-day-picker/DayPickerInput';

import 'react-day-picker/lib/style.css';

import { formatDate, parseDate } from 'react-day-picker/moment';

const AddItemForm = (props) => {
    return (
        <Row>
            <Col xs={12}>
                <form>
                    <Row>
                        <Col xs={12} md={6}>
                            <FormGroup validationState={props.barcodeValidation()}>
                                <ControlLabel>Barcode </ControlLabel>
                                <FormControl
                                    id="barcode"
                                    type="text"
                                    label="barcode"
                                    placeholder="Enter barcode"
                                    value={props.barcodeText}
                                    onChange={props.handleBarcodeChange}
                                />
                            </FormGroup>
                        </Col>
                        <Col xs={12} md={6}>
                            <FormGroup validationState={props.itemNameValidation()}>
                                <ControlLabel>Name </ControlLabel>
                                <FormControl
                                    id="name"
                                    type="text"
                                    label="name"
                                    placeholder="Item Name"
                                    value={props.itemName}
                                    onChange={props.handleItemNameChange}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <FormGroup>
                                {props.availableTags.map((tag, i) => (
                                    <Checkbox inline checked={props.checkVals[tag.id]} onChange={props.handleCheckboxChange} id={tag.id} key={i} value={props.checkVals[tag.id]}>
                                        <Tag name={tag.name} color={tag.color} txtColor={tag.txtColor} />
                                    </Checkbox>
                                ))}
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <FormGroup>
                                <Checkbox inline checked={props.hasExpDate} onChange={props.handleHasExpDate} value={props.hasExpDate}>
                                    <ControlLabel>Expiration Date: </ControlLabel>
                                    <DayPickerInput onDayChange={props.handleDayChange} formatDate={formatDate}
                                        parseDate={parseDate} placeholder="MM/DD/YYYY" value={props.expDate} />
                                </Checkbox>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <FormGroup controlId="formControlsTextarea">
                                <ControlLabel>Note</ControlLabel>
                                <FormControl componentClass="textarea" value={props.note}
                                    onChange={props.handleNoteChange} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={6} mdOffset={3}>
                            <Button block bsStyle="success" type="submit" onClick={props.addItem}>Save</Button>
                        </Col>
                    </Row>
                </form>
            </Col>
        </Row>
    )
}

export default AddItemForm;