import { Given, Then, When } from '@cucumber/cucumber';
import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import * as request from 'supertest';

import { AppModule } from '../../../src/modules/app.module';
import { JobEntity } from '../../../src/infrastructure/job/JobEntity';

Given(
  'Writing a job offer with {string}, {string}, {string}, {string}, {string}, {string}',
  function (title, address, description, salary, contract_type, author) {
    // Write code here that turns the phrase above into concrete actions
    this.payload = {
      title,
      address,
      description,
      salary,
      contract_type,
      author,
    };
  },
);

When('I submit the job offer', async function () {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();

  await app.init();

  this.jobRequest = request(app.getHttpServer())
    .post('/jobs')
    .send(this.payload);
});

Then('I received a {string} message', function (message: string) {
  this.jobRequest.end((err, res) => {
    expect(res.text).to.equals(message);
  });
});
