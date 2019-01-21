import React, { Component } from 'react';
import { Switch, Route } from 'react-router';

import Home from '../components/home';
import { Menu } from '../components/core';
import { Registration, Login } from '../components/account';

class Routes extends Component {
  render() {
    return (
      <div>
        <Menu />
        <Switch>
          <Route exact={true} path='/' component={Home} />
          <Route exact={true} path='/Registration' component={Registration} />
          <Route exact={true} path='/Login' component={Login} />
        </Switch>
      </div>
    );
  }
}

export default Routes;
