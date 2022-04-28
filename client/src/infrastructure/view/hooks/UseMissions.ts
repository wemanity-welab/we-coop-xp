import { useContext } from 'react';
import { MissionStateContext } from '../store/Mission/MissionContext';

export const useMission = () => {
  const context = useContext(MissionStateContext);
  if (context === undefined) {
    throw new Error('NONE');
  }
  return context;
};
