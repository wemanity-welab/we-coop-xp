import { Action, State } from '../types/storeTypes';
import { Cooperator } from '../../../../domain/cooperator/cooperator';

export async function cooperatorReducer(
  state: State<Cooperator>,
  action: Action,
) {
  switch (action.type) {
    case 'display-list-cooperators': {
      return { catalog: action.payload };
    }
    case 'update-status-cooperator': {
      return { catalog: [...action.payload] };
    }
    case 'add-cooperator': {
      const typePayload = action.payload;
      return typePayload;
    }
    case 'filtre-cooperator': {
      return { catalog: action.payload };
    }
    default: {
      throw new Error(`Unhandled action type`);
    }
  }
}
