import React, { useCallback } from 'react';
import { useMission } from '../hooks/UseMissions';
import { useForm } from 'react-hook-form';
import { Mission } from 'domain/models/Mission';

export const AddMission = () => {
  const { dispatch } = useMission();
  const {
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Mission>();
  const addMission = useCallback(async () => {
    try {
      dispatch({
        type: 'add-mission',
        payload: getValues(),
      });
    } catch (exception) {
      console.error(exception);
    }
  }, []);

  return (
    <form onSubmit={handleSubmit(addMission)}>
      <input
        type="text"
        placeholder="titre"
        {...register('title', { required: true })}
      />
      {errors.title?.type === 'required' && 'Title is required'}

      <input
        type="text"
        placeholder="profil"
        {...register('profile', { required: true })}
      />
      {errors.profile?.type === 'required' && 'profile is required'}

      <input
        type="text"
        placeholder="client"
        {...register('client', { required: true })}
      />
      {errors.client?.type === 'required' && 'clientis required'}

      <input
        type="text"
        placeholder="description"
        {...register('description', { required: true })}
      />
      {errors.description?.type === 'required' && 'description is required'}

      <input
        type="text"
        placeholder="isActive"
        {...register('isActive', { required: true })}
      />
      {errors.isActive?.type === 'required' && 'isActive  is required'}

      <button type="submit">Envoyer</button>
    </form>
  );
};
