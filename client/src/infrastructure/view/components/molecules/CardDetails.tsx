import React, { useRef } from 'react';
import { useOutsideClick } from 'infrastructure/view/hooks';

export default function CardDetails(props) {
  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, props.details.removeId);
  return (
    <div ref={wrapperRef} className="details">
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
