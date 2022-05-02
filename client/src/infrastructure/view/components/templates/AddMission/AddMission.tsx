import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { missionPosted } from 'infrastructure/view/store/Mission/mission.actions';
import { Mission } from 'domain/mission/mission';
import { missionServices } from 'application';
import { useMission } from 'infrastructure/view/hooks/UseMissions';

toast.configure();
const notify = () => {
  toast.success('La mission est enregistrée');
};
export const AddMission = () => {
  const { dispatch } = useMission();
  const { register, handleSubmit } = useForm<Mission>();

  const formSubmited = () => {
    window.location.reload();
  };

  const addMission = async payload => {
    console.log('payload::: ', payload);

    try {
      await missionServices.addMission(payload);
      dispatch(missionPosted(payload));

      notify();
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="addMission">
      <img
        src="./goBack.png"
        className="goBack"
        onClick={formSubmited}
        alt="go back"
      />

      <form onSubmit={handleSubmit(addMission)}>
        <h1>Formulaire de mission</h1>
        <br />
        <br />
        <div className="input">
          <input type="text" placeholder="Titre" {...register('title')} />
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

        <button className="active-btn width-btn" type="submit">
          Envoyer
        </button>
      </form>
      <div className="drop drop-1"></div>
      <div className="drop drop-2"></div>

      <span></span>
    </div>
  );
};
