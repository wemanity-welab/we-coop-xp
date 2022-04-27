import React, { useCallback, useEffect } from 'react';
import { MissionCard } from '../../components/molecules';
import { useMission } from '../../hooks/UseMissions';

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

  return (
    <div className="container">
      <h2>Les missions</h2>
      <ul className="container__missions">
        {state.catalog.map(mission => (
          <MissionCard key={mission.id} props={mission} />
        ))}
      </ul>
    </div>
  );
};
