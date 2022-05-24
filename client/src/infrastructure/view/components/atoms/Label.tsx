import React from 'react';
import { PropsLabel } from './types/AtomsPropsTypes';

export const Label: React.FC<PropsLabel> = ({ label, className, id }) => {
  return (
    <>
      <label htmlFor={label} className={className} id={id}>{`${label}:`}</label>
    </>
  );
};
