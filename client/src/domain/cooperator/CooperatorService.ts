import { ICooperatorRepository } from './cooperatoor.irepository';
import { Cooperator } from './cooperator';

export const CooperatorService = (
  repository: ICooperatorRepository,
): ICooperatorRepository => ({
  getCooperators: (): Promise<Cooperator[]> => {
    return repository.getCooperators();
  },
  updateCooperator: (id, data): Promise<Cooperator> => {
    return repository.updateCooperator(id, data);
  },
  deleteCooperator: (id): Promise<string> => {
    return repository.deleteCooperator(id);
  },
  addCooperator: (cooperator: Cooperator): Promise<Cooperator> => {
    return repository.addCooperator(cooperator);
  },

  cooperatorFiltred: (keywords: string[]): Promise<Cooperator[]> => {
    return repository.cooperatorFiltred(keywords);
  },
});
