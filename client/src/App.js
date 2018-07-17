import React from "react";
import Main from "./pages/Main";
import Login from "./pages/Login";
import NavBar from "./components/NavBar";
import AddItem from './pages/AddItem';
import ManageTags from './pages/ManageTags';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

const App = () => {

  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/additem" component={AddItem} />
          <Route exact path="/tags" component={ManageTags} />
        </Switch>
      </div>
    </Router>
  );
}


export default App;