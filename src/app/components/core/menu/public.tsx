import React from 'react';
import { Link } from 'react-router-dom';

class Public extends React.Component {
  render() {
    return (
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
    );
  }  
}

export default Public;