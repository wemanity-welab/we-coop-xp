<<<<<<< HEAD
<<<<<<< HEAD
export type Action = { type: string; payload?: object[] };
=======
import { Mission } from 'domain/models/Mission';

export type Action = { type: string; payload?: object };
>>>>>>> 826cf94 ( Add mission)
=======
import { Mission } from 'domain/models/Mission';

export type Action = { type: string; payload?: object };
>>>>>>> 01e93a5 (feat: error handling)
export type Dispatch = (action: Action) => void;

export type State<T> = {
  catalog: T[];
};

export type ProviderProps = { children: React.ReactNode };
