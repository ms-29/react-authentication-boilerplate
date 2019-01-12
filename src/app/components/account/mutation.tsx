import gql from 'graphql-tag';

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
