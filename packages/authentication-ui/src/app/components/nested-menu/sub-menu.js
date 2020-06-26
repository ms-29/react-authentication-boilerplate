import React from 'react';

import SubMenuItem from './sub-menu-item';

function SubMenu(props) {
  return (
    <ul className='bg-secondary sub-menu-list' data-level={props.level}>
      {props.menuList.map((menu, index) => (
        <SubMenuItem menu={menu} index={index} level={props.level} />
      ))}
    </ul>
  );
}

export default SubMenu;
