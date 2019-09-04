import React from 'react';
import { connect } from 'react-redux';
import { Mutation } from 'react-apollo';

import { LOGIN_USER } from './mutation';
import { setToken } from '../../reducers/tokens';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    const { name, value } = event.currentTarget;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = (loginUser) => (event) => {
    event.preventDefault();

    loginUser({
      variables: {
        email: this.state.email,
        password: this.state.password
      }
    });
  }

  onCompleteLogin = (response) => {
    if (response) {
      this.props.setToken(response.authenticate.jwtToken);
    }
  }

  onLoginError = (error) => {
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
                          <label className='col-sm-3 col-form-label'>Email</label>
                          <div className='col-sm-9'>
                            <input className='form-control' type='text' name='email' placeholder='Email' onChange={this.handleChange} />
                          </div>
                        </div>
                        <div className='form-group row'>
                          <label className='col-sm-3 col-form-label'>Password</label>
                          <div className='col-sm-9'>
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

const mapDispatchToProps = (dispatch) => {
  return {
    setToken: (token) => {
      dispatch(setToken(token));
    }
  };
};

export default connect(undefined, mapDispatchToProps)(Login);
