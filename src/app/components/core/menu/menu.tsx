import React from 'react';
import { Link } from 'react-router-dom';

import { Query } from 'react-apollo';
import { LOGGED_IN_USER } from './query';
import Public from './public';

import './menu.scss';

interface IResponse {
  viewer: {
    email: string;
    userId: string
  }
}

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
            <Query query={LOGGED_IN_USER}>
              {({ data, loading, error }) => {    
                return (
                  <Public />
                );
              }}
            </Query>
          </div>
        </nav>
      </div>
    );
  }
}

export default Menu;
