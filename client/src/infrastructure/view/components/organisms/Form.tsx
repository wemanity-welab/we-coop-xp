import React from 'react';
import { Button } from '../atoms/Button';
import Title from '../atoms/Title';
import { LabelInput } from '../molecules/LabelInput';
import { FormProps } from './types/OrganismsPropsTypes';

export const Form: React.FC<FormProps> = ({ formStructure, children }) => {
  return (
    <>
      <div className={formStructure.className}>
        <form>
          <Title
            format={formStructure.titleFormat}
            label={formStructure.title}
          />
          {formStructure.form.map((val, i) => {
            return (
              <LabelInput
                key={i}
                label={val.label}
                type={val.type}
                value={val.value}
                onChange={event => val.onChange(event.target.value)}
                placeholder={val.placeholder}
              />
            );
          })}
          {children}
          <Button
            label={'Envoyer'}
            className={'active-btn width-btn'}
            id={'sendedForm'}
            type={'submit'}
            onClick={event => formStructure.handleClick(event)}
          />
        </form>
      </div>
    </>
  );
};
