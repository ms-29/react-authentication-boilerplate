import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API
});

const authLink = (token) => 
  setContext((_, { headers }) => {
    const authHeader = token ? {
      Authorization: `Bearer ${token}`
    } : {};

    return {
      headers: {
        ...headers,
        ...authHeader
      }
    }
  });

const cache = new InMemoryCache();

const client = (token) => {
  return new ApolloClient({
    link: authLink(token).concat(httpLink),
    cache
  });
}

export default client;
