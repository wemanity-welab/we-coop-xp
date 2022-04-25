import React, { useCallback, useEffect } from 'react';
import { useMission } from '../hooks/UseMissions';

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
  console.log(state);

  // const handleSelectMission = (mission: Mission) => {
  //   onSelectMission(mission);
  // };

  return (
    <div>
      <h2>List of missions</h2>
      <ul>
        {state.catalog.length > 0 ? state.catalog[0].client : 'loading...'}
      </ul>
    </div>
  );
};
