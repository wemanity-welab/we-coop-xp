import { Given, Then, When } from '@cucumber/cucumber';
import { JobDomain } from '../../../src/domain/job/JobDomain';
import { JobService } from '../../../src/domain/job/JobService';
import { expect } from 'chai';
import mockedAdapter from '../../mock/mockedAdapter';
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
  return (this.jobService = await new JobService(mockedAdapter));
});

Then(
  'The job is created and a message {string} is return',
  async function (message) {
    expect(await this.jobService.save(this.jobOffer)).to.equals(message);
  },
);

/**
 * Updating job scenario
 */
Given(
  'The employer wants to change a job offer which exist already',
  async function () {
    this.jobService = new JobService(mockedAdapter);
    this.jobOffer = await this.jobService.getJob(3);
    console.log(this.jobOffer);
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
    this.jobService = await new JobService(mockedAdapter);
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
      this.jobOffer = await this.jobService.getJob(1);
    } catch (error) {
      console.error(error);
    }
    console.log(await this.jobService.getJob(3));
  },
);

Then(
  'The job offer must be modified and {string}, {string}, {string}, {string}, {string}, {string} is return ',
  async function (<new_title>, new_address, new_description, new_salary, new_contract_type, new_author) {
    expect(await this.jobOffer.getTitle).to.equals(
      
    );
  },
);
