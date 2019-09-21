import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter  } from 'react-router-dom';

import Routes from './routes';
import { postgraphile } from './clients';

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={postgraphile}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
