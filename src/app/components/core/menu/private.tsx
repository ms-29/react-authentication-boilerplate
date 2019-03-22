import React from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';

import { LOGGED_IN_USER } from './query';

interface IResponse {
  viewer: {
    userId: number;
    email: string;
  }
}

interface IProps {

}

interface IState {
  
}

class Private extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <Nav className='ml-auto'>
        <Query<IResponse> query={LOGGED_IN_USER}>
          {({ data: response }) => {
            if(response && Object.keys(response).length > 0) {
              return (
                <Nav.Item>
                  <a className='nav-link' href='javascript:void(0)'>
                    {response.viewer.email}
                  </a>
                  <Navbar bg="secondary" className='sub-menu'>
                    <Nav className='flex-column'>
                      <Nav.Item>
                        <Link className='nav-link' to='/edit-profile'>
                          Edit Profile
                        </Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Link className='nav-link' to='/change-password'>
                          Change Password
                        </Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Link className='nav-link' to='/logout'>
                          Logout
                        </Link>
                      </Nav.Item>
                    </Nav>
                  </Navbar>
                </Nav.Item>
              );
            }

            return '';
          }}
        </Query>
      </Nav>
    );
  }  
}

export default Private;
