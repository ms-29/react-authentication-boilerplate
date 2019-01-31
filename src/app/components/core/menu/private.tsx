import React from 'react';
import { Link } from 'react-router-dom';

class Private extends React.Component {
  render() {
    return (
      <ul className='nav navbar-nav ml-auto'>
        <li className='nav-item'>
          <Link className='nav-link' to='/Login'>
            Logout
          </Link>
        </li>
      </ul>
    );
  }  
}

export default Private;
