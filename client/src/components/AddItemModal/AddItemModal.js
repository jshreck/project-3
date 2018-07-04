import React from "react";
import { Modal, Button } from "react-bootstrap";
import AddItemForm from "../AddItemForm";
import BarcodeReader from "../Barcode/BarcodeReader";


const AddItemModal = (props) => {
  return (
    <div>
        <Modal show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Scan Item Barcode</h4>
            <BarcodeReader handleBarcodeChange={props.handleBarcodeChange}/>
            <hr />
            <AddItemForm
            barcodeText = {props.barcodeText}
            handleBarcodeChange = {props.handleBarcodeChange}
            barcodeValidation = {props.barcodeValidation}
            handleCheckboxChange = {props.handleCheckboxChange}
            expDate = {props.expDate} 
            handleExpDateChange={props.handleExpDateChange} 
            availableTags={props.availableTags}
            checkVals={props.checkVals}
            randomKey={props.randomKey}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
  );
};

export default AddItemModal;