import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation($email: String!, $password: String!) {
    registerUser(input: {email: $email, password: $password}) {
      user {
        userId
        email
      }
    }
  }
`;

export const LOGIN_USER = gql `
  mutation($email: String!, $password: String!) {
    authenticate(input: {email: $email, password: $password }) {
      jwtToken
    }
  }
`;
