import React from "react";
import { FormGroup, FormControl, ControlLabel, Checkbox, Button } from "react-bootstrap";
import Tag from "../Tag";
import DayPickerInput from 'react-day-picker/DayPickerInput';

import 'react-day-picker/lib/style.css';

import { formatDate, parseDate } from 'react-day-picker/moment';

const AddItemForm = (props) => {
    return (
        <form>
            <FormGroup
                validationState={props.barcodeValidation()}
            >
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

            <FormGroup>
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

            <FormGroup>
                {props.availableTags.map((tag, i) => (
                    <Checkbox inline checked={props.checkVals[tag.id]} onChange={props.handleCheckboxChange} id={tag.id} key={i} value={props.checkVals[tag.id]}>
                        <Tag name={tag.name} color={tag.color} txtColor={tag.txtColor} />
                    </Checkbox>
                ))}
            </FormGroup>

            <FormGroup>
                <Checkbox inline checked={props.hasExpDate} onChange={props.handleHasExpDate} value={props.hasExpDate}>
                    <ControlLabel>Expiration Date: </ControlLabel>
                    <DayPickerInput onDayChange={props.handleDayChange} formatDate={formatDate}
                        parseDate={parseDate} placeholder="MM/DD/YYYY" value={props.expDate} />
                </Checkbox>
            </FormGroup>

            <FormGroup controlId="formControlsTextarea">
                <ControlLabel>Note</ControlLabel>
                <FormControl componentClass="textarea" value={props.note}
                    onChange={props.handleNoteChange} />
            </FormGroup>

            <Button type="submit" onClick={props.addItem}>Save</Button>
        </form>
    )
}

export default AddItemForm;