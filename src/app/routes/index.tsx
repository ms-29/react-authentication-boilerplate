import React, { Component } from "react";
import { Switch, Route } from "react-router";

import App from "../app";


class Routes extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact={true} path='/' component={App} />  
        </Switch>  
      </div>  
    );  
  }
}

export default Routes;