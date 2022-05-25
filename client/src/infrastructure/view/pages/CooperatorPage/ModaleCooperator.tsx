import { Form } from 'infrastructure/view/components/organisms/Form';
import { FormStructure } from 'infrastructure/view/components/organisms/types/OrganismsPropsTypes';
import React, { useState } from 'react';
import Modale from '../modale';
import { Cooperators } from './Cooperators';

const ModaleCooperator = () => {
  const [display, setDisplay] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [practice, setPractice] = useState('');
  const [m3, setM3] = useState('');
  const [mentor, setMentor] = useState('');

  const CooperatorFormStructure: FormStructure = {
    title: 'Ajouter un coopérateur',
    titleFormat: 'h2',
    className: 'addMission',
    handleClick: e => {
      console.log('form');
    },
    form: [
      {
        label: 'Prenom',
        type: 'text',
        value: firstName,
        onChange: setFirstName,
      },
      {
        label: 'Nom',
        type: 'text',
        value: lastName,
        onChange: setLastName,
      },
      {
        label: 'Telephone',
        type: 'text',
        value: phoneNumber,
        onChange: setPhoneNumber,
      },

      {
        label: 'Email',
        type: 'text',
        value: email,
        onChange: setEmail,
      },
      {
        label: 'Practice',
        type: 'text',
        value: practice,
        onChange: setPractice,
      },
      {
        label: 'm3',
        type: 'text',
        value: m3,
        onChange: setM3,
      },
      {
        label: 'Mentor',
        type: 'text',
        value: mentor,
        onChange: setMentor,
      },
    ],
  };
  return (
    <Modale
      display={display}
      setDisplay={setDisplay}
      buttonSwich={'Ajouter un cooperateur'}
    >
      {display ? (
        <Cooperators />
      ) : (
        <Form formStructure={CooperatorFormStructure} />
      )}
    </Modale>
  );
};

export default ModaleCooperator;
