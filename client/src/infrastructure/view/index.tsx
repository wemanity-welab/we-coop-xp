/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { HomePage } from './pages/HomePage/Loadable';
import { NotFoundPage } from './pages/NotFoundPage/Loadable';
import { useTranslation } from 'react-i18next';
<<<<<<< HEAD
import { MainMissionList } from './pages/MissionList';
import { AddMission } from './components/templates/AddMission/AddMission';
=======
import { AddMission } from './components/templates/AddMission/AddMission';
import { Missions } from './pages/Missions/Loadable';
>>>>>>> 630c00fb3d0d6107d4b32d5d540215e507bd6346

export function App() {
  const { i18n } = useTranslation();
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - React Boilerplate"
        defaultTitle="React Boilerplate"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="A React Boilerplate application" />
      </Helmet>

      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/missions/" component={MainMissionList} />


        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
}
