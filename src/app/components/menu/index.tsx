import React from 'react';
import { Link } from 'react-router-dom';

import './index.scss';

class Menu extends React.Component {
  render() {
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
            <ul className='nav navbar-nav ml-auto'>
              <li className='nav-item'>
                <Link className='nav-link' to='/Registration'>
                  Registration
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/Login'>
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>  
    );
  }  
}

export default Menu;