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
  setProp,
}) {
  function renderNames() {
    if (prop.firstName && prop.lastName) {
      const names = `${prop.lastName} ${prop.firstName}`;
      return names.length > 15 ? names.substr(0, 13) + '...' : names;
    }
  }

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
                    setProp={setProp}
                  />
                  <h3 className="card__header__title">
                    {prop.title && prop.title.length > 15
                      ? prop.title.substr(0, 13) + '...'
                      : prop.title}
                  </h3>
                </div>
                <p className="card__client">
                  {prop.client && prop.client.length > 20
                    ? prop.client.substr(0, 20) + '...'
                    : prop.client}
                </p>
                <img
                  className="card__illustration"
                  src={'/mission_illustration.png'}
                  alt="illustration"
                />

                <div className={`card__status `}>
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
                <div className="card__header">
                  <CardMenu
                    key={prop.id}
                    prop={prop}
                    position={position}
                    contextMenu={contextMenu}
                    setDisplay={setDisplay}
                    setProp={setProp}
                  />
                  <h4 className="card__header__title card-header-name">
                    {renderNames()}
                  </h4>
                </div>
                <p className="card__practice">
                  {prop.practice && prop.practice}
                </p>

                <img
                  className="card__illustration"
                  src={'/img-cooperator.png'}
                  alt="img cooperator"
                />

                <div className={`card__status`}>
                  {prop.disponible ? (
                    <div className={`card__status__disponible`}>
                      <img
                        className="card__status__logo"
                        src={'/check.png'}
                        alt="check"
                      />
                      <span>Disponible</span>
                    </div>
                  ) : (
                    <div className={`card__status__disponible`}>
                      <img
                        className="card__status__logo"
                        src={'/close.png'}
                        alt="check"
                      />
                      <span>Indisponible</span>
                    </div>
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
