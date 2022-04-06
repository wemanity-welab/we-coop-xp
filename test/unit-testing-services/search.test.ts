import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { EntityManager, getConnection, Like, Repository } from 'typeorm';
import { MissionEntity } from '../../src/infrastructure/job/MissionEntity';
import { MockType, repositoryMockFactory } from '../mock/typeormMockMethods';

describe('Testing Search Method', () => {
  let app: INestApplication;
  let entityManager: EntityManager;
  let repositoryMock: MockType<Repository<MissionEntity>>;
  const missions = [
    {
      profil: 'dev fullstack javascript',
      client: 'BNP Paribas',
      address: '10 rue de Paris 75000 Paris',
      project: 'WEB APP',
      description: 'full stack',
      duration: '6 mois',
      stack: 'React, Nodejs, Mongodb',
      team_organisation: 'test',
    },
    {
      profil: 'dev Java',
      client: 'Metro',
      address: '11 rue de Paris 75001 Paris',
      project: 'ANDROID MOBILE APP',
      description: 'back-end',
      duration: '12 mois',
      stack: 'Java, Postgresql, spring',
      team_organisation: 'test',
    },
    {
      profil: 'devOps',
      client: 'Decathlon',
      address: '12 rue de Paris 75002 Paris',
      project: 'CI',
      description: 'opérationnel',
      duration: '24 mois',
      stack: 'Jenkins, Dockers, SonarQube',
      team_organisation: 'test',
    },
    {
      profil: 'devOps',
      client: 'BNP Paribas',
      address: '10 rue de Paris 75000 Paris',
      project: 'WEB APP',
      description: 'full stack',
      duration: '6 mois',
      stack: 'React, Nodejs, Mongodb',
      team_organisation: 'test',
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
      providers: [
        {
          provide: getRepositoryToken(MissionEntity),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();

    repositoryMock = moduleFixture.get(getRepositoryToken(MissionEntity));

    const connection = getConnection();
    entityManager = connection.createEntityManager();

    missions.forEach(
      async (mission) =>
        await entityManager.insert<MissionEntity>(MissionEntity, mission),
    );
  });

  it('Should display list of missions', async () => {
    const test = {
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
    const request = await repositoryMock.save(test);
    console.log(request);
    // expect(request.length).toBeGreaterThan(0);
  });

  it('Should display list of missions', async () => {
    const request = await repositoryMock.findOne('1');
    console.log(`FIND: `, request);
    // expect(request.length).toBeGreaterThan(0);
  });

  it('Should display list of missions', async () => {
    const test = {
      profil: 'DEVOPS',
      client: 'MONOPRIX',
      address: '10 rue de Paris 75000 Paris',
      project: 'IDK',
      description: 'IDK',
      duration: '6 mois',
      stack: 'IDK',
      team_organisation: 'test',
    };
    const mission = await repositoryMock.findOne('1');

    const response = await repositoryMock.save({ ...mission, ...test });
    console.log(`MISSION UPDATED: `, response);
    // expect(request.length).toBeGreaterThan(0);
  });

  it('Should display list of missions', async () => {
    const searchByElement = async (array: Array<any>) => {
      const elements: any[] = [];
      await Promise.all(
        array.map(async (element) => {
          const request: Array<string | number | object> =
            await repositoryMock.find({
              where: [
                { profil: Like(`%${element}%`) },
                { stack: Like(`%${element}%`) },
                { client: Like(`%${element}%`) },
              ],
            });
          request.forEach((req) => elements.push(req));
        }),
      );

      return elements;
    };

    const response = await searchByElement(['Java']);
    console.log(`SEARCH: `, response);
    // expect(request.length).toBeGreaterThan(0);
  });
});
