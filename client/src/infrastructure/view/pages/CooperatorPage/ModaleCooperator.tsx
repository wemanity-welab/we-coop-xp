import { AddMission } from 'infrastructure/view/components/templates/AddMission/AddMission';
import React, { useState } from 'react';
import Modale from '../modale';
import { Cooperators } from './Cooperators';

const ModaleCooperator = () => {
  const [display, setDisplay] = useState(true);
  return (
    <Modale
      display={display}
      setDisplay={setDisplay}
      buttonSwich={'Ajouter un cooperateur'}
    >
      {display ? <Cooperators /> : <AddMission setDisplay={setDisplay} />}
    </Modale>
  );
};

export default ModaleCooperator;
