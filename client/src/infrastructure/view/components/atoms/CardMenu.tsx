import { missionServices } from 'application';
import { useMission } from 'infrastructure/view/hooks/UseMissions';
import { missionList } from 'infrastructure/view/store/Mission/mission.actions';
import React, { useState } from 'react';

function CardMenu(props) {
  const { dispatch } = useMission();
  const [status, setStatus] = useState(props.props.isActive);
  const [openMenu, setOpenMenu] = useState(false);
  const [position, setPosition] = useState({ xPos: 0, yPos: 0 });
  const toggleMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setPosition({ xPos: e.pageX, yPos: e.pageY - 80 });
    setOpenMenu(!openMenu);
  };

  const handleClickStatus = async () => {
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

  const handleClickDelete = async () => {
    const id = props.props.id;
    const deletedMsg = await missionServices.deleteMission(id);
    console.log(deletedMsg);
    missionServices
      .getMissions()
      .then(missions => dispatch(missionList(missions)));
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
          <div className="option" onClick={() => handleClickStatus()}>
            {status ? 'Désactiver' : 'Activer'}
          </div>{' '}
          <div className="option" onClick={() => console.log('Option 2')}>
            Modifier
          </div>
          <div className="option" onClick={() => handleClickDelete()}>
            Supprimer
          </div>
        </div>
      )}
    </>
  );
}

export default CardMenu;
