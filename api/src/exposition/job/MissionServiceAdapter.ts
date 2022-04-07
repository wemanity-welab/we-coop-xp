import { Injectable } from '@nestjs/common';
import { MissionDomain } from '../../domain/mission/MissionDomain';
import { MissionService } from '../../domain/mission/MissionService';
import { Mission } from '../../types/Mission';

@Injectable()
export class MissionServiceAdapter {
  private missionService: MissionService;
  constructor(missionService: MissionService) {
    this.missionService = missionService;
  }

  public async save(mission: Mission): Promise<MissionDomain> {
    const missionDomain = new MissionDomain(mission);
    return this.missionService.save(missionDomain);
  }
  public async getAll(): Promise<MissionDomain[]> {
    return this.missionService.getAll();
  }
  public async getOne(missionId: string): Promise<MissionDomain> {
    return this.missionService.getOne(missionId);
  }
  public async remove(missionId: string): Promise<string> {
    return this.missionService.remove(missionId);
  }
  public async update(
    missionId: string,
    mission: Partial<MissionDomain>,
  ): Promise<MissionDomain> {
    return this.missionService.update(missionId, mission);
  }
  public async search(keywords: string[]): Promise<MissionDomain[]> {
    return this.missionService.search(keywords);
  }
}
