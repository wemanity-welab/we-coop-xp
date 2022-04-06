import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  getRepositoryToken,
  InjectRepository,
  TypeOrmModule,
} from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MissionEntity } from '../../src/infrastructure/job/MissionEntity';
import { MockType, repositoryMockFactory } from '../mock/typeormMockMethods';
import { IAdapter } from '../utils/interfaces/IAdapter';
import { Mission } from '../utils/types/Mission';

class AdapterMock implements IAdapter<Mission, string> {
  constructor(
    @InjectRepository(MissionEntity)
    private readonly missionEntityRepository: Repository<MissionEntity>,
  ) {}
  async getAll(): Promise<Mission[]> {
    return await this.missionEntityRepository.find();
  }
  remove(id: string): Promise<string> {
    throw new Error('Method not implemented.');
  }
  update(id: string, data: Mission): Promise<Mission> {
    throw new Error('Method not implemented.');
  }
  async getOne(id: string): Promise<any> {
    const test = await this.missionEntityRepository.findOne({ id });
    console.log(test);
  }

  async save(data: Mission): Promise<Mission> {
    return await this.missionEntityRepository.save(data);
  }
}

describe('adapterMock testing', () => {
  let adapter: AdapterMock;
  let app: INestApplication;
  let repositoryMock: MockType<Repository<MissionEntity>>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        AdapterMock,
        {
          provide: getRepositoryToken(MissionEntity),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    repositoryMock = moduleFixture.get(getRepositoryToken(MissionEntity));
    adapter = moduleFixture.get<AdapterMock>(AdapterMock);
  });

  it('Should save a mission in inMemory database', async () => {
    const mission = {
      id: '1',
      profil: 'devOps',
      client: 'BNP Paribas',
      address: '10 rue de Paris 75000 Paris',
      project: 'WEB APP',
      description: 'full stack',
      duration: '6 mois',
      stack: 'React, Nodejs, Mongodb',
      team_organisation: 'test',
    };

    expect(await adapter.save(mission)).toEqual(mission);
    console.log('TEST: ', await adapter.getAll());
  });

  xit('Should find a mission by id', async () => {
    const mission = {
      id: '1',
      profil: 'devOps',
      client: 'BNP Paribas',
      address: '10 rue de Paris 75000 Paris',
      project: 'WEB APP',
      description: 'full stack',
      duration: '6 mois',
      stack: 'React, Nodejs, Mongodb',
      team_organisation: 'test',
    };

    expect(await adapter.getOne('1')).toEqual(mission);
  });
});
