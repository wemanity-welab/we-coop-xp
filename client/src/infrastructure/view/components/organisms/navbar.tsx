import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Logo } from '../atoms/logo-wemanity';
import './navbar.scss';

const MenuWrapper = styled.section`
  background-color: rgba(74, 122, 169, 0.3);
  width: 250px;
  height: 100vh;
`;

const Navbar = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: start;
`;

export const MenuComponent = () => {
  return (
    <>
      <div className="MenuWrapper">
        <Logo />
        <div className="Navbar">
          <Link to="/missions">Missions</Link>
          <Link to="/cooperateurs">Cooperateurs</Link>
          <Link to="/paramètres"></Link>
        </div>
      </div>
    </>
  );
};

export default MenuComponent;
