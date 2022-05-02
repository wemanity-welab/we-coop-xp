import { Mission } from './mission';

export interface IMissionRepository {
  getMissions: () => Promise<Mission[]>;
  updateMission: (id: string, data: Mission) => Promise<Mission>;
}
