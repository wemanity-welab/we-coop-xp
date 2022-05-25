import { Cooperator } from './cooperator';

export interface ICooperatorRepository {
  getCooperators: () => Promise<Cooperator[]>;
  updateCooperator: (id: string, data: Cooperator) => Promise<Cooperator>;
  deleteCooperator: (id: string) => Promise<string>;
  addCooperator: (cooperator: Cooperator) => Promise<Cooperator>;
  cooperatorFiltred: (keywords: string[]) => Promise<Cooperator[]>;
}
