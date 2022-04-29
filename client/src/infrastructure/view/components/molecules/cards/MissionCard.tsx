import React from 'react';
import { CardMenu } from '../../atoms';
import active from './check.png';
import inactive from './close.png';

const MissionCard = ({ props }) => {
  const { title, client, isActive } = props;

  return (
    <li>
      <div className="container">
        <div className="card">
          <div className="card__content">
            <CardMenu status={isActive} />
            <h3 className="card__header">{title}</h3>
            <p className="card__info">{client}</p>
            <div className={`card__status`}>
              {isActive ? (
                <>
                  <img
                    className="card__status__logo"
                    src={active}
                    alt="check"
                  />
                  <span>Active</span>
                </>
              ) : (
                <>
                  <img
                    className="card__status__logo"
                    src={inactive}
                    alt="check"
                  />
                  <span>Inactive</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default MissionCard;
