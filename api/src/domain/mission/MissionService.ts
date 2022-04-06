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
    const missions = await this.missionRepositoryAdapter.getAll();
    if (missions.length === 0) {
      throw new Error('Aucune mission dans la base de données.');
    }
    return missions;
  }
  async getOne(missionId: string) {
    const mission = await this.missionRepositoryAdapter.getOne(missionId);
    if (!mission) {
      throw new Error('Mission introuvable.');
    }
    return mission;
  }
  async remove(missionId: string) {
    const mission = await this.missionRepositoryAdapter.getOne(missionId);
    if (!mission) {
      throw new Error('Mission introuvable ou déjà supprimée.');
    }
    return await this.missionRepositoryAdapter.remove(missionId);
  }
  async update(missionId: string, mission: Partial<MissionDomain>) {
    const missionFound = await this.missionRepositoryAdapter.getOne(missionId);
    if (!missionFound) {
      throw new Error('Mission introuvable.');
    }
    if (mission === missionFound) {
      throw new Error('Mission identique ou déjà modifiée.');
    }
    return await this.missionRepositoryAdapter.update(missionId, mission);
  }
  async search(keywords: string[]) {
    const missions = await this.missionRepositoryAdapter.search(keywords);
    if (missions.length === 0) {
      throw new Error('Aucune correspondance.');
    }
    return missions;
  }
}
