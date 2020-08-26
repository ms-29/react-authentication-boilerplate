import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import fetch from 'node-fetch';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API,
  fetch
});
  
const cache = new InMemoryCache();
  
const client = new ApolloClient({
  link: httpLink,
  cache
});

export default client;
