import React from 'react';
import { useState, useEffect } from 'react';
import { Missions } from '../Missions/Loadable';
import { Form } from 'infrastructure/view/components/organisms/Form';
import { useMission } from 'infrastructure/view/hooks/UseMissions';
import { notifyError, notifySuccess } from 'utils/toastify';
import { missionServices } from 'application';
import { missionPosted } from 'infrastructure/view/store/Mission/mission.actions';
import {
  getDataInLocalStorage,
  setDataInLocalStorage,
} from 'infrastructure/view/hooks/useLocalStorage';
import { TextArea } from 'infrastructure/view/components/atoms/TextArea';
import { FormStructure } from 'infrastructure/view/components/organisms/types/OrganismsPropsTypes';

const ModaleMission: React.FC = () => {
  const [display, setDisplay] = useState('mission-list');
  const [formSubmit, setFormSubmit] = useState(false);
  const { state, dispatch } = useMission();
  const [mission, setMission] = useState({
    id: '',
    title: '',
    profile: '',
    client: '',
    description: '',
  });
  const [title, setTitle] = useState('');
  const [profile, setProfile] = useState('');
  const [client, setClient] = useState('');
  const [description, setDescription] = useState('');

  const updateMission = async (payload, e) => {
    e.preventDefault();

    const missionToUpdate = state.catalog.find(
      missionToUpdate => missionToUpdate.id === mission.id,
    );

    if (payload.title === '') {
      payload.title = missionToUpdate?.title;
    }
    if (payload.profile === '') {
      payload.profile = missionToUpdate?.profile;
    }
    if (payload.client === '') {
      payload.client = missionToUpdate?.client;
    }
    if (payload.description === '') {
      payload.description = missionToUpdate?.description;
    }

    await missionServices
      .updateMission(mission.id, payload)
      .then(res => {
        setFormSubmit(true);
        setDisplay('mission-list');
        notifySuccess('La mission est mise à jour');
        clearInput();
      })
      .catch((error: any) => {
        notifyError(error.response.data.message);
      });
  };

  const addMission = async (payload, e) => {
    e.preventDefault();
    await missionServices
      .addMission(payload)
      .then(res => {
        dispatch(missionPosted(payload));
        setFormSubmit(true);
        setDisplay('mission-list');
        notifySuccess('La mission est enregistrée');
        clearInput();
      })
      .catch((error: any) => {
        notifyError(error.response.data.message);
      });
  };

  useEffect(() => {
    const dataStorage = getDataInLocalStorage('dataInput');
    const savedData = JSON.parse(dataStorage!);
    setTitle(savedData?.title);
    setProfile(savedData?.profile);
    setClient(savedData?.client);
    setDescription(savedData?.description);
  }, []);
  useEffect(() => {
    const valuesStoked = {
      title,
      client,
      profile,
      description,
    };
    setDataInLocalStorage('dataInput', valuesStoked);
  });

  const handleModals = (e: any) => {
    if (e.target.id === 'AddMission') {
      setDisplay('add-form');
    } else if (e.target.id === 'goBack') {
      setDisplay('mission-list');
    }
  };

  const clearInput = () => {
    setTitle('');
    setProfile('');
    setClient('');
    setDescription('');
  };

  const missionFormStructure: FormStructure = {
    title:
      display === 'update-form'
        ? 'Modifier une mission'
        : 'Ajouter une mission',
    titleFormat: 'h2',
    className: 'addMission',
    handleClick: e => {
      const payload = {
        title,
        client,
        profile,
        description,
      };
      if (display === 'update-form') {
        updateMission(payload, e);
      } else {
        addMission(payload, e);
      }
    },
    form: [
      {
        label: 'Titre',
        type: 'text',
        value: title,
        onChange: setTitle,
        placeholder: display === 'update-form' ? mission.title : '',
      },
      {
        label: 'Client',
        type: 'text',
        value: client,
        onChange: setClient,
        placeholder: display === 'update-form' ? mission.client : '',
      },
      {
        label: 'Profil',
        type: 'text',
        value: profile,
        onChange: setProfile,
        placeholder: display === 'update-form' ? mission.profile : '',
      },
    ],
  };

  const renderSwitch = modal => {
    switch (modal) {
      case 'add-form':
        return (
          <Form
            formStructure={missionFormStructure}
            children={
              <TextArea
                label={'Description'}
                value={description}
                onChange={e => setDescription(e.target.value)}
                className={'description'}
                placeholder={
                  display === 'update-form' ? mission.description : ''
                }
              />
            }
          />
        );
      case 'update-form':
        return (
          <Form
            formStructure={missionFormStructure}
            children={
              <TextArea
                label={'Description'}
                value={description}
                onChange={e => setDescription(e.target.value)}
                className={'description'}
                placeholder={
                  display === 'update-form' ? mission.description : ''
                }
              />
            }
          />
        );
      case 'mission-list':
        return <Missions setMission={setMission} setDisplay={setDisplay} />;

      default:
        return <Missions setMission={setMission} setDisplay={setDisplay} />;
    }
  };

  return (
    <>
      <div className="Home">
        <div className="buttonSwitch">
          <button
            className="btn-addMission "
            onClick={handleModals}
            id="AddMission"
            style={{
              display: display === 'mission-list' ? 'block' : 'none',
            }}
          >
            Ajouter une mission
          </button>

          <img
            id="goBack"
            onClick={handleModals}
            src="../goBack.png"
            alt="go back"
            className={display === 'mission-list' ? 'displayNone' : 'display'}
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

export default ModaleMission;
