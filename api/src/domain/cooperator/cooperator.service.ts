import { Inject, Injectable } from '@nestjs/common';
import { CooperatorDomain } from './cooperator.domain';
import { ICooperatorRepository } from './cooperator.irepository';
import { ICooperatorService } from './cooperator.iservice';

@Injectable()
export class CooperatorService implements ICooperatorService {
  private cooperatorRepositoryAdapter: ICooperatorRepository;
  constructor(
    @Inject('ICooperatorRepository') cooperatorAdapter: ICooperatorRepository,
  ) {
    this.cooperatorRepositoryAdapter = cooperatorAdapter;
  }

  async save(cooperator: CooperatorDomain): Promise<CooperatorDomain> {
    return await this.cooperatorRepositoryAdapter.save(cooperator);
  }

  async getAll(): Promise<CooperatorDomain[]> {
    const cooperators = await this.cooperatorRepositoryAdapter.getAll();
    if (cooperators.length === 0) {
      throw new Error('Aucun cooperateur dans la base de données.');
    }
    return cooperators;
  }

  async remove(id: string): Promise<string> {
    const cooperatorFound = await this.cooperatorRepositoryAdapter.getOne(id);

    if (!cooperatorFound) {
      throw new Error('Cooperateur introuvable ou déjà supprimée.');
    }

    const cooperatorRemoved = await this.cooperatorRepositoryAdapter.remove(id);

    return cooperatorRemoved;
  }

  async update(
    id: string,
    cooperator: Partial<CooperatorDomain>,
  ): Promise<CooperatorDomain> {
    const cooperatorFound = await this.cooperatorRepositoryAdapter.getOne(id);

    if (!cooperatorFound) {
      throw new Error('Cooperateur introuvable.');
    } else if (cooperator === cooperatorFound) {
      throw new Error('Cooperateur identique ou déjà modifiée.');
    }

    const updatedCooperator = await this.cooperatorRepositoryAdapter.update(
      id,
      cooperator,
    );

    return updatedCooperator;
  }

  async getOne(id: string): Promise<CooperatorDomain> {
    const cooperatorFound = await this.cooperatorRepositoryAdapter.getOne(id);
    if (!cooperatorFound) {
      throw new Error('Cooperateur introuvable.');
    }
    return cooperatorFound;
  }
  async search(keywords: string[]): Promise<CooperatorDomain[]> {
    const cooperatorsList = await this.cooperatorRepositoryAdapter.search(
      keywords,
    );
    if (cooperatorsList.length === 0) {
      throw new Error('Aucune correspondance.');
    }
    return cooperatorsList;
  }
}
