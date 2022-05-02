import { missionServices } from 'application';
import React, { useEffect, useState } from 'react';
import menu from './menu.png';

function CardMenu({ props }) {
  const [status, setStatus] = useState(props.isActive);
  const [openMenu, setOpenMenu] = useState(false);
  const [position, setPosition] = useState({ xPos: 0, yPos: 0 });
  const toggleMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setPosition({ xPos: e.pageX, yPos: e.pageY - 80 });
    setOpenMenu(!openMenu);
  };

  useEffect(() => {
    setStatus(props.isActive);
  }, [props.isActive]);

  const handleClick = async () => {
    const newStatus = { isActive: !status };
    const updatedMission = await missionServices.updateMission(
      props.id,
      newStatus,
    );
    setStatus(updatedMission.isActive);
    console.log(updatedMission);
  };

  return (
    <>
      <img className="card__menu" src={menu} alt="menu" onClick={toggleMenu} />
      {openMenu && (
        <div
          className="custom-context-menu"
          style={{ top: position.yPos, left: position.xPos }}
        >
          <div className="option" onClick={() => handleClick()}>
            {status ? 'Désactiver' : 'Activer'}
          </div>{' '}
          <div className="option" onClick={() => console.log('Option 2')}>
            Modifier
          </div>
          <div className="option" onClick={() => console.log('Option 3')}>
            Supprimer
          </div>
        </div>
      )}
    </>
  );
}

export default CardMenu;
