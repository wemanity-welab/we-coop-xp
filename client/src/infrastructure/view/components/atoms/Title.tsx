import React from 'react';
import { TitleProps } from './types/AtomsPropsTypes';

export default function Title({
  label = 'H1',
  format: TitleHead = 'h1',
  className,
  id,
}: TitleProps) {
  return (
    <>
      <TitleHead className={className} id={id}>
        {label}
      </TitleHead>
    </>
  );
}
