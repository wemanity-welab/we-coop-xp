import { Mission } from 'domain/models/Mission';
import { missionService } from 'domain/services/MissionService';
import { httpAxios } from 'infrastructure/instances/httpAxios';
import { missionRepository } from 'infrastructure/repositories/missionRepository';
import { Action } from '../types/storeTypes';
import { State } from '../types/storeTypes';

export async function missionReducer(state: State<Mission>, action: Action) {
  switch (action.type) {
    case 'display-list-missions': {
<<<<<<< HEAD
      const repository = missionRepository(httpAxios);
      const missions = await missionService(repository).getMissions();

      return { catalog: [...state.catalog, ...missions] };
=======
      return { catalog: action.payload };
>>>>>>> 3ee41b4 (feat:  merge store)
    }

    //add mission
    case 'add-mission': {
      const typePayload = action.payload as Mission;
      return { typePayload };
    }
    default: {
      throw new Error(`Unknown action type: ${action.type}`);
    }
  }
}
