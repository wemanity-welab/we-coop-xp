import { MissionDomain } from '../../src/domain/mission/MissionDomain';
import { faker } from '@faker-js/faker';

// faker.locale = 'fr';
faker.seed(123456789);

const mockedMissions: MissionDomain[] = [];

// for (let i = 1; i < 5; i++) {
mockedMissions.push(
  new MissionDomain({
    id: faker.datatype.uuid(),
    profil: faker.name.jobTitle(),
    client: faker.name.jobArea(),
    address: faker.finance.amount(),
    project: faker.name.jobType(),
    duration: faker.name.firstName(),
    description: faker.name.jobDescriptor(),
    stack: faker.name.jobDescriptor(),
    team_organisation: faker.name.jobDescriptor(),
  }),
);
// }

export default mockedMissions;
