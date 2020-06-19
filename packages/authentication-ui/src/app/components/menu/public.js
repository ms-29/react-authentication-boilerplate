import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Public() {
  return (
    <Nav className='ml-auto'>
      <Nav.Item>
        <Link className='nav-link' to='/registration'>
          Registration
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link className='nav-link' to='/login'>
          Login
        </Link>
      </Nav.Item>
    </Nav>
  );
}

export default Public;
