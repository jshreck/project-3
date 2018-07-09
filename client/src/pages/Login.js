import React, { Component } from 'react';
import { Grid, Row, Col, Panel, Tabs, Tab, FormGroup, FormControl, Button } from 'react-bootstrap';


class Login extends Component {
  handleFormSubmit(e) {
    e.preventDefault();
    console.log(e.target);
if (e.target.value.id === "signupSubmit") {
  console.log("signup");
}
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={10} md={6} xsOffset={1} mdOffset={3}>
            <Panel>
              <Tabs defaultActiveKey={1} id="login-signup">
                <Tab eventKey={1} title="Login">
                  <Row>
                    <Col xs={10} xsOffset={1}>
                      <form id="loginForm">
                        <br />
                        <FormGroup controlId="loginEmail">
                          <FormControl type="email" placeholder="Email Address" />
                        </FormGroup>
                        <FormGroup controlId="loginPassword">
                          <FormControl type="password" placeholder="Password" />
                        </FormGroup>
                        <FormGroup controlId="loginSubmit">
                          <Button id="signinSubmit" bsStyle="primary" type="submit" onClick={this.handleFormSubmit}>
                            Login
                           </Button>
                        </FormGroup>
                      </form>
                    </Col>
                  </Row>
                </Tab>
                <Tab eventKey={2} title="Sign Up">
                  <Row>
                    <Col xs={10} xsOffset={1}>
                      <form id="signupForm">
                        <br />
                        <FormGroup controlId="signupName">
                          <FormControl type="name" placeholder="Name" />
                        </FormGroup>
                        <FormGroup controlId="signupEmail">
                          <FormControl type="email" placeholder="Email Address" />
                        </FormGroup>
                        <FormGroup controlId="signupPassword">
                          <FormControl type="password" placeholder="Password" />
                        </FormGroup>
                        <FormGroup controlId="signupPassword2">
                          <FormControl type="password" placeholder="Password" />
                        </FormGroup>
                        <FormGroup controlId="signupSubmit">
                          <Button id="signupSubmit" bsStyle="primary" type="submit" onClick={this.handleFormSubmit}>
                           Sign Up
                          </Button>
                        </FormGroup>
                      </form>
                    </Col>
                  </Row>
                </Tab>
              </Tabs>

            </Panel>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default Login;