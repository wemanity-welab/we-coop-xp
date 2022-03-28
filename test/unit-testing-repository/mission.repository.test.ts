import { INestApplication, Injectable } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { EntityManager, getConnection, Like, Repository } from 'typeorm';
import { IMissionRepository } from '../../src/domain/mission/IMissionRepository';
import { MissionDomain } from '../../src/domain/mission/MissionDomain';
import { MissionEntity } from '../../src/infrastructure/job/MissionEntity';

@Injectable()
class MissionRepositoryAdapter implements IMissionRepository {
  constructor(
    @InjectRepository(MissionEntity)
    private readonly missionEntityRepository: Repository<MissionEntity>,
  ) {}

  save(mission: MissionDomain): Promise<string> {
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
    const missions: MissionEntity[] = await this.missionEntityRepository.find({
      profil: Like(`%${keywords}%`),
    });
    return missions.map((mission) => new MissionDomain(mission));
  }
}

describe('Testing Search Method', () => {
  let app: INestApplication;
  let entityManager: EntityManager;
  let repository: MissionRepositoryAdapter;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'better-sqlite3',
          database: ':memory:',
          entities: [MissionEntity],
          logging: true,
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

    await entityManager.insert<MissionEntity>(MissionEntity, {
      profil: 'dev fullstack javascript',
      client: 'BNP Paribas',
      address: '10 rue de Paris 75000 Paris',
      project: 'WEB APP',
      description: 'full stack',
      duration: '6 mois',
      stack: 'React, Nodejs, Mongodb',
      team_organisation: 'test',
    });

    await entityManager.insert<MissionEntity>(MissionEntity, {
      profil: 'dev Java',
      client: 'Metro',
      address: '11 rue de Paris 75001 Paris',
      project: 'ANDROID MOBILE APP',
      description: 'back-end',
      duration: '12 mois',
      stack: 'Java, Postgresql, spring',
      team_organisation: 'test',
    });

    await entityManager.insert<MissionEntity>(MissionEntity, {
      profil: 'devOps',
      client: 'Decathlon',
      address: '12 rue de Paris 75002 Paris',
      project: 'cdd',
      description: 'opérationnel',
      duration: '24 mois',
      stack: 'Jenkins, Dockers, SonarQube',
      team_organisation: 'test',
    });
  });

  it('Should display list of missions', async () => {
    const missions = await repository.getAll();
    expect(missions.length).toBeGreaterThan(0);
  });

  it('Should display a list of missions by keywords search', async () => {
    const missions = await repository.search(['Java']);
    console.log(missions);
    expect(missions.length).toBeGreaterThan(0);
  });
});
