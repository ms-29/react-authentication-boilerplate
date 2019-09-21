import gql from 'graphql-tag';

export const LOGIN_USER = gql`
  {
    viewer {
      userId
      email  
    }
  }
`;
