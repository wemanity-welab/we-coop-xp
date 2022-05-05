import React from 'react';
import { AddMission } from 'infrastructure/view/components/templates/AddMission/AddMission';
import { MissionList } from '../MissionList';
import { useState } from 'react';
const Home = props => {
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
  return (
    <>
      <div className="Home">
        <div> </div>

        <div>
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

          {displayMission && <MissionList />}
        </div>
      </div>
    </>
  );
};

export default Home;
