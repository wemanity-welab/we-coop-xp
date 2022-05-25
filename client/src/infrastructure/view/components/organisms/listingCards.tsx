import React from 'react';
import sorting from 'utils/sortingArrays';
import { Card } from '../molecules';

function ListingCards({
  props,
  title,
  position,
  details,
  contextMenu,
  cardType,
  setDisplay,
  setMission,
}) {
  return (
    <div className="container">
      <h2>{title}</h2>
      <ul className="container__cards">
        {props && props.length > 0
          ? props
              .sort(sorting)
              .map(prop => (
                <Card
                  key={prop.id}
                  prop={prop}
                  position={position}
                  contextMenu={contextMenu}
                  details={details}
                  cardType={cardType}
                  setDisplay={setDisplay}
                  setMission={setMission}
                />
              ))
          : 'Chargement'}
      </ul>
    </div>
  );
}

export default ListingCards;
