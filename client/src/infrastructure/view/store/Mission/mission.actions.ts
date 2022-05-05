import { Mission } from 'domain/mission/mission';

export const missionList = (data: Mission[]) => {
  return {
    type: 'display-list-missions',
    payload: data,
  };
};
export const missionPosted = (data: Mission) => {
  return {
    type: 'add-mission',
    payload: data,
  };
};
export const missionfiltred = (data: Mission[]) => {
  return {
    type: 'filtre-mission',
    payload: data,
  };
};
