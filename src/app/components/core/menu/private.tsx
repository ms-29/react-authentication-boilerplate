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

interface IProps {

}

interface IState {
  hideSubMenu: boolean;
}

class Private extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      hideSubMenu: true
    };
  }

  toggleSubMenu = () => {
    this.setState({
      hideSubMenu: !this.state.hideSubMenu
    });
  }

  render() {
    return (
      <ul className='nav navbar-nav ml-auto'>
        <Query<IResponse> query={LOGGED_IN_USER}>
          {({ data: response }) => {
            if(response && Object.keys(response).length > 0) {
              return (
                <li className='nav-item'>
                  <a className='nav-link' href='javascript:void(0)' onClick={this.toggleSubMenu}>
                    {response.viewer.email}
                  </a>
                  <div className={`sub-menu bg-secondary ${this.state.hideSubMenu && 'hidden'}`}>
                    <ul>
                    <li className='nav-item'>
                        <Link className='nav-link' to='/edit-profile'>
                          Edit Profile
                        </Link>
                      </li>
                      <li className='nav-item'>
                        <Link className='nav-link' to='/change-password'>
                          Change Password
                        </Link>
                      </li>
                      <li className='nav-item'>
                        <Link className='nav-link' to='/logout'>
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </div>
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
