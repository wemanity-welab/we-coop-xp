import { MissionDomain } from '../../../src/domain/Mission/MissionDomain';
import { faker } from '@faker-js/faker';

// faker.locale = 'fr';
faker.seed(123456789);

const missions = [
  {
    title: 'dev fullstack javascript',
    profile: 'dev fullstack javascript',
    client: 'BNP Paribas',
    description: 'full stack',
    duration: '6 mois',
    isActive: false,
  },
  {
    title: 'dev Java',
    profile: 'dev Java',
    client: 'Metro',
    description: 'back-end',
    duration: '12 mois',
    isActive: false,
  },
  {
    title: 'devOps',
    profile: 'devOps',
    client: 'Decathlon',
    description: 'opérationnel',
    duration: '24 mois',
    isActive: false,
  },
  {
    title: 'devOps',
    profile: 'devOps',
    client: 'BNP Paribas',
    description: 'full stack',
    duration: '6 mois',
    isActive: false,
  },
];

const mockedMissions: MissionDomain[] = missions.map(
  (mission) => new MissionDomain(mission),
);

export default mockedMissions;
