import React, { useState } from 'react';
import menu from './menu.png';

function CardMenu(status) {
  const { isActive } = status;
  const [openMenu, setOpenMenu] = useState(false);
  const [position, setPosition] = useState({ xPos: 0, yPos: 0 });
  const toggleMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setPosition({ xPos: e.pageX, yPos: e.pageY - 80 });
    setOpenMenu(!openMenu);
  };
  return (
    <>
      <img className="card__menu" src={menu} alt="menu" onClick={toggleMenu} />
      {openMenu && (
        <div
          className="custom-context-menu"
          style={{ top: position.yPos, left: position.xPos }}
        >
          <div className="option" onClick={() => console.log('Option 1')}>
            {isActive ? 'Désactiver' : 'Activer'}
          </div>
          <div className="option" onClick={() => console.log('Option 2')}>
            Option #2
          </div>
          <div className="option" onClick={() => console.log('Option 3')}>
            Option #3
          </div>
        </div>
      )}
    </>
  );
}

export default CardMenu;
