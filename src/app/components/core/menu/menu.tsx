import React from 'react';
import { Link } from 'react-router-dom';

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
        <nav className='navbar navbar-expand-md navbar-light bg-secondary'>
          <Link className='navbar-brand' to='/'>
            <h1>Jobs</h1>
          </Link>
          <button type='button' className='navbar-toggler'>
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse'>
            {token ?
              <Private /> : <Public />
            }
          </div>
        </nav>
      </div>
    );
  }
}

export default Menu;
