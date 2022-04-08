import { MissionDomain } from '../../src/domain/mission/MissionDomain';
import { MissionService } from '../../src/domain/mission/MissionService';
import AdapterMock from '../mock/mockedAdapter';

const mission = new MissionDomain({
  id: '1',
  profile: 'pouet',
  client: 'address',
  address: 'salary',
  project: 'contract_type',
  duration: 'author',
  description: 'description',
  stack: 'stack',
  teamOrganisation: 'agile',
});

describe('should test missionService class', () => {
  let missionService: MissionService;
  let adapter: any;

  beforeAll(async () => {
    adapter = new AdapterMock();
    missionService = new MissionService(adapter);
  });

  it('should return success', async () => {
    expect(await missionService.save(mission)).toEqual(mission);
  });

  it('should update an object ', async () => {
    const newMission = new MissionDomain({
      id: '1',
      profile: 'test',
      client: 'address',
      address: 'salary',
      project: 'contract_type',
      duration: 'author',
      description: 'description',
      stack: 'stack',
      teamOrganisation: 'agile',
    });
    const missionUpdated = await missionService.update('1', newMission);
    expect(missionUpdated).toEqual(newMission);
  });
});
