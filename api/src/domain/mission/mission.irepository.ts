import { MissionDomain } from './mission.domain';

export interface IMissionRepository {
  save(mission: MissionDomain): Promise<MissionDomain>;
  getAll(): Promise<MissionDomain[]>;
  remove(missionId: string): Promise<string>;
  update(
    missionId: string,
    mission: Partial<MissionDomain>,
  ): Promise<MissionDomain>;
  getOne(missionId: string): Promise<MissionDomain>;
  search(keywords: string[]): Promise<MissionDomain[]>;
}
