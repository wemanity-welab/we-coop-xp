import { Given, Then, When } from '@cucumber/cucumber';
import { JobModel } from '../../../src/domain/models/job.model';
import { JobService } from '../../../src/domain/services/job.service';
import { JobAdapter } from '../../../src/infrastructure/job.repository.adapter';
import { expect } from 'chai';
import { JobEntity } from '../../../src/domain/entities/job.entities';

Given(
  'Creating a job offer with {string}, {string}, {string}, {string}, {string}, {string}',
  function (title, address, description, salary, contract_type, author) {
    // Write code here that turns the phrase above into concrete actions
    return this.jobModel = new JobModel({
      title,
      address,
      description,
      salary,
      contract_type,
      author
    });
  },
);

When('I save the job offer', function () {
  const jobAdapter = new JobAdapter(undefined);

  jobAdapter.save = () => {
    return 'Success';
  };

  jobAdapter.getAll = (): Promise<JobEntity[]> => {
    throw new Error('Function not implemented.');
  };

  this.jobService = new JobService(jobAdapter);
});

Then('I received a {string} created', function (message: string) {
  expect(this.jobService.create(this.jobModel)).to.equals(message);
});
