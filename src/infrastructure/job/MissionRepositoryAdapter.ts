import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { MissionDomain } from '../../domain/mission/MissionDomain';
import { IMissionRepository } from '../../domain/mission/IMissionRepository';
import { MissionEntity } from './MissionEntity';
import { fromDomainToEntity, fromEntityToDomain } from './MissionEntity';

@Injectable()
export class MissionRepositoryAdapter implements IMissionRepository {
  constructor(
    @InjectRepository(MissionEntity)
    private readonly missionEntityRepository: Repository<MissionEntity>,
  ) {}

  public async save(mission: MissionDomain): Promise<string> {
    await this.missionEntityRepository.save(fromDomainToEntity(mission));
    return 'Success';
  }
  public async getAll(): Promise<MissionDomain[]> {
    const missions = await this.missionEntityRepository.find();
    return missions.map((mission) => fromEntityToDomain(mission));
  }
  public async getOne(missionId: string): Promise<MissionDomain> {
    const missionOne = await this.missionEntityRepository.find({
      id: missionId,
    });
    const mission = missionOne.map((mission) => fromEntityToDomain(mission));
    return mission[0];
  }
  public async remove(missionId: string): Promise<string> {
    try {
      const removeReturn = await this.missionEntityRepository.delete(missionId);
      return removeReturn.affected === 0
        ? 'Mission not found'
        : 'Mission deleted';
    } catch (error) {
      throw new Error(error);
    }
  }
  public async update(missionId: string, mission: any): Promise<any> {
    const missionFound = await this.missionEntityRepository.findOne({
      id: missionId,
    });
    if (!missionFound) {
      throw new Error('mission not updated');
    } else {
      const fetchedMission = await this.missionEntityRepository.save({
        ...missionFound, // existing fields
        ...mission, // updated fields
      });
      return fromEntityToDomain(fetchedMission);
    }
  }

  async search(keywords: string[]): Promise<MissionDomain[]> {
    const missions: any[] = [];
    await Promise.all(
      keywords.map(async (keyword) => {
        const request: MissionEntity[] =
          await this.missionEntityRepository.find({
            profil: Like(`%${keyword}%`),
          });
        request.forEach((req) => missions.push(new MissionDomain(req)));
      }),
    );
    return missions;
  }
}
