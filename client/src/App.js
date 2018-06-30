import React from "react";
import Main from "./pages/Main";
import Login from "./pages/Login";
import AddItem from "./pages/AddItem";
import BarcodeReader from "./pages/BarcodeReader";
import NavBar from "./components/NavBar";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


const App = () => (

  <Router>
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/additem" component={AddItem} />
        <Route exact path="/barcode" component={BarcodeReader} />
      </Switch>
    </div>
  </Router>
);

export default App;