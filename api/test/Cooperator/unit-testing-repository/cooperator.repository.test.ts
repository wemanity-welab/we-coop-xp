import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityManager, getConnection } from 'typeorm';
import { CooperatorDomain } from '../../../src/domain/Cooperator/cooperator.domain';
import { CooperatorEntity } from '../../../src/infrastructure/Cooperator/cooperator.entity';
import { CooperatorRepositoryAdapter } from '../../../src/infrastructure/Cooperator/cooperator.repository.adapter';
import { cooperators } from '../mock/mockedCooperators';

describe('Testing Cooperator respository', () => {
  let app: INestApplication;
  let entityManager: EntityManager;
  let repository: CooperatorRepositoryAdapter;

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

    cooperators.forEach(
      async (cooperator) =>
        await entityManager.insert<CooperatorEntity>(
          CooperatorEntity,
          cooperator,
        ),
    );
  });

  it('Should create a cooperator', async () => {
    const cooperator = {
      firstName: 'Mickaël',
      lastName: 'Zonton',
      phoneNumber: '157-232-6965',
      email: 'mzonton@pen.io',
      practice: 'Tech',
      m3: 'Estève',
      mentor: 'Lóng',
    };
    const response = await repository.save(new CooperatorDomain(cooperator));
    expect(response instanceof CooperatorDomain).toBe(true);
  });

  it('Should get a cooperators list', async () => {
    const response = await repository.getAll();
    expect(response[0] instanceof CooperatorDomain).toBe(true);
  });

  it('Should delete a cooperators', async () => {
    const response = await repository.getAll();
    const id = response[0].getId;

    const deleted = await repository.remove(id);
    expect(deleted).toBe(`Cooperateur n°${id} supprimé.`);
  });

  it('Should update a cooperators', async () => {
    const response = await repository.getAll();
    const id = response[4].getId;

    const newData = {
      phoneNumber: '0000000000',
      email: 'mickzonton@gogole.io',
    } as Partial<CooperatorDomain>;

    const expectedCooperator = {
      id: id,
      firstName: 'Mickaël',
      lastName: 'Zonton',
      phoneNumber: '0000000000',
      email: 'mickzonton@gogole.io',
      practice: 'Tech',
      m3: 'Estève',
      mentor: 'Lóng',
    };

    const updated = await repository.update(id, newData);
    expect(updated).toMatchObject(expectedCooperator);
  });

  it('Should find a cooperators', async () => {
    const response = await repository.getAll();
    const id = response[4].getId;

    const expectedCooperator = {
      id: id,
      firstName: 'Mickaël',
      lastName: 'Zonton',
      phoneNumber: '0000000000',
      email: 'mickzonton@gogole.io',
      practice: 'Tech',
      m3: 'Estève',
      mentor: 'Lóng',
    };

    const cooperator = await repository.getOne(id);
    expect(cooperator).toMatchObject(expectedCooperator);
  });

  it('Should display a  list of missions with profile keyword search', async () => {
    const request = await repository.search(['sprayer1@google.cn']);
    expect(request.length).toBeGreaterThan(0);
  });

  it('Should display a list of missions with multiple profile keywords search', async () => {
    const request = await repository.search(['Tech']);
    const expectedCooperators = [
      {
        id: '0',
        firstName: 'Stearn',
        lastName: 'Prayer',
        phoneNumber: '362-471-0429',
        email: 'sprayer1@google.cn',
        practice: 'Tech',
        m3: 'Eléa',
        mentor: 'Noémie',
        disponible: false,
      },
      {
        id: '0',
        firstName: 'Mickaël',
        lastName: 'Zonton',
        phoneNumber: '0000000000',
        email: 'mickzonton@gogole.io',
        practice: 'Tech',
        m3: 'Estève',
        mentor: 'Lóng',
        disponible: false,
      },
    ];

    request.forEach((cooperator) => (cooperator.setId = '0'));

    expect(request[0]).toMatchObject(expectedCooperators[0]);
    expect(request[1]).toMatchObject(expectedCooperators[1]);
  });
});
