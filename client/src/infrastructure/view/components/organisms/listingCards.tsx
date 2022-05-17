import React from 'react';
import { sortingByTitle } from 'utils/sortingArrays';
import { Card } from '../molecules';

function ListingCards({ props, title, position, details, contextMenu }) {
  for (let index = 0; index < props.length; index++) {
    // console.log(props[index].id);
  }

  return (
    <div className="container">
      <h2>{title}</h2>
      <ul className="container__missions">
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
                />
              ))
          : 'Aucune mission dans la base de données ou serveur down. (erreur à gérer dynamiquement)'}
      </ul>
    </div>
  );
}

export default ListingCards;
