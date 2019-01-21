import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Mutation, MutationFn } from 'react-apollo';
import { ApolloError } from 'apollo-client';

import { LOGIN_USER } from './mutation';
import { setToken } from '../../reducers/tokens';

interface IDispatchProps {
  setToken: (token: string) => void;
}

interface IProps extends IDispatchProps {

}

interface IState {
  [key: string]: string;
}

interface IResponse {
  authenticate: {
    jwtToken: string;
  };
}

class Login extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = (loginUser: MutationFn) => (event: React.FormEvent) => {
    event.preventDefault();

    loginUser({
      variables: {
        email: this.state.email,
        password: this.state.password
      }
    });
  }

  onCompleteLogin = (response: IResponse) => {
    if (response) {
      this.props.setToken(response.authenticate.jwtToken);
    }
  }

  onLoginError = (error: ApolloError) => {
    console.log(error);
  }

  render() {
    return (
      <div className='col-sm-12'>
        <div className='col-sm-6 mx-auto'>
          <div className='mt-4'>
            <div className='card'>
              <div className='card-header'>
                <h4>Login</h4>
              </div>
              <div className='card-body'>
                <Mutation mutation={LOGIN_USER} onCompleted={this.onCompleteLogin} onError={this.onLoginError}>
                  {(loginUser) => {
                    return (
                      <form onSubmit={this.handleSubmit(loginUser)}>
                        <div className='form-group row'>
                          <label className='col-sm-2 col-form-label'>Email</label>
                          <div className='col-sm-10'>
                            <input className='form-control' type='text' name='email' placeholder='Email' onChange={this.handleChange} />
                          </div>
                        </div>
                        <div className='form-group row'>
                          <label className='col-sm-2 col-form-label'>Password</label>
                          <div className='col-sm-10'>
                            <input className='form-control' type='password' name='password' placeholder='Password' onChange={this.handleChange} />
                          </div>
                        </div>
                        <div className='form-group row'>
                          <div className='col-sm-12'>
                            <input className='btn btn-primary float-right' type='submit' value='Login' />
                          </div>
                        </div>
                      </form>
                    );
                  }}
                </Mutation>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => {
  return {
    setToken: (token: string) => {
      dispatch(setToken(token));
    }
  };
};

export default connect<{}, IDispatchProps, {}>(undefined, mapDispatchToProps)(Login);
