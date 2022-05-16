import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { missionPosted } from 'infrastructure/view/store/Mission/mission.actions';
import { Mission } from 'domain/mission/mission';
import { missionServices } from 'application';
import { useMission } from 'infrastructure/view/hooks/UseMissions';
import { MissionList } from 'infrastructure/view/pages/MissionList/MissionList';

toast.configure();
const notify = () => {
  toast.success('La mission est enregistrée');
};
export const AddMission = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const { dispatch } = useMission();
  const { register, handleSubmit } = useForm<Mission>();

  const addMission = async payload => {
    await missionServices
      .addMission(payload)
      .then(res => {
        dispatch(missionPosted(payload));
        setFormSubmit(true);
        notify();
      })
      .catch((error: any) => {
        toast.error(error.response.data.message);
      });
  };

  useEffect(() => {
    console.log('yes');
  }, []);

  return (
    <>
      {formSubmit ? (
        <MissionList />
      ) : (
        <div className="addMission">
          <form onSubmit={handleSubmit(addMission)}>
            <h1>Formulaire de mission</h1>

            <br />
            <div className="input">
              <input type="text" placeholder="Title" {...register('title')} />
              <br />
              <input type="text" placeholder="Client" {...register('client')} />
            </div>

            <textarea
              style={{ height: '6rem' }}
              placeholder="Profil"
              {...register('profile')}
            />
            <br />
            <textarea
              style={{ height: '10rem' }}
              placeholder="Description"
              {...register('description')}
            />
            <br />

            <button
              className="active-btn width-btn"
              id="sendedForm"
              type="submit"
            >
              Envoyer
            </button>
          </form>

          <span></span>
        </div>
      )}
    </>
  );
};
