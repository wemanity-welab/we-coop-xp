import React, { useEffect } from 'react';
import { useMission } from '../../hooks/UseMissions';
import { useForm } from 'react-hook-form';
import { Mission } from 'domain/models/Mission';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { missionPosted } from '../../store/actions/mission.actions';
import { missionServices } from 'infrastructure/view/store/services';
toast.configure();

export const AddMission = () => {
  const { dispatch } = useMission();
  const { getValues, register, handleSubmit } = useForm<Mission>();
  const payload = getValues();

  const addMission = () => {
    // try {
    dispatch(missionPosted(payload));
    toast.success('La mission est enregistrée 👋 ');
    const mission = missionServices.addMission(payload);
    // } catch (error: any) {
    //   toast.error(error.response.data.message);
    // }
  };

  return (
    <form onSubmit={handleSubmit(addMission)}>
      <h1>Formulaire de mission</h1>
      <br />
      {/* <label htmlFor="titre">Titre</label> */}
      <br />
      <input type="text" placeholder="titre" {...register('title')} />
      <br />

      <textarea
        style={{ height: '6rem' }}
        placeholder="profil"
        {...register('profile')}
      />
      <br />

      <input type="text" placeholder="client" {...register('client')} />
      <br />
      <textarea
        style={{ height: '10rem' }}
        placeholder="description"
        {...register('description')}
      />
      <br />

      <button className="active-btn width-btn" type="submit">
        Envoyer
      </button>
    </form>
  );
};
