import React from 'react';
import { useMission } from '../../hooks/UseMissions';
import { useForm } from 'react-hook-form';
import { Mission } from 'domain/models/Mission';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

export const AddMission = () => {
  const { dispatch } = useMission();
  const { getValues, register, handleSubmit } = useForm<Mission>();

  const addMission = async () => {
    dispatch({
      type: 'add-mission',
      payload: getValues(),
    });

    toast.success('La mission est enregistrée 👋 ');
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
