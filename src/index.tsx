import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from "apollo-cache-inmemory";

import App from './app/App';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: httpLink,
  cache: cache
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>, 
  document.getElementById('root')
);