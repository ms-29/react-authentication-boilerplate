import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import Private from './private';

describe('<Private Menu />', () => {
  it('renders without crashing', () => {
    ReactDOM.render(
      <BrowserRouter>
        <Private />
      </BrowserRouter>,
      document.createElement('div')
    );
  });
});
