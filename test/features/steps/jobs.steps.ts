import { Given, Then, When } from '@cucumber/cucumber';
import { JobsModel } from '../../../src/domain/models/jobs.model';
import { JobsService } from '../../../src/domain/services/jobs.service';
import { JobsAdapter } from '../../../src/infrastructure/jobs.repository.adapter';
import { expect } from 'chai';
import { JobsEntity } from '../../../src/domain/entities/jobs.entities';

Given(
  'creating a job offer with {string}, {string}, {string}, {string}, {string}, {string}, {string}, {string}',
  function (
    title,
    address,
    description,
    salary,
    contract_type,
    author,
    created_at,
    updated_at,
  ) {
    // Write code here that turns the phrase above into concrete actions
    this.jobModel = new JobsModel({
      title,
      address,
      description,
      salary,
      contract_type,
      author,
      created_at: new Date(created_at),
      updated_at: new Date(updated_at),
    });
  },
);

When('I save the job offer', function () {
  const jobAdapter = new JobsAdapter(undefined);

  jobAdapter.save = () => {
    return 'Success';
  };

  jobAdapter.getAll = (): Promise<JobsEntity[]> => {
    throw new Error('Function not implemented.');
  };

  this.jobService = new JobsService(jobAdapter);
});

Then('I received a {string} message', function (message: string) {
  expect(this.jobService.create(this.jobModel)).to.equals(message);
});
