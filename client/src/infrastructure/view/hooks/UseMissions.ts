import { useContext } from 'react';
import { MissionStateContext } from '../store/contexts/MissionContext';

export const useMission = () => {
  const context = useContext(MissionStateContext);
  if (context === undefined) {
    throw new Error('NONE');
  }
  return context;
};
