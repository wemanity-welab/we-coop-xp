import { Mission } from 'domain/models/Mission';
import { Action } from '../actions/MissionAction';

export type Dispatch = (action: Action) => void;

export type State = {
  catalog: Mission[];
};

export type MissionProviderProps = { children: React.ReactNode };
