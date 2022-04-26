import { Action } from '../actions/MissionAction';

export type Dispatch = (action: Action) => void;

export type State<T> = {
  catalog: T[];
};

export type ProviderProps = { children: React.ReactNode };
