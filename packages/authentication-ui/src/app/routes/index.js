import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Menu from '../components/menu';
import Home from '../components/home';
import { Login, Registration } from '../components/account';

function Routes() {
  return (
    <>
      <Menu />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/registration' component={Registration} />
      </Switch>
    </>
  );
}

export default Routes;
