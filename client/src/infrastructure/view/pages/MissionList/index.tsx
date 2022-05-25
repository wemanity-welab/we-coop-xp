import MainLayout from 'infrastructure/view/components/templates/MainLayout';

import { SearchBar } from 'infrastructure/view/components/molecules/sideBar/SearchBar';

import React, { useState } from 'react';
import ModaleMission from './modaleMission';

export const MainMissionList = () => {
  return (
    <MainLayout>
      <SearchBar />

      <ModaleMission />
    </MainLayout>
  );
};
