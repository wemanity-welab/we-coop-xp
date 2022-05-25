import React from 'react';
import { useEffect } from 'react';
type ModaleProps = {
  setDisplay: (val: boolean) => void;
  display: boolean;
  children: React.ReactNode;
  buttonSwich: string;
};
const Modale: React.FC<ModaleProps> = ({
  setDisplay,
  display,
  children,
  buttonSwich,
}) => {
  const handelModals = e => {
    if (e.target.id === 'switch') {
      setDisplay(false);
    } else if (e.target.id === 'goBack') {
      setDisplay(true);
    }
  };
  useEffect(() => {}, []);
  return (
    <>
      <div className="Home">
        <div className="buttonSwitch">
          <button
            className="btn-addMission "
            onClick={handelModals}
            id="switch"
            style={{ display: display ? 'block' : 'none' }}
          >
            {buttonSwich}
          </button>

          <img
            id="goBack"
            onClick={handelModals}
            src="../goBack.png"
            alt="go back"
            className={display ? 'displayNone' : 'display'}
          />
        </div>
        <br />
        <div className="modale">{children}</div>
      </div>
    </>
  );
};

export default Modale;
