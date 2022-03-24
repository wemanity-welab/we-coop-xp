import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MissionEntity } from './mock/missionEntityMock';
import { MissionModule } from './mock/mission.module';
import { MissionDomain } from '../src/domain/mission/MissionDomain';
import { getConnection } from 'typeorm';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'better-sqlite3',
          database: ':memory:',
          entities: [MissionEntity],
          logging: true,
          synchronize: true,
        }),
        MissionModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const connection = await getConnection();
    const entityManager = connection.createEntityManager();

    entityManager.insert<MissionEntity>(MissionEntity, {
      title: 'comptable',
      address: 'address',
      salary: 'salary',
      contract_type: 'contract_type',
      author: 'author',
      description: 'description',
    });
    entityManager.insert<MissionEntity>(MissionEntity, {
      title: 'dev',
      address: 'address',
      salary: 'salary',
      contract_type: 'contract_type',
      author: 'author',
      description: 'description',
    });
    entityManager.insert<MissionEntity>(MissionEntity, {
      title: 'CTO',
      address: 'address',
      salary: 'salary',
      contract_type: 'contract_type',
      author: 'author',
      description: 'description',
    });
  });

  it('/mission (GET)', () => {
    const job = new MissionDomain({
      title: 'title',
      address: 'address',
      salary: 'salary',
      contract_type: 'contract_type',
      author: 'author',
      description: 'description',
    });
    request(app.getHttpServer())
      .post('/jobs')
      .send(job)
      .expect(HttpStatus.FAILED_DEPENDENCY);
    request(app.getHttpServer()).get('/jobs').expect(HttpStatus.OK);
  });
});
