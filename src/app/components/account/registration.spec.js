import React from 'react';
import ReactDOM from 'react-dom';
import { MockedProvider } from 'react-apollo/test-utils';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Registration from './registration';

Enzyme.configure({ adapter: new Adapter() });

describe('<Registration />', () => {
  it('renders without crashing', () => {
    ReactDOM.render(
      <MockedProvider>
        <Registration />
      </MockedProvider>,
      document.createElement('div')
    );
  });

  it('email and password state changes after input field change', () => {
    const wrapper = mount(
      <MockedProvider>
        <Registration />
      </MockedProvider>
    );

    const email = wrapper.find('[name="email"]');
    const password = wrapper.find('[name="password"]');

    expect(email.length).toBe(1);
    expect(password.length).toBe(1);
  });
});
