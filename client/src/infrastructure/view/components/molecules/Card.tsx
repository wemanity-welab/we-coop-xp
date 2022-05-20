import React from 'react';
import { CardMenu } from '../atoms';
import CardDetails from './CardDetails';

function Card({ prop, position, details, contextMenu, cardType }) {
  return (
    <>
      {details.ids.includes(prop.id) && (
        <CardDetails
          key={prop.id}
          cardType="mission"
          data={prop}
          details={details}
        />
      )}
      <li>
        <div className="container">
          <div
            onClick={() => {
              if (details.ids.includes(prop.id)) {
                details.removeId(prop.id);
                return;
              }
              details.addId(prop.id);
              return;
            }}
            className="card"
          >
            {cardType === 'mission' && (
              <div className="card__content">
                <div className="card__header">
                  <CardMenu
                    key={prop.id}
                    prop={prop}
                    position={position}
                    contextMenu={contextMenu}
                  />
                  <h3 className="card__header__title">
                    {prop.title && prop.title}
                  </h3>
                </div>
                <p className="card__client">{prop.client && prop.client}</p>
                <img
                  className="card__illustration"
                  src={'/mission_illustration.png'}
                  alt="illustration"
                />
                <div className={`card__status`}>
                  {prop.isActive ? (
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
            )}
          </div>
        </div>
      </li>
    </>
  );
}

export default Card;
