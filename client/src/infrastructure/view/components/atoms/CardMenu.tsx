import { missionServices } from 'application';
import React, { useState } from 'react';

function CardMenu(props) {
  const [status, setStatus] = useState(props.props.isActive);
  const [openMenu, setOpenMenu] = useState(false);
  const [position, setPosition] = useState({ xPos: 0, yPos: 0 });
  const toggleMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setPosition({ xPos: e.pageX, yPos: e.pageY - 80 });
    setOpenMenu(!openMenu);
  };

  const handleClick = async () => {
    const newStatus = { isActive: !status };
    const updatedMission = missionServices.updateMission(
      props.props.id,
      newStatus,
    );
    const newMission = await updatedMission;
    setStatus(newMission.isActive);
    setOpenMenu(!openMenu);
    props.function(newMission.isActive);
  };

  return (
    <>
      <img
        className="card__menu"
        src={'/menu.png'}
        alt="menu"
        onClick={toggleMenu}
      />
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
