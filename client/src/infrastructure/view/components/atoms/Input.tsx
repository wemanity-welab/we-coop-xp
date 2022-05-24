import React from 'react';
import { PropsInput } from './types/AtomsPropsTypes';

export const Input: React.FC<PropsInput> = ({
  type,
  value,
  onChange,
  className,
  id,
  required = false,
  placeholder,
}) => {
  return (
    <>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={className}
        required={required}
        id={id}
        placeholder={placeholder}
      />
    </>
  );
};
