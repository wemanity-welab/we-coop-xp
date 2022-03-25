import { MissionDomain } from '../../src/domain/mission/MissionDomain';
import { faker } from '@faker-js/faker';

// faker.locale = 'fr';
faker.seed(123456789);

const mockedMissions: MissionDomain[] = [];

for (let i = 1; i < 5; i++) {
  mockedMissions.push(
    new MissionDomain({
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

export default mockedMissions;
