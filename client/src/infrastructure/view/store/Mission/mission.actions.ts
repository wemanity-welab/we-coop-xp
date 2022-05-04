import { Mission } from 'domain/mission/mission';

export const missionList = (data: Mission[]) => {
  return {
    type: 'display-list-missions',
    payload: data,
  };
};

export const updateMission = (data: Mission) => {
  return {
    type: 'update-status-mission',
    payload: data,
  };
};
