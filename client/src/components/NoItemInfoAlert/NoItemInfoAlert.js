import React from 'react';
import { Alert, Button } from "react-bootstrap";
import './NoItemInfoAlert.css';
const NoItemInfoAlert = (props) => {
        if (props.alertShow) {
            return (
                <Alert id="no-info-alert" bsStyle="danger" onDismiss={props.handleAlertDismiss}>
                    <h4>No item found!</h4>
                    <p>
                        Click <Button onClick={props.clearBarcode}>next</Button> to continue scanning other items, or click <Button onClick={props.handleAlertDismiss}>enter item info manually</Button> to key in this item's information.
                    </p>

                </Alert>
            )
        }
        else {
            return null
        }
}

export default NoItemInfoAlert;
