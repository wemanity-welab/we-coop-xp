import { Mission } from 'domain/models/Mission';
import { missionService } from 'domain/services/MissionService';
import { httpAxios } from 'infrastructure/instances/httpAxios';
import { missionRepository } from 'infrastructure/repositories/missionRepository';
import * as React from 'react';

type Action =
  | { type: 'display-list-missions'; payload: any }
  | { type: 'display-mission' }
  | { type: 'update-mission' }
  | { type: 'add-mission' }
  | { type: 'delete-mission' };

// type Dispatch = (action: Action) => void;

type State = {
  catalog: Mission[];
};

type MissionProviderProps = { children: React.ReactNode };

const MissionStateContext = React.createContext<
  { state: State; dispatch } | undefined
>(undefined);

function missionReducer(state: State, action: Action) {
  switch (action.type) {
    case 'display-list-missions': {
      return { catalog: [{ ...state, ...action.payload }] };
    }
    default: {
      throw new Error(`Unhandled action type`);
    }
  }
}

const initialState: State = {
  catalog: [],
};

function MissionProvider({ children }: MissionProviderProps) {
  const [state, dispatch] = React.useReducer(missionReducer, initialState);
  const value = { state, dispatch };
  return (
    <MissionStateContext.Provider value={value}>
      {children}
    </MissionStateContext.Provider>
  );
}

function useMission() {
  const context = React.useContext(MissionStateContext);
  if (context === undefined) {
    throw new Error('NONE');
  }
  return context;
}

export { MissionProvider, useMission };
