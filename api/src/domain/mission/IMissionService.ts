import { MissionDomain } from './MissionDomain';

export interface IMissionService {
  save(mission: MissionDomain): Promise<MissionDomain>;
  getAll(): Promise<MissionDomain[]>;
  remove(missionId: string): Promise<string>;
  update(missionId: string, mission: MissionDomain): Promise<MissionDomain>;
  getOne(missionId: string): Promise<MissionDomain>;
  search(keywords: string[]): Promise<MissionDomain[]>;
}
