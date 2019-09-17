import React from 'react';
import { Mutation } from 'react-apollo';

import { REGISTER_USER } from './mutation';

class Registration extends React.Component {
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

  handleSubmit = (registerUser) => (event) => {
    event.preventDefault();

    registerUser({
      variables: {
        email: this.state.email,
        password: this.state.password
      }
    }).then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    });
  }

  render() {
    return (
      <div className='col-sm-12'>
        <div className='col-sm-6 mx-auto'>
          <div className='mt-4'>
            <div className='card'>
              <div className='card-header'>
                <h4>Registration</h4>
              </div>
              <div className='card-body'>
                <Mutation mutation={REGISTER_USER}>
                  {(registerUser) => {
                    return (
                      <form onSubmit={this.handleSubmit(registerUser)}>
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
                            <input className='btn btn-primary float-right' type='submit' value='Register' />
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

export default Registration;
