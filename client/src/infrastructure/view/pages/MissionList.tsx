import { missionService } from 'domain/services/MissionService';
import { httpAxios } from 'infrastructure/instances/httpAxios';
import { missionRepository } from 'infrastructure/repositories/missionRepository';
import React, { useCallback, useEffect } from 'react';
import { useMission } from '../store/contexts/MissionContext';

export const MissionList = () => {
  const { state, dispatch } = useMission();

  const getMissions = useCallback(async () => {
    try {
      const repository = await missionRepository(httpAxios);
      const responseMissions = await missionService(repository).getMissions();
      dispatch({ type: 'display-list-missions', payload: responseMissions });
    } catch (exception) {
      console.error(exception);
    }
  }, []);

  useEffect(() => {
    getMissions();
  }, []);

  // const handleSelectMission = (mission: Mission) => {
  //   onSelectMission(mission);
  // };

  return (
    <div>
      <h2>List of missions</h2>
      <ul></ul>
    </div>
  );
};
