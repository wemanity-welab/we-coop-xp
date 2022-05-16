import React from 'react';
import { AddMission } from 'infrastructure/view/components/templates/AddMission/AddMission';
import { useState, useEffect } from 'react';
import { Missions } from '../Missions/Loadable';
const ModaleMission = () => {
  const [displayForm, setDisplayForm] = useState(false);
  const [displayMission, setDisplayMission] = useState(true);
  const handelModals = (e: any) => {
    if (e.target.id === 'AddMission') {
      setDisplayMission(false);
      setDisplayForm(true);
    } else if (e.target.id === 'goBack') {
      setDisplayMission(true);
      setDisplayForm(false);
    }
  };
  useEffect(() => {}, []);
  return (
    <>
      <div className="Home">
        <div className="buttonSwitch">
          <button
            className="btn-addMission"
            onClick={handelModals}
            id="AddMission"
          >
            Ajouter une mission
          </button>

          <img
            id="goBack"
            onClick={handelModals}
            src="../goBack.png"
            alt="go back"
            className={displayMission ? 'displayNone' : 'display'}
          />
        </div>
        <br />
        <div className="modale">
          <span></span>

          {displayForm && <AddMission />}

          {displayMission && <Missions />}
        </div>
      </div>
    </>
  );
};

export default ModaleMission;
