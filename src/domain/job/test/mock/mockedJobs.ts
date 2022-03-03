import { JobDomain } from '../../job.domain';
import { faker } from '@faker-js/faker';

faker.locale = 'fr';
faker.seed(123456789);

const mockedJobs = [];

for (let i = 0; i < 5; i++) {
  mockedJobs.push(
    new JobDomain({
      id: i,
      title: faker.name.jobTitle(),
      address: faker.name.jobArea(),
      salary: faker.finance.amount(),
      contract_type: faker.name.jobType(),
      author: faker.name.firstName(),
      description: faker.name.jobDescriptor(),
    }),
  );
}

export default mockedJobs;
