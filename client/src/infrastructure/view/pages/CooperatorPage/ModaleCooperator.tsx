import { cooperatorServices } from 'application';
import { Form } from 'infrastructure/view/components/organisms/Form';
import { FormStructure } from 'infrastructure/view/components/organisms/types/OrganismsPropsTypes';
import {
  getDataInLocalStorage,
  setDataInLocalStorage,
} from 'infrastructure/view/hooks/useLocalStorage';
import { useCooperator } from 'infrastructure/view/hooks/UseCooperators';
import { cooperatorPosted } from 'infrastructure/view/store/Cooperator/cooperator.actions';
import React, { useEffect, useState } from 'react';
import { notifyError, notifySuccess } from 'utils/toastify';
import { Cooperators } from './Cooperators';

const ModaleCooperator = () => {
  const [display, setDisplay] = useState('cooperator-list');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [practice, setPractice] = useState('');
  const [m3, setM3] = useState('');
  const [mentor, setMentor] = useState('');
  const { state, dispatch } = useCooperator();
  const [cooperator, setCooperator] = useState({
    id: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    practice: '',
    m3: '',
    mentor: '',
  });

  const handleModals = (e: any) => {
    if (e.target.id === 'AddCooperator') {
      setDisplay('add-form');
    } else if (e.target.id === 'goBack') {
      setDisplay('cooperator-list');
    }
  };

  const addCooperator = async (payload, e) => {
    e.preventDefault();
    await cooperatorServices
      .addCooperator(payload)
      .then(res => {
        dispatch(cooperatorPosted(payload));
        setDisplay('cooperator-list');
        notifySuccess('Le coopérateur est enregistré.');
        clearInput();
      })
      .catch((error: any) => {
        notifyError(error.response.data.message);
      });
  };

  const updateCooperator = async (payload, e) => {
    e.preventDefault();

    const cooperatorToUpdate = state.catalog.find(
      cooperatorToUpdate => cooperatorToUpdate.id === cooperator.id,
    );

    if (payload.firstName === '') {
      payload.firstName = cooperatorToUpdate?.firstName;
    }
    if (payload.lastName === '') {
      payload.lastName = cooperatorToUpdate?.lastName;
    }
    if (payload.phoneNumber === '') {
      payload.phoneNumber = cooperatorToUpdate?.phoneNumber;
    }
    if (payload.email === '') {
      payload.email = cooperatorToUpdate?.email;
    }
    if (payload.practice === '') {
      payload.practice = cooperatorToUpdate?.practice;
    }
    if (payload.m3 === '') {
      payload.m3 = cooperatorToUpdate?.m3;
    }
    if (payload.mentor === '') {
      payload.mentor = cooperatorToUpdate?.mentor;
    }

    await cooperatorServices
      .updateCooperator(cooperator.id, payload)
      .then(res => {
        setDisplay('cooperator-list');
        notifySuccess('Le coopérateur est mis à jour');
        clearInput();
      })
      .catch((error: any) => {
        notifyError(error.response.data.message);
      });
  };

  const clearInput = () => {
    setFirstName('');
    setLastName('');
    setPhoneNumber('');
    setEmail('');
    setPractice('');
    setM3('');
    setMentor('');
  };

  //Garder les valeurs des inputs quand on revient sur la liste
  useEffect(() => {
    const dataStorage = getDataInLocalStorage('dataInput');
    const savedData = JSON.parse(dataStorage!);
    setFirstName(savedData?.firstName);
    setLastName(savedData?.lastName);
    setPhoneNumber(savedData?.phoneNumber);
    setEmail(savedData?.email);
    setPractice(savedData?.practice);
    setM3(savedData?.m3);
    setMentor(savedData?.mentor);
  }, []);
  useEffect(() => {
    const valuesStoked = {
      firstName,
      lastName,
      phoneNumber,
      email,
      practice,
      m3,
      mentor,
    };
    setDataInLocalStorage('dataInput', valuesStoked);
  });

  const CooperatorFormStructure: FormStructure = {
    title:
      display === 'update-form'
        ? 'Modifier un coopérateur'
        : 'Ajouter un coopérateur',
    titleFormat: 'h2',
    className: 'addMission ',
    handleClick: e => {
      const payload = {
        firstName,
        lastName,
        phoneNumber,
        email,
        practice,
        m3,
        mentor,
      };
      if (display === 'update-form') {
        updateCooperator(payload, e);
      } else {
        addCooperator(payload, e);
      }
    },
    form: [
      {
        label: 'Prenom',
        type: 'text',
        value: firstName,
        onChange: setFirstName,
        placeholder: display === 'update-form' ? cooperator.firstName : '',
      },
      {
        label: 'Nom',
        type: 'text',
        value: lastName,
        onChange: setLastName,
        placeholder: display === 'update-form' ? cooperator.lastName : '',
      },
      {
        label: 'Telephone',
        type: 'text',
        value: phoneNumber,
        onChange: setPhoneNumber,
        placeholder: display === 'update-form' ? cooperator.phoneNumber : '',
      },

      {
        label: 'Email',
        type: 'text',
        value: email,
        onChange: setEmail,
        placeholder: display === 'update-form' ? cooperator.email : '',
      },
      {
        label: 'Practice',
        type: 'text',
        value: practice,
        onChange: setPractice,
        placeholder: display === 'update-form' ? cooperator.practice : '',
      },
      {
        label: 'm3',
        type: 'text',
        value: m3,
        onChange: setM3,
        placeholder: display === 'update-form' ? cooperator.m3 : '',
      },
      {
        label: 'Mentor',
        type: 'text',
        value: mentor,
        onChange: setMentor,
        placeholder: display === 'update-form' ? cooperator.mentor : '',
      },
    ],
  };

  const renderSwitch = modal => {
    switch (modal) {
      case 'add-form':
        return <Form formStructure={CooperatorFormStructure} />;
      case 'update-form':
        return <Form formStructure={CooperatorFormStructure} />;
      case 'mission-list':
        return <Cooperators setProp={setCooperator} setDisplay={setDisplay} />;

      default:
        return <Cooperators setProp={setCooperator} setDisplay={setDisplay} />;
    }
  };
  return (
    // <Modale
    //   display={display}
    //   setDisplay={setDisplay}
    //   buttonSwich={'Ajouter un cooperateur'}
    // >
    //   {display ? (
    //     <Cooperators />
    //   ) : (
    //     <Form formStructure={CooperatorFormStructure} />
    //   )}
    // </Modale>
    <>
      <div className="Home">
        <div className="buttonSwitch">
          <button
            className="btn-addMission "
            onClick={handleModals}
            id="AddCooperator"
            style={{
              display: display === 'cooperator-list' ? 'block' : 'none',
            }}
          >
            Ajouter un coopérateur
          </button>

          <img
            id="goBack"
            onClick={handleModals}
            src="../goBack.png"
            alt="go back"
            className={
              display === 'cooperator-list' ? 'displayNone' : 'display'
            }
          />
        </div>
        <br />
        <div className="modale">
          <span></span>
          {renderSwitch(display)}
        </div>
      </div>
    </>
  );
};

export default ModaleCooperator;
