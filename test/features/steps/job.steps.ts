import { Given, Then, When } from '@cucumber/cucumber';
import { JobDomain } from '../../../src/domain/job/JobDomain';
import { JobService } from '../../../src/domain/job/JobService';
import { expect } from 'chai';
import mockedAdapter from '../../mock/mockedAdapter';
import mockedJobs from '../../mock/mockedJobs';

let jobService;
let jobOffer;

Given('Employer has an offer', async function () {
  jobOffer = await new JobDomain({
    id: 5,
    title: 'dev',
    address: 'paris',
    description: 'full stack',
    salary: '5000',
    contract_type: 'cdd',
    author: 'wema',
  });
});

When('The job offer has been created', function () {
  jobService = new JobService(mockedAdapter);
  // await mockedJobs.push(jobOffer);
});

Then('The job is created', async () => {
  expect(await jobService.save(jobOffer)).to.equals(
    'Job offer created successfully',
  );
  console.log(await jobService.getJob(jobOffer.id));
});
