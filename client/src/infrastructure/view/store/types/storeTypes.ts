export type Action = { type: string; payload?: object };
export type Dispatch = (action: Action) => void;

export type State<T> = {
  catalog: T[];
};

export type ProviderProps = { children: React.ReactNode };
