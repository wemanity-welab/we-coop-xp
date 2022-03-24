import { MissionDomain } from './MissionDomain';

export interface IMissionRepository {
  save(mission: MissionDomain): Promise<string>;
  getAll(): Promise<MissionDomain[]>;
  remove(missionId: number): Promise<string>;
  update(missionId: number, mission: MissionDomain): Promise<MissionDomain>;
  getOne(missionId: number): Promise<MissionDomain>;
}
