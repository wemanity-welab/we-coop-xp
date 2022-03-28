import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MissionEntity } from '../src/infrastructure/job/MissionEntity';
import { MissionModule } from './mock/mission.module';
import { MissionDomain } from '../src/domain/mission/MissionDomain';
import { getConnection } from 'typeorm';

describe('AppController (e2e)', () => {
  let app: INestApplication;

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

  it('/mission (POST)', async () => {
    const job = new MissionDomain({
      profil: 'title',
      client: 'address',
      address: 'salary',
      project: 'contract_type',
      duration: 'author',
      description: 'description',
      stack: 'nodejs reactjs',
      team_organisation: 'agile',
    });
    await request(app.getHttpServer())
      .post('/missions')
      .send(job)
      .expect(HttpStatus.CREATED)
      .then((res) => {
        console.log(res.text);
      });
  });

  it('/mission (GET)', async () => {
    await request(app.getHttpServer())
      .get('/job')
      .expect(HttpStatus.NOT_FOUND)
      .then((res) => {
        console.log(res.body);
      });
    await request(app.getHttpServer())
      .get('/missions')
      .expect(HttpStatus.OK)
      .then((res) => {
        console.log(res.body);
      });
  });
  // it('/mission (PATCH)', async () => {
  //   await app
  //     .getHttpServer()
  //     .get('/missions/2')
  //     .then((res) => {
  //       const mission = res.body;
  //     });
  //   await request(app.getHttpServer())
  //     .patch(`/missions/${mission.getId}`)
  //     .send({ address: 'pouet' })
  //     .expect(HttpStatus.OK)
  //     .then((res) => {
  //       console.log(res.body);
  //     });
  // });
});
