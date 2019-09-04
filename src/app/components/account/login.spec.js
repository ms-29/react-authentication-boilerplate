import React from 'react';
import ReactDOM from 'react-dom';
import { MockedProvider } from 'react-apollo/test-utils';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import Login from './login';

const mockStore = configureStore([]);

describe('<Login />', () => {
  it('renders without crashing', () => {
    const store = mockStore({});

    ReactDOM.render(
      <Provider store={store}>
        <MockedProvider>
          <Login />
        </MockedProvider>
      </Provider>,
      document.createElement('div')
    );
  });
});
