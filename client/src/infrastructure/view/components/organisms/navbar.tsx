import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../atoms/logo-wemanity';

export const Menu = () => {
  return (
    <>
      <div className="Menu">
        <Link to="/">
          <Logo />
        </Link>

        <div className="MenuList">
          <Link className="MenuItem" to="/missions">
            <img src="/icon-missions.png" alt="" />
            &nbsp;Missions
          </Link>
          <Link className="MenuItem" to="/cooperateurs">
            <img src="/icon-cooperators.png" alt="" />
            &nbsp;Cooperateurs
          </Link>
        </div>
        <div className="MenuFooter">
          <Link className="MenuItem" to="/paramètres">
            <img src="/icon-parameters.png" alt="" />
            &nbsp;Paramètres
          </Link>
        </div>
      </div>
    </>
  );
};

export default Menu;
