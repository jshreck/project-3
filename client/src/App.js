import React from "react";
import Main from "./pages/Main";
import Login from "./pages/Login";
import NavBar from "./components/NavBar";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";


const App = () => (

  <Router>
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </div>
  </Router>
);

export default App;