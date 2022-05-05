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
  };
};
export const missionPosted = (data: Mission) => {
  return {
    type: 'add-mission',
    payload: data,
  };
};
export const missionFiltred = (data: Mission[]) => {
  return {
    type: 'filtre-mission',
    payload: data,
  };
};
