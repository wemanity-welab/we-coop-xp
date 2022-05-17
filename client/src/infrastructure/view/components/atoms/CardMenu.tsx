import React from 'react';

function CardMenu({ prop, position, contextMenu }) {
  return (
    <>
      <img
        onClick={e => {
          if (contextMenu.ids.includes(prop.id)) {
            contextMenu.removeId(prop.id);
          }
          contextMenu.addId(prop.id);
          contextMenu.toggleMenu(e);
        }}
        key={prop.id}
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
              onClick={() => {
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
            onClick={() => contextMenu.handleClickDelete(prop.id)}
          >
            Supprimer
          </div>
        </div>
      )}
    </>
  );
}

export default CardMenu;
