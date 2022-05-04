import { CooperatorDomain } from './cooperator.domain';

export interface ICooperatorService {
  save(cooperator: CooperatorDomain): Promise<CooperatorDomain>;
  getAll(): Promise<CooperatorDomain[]>;
  remove(id: string): Promise<string>;
  update(id: string, cooperator: CooperatorDomain): Promise<CooperatorDomain>;
  getOne(id: string): Promise<CooperatorDomain>;
  search(keywords: string[]): Promise<CooperatorDomain[]>;
}
