import React from 'react';
import { Helmet } from 'react-helmet-async';
import Home from './Home';

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>HomePage</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <Home />
    </>
  );
}
