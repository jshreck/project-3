import React, { Component } from 'react';
import { Grid, Row, Col } from "react-bootstrap";
import AddItemForm from "../components/AddItemForm";

class AddItem extends Component {
    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={12} md={8}>
                        <AddItemForm />
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default AddItem;