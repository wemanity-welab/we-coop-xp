import React from 'react';
import { AddMission } from 'infrastructure/view/components/templates/AddMission/AddMission';
import { useState, useEffect } from 'react';
import { Missions } from '../Missions/Loadable';

const ModaleMission = () => {
  const [display, setDisplay] = useState(true);
  const handelModals = (e: any) => {
    if (e.target.id === 'AddMission') {
      setDisplay(false);
    } else if (e.target.id === 'goBack') {
      setDisplay(true);
    }
  };
  useEffect(() => {}, []);
  return (
    <>
      <div className="Home">
        <div className="buttonSwitch">
          <button
            className="btn-addMission "
            onClick={handelModals}
            id="AddMission"
            style={{ display: display ? 'block' : 'none' }}
          >
            Ajouter une mission
          </button>

          <img
            id="goBack"
            onClick={handelModals}
            src="../goBack.png"
            alt="go back"
            className={display ? 'displayNone' : 'display'}
          />
        </div>
        <br />
        <div className="modale">
          <span></span>

          {display ? <Missions /> : <AddMission setDisplay={setDisplay} />}
        </div>
      </div>
    </>
  );
};

export default ModaleMission;
