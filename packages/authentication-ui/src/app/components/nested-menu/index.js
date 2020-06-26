import React, { useState, useRef } from 'react';

import Menu from './menu';

import './index.scss';

function NestedMenu(props) {
  const ref = useRef(null);
  const [ active, setActive ] = useState(undefined);

  useState(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      setActive(undefined);
    }
  }

  return (
    <div ref={ref} className='nested-menu'>
      <Menu
        menuList={props.menuList}
        active={active}
        setActive={setActive}
      />
    </div>
  );
}

export default NestedMenu;
