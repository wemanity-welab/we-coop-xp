import { MissionList } from 'infrastructure/view/store/contexts/MissionContext';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>HomePage</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <MissionList />
      <span>My HomePage</span>
    </>
  );
}
