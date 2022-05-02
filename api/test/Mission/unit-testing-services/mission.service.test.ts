import { MissionDomain } from '../../../src/domain/Mission/MissionDomain';
import { MissionService } from '../../../src/domain/Mission/MissionService';
import AdapterMock from '../mock/mockedAdapter';

const mission = new MissionDomain({
  id: '1',
  title: 'title',
  profile: 'pouet',
  client: 'address',
  description: 'description',
  isActive: false,
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
      title: 'title',
      description: 'description',
      isActive: false,
    });
    const missionUpdated = await missionService.update('1', newMission);
    expect(missionUpdated).toEqual(newMission);
  });
});
