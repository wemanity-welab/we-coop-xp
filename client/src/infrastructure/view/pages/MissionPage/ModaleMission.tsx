import { AddMission } from 'infrastructure/view/components/templates/AddMission/AddMission';
import React, { useState } from 'react';
import { Missions } from './Missions/Loadable';
import Modale from '../modale';

const ModaleMission = () => {
  const [display, setDisplay] = useState(true);
  return (
    <Modale
      display={display}
      setDisplay={setDisplay}
      buttonSwich={'Ajouter une mission'}
    >
      {display ? <Missions /> : <AddMission setDisplay={setDisplay} />}
    </Modale>
  );
};

export default ModaleMission;
