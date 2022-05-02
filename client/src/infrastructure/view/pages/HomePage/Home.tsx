import React from 'react';
import { AddMission } from 'infrastructure/view/components/templates/AddMission/AddMission';
import { MissionList } from '../MissionList';
import { useState } from 'react';
const Home = () => {
  const [displayForm, setDisplayForm] = useState(false);
  const [displayMission, setDisplayMission] = useState(true);

  const handelModals = e => {
    if (e.target.id === 'AddMission') {
      setDisplayMission(false);
      setDisplayForm(true);
    } else {
      setDisplayMission(true);
      setDisplayForm(false);
    }
  };
  return (
    <div className="Home">
      <div className="btn-addMission">
        <button onClick={handelModals} id="AddMission">
          Ajouter une mission
        </button>
      </div>
      <div className="modale">
        <span></span>

        {displayForm && <AddMission />}

        {displayMission && <MissionList />}
      </div>
    </div>
  );
};

export default Home;
