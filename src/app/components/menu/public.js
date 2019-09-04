import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

class Public extends React.Component {
  render() {
    return (
      <Nav className='ml-auto'>
        <Nav.Item>
          <Link className='nav-link' to='/Registration'>
            Registration
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link className='nav-link' to='/Login'>
            Login
          </Link>
        </Nav.Item>
      </Nav>
    );
  }  
}

export default Public;
