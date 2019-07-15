import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import Menu from './menu';

describe('<Menu />', () => {
  it('renders without crashing', () => {
    ReactDOM.render(
      <BrowserRouter>
        <Menu />
      </BrowserRouter>,
      document.createElement('div')
    );
  });
});
