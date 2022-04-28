import { MissionService } from 'domain/mission/MissionService';
import { missionRepository } from 'infrastructure/mission/mission.repository';
import { HttpAxios } from 'infrastructure/util/httpAxios';

const repository = missionRepository(HttpAxios);
const missionServices = MissionService(repository);
export default missionServices;
