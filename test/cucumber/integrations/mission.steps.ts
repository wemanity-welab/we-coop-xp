import { Given, Then, When, Before } from '@cucumber/cucumber';
import HttpStream from '@cucumber/cucumber/lib/formatter/http_stream';
import { expect } from 'chai';
import mockedMissions from '../../mock/mockedMissions';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { AppModule } from '../../../src/modules/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MissionModule } from '../../../src/modules/mission.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../../../src/config/configuration';

Before(async () => {
  let app: INestApplication;

  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [
      ConfigModule.forRoot({
        isGlobal: true,
        load: [configuration],
      }),
      TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: configuration,
      }),
      MissionModule,
    ],
  }).compile();

  app = moduleFixture.createNestApplication();
  await app.init();
});

/**
 * Post scenario
 */

Given(
  'A mission {int}, {string}, {string}, {string}, {string}, {string}, {string}',
  function (id, title, address, description, salary, contract_type, author) {
    this.mission = {
      id,
      title,
      address,
      description,
      salary,
      contract_type,
      author,
    };
    console.log('check argument :', this.mission);
  },
);

// When('', function () {});

// Then('', function () {});
