import { Given, Then, When } from '@cucumber/cucumber';
import { JobDomain } from '../../../src/domain/job/JobDomain';
import { JobService } from '../../../src/domain/job/JobService';
import { expect } from 'chai';
import Mock from '../../mock/mockedAdapter';
import mockedJobs from '../../mock/mockedJobs';

/**
 * Creating job offer scenario
 */
Given(
  'Writing a job offer with {int}, {string}, {string}, {string}, {string}, {string}, {string}',
  function (id, title, address, description, salary, contract_type, author) {
    this.jobOffer = new JobDomain({
      id,
      title,
      address,
      description,
      salary,
      contract_type,
      author,
    });
  },
);

When('The job offer has been created', async function () {
  return (this.jobService = await new JobService(new Mock()));
});

Then(
  'The job is created and a message {string} is return',
  async function (message) {
    expect(await this.jobService.save(this.jobOffer)).to.equals(message);
  },
);

/**
 * Updating job entirely scenario
 */
Given(
  'The employer wants to change a job offer which exist already',
  async function () {
    this.jobService = new JobService(new Mock());
    mockedJobs.forEach((job) => this.jobService.save(job));
    this.jobOffer = await this.jobService.getJob(3);
  },
);

When(
  'The employer update the job offer {string}, {string}, {string}, {string}, {string}, {string}',
  async function (
    new_title,
    new_address,
    new_description,
    new_salary,
    new_contract_type,
    new_author,
  ) {
    try {
      await this.jobService.update(
        this.jobOffer.getId,
        new JobDomain({
          ...this.jobOffer,
          title: new_title,
          address: new_address,
          description: new_description,
          salary: new_salary,
          contract_type: new_contract_type,
          author: new_author,
        }),
      );
    } catch (error) {
      console.error(error);
    }
  },
);

Then(
  'The job offer must be modified {string}, {string}, {string}, {string}, {string}, {string} is return',
  async function (title, address, description, salary, contract_type, author) {
    this.newJob = await this.jobService.getJob(3);
    this.job = {
      title,
      address,
      description,
      salary,
      contract_type,
      author,
    };
    expect(this.job.title).to.equals(this.newJob.title);
    expect(this.job.address).to.equals(this.newJob.address);
    expect(this.job.description).to.equals(this.newJob.description);
    expect(this.job.salary).to.equals(this.newJob.salary);
    expect(this.job.contract_type).to.equals(this.newJob.contract_type);
    expect(this.job.author).to.equals(this.newJob.author);
  },
);

/**
 * Updating job partially scenario
 */
Given(
  'The employer wants to change a job offer which exist',
  async function () {
    this.jobService = new JobService(new Mock());
    mockedJobs.forEach((job) => this.jobService.save(job));
    this.jobOffer = await this.jobService.getJob(3);
  },
);
When(
  'The employer update the job offer {string}, {string}',
  async function (new_title, new_address) {
    try {
      await this.jobService.update(
        this.jobOffer.getId,
        new JobDomain({
          ...this.jobOffer,
          title: new_title,
          address: new_address,
        }),
      );
    } catch (error) {
      console.error(error);
    }
  },
);
Then(
  'The job offer must be modified {string}, {string} is return',
  async function (new_title, new_address) {
    this.newJob = await this.jobService.getJob(3);

    expect(await this.newJob.title).to.equals(new_title);
    expect(await this.newJob.address).to.equals(new_address);
  },
);

/**
 * Deleting job scenario
 */
Given(
  'The employer wants to delete a job offer which exist with an id {int}',
  async function (id) {
    this.id = id;
    this.jobService = new JobService(new Mock());
    mockedJobs.forEach((job) => this.jobService.save(job));
    this.jobOffer = await this.jobService.getJob(id);
  },
);
When('The employer delete the job offer', async function () {
  this.response = await this.jobService.remove(this.jobOffer.getId);
});
Then('The job offer must not appear in the list', async function () {
  expect(await this.jobService.getJob(this.id)).to.equals(undefined);
  expect(this.response).to.equals('DATA REMOVED');
});

/**
 * Reading jobs
 */
Given(
  'The employer want to read a job offer wich exist with an id {int}',
  async function (id) {
    this.id = id;
    this.jobService = new JobService(new Mock());
    mockedJobs.forEach((job) => this.jobService.save(job));
    this.jobOffer = await this.jobService.getJob(id);
  },
);
When('The employer find the job offer', async function () {
  this.response = await this.jobService.getJob(this.jobOffer.getId);
});
Then('The job offer must appear', async function () {
  expect(await this.jobService.getJob(this.id)).to.equals(this.jobOffer);
});
