import { CooperatorDomain } from './CooperatorDomain';

export interface ICooperatorRepository {
  save(cooperator: CooperatorDomain): Promise<CooperatorDomain>;
  getAll(): Promise<CooperatorDomain[]>;
  remove(id: string): Promise<string>;
  update(
    id: string,
    cooperator: Partial<CooperatorDomain>,
  ): Promise<CooperatorDomain>;
  getOne(id: string): Promise<CooperatorDomain>;
}
