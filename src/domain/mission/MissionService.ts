import { Inject, Injectable } from '@nestjs/common';
import { MissionDomain } from './MissionDomain';
import { IMissionRepository } from './IMissionRepository';
import { IMissionService } from './IMissionService';

@Injectable()
export class MissionService implements IMissionService {
  private missionRepositoryAdapter: IMissionRepository;
  constructor(
    @Inject('IMissionRepository') missionAdapter: IMissionRepository,
  ) {
    this.missionRepositoryAdapter = missionAdapter;
  }

  async save(mission: MissionDomain) {
    return await this.missionRepositoryAdapter.save(mission);
  }
  async getAll() {
    return await this.missionRepositoryAdapter.getAll();
  }
  async getOne(missionId: string) {
    return await this.missionRepositoryAdapter.getOne(missionId);
  }
  async remove(missionId: string) {
    return await this.missionRepositoryAdapter.remove(missionId);
  }
  async update(missionId: string, mission: MissionDomain) {
    return await this.missionRepositoryAdapter.update(missionId, mission);
  }
  async search(keywords: string[]) {
    return await this.missionRepositoryAdapter.search(keywords);
  }
}
