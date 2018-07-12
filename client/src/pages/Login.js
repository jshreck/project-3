import React, { Component } from 'react';
import { Grid, Row, Col, Panel, Tabs, Tab, FormGroup, FormControl, Button } from 'react-bootstrap';
import API from "../utils/API";
import { Redirect } from 'react-router-dom';


class Login extends Component {

  state = {
    signupName: "",
    signupEmail: "",
    signupPassword: "",
    signupPassword2: "",
    email: "",
    password: "",
    redirectTo: "",
  }

  //SIGN UP
handleSignupNameChange = (e) => {
    this.setState({ signupName: e.target.value }, () => {
        console.log("name: " + this.state.signupName);
    });
}
handleSignupEmailChange = (e) => {
  this.setState({ signupEmail: e.target.value }, () => {
      console.log("email: " + this.state.signupEmail);
  });
}
handleSignupPasswordChange = (e) => {
  this.setState({ signupPassword: e.target.value }, () => {
      console.log("password: " + this.state.signupPassword);
  });
}
handleSignupPassword2Change = (e) => {
  this.setState({ signupPassword2: e.target.value }, () => {
      console.log("name: " + this.state.signupPassword2);
  });
}

confirmPassword = () => {
  const password = this.state.signupPassword;
  if (password === this.state.signupPassword2 && this.state.signupPassword2 !== "" ) return 'success';
  else return 'error';
}

//LOG IN
handleEmailChange = (e) => {
  this.setState({ email: e.target.value }, () => {
      console.log("email: " + this.state.email);
  });
}
handlePasswordChange = (e) => {
  this.setState({ password: e.target.value }, () => {
      console.log("password: " + this.state.password);
  });
}

//ON SUBMIT
  handleFormSubmit = (e) => {
    e.preventDefault();
    
    if (e.target.id === "signupSubmit") {
      if (this.state.signupPassword === this.state.signupPassword2) {
        const user = {
          name: this.state.signupName,
          email: this.state.signupEmail,
          password: this.state.signupPassword
        };
        API.createUser(user);
      }
      else {
      console.log("passwords do not match");
      }
    }
    
    else if (e.target.id === "loginSubmit"){
      const user = {
        email: this.state.email,
        password: this.state.password
      }
    API.login(user).then(({ data }) => {
      console.log('User logged in: %O', data);
      sessionStorage["user"] = JSON.stringify(data);
      // sessionStorage[user] = data;
      this.setState({ redirectTo: '/' });
    });
    }
  }


  

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo}/>;
    }

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
                          <FormControl type="email" placeholder="Email Address" onChange={this.handleEmailChange} />
                        </FormGroup>
                        <FormGroup controlId="loginPassword">
                          <FormControl type="password" placeholder="Password" onChange={this.handlePasswordChange} />
                        </FormGroup>
                        <FormGroup controlId="loginSubmit">
                          <Button id="loginSubmit" bsStyle="primary" type="submit" onClick={this.handleFormSubmit}>
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
                          <FormControl type="name" placeholder="Name" onChange={this.handleSignupNameChange} />
                        </FormGroup>
                        <FormGroup controlId="signupEmail">
                          <FormControl type="email" placeholder="Email Address" onChange={this.handleSignupEmailChange}/>
                        </FormGroup>
                        <FormGroup controlId="signupPassword">
                          <FormControl type="password" placeholder="Password" onChange={this.handleSignupPasswordChange}/>
                        </FormGroup>
                        <FormGroup controlId="signupPassword2" validationState={this.confirmPassword()}>
                          <FormControl type="password" placeholder="Password" onChange={this.handleSignupPassword2Change} />
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