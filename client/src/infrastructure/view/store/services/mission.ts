import { missionService } from 'domain/services/MissionService';
import { httpAxios } from 'infrastructure/instances/httpAxios';
import { missionRepository } from 'infrastructure/repositories/missionRepository';

const repository = missionRepository(httpAxios);
const missionServices = missionService(repository);
export default missionServices;
