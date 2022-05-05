import { Mission } from './mission';

export interface IMissionRepository {
  getMissions: () => Promise<Mission[]>;
  updateMission: (id: string, data: Mission) => Promise<Mission>;
  deleteMission: (id: string) => Promise<string>;
  addMission: (mission: Mission) => Promise<Mission>;
  missionFiltred: (keywords: string[]) => Promise<Mission[]>;
}
