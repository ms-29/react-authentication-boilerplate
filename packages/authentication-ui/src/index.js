import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.scss';

import App from './app/app';
import store from './app/reducers';

ReactDOM.render(
  <Provider store={store}>
    <App />  
  </Provider>,
  document.getElementById('root') 
);
