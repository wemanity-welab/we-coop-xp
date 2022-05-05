import { After, Before, Given, Then, When } from '@cucumber/cucumber';
import { expect } from 'chai';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { getConnection } from 'typeorm';
import { CooperatorEntity } from '../../../../src/infrastructure/Cooperator/cooperator.entity';
import { CooperatorModule } from '../../../config/cooperator.module';
import { Cooperator } from '../../../utils/types/Cooperator';

let app: INestApplication;

Before(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [
      TypeOrmModule.forRoot({
        type: 'better-sqlite3',
        database: ':memory:',
        entities: [CooperatorEntity],
        synchronize: true,
        keepConnectionAlive: true,
      }),
      CooperatorModule,
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
 * Scenario: An employer wants to create a cooperator
 */
Given(
  /^An employer that want to save cooperator details as shown in the table$/,
  async function (table) {
    this.cooperator = table.rowsHash();
  },
);

When(
  /^The employer write cooperator details and submit it$/,
  async function () {
    await request(app.getHttpServer())
      .post('/cooperators')
      .send(this.cooperator)
      .expect(HttpStatus.CREATED)
      .then((res) => {
        this.result = res.body;
      });
    this.result.id = this.cooperator.id;
  },
);

Then(/^The cooperator is created as shown in the table$/, function (table) {
  this.expectedCooperator = table.rowsHash();
  expect(this.result).to.eql(this.expectedCooperator);
});

/**
 * Scenario: An employer wants to display a cooperators list
 */
Given(
  /^An employer that wants to display an existing cooperators list as followed$/,
  async function (table) {
    this.cooperators = table.hashes();

    await Promise.all(
      this.cooperators.map(async (cooperator: Cooperator) => {
        await request(app.getHttpServer())
          .post('/cooperators')
          .send(cooperator)
          .expect(HttpStatus.CREATED);
      }),
    );
  },
);

When(/^The employer display the cooperators list$/, async function () {
  await request(app.getHttpServer())
    .get('/cooperators')
    .expect(HttpStatus.OK)
    .then((res) => {
      this.result = res.body;
    });

  for (let i = 0; i < 2; i++) {
    this.result[i].id = this.cooperators[i].id;
  }
});

Then(/^All cooperators appear in the list as followed:$/, function (table) {
  this.cooperatorsExpected = table.hashes();
  expect(this.result).to.eql(this.cooperatorsExpected);
});

/**
 * Scenario: An employer wants to update cooperator data
 */
Given(
  /^An employer that want to update cooperator data, they are display as shown in the table$/,
  async function (table) {
    this.cooperator = table.rowsHash();
    await request(app.getHttpServer())
      .post('/cooperators')
      .send(this.cooperator)
      .expect(HttpStatus.CREATED)
      .then((res) => {
        this.result = res.body;
      });
  },
);

When(
  /^The employer write few attributes of the cooperator as shown and submit it$/,
  async function (table) {
    this.elementsToModify = table.rowsHash();

    await request(app.getHttpServer())
      .patch(`/cooperators/${this.result.id}`)
      .send(this.elementsToModify)
      .expect(HttpStatus.OK)
      .then((res) => {
        this.modifiedCooperator = res.body;
      });
  },
);
Then(/^The cooperator is modified as followed$/, async function (table) {
  this.expectedCooperator = table.rowsHash();
  this.modifiedCooperator.id = this.expectedCooperator.id;
  expect(this.modifiedCooperator).to.eql(this.expectedCooperator);
});

/**
 * Scenario: The employer wants to delete a cooperator
 */

Given(
  /^An employer that wants to delete an existing cooperator as followed$/,
  async function (table) {
    this.cooperator = table.rowsHash();

    await request(app.getHttpServer())
      .post('/cooperators')
      .send(this.cooperator)
      .expect(HttpStatus.CREATED)
      .then((res) => {
        this.result = res.body;
      });
  },
);

When(/^The employer delete the cooperator n°<id>$/, async function (table) {
  await request(app.getHttpServer())
    .delete(`/cooperators/${this.result.id}`)
    .expect(HttpStatus.ACCEPTED)
    .then((res) => {
      this.deletedCooperatorMessage = res.text;
    });
});

Then(/^A message is shown$/, async function (table) {
  this.table = table.rowsHash();
  this.table.message = `Cooperateur n°${this.result.id} supprimé.`;
  expect(this.deletedCooperatorMessage).to.equals(this.table.message);
});

/**
 * Scenario: The employer wants to search cooperators according to some keywords
 */

Given(
  /^An Employer who wants to search a cooperator and there are existing cooperators as followed$/,
  async function (table) {
    this.cooperators = table.hashes();

    await Promise.all(
      this.cooperators.map(async (cooperator: Cooperator) => {
        await request(app.getHttpServer())
          .post('/cooperators')
          .send(cooperator)
          .expect(HttpStatus.CREATED);
      }),
    );
  },
);

When(/^The employer search cooperators with keywords$/, async function (table) {
  this.table = table.hashes();
  this.keywords = this.table[0].keywords.split(/[\s,]+/);
  await request(app.getHttpServer())
    .get(
      `/cooperators/search?criteria=${this.keywords[1]}&criteria=${this.keywords[2]}&criteria=${this.keywords[0]}`,
    )
    .expect(HttpStatus.OK)
    .then((res) => {
      this.result = res.body;
    });
});

Then(/^Cooperators list appear as followed:$/, async function (table) {
  this.expectedCooperators = table.hashes();
  for (let i = 0; i < this.expectedCooperators.length; i++) {
    this.result[i].id = this.expectedCooperators[i].id;
  }
  expect(this.result).to.eql(this.expectedCooperators);
});
