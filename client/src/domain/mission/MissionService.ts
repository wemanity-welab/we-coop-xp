import { Mission } from './mission';
import { IMissionRepository } from './mission.irepository';

export const MissionService = (
  repository: IMissionRepository,
): IMissionRepository => ({
  getMissions: (): Promise<Mission[]> => {
    return repository.getMissions();
  },
  updateMission: (id, data): Promise<Mission> => {
    return repository.updateMission(id, data);
  },
});
