import { INestApplication, Injectable } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { EntityManager, getConnection, Like, Repository } from 'typeorm';
import { IMissionRepository } from '../../../src/domain/Mission/IMissionRepository';
import { MissionDomain } from '../../../src/domain/Mission/MissionDomain';
import { MissionEntity } from '../../../src/infrastructure/Mission/MissionEntity';
import Utils from '../../../src/utils/Utils';
import { Mission } from '../../utils/types/Mission';

@Injectable()
class MissionRepositoryAdapter implements IMissionRepository {
  constructor(
    @InjectRepository(MissionEntity)
    private readonly missionEntityRepository: Repository<MissionEntity>,
  ) {}

  save(mission: MissionDomain): Promise<MissionDomain> {
    throw new Error('Method not implemented.');
  }
  async getAll(): Promise<any> {
    return await this.missionEntityRepository.find();
  }
  remove(missionId: string): Promise<string> {
    throw new Error('Method not implemented.');
  }
  update(missionId: string, mission: MissionDomain): Promise<MissionDomain> {
    throw new Error('Method not implemented.');
  }
  getOne(missionId: string): Promise<MissionDomain> {
    throw new Error('Method not implemented.');
  }

  async search(keywords: string[]): Promise<MissionDomain[]> {
    const request = await this.searchByElement(keywords);

    const missions: MissionEntity[] = Utils.removeDuplicateObject(request);

    return missions.map((mission) => new MissionDomain(mission));
  }

  async searchByElement(array: Array<any>) {
    const elements: any[] = [];
    await Promise.all(
      array.map(async (element) => {
        const request: Array<string | number | object> =
          await this.missionEntityRepository.find({
            where: [
              { profile: Like(`%${element}%`) },
              { description: Like(`%${element}%`) },
              { client: Like(`%${element}%`) },
            ],
          });
        request.forEach((req) => elements.push(req));
      }),
    );

    return elements;
  }
}

describe('Testing Search Method', () => {
  let app: INestApplication;
  let entityManager: EntityManager;
  let repository: MissionRepositoryAdapter;
  const missions = [
    {
      title: 'mission1',
      profile: 'dev fullstack javascript',
      client: 'BNP Paribas',
      description: 'full stack',
    },
    {
      title: 'mission2',
      profile: 'dev Java',
      client: 'Metro',
      description: 'back-end',
    },
    {
      title: 'mission3',
      profile: 'devOps',
      client: 'Decathlon',
      description: 'opérationnel',
    },
    {
      title: 'mission4',
      profile: 'devOps',
      client: 'BNP Paribas',
      description: 'full stack',
    },
  ];

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'better-sqlite3',
          database: ':memory:',
          entities: [MissionEntity],
          logging: false,
          synchronize: true,
        }),
        TypeOrmModule.forFeature([MissionEntity]),
      ],
      providers: [MissionRepositoryAdapter],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();

    repository = moduleFixture.get<MissionRepositoryAdapter>(
      MissionRepositoryAdapter,
    );

    const connection = getConnection();
    entityManager = connection.createEntityManager();

    missions.forEach(
      async (mission) =>
        await entityManager.insert<MissionEntity>(MissionEntity, mission),
    );
  });

  it('Should display list of missions', async () => {
    const request = await repository.getAll();
    expect(request.length).toBeGreaterThan(0);
  });

  it('Should display a  list of missions with profile keyword search', async () => {
    const request = await repository.search(['Java']);
    expect(request.length).toBeGreaterThan(0);
  });

  it('Should display a list of missions with multiple profile keywords search', async () => {
    const request = await repository.search(['Java', 'dev']);
    expect(request).toEqual(missions);
  });

  it('Should display a list of missions with stack keyword search', async () => {
    const missions = await repository.search(['Java', 'Javascript']);
    expect(missions.length).toBeGreaterThan(0);
  });

  it('Should display a list of missions with client keyword search', async () => {
    const missions = await repository.search(['Decathlon', 'Metro']);
    expect(missions.length).toBeGreaterThan(0);
  });

  it('Should display a list of missions with client,stack,profile keyword search', async () => {
    const missions = await repository.search(['Decathlon', 'Java', 'Jenkins']);
    expect(missions.length).toBeGreaterThan(0);
  });

  it('Should display a list of missions with client,stack,profile keyword search', async () => {
    const missions = await repository.search(['devOps', 'BNP']);
    expect(missions.length).toBeGreaterThan(0);
  });
});
