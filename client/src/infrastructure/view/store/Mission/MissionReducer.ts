import { Mission } from 'domain/mission/mission';
import { Action, State } from '../types/storeTypes';

export async function missionReducer(state: State<Mission>, action: Action) {
  switch (action.type) {
    case 'display-list-missions': {
      return { catalog: action.payload };
    }
    // case 'update-status-mission': {
    //   const indexOfUpdatedMission = state.catalog.findIndex(
    //     mission => mission.id !== action.payload.id,
    //   );
    //   const updatedArrayOfMissions = [...state.catalog];
    //   updatedArrayOfMissions[indexOfUpdatedMission] = action.payload;
    //   return { catalog: updatedArrayOfMissions };
    // }
    case 'add-mission': {
      const typePayload = action.payload;
      return typePayload;
    }
    case 'filtre-mission': {
      return { catalog: action.payload };
    }
    default: {
      throw new Error(`Unhandled action type`);
    }
  }
}
