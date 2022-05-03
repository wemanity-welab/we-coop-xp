import React from 'react';
import { Link } from 'react-router-dom';
import { linksData } from '../../constants/routes';
import { Logo } from '../atoms/logo-wemanity';
import { usePathName } from 'infrastructure/view/hooks/UsePathName';

export const Menu = () => {
  const path = usePathName();
  return (
    <>
      <div className="Menu">
        <Link to="/">
          <Logo />
        </Link>

        <div className="MenuList">
          {linksData.map((val, i) => {
            return (
              <Link
                key={i}
                className="MenuItem"
                to={val.link}
                id={path === val.link ? 'linkActive' : ''}
              >
                <img src={val.icon} alt={val.title} />
                {val.title}
              </Link>
            );
          })}
        </div>
        <div className="MenuFooter">
          <Link className="MenuItem" to="/paramètres">
            <img src="/icon-parameters.png" alt="paramètres" />
            &nbsp;Paramètres
          </Link>
        </div>
      </div>
    </>
  );
};

export default Menu;
