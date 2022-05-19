import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { missionPosted } from 'infrastructure/view/store/Mission/mission.actions';
import { missionServices } from 'application';
import { useMission } from 'infrastructure/view/hooks/UseMissions';
import { Missions } from 'infrastructure/view/pages/Missions';

toast.configure();
const notify = () => {
  toast.success('La mission est enregistrée');
};
type Props = {
  setDisplay: (val: boolean) => void;
};
export const AddMission: React.FC<Props> = ({ setDisplay }) => {
  const [formSubmit, setFormSubmit] = useState(false);
  const { dispatch } = useMission();
  const [title, setTitle] = useState('');
  const [profile, setProfile] = useState('');
  const [client, setClient] = useState('');
  const [description, setDescription] = useState('');

  const addMission = async (payload, e) => {
    e.preventDefault();
    await missionServices
      .addMission(payload)
      .then(res => {
        dispatch(missionPosted(payload));
        setFormSubmit(true);
        setDisplay(true);
        notify();
      })

      .catch((error: any) => {
        toast.error(error.response.data.message);
      });
    console.log('payload', payload);
  };
  const handleClick = e => {
    const payload = {
      title,
      client,
      profile,
      description,
    };
    addMission(payload, e);
    setTitle('');
    setProfile('');
    setClient('');
    setDescription('');
  };
  useEffect(() => {
    const dataStorage: any = localStorage.getItem('data');
    const savedData = JSON.parse(dataStorage);
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
    localStorage.setItem('data', JSON.stringify(valuesStoked));
  });
  return (
    <>
      {formSubmit ? (
        <Missions />
      ) : (
        <div className="addMission">
          <form>
            <h2>Ajouter une mission</h2>

            <br />

            <label htmlFor="titre">Titre:</label>

            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />

            <br />
            <label htmlFor="client">Client: </label>

            <input
              type="text"
              value={client}
              onChange={e => setClient(e.target.value)}
            />
            <br />
            <label htmlFor="profile">Profil:</label>
            <textarea
              value={profile}
              onChange={e => setProfile(e.target.value)}
            />

            <br />
            <label className="label-description" htmlFor="description">
              Description:
            </label>
            <textarea
              className="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />

            <br />
            <button
              onClick={e => handleClick(e)}
              className="active-btn width-btn"
              id="sendedForm"
              type="submit"
            >
              Envoyer
            </button>
          </form>
        </div>
      )}
    </>
  );
};
