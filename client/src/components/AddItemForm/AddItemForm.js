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
                {props.availableTags.map((tag, i) => (
                    <Checkbox inline checked={props.checkVals[tag.id]} onChange={props.handleCheckboxChange} id={tag.id} key={props.randomKey+ i}>
                        <Tag name={tag.name} color={tag.color} txtColor={tag.txtColor}/>
                    </Checkbox>
                ))}
            </FormGroup>


            <FormGroup controlId="formControlsSelect">
                <ControlLabel>Select</ControlLabel>
                <FormControl componentClass="select" placeholder="select">
                    <option value="select">select</option>
                    <option value="other">...</option>
                </FormControl>
            </FormGroup>

            <FormGroup controlId="formControlsTextarea">
                <ControlLabel>Textarea</ControlLabel>
                <FormControl componentClass="textarea" placeholder="textarea" />
            </FormGroup>

            <Button type="submit">Save</Button>
        </form>
    )
}

export default AddItemForm;