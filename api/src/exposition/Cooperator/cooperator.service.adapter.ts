import { Injectable } from '@nestjs/common';
import { CooperatorDomain } from '../../domain/Cooperator/cooperator.domain';
import { CooperatorService } from '../../domain/Cooperator/cooperator.service';
import { Cooperator } from '../../types/Cooperator';

@Injectable()
export class CooperatorServiceAdapter {
  private cooperatorService: CooperatorService;
  constructor(cooperatorService: CooperatorService) {
    this.cooperatorService = cooperatorService;
  }

  public async save(cooperator: Cooperator): Promise<CooperatorDomain> {
    const cooperatorDomain = new CooperatorDomain(cooperator);
    return this.cooperatorService.save(cooperatorDomain);
  }
  public async getAll(): Promise<CooperatorDomain[]> {
    return this.cooperatorService.getAll();
  }
  public async getOne(id: string): Promise<CooperatorDomain> {
    return this.cooperatorService.getOne(id);
  }
  public async remove(id: string): Promise<string> {
    return this.cooperatorService.remove(id);
  }
  public async update(
    id: string,
    cooperator: Partial<CooperatorDomain>,
  ): Promise<CooperatorDomain> {
    return this.cooperatorService.update(id, cooperator);
  }
  public async search(keywords: string[]): Promise<CooperatorDomain[]> {
    return this.cooperatorService.search(keywords);
  }
}
