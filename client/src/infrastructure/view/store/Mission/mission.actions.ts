import { Mission } from 'domain/mission/mission';

export const missionList = (data: Mission[]) => {
  return {
    type: 'display-list-missions',
    payload: data,
  };
};
