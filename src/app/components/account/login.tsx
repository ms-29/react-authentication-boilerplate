import React from 'react';
import { Mutation, MutationFn } from 'react-apollo';

import { LOGIN_USER } from './mutation';

interface IProps {

}

interface IState {
  [key: string]: string;
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
          <h1>Login</h1>
        </div>
        <div>
          <Mutation mutation={LOGIN_USER}>
            {(loginUser) => {
              return (
                <form onSubmit={this.handleSubmit(loginUser)}>
                  <div>
                    <label>Email</label>
                    <input type='text' name='email' onChange={this.handleChange} />
                  </div>
                  <div>
                    <label>Password</label>
                    <input type='password' name='password' onChange={this.handleChange} />
                  </div>
                  <div>
                    <input type='submit' value='Login' />
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

export default Login;
