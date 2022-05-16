import Home from 'infrastructure/view/pages/MissionList/ModaleMission';
import React from 'react';
import { Menu } from '../organisms';

export default function MainLayout({ children }) {
  return (
    <div id="app">
      <div id="content-wrap">
        <Menu />
        <main>
          <div id="content">{children}</div>
        </main>
      </div>
    </div>
  );
}
