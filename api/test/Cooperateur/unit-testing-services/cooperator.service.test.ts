import { Inject, Injectable } from '@nestjs/common';
import { CooperatorDomain } from '../../../src/domain/Cooperator/CooperatorDomain';
import { ICooperatorRepository } from '../../../src/domain/Cooperator/ICooperatorRepository';
import { ICooperatorService } from '../../../src/domain/Cooperator/ICooperatorService';

import AdapterMock from '../mock/mockedAdapter';

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
  remove(id: string): Promise<string> {
    throw new Error('Method not implemented.');
  }
  update(id: string, cooperator: CooperatorDomain): Promise<CooperatorDomain> {
    throw new Error('Method not implemented.');
  }
  getOne(id: string): Promise<CooperatorDomain> {
    throw new Error('Method not implemented.');
  }
  search(keywords: string[]): Promise<CooperatorDomain[]> {
    throw new Error('Method not implemented.');
  }
}

const cooperator = new CooperatorDomain({
  id: '1',
  firstName: 'Mickaël',
  lastName: 'Zonton',
  phoneNumber: '157-232-6965',
  email: 'mzonton@pen.io',
  practice: 'Tech',
  m3: 'Estève',
  mentor: 'Lóng',
});

describe('Cooperator service testing', () => {
  let service: CooperatorService;
  let adapter: any;

  beforeAll(async () => {
    adapter = new AdapterMock();
    service = new CooperatorService(adapter);
  });

  it('should return saved cooperator', async () => {
    expect(await service.save(cooperator)).toEqual(cooperator);
  });

  it('should return a cooperators list', async () => {
    const cooperatorsList = (await service.getAll())[0];
    expect(cooperatorsList).toEqual(cooperator);
  });

  xit('should delete a cooperators', async () => {
    const id = (await service.getAll())[0].getId;
    console.log(id);
    // expect(await service.remove(id)).toEqual(cooperator);
  });

  xit('should update a cooperator ', async () => {
    const newCooperator = new CooperatorDomain({
      firstName: 'Mickaël',
      lastName: 'Zonton',
      phoneNumber: '0000000000',
      email: 'mickaelzonton@gogole.io',
      practice: 'Tech',
      m3: 'Estève',
      mentor: 'Lóng',
    });
    const cooperatorUpdated = await service.update('1', newCooperator);
    expect(cooperatorUpdated).toEqual(newCooperator);
  });
});
