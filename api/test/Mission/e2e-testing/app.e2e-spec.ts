import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MissionEntity } from '../../../src/infrastructure/Mission/mission.entity';
import { MissionModule } from '../../config/mission.module';
import { MissionDomain } from '../../../src/domain/Mission/mission.domain';
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
      title: 'WEB APP',
      client: 'BNP Paribas',
      profile: 'devOps',
      description: 'full stack',
    });
    entityManager.insert<MissionEntity>(MissionEntity, {
      title: 'WEB APP',
      client: 'BNP Paribas',
      profile: 'dev fullstack javascript',
      description: 'full stack',
    });
    entityManager.insert<MissionEntity>(MissionEntity, {
      title: 'ANDROID MOBILE APP',
      client: 'Metro',
      profile: 'dev Java',
      description: 'back-end',
    });
  });

  it('/mission (POST)', async () => {
    const job = new MissionDomain({
      title: 'author',
      client: 'address',
      profile: 'title',
      description: 'description',
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
});
