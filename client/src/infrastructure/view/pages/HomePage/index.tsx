import MainLayout from 'infrastructure/view/components/templates/MainLayout';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';

export function HomePage() {
  return (
    <MainLayout>
      <Helmet>
        <title>HomePage</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <span>My HomePage</span>
    </MainLayout>
  );
}
