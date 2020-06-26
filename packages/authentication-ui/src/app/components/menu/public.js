import React from 'react';
import NestedMenu from '../nested-menu';

const MENU_LIST = [
  {
    menuText: 'Registration',
    menuUrl: '/registration'
  },
  {
    menuText: 'Login',
    menuUrl: '/login'
  }
];

function Public() {
  return (
    <NestedMenu menuList={MENU_LIST} />
  );
}

export default Public;
