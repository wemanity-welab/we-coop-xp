import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { AddMission } from '../AddMission/AddMission';

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>HomePage</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>

      <a
        href="/addMission 
      "
      >
        {' '}
        <button
          color="primary"
          className="px-4"
          onClick={() => {
            <AddMission />;
          }}
        >
          {' '}
          Ajouter une mission
        </button>
      </a>

      <br />
      <span>My HomePage</span>
    </>
  );
}
