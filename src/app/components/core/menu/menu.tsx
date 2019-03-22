import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';

import Public from './public';
import Private from './private';

import './menu.scss';

interface IProps {
  token?: string;
}

class Menu extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    const { token } = this.props;

    return (
      <div>
        <Navbar expand='md' bg='secondary'>
          <Navbar.Brand>
            <Link to='/'>
              <h1>Jobs</h1>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            {token ?
              <Private /> : <Public />
            }
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Menu;
