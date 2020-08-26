import React from 'react';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { StaticRouter  } from 'react-router-dom';

import store from './app/reducers';
import postgraphile from './app/clients';
import Routes from './app/routes';

function App(props) {
  const { path } = props;

  return (
    <Provider store={store}>
      <ApolloProvider client={postgraphile}>
        <StaticRouter location={path}>
          <Routes />
        </StaticRouter>
      </ApolloProvider>
    </Provider>
  );
}

export default App;
