import React from 'react';
import ReactDOM from 'react-dom';
import { MockedProvider } from 'react-apollo/test-utils';

import Registration from './registration';

describe('<Registration />', () => {
  it('renders without crashing', () => {
    ReactDOM.render(
      <MockedProvider>
        <Registration />
      </MockedProvider>,
      document.createElement('div')
    );
  });
});
