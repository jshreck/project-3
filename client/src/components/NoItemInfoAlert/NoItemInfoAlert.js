import React from 'react';
import { Alert, Button } from "react-bootstrap";

const NoItemInfoAlert = (props) => {
        if (props.alertShow) {
            return (
                <Alert bsStyle="danger" onDismiss={props.handleAlertDismiss}>
                    <h4>No item found!</h4>
                    <p>
                        Click "next" to continue scanning other items, or click "enter item info manually" to key in this item's information.
                    </p>
                    <p>
                        <Button onClick={props.clearBarcode}>next</Button>
                        <span> or </span>
                        <Button onClick={props.handleAlertDismiss}>enter item info manually</Button>
                    </p>
                </Alert>
            )
        }
        else {
            return null
        }
}

export default NoItemInfoAlert;
