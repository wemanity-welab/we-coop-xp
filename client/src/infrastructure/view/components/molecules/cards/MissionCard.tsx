import React from 'react';
import './missionCard.scss';

const MissionCard = ({ props }) => {
  const { title, client, isActive } = props;
  return (
    <li>
      <div className="container">
        <div className="card">
          <div className="card__content">
            <h3 className="card__header">{title}</h3>
            <p className="card__info">{client}</p>
            <div className={`card__status-${isActive ? 'on' : 'off'}`}>
              {isActive ? 'Active' : 'Inactive'}
            </div>
            <button className="card__button">Détails</button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default MissionCard;
