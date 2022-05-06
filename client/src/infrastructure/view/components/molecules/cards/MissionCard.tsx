import React, { useState } from 'react';
import CardMenu from '../../atoms/CardMenu';

const MissionCard = ({ props }) => {
  const { title, client, isActive } = props;
  const [status, setStatus] = useState<boolean>(isActive);

  const getStatus = (status: boolean) => {
    setStatus(status);
  };

  return (
    <li>
      <div className="container">
        <div className="card">
          <div className="card__content">
            <CardMenu props={props} function={getStatus} />
            <h3 className="card__header">{title}</h3>
            <p className="card__info">{client}</p>
            <div className={`card__status`}>
              {status ? (
                <>
                  <img
                    className="card__status__logo"
                    src={'/check.png'}
                    alt="check"
                  />
                  <span>Active</span>
                </>
              ) : (
                <>
                  <img
                    className="card__status__logo"
                    src={'/close.png'}
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
