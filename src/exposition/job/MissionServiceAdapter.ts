import { Injectable } from '@nestjs/common';
import { MissionDomain } from '../../domain/mission/MissionDomain';
import { MissionService } from '../../domain/mission/MissionService';

@Injectable()
export class MissionServiceAdapter {
  private missionService: MissionService;
  constructor(missionService: MissionService) {
    this.missionService = missionService;
  }

  public async save(mission: MissionDomain): Promise<string> {
    return this.missionService.save(mission);
  }
  public async getAll(): Promise<MissionDomain[]> {
    return this.missionService.getAll();
  }
  public async getOne(missionId: number): Promise<MissionDomain> {
    return this.missionService.getOne(missionId);
  }
  public async remove(missionId: number): Promise<string> {
    return this.missionService.remove(missionId);
  }
  public async update(
    missionId: number,
    mission: MissionDomain,
  ): Promise<MissionDomain> {
    return this.missionService.update(missionId, mission);
  }
}