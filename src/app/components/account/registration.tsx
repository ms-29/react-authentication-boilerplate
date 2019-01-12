import React from 'react';
import { Mutation, MutationFn } from 'react-apollo';

import { REGISTER_USER } from './mutation';

interface IProps {

}

interface IState {
  [key: string]: string;
}

class Registration extends React.Component<IProps, IState> {
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

  handleSubmit = (registerUser: MutationFn) => (event: React.FormEvent) => {
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
      <div>
        <div>
          <h1>Registration</h1>
        </div>
        <div>
          <Mutation mutation={REGISTER_USER}>
            {(registerUser) => {
              return (
                <form onSubmit={this.handleSubmit(registerUser)}>
                  <div>
                    <label>Email</label>
                    <input type='text' name='email' onChange={this.handleChange} />
                  </div>
                  <div>
                    <label>Password</label>
                    <input type='password' name='password' onChange={this.handleChange} />
                  </div>
                  <div>
                    <input type='submit' value='Register' />
                  </div>
                </form>
              );
            }}
          </Mutation>
        </div>
      </div>
    );
  }
}

export default Registration;
