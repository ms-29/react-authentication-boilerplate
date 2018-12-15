import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import { BrowserRouter  } from "react-router-dom";

import Routes from './app/routes';
import store from './app/reducers';
import client from "./app/clients";

import './index.scss';


ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Provider>
  </ApolloProvider>, 
  document.getElementById('root')
);