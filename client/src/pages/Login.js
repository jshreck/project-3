import React, { Component } from 'react';
import { Grid, Row, Col, Button } from "react-bootstrap";
import MyModal from "../components/MyModal";

class Login extends Component {
  state = {
    show: false
  };

  handleClose = () => {
    this.setState({ show: false });
  }

  handleShow = () => {
    this.setState({ show: true });
  }

  render() {
    return (
      <Grid>
        <Button onClick={this.handleShow}>Click!</Button>
        
        <Row className="show-grid">
          <Col xs={12} md={8}>
            <MyModal
              handleClose={this.handleClose}
              show={this.state.show}

            />
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default Login;