import React from 'react';
import { CardMenu } from '../atoms';
import CardDetails from './CardDetails';

function Card({
  prop,
  position,
  details,
  contextMenu,
  cardType,
  setDisplay,
  setMission,
}) {
  return (
    <>
      <li>
        <div className="container">
          {details.ids.includes(prop.id) &&
            (cardType === 'mission' ? (
              <CardDetails
                key={prop.id}
                cardType="mission"
                data={prop}
                details={details}
              />
            ) : (
              <CardDetails
                key={prop.id}
                cardType="cooperator"
                data={prop}
                details={details}
              />
            ))}

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
            {cardType === 'mission' ? (
              <div className="card__content">
                <div className="card__header">
                  <CardMenu
                    key={prop.id}
                    prop={prop}
                    position={position}
                    contextMenu={contextMenu}
                    setDisplay={setDisplay}
                    setMission={setMission}
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
            ) : (
              <div className="card__content">
                <CardMenu
                  key={prop.id}
                  prop={prop}
                  position={position}
                  contextMenu={contextMenu}
                  setDisplay={undefined}
                  setMission={undefined}
                />
                <h3 className="card__header">
                  {prop.lastName && prop.lastName}
                </h3>

                <p className="card__info">{prop.practice && prop.practice}</p>
                <img
                  className="card__illustration"
                  src={'/img-cooperator.png'}
                  alt="img cooperator"
                />

                <div className={`card__status`}>
                  {prop.disponible ? (
                    <>
                      <img
                        className="card__status__logo"
                        src={'/check.png'}
                        alt="check"
                      />
                      <span>disponible</span>
                    </>
                  ) : (
                    <>
                      <img
                        className="card__status__logo"
                        src={'/close.png'}
                        alt="check"
                      />
                      <span>Indisponible</span>
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
