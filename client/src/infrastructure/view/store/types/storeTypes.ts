export type Action = { type: string };
export type Dispatch = (action: Action) => void;

export type State<T> = {
  catalog: T[];
};

export type ProviderProps = { children: React.ReactNode };
