import { useContext } from 'react';
import { CooperatorStateContext } from '../store/Cooperator/CooperatorContext';

export const useCooperator = () => {
  const context = useContext(CooperatorStateContext);
  if (context === undefined) {
    throw new Error('NONE');
  }
  return context;
};
