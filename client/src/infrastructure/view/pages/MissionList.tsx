import { missionService } from 'domain/services/MissionService';
import { httpAxios } from 'infrastructure/instances/httpAxios';
import { missionRepository } from 'infrastructure/repositories/missionRepository';
import React, { useCallback, useEffect } from 'react';
import { useMission } from '../store/contexts/MissionContext';

export const MissionList = () => {
  const { state, dispatch } = useMission();

  const getMissions = useCallback(async () => {
    try {
      dispatch({ type: 'display-list-missions' });
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
      <ul>
        {/* {state.catalog.map(mission => (
          <li key={mission.id}>
            <button
            // onClick={() => {
            //   handleSelectMission(mission);
            // }}
            >
              {mission.title}
            </button>
            {mission.client}
          </li>
        ))} */}
      </ul>
    </div>
  );
};
