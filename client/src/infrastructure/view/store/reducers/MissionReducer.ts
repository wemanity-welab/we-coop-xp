import { missionService } from 'domain/services/MissionService';
import { httpAxios } from 'infrastructure/instances/httpAxios';
import { missionRepository } from 'infrastructure/repositories/missionRepository';
import { Action } from '../actions/MissionAction';
import { State } from '../types/storeTypes';

export async function missionReducer(state: State, action: Action) {
  switch (action.type) {
    case 'display-list-missions': {
      const repository = missionRepository(httpAxios);
      const missions = await missionService(repository).getMissions();
      return { catalog: [...state.catalog, ...missions] };
    }
    default: {
      throw new Error(`Unhandled action type`);
    }
  }
}
