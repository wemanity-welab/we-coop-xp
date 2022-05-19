import React from 'react';
import { sortingByTitle } from 'utils/sortingArrays';
import { Card } from '../molecules';

function ListingCards({
  props,
  title,
  position,
  details,
  contextMenu,
  cardType,
}) {
  return (
    <div className="container">
      <h2>{title}</h2>
      <ul className="container__cards">
        {props.length > 0
          ? props
              .sort(sortingByTitle)
              .map(prop => (
                <Card
                  key={prop.id}
                  prop={prop}
                  position={position}
                  contextMenu={contextMenu}
                  details={details}
                  cardType={cardType}
                />
              ))
          : 'Chargement'}
      </ul>
    </div>
  );
}

export default ListingCards;
