import { missionServices } from 'application';
import { SearchBar } from 'infrastructure/view/components/molecules/sideBar/SearchBar';
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
    <>
      <SearchBar />
      <div className="container">
        <ul className="container__missions">
          {state.catalog &&
            state.catalog.map(mission => (
              <MissionCard key={mission.id} props={mission} />
            ))}
        </ul>
      </div>
    </>
  );
};
