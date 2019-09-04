import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import App from './app';

const mockStore = configureStore([]);

describe('<App />', () => {
  it('renders without crashing', () => {
    const store = mockStore({
      tokens: {
        token: ''
      }
    });
    
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.createElement('div')
    );
  });
});
