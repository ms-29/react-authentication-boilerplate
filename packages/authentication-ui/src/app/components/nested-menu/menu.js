import React from 'react';

import MenuItem from './menu-item';

function Menu(props) {
  return (
    <ul className='menu-list'>
      {props.menuList.map((menu, index) => (
        <MenuItem
          key={index}
          menu={menu}
          index={index}
          active={props.active}
          setActive={props.setActive}
        />
      ))}
    </ul>
  );
}

export default Menu;
