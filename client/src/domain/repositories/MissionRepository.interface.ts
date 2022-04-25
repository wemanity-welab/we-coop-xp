import { Mission } from '../models/Mission';

export interface MissionRepository {
  addMission(mission: Mission): Promise<void>;
  getMissions: () => Promise<Mission[]>;
  addMission(mission: Mission): Promise<Mission>;
}
