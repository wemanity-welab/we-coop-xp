import { Mission } from 'domain/mission/mission';
import { useAsyncReducer } from 'infrastructure/view/hooks';
import * as React from 'react';
import { missionReducer } from './MissionReducer';
import { Dispatch, ProviderProps, State } from '../types/storeTypes';

export const MissionStateContext = React.createContext<
  { state: State<Mission>; dispatch: Dispatch } | undefined
>(undefined);

const initialState: State<Mission> = {
  catalog: [],
};

function MissionProvider({ children }: ProviderProps) {
  const [state, dispatch] = useAsyncReducer(missionReducer, initialState);
  const value = { state, dispatch };
  return (
    <MissionStateContext.Provider value={value}>
      {children}
    </MissionStateContext.Provider>
  );
}

export { MissionProvider };
