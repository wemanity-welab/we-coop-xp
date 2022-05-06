import MainLayout from 'infrastructure/view/components/templates/MainLayout';

import { SearchBar } from 'infrastructure/view/components/molecules/sideBar/SearchBar';

import React from 'react';
import ModaleMission from './ModaleHome';

export const MainMissionList = () => {
  return (
    <MainLayout>
      <SearchBar />
      <ModaleMission />
    </MainLayout>
  );
};
