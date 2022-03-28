import { MissionDomain } from '../../src/domain/mission/MissionDomain';
import { MissionService } from '../../src/domain/mission/MissionService';
import AdapterMock from '../mock/mockedAdapter';

const mission = new MissionDomain({
  id: '1',
  profil: 'pouet',
  client: 'address',
  address: 'salary',
  project: 'contract_type',
  duration: 'author',
  description: 'description',
  stack: 'stack',
  team_organisation: 'agile',
});

describe('should test missionService class', () => {
  let missionService: MissionService;
  let adapter: any;

  beforeAll(async () => {
    adapter = new AdapterMock();
    missionService = new MissionService(adapter);
  });

  it('should return success', async () => {
    expect(await missionService.save(mission)).toBe('Success');
  });

  it('should update an object ', async () => {
    const newMission = new MissionDomain({
      id: '1',
      profil: 'test',
      client: 'address',
      address: 'salary',
      project: 'contract_type',
      duration: 'author',
      description: 'description',
      stack: 'stack',
      team_organisation: 'agile',
    });
    const missionUpdated = await missionService.update('1', newMission);
    expect(missionUpdated).toEqual(newMission);
  });
});
