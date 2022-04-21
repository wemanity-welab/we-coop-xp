import { missionService } from 'domain/services/MissionService';
import { httpAxios } from 'infrastructure/instances/httpAxios';
import { missionRepository } from 'infrastructure/repositories/missionRepository';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';

export function HomePage() {
  const repository = missionRepository(httpAxios);
  const service = missionService(repository);
  const test = () => {
    service.getMissions().then(res => console.log(res));
  };
  test();
  return (
    <>
      <Helmet>
        <title>HomePage</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <span>My HomePage</span>
    </>
  );
}
