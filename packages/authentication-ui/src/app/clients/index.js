import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API
});
  
const cache = new InMemoryCache();
  
const client = new ApolloClient({
  link: httpLink,
  cache
});

export default client;
