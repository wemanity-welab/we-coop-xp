import React from 'react';

function CardMenu({ prop, position, contextMenu }) {
  return (
    <>
      <img
        onClick={e => {
          e.stopPropagation();
          if (contextMenu.ids.includes(prop.id)) {
            contextMenu.removeId(prop.id);
            return;
          }
          contextMenu.addId(prop.id);
          contextMenu.position(e);
          return;
        }}
        className="card__menu"
        src={'/menu.png'}
        alt="menu"
      />
      {contextMenu.ids.includes(prop.id) && (
        <div
          className="custom-context-menu"
          style={{ top: position.yPos, left: position.xPos }}
        >
          {prop.isActive !== undefined && (
            <div
              className="option"
              onClick={e => {
                e.stopPropagation();
                contextMenu.setStatus(prop.id);
              }}
            >
              {prop.isActive ? 'Désactiver' : 'Activer'}
            </div>
          )}
          <div className="option" onClick={() => console.log('Option 2')}>
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
