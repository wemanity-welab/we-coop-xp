import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../atoms/logo-wemanity';

export const MenuComponent = () => {
  return (
    <>
<<<<<<< HEAD
      <div className="MenuWrapper">
<<<<<<< HEAD
<<<<<<< HEAD
        <Logo />
=======
        <StyledLogo />
>>>>>>> 955d42f (feature: side menu, add logo and background color)
=======
        <Logo />
>>>>>>> 48227a4 (feat: side-bar with logo)
        <div className="Navbar">
          <Link to="/missions">Missions</Link>
          <Link to="/cooperateurs">Cooperateurs</Link>
          <Link to="/paramètres"></Link>
=======
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
>>>>>>> 282a3e9 (feat: side menu)
        </div>
      </div>
    </>
  );
};

export default MenuComponent;
