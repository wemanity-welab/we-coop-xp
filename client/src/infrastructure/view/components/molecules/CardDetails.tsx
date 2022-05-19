import React, { useRef } from 'react';
import { useOutsideClick } from 'infrastructure/view/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default function CardDetails(props) {
  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, props.details.removeId);
  return (
    <div ref={wrapperRef} className="details">
      <FontAwesomeIcon
        onClick={props.details.removeId}
        className="details__closeButton"
        icon={faXmark}
      />
      {props.cardType === 'mission' && (
        <div className="details__mission">
          <h3>Mission</h3>
          <div className="details__mission__title">
            Titre : {props.data.title}
          </div>
          <div className="details__mission__profil">
            Profil recherché : {props.data.profile}
          </div>
          <div className="details__mission__client">
            Client : {props.data.client}
          </div>
          <div className="details__mission__description">
            Description : {props.data.description}
          </div>
        </div>
      )}
    </div>
  );
}
