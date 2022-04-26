import React, { useCallback, useEffect } from 'react';
import { useMission } from '../hooks/UseMissions';
import { useForm } from 'react-hook-form';
import { Mission } from 'domain/models/Mission';
export const AddMission = () => {
  const { state, dispatch } = useMission();

  const { register, handleSubmit } = useForm<Mission>();

  const addMission = useCallback(async () => {
    try {
      dispatch({ type: 'add-mission' });
    } catch (exception) {
      console.error(exception);
    }
  }, []);

  console.log('state.catalog', state.catalog);

  return (
    <form onSubmit={handleSubmit(state => console.log(state))}>
      {/* <form onSubmit={handleSubmit(addMission)}> */}
      <input type="text" name="titre" placeholder="titre" {...register} />
      <input type="text" name="profil" placeholder="profil" {...register} />
      <input type="text" name="client" placeholder="client" {...register} />
      <input
        type="text"
        name="description"
        placeholder="description"
        {...register}
      />

      <input type="submit" />
    </form>
  );
};
