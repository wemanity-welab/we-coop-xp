import { MainLayout } from 'infrastructure/view/components';
import { SearchBar } from 'infrastructure/view/components/molecules/sideBar/SearchBar';
import React, { useState } from 'react';
import ModaleCooperator from './ModaleCooperator';

export const CooperatorsList = () => {
  return (
    <>
      <MainLayout>
        <SearchBar />
        <ModaleCooperator />
      </MainLayout>
    </>
  );
};
