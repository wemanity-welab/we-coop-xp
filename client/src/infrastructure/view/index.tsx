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
import { MissionList } from './pages/MissionList/Loadable';
import { AddMission } from './components/templates/AddMission/AddMission';
import Home from './pages/HomePage/Home';
import { SearchBar } from './components/molecules/sideBar/SearchBar';
import MissionCard from './components/molecules/cards/MissionCard';

export function App() {
  const { i18n } = useTranslation();
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - WeLab"
        defaultTitle="WeLab"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="A React Boilerplate application" />
      </Helmet>

      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/missions" component={Home} />

        <Route exact path="/addMission" component={AddMission} />

        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
}
