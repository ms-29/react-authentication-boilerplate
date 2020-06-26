import React from 'react';
import { Link } from 'react-router-dom';

import SubMenu from './sub-menu';

function MenuItem(props) {
  const { menu, index, active, setActive } = props;
  const hasChild = menu.subMenus && menu.subMenus.length > 0;

  var resetMenu = (event) => {
    setActive(index);
  }

  return (
    <li className={hasChild ? 'has-child': ''} data-index={index}>
      <Link role='menuitem' to={menu.menuUrl} onClick={resetMenu}>
        {menu.menuText}
      </Link>
      {hasChild && active === index && <SubMenu menuList={menu.subMenus} level={0} />}
    </li>
  );    
}

export default MenuItem;
