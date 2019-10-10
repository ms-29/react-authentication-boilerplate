import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
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
