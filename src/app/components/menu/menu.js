import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';

import Public from './public';
import Private from './private';

import './menu.scss';

class Menu extends React.Component {
  render() {
    const { user } = this.props;

    return (
      <div>
        <Navbar expand='md' bg='secondary'>
          <Navbar.Brand>
            <Link to='/'>
              <h1>React App</h1>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            {(user) ?
              <Private /> : <Public />
            }
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.users.user
  };
}

export default connect(mapStateToProps)(Menu);
