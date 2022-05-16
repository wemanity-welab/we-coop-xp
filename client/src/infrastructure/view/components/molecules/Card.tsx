import React from 'react';
import { CardMenu } from '../atoms';

function Card({ prop, functions, position, open }) {
  return (
    <li>
      <div className="container">
        <div className="card">
          <div className="card__content">
            <CardMenu
              key={prop.id}
              prop={prop}
              functions={functions}
              position={position}
              open={open}
            />
            <h3 className="card__header">{prop.title && prop.title}</h3>
            <p className="card__info">{prop.client && prop.client}</p>
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
        </div>
      </div>
    </li>
  );
}

export default Card;
