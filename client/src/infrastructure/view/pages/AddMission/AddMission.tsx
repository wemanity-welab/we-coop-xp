import React, { useCallback } from 'react';
import { useMission } from '../../hooks/UseMissions';
import { useForm } from 'react-hook-form';
import { Mission } from 'domain/models/Mission';
import './form.scss';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

export const AddMission = () => {
  const { dispatch } = useMission();
  const { getValues, register, handleSubmit } = useForm<Mission>();

  const addMission = useCallback(async () => {
    try {
      dispatch({
        type: 'add-mission',
        payload: getValues(),
      });
      toast.success('La mission est enregistrée 👋 ');
    } catch (exception) {
      console.error(exception);
    }
  }, []);

  return (
    <form onSubmit={handleSubmit(addMission)}>
      <h1>Formulaire de mission</h1>
      <br />
      {/* <label htmlFor="titre">Titre</label> */}
      <br />
      <input
        type="text"
        placeholder="titre"
        {...register('title', { required: true })}
      />
      <br />

      <input
        type="text"
        placeholder="profil"
        {...register('profile', { required: true })}
      />
      <br />

      <input
        type="text"
        placeholder="client"
        {...register('client', { required: true })}
      />
      <br />
      <textarea
        style={{ height: '10rem' }}
        placeholder="description"
        {...register('description', { required: true })}
      />
      <br />

      <button className="active-btn width-btn" type="submit">
        Envoyer
      </button>
    </form>
  );
};
