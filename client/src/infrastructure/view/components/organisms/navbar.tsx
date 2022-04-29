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
            Missions
          </Link>
          <Link className="MenuItem" to="/cooperateurs">
            Cooperateurs
          </Link>
          {/* <Link className="MenuItem" to="/paramètres">
          <img src="/icon-parameter.png" alt="" />
          &nbsp;Paramètres
        </Link> */}
        </div>
      </div>
    </>
  );
};

export default Menu;
