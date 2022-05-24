import React, { useRef } from 'react';
import { useOutsideClick } from 'infrastructure/view/hooks';

function CardMenu({ prop, position, contextMenu, setDisplay, setMission }) {
  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, contextMenu.removeId);
  return (
    <>
      <img
        onClick={e => {
          if (contextMenu.ids.includes(prop.id)) {
            e.stopPropagation();
            contextMenu.removeId(prop.id);
            return;
          }
          contextMenu.position(e);
          contextMenu.addId(prop.id);
          e.stopPropagation();
          return;
        }}
        className="card__header__menu"
        src={'/menu.png'}
        alt="menu"
      />
      {contextMenu.ids.includes(prop.id) && (
        <div
          ref={wrapperRef}
          className="custom-context-menu"
          style={{ top: position.yPos, left: position.xPos }}
        >
          {prop.isActive !== undefined && (
            <div
              className="option"
              onClick={e => {
                e.stopPropagation();
                contextMenu.changeStatus(prop.id, prop.isActive);
              }}
            >
              {prop.isActive ? 'Désactiver' : 'Activer'}
            </div>
          )}
          <div
            className="option"
            onClick={e => {
              e.stopPropagation();
              setMission(prop);
              setDisplay('update-form');
            }}
          >
            Modifier
          </div>
          <div
            className="option"
            onClick={e => {
              e.stopPropagation();
              contextMenu.handleClickDelete(prop.id);
            }}
          >
            Supprimer
          </div>
        </div>
      )}
    </>
  );
}

export default CardMenu;
