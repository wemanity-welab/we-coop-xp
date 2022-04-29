import MenuComponent from 'infrastructure/view/components/organisms/navbar';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { MissionList } from '../MissionList';

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
