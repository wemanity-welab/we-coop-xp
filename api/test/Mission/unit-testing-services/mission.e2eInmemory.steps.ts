import { Given, Then, When, Before, After } from '@cucumber/cucumber';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { expect } from 'chai';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MissionModule } from '../../config/mission.module';
import { MissionEntity } from '../../../src/infrastructure/Mission/mission.entity';
import { Mission } from '../../utils/types/Mission';
import { getConnection } from 'typeorm';

let app: INestApplication;

Before(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [
      TypeOrmModule.forRoot({
        type: 'better-sqlite3',
        database: ':memory:',
        entities: [MissionEntity],
        synchronize: true,
        keepConnectionAlive: true,
      }),
      MissionModule,
    ],
  }).compile();

  app = moduleFixture.createNestApplication();
  await app.init();
});

After(async () => {
  const entities = getConnection().entityMetadatas;

  for (const entity of entities) {
    const repository = getConnection().getRepository(entity.name); // Get repository
    await repository.clear(); // Clear each entity table's content
  }
});

/**
 * Scenario: A user wants to post a mission
 */
Given(
  /^A user mission with details as shown in the table$/,
  async function (table) {
    this.mission = table.rowsHash();
  },
);

When(/^The user posts the mission$/, async function () {
  await request(app.getHttpServer())
    .post('/missions')
    .send(this.mission)
    .expect(HttpStatus.CREATED)
    .then((res) => {
      this.result = res.body;
    });
  this.result.id = this.mission.id;
  delete this.result.isActive;
});

Then(/^The mission is created as shown in the table$/, function (table) {
  this.expectedMission = table.rowsHash();
  expect(this.result).to.eql(this.expectedMission);
});

/**
 * Scenario: The employer wants to list all current missions
 */

Given(
  /^An employer are existing missions as followed$/,
  async function (table) {
    this.missions = table.hashes();

    await Promise.all(
      this.missions.map(async (mission: Mission) => {
        await request(app.getHttpServer())
          .post('/missions')
          .send(mission)
          .expect(HttpStatus.CREATED);
      }),
    );
  },
);

When(/^The employer list all missions$/, async function () {
  await request(app.getHttpServer())
    .get('/missions')
    .expect(HttpStatus.OK)
    .then((res) => {
      this.result = res.body;
    });

  for (let i = 0; i < 2; i++) {
    this.result[i].id = this.missions[i].id;
    delete this.result[i].isActive;
  }
});

Then(/^All missions appear in the list as followed:$/, function (table) {
  this.missionsExpected = table.hashes();
  expect(this.result).to.eql(this.missionsExpected);
});

/**
 * Scenario: A client wants to update a posted mission
 */

Given(/^An existing mission with details as followed$/, async function (table) {
  this.mission = table.rowsHash();
  await request(app.getHttpServer())
    .post('/missions')
    .send(this.mission)
    .expect(HttpStatus.CREATED)
    .then((res) => {
      this.result = res.body;
    });
});

When(
  /^The user updates a few attributes of the mission as shown$/,
  async function (table) {
    this.elementsToModify = table.rowsHash();

    await request(app.getHttpServer())
      .patch(`/missions/${this.result.id}`)
      .send(this.elementsToModify)
      .expect(HttpStatus.OK)
      .then((res) => {
        this.modifiedMission = res.body;
      });

    delete this.modifiedMission.isActive;
  },
);
Then(/^The mission is modified as followed$/, async function (table) {
  this.expectedMission = table.rowsHash();
  this.modifiedMission.id = this.expectedMission.id;
  expect(this.modifiedMission).to.eql(this.expectedMission);
});

/**
 * Scenario: A client wants to delete a posted mission
 */

Given(/^an existing mission with details as followed$/, async function (table) {
  this.mission = table.rowsHash();

  await request(app.getHttpServer())
    .post('/missions')
    .send(this.mission)
    .expect(HttpStatus.CREATED)
    .then((res) => {
      this.result = res.body;
    });
});

When(/^The user delete the mission with n°<id>$/, async function (table) {
  await request(app.getHttpServer())
    .delete(`/missions/${this.result.id}`)
    .expect(HttpStatus.ACCEPTED)
    .then((res) => {
      this.deletedMissionMessage = res.text;
    });
});

Then(/^A message <message> is shown$/, async function (table) {
  this.table = table.rowsHash();
  this.table.message = `Mission n°${this.result.id} supprimée.`;
  expect(this.deletedMissionMessage).to.equals(this.table.message);
});

/**
 * Scenario: A client wants to search a posted mission by keywords
 */

Given(
  /^An Employer who wants to search a mission and there are existing missions as followed$/,
  async function (table) {
    this.missions = table.hashes();

    await Promise.all(
      this.missions.map(async (mission: Mission) => {
        await request(app.getHttpServer())
          .post('/missions')
          .send(mission)
          .expect(HttpStatus.CREATED);
      }),
    );
  },
);

When(/^The employer search missions with keywords$/, async function (table) {
  this.table = table.hashes();
  this.keywords = this.table[0].keywords.split(/[\s,]+/);
  await request(app.getHttpServer())
    .get(
      `/missions/search?criteria=${this.keywords[2]}&criteria=${this.keywords[0]}&criteria=${this.keywords[1]}`,
    )
    .expect(HttpStatus.OK)
    .then((res) => {
      this.result = res.body;
    });
});

Then(/^Missions list appear as followed:$/, async function (table) {
  this.table = table.hashes();
  for (let i = 0; i < this.table.length; i++) {
    this.result[i].id = this.table[i].id;
    delete this.result[i].isActive;
  }
  expect(this.result).to.eql(this.table);
});
