import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';

import client from './clients';
import Routes from './routes';

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>  
    </ApolloProvider>  
  )
}

export default App;
