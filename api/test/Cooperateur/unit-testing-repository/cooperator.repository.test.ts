import { INestApplication, Injectable } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { EntityManager, getConnection, Like, Repository } from 'typeorm';
import { CooperatorDomain } from '../../../src/domain/Cooperator/CooperatorDomain';
import { ICooperatorRepository } from '../../../src/domain/Cooperator/ICooperatorRepository';
import { IMissionRepository } from '../../../src/domain/Mission/IMissionRepository';
import { MissionDomain } from '../../../src/domain/Mission/MissionDomain';
import { CooperatorEntity } from '../../../src/infrastructure/Cooperator/CooperatorEntity';
import { MissionEntity } from '../../../src/infrastructure/Mission/MissionEntity';
import Utils from '../../../src/utils/Utils';

@Injectable()
class CooperatorRepositoryAdapter implements ICooperatorRepository {
  constructor(
    @InjectRepository(MissionEntity)
    private readonly missionEntityRepository: Repository<MissionEntity>,
  ) {}
  save(cooperator: CooperatorDomain): Promise<CooperatorDomain> {
    throw new Error('Method not implemented.');
  }
  getAll(): Promise<CooperatorDomain[]> {
    throw new Error('Method not implemented.');
  }
  remove(id: string): Promise<string> {
    throw new Error('Method not implemented.');
  }
  update(
    id: string,
    cooperator: Partial<CooperatorDomain>,
  ): Promise<CooperatorDomain> {
    throw new Error('Method not implemented.');
  }
  getOne(id: string): Promise<CooperatorDomain> {
    throw new Error('Method not implemented.');
  }

  // async search(keywords: string[]): Promise<MissionDomain[]> {
  //   const request = await this.searchByElement(keywords);

  //   const missions: MissionEntity[] = Utils.removeDuplicateObject(request);

  //   return missions.map((mission) => new MissionDomain(mission));
  // }

  // async searchByElement(array: Array<any>) {
  //   const elements: any[] = [];
  //   await Promise.all(
  //     array.map(async (element) => {
  //       const request: Array<string | number | object> =
  //         await this.missionEntityRepository.find({
  //           where: [
  //             { profile: Like(`%${element}%`) },
  //             { description: Like(`%${element}%`) },
  //             { client: Like(`%${element}%`) },
  //           ],
  //         });
  //       request.forEach((req) => elements.push(req));
  //     }),
  //   );

  //   return elements;
  // }
}

describe('Testing Search Method', () => {
  let app: INestApplication;
  let entityManager: EntityManager;
  let repository: CooperatorRepositoryAdapter;
  const cooperator = [
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
          entities: [CooperatorEntity],
          logging: false,
          synchronize: true,
        }),
        TypeOrmModule.forFeature([CooperatorEntity]),
      ],
      providers: [CooperatorRepositoryAdapter],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();

    repository = moduleFixture.get<CooperatorRepositoryAdapter>(
      CooperatorRepositoryAdapter,
    );

    const connection = getConnection();
    entityManager = connection.createEntityManager();

    cooperator.forEach(
      async (cooperator) =>
        await entityManager.insert<CooperatorEntity>(
          CooperatorEntity,
          cooperator,
        ),
    );
  });
});
