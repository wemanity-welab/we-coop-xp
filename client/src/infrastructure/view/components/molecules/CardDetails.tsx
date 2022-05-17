import React from 'react';

export default function CardDetails(props) {
  return (
    <div
      onClick={() => {
        console.log(props.data.title);
      }}
      className="details"
    >
      <div className="details__container">
        {props.cardType === 'mission' && (
          <>
            <div className="details__title">Titre : {props.data.title}</div>
            <div className="details__profil">Profil : {props.data.profil}</div>
            <div className="details__client">Client : {props.data.client}</div>
            <div className="details__description">
              Description : {props.data.description}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
