import React from 'react';
import { PropsButton } from './types/AtomsPropsTypes';

export const Button: React.FC<PropsButton> = ({
  className,
  id,
  type,
  label,
  onClick,
}) => {
  return (
    <>
      <button onClick={onClick} className={className} id={id} type={type}>
        {label}
      </button>
    </>
  );
};
