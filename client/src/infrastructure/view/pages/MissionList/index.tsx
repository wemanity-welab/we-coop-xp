import { missionServices } from 'application';
import { Mission } from 'domain/mission/mission';
import MainLayout from 'infrastructure/view/components/templates/MainLayout';
import React, { useEffect, useState } from 'react';
import { sortingByTitle } from 'utils/sortingArrays';
import { SearchBar } from 'infrastructure/view/components/molecules/sideBar/SearchBar';
import { MissionCard } from '../../components/molecules';
import { useMission } from '../../hooks/UseMissions';
import { missionList } from '../../store/Mission/mission.actions';
import { ListingCards } from 'infrastructure/view/components/organisms';

export const MissionList = () => {
  const { state, dispatch } = useMission();
  const [catalog, setCatalog] = useState<Mission[]>([]);

  useEffect(() => {
    missionServices.getMissions().then(data => dispatch(missionList(data)));
  }, []);

  useEffect(() => {
    setCatalog(state.catalog);
  }, [state.catalog]);

  return (
    <MainLayout>
      <SearchBar />
      {/* <ListingCards title="Les missions" props={catalog} /> */}
    </MainLayout>
  );
};
