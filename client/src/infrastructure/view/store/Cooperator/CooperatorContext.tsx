import { useAsyncReducer } from 'infrastructure/view/hooks';
import * as React from 'react';

import { Dispatch, ProviderProps, State } from '../types/storeTypes';
import { Cooperator } from '../../../../domain/cooperator/cooperator';
import { cooperatorReducer } from './CooperatorReducer';

export const CooperatorStateContext = React.createContext<
  { state: State<Cooperator>; dispatch: Dispatch } | undefined
>(undefined);

const initialState: State<Cooperator> = {
  catalog: [],
};

function CooperatorProvider({ children }: ProviderProps) {
  const [state, dispatch] = useAsyncReducer(cooperatorReducer, initialState);
  const value = { state, dispatch };
  return (
    <CooperatorStateContext.Provider value={value}>
      {children}
    </CooperatorStateContext.Provider>
  );
}

export { CooperatorProvider };
