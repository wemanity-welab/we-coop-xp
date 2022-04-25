import { useAsyncReducer } from 'infrastructure/view/hooks';
import * as React from 'react';
import { missionReducer } from '../reducers/MissionReducer';
import { Dispatch, MissionProviderProps, State } from '../types/storeTypes';

export const MissionStateContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

const initialState: State = {
  catalog: [],
};

function MissionProvider({ children }: MissionProviderProps) {
  const [state, dispatch] = useAsyncReducer(missionReducer, initialState);
  const value = { state, dispatch };
  return (
    <MissionStateContext.Provider value={value}>
      {children}
    </MissionStateContext.Provider>
  );
}

export { MissionProvider };
