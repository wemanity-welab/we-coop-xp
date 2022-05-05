import { Mission } from './mission';
import { IMissionRepository } from './mission.irepository';

export const MissionService = (
  repository: IMissionRepository,
): IMissionRepository => ({
  getMissions: (): Promise<Mission[]> => {
    return repository.getMissions();
  },
  addMission: (mission: Mission): Promise<Mission> => {
    return repository.addMission(mission);
  },

  missionfiltred: (keywords: string[]): Promise<Mission[]> => {
    return repository.missionfiltred(keywords);
  },
});
