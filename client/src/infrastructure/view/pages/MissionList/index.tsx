import { missionServices } from 'application';
import React, { useEffect } from 'react';
import { MissionCard } from '../../components/molecules';
import { useMission } from '../../hooks/UseMissions';
import { missionList } from '../../store/Mission/mission.actions';

export const MissionList = () => {
  const { state, dispatch } = useMission();
  const missions = missionServices.getMissions();

  useEffect(() => {
    try {
      missions.then(data => dispatch(missionList(data)));
    } catch (exception) {
      console.error(exception);
    }
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
