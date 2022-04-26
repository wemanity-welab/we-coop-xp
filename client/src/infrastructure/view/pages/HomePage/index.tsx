import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { AddMission } from '../AddMission/AddMission';
import { MissionList } from '../MissionList';

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>HomePage</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>

      <Link
        to="/addMission 
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
      </Link>

      <br />
      <span>My HomePage</span>
    </>
  );
}
