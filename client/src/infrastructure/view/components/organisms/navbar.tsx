import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../atoms/logo-wemanity';

export const MenuComponent = () => {
  return (
    <>
      <div className="Menu">
        <Link to="/">
          <Logo />
        </Link>
        <div className="LinkWrapper">
          <Link className="Link" to="/missions">
            Missions
          </Link>
          <Link className="Link" to="/cooperateurs">
            Cooperateurs
          </Link>
        </div>
        <div className="MenuFooter">
          <Link className="Link" to="/paramètres">
            <img src="/icon-parameter.png" alt="" />
            &nbsp;Paramètres
          </Link>
        </div>
      </div>
    </>
  );
};

export default MenuComponent;
