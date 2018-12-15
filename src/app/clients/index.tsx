import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from "apollo-cache-inmemory";


const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API
});
  
const cache = new InMemoryCache();
  
const client = new ApolloClient({
  link: httpLink,
  cache: cache
});

export default client;