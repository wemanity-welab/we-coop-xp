import { Given, Then, When } from '@cucumber/cucumber';
import { JobDomain } from '../../../src/domain/job/job.domain';
import { JobService } from '../../../src/domain/job/job.service';
import { JobAdapter } from '../../../src/infrastructure/job/job.repository.adapter';
import { expect } from 'chai';
import { JobEntity } from '../../../src/infrastructure/job/job.entity';

Given(
  'Creating a job offer with {string}, {string}, {string}, {string}, {string}, {string}',
  function (title, address, description, salary, contract_type, author) {
    // Write code here that turns the phrase above into concrete actions
    return (this.jobModel = new JobDomain({
      title,
      address,
      description,
      salary,
      contract_type,
      author,
    }));
  },
);

When('I save the job offer', function () {
  const jobAdapter = new JobAdapter(undefined);

  jobAdapter.save = (): string => {
    return 'Success';
  };

  jobAdapter.getAll = (): Promise<JobEntity[]> => {
    throw new Error('Function not implemented.');
  };

  this.jobService = new JobService(jobAdapter);
});

Then('I received a {string} created', function (message: string) {
  console.log(`!!MESSAGE :`, typeof message);
  expect(this.jobService.create(this.jobModel)).to.equals(message);
});
