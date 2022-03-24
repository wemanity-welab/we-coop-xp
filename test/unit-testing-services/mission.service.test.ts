import { MissionDomain } from '../../src/domain/mission/MissionDomain';
import { MissionService } from '../../src/domain/mission/MissionService';
import Mock from '../mock/mockedAdapter';

const mission = new MissionDomain({
  id: 1,
  title: 'pouet',
  address: 'address',
  salary: 'salary',
  contract_type: 'contract_type',
  author: 'author',
  description: 'description',
});

describe('should test missionService class', () => {
  let missionService: MissionService;
  let adapter: any;

  beforeAll(async () => {
    adapter = new Mock();
    missionService = new MissionService(adapter);
  });

  it('should return success', async () => {
    expect(await missionService.save(mission)).toBe('Success');
  });

  it('should update an object ', async () => {
    const newMission = new MissionDomain({
      id: 1,
      title: 'test',
      address: 'address',
      salary: 'salary',
      contract_type: 'contract_type',
      author: 'author',
      description: 'description',
    });
    const missionUpdated = await missionService.update(1, newMission);
    expect(missionUpdated).toEqual(newMission);
  });
});
