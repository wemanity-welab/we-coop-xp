import React from 'react';

function CardMenu({ prop, functions, position, open }) {
  return (
    <>
      <img
        onClick={e => {
          prop.isActive !== undefined && functions.setPropStatus(prop.isActive);
          functions.setId(prop.id);
          functions.toggleMenu(e);
        }}
        key={prop.id}
        className="card__menu"
        src={'/menu.png'}
        alt="menu"
      />
      {open && (
        <div
          className="custom-context-menu"
          style={{ top: position.yPos, left: position.xPos }}
        >
          {functions.getStatus !== undefined && (
            <div
              className="option"
              onClick={() => {
                functions.setStatus();
              }}
            >
              {functions.displayOption()}
            </div>
          )}
          <div className="option" onClick={() => console.log('Option 2')}>
            Modifier
          </div>
          <div className="option" onClick={() => functions.handleClickDelete()}>
            Supprimer
          </div>
        </div>
      )}
    </>
  );
}

export default CardMenu;
