import React from 'react';
import { Link } from 'react-router-dom';
import { linksData } from '../../constants/routes';
import { Logo } from '../atoms/logo-wemanity';
import { usePathName } from 'infrastructure/view/hooks/UsePathName';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';

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
                id={path === val.link ? 'menuLinkActive' : ''}
              >
                <FontAwesomeIcon className="menuIcon" icon={val.icon} />
                {val.title}
              </Link>
            );
          })}
        </div>
        <div className="MenuFooter">
          <Link
            to="/paramètres"
            id={path === '/paramètres' ? 'menuLinkActive' : ''}
            className="MenuItem"
          >
            <FontAwesomeIcon className="menuIcon" icon={faScrewdriverWrench} />
            &nbsp;Paramètres
          </Link>
        </div>
      </div>
    </>
  );
};

export default Menu;
