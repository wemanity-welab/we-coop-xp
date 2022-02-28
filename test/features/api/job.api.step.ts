import { Given, Then, When } from '@cucumber/cucumber';
import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import * as request from 'supertest';

import { AppModule } from '../../../src/app.module';

Given('Writing a job with {string}', function (description: string) {
  // Write code here that turns the phrase above into concrete actions
  this.payload = { description: description };
});

When('I submit the job', async function () {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();

  await app.init();

  this.jobRequest = request(app.getHttpServer())
    .post('/job')
    .send(this.payload);
});

Then('I received a {string} message', function (message: string) {
  this.jobRequest.end((err, res) => {
    expect(res.text).to.equals(message);
  });
});
