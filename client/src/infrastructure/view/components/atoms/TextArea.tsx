import React from 'react';
import { PropsTextArea } from './types/AtomsPropsTypes';

export const TextArea: React.FC<PropsTextArea> = ({
  label = '',
  value,
  onChange,
  className,
  id,
  placeholder,
}) => {
  return (
    <>
      <label htmlFor={label}>{`${label}:`}</label>
      <textarea
        value={value}
        onChange={onChange}
        className={className}
        id={id}
        placeholder={placeholder}
      />
    </>
  );
};
