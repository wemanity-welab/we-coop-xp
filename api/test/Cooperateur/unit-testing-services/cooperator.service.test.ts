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

const mission = new CooperatorDomain({
  id: '1',
  title: 'title',
  profile: 'pouet',
  client: 'address',
  description: 'description',
  isActive: false,
});

describe('should test missionService class', () => {
  let missionService: MissionService;
  let adapter: any;

  beforeAll(async () => {
    adapter = new AdapterMock();
    missionService = new MissionService(adapter);
  });

  it('should return success', async () => {
    expect(await missionService.save(mission)).toEqual(mission);
  });

  it('should update an object ', async () => {
    const newMission = new MissionDomain({
      id: '1',
      profile: 'test',
      client: 'address',
      title: 'title',
      description: 'description',
      isActive: false,
    });
    const missionUpdated = await missionService.update('1', newMission);
    expect(missionUpdated).toEqual(newMission);
  });
});
