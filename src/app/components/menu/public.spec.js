import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import Public from './public';

describe('<Public Menu />', () => {
  it('renders without crashing', () => {
    ReactDOM.render(
      <BrowserRouter>
        <Public />
      </BrowserRouter>,
      document.createElement('div')
    );
  });
});
