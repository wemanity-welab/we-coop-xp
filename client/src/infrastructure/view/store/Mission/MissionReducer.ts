import { Mission } from 'domain/mission/mission';
import { Action, State } from '../types/storeTypes';

export async function missionReducer(state: State<Mission>, action: Action) {
  switch (action.type) {
    case 'display-list-missions': {
      return { catalog: action.payload };
    }
    //add mission
    case 'add-mission': {
      const typePayload = action.payload;
      return typePayload;
    }

    default: {
      throw new Error(`Unhandled action type`);
    }
  }
}
