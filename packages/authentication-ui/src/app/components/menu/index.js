import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';

import Public from './public';

import './index.scss';

function Menu() {
  return (
    <Navbar expand='md' bg='secondary'>
      <Navbar.Brand>
        <Link to='/'>
          <h1>React App</h1>
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Public />
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Menu;
