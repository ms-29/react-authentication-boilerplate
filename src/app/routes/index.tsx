import React from 'react';
import { Switch, Route } from 'react-router';

import Home from '../components/home';
import { Menu } from '../components/core';
import { Registration, Login } from '../components/account';

interface IProps {
  token?: string;
}

class Routes extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    const { token } = this.props;

    return (
      <div>
        <Menu token={token} />
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
