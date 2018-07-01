import React from "react";
import { FormGroup, FormControl, ControlLabel, Checkbox, Button } from "react-bootstrap";
import Tag from "../Tag";


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
                <Checkbox inline checked={true} onChange={props.handleCheckboxChange} id="tag1id">
                    <Tag
                    color = {"pink"}
                    name = "test"
                    />
            </Checkbox>
                <Checkbox inline checked={true} onChange={props.handleCheckboxChange} id="tag2id">
                <Tag
                    color = {"olive"}
                    name = "test2"
                    />
            </Checkbox>
            </FormGroup>


            <FormGroup controlId="formControlsSelect">
                <ControlLabel>Select</ControlLabel>
                <FormControl componentClass="select" placeholder="select">
                    <option value="select">select</option>
                    <option value="other">...</option>
                </FormControl>
            </FormGroup>
            <FormGroup controlId="formControlsSelectMultiple">
                <ControlLabel>Multiple select</ControlLabel>
                <FormControl componentClass="select" multiple>
                    <option value="select">select (multiple)</option>
                    <option value="other">...</option>
                </FormControl>
            </FormGroup>


            <Button type="submit">Submit</Button>
        </form>
    )
}

export default AddItemForm;