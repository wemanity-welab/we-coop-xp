import { MissionDomain } from '../../src/domain/mission/MissionDomain';
import { faker } from '@faker-js/faker';

// faker.locale = 'fr';
faker.seed(123456789);

const missions = [
  {
    profil: 'dev fullstack javascript',
    client: 'BNP Paribas',
    address: '10 rue de Paris 75000 Paris',
    project: 'WEB APP',
    description: 'full stack',
    duration: '6 mois',
    stack: 'React, Nodejs, Mongodb',
    team_organisation: 'test',
  },
  {
    profil: 'dev Java',
    client: 'Metro',
    address: '11 rue de Paris 75001 Paris',
    project: 'ANDROID MOBILE APP',
    description: 'back-end',
    duration: '12 mois',
    stack: 'Java, Postgresql, spring',
    team_organisation: 'test',
  },
  {
    profil: 'devOps',
    client: 'Decathlon',
    address: '12 rue de Paris 75002 Paris',
    project: 'CI',
    description: 'opérationnel',
    duration: '24 mois',
    stack: 'Jenkins, Dockers, SonarQube',
    team_organisation: 'test',
  },
  {
    profil: 'devOps',
    client: 'BNP Paribas',
    address: '10 rue de Paris 75000 Paris',
    project: 'WEB APP',
    description: 'full stack',
    duration: '6 mois',
    stack: 'React, Nodejs, Mongodb',
    team_organisation: 'test',
  },
];

const mockedMissions: MissionDomain[] = missions.map(
  (mission) => new MissionDomain(mission),
);

export default mockedMissions;
