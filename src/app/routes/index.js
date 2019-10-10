import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';
import { graphql } from 'react-apollo';

import Home from '../components/home';
import { Menu } from '../components/menu';
import { Registration, Login, Logout } from '../components/account';
import { LOGIN_USER } from './query';
import { setUser } from '../reducers/users';

class Routes extends React.Component {
  // static getDerivedStateFromProps(props) {
  //   props.setUser(props.data.viewer);
  // }

  render() {
    return (
      <div>
        <Menu />
        <Switch>
          <Route exact={true} path='/' component={Home} />
          <Route exact={true} path='/Registration' component={Registration} />
          <Route exact={true} path='/Login' component={Login} />
          <Route exact={true} path='/Logout' component={Logout} />
        </Switch>
      </div>
    );
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     setUser: (user) => {
//       dispatch(setUser(user));
//     }
//   };
// };

// export default connect(undefined, mapDispatchToProps)(graphql(LOGIN_USER)(Routes));
export default Routes;
