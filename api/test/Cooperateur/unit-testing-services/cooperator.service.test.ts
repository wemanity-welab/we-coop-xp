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
  save(cooperator: CooperatorDomain): Promise<CooperatorDomain> {
    throw new Error('Method not implemented.');
  }
  getAll(): Promise<CooperatorDomain[]> {
    throw new Error('Method not implemented.');
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
  firstName: 'Mickaël',
  lastName: 'Zonton',
  phoneNumber: '157-232-6965',
  email: 'mzonton@pen.io',
  practice: 'Tech',
  m3: 'Estève',
  mentor: 'Lóng',
});

describe('should test missionService class', () => {
  let service: CooperatorService;
  let adapter: any;

  beforeAll(async () => {
    adapter = new AdapterMock();
    service = new CooperatorService(adapter);
  });

  it('should return success', async () => {
    expect(await service.save(cooperator)).toEqual(cooperator);
  });

  it('should update an object ', async () => {
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
