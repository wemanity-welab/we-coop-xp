import { Mission } from './mission';

export interface IMissionRepository {
  getMissions: () => Promise<Mission[]>;
  addMission: (mission: Mission) => Promise<Mission>;
}
