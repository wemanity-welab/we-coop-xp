import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { missionPosted } from 'infrastructure/view/store/Mission/mission.actions';
import { Mission } from 'domain/mission/mission';
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
  const { register, handleSubmit, setValue } = useForm<Mission>();
  const refInput = React.useRef<HTMLInputElement | null>(null);
  const { ref, ...rest } = register('title');

  const addMission = async payload => {
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
  };

  useEffect(() => {}, []);

  return (
    <>
      {formSubmit ? (
        <Missions />
      ) : (
        <div className="addMission">
          <form onSubmit={handleSubmit(addMission)}>
            <h2>Ajouter une mission</h2>

            <br />

            <label htmlFor="titre">Titre:</label>
            <input
              {...rest}
              name="title"
              ref={e => {
                ref(e);
                refInput.current = e; // you can still assign to ref
                console.log(e);
              }}
              onChange={e => e.target.value}
            />

            {/* <input type="text" placeholder="Title" {...register('title')} /> */}
            <br />
            <label htmlFor="client">Client: </label>
            <input type="text" {...register('client')} />
            <br />
            <label htmlFor="profile">Profil:</label>
            <textarea {...register('profile')} />
            <br />
            <label className="label-description" htmlFor="description">
              Description:
            </label>
            <textarea className="description" {...register('description')} />
            <br />
            <label htmlFor=""></label>
            <button
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
