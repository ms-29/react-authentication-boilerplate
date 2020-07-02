import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation($email: String!, $password: String!) {
    register(input: {email: $email, password: $password}) {
      user {
        userId
        email
      }
    }
  }
`;

export const LOGIN_USER = gql `
  mutation($email: String!, $password: String!) {
    login(input: {email: $email, password: $password }) {
      user {
        userId
      }
    }
  }
`;
