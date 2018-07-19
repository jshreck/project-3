import React from "react";
import Main from "./pages/Main/Main";
import Login from "./pages/Login/Login";
import AddItem from './pages/AddItem/AddItem';
import EditItem from './pages/EditItem/EditItem';
import ManageTags from './pages/ManageTags/ManageTags';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

const App = () => {

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/inventory" component={Main} />
          <Route exact path="/" component={Login} />
          <Route exact path="/additem" component={AddItem} />
          <Route exact path="/tags" component={ManageTags} />
          <Route exact path="/edititem/:id" component={EditItem} />
        </Switch>
      </div>
    </Router>
  );
}


export default App;