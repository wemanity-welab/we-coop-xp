import React from 'react';
import { Input } from '../atoms/Input';
import { Label } from '../atoms/Label';
import { PropsLabelInput } from './types/MoleculesPropsTypes';

export const LabelInput: React.FC<PropsLabelInput> = ({
  label,
  type,
  value,
  onChange,
  className,
  id,
  placeholder,
}) => {
  return (
    <>
      <Label label={label} />
      <Input
        type={type}
        value={value}
        onChange={onChange}
        className={className}
        required={true}
        id={id}
        placeholder={placeholder}
      />
    </>
  );
};
