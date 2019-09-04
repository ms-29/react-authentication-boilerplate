import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

class Private extends React.Component {
  render() {
    return (
      <Nav className='ml-auto'>
        <Nav.Item>
          <Link className='nav-link' to='/change-password'>
            Change Password
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link className='nav-link' to='/logout'>
            Logout
          </Link>
        </Nav.Item>
      </Nav>
    );
  }  
}

export default Private;
