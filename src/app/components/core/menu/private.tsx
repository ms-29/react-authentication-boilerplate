import React from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';

import { LOGGED_IN_USER } from './query';

interface IResponse {
  viewer: {
    userId: number;
    email: string;
  }
}

class Private extends React.Component {
  render() {
    return (
      <ul className='nav navbar-nav ml-auto'>
        <Query<IResponse> query={LOGGED_IN_USER}>
          {({ data: response }) => {
            if(response && Object.keys(response).length > 0) {
              return (
                <li className='nav-item'>
                  <Link className='nav-link' to='/'>
                    {response.viewer.email}
                  </Link>
                </li>
              );
            }

            return '';
          }}
        </Query>
      </ul>
    );
  }  
}

export default Private;
