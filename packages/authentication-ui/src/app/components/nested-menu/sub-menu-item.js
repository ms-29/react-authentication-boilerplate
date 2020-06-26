import React from 'react';
import { Link } from 'react-router-dom';

import SubMenu from './sub-menu';

function SubMenuItem({ menu, index, level }) {
  var hasChild = menu.subMenus && menu.subMenus.length > 0;

  return (
    <li className={hasChild ? 'has-child': ''} data-index={index}>
      <Link role='menuitem' to={menu.menuUrl}>
        {menu.menuText}
      </Link>
      {hasChild && <SubMenu menuList={menu.subMenus} level={level + 1} />}
    </li>
  );    
}

export default SubMenuItem;
